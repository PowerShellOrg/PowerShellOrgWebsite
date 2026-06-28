# PowerShell.org Hugo Site

A modern, community-driven website for PowerShell enthusiasts built with Hugo and Tailwind CSS. Features podcasts, summits, learning resources, and community engagement tools.

## Features

### Core Sections
- **Home** - Hero section with community stats and latest content
- **Podcast** - Episode listings with RSS feed and subscription options
- **Summit** - Event information and registration
- **Community** - Real-time forum activity from Discourse
- **Learning** - Articles with advanced search and filtering
- **Authors** - Author profiles and article discovery

### Advanced Search & Filtering
- **Keyword Search** - Full-text search across articles
- **Author Filtering** - Browse articles by author
- **Category Filtering** - Filter by topic/category
- **Author Profiles** - Dedicated pages for each author showcasing their articles

### Dynamic Features
- RSS feeds for all sections
- Open Graph metadata for social sharing
- Mobile-responsive design
- Real-time community statistics from Discourse API
- Client-side filtering (instant search results)

## Getting Started

### Prerequisites
- Hugo v0.128+
- Node.js (for npm scripts)

### Local Development

```bash
npm install
npm run dev
```

This starts a local server at `http://localhost:1313` with hot-reload enabled and draft posts visible.

### Build for Production

```bash
npm run build
```

Generates optimized site in `public/` and `docs/` directories with minified CSS/JS and garbage collection.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── content/
│   ├── articles/          # Learning articles with author/category metadata
│   ├── authors/           # Authors directory and taxonomy
│   ├── community/         # Community section
│   ├── learning/          # Learning resources section
│   ├── podcast/           # Podcast episodes
│   ├── summit/            # Summit information
│   └── _index.md          # Home page
├── data/
│   └── community_stats.json   # Real-time forum statistics
├── themes/powershell-community/
│   ├── layouts/
│   │   ├── index.html         # Home page layout
│   │   ├── list.html          # Podcast/section layouts
│   │   ├── _default/
│   │   │   ├── baseof.html    # Base HTML template
│   │   │   ├── authors.html   # Authors directory layout
│   │   │   ├── learning.html  # Learning section with search
│   │   │   └── single.html    # Single article layout
│   │   ├── taxonomy/
│   │   │   └── author.html    # Individual author page layout
│   │   └── partials/
│   │       ├── header.html    # Navigation header
│   │       └── footer.html    # Site footer
│   └── static/                # Favicons and assets
├── hugo.yaml                  # Hugo configuration
└── package.json              # npm scripts

```

## Content Management

### Creating Articles

Create a new file in `content/articles/`:

```markdown
---
title: "Article Title"
description: "Short summary for SEO"
author: "Author Name"
date: 2025-01-14T10:00:00Z
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2"]
draft: false
---

Your article content in Markdown...
```

**Author Field** - The author name automatically creates a taxonomy entry. Visit `/authors/author-name/` to see all articles by that author.

### Creating Podcast Episodes

Create a file in `content/podcast/`:

```markdown
---
title: "Episode Title"
description: "Episode description"
date: 2025-01-14T10:00:00Z
duration: "45:30"
podcast_url: "https://podbean-url.mp3"
---

Episode show notes...
```

### Updating Configuration

Edit `hugo.yaml` to update:
- Site title and description
- Navigation menu items
- Podcast settings (title, feed URL)
- Summit details (dates, location, registration URL)
- Social media links

No rebuild needed—config changes apply immediately.

## Author System

The author taxonomy automatically:
- Creates author profile pages at `/authors/author-name/`
- Groups articles by author
- Provides author directory at `/authors/`
- Enables author filtering on Learning page

**To add a new author:** Simply include `author: "Name"` in article front matter.

## Search & Filtering

### Learning Page
- **Search bar** - Searches article titles and content
- **Author dropdown** - Filter to articles by specific author
- **Category dropdown** - Filter by topic
- Combined filters work together (AND logic)

### Authors Page
- **Search bar** - Filter authors by name
- Click author cards to view their profile

### Author Profile Pages
- Lists all articles by that author
- Pagination support for large author catalogs

## Customization

### Theme Colors
- **Primary** - Blue (`#0078D4`, `#00BCF2`)
- **Podcast** - Purple (`#667eea`, `#764ba2`)
- **Learning** - Green
- **Summit** - Purple gradient

Edit `baseof.html` CSS to customize.

### Tailwind CSS
Styling uses Tailwind CSS utility classes. The site ships a **purged, self-hosted**
build (`assets/css/tailwind.css`, ~35 KB) instead of the full ~2.9 MB CDN file —
only the utility classes actually used anywhere in the built output are retained.

If you add a **new** Tailwind class in a template or content file, regenerate the
purged stylesheet and commit it:

```bash
npm install        # one-time, for the purgecss devDependency
npm run build:css  # rebuilds assets/css/tailwind.css (see scripts/build-tailwind.mjs)
```

You will notice a missing class immediately in `npm run dev` (dev serves the same
purged file). Classes injected only at build time (e.g. activity-dot colors from
`data/community_stats.json`) are pinned via the safelist in `purgecss.config.cjs`.
The CI deploy builds run bare `hugo`, so the committed file is what ships.

### Layouts
- Modify layouts in `themes/powershell-community/layouts/`
- Hot-reload works in development mode
- Use Hugo template functions: `.Title`, `.Content`, `range .Pages`, `.Permalink`

## Data Sources

### Community Statistics
`data/community_stats.json` contains:
- Recent forum activities
- Total topics/posts/users
- Weekly activity metrics
- Last updated timestamp

Access in templates: `{{ .Site.Data.community_stats.stats.total_topics }}`

## Build & Deployment

### GitHub Pages
Site builds to both `public/` and `docs/` directories for GitHub Pages compatibility.

### RSS Feeds
Automatically generated for:
- Home page: `/index.xml`
- Sections: `/[section]/index.xml`
- Taxonomies: `/authors/index.xml`, `/categories/index.xml`, `/tags/index.xml`

Configure in `hugo.yaml` `outputs` section.

## Contributing

To contribute articles or improvements:

1. Fork the repository
2. Create a feature branch
3. Add your content to `content/articles/` with proper front matter
4. Test locally with `npm run dev`
5. Submit a pull request

## Troubleshooting

### Draft Posts Not Showing
Use the `-D` flag: `npm run dev` (already configured)

### Old Hugo Pagination Syntax Error
This site uses Hugo v0.128+ pagination v2 syntax. Don't use `{{ .Paginate }}` without assignment.

### Broken Links
Use Hugo functions instead of hardcoding:
- `.Permalink` - Current page URL
- `.RelRef "path/to/page"` - Relative URL
- `.Site.BaseURL` - Site base URL

### Community Stats Not Updating
Check `data/community_stats.json` format and `last_updated` timestamp.

## Dependencies

- **Hugo**: v0.128+ with Goldmark renderer
- **Node.js**: For npm scripts
- **Tailwind CSS**: v2.2.19 (purged + self-hosted via `npm run build:css`)
- **Inter**: self-hosted from `assets/fonts/` (`@font-face`, no Google Fonts)
- **FontAwesome**: v6.0.0 (via CDN)
- **Alpine.js**: v3.10.2 (via CDN)

## License

[Specify your license here]

## Support

For issues or questions, visit:
- **Forums**: https://forums.powershell.org
- **GitHub Issues**: [Add your issues URL]
- **Slack**: https://aka.ms/psdiscord
