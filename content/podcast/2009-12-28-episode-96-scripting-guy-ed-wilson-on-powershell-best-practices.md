---
title: Episode 96 – Scripting Guy Ed Wilson on PowerShell Best Practices
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-12-29T03:42:37+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-096.mp3"
aliases:
  - /2009/12/episode-96-scripting-guy-ed-wilson-on-powershell-best-practices/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-096.mp3)



## 

In This Episode








Tonight on the PowerScripting Podcast we talk to Ed Wilson, the Scripting Guy 





## 

News
* *








*
Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory.
*







*
Don"™t wait "“ visit 
[
quest.com/powershellbook
](http://www.quest.com/powershellbook)
 to register for your free copy and see why PowerShell and Quest Power GUI are the ultimate Windows management tools.
*






         









        - 
          Jonathan Medd has a great [blog series](http://www.jonathanmedd.net/category/cmdlet-series) titled "One Cmdlet at a Time", he's already up to [#23 Disable-ComputerRestore](http://www.jonathanmedd.net/2009/12/powershell-2-0-one-cmdlet-at-a-time-23-disable-computerrestore.html)


        - 
          Ed Wilson's new book is out! Buy it at Amazon: [Windows PowerShell(TM) 2.0 Best Practices](http://www.amazon.com/gp/product/0735626464?ie=UTF8&tag=techprosaic-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0735626464) (use this referral link to help out the show)










## 
        Interview





        *This segment is brought to you by *[*SAPIEN Technologies*](http://sapien.com/)*.*




#### 
        Links







          - 
            Ed was on last time over a year ago! [Episode 50](http://powerscripting.wordpress.com/2008/11/23/episode-50-ed-wilson-microsoft-scripting-guy/)


          - 
            New book: [Windows PowerShell(TM) 2.0 Best Practices](http://www.amazon.com/gp/product/0735626464?ie=UTF8&tag=techprosaic-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0735626464)


          - 
            PS Hyper-V [http://pshyperv.codeplex.com/](http://pshyperv.codeplex.com/)


          - 
            Space Invaders: [http://ps1.soapyfrog.com/2007/01/02/space-invaders/](http://ps1.soapyfrog.com/2007/01/02/space-invaders/)


          - 
            Charting: [http://chadwickmiller.spaces.live.com/blog/cns!EA42395138308430!473.entry](http://chadwickmiller.spaces.live.com/blog/cns!EA42395138308430!473.entry)


          - 
            [Listener Trevor's blog post about using VPro from PowerShell](http://communities.intel.com/community/openportit/vproexpert/blog/2008/12/03/stepping-through-vpro-powershell-code)








#### 
        Questions





        - 
          ye110wbeard: ## Ed, when you got hired by Microsoft did you jump up and down like a madman yelling "yeeha" 


        - 
          rfoust: ## what other scripting languages do you know and how do you think powershell compares?


        - 
          jtruman0917-1: ## With Microsoft promising that all products after Outlook 2007 would have Powershell Support.  Why would a new automation lang even be a discussion?


        - 
          pcgeek86: What happened to Greg and Jean?


        - 
          rfoust: ## what's the coolest script you've seen and whats the coolest one you've written     


        - 
          Jaykul: ## So if you don't exercise best practices when you write scripts ... where do these best practices come from?


        - 
          [several asked if he would come to their user group]






## 

Resources






        - 
          PoshCode: [Edit file in Notepad++](http://poshcode.org/1541)


        - 
          Dmitry posted a [PowerGUI Overview Video](http://dmitrysotnikov.wordpress.com/2009/12/17/new-powergui-overview-video/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+DmitrysPowerblog+(Dmitry's+PowerBlog)&utm_content=Google+Reader)


        - 
          Eric Sloof [posted his slides](http://www.ntpro.nl/blog/archives/1359-Eric-Sloof-presented-Managing-VMware-vSphere-4-with-The-Virtualization-EcoShell-at-the-Dutch-VMUG.html) from the recent Dutch VMUG. Topic was managing VMware with vEcoshell.


        - 
          James Brundage's WPK series continues with and [into to containers](http://channel9.msdn.com/posts/philpenn/Windows-PowerShell--A-Brief-Introduction-to-using-WPF-Containers-in-WPK/)


        - 
          Joel Posted a [PowerBoots Gadgets script](http://poshcode.org/1539)


        - 
          James Brundage posted [Test-Spelling](http://blogs.msdn.com/mediaandmicrocode/archive/2009/12/09/test-spelling.aspx)









          **


**





          **
One-Liners
**





          **


**





          Everybody got silly in the chatroom. So, let's channel that wild energy here with...beer cmdlets! 🙂 Note: these are not guaranteed to actually DO anything. YMMV, BYOB!




            - 
              pcgeek86: Drink-Beer -Amount Lots 


            - 
              ScottMoss: drink-beer -refill 


            - 
              pcgeek86: Drink-Beer -Type GermanPilsner 


            - 
              ScottMoss: drink-beer -Type Sweetwater Bule 


            - 
              jtruman0917-1: Drink-beer -Type DoesItReallyMatter 


            - 
              rfoust: get-beer | giveto-rfoust 


            - 
              jkavanagh58: drink-beer -brand Yuengling -Type Porter -qty Lots 


            - 
              rfoust: while ($true) { get-beer }
