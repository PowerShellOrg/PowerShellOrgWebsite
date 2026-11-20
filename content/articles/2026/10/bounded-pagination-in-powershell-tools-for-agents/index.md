---
title: "Check Whether a PowerShell API Read Is Complete"
description: "An API can return only part of your inventory. Return the items with a completion flag and a reason for stopping."
author: Tejesh Vaish
authors:
  - Tejesh Vaish
date: "2026-10-26T04:00:00+04:00"
categories:
  - PowerShell for Developers
tags:
  - powershell
  - rest-api
  - ai-agents
---

An inventory report can miss records even when its API request succeeds. In this local example, the API has five records, but the first GET returns only two. Using those two as the whole inventory leaves three out of the report.

This PowerShell reader follows the API's pages and says why it stopped. Allow two GETs and you get four records marked `Partial`:

| Read | Record IDs | Result |
| --- | --- | --- |
| One GET with `Invoke-RestMethod` | 1, 2 | Response has `nextToken: "A"` |
| Reader limited to two GETs | 1, 2, 3, 4 | `Partial / PageBudget`; `IsComplete: false` |
| Reader allowed all three GETs | 1, 2, 3, 4, 5 | `Complete / EndOfData`; `IsComplete: true` |

Check `IsComplete` before a report or agent uses `Items` as the full inventory. In the two-GET result, record 5 hasn't been read. Use `StopReason` to see why the read stopped.

## Follow the next-page token

The server sends a `nextToken` with each page. The reader sends that token in its next request. Here, page one returns `A`, page two returns `B`, and page three returns `null` to end the read.

The loop follows those tokens until it reaches the end or uses up its request or item limit. An empty page can still point to another page. If a request fails, the reader returns `Error / ReadFailed` with records kept from earlier pages.

## Use the reader

You'll need PowerShell 7.6 and [Node.js](https://nodejs.org/en/download). Follow the [source README for setup and optional verification](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/README.md), and review the source before running it. It uses a local API with no credentials.

With `api.mjs` running, open a second PowerShell terminal in the example folder. Load the reader and give it the URL printed by the API:

```powershell {linenos=false}
. ./Get-BoundedPage.ps1
$Base = Read-Host 'Paste the base URL printed by the running api.mjs'
$result = Get-BoundedPage -Endpoint "$Base/normal" -MaxPages 2
if ($result.IsComplete) {
    Write-Output "Inventory count: $($result.Items.Count)"
} else {
    throw "Inventory report withheld: $($result.Status) / $($result.StopReason)"
}
```

The two-request read throws `Inventory report withheld: Partial / PageBudget`. Set `-MaxPages 3` to print `Inventory count: 5` for this example. If a later request fails, the guard withholds the report because earlier records don't prove the inventory is complete.

Each function has built-in help. In the same terminal, read the reader's parameters and the page-fetching example:

```powershell {linenos=false}
Get-Help Get-BoundedPage -Full
Get-Help Read-LabPage -Examples
```

The reader and reporting check were tested on macOS. Windows and interactive `Read-Host` remain untested. Stop the local API with Ctrl+C when you're done.

## What the limits cover

`MaxPages` counts GET attempts, including failed ones. `MaxItems` limits the records returned. Neither is a total time limit; set a separate deadline if you need one. The reader downloads and decodes a whole page before keeping the records that fit, so a large page can still use substantial memory.

If `MaxItems` leaves part of a page out, resuming at the next token would skip the omitted records. This reader returns no resume token.
