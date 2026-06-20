# Module landing pages: hybrid layout under a `/modules/` section

We host dedicated landing pages for the open-source PowerShell modules PowerShell.org
stewards (see [[Module]] in `CONTEXT.md`). Plaster's page is a hand-authored, ~430-line
bespoke Hugo layout. To add more modules (PSDepend first) without copy-pasting that per
module, we adopt a **hybrid**: a generic, front-matter-driven `module` layout is the
default for new modules, and the standard Hugo `layout:` key is an escape hatch so a
flagship module can keep a bespoke page (Plaster stays on `_default/plaster.html`).

The modules live under a `/modules/` section with a card-grid index (built by
`layouts/modules/list.html` ranging over the child pages, mirroring the existing
`community` list). A single "Modules" item replaces "Plaster" in the main nav. Plaster
moves from `/plaster/` to `/modules/plaster/` with `aliases: ["/plaster/"]` to preserve
the published URL.

## Considered options

- **Bespoke per module** — rejected: ~430 lines of duplicated, drifting HTML per module.
- **Generic only** (convert Plaster too) — rejected: loses Plaster's bespoke showcase
  (ASCII hero, JSON-vs-XML comparison) for a lowest-common-denominator template.
- **Hybrid** — chosen: cheap to add modules, expressive where it earns its keep.

We named the section **"Module"** despite the collision with PowerShell's generic sense
of the word; `CONTEXT.md` carries the disambiguation.

## Consequences

- Every module page **must** set `layout:` (`module` or a bespoke name). Module pages are
  branch bundles under `modules/`, so without an explicit layout they would fall through
  to the section's `list.html`. The `modules` archetype bakes the layout key in.
- Cmdlet references on generic pages are a curated 3–6 command highlight in front matter,
  not an ingestion of each module's platyPS docs — avoids cross-repo build coupling.
