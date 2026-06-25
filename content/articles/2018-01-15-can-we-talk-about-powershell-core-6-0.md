---
title: Can We Talk About PowerShell Core 6.0?
authors:
  - Don Jones
date: "2018-01-15T16:36:18+00:00"
categories:
  - News
  - PowerShell for Admins
aliases:
  - /2018/01/can-we-talk-about-powershell-core-6-0/
---

Microsoft recently [announced the General Availability][1] (that is, a non-beta release) of PowerShell Core 6.0. A [companion document detailing breaking changes][2], along with some of the language in the announcement, has led to more than a few inquiries in my mailbox. Most take the tone of, "have I been wasting my time learning PowerShell?!?!?" because, at first glance, PowerShell Core looks deeply less functional than its predecessor. Let me tell you what I think.  
<!--more-->


First, I need to stress that this isn't an official Microsoft position - it's my opinion. I've been working with this product since before it launched, I've lived through its successes and missteps, and I've gotten pretty good at figuring out what the company is up to - but this article isn't based on any official conversations or info.

## There are Two PowerShells Now

Understand that **Windows PowerShell**, currently v5.1, isn't going away. People are a little freaked out by phrasing like, "Windows PowerShell won't be developed any further," but if you're feeling panicked over that, sip your whiskey and chill. Microsoft regards Windows PowerShell as **finished. **Honestly, from my perspective, it contains every bit of functionality I think an admin could conceivably need to do their job. Sure, maybe it lacks some deeper developer-focused features, but PowerShell was never supposed to be C#.  
5.x remains officially supported and officially available. You can run it side-by-side on the same system with PowerShell Core. If your job is administering Windows then, as the name implies, _Windows_ PowerShell is going to be your go-to for a long time. It won't pick up any breaking changes going forward, it's not going to break existing functionality when a new version comes out, etc. It's _stable. _  
**PowerShell Core** (or just, "PowerShell," sans the "Windows") is a _new product. _It is not the "successor" of Windows PowerShell; it is a new thing based on Windows PowerShell. It is designed for cross-platform management, when you need to do something on Windows _and_ Linux _and_ macOS. As such, its functionality focuses on stuff that is available on _all of those platforms. _It doesn't do Windows Management Instrumentation, because "Windows." It doesn't manage Active Directory. It doesn't query Windows Performance Counters. It's not, in other words, specialized for Windows.

## PowerShell Has Never Been "Windows"

