---
title: Shutting down a remote computer
authors:
  - Richard Siddaway
date: "2013-04-01T11:15:52+00:00"
aliases:
  - /2013/04/shutting-down-a-remote-computer/
---

PowerShell provides the Stop-Computer cmdlet for closing down a remote machine. I find this especially useful in my virtual test environment. I"™ll have several machines running but won"™t necessarily have logged onto them. Using Stop-Computer means that I can shut them down cleanly without the hassle of logging onto them.

In modern Windows systems you have to explicitly enable remote WMI access through the Windows firewall. Stop-Computer uses WMI. If the WMI firewall ports aren"™t enabled you can"™t use Stop-Computer. I"™ve taken to use the CIM cmdlets rather than WMI so sometimes don"™t open the WMI firewall ports.

One quick function later and I have an answer


`function

invoke-cimshutdown

{


[

CmdletBinding

(

)

]


param

(


[string]

$computername


)


$comp

=

Get-CimInstance

win32_operatingsystem

-ComputerName

$computername


Invoke-CimMethod

-InputObject

$comp

-MethodName

Shutdown


}

`Pass the computer name as a parameter "“ I deliberately didn"™t put a default

Use Get-CimInstance to get the Win32_operatingsystem class and use Invoke-CimMethod to call the Shutdown method.

Another reason not to enable WMI on my server 2012 firewalls.

You can use this on legacy versions of Windows if you have PowerShell v3, and therefore WSMAN v3, installed

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2821/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2821/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2821&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
