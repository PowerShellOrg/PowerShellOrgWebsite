---
title: Episode 60 – Scripting UI with Joel Bennett and James Brundage
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-02-23T04:08:31+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-060.mp3"
aliases:
  - /2009/02/episode-60-scripting-ui-with-joel-bennett-and-james-brundage/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]



## 
    In This Episode





    Tonight on the PowerScripting Podcast we talk with Joel Bennett and James Brundage about scriptable user interfaces.




## 
    News





     





    **





     
 *






        When it comes to scripting, you"™re a warrior. But mighty warriors need mighty tools! For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.
 ***





        ******





        **





        *

Is your scripting might equal to the challenge? Put the power in your hands "“ 
*

*
[download PowerGUI today](http://info.quest.com/QuestSoftwareSponsoredPodcastPowerScripting110408)
*











        - 
          Antoine
 
[blogged about v0.4 of PoshBoard](http://devinfra-us.blogspot.com/2009/02/poshboard-04-webcast-on-techdays-2009.html)
 
and his presentation given at Techdays 2009 France


        - 
          [PrimalScript 2009 released](http://blog.sapien.com/index.php/2009/02/16/primalscript-2009-released/)!


        - 
          Upcoming PowerShell UK UG schedules
 
[have been posted](http://richardsiddaway.spaces.live.com/Blog/cns!43CFA46A74CF3E96!2082.entry)


        - 
          Karl Prosser
 
[blogs about](http://karlprosser.com/coder/2009/02/03/tobias-and-idera-make-powershellplus-21-beta-public/)
 
the new release of PowerShellPlus 2.1 beta










## 
        Interview 





         





        **





         
 *










                *







                  This segment is brought to you by Idera:





                  Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to [www.idera.com/PodcastPeople](http://www.idera.com/PodcastPeople) to get your copy today!





                     





                    - 
                      dougchase : ## What do we need to do to get started with this stuff?


                    - 
                      jkavanagh58 : ## Is PrimalForms WPF?


                    - 
                      dougchase : ## Does it work in V1 and how do I implement it in V1?  Seems like I read it worked in both versions but I couldn't figure out how to start using it in V1.


                    - 
                      ChadMiller : ##Haven't looked at WPF. Can you write a web page in WPF like powershellasp?


                    - 
                      rfoust : ## can you recommend a site to understand the basics of WPF?


                    - 
                      hal: Will these scriptable UI tools be able to replace HTA?


                    - 
                      jasonmarcher : ## How easy is it to create data templates and add them to existing tools/controls







                     











                  > 

> *New-Grid -Rows 5 {    *
 *    New-Label "Please Enter Your Name" *
 *    New-TextBox -Name YourName -Row 1 *
 *    New-Label "Sex:" -Row 2*
 *    New-StackPanel -Row 3 {*
 *        New-RadioButton -Content "Male" -IsChecked $true *
 *        New-RadioButton -Content "Female" -Column 1*
 *    }*
 *    New-Button "Done" -Row 4 -On_Click { *
 *        $yourName = $window | Get-ChildControl YourName *
 *        $sex = $window | *
 *            Get-ChildControl | *
 *            Where-Object {*
 *               $_ -is [Windows.Controls.RadioButton] -and*
 *               $_.IsChecked*
 *            } | *
 *            Foreach-Object {*
 *                $_.Content*
 *            }*
 *        if (-not $yourName.Text) {*
 *            [Windows.Messagebox]::show("Who are you?")*
 *        }*
 *        $global:information = New-Object Object |*
 *            Add-Member NoteProperty Name $yourName.Text -PassThru |*
 *            Add-Member NoteProperty Sex $sex -PassThru        *
 *        $window.Close()*
 *    }*
 *} -show*
> 






## 
                      Resources





                      **





                      This segment is brought to you by
 
[SAPIEN Technologies](http://sapien.com/).





                      - 
                        Steve Murawski has a
 
[several part series](http://blog.usepowershell.com/category/net-framework/introduction/)
 
talking about using the .NET framework from PowerShell. ([part 1](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-terminology-part-1/),
 
[part 2a](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-calling-a-method-part-2a/),
 
[part 2b](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-calling-a-method-part-2b/))


                      - 
                        Andy did a
 
[blog post](http://get-powershell.com/2009/02/17/a-method-to-the-add-member-madness/)
 
that talks about custom objects


                      - 
                        PoshCode script:
 
[Compare-DatabaseSchema](http://poshcode.org/865)


                      - 
                        Lee Holmes
 
[posted a fun script to make perfect change](http://www.leeholmes.com/blog/MakingPerfectChangeWithTheFewestCoins.aspx)


                      - 
                        James O'Neill
 
[posts some scripts](http://blogs.technet.com/jamesone/archive/2009/02/18/how-to-manage-the-windows-firewall-settings-with-powershell.aspx)
 
for working with the Vista/W7/Server 2008 firewall


                      - 
                        Joel has written a
 
[scriptable SSH client](http://huddledmasses.org/scriptable-ssh-from-powershell/)
 
in Powershell using an external .NET library









                         








## 
                        Tips

 







                        - 
                          From StackOverflow.com:
 
[How to get the actual size-on-disk of a file from PowerShell?](http://stackoverflow.com/questions/554010/how-to-get-the-actual-size-on-disk-of-a-file-from-powershell)


                        - 
                          Shay posted some information about
 
[using help in PowerShell ISE](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2009/01/31/using-help-in-powershell-ise.aspx)










## 
                        Gotcha





                        - 
                          Kirk Munro has an
 
[awesome blog post](http://poshoholic.com/2009/02/18/powershell-deep-dive-understanding-get-alias-wildcards-escape-characters-quoting-rules-literal-vs-non-literal-paths-and-the-timing-of-string-evaluation/)
 
talking about a quite wicked gotcha involving quoting rules and escape characters.











                     









 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-060.mp3
