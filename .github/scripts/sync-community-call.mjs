import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CALENDAR_DIR = path.join('content', 'calendar');
const HORIZON_MONTHS = 3;
// Extra months generated before filtering so a reschedule that pushes a
// month's call past its original (already-elapsed) default date — or a
// month whose call already happened without a reschedule — doesn't shrink
// the window below HORIZON_MONTHS.
const CANDIDATE_BUFFER_MONTHS = 2;
const JOIN_URL = 'https://aka.ms/JoinPSCall';
const DRY_RUN = process.argv.includes('--dry-run');

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function yaml(value) {
  return JSON.stringify(value ?? '');
}

/**
 * The PowerShell Community Call is held on the 3rd Thursday of every month at
 * 9:30 AM US Pacific, per https://github.com/PowerShell/PowerShell-RFC/blob/master/CommunityCall/PSTeamsCall.ics
 * (RRULE:FREQ=MONTHLY;BYDAY=TH;BYSETPOS=3). Returns the day-of-month (1-31).
 */
export function thirdThursday(year, monthIndex) {
  const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
  const firstThursday = 1 + ((4 - firstWeekday + 7) % 7);
  return firstThursday + 14;
}

/**
 * Resolves a wall-clock date/time in America/Los_Angeles to its UTC instant,
 * accounting for DST without any date library.
 */
export function pacificDateTimeToIso(year, monthIndex, day, hour, minute) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  for (const utcOffsetHours of [7, 8]) {
    const candidate = new Date(Date.UTC(year, monthIndex, day, hour + utcOffsetHours, minute));
    const parts = Object.fromEntries(formatter.formatToParts(candidate).map(({ type, value }) => [type, value]));
    if (
      Number(parts.year) === year
      && Number(parts.month) === monthIndex + 1
      && Number(parts.day) === day
      && Number(parts.hour) === hour
      && Number(parts.minute) === minute
    ) {
      return candidate.toISOString();
    }
  }

  throw new Error(`Could not resolve Pacific time for ${year}-${monthIndex + 1}-${day} ${hour}:${minute}.`);
}

/**
 * Generates `count` consecutive monthly occurrences using the default
 * 3rd-Thursday rule, starting at `from`'s month. Not filtered by whether the
 * call has already happened — apply agenda overrides first, then filter with
 * `upcomingOccurrences`, so a reschedule that moves an elapsed default date
 * into the future is still picked up.
 */
export function candidateOccurrences(count, from = new Date()) {
  const occurrences = [];
  for (let offset = 0; offset < count; offset += 1) {
    const year = from.getUTCFullYear();
    const monthIndex = from.getUTCMonth() + offset;
    const normalizedYear = year + Math.floor(monthIndex / 12);
    const normalizedMonth = ((monthIndex % 12) + 12) % 12;
    const day = thirdThursday(normalizedYear, normalizedMonth);
    occurrences.push({
      year: normalizedYear,
      monthIndex: normalizedMonth,
      day,
      startDate: pacificDateTimeToIso(normalizedYear, normalizedMonth, day, 9, 30),
      endDate: pacificDateTimeToIso(normalizedYear, normalizedMonth, day, 10, 30),
    });
  }
  return occurrences;
}

/** Filters to the next `count` occurrences (by current endDate) that haven't ended yet, relative to `from`. */
export function upcomingOccurrences(occurrences, count, from = new Date()) {
  return occurrences.filter((occurrence) => new Date(occurrence.endDate) >= from).slice(0, count);
}

/**
 * Agenda discussion titles aren't consistently dated ("October Community Call" vs.
 * "August 21 2025 Community Call"), so only an explicit day+year in the title is
 * trusted to override the computed occurrence date — e.g. when a call is moved for
 * a holiday. Otherwise the title's month name is used only to pick which generated
 * occurrence the discussion link belongs to.
 */
