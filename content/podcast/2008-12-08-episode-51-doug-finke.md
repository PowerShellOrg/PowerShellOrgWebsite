---
title: Episode 51 – Doug Finke
authors:
  - Jonathan Walz
date: "2008-12-09T04:35:53+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-051.mp3"
aliases:
  - /2008/12/episode-51-doug-finke/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]



## 
    In This Episode





    Today on the PowerScripting Podcast we interview Doug Finke, software developer and blogger. Plus our usual news, resources, and tips.




## 
    News





    *What can you really do with PowerShell?  With Admin Script Editor the question becomes what ****can't**** you do with PowerShell?  Besides all the advanced code generating tools this is the only tool offering a true PowerShell Forms Designer.  To illustrate what can be done the guys at iTripoli created a full-featured MP3/Podcast player written entirely in PowerShell and delivered as a single script.  Check it out at *[*adminscripteditor.com/player*](http://adminscripteditor.com/player)*.*





    - 


        Version 2 will have inline help for your functions, just like a cmdlet! You can see what the syntax looks like on [
this post
](http://blogs.msdn.com/mediaandmicrocode/archive/2008/12/01/microcode-powershell-scripting-tricks-scripting-the-web-part-1-get-web.aspx)

 on [
James Brundage's Media


and Microcode blog

](http://blogs.msdn.com/mediaandmicrocode)
.




        - 

The guys at the Get-Scripting podcast are running a little contest to win a copy of Jeffrey Hicks' Managing AD with PowerShell: TFM book. To win, you just need to make captions for [this picture](http://get-scripting.blogspot.com/2008/12/episode-5-competition-win-print-copy-of.html)

 from TechEd EMEA. Should be fun.



        - 

[PrimalScript 2009 preview](http://hosted.verticalresponse.com/172892/2e800d2b75/176000219/56208e9fa1/) ([screenshot](http://www.primalscript.com/images/newsletter/primalscript2009.png))




        - 

New Codeplex project: [SharePoint PowerShell Deploy](http://www.codeplex.com/sharepointpdeploy) 



        - 

There's now a [SQL](http://powershellcommunity.org/Forums/tabid/54/afv/topicsview/aff/24/Default.aspx)

 and [SharePoint](http://powershellcommunity.org/Forums/tabid/54/afv/topicsview/aff/23/Default.aspx)

forum on [PowerShellCommunity.org](http://powershellcommunity.org/)





        - 

Windows 7's [got a troubleshooting tool](http://www.istartedsomething.com/20081106/windows-7-to-revolutionize-pc-troubleshooting/)

 that's going to be based on PowerShell.









### 
            Interview









            **





            *This segment is brought to you by Idera:*





            *Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to [
www.idera.com/PodcastPeople
](http://www.idera.com/PodcastPeople) to get your copy today!*











Doug has been doing software development for more than 25 years. He started on the Mainframe as a Basic Assembly Language developer. The first scripting languages he encountered were REXX and CLIST. He saw how productive these approaches were and sought them out in each new environment he worked with. He has played with Lua, Tcl/tk, Ruby, Python, Groovy and PowerShell since it was called Monad.






                    Doug currently works at [Lab49](http://lab49.com/)

a technology consulting firm that builds advanced solutions for the financial services industry in NY and London.
 He has written articles on PowerShell appearing in Dr. Dobb's Journal. You can catch up with Doug at his blog at [dougfinke.com/blog](http://dougfinke.com/blog).
















                      - 
                        glnsize : ## What feature of V2 are you the most excited about?


                      - 
                        steve-PSB : ##Do you know why NetMap does not seem to be available on Codeplex now?


                      - 
                        JeffHicks : ##are there cmdlets for any of this stuff or do I have to code with .NET classes?


                      - 
                        glnsize : ##  Are the IT shops at your customers familiar with powershell?  Or are you having to sell powershell from the ground up.


                      - 
                        GrantSteinfeld : ##Dougs showed us how M will be really helpful in creating event driven system, Doug could maybe speak about that?















### 
                          Resources





                          **







                            *
When it comes to scripting, you"™re a warrior. But mighty warriors need mighty tools!
**
For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.
*











                                  *
Is your scripting might equal to the challenge? Put the power in your hands "“ 
*
[
*
download PowerGUI today
*
](http://info.quest.com/QuestSoftwareSponsoredPodcastPowerScripting110408)
*
.
*











                            **







                              - 
                                PoshCode script: [elevate-process (sudo)](http://poshcode.org/696)


                              - 
                                TurboChargeAD.org has been doing some nice posts on the quest cmdlets. Here are some: 


                                    [New-QADUser](http://feeds.feedburner.com/~r/turbochargead/~3/466954168/)




                                  - 
                                    [Set-QADUser](http://feeds.feedburner.com/~r/turbochargead/~3/459894327/)




                                  - 
                                    [Get-QADUser](http://feeds.feedburner.com/~r/turbochargead/~3/452090413/)








                              - 
                                [Get-Drivespace](http://www.blkmtn.org/PowerShell_Function_Get-DriveSpace) script from Sepeck


                              - 
                                [New video introducing Hyper-V powerpack](http://poshoholic.com/2008/11/17/introduction-to-the-hyper-v-powerpack-screencast/)

 from Kirk Munro










### 
                              Tips







                                - [Speed up PowerShell V1 with update-GAC](http://blogs.msdn.com/powershell/archive/2008/09/02/speeding-up-powershell-startup-updating-update-gac-ps1.aspx)...why?




                                  - [The joy of hashtables](http://blogs.msdn.com/mediaandmicrocode/archive/2008/11/27/microcode-powershell-scripting-tricks-the-joy-of-using-hashtables-with-windows-powershell.aspx)







### 
                                      Gotcha





                                      A friend of Hal's noticed that the output from these three commands were all different:







                                        - 
                                          repladmin /? # looks as expected


                                        - 
                                          $a = repladmin /? # has double line-feeds


                                        - 
                                          (New-Object system.Net.Mail.MailMessage).Body = repladmin /? # has no linefeeds!









                                          Jin Truher from Microsoft writes in response:









                                          > 

> *I believe that this is because the application itself is written with printf statements that look like this:*
 *printf("zazoorrn");*
 *(note the multiple use of "r") which confuse PowerShell a bunch - other applications do this too (ipconfig, for one)*
> 











                                                  He goes further to say that he found this out by using a tool from MS Services for Unix which was funny.  🙂







                                                    You can work around issues like this by using the string.split() method.









### 
                                                        Mailbox








### 


This is from listener Dale:










                                                  > 

> 
*I just wanted to let you know that I have found another option that looks a lot more approachable as an object store via Powershell.  It's a database VERY similar to DB4O with Dual Licensing almost the same as well.  It's called "Perst", and it is at:*


[*http://www.mcobject.com/perst*](http://www.mcobject.com/perst)


*I've been playing with it this afternoon, and it seems to be MUCH more accessible than DB4O via PowerShell.*

> 


 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-051.mp3
