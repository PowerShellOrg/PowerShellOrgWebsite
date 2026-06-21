---
# The directory this file lives in MUST equal Hugo's slug of your author name
# exactly as it appears in articles' `authors:` frontmatter
# (lowercase, spaces -> hyphens, punctuation dropped).
# Use `tools/new-author.ps1 "Your Name"` to scaffold this with the correct slug.

# `title` is required by Hugo. Keep it as your author name (the byline key).
title: "{{ replace .File.ContentBaseName "-" " " | title }}"

# Optional: override only how your name is *displayed* (byline + slug are unchanged).
# preferred_name: ""

# One short line shown on your card in the author list.
tagline: ""

# --- Avatar (first match wins) -------------------------------------------------
# 1. avatar:       path or URL to an image you control (bypasses Gravatar)
# 2. gravatar_hash: MD5 of your lowercased email (keeps your email out of the repo)
# 3. email:        plain email; hashed to a Gravatar at build time (stored publicly)
# If none are set, a stable identicon is generated from your name.
# avatar: ""
# gravatar_hash: ""
# email: ""

# --- Links (full URLs) ---------------------------------------------------------
# website: ""
# github: ""
# twitter: ""
# mastodon: ""
# linkedin: ""
# bluesky: ""
---

<!-- Your bio in Markdown. Shown on your profile page. -->
