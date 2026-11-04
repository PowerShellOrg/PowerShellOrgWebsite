---
title: "Find What Wakes a Windows PC With Get-WinEvent"
description: "Pair the sleep and wake events in the System log to show when a Windows PC slept, why it went to sleep, and what woke it, then list the scheduled tasks and devices allowed to wake it."
author: Chris Smith
authors:
- Chris Smith
date: "2026-11-03T00:00:00+00:00"
categories:
- PowerShell for Admins
tags:
- get-winevent
- power-management
- scheduled-tasks
- troubleshooting
---

A PC that turns itself on at night leaves a record in the System log every time it does. Windows writes one event when the PC goes to sleep and another when it wakes up. The wake event names the device or timer that woke it.

This article builds `Get-SleepWakeHistory`, a function that reads those two events with `Get-WinEvent`, pairs each sleep with its corresponding wake, and returns one row per sleep with how long the PC slept, why it went to sleep, and what woke it. It then lists the two things Windows allows to wake a PC on its own, scheduled tasks with "Wake the computer to run this task" turned on and devices that are armed to wake it.

Everything here was run with Windows PowerShell 5.1 and PowerShell 7.6 on Windows 11 builds 26200 and 26300.

## The two events

Windows records a sleep and a wake as two separate events in the System log.

- **Event 42** from `Microsoft-Windows-Kernel-Power` is written as the PC enters sleep. Its `Reason` field says what started the sleep.
- **Event 1** from `Microsoft-Windows-Power-Troubleshooter` is written after the PC resumes. It carries the time the PC went to sleep, the time it woke, and the wake source as text.

You can see both in Event Viewer, but the wake source is only in the message text there. The fields are easier to read from the event XML, where each value has a name.

You don't need a sleep in the log to find the event names. The provider's manifest lists every field of every event version, and can be read with `Get-WinEvent -ListProvider`.

```powershell
$e = (Get-WinEvent -ListProvider Microsoft-Windows-Power-Troubleshooter).Events |
    Where-Object Id -eq 1 |
    Sort-Object Version |
    Select-Object -Last 1

'Version ' + $e.Version
([xml]$e.Template).template.data.name -join ', '
```

```text
Version 3
SleepTime, WakeTime, SleepDuration, WakeDuration, DriverInitDuration, BiosInitDuration, HiberWriteDuration, HiberReadDuration, HiberPagesWritten, Attributes, TargetState, EffectiveState, WakeSourceType, WakeSourceTextLength, WakeSourceText, WakeTimerOwnerLength, WakeTimerContextLength, NoMultiStageResumeReason, WakeTimerOwner, WakeTimerContext, CheckpointDuration
```

`SleepTime` and `WakeTime` are UTC timestamps. `WakeSourceText` holds the same text Event Viewer shows after "Wake Source". `WakeTimerOwner` arrived in version 1 of the event and names the process or task that set the timer when a timer caused the wake.

Run the manifest command with `Microsoft-Windows-Kernel-Power` and `42` to see that `Reason` was added to event 42 in version 2. A version 0 event 42 carries only `TargetState` and `EffectiveState`, so the function treats a missing `Reason` as unknown.

## The function

