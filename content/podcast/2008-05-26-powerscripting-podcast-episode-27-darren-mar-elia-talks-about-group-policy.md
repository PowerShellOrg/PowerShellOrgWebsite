---
title: Episode 27 – Darren Mar-Elia talks about Group Policy
authors:
  - Jonathan Walz
date: "2008-05-26T18:04:44+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-027.mp3"
aliases:
  - /2008/05/powerscripting-podcast-episode-27-darren-mar-elia-talks-about-group-policy/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

We have an interview this week with noted group policy expert, Darren Mar-Elia.  And we have no news for you today, but a lot of resources, tips, and one-liners to ease your scripting pains.  And don't forget about Quest's excellent book giveaway offer.  Keep listening for details on that.

### Interview

_Interview sponsored by_ [_iTripoli_][2]_._  
_Admin Script Editor provides a true integrated scripting environment for PowerShell.  Advanced features include an integrated PowerShell debugger, advanced code generating tools for Active Directory, Databases, XML files and more.  Let's not forget about the exclusive PowerShell forms designer. What's coming up? Soon its innovative and feature-rich ScriptPackger tool will offer support for the dynamic installation of cmdlets! Come see for yourself-- Admin Script Editor v3.5 is availble for a 45 day trial at_ [_AdminScriptEditor.com_][3]_._  
Be sure to listen to the show for the interview, it's a great one!

### Resources

This segment is sponsored by our friends at [Sapien][4].

  * //o// wants us to know that WPF is not only useful for Administrators with a "[Hello World" WPF application][5] and [another cool demo][6] showing some additional possibilities.
  * From Dmitry's PowerBlog, [Manage Firewall with PowerShell/PowerGUI][7] 
      * New powerpack available for PowerGUI which lists your Windows Firewall rules in a table and has useful actions

  * [Select-StringRecurse][8] function from Jared Par
  * A PowerShell version of the Scriptomatic (found on [Richard Siddaway's blog][9] )

### Tips

_The tips this week are brought to you by_ [_Quest Software_][10]_._  
_For a limited time, Quest is offering Powerscripting Podcast listeners a free copy of Jeffery Hicks upcoming book, Managing Active Directory with Windows PowerShell: TFM from Sapien Press._  
_Go to_ [_www.quest.com/powerscripting_][10] _to register for your copy and download their free graphical user interface, script editor and Active Directory commands._

  * [Newsgroup thread: Why are files created by Powershell twice as large?][11]
  * John Cook has a new blog post that talks about customizing the [PowerShell command prompt][12]

  * Blog post from Lance's TextBox: [Using PSCredentials without a prompt][13]

### One-Liner

\# Find files not touched in the last month  

dir | ? { $_.LastWriteTime -le ([datetime]::Now).AddDays(-30) } | rm -whatif

\# From Keith Hill on [the newsgroup][14], a quick replacement for the pslist.exe util from Sysinternals  

Get-Process PowerShell | Select ProcessName -Expand Modules


 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-027.mp3
 [2]: http://itripoli.com/
 [3]: http://AdminScriptEditor.com
 [4]: http://sapien.com
 [5]: http://thepowershellguy.com/blogs/posh/archive/2008/05/19/wpf-from-powershell-the-making-of-the-wpf-wmi-explorer-part1.aspx
 [6]: http://thepowershellguy.com/blogs/posh/archive/2008/05/19/more-things-to-do-with-xaml-from-powershell.aspx
 [7]: http://dmitrysotnikov.wordpress.com/2008/05/12/manage-firewall-with-powershell-powergui/
 [8]: http://blogs.msdn.com/jaredpar/archive/2008/01/21/a-smarter-select-stringrecurse.aspx
 [9]: http://richardsiddaway.spaces.live.com/Blog/cns%2143CFA46A74CF3E96%211336.entry
 [10]: http://www.quest.com/powerscripting
 [11]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_thread/thread/05fd37d936e5d70b#
 [12]: http://www.johndcook.com/blog/2008/05/12/customizing-the-powershell-command-prompt/
 [13]: http://geekswithblogs.net/Lance/archive/2007/02/16/106518.aspx
 [14]: http://groups.google.com/group/microsoft.public.windows.powershell/browse_thread/thread/d114073b7b33defd#
