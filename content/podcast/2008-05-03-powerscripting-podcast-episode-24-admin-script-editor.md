---
title: Episode 24 – Admin Script Editor
authors:
  - Jonathan Walz
date: "2008-05-03T19:56:14+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-024.mp3"
aliases:
  - /2008/05/powerscripting-podcast-episode-24-admin-script-editor/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

#### In This Episode

  * Today we'll be speaking to Steven Behrns from iTripoli, the developers who brought you Admin Script Editor. Also on tap: news, resources, and a bunch of PowerShell tips for you. In addition, we've got a product giveaway, the first of many! But you have to listen to find out how to enter. 🙂

#### News

The News today is sponsored by SDM Software.  
Before we go into the spiel, I'd like to mention that we've gotten some great feedback from Quest already, so thanks to everyone who has done a clickthrough and filled out the form. You do keep doing that, and we keep the advertisers happy, and that allows US to do more for you. You will start to see the results of that in this very show!  
"SDM Software provides innovative solutions that combine PowerShell and Group Policy to help reduce the complexity of managing your Windows systems. Their unique GPExpert Scripting Toolkit for PowerShell, provides the means to automate the management of your Group Policy Objects.  
To get more information about these products and download trial copies,  
visit [sdmsoftware.com/powerscripting.php][2]."

  * We want to highlight a ton of IMPORTANT posts which Jeffrey Snover has made over the past few weeks: 
      * [How Could You Top CTP1?][3] 
          * This post has the background for why and how some upcoming changes will be made.
      * [Changes in upcoming CTP][4] 
          * This post has an extract from the release notes for CTP2. Very important to read if you want to keep up with the new version. There's also some good discussion in the comments attached to the article.
      * [Get-Random][5] 
          * I love this quote: _I saw_ [_THIS_][6] _posting over on Mark Minasi's forums that caught my eye. It gives you a random help file under the motto of: "A powershell help file a day, keeps Don Jones away"_
          * The article goes on to talk about a new cmdlet by the name Get-Random which will get you a random number, or--grab a random item from a collection.
  * iTripoli just released version 3.5 of their Admin Script Editor. (Should be out by the time you read this.) It now includes a debugger and has a ton of PowerShell templates.
  * VMware [just announced][7] that Beta 2 of VMware Server 2 (the free version of their virtualization software) is manageable by their PowerShell Toolkit! This is awesome news for smaller shops which have not shelled out for their higher-end Virtual Infrastructure products.

#### Interview

[sponsor] Our interview today is brought to you by [Quest Software][8].  
Quest LOVES PowerShell. Go to [www.quest.com / PowerShell][8] and download their free graphical user interface, script editor and Active Directory cmdlets. While you"™re there, join their online community where you can share ideas and download free PowerPacks to extend PowerGUI. Visit [www.quest.com / powershell][8] today!  
We interview Steven Behrns from iTripoli in today's show. Be sure to listen! Here are some of the questions we asked him.

  1. Who is Steven? What do you do at iTripoli, and what is your background? 
      1. co-founder
      2. company started in 2001 w/Bob Kelly. Kixscript editor
  2. What are your favorite features? 
      1. Comprehensive code wizards to generate ps script code for ADSI, WMI, XML, database connections, etc.
      2. Script packager, turns your scripts into an executable.
      3. Script Form Designer
  3. When did iTripoli get into PowerShell? Was it a hard sell internally or was this an obvious way forward for ASE? 
      1. Thought about this in 2006 during a code overhaul discussion.
      2. First supported powershell in spring of 2007 with the release of 3.0.
  4. What are the primary design goals for ASE? How has it done in the marketplace and changed over time? 
      1. Everything related to making scripting tasks easier.
      2. They want ASE to appear invisible and intuitive to the scripters.
  5. How long was the dev cycle (for PowerShell support)? What were your greatest challenges?
  6. Where do you see PowerShell in two years? How will ASE evolve to match it?
  7. So I heard you have something to show us? 
      1. They [wrote a podcast / MP3 player entirely in PowerShell][9] as an example of how much you can do.
      2. The graphics in the GUI are embedded WITHIN the script file using base-64 encoding.

Thanks a bunch to Steven, we had fun with the interview.

#### Resources

  * We have two links for you today from John Robbins, author and master debugger. It's a heartwarming [before][10] and [after][11] powershell love story. 🙂 He also links to a [Compile-Help script][12] which we somehow missed when it was new. This script grabs the help files from all installed cmdlets as well as the about topics, and packages them into a HTML help file for easy reading.
  * Carter at VMware (yes, Hal has a thing about them, sorry) also blogged about a way to have your VMware alert events [fire off instant messages using Jabber][13]

**One-Liner**

  * One liner sent to us by John Cook and a write up on his [blog][14] 
      * $env:path -replace ";", "`n"

#### Give Away

  * A beautiful NFR copy of Windows Vista Ultimate could be yours. Listen to the show for how to enter.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-024.mp3
 [2]: http://www.sdmsoftware.com/powerscripting.php
 [3]: http://blogs.msdn.com/powershell/archive/2008/04/24/how-could-you-top-ctp1.aspx
 [4]: http://blogs.msdn.com/powershell/archive/2008/04/24/changes-in-upcoming-ctp.aspx
 [5]: http://blogs.msdn.com/powershell/archive/2008/04/27/get-random.aspx
 [6]: http://web2.minasi.com/forum/topic.asp?TOPIC_ID=26736
 [7]: http://blogs.vmware.com/vipowershell/2008/04/you-can-manage.html
 [8]: http://info.quest.com/QuestSoftwareSponsoredPodCastPowerscripting0132008
 [9]: http://adminscripteditor.com/player
 [10]: http://www.wintellect.com/cs/blogs/jrobbins/archive/2008/01/05/new-year-s-resolution-powershell.aspx
 [11]: http://www.wintellect.com/cs/blogs/jrobbins/archive/2008/02/17/eight-weeks-of-powershell.aspx
 [12]: http://powershellcentral.com/scripts/144
 [13]: http://blogs.vmware.com/vipowershell/2008/04/more-fun-with-p.html
 [14]: http://www.johndcook.com/blog/
