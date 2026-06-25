---
title: Episode 20 – Jeffrey Snover is coming
authors:
  - Jonathan Walz
date: "2008-03-03T12:34:57+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-020.mp3"
aliases:
  - /2008/03/powerscripting-podcast-episode-20/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### Please visit our sponsors!

  * 

      [ShellTools Software](http://powershell.com) - makers of PowerShell Plus and PowerShell Analyzer



  * 

      [SDM Software ](http://sdmsoftware.com/powerscripting.php)- "Windows Group Policy Management Simplified." Featuring the GPExpert Scripting toolkit for PowerShell



### News

  * Don Jones gives us a peek at his PowerShell column in the March Technet Magazine: 
      * "March is Progress Reporting - a definitive look at when, why, and how to use Write-Progress to produce  
        scripts that run for a long time, but don't look hung."
  * Sapien will be announcing their PowerShell training plans very soon.  Watch their [blog][2]{#xlqg}.  They are also seeking input on a possible PowerShell developer class, you can fill out the survey [here][3]{#iu8z}.
  * Jeffery Snover will be joining us on a future podcast so send in your questions

### Resources

  * [RunAs Radio][4]{#cyjc} recently featured our very own PowerShell MVP Marco Shaw on their [podcast show #46][5]{#rw28} to talk about WMI and IIS7 and several other things.
  * SDM Software has updated their [freeware SDM GPMC snapin][6]{#fsu_}to version 1.1. 
      * Now includes 16 cmdlets for managing group policy objects
      * New cmdlet **Update-SDMGP** which can be used to trigger remote GP refreshes using PoSh.
      * Their commercial product, 
[
GPExpert Scripting Toolkit for PowerShell
](http://www.sdmsoftware.com/group_policy_scripting.php), has also undergone revisions lately, check it out.

  * Special Operations Software has just posted a video on their website made by Darren Mar-Elia (the GPO Guy) where he talks about Specops Command: [http://www.specopssoft.com/powershell/specopscommand-sdm.wmv](http://www.specopssoft.com/powershell/specopscommand-sdm.wmv)
  * The guys over at the [Swiss IT Pro & Technet blog][7]{#mf.m} have published a second free PowerShell e-book.  Written by Frank Koch, [
this 78-page book
][8]{#v21t} covers a wide variety of topics.  It is available in both German and English, and the zip archive contains parts one and two in PDF format. Thanks to listener Rob Johnston for the tip.

### Tips

  * Object Types and Custom Formatting - below links were compiled by Shay in #Powershell

  * [How does Powershell formatting really work?](http://blogs.msdn.com/powershell/archive/2006/06/21/641738.aspx)
  * [Finding out what determines which properties are displayed][9]
  * [Extending Object Types and Formatting][10] (msdn)
  * [Use of wildcards in Powershell formatting][11]
  * [Customizing Windows PowerShell](http://thinkersroom.com/bytes/2006/10/27/customizing-windows-powershell/)

  * Using the -disabled, -enabled and -LdapFilter parameters of the Get-Qaduser command to speed up searches

  * Newsgroup Posts: 
      * [using AutoItX COM interface][12]
      * [PS and WinRM on 1000+ machines][13]

### Cmdlet of the Week

  * [measure-command][14]

### One-liner

  * This simple one-liner is an easy to use stopwatch!

> 
measure-command { read-host "press any key to stop timer" }


Thanks for listening!


 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-020.mp3
 [2]: http://blog.sapien.com/ "blog"
 [3]: http://surveys.sapien.com/poll.asp?z=2 "here"
 [4]: http://runasradio.com/ "RunAs Radio"
 [5]: http://runasradio.com/default.aspx?showNum=46 "podcast show #46"
 [6]: http://www.sdmsoftware.com/freeware.php "freeware SDM GPMC snapin"
 [7]: http://blogs.technet.com/chitpro-de/default.aspx "Swiss IT Pro & Technet blog"
 [8]: http://blogs.technet.com/chitpro-de/archive/2008/02/28/free-windows-powershell-workbook-server-administration.aspx "this 78-page book"
 [9]: http://blogs.msdn.com/powershell/archive/2006/04/25/583263.aspx
 [10]: http://msdn2.microsoft.com/en-us/library/ms714665.aspx
 [11]: http://blogs.msdn.com/powershell/archive/2006/04/29/586775.aspx
 [12]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_frm/thread/cc1b91a79fc20903/a0a07677acc357da#a0a07677acc357da
 [13]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_frm/thread/f1dbefdcda4acffd/7805d643da9b0b46#7805d643da9b0b46
 [14]: http://www.microsoft.com/technet/scriptcenter/topics/msh/cmdlets/measure-command.mspx
