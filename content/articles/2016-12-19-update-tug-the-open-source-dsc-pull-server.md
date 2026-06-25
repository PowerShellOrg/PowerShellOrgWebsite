---
title: "UPDATE / Tug: The Open-Source DSC Pull Server"
authors:
  - Don Jones
date: "2016-12-19T17:25:49+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
aliases:
  - /2016/12/update-tug-the-open-source-dsc-pull-server/
---

If you haven't taken a look at [Tug][1], now's a great time. Eugene Bekker has been doing a ton of heavy lifting, taking my .NET Core proof-of-concept code and turning it into a formal ASP.NET MVC project.  
<!--more-->


Tug is nominally cross-platform. Basically, it's n ASP.NET Core application that can run under any Web server that supports ASP.NET Core, which includes Windows, Windows Nano Server, and even Linux. Tug knows the DSC protocol, so it receives requests from Local Configuration Managers (LCMs) on DSC target nodes.  
Tug has no "brains" to deal with those request, though. Instead, it implements a provider layer, and calls upon a provider to deal with requests. A very simple provider is currently implemented, which runs PowerShell commands in response to LCM requests. So, short story, if you can write a PowerShell advance function, you can make your pull server behave in whatever way you want. Store data in SQL Server, if you like, for example.  
Because of some hitches in .NET Core 1.0, that run-PowerShell-commands trick doesn't work well. so to do that you really have to target full .NET, which limits you to running Pull server on Windows Server or Windows Server Core. That should be fine for most folks.  
But you can also write Tug providers in full .NET - meaning you can use (say) EF Framework to manipulate target node data.  
Presently, Tug doesn't implement the Report Server functionality - it's stubbed out, and that's coming next. And if you're thinking, "will Tug be able to __\__," the answer is, "yes - if you write a provider layer that lets it do ____, which can include writing PowerShell commands (functions) that do ____." Tug isn't intended to lock you into one operational mode. Do you want to store client data in SQL Server, and assemble MOFs on-the-fly? You can program Tug to do that. Do you want to store everything in XML files? You an program Tug to do that. Want to use client certificate authentication for nodes? You can program Tug to do that. Because everyone wants something a little different from their Pull server, Tug's designed to let you code up whatever model you prefer.  
Tug's an open-source project on GitHub, licensed under MIT, which means you can use it for whatever you want. We've got a [brainstorming document][2] with ideas, and if you'd like to contribute, that's a place to start. **And please, contribute. **If you can't, but you follow someone in the community who might be able to, please draw their attention to the project.

 [1]: https://github.com/powershellorg/tug
 [2]: https://github.com/PowerShellOrg/tug/blob/master/TODO.md
