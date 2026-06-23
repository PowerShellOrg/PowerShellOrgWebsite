// .github/scripts/sync-podcast-feed.js
// Incremental sync of The PowerShell Podcast (Podbean) into content/podcast/.
//
// Design: see docs/adr/0003-incremental-podcast-sync.md.
// The feed currently carries the full archive, but this script is strictly
// ADD-ONLY: it generates an episode file only when no existing file matches,
// and never edits or deletes. That makes a full pass over the feed safe and
// lets the first run backfill the whole gap between the repo and the feed.
//
// Idempotency key (in priority order): enclosure URL, then RSS guid, then
// episode number. The enclosure URL is the universal key — every existing
// modern file carries it as `podcast_url`.
//
// Run `node .github/scripts/sync-podcast-feed.js --dry-run` to preview.

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const FEED_URL = 'https://feed.podbean.com/powershellpodcast/feed.xml';
const PODCAST_DIR = path.join('content', 'podcast');
const HOST = 'Andrew Pla';
const TITLE_PREFIX = 'The PowerShell Podcast ';
const DRY_RUN = process.argv.includes('--dry-run');

// Recurring boilerplate links lifted/dropped from episode bodies. A body line
// (typically a "Resource Links" bullet) is dropped if it contains any of these.
// Keep this list tight — episode-specific links must survive. youtu.be is
// dropped because the id is lifted into the `youtube` frontmatter field.
const BOILERPLATE = [
  /andrewpla\.tech/i,
  /discord\.gg\/pdq/i,
  /powershellsummit\.org/i,
  /youtu\.be\//i,
];

// --- XML helpers -----------------------------------------------------------

function decodeEntities(str) {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

// Read the text of a single child tag from an <item> block, unwrapping CDATA.
function tag(item, name) {
  const m = item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  if (!m) return '';
  let v = m[1].trim();
  const cdata = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) return cdata[1];
  return decodeEntities(v);
}

function attr(item, tagName, attrName) {
  const m = item.match(new RegExp(`<${tagName}\\b[^>]*\\b${attrName}=["']([^"']*)["']`, 'i'));
  return m ? m[1] : '';
}

// --- Slug + date -----------------------------------------------------------

// Mirrors Hugo's default slugify closely enough to match the existing modern
// filenames: lowercase, drop apostrophes, collapse runs of other non-alnum
// characters to single hyphens, trim hyphens.
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

// pubDate -> { date: 'YYYY-MM-DD', iso: 'YYYY-MM-DDTHH:MM:SS+00:00', y, m }
function parseDate(pubDate) {
  const d = new Date(pubDate);
  const y = d.getUTCFullYear();
  const m = pad2(d.getUTCMonth() + 1);
  const day = pad2(d.getUTCDate());
  const iso = `${y}-${m}-${day}T${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}+00:00`;
  return { date: `${y}-${m}-${day}`, iso, y, m };
}

// --- Episode number from enclosure filename --------------------------------

// The repo's episode-number convention is the number embedded in the Podbean
// filename (`..._episode_NNN_...`), NOT itunes:episode (which runs one ahead).
// Most filenames delimit the number (`episode_220_Morten`), but specials glue a
// random suffix onto it (`episode_2298xv9d`). For the ambiguous case, pick the
// digit-prefix closest to itunes:episode (the numbers track within ~1).
function resolveEpisode(enclosureUrl, itunesEp) {
  const clean = enclosureUrl.match(/episode[_-](\d+)[_-]/i);
  if (clean) return parseInt(clean[1], 10);

  const greedy = enclosureUrl.match(/episode[_-](\d+)/i);
  if (!greedy) return null;
  const digits = greedy[1];
  if (!itunesEp) return parseInt(digits, 10);

  let best = null;
  for (let len = digits.length; len >= 1; len--) {
    const cand = parseInt(digits.slice(0, len), 10);
    if (Math.abs(cand - itunesEp) <= 2) { best = cand; break; }
  }
  return best != null ? best : parseInt(digits, 10);
}

// --- HTML body -> markdown -------------------------------------------------

