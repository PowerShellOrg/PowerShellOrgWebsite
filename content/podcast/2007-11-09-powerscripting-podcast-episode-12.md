---
title: Episode 12 – Our first guest, Brandon Shell
authors:
  - Jonathan Walz
date: "2007-11-10T04:04:57+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-012.mp3"
aliases:
  - /2007/11/powerscripting-podcast-episode-12/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### Introduction

  * Jam-packed show today! We ran so long, we had to skip the cmdlet-of-the-week segment!
  * We have a Special Guest, and in fact our first guest, Brandon Shell, an MVP in Automation and author of the [BSonPosh blog][2].

### News

  * **CTP!** 
      * Unless you've been under a rock, you probably heard about the PowerShell 2.0 Community Technology Preview. Go [download it][3]! Here is [what's new][4].
      * [Jeffery's warning CTP -ne Beta][5]
  * Citrix "Gets it" 
      * As [pointed out][6] by Dmitry and others, "From a management standpoint, Citrix is getting high on PowerShell and intend to rewrite the APIs to make everything available from Powershell scripting.
  * Windows PowerShell Virtual User Group Meeting #2 
      * Time: December 4th, 2007 at 12PM (noon) EST (New York time)
      * **Registration site:**<http://www.clicktoattend.com/?id=122431>  
        **Event Code:** 122431
      * Guests: Don Jones (MVP), Dmitry Sotnikov (MVP), Oisin Grehan and Jeffrey Snover (Microsoft)

### Resource

  * Windows PowerShell Cookbook - Lee Holmes
  * New [PowerShell Graphical Help File (Version 2)][7]- with support for CTP 
      * Seems to crash on exit--Hal emailed The Scripting Guys, hopefully they'll fix it.
  * Ebook that covers the CTP available November 12th **
(Brandon told us after we finished recording that this ebook is available now)
**
  * [PowerShell TFM 3rd Edition][8] by Don Jones and Jeffery Hicks -
  * Jeffery's deck from TechEd ["What's New for Developers in PowerShell V2"][9]

### Tips

  * More VMWare scripting: [Invoke-VmCommand.ps1][10]from Brandon 
      * List VMs and processes, execute arbitrary commands.
  * Talk about Switch -regex and Brandon's [perfect example][11]of a useful custom object 
      * Why write a wrapper for this existing utility? (hbainfo)
      * Using Switch -regex to process text
  * Marcus asks (and he [blogged about it][12]), 
      * "How can I fix formatting on a free-form street address field stored in my AD? Can posh help with an output where ... for example, address is split into multiple lines? Like this:  
        "400 crap rd,  
        suite 150"
      * Ended up using calculated properties to get the results into a table easily:  

$a | format-table displayname,samaccountname, @{
 Label ="Street Address" ; Expression = {


$_.streetaddress -replace"`n"," " } }


Thanks for listening! We love feedback and news tips, you can send them to 
. Join our Facebook group "PowerScripting Podcast".

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-012.mp3
 [2]: http://bsonposh.com/modules/wordpress/
 [3]: http://www.microsoft.com/downloads/details.aspx?FamilyID=60deac2b-975b-41e6-9fa0-c2fd6aa6bc89&displaylang=en
 [4]: http://blogs.msdn.com/powershell/archive/2007/11/06/what-s-new-in-ctp-of-powershell-2-0.aspx
 [5]: http://blogs.msdn.com/powershell/archive/2007/11/02/ctp-watch-this-space.aspx
 [6]: http://dmitrysotnikov.wordpress.com/2007/11/01/citrix-going-powershell/
 [7]: http://www.microsoft.com/downloads/details.aspx?FamilyID=fefb2572-559a-46fe-978d-5a00490b20fa&DisplayLang=en
 [8]: http://www.sapienpress.com/PowerShell3.asp
 [9]: http://blogs.msdn.com/powershell/archive/2007/11/08/teched-what-s-new-for-developers-in-powershell-v2.aspx
 [10]: http://bsonposh.com/modules/wordpress/?p=60
 [11]: http://bsonposh.com/modules/wordpress/?p=59
 [12]: http://marcusoh.blogspot.com/2007/11/misc-dsquery-vs-powershell.html
