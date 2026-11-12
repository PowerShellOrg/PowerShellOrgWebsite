---
title: "Bounded Pagination in PowerShell Tools for Agents"
description: "Read a paginated API in PowerShell, limit the requests and records, and tell when you have the full result."
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

Say you're pulling inventory into a report. The API has five records, but your first GET brings back just two. The response also includes a `nextToken`, which tells you where to pick up. If your script hands back only the first two records, the caller has no way to tell that three are missing.

I want the caller to see why the read stopped. Did we get all the records, hit a limit, or run into an error? This example returns that answer alongside the items, so a script or agent can decide whether to use them.

## Try it with a local API

You'll need PowerShell 7.6 and [Node.js](https://nodejs.org/en/download). The example runs locally with built-in Node modules and needs no credentials.

The [example source folder on GitHub](https://github.com/tridev-tej/technical-blog-examples/tree/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination) contains six source files. In a PowerShell terminal, create a local folder for them:

```powershell {linenos=false}
New-Item -ItemType Directory -Path ./bounded-pagination-example
Set-Location ./bounded-pagination-example
```

For each file below, open its link, select **Raw**, then save the raw text in `bounded-pagination-example` using the filename shown. Review the text before running it.

| Source file | Role |
| --- | --- |
| [api.mjs](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/api.mjs) | Local API with normal and broken pagination cases |
| [Get-BoundedPage.ps1](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/Get-BoundedPage.ps1) | Bounded reader and its helper functions |
| [Show-Examples.ps1](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/Show-Examples.ps1) | Shows complete, limited and repeated-token reads |
| [Invoke-Case.ps1](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/Invoke-Case.ps1) | Runs reader requests for the verifier |
| [Invoke-NumericProbe.ps1](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/Invoke-NumericProbe.ps1) | Checks typed numeric budgets for the verifier |
| [verify.mjs](https://github.com/tridev-tej/technical-blog-examples/blob/c11b69981d216acfa937dfe11c7c942ae47b86a3/powershell/bounded-pagination/verify.mjs) | Verifies results and request counts |

Start the API from your `bounded-pagination-example` folder.

```powershell {linenos=false}
node ./api.mjs
```

Leave it running. In a second PowerShell terminal, change to the same `bounded-pagination-example` folder. Run the commands below and paste the URL printed by the first terminal when prompted.

```powershell {linenos=false}
$Base = Read-Host 'Paste the base URL printed by api.mjs'
$page = Invoke-RestMethod -Uri "$Base/normal" -Method Get -NoProxy -ErrorAction Stop
$page.items | ConvertTo-Json -Depth 20 -Compress
```

That prints `[{"id":1},{"id":2}]`. Now run the reader against the same API.

```powershell {linenos=false}
& ./Show-Examples.ps1 -Base $Base
```

The script prints three JSON results in this order. The repeated-token run also writes a separate error message to the terminal.

| Run | Result |
| --- | --- |
| Read all pages | IDs 1, 2, 3, 4, 5; 3 GET attempts; `Complete`; `EndOfData` |
| Stop after two pages | IDs 1, 2, 3, 4; 2 GET attempts; `Partial`; `PageBudget` |
| Repeated token | IDs 1, 2; 2 GET attempts; `Error`; `RepeatedToken` |

Use `IsComplete` when you need all five records. Use `StopReason` to see why a read stopped early.

## How the reader decides when to stop

Page one includes token `A`. The next request sends `A` to get page two. On the normal route, page two gives you `B`, and page three ends the read with `nextToken: null`. An empty page can still point to another page.

`MaxPages` limits GET attempts, including a failed attempt. `MaxItems` limits how many records you get back. Try asking for three records.

```powershell {linenos=false}
. ./Get-BoundedPage.ps1
Get-BoundedPage "$Base/normal" -MaxItems 3 | ConvertTo-Json -Depth 20
```

You'll get IDs 1, 2, and 3, with `Partial/ItemBudget`. Page two contains IDs 3 and 4, and only one of them fits. The same rule applies if the reader runs out of room on the last page. If the entire last page fits, the read is complete.

In the repeat example, page two points back to `A`. The reader has already requested that token, so it stops before another GET. It counts all four records in `ItemsFetched` but discards page two's records, leaving `ItemsReturned` at two.

Open `Get-BoundedPage.ps1` to see the loop in `Invoke-PageStep`. It checks the limits before making a request, validates the whole page, then checks its token before adding records. If a request fails or a response is malformed, the reader returns `Error/ReadFailed` with the records it kept from earlier pages.

To read the functions' built-in help in the second terminal:

```powershell {linenos=false}
. ./Get-BoundedPage.ps1
Get-Help Get-BoundedPage -Full
Get-Help Read-LabPage -Examples
```

The sample keeps requests on the same local endpoint and turns off redirects and retries. It downloads and decodes the whole page before trimming records, so a large response can still use substantial memory. The [operation timeout](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6#-operationtimeoutseconds) covers a stalled read. Set a separate deadline if you need to limit the total time.

If you keep only part of a page, picking up at the next token would skip the records you left behind. So the reader returns no resume token.

## Run the checks

From the second terminal, run the verifier if you want to try empty pages, exact limits, broken responses, and other cases. The verifier starts and stops its own API listeners.

```powershell {linenos=false}
$env:PWSH = (Get-Process -Id $PID).Path
node ./verify.mjs > ./results.jsonl
$LASTEXITCODE
Get-Content -LiteralPath ./results.jsonl -Tail 1
```

A passing run exits with code `0` and ends with this result:

```json {linenos=false}
{"kind":"summary","cases":65,"passed":true}
```

The example ran with PowerShell 7.6.9 and Node.js 26.3.0 on macOS and Ubuntu. Windows verification is still pending.

When you're done, press Ctrl+C in the first terminal to stop the API.
