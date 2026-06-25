---
title: Why PowerShell on Linux is Such an Accomplishment
authors:
  - Don Jones
date: "2016-08-19T15:36:08+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/08/why-powershell-on-linux-is-such-an-accomplishment/
---

Yesterday, Microsoft [announced][1] that Windows PowerShell - which I suppose we'll just call "PowerShell," now - has been open-sourced, with PowerShell Core builds being made available for various Linux distros as well as macOS.  
This is a big deal, but not exactly for the reasons you might think.  
<!--more-->

## That .NET Shell Guy

PowerShell's genesis goes back to 2002 - and even earlier, really - when Jeffrey Snover wrote "[The Monad Manifesto][2]." He was trying to take a top-down approach to solving a long-standing problem with Windows administration, one that VBScript and other approaches had failed to fully address.  
Problem was, Snover was proposing an administrative shell, and scripting language, _built on top of the .NET Framework. _That's not inherently a bad thing; tens of thousands of line-of-business applications have been written in .NET, and along with Java, it's probably one of the most popular business software frameworks on the planet. Thing is, Snover was suggesting this at a time when .NET Framework-based projects were failing left and right _inside_ Microsoft. This was in the "Longhorn" timeframe, when projects like WinFS - touted as the very basis of a new generation of Windows - had epically failed to deliver. Microsoft wound up ["decoupling" Longhorn from .NET][3], and now there's this loudmouth running around trying to build a _shell_ on it?  
I won't say that Jeffrey was a pariah internally for a period of time, but he certainly had his battles to fight.  
And he won.  


## The PowerShell Era

Launching in 2006, PowerShell 1.0 was in many ways the "minimal viable product" the team could have shipped. Notably, it lacked Remoting, something which would hold PowerShell back until 2.0 shipped a couple of years later. But Snover and his team, with 1.0, still accomplished the near-unimaginable: they convinced the Exchange Server team to go all-in, and build an almost model implementation of how to use PowerShell for administration. Exchange Server 2007 built its very GUI on top of PowerShell, just as Snover had imagined in his Manifesto. It's perhaps hard to imagine, a decade later, how incredible an accomplishment this was for Microsoft. Exchange Server was very much the flagship product of the time. Pretty much everyone bought Exchange Server, and to make this big a flip was a big deal.  
To be sure. the Exchange Server team wasn't without their worries. In fact, the team hedged its bets in a big way. Rather than instrumenting the server directly in PowerShell, the team built an entire abstraction layer, and wrote PowerShell commands _to that. _That way, they reasoned, if this ".NET Shell thing" was a flop, they could rip it out and replace it with something else, and do so fairly quickly.  
PowerShell wasn't a flop.  


## In Lockstep with the Vision

Few realize it, but every version of PowerShell up to, and including, 4.0 were created in lockstep with the original Manifesto. While each version introduced a bevy of new features, the "headline" feature in each was taken straight from the Manifesto:

  1. A composable command-line shell and scripting language
  2. Remoting
  3. Workflow
  4. Desired State Configuration