```powershell
function Get-SleepWakeHistory {
    <#
    .SYNOPSIS
    Lists each sleep and wake on a Windows PC with the sleep reason and the wake source.

    .DESCRIPTION
    Reads Kernel-Power event 42 (entering sleep) and Power-Troubleshooter event 1
    (resumed from sleep) from the System log, pairs each wake with its corresponding
    sleep event, and returns one object per sleep.

    .PARAMETER Days
    How many days back to read.

    .PARAMETER ComputerName
    The computer to read. Reading a remote computer's log needs the Remote Event Log
    Management firewall rules enabled on that computer.

    .EXAMPLE
    Get-SleepWakeHistory -Days 14 | Format-Table -AutoSize

    .EXAMPLE
    Get-SleepWakeHistory | Where-Object WakeSource -notmatch 'Power Button'
    #>
    [CmdletBinding()]
    [OutputType([pscustomobject])]
    param(
        [ValidateRange(1, 365)]
        [int]$Days = 7,

        [string]$ComputerName = $env:COMPUTERNAME
    )

    # Reason codes on Kernel-Power event 42.
    $sleepReasons = @{
        0 = 'Button or lid'
        2 = 'Battery'
        4 = 'Application API'
        6 = 'Hibernate from sleep (fixed timeout)'
        7 = 'System idle'
        13 = 'Hibernate from sleep (standby battery budget exceeded)'
    }

    # Turns an event's EventData into a hashtable keyed by field name.
    $readData = {
        param($Record)
        $data = @{}
        foreach ($field in ([xml]$Record.ToXml()).Event.EventData.Data) {
            $data[$field.Name] = $field.'#text'
        }
        $data
    }

    $since = (Get-Date).AddDays(-$Days)
    $filter = @(
        @{ LogName = 'System'; ProviderName = 'Microsoft-Windows-Kernel-Power'; Id = 42; StartTime = $since }
        @{ LogName = 'System'; ProviderName = 'Microsoft-Windows-Power-Troubleshooter'; Id = 1; StartTime = $since }
    )

    try {
        $events = Get-WinEvent -FilterHashtable $filter -ComputerName $ComputerName -ErrorAction Stop
    }
    catch {
        if ($_.FullyQualifiedErrorId -like 'NoMatchingEventsFound*') {
            Write-Verbose "No sleep or wake events on $ComputerName in the last $Days days."
            return
        }
        throw
    }

    $sleeps = @($events | Where-Object Id -eq 42 | Sort-Object TimeCreated)
    $wakes = @($events | Where-Object Id -eq 1 | Sort-Object TimeCreated)

    foreach ($wake in $wakes) {
        $w = & $readData $wake
        $sleptAt = [datetimeoffset]::Parse($w.SleepTime).LocalDateTime
        $wokeAt = [datetimeoffset]::Parse($w.WakeTime).LocalDateTime

        # Event 42 is written within seconds of the SleepTime that event 1 records, so take the closest one.
        $entry = $sleeps |
            Where-Object { $_.TimeCreated -ge $sleptAt.AddMinutes(-2) -and $_.TimeCreated -le $sleptAt.AddMinutes(1) } |
            Sort-Object { [math]::Abs(($_.TimeCreated - $sleptAt).TotalSeconds) } |
            Select-Object -First 1

        $reason = 'No event 42 found'
        if ($entry) {
            $raw = (& $readData $entry).Reason
            if ($null -eq $raw) {
                $reason = 'Unknown'
            }
            else {
                $code = [int]$raw
                $reason = if ($sleepReasons.ContainsKey($code)) { $sleepReasons[$code] } else { "Code $code" }
            }
        }

        $source = $w.WakeSourceText
        if ([string]::IsNullOrWhiteSpace($source)) { $source = 'Unknown' }

        [pscustomobject]@{
            ComputerName = $ComputerName
            Slept        = $sleptAt
            Woke         = $wokeAt
            Asleep       = [datetimeoffset]::Parse($w.WakeTime) - [datetimeoffset]::Parse($w.SleepTime)
            SleepReason  = $reason
            WakeSource   = $source
            WakeTimer    = $w.WakeTimerOwner
        }
    }
}
```

The function only uses cmdlets and syntax that work in both Windows PowerShell 5.1 and PowerShell 7, since 5.1 is still the shell on most of the PCs that raise these tickets.

## Running it

```powershell
Get-SleepWakeHistory
```

On a laptop this returned two sleeps for the last 7 days.

```text
ComputerName : LAPTOP
Slept        : 10/30/2026 11:46:51 AM
Woke         : 10/31/2026 7:30:54 PM
Asleep       : 1.07:44:03.2633699
SleepReason  : Hibernate from sleep (standby battery budget exceeded)
WakeSource   : Unknown
WakeTimer    :

ComputerName : LAPTOP
Slept        : 11/1/2026 4:55:49 PM
Woke         : 11/2/2026 7:11:14 AM
Asleep       : 14:15:25.4508261
SleepReason  : Battery
WakeSource   : Unknown
WakeTimer    :
```

In both rows event 42 was written 1 to 5 seconds after the `SleepTime` in event 1. Across 20 sleeps on that laptop the gap was never more than 13 seconds, which is why the function looks 2 minutes back and 1 minute forward. When two event 42s fall in that window, as they can after a very short sleep, it takes the one closest to the `SleepTime`.

A wake you caused shows the power button, the lid, or the device you touched as the source. The rows to look at are the ones that happened when nobody was at the PC. For those, the wake source is usually a timer, which points at a scheduled task, or a device such as a network adapter or a mouse.

A timer wake names the task. On the laptop, with the test task from the next section set to run four minutes after it went to sleep, the function returned this.

```text
ComputerName : LAPTOP
Slept        : 11/3/2026 7:59:43 AM
Woke         : 11/3/2026 8:03:24 AM
Asleep       : 00:03:40.8647018
SleepReason  : Application API
WakeSource   : Windows will execute 'NT TASK\WakeTest' scheduled task that requested waking the computer.
WakeTimer    : \Device\HarddiskVolume3\Windows\System32\svchost.exe
```

`WakeTimer` names the process that set the timer, which for every scheduled task is the Task Scheduler's own `svchost.exe`. The task name is in `WakeSource`.