Windows and Windows PowerShell _are separate things. _People have an incredibly tough time grasping this, to the point where [it's a significant "gotcha" for newbies][3]. Windows PowerShell has _always_ consisted of a set of core functionality that actually had little to do, for the most part, with the Windows operating system. PowerShell Core continues that tradition, consisting of a base functional foundation. PowerShell's "power" came from add-ins - modules - that "connected" PowerShell to other technologies. Those add-ins run _inside_ PowerShell, but they are _distinct_ from it. The ActiveDirectory module comes from the Active Directory team, and ships _as a feature of the Windows Operating System. _If you could install Windows PowerShell 5.1 on Windows XP (you can't, but imagine), you wouldn't suddenly get a bunch of awesome functionality for administration, because Windows XP _doesn't ship with any awesome functionality. _Much of what we do in Windows PowerShell comes from the operating system; you should _expect_ that functionality to be missing when you're on, say, Linux.  
Now, sure - if you install PowerShell Core on Windows, you _still_ won't have all of your favorite modules, because lots of when can't run on .NET Core. That's why Windows PowerShell is still a thing. Just as it took several years for Windows PowerShell to gain a large stable of add-in modules, it'll likely take some time for useful functionality to join up with PowerShell Core. The fact that some module doesn't run on Core _today_ doesn't mean the world has ended.

## Sins of the Past

A lot of the breaking changes in PowerShell Core are, from my perspective, more than welcome. Because Remote Procedure Calls (RPCs) are pretty much Windows-specific, almost every command that used RPCs for remote requests has lost the ability to perform remote requests. Instead, you use PowerShell Remoting (Invoke-Command) to "send" the command to the machine you want to query, let that machine execute the command locally, and then you get the results back. _This is the way I've been telling people to do things for eight years. _RPCs are a Root Cause of Evil in the universe. Companies who don't want to allow Remoting (either over WS-MAN or SSH, both of which are supported in PowerShell Core) but who _will_ allow RPCs, are stupid companies who need to wake up and educate themselves. Msrpc.dll is probably the most-hacked, most-patched file on the system.  
A lot of the Web-based commands - Invoke-WebRequest and friends - have changed, too. This is mainly so that they'll work with the refactored underlying .NET Core. Why was .NET Core refactored? _So it would quit using old Internet Explorer code. _Nobody in a physics-based universe should see that as anything but a long-overdue blessing.  
PowerShell Workflows aren't supported in Core, because .NET Core doesn't support Windows Workflow Foundation, which as near as I can tell has been deprecated for half a decade anyway. Jeffrey Snover and I have had a long-running, and very cordial, disagreement over PowerShell Workflow, because I think it was a Horrible Idea from day one. Not having it in Core will simply keep people from straying into that horrible, confusing, deeply broken realm.  
Snap-ins aren't supported in Core. Good. Snap-ins stopped being the right thing to do in PowerShell 2.0, which came out in, like, 2008 or something. Repackage your code and move on. Anyone still shipping you a snap-in doesn't care about you, your job, your family, or your values. It is, for the most part, the work of a few seconds to repackage a snap-in into a proper binary module.

## It's 6.0, Not 6.Done.

One of the PowerShell Core release notes indicates that it doesn't run DSC resources. This has caused about half of the incredulous emails I've gotten this past week. _Is Microsoft abandoning DSC? Why doesn't DSC run on PowerShell Core?_  
Desired State Configuration has always _mainly_ targeted Windows. The Linux-compatible Local Configuration Manager (LCM) wasn't even written by the PowerShell team, it was written by Microsoft's Unix team, who also wrote the entire library of Linux-compatible resources. Today, there's zero need for PowerShell Core to execute DSC resources; Windows PowerShell or the Linux LCM will handle it for you.  
But this is why [DSC Core][4] is going to be a thing. And that's the thing to remember, here. Despite the patterns of the past year or so, we're all still used to Microsoft taking 3-5 years to produce a product, which we then have to live with for 3-5 years until the next version comes out. The PowerShell team, at least, has been releasing at a much faster cadence. So just because Core doesn't do something _today_ doesn't represent an existential threat; if it makes sense for Core's audience and intent, then it'll likely do it before too long.  
Incidentally, I have some very specific thoughts on DSC Core, including several, "I told you you'd eventually do it that way" moments, but we can do that in a separate article.

## Why the Hell is Core Even Needed, Though?

Microsoft sells Windows. Windows PowerShell manages Windows. So why was Core even needed?  
There are two reasons here. Both are probably true; one is perhaps more pragmatic and the other is perhaps more noble, depending on your opinion.  
The pragmatic one is that Microsoft is moving toward being a business that sells you compute time, whether that compute runs in their cloud or in your datacenter; this is the essence of what Azure Stack is, and if you think that model isn't eventually going to be their _only_ model, then you're deluding yourself. As a company that sells compute, Microsoft mainly wants you to run all your compute workloads on their compute services, of course. They don't care if you're running Linux or Windows; the compute is what they want you to pay for. Not caring about the OS means you need a rich set of tools that can be used consistently across all operating systems. Thus, PowerShell Core.  
That kind of segues into the possibly-noble reason, and we can start by simply asking, "fine, why not just use Bash on every OS," as one person messaged me on Twitter. The reason is that Bash is a terrible shell for Windows. Arguably, Bash isn't even a great shell for Linux, although if you're used to it then you can be extremely productive with it. If you actually sat down and made a list of what you needed a shell to actually do, you'd never come up with Bash, and you'd likely have never come up with MS-DOS, either. Most shells today happened by accident and evolution, not by design, and they're about as well-suited to their job tasks as human knees are to running. You can do it, but it's not really a great idea. Bash - and most shells, if we're being fair - has a ridiculously high learning curve, and it forces you to work through the ugly details of unstructured data. That is, Bash, and most other shells, are designed mainly to parse and manipulate the text output of various operating system commands. They're a hack between a bunch of tools that were never meant to work together. The literal point of PowerShell, when you really tear it down to its smallest roots, is to parse all of that crap for you, and let you work with consistently structured data. You can focus less on what command output looks like and focus more on whatever the heck it is you're trying to do. [Linux fans who take a minute to really understand PowerShell][5] tend to like it. Naysayers who focus on the aesthetics of the syntax or whatever haven't taken that minute, or just have a religious objection to Microsoft playing in their sandbox. So Microsoft's decision to make PowerShell run on Linux is possibly a noble one, and I feel they've done so in a way that's pretty respectful of the Linux OS' roots, history, and patterns.

## What if I Don't Admin on Linux?

Then just use Windows PowerShell and stop sweating it. I mean, you're absolutely limiting your career, because as [I've noted elsewhere][6] the concept of "OS" is changing drastically, and anchoring your career to a single OS is probably a dumb move right now. But, if that's your decision, then just stick with Windows PowerShell and ignore Core.

## So is Windows PowerShell Really "Done?"

Who knows? Probably mostly. I suppose we could see a 5.1.1 if there's a really egregious bug or a security problem someone finds, or a 5.2 if Windows itself would benefit tremendously from something specific that wouldn't work in Core. But I wouldn't count on anything major happening to it.

## Let's Review

So here's what we know:

  * PowerShell Core doesn't mean Windows PowerShell is dead.
  * You haven't been wasting your time learning Windows PowerShell.
  * You can probably ignore PowerShell Core for a good long while if you don't need cross-platform functionality.
  * Your personal job priorities may not align with Microsoft's corporate priorities, which means the company may do stuff that doesn't make sense to you, or that you don't need.
  * PowerShell Core isn't a drop-in replacement for Windows PowerShell because Core has a different audience and intent.
  * The more Windows-specific your task, the less likely Core is going to be the right tool for the job.

That's my take on all this; you're more than welcome to share yours (be polite!) in the comments!

 [1]: https://blogs.msdn.microsoft.com/powershell/2018/01/10/powershell-core-6-0-generally-available-ga-and-supported/
 [2]: https://github.com/PowerShell/PowerShell/blob/master/docs/BREAKINGCHANGES.md
 [3]: https://devops-collective-inc.gitbooks.io/the-big-book-of-powershell-gotchas/content/manuscript/where-is-the-____-command.html
 [4]: https://blogs.msdn.microsoft.com/powershell/2017/09/12/dsc-future-direction-update/
 [5]: https://twitter.com/nocentino
 [6]: https://donjones.com/2017/12/14/has-the-death-of-the-os-already-begun/
