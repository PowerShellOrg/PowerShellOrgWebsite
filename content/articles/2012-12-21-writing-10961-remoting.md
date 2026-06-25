---
title: "Writing 10961: Remoting"
authors:
  - Don Jones
date: "2012-12-21T15:26:43+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2012/12/writing-10961-remoting/
---

As I write this, we're close to sign-off on the outline of 10961A, which is a new 5-day Microsoft course on PowerShell v3. I sat down yesterday and starting doing some detailed-level design work on the proposed Module 9, which will cover PowerShell Remoting.  
I _love_ Remoting (and yes, I capitalize the "R" when referring to the specific feature, much as I would for Workflow). And although I've taught Remoting over and over and over since it was introduced in v2, although with this course I'm trying something a bit new.  
I'm going to start by covering the basics: What Remoting is, what WS-MAN is (and yes, I know it's formally called WS-Management, but you never see it referred to that way in-product), what WinRM is, and so on. I cover Invoke-Command and Enter-PSSession. Then I get into some advanced stuff, primarily covering how to pass arguments to Invoke-Command via its -ArgumentList parameter and an in-scriptblock Param() block. Surprisingly, _this isn't covered in the examples of Invoke-Command in the help._ I was shocked to discover that. I need to use that technique in Module 10, so I'm covering it in 9.  
Then I get into sessions, and I also cover disconnected sessions. Then the cool begins.  
I cover both implicit remoting (which is tons easier to do in v3) and delegated administration via custom session configurations (also vastly easier in v3). In the penultimate lab for the module, students will create a Remoting endpoint that contains a single command (Set-ADAccountPassword), have that command run under Domain Admin credentials, and restrict the endpoint to members of a HelpDesk domain user group. Voila, delegated administration! We don't go so far as to build a GUI tool atop it all, but that would be out of scope for this course. As-is, the lab covers an _extremely_ real-world use of PowerShell and Remoting, and does it in a very practical and production-ready way. I think it's gonna be awesome.
