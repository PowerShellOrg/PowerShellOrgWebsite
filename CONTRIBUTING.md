# Contributing to PowerShell.org

Thanks for your interest in contributing! There are two main ways to contribute content.

## Submitting a Guest Blog Post

### Option A: Submit via GitHub Issue (easiest)

If you're not comfortable with Git, you can pitch or submit your article through our issue template:

1. Go to [New Issue](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new?template=guest-blog-post.yml)
2. Fill out the form with your article title, summary, and content
3. A maintainer will review and publish it

### Option B: Submit via Pull Request

1. Fork this repository
2. Create a new branch for your article
3. Add your article as a Markdown file in `content/articles/` using this naming convention:

   ```
   content/articles/YYYY-MM-DD-your-article-slug.md
   ```

4. Use this front matter template:

   ```yaml
   ---
   title: "Your Article Title"
   description: "A 1-2 sentence summary used for SEO, social cards, and the article list."
   author: Your Name
   authors:
     - Your Name
   date: "YYYY-MM-DDT00:00:00+00:00"
   categories:
     - Category Name
   tags:
     - tag1
     - tag2
   ---

   Your article content in Markdown goes here.
   ```

   > Tip: If you have the [Front Matter CMS](https://frontmatter.codes/) extension
   > installed in VS Code, run **"Create content"** in the `content/articles`
   > folder — it scaffolds the file name (`YYYY-MM-DD-slug.md`) and all of the
   > front matter fields above for you.

5. Submit a pull request with a brief description of your article

### Writing Tips

- Write in Markdown
- Use fenced code blocks with language hints (e.g., ` ```powershell `) for code samples
- Keep titles concise and descriptive
- Include a brief intro that tells readers what they'll learn
- Test any code examples before submitting

## Adding Your Author Profile

Once you've been credited as an author, you can give yourself a richer profile page at
`/authors/<your-name>/` — an avatar, a tagline, social links, and a bio. Profiles are
**opt-in**: if you don't add one, your name still works as a byline exactly as before.

Your profile lives in a single file at `content/authors/<slug>/_index.md`, where `<slug>`
**must** match your name as it appears in articles' `authors:` front matter (lowercased,
spaces become hyphens, punctuation dropped — e.g. `Jane Doe` → `jane-doe`). Getting the
slug wrong creates a page that attaches to nothing, so let the helper script do it:

```powershell
./tools/new-author.ps1 "Jane Doe"
```

This scaffolds `content/authors/jane-doe/_index.md` with every field commented. Fill in
what you want and delete the rest:

```yaml
---
title: "Jane Doe"           # required — keep this as your byline name
preferred_name: "Jane"      # optional — changes only how your name is displayed
tagline: "Cloud automation, mostly."
# --- Avatar (first one set wins) ---
# avatar: "/images/authors/jane.jpg"   # an image you host in this repo
gravatar_hash: "..."        # MD5 of your lowercased email — keeps your email private
# email: "jane@example.com" # convenient, but stored publicly in this repo
# --- Links (full URLs) ---
github: "https://github.com/janedoe"
website: "https://janedoe.dev"
# twitter / mastodon / linkedin / bluesky also supported
---

Your bio in Markdown goes here. It shows on your profile page.
```

### Choosing an avatar

The avatar is resolved in this order: `avatar` → `gravatar_hash` → `email` → an
auto-generated identicon. To use [Gravatar](https://gravatar.com/) without putting your
email in the repo, store the **MD5 hash** of your lowercased email instead:

```powershell
$email = "jane@example.com"
[System.BitConverter]::ToString(
  [System.Security.Cryptography.MD5]::Create().ComputeHash(
    [System.Text.Encoding]::UTF8.GetBytes($email.Trim().ToLowerInvariant())
  )
).Replace("-", "").ToLowerInvariant()
```

### Changed your name?

If your byline ever needs to change across all your content (and your profile URL), use:

```powershell
./tools/new-author.ps1 "Old Name" -To "New Name"
```

This rewrites the byline everywhere it appears and adds a redirect so your old profile
URL keeps working. Open a PR with the result.

## Submitting a Community Event

Add your PowerShell-related event to our community calendar:

1. Go to [New Event](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new?template=community-event.yml)
2. Fill out the event details
3. A maintainer will add it to the calendar

## Reporting Issues

Found a bug or broken link? [Open an issue](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new) and let us know.

## Code of Conduct

Be kind, be helpful, be respectful. We're all here because we love PowerShell.