function htmlToMarkdown(html) {
  let md = html;

  // Lists
  md = md.replace(/<\/?ul[^>]*>/gi, '\n');
  md = md.replace(/<\/?ol[^>]*>/gi, '\n');
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${t.trim()}\n`);

  // Links, emphasis
  md = md.replace(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  md = md.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  md = md.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Block + break tags
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<\/p>/gi, '\n\n');
  md = md.replace(/<p[^>]*>/gi, '');

  // Strip anything left, decode, tidy
  md = md.replace(/<\/?[a-zA-Z][^>]*>/g, '');
  md = decodeEntities(md);

  md = md
    .split('\n')
    .map((line) => line.replace(/ /g, ' ').replace(/[ \t]+$/g, '').trim())
    .join('\n');
  md = md.replace(/\n{3,}/g, '\n\n');
  // Tighten lists: drop blank lines between consecutive bullets.
  md = md.replace(/(^- .*)\n\n(?=- )/gm, '$1\n');
  return md.trim();
}

function stripBoilerplate(md) {
  const kept = md
    .split('\n')
    .filter((line) => !BOILERPLATE.some((re) => re.test(line)));

  // Drop a trailing "Resource Links" header left empty after stripping.
  while (kept.length) {
    const last = kept[kept.length - 1].trim();
    if (last === '' || /^resource links?:?$/i.test(last)) kept.pop();
    else break;
  }
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// --- Conservative guest extraction -----------------------------------------
// Ported from scripts/update-podcast-authors.py. High-confidence only; a missed
// guest degrades to no byline, a wrong guest would be a bad byline (ADR 0003).

const NOT_A_PERSON = /^(?:The|A|An|In|This|For|With|From|On|PowerShell|Microsoft|Windows|Azure|DevOps|Cloud|GitHub|AWS|Episode|Podcast|Session|Roundtable|Community|Tonight|Join|Listen|Watch|Learn|Get|Set|Bar|Summit|Meet|Introducing|Featuring|Welcome|Just)\b/i;

function looksLikePerson(name) {
  if (!name || name.length < 4) return false;
  if (NOT_A_PERSON.test(name)) return false;
  const words = name.split(/\s+/);
  if (words.length < 2) return false;
  if (words.filter((w) => /^[A-ZÀ-ɏ]/.test(w)).length < 2) return false;
  // Reject emphasis words (ALSO, PLUS) but allow initials like "B."
  if (words.some((w) => w.length > 1 && w === w.toUpperCase() && !w.endsWith('.'))) return false;
  const low = name.toLowerCase();
  return !['http', 'www.', 'episode', 'podcast', 'powershell', 'microsoft', 'summit'].some((b) => low.includes(b));
}

function cleanName(raw) {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]/g, '')
    .replace(/^["']|["']$/g, '')
    .replace(/[.,;:!?]+$/g, '')
    .replace(/^(?:MVPs?\s+|Dr\.\s+|Prof\.\s+)/i, '')
    .trim();
}

// "...with Name", "...with Name1 and Name2"
function guestsFromTitle(title) {
  const m = title.match(/\bwith\s+(.+)$/i);
  if (!m) return [];
  let after = m[1]
    .replace(/^(?:MVPs?\s+|special\s+guest\s+host\s+)/i, '')
    .replace(/\s*[-–—].*$/, '')
    .replace(/!.*$/, '');
  const out = [];
  for (let part of after.split(/\s+(?:and|&)\s+/i)) {
    part = part.replace(/[,:(\[].*$/, '').trim();
    const words = [];
    for (const w of part.split(/\s+/).slice(0, 3)) {
      const cw = w.replace(/[!?.]+$/, '');
      if (cw && /^[A-ZÀ-ɏ]/.test(cw)) words.push(cw);
      else break;
    }
    if (words.length >= 2) {
      const name = cleanName(words.join(' '));
      if (looksLikePerson(name) && !out.includes(name)) out.push(name);
    }
  }
  return out;
}

// "Guest Bio:" / "Bio:" header followed by "Name is/works/..." paragraph.
function guestsFromBio(body) {
  const out = [];
  const hdr = body.match(/^(?:Guest Bio|Bio)\s*:?\s*$/im) || body.match(/(?:Guest Bio|Bio)\s*:/i);
  if (!hdr) return out;
  const after = body.slice(body.indexOf(hdr[0]) + hdr[0].length);
  for (const para of after.split(/\n\s*\n/).slice(0, 2)) {
    const m = para
      .trim()
      .match(/^(?:Dr\.\s+|Prof\.\s+)?([A-ZÀ-ɏ][\w'À-ɏ-]+(?:\s+[A-Z]\.)?(?:\s+[A-ZÀ-ɏ][\w'À-ɏ-]+){1,3})(?=\s+(?:is|was|are|has|works|joined|lives|serves|brings|currently|helps|leads|comes|spent|built|started|founded|created|focuses|specializes|manages|develops|writes|teaches|runs|hosts|holds|received|earned|wrote|published|blogs)\b|\s*,)/);
    if (m) {
      const name = cleanName(m[1]);
      if (looksLikePerson(name) && !out.includes(name)) out.push(name);
    }
  }
  return out;
}

function extractGuests(title, body) {
  const guests = [];
  for (const g of [...guestsFromBio(body), ...guestsFromTitle(title)]) {
    if (!guests.includes(g) && g !== HOST) guests.push(g);
  }
  return guests;
}

// --- YAML ------------------------------------------------------------------

// Plain scalar unless the value would break YAML (matches the existing files,
// which leave titles with parens/apostrophes/& unquoted).
function yamlScalar(v) {
  const s = String(v);
  if (s === '' || /[:#]\s/.test(s) || /[:#]$/.test(s) || /^[\s>|*&!%@`"'\[\]{},]/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return s;
}

