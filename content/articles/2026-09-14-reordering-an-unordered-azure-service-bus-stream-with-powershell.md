---
title: "Reordering an Unordered Azure Service Bus Stream with PowerShell"
description: "Explore a PowerShell approach that combines Azure Service Bus message deferral, sequence numbers, and session state to turn an out-of-order stream into ordered output."
author: Andrey Vernigora
authors:
  - Andrey Vernigora
date: "2026-09-14T00:00:00+00:00"
categories:
  - PowerShell for Developers
tags:
  - powershell
  - azure-service-bus
  - messaging
  - message-ordering
  - distributed-systems
---

Azure Service Bus sessions are the natural choice when a consumer must process related messages in order. But what if the messages already arrive through a non-session subscription, while a downstream consumer still expects an ordered, session-aware stream?

This article explores one possible bridge between those two models. The idea is to use message deferral as a broker-backed buffer and session state as a small index that remembers which deferred messages can be released later.

It is deliberately an exploration of the approach, not a production-ready implementation. The interesting part is the state machine and the failure modes it exposes.

## The scenario

Suppose every message carries two pieces of application-level metadata:

- `SessionId` identifies one logical stream.
- `order` is a monotonically increasing integer within that stream.

The input subscription does **not** require sessions. Messages for one logical stream can therefore be observed as:

```text
1, 3, 4, 2
```

The downstream subscription does require sessions and should expose:

```text
1, 2, 3, 4
```

In the sample, the flow looks like this:

```text
NO_SESSION / NO_SESS_SUB
             |
             v
      PowerShell reorderer
       |             |
       | defer       | forward
       v             v
  broker storage   ORDERED_TOPIC / SESS_SUB
       ^
       |
  session state: LastSeen + [(order, sequence number)]
```

