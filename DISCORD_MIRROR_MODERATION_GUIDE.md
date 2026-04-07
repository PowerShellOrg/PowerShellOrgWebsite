# Discord Mirror Moderation Guide (v5)

This version adds practical publication controls so PowerShell.org can expose selected Discord content on the public web without blindly dumping channel history.

## Controls available

### 1. Channel allowlist
Only channels listed in `config/discord-mirror.json` are processed.

### 2. Per-channel moderation mode
Each channel can choose one of these modes:

- `all`
- `reaction`
- `prefix`
- `author-role`
- `any`

### 3. Minimum message age
`minMessageAgeMinutes` delays publication so moderators have time to correct or remove content.

Examples:
- `60` for announcements
- `1440` for support highlights
- `10080` for weekly editorial review

### 4. Regex filters
Use `excludeRegex` to suppress command spam, bot command invocations, or unwanted patterns.
Use `includeRegex` to only publish messages that match a known format.

### 5. Optional thread capture
`includeThreads` can be enabled per channel, but it is off by default because the current target is mostly normal text channels.

## Suggested policies for PowerShell.org

### Announcements
- moderation: `all`
- age: `60`
- threads: `false`

### Help highlights
- moderation: `reaction`
- reaction: `✅`
- age: `1440`
- threads: `false`

### Moderator summaries
- moderation: `prefix`
- prefix: `[publish]`
- age: `60`
- threads: `false`

### Staff-only publisher channel
- moderation: `author-role`
- roles: `Moderator`, `Admin`, `Discord Team`
- age: `60`
- threads: `false`

## Recommended rollout

Start with one low-risk channel such as announcements, verify output, then add one curated help channel using `reaction` mode.

That gives you a public knowledge layer instead of a public transcript of everyone's stream of consciousness.
