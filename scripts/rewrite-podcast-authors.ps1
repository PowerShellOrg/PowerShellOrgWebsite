#requires -Version 7
<#
.SYNOPSIS
  Rewrite host attribution on The PowerShell Podcast episodes (Workstream 1).

.DESCRIPTION
  Operates only on modern episodes - those whose podcast_url is hosted on
  mcdn.podbean.com (The PowerShell Podcast; PowerScripting episodes on libsyn are
  left untouched). For each:

    - author:  -> Andrew Pla (the byline)
    - authors: -> replace "James Petty" with "Andrew Pla"; insert "Jordan Hammond"
                  when date <= 2023-12-25 (the "Farewell to Jordan" cutoff); keep
                  every existing guest; dedupe; Andrew first, then Jordan, then guests.

  Dry run by default. Pass -Apply to write changes.

.EXAMPLE
  pwsh scripts/rewrite-podcast-authors.ps1            # dry run
  pwsh scripts/rewrite-podcast-authors.ps1 -Apply     # write changes
#>
[CmdletBinding()]
param(
    [switch]$Apply,
    [string]$PodcastDir = (Join-Path $PSScriptRoot '..' 'content' 'podcast')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$HOST_NAME    = 'Andrew Pla'
$COHOST_NAME  = 'Jordan Hammond'
$COHOST_UNTIL = [datetime]'2023-12-25'

# Episodes where "James Petty" is the featured GUEST, not the migration's
# host placeholder. Here James is preserved as a guest and Andrew is added as
# host, instead of James being remapped to Andrew. (James Brundage episodes are
# a different person and are not affected.)
$JamesIsGuest = @(
    '2022-03-25-james-friggen-petty-microsoft-mvp.md'
    '2022-12-05-the-return-of-james-petty-with-james-petty.md'
    '2023-11-27-the-powershell-podcast-powershell-summit-more-a-chat-with-james-petty.md'
    '2024-08-12-the-powershell-podcast-techmentor-highlights-greg-altman-mike-nelson-and-james-petty-share-powershell-wisdom.md'
    '2025-08-18-the-powershell-podcast-live-from-techmentor-profiles-people-and-powershell-progress-with-sean-wheeler-and-james-petty.md'
)

# Modern episode = audio served from Podbean.
$ModernUrl = [regex]'(?m)^podcast_url:\s*"?https?://mcdn\.podbean\.com'
$FrontMatter = [regex]'(?s)^(---\r?\n)(.*?)(\r?\n---\r?\n)'
$DateLine    = [regex]'(?m)^date:\s*"?(\d{4}-\d{2}-\d{2})'
$AuthorLine  = [regex]'(?m)^author:[ \t]*.+$'
$AuthorsBlk  = [regex]'(?m)^authors:[ \t]*\r?\n(?<items>(?:[ \t]*-[ \t]*.+\r?\n?)+)'
$ItemValue   = [regex]'(?m)^[ \t]*-[ \t]*(.+?)[ \t]*$'

function Get-AuthorsList([string]$itemsBlock) {
    $names = foreach ($m in $ItemValue.Matches($itemsBlock)) {
        $m.Groups[1].Value.Trim().Trim('"').Trim("'")
    }
    , @($names)
}

function Build-NewAuthors([string[]]$current, [bool]$early, [bool]$preserveJames) {
    # Map the mis-attributed host, then order: host, (co-host), guests.
    # When James is the guest, keep him as-is and just add Andrew as host.
    $mapped = foreach ($n in $current) {
        if ($n -eq 'James Petty' -and -not $preserveJames) { $HOST_NAME } else { $n }
    }
    $ordered = [System.Collections.Generic.List[string]]::new()
    $ordered.Add($HOST_NAME)
    if ($early) { $ordered.Add($COHOST_NAME) }
    foreach ($n in $mapped) { $ordered.Add($n) }

    # Dedupe, preserve first occurrence (case-insensitive).
    $seen = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
    $result = foreach ($n in $ordered) { if ($n -and $seen.Add($n)) { $n } }
    , @($result)
}

$files = Get-ChildItem -LiteralPath $PodcastDir -Filter *.md -File |
    Where-Object { $ModernUrl.IsMatch([IO.File]::ReadAllText($_.FullName)) }

$updated = 0; $unchanged = 0; $errors = 0
foreach ($f in $files) {
    try {
        $raw = [IO.File]::ReadAllText($f.FullName)
        $fm = $FrontMatter.Match($raw)
        if (-not $fm.Success) { Write-Warning "no frontmatter: $($f.Name)"; $errors++; continue }
        $block = $fm.Groups[2].Value

        $dm = $DateLine.Match($block)
        if (-not $dm.Success) { Write-Warning "no date: $($f.Name)"; $errors++; continue }
        $early = ([datetime]$dm.Groups[1].Value -le $COHOST_UNTIL)

        $am = $AuthorsBlk.Match($block)
        $current = if ($am.Success) { Get-AuthorsList $am.Groups['items'].Value } else { @() }
        $preserveJames = $JamesIsGuest -contains $f.Name
        $new = Build-NewAuthors $current $early $preserveJames

        # Preserve the file's existing newline style so we don't introduce mixed EOLs.
        $nl = if ($raw -match "`r`n") { "`r`n" } else { "`n" }
        $newBlockText = "authors:$nl" + (($new | ForEach-Object { "  - $_" }) -join $nl) + $nl

        $newBlock = $block
        $newBlock = $AuthorLine.Replace($newBlock, "author: $HOST_NAME", 1)
        if ($am.Success) {
            $newBlock = $AuthorsBlk.Replace($newBlock, $newBlockText, 1)
        }

        if ($newBlock -eq $block) { $unchanged++; continue }

        $changed = $fm.Groups[1].Value + $newBlock + $fm.Groups[3].Value + $raw.Substring($fm.Index + $fm.Length)

        $tag = if ($early) { '+Jordan' } else { 'solo' }
        Write-Host "[$(if($Apply){'WRITE'}else{'DRY'})] $($f.Name)  ($tag)" -ForegroundColor Cyan
        Write-Host "    before: $($current -join ', ')"
        Write-Host "    after:  $($new -join ', ')"

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
Write-Host "Already correct: $unchanged"
Write-Host "Errors: $errors"
if (-not $Apply -and $updated -gt 0) { Write-Host "`nRe-run with -Apply to write." -ForegroundColor Yellow }