export function parseAgendaTitle(title) {
  const monthPattern = MONTH_NAMES.join('|');
  const explicit = title.match(new RegExp(`(${monthPattern})\\s+(\\d{1,2}),?\\s+(\\d{4})`, 'i'));
  if (explicit) {
    const monthIndex = MONTH_NAMES.findIndex((name) => name.toLowerCase() === explicit[1].toLowerCase());
    return { monthIndex, day: Number(explicit[2]), year: Number(explicit[3]) };
  }

  const monthOnly = title.match(new RegExp(monthPattern, 'i'));
  if (monthOnly) {
    const monthIndex = MONTH_NAMES.findIndex((name) => name.toLowerCase() === monthOnly[0].toLowerCase());
    return { monthIndex };
  }

  return undefined;
}

// Discussion threads without an explicit year (e.g. "January Community Call")
// are ambiguous across years. The team creates a thread no more than a few
// months before its call — sometimes a whole batch for the rest of the
// calendar year at once — so bound how far before the occurrence's own
// default date a candidate may have been created. This keeps a same-named
// thread from a year ago from matching next year's occurrence of that month.
const MAX_AGENDA_LEAD_DAYS = 300;
const MAX_AGENDA_LEAD_MS = MAX_AGENDA_LEAD_DAYS * 24 * 60 * 60 * 1000;
const MIN_AGENDA_LEAD_MS = -2 * 24 * 60 * 60 * 1000; // allow same-day/next-day creation

/**
 * Matches each occurrence against its own most recently created agenda
 * discussion — not just the single globally-latest discussion across all
 * months. A title's explicit year (when present) must match the occurrence's
 * year, so a stale discussion from a past year can never be applied to this
 * year's occurrence (which would otherwise point the write at the wrong
 * historical file). Resolving per month also means a resolved reschedule for
 * one month survives later runs even after a newer discussion is published
 * for a different month.
 */
export function applyAgendaDiscussions(occurrences, discussions) {
  return occurrences.map((occurrence) => {
    const candidates = discussions
      .map((discussion) => ({ discussion, parsed: parseAgendaTitle(discussion.title) }))
      .filter(({ discussion, parsed }) => {
        if (!parsed || parsed.monthIndex !== occurrence.monthIndex) return false;
        if (parsed.year !== undefined) return parsed.year === occurrence.year;
        const lead = new Date(occurrence.startDate) - new Date(discussion.createdAt);
        return lead >= MIN_AGENDA_LEAD_MS && lead <= MAX_AGENDA_LEAD_MS;
      });

    if (candidates.length === 0) return occurrence;

    candidates.sort((a, b) => new Date(b.discussion.createdAt) - new Date(a.discussion.createdAt));
    const { discussion, parsed } = candidates[0];
    const explicitDate = parsed.day && parsed.year
      ? {
        day: parsed.day,
        startDate: pacificDateTimeToIso(occurrence.year, occurrence.monthIndex, parsed.day, 9, 30),
        endDate: pacificDateTimeToIso(occurrence.year, occurrence.monthIndex, parsed.day, 10, 30),
      }
      : {};

    return { ...occurrence, ...explicitDate, discussionUrl: discussion.url };
  });
}

function eventPath({ year, monthIndex }) {
  return path.join(CALENDAR_DIR, `community-call-${year}-${String(monthIndex + 1).padStart(2, '0')}.md`);
}

function eventFile(occurrence) {
  const discussionField = occurrence.discussionUrl ? `discussionUrl: ${yaml(occurrence.discussionUrl)}\n` : '';
  const discussionParagraph = occurrence.discussionUrl
    ? `\n\nThis month's agenda is posted in the [discussion](${occurrence.discussionUrl}).`
    : '';

  return `---\ncommunityCallSource: powershell\nstartDate: ${yaml(occurrence.startDate)}\nendDate: ${yaml(occurrence.endDate)}\ntitle: "PowerShell Community Call"\nexternalUrl: ${yaml(JOIN_URL)}\nvirtual: true\nwhere: "Online (Microsoft Teams)"\n${discussionField}---\nThe PowerShell team's monthly community call. Topics include PowerShell 7, PSScriptAnalyzer, the PowerShell Gallery, and other projects owned by the PowerShell team. Everyone is welcome to join and ask questions.\n\n[Join the Teams live event](${JOIN_URL}) · [Community Call discussions](https://github.com/PowerShell/PowerShell/discussions/categories/community-call)${discussionParagraph}\n`;
}

