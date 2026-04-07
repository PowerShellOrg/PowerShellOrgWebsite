# Discord Mirror Deployment Guide for PowerShell.org

This repository contains a PowerShell-based Discord mirror that publishes selected Discord channel content into the Hugo site under `/discord/`.

## What this does

- Pulls messages from **specific allowlisted channels** in the PowerShell.org Discord server.
- Applies **moderation controls** before any content is published.
- Generates Hugo content pages in `content/discord/`.
- Generates search assets in `static/discord/`.
- Leaves all attachments and images hosted by Discord and links back to them.

## Required GitHub secret

Add this repository secret:

- `DISCORD_BOT_TOKEN`

## Required config updates

Edit `config/discord-mirror.json`:

- Replace `discord.guildId`
- Replace each placeholder channel ID
- Tune moderation mode per channel
- Tune `minMessageAgeMinutes` per channel
- Optionally adjust regex filters

## Recommended moderation modes

### `all`
Publish everything in that channel after the minimum age filter.

Use for:
- announcements
- release channels
- moderator-curated channels only

### `reaction`
Only publish messages that have the approval reaction, such as ✅.

Use for:
- help channels
- showcase channels
- Q&A highlights

### `prefix`
Only publish messages whose content starts with a configured prefix, such as `[publish]`.

Use for:
- moderator repost channels
- copy-edited summaries

### `author-role`
Only publish messages authored by users with one of the configured role names.

Use for:
- staff summaries
- trusted publisher channels

### `any`
Publish a message if any of the enabled approval mechanisms match.

Use for:
- flexible moderation workflows

## Workflow behavior

- On `main` branch pushes, the workflow runs the Discord exporter if `DISCORD_BOT_TOKEN` is present.
- On pull requests or when the secret is missing, the Hugo build still runs but the Discord export step is skipped.

## Validation checklist

1. Confirm the bot can read the selected channels.
2. Confirm the bot can read message history.
3. Confirm `https://powershell.org/discord/` renders.
4. Confirm `https://powershell.org/discord/search/` loads search results.
5. Confirm no private or unapproved messages appear.
6. Confirm attachment links point to Discord URLs.

## Operational advice

Do not point this at high-noise general chat and hope for the best. That is how you build a searchable landfill.
