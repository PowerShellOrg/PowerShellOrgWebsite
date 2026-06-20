---
title: Episode 138 – Parind Shah from EqualLogic
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2011-02-01T02:52:38+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-138.mp3"
aliases:
  - /2011/01/episode-138-parind-shah-from-equallogic/
---

**A Podcast about Windows PowerShell.**
 Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://traffic.libsyn.com/powerscripting/PSPodcast-138.mp3)


## 
In This Episode
 {#tiap}

Tonight on the PowerScripting Podcast, we talk to Parind Shah from Dell about EqualLogic and their new PowerShell module!

## News


  This segment is brought to you by Start-Automating


 


  *Start Scripting to Your Fullest Potential.  At Start-Automating, we can help you unleash the full Power of PowerShell V2.  You can use our deep PowerShell expertise to build rich PowerShell solutions, or we can train you to use PowerShell like a pro. Isn"™t it time you Save-Time, Save-Money, and Start-Automating?  Find out more at [Start-Automating.com](http://start-automating.com/).*


 

  * Marc van Orsouw will be [running the PowerShell Script Club in Zurich Feb 1st][1]{#vfir}
  * Don Jones is [seeking input on his upcoming advanced-level PowerShell book][2]{#xvgk}. Leave your comments on his blog!
  * [PowerWF celebrates a new release][3]{#ew2g}: 2.4 just shipped and includes PowerSE, a "Script Editor, console, intellisense, and powerful debugger"
  * [Idera ships PowerShell Plus v4 beta!][4]{#n.j5}
  * New to us, /n Software released [PowerShell eXplorer][5]{#h-3x} to the iTunes Market for IOS devices

## **
Interview
**


  The news is brought to you by [Don Jones' 2011 PowerShell Retreat in Las Vegas](http://www.windowsitpro.com/blogs/PowerShellwithaPurpose.aspx)


  **Links:**


  * [][6]<http://www.equallogic.com/>
  * [http://virtualisedreality.com/2010/12/17/dell-equallogic-powershell-quick-reference-guide/][7]{#d8x2}
  * <http://delltechcenter.com/>

#### Chatroom Buzz:


  21:47  ##when is storage monitoring coming to PowerShell?


  21:49  ## have your tried to get a consistent PowerShell story with other SAN manufacturers like Compellent?


  21:54  # was the top-down part of the push for PowerShell management part of an overall push @ dell?  There are a lot of dell hardware that could use specialized management


  21:54  # what do you have in mind for the 2nd release?


  22:08  right now there are 13 pages of jobs of PowerShell on LinkedIn


  23:44  @ joel, sure, but debug/verbose/warning are the lamest of all streams


**Superhero:** Software X-Ray Vision aka The Debugger aka BugBuster aka 
RAID
!


  **
Resources
**


This segment is brought to you by [SAPIEN Technologies][8]{#ke7l}

  * [Windows PowerShell Survival Guide][9]{#k_-0}
  * [Create DNS PTR records from PowerShell][10]{#teg9}
  * James Brundage made a cool add-on for [PowerGUI to control advanced PowerShell options][11]{#xzm1}
  * [Jaykul writes about using parentheses in PowerShell][12]{#cj00}
  * [The Scripting Guys have an article on parsing the event log using Get-WinEvent][13]{#j_k7}
  * Aaron Nelson has been posting [PowerShell Week at SQL University][14]{#iyee} info. More about [SQL University is at SQLChicken.com][15]{#c:di}
  * Don Jones has a bunch of PowerShell videos on his [YouTube channel!][16]{#tm60}

### Tips


  This segment brought to you by [ServerFault.com](http://serverfault.com/)


  * From Ravi: [Use Dropbox to share profiles across multiple systems][17]{#q192}
  * Get your logging on: 
      * [Oisin's script logger module][18]{#r.z.}
      * [Jaykul's NLog module][19]{#e:9j}
      * [Doug Finke's PSLog][20]{#vffa} (also an NLog wrapper)
      * [Log4Posh: PowerShell Log4Net wrapper][21]{#q-pz}
  * [What the heck is Finally for][22]{#k-w.}? (as in Try..Catch..Finally)
  * [Clear an AD attribute][23]{#n222}

 

### One-Liner of the Week!


Get-Service | Add-Member ScriptMethod ToString { $this.Name } -Force -PassThru | Group-Object Status

[And here is the PS1XML version][24]{#ghsr}

 [1]: http://swissitpro.ch/index.php?option=com_content&task=view&id=119&Itemid=2&lang=en-US "running the PowerShell Script Club in Zurich Feb 1st"
 [2]: http://www.windowsitpro.com/blogs/PowerShellwithaPurpose/tabid/2248/entryid/76081/Is-This-an-ADVANCED-PowerShell-Book-Youd-Read.aspx "seeking input on his upcoming advanced-level PowerShell book"
 [3]: http://blog.powerwf.com/post/2963576100/powerwf-2-4-has-been-released "PowerWF celebrates a new release"
 [4]: http://www.idera.com/Promo/PowerShell-Plus-Beta/ "Idera ships PowerShell Plus v4 beta!"
 [5]: http://itunes.apple.com/us/app/powershell-explorer/id393160935?mt=8 "PowerShell eXplorer"
 [6]: http://virtualisedreality.com/2010/12/17/dell-equallogic-powershell-quick-reference-guide/
 [7]: http://virtualisedreality.com/2010/12/17/dell-equallogic-powershell-quick-reference-guide/ "http://virtualisedreality.com/2010/12/17/dell-equallogic-powershell-quick-reference-guide/"
 [8]: http://www.sapien.com/ "SAPIEN Technologies"
 [9]: http://social.technet.microsoft.com/wiki/contents/articles/windows-powershell-survival-guide.aspx?wa=wsignin1.0 "Windows PowerShell Survival Guide"
 [10]: http://serverfault.com/questions/163612/create-ptr-records-from-existing-a-records-windows-dns "Create DNS PTR records from PowerShell"
 [11]: http://dmitrysotnikov.wordpress.com/2011/01/24/advanced-powershell-options-in-powergui-script-editor/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+DmitrysPowerblog+(Dmitry's+PowerBlog) "PowerGUI to control advanced PowerShell options"
 [12]: http://huddledmasses.org/parenthesis-in-powershell/ "Jaykul writes about using parentheses in PowerShell"
 [13]: http://blogs.technet.com/b/heyscriptingguy/archive/2011/01/24/use-powershell-cmdlet-to-filter-event-log-for-easy-parsing.aspx "The Scripting Guys have an article on parsing the event log using Get-WinEvent"
 [14]: http://sqlvariant.com/wordpress/index.php/2011/01/powershell-week-at-sql-university-post-4/ "PowerShell Week at SQL University"
 [15]: http://sqlchicken.com/sql-university "SQL University is at SQLChicken.com"
 [16]: http://www.youtube.com/user/ConcentratedDon?feature=mhum "YouTube channel!"
 [17]: http://www.ravichaganti.com/blog/?p=1963 "Use Dropbox to share profiles across multiple systems"
 [18]: http://www.nivot.org/2009/08/19/PowerShell20AConfigurableAndFlexibleScriptLoggerModule.aspx "Oisin's script logger module"
 [19]: http://poshcode.org/1858 "Jaykul's nLog module"
 [20]: http://pslog.codeplex.com/ "Doug Finke's PSLog"
 [21]: http://log4posh.codeplex.com/ "Log4Posh: PowerShell Log4Net wrapper"
 [22]: http://chrisfulstow.com/dispose-try-catch-and-using/ "What the heck is Finally for"
 [23]: http://dmitrysotnikov.wordpress.com/2011/01/27/clear-ad-attribute/ "Clear an AD attribute"
 [24]: http://powershell.pastebin.com/0KGa1sH0 "And here is the PS1XML version"
