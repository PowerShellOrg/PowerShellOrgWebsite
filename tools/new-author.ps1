#requires -Version 7.0
<#
.SYNOPSIS
    Scaffold or rename a PowerShell.org author profile.

.DESCRIPTION
    Author profiles live at content/authors/<slug>/_index.md, where <slug> MUST equal
    Hugo's slug of the exact name used in articles' `authors:` frontmatter. This script
    computes that slug for you so the profile binds to the right taxonomy term instead of
    creating an orphan page.

    Scaffold mode (default): create a new profile from the archetype.
    Rename mode (-To): rewrite the author name across all content, move the profile dir,
    and add an `aliases` redirect to preserve the old profile URL.

.EXAMPLE
    ./tools/new-author.ps1 -Name "Eric Brookman (scriptingcaveman)"

.EXAMPLE
    ./tools/new-author.ps1 -Name "Josh Duffney" -To "Duffney"
#>
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory, Position = 0)]
    [string]$Name,

    # Rename mode: the new author name to migrate to.
    [string]$To
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$contentDir = Join-Path $repoRoot 'content'
$authorsDir = Join-Path $contentDir 'authors'

function Get-AuthorSlug {
    param([string]$AuthorName)
    $slug = $AuthorName.ToLowerInvariant()
    $slug = $slug -replace '[^a-z0-9]+', '-'
    $slug.Trim('-')
}

function Get-ContentFilesCitingAuthor {
    param([string]$AuthorName)
    # Match the name as a YAML list item under author/authors.
    Get-ChildItem -Path $contentDir -Recurse -File -Filter '*.md' |
        Select-String -SimpleMatch -Pattern "- $AuthorName" -ErrorAction SilentlyContinue |
        Where-Object { $_.Line -match "^\s*-\s*$([regex]::Escape($AuthorName))\s*$" } |
        Select-Object -ExpandProperty Path -Unique
}

if ($To) {
    # --- Rename mode -----------------------------------------------------------
    $oldSlug = Get-AuthorSlug $Name
    $newSlug = Get-AuthorSlug $To
    $files = @(Get-ContentFilesCitingAuthor $Name)

    if (-not $files) {
        Write-Warning "No content files cite author '$Name'. Nothing to rewrite."
    }

    foreach ($file in $files) {
        if ($PSCmdlet.ShouldProcess($file, "Rewrite author '$Name' -> '$To'")) {
            $text = Get-Content -LiteralPath $file -Raw
            # Only touch list items (lines like "  - James Petty"), not prose.
            $updated = $text -replace "(?m)^(\s*-\s*)$([regex]::Escape($Name))\s*$", "`${1}$To"
            if ($updated -ne $text) {
                Set-Content -LiteralPath $file -Value $updated -NoNewline
                Write-Host "  updated $([IO.Path]::GetRelativePath($repoRoot, $file))"
            }
        }
    }

    $oldProfile = Join-Path $authorsDir $oldSlug
    $newProfile = Join-Path $authorsDir $newSlug
    if (Test-Path $oldProfile) {
        if ($oldSlug -ne $newSlug -and $PSCmdlet.ShouldProcess($oldProfile, "Move profile to $newSlug and add alias")) {
            Move-Item -LiteralPath $oldProfile -Destination $newProfile
            $index = Join-Path $newProfile '_index.md'
            $md = Get-Content -LiteralPath $index -Raw
            $alias = "aliases:`n  - /authors/$oldSlug/"
            # Insert/extend aliases just inside the front matter.
            if ($md -match '(?ms)^(---\s*\n)(.*?)(\n---)') {
                $md = $md -replace '(?ms)^(---\s*\n)', "`$1$alias`n"
                Set-Content -LiteralPath $index -Value $md -NoNewline
                Write-Host "  added alias /authors/$oldSlug/ -> /authors/$newSlug/"
            }
        }
    }
    Write-Host "Rename complete. Review changes, then update the profile's title/preferred_name as desired."
    return
}

# --- Scaffold mode ------------------------------------------------------------
$slug = Get-AuthorSlug $Name
$dir = Join-Path $authorsDir $slug
$index = Join-Path $dir '_index.md'

if (Test-Path $index) {
    Write-Warning "Profile already exists: $([IO.Path]::GetRelativePath($repoRoot, $index))"
    return
}

if (-not (Get-ContentFilesCitingAuthor $Name)) {
    Write-Warning "No article or podcast credits author '$Name' yet. Double-check the spelling matches the `authors:` frontmatter exactly, or the profile will not attach to any content."
}

$template = @"
---
title: "$Name"
# preferred_name: ""
tagline: ""
# avatar: ""
# gravatar_hash: ""
# email: ""
# website: ""
# github: ""
# twitter: ""
# mastodon: ""
# linkedin: ""
# bluesky: ""
---

<!-- Your bio in Markdown. Shown on your profile page. -->
"@

if ($PSCmdlet.ShouldProcess($index, 'Create author profile')) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Set-Content -LiteralPath $index -Value $template
    Write-Host "Created $([IO.Path]::GetRelativePath($repoRoot, $index))"
    Write-Host "Profile URL will be /authors/$slug/"
}
