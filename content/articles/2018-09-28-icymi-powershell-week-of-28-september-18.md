---
title: "ICYMI: PowerShell Week of 28-September-18"
author: Greg Tate
authors:
  - Greg Tate
date: "2018-09-28T15:00:54+00:00"
categories:
  - PowerShell for Admins
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2018/09/icymi-powershell-week-of-28-september-18/
---

Topics include PowerShell Rest API on AWS Lamda, web applications in PowerShell, using PowerBI to show DB restores, input validation in functions, PowerShell command history, and the Unplugged session at Ignite with Jeffrey Snover and Jason Helmick.  
<!--more-->


Special thanks to Mark Roloff and Brett Bunker for pulling it all together this week!

##### [*Creating a PowerShell REST API (AWS)*](https://aws.amazon.com/blogs/developer/creating-a-powershell-rest-api/)

by Norm Johanson on September 23rd  
In case you missed it, support for PowerShell Core on AWS Lambda is now a thing. And to help showcase how cool of a thing that is, this article from the AWS Developer Blog walks us through setting up a PowerShell REST API with the Amazon API Gateway.

##### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190928.md#building-a-simple-form-using-powershell-polaris-module)[*Building a simple form using PowerShell Polaris module*](https://chen.about-powershell.com/2018/09/building-a-simple-form-using-powershell-polaris-module/)

by Chen V on September 23rd  
If I were a betting man, I'd wager you didn't know there's a web framework for PowerShell (multiple, actually). Chen's blog gives us a brief demonstration of how you can leverage Polaris to build simple web applications in PowerShell.

##### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190928.md#automate-your-sql-server-restore-tests-with-powershell-dbatools-and-powerbi)[*Automate your SQL Server Restore Tests with PowerShell, dbatools and PowerBI*](https://marcosfreccia.com/2018/09/24/automate-sql-server-restore-tests/)

by Marcos Freccia on September 24th  
If you've been in this gig for any time at all, you know the importance of backups. Especially tested backups. You do test them, right? Well, Marcos here does. In fact, he even has a PowerBI dashboard to show him the results of his database restores at a glance. Read on to see how he sets it all up, along with a link to the GitHub repo.

##### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190928.md#how-to-validate-input-in-powershell-functions-part-1)[*How To Validate Input in PowerShell Functions, Part 1*](https://redmondmag.com/articles/2018/09/25/validate-input-in-powershell-functions-1.aspx)

by Brien Posey on September 25th  
It happens to everyone. You spend all afternoon working on that script, test it, hand it off, and Gomer Pyle finds a way to make it break by passing in data that you didn't think of. What you need is input validation. Brien kicks things off with an introduction to _ValidateSet_ to help you get a handle on exactly what data people can supply your scripts.

##### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190928.md#previous-command-history-in-powershell)[*Previous Command History in PowerShell*](http://woshub.com/powershell-commands-history/)

by Windows OS Hub on September 27th  
Prior to Windows PowerShell v5, if you closed the PowerShell window, then you lost your command history. Well, this behavior has now changed. Learn how the built-in PSReadline module provides a persistent command line history across PowerShell instances.

##### [*PowerShell.org Challenge - Unanswered Post*](https://powershell.org/forums/topic/automatically-save-outlook-message-2/)

Wayne needs help on understanding how to parameterize an email address in his script. Please jump in and offer some help!

##### [*New Module PUDAdminCenterPrototype*](https://www.reddit.com/r/PowerShell/comments/9hqu76/new_module_pudadmincenterprototype_a_universal/)

Based on the popular PowerShell Universal Dashboard, /u/fourierswager brings us a new tool to assist with remotely managing WIndows systems in a web-based GUI. Restart systems, RDP in, and view all manner of information about what's happening on your hosts. This is a pretty sweet project with lots of potential!

##### [*Introducing the 'Fluxor' PowerShell Module!*](https://twitter.com/vmkdaily/status/1043358314321661952)

by @vmkdaily on September 21st  
Now here's a cool thing for you vSphere admins. Mike Nist introduces a new cross-platform module, Fluxor, for collecting stats from vSphere, which can then be exported to InfluxDB for nice visualizations of your environment.

##### [*PowerShell Unplugged with Jeffrey Snover and Jason Helmick*](https://www.youtube.com/watch?v=DPICqEiz3m4)

If you weren't fortunate enough to attend Microsoft Ignite this year, be sure to set aside some time to watch the PowerShell Unplugged session. Jeffrey and Jason discuss the current state of PowerShell, including some of its cool new features and awesome community.