A device wake often names the port the device sits behind instead of the device. On a desktop woken from the keyboard, the function returned this.

```text
ComputerName : DESKTOP
Slept        : 11/3/2026 7:28:41 AM
Woke         : 11/3/2026 7:28:55 AM
Asleep       : 00:00:14.4626736
SleepReason  : Application API
WakeSource   : PCI Express Root Port
WakeTimer    :
```

The same wake, with the device's instance path, can be read with `powercfg /lastwake`. Look the path up in Device Manager under "Details", "Device instance path".

```text
Wake History Count - 1
Wake History [0]
  Wake Source Count - 1
  Wake Source [0]
    Type: Device
    Instance Path: PCI\VEN_1022&DEV_14DB&SUBSYS_14531022&REV_00\3&11583659&0&11
    Friendly Name:
    Description: PCI Express Root Port
    Manufacturer: (Standard system devices)
```

When `WakeSource` says `Unknown`, run `powercfg /lastwake` right after the next unexpected wake. Its output comes directly from the power manager and sometimes names a device the event left blank.

## Which tasks and devices can wake the PC

A wake from a timer comes from a scheduled task that has "Wake the computer to run this task" checked. That checkbox is `Settings.WakeToRun` on the task object.

```powershell
Get-ScheduledTask |
    Where-Object { $_.Settings.WakeToRun } |
    Select-Object TaskPath, TaskName, State
```

```text
TaskPath                               TaskName                                      State
--------                               --------                                      -----
\Microsoft\Windows\.NET Framework\     .NET Framework NGEN v4.0.30319 64 Critical Disabled
\Microsoft\Windows\.NET Framework\     .NET Framework NGEN v4.0.30319 Critical    Disabled
\Microsoft\Windows\InstallService\     WakeUpAndContinueUpdates                   Disabled
\Microsoft\Windows\InstallService\     WakeUpAndScanForUpdates                    Disabled
\Microsoft\Windows\SharedPC\           Account Cleanup                            Disabled
\Microsoft\Windows\UpdateOrchestrator\ Schedule Wake To Work                      Disabled
```

The list includes disabled tasks, which can't set a wake timer. Add `State -ne 'Disabled'` to the filter to see only the tasks that can wake the PC today. On this PC that leaves none, which matches `powercfg /waketimers` below.

Each timer that is set right now, with the task behind it, can be listed with `powercfg /waketimers` from an elevated prompt. With no wake tasks enabled, the output is one line.

```text
There are no active wake timers in the system.
```

To see what a real timer looks like, I registered a test task with "Wake the computer to run this task" turned on and a trigger four minutes out.

```powershell
$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument '/c echo woke >> C:\Windows\Temp\WakeTest.txt'
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(4)
$settings = New-ScheduledTaskSettingsSet -WakeToRun
Register-ScheduledTask -TaskName 'WakeTest' -Action $action -Trigger $trigger -Settings $settings -User 'SYSTEM'

powercfg /waketimers
```

```text
Timer set by [SERVICE] \Device\HarddiskVolume3\Windows\System32\svchost.exe (SystemEventsBroker) expires at 7:31:25 AM on 11/3/2026.
  Reason: Windows will execute 'NT TASK\WakeTest' scheduled task that requested waking the computer.
```

The task name is in the `Reason` line.

A wake from a device comes from hardware that is armed to wake the PC. Every device with that permission can be listed with `powercfg /devicequery wake_armed`.

```powershell
powercfg /devicequery wake_armed
```

```text
HID-compliant mouse
Realtek USB GbE Family Controller
USB4 Root Router (1.0)
HID Keyboard Device (004)
Realtek 8922AE WiFi 7 PCI-E NIC
Realtek Gaming 2.5GbE Family Controller
HID-compliant mouse (004)
HID Keyboard Device (009)
HID Keyboard Device (012)
```

Three network adapters on this PC are armed, so each of them can wake it from sleep.

## Stopping the wake

Match the `WakeSource` from the function to one of the two lists above, then turn off that one permission.

For a scheduled task, turn off `WakeToRun` and save the task.

```powershell
$task = Get-ScheduledTask -TaskName 'WakeTest'
$task.Settings.WakeToRun = $false
$task | Set-ScheduledTask | Out-Null

(Get-ScheduledTask -TaskName 'WakeTest').Settings.WakeToRun
```

```text
False
```

For a device, remove its permission by the name `powercfg` printed.

```powershell
$device = 'Realtek 8922AE WiFi 7 PCI-E NIC'
powercfg /devicedisablewake $device
(powercfg /devicequery wake_armed) -contains $device
```

```text
False
```

