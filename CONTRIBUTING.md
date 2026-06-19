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

## Submitting a Community Event

Add your PowerShell-related event to our community calendar:

1. Go to [New Event](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new?template=community-event.yml)
2. Fill out the event details
3. A maintainer will add it to the calendar

## Reporting Issues

Found a bug or broken link? [Open an issue](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new) and let us know.

## Code of Conduct

Be kind, be helpful, be respectful. We're all here because we love PowerShell.
