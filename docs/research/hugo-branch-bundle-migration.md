# Hugo branch-bundle migration for articles

## Decision context

This report separates **official Hugo facts** (each linked to Hugo documentation) from **repository-specific recommendations**. The goal is to turn each flat article into a nested **branch bundle** without changing its established public URL.

## Official Hugo facts

### Bundle types and content ownership

- A **leaf bundle** is a directory rooted by `index.md`. It represents a regular `page`, cannot have descendants, and may contain resources beside the index file or in its nested directories. [Hugo: Page bundles—leaf bundles](https://gohugo.io/content-management/page-bundles/#leaf-bundles)
- A **branch bundle** is a directory rooted by `_index.md`. It represents a list-kind page (`home`, `section`, `taxonomy`, or `term`) and may have descendant leaf and branch bundles. Top-level content directories are branch bundles even without `_index.md`. [Hugo: Page bundles—branch bundles](https://gohugo.io/content-management/page-bundles/#branch-bundles)
- In a branch bundle, descendant content files are rendered as content pages, while resources of descendant bundles do not belong to the branch. In a leaf bundle, additional content files are page resources and are not rendered as individual pages. [Hugo: Page bundles—comparison](https://gohugo.io/content-management/page-bundles/#comparison)
- Page resources are available only to their owning page bundle. A page retrieves them with `.Resources` and the page-relative `.Get`, `.GetMatch`, `.Match`, and `.ByType` methods. [Hugo: Page resources](https://gohugo.io/content-management/page-resources/) [Hugo: `PAGE.Resources`](https://gohugo.io/methods/page/resources/)

### `_index.md`, sections, lists, and templates

- `_index.md` provides front matter and content for home, section, taxonomy, and term pages; `index.md` instead creates a regular page. [Hugo: Content organization—index pages](https://gohugo.io/content-management/organization/#index-pages-_indexmd) [Hugo: Page bundles—comparison](https://gohugo.io/content-management/page-bundles/#comparison)
- A section is a top-level content directory or any directory containing `_index.md`. Sections have list pages and logical ancestors/descendants; directories that are not sections do not. [Hugo: Sections—overview](https://gohugo.io/content-management/sections/#overview) [Hugo: Sections—explanation](https://gohugo.io/content-management/sections/#explanation)
- A section's `.Pages` contains its immediate pages by default. `.RegularPagesRecursive` includes descendant regular pages. [Hugo: Sections—explanation](https://gohugo.io/content-management/sections/#explanation)
- Hugo selects a nested section's template using the top-level section name, not the subsection name. A subsection can select a different template by setting `type` and/or `layout` in front matter. [Hugo: Sections—template selection](https://gohugo.io/content-management/sections/#template-selection)

### URLs, permalinks, and redirects

- By default, a page's URL follows its path beneath `content`; with pretty URLs, `content/posts/post-1.md` renders at `/posts/post-1/`. [Hugo: URL management—overview](https://gohugo.io/content-management/urls/#overview)
- `_index.md` is the index for its containing directory: Hugo documents `content/posts/_index.md` as the `/posts/` section-list page. Therefore, replacing `content/articles/<article-slug>.md` with `content/articles/<article-slug>/_index.md` retains the same directory path and thus the same default `/articles/<article-slug>/` URL. [Hugo: Content organization—index pages](https://gohugo.io/content-management/organization/#index-pages-_indexmd) [Hugo: URL management—overview](https://gohugo.io/content-management/urls/#overview)
- Front matter `url` overrides an entire URL path on regular and section pages, while `slug` overrides only the final segment; `url` takes precedence when both are set. Project `permalinks` can also use date, section, hierarchy, and content-basename tokens. [Hugo: URL management—front matter](https://gohugo.io/content-management/urls/#front-matter) [Hugo: URL management—tokens and permalinks](https://gohugo.io/content-management/urls/#tokens)
- Front matter `aliases` defines previous paths for a page. By default, Hugo writes a client-side HTML redirect for each alias; `.Aliases` can instead support generated server-side redirect rules. [Hugo: URL management—aliases](https://gohugo.io/content-management/urls/#aliases)

## Repository-specific recommendation

### Recommended target structure

Use year and month branch bundles to organize the archive, with each Article represented by a leaf bundle:

```text
content/
└── articles/                                      # existing /articles/ branch bundle
    ├── _index.md
    └── 2026/
        ├── _index.md                              # year branch bundle
        └── 09/
            ├── _index.md                          # month branch bundle
            └── powershell-can-put-pictures-in-your-terminal-with-sixel/
                ├── index.md                       # Article leaf bundle
                └── cover.png                      # optional, Article-owned resource
```

The Article leaf bundle stays a regular page and therefore continues to use the existing Article single-page presentation. Because the added year and month directories would otherwise become URL segments, each migrated Article must set `url` to its established dated route, such as `/articles/2026-09-03-powershell-can-put-pictures-in-your-terminal-with-sixel/`. `slug` controls only the final URL segment and cannot preserve a route after inserting parent directories. Preserve all existing front matter and aliases. [Hugo: URL management—front matter](https://gohugo.io/content-management/urls/#front-matter) [Hugo: URL management—aliases](https://gohugo.io/content-management/urls/#aliases)

### Listing and archive behavior

Year and month branch bundles intentionally create public archive pages. A section's default `.Pages` collection contains immediate pages, while `.RegularPagesRecursive` includes regular pages beneath descendant branches. The root Articles list must paginate `.RegularPagesRecursive` to remain an all-Articles archive; the branch archives may use their own page collections. [Hugo: Sections—explanation](https://gohugo.io/content-management/sections/#explanation)

Nested branch bundles use the top-level `articles` section for template lookup. The Article leaf bundles retain single-page template selection; no Article-specific section template is required. [Hugo: Sections—template selection](https://gohugo.io/content-management/sections/#template-selection) [Hugo: Page bundles—comparison](https://gohugo.io/content-management/page-bundles/#comparison)

### Resources and existing media

Keep existing `static/images/articles` files and their root-relative references unchanged during the hierarchy migration. Moving Markdown files alone preserves those links. New Article resources may live beside an Article `index.md`; move existing assets only in a separately scoped migration and update their links or templates to use page-resource lookups. [Hugo: Page resources](https://gohugo.io/content-management/page-resources/) [Hugo: `PAGE.Resources`](https://gohugo.io/methods/page/resources/)

## Staged migration plan

1. **Inventory.** Record every flat Article path, canonical route, aliases, and references to static Article media.
2. **Prepare listings.** Update the root Article archive to use `.RegularPagesRecursive`; retain the regular-page Article template and configure the RSS output to include descendants.
3. **Pilot one Article.** Move it to `articles/YYYY/MM/slug/index.md`, preserve front matter and aliases, add its full `url`, and leave static assets in place. Confirm its canonical route, archive membership, RSS membership, taxonomy visibility, and media.
4. **Migrate in batches.** Apply the exact rename and URL contract to every dated Article. Remove each old flat source after its leaf bundle is authoritative.
5. **Verify generated output.** Compare every published Article page and alias redirect with the migration inventory; missing routes, lost root-list membership, feed omissions, or missing static assets are release blockers.
6. **Consider asset ownership separately.** After URL stability is proven, optionally move Article assets into their leaf bundles and update resource references without changing their published paths unintentionally.

## Actionable recommendation

Adopt `content/articles/YYYY/MM/<article-slug>/index.md`, with `_index.md` year and month branches. Give every migrated Article an explicit full `url` equal to its existing dated route, retain aliases and static `/images/articles/...` assets, and paginate the root archive with `.RegularPagesRecursive`. This creates useful chronological archive branches while preserving Article rendering and all established public routes. [Hugo: Page bundles](https://gohugo.io/content-management/page-bundles/) [Hugo: URL management](https://gohugo.io/content-management/urls/)
