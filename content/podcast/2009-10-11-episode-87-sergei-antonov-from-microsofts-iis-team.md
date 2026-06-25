---
title: "Episode 87 – Sergei Antonov from Microsoft's IIS team"
authors:
  - Jonathan Walz
date: "2009-10-12T02:59:16+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-087.mp3"
aliases:
  - /2009/10/episode-87-sergei-antonov-from-microsofts-iis-team/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-087.mp3)






## 

In This Episode








Tonight on the PowerScripting Podcast we talk to developer Sergei Antonov from the IIS team





## 

News






      *Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory.*





      *Don"™t wait "“ visit [quest.com/powershellbook](http://www.quest.com/powershellbook) to register for your free copy and see why PowerShell and Quest Power GUI are the ultimate Windows management tools.*







        - 
          The November meeting of the [Central Ohio PowerShell User's Group](http://centralohiopug.wordpress.com/2009/10/01/november-copug-meeting/) will be November 12th


        - 
          Hal will be presenting to the [Atlanta VMware User Group](http://communities.vmware.com/community/vmug/us-southeast/atlanta) along with Scott Herold of Vizioncore on Nov 5th


        - 
          James Brundage [has been doing videos for Channel 9](http://channel9.msdn.com/Search/?Term=James%20Brundage)


        - 
          [SharePoint 2010 brings on the PowerShell](http://consultingblogs.emc.com/michaelciba/archive/2009/07/19/powershell-marches-into-sharepoint-2010.aspx)


        - 
          CodePlex review: 


              [PowerShell Glass](http://powershellglass.codeplex.com/)


            - 
              [SQL Server Community Projects & Samples](http://sqlserversamples.codeplex.com/)


            - 
              [YamlSerializer](http://yamlserializer.codeplex.com/)


            - 
              [Visio Automation](http://visioautomation.codeplex.com/)













## 
        Interview




#### 
        Links







          - 
            [http://blogs.iis.net/sergeia/](http://blogs.iis.net/sergeia/)








#### 
        Questions









## 

Resources






        - 
          [Blog series](http://codygros.wordpress.com/2009/10/08/using-the-new-active-directory-cmdlets-part-1-active-directory-web-services-and-active-directory-management-gateway-service/) on the new Active Directory cmdlets from a new PowerShell Blogger


        - 
          Jonathan Medd has put together a [great quick reference guide](http://www.jonathanmedd.net/2009/10/active-directory-powershell-quick-reference-guide.html) for the AD cmdlets


        - 
          And Pablo @ VMware has released [a PowerCLI poster](http://communities.vmware.com/message/1381785#1381785)


        - 
          [Dmitry has a post](http://dmitrysotnikov.wordpress.com/2009/10/07/get-a-list-of-users-email-addresses/) showing how to quickly grab all of the email addresses for the users of a given group


        - 
          Joel showcases some of his [favorite new things](http://huddledmasses.org/whats-new-in-powershell-2/) in PowerShell v2








## 

Tips








            - 
              [Setting up v2 Remoting](http://powershell.com/cs/blogs/tobias/archive/2009/08/29/test-driving-remoting-in-windows-7.aspx) from PowerShell.com


            - 
              [Where do the functions come from?](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2009/08/17/where-do-the-functions-come-from.aspx) Shay Levy tells us how to find out.


            - 
              [Use $MyInvocation to find the path](http://blogs.msdn.com/powershell/archive/2007/06/19/get-scriptdirectory.aspx) of the currently running script

















## 
          One-Liner







            - 
              Import-Module WebAdministration; Get-Command -Module WebAdministration | fw


            - 
              From listener [Xcud](http://twitter.com/xcud/statuses/4656624461): ps | select name,starttime, @{N="Running Time";E={([System.DateTime]::Now - $_.starttime)}}
