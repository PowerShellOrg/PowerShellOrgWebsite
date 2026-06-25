---
title: Slack and PowerShell
authors:
  - pscookiemonster
date: "2016-05-24T12:51:46+00:00"
categories:
  - DevOps
  - PowerShell for Admins
aliases:
  - /2016/05/slack-and-powershell/
---

Having a platform that enables [ChatOps][1] can be a game changer.  You can quickly see changes, alerts, build status, discussions, emergency chats, and more, all in a single, searchable interface.  If you can sift through the gifs.  
Bots are a hot topic these days, and and it's well worth checking out Matt Hodgkins bit [on integrating PowerShell with Hubot][2].  Bots are a great alternative to trying to spin up a web front end for PowerShell.  
On top of bots, systems like Slack often offer a [wealth of integrations][3], allowing you to hook into systems like Nagios, PagerDuty, GitHub, Trello, and many others.  
Occasionally, you might have something that doesn't integrate natively.  Maybe you want to integrate Slack messages into your SCOM command notification channel, your CI/CD build process, orchestration system, configuration management systems, or even ad hoc scripts.  
If you're using Slack, check out the [Slack API methods][4], or [an incoming webhook][5].  With the API in particular, you can do some handy stuff!  
If you like the idea of re-usable tools and abstraction, check out [PSSlack][6], a PowerShell module that we're starting to build out, which can simplify sending messages, searching messages, and more.  
[![pslack](https://powershell.org/wp-content/uploads/2016/05/pslack.png)][6]

 [1]: https://www.youtube.com/watch?v=F8Vfoz7GeHw
 [2]: https://hodgkins.io/chatops-on-windows-with-hubot-and-powershell
 [3]: https://slack.com/apps
 [4]: https://api.slack.com/methods
 [5]: https://api.slack.com/incoming-webhooks
 [6]: http://ramblingcookiemonster.github.io/PSSlack/