The permission can be restored with `powercfg /deviceenablewake` and the same device name.

Run `Get-SleepWakeHistory` again after a night or two. The wakes from that task or device should be gone from the list.

## Gotchas

### Modern Standby PCs log most sleeps as other events

Many newer laptops don't use S3 sleep. They use Modern Standby. On those laptops "Standby (S0 Low Power Idle)" is listed under the available sleep states in `powercfg /a`. The laptop above is one of them. In 30 days it logged 412 Kernel-Power 506 events ("The system is entering Modern Standby") and 410 event 507s ("The system is exiting Modern Standby"), and only 20 pairs of events 42 and 1. Those 20 were hibernations and sleeps that an application started. Every one of the 20 event 1s showed "Wake Source: Unknown".

On a Modern Standby PC, the `Reason` line in event 507 says why it left standby.

```powershell
Get-WinEvent -FilterHashtable @{
    LogName      = 'System'
    ProviderName = 'Microsoft-Windows-Kernel-Power'
    Id           = 507
    StartTime    = (Get-Date).AddDays(-7)
} |
    ForEach-Object { ($_.Message -split [Environment]::NewLine | Where-Object { $_ -match '^Reason' }) -join '' } |
    Group-Object |
    Sort-Object Count -Descending |
    Select-Object Count, Name
```

```text
Count Name
----- ----
   19 Reason: Power Button.
   14 Reason: 16777220.
    5 Reason: Austerity Battery Drain Budget Exceeded.
    3 Reason: AC/DC Display Burst Suppressed.
    2 Reason: Resume from Hibernate.
    1 Reason: AC/DC Display Burst.
    1 Reason: Sleep, Hibernate, or Shutdown.
```

Some reasons print only as a number. An HTML report of the Modern Standby sessions, with the time and the top power users for each one, can be generated with `powercfg /sleepstudy`.

### No events is an error, not an empty result

`Get-WinEvent` throws "No events were found that match the specified selection criteria" when the filter matches nothing. The function catches that one error by its `FullyQualifiedErrorId` and returns nothing, so a PC that never slept in the window doesn't look like a failure. Any other error, such as access denied on a remote computer, still throws.

Run the function with `-Verbose` to see the XPath query `Get-WinEvent` builds from the two hashtables, which helps when a filter returns less than you expect.

### A laptop on battery may ignore the timer, or wake and skip the task

The power plan's "Allow wake timers" setting has separate values for plugged in and on battery. On the Modern Standby laptop used for this article, it was "Important Wake Timers Only" plugged in and "Disable" on battery.

```powershell
powercfg /q SCHEME_CURRENT SUB_SLEEP RTCWAKE
```

```text
    Current AC Power Setting Index: 0x00000002
    Current DC Power Setting Index: 0x00000000
```

Index 0 is Disable, 1 is Enable, and 2 is Important Wake Timers Only. With the battery value at 0, a task's timer can't wake the laptop on battery, so for the test I set it to 1.

Once it woke, the task still didn't run. `Get-ScheduledTaskInfo` reported a `LastTaskResult` of 267011 (the task has not yet run), because `New-ScheduledTaskSettingsSet` leaves `DisallowStartIfOnBatteries` set to `True`. So a laptop can wake on battery for a task that then doesn't run, which looks like a wake for no reason. Check `WakeToRun` and the two battery settings on the task you found.

```powershell
(Get-ScheduledTask -TaskName 'WakeTest').Settings |
    Select-Object WakeToRun, DisallowStartIfOnBatteries, StopIfGoingOnBatteries
```

### Hibernation counts from the moment the PC hibernated

When a PC hibernates after a stretch in standby, event 42 carries reason 6 ("Hibernate from Sleep - Fixed Timeout") or reason 13 ("Hibernate from Sleep - Standby Battery Budget Exceeded"). The `SleepTime` in the corresponding event 1 is the time it went into hibernation, not the time it first went to sleep. On a Modern Standby laptop, the hours it spent in standby before the hibernation are only in events 506 and 507, so `Asleep` covers the hibernation alone.

## References

- [Get-WinEvent](https://learn.microsoft.com/powershell/module/microsoft.powershell.diagnostics/get-winevent)
- [Powercfg command-line options](https://learn.microsoft.com/windows-hardware/design/device-experiences/powercfg-command-line-options)
- [Get-ScheduledTask](https://learn.microsoft.com/powershell/module/scheduledtasks/get-scheduledtask)
- [Get-SystemAuditPowerCycle in the SecurityFever module](https://www.powershellgallery.com/packages/SecurityFever/3.2.0/Content/Functions%5CSystemAudit%5CGet-SystemAuditPowerCycle.ps1), the source of the event 42 reason codes 0 and 7
