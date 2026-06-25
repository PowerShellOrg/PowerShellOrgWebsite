---
title: "Episode 29 \"“ Exchange with Ilse Van Criekinge"
authors:
  - Jonathan Walz
  - Ilse Van Criekinge
date: "2008-06-08T17:32:48+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-029.mp3"
aliases:
  - /2008/06/episode-29-exchange-with-ilse-van-criekinge/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode 

  * Today we'll be speaking to noted Exchange MVP, trainer, and author Ilse van Criekinge.  Also on tap: news, resources, and a bunch of PowerShell tips for you.

### News 

_The news is brought to you by_ [*Sapien Technologies*](http://www.sapien.com/)_._ 

  * From the GPOGUY we get two new cmdlets get-SDMADTombstone and restore-SDMADTombstone - blog post: [PowerShell Hits the Morgue][2] 
  * [PowerShell](http://www.microsoft.com/windowsserver2003/technologies/management/powershell/default.mspx) sill be big at TechEd next week 
  * Oisin [has released][3] a new Codeplex project he has been working on called [PSMobile][4].  This is a PowerShell provider for your Windows Mobile phone.  Features include: 
      * Copy, Move, Delete items between folders on your device (including Storage Card) with standard PowerShell Cmdlets 
      * Move/Copy files to/from your device and your desktop with ConvertTo-WMFile and ConvertFrom-WMFile 
      * Get device information and manipulate and explore the registry with a rich device object returned from Get-WMDevice 

### Interview 

_Our interview today is brought to you by_ [_Quest Software_][5]_._ 

_For a limited time, Quest is offering Powerscripting Podcast listeners a free copy of Jeffery Hicks upcoming book,_ [_Managing Active Directory with Windows PowerShell: TFM_][6] _from_ [_Sapien Press_][7]_._ 

_Go to_ [_www.quest.com/powerscripting_][8] _to register for your copy and download their free graphical user interface, script editor and Active Directory commands._ 

On Skype with us today is Ilse van Criekinge.  Ilse is the founder of [Pro-Exchange][9], a resource for Belgian Exchange professionals.  She is the co-author of "Exchange Server 2007 Messaging Design and Deployment Study Guide", and author of [Exchange Management Shell: TFM][10].  She was given a Microsoft MVP award for her work in the Exchange Server community.  Ilse is currently a trainer at Global Knowledge where she teaches classes on Exchange and other MS products. 

Here are some rough notes from the interview: 

  * Background 
      * Pro Exchange 
          * founded 2.5 years ago 
          * user group for exchange & Office Comm Server 
          * forum, news, events
  * Exchange Management Shell 
      * Count mailboxes - get-mailbox | measure-object 
      * Mass change: move mailbox stores, quotas 
      * 248 cmdlets 
  * Resources for Exchange Admins 
      * Books 
          * [Exchange Management Shell: TFM][10] 
          * [Microsoft Exchange Server 2007: Tony Redmond"™s Guide to Successful Implementation][11] 
          * [Professional Windows PowerShell for Exchange Server 2007 Service Pack 1 (Programmer to Programmer)][12] 



      * [ExchangeNinjas.com][13] 
      * Blogroll 
          * <http://communicationsserverteam.com/> 
          * <http://msexchangeteam.com/> 
          * <http://www.exchangeninjas.com/> 
          * <http://gsexdev.blogspot.com/>
      * [45-day VM appliance with Exchange and DC][14] (VMware compatible) 
      * Get-Help 
      * Microsoft's EMS book 
  * [Global Knowledge][15] is a global training center for MS and other vendor products. 
  * Will be speaking at IT Professional (was IT Forum) in November 
  * You can find Ilse at [Pro-Exchange][9] or contact her by email: ilse.vancriekinge AT globalknowledge.be.

### Resources 

  * [PowerShellCommunity.org][16] / [PowerShellCentral.com][17] script repository 

  * Here's a [blog post][18] that will allow you to search the script repository from within Powershell 
  * And a [set of scripts][19] within the repository itself on the same. 
  * RSS feed [now available][20] (thanks Joel) 

  * Bruce Payette has released a new [PowerShell Quick Reference Card][21] for Developer Zone. 
  * PowerShell blogrolls from [Hal][22] and [Jeffrey Hicks][23] at [Sapien][24].

### Tips 

The tips are brought to you today by iTripoli. 

_"Admin Script Editor provides a true integrated scripting environment for PowerShell.  Advanced features include an integrated PowerShell debugger, advanced code generating tools for Active Directory, Databases, XML files and more.  Let's not forget about the exclusive PowerShell forms designer. What's coming up? Soon its innovative and feature-rich ScriptPackger tool  
will offer support for the dynamic installation of cmdlets! Come see for yourself-- Admin Script Editor v3.5 is availble for a 45 day trial at [AdminScriptEditor.com][25]."_ 

  * Hal's struggle with untruncated strings 
      * "ls | ft Mode, LastWriteTime, Length, FullName -auto |out-file test.txt -width 1000000"  
        As long as you put -auto on the format-table, it doesn't space-pad the lines to the full width, so the file size is only as big as it needs to be to make the data fit in the columns 

  * Working with type extensions 
      * From Hal:[PowerShell Tip: Get page count of Word docs][26] 
      * From the extremely well written [about_Types help file][27] included with PowerShell (and available online): ADDING AN AGE MEMBER TO FILEINFO OBJECTS
  * From Hal: [PowerShell + VMware Script: Get-HostHealth.ps1][28] 
  * From the [$cript Fanatic blog][29] we learn that it's faster to select and then sort

### G  
otcha  


  * From [Dmitry's PowerBlog][30] - Compare-Object issues

### Closing 

Please send us feedback!  You can send email to , leave us reviews and vote for us on [iTunes][31] and [PodcastAlley][32], blog comments and anywhere else you find us.

Don't forget to visit [www.quest.com/powershell][33] to get the free book offer.

Other ways to interact with us: [Facebook Group][34] (forums, networking), Twitter ([jonwalz][35] & [halr9000][36])

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-029.mp3
 [2]: http://sdmsoftware.com/blog/2008/06/powershell_hits_the_morgue.html
 [3]: http://www.nivot.org/2008/06/06/WindowsMobilePowerShellProvider.aspx
 [4]: http://codeplex.com/psmobile
 [5]: http://quest.com/powershell
 [6]: http://www.sapienpress.com/ad.asp
 [7]: http://sapienpress.com
 [8]: http://www.quest.com/powerscripting
 [9]: http://proexchange.be
 [10]: http://www.sapienpress.com/exchange.asp
 [11]: http://www.amazon.com/Microsoft-Exchange-Server-2007-Implementation/dp/1555583474/techprosaic-20
 [12]: http://www.amazon.com/Professional-Windows-PowerShell-Exchange-Programmer/dp/0470226447/techprosaic-20
 [13]: http://ExchangeNinjas.com
 [14]: http://www.vmware.com/appliances/directory/650
 [15]: http://globalknowledge.be
 [16]: http://powershellcommunity.org/Scripts/tabid/81/Default.aspx
 [17]: http://www.powershellcentral.com/
 [18]: http://powershellers.blogspot.com/2008/05/search-powershellcentral-script.html
 [19]: http://powershellcentral.com/scripts/413
 [20]: http://huddledmasses.org/rss-feed-for-powershell-script-repository/
 [21]: http://refcardz.dzone.com/
 [22]: http://halr9000.com/article/487
 [23]: http://blog.sapien.com/index.php/2008/06/01/what-am-i-reading/
 [24]: http://sapien.com
 [25]: http://AdminScriptEditor.com
 [26]: http://halr9000.com/article/490
 [27]: http://technet.microsoft.com/en-us/library/bb978568.aspx
 [28]: http://halr9000.com/article/492
 [29]: http://scriptolog.blogspot.com/2008/05/select-and-then-sort.html
 [30]: http://dmitrysotnikov.wordpress.com/2008/06/06/compare-object-gotcha/
 [31]: http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=256074147
 [32]: http://podcastalley.com/podcast_details.php?pod_id=48522
 [33]: http://www.quest.com/powershell
 [34]: http://www.facebook.com/group.php?gid=7033985478
 [35]: http://twitter.com/jonwalz
 [36]: http://twitter.com/halr9000
