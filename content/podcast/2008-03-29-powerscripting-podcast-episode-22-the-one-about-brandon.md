---
title: Episode 22 – The One About Brandon
authors:
  - Jonathan Walz
date: "2008-03-29T14:57:02+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-022.mp3"
aliases:
  - /2008/03/powerscripting-podcast-episode-22-the-one-about-brandon/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

## In This Episode

Today we'll bring you the second half of our interview with Jeffrey Snover. We think this part is even better than the first half. We've also got some news, resources, and a bunch of PowerShell tips for you.

## News

The News today is sponsored by SDM Software:

> _"SDM Software provides innovative solutions that combine PowerShell and Group Policy to help reduce the complexity of managing your Windows systems. Their unique GPExpert Scripting Toolkit for PowerShell, provides the means to automate the management of your Group Policy Objects. To get more information about these products and download trial copies, visit_ [_sdmsoftware.com/powerscripting.php_][2]_."_

  * NEW: [NetCmdlets V2.0 - BETA][3]. NetCmdlets V2 is packed full of exciting new features including [PowerShell Server][4] (_formerly PowerShell Remoting_), Parameter Sets, Object Pipelining, and new Cmdlets for SSH Enabled Remoting and Amazon Web Services (S3) Integration. (Thanks to [Jeffrey][5] and [Marco][6].)
  * //o// has updated his PowerShell WMI Explorer for the CTP so you can [use alternate credentials][7]

## Interview with Jeffrey Snover

Our interview today is brought to you by [Quest Software][8].

> _Quest LOVES PowerShell. Go to_ [_www.quest.com / PowerShell_][8] _and download their free graphical user interface, script editor and Active Directory commands. While you"™re there, join their online community where you can share ideas and get free useful commands. Visit_ [_www.quest.com / powershell_][8] _today!_ 

Be sure to listen to the show for the interview. You can read a list of the questions [here][9].

## Resources

  * Check out Bart De Smet's [B#.NET blog][10], he's written some good stuff about PowerShell v2 CTP.
  * PowerShell Basics [Episode 2][11] is up "Discoverability"
  * [The Power of LDAP Filters][12] from Brandon Shell
  * [A collection of LDAP Filter Info][13] from Brandon Shell
  * New Technet Webcast: [Using Virtual Machine Manager and Windows PowerShell to Deploy HP Windows Server 2008 Academy Labs (Level 300][14] _"This fast-paced webcast summarizes the IT professional experience of using a Windows PowerShell script and Virtual Machine Manager to automate the deployment of virtual machines (VMs)."_

## Tips

The Tips are brought to you today by ShellTools.

> _Did you know that PowerShell Plus is a great XML editor? In addition to .PS1 files, you can also work with .PS1XML help files and .PSC PowerShell Console files. Other new features include a really cool console preview pane in the editor which makes edit/test/correct workflow very easy. You can download it today at_ [_shelltools.com_][15]_._ 

  * Brandon Shell from the BSonPosh blog [wrote a cool script][16]which times the replication of objects in an Active Directory. Here are the features: 
      * Finds all Domain Controllers in the Domain (using .NET)
      * Creates a contact object in a specified OU (Default is users container for the Domain)
      * Gets the start Time
      * Loops and Checks each DC for the object.
      * Once all DCs have the object it gets End Time
  * Newsgroup posts: 
      * Hal explains how to explore WMI in the command-line:
      *   * ["Win32_NetworkAdapter" -namespace "rootCIMV2" -Filter AdapterTypeId=0][17]
      * Shay elaborates on adding ScriptMethods to custom objects: 
          * [PowerShell Custom Objects][18]
  * Bart De Smet wrote [a cool introduction to Script Cmdlets][19] in PowerShell v2 CTP. It will be incredibly easy to write more robust scripts that have features such as mandatory parameters and "it just works" pipeline support. He also talks about -confirm and -whatif support. Very neat stuff.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-022.mp3
 [2]: http://www.sdmsoftware.com/powerscripting.php
 [3]: http://www.nsoftware.com/powershell/
 [4]: http://www.nsoftware.com/powershell/server/
 [5]: http://blogs.msdn.com/powershell/archive/2008/03/27/powershell-remoting-using-ssh.aspx
 [6]: http://marcoshaw.blogspot.com/2008/03/netcmdlets-v2.html
 [7]: http://thepowershellguy.com/blogs/posh/archive/2008/03/05/powershell-wmi-explorer-update-for-powershell-v2-ctp.aspx
 [8]: http://info.quest.com/QuestSoftwareSponsoredPodCastPowerscripting0132008
 [9]: http://docs.google.com/Doc?id=dfr496bh_49cmnn74gw
 [10]: http://community.bartdesmet.net/blogs/bart/default.aspx
 [11]: http://powershell-basics.com/2008/03/06/show-2-discoverability/
 [12]: http://bsonposh.com/modules/wordpress/?p=78
 [13]: http://bsonposh.com/modules/wordpress/?p=101
 [14]: http://msevents.microsoft.com/cui/WebCastEventDetails.aspx?culture=en-US&EventID=1032369390&CountryCode=US
 [15]: http://shelltools.com/
 [16]: http://bsonposh.com/modules/wordpress/?p=88
 [17]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_frm/thread/23c5f02124535bf3/4df38dae0585f88f#4df38dae0585f88f
 [18]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_frm/thread/380b65458dc6da01/3e0c2980fea1a925?lnk=st&q=powershell+custom+objects#3e0c2980fea1a925
 [19]: http://community.bartdesmet.net/blogs/bart/archive/2008/03/22/windows-powershell-2-0-feature-focus-script-cmdlets.aspx
