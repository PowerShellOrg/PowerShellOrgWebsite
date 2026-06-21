# PowerShell.org Website

The community website for PowerShell.org, built with Hugo and Tailwind CSS. Hosts
podcasts, summit info, learning articles, community resources, and dedicated landing
pages for the open-source Modules that PowerShell.org stewards.

## Language

**Module**:
A PowerShell module that PowerShell.org stewards as an open-source project (e.g.
Plaster, PSDepend), given a dedicated landing page under `/modules/`. Capitalized
and used as a site section, "Module" means specifically these org-stewarded projects
— not the generic sense of "any PowerShell module you `Install-Module`", which is the
subject of the site as a whole.
_Avoid (for this concept)_: project, tool, package

**Author**:
A person credited as a contributor to site content (articles, podcast episodes) via
the `authors:` frontmatter. Each distinct Author is surfaced as a taxonomy term with
its own profile page, and may optionally describe themselves (avatar, tagline, bio,
links). An Author exists the moment they are credited on a piece of content; the
self-description is optional enrichment, not what makes someone an Author.
_Avoid (for this concept)_: contributor, writer, user, account

The **author name** stored in `authors:` frontmatter is both the display byline and
the source of the Profile URL slug — it is the stable key. An Author may additionally
set a **preferred name** on their Profile, which overrides only how their name is
*displayed*; it never changes the slug or the byline key. Authors without a Profile
display their author name unchanged.

**Profile**:
The per-Author page at `/authors/<name>/` listing that Author's content and, when
provided, their self-description. Distinct from the **Author list** — the index page
at `/authors/` showing every Author as a card.
