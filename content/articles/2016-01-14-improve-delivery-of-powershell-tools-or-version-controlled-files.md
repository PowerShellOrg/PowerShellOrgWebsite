---
title: Improve Delivery of PowerShell Tools or Version Controlled Files
authors:
  - Steve Parankewich
date: "2016-01-14T17:04:54+00:00"
categories:
  - DevOps
  - PowerShell for Admins
  - Tips and Tricks
  - Tools
  - Training
  - Tutorials
aliases:
  - /2016/01/improve-delivery-of-powershell-tools-or-version-controlled-files/
---

I am back this week with a quick how-to article on delivering, installing, or launching version controlled files. In the past I ran into problems when having administrators launch my PowerShell tools from a network share. The performance was slow when launching it across the WAN, and the file would often be locked when I tried to replace it with a newer version. I came up with a solution to the problem by using none other than PowerShell.  
The solution dips into all kinds of PowerShell techniques including local environment variables, getting text file contents, file version checking and even shortcut (.lnk) creation. If you are also a user of Sapien's PowerShell Studio, then definitely give this one a read. Check out the solution over on [PowerShellBlogger.com][1].

 [1]: http://powershellblogger.com/?p=275
