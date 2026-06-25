---
title: "Episode 31 \"“ Money for Nothin\"™ and Tips for Free"
authors:
  - Jonathan Walz
date: "2008-06-30T12:10:19+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-031.mp3"
aliases:
  - /2008/06/episode-31-money-for-nothin-and-tips-for-free/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

#### In This Episode

We have a ton of stuff foryou today.  News, Resources, Tips, and even an old favorite, the Cmdlet of the Week.

#### News

The news is brought to you by [iTripoli][2].  
_"Admin Script Editor provides a true integrated scripting environment for  
PowerShell.  Advanced features include an integrated PowerShell debugger,  
advanced code generating tools for Active Directory, Databases, XML files  
and more.  Let's not forget about the exclusive PowerShell forms designer.  
What's coming up? Soon its innovative and feature-rich ScriptPackger tool  
will offer support for the dynamic installation of cmdlets! Come see for  
yourself-- Admin Script Editor v3.5 is availble for a 45 day trial at  
AdminScriptEditor.com."_

  * [EWeek lists PowerShell][3] as #7 on the list of the best Microsoft products of all time
  * SAPIEN has released [ActiveXPoSH][4] as a free download 
      * The ActiveXPoSH COM component released with PrimalScript 2007 Service build 566 is now available as a free download from SAPIEN.com
  * Microsoft is looking for people to participate in a [PowerShell usability study][5] July 22 to 29th

  * [Quest has released version 1.1 of their AD cmdlets][6] (from Rod Trent at myITforum.com) 
      * The theme of this release was native AD permission management and so we added the following cmdlets in the 1.1 release 
          * Add-QADPermission
          * Get-QADObjectSecurity
          * Get-QADPermission
          * Get-QADRootDSE
          * Get-QARSAccessTemplate
          * Get-QARSAccessTemplateLink
          * New-QARSAccessTemplateLink
          * Remove-QADPermission
          * Remove-QARSAccessTemplateLink
          * Set-QADObjectSecurity
          * Set-QARSAccessTemplateLink

#### Resources

This segment brought to you by [Sapien Technologies](http://www.sapien.com/) 

  * Joel Bennett brings us a great blog post on [setting up your user profile][7] it's called "Getting Started with PowerShell 2 - Part1"
  * Tomas R. has written several articles on his blog that deal with integrating Biztalk with PowerShell. 
      * [Administering BizTalk with PowerShell: Part 1][8] 
      * [Updated PS & BizTalk Posts][9]
  * MSDN Virtual Lab- What's new in PowerShell V2 - from [The PowerShell Guy][10]
  * Jonathan Medd created a PowerGUI powerpack for [managing Exchange 2003][11]
  * Ben Pearce did a short video [interview][12] at Teched for Technet Edge

#### Tips

This segment brought to you by [Quest Software][13].  
_Do you have what it takes to be the ultimate script warrior? Find out with Quest"™s PowerPack Challenge "™08._  
_Quest Software is sponsoring a PowerShell Scripting contest where you can test your skills and get paid. Just create some cool PowerShell scripts using Quest"™s PowerGUI and then post them to our site. You"™ll get a score and our celebrity judges will weigh in as well._  
_Do you have the muscle to bring home the prize? Check out the details_ [_here_][13]_._

  * "[Unix like command for tac?][14]" (reverse cat, or in our case Tnetnoc-Teg) 
      * Keith Hill proposes a neat solution using System.IO.FileStream which I found interesting simply because I had never seen that .NET object used before.  However, there was some discusssion on the IRC channel about this and Jaykul pointed out that it would be much faster (for moderate-size files) to just read the whole thing in and print it out in reverse.
      * $foo = gc .tac.ps1; [array]::reverse($foo); $foo
  * Brandon Shell [shows us how to use ADSI][15] to change the local admin password
  * Hal has a script up called [Get-Parameter][16].

#### CmdLet

  * get-variable

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-031.mp3
 [2]: http://www.itripoli.com/
 [3]: http://www.eweek.com/c/a/Security/The-Best-and-Worst-Microsoft-Products/8/
 [4]: http://blog.sapien.com/index.php/2008/06/25/activexposh-is-now-a-free-download/
 [5]: http://bsonposh.com/archives/335
 [6]: http://myitforum.com/cs2/blogs/rtrent/archive/2008/06/26/new-version-of-our-ad-powershell-cmdlets-released.aspx
 [7]: http://huddledmasses.org/getting-started-with-powershell-2-part-1/
 [8]: http://www.winterdom.com/weblog/2006/09/01/AdministeringBizTalkWithPowerShellPart1.aspx
 [9]: http://www.winterdom.com/weblog/2008/06/04/UpdatedPSAmpBizTalkPosts.aspx
 [10]: http://thepowershellguy.com/blogs/posh/archive/2008/06/17/msdn-virtual-lab-express-what-s-new-in-windows-powershell-v2.aspx
 [11]: http://get-scripting.blogspot.com/2008/06/powergui-exchange-2003.html
 [12]: http://blogs.technet.com/benp/archive/2008/06/23/inteverview-with-me-on-technet-edge.aspx
 [13]: http://quest.com/powerscripting
 [14]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_thread/thread/b53ff538967fa490/487ad6ecd23fdb67?lnk=gst&q=Unix+like+command+for+tac%3F#487ad6ecd23fdb67
 [15]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_thread/thread/cf35f376c1133f2/b30939ddea7cd728?lnk=st&q=%22net+user+administrator+changeme%22#b30939ddea7cd728
 [16]: http://halr9000.com/article/507
