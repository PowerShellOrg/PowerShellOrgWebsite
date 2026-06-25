---
title: CIM cmdlets
authors:
  - Richard Siddaway
date: "2013-03-26T21:04:00+00:00"
aliases:
  - /2013/03/cim-cmdlets/
---

The CIM cmdlets are found in the CIMcmdlets module.

Get-Command -Module CimCmdlets  produces this list of names.  I"™ve added some information on the tasks they perform 

Get-CimAssociatedInstance  is for working with WMI associated classes  
Get-CimClass  is for discovering the properties and methods of a WMI class  
Get-CimInstance    is analogous to  Get-WmiObject  
Get-CimSession   
Invoke-CimMethod    is analogous to Invoke-WMIMethod     
New-CimInstance  can be used for creating a new WMI instance in certain circumstances  
New-CimSession  
New-CimSessionOption  
Register-CimIndicationEvent    is analogous to Register-WMIEvent  
Remove-CimInstance  is analogous to Remove-WMIObject  
Remove-CimSession  
Set-CimInstance  is analogous to Set-WMIInstance

The CIM session cmdlets are for working with the CIm sessions which are analogous to PowerShell remoting sessions but are used by the CIM cmdlets AND the new WMI based cmdlets in Windows 8/2012 such as the networking cmdlets

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2820/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2820/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2820&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
