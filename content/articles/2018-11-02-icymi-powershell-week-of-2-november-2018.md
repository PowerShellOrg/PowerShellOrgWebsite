---
title: "ICYMI: PowerShell Week of 2-November-2018"
author: Mark Roloff
authors:
  - Mark Roloff
date: "2018-11-02T15:00:16+00:00"
categories:
  - PowerShell for Admins
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2018/11/icymi-powershell-week-of-2-november-2018/
---

Topics include analyzing your scripts for code injection, configuring DSC with SQL, presentations from PSConfAsia, and more...  
<!--more-->


Intertubes scoured for content by Brett Bunker, Robin Dadswell, and Mark Roloff.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#how-to-secure-powershell-remoting-in-a-windows-domain)[*How To Secure PowerShell Remoting In A Windows Domain*](https://www.networkadm.in/securing-powershell/)

by Mike Kanakos on October 27th  
Digging into the security considerations surrounding PowerShell remoting can be a bit daunting. Fortunate for the rest of us, Mike was recently tasked with defining PowerShell's security posture in his organization and has written about his findings in this blog post. This is a great place to dive in for anyone looking to learn about it.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#using-powershell-injection-hunter-at-scale)[*Using PowerShell Injection Hunter at Scale*](https://p0w3rsh3ll.wordpress.com/2018/10/30/using-powershell-injection-hunter-at-scale/)

by Emin Atac on October 30th  
Malicious code injection probably isn't something many of us think about often, but we probably should. The InjectionHunter module can help you spot these in your scripts, but only if you pass them in as a ScriptBlockAst. Emin wanted something more accessible. This is a pretty cool write up about how Emin wrote a function to extend the inputs for this module, making it easier to analyze your code for these particular issues.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#powershell-script-module-design-building-tools-to-automate-the-process)[*PowerShell Script Module Design: Building Tools to Automate the Process*](https://mikefrobbins.com/2018/11/01/powershell-script-module-design-building-tools-to-automate-the-process/)

by Mike Robbins on November 1st  
Mike is up to the fourth part in his series on PowerShell's AST. In this post, he pulls together knowledge from the previous three to build an advanced function which can pull in code from a variety of sources and output an AST from it.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#dsc-pull-server-reloaded-part-3-pre-create-the-pull-server-database)[*DSC Pull Server reloaded. Part 3: Pre-create the Pull Server Database*](https://bgelens.nl/dsc-pull-server-reloaded-part-3-precreate-pull-server-database/)

by Ben Gelens on November 1st  
Windows Server is introducing the capability for a SQL-backed DSC pull server, and Ben has been working on a series to explore that. In his third post, he dives into configuring an Azure SQL instance, setting up the pull server, and registering a node. All with PowerShell!

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#how-to-use-internal-powershell-gallery-app)[*How to use Internal PowerShell Gallery App*](https://practical365.com/blog/how-to-use-internal-powershell-gallery-app/?utm_content=79231324)

by Daler Sayfiddinov on November 2nd  
Here's an interesting way to store and distribute your scripts internally. Daler shows us how to use a SharePoint list as a backend repository with PowerApps acting as a frontend. Search, filtering, and the ability to submit new scripts all built-in.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#reddit-rpowershell---most-popular-weekly-post)[*Reddit /r/PowerShell - Most Popular Weekly Post*](https://www.reddit.com/r/PowerShell/comments/9sxkzh/i_just_want_to_thank_the_whole_community_for/?st=jnzk5fyx&sh=44be7d78)

/u/WhatTheHomePod just wants to spread a little love and appreciation by thanking /r/PowerShell for being such an awesome community that helped them to get started learning this great tool.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#tweet-of-the-week)[*Tweet of the Week*](https://twitter.com/cyberhayden/status/1057098123720310785)

If cloud security is part of your jam, Azure ATP can now help you monitor for remote PowerShell execution.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20181102.md#livestream-manage-your-heterogeneous-environments-with-powershell-core)[*LiveStream: Manage Your Heterogeneous Environments with PowerShell Core*](https://livestream.com/gaelcolas/PSConfAsia/videos/182706737)

At this year's PSConfAsia, Steve Lee gave a great presentation that shows off some of the great cross-platform features that he and his team have brought to PS Core.