/** True when a managed calendar file was manually marked cancelled (e.g. for a holiday). */
export function isCancelled(content) {
  return typeof content === 'string' && /^cancelled:\s*true\s*$/mi.test(content);
}

/**
 * Computes which managed calendar files to add or update for the given occurrences.
 * A file manually marked `cancelled: true` is left untouched — the sync never
 * un-cancels or overwrites it with freshly computed dates/links.
 */
export function communityCallSyncPlan(existingFiles, occurrences) {
  const desired = new Map();
  for (const occurrence of occurrences) {
    const file = eventPath(occurrence);
    const current = existingFiles.find((entry) => entry.file === file)?.content;
    desired.set(file, isCancelled(current) ? current : eventFile(occurrence));
  }

  const changes = [];
  for (const [file, content] of desired) {
    const current = existingFiles.find((entry) => entry.file === file)?.content;
    if (current !== content) changes.push({ file, content, action: current === undefined ? 'add' : 'update' });
  }

  return { desired, changes };
}

async function fetchDiscussionCategoryId(token) {
  const response = await graphql(token, `
    query {
      repository(owner: "PowerShell", name: "PowerShell") {
        discussionCategories(first: 25) { nodes { id name } }
      }
    }
  `);
  const category = response.repository.discussionCategories.nodes.find((node) => node.name === 'Community Call');
  if (!category) throw new Error('PowerShell/PowerShell has no "Community Call" discussion category.');
  return category.id;
}

/** Fetches recent agenda discussions, filtered to ones that look like a monthly call thread. */
async function fetchAgendaDiscussions(token) {
  const categoryId = await fetchDiscussionCategoryId(token);
  const response = await graphql(token, `
    query($categoryId: ID!) {
      repository(owner: "PowerShell", name: "PowerShell") {
        discussions(first: 20, categoryId: $categoryId, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes { title url createdAt }
        }
      }
    }
  `, { categoryId });

  return response.repository.discussions.nodes.filter((node) => /community call/i.test(node.title));
}

async function graphql(token, query, variables = {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`GitHub GraphQL API returned ${response.status}.`);
  const body = await response.json();
  if (body.errors) throw new Error(`GitHub GraphQL API error: ${body.errors.map((e) => e.message).join('; ')}`);
  return body.data;
}

async function calendarFiles() {
  await mkdir(CALENDAR_DIR, { recursive: true });
  const names = await readdir(CALENDAR_DIR);
  return Promise.all(names.filter((name) => name.endsWith('.md')).map(async (name) => ({
    file: path.join(CALENDAR_DIR, name),
    content: await readFile(path.join(CALENDAR_DIR, name), 'utf8'),
  })));
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is required to look up community call agenda discussions.');

  const discussions = await fetchAgendaDiscussions(token);
  const candidates = candidateOccurrences(HORIZON_MONTHS + CANDIDATE_BUFFER_MONTHS);
  const resolved = applyAgendaDiscussions(candidates, discussions);
  const occurrences = upcomingOccurrences(resolved, HORIZON_MONTHS);

  const existing = await calendarFiles();
  const { changes } = communityCallSyncPlan(existing, occurrences);

  for (const { file, content, action } of changes) {
    if (!DRY_RUN) await writeFile(file, content);
    console.log(`${action} ${file}`);
  }

  if (changes.length === 0) console.log('PowerShell Community Call events are already synchronized.');
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
