# PowerShell.org Website

The community website for [PowerShell.org](https://powershell.org), built with
Hugo and Tailwind CSS. It hosts podcasts, summit info, learning articles, author
profiles, community resources, and landing pages for the open-source modules
PowerShell.org stewards.

## Want to contribute content?

You're in the right place — most contributions don't require running the site at
all. **[`CONTRIBUTING.md`](CONTRIBUTING.md)** walks you through each one:

- **Write a guest blog post** — submit a Markdown article via a GitHub issue form
  or a pull request to `content/articles/`.
- **Add your author profile** — an avatar, bio, and links on your `/authors/<you>/`
  page. Profiles are opt-in; your byline works without one.
- **Submit a community event** — get your PowerShell event onto the calendar.
- **Report a bug or broken link** — open an issue.

The easiest paths (blog post, event) are **GitHub issue forms** — no Git, no local
setup. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the templates and front-matter.

### Previewing your content locally (optional)

If you'd like to see your article before submitting:

```bash
npm install
npm run dev
```

This serves the site at `http://localhost:1313` with hot-reload and draft posts
visible. Save your Markdown file and the browser updates automatically.

### Syncing Meetup user-group events

The Community Calendar automatically syncs upcoming events from Meetup links
in [`content/user-groups/`](content/user-groups/). Add a group's Meetup URL to
its `links` front matter, then verify its public
`https://www.meetup.com/<urlname>/events/ical/` feed contains the intended
events. The scheduled **Sync Meetup Events** workflow reads that public feed
and its linked event pages; no Meetup API key or OAuth token is required.

To preview the generated calendar changes locally without writing files:

```bash
node .github/scripts/sync-meetup-events.mjs --dry-run
```

## What the site includes

- **Home** — community stats and the latest content.
- **Podcast** — episodes for The PowerShell Podcast and the archived PowerScripting
  Podcast, with RSS feeds.
- **Summit** — event information and registration.
- **Community** — forum activity from Discourse.
- **Learning** — articles with keyword, author, and category search.
- **Authors** — author profiles and per-author article listings.
- **Modules** — landing pages for org-stewarded modules (e.g. Plaster, PSDepend).

## Modifying the site itself?

Anything beyond adding content — theme and layout changes, the Tailwind/Font Awesome
asset pipeline, the build, deployment, RSS, or the Discord mirror — is covered in
the **developer documentation**:

- **[`docs/`](docs/README.md)** — developer docs index.
- **[`docs/development.md`](docs/development.md)** — build, theme, assets, deploy,
  and troubleshooting.
- **[`docs/adr/`](docs/adr/)** — architecture decision records (the *why*).
- **[`CONTEXT.md`](CONTEXT.md)** — the project's shared vocabulary; read it before
  naming things or changing how content is modeled.

## Support

- **Forums**: https://forums.powershell.org
- **Discord**: https://aka.ms/psdiscord
- **GitHub Issues**: https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues
