# Plan: Keep The PowerShell Podcast synced to the repo

## Scope & key facts

- `content/podcast/` holds **two shows**: the archived **PowerScripting Podcast**
  (2007–2020, libsyn audio, original hosts) and **The PowerShell Podcast**
  (2022→, Podbean audio, Andrew Pla). They are told apart by audio host:
  `mcdn.podbean.com` ⇒ The PowerShell Podcast. This work touches **only** The
  PowerShell Podcast (the 220 modern, Podbean-hosted episodes).
- The Podbean RSS feed (`feed.podbean.com/powershellpodcast/feed.xml`) is
  **truncated to the 10 most recent items** — it can keep the recent tail in
  sync but can never backfill history.
- Episode number is embedded in the existing `podcast_url` filename
  (`..._episode_220_...`) for 217/220 modern files — a reliable local key.

## Workstream 1 — Author rewrite (one-time, local)

For every modern (Podbean) episode:

- `author:` → `Andrew Pla` (the byline shown on the page).
- `authors:` → replace `James Petty` with `Andrew Pla`; **insert `Jordan Hammond`
  when `date` ≤ 2023-12-25** (the "Farewell to Jordan" episode); keep all existing
  guests; dedupe; Andrew first.
- James Petty remains the author of his 32 articles — only the podcast
  mis-attribution is corrected.

## Workstream 2 — Frontmatter enrichment (one-time, local + playlist)

Add to each modern episode:

- `episode:` — parsed from the `podcast_url` filename (217/220; 3 Summit/bar
  specials set by hand or left blank).
- `guid:` — only where the live feed provides it (recent items). Old episodes
  never re-appear in the feed, so they need no guid.
- `youtube:` — the `youtu.be` id. 76/220 already carry it in-body; the rest are
  matched against the **YouTube playlist** by episode number / title. Missing ⇒
  no embed, template falls back to the icon.

## Workstream 3 — Backfill the gap (one-time) — _subsumed by WS4_

Originally scoped as a YouTube/Podbean scrape of episodes that had rolled off the
10-item feed window. **Not needed:** the live feed turned out to carry the full
archive (see ADR 0003 update), so the first WS4 run generated the entire gap
(eps 221–234) directly. No scrape was performed.

## Workstream 4 — Ongoing RSS sync (automated)

- **Runtime:** Node + `node-fetch`, matching `discourse-sync.yml` /
  `migrate-posts.cjs`.
- **Trigger:** scheduled GitHub Action (weekly, Tuesday — after the Monday
  release), `workflow_dispatch` enabled. **Auto-commits to the branch**; Netlify
  rebuilds on push. Must run at least every ~10 weeks or feed items roll off.
- **Implemented:** `.github/scripts/sync-podcast-feed.js` (add-only) +
  `.github/workflows/podcast-sync.yml` (weekly Tuesday, `workflow_dispatch`,
  auto-commit). Run `node .github/scripts/sync-podcast-feed.js --dry-run` to
  preview.
- **Per feed item:**
  1. Match existing files by **enclosure URL**, else `guid`, else `episode`
     number → skip if present. (All existing files carry `podcast_url`; none
     carried `guid`, so the enclosure URL is the universal key.)
  2. Filename `YYYY-MM-DD-<slug>.md`, date from `pubDate`, `aliases:
     /YYYY/MM/<slug>/` (matches migrated convention).
  3. `author: Andrew Pla`; guests extracted **conservatively** (high-confidence
     only, never remove) — bio-section + `with <Name>` title patterns ported from
     `scripts/update-podcast-authors.py`.
  4. `podcast_url` = enclosure; `episode` = number **parsed from the enclosure
     filename** (the repo convention — `itunes:episode` runs one ahead, see ADR
     0003); `guid`; `youtube` = `youtu.be` id from the notes. `duration` was
     **omitted** to keep the synced frontmatter identical to the existing files
     (no episode currently carries it).
  5. Body: `content:encoded` HTML → markdown, **strip recurring boilerplate**
     (Andrew's links, PDQ Discord, Summit promo, redundant YouTube line) via a
     maintained strip-list; keep episode-specific resource links.

## Workstream 5 — Rendering (layout changes)

- `podcast/list.html` & `_default/single.html`: render the YouTube thumbnail
  (`https://img.youtube.com/vi/<id>/maxresdefault.jpg`) **hotlinked**, falling
  back to the existing purple icon when no `youtube` id.
- Single page: click-to-load YouTube embed facade (thumbnail poster → iframe on
  click) alongside the existing audio player.

## Workstream 6 — Author profiles (one-time)

Scaffold profiles with `tools/new-author.ps1` so the rewritten bylines resolve to
real bio cards instead of bare taxonomy pages (per ADR 0002):

- `content/authors/andrew-pla/_index.md` — host. Tagline + bio, links (e.g.
  `andrewpla.tech/links`), avatar.
- `content/authors/jordan-hammond/_index.md` — early co-host.

Slugs must match Hugo's slug of the exact `authors:` string (`Andrew Pla` →
`andrew-pla`, `Jordan Hammond` → `jordan-hammond`); `new-author.ps1` enforces this.

## Design record

The truncated-feed constraint and the incremental-sync-vs-backfill split are
captured in [ADR 0003](adr/0003-incremental-podcast-sync.md). The two-podcast
distinction is in `CONTEXT.md`.
