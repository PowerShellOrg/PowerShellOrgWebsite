---
title: "ICYMI: PowerShell Week of 5-October-2018"
authors:
  - Greg Tate
date: "2018-10-05T15:00:38+00:00"
categories:
  - PowerShell for Admins
tags:
  - ICYMI
  - Community
  - Weekly Roundup
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2018/10/icymi-powershell-week-of-5-october-2018/
---

Topics include the **Az** module, PowerShell module design, PowerShell & Puppet, Hacktoberfest, SQL Server backups, and a PowerShell session from Ignite.  
<!--more-->


Special thanks to Mark Roloff, Robin Dadswell, and Brett Bunker for contributions this week.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#announcing-new-module-az)[_Announcing New Module 'Az'_][1]

by Mark Cowlishaw on Friday, September 28th  
The Az module is intended as a replacmeent for AzureRM and will become the new standard Azure PowerShell commands. The final feature update to AzureRM will be in December 2018.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#learning-about-the-powershell-abstract-syntax-tree-ast)[*Learning about the PowerShell Abstract Syntax Tree (AST)*](https://mikefrobbins.com/2018/09/28/learning-about-the-powershell-abstract-syntax-tree-ast/)

by Mike Robbins on Friday, September 28th  
Mike is on a journey to piece together many separate script files into a single PSM1 file. Rather than rely on potentially complicated regex or string parsing to do the job, he opts for exploring how with PowerShell's far more interesting Abstract Syntax Tree.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#executing-puppet-tasks-with-powershell-via-the-puppet-orchestrator-api)[*Executing Puppet Tasks with PowerShell via the Puppet Orchestrator API*](https://www.joeypiccola.com/puppet-tasks-via-powershell/)

by Joey Piccola on Sunday, September 30th  
Interested in using PowerShell to manage Puppet? Learn how with a quick tutorial on using the Puppet Orchestrator API with **Invoke-WebRequest**.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#i-need-you-hacktoberfest)[*I Need You! #Hacktoberfest*](https://king.geek.nz/2018/10/02/hacktoberfest-2018/)

by Josh King on Monday, October 1st  
Hacktoberfest is officially in full swing and there are tons of open-source projects out there looking for some love. Josh King, creator of the BurntToast module, has a project board set up with tasks to complete for the module's next release. If you're looking for a chance to contribute more openly to the PowerShell community or would just like a project for the month's event, stop in and take a look.

###### [*Does it Loop? Foreach Experiences with an Emtpy Variable*](https://patrickwahlmueller.wordpress.com/2018/10/03/does-it-loop-foreach-experiences-with-empty-variable/)

by Patrick Wahlmüller on October 3rd  
Patrick shares an important lesson to consider when using the **foreach** scripting construct:  initialize your variables!

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#ms-sql-db-backup-and-restore-with-powershell)[*MS SQL DB Backup and Restore with PowerShell*](https://www.scriptinglibrary.com/languages/powershell/ms-sql-db-backup-and-restore-with-powershell/)

by Pauolo Frigo on October 4th  
Find out how easy it is to automate your SQL Server backup jobs using the **SQLServer** PowerShell module. Hint: It's a lot easier than point-and-clicking your way through SQL Server Management Studio!

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#reddit-rpowershell---most-popular-weekly-post)[*Reddit /r/PowerShell - Most Popular Weekly Post*](https://www.reddit.com/r/PowerShell/comments/9lcrmk/breaking_change_with_powershell_jobs_and_the/)

For those of you deploying Windows 10 1809, watch out for a change in behavior when calling **cmd.exe** within a scriptblock using **start-job**.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#tweet-of-the-week)[*Tweet of the Week*](https://twitter.com/JanEgilRing/status/1048069179222495233)

Major increase in coverage for PowerShell Core running on Windows 10 1809 compared to 1803!

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181005.md#youtube-powershell-cross-platform-scripting-and-ai-infused-automation)[*Youtube: PowerShell Cross-Platform Scripting and AI-Infused Automation*](https://www.youtube.com/watch?v=1EVHChiqZOw)

By Jeffrey Snover on September 30th  
Demo-rich show that looks at the evolution of PowerShell as the de facto automation scripting tool across Windows and Linux platforms as presented by the father of PowerShell, Jeffrey Snover. Check out the ability for Visual Studio Code to run PowerShell inside of CloudShell.

 [1]: https://github.com/Azure/azure-powershell/blob/preview/documentation/announcing-az-module.md
