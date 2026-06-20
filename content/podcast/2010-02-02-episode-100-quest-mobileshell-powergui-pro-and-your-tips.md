---
title: Episode 100 – Quest Mobileshell, PowerGui Pro and Your Tips
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2010-02-03T04:03:05+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-100.mp3"
aliases:
  - /2010/02/episode-100-quest-mobileshell-powergui-pro-and-your-tips/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://media.libsyn.com/media/powerscripting/PSPodcast-100.mp3)



## 

In This Episode








Tonight on the PowerScripting Podcast we talk to Quest Software about Mobileshell and PowerGUI Pro






## 

News






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
          SAPIEN [just announced](http://blog.sapien.com/index.php/2010/01/28/windows-powershell-2-0-ebook-ready-for-purchase-and-download/) that the PowerShell 2.0: TFM ebook is ready for download


        - 
          [Global SharePoint User Group is coming soon!](http://www.gspug.org/)


        - 
          [PowerShell Community Extensions 2.0 is in beta!](http://pscx.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=39405)


        - 
          VMware [has launched their Script-O-Mania contest](http://communities.vmware.com/community/vmtn/vsphere/automationtools/scriptomania). Top prize is $2500!










## 
        Interview





        *This segment is brought to you by *[*SAPIEN Technologies*](http://sapien.com/)*.*




#### 
        Links









            - 
              http://powergui.org







            questions







              - 
                MarcoShaw: ##Quest: Any plans to use the new PowerShell features in SharePoint2010?


              - 
                Jaykul: ## Why doesn't PowerGUI "extend" Modules, instead of having a proprietary format?


              - 
                Jaykul: ## Does MobileShell run all teh commands on my webserver, by default?


              - 
                aleksandar: ## i would like to hear about mobileshell from the security point of view


              - 
                ChadMiller: ##Internally is Quest looking to build managment tools based on Powershell. As example something like Capacity Manager could have been built on Powershell and GUI hosts Powershell


              - 
                Jaykul: ## Is there any plan or possibility to have the webserver use MS-PSRP (PowerShell Remoting Protocol) to have the actual shell run ... well, somewhere that isn't my webserver?


              - 
                aleksandar: ## is mobileshell supported in browsers other than IE?


              - 
                aleksandar: ## how many concurrent sessions does the mobileshell support?


              - 
                glnsize: ## is is also exposed as a web service?  The use case would be *nix host's that would benefit from a posh proxy. 


              - 
                aleksandar: ## can i have a transcript of a session in mobileshell or any kind of a log of typed commands?










#### 

Hero/Power - Silver Surfer








        - 
           









          **


**





          **
Tips
**

















Our tips are brought to you today by ServerFault and StackOverflow, the best place to find answers to your toughest questions!

















              - 

From David Moravec
 





Use Get-Help! It looks strange but there is a lot of things you can learn from help. Really!



                  - 

-WhatIf is your best friend.



                  - 

Add Get-Member to your daily portfolio. It will show you another dimension.







              - 
                [Tobias shows us how to edit the remoting permissions](http://powershell.com/cs/blogs/tips/archive/2010/01/28/remote-access-without-admin-privileges.aspx) with Set-PSSessionConfiguration


              - 

[Copy con for PowerShell](http://www.out-web.net/?p=755)



              - 

From Pepa Stefan




Useful oneliners
  [http://stackoverflow.com/questions/615287/useful-powershell-one-liners](http://stackoverflow.com/questions/615287/useful-powershell-one-liners)



                  - 

What to have in my posh profile
  [http://stackoverflow.com/questions/138144/whats-in-your-powershell-profile-ps1file](http://stackoverflow.com/questions/138144/whats-in-your-powershell-profile-ps1file)



                  - 

Windows PowerShell Tips
  [http://technet.microsoft.com/en-us/library/ee692948.aspx](http://technet.microsoft.com/en-us/library/ee692948.aspx)



                  - 

Passing parameters to script in a hashtable  (see the answer)
  [http://stackoverflow.com/questions/2057631/must-powershell-scripts-be-called-using-only-a-single-line](http://stackoverflow.com/questions/2057631/must-powershell-scripts-be-called-using-only-a-single-line)
  and once again splatting
  [http://blogs.msdn.com/powershell/archive/2009/01/02/how-and-why-to-use-splatting-passing-switch-parameters.aspx](http://blogs.msdn.com/powershell/archive/2009/01/02/how-and-why-to-use-splatting-passing-switch-parameters.aspx)



                  - 

Some list of Posh tips
  [http://concentratedtech.com/item/view/id/27/title/21_PowerShell_Tips](http://concentratedtech.com/item/view/id/27/title/21_PowerShell_Tips)



                  - 

Some tips for developers
  [http://stackoverflow.com/questions/622902/powershell-tips-tricks-for-developers/623284](http://stackoverflow.com/questions/622902/powershell-tips-tricks-for-developers/623284)







              - 

From James Brundage






        1.

       

Add inline help - even you will forget what some of your scripts do


        2.

       

Always output objects, so you can use the full joy of PowerShell


        3.

       

Split your scripts up into many functions: The bigger the script, the harder to understand.


        4.

       

Always write functions, not parameterized scripts.  No one likes jumping around the file system.


        5.

       

Even if you know the command line, give .NET a try.  The .NET framework is your friend.




              - 
                Shay [posted a couple of one-liners](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2010/01/19/quicktip-one-liners-to-get-winrm-port-numbers.aspx?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+ShayLevy+(Shay+Levy++-+$cript+Fanatic)) to get WinRM port numbers


              - 
                From Aleksandar Nikolik 




                      How to swap two (small) text files? Same as variables:





                      ${c:file1.txt},${c:file2.txt} = ${c:file2.txt},${c:file1.txt}





                      Works even in V1. 😉
