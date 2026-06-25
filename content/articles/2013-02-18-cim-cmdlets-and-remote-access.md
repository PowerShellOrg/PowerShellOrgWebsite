---
title: CIM cmdlets and remote access
authors:
  - Richard Siddaway
date: "2013-02-18T22:33:04+00:00"
aliases:
  - /2013/02/cim-cmdlets-and-remote-access/
---

When you used the WMI cmdlets

Get-WmiObject -Class Win32_logicalDisk -ComputerName RSLAPTOP01

You were using DCOM to access the remote machine. Even if you accessed the local machine you were using DCOM.

This changes in PowerShell v3 when using the CIM cmdlets.

If you don"™t use a computername

Get-CimInstance -ClassName Win32_logicalDisk

You use DCOM to access the local machine.

If you use "“computername

Get-CimInstance -ClassName Win32_logicalDisk -ComputerName RSLAPTOP01

**You use WSMAN to access the machine named "“ irrespective of if it is local or remote**

A further complication is that the named machine has to be running WSMAN 3.0 i.e. PowerShell v3 is installed. 

If you try to access a PowerShell v2 (WSMAN 2.0) machine with the CIM cmdlets you will get an error. The way round that is to create a CIMsession using DCOM as the transport protocol. If you want to learn how to do that you"™ll have to wait until after my session at the PowerShell Summit in April or buy a copy of PowerShell and WMI from [www.manning.com/siddaway2][1]

I saw a number of people using the CIM cmdlets in the scripting games without thought to connectivity issues like this.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2806/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2806/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2806&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)

 [1]: http://www.manning.com/siddaway2