Snover and the Windows Management Framework (WMF) team - of which PowerShell and its supporting technologies are a part - kept marching firmly in the direction he'd outlined. And that's not to in any way suggest it was a one-man show. Luminaries like Bruce Payette, who led much of the core language development, helped make PowerShell accessible to newcomers and familiar-feeling to programming pros. Guys like Lee Holmes not only helpd move development forward, but more recently gave the shell a stronger security focus. Dozens of unseen and unsung heroes helped make sure PowerShell was meeting the needs of its audience (I'm reminded by one exercise at a Microsoft MVP Summit, where MVPs helped reproduce and categorize filed bugs so that the team could start working through them, and another incident where Program Manager Dan Harman read through _hundreds_ of suggestions in Microsoft Connect to help bring as many of them to life as possible). There are team members who've been with the product for a decade, something that's nigh unheard-of in Microsoft.  


## The Role of Community

The team knew at the outset that PowerShell _would_ flop if people weren't using it, and becoming passionate about it. Numerous team members began to engage with the community on a regular basis to help that community come to life. The PowerShell MVPs - honestly, one of the most engaged and critical groups of MVPs within the MVP program - encouraged people to learn the shell, poke at it, and complain about any shortcomings they ran across. This vocal community made a serious impact. An early build of PowerShell 3.0 included a ReadMe file listing some 80-odd new features and changes, _along with the names of the people who'd suggested them. _Snover himself remains a regular conference guest. Payette and Holmes wrote bestselling books. Numerous team members appeared at Microsoft TechEd and Ignite.  
And the team supported independent community efforts whenever possible. Managers like Kenneth Hansen, Angel Calvo, Erin Chapple, and more made sure community leaders had access to answers and resources when they needed them (scarce as those resources could be, at times), and the entire team worked to give as much of their time as possible to helping the independent community thrive. Sites like PowerShell.org and PowerShellMagazine.com,  the PowerScripting Podcast, and conferences like PowerShell Conference Asia, PowerShell Conference Europe, and the PowerShell + DevOps Global Summit would have been impossible without the generous support the team gave.  
And that community thrived. Perhaps the biggest "wins" came with Advanced Functions (affectionately called "script cmdlets") and Desired State Configuration, where we no longer had to rely on Microsoft to provide us with the tools we needed, but could instead code them up ourselves.  
And _that_ was a turning point.  


## Baby Open Source Steps

Understand that open source had long been the enemy at Microsoft. The company's attempts to fight back against Linux and establish a Windows-only datacenter created a culture that deeply distrusted open source, and in many ways regarded it as the opposite of what Microsoft was all about. But _many_ within Microsoft regarded open source as a way to better provide customers with what they actually needed, and a way to empower customers to create their own solutions, rather than relying entirely on what Redmond could produce.  
The PowerShell team's first step into open source was to simply release the Desired State Configuration Resource Kit on GitHub. It wasn't a big step, as the Kit modules were all script anyway, making the source "open" kind of by default. That happened at almost the same time the company released an open-source (!) Local Configuration Manager implementation for Linux (!!). Satya was in charge now, after all, and he'd made it clear that _Microsoft Loves Linux. _  
Not long after, Desired State Configuration's documentation was open-sourced (!!!) as a set of Markdown (!!!!) documents, allowing anyone to contribute and make corrections. That was quickly followed by _all_ the PowerShell core documentation being open-sourced (!!!!!). Haters gonna hate, of course, and Microsoft was quickly accused by some as simply "taking advantage" of the community for "free bug testing and documentation writing." Which, of course, is the _whole point_ of the OSS movement. Customers were now _empowered. _We didn't have to wait for Microsoft to fix a typo, or file an expensive support incident. We could fork, fix, and submit a PR.  
Snover made it clear as far back as 2014 that the open-sourcing of PowerShell itself was "inevitable," although he could never comment on a timeline. The blocker, he felt, was that .NET itself - which PowerShell runs on - was closed-source, making an open-source PowerShell fairly useless.  


## The Dominoes Begin to Fall

Of course, Microsoft recently open-sourced .NET Core, bringing it - and things like ASP.NET Core - to Linux and Mac. Suddenly, Snover's "blocker" wasn't a block. Well, kind of. PowerShell needed a lot more than .NET Core.  
Except for _PowerShell Core, _which was designed to run on the extremely stripped-down Nano Server version of Windows Server 2016. PowerShell Core ran on .NET Core. .NET Core was open-sourced.  
And so, yesterday, PowerShell itself followed into the world of open source. It's [hosted on GitHub][4], for pity's sake, which is about the most non-old-school-Microsoft thing I can imagine. And the first pull requests have already been submitted.  
But I want you to look back at where PowerShell has been these past 10+ years. It began as a simple document, and nearly didn't live, thanks to the negative internal feelings on .NET at the time. But it _did_ live, thanks in part to a strong vision, and in part to a passionate team of designers and developers who knew their ".NET shell" would make a difference. Today, PowerShell is deeply embedded into nearly every Microsoft business product, and is becoming more so every day. All of this happened in about the same time it took VBScript to become widely accepted by administrators - but PowerShell, in that time, has come _leagues_ further.  


## Sure... but on _Linux_???

Of course, none of the forgoing in any way explains why PowerShell on Linux (or macOS) makes any sense. These operating systems are inherently text-based, and their existing shells have been getting the job done for decades. So why PowerShell? Why now?  
First, I think it's telling that PowerShell on *nix (which includes, for me, macOS, based as it is on BSD) is _respectful. _On Windows, we have Unix-like aliases - ps, ls, and the like - which run PowerShell-equivalent commands. Not on *nix. Run **ps** and you'll get the same **ps** you've always run; ditto with ls, man, and all the others. PowerShell isn't here to trample the commands you know. But it _can_ integrate those commands into its pipeline, feeding them objects-as-text, and consuming the text they output. "Objects" simply being a defined data structure, many familiar Linux command-line compositions can be done more easily and in a more readable sense in PowerShell, since text manipulation is less critical. Command-lines become less fragile, too, since these data structures can remain the same even when the underlying command is updated. Leading up to the release of PowerShell on *nix, I had the opportunity to work with many die-hard Linux admins who, once they agreed to keep an open mind, started to really appreciate what PowerShell could do for them.  
And don't forget that _Microsoft Loves Linux. _Having a single shell experience, and cross-platform shell connectivity, makes it easier to run Windows and Linux _together. _It'll make it easier to manage Linux in Microsoft's Azure cloud. It gives us, the IT community, _options, _where before we didn't have any.  
And I think, tellingly, PowerShell on *nix represents a sea change at Microsoft. You're no longer being asked to buy into a single-stack solution. Microsoft's happy to let you mix and match as needed. Most importantly, they think you'll use their products - like PowerShell - because _they're the best tool for the job. _In other words, Microsoft's willing to _compete,_ and have you use their products because you choose to, not because you've been locked into them._ _That's a wonderful thing. There's the implied risk of losing the competition, but it's a risk Old Microsoft has tried to mitigate and remove as much as possible. Now, we have the option to use Office wherever we want - not tied to Windows. PowerShell is no longer tied exclusively to Windows. We're seeing that attitude work both ways, too, with Bash on Windows, SSH on Windows, and more. These products can _compete_ for your attention, and that will make them _all_ better products in the long run.  
So congratulations to Jeffrey Snover, to all the members of the Windows Management Framework team, and to Microsoft itself. And congratulations to PowerShell itself - and to the global community that brought us to this inevitable new beginning.

 [1]: https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/
 [2]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiRtrzc1M3OAhVD7GMKHVe8Cz4QFggcMAA&url=https%3A%2F%2Fwww.gitbook.com%2Fbook%2Fdevopscollective%2Fthe-monad-manifesto-annotated%2Fdetails&usg=AFQjCNEi5p7CeZIrvKWKovnnBb7zLpyCGw&bvm=bv.129759880,d.cGc
 [3]: http://www.theregister.co.uk/2005/05/26/dotnet_longhorn/
 [4]: http://github.com/powershell/powershell
