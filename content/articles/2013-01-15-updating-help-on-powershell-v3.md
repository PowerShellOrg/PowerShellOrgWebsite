---
title: Updating Help on PowerShell v3
authors:
  - Richard Siddaway
date: "2013-01-15T21:37:41+00:00"
aliases:
  - /2013/01/updating-help-on-powershell-v3/
---

One of the new features in PowerShell v3 is the capability to update the help files. In fact you have to do this because PowerShell v3 doesn"™t ship with any help files. Since Windows 8 RTM"™d there have been a succession of new help files released.

I discovered one of my netbooks didn"™t have the latest version of the help files installed. So I needed to update them. This got me thinking that it would be better if the machine did this for me. 

I could think of two easy ways to do this "“ a scheduled job or a scheduled task. I chose the scheduled task because the ScheduledTasks module is available on the version of PowerShell v3 for Windows 7 and other legacy versions of Windows. The PSScheduledJob module is only available on Windows 8/2012 as it"™s based on WMI classes not present on older versions of Windows.


`$actionscript

=

'-NonInteractive -WindowStyle Normal -NoLogo -NoProfile -NoExit -Command "& {Update-Help -UICulture en-US -Force}"'


$pstart

=

"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"


#$days = "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" 


$days

=

'Wednesday'


Get-ScheduledTask

-TaskName

UpdatePSHelp

|

Unregister-ScheduledTask

-Confirm:

$false


$act

=

New-ScheduledTaskAction

-Execute

$pstart

-Argument

$actionscript


$trig

=

New-ScheduledTaskTrigger

-Weekly

-WeeksInterval

4

-At

19:00

-DaysOfWeek

$days


Register-ScheduledTask

-TaskName

UpdatePSHelp

-Action

$act

-Trigger

$trig

-RunLevel

Highest

`Start by creating the command strings to start PowerShell and the arguments you pass to it.  I left it as a visible PowerShell window that stays opn so I can see the results. The PowerShell command 

Update-Help -UICulture en-US "“Force

performs the actual update.  You will need to change the culture to match yours if you aren"™t using English.  You can find it by using

Get-UICulture

I"™m only going to run this on Wednesdays .

Any old copies of the task are cleaned out and new task actions (to execute PowerShell) and trigger to define when it runs are created. The last line registers the task.

You can view the task 

Get-ScheduledTask -TaskName UpdatePSHelp

or start the task manually

Start-ScheduledTask -TaskName UpdatePSHelp

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2789/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2789/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2789&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
