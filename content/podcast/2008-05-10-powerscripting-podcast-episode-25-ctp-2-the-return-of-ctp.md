---
title: "Episode 25 – CTP 2: The Return of CTP"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-05-11T02:11:26+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-025.mp3"
aliases:
  - /2008/05/powerscripting-podcast-episode-25-ctp-2-the-return-of-ctp/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

  * We have a great show lined up for you today.  Don Jones from Sapien is here.  [applause]  He'll be giving us a taste of the trade show circuit, going into CTP2, and other goings-on in the PowerShell world.  And of course we have tips and resources and whatever else we can throw in.
  * We will be announcing the winner of our Vista Ultimate giveaway on Show 26 next week.  If you haven't entered yet, now is the time!  It's really easy, just send feedback about the show to 
 and you are in the running.

### News

The News today is sponsored by SDM Software.  
"SDM Software provides innovative solutions that combine PowerShell and Group Policy to help reduce the complexity of managing your Windows systems.  Their unique GPExpert Scripting Toolkit for PowerShell, provides the means to automate the management of your Group Policy Objects. To get more information about these products and download trial copies,  
visit [sdmsoftware.com/powerscripting.php][2]."

  * CTP2 is out 
      * Joel Bennett has a [blog post][3] outlining some of the new features he's found
      * latest build of PowerGUI [supports it already][4]

### Interview

[sponsor] Our interview today is brought to you by [Quest Software][5].  
Quest LOVES PowerShell. Go to [www.quest.com / PowerShell][5] and download their free graphical user interface, script editor and Active Directory cmdlets. While you"™re there, join their online community where you can share ideas and download free PowerPacks to extend PowerGUI.  Visit [www.quest.com / powershell][5] today!  
We have Don Jones with us on the phone today.  Don Jones, for the three people who don't know who he is, has authored over thirty books.  He's a frequent speaker at conventions and also runs training classes for PowerShell.  Here are some notes we took during the conversation.

  * MS MVP Summit
  * MMS last week 
      * 5th year
  * Training videos 
      * fundamentals class, twice a week for 4 weeks = $400
      * scriptingoutpost.com
  * New version of Primalscript 2007 
      * coming soon: visual forms editor
  * Blog: blog.sapien.com
  * CTP2 
      * e-book on sapienpress.com: PowerShell v2: TFM, updated for CTP2!
      * Remoting 
          * push cmds to remote computer
          * bring results back
          * interactive like ssh
      * transactional registry operations
      * create your own cmdlets (script cmdlets)
      * new little features 
          * convertTo-Html 
              * head parameter
              * css links
          * get-wmiobject
          * get-process, get-service
      * send feedback to [connect.microsoft.com][6]
      * New graphical console
  * Shows coming up: Tech Mentor, TechEd
  * New e-books: 2008 Server - What's New, What's Changed, Exchange Management: TFM, cookbook style

### Resources

  * Tobias from ScriptInternals has just started a PowerShell blog, you can find it on [PowerShellCommunity.org][7].  He intends to post often about how to use PowerShell Plus features.
  * Real quick mention for newbies: you must see these tutorials. 
      * [Essential PowerShell][8] by Kirk Munro (aka Poshoholic)
      * [Keith Hill][9] has his Effective PowerShell series which is also great.
      * [Mastering PowerShell in your Lunch Break][10] is another favorite.
  * New [PowerShell Training Videos][11] from ScriptingOutpost.com from Don Jones
  * Quest AD Cmdlets Beta 1.1 available

### Tips

  * We found a nice script on the blog post [PowerShell and Excel][12] (from the "[Powershell,Passion,Persistence and Pursuit][13]" blog).  This script reads a server list from a text file and collects IP configuration settings of each server and uses that data to populate an excel sheet.
  * Using SQL with Powershell 
      * PowerShell TFM
      * iSQL, sqlcmd, Invoke-Sqlcmd
      * Article: [PowerShell, XML, and SQL Server][14]
  * Hal wrote [an article][15] that explains how to automate the syncing of iTunes to your iPod, using PowerShell of course.
  * [Interesting article][16] that talks about working with Hyper-V virtual hard disks.  Some neat examples in there about passing text to console apps like diskpart.exe.

### One-Liner

  * $env:path.split(';') updated by John Cook

### Gotchas

  * The alias for Set-Content collides with sc.exe.  Workaround is to be sure to type sc-dot-exe.
  * There is no Remove-Alias cmdlet!  You can use the alias: PSProvider with "del" to get the job done.
  * Oisin Graham [has written about][17] a big gotcha with working with remoting and WinRM with computers which are not domain members.

### Give Away

  * As mentioned at the top of the show, we'll be announcing the winner of our Vista Ultimate giveaway next week.  If you want a chance at it, send us feedback about the show to powerscripting@gmail.com.

### Emails!

  * We got some GREAT feedback from a few listeners lately.  Some of whom were obviously motivated by the free copy of Vista, which is why we did it.  🙂

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-025.mp3
 [2]: http://www.sdmsoftware.com/powerscripting.php
 [3]: http://huddledmasses.org/powershell-2-ctp2-wow/
 [4]: http://dmitrysotnikov.wordpress.com/2008/05/06/powershell-ctp2-and-powergui/
 [5]: http://info.quest.com/QuestSoftwareSponsoredPodCastPowerscripting0132008
 [6]: http://connect.microsoft.com/
 [7]: http://powershellcommunity.org/Blogs/CommunityBlogs/tabid/55/BlogID/19/Default.aspx
 [8]: http://wordpress.com/tag/essential-powershell/
 [9]: http://keithhill.spaces.live.com/
 [10]: http://powershelllive.com/blogs/lunch/default.aspx
 [11]: http://www.powershellcommunity.org/Default.aspx?tabid=55&EntryID=72
 [12]: http://techstarts.wordpress.com/2008/05/05/powershell-and-excel/
 [13]: http://techstarts.wordpress.com/
 [14]: http://www.pluralsight.com/blogs/dan/archive/2006/10/28/41337.aspx
 [15]: http://halr9000.com/article/480
 [16]: http://blogs.technet.com/jamesone/archive/2008/04/25/accessing-the-hyper-v-api-disks.aspx
 [17]: http://www.nivot.org/2008/05/09/PowerShell20CTP2ProblemsWithWinRMAccessIsDenied.aspx
