---
title: "Bounded Pagination in PowerShell Tools for Agents"
description: "Build a PowerShell REST reader with page and item limits, repeated-token detection, and explicit completion and error states. Verify it against a small local API."
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

Suppose a script is building an inventory report from a paginated API. The first response contains records 1 and 2, plus a token for the next page. If the script returns only those records, a caller can mistake a successful request for a complete inventory. The local fixture here contains five records across three pages.

A read can also stop at a budget or encounter a repeated cursor. A script or agent using those records needs to know which happened before it treats them as the whole inventory.

The reader below caps attempted GETs and returned records, then carries the stopping reason with the data. You can check it against a local API without an account or credentials.

## Compare the one-page read with a bounded result

The intentionally incomplete read in the walkthrough makes one GET and returns only its items:

```json {linenos=false}
[{"id":1},{"id":2}]
```

That output loses the continuation and says nothing about completeness. With enough room in both budgets, the bounded reader reaches the final page and returns:

```json {linenos=false}
{
  "Items": [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5}],
  "RequestsAttempted": 3,
  "ItemsFetched": 5,
  "ItemsReturned": 5,
  "Status": "Complete",
  "StopReason": "EndOfData",
  "IsComplete": true
}
```

With a two-page budget, it returns the records it can keep and makes the stopping condition explicit:

```json {linenos=false}
{
  "Items": [{"id":1},{"id":2},{"id":3},{"id":4}],
  "RequestsAttempted": 2,
  "ItemsFetched": 4,
  "ItemsReturned": 4,
  "Status": "Partial",
  "StopReason": "PageBudget",
  "IsComplete": false
}
```

You can use the records in either result, but only the complete result establishes that you reached the end. If a later page points back to an already requested cursor, the reader instead returns `Error/RepeatedToken` and keeps the earlier accepted records.

## Define the page and result contracts

Each API page must be an object with two required properties: `items`, an array of objects with integer `id` values, and `nextToken`, a nonempty ASCII token or `null`. An empty page doesn't mean the read is complete. Only `null` ends pagination, so the reader follows a continuation from an empty page if the budgets allow it.

Tokens match `\A[A-Za-z0-9_-]{1,64}\z`. The API treats `A` and `a` as different cursors, so the reader uses a `StringComparer.Ordinal` set to track them. PowerShell's ordinary string comparisons are case-insensitive; see [PowerShell comparison operators](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comparison_operators?view=powershell-7.6#common-features).

| Result | Meaning |
| --- | --- |
| Data | `Items`: retained records, always an array |
| Attempts | `RequestsAttempted`: GET attempts, including a failed attempt |
| Fetched | `ItemsFetched`: records in schema-valid received pages, including a page rejected for cyclic continuation |
| Returned | `ItemsReturned`: exactly `Items.Count` |
| State | `Status`: `Complete`, `Partial` or `Error` |
| Reason | `StopReason`: `EndOfData`, `PageBudget`, `ItemBudget`, `RepeatedToken`, `ReadFailed` or `InvalidArgument` |
| Complete? | `IsComplete`: true only for `Complete/EndOfData` |

