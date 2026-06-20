---
title: Episode 68 – James Brundage from the PowerShell team
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-04-30T04:27:22+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-068.mp3"
aliases:
  - /2009/04/episode-68-james-brundage-from-the-powershell-team/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

## In This Episode



## 



Tonight on the PowerScripting Podcast we talk to James Brundage from Microsoft.






## 
    News





    *This segment is brought to you by *[*SAPIEN Technologies*](http://sapien.com/)*.*
  







      - 
        April 30th is the next [PowerShell Virtual User Group meeting](http://marcoshaw.blogspot.com/2009/04/windows-powershell-virtual-user-group.html) 


      - 
        The PowerShell team [is looking for new verbs](http://blogs.msdn.com/powershell/archive/2009/04/22/soliciting-new-verbs.aspx) 


      - 
        John Cook has published his new e-book titled "[PowerShell Day 1](http://www.johndcook.com/powershellbooklet.html) "








## 
    Interview





    *When it comes to scripting, you"™re a warrior. But mighty warriors need mighty tools!*




      *Is your scripting might equal to the challenge? Put the power in your hands "“ *[*download PowerGUI today*](http://quest.com/powerscripting)*.*







    For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.
  



### Tips from James

#### Splatting example:





function


 

foo

(

[switch]

$force

,

 

[switch]

$confirm

)






    - 
      [Working with Perf counters blog post](http://blogs.msdn.com/powershell/archive/2009/04/21/v2-quick-tip-monitoring-performance-counters-with-powershell.aspx)







    Here are some sample scripts from James:




## 
    Resources







      *
Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to *[*www.idera.com/PodcastPeople*](http://www.idera.com/PodcastPeople)* to get your copy today!*








     







      - 
        Joel has published a [WPF countdown clock](http://huddledmasses.org/a-wpf-countdown-timer-in-powerboots/) that uses his PowerBoots framework


      - 
        Jeff Hicks is [having fun with the PowerShell ISE](http://blog.sapien.com/index.php/2009/04/17/fun-with-powershell-ise/) 


      - 
        Speaking of ISE, the PowerShell team now has a [new Start-Demo script](http://blogs.msdn.com/powershell/archive/2009/04/22/do-powershell-demos-in-the-ise.aspx)


      - 
        Joel's advice for [getting PowerShell help](http://huddledmasses.org/where-to-go-for-powershell-help/)  in a hurry 


      - 
        Need help [explaining the value of PowerShell to a DBA](http://chadwickmiller.spaces.live.com/Blog/cns!EA42395138308430!347.entry) ?






## 
      Tips









          - 
            [Execution policy tip](http://richardsiddaway.spaces.live.com/Blog/cns!43CFA46A74CF3E96!2237.entry)  for Windows Server 2008 R2 64-bit from Richard Siddaway








## 
        Contest





        Listen to the show to hear details of our "Heroes" contest.  You can win a $25 Amazon.com gift certificate!







{




    

$force




    

$confirm




}




 




$parameters


 

=

 

@{




     

Force

 

=

 

$true




     

Confirm

 

=

 

$true




}




 




 




foo


 

@parameters


 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-068.mp3
