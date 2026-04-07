[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$ConfigPath = "config/discord-mirror.json",

    [Parameter(Mandatory = $false)]
    [string]$BotToken = $env:DISCORD_BOT_TOKEN
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Log {
    param([string]$Message)
    Write-Host "[discord-mirror] $Message"
}

function Get-JsonFile {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Config file not found: $Path"
    }
    return (Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -Depth 100)
}

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Invoke-DiscordApi {
    param(
        [string]$Uri,
        [string]$BotToken,
        [string]$UserAgent
    )

    $headers = @{
        Authorization = "Bot $BotToken"
        'User-Agent'  = $UserAgent
    }

    Start-Sleep -Milliseconds 150
    return Invoke-RestMethod -Method Get -Uri $Uri -Headers $headers
}

function ConvertTo-Slug {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return 'discord-channel' }
    $slug = $Value.ToLowerInvariant()
    $slug = [regex]::Replace($slug, '[^a-z0-9]+', '-')
    $slug = $slug.Trim('-')
    if ([string]::IsNullOrWhiteSpace($slug)) { return 'discord-channel' }
    return $slug
}

function HtmlEncode {
    param([AllowNull()][string]$Value)
    if ($null -eq $Value) { return '' }
    return [System.Net.WebUtility]::HtmlEncode($Value)
}

function Convert-DiscordMentions {
    param(
        [string]$Text,
        [pscustomobject]$Message,
        [hashtable]$ChannelLookup,
        [bool]$SanitizeMentions
    )

    if ([string]::IsNullOrWhiteSpace($Text)) { return '' }
    $output = $Text

    if ($SanitizeMentions) {
        if ($Message.mentions) {
            foreach ($mention in $Message.mentions) {
                $display = if ($mention.global_name) { $mention.global_name } elseif ($mention.username) { $mention.username } else { 'user' }
                $output = $output -replace "<@!?$($mention.id)>", "@$display"
            }
        }

        $roleMentions = @($Message.mention_roles)
        foreach ($roleId in $roleMentions) {
            $output = $output -replace "<@&$roleId>", '@role'
        }

        foreach ($key in $ChannelLookup.Keys) {
            $channelName = $ChannelLookup[$key]
            $output = $output -replace "<#${key}>", "#$channelName"
        }

        $output = $output -replace '@everyone', 'everyone'
        $output = $output -replace '@here', 'here'
    }

    return $output
}

