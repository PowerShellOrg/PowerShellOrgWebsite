---
title: "ICYMI: PowerShell Week of 05-March-2021"
author: Robin Dadswell
authors:
  - Robin Dadswell
date: "2021-03-05T15:00:00+00:00"
categories:
  - In Case You Missed It
  - PowerShell for Admins
  - PowerShell for Developers
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2021/03/icymi-powershell-week-of-05-march-2021/
---

Topics include REST APIs, PSRemoting, Azure AD reporting and more...

<!--more-->

Special thanks to Robin Dadswell, Prasoon Karunan V, Kiran Patnayakuni and Kevin Laux.

###### [][1][_Replicating VMware NSX-T Services with REST API and PowerShell_][2] {.wp-block-heading}

by Fer Corrales on 1st March

I have worked on several NSX-V and NSX-T implementations that required the creation of an important number of objects, in the order of the thousands. Therefore, automation has been a must, so I have gained experience with PowerNSX, the PowerCLI NSX-T Module and REST API calls. Recently, I was working on getting a new NSX-T environment configured exactly the same as an existing one. When I was working on setting up Services, I decided to look for a way to take advantage of the configuration that was already in place on one of the data centers and replicate it on the new one. That is how I ended up writing this script.

###### [][3][_The Beauty of Progress Bar in PowerShell 7.2 Preview 3_][4] {.wp-block-heading}

by Schillman on 2nd March

Old progress bar below, it’s not customisable, quite big and all that green colour & text is always rewritten to the pipeline for every time the progress bar updates, that’s a lot of writing.The New progress bar is minimal, just as the configuration implies. You have the possibilities to change the For/Back-ground colour along with some font changes.

###### [][5][_How to Set up PSRemoting with WinRM and SSL [Step by Step]_][6] {.wp-block-heading}

by Tyler Muir on 3rd March

If you’re already running remote commands with PowerShell Remoting_ _(PSRemoting), you know how convenient the feature is. You’re able to connect to one or more remote computers and manage them like they were local. PSRemoting depends on Windows Remote Management (WinRm) to make it happen, and if you’re not using WinRM over SSL, you might be opening yourself up to some security issues.

###### [][7][_Graph theory with PowerShell_][8] {.wp-block-heading}

by Dirk Bremen on 3rd March

In this post I’m going to explore a bit of graph theory based on chapter 2 of the excellent book “Think Complexity 2e” by Allen B. Downey, with a twist of using PowerShell to do it.

###### [][9][_Azure AD Authentication Methods Summary Reports using Microsoft Graph and PowerShell_][10] {.wp-block-heading}

by Darren Robinson on 4th March

Ever needed to know how to extract Azure AD Authentication Methods Summary Reports using Microsoft Graph and PowerShell; well today is your lucky day! Find out how in this interesting article about using the Microsoft Graph API with PowerShell

###### [][11][_Tweet of the Week_][12] {.wp-block-heading}

SecretManagement and SecretStore RC2 is out!

###### [][13][_Youtube: 45. Secure (HTTPS) DSC Pull Server with SQL Database using a Group Managed Service Account (gMSA)_][14] {.wp-block-heading}

You have seen on the interwebs many blog posts and videos about setting up a Secure DSC pull server with SQL authentication with a local SQL service account. What I have not seen is a tutorial for how to setup a secure DSC Pull Server with a SQL Database using a Group Managed Service Account (gMSA).

 [1]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#replicating-vmware-nsx-t-services-with-rest-api-and-powershell
 [2]: https://fercorrales.com/replicating-vmware-nsx-t-services-with-rest-api-and-powershell/?utm_source=rss&utm_medium=rss&utm_campaign=replicating-vmware-nsx-t-services-with-rest-api-and-powershell
 [3]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#the-beauty-of-progress-bar-in-powershell-72-preview-3
 [4]: https://it-overload.com/2021/03/02/the-beauty-of-progress-bar-in-powershell-7-2-preview-3/
 [5]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#how-to-set-up-psremoting-with-winrm-and-ssl-step-by-step
 [6]: https://adamtheautomator.com/winrm-ssl/
 [7]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#graph-theory-with-powershell
 [8]: https://powershellone.wordpress.com/2021/03/03/graph-theory-with-powershell/
 [9]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#azure-ad-authentication-methods-summary-reports-using-microsoft-graph-and-powershell
 [10]: https://blog.darrenjrobinson.com/azure-ad-authentication-methods-summary-reports-using-microsoft-graph-and-powershell/
 [11]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#tweet-of-the-week
 [12]: https://twitter.com/steve_msft/status/1367189897153421314?s=12
 [13]: https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20210305-functiondraft.md#youtube-45-secure-https-dsc-pull-server-with-sql-database-using-a-group-managed-service-account-gmsa
 [14]: https://www.youtube.com/watch?v=d2IXnrqY48Q