// --- Existing-file index ---------------------------------------------------

function buildIndex() {
  const idx = { urls: new Set(), guids: new Set(), episodes: new Set() };
  for (const file of fs.readdirSync(PODCAST_DIR)) {
    if (!file.endsWith('.md') || file === '_index.md') continue;
    const c = fs.readFileSync(path.join(PODCAST_DIR, file), 'utf-8');
    if (!c.includes('mcdn.podbean.com')) continue; // modern (Podbean) episodes only
    const url = c.match(/^podcast_url:\s*"?([^"\r\n]+)"?/m);
    if (url) idx.urls.add(url[1].trim());
    const guid = c.match(/^guid:\s*"?([^"\r\n]+)"?/m);
    if (guid) idx.guids.add(guid[1].trim());
    const ep = c.match(/^episode:\s*(\d+)/m);
    if (ep) idx.episodes.add(parseInt(ep[1], 10));
  }
  return idx;
}

// --- Build one episode file ------------------------------------------------

function buildEpisode(item) {
  const enclosure = attr(item, 'enclosure', 'url').trim();
  if (!enclosure) return null;

  const rawTitle = tag(item, 'title').trim();
  const guidRaw = tag(item, 'guid').trim();
  const pubDate = tag(item, 'pubDate').trim();
  const itunesEp = parseInt(tag(item, 'itunes:episode'), 10) || null;
  const contentHtml = tag(item, 'content:encoded') || tag(item, 'description');

  const episode = resolveEpisode(enclosure, itunesEp);
  const { date, iso, y, m } = parseDate(pubDate);
  const slug = TITLE_PREFIX.toLowerCase().trim().replace(/\s+/g, '-') + '-' + slugify(rawTitle);
  const filename = `${date}-${slug}.md`;

  const ytMatch = contentHtml.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  const youtube = ytMatch ? ytMatch[1] : null;

  const body = stripBoilerplate(htmlToMarkdown(contentHtml));
  const guests = extractGuests(rawTitle, body);
  const authors = [HOST, ...guests];

  const fm = [];
  fm.push(`title: ${yamlScalar(TITLE_PREFIX + rawTitle)}`);
  fm.push(`author: ${yamlScalar(HOST)}`);
  fm.push('authors:');
  for (const a of authors) fm.push(`  - ${yamlScalar(a)}`);
  fm.push(`date: "${iso}"`);
  fm.push(`podcast_url: "${enclosure}"`);
  if (episode != null) fm.push(`episode: ${episode}`);
  if (youtube) fm.push(`youtube: ${youtube}`);
  if (guidRaw) fm.push(`guid: ${yamlScalar(guidRaw)}`);
  fm.push('aliases:');
  fm.push(`  - /${y}/${m}/${slug}/`);

  const content = `---\n${fm.join('\n')}\n---\n\n${body}\n`;
  return { filename, content, episode, enclosure, guid: guidRaw, title: rawTitle };
}

// --- Main ------------------------------------------------------------------

async function main() {
  console.log(`Fetching ${FEED_URL} ...`);
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  console.log(`Feed items: ${items.length}`);

  const idx = buildIndex();
  console.log(`Existing modern episodes indexed: urls=${idx.urls.size} guids=${idx.guids.size} episodes=${idx.episodes.size}`);

  let added = 0;
  let skipped = 0;
  const writes = [];

  for (const item of items) {
    const ep = buildEpisode(item);
    if (!ep) { skipped++; continue; }

    const exists =
      idx.urls.has(ep.enclosure) ||
      (ep.guid && idx.guids.has(ep.guid)) ||
      (ep.episode != null && idx.episodes.has(ep.episode));
    if (exists) { skipped++; continue; }

    const dest = path.join(PODCAST_DIR, ep.filename);
    if (fs.existsSync(dest)) { skipped++; continue; }

    writes.push(ep);
    // Reserve keys so a duplicate item in the same run can't double-write.
    idx.urls.add(ep.enclosure);
    if (ep.guid) idx.guids.add(ep.guid);
    if (ep.episode != null) idx.episodes.add(ep.episode);
  }

  writes.sort((a, b) => a.filename.localeCompare(b.filename));
  for (const ep of writes) {
    console.log(`${DRY_RUN ? '[dry-run] ' : ''}+ ${ep.filename} (episode ${ep.episode ?? '?'})`);
    if (!DRY_RUN) fs.writeFileSync(path.join(PODCAST_DIR, ep.filename), ep.content, 'utf-8');
    added++;
  }

  console.log(`\n${DRY_RUN ? 'Would add' : 'Added'}: ${added}   Skipped (already present): ${skipped}`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
