---
title: Episode 28 – Jeffrey Snover talks about WinRM
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-06-01T23:57:15+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-028.mp3"
aliases:
  - /2008/06/powerscripting-podcast-episode-28-jeffrey-snover-talks-about-winrm/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

We have a great show for you guys today.  Several weeks back we had Jeffrey Snover on the show.  We had teased at the time that there was a third portion to the interview that deals with WinRM and WS-MGMT.  We're going to play that today for you.  Also on tap: news, resources, and a bunch of PowerShell tips for you.

### News

_The news is sponsored by_ [_Sapien Technologies_][2]_._

  * [BGShell][3] now has a [Codeplex][4] page
  * Microsoft Forefront 2008 (code-named Stirling) looks to be built on PowerShell. Here's a [blog post][5].
  * PowerShell Plus [supports the new CTP2 STA feature][6] 
      * This is big because it allows for you to play with all of the new WPF stuff we'll be talking about later in the show.

### Interview

_Admin Script Editor provides a true integrated scripting environment for  
PowerShell.  Advanced features include an integrated PowerShell debugger,  
advanced code generating tools for Active Directory, Databases, XML files  
and more.  Let's not forget about the exclusive PowerShell forms designer.  
What's coming up? Soon its innovative and feature-rich ScriptPackger tool  
will offer support for the dynamic installation of cmdlets! Come see for  
yourself-- Admin Script Editor v3.5 is available for a 45 day trial at  
_ [_AdminScriptEditor.com_][7]_._  
We hope you enjoy the Jeffrey Snover clip on Win-RM and WS-MGMT.

