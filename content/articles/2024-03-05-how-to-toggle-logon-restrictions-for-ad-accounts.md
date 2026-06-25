---
title: How to Toggle Logon Restrictions for AD Accounts
authors:
  - James Petty
date: "2024-03-05T17:00:33+00:00"
categories:
  - PowerShell for Admins
tags:
  - Active Directory
  - Scripting
  - Security
aliases:
  - /2024/03/how-to-toggle-logon-restrictions-for-ad-accounts/
---

_Written by Tino JR_

This script will allow an administrator to enable or disable logon restrictions for an Active Directory (AD) user account. I received a unique requirement, in which several account must remain enabled, but restricted from logging into AD, so I wrote this script. 

As you may know, you can specify logon hours to restrict AD users’ ability to logon during certain hours of the day . This is fine if the exact same time of logon restrictions will not change over time, however there might be a need to block logon access on an as-needed basis. The script can target an individual account, or target all members of a security group. 

Here is an example of restricted logon hour in ADUC.  
![file](https://powershell.org/wp-content/uploads/2024/03/image-1709639928467.png) 

**Prerequisites**  
Before you run the script, you need to have the following:

  * An AD account that has permissions to modify other AD accounts.
  * You will need the ActiveDirectory PowerShell module (found in RSAT).
  * The PowerShell script can be found from this link: <https://github.com/tinojr/ADToggleLogonHours> 

**Running the Script**  
The script allows you to target a user or group, and both parameters will take the following input of the AD object.

  * A distinguished name
  * A GUID (objectGUID)
  * A security identifier (objectSid)
  * A SAM account name (sAMAccountName)

The other thing to be aware of is the script will run in `WhatIf` mode by default. You must use the `Commit` parameter to commit changes. This is something new I include in all my scripts, as it can be helpful to see output to confirm these are the changes you in fact want to implement.  
Here are some examples of how to run the script. As you can see you can target either a user or group.

`C:\Scripts\ToggleLogonHours.ps1 -User User1 -AddLogonHourRestrictions C:\Scripts\ToggleLogonHours.ps1 -User User2 -RemoveLogonHourRestrictions -CommitChanges`  
C:\Scripts\ToggleLogonHours.ps1 -Group Group1 -AddLogonHourRestrictions`

I hope you find this script useful.
