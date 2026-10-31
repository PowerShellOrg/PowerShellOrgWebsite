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

A REST-reading tool returns four records. A caller still needs to know why it stopped: the API reached its end, the tool used its request allowance, or another page failed. Those states tell an agent or another script whether it has a complete set.

This example adds request and item budgets to a PowerShell reader and returns the stopping reason with the data. A local API supplies normal pages, broken continuations and failed responses, so the behavior can be reproduced without an account or credentials.

## The finished result

The normal fixture has five records across three pages. Reading it within both budgets returns this object:

```json {linenos=false}
{
  "Items": [
    {"id": 1},
    {"id": 2},
    {"id": 3},
    {"id": 4},
    {"id": 5}
  ],
  "RequestsAttempted": 3,
  "ItemsFetched": 5,
  "ItemsReturned": 5,
  "Status": "Complete",
  "StopReason": "EndOfData",
  "IsComplete": true
}
```

With a two-page budget, the same reader returns records 1 through 4 with `Partial/PageBudget`. If the second page points back to its own cursor, it returns records 1 and 2 with `Error/RepeatedToken`. The current page is discarded when its continuation is cyclic; records from earlier accepted pages remain available.

## Define the page and result contracts

The API returns an object with two required properties: `items`, an array of objects with integer `id` values, and `nextToken`, either a nonempty ASCII token or `null`. Only `null` means the end. An empty page can still have a continuation.

Tokens match `\A[A-Za-z0-9_-]{1,64}\z`. This API treats `A` and `a` as different cursors. PowerShell's ordinary string comparisons are case-insensitive, so the reader uses an explicit `StringComparer.Ordinal` set for cursor identity. See [PowerShell comparison operators](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comparison_operators?view=powershell-7.6#common-features).

| Result | Meaning |
| --- | --- |
| Data | `Items`: retained records, always an array |
| Attempts | `RequestsAttempted`: GET attempts, including a failed attempt |
| Fetched | `ItemsFetched`: records in schema-valid received pages, including a page rejected for cyclic continuation |
| Returned | `ItemsReturned`: exactly `Items.Count` |
| State | `Status`: `Complete`, `Partial` or `Error` |
| Reason | `StopReason`: `EndOfData`, `PageBudget`, `ItemBudget`, `RepeatedToken`, `ReadFailed` or `InvalidArgument` |
| Complete? | `IsComplete`: true only for `Complete/EndOfData` |

