# Author profiles: enrich taxonomy term pages, keep the display name as the key

Authors are a Hugo taxonomy derived from the `authors:` frontmatter on ~1,045 articles
and podcast episodes (see [[Author]] in `CONTEXT.md`). The term pages at `/authors/<name>/`
are auto-generated and show only a name and a content list. To let an Author describe
themselves (avatar, tagline, bio, links), we enrich each term page with an **optional**
content file at `content/authors/<slug>/_index.md`. Profiles are **opt-in via PR** — not
pre-scaffolded — so most Authors have no file and must keep rendering correctly.

The load-bearing decision is what gets stored in every article's `authors:` frontmatter.
We keep the **display name** there (`authors: [James Petty]`), exactly as today. The name
is both the byline and the source of the Profile slug — the stable key. A Profile may set
a **preferred name** that overrides only how the name is *displayed*; it never changes the
slug or the byline. Authors without a Profile render their author name unchanged.

## Considered options

- **Slug as the key** (`authors: [james-petty]`, display name rendered from the Profile) —
  rejected. It decouples slug from name, but the display name would then live *only* in the
  Profile. With ~70 of 80 Authors un-enriched at launch, their bylines and cards would fall
  back to a humanized slug — `darren-mar-elia` → "Darren Mar Elia" (wrong hyphen),
  `jasonmorgan` → "Jasonmorgan". It also forces a repo-wide migration of all 1,045 files.
- **Display name as the key, with an optional preferred-name override** — chosen. Zero
  migration, correct bylines for every Author for free, and the changeable-display-name
  benefit is preserved for those who opt in. The only thing it gives up is a slug decoupled
  from the original name — but the slug is a URL we want stable anyway, and renaming it is a
  redirect-and-find/replace job in *either* model.

A central `data/authors.yaml` was also rejected in favor of taxonomy term content files:
term files bind to the existing `/authors/<name>/` page automatically and carry a Markdown
bio, which a data file cannot do naturally.

## Consequences

- The profile content file's directory **must** equal Hugo's slug of the exact author
  string; a mismatch yields an orphan page that enriches nothing. A `new-author.ps1`
  scaffolder generates the file with the right slug, and a build-time check flags author
  content files whose slug matches no taxonomy term.
- Renaming a slug is the rare, deliberate case: `new-author.ps1` rewrites the term across
  content and adds an `aliases` redirect on the Profile to preserve the old URL.
- Avatars resolve `avatar` → `gravatar_hash` → `email` → `identicon` fallback. Raw `email`
  is convenient but lands in the public repo; `gravatar_hash` lets the privacy-conscious
  avoid that, and an explicit `avatar` image bypasses Gravatar entirely.
- The Author list orders enriched profiles first, then by count, so a partially-filled grid
  reads as intentional rather than sparse.
