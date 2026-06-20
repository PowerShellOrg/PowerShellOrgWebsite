---
title: Episode 14 – The IDEs are getting better
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-12-10T03:16:01+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-014.mp3"
aliases:
  - /2007/12/powerscripting-podcast-episode-14/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

  * News: Software updates, books, PS Virtual User Group (recording will be available)
  * In Resources, we'll tell you about an interview with Jeffrey Snover, and several pieces of software.
  * Cmdlet of the Week: New-Object
  * In Tips, we'll talk about Hal's recent blog post involving benchmarking
  * We've got a one-liner with a GUI.
  * Gotchas about WMI
  * Thanks for feedback from: Mace, John Cook, Justin Stokes

### News

  * PowerShell + [is now free][2] for non-commercial use!
  * [PowerShell TFM (2nd Edition)][3]to be available soon - May be available already from the Sapien site 
      * Don says Sapien tends to run some insane deals on New Years Eve so it may be worth watching out for that
  * [PowerShell Virtual User Group meeting #2][4] was Dec 4th - This was the second virtual event.  Speakers were: Don Jones (MVP), Dmitry Sotnikov (MVP), Oisin Grehan and Jeffrey Snover (Microsoft).  Recording is supposed to be available, but as of this moment, Hal can't find a darn thing about it.  Watch [Marco's blog][5] and [PowerShellCommunity.org][6].

### Resources

  * Jeffery Snover [interview at IT Forum][7] (video from PodTech)
  * [Admin Script Editor][8]from ITripoli 
      * Hal and Jonathan currently evaluating--looks extremely cool.
  * [PowerGUI][9] - [Version 1.0.12 released][10], now includes a debugger and more.  Don't forget the [known issues and patch][11] to work with the CTP.
  * [SpecOps Command][12]- use Group Policy to deploy and manage PowerShell scripts 
      * Can deploy PowerShell itself using GPO--as well as your favorite snapins!
      * Includes new [cmdlets][13]
      * All operations that you can perform from the administrative user interfaces you can perform from PowerShell.

### Cmdlet of the week

  * New-Object 
      * Creates an instance of a .Net or COM object.
      * Examples:


`new-object -comobject InternetExplorer.Application
 new-object -comobject "Shell.Application"
`* Also see Appendix E of the new book [Windows PowerShell Cookbook][14]

### Tips

  * Discussion of Hal's blog post: [Solving Problems with PowerShell: Simple Benchmarking][15]
  * You can access mySQL databases from Powershell using .NET.  Check out [Get-MySQLDataSet.][16] 
      * Oops--due to a clerical error, we forgot to cover this topic on the show!  We'll get it next time, Kemis!

### One-liners


`[system.Windows.Forms.MessageBox]::show("Hi mom")
`Gotchas

  * [Win32_Service.Change() method][17]and weird WMI stuff 
      * Rfoust@ #PowerShell was looking for a way to change the service password on remote machines.  There's a change() method but it's paremeters are really odd.  A vbscript example I found shows something like change(,,,,,,,"password") but it doesn't work in PowerShell.  Instead you have to insert $nulls and separate them by commas like so:  
        $rc=$svc.Change($Null,$Null,$Null,$Null,$Null,$Null,$Null,)
      * Solution by Jeffrey Hicks on the PowerShell.com forum thread ["Using WMI and/or Get-Service / Set-Service to modify service properties"][18]
      * Why doesn't just changing the properties, which are read-write (as you can see using get-member) do the trick?  We may never know.  :(  (That's a quip designed to inspire a listener to chime in with the answer.)

Thanks again to all of you listeners out there!  Your feedback makes it all worthwhile, keep that rolling in.  Our email address is 
, or you can comment on this very blog post.  Also find us on Facebook [here][19] (Jonathan), [here][20] (Hal),  and [here][21] (PowerScripting Podcast group).  
Also a big shout out to Steve and the rest of the [A Couple of Admins Podcasting][22] crew!

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-014.mp3
 [2]: http://powershelllive.com/blogs/pspdev/archive/2007/11/27/free-powershell.aspx
 [3]: http://blog.sapien.com/current/2007/11/27/windows-powershell-v10-tfm-2nd-edition-done.html
 [4]: http://marcoshaw.blogspot.com/2007/11/windows-powershell-virtual-user-group.html
 [5]: http://marcoshaw.blogspot.com
 [6]: http://www.powershellcommunity.org
 [7]: http://www.podtech.net/home/4577/powershell-overview-and-remote-update-microsoft-teched-it-forum-2007
 [8]: http://www.adminscripteditor.com
 [9]: http://powergui.org/index.jspa
 [10]: http://dmitrysotnikov.wordpress.com/2007/11/20/new-free-powershell-debugger/
 [11]: http://dmitrysotnikov.wordpress.com/2007/12/03/powergui-1012-known-issues-and-the-patch/
 [12]: http://www.specopssoft.com/wiki/index.php/Specopscommand/Overview
 [13]: http://www.specopssoft.com/wiki/index.php/Specopscommand/PowerShellCmdlets
 [14]: http://www.amazon.com/exec/obidos/ASIN/0596528493/techprosaic-20?tag=techprosaic-20
 [15]: http://halr9000.com/article/450
 [16]: http://powershellcentral.com/scripts/65
 [17]: http://msdn2.microsoft.com/en-us/library/aa384901.aspx
 [18]: http://powershelllive.com/forums/thread/1859.aspx
 [19]: http://www.facebook.com/profile.php?id=631148744&ref=nf
 [20]: http://www.facebook.com/profile.php?id=553909988
 [21]: http://www.facebook.com/group.php?gid=7033985478
 [22]: http://acoupleofadmins.com/