`MaxPages` caps attempted GETs, and `MaxItems` caps returned records. Both accept numeric integer values from 1 through `Int32.MaxValue`. Strings, Boolean values, enums, null, fractions and non-finite numbers fail before HTTP. I keep the budgets untyped until validation because [parameter binding](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_type_conversion?view=powershell-7.6#parameter-binding-conversions) can convert a value to `[int]` before the function checks it.

## Set up the local example

Start in a PowerShell 7.6 console with Node.js installed. These instructions target PowerShell 7.6, including the HTTP settings below. Node installation instructions are on the [official download page](https://nodejs.org/en/download); the lab uses only built-in Node modules, so there's no package installation step.

The example was tested with PowerShell 7.6.9 and Node.js 26.3.0 on macOS 26.3.2 arm64 and Ubuntu 22.04.5 LTS x64. The numeric probes and full verifier passed under both `en-US` and `fr-FR`. Windows has not been tested.

Create a directory and record the runtimes. `PWSH` points to the PowerShell executable running this console, so the verifier can launch the same runtime:

```powershell {linenos=false}
New-Item -ItemType Directory -Path './bounded pages'
Set-Location './bounded pages'
$env:PWSH = (Get-Process -Id $PID).Path
$PSVersionTable.PSVersion.ToString()
node --version
```

Save all six files below in this directory. Files 1 through 3 are enough for the walkthrough; files 4 through 6 add verification.

1. `api.mjs`: Local pages, request recorder and separate redirect destination
2. `Get-BoundedPage.ps1`: Bounded reader and its validation, request and result helpers
3. `Show-Examples.ps1`: Three serialized complete, page-limited and repeated-token results
4. `Invoke-Case.ps1`: JSON request-array adapter, including multiple calls in one process
5. `Invoke-NumericProbe.ps1`: Fourteen typed budget probes
6. `verify.mjs`: Process and HTTP checks using its own listeners

The fixture binds to `127.0.0.1` on an available port and prints its base URL. `page` builds deterministic bodies; `respond` selects normal or faulty responses, and `handler` records each method and URL before responding. `startApi` starts both the fixture and a separate redirect destination, then returns their traces and a `close` method. The verifier uses that lifecycle to inspect real requests and release both listeners.

### 1. Save `api.mjs`

```javascript {linenos=false}
import http from 'node:http';
import { pathToFileURL } from 'node:url';

const page = (ids, nextToken) => ({ items: ids.map(id => ({ id })), nextToken });
const prefix = page([1, 2], 'A');
const normal = { r: prefix, A: page([3, 4], 'B'), B: page([5], null) };
const bad = {
  json: '{', nullRoot: null, scalarRoot: 7, missingItems: { nextToken: null },
  nullItems: { items: null, nextToken: null },
  scalarItems: { items: { id: 3 }, nextToken: null },
  badItem: { items: [{ id: '3' }], nextToken: null },
  nullItem: { items: [null], nextToken: null },
  fractionalId: { items: [{ id: 3.5 }], nextToken: null },
  booleanId: { items: [{ id: true }], nextToken: null },
  missingId: { items: [{}], nextToken: null },
  missingToken: { items: [{ id: 3 }] },
  numberToken: { items: [], nextToken: 3 },
  objectToken: { items: [], nextToken: {} },
  emptyToken: { items: [], nextToken: '' },
  urlToken: { items: [], nextToken: 'http://127.0.0.1/other' },
  newlineToken: { items: [], nextToken: 'A\n' },
  longToken: { items: [], nextToken: 'A'.repeat(65) }
};
const fixtures = {
  normal, empty: { r: page([], null) },
  emptyAfter: { r: prefix, A: page([], null) },
  emptyNext: { r: page([], 'A'), A: page([1], null) },
  oversized: { r: page([1, 2, 3], null) },
  repeat: { r: prefix, A: page([3, 4], 'A') },
  cycle: { ...normal, B: page([5, 6], 'A') },
  caseSensitive: { r: page([1], 'A'), A: page([2], 'a'), a: page([3], null) },
  extraFields: { r: { items: [{ id: -1, label: 'kept' }], nextToken: null } }
};

function sendJson(response, body) {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function sendFault(response, scenario, redirectUrl) {
  if (scenario === 'stall') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('{"items":');
    return;
  }
  if (scenario === 'redirect') {
    response.writeHead(302, { Location: redirectUrl });
    response.end();
    return;
  }
  response.writeHead(Number(scenario), { 'Retry-After': '0' });
  response.end('synthetic failure');
}

function respond(response, scenario, cursor, redirectUrl) {
  if (scenario === 'firstFailure') {
    sendFault(response, '503', redirectUrl);
    return;
  }
  if (['429', '503', 'redirect', 'stall'].includes(scenario)) {
    if (cursor === 'r') sendJson(response, prefix);
    else sendFault(response, scenario, redirectUrl);
    return;
  }
  if (Object.hasOwn(bad, scenario)) {
    response.setHeader('Content-Type', 'application/json');
    if (cursor === 'r') sendJson(response, prefix);
    else if (scenario === 'json') response.end(bad.json);
    else sendJson(response, bad[scenario]);
    return;
  }
  const body = fixtures[scenario]?.[cursor];
  if (body === undefined) {
    response.writeHead(404);
    response.end('unknown fixture or cursor');
    return;
  }
  sendJson(response, body);
}

function handler(trace, redirectUrl) {
  return (request, response) => {
    trace.push({ method: request.method, url: request.url });
    const url = new URL(request.url, 'http://127.0.0.1');
    const scenario = url.pathname.slice(1);
    const cursor = url.searchParams.get('cursor') ?? 'r';
    respond(response, scenario, cursor, redirectUrl);
  };
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
}

function stop(server) {
  server.closeAllConnections();
  return new Promise((resolve, reject) => {
    server.close(error => {
      if (error) reject(error);
      else resolve();
    });
  });
}

export async function startApi() {
  const trace = [];
  const destinationTrace = [];
  const destination = http.createServer((request, response) => {
    destinationTrace.push({ method: request.method, url: request.url });
    sendJson(response, page([999], null));
  });
  await listen(destination);
  const redirectUrl = `http://127.0.0.1:${destination.address().port}/destination`;
  const server = http.createServer(handler(trace, redirectUrl));
  await listen(server);
  return {
    base: `http://127.0.0.1:${server.address().port}`,
    trace, destinationTrace,
    async close() { await stop(server); await stop(destination); }
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const api = await startApi();
  process.stdout.write(`${api.base}\n`);
  process.on('SIGINT', async () => { await api.close(); });
}
```

Start the fixture in this first PowerShell terminal and leave it running:

```powershell {linenos=false}
node ./api.mjs
```

Keep the printed loopback URL for the second terminal. Stop this standalone fixture with Ctrl+C in its owning terminal when you're finished.

## Build the bounded reader

The reader accepts a fixed HTTP loopback endpoint without user information, query or fragment. Each subsequent request adds an encoded `cursor` value. Response content cannot choose a host or path.

Each GET disables redirects and retries, bypasses proxies and uses terminating errors. The [Invoke-RestMethod documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6#-maximumredirection) defines zero as disabling redirection and documents the retry controls. The fixture checks the actual request trace for 429, 503 and redirect responses.

The validation helpers check arguments and whole pages. `Read-LabPage` performs one GET; `Invoke-PageStep` decides what to retain and when to stop. `New-PageResult` builds the envelope. `Get-BoundedPage` keeps the state separate for each call and runs the checks in this order:

1. Validate the endpoint and budgets before HTTP.
2. Before each GET, check the item budget, then the page budget, then register the cursor.
3. Validate the received page, count fetched items, and reject a cyclic continuation before retaining records.
4. Retain the allowed prefix. Omitted records force `Partial/ItemBudget`; otherwise a null continuation completes the result. A nonterminal page returns to the budget checks.

Each function includes [comment-based help](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help?view=powershell-7.6). Its example shows the setup it needs; HTTP examples ask for the running fixture's base URL.

### 2. Save `Get-BoundedPage.ps1`

```powershell {linenos=false}
function Test-PageBudget {
    <#
    .SYNOPSIS
    Checks a budget without coercing its original numeric value.
    .PARAMETER Value
    Numeric integer from 1 through Int32.MaxValue. Null, Boolean, enum, string,
    fractional and non-finite values are rejected.
    .OUTPUTS
    System.Boolean. True when the value is an accepted budget.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    Test-PageBudget -Value ([decimal]1)
    #>
    param($Value)

    if ($null -eq $Value) { return $false }
    if ($Value.GetType().IsEnum) { return $false }
    $numericTypes = @('SByte', 'Byte', 'Int16', 'UInt16', 'Int32', 'UInt32',
        'Int64', 'UInt64', 'Single', 'Double', 'Decimal')
    if ([Type]::GetTypeCode($Value.GetType()).ToString() -notin $numericTypes) {
        return $false
    }
    $number = [double]$Value
    if (-not [double]::IsFinite($number)) { return $false }
    return $Value -ge 1 -and $Value -le [int]::MaxValue -and
        $Value -eq [math]::Truncate($number)
}

function Get-PageEndpoint {
    <#
    .SYNOPSIS
    Validates the fixed destination before any request.
    .PARAMETER Endpoint
    Absolute HTTP loopback URL with no user information, query or fragment.
    .OUTPUTS
    System.String. The absolute URL. Invalid input throws.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    Get-PageEndpoint -Endpoint 'http://127.0.0.1:54321/normal'
    #>
    param($Endpoint)

    if ($Endpoint -isnot [string]) { throw 'Endpoint must be a URL string.' }
    $uri = $null
    if (-not [uri]::TryCreate($Endpoint, [UriKind]::Absolute, [ref]$uri)) {
        throw 'Endpoint must be absolute.'
    }
    if ($uri.Scheme -cne 'http' -or -not $uri.IsLoopback) {
        throw 'Use an HTTP loopback endpoint.'
    }
    if ($uri.UserInfo -or $uri.Query -or $uri.Fragment) {
        throw 'Endpoint must not contain user information, query or fragment.'
    }
    return $uri.AbsoluteUri
}

function Test-PageItem {
    <#
    .SYNOPSIS
    Checks that a deserialized record has an integer id.
    .PARAMETER Item
    PSCustomObject whose id must be Int32 or Int64. Other properties are retained.
    .OUTPUTS
    System.Boolean. True when the record has the required shape.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    Test-PageItem -Item ([pscustomobject]@{ id = [int]1; label = 'kept' })
    #>
    param($Item)

    if ($Item -isnot [pscustomobject]) { return $false }
    return $Item.id -is [long] -or $Item.id -is [int]
}

function Assert-PageShape {
    <#
    .SYNOPSIS
    Validates every record and the continuation before a page changes state.
    .PARAMETER Page
    PSCustomObject with array items and a required nextToken: null or an ASCII
    token matching \A[A-Za-z0-9_-]{1,64}\z. Empty arrays may have a continuation.
    .OUTPUTS
    No output on success. Invalid pages throw.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $page = [pscustomobject]@{
        items = @([pscustomobject]@{ id = [int]1 })
        nextToken = $null
    }
    Assert-PageShape -Page $page
    #>
    param($Page)

    if ($Page -isnot [pscustomobject]) { throw 'Page must be an object.' }
    if ($null -eq $Page.PSObject.Properties['items']) { throw 'Missing items.' }
    if ($Page.items -isnot [array]) { throw 'items must be an array.' }
    foreach ($item in $Page.items) {
        if (-not (Test-PageItem $item)) { throw 'Each item needs an integer id.' }
    }
    if ($null -eq $Page.PSObject.Properties['nextToken']) { throw 'Missing nextToken.' }
    if ($null -eq $Page.nextToken) { return }
    if ($Page.nextToken -isnot [string]) { throw 'nextToken must be a string or null.' }
    if ($Page.nextToken -cnotmatch '\A[A-Za-z0-9_-]{1,64}\z') {
        throw 'Invalid continuation token.'
    }
}

function Read-LabPage {
    <#
    .SYNOPSIS
    Fetches and validates one page without retries or redirects.
    .PARAMETER Endpoint
    Fixed URL already validated by Get-PageEndpoint.
    .PARAMETER Cursor
    Empty string for the first page; otherwise a validated continuation token.
    The token is encoded as a cursor query value.
    .OUTPUTS
    PSCustomObject. A validated page. HTTP, decoding or schema failures throw.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $Base = Read-Host 'Paste the base URL printed by the running api.mjs'
    Read-LabPage -Endpoint "$Base/normal" -Cursor ''
    #>
    param([string]$Endpoint, [string]$Cursor)

    $url = $Endpoint
    if ($Cursor.Length -gt 0) {
        $url += '?cursor=' + [uri]::EscapeDataString($Cursor)
    }
    $settings = @{
        Uri = $url
        Method = 'Get'
        MaximumRetryCount = 0
        MaximumRedirection = 0
        NoProxy = $true
        ConnectionTimeoutSeconds = 2
        OperationTimeoutSeconds = 2
        ErrorAction = 'Stop'
    }
    $page = Invoke-RestMethod @settings
    Assert-PageShape $page
    return $page
}

function Set-PageStop {
    <#
    .SYNOPSIS
    Records the stop state and signals the caller to leave the loop.
    .PARAMETER State
    Per-call mutable hashtable whose Status and StopReason will be replaced.
    .PARAMETER Status
    Complete, Partial or Error, chosen by the caller's stop condition.
    .PARAMETER Reason
    EndOfData, PageBudget, ItemBudget, RepeatedToken, ReadFailed or InvalidArgument.
    .OUTPUTS
    System.Boolean. Always false; the supplied state is also updated.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $state = @{ Status = ''; StopReason = '' }
    Set-PageStop -State $state -Status 'Partial' -Reason 'PageBudget'
    $state
    #>
    param($State, [string]$Status, [string]$Reason)

    $State.Status = $Status
    $State.StopReason = $Reason
    return $false
}

function Test-RepeatedContinuation {
    <#
    .SYNOPSIS
    Checks whether a page points to an already requested cursor.
    .PARAMETER Page
    Validated page with a nextToken property. Null is terminal, not repeated.
    .PARAMETER Seen
    HashSet of requested cursors using StringComparer.Ordinal for case sensitivity.
    .OUTPUTS
    System.Boolean. True when the non-null continuation is in Seen.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $seen = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
    $null = $seen.Add('A')
    Test-RepeatedContinuation -Page ([pscustomobject]@{ nextToken = 'A' }) -Seen $seen
    #>
    param($Page, $Seen)

    return $null -ne $Page.nextToken -and $Seen.Contains($Page.nextToken)
}

function Invoke-PageStep {
    <#
    .SYNOPSIS
    Attempts one bounded page step and updates this read's state.
    .PARAMETER State
    Per-call hashtable with Items list, Seen ordinal set, Cursor, counters,
    Status and StopReason. Registering the cursor precedes the GET.
    .PARAMETER Endpoint
    Fixed URL already validated by Get-PageEndpoint.
    .PARAMETER MaxPages
    Validated positive Int32-valued attempt limit. Checked after the item limit.
    .PARAMETER MaxItems
    Validated positive Int32-valued retained-record limit. A cyclic page is rejected
    before its records are appended; omitted records force ItemBudget.
    .OUTPUTS
    System.Boolean. True to continue; false when State contains the stop result.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $Base = Read-Host 'Paste the base URL printed by the running api.mjs'
    $state = @{
        Items = [Collections.Generic.List[object]]::new()
        Seen = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
        Cursor = ''; RequestsAttempted = 0; ItemsFetched = [long]0
        Status = 'Error'; StopReason = 'InvalidArgument'
    }
    while (Invoke-PageStep -State $state -Endpoint "$Base/normal" -MaxPages 2 -MaxItems 100) {}
    New-PageResult -State $state
    #>
    param($State, [string]$Endpoint, [int]$MaxPages, [int]$MaxItems)

    if ($State.Items.Count -ge $MaxItems) {
        return Set-PageStop $State 'Partial' 'ItemBudget'
    }
    if ($State.RequestsAttempted -ge $MaxPages) {
        return Set-PageStop $State 'Partial' 'PageBudget'
    }
    if (-not $State.Seen.Add($State.Cursor)) {
        return Set-PageStop $State 'Error' 'RepeatedToken'
    }
    $State.RequestsAttempted++
    try { $page = Read-LabPage $Endpoint $State.Cursor }
    catch {
        [Console]::Error.WriteLine($_.Exception.Message)
        return Set-PageStop $State 'Error' 'ReadFailed'
    }
    $State.ItemsFetched += $page.items.Count
    if (Test-RepeatedContinuation $page $state.Seen) {
        [Console]::Error.WriteLine('Continuation refers to an already requested cursor.')
        return Set-PageStop $State 'Error' 'RepeatedToken'
    }
    $take = [math]::Min($page.items.Count, $MaxItems - $State.Items.Count)
    for ($index = 0; $index -lt $take; $index++) {
        $State.Items.Add($page.items[$index])
    }
    if ($take -lt $page.items.Count) {
        return Set-PageStop $State 'Partial' 'ItemBudget'
    }
    if ($null -eq $page.nextToken) {
        return Set-PageStop $State 'Complete' 'EndOfData'
    }
    $State.Cursor = $page.nextToken
    return $true
}

function New-PageResult {
    <#
    .SYNOPSIS
    Builds the caller's envelope from the retained records and stop state.
    .PARAMETER State
    Per-call hashtable with Items list, RequestsAttempted, ItemsFetched, Status
    and StopReason. ItemsReturned is derived from the list count.
    .OUTPUTS
    PSCustomObject. Seven fields, with Items always an array. IsComplete is true
    only for the Complete state selected on EndOfData by the reader.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $state = @{
        Items = [Collections.Generic.List[object]]::new()
        RequestsAttempted = 0; ItemsFetched = [long]0
        Status = 'Error'; StopReason = 'InvalidArgument'
    }
    New-PageResult -State $state | ConvertTo-Json -Depth 20 -Compress
    #>
    param($State)

    return [pscustomobject]@{
        Items = [object[]]$State.Items.ToArray()
        RequestsAttempted = $State.RequestsAttempted
        ItemsFetched = $State.ItemsFetched
        ItemsReturned = $State.Items.Count
        Status = $State.Status
        StopReason = $State.StopReason
        IsComplete = $State.Status -ceq 'Complete'
    }
}

function Get-BoundedPage {
    <#
    .SYNOPSIS
    Reads local pages with explicit request, record and completion limits.
    .PARAMETER Endpoint
    Absolute HTTP loopback URL without user information, query or fragment.
    Response tokens cannot change this destination.
    .PARAMETER MaxPages
    Numeric integer from 1 through Int32.MaxValue; defaults to 10. Includes failed
    GET attempts. Invalid types or values return InvalidArgument before HTTP.
    .PARAMETER MaxItems
    Numeric integer from 1 through Int32.MaxValue; defaults to 100. Bounds retained
    records, not response bytes or deserialization memory. ItemBudget wins when
    both budgets are exhausted on a nonterminal page.
    .OUTPUTS
    PSCustomObject. Items, RequestsAttempted, ItemsFetched, ItemsReturned, Status,
    StopReason and IsComplete. Errors retain earlier accepted records and write
    diagnostics to stderr. A zero process exit does not establish completeness.
    .EXAMPLE
    . ./Get-BoundedPage.ps1
    $Base = Read-Host 'Paste the base URL printed by the running api.mjs'
    Get-BoundedPage -Endpoint "$Base/normal" -MaxPages 2 | ConvertTo-Json -Depth 20 -Compress
    #>
    param($Endpoint, $MaxPages = 10, $MaxItems = 100)

    $state = @{
        Items = [Collections.Generic.List[object]]::new()
        Seen = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
        Cursor = ''
        RequestsAttempted = 0
        ItemsFetched = [long]0
        Status = 'Error'
        StopReason = 'InvalidArgument'
    }
    try {
        if (-not (Test-PageBudget $MaxPages)) { throw 'MaxPages must be a positive Int32-valued number.' }
        if (-not (Test-PageBudget $MaxItems)) { throw 'MaxItems must be a positive Int32-valued number.' }
        $endpointUrl = Get-PageEndpoint $Endpoint
    }
    catch {
        [Console]::Error.WriteLine($_.Exception.Message)
        return New-PageResult $state
    }
    while (Invoke-PageStep $state $endpointUrl $MaxPages $MaxItems) {}
    return New-PageResult $state
}
```

I check for a cyclic continuation before keeping any records from the page because that page must not change the returned prefix. Each step registers the requested cursor before HTTP. After validating the entire response, it counts fetched items and checks the next token against those cursors. A repeated continuation rejects the current page's records.

After that check, the reader appends the allowed prefix. Leaving out any records forces `Partial/ItemBudget`, even if the page says `nextToken: null`. When the whole page fits and its continuation is null, the result is complete.

A partial result doesn't prove there's another record. If a nonterminal page fills a budget exactly, the reader stops before another GET, so it can't settle that question. A terminal page that fits exactly is complete. If both budgets run out together, `ItemBudget` wins because the item check comes first.

HTTP, decoding and schema failures return `Error/ReadFailed`. You still get records from earlier accepted pages. Diagnostics go to stderr; the JSON result keeps stable fields instead of platform-dependent exception text. Check `Status` and `StopReason` even if the PowerShell process exits with code zero, because serializing an error result can still produce that exit code.


## Run the before and after

The walkthrough takes the fixture's base URL and prints three JSON envelopes: a complete normal read, a two-page normal read and a repeated-token error. Its diagnostic stays on stderr.

### 3. Save `Show-Examples.ps1`

```powershell {linenos=false}
<#
.SYNOPSIS
Prints complete, page-limited and repeated-token results from the local fixture.
.PARAMETER Base
Base URL printed by the running api.mjs, with no trailing slash.
.OUTPUTS
Three JSON lines in call order. The repeat-case diagnostic goes to stderr.
.EXAMPLE
$Base = Read-Host 'Paste the base URL printed by the running api.mjs'
& ./Show-Examples.ps1 -Base $Base
#>
param([string]$Base)

. "$PSScriptRoot/Get-BoundedPage.ps1"
Get-BoundedPage "$Base/normal" | ConvertTo-Json -Depth 20 -Compress
Get-BoundedPage "$Base/normal" -MaxPages 2 | ConvertTo-Json -Depth 20 -Compress
Get-BoundedPage "$Base/repeat" | ConvertTo-Json -Depth 20 -Compress
```

Open a second PowerShell 7.6 terminal. From the same parent directory used above, enter the directory containing your saved files and set `PWSH` again. Each terminal has its own environment. Paste the first terminal's actual printed URL at the prompt; don't reuse a port from an earlier run.

```powershell {linenos=false}
Set-Location './bounded pages'
$env:PWSH = (Get-Process -Id $PID).Path
$Base = Read-Host 'Paste the base URL printed by api.mjs'
```

First, run the deliberately incomplete one-page read. It omits continuation handling and outputs only the received items:

```powershell {linenos=false}
$page = Invoke-RestMethod -Uri "$Base/normal" -Method Get -NoProxy -ErrorAction Stop
$page.items | ConvertTo-Json -Depth 20 -Compress
```

This returns IDs 1 and 2 after one GET and leaves records 3 through 5 on later pages. Run the bounded examples against the same fixture. The `&` operator invokes the executable path even if it contains spaces:

```powershell {linenos=false}
& $env:PWSH -NoLogo -NoProfile -File ./Show-Examples.ps1 -Base $Base
```

In the walkthrough, `r` denotes the first GET without a cursor; subsequent letters are the exact `cursor` query values. Counts are `RequestsAttempted` / `ItemsFetched` / `ItemsReturned`, in that order.

| Call | Observed result |
| --- | --- |
| Normal | GET order: r, A, B; Returned IDs: 1, 2, 3, 4, 5; Counts: 3/5/5; `Complete/EndOfData` |
| Normal with `MaxPages` 2 | GET order: r, A; Returned IDs: 1, 2, 3, 4; Counts: 2/4/4; `Partial/PageBudget` |
| Repeat | GET order: r, A; Returned IDs: 1, 2; Counts: 2/4/2; `Error/RepeatedToken` |

The repeat case fetched four records but returned two because the second page contains records 3 and 4 and points back to `A`. The reader counts those records as fetched, then discards them when it rejects the continuation.


You can also read the helper's full help or just its examples from this directory:

```powershell {linenos=false}
. ./Get-BoundedPage.ps1
Get-Help Get-BoundedPage -Full
Get-Help Read-LabPage -Examples
```

## Exercise the boundaries and failures

`Invoke-Case.ps1` reads a JSON array and writes one envelope per request. Supplying two requests lets the verifier check that state doesn't leak between calls in the same PowerShell process.

### 4. Save `Invoke-Case.ps1`

```powershell {linenos=false}
<#
.SYNOPSIS
Runs a JSON array of reader requests in one PowerShell process.
.PARAMETER RequestFile
Path to a UTF-8 JSON array of objects with Endpoint and optional MaxPages and
MaxItems. Each object is passed to Get-BoundedPage without a type-changing cast.
.OUTPUTS
One JSON envelope per request. Reader diagnostics go to stderr.
.EXAMPLE
$Base = Read-Host 'Paste the base URL printed by the running api.mjs'
@(@{ Endpoint = "$Base/normal"; MaxPages = 2 }) |
    ConvertTo-Json -Depth 10 -AsArray | Set-Content -LiteralPath ./requests.json
& ./Invoke-Case.ps1 -RequestFile ./requests.json
#>
param([string]$RequestFile)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot/Get-BoundedPage.ps1"
$requests = Get-Content -Raw -LiteralPath $RequestFile | ConvertFrom-Json -AsHashtable
foreach ($request in $requests) {
    Get-BoundedPage @request | ConvertTo-Json -Depth 20 -Compress
}
```

JSON can't carry every budget value the function can receive. `Invoke-NumericProbe.ps1` reads a text file containing the endpoint and passes non-finite numbers, enums and precise Decimal fractions directly to the reader. An early Double conversion would round those fractions, so the probe checks that validation rejects the original values.

Both Decimal strings use an explicit `InvariantCulture` provider because [Decimal.Parse](https://learn.microsoft.com/en-us/dotnet/api/system.decimal.parse?view=net-10.0) uses the caller's number format when no provider is supplied. Under `fr-FR`, the old adapter threw before its probe loop could test budget validation. The explicit provider keeps the exact fractions without changing the reader's culture or converting them through Double.

### 5. Save `Invoke-NumericProbe.ps1`

```powershell {linenos=false}
<#
.SYNOPSIS
Exercises typed budgets that JSON cannot represent faithfully.
.PARAMETER RequestFile
Path to a UTF-8 text file containing the local normal-fixture endpoint.
.OUTPUTS
Fourteen JSON envelopes: twelve rejected budgets, then Decimal 1 page and item
controls. Rejection diagnostics go to stderr; only the controls issue GETs.
.EXAMPLE
$Base = Read-Host 'Paste the base URL printed by the running api.mjs'
Set-Content -LiteralPath ./endpoint.txt -Value "$Base/normal" -NoNewline
& ./Invoke-NumericProbe.ps1 -RequestFile ./endpoint.txt
#>
param([string]$RequestFile)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot/Get-BoundedPage.ps1"
$endpoint = Get-Content -Raw -LiteralPath $RequestFile
foreach ($value in @([double]::NaN, [double]::PositiveInfinity, [double]::NegativeInfinity,
        [decimal]::Parse('1.0000000000000000000000000001', [Globalization.CultureInfo]::InvariantCulture),
        [decimal]::Parse('2147483647.0000000001', [Globalization.CultureInfo]::InvariantCulture))) {
    foreach ($key in @('MaxPages', 'MaxItems')) {
        $arguments = @{ Endpoint = $endpoint; MaxPages = 10; MaxItems = 100 }
        $arguments[$key] = $value
        Get-BoundedPage @arguments | ConvertTo-Json -Depth 20 -Compress
    }
}
foreach ($value in @([DayOfWeek]::Monday, [decimal]1)) {
    foreach ($key in @('MaxPages', 'MaxItems')) {
        $arguments = @{ Endpoint = $endpoint; MaxPages = 10; MaxItems = 100 }
        $arguments[$key] = $value
        Get-BoundedPage @arguments | ConvertTo-Json -Depth 20 -Compress
    }
}
```

`verify.mjs` starts its own listeners and waits for readiness. These addresses differ from the standalone fixture's address. `launch` runs the saved PowerShell adapters, and `runCase` compares all seven result fields with literal expectations and the server's ordered method/path/query trace. Returned JSON alone can't show whether a reader made an extra GET, retried or followed a redirect.

The verifier also checks repeated calls, typed inputs and the three walkthrough results. To check that its assertions catch a broken cycle guard, it changes that guard in an isolated copy. Ordinary completion must still pass; repeat and cycle assertions must fail. The production reader has no switch to disable that guard.

Every child has a 10-second watchdog; a watchdog kill fails the check. The verifier closes its servers in `finally` and retains a sibling `run-work-*` directory containing its request inputs and isolated mutant.

### 6. Save `verify.mjs`

```javascript {linenos=false}
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startApi } from './api.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const pwsh = process.env.PWSH;
assert.ok(pwsh, 'Set PWSH to the PowerShell executable');
const ids = values => values.map(id => ({ id }));
const result = (values, requests, fetched, status, reason) => ({
  Items: ids(values), RequestsAttempted: requests, ItemsFetched: fetched,
  ItemsReturned: values.length, Status: status, StopReason: reason,
  IsComplete: status === 'Complete'
});
const complete = (values, requests, fetched) => result(values, requests, fetched, 'Complete', 'EndOfData');
const partial = (values, requests, fetched, reason) => result(values, requests, fetched, 'Partial', reason);
const error = (values, requests, fetched, reason) => result(values, requests, fetched, 'Error', reason);
const cases = [
  ['normal', {}, complete([1,2,3,4,5],3,5), ['r','A','B']],
  ['empty', {}, complete([],1,0), ['r']],
  ['emptyAfter', {}, complete([1,2],2,2), ['r','A']],
  ['emptyNext', {}, complete([1],2,1), ['r','A']],
  ['normal', {MaxPages:2}, partial([1,2,3,4],2,4,'PageBudget'), ['r','A']],
  ['normal', {MaxPages:3}, complete([1,2,3,4,5],3,5), ['r','A','B']],
  ['normal', {MaxPages:4}, complete([1,2,3,4,5],3,5), ['r','A','B']],
  ['normal', {MaxItems:3}, partial([1,2,3],2,4,'ItemBudget'), ['r','A']],
  ['normal', {MaxItems:4}, partial([1,2,3,4],2,4,'ItemBudget'), ['r','A']],
  ['normal', {MaxItems:5}, complete([1,2,3,4,5],3,5), ['r','A','B']],
  ['oversized', {MaxItems:2}, partial([1,2],1,3,'ItemBudget'), ['r']],
  ['normal', {MaxPages:1,MaxItems:2}, partial([1,2],1,2,'ItemBudget'), ['r']],
  ['emptyAfter', {MaxItems:2}, partial([1,2],1,2,'ItemBudget'), ['r']],
  ['repeat', {}, error([1,2],2,4,'RepeatedToken'), ['r','A']],
  ['cycle', {}, error([1,2,3,4],3,6,'RepeatedToken'), ['r','A','B']],
  ['caseSensitive', {}, complete([1,2,3],3,3), ['r','A','a']],
  ['firstFailure', {}, error([],1,0,'ReadFailed'), ['r']]
];
const malformed = ['json','nullRoot','scalarRoot','missingItems','nullItems','scalarItems',
  'badItem','nullItem','fractionalId','booleanId','missingId','missingToken','numberToken',
  'objectToken','emptyToken','urlToken','newlineToken','longToken','429','503','redirect','stall'];
for (const name of malformed) cases.push([name, {}, error([1,2],2,2,'ReadFailed'), ['r','A']]);
for (const key of ['MaxPages','MaxItems']) {
  for (const value of [0,-1,1.5,true,null,'2',2147483648,[],{}]) {
    cases.push(['normal', {[key]:value}, error([],0,0,'InvalidArgument'), []]);
  }
}
for (const endpoint of ['https://example.invalid/normal','http://127.0.0.1/normal?x=1',
  'http://u@127.0.0.1/normal','http://127.0.0.1/normal#x','not a uri',null]) {
  cases.push(['normal', {Endpoint:endpoint}, error([],0,0,'InvalidArgument'), []]);
}
cases.push(['normal', {MaxPages:2147483647,MaxItems:2147483647}, complete([1,2,3,4,5],3,5), ['r','A','B']]);
cases.push(['extraFields', {}, {...complete([],1,1), Items:[{id:-1,label:'kept'}], ItemsReturned:1}, ['r']]);

function launch(directory, requestFile, entry = 'Invoke-Case.ps1', parameter = '-RequestFile') {
  return new Promise((resolve, reject) => {
    const child = spawn(pwsh, ['-NoLogo','-NoProfile','-NonInteractive','-File',join(directory,entry),parameter,requestFile]);
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('10-second watchdog expired')); }, 10000);
    child.stdout.on('data', data => { stdout += data; });
    child.stderr.on('data', data => { stderr += data; });
    child.on('error', reject);
    child.on('close', code => { clearTimeout(timer); resolve({code,stdout,stderr}); });
  });
}

