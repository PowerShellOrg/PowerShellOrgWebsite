# Podcast sync: incremental RSS tail + one-time backfill, not a feed-driven archive

[[The PowerShell Podcast]] is kept in step with the repo from its Podbean RSS feed
(`feed.podbean.com/powershellpodcast/feed.xml`). The non-obvious constraint that shapes
the whole design: **the feed is truncated to the 10 most recent items.** It is a
*notification* of recent episodes, not an archive. The 220 modern episodes already in
`content/podcast/` were migrated from elsewhere, not fetched from this feed, and the feed
cannot reproduce them.

We therefore treat sync as **incremental tail maintenance**, not a feed-driven rebuild. A
scheduled GitHub Action (weekly, mirroring `discourse-sync.yml`) fetches the feed and
*adds* episodes it hasn't seen, matching existing files by `guid` and falling back to the
`episode` number parsed from the `podcast_url` filename. It never rebuilds or reconciles
the back catalogue against the feed, because the feed does not contain it.

History that predates the current 10-item window is handled **once, out-of-band**: episodes
221–224 (already rolled off the feed before the first sync) are backfilled from the YouTube
playlist / Podbean website, and the existing archive is enriched in place. This is a
deliberate split — the ongoing automation owns *only* the recent tail.

## Considered options

- **Treat the feed as the source of truth and reconcile the section against it** — rejected.
  With only 10 items visible, every run would see 210+ "missing" episodes and either do
  nothing useful or, worse, delete the archive. The feed simply does not carry enough to be
  authoritative.
- **Scrape the full Podbean website archive (~24 pages) on every run** — rejected for the
  steady state. It removes the truncation limit but is brittle (HTML scraping), slow, and
  unnecessary when the feed already announces new episodes reliably. We use a scrape *once*
  for backfill, where its cost is paid a single time.
- **Incremental RSS tail + one-time backfill** — chosen. The feed does exactly what it is
  good at (announcing new episodes); scraping is confined to the one-time historical gap;
  steady-state sync stays simple and cheap.

## Consequences

- **Cadence is load-bearing.** The Action must run often enough that no episode is published
  and then rolls off the 10-item window between runs. At a weekly release cadence that is
  ~10 weeks of slack; weekly runs leave a wide margin. If the schedule is disabled or the
  Action is broken for a long stretch, episodes can be **permanently lost from sync** and
  will need the same out-of-band backfill that 221–224 required. This is the failure mode to
  watch.
- The matched-by-`guid`-then-`episode` rule means old episodes never need a real RSS `guid`
  stored — they will never re-appear in the feed to be matched. `guid` is recorded only for
  episodes seen through the feed; `episode` (from the `podcast_url` filename) is the
  universal key. See [[Author]] for how authorship is set on synced episodes (`author:
  Andrew Pla`, guests appended conservatively).
- Backfill and ongoing sync are **different code paths with different trust levels**: the
  scrape is a reviewed one-shot; the Action auto-commits. Because there is no review gate on
  the Action, guest extraction is conservative (high-confidence additions only, never
  removals) so a bad parse degrades to a missing guest, not a wrong byline.
- A future maintainer must not "fix" the sync by widening it into a full reconcile against
  the feed — that path is closed by the truncation and is why this record exists.