The full sample is implemented in [`reorderAndForward2.ps1`](https://github.com/eosfor/pubs/blob/main/scripts/orderingTest/reorderAndForward2.ps1) in the [`pubs`](https://github.com/eosfor/pubs) repository.

## Keep payloads in the broker

An obvious design would keep early messages in a PowerShell collection until the missing message arrives. That creates a fragile in-memory buffer: a process restart loses it, and payloads consume memory while a gap remains open.

Service Bus already has a better place for those payloads. A deferred message stays in the broker and can later be retrieved by its `SequenceNumber`.

The reorderer only persists compact metadata in session state:

```text
LastSeenOrderNum = 1
Deferred = [
  { Order = 3; Seq = 42 },
  { Order = 4; Seq = 43 }
]
```

This gives the script enough information to retrieve deferred messages without copying their bodies into its own state.

## The three decisions

For each message, the script loads state for its logical `SessionId` and calculates:

```powershell
$expected = $state.LastSeenOrderNum + 1
```

It then makes one of three decisions:

| Condition | Action |
| --- | --- |
| `order -eq expected` | Forward the message, complete the input, then drain any contiguous deferred messages. |
| `order -gt expected` | Defer the input and save its `order` and `SequenceNumber`. |
| `order -lt expected` | Treat it as stale and dead-letter it. |

The heart of the approach can be reduced to this pseudocode:

```powershell
if ($order -eq $expected) {
    Send-ToOrderedTopic $message
    Complete-InputMessage $message
    $state.LastSeenOrderNum = $order

    while ($state contains ($state.LastSeenOrderNum + 1)) {
        $next = Receive-DeferredMessage -SequenceNumber $sequenceNumber
        Send-ToOrderedTopic $next
        Complete-InputMessage $next
        $state.LastSeenOrderNum++
    }
}
elseif ($order -gt $expected) {
    Defer-InputMessage $message
    $state.Deferred.Add(@{
        Order = $order
        Seq   = $message.SequenceNumber
    })
}
else {
    DeadLetter-InputMessage $message
}

Save-State $state
```

The actual script uses typed `SessionOrderingState` and `OrderSeq` objects, rather than untyped hashtables, and separates these operations into small PowerShell functions.

## Walking through a gap

First, the producer sends `1`, `3`, and `4`. The reorderer forwards `1`, but it cannot forward `3` or `4`: both depend on the missing `2`. Those two messages are deferred and their sequence numbers are saved.

![Terminal output after orders 3 and 4 have been deferred](/images/articles/service-bus-reordering-deferred.png)

The state is now:

```text
LastSeen = 1
Deferred = [3, 4]
```

When `2` arrives, the reorderer forwards it and advances `LastSeen` to `2`. It can now retrieve deferred `3` by sequence number. After forwarding `3`, the same check makes `4` contiguous, so the script retrieves and forwards that message too.

![Terminal output showing the ordered result 1, 2, 3, 4](/images/articles/service-bus-reordering-ordered-output.png)

Here is the complete run:

![Terminal screencast of the reordering example](/images/articles/service-bus-reordering-demo.gif)

## Running the experiment locally

The repository contains a Docker Compose definition for the Azure Service Bus Emulator and SQL Edge. You need Docker Desktop, PowerShell 7, and the .NET 8 or 9 SDK.

Clone the repository, create the `.env` file described in its README, and start the emulator:

```bash
git clone https://github.com/eosfor/pubs.git
cd pubs
docker compose -f docker-compose.sbus.yml up -d
dotnet build src/SBPowerShell/SBPowerShell.csproj -c Release
```

Then open PowerShell and load the module and the reordering functions:

```powershell
Import-Module ./src/SBPowerShell/bin/Release/net8.0/pubs.psd1 -Force
. ./scripts/orderingTest/reorderAndForward2.ps1

$conn = 'Endpoint=sb://localhost;' +
    'SharedAccessKeyName=RootManageSharedAccessKey;' +
    'SharedAccessKey=LocalEmulatorKey123!;' +
    'UseDevelopmentEmulator=true;'

$sessionId = "ordering-demo-$([guid]::NewGuid().ToString('N'))"
```

Send the first three messages:

```powershell
foreach ($order in 1, 3, 4) {
    $message = New-SBMessage `
        -Body "event-$order" `
        -SessionId $sessionId `
        -CustomProperties @{ order = [int]$order }

    Send-SBMessage `
        -Topic 'NO_SESSION' `
        -Message $message `
        -ServiceBusConnectionString $conn
}

Receive-SBMessage `
    -Topic 'NO_SESSION' `
    -Subscription 'NO_SESS_SUB' `
    -ServiceBusConnectionString $conn `
    -NoComplete `
    -MaxMessages 3 |
    Process-Message -ConnStr $conn -Verbose
```

Now send the missing message and process it:

```powershell
$message = New-SBMessage `
    -Body 'event-2' `
    -SessionId $sessionId `
    -CustomProperties @{ order = [int]2 }

Send-SBMessage `
    -Topic 'NO_SESSION' `
    -Message $message `
    -ServiceBusConnectionString $conn

Receive-SBMessage `
    -Topic 'NO_SESSION' `
    -Subscription 'NO_SESS_SUB' `
    -ServiceBusConnectionString $conn `
    -NoComplete `
    -MaxMessages 1 |
    Process-Message -ConnStr $conn -Verbose
```

Finally, read the session-aware output:

```powershell
Receive-SBMessage `
    -Topic 'ORDERED_TOPIC' `
    -Subscription 'SESS_SUB' `
    -ServiceBusConnectionString $conn `
    -MaxMessages 4 |
    Select-Object `
        @{ Name = 'Order'; Expression = { $_.ApplicationProperties['order'] } },
        @{ Name = 'Body'; Expression = { $_.Body.ToString() } }
```

The expected result is:

```text
Order Body
----- ----
    1 event-1
    2 event-2
    3 event-3
    4 event-4
```

## Where the approach stops being an implementation

The experiment makes several simplifying assumptions that matter in a real system.

### The first message defines the starting point

The state is initialized from the first message the reorderer receives. If `7` is first, the script accepts `7` as the beginning; messages `1` through `6` arriving later are stale. A production design needs an explicit starting-order contract if that behavior is unacceptable.

### Forward, complete, and save are not atomic

The sample forwards a message, completes its input copy, and then saves state. A crash between these operations can produce duplicates or state that no longer reflects the broker. Downstream processing must be idempotent, or the bridge needs a stronger transactional and recovery design.

### An open gap needs limits

If message `2` never arrives, the list of deferred sequence numbers continues to grow. A real worker needs limits for gap size and age, plus a policy for expiry, dead-lettering, alerting, and recovery.

### One logical stream needs one coordinator

Two workers updating the same logical stream can race unless ownership is coordinated. Service Bus sessions normally provide that coordination through a session lock; this example borrows session state for bookkeeping while consuming from a non-session subscription, so concurrency needs deliberate treatment.

### Ordering does not remove the need for duplicate handling

Retries, redelivery, and failures around settlement still exist. The `order` property helps identify stale messages, but a business-level message identifier and idempotent downstream operations are still valuable.

## Why the pattern is useful

Even with those limitations, this is a useful experiment because it separates three concerns:

1. Service Bus stores deferred payloads.
2. Session state stores the minimum ordering index.
3. PowerShell expresses the state transition in a compact, inspectable form.

That makes it practical for exploring message-ordering behavior locally, testing failure hypotheses, and deciding which guarantees a production implementation would actually need.

The result is not “ordered messaging added to a non-session subscription.” It is a small bridge that demonstrates how deferral, sequence numbers, and session state can cooperate—and where their guarantees end.
