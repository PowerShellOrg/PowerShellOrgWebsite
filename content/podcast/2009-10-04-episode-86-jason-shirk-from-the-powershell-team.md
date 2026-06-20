---
title: Episode 86 – Jason Shirk from the PowerShell team
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-10-05T03:22:21+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-086.mp3"
aliases:
  - /2009/10/episode-86-jason-shirk-from-the-powershell-team/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-086.mp3)



## 

In This Episode








Tonight on the PowerScripting Podcast we talk to developer Jason Shirk from the PowerShell team.





## 

News






      *Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory.*





      *Don"™t wait "“ visit [quest.com/powershellbook](http://www.quest.com/powershellbook) to register for your free copy and see why PowerShell and Quest Power GUI are the ultimate Windows management tools.*







        - 
          We'd like to congratulate returning PowerShell MVPs and the newest MVP Antoine Habart (author of [PoshBoard](http://www.poshboard.com/))


        - 
          [PoshBoard v2.0 just released](http://www.poshboard.com/index.php?option=com_content&view=article&id=19:poshboard-20-available&catid=1:poshboard&Itemid=3&lang=en)


        - 
          PowerShell Cookbook [now available on the iPhone](http://www.leeholmes.com/blog/PowerShellCookbookNowAvailableOnIPhone.aspx)


        - 
          The Exchange team blogs about [PowerShell changes coming in E2010](http://msexchangeteam.com/archive/2009/09/10/452423.aspx)










## 
        Interview




#### 
        Links







          - 
            Comment-based help: [http://technet.microsoft.com/en-us/library/dd819489.aspx](http://technet.microsoft.com/en-us/library/dd819489.aspx)








#### 
        Questions







          - 
            finked: ## what was your first scripting language?


          - 
            palen: ## Did you spend much time on performance in the parser, or was that largely v1 kind of stuff?


          - 
            glnsize: ## as a comment... I don't write anything without implementing cmdlet bindings


          - 
            glnsize: ## ahhh there's cut and paste and your not typing this stuff at the console... keeping the parameters the same as c# allows me to easily translate code


          - 
            finked: ## what other areas might get performance boosts in the future?


          - 
            glnsize: ## what happened to runspaces, in ctp2 i could use runspaces... v2 switched to jobs and now I can't run scriptblocks locally in seperate runspaces.  rather i don't think i can...


          - 
            palen: ## Wait, an API for the PowerShell tokenizer?








## 

Resources






        - 
          PoshCode: [Get-DominosOrderStatus script](http://poshcode.org/1355)!


        - 
          Another method to provide help for you functions is by using external files. Chad Miller [makes it easier](http://chadwickmiller.spaces.live.com/Blog/cns%21EA42395138308430%21542.entry).


        - 
          Doug Finke [shares a cool project](http://dougfinke.com/blog/index.php/2009/09/28/try-powershell-an-interactive-tutorial/) for an interactive PowerShell tutorial


        - 
          MVP Guy Thomas releases his [Ezine 185 "PowerShell and Services"](http://www.computerperformance.co.uk/ezine/ezine185.htm)


        - 
          New PowerShellTips blog: [http://www.powershelltips.org/](http://www.powershelltips.org/)


        - 
          MVP Dmitry Sotnikov [shows how to use](http://dmitrysotnikov.wordpress.com/2009/09/29/background-jobs-in-powergui/) background jobs in PowerGui


        - 
          [Monitor login failures from the event log](http://social.technet.microsoft.com/Forums/en-US/ITCG/thread/9130fce0-74bd-4e35-a3c6-54552af98ee3/) (from The Scripting Guys forum)








## 

Tips








            - 
              [Piping a range of integers](http://powershellstation.com/2009/09/20/a-handy-trick-ive-started-to-use-a-lot/) to reduce your workload


            - 
              [Explicitly casting types](http://powershell.com/cs/blogs/tobias/archive/2008/11/17/of-quot-types-quot-and-quot-objects-quot.aspx) (thanks Tobias)


            - 
              Allowing non-administrators to [create a remote session](http://msgoodies.blogspot.com/2009/09/using-ps-session-without-having.html) in PowerShell v2.








## 
          Gotcha







            - 
              Watch out for trailing commas in your csv files

















## 
          One-Liner







            - 
              function bg { Start-Job -ScriptBlock { $args } }
