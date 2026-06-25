---
title: Filtering
authors:
  - Richard Siddaway
date: "2013-02-18T19:38:41+00:00"
aliases:
  - /2013/02/filtering/
---

I"™ve been grading the scripts in the warm up events for the Scripting Games and noticed a lot of people doing this:

Get-WmiObject -Class Win32_LogicalDisk | where {$_.DriveType -eq 3}

Ok now it works but there are a couple of things wrong with this approach.

Firstly, you are ignoring the built in capabilities of the get-wmiobject cmdlet

PS> Get-Command Get-WmiObject -Syntax

Get-WmiObject [-Class]  [[-Property] ] **[-Filter ]** [-Amended] [-DirectRead] [-AsJob]  
[-Impersonation ] [-Authentication ] [-Locale ]  
[-EnableAllPrivileges] [-Authority ] [-Credential 
] [-ThrottleLimit ] [-ComputerName  
] [-Namespace ] []

Get-WmiObject [[-Class] ] [-Recurse] [-Amended] [-List] [-AsJob] [-Impersonation ]  
[-Authentication ] [-Locale ] [-EnableAllPrivileges] [-Authority ] [-Credential  

] [-ThrottleLimit ] [-ComputerName ] [-Namespace ] []

Get-WmiObject -Query  [-Amended] [-DirectRead] [-AsJob] [-Impersonation ] [-Authentication  
] [-Locale ] [-EnableAllPrivileges] [-Authority ] [-Credential 
]  
[-ThrottleLimit ] [-ComputerName ] [-Namespace ] []

Get-WmiObject [-Amended] [-AsJob] [-Impersonation ] [-Authentication ]  
[-Locale ] [-EnableAllPrivileges] [-Authority ] [-Credential 
] [-ThrottleLimit ]  
[-ComputerName ] [-Namespace ] []

Get-WmiObject [-Amended] [-AsJob] [-Impersonation ] [-Authentication ]  
[-Locale ] [-EnableAllPrivileges] [-Authority ] [-Credential 
] [-ThrottleLimit ]  
[-ComputerName ] [-Namespace ] []

Notice the filter parameter in the first parameter set.

When you run Get-WMIObject in effect you are running a WQL query

"SELECT * FROM Win32_LogicalDisk"

if you move the filter into the query it changes to 

"SELECT * FROM Win32_LogicalDisk WHERE DriveType = 3"

This is coded in the cmdlet as 

Get-WmiObject -Class Win32_LogicalDisk -Filter "DriveType = 3″

Why is this better?

Because you are doing less work against the WMI repository "“ therefore more efficient. 

Also if you are running against a remote machine filtering in the WMI query means you bring less data back across the network which makes you whole process more efficient.

Bottom line "“ filter as early as you sensibly can and preferably on the remote machine.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2804/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2804/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2804&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
