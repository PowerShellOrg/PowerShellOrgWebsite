---
title: Episode 1 – Fundamental Cmdlets
authors:
  - Jonathan Walz
date: "2007-03-27T04:00:20+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/01_PowerScripting_Podcast_about_Win.mp3"
aliases:
  - /2007/03/powerscripting-podcast-episode-1/
---

A podcast about Windows PowerShell.[![](http://powerscripting.libsyn.com/img/podcastIcon.gif)][1]  
In this show I discussed the cmdlets Get-Command, Get-Help and Get-Member.  
Here is a great video discussion of these cmdlets by [Jeffrey Snover.](http://channel9.msdn.com/Events/TechEd/Europe/2010/WSV301) (updated to a newer version)  
I also talked about a great Technet video by Don Jones about the [PowerShell Pipeline.](http://msevents.microsoft.com/cui/WebCastEventDetails.aspx?culture=en-US&EventID=1032321616&CountryCode=US)  
For our first PowerShell moment I talked about $f= dir  
The one-liner (full version) is:


  Get-Content servers.txt | %{$x = net time [\$_](/////$_)
; $x[0];If($x[2].contains("Local")){$x[2]}}
 | Add-Content Servertime.txt


You can find more detail about this one-liner in an [earlier post.][2]

 [1]: http://media.libsyn.com/media/powerscripting/01_PowerScripting_Podcast_about_Win.mp3
 [2]: http://powerscripting.wordpress.com/2007/03/09/powershell-one-liner-to-check-the-time-on-a-bunch-of-servers-for-dst/
