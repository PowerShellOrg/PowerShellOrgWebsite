---
title: Number of processors in a box
authors:
  - Richard Siddaway
date: "2013-01-05T12:21:23+00:00"
aliases:
  - /2013/01/number-of-processors-in-a-box/
---

WMI enables you find the number of processors in your system:

PS> Get-WmiObject -Class Win32_ComputerSystem | fl Number*

NumberOfLogicalProcessors : 2  
NumberOfProcessors        : 1

This works fine for Windows Vista/Windows 2008 and above.

Earlier versions of Windows mis-report the number of processors "“ it counts the number of logical processors reports it as the number of physical processors.

Win32_Processor has the same problem on Windows 2003 and below.

There is a hotfix available from [http://support.microsoft.com/kb/932370][1] that will correct the behaviour of these two WMI classes so that they report correctly

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2782/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2782/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2782&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)

 [1]: http://support.microsoft.com/kb/932370 "http://support.microsoft.com/kb/932370"
