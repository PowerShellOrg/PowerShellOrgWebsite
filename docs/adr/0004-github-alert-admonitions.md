# Admonitions are GitHub-style alerts, capped at GitHub's five canonical types

Callouts on the site are authored with GitHub's alert syntax — `> [!NOTE]`,
`> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` — and rendered by a
Goldmark blockquote render hook (`themes/powershell-community/layouts/_markup/render-blockquote.html`)
into styled callouts, with the look defined in
`themes/powershell-community/static/css/alerts.css`.

The load-bearing constraint is the **contribution model**: an [[Author]] submits
an article either as plain Markdown pasted into a GitHub issue (the no-Git path)
or as a Markdown file in a pull request. In both, the Markdown is read on GitHub
*before* it is ever read on the site. The admonition syntax therefore has to
render identically in both places. GitHub natively renders exactly five alert
types and nothing else; any sixth type degrades on GitHub to a plain blockquote
with a literal `[!SUCCESS]` first line. So the syntax choice and the type set are
the same decision: pick the form GitHub already understands, and support only the
types GitHub renders.

## Considered options

- **Hugo shortcodes** (`{{< note >}}…{{< /note >}}`, matching the existing
  `terminal` shortcode) — rejected. It is the established convention here, but a
  shortcode renders as literal `{{< note >}}` text in a GitHub issue or PR diff,
  which is exactly where submissions are first read. It also asks plain-Markdown
  authors to learn a Hugo-specific construct.
- **GitHub-style alerts, full Blowfish vocabulary** (~14 types + aliases like
  `tldr`, `hint`, `done`) — rejected. The richer palette renders on the site but
  silently breaks the GitHub round-trip for every type beyond the canonical five.
  An author who learns `[!SUCCESS]` from our docs and sees a broken blockquote in
  their own issue is a worse outcome than not having `success` at all.
- **Front Matter CMS snippets** — not an alternative to the above so much as a
  layer on top; a snippet still has to emit *some* markup. Deferred. If added
  later it should emit the `> [!NOTE]` syntax, not a shortcode.
- **GitHub-style alerts, canonical five only** — chosen. The same Markdown reads
  correctly in the issue form, the PR diff, and the published page.

## Consequences

- **The vocabulary is capped at five** (`note`, `tip`, `important`, `warning`,
  `caution`). This is a deliberate ceiling, not an oversight — a future
  maintainer who wants `[!SUCCESS]` or `[!QUOTE]` is reintroducing the GitHub
  degradation this record exists to prevent. The render hook keeps a type→icon
  map so adding a type is mechanically a one-line change; the reason *not* to is
  recorded here.
- **The `terminal` shortcode convention was deliberately not extended.** Callouts
  and code-terminals now use two different mechanisms (render hook vs. shortcode).
  That inconsistency is intentional: `terminal` is site-only chrome with no GitHub
  round-trip to honor, whereas callouts must survive it.
- **The render hook owns every blockquote on the site.** It must branch on
  `.Type == "alert"` and fall through to a plain `<blockquote>` for ordinary
  quotes, or all non-alert blockquotes break. Plain blockquotes-as-containers
  (e.g. the category list in the contributor guide) stay plain by design.
- Styling lives in its own theme-owned stylesheet (`static/css/alerts.css`,
  linked from `baseof.html`) rather than the inline `<style>` block, but is still
  shipped inside the theme so the feature — hook plus styles — stays
  self-contained.
