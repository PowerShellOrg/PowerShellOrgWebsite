#requires -Version 7
<#
.SYNOPSIS
  Enrich The PowerShell Podcast episodes with episode/youtube frontmatter (Workstream 2).

.DESCRIPTION
  Operates only on modern episodes - those whose podcast_url is hosted on
  mcdn.podbean.com (The PowerShell Podcast; PowerScripting episodes on libsyn are
  left untouched). For each, two frontmatter fields are inserted after podcast_url:

    - episode: parsed from the podcast_url filename (episode[_- ]NNN). 217/220 set;
               three Summit/bar-session specials carry no number in the URL and are
               left blank by design.
    - youtube: the 11-char id of the episode's OWN YouTube video, taken from the
               body. Only high-confidence links are used (the canonical
               "...on YouTube: <url>" line, a handful of explicit "video version
               here" framings, and youtube.com/live links). Resource links to other
               videos are deliberately ignored, so a miss degrades to a blank field
               (Workstream 5 falls back to the icon) rather than a wrong embed.

  guid is intentionally NOT written: the Podbean feed is truncated to its 10 most
  recent items (currently eps 226-235) and the archive tops out at ep 220, so no
  existing file appears in the feed window. guid starts being recorded by the
  ongoing-sync Action (Workstream 4), not here. See docs/adr/0003.

  Dry run by default. Pass -Apply to write changes. Re-running is idempotent: any
  existing episode/youtube/guid lines are stripped and rewritten from source.

.EXAMPLE
  pwsh scripts/enrich-podcast-frontmatter.ps1            # dry run
  pwsh scripts/enrich-podcast-frontmatter.ps1 -Apply     # write changes
#>
[CmdletBinding()]
param(
    [switch]$Apply,
    [string]$PodcastDir = (Join-Path $PSScriptRoot '..' 'content' 'podcast')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Modern episode = audio served from Podbean.
$ModernUrl   = [regex]'(?m)^podcast_url:\s*"?https?://mcdn\.podbean\.com'
$FrontMatter = [regex]'(?s)^(---\r?\n)(.*?)(\r?\n---\r?\n)'
$UrlLine     = [regex]'(?m)^podcast_url:\s*"?(?<u>[^"\r\n]+)'
$PodcastLine = [regex]'(?m)^podcast_url:[^\r\n]*\r?\n?'
# Strip any prior enrichment so re-runs are idempotent.
$EnrichLine  = [regex]'(?m)^(?:episode|youtube|guid):[^\r\n]*\r?\n?'

# --- Episode number ---------------------------------------------------------
$EpGreedy = [regex]'(?i)episode[_\- ]?(\d{1,3})'
# The eight earliest episodes encode the number as a single leading digit glued to
# a random Podbean suffix (e.g. "episode_363s8e" is ep 3, not 363; "Episode_19di8t"
# is ep 1, not 19). Resolved by chronological order (eps 1-8 precede the first clean
# "episode_9_Sean_Wheeler" URL). Greedy parsing over-reads these, so they are pinned.
$EpOverride = @{
    '2022-03-23-the-power-of-shell-compels-you.md'                        = 1
    '2022-03-25-stop-typing-so-much.md'                                   = 2
    '2022-03-25-james-friggen-petty-microsoft-mvp.md'                     = 3
    '2022-03-25-chatting-about-chatbots-with-mike-kanakos-microsoft-mvp.md' = 4
    '2022-04-04-nobody-keeps-a-secret-like-powershell.md'                 = 5
    '2022-04-11-dbatools-with-jess-pomfret.md'                            = 6
    '2022-04-18-this-title-is-not-psremotely-clever.md'                   = 7
    '2022-04-25-securing-powershell-with-fred-weinmann.md'                = 8
}
# Summit / bar-session specials with no episode number in the URL. Left blank.
$EpBlank = @(
    '2022-04-27-powershell-devops-global-summit-powershell-after-dark.md'
    '2023-04-27-the-powershell-podcast-powershell-and-devops-global-summit-the-bar-sessions.md'
    '2025-04-08-the-powershell-podcast-powershell-summit-bar-sessions-2025-steven-judd.md'
)

function Get-Episode([string]$name, [string]$leaf) {
    if ($EpOverride.ContainsKey($name)) { return $EpOverride[$name] }
    if ($EpBlank -contains $name)       { return $null }
    $m = $EpGreedy.Match($leaf)
    if ($m.Success) { return [int]$m.Groups[1].Value }
    return $null
}

# --- YouTube id -------------------------------------------------------------
# Match the episode's own video only. Three signals, in priority order:
$YtUrl   = '(?:youtu\.be/|youtube\.com/watch\?v=|youtube\.com/live/)([A-Za-z0-9_\-]{11})'
$YtCanon = [regex]("(?im)on\s+Yo[ou]?Tube[^\r\n]*?$YtUrl")   # "...Podcast on YouTube: <url>"
$YtTriggers = @(
    'video\s+version\s+here'
    'video\s+recording\s+here'
    'YouTube\s+version'
    'Watch\s+The\s+PowerShell\s+Podcast'
    'PowerShell\s+Podcast\s+YouTube'
    '^[ \t]*YouTube:'
)
$YtTrig = [regex]("(?im)(?:" + ($YtTriggers -join '|') + ")[^\r\n]*?$YtUrl")
$YtLive = [regex]'(?im)youtube\.com/live/([A-Za-z0-9_\-]{11})'

function Get-Youtube([string]$raw) {
    foreach ($re in @($YtCanon, $YtTrig, $YtLive)) {
        $m = $re.Match($raw)
        if ($m.Success) { return $m.Groups[1].Value }
    }
    return $null
}

# --- Main -------------------------------------------------------------------
$files = Get-ChildItem -LiteralPath $PodcastDir -Filter *.md -File |
    Where-Object { $ModernUrl.IsMatch([IO.File]::ReadAllText($_.FullName)) }

$updated = 0; $unchanged = 0; $errors = 0; $epSet = 0; $ytSet = 0
foreach ($f in $files) {
    try {
        $raw = [IO.File]::ReadAllText($f.FullName)
        $fm = $FrontMatter.Match($raw)
        if (-not $fm.Success) { Write-Warning "no frontmatter: $($f.Name)"; $errors++; continue }
        $block = $fm.Groups[2].Value

        $leaf = ($UrlLine.Match($raw).Groups['u'].Value) -replace '.*/', ''
        $ep = Get-Episode $f.Name $leaf
        $yt = Get-Youtube $raw

        # Preserve the file's existing newline style.
        $nl = if ($raw -match "`r`n") { "`r`n" } else { "`n" }
        $add = ''
        if ($null -ne $ep) { $add += "episode: $ep$nl" }
        if ($yt)           { $add += "youtube: $yt$nl" }

        # Rebuild the block: drop any prior enrichment, then insert after podcast_url.
        $newBlock = $EnrichLine.Replace($block, '')
        $newBlock = $PodcastLine.Replace($newBlock, { param($m) $m.Value + $add }, 1)

        if ($newBlock -eq $block) { $unchanged++; continue }

        $changed = $fm.Groups[1].Value + $newBlock + $fm.Groups[3].Value + $raw.Substring($fm.Index + $fm.Length)

        if ($null -ne $ep) { $epSet++ }
        if ($yt)           { $ytSet++ }
        Write-Host ("[{0}] {1}" -f $(if ($Apply) { 'WRITE' } else { 'DRY' }), $f.Name) -ForegroundColor Cyan
        Write-Host ("    episode: {0,-5} youtube: {1}" -f $(if ($null -ne $ep) { $ep } else { '-' }), $(if ($yt) { $yt } else { '-' }))

        if ($Apply) {
            $enc = [System.Text.UTF8Encoding]::new($false)
            [IO.File]::WriteAllText($f.FullName, $changed, $enc)
        }
        $updated++
    }
    catch {
        Write-Warning "error on $($f.Name): $_"
        $errors++
    }
}

Write-Host ('=' * 60)
Write-Host ("{0}: {1}" -f $(if ($Apply) { 'Updated' } else { 'Would update' }), $updated)
Write-Host "  episode set: $epSet   youtube set: $ytSet"
Write-Host "Unchanged: $unchanged"
Write-Host "Errors: $errors"
if (-not $Apply -and $updated -gt 0) { Write-Host "`nRe-run with -Apply to write." -ForegroundColor Yellow }