function expectedTrace(scenario, cursors) {
  return cursors.map(cursor => ({method:'GET',url:`/${scenario}${cursor === 'r' ? '' : `?cursor=${encodeURIComponent(cursor)}`}`}));
}

async function runCase(api, directory, scratch, test, index) {
  const [scenario, budgets, expected, cursors] = test;
  const requestFile = join(scratch,`request-${index}.json`);
  await writeFile(requestFile,JSON.stringify([{Endpoint:`${api.base}/${scenario}`,MaxPages:10,MaxItems:100,...budgets}]));
  const start = api.trace.length;
  const destinationStart = api.destinationTrace.length;
  const observed = await launch(directory,requestFile);
  const record = {index,scenario,budgets,expected,expectedTrace:expectedTrace(scenario,cursors),...observed,
    trace:api.trace.slice(start),destinationTrace:api.destinationTrace.slice(destinationStart)};
  process.stdout.write(`${JSON.stringify(record)}\n`);
  assert.equal(observed.code,0,`case ${index} native exit`);
  const actual = JSON.parse(observed.stdout);
  assert.deepEqual(actual,expected,`case ${index} complete result`);
  assert.deepEqual(record.trace,record.expectedTrace,`case ${index} actual HTTP trace`);
  assert.deepEqual(record.destinationTrace,[],`case ${index} redirect destination untouched`);
  if (expected.Status === 'Error') assert.notEqual(observed.stderr.trim(),'','error diagnostic');
  else assert.equal(observed.stderr,'','successful stderr');
}

