---
title: The PowerShell Podcast How to Test Microsoft Graph Without a Live Tenant with Morten Mynster
author: Andrew Pla
authors:
  - Andrew Pla
  - Morten Mynster
date: "2026-08-31T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/ru2yx5w5kmmg795m/The_PowerShell_Podcast_episode_244_Morten_Mynster9mlzv.mp3"
episode: 244
youtube: cB_QE1HvAyI
guid: powershellpodcast.podbean.com/05ea7041-0033-32bc-be97-5869798812e4
aliases:
  - /2026/08/the-powershell-podcast-how-to-test-microsoft-graph-without-a-live-tenant-with-morten-mynster/
---

Andrew welcomes Morten Mynster back to the PowerShell Podcast to dig into the projects he’s been building around Microsoft Graph, Entra, least privilege, and authentication. Morten walks through Least Privileged Entra, a module that uses activity logs to identify users who may have more permissions than they actually need, and MS Graph Proxy, which lets developers work with mocked Microsoft Graph data locally without connecting to a live tenant. They also get into managed identities, the rougher corners of Microsoft 365 APIs, testing Graph-based projects in CI/CD pipelines, and how contributing to open source can solve real problems while creating unexpected career opportunities.

Key Takeaways:

· Least privilege is easier when you can see what people actually use. Morten’s Least Privileged Entra module compares assigned Entra roles with activity data to identify permissions that may be unnecessary and suggest more limited alternatives. The goal is to give admins something actionable rather than simply reporting that a configuration passed or failed.

· You don’t always need a live Microsoft 365 tenant to develop against Microsoft Graph. MS Graph Proxy intercepts Graph requests and responds with mocked data, allowing developers to test scripts and modules locally, offline, or inside CI/CD pipelines. It can also identify the minimum Graph permissions associated with the endpoints an application uses.

· Sharing your work can have benefits far beyond the project itself. Morten credits his Least Privileged MS Graph project with helping him land his current job. His approach is simple: solve a real problem, share the solution, contribute where you can, and let other people build on what you’ve learned.

Guest Bio:

Morten Mynster is an IT professional and open source contributor focused on Microsoft Entra, Microsoft Graph, security, and least privilege. His projects include LeastPrivilegedMSGraph, LeastPrivilegedEntra, and MSGraphProxy, and he regularly contributes to community projects and discussions around Microsoft 365 security and PowerShell.

Resource Links:

- [https://github.com/Mynster9361/Least_Privileged_MSGraph](https://github.com/Mynster9361/Least_Privileged_MSGraph)
- [https://github.com/Mynster9361/LeastPrivilegedEntra](https://github.com/Mynster9361/LeastPrivilegedEntra)
- [https://github.com/Mynster9361/msgraphProxy](https://github.com/Mynster9361/msgraphProxy)
- [https://github.com/FriedrichWeinmann/EntraAuth](https://github.com/FriedrichWeinmann/EntraAuth)
