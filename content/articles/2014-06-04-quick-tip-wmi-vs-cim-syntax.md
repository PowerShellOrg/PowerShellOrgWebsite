---
title: "Quick Tip: WMI vs. CIM Syntax"
authors:
  - Don Jones
date: "2014-06-04T12:31:32+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/06/quick-tip-wmi-vs-cim-syntax/
---

`# List all classes in a namespace
Get-CimClass -Namespace root\CIMv2
Get-WmiObject -Namespace root\CIMv2 -List
`\# list all classes containing "service" in their name  
Get-CimClass -Namespace root\CIMv2 | Where CimClassName -like '\*service\*' | Sort CimClassName  
(or)  
Get-CimClass -Namespace root\CIMv2 -Classname \*service\*  
Get-WmiObject -Namespace root\CIMv2 -List | Where Name -like '\*service\*' | Sort Name  
\# get all class instances  
Get-CimInstance -Namespace root\CIMv2 -ClassName Win32_OperatingSystem  
Get-WmiObject -Namespace root\CIMv2 -Class Win32_OperatingSystem  
\# filter class instances  
Get-CimInstance -Namespace root\CIMv2 -ClassName Win32_LogicalDisk -Filter "DriveType=3"  
Get-WmiObject -Namespace root\CIMv2 -Class Win32_LogicalDisk -Filter "DriveType=3"  
\# show all properties  
Get-CimInstance -Namespace root\CIMv2 -ClassName Win32_OperatingSystem | Get-Member  
Get-WmiObject -Namespace root\CIMv2 -Class Win32_OperatingSystem | Get-Member  
\# show all properties and values  
Get-CimInstance -Namespace root\CIMv2 -ClassName Win32_OperatingSystem | fl *  
Get-WmiObject -Namespace root\CIMv2 -Class Win32_OperatingSystem | fl *  
\# remote computer  
Get-CimInstance -Namespace root\CIMv2 -ClassName Win32_BIOS -ComputerName dc,win81  
Get-WmiObject -Namespace root\CIMv2 -Class Win32_BIOS -ComputerName dc,win81  
\# use CIM command to talk to non-CIM computer  
Get-CimInstance -Namespace root\CIMv2 -ClassName win32_BIOS -CimSession (  
New-CimSession -ComputerName OLD-XP-PC -SessionOption (  
New-CimSessionOption -Protocol Dcom  
)  
)