async function repeatedCalls(api, scratch) {
  const requestFile = join(scratch,'twice.json');
  const request = {Endpoint:`${api.base}/normal`,MaxPages:10,MaxItems:100};
  await writeFile(requestFile,JSON.stringify([request,request]));
  const start = api.trace.length;
  const observed = await launch(here,requestFile);
  process.stdout.write(`${JSON.stringify({kind:'same-process',...observed,trace:api.trace.slice(start)})}\n`);
  assert.equal(observed.code,0);
  assert.deepEqual(observed.stdout.trim().split('\n').map(line => JSON.parse(line)),[complete([1,2,3,4,5],3,5),complete([1,2,3,4,5],3,5)]);
  assert.deepEqual(api.trace.slice(start),[...expectedTrace('normal',['r','A','B']),...expectedTrace('normal',['r','A','B'])]);
}

async function numericProbes(api, scratch) {
  const requestFile = join(scratch,'numeric.txt');
  await writeFile(requestFile,`${api.base}/normal`);
  const start = api.trace.length;
  const observed = await launch(here,requestFile,'Invoke-NumericProbe.ps1');
  process.stdout.write(`${JSON.stringify({kind:'typed-budget-probes',...observed,trace:api.trace.slice(start)})}\n`);
  assert.equal(observed.code,0);
  const expected = [
    ...Array.from({length:12}, () => error([],0,0,'InvalidArgument')),
    partial([1,2],1,2,'PageBudget'),partial([1],1,2,'ItemBudget')
  ];
  assert.deepEqual(observed.stdout.trim().split('\n').map(line => JSON.parse(line)),expected);
  assert.deepEqual(api.trace.slice(start),[...expectedTrace('normal',['r']),...expectedTrace('normal',['r'])]);
  assert.notEqual(observed.stderr.trim(),'');
}

