---
title: CIM vs WMI cmdlets-remote execution speed
authors:
  - Richard Siddaway
date: "2013-04-29T19:08:48+00:00"
aliases:
  - /2013/04/cim-vs-wmi-cmdlets-remote-execution-speed/
---

Following on from my previous post we"™ll look at how the two types of cmdlets compare for accessing remote machines.

I used a similar format to the previous tests but was accessing a remote machine.

First off was the WMI cmdlet "“ using DCOM to access the remote Windows 2012 server

**PS> 1..100 |  
foreach {  
Measure-Command -Expression{1..100 | foreach {Get-WmiObject -Class Win32_ComputerSystem -ComputerName W12SUS }}  
} |  
Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 2084.122547  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds



The CIM cmdlets are similar but apparently a bit slower "“ probably due to having to build the WSMAN connection and teat it down each time.

**PS> 1..100 |  
foreach {  
Measure-Command -Expression{1..100 | foreach {Get-CimInstance -ClassName Win32_ComputerSystem -ComputerName W12SUS }}  
} |  
Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 2627.287458  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds



So what happens is you run the CIM command over a CIM session?

**PS> $sess = New-CimSession -ComputerName W12SUS  
PS> 1..100 |  
foreach {  
Measure-Command -Expression{1..100 | foreach {Get-CimInstance -ClassName Win32_ComputerSystem -CimSession $sess }}  
} |  
Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 877.746649999999  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds

This removes the setup and tear-down of the WSMAN connection. It suggests that the actual retrieval time for the CIM cmdlets should be reduced to 1749.540808 milliseconds for 100 accesses which is faster than the WMI cmdlets

It looks like the fastest way to access WMI information is across a CIM session. Next time we"™ll look at running multiple commands

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2846/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2846/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2846&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
