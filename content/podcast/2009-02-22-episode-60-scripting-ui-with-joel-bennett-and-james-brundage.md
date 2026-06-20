---
title: Episode 60 – Scripting UI with Joel Bennett and James Brundage
author: Jonathan Walz
authors:
  - Jonathan Walz
  - Joel Bennett
  - James Brundage
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





    Â 





    **





    Â 
 *






        WhenÂ itÂ comesÂ toÂ scripting,Â you"™reÂ aÂ warrior.Â ButÂ mightyÂ warriorsÂ needÂ mightyÂ tools!Â For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.
 ***





        ******





        **





        *

Is your scripting might equal to the challenge? Put the power in your hands "“Â 
*

*
[download PowerGUI today](http://info.quest.com/QuestSoftwareSponsoredPodcastPowerScripting110408)
*











        - 
          Antoine
Â 
[blogged about v0.4 of PoshBoard](http://devinfra-us.blogspot.com/2009/02/poshboard-04-webcast-on-techdays-2009.html)
Â 
and his presentation given at Techdays 2009 France


        - 
          [PrimalScript 2009 released](http://blog.sapien.com/index.php/2009/02/16/primalscript-2009-released/)!


        - 
          Upcoming PowerShell UK UG schedules
Â 
[have been posted](http://richardsiddaway.spaces.live.com/Blog/cns!43CFA46A74CF3E96!2082.entry)


        - 
          Karl Prosser
Â 
[blogs about](http://karlprosser.com/coder/2009/02/03/tobias-and-idera-make-powershellplus-21-beta-public/)
Â 
the new release of PowerShellPlus 2.1 beta










## 
        InterviewÂ 





        Â 





        **





        Â 
 *










                *







                  This segment is brought to you by Idera:





                  Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go toÂ [www.idera.com/PodcastPeople](http://www.idera.com/PodcastPeople)Â to get your copy today!





                    Â 





                    - 
                      dougchase : ## What do we need to do to get started with this stuff?


                    - 
                      jkavanagh58 : ## Is PrimalForms WPF?


                    - 
                      dougchase : ## Does it work in V1 and how do I implement it in V1? Â Seems like I read it worked in both versions but I couldn't figure out how to start using it in V1.


                    - 
                      ChadMiller : ##Haven't looked at WPF. Can you write a web page in WPF like powershellasp?


                    - 
                      rfoust : ## can you recommend a site to understand the basics of WPF?


                    - 
                      hal: Will these scriptable UI tools be able to replace HTA?


                    - 
                      jasonmarcher : ## How easy is it to create data templates and add them to existing tools/controls







                    Â 











                  > 

> *New-Grid -Rows 5 { Â  Â *
 *Â Â  Â New-Label "Please Enter Your Name"Â *
 *Â Â  Â New-TextBox -Name YourName -Row 1Â *
 *Â Â  Â New-Label "Sex:" -Row 2*
 *Â Â  Â New-StackPanel -Row 3 {*
 *Â Â  Â  Â  Â New-RadioButton -Content "Male" -IsChecked $trueÂ *
 *Â Â  Â  Â  Â New-RadioButton -Content "Female" -Column 1*
 *Â Â  Â }*
 *Â Â  Â New-Button "Done" -Row 4 -On_Click {Â *
 *Â Â  Â  Â  Â $yourName = $window | Get-ChildControl YourNameÂ *
 *Â Â  Â  Â  Â $sex = $window |Â *
 *Â Â  Â  Â  Â  Â  Â Get-ChildControl |Â *
 *Â Â  Â  Â  Â  Â  Â Where-Object {*
 *Â Â  Â  Â  Â  Â  Â  Â  $_ -is [Windows.Controls.RadioButton] -and*
 *Â Â  Â  Â  Â  Â  Â  Â  $_.IsChecked*
 *Â Â  Â  Â  Â  Â  Â } |Â *
 *Â Â  Â  Â  Â  Â  Â Foreach-Object {*
 *Â Â  Â  Â  Â  Â  Â  Â  Â $_.Content*
 *Â Â  Â  Â  Â  Â  Â }*
 *Â Â  Â  Â  Â if (-not $yourName.Text) {*
 *Â Â  Â  Â  Â  Â  Â [Windows.Messagebox]::show("Who are you?")*
 *Â Â  Â  Â  Â }*
 *Â Â  Â  Â  Â $global:information = New-Object Object |*
 *Â Â  Â  Â  Â  Â  Â Add-Member NoteProperty Name $yourName.Text -PassThru |*
 *Â Â  Â  Â  Â  Â  Â Add-Member NoteProperty Sex $sex -PassThru Â  Â  Â  Â *
 *Â Â  Â  Â  Â $window.Close()*
 *Â Â  Â }*
 *} -show*
> 






## 
                      Resources





                      **





                      This segment is brought to you by
Â 
[SAPIEN Technologies](http://sapien.com/).





                      - 
                        Steve Murawski has a
Â 
[several part series](http://blog.usepowershell.com/category/net-framework/introduction/)
Â 
talking about using the .NET framework from PowerShell. ([part 1](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-terminology-part-1/),
Â 
[part 2a](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-calling-a-method-part-2a/),
Â 
[part 2b](http://blog.usepowershell.com/2009/02/exploring-the-net-framework-with-powershell-calling-a-method-part-2b/))


                      - 
                        Andy did a
Â 
[blog post](http://get-powershell.com/2009/02/17/a-method-to-the-add-member-madness/)
Â 
that talks about custom objects


                      - 
                        PoshCode script:
Â 
[Compare-DatabaseSchema](http://poshcode.org/865)


                      - 
                        Lee Holmes
Â 
[posted a fun script to make perfect change](http://www.leeholmes.com/blog/MakingPerfectChangeWithTheFewestCoins.aspx)


                      - 
                        James O'Neill
Â 
[posts some scripts](http://blogs.technet.com/jamesone/archive/2009/02/18/how-to-manage-the-windows-firewall-settings-with-powershell.aspx)
Â 
for working with the Vista/W7/Server 2008 firewall


                      - 
                        Joel has written a
Â 
[scriptable SSH client](http://huddledmasses.org/scriptable-ssh-from-powershell/)
Â 
in Powershell using an external .NET library









                        Â 








## 
                        Tips

Â 







                        - 
                          From StackOverflow.com:
Â 
[How to get the actual size-on-disk of a file from PowerShell?](http://stackoverflow.com/questions/554010/how-to-get-the-actual-size-on-disk-of-a-file-from-powershell)


                        - 
                          Shay posted some information about
Â 
[using help in PowerShell ISE](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2009/01/31/using-help-in-powershell-ise.aspx)










## 
                        Gotcha





                        - 
                          Kirk Munro has an
Â 
[awesome blog post](http://poshoholic.com/2009/02/18/powershell-deep-dive-understanding-get-alias-wildcards-escape-characters-quoting-rules-literal-vs-non-literal-paths-and-the-timing-of-string-evaluation/)
Â 
talking about a quite wicked gotcha involving quoting rules and escape characters.











                    Â 









 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-060.mp3
