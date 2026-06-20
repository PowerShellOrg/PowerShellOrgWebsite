---
title: Episode 93 – Jeff Atwood tells us Rock Hard Awesome will create teleportation and we talk about ServerFault
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-11-23T03:26:17+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-093.mp3"
aliases:
  - /2009/11/episode-93-jeff-atwood-tells-us-rock-hard-awesome-will-create-teleportation-and-we-talk-about-serverfault/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-093.mp3)



## 

In This Episode






    Tonight on the PowerScripting Podcast we talk to Jeff Atwood about technical communities, ServerFault, and StackOverflow




## 

News






    * *







      - 
        Don't miss the Seattle Script Club this Thursday the 19th. Watch the PowerShell team blog where the slide deck and maybe a video will be posted afterwards. Focus will be building graphs with Visifire and WPK.


      - 
        Project Onyx [finally has a public alpha](http://blogs.vmware.com/vipowershell/2009/11/project-onyx-is-here.html) (also see Al Renouf's [blog post](http://www.virtu-al.net/2009/11/16/the-onyx-has-landed/))


      - 
        PowerShell V2 is [supported for Exchange 2007 SP](http://msgoodies.blogspot.com/2009/11/powershell-20-is-supported-for-exchange.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+blogspot/msgoodies+(msgoodies+RSS))2


      - 
        [TechMentor 2010 is now open for registration](http://www.techmentorevents.com/Events/TechMentor-Spring-2010/Home.aspx), and they have a [PowerShell track](http://techmentorevents.com/events/techmentor-spring-2010/tracks/windows-powershell-focus-topic.aspx).


      - 
        PowerShell Help 2.0 Community Edition [has been released by SAPIEN](http://blog.sapien.com/index.php/2009/11/16/powershell-help-2-0-community-edition/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+SapienBlog+(SAPIEN+Technologies+Blog))










## 
      Interview





      *This segment is brought to you by *[*SAPIEN Technologies*](http://sapien.com/)*.*




#### 
      Links







        - 
          [StackOverflow](http://stackoverflow.com/)


        - 
          [ServerFault](http://serverfault.com/)


        - 
          [CodingHorror](http://www.codinghorror.com/blog)








#### 
      Questions





      - 
        your background


      - 
        Why come up with a new type of Q&A site?


      - 
        what have you learned so far?


      - 
        tech challenges


      - 
        SO vs SF (and the rest). I expect to spend quite a bit of time here, to be sure that my listeners, the majority of which are admins, understand where PowerShell questions fit, given that it _is_ a computer language.


      - 
        Who is Rock Hard Awesome? 🙂






## 

Resources






      - 
        Rich Siddaway [has a script](http://richardsiddaway.spaces.live.com/Blog/cns!43CFA46A74CF3E96!2605.entry) that shows you how to create a scheduled task to clear your temp files using the TaskScheduler module from the [PowerShellPack](http://code.msdn.microsoft.com/PowerShellPack). Rich also has [a follow-up article](http://richardsiddaway.spaces.live.com/Blog/cns!43CFA46A74CF3E96!2607.entry) where he goes into more depth on the cmdlets included in the TaskScheduler module.


      - 
        Klaus Graefensteiner [has a script](http://www.tellingmachine.com/post/Enumerating-and-un-installing-products-by-name-using-PowerShell-and-MSIConfigexe.aspx) for un-installing products by name


      - 
        [Creating word clouds with PowerShell and PowerPoint](http://blogs.technet.com/jamesone/archive/2009/11/17/making-word-clouds-part-1-how-it-works.aspx) from James O'Neill








## 

Tips






        Please support our sponsor ServerFault.com, the ultimate Q&A site for system administrators!







          - 
            MVP Joel Bennett tells how to [sign PowerShell scripts automatically](http://huddledmasses.org/signing-powershell-scripts-automatically/)


          - 
            [How do I turn windows features on or off using powershell](http://serverfault.com/questions/82886/how-do-i-turn-windows-features-on-or-off-using-powershell-or-commandline-in-windo)?


          - 
            Ed Wilson [gives us a great post](http://blogs.technet.com/heyscriptingguy/archive/2009/11/17/hey-scripting-guy-november-17-2009.aspx) showing how to use web services from PowerShell


          - 
            Steve Murawski [posted a script](http://poshcode.org/1471) to pull tables out of Crystal Reports


          - 
            [powershell v2 remoting - How do you enable unecrypted traffic](http://stackoverflow.com/questions/1469791/powershell-v2-remoting-how-do-you-enable-unecrypted-traffic)










## 
          One-Liner





          As [documented recently](http://blogs.msdn.com/powershell/archive/2009/11/15/i-can-do-that-with-1-line-of-powershell-installed-software.aspx) on the PowerShell team blog:






gp HKLM:SoftwareMicrosoftWindowsCurrentVersionUninstall* | Select DisplayName, DisplayVersion, Publisher, InstallDate, HelpLink, UninstallString | ogv