`MaxPages` caps attempted GETs. `MaxItems` caps returned records. Both accept numeric integer values from 1 through `Int32.MaxValue`; strings, Boolean values, enums, null, fractions and non-finite numbers fail before HTTP. Keep these parameters untyped until validation: [parameter binding](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_type_conversion?view=powershell-7.6#parameter-binding-conversions) can convert a value to `[int]` before the function checks it.

A partial result does not prove another record exists. If a nonterminal page fills a budget exactly, the reader stops without fetching another page to settle that uncertainty. If a terminal page fits exactly, it is complete. If both budgets run out together, `ItemBudget` wins.

## How the pieces fit

Start with `api.mjs`, which supplies fixture responses and records requests. `Get-BoundedPage.ps1` implements the reader, and `Show-Examples.ps1` calls it for the three outcomes above. Two process adapters let `verify.mjs` compare returned objects with the HTTP traces.

The reader makes its decisions in this order:

1. Validate the endpoint and budgets before HTTP.
2. Before each GET, check the item budget, then the page budget, then register the cursor.
3. Validate the received page, count fetched items, and reject a cyclic continuation before retaining records.
4. Retain the allowed prefix. Omitted records force `Partial/ItemBudget`; otherwise a null continuation completes the result. A nonterminal page returns to the budget checks.

## Run a local API

The example ran with PowerShell 7.6.9 and Node.js 26.3.0 on macOS 26.3.2 arm64. Other operating systems were not tested. Use an installed PowerShell 7.6 executable and Node.js; there are no package dependencies.

In Bash, create a working directory:

```bash {linenos=false}
mkdir bounded-pages
cd bounded-pages
export PWSH='/absolute/path/to/pwsh'
"$PWSH" -NoLogo -NoProfile -Command '$PSVersionTable.PSVersion.ToString()'
node --version
```

Save each named code block below as its filename in that directory. The server binds only to `127.0.0.1` and asks the OS for an available port. Its fixture maps keep the data deterministic. A separate listener records whether a redirect was followed.

### `api.mjs`

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

In the first Bash terminal, start the server and leave it running:

```bash {linenos=false}
node api.mjs
```

It prints its base URL. Keep that value for the walkthrough. Stop this standalone server with Ctrl+C when finished.

## Build the bounded reader

The reader accepts a fixed HTTP loopback endpoint without user information, query or fragment. It adds an encoded `cursor` query value to that same endpoint. It never treats response content as a destination URL.

Each request explicitly disables redirects and retries, bypasses proxies and uses terminating errors. The [Invoke-RestMethod documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6#-maximumredirection) defines zero as disabling redirection and documents the retry controls. The fixture checks the actual request trace for 429, 503 and redirect responses.

### `Get-BoundedPage.ps1`

```powershell {linenos=false}
function Test-PageBudget {
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
    param($Item)

    if ($Item -isnot [pscustomobject]) { return $false }
    return $Item.id -is [long] -or $Item.id -is [int]
}

function Assert-PageShape {
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
    param($State, [string]$Status, [string]$Reason)

    $State.Status = $Status
    $State.StopReason = $Reason
    return $false
}

function Test-RepeatedContinuation {
    param($Page, $Seen)

    return $null -ne $Page.nextToken -and $Seen.Contains($Page.nextToken)
}

function Invoke-PageStep {
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

Each step registers the requested cursor before HTTP. After validating the entire response, it counts fetched items and checks the next token against that set. A repeated continuation rejects the current page's items before they can affect the returned prefix.

Only then does it append the allowed prefix. Omitted items force `Partial/ItemBudget`, even when that page says `nextToken: null`. Otherwise terminal evidence wins. The next iteration checks budgets before another GET, so an exactly full nonterminal page cannot cause an extra request.

HTTP, decoding and schema failures return `Error/ReadFailed`. Earlier accepted pages remain available. Diagnostics go to stderr; the JSON result has stable fields instead of platform-dependent exception text. A caller must inspect `Status` and `StopReason`; serializing an error object can still leave the PowerShell process with exit code zero.

## Compare three outcomes

Save this walkthrough as `Show-Examples.ps1`:

### `Show-Examples.ps1`

```powershell {linenos=false}
param([string]$Base)

. "$PSScriptRoot/Get-BoundedPage.ps1"
Get-BoundedPage "$Base/normal" | ConvertTo-Json -Depth 20 -Compress
Get-BoundedPage "$Base/normal" -MaxPages 2 | ConvertTo-Json -Depth 20 -Compress
Get-BoundedPage "$Base/repeat" | ConvertTo-Json -Depth 20 -Compress
```

In a second Bash terminal, change to the same directory. Each terminal needs its own `PWSH` setting, so repeat the export. Replace the example port with the one printed by the server:

```bash {linenos=false}
export PWSH='/absolute/path/to/pwsh'
"$PWSH" -NoLogo -NoProfile -File ./Show-Examples.ps1 -Base http://127.0.0.1:54321
```

The walkthrough returned these records and counters. `r` denotes the first GET with no cursor; subsequent letters are the exact `cursor` query values.

- Normal: GET order r, A, B; returned IDs 1, 2, 3, 4, 5. Attempts/fetched/returned: 3/5/5. Result: Complete/EndOfData.
- Normal with MaxPages 2: GET order r, A; returned IDs 1, 2, 3, 4. Counts: 2/4/4. Result: Partial/PageBudget.
- Repeat: GET order r, A; returned IDs 1, 2. Counts: 2/4/2. Result: Error/RepeatedToken.

The repeating fixture's second page contains records 3 and 4, but its continuation points back to `A`. Those records count as fetched and are discarded.

## Exercise the boundaries and failures

Save these two process adapters and the verifier. The ordinary adapter reads JSON requests; the numeric probe also passes values JSON cannot represent and precise decimal fractions that an early Double cast would round.

### `Invoke-Case.ps1`

```powershell {linenos=false}
param([string]$RequestFile)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot/Get-BoundedPage.ps1"
$requests = Get-Content -Raw -LiteralPath $RequestFile | ConvertFrom-Json -AsHashtable
foreach ($request in $requests) {
    Get-BoundedPage @request | ConvertTo-Json -Depth 20 -Compress
}
```

### `Invoke-NumericProbe.ps1`

```powershell {linenos=false}
param([string]$RequestFile)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot/Get-BoundedPage.ps1"
$endpoint = Get-Content -Raw -LiteralPath $RequestFile
foreach ($value in @([double]::NaN, [double]::PositiveInfinity, [double]::NegativeInfinity,
        [decimal]::Parse('1.0000000000000000000000000001'),
        [decimal]::Parse('2147483647.0000000001'))) {
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

### `verify.mjs`

The case table gives each scenario an expected result and HTTP request order. `runCase` launches PowerShell and checks both. Separate functions exercise repeated calls, typed budgets, the walkthrough and an isolated mutation of the cycle guard.

The verifier starts its own listeners and waits for readiness. It compares all seven result fields and actual server-observed method/path/query order. Every child has a 10-second watchdog; a watchdog kill fails the test. It closes its own servers in `finally` and retains a sibling `run-work-*` directory containing inputs and the isolated mutant.

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

From Bash, run:

```bash {linenos=false}
node verify.mjs > results.jsonl
```

The executed suite passed 65 individual cases, a fresh-process replay, two calls in one process, fourteen typed budget probes and the three walkthrough calls. The probes include ten non-finite/precise-decimal negatives, enum rejection for each budget and Decimal 1 positive controls for both budgets. Cases cover empty pages, exact budgets, oversized pages, distinct `A/a`, a longer cycle, malformed bodies, HTTP failures, redirects and a stalled body. The redirect destination received no requests. The stalled response returned `Error/ReadFailed` through the HTTP timeout, without a watchdog kill.

The verifier also changes the repeated-continuation guard to `if ($false)` in a separate copy. Ordinary completion must still pass, while repeat and cycle checks must reject the changed reader. This checks that the assertions detect incorrectly retained page data, even when the reader still terminates. The production reader has no switch to disable this guard.

The final verifier line from the run was:

```json {linenos=false}
{"kind":"summary","cases":65,"passed":true}
```

## What these bounds leave open

`MaxItems` limits what the caller retains. It does not limit downloaded bytes or the memory used to deserialize one response. A server can send a large page before the reader trims its prefix.

The connection and operation timeouts are two seconds each. Microsoft documents [OperationTimeoutSeconds](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6#-operationtimeoutseconds) as a read-stall timeout. These settings do not form a total wall-clock deadline; a continuously progressing response is outside that guarantee.

This lab omits retries and resume cursors. A cursor beyond a partly retained page would skip its omitted records. For a caller that requires a complete set, accept only `IsComplete: true` and retain the stopping reason with every partial or error result.
