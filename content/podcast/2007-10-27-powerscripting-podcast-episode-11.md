---
title: Episode 11 – A new PowerShell community
authors:
  - Jonathan Walz
date: "2007-10-27T23:34:42+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-011.mp3"
aliases:
  - /2007/10/powerscripting-podcast-episode-11/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### Introduction

  * Big thanks to Shay and his [PowerShell Radio post][2]. 🙂

### News

  * PowerShell Community ([powershellcommunity.org][3]) 
      * "Real" non-profit organization created by corporate sponsors including Microsoft, Quest, Sapien, and ShellTools.
      * Event calendar, blog hosting, forums, etc.
      * Still under construction.
  * PowerShell Central ([powershellcentral.com][4]) 
      * Hosted by BSonPosh and lots of help contributed by Jaykul.
      * "All PowerShell bloggers" aggregate news feed, very cool script repository, news, etc.
      * Still under construction.
  *![](http://www.powershell.com/blogimages/collectionvisualizer1.png) Relaunch and refocus of [Powershell Live][5] (ShellTools) as well as a new [developer blog][6]. New features in development like context menus for collections and pipelines.

### Resources

  * [New article in Technet Mag][7] by Don Jones on working with Regular Expressions in PowerShell.
  * Another regex article: [Regular Expressions in PowerShell and Perl][8]

### Tips

  * [Get-hVm script][9]from Hal 
      * Emits a [PSCustomObject][10] with properties (and perhaps later, methods) that represent every virtual machine which runs on one or more specified VMWare ESX host servers.
  * [Out-Excel script][11] can be found on the article "[Out-This, Out-That][12]" article on the Pathalogical Scripter blog.

### Cmdlet of the week

  * Write-Verbose 
      * Use in parameter section of functions and combine with an If statement to enable or disable verbose logging.


Function Get-Foo {
 Param ( [switch] $Verbose )
 If ($Verbose) { $VerbosePreference = "Continue" }
 Write-Verbose "My verbose stuff goes here
 Write-Verbose "

and is not seen at all unless"
 Write=Verbose "I supply the -verbose switch"
 }



    ### One-Liners

      * 
write-verbose "$(Get-Date -f 's') my log entry goes here"


    ### Gotchas

      * Problems occur when a brackets "[" are in your filenames. 
          * [Stamp ACL onto Directory Tree][13] thread on Powershell Community forum
      * Careful with following the $_ automatic variable by a colon 
          * 
Out-Host "This $_:won't work right." 

          * 
Out-Host "This ${_}:will."


    ### 

    Thanks for listening! We love feedback and news tips, you can send them to 
. Join our Facebook group "PowerScripting Podcast".

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-011.mp3
 [2]: http://scriptolog.blogspot.com/2007/10/powershell-radio.html
 [3]: http://www.powershellcommunity.org/
 [4]: http://powershellcentral.com "http://powershellcentral.com/"
 [5]: http://powershelllive.com/
 [6]: http://powershelllive.com/blogs/pspdev/
 [7]: http://www.microsoft.com/technet/technetmag/issues/2007/11/PowerShell/?loc=en
 [8]: http://odin.mdacc.tmc.edu/%7Ecook/regex.html
 [9]: http://halr9000.com/article/445
 [10]: http://www.bsonposh.com/modules/wordpress/?p=25
 [11]: http://pathologicalscripter.wordpress.com/out-excel/
 [12]: http://pathologicalscripter.wordpress.com/2007/07/04/out-this-out-that/
 [13]: http://powershellcommunity.org/Forums/tabid/54/forumid/1/postid/35/view/topic/Default.aspx
