---
title: Episode 23 – IIS7 Special
authors:
  - Jonathan Walz
date: "2008-04-26T21:16:33+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-023.mp3"
aliases:
  - /2008/04/powerscripting-podcast-episode-23-iis7-special/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

  * Today we've got an interview with a senior program manager from the IIS team at Microsoft.  We've also got news, resources, and a bunch of PowerShell tips for you.

### News

The News today is sponsored by SDM Software:  
"SDM Software provides innovative solutions that combine PowerShell and Group Policy to help reduce the complexity of managing your Windows systems.  Their unique GPExpert Scripting Toolkit for PowerShell, provides the means to automate the management of your Group Policy Objects. To get more information about these products and download trial copies, visit [sdmsoftware.com/powerscripting.php][2]."

  * Reports are coming in from MVPs right and left that the things they learned about the AD teams forthcoming PowerShell support echoes what were heard in our interview with Jeffery Snover.
  * Thanks to Andrew Westgarth who [blogged about][3] some really cool IIS7 news.  There's a "Tech Preview" now available for a PowerShell provider to manage your IIS server.  Very cool possibilities.  Download and overview are on [blogs.iss.net][4], and on [learn.iss.net][5] they have several walkthroughs.
  * Pash - a cross platform open source reimplementation of PowerShell has been released 
      * Jeffery's post - <http://blogs.msdn.com/powershell/archive/2008/04/08/powershell-on-linux-solaris-mac-etc.aspx>
      * Sourceforge page - <http://pash.sourceforge.net/>
  * And thanks also to Mark Schill for [this one][6]: "Citrix has released some cmdlets for use with their XenServer virtualization product. No where near as powerful as VMWare"™s cmdlets, but at least its a start. You can check them out and get more information at [this URL][7]."
  * Windows PowerShell Virtual User Group Meeting #5 happened on April 22 
      * Bart DeSmet (Microsoft) gave a cool presentation of script cmdlets
      * Steven Nelson talked briefly about Powershell documentation - PowerShell videos are coming
      * Look for the download at <http://MarcoShaw.blogspot.com>

### Interview

Our interview today is brought to you by [Quest Software][8].  
Quest LOVES PowerShell. Go to [www.quest.com / PowerShell][8] and download their free graphical user interface, script editor and Active Directory cmdlets. While you"™re there, join their online community where you can share ideas and download free PowerPacks to extend PowerGUI.  Visit [www.quest.com / powershell][8] today!  
Today we speak with Thomas Deml from Microsoft.  He is the Senior Program Manager in the IIS team.  He's been with MSFT for 17 years!  Old timer. His team "owns" the core engine of IIS and the PS provider is a subset of that.  Below are some notes from the interview.

  * Who are you
  * What's your background at MS and elsewhere
  * Talk about the IIS7 management cmdlets 
      * Get/Set-WebConfiguration
      * Start-WebItem
      * Remove-WebConfigurationProperty
      * Ability to use XPath filters
  * Talk about the IIS7 PSprovider 
      * Provider timeline - 2nd beta in June, final in October
      * Features 
          * ability to configure IIS and ASP.net, sites, vdirs, apps, all that
          * ability to delegate
          * root of namespace: sites, app pools
  * What does the future hold (that you can discuss) 
      * We talk about Server Core

### Resources

  * Brandon Shell is doing a series of useful Citrix scripts so head over to [http://bsonposh.com][9] to check them out
  * PoShMon - A PowerShell snap-in for working with PolyMon (Open source monitoring solution) - <http://powershell-basics.com/2008/04/07/poshmon-for-polymon/>

### Tips

  * This came up on #PowerShell (on freenode.net): How can I remove an item from a collection?  
    For example "$servers = get-QADComputer srv*".

      * Option 1 - Set the item to $null.  This does not actually remove the item, but for most purposes it serves well. 
          * $servers[3] = $null
      * Option 2 - Create a new collection which is a subset of the first.  Drawback here is double the memory as the collection is copied in place. 
          * $servers = $servers -ne "itemthatyouwantremoved"
      * Option 3 - Use system.collection.arraylist instead of a generic array.  More steps, but the item or items are removed, and it much more efficient than option 2.  The Scripting Guys explain it well in [one of their PowerShell tips][10]of the week. 
          * $servers = new-object system.collection.arraylist; $servers.Remove("item")
  * [PowerShell Power User Tips: Current Directory][11] - The core of this tip is very simple: Windows tracks your application"™s "current directory" ... and you can get and set this location using static methods of the System.IO.Directory class: SetCurrentDirectory and GetCurrentDirectory.  (Thanks Jaykul of Huddledmasses.org.)
  * Newsgroup posts 
      * "[Excel Row Format][12]" - In this thread, Oisin explains how to teach yourself how to automate Excel by examining vbscript created by the macro recorder.
  * This snippet is from Chris in Charleston, SC.  He sent a long email with feedback (which you all should do) with several suggestions.  Thanks, Chris!  This tip is that it's quite easy to integrate the old with the new in PowerShell.  He'd also found that grep.exe in some cases is much faster than select-string, so it was a good example for his point.  Jonathan's test had Grep for Windows 2:30 and Select-String 11:08 against the same 6.7 GB log file. 
      * $cmd = "grep.exe `"$username`" $logfile"  
        Invoke-Expression $cmd | Set-Content F:4report$username.txt
  * Don Jones post "Include in PowerShell" dot source a PS1 file at the beginning of your script - <http://blog.sapien.com/index.php/2008/04/08/include-in-powershell/>

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-023.mp3
 [2]: http://www.sdmsoftware.com/powerscripting.php
 [3]: http://www.andrewwestgarth.co.uk/Blog/post/2008/04/PowerShell-Provider-for-IIS7.aspx
 [4]: http://blogs.iis.net/thomad/archive/2008/04/14/iis-7-0-powershell-provider-tech-preview-1.aspx
 [5]: http://learn.iis.net/page.aspx/447/managing-iis-with-the-iis-70-powershell-provider/
 [6]: http://cmschill.net/stringtheory/2008/04/xenserver-vm-powershell-cmdlet/
 [7]: http://community.citrix.com/display/cdn/XenServe+VM+PowerShell+CmdLet
 [8]: http://info.quest.com/QuestSoftwareSponsoredPodCastPowerscripting0132008
 [9]: http://bsonposh.com/
 [10]: http://www.microsoft.com/technet/scriptcenter/resources/pstips/sept07/pstip0907.mspx
 [11]: http://huddledmasses.org/powershell-power-user-tips-current-directory/
 [12]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_thread/thread/04c20ddf83cca08c
