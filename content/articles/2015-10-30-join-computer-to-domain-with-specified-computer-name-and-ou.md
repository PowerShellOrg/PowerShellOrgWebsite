---
title: Join Computer to Domain with Specified Computer Name and OU
authors:
  - Steve Parankewich
date: "2015-10-30T18:10:55+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tutorials
aliases:
  - /2015/10/join-computer-to-domain-with-specified-computer-name-and-ou/
---

I addressed a reader requested script for my article this week. PowerShell gives you the ability to add computers to Active Directory right from the command line with the built in PowerShell commandlets. This was introduced with PowerShell version 3 and can be used to automate imaging processes or to prompt an agent for the desired computer name and organizational unit. This is useful since a lot of organizations will use specific OUs for computers according to location or department. This allows them to set group policies that apply to those computer accounts accordingly. By default these computer accounts are created in the root Computers OU, but creating an account can be targeted. The highlighted examples should provide you everything you need to tackle that use case. I provide the basics of adding a computer to the domain as well as prompting the user to enter the computer name and location. Head on over to [PowershellBlogger.com][1] for the full write up and thanks for everyone's continued support!

 [1]: http://powershellblogger.com/?p=220