### Resources

  * Very cool (and important) series on PowerShell & WPF from James Brundage on the Powershell Team blog.  Read this one first, he explains the rationale behind focusing on WPF:  [PowerShell and WPF: WTF][8] 
      * [WPF & PowerShell "“ Part 1 ( Hello World & Welcome to the Week of WPF )][9]
      * [WPF & PowerShell "“ Part 2 (Exploring WPF (and the rest of .NET) with Scripts)][10]
      * [WPF & PowerShell -- Part 3 (Handling Events)][11]
      * [WPF & PowerShell -- Part 4 (XAML & Show-Control)][12]
      * [WPF & PowerShell - Part 5 ( Using WPF & PowerShell Modules)][13]
      * [WPF & PowerShell - Part 6 (Running Functions in the Background)][14]
  * Beware the custom console. Kirk Munro [does a great job][15]of explaining the problems that can result from custom consoles. 
      * [Disturbing hint][16] seen on "[The Industry Insiders][17]" MSDN blog about a possible SQL Server 2008 "closed console". Go leave feedback on the blog post and voice your opinions.
  * [Slides from a presentation][18] that Keith Hill gave to a local user group to which he's a member.
  * Here's an [excellent post][19] from Joel at [HuddlesMasses.org][20] in which he goes into great detail about regarding the new Modules feature in CTP2.  He's figured out a ton of stuff which is not documented anywhere else yet so be sure to check it out.
  * Here's a link to Jaykul's (whose real name is Joel--not Jaykul!) [Select-Grid script][21].
  * Speaking of TechEd earlier, Carter from VMware on the [VI PowerShell blog][22] has [posted an entry][23] with code and a video of a demo he'll be showing at TechEd.
  * Don Jones has an [article][24] in the latest TechNET magazine where he talks about different output types
  * Also on VMware, Brandon Shell has put up a few screencast demos in a new "Playing around" series he's doing on the [BSonPosh][25]blog.  The series is not exclusive to VMware, he also talks about Citrix, AD and more. 
      * Video 1: [Intro to VMWare VI Toolkit for Windows][26]
      * Video 2: [Controlling VMWare VMs with VI Toolkit][27]
      * Video 3: [Vmotion with VI ToolKit][28]

### Tips

  * A basic tip on using the backtick character to escape in a string. From [Richard Siddaway's blog][29]
  * watch out for strings that look like collections
  * From Oisin and his blog Nivot Ink: [Manipulating remote SharePoint Lists with PowerShell][30].  The article is from late February but it came up earlier this week on the #powershell IRC channel (irc.freenode.net).

### One-Liner

$a = (get-clipboard).split("`n").trim()

### Get Involved!

  * We love feedback.  You can tell because we ask for it at the beginning and end of every show.  :)  You can reach us by email to .  Also, please write reviews and vote for us on iTunes, Podcast Alley, Digg, and other podcast portals you use.  And blog comments are great, too.
  * Don't forget to visit [www.quest.com/powershell][31] to get the free book offer (while supplies last).
  * Other ways to interact with us: 
      * [Facebook Group][32] (forums, networking)
      * Twitter ([jonwalz][33] & [halr9000][34])
      * IRC: #powershell on irc.freenode.net (web client available on [powershelllive.com/irc][35])

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-028.mp3
 [2]: http://www.sapien.com/
 [3]: http://www.codeplex.com/bgshell
 [4]: http://codeplex.com/
 [5]: http://blogs.technet.com/forefront/archive/2008/05/19/stirling-blog-post-new-stirling-resources.aspx
 [6]: http://halr9000.com/article/486
 [7]: http://AdminScriptEditor.com
 [8]: http://blogs.msdn.com/powershell/archive/2008/05/25/powershell-and-wpf-wtf.aspx
 [9]: http://blogs.msdn.com/powershell/archive/2008/05/22/wpf-powershell-part-1-hello-world-welcome-to-the-week-of-wpf.aspx
 [10]: http://blogs.msdn.com/powershell/archive/2008/05/23/wpf-powershell-part-2-exploring-wpf-and-the-rest-of-net-with-scripts.aspx
 [11]: http://blogs.msdn.com/powershell/archive/2008/05/24/wpf-powershell-part-3-handling-events.aspx
 [12]: http://blogs.msdn.com/powershell/archive/2008/05/25/wpf-powershell-part-4-xaml-show-control.aspx
 [13]: http://blogs.msdn.com/powershell/archive/2008/05/26/wpf-powershell-part-5-using-wpf-powershell-modules.aspx
 [14]: http://blogs.msdn.com/powershell/archive/2008/05/27/wpf-powershell-part-6-running-functions-in-the-background.aspx
 [15]: http://poshoholic.com/2008/05/20/essential-powershell-use-non-portable-console-customizations-sparingly/
 [16]: http://blogs.technet.com/industry_insiders/pages/powershell-in-sql-server-2008.aspx
 [17]: http://blogs.technet.com/industry_insiders
 [18]: http://keithhill.spaces.live.com/Blog/cns%215A8D2641E0963A97%216172.entry
 [19]: http://huddledmasses.org/powershell-modules/
 [20]: http://huddledmasses.org/
 [21]: http://huddledmasses.org/wpf-from-powershell-select-grid/
 [22]: http://blogs.vmware.com/vipowershell/
 [23]: http://blogs.vmware.com/vipowershell/2008/05/automation-and.html
 [24]: http://technet.microsoft.com/en-us/magazine/cc510337%28TechNet.10%29.aspx
 [25]: http://bsonposh.com/
 [26]: http://bsonposh.com/archives/313
 [27]: http://bsonposh.com/archives/314
 [28]: http://bsonposh.com/archives/316
 [29]: http://richardsiddaway.spaces.live.com/Blog/cns%2143CFA46A74CF3E96%211353.entry
 [30]: http://www.nivot.org/2008/02/29/ManipulatingRemoteSharePointListsWithPowerShell.aspx
 [31]: http://www.quest.com/powershell
 [32]: http://www.facebook.com/group.php?gid=7033985478
 [33]: http://twitter.com/jonwalz
 [34]: http://twitter.com/halr9000
 [35]: http://powershelllive.com/irc/
