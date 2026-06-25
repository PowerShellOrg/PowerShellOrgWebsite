---
title: Episode 21 – One-half of Jeffrey Snover
authors:
  - Jonathan Walz
date: "2008-03-17T23:31:33+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-021.mp3"
aliases:
  - /2008/03/powerscripting-podcast-episode-21-one-half-of-jeffrey-snover/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

This week, our Intrepid Heroes talk about News in the PowerShell world, bring you fresh Resources from the wild Internet, and share their experiences in the Tips section, with you, the Listener. Oh--and we also interview JEFFREY SNOVER! In case you don't know who he is, he's basically like the Thomas Edison of scripting.

### Interview with Jeffrey Snover

And now a word from our sponsor:

> > _Our interview today is brought to you by_ [_Quest Software_][2]_. Quest LOVES PowerShell. Go to_ [_www.quest.com / PowerShell_][2] _and download their free graphical user interface, script editor and Active Directory commands. While you"™re there, join their online community where you can share ideas and get free useful commands.  Visit_ [_www.quest.com / powershell_][2] _today!_
> 
>  

Be sure to listen to the show for the interview. You can read a list of the questions [here][3]. The interview ran really long (which is awesome), but at an hour and a half, it was too long for our format. So, we decided to split it into two main chunks.  
There is stuff in this interview you 
have not heard anywhere else
 before, so check it out. Maybe some people don't like it when Jeffrey talks so long, but we sure did.

### News

  * VMware [has JUST released][4] their VI Toolkit for PowerShell to the public. If you use ESX Server, you need to check it out.
  * Great News! PowerShell Plus 1.0 [has been released][5]!
  * Coming later this year: [Managing VMWare with Windows PowerShell: TFM®!][6] to be published by Sapien Press.
  * The Windows SDK team is [seeking feedback][7] on how important it would be to you (or not) to have a PowerShell-based build environment. Click on the link above to leave your comments.

### Resources

Stay tuned, kids! We'll be back after a brief message from our sponsors.

> _The resource section today is sponsored by SDM Software:  
> "SDM Software provides innovative solutions that combine PowerShell  
> and Group Policy to help reduce the complexity of managing your  
> Windows systems. Their unique GPExpert Scripting Toolkit for  
> PowerShell, provides the means to automate the management of your  
> Group Policy Objects. To get more information about these products and download trial copies, visit_ [_sdmsoftware.com/powerscripting.php_][8]_."_ 

  * We've been reading Andy's [Get-PowerShell][9](get-powershell.com) blog lately, cool stuff, you should check it out. 
      * Andy's post about [Start a process][10]
  * VMware [released a lab manual][11] for their VI Toolkit with lots of examples.
  * [PowerShell Answers blog post][12] - Custom object, custom formatting
  * Dmitry from Quest [covers a new feature in PowerGUI][13] that converts VBScript to PowerShell.

### Tips

The Tips are brought to you today by our friends at ShellTools.

> _Did you know that PowerShell Plus is a great XML editor? In addition to .PS1 files, you can also work with .PS1XML help files and .PSC PowerShell Console files. Other new features include a really cool console preview pane in the editor which makes edit/test/correct workflow very easy. You can download it today at_ [_shelltools.com_][14]_._ 

  * Some notable built-in aliases you might not have noticed: 
      * diff -> compare-object
      * group -> group-object
      * iex -> invoke-expression
      * ii -> invoke-item
      * sleep -> start-sleep
      * sort -> sort-object
      * kill -> stop-process
  * We discuss [a forum post][15] which asks, "How can I verify a URL redirection?" We answer the question using the System.Net.HttpWebRequest .NET object.(from [powershellcommunity.org][16])
  * [Assign multiple variables in one expression][17] (Get-PowerShell blog). Andy gets all the air time today.

#### One-liner

This one-liner lets you quickly make a GUID (globally unique identifier):  
write ([string][guid]::NewGuid())  
Also don't forget to check our blog from time-to-time, we like to post little tidbits in-between shows like one-liners so don't miss out! Hal just posted a PowerShell kitchen timer one-liner today.  
Thanks for listening! You can send feedback to 
.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-021.mp3
 [2]: http://info.quest.com/QuestSoftwareSponsoredPodCastPowerscripting0132008
 [3]: http://docs.google.com/Doc?id=dfr496bh_49cmnn74gw
 [4]: http://blogs.vmware.com/vipowershell/
 [5]: http://blog.powershell.com/?p=12
 [6]: http://www.sapienpress.com/vmware.asp
 [7]: http://blogs.msdn.com/nandal/archive/2008/03/10/influence-the-future-of-windows-sdk-powershell-based-build-environment.aspx
 [8]: http://www.sdmsoftware.com/powerscripting.php
 [9]: http://get-powershell.com
 [10]: http://get-powershell.com/2008/02/22/powershell-function-start-proc/
 [11]: http://blogs.vmware.com/vipowershell/2008/03/hope-you-enjoye.html
 [12]: http://www.streamline-it-solutions.co.uk/blog/post/Custom-objects2c-custom-formatting.aspx
 [13]: http://dmitrysotnikov.wordpress.com/2008/03/14/vbscript-to-powershell-converter/
 [14]: http://shelltools.com
 [15]: http://powershellcommunity.org/Forums/tabid/54/forumid/1/view/topic/postid/1310/Default.aspx
 [16]: http://powershellcommunity.org
 [17]: http://get-powershell.com/2008/02/05/multi-variable-assignment-in-powershell/
