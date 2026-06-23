---
title: Episode 18 – Win Fabulous Prizes!
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-02-04T02:19:56+00:00"
legacy_featured_image: /wp-content/uploads/2019/03/psp-banner2-1.png
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-018.mp3"
aliases:
  - /2008/02/powerscripting-podcast-episode-18-win-fabulous-prizes/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

##### In This Episode

  * Lots of news and tips
  * We missed Jonathan
  * Our first contest--with actual prizes!

##### News

  * The [PowerShell team][2] blog brings us the news that "PowerShell continues to win awards with Redmond Magazine"&#x2122;s 2008 Editor"&#x2122;s "Slickest Time Saving Tool" co-winner to go along with PS"&#x2122;s Best of Tech-Ed Attendees award and Best of Tech-Ed Client awards."
  * Kirk Munro covers PowerGUI on [DNR.tv][3] [.NET Rocks!][4] and [RunAsRadio][5].
  * Karl Prosser (admin frameworks MVP and PowerShell Analyzer architect) was interviewed on the ["A Couple of Admins" podcast][6] Episode 35. The interview lasts for almost an hour and I really enjoyed it.
  * Shay@Isreal (The $cript Fanatic blog) put together a cool [PowerShell toolbar][7]
  * Admin Frameworks MVP Brandon Shell was interviewed on the [CS Techcast podcast][8]. Hal listened to it on the way home the other day and he thought it was a really good interview.
  * VMware's VI-Toolkit open beta is expected in March 
      * Over 70 new cmdlets
      * This example would create a snapshot of every VM:  
        get-vm | new-snapshot
  * [Dale Lane][9], author of the [IBM Websphere MQ PowerShell snapin][10] is considering writing another tool, this time a PowerShell library for the IBM DB/2 RDBMS.  He is seeking feedback, so if you or someone you know might be interested, please visit this [blog post][11] and leave feedback.
  * New Video Podcast: [PowerShell-Basics.com][12] 
      * This is created by Steve from the A Couple of Admins Podcast.  He wanted to create a screencast-only video podcast.  His first show should be out by the time you hear this.

##### Tips

There's a ton of Scripting Guys stuff we meant to cover in the interview show last time that we never got around to:

  * [PowerShell Graphical Help][13] (which we've mentioned before)
  * [PowerShell Scripting Toolbox][14]
  * Tons of categorized examples in their [script repository][15]
  * "[Hey, Scripting Guy!][16]" help columns on the website and in Technet Magazine
  * And here's a link to the [Scirpitng Games][17] we talked about in the last show.

This was used as part of a script Jonathan helped a co-worker with to batch sign ActiveX controls. Thanks to Joel for help on this one.


`[Diagnostics.Process]::Start("cmd.exe","/C $robocopycmd")
`Hal talks about renaming multiple files which end in an underscore:


`$files | %{ Rename-Item -Path $_.FullName -NewName ( $_.Name -replace '_$' ) }
`Jonathan talks about grabbing just the first few lines of a huge log file:


`get-content *.log -totalCount 5
`Hal parried, then riposted with:


`get-content | select-object -first 5
`##### PowerScripting / A Couple of Admins Cmdlet Contest

Contest Rules:

  * Three cmdlets announced on each show.
  * Contest entries will be a PowerShell script using all six cmdlets.
  * Entries can be submitted to 
  * Submissions will be taken until February 14th
  * Two winners will be drawn from the entries - one random, one for best script as decided by Steve, Hal, and Jonathan.
  * Prize - commercial license for PowerShell Analyzer (donated by Shell Tools)
  * Prize - commercial license for the NetCmdlets (donated by /n Software)

What are the cmdlets?  You have to listen to find out.  😉  
Thanks again to all of you listeners out there!  Your feedback makes it all worthwhile, keep that rolling in.  Our email address is 
, or you can comment on this very blog post.  Also find us on Facebook [here][18] (Jonathan), [here][19] (Hal),  and [here][20] (PowerScripting Podcast group).  Our group needs more members!  The Scripting guys are ahead by a teensy bit.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-018.mp3
 [2]: http://blogs.msdn.com/powershell/archive/2008/01/25/powershell-gets-redmond-magazine-2008-editor-s-choice-award.aspx
 [3]: http://www.dnrtv.com/default.aspx?showNum=99
 [4]: http://www.dotnetrocks.com/default.aspx?showNum=311
 [5]: http://runasradio.com/default.aspx?showNum=42
 [6]: http://acoupleofadmins.com/
 [7]: http://scriptolog.blogspot.com/2008/01/powershell-at-tip-of-your-browser.html
 [8]: http://www.cstechcast.com/home.aspx?Episode=8
 [9]: http://dalelane.co.uk/blog/
 [10]: http://www-1.ibm.com/support/docview.wss?rs=171&uid=swg24017698
 [11]: http://dalelane.co.uk/blog/?p=226
 [12]: http://powershell-basics.com/
 [13]: http://www.microsoft.com/technet/scriptcenter/topics/winpsh/pschm.mspx
 [14]: http://www.microsoft.com/technet/scriptcenter/topics/winpsh/toolbox.mspx
 [15]: http://www.microsoft.com/technet/scriptcenter/scripts/msh/default.mspx?mfr=true
 [16]: http://www.microsoft.com/technet/scriptcenter/resources/qanda/default.mspx
 [17]: http://www.microsoft.com/technet/scriptcenter/funzone/games/default.mspx
 [18]: http://www.facebook.com/profile.php?id=631148744&ref=nf
 [19]: http://www.facebook.com/profile.php?id=553909988
 [20]: http://www.facebook.com/group.php?gid=7033985478
