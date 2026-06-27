---
title: How to Write for PowerShell.org
authors:
  - Gilbert Sanchez
date: 2026-06-23T00:00:00+00:00
description: Two ways to submit an article to PowerShell.org, best practices that get you published faster, and why claiming an author page is worth five minutes of your time.
og_title: How to Write for PowerShell.org
og_description: Two ways to submit an article, best practices that get you published faster, and why claiming an author page is worth your time.
categories:
  - Tutorials
tags:
  - Contributing
  - Community
  - Writing
fmContentType: article
---

There's a thought that stops a lot of good articles: *who am I to write for
PowerShell.org?*

It's our brains safety net from the (highly unlikely) possibility of getting
denied. Or worse! Accepted! And now we're forever on the hook to be an expert.
But it's not true.

You don't need to be an **MVP**. You don't need a **blog**, a **following**, or
a **clever opinion** about the pipeline. You need one thing you figured out that
the documentation didn't explain well. The `-Filter` quirk that cost you and
afternoon. The script that finally tamed a chore you'd been doing by hand for a
year. If it helped you, it'll help someone else who's about to lose the same
afternoon.

> [!IMPORTANT]
> And here's the part that should lower your blood pressure: **nothing you submit
> goes live unreviewed**.

A maintainer reads every submission, helps shape it, and
edits for clarity and formatting before it publishes. You are not flipping a
switch that broadcasts your rough draft to the world. You're starting a
conversation with people who want you to succeed.

So let's get you published. There are two ways in, so pick the one that matches
how comfortable you are with Git because both land in the same place.

## Path A: The GitHub issue (no Git required)

If "fork the repo" already made you tense up, this path is for you. You'll never
touch a command line.

Open the [guest blog post
form](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new?template=guest-blog-post.yml)
and fill it out. The form does the structuring for you. It asks for exactly what
we need and nothing else:

- **Article title** and **your name** as you'd like it displayed.
- **Submission type**, and this is the part people miss: you can choose *"Pitch
  -- I'd like feedback before writing."* You don't have to show up with a
  finished draft. Float the idea first, and a maintainer will tell you if it's a
  fit and help you shape the angle before you spend the writing time.
- **Description**, one or two sentences. This becomes your SEO blurb and social
  card, so it earns its keep.
- **Category** and **tags** (more on choosing these well below).
- **Article content**, where you paste your full Markdown if you have a draft.
  Leave it blank if you're pitching.

Submit it, and the rest happens in the issue thread. That's the whole path. No
branches, no merge conflicts, no Git vocabulary.

## Path B: The pull request (for the Git-comfortable)

If you already live in Git, you can submit the article directly and watch it
flow through the same review.

1. Fork the repo and create a branch for your article.
2. Add a Markdown file in `content/articles/` using the date-slug naming
   convention:

   ```
   content/articles/YYYY-MM-DD-your-article-slug.md
   ```

3. Start it with this front matter:

   ```markdown
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

   Your article in Markdown goes here.
   ```

4. Open a pull request with a short description, and we'll review it there.

> [!TIP] Let VS Code do the boring part!
> Install the [Front Matter CMS](https://frontmatter.codes/) extension, open the
> repo, and run **"Create content"** in the `content/articles` folder. It
> scaffolds the `YYYY-MM-DD-slug.md` filename and every front-matter field for
> you, and it gives you a form for the title, description, category, and tags
> instead of a wall of YAML you can typo. It turns the single most error-prone
> step into a fill-in-the-blanks. If you only adopt one tool from this article,
> make it this one.

## Best practices that get you published faster

None of these are gates. They're the small things that mean a maintainer spends
their time on your ideas instead of your formatting.

- **Open by telling readers what they'll walk away with.** A two-sentence intro
  that promises a payoff beats a warm-up paragraph every time.
- **Write in Markdown, and fence your code with a language hint.** Use `
  ```powershell ` so your samples get syntax highlighting instead of a gray
  slab.
- **Run your code before you paste it.** A snippet that works on the first try
  is the difference between a reader trusting you and a reader closing the tab.
- **Keep the title concrete.** "Speed up your console with PSReadLine predictive
  IntelliSense" tells me what I'm getting. "PowerShell tips" tells me nothing.

That's the bar. It's lower than the one in your head.

## Categories and tags are how people find you

It's tempting to treat these as paperwork and pick whatever's first in the list.
Don't. They're the difference between an article that's read once and one that
keeps getting found.

Pick the single **category** that fits best. The current set:

> Announcements - Books - DevOps - Events - Graph - In Case You Missed It -
> News - PowerShell Summit - PowerShell for Admins - PowerShell for Developers -
> Scripting Games - Tips and Tricks - Tools - Training - Tutorials

Category is the big bucket. It's how someone browsing "PowerShell for Admins"
stumbles onto your piece months from now. **Tags** are the specific hooks: the
cmdlets, modules, and concepts your article actually touches (`psreadline`,
`regex`, `azure`, `pester`). Three to five honest, specific tags beat a dozen
vague ones. Tag what's really in the article, not every PowerShell word you can
think of, and your post surfaces next to its actual neighbors.

## Claim your author page

Once you're credited on an article, you can give yourself a real author page at
`/authors/<your-name>/`: an avatar, a tagline, a short bio, and links back to
your own site and socials. Every article you write points back to it. It's a
small, durable corner of the PowerShell community that's *yours*, and it builds
with each post.

It's opt-in. Skip it and your byline still works exactly as before. But it takes
about five minutes, so why leave it on the table? You can see an example of mine
at the bottom.

Your profile is a single file at `content/authors/<slug>/_index.md`. The one
rule that trips people up: the `<slug>` has to match your byline exactly
(lowercased, spaces to hyphens), or the page attaches to nothing.

So let the helper script handle it:

{{< terminal lang="powershell" >}}
./tools/new-author.ps1 "Jane Doe"
{{< /terminal >}}

That scaffolds `content/authors/jane-doe/_index.md` with every field commented.
Fill in what you want, delete the rest:

```yaml
---
title: "Jane Doe"           # required -- keep this as your byline name
preferred_name: "Jane"      # optional -- changes only how your name displays
tagline: "Cloud automation, mostly."
gravatar_hash: "..."        # MD5 of your lowercased email -- keeps your email private
github: "https://github.com/janedoe"
website: "https://janedoe.dev"
# twitter / mastodon / linkedin / bluesky also supported
---

Your bio in Markdown goes here.
```

One thoughtful detail worth calling out: you can set an avatar **without**
putting your email address in a public repo. Store the MD5 hash of your
lowercased email as `gravatar_hash`, and Gravatar serves your picture while your
email stays private:

{{< terminal lang="powershell" >}}
$email = "jane@example.com"
[System.BitConverter]::ToString(
  [System.Security.Cryptography.MD5]::Create().ComputeHash(
    [System.Text.Encoding]::UTF8.GetBytes($email.Trim().ToLowerInvariant())
  )
).Replace("-", "").ToLowerInvariant()
{{< /terminal >}}

And if your name ever changes, `./tools/new-author.ps1 "Old Name" -To "New Name"`
rewrites your byline across every article and adds a redirect so your old
profile URL keeps working. Open a PR with the result.

## Your turn

The whole point of PowerShell.org is that it's built by the people who use
PowerShell, and that includes you. You don't have to be sure it's good enough.
That's literally what the review is for. Pitch the idea, paste the draft, or
send the PR, and you won't be doing it alone. There's a community on the other
side of that submit button that wants to help you get it across the line.

[Start here.](https://github.com/PowerShellOrg/PowerShellOrgWebsite/issues/new?template=guest-blog-post.yml)