async function examples(api) {
  const start = api.trace.length;
  const observed = await launch(here,api.base,'Show-Examples.ps1','-Base');
  process.stdout.write(`${JSON.stringify({kind:'article-examples',...observed,trace:api.trace.slice(start)})}\n`);
  assert.equal(observed.code,0);
  assert.deepEqual(observed.stdout.trim().split('\n').map(line => JSON.parse(line)),[
    complete([1,2,3,4,5],3,5),partial([1,2,3,4],2,4,'PageBudget'),error([1,2],2,4,'RepeatedToken')]);
  assert.deepEqual(api.trace.slice(start),[
    ...expectedTrace('normal',['r','A','B']),...expectedTrace('normal',['r','A']),...expectedTrace('repeat',['r','A'])]);
  assert.match(observed.stderr,/Continuation refers/);
}

async function mutation(api, scratch) {
  const mutant = join(scratch,'mutant');
  await cp(here,mutant,{recursive:true});
  const sourcePath = join(mutant,'Get-BoundedPage.ps1');
  const source = await readFile(sourcePath,'utf8');
  const site = 'if (Test-RepeatedContinuation $page $state.Seen) {';
  assert.equal(source.split(site).length,2,'single verified mutation site');
  await writeFile(sourcePath,source.replace(site,'if ($false) {'));
  await runCase(api,mutant,scratch,cases[0],'mutant-control');
  await assert.rejects(runCase(api,mutant,scratch,cases[13],'mutant-repeat'), /complete result|actual HTTP trace/);
  await assert.rejects(runCase(api,mutant,scratch,cases[14],'mutant-cycle'), /complete result|actual HTTP trace/);
  process.stdout.write(`${JSON.stringify({kind:'mutation',ordinaryControl:'passed',repeat:'rejected',cycle:'rejected'})}\n`);
  await runCase(api,here,scratch,cases[13],'restored-repeat');
}