function Convert-DiscordContentToHtml {
    param(
        [string]$Text,
        [pscustomobject]$Message,
        [hashtable]$ChannelLookup,
        [bool]$SanitizeMentions
    )

    $resolved = Convert-DiscordMentions -Text $Text -Message $Message -ChannelLookup $ChannelLookup -SanitizeMentions:$SanitizeMentions
    $encoded = HtmlEncode -Value $resolved
    $encoded = [regex]::Replace($encoded, '(https?://\S+)', '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    $encoded = $encoded -replace "`r?`n", '<br />'
    return $encoded
}

function Get-MessageAuthorName {
    param([pscustomobject]$Message)
    if ($Message.member -and $Message.member.nick) { return $Message.member.nick }
    if ($Message.author.global_name) { return $Message.author.global_name }
    return $Message.author.username
}

function Get-MessageRoleNames {
    param(
        [pscustomobject]$Message,
        [hashtable]$RoleLookup
    )
    $names = New-Object System.Collections.Generic.List[string]
    if ($Message.member -and $Message.member.roles) {
        foreach ($roleId in $Message.member.roles) {
            if ($RoleLookup.ContainsKey([string]$roleId)) {
                $names.Add([string]$RoleLookup[[string]$roleId])
            }
        }
    }
    return @($names)
}

function Test-MessageModeration {
    param(
        [pscustomobject]$Message,
        [pscustomobject]$ChannelConfig,
        [pscustomobject]$GlobalExport,
        [hashtable]$RoleLookup
    )

    $moderationMode = if ($ChannelConfig.moderationMode) { [string]$ChannelConfig.moderationMode } else { [string]$GlobalExport.defaultModerationMode }
    $approvalReaction = if ($ChannelConfig.approvalReaction) { [string]$ChannelConfig.approvalReaction } else { [string]$GlobalExport.defaultApprovalReaction }
    $approvalPrefix = if ($ChannelConfig.approvalPrefix) { [string]$ChannelConfig.approvalPrefix } else { [string]$GlobalExport.defaultApprovalPrefix }
    $authorRoleNames = @()
    if ($ChannelConfig.authorRoleNames) { $authorRoleNames = @($ChannelConfig.authorRoleNames) }
    elseif ($GlobalExport.defaultAuthorRoleNames) { $authorRoleNames = @($GlobalExport.defaultAuthorRoleNames) }

    $content = [string]$Message.content
    $roleNames = @(Get-MessageRoleNames -Message $Message -RoleLookup $RoleLookup)
    $hasReaction = $false
    if ($Message.reactions) {
        foreach ($reaction in $Message.reactions) {
            $emojiName = if ($reaction.emoji.name) { [string]$reaction.emoji.name } else { '' }
            if ($emojiName -eq $approvalReaction) {
                $hasReaction = $true
                break
            }
        }
    }
    $hasPrefix = $false
    if (-not [string]::IsNullOrWhiteSpace($approvalPrefix)) {
        $hasPrefix = $content.TrimStart().StartsWith($approvalPrefix, [System.StringComparison]::OrdinalIgnoreCase)
    }
    $authorApproved = $false
    if ($authorRoleNames.Count -gt 0 -and $roleNames.Count -gt 0) {
        foreach ($roleName in $roleNames) {
            if ($authorRoleNames -contains $roleName) {
                $authorApproved = $true
                break
            }
        }
    }

    switch ($moderationMode.ToLowerInvariant()) {
        'all'         { return $true }
        'reaction'    { return $hasReaction }
        'prefix'      { return $hasPrefix }
        'author-role' { return $authorApproved }
        'any'         { return ($hasReaction -or $hasPrefix -or $authorApproved) }
        default       { return $false }
    }
}

function Test-MessageFilters {
    param(
        [pscustomobject]$Message,
        [pscustomobject]$ChannelConfig,
        [pscustomobject]$GlobalExport,
        [datetimeoffset]$NowUtc,
        [hashtable]$RoleLookup
    )

    if (-not $GlobalExport.includeBotMessages -and $Message.author.bot) {
        return $false
    }

    if ([string]::IsNullOrWhiteSpace([string]$Message.content) -and (-not $Message.attachments)) {
        return $false
    }

    $created = [datetimeoffset]::Parse($Message.timestamp).ToUniversalTime()
    $requiredAge = if ($ChannelConfig.minMessageAgeMinutes) { [int]$ChannelConfig.minMessageAgeMinutes } else { [int]$GlobalExport.defaultMinMessageAgeMinutes }
    if ($requiredAge -gt 0) {
        $ageMinutes = ($NowUtc - $created).TotalMinutes
        if ($ageMinutes -lt $requiredAge) {
            return $false
        }
    }

    $excludeRegex = @()
    if ($ChannelConfig.excludeRegex) { $excludeRegex = @($ChannelConfig.excludeRegex) }
    elseif ($GlobalExport.defaultExcludeRegex) { $excludeRegex = @($GlobalExport.defaultExcludeRegex) }

    foreach ($pattern in $excludeRegex) {
        if (-not [string]::IsNullOrWhiteSpace($pattern) -and [regex]::IsMatch([string]$Message.content, [string]$pattern)) {
            return $false
        }
    }

    if ($ChannelConfig.includeRegex) {
        $matched = $false
        foreach ($pattern in @($ChannelConfig.includeRegex)) {
            if (-not [string]::IsNullOrWhiteSpace($pattern) -and [regex]::IsMatch([string]$Message.content, [string]$pattern)) {
                $matched = $true
                break
            }
        }
        if (-not $matched) {
            return $false
        }
    }

    return (Test-MessageModeration -Message $Message -ChannelConfig $ChannelConfig -GlobalExport $GlobalExport -RoleLookup $RoleLookup)
}

function Get-ChannelMessages {
    param(
        [string]$ApiBaseUrl,
        [string]$ChannelId,
        [string]$BotToken,
        [string]$UserAgent,
        [int]$MaxMessages
    )

    $messages = New-Object System.Collections.Generic.List[object]
    $before = $null
    $pageSize = 100

    do {
        $uri = "$ApiBaseUrl/channels/$ChannelId/messages?limit=$pageSize"
        if ($before) {
            $uri += "&before=$before"
        }
        $batch = @(Invoke-DiscordApi -Uri $uri -BotToken $BotToken -UserAgent $UserAgent)
        if (-not $batch -or $batch.Count -eq 0) {
            break
        }
        foreach ($item in $batch) {
            $messages.Add($item)
            if ($messages.Count -ge $MaxMessages) { break }
        }
        $before = $batch[-1].id
    } while ($batch.Count -eq $pageSize -and $messages.Count -lt $MaxMessages)

    $result = @($messages)
    [array]::Reverse($result)
    return $result
}

function Get-PublicThreadsForChannel {
    param(
        [string]$ApiBaseUrl,
        [string]$ChannelId,
        [string]$BotToken,
        [string]$UserAgent
    )

    $threads = New-Object System.Collections.Generic.List[object]

    try {
        $active = Invoke-DiscordApi -Uri "$ApiBaseUrl/channels/$ChannelId/threads/active" -BotToken $BotToken -UserAgent $UserAgent
        if ($active.threads) {
            foreach ($thread in @($active.threads)) { $threads.Add($thread) }
        }
    }
    catch {
        Write-Log "Active threads lookup failed for $ChannelId: $($_.Exception.Message)"
    }

    try {
        $archived = Invoke-DiscordApi -Uri "$ApiBaseUrl/channels/$ChannelId/threads/archived/public?limit=100" -BotToken $BotToken -UserAgent $UserAgent
        if ($archived.threads) {
            foreach ($thread in @($archived.threads)) { $threads.Add($thread) }
        }
    }
    catch {
        Write-Log "Archived threads lookup failed for $ChannelId: $($_.Exception.Message)"
    }

    $distinct = @{}
    foreach ($thread in $threads) {
        $distinct[[string]$thread.id] = $thread
    }
    return @($distinct.Values)
}

function Get-GuildRoles {
    param(
        [string]$ApiBaseUrl,
        [string]$GuildId,
        [string]$BotToken,
        [string]$UserAgent
    )

    $roles = @(Invoke-DiscordApi -Uri "$ApiBaseUrl/guilds/$GuildId/roles" -BotToken $BotToken -UserAgent $UserAgent)
    $lookup = @{}
    foreach ($role in $roles) {
        $lookup[[string]$role.id] = [string]$role.name
    }
    return $lookup
}

function Get-ChannelLookup {
    param(
        [string]$ApiBaseUrl,
        [string]$GuildId,
        [string]$BotToken,
        [string]$UserAgent
    )
    $channels = @(Invoke-DiscordApi -Uri "$ApiBaseUrl/guilds/$GuildId/channels" -BotToken $BotToken -UserAgent $UserAgent)
    $lookup = @{}
    foreach ($channel in $channels) {
        $lookup[[string]$channel.id] = [string]$channel.name
    }
    return $lookup
}

function New-MessageHtmlBlock {
    param(
        [pscustomobject]$Message,
        [string]$GuildId,
        [string]$ChannelId,
        [hashtable]$ChannelLookup,
        [bool]$SanitizeMentions
    )

    $author = HtmlEncode -Value (Get-MessageAuthorName -Message $Message)
    $timestamp = [datetimeoffset]::Parse($Message.timestamp).ToString('yyyy-MM-dd HH:mm') + ' UTC'
    $messageUrl = "https://discord.com/channels/$GuildId/$ChannelId/$($Message.id)"
    $contentHtml = Convert-DiscordContentToHtml -Text ([string]$Message.content) -Message $Message -ChannelLookup $ChannelLookup -SanitizeMentions:$SanitizeMentions

    $attachmentsHtml = ''
    if ($Message.attachments) {
        $items = foreach ($attachment in @($Message.attachments)) {
            $name = if ($attachment.filename) { HtmlEncode -Value ([string]$attachment.filename) } else { 'attachment' }
            $url = HtmlEncode -Value ([string]$attachment.url)
            "<li><a href=\"$url\" target=\"_blank\" rel=\"noopener noreferrer\">$name</a></li>"
        }
        if ($items) {
            $attachmentsHtml = "<div class=\"discord-attachments\"><strong>Attachments:</strong><ul>" + ($items -join '') + "</ul></div>"
        }
    }

    $reactionsHtml = ''
    if ($Message.reactions) {
        $rx = foreach ($reaction in @($Message.reactions)) {
            $emoji = HtmlEncode -Value ([string]$reaction.emoji.name)
            $count = [int]$reaction.count
            "<span class=\"discord-reaction\">$emoji $count</span>"
        }
        if ($rx) {
            $reactionsHtml = "<div class=\"discord-reactions\">" + ($rx -join '') + "</div>"
        }
    }

    return @"
<div class="discord-message" id="msg-$($Message.id)">
  <div class="discord-message-header">
    <span class="discord-author">$author</span>
    <span class="discord-timestamp">$timestamp</span>
    <a class="discord-permalink" href="$messageUrl" target="_blank" rel="noopener noreferrer">Open in Discord</a>
  </div>
  <div class="discord-message-body">$contentHtml</div>
  $attachmentsHtml
  $reactionsHtml
</div>
"@
}

function New-ChannelPage {
    param(
        [pscustomobject]$ChannelConfig,
        [object[]]$Messages,
        [string]$GuildId,
        [string]$ContentDir,
        [string]$SectionPath,
        [hashtable]$ChannelLookup,
        [bool]$SanitizeMentions
    )

    $slug = if ($ChannelConfig.slug) { [string]$ChannelConfig.slug } else { ConvertTo-Slug -Value ([string]$ChannelConfig.title) }
    $dir = Join-Path $ContentDir $slug
    Ensure-Directory -Path $dir
    $title = if ($ChannelConfig.title) { [string]$ChannelConfig.title } else { $slug }
    $description = if ($ChannelConfig.description) { [string]$ChannelConfig.description } else { "Selected Discord content mirrored from #$slug." }
    $generated = [datetimeoffset]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
    $count = $Messages.Count

    $htmlBlocks = foreach ($message in $Messages) {
        New-MessageHtmlBlock -Message $message -GuildId $GuildId -ChannelId ([string]$ChannelConfig.id) -ChannelLookup $ChannelLookup -SanitizeMentions:$SanitizeMentions
    }

    $body = @"
---
title: "$($title.Replace('"','\"'))"
description: "$($description.Replace('"','\"'))"
layout: single
---

<div class="discord-channel-page">
  <div class="discord-channel-meta">
    <p><strong>Source channel:</strong> #$slug</p>
    <p><strong>Exported messages:</strong> $count</p>
    <p><strong>Last generated:</strong> $generated</p>
  </div>
  <div class="discord-message-list">
$($htmlBlocks -join "`n")
  </div>
</div>
"@

    Set-Content -LiteralPath (Join-Path $dir 'index.md') -Value $body -Encoding UTF8

    return [pscustomobject]@{
        title = $title
        slug = $slug
        url = "/$SectionPath/$slug/"
        description = $description
        messageCount = $count
    }
}

function New-SectionLandingPage {
    param(
        [pscustomobject[]]$ChannelPages,
        [string]$ContentDir,
        [pscustomobject]$Site,
        [string]$SectionPath
    )

    $items = foreach ($page in $ChannelPages | Sort-Object title) {
        @"- [$($page.title)]($($page.url)) — $($page.description) ($($page.messageCount) messages)"@
    }

    $content = @"
---
title: "Discord Archive"
description: "$($Site.searchDescription.Replace('"','\"'))"
layout: single
---

This section publishes selected Discord content that has been approved for public search and discovery.

## Available channels

$($items -join "`n")

## Search

Use the [Discord Archive Search](/$SectionPath/search/) page for keyword lookup across approved mirrored content.
"@

    Set-Content -LiteralPath (Join-Path $ContentDir '_index.md') -Value $content -Encoding UTF8

    $searchPage = @"
---
title: "Discord Archive Search"
description: "$($Site.searchDescription.Replace('"','\"'))"
layout: single
---

<div class="discord-search-page">
  <p>$($Site.searchDescription)</p>
  <input id="discord-search-input" type="search" placeholder="Search the Discord archive" class="discord-search-input" />
  <div id="discord-search-results" class="discord-search-results"></div>
</div>

<script src="/$SectionPath/search.js"></script>
"@
    $searchDir = Join-Path $ContentDir 'search'
    Ensure-Directory -Path $searchDir
    Set-Content -LiteralPath (Join-Path $searchDir 'index.md') -Value $searchPage -Encoding UTF8
}

function Write-StaticAssets {
    param(
        [string]$StaticDir,
        [string]$SearchIndexFileName,
        [string]$SectionPath,
        [string]$FooterText
    )

    Ensure-Directory -Path $StaticDir

    $css = @'
.discord-channel-page { margin-top: 1.5rem; }
.discord-channel-meta { margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #d1d5db; border-radius: 10px; background: #f8fafc; }
.discord-message-list { display: flex; flex-direction: column; gap: 1rem; }
.discord-message { border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.05); }
.discord-message-header { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; margin-bottom: .75rem; font-size: .95rem; }
.discord-author { font-weight: 700; }
.discord-timestamp { color: #6b7280; }
.discord-permalink { margin-left: auto; }
.discord-message-body { line-height: 1.6; }
.discord-attachments ul { margin: .5rem 0 0 1.2rem; }
.discord-reactions { margin-top: .75rem; display: flex; gap: .5rem; flex-wrap: wrap; }
.discord-reaction { padding: .15rem .5rem; border-radius: 999px; background: #eef2ff; font-size: .9rem; }
.discord-search-input { width: 100%; padding: .9rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; }
.discord-search-results { margin-top: 1rem; display: flex; flex-direction: column; gap: .75rem; }
.discord-search-result { border: 1px solid #e5e7eb; border-radius: 10px; padding: 1rem; background: #fff; }
.discord-search-result p { margin: .35rem 0; }
.discord-footer-note { margin-top: 2rem; color: #6b7280; font-size: .95rem; }
'@
    Set-Content -LiteralPath (Join-Path $StaticDir 'styles.css') -Value $css -Encoding UTF8

    $searchJs = @"
(async function () {
  const input = document.getElementById('discord-search-input');
  const results = document.getElementById('discord-search-results');
  if (!input || !results) return;
  let index = [];
  try {
    const response = await fetch('/$SectionPath/$SearchIndexFileName');
    index = await response.json();
  } catch (error) {
    results.innerHTML = '<p>Search index could not be loaded.</p>';
    return;
  }

  const render = (items) => {
    if (!items.length) {
      results.innerHTML = '<p>No results found.</p>';
      return;
    }
    results.innerHTML = items.map(item => `
      <div class="discord-search-result">
        <p><strong><a href="${item.url}">${item.channel}</a></strong></p>
        <p>${item.excerpt}</p>
        <p><small>${item.author} — ${item.timestamp}</small></p>
      </div>
    `).join('');
  };

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = '<p>Start typing to search.</p>';
      return;
    }
    const filtered = index.filter(item => item.text.toLowerCase().includes(query)).slice(0, 100);
    render(filtered);
  });

  results.innerHTML = '<p>Start typing to search.</p>';
})();
"@
    Set-Content -LiteralPath (Join-Path $StaticDir 'search.js') -Value $searchJs -Encoding UTF8

    $robots = "User-agent: *`nAllow: /`nSitemap: https://powershell.org/sitemap.xml`n"
    Set-Content -LiteralPath (Join-Path (Split-Path $StaticDir -Parent) 'robots.txt') -Value $robots -Encoding UTF8
}

function Remove-GeneratedChannelDirectories {
    param([string]$ContentDir)
    if (-not (Test-Path -LiteralPath $ContentDir)) { return }
    Get-ChildItem -LiteralPath $ContentDir -Directory | Where-Object { $_.Name -ne 'search' } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    Get-ChildItem -LiteralPath $ContentDir -File | Where-Object { $_.Name -ne '_index.md' } | Remove-Item -Force -ErrorAction SilentlyContinue
}

$config = Get-JsonFile -Path $ConfigPath
if ([string]::IsNullOrWhiteSpace($BotToken)) {
    throw 'DISCORD_BOT_TOKEN was not supplied. Set the secret or pass -BotToken.'
}

$site = $config.site
$discord = $config.discord
$export = $config.export
$enabledChannels = @($config.channels | Where-Object { $_.enabled -eq $true -and -not [string]::IsNullOrWhiteSpace([string]$_.id) -and -not [string]$_.id.StartsWith('REPLACE_') })
if ($enabledChannels.Count -eq 0) {
    throw 'No enabled channels were configured. Update config/discord-mirror.json.'
}

$contentDir = [System.IO.Path]::GetFullPath($export.outputContentDir)
$staticDir = [System.IO.Path]::GetFullPath($export.outputStaticDir)
Ensure-Directory -Path $contentDir
Ensure-Directory -Path $staticDir
Remove-GeneratedChannelDirectories -ContentDir $contentDir

$roleLookup = Get-GuildRoles -ApiBaseUrl $discord.apiBaseUrl -GuildId ([string]$discord.guildId) -BotToken $BotToken -UserAgent ([string]$discord.userAgent)
$channelLookup = Get-ChannelLookup -ApiBaseUrl $discord.apiBaseUrl -GuildId ([string]$discord.guildId) -BotToken $BotToken -UserAgent ([string]$discord.userAgent)
$nowUtc = [datetimeoffset]::UtcNow
$channelPages = New-Object System.Collections.Generic.List[object]
$searchIndex = New-Object System.Collections.Generic.List[object]

foreach ($channel in $enabledChannels) {
    $slug = if ($channel.slug) { [string]$channel.slug } else { ConvertTo-Slug -Value ([string]$channel.title) }
    $maxMessages = if ($channel.maxMessages) { [int]$channel.maxMessages } else { [int]$export.maxMessagesPerChannel }
    Write-Log "Processing channel $($channel.id) ($slug)"
    $messages = @(Get-ChannelMessages -ApiBaseUrl $discord.apiBaseUrl -ChannelId ([string]$channel.id) -BotToken $BotToken -UserAgent ([string]$discord.userAgent) -MaxMessages $maxMessages)

    $approved = foreach ($message in $messages) {
        if (Test-MessageFilters -Message $message -ChannelConfig $channel -GlobalExport $export -NowUtc $nowUtc -RoleLookup $roleLookup) {
            $message
        }
    }

    if ($channel.includeThreads -eq $true) {
        $threads = @(Get-PublicThreadsForChannel -ApiBaseUrl $discord.apiBaseUrl -ChannelId ([string]$channel.id) -BotToken $BotToken -UserAgent ([string]$discord.userAgent))
        foreach ($thread in $threads) {
            $threadMessages = @(Get-ChannelMessages -ApiBaseUrl $discord.apiBaseUrl -ChannelId ([string]$thread.id) -BotToken $BotToken -UserAgent ([string]$discord.userAgent) -MaxMessages $maxMessages)
            foreach ($msg in $threadMessages) {
                if (Test-MessageFilters -Message $msg -ChannelConfig $channel -GlobalExport $export -NowUtc $nowUtc -RoleLookup $roleLookup) {
                    $approved += $msg
                }
            }
        }
    }

    $approved = @($approved | Sort-Object { [datetimeoffset]::Parse($_.timestamp) })
    $page = New-ChannelPage -ChannelConfig $channel -Messages $approved -GuildId ([string]$discord.guildId) -ContentDir $contentDir -SectionPath ([string]$site.sectionPath) -ChannelLookup $channelLookup -SanitizeMentions:([bool]$export.sanitizeMentions)
    $channelPages.Add($page)

    foreach ($message in $approved) {
        $text = Convert-DiscordMentions -Text ([string]$message.content) -Message $message -ChannelLookup $channelLookup -SanitizeMentions:([bool]$export.sanitizeMentions)
        if ([string]::IsNullOrWhiteSpace($text)) { continue }
        $excerpt = $text
        if ($excerpt.Length -gt 220) { $excerpt = $excerpt.Substring(0,220) + '…' }
        $searchIndex.Add([pscustomobject]@{
            channel   = $page.title
            url       = "$($page.url)#msg-$($message.id)"
            author    = (Get-MessageAuthorName -Message $message)
            timestamp = [datetimeoffset]::Parse($message.timestamp).ToString('yyyy-MM-dd HH:mm') + ' UTC'
            text      = $text
            excerpt   = $excerpt
        })
    }
}

New-SectionLandingPage -ChannelPages @($channelPages) -ContentDir $contentDir -Site $site -SectionPath ([string]$site.sectionPath)
Write-StaticAssets -StaticDir $staticDir -SearchIndexFileName ([string]$export.searchIndexFileName) -SectionPath ([string]$site.sectionPath) -FooterText ([string]$site.footerText)
$searchIndex | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $staticDir ([string]$export.searchIndexFileName)) -Encoding UTF8
Write-Log "Export complete. Generated $($channelPages.Count) channel pages and $($searchIndex.Count) search records."
