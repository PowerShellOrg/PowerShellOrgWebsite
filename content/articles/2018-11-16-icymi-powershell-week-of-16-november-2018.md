---
title: "ICYMI: PowerShell Week of 16-November-2018"
author: Mark Roloff
authors:
  - Mark Roloff
date: "2018-11-16T16:00:24+00:00"
categories:
  - PowerShell for Admins
tags:
  - ICYMI
  - Community
  - Weekly Roundup
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2018/11/icymi-powershell-week-of-16-november-2018/
---

Topics include pie charts, flattening your modules, selecting unique items, the WindowsCompatibility module goes GA, and more...  
<!--more-->


Curated by Brett Bunker, Robin Dadswell, and Mark Roloff

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#convert-powershell-output-into-a-pie-chart)[*Convert PowerShell output into a pie chart*](https://4sysops.com/archives/convert-powershell-csv-output-into-a-pie-chart/)

by Graham Beer on November 9th  
Piping information to CSVs and turning it into pretty tables or charts with Excel seems like a staple of admin work sometimes. Lucky for us, Graham has worked out a function for quickly creating pie charts from PowerShell data. Display them right away for a quick visualization or save them to file for use later, and if you dig into the function a little you might find a way to generate even more chart types.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#azure-blueprint)[*Azure Blueprint*](https://agazoth.github.io/blogpost/2018/11/11/Azure-Blueprint.html)

by Axel Anderson on November 11th  
Blueprint is an interesting new tool in the world of Azure; it pretty much works to orchestrate policies, roles, ARM templates, and resource groups across multiple subscriptions. Axel's blog post gives a brief introduction to this service before jumping into a module that he wrote for applying a little automation around it.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#create-custom-reports-using-the-updated-teams-powershell-module)[*Create custom reports using the updated Teams PowerShell module*](https://practical365.com/teams-2/create-custom-reports-using-the-updated-teams-powershell-module/)

by Steve Goodman on November 12th  
Teams is soon replacing Skype for Business and it's PowerShell module is slowly coming into its own. A recent update added in a little extra functionality and Steve decided to explore that by showing us a handy script to assist with auditing Teams in a tenant.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#powershell--single-psm1-file-versus-multi-file-modules)[*PowerShell – Single PSM1 file versus multi-file modules*](https://evotec.xyz/powershell-single-psm1-file-versus-multi-file-modules/)

by Przemyslaw Klys on November 16th  
Flattening your modules into a single file before deploying to the PowerShell Gallery seems to be trending a bit. Przemyslaw tested the idea on one of his modules that previously took 12 seconds to load. Now? Less than 1 second. To call that impressive would be putting it mildly.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#announcing-general-availability-of-the-windows-compatibility-module-100)[*Announcing General Availability of the Windows Compatibility Module 1.0.0*](https://blogs.msdn.microsoft.com/powershell/2018/11/15/announcing-general-availability-of-the-windows-compatibility-module-1-0-0/)

by Steve Lee on November 15th  
After a lot of hard work, the WindowsCompatibility module is now GA! This bad boy (_slaps module_) will let PS Core access Windows PS modules via implicit remoting. If a lack of native support for your favorite modules in Core has been holding you back, give this a shot.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#reddit-rpowershell---popular-weekly-post)[*Reddit /r/PowerShell - Popular Weekly Post*](https://www.reddit.com/r/PowerShell/comments/9w61lj/lord_i_feel_dumb_i_just_want_to_compare_two)

Help with CSVs is a pretty common request, so this seems fitting. Want to know how to compare values from two columns? Look no further for a simple solution, plus some other tidbits on working with CSVs.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181116.md#youtube-5-ways-to-select-unique-items-in-powershell)[*Youtube: 5 ways to select Unique items in PowerShell*](https://www.youtube.com/watch?v=hEfXck_NAX4)

Prateek Singh has put out a nice and short video to demonstrate 5 ways that you can select unique items in PowerShell. All of us learned at least one new technique from this, so hopefully you do too.
