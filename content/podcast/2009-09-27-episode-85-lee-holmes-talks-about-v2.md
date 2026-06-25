---
title: Episode 85 – Lee Holmes talks about v2
authors:
  - Jonathan Walz
date: "2009-09-28T04:23:30+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-085.mp3"
aliases:
  - /2009/09/episode-85-lee-holmes-talks-about-v2/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-085.mp3)



## 

In This Episode








Tonight on the PowerScripting Podcast we talk to author and developer Lee Holmes from the PowerShell team.





## 

News






      *Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory.*





      *Don"™t wait "“ visit [quest.com/powershellbook](http://www.quest.com/powershellbook) to register for your free copy and see why PowerShell and Quest Power GUI are the ultimate Windows management tools.*







        - 
          [You can now use the Microsoft AD Cmdlets](http://blogs.msdn.com/adpowershell/archive/2009/09/18/active-directory-management-gateway-service-released-to-web-manage-your-windows-2003-2008-dcs-using-ad-powershell.aspx) on your Windows Server 2003 domain


        - 
          New from PowerWF: [convert scripts to workflows, v2 support, UAC, PowerCLI support](http://blog.powerwf.com/post/195230863/recent-highlights)


        - 
          PrimalForms 2009 now has an [integrated script editor](http://jdhitsolutions.com/blog/2009/09/primalforms-2009-script-editor/#utm_source=feed&utm_medium=feed&utm_campaign=feed)


        - 
          Brandon [informs us](http://bsonposh.com/archives/990) of a new AD Codeplex project: [AD Replication Module](http://adreplicationmodule.codeplex.com/)










## 
        Interview




#### 
        Links







          - 
            Lee's PowerShell Cookbook [http://oreilly.com/catalog/9780596528492/](http://oreilly.com/catalog/9780596528492/)


          - 
            [http://blogs.msdn.com/powershell/archive/2008/09/30/powershell-s-security-guiding-principles.aspx](http://blogs.msdn.com/powershell/archive/2008/09/30/powershell-s-security-guiding-principles.aspx)


          - 
            [http://leeholmes.com/blog](http://leeholmes.com/blog)








#### 
        Questions







          - 
            glnsize: ## what is the provider story?  Where a couple years in now, where do providers work?


          - 
            glnsize: ## wait we can use eventing to handle jobs... i thought this was limited to wmi


          - 
            glnsize: ## what scope does the event scriptblock run in?


          - 
            palen: ## do events get lost when the powershell.exe host is close?


          - 
            aleksandar: ## can we get a blog post in the near future about the eventing in V2. it's new and very powerful feature, but most of the sysadmins are not very familiar with it


          - 
            glnsize: ## where are these (ISE) extentions?


          - 
            glnsize: ## with providers not your lane, but what do i have to do to get a skydrive provider?


          - 
            spowser: ##Is Powershell ISE considered part of Powershell release cycle or can updates be released off-cycle?


          - 
            glnsize: ##we're suppose to be migrating to powershell.... did I just hear that I should be using an NT cmd over a powershell core function


          - 
            palen: ## Is it in the roadmap to make .ps1 scripts native logon/logoff scripts?


          - 
            finked: ## What is the easiest way to list the events in the ISE that you can register for


          - 
            glnsize: ##besides the registry where have transactions been implemented?


          - 
            spowser: ##What kind of feedback have you got from other teams within Microsoft about V2?


          - 
            glnsize: ## softball -> favorite feature of V2...hardball->feature you couldn't get in


          - 
            glnsize: ## I think transactions are awesome, but I barley ever modify the registry


          - 
            glnsize: ##is there a post that shows me how my advanced functions can support transactions?  how involoved is this


          - 
            finked: ## Will transactions be in the new Cook Book? What is new in the vNext Cook Book?


          - 
            glnsize: ## will there be a v 2.1 or will be have to wait till windows 8 for the next posh release... feel free not to answer 😉


          - 
            glnsize: ##isn't [execution policy] -scope process a security hole?








## 

Resources






        - 
          Brandon [dished up a list](http://bsonposh.com/archives/983) of the Windows 2008 R2 Group Policy Cmdlets


        - 
          Cody Bunch [has posted a script to schedule VMware Fault Tolerance](http://professionalvmware.com/2009/09/scheduling-vmwares-ft-fault-tolerance/)


        - 
          Lee Holmes shows us the [PowerShell equivalent of NET HELPMSG](http://www.leeholmes.com/blog/PowerShellEquivalentOfNETHELPMSG.aspx)


        - 
          Using [computed propertie](http://www.leporelo.eu/blog.aspx?id=how-to-specify-computed-property-in-select-object)s in Select-Object


        - 
          Carter Shanklin wrote [this script](http://poshcode.org/1341) to grab h/w serial # data from your ESX servers








## 
          Gotcha







            - 
              [Break doesn't work in pipelines](http://dmitrysotnikov.wordpress.com/2007/08/31/break-not-working-in-foreach/)

















## 
          One-Liner







            - 
              Get-Help New-Object -Parameter property


            - 
              $profile | fl * -Force


            - 


                ([thx Powershell.com](http://powershell.com/cs/blogs/tips/archive/2009/09/22/getting-process-windows-titles.aspx)):
 Get-Process |





                where-Object {$_.mainWindowTitle} |





                format-table id,name,mainwindowtitle "“AutoSize










## 
          Contest





          Your quest: Create a PowerShell script to generate fractal images. Bonus points for displaying the generated image using a Winform or WPF.  Get started by reading [this thread on PowerShellCommunity.org](http://powershellcommunity.org/Forums/tabid/54/aff/1/aft/4177/afv/topic/Default.aspx).





          Did we forget to mention there are prizes?  You can win an Amazon $25 gift certificate and a book from SAPIEN!
