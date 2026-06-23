---
title: "ICYMI: PowerShell Weeks of X-mas & 4-January-2019"
author: Mark Roloff
authors:
  - Mark Roloff
date: "2019-01-04T16:00:52+00:00"
categories:
  - PowerShell for Admins
tags:
  - ICYMI
  - Community
  - Weekly Roundup
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2019/01/icymi-powershell-weeks-of-x-mas-4-january-2019/
---

Topics include checking SCCM patch compliance, a little regex, some more AoC, a deep dive into $null, and PowerShell...streaming?... You betcha!  
Content pulled together by Brett Bunker, Robin Dadswell, and Mark Roloff  
From all of us, we hope you enjoyed your holidays! Our sabbatical is over and things have been understandably quiet the last couple of weeks, so we're adding a little more this week to help make it up to you.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#powershell-everything-you-wanted-to-know-about-null)[*PowerShell: Everything you wanted to know about $null*](https://powershellexplained.com/2018-12-23-Powershell-null-everything-you-wanted-to-know/)

by Kevin Marquette on December 23rd  
Kevin's deep dives deserve their own special place in your bookmarks. Carve out some free time and read on to become a _$null_ expert.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#advent-of-powershell-2018-pt-i)[*Advent of PowerShell 2018, pt I*](https://blog.iisreset.me/advent-of-powershell-pt-i/)

by Mathias R. Jessen on December 25th  
Here's another take on the first two AoC challenges, with some really nice explanations for why you should avoid the += operator in favor of more performant alternatives.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#identifying-and-installing-sccm-client-software-updates-remotely-with-powershell-and-trigger-a-vmware-snapshot-before-remediation--part-1-of-3)[*Identifying and Installing SCCM Client Software Updates Remotely with PowerShell and trigger a VMware Snapshot before Remediation – Part 1 of 3*](https://byteben.com/bb/identifying-and-installing-sccm-client-software-updates-remotely-with-powershell-and-trigger-a-vmware-snapshot-before-remediation-part-1-of-3/)

by Ben Whitmore on December 28th  
In charge of managing patching in your environment? Ben has a great post that dives into using PowerShell to audit patch compliance on SCCM clients.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#teams-module-or-graph-api)[*Teams module or Graph API?*](https://alexholmeset.blog/2018/12/29/teams-module-or-graph-api/)

by Alexander Holmeset on December 29th  
As the Teams module moves along through development, you may wonder when it's appropriate to use the module vs using the Graph API. Alex does a quick comparison to help you see how and where they line up.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#powershell-basics-detecting-if-a-string-ends-with-a-certain-character)[*PowerShell Basics: Detecting if a String Ends with a Certain Character*](https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/PowerShell-Basics-Detecting-if-a-String-Ends-with-a-Certain/ba-p/307848)

by Anthony Bartolo on January 2nd  
Regex is an elusive beast that plenty of us are probably less acquianted with than we should be. We can correct that by just a little with these examples of using it to check the first or last characters in a string.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#adding-caching-to-your-powershell-scripts)[*Adding caching to your PowerShell scripts*](https://tjaddison.com/2018/12/24/Adding-caching-to-your-PowerShell-scripts)

by Tim Addison on December 24th  
Suppose you've got an expensive function thats needs to be called multiple times. Tim has a clever method for allowing a function to cache its results, thus allowing you to call it repeatedly without going through the initial workload again.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#reddit-rpowershell---most-popular-post)[*Reddit /r/PowerShell - Most Popular Post*](https://www.reddit.com/r/PowerShell/comments/abjl6m/eat_better_in_2018_a_script_to_generate_a_weekly/)

The applications for PowerShell in a professional environment are legion. But what about at home? And for meal planning? /u/n3rden wrote a script for just that.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#reddit-rpowershell---announcement)[*Reddit /r/PowerShell - Announcement*](https://old.reddit.com/r/PowerShell/comments/a8xtfp/new_powershelllive_switch_channel_will_auto_host/)

Worth mentioning... If the thought of watching livestreams of PowerShell coding is appealing, look no further. A handful of figures in the community are now on Twitch, which can be a good glimple into the thought-process behind their projects. Also be sure to follow the channel on Twitter [@PowerShellLive](https://twitter.com/PowerShellLive)

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#tweet-of-the-weeks)[*Tweet of the Week(s)*](https://twitter.com/devblackops/status/1078791129967976449)

From @devblackops, here's a brief sample of using GitHub Actions to run PSScriptAnalyzer on a pull request. This could be useful as a quick litmus test for public or group projects.

###### [](https://github.com/devops-collective-inc/WhatYouMissedThisWeek/blob/master/20190104.md#youtube-psdayuk-2018)[*Youtube: PSDay.UK 2018*](https://www.youtube.com/playlist?list=PLLKI4jlvx_96sw_FFic9ybQ-3g0RO2cbD)

PSDay.UK happened back in October but videos from the event are up on YouTube now. This playlist has a ton of great content that's well worth your time!
