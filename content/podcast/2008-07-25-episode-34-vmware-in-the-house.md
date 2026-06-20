---
title: "Episode 34 \"“ VMware in the House"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-07-26T04:07:37+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-034.mp3"
aliases:
  - /2008/07/episode-34-vmware-in-the-house/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]  
We have a great show lined up for you today.  We'll be talking to Carter Shanklin from VMware about their PowerShell Toolkit.  He's got some exciting NEW news to share with us, so that's cool.  We'll also bring you news, resources, tips and whatever else we can scrape up.

### News

_This segment is brought to you by [Quest Software][2]._  
_  
_ _Do you have what it takes to be the ultimate script warrior? Find out with Quest"™s PowerPack Challenge "™08._  
_Quest Software is sponsoring a PowerShell Scripting contest where you can test your skills and get paid. Just create some cool PowerShell scripts using Quest"™s PowerGUI and then post them to our site. You"™ll get a score and our celebrity judges will weigh in as well._  
_Do you have the muscle to bring home the prize? Check out the details [here](http://quest.com/powerscripting)._ 

  * [PowerShellASP][3] (powershelltoys.com) - PowerShellASP is an ASP-like template language for Web Applications; templates contain a mixture of markup (HTML, XML or whatever you want to generate) and inline PowerShell code. At runtime, templates/pages are fully translated to PowerShell code and exe
  * Codeplex project [PowerShell Pages][4] (codeplex.com/powershellpages)- PowerShell Pages is an ASP like language, based on the PowerShell runtime. Using a simple HTTP Handler, ASP.NET can render pages scripted using PowerShell script (including cmdlets, and CLR/.NET objects) to the web. Simple, fast and intuitive programming
  * VMware Toolkit 1.0 is out of beta!  ([vmware.com/go/powershell][5]) 
      * 125 cmdlets
      * focus on VM lifecycle and ESX server deployment and configuration

### Interview

_Today's news is brought to you by iTripoli._  
_"Admin Script Editor provides a true integrated scripting environment for PowerShell.  Advanced features include an integrated PowerShell debugger, advanced code generating tools for Active Directory, Databases, XML files and the exclusive PowerShell forms designer.  Come see for yourself-- Admin Script Editor v3.5 is availble for a 45 day trial at AdminScriptEditor.com."_

  1. Background 
      1. long time developer in Unix-land
      2. VMware for 8 months
  2. Current Role 
      1. Product Manager
  3. Solving Problems 
      1. change CD drives on 1500 VMs
  4. VMware Toolkit for Windows 
      1. Works on VMS 2.0
      2. Lab Manager, VDM -- future potential
      3. 125 cmdlets
      4. focus on ESX & VC 
          1. side one: VM lifecycle
          2. side two: VM host deployment
      5. 1.0 released TODAY!
      6. download: <http://vmware.com/go/powershell>
      7. blog: <http://blogs.vmware.com/vipowershell>
      8. for help 
          1. online docs
          2. community (link from download site)
  5. Discussion 
      1. VM automation 
          1. they are working on it, will use VIX
      2. Developers & PowerShell 
          1. key is powershell is application focused
          2. scripts write like you think the task should work
      3. Excel automation 
          1. great for general powershell -- not vmware specific
      4. v2 ctp module?

### Resources

  * There is now an [online reference][6] for the Quest AD Cmdlets- Thanks Dmitry
  * Video on [edge.technet.com][7] about PowerShell and Exchange with Desmond Lee

### Tips

  * Jeffrey Snover [reminds us][8] to update your GAC!  This really speeds up the start time for a powershell console.
  * [Enabling WinRM with Powershell / Get-Powershell][9] - Don't forget you can use Configure-WSman.ps1 to configure WinRM using PowerShell.
  * you can get a much faster file count of a directory by doing a get-item on the parent folder and calling the getFiles() method. Thanks Jaykul! 
      * measure-command {  
        $folder = get-item '\servershare'  
        Write-Host ($folder.getfiles()).count} # 524 Milliseconds  
        Measure-Command {(gci '\servershare').count} # 1min 18 sec
      * note that getfiles() will not count any directories

### Cmdlet-of-the-Week

  * out-host has a -Paging parameter

#### Gotcha

  * [Vista Event Logs and PowerShell][10] - Ben Pearce points out that you can NOT use Get-EventLog to access all the new logs that are in Vista.

Talk to you next week!  Don"™t forget to follow [Jonathan](http://twitter.com/jonwalz) and [Hal](http://twitter.com/halr9000) on Twitter.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-034.mp3
 [2]: http://quest.com/powerscripting
 [3]: http://powershelltoys.com/
 [4]: http://www.codeplex.com/PowerShellPages
 [5]: http://vmware.com/go/powershell
 [6]: http://wiki.powergui.org/index.php/QAD_cmdlets_reference
 [7]: http://edge.technet.com/Media/Powershell-and-Exchange-with-Desmond-Lee/
 [8]: http://blogs.msdn.com/powershell/archive/2008/07/11/speeding-up-powershell-startup.aspx
 [9]: http://get-powershell.com/2008/03/31/enabling-winrm-with-powershell/
 [10]: http://blogs.technet.com/benp/archive/2007/10/30/vista-event-logs-and-powershell.aspx