async function main() {
  const scratch = await mkdtemp(join(here,'..','run-work-'));
  const api = await startApi();
  process.stdout.write(`${JSON.stringify({kind:'ready',base:api.base,node:process.version,pwsh,scratch})}\n`);
  try {
    for (const [index,test] of cases.entries()) await runCase(api,here,scratch,test,index);
    await runCase(api,here,scratch,cases[0],'fresh-process-replay');
    await repeatedCalls(api,scratch);
    await numericProbes(api,scratch);
    await examples(api);
    await mutation(api,scratch);
    process.stdout.write(`${JSON.stringify({kind:'summary',cases:cases.length,passed:true})}\n`);
  } finally {
    await api.close();
  }
}

await main();
```

Run the verifier in the second PowerShell terminal, from the directory containing all six files. Inspect the native exit code and the last result line after it finishes:

```powershell {linenos=false}
node ./verify.mjs > ./results.jsonl
$verifyExit = $LASTEXITCODE
$verifyExit
Get-Content -LiteralPath ./results.jsonl -Tail 1
```

A passing run exits with code `0` and ends with:

```json {linenos=false}
{"kind":"summary","cases":65,"passed":true}
```

Those 65 cases are followed by a fresh-process replay, two calls in one process, fourteen typed budget probes, the three walkthrough calls and mutation checks before the summary is written. Ten typed probes reject non-finite numbers or precise Decimal fractions, two reject enums, and two use Decimal 1 as positive controls for the page and item budgets.

The cases cover empty pages, exact budgets, oversized pages, distinct `A/a` cursors, a longer cycle, malformed bodies and HTTP failures. The redirect destination must receive no requests. The stalled response must return `Error/ReadFailed` through the HTTP timeout before the watchdog expires. Check any nonzero exit or missing summary. The presence of a results file doesn't establish success.

When finished, use Ctrl+C in the first terminal to stop the standalone fixture. The verifier closes its own independent listeners.

## What the budgets don't limit

`MaxItems` limits the records you retain. A server can still send a large page before the reader trims it, so the budget doesn't limit downloaded bytes or the memory needed to deserialize one response.

The connection and operation timeouts are two seconds each. Microsoft documents [OperationTimeoutSeconds](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6#-operationtimeoutseconds) as a read-stall timeout. Together, these settings still don't impose a total wall-clock deadline. They don't bound a response that keeps progressing.

The lab doesn't retry or return a resume cursor. A cursor beyond a partly retained page would skip the records left out of that page.

If your caller needs a complete set, accept only `IsComplete: true`. Keep the stopping reason with every partial or error result.
