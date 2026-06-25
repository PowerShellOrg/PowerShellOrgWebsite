---
title: Episode 5 – PowerShell Hits a Million
authors:
  - Jonathan Walz
date: "2007-06-08T16:35:09+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PowerScripting_-Episode5.mp3"
aliases:
  - /2007/06/powerscripting-podcast-episode-5-a-powershell-podcast/
---

**A Podcast about Windows PowerShell.**[**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]




    - 

Introduction




Shout-out to Mark Allen for answering the challenge











    - 

News




New AD cmdlets - the one step account creation works great



        - 

From the ScriptingNewswire, May 2007




Windows PowerShell guide for beginners



            - 

Downloadable and cmdlet-accessible graphical help for Windows PowerShell











        - 

/n software will be releasing NetCmdlets at TechEd next week




They are giving away [free PowerShell stickers](http://shrinkster.com/pjo) 











        - 

Ed Wilson's book 
[
Microsoft Windows PowerShell Step By Step
](http://www.microsoft.com/MSPress/books/10329.aspx)


        - 

Jeffery Snover said in a blog post that PowerShell has had almost a million downloads in the first six months!













      - 

Cmdlets of the week




Select-Object (Select)



          - 

Get-Acl



          - 

Import-Csv







      - 

Resource




Mark's Log - [questforfire.spaces.live.com](http://shrinkster.com/pjn) 



          - 

Some great PowerShell posts, some of the latest ones are about managing tasks in outlook




Psexec server fix and paper airplanes







          - 

[Blog post](http://shrinkster.com/pp4) from Jeffery Snover that talks about companies, books, communities, etc 



          - 
            [
Technet Webcast: Microsoft Windows PowerShell: The Future of Server Administration 
](http://shrinkster.com/pr3)


          - 

Scripting Guys




Windows PowerShell Owner's Manual



              - 

PowerShell Quick Reference



              - 

Windows PowerShell Graphical Help File



              - 

Look on [ThePowerShellGuy blog](http://shrinkster.com/pr5) (
 //o//
)










      - 

One-liners




sl c:winntsystem32



          - 

$new = Get-ChildItem -recurse | get-Acl |Where-Object {$_.sddl.contains('FA;;;SY)') -eq $False}



          - 

 [Security Descriptor Definition Language](http://shrinkster.com/pjm)



          - 

This is Mark's answer, check out [his blog](http://questforfire.spaces.live.com).  get-childitem -recurse | get-acl | where-object {$_.AccessToString -notlike "*SYSTEM Allow  FullCon*"}













        - 

Gotchas




New-QADUser 



            - 


 

Make sure you set the samAccountName and the UPN










 [1]: http://media.libsyn.com/media/powerscripting/PowerScripting_-Episode5.mp3
