---
title: Episode 118 – James Hamilton and Thomas Lee on PowerShell Use in the Hotmail Team
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2010-07-12T03:33:14+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-118.mp3"
aliases:
  - /2010/07/episode-118-james-hamilton-and-thomas-lee-on-powershell-use-in-the-hotmail-team/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://traffic.libsyn.com/powerscripting/PSPodcast-118.mp3)


## 
In This Episode
 {#tiap}


Tonight on the PowerScripting Podcast we talk to James Hamilton of Microsoft and MVP Thomas Lee about using PowerShell on the Hotmail Team.


## News


*

Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory. Don"™t wait "“ visit [quest.com/powershellbook](http://quest.com/powershellbook) to register for your free copy or [quest.com/powerguipro](http://quest.com/powerguipro) and see why PowerShell and Quest PowerGUI are the ultimate Windows management tools.


 *
_  
_ 

  * Sapien [announces][1]{#rax9} Visual PowerShell 2011. [Q&A][2]{#c9jv}
  * Tweet from @jaykul: Save 37% on @[
Manning
](http://twitter.com/Manning) Books (including eBooks). Get your Windows [
#PowerShell
](http://twitter.com/search?q=%23PowerShell) in Action or PowerShell in Practice ...
[http://bit.ly/97qQ3D](http://bit.ly/97qQ3D)

  * Karl Prosser is working on [portable PowerShell ISE][3]{#dhgl}
  * Cool new PowerGUI stuff 
      * [Publish scripts to PoshCode from PowerGui][4]{#oi_b}
      * [Automatic alias expansion][5]{#jdtb}
  * Listener @sqlVariant just had his talk accepted to the SQL PASS summit! Title is: [The Dirty Dozen: PowerShell Scripts for the Busy DBA][6]
  * Coming soon: [VMware vSphere Pro Series 2][7]{#r8ln} featuring PowerCLI goodies from Hal!
  * User group news: 
      * [Atlanta: July 20th][8]{#cxze}
      * 


[SQLSaturday #49](http://www.sqlsaturday.com/49/eventhome.aspx) will be held Oct 16, 2010 at Seminole State College. They are actively seeking PowerShell papers, [submit yours today](http://www.sqlsaturday.com/49/callforspeakers.aspx)! Due date 7/16.




## Interview

#### 
Links:


  * [Hotmail tips the scales][9]
  * [A CONVERSATION WITH PHIL SMOOT - THE CHALLENGES OF MANAGING A MEGASERVICE][10]
  * [RichCopy][11]
  * [jEdit][12]

#### 
Questions:


  * SQLvariant: ##What's left of Windows Live now that Bing is out?
  * AaronHoover: ## chimed in a bit late and the Linux comment, but what % of management is done with PowerShell now?
  * esarakaitis: ##we have over 3,000 vm's we manage via powershell, we find that cmd-lets take too much time as compared to direct API calls, how do you handle it?
  * philiplavoie: ## will there be a powershell command line tool such as googleCL for hotmail/live mail done in powershell for us users? i.e http://code.google.com/p/googlecl/
  * pcgeek86: ## Do they use code signing certificates to sign all their scripts?
  * SQLvariant: ## Does the Hotmail team go beyond using PowerShell to just script?  Do they make interfaces that have PowerShell underneath like SCVMM?
  * AaronHoover: ## primarily monitor with WMI, or more?
  * SQLvariant: ##Does the team build any internal GUI tools that are built via PowerShell and/or have PowerShell underneath
  * esarakaitis: ##do you use service accounts? if so, how do you manage passwords with your powershell scripts?
  * AaronHoover: ##piggybacking on esarakaitis ? \--- Do you usse 2k8 MSA accounts for service passwords?
  * SQLvariant: ##Can you expand on the "Visualization through HTML."
  * philiplavoie: ## do they use powershell for any automated testing of new depoys / releases? load tests, scalability, failover, etc?
  * glnsize: ## was the switch to powershell a directive, or was it natural.
  * SQLvariant: @bj11 ## doe you use PowerShell in any of those XML generation tasks or rendering steps?
  * glnsize: ## when can I expect to see a hotmail provider 🙂
  * SQLvariant: @bj11 ##can you speak to any chalenges in working with large amounts of XML with PowerShell.  Do you run the scripts to gather from your desktops or a big server?
  * esarakaitis: ##what complications have you encountered using powershell? i know using a code repository was a stumbling block for us
  * glnsize: ## given your scale what's your opinion on v2 remoting.  have you used it and how has it performed for you...  (arrived late sorry if already covered)
  * SQLvariant: ##any best practices he wants to mention when dealing / parsing large amounts of XML?
  * esarakaitis: ##whats your favorite PS editor? (please say notepad++)
  * AaronHoover: ## is the WMI the primary way of gathering data?
  * esarakaitis: ##any hot PS profile tips?
  * esarakaitis: ##do you find yourself using built in cmd-lets or writing custom functions, etc..
  * philiplavoie: ## what limitations have you guys found with PS> where you've just needed to go another route?
  * AaronHoover: ## earlier there was a comment of \*only\* about 200 servers at a time, why not more?
  * Toshana: ## Are you using the readily available cmdlets, or custom written cmdlets or imported .net assemblies 
  * AaronHoover: ## thoughts to 'sell' ITIL when the org 'looked' at it and believe it is not for us?
  * SQLvariant: ##Bank of America had a comercial stating that they had \*at leat\* 4 data centers staffed and capable of running the whole company at any given time...
  * SQLvariant: ##How do you go about managing whose controlling what with which script in a scenario like that?

#### Superhero: superman / flight


  **
Resources
**


**  
**  
This segment is brought to you by [SAPIEN Technologies][13]{#hbu4}.

  * Checking free diskspace on Cluster Shared Volumes (CSV) with PowerShell: [http://bit.ly/b1AMR7][14]{#dxel}
  * [@beefarino][15]{#vy65} posted his "[PowerShell as a Tools Platform][16]{#w.7e}" slide deck from [Codestock 2010][17]{#izqc}.
  * [Inspecting Deleted AD Objects before Restore][18]{#yp4e}
  * Ed Wilson spoke to the Tampa PowerShell User Group today (7/8) about best practices and you can access the Live Meeting recording [here][19].
  * 
[cspshell](http://twitter.com/cspshell):
 21 User Information Commands to Run Before You Die 
[http://bit.ly/9QJ16l](http://bit.ly/9QJ16l)

  * [James O'Neil explorers the Image module][20]{#gtzy} from the [PowerShellPack][21]{#gcns}


  **
Tips
**


**  
**  
This segment is brought to you by [Serverfault.com][22]{#koax}!  
**  
** 

  * [Pull DNS data with PowerShell][23]{#s18x}
  * [Add help to your functions][24]{#pm1f}

 [1]: http://blog.sapien.com/index.php/2010/07/06/announcing-visual-powershell-2011-the-dedicated-powershell-editor/ "announces"
 [2]: http://blog.sapien.com/index.php/2010/07/08/visual-powershell-2011-qa/ "Q&A"
 [3]: http://karlprosser.com/coder/2010/06/16/portable-powershell-with-portable-powershell-ise/ "portable PowerShell ISE"
 [4]: http://dmitrysotnikov.wordpress.com/2010/06/25/publish-scripts-from-powergui-to-poshcode/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+DmitrysPowerblog+(Dmitry's+PowerBlog) "Publish scripts to PoshCode from PowerG"
 [5]: http://dmitrysotnikov.wordpress.com/2010/07/07/automatic-alias-expansion-in-script-editor/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+DmitrysPowerblog+(Dmitry's+PowerBlog) "Automatic alias expansion"
 [6]: http://sqlpass.eventpoint.com/topic/details/DBA237 "The Dirty Dozen: PowerShell Scripts for the Busy DBA"
 [7]: http://www.trainsignal.com/VMware-vSphere-Pro-Series-Training-Vol-2-P98.aspx "VMware vSphere Pro Series 2"
 [8]: http://powershellgroup.org/atlanta.ga "Atlanta: July 20th"
 [9]: http://windowsteamblog.com/windows_live/b/windowslive/archive/2010/04/07/hotmail-tips-the-scales.aspx "Hotmail tips the scales"
 [10]: http://queue.acm.org/detail.cfm?id=1113332 "A CONVERSATION WITH PHIL SMOOT - THE CHALLENGES OF MANAGING A MEGASERVICE"
 [11]: http://blogs.technet.com/b/keithcombs/archive/2009/03/22/richcopy-bulk-file-copy-tool-released-get-it-here.aspx "RichCopy"
 [12]: http://www.jedit.org/ "jEdit"
 [13]: http://sapien.com/ "SAPIEN Technologies"
 [14]: http://bit.ly/b1AMR7 "http://bit.ly/b1AMR7"
 [15]: http://twitter.com/beefarino "@beefarino"
 [16]: http://www.beefycode.com/post/CodeStock-2010-PowerShell-as-a-Tools-Platform.aspx "PowerShell as a Tools Platform"
 [17]: http://codestock.org/ "Codestock 2010"
 [18]: http://blogs.msdn.com/b/adpowershell/archive/2009/06/01/inspecting-deleted-objects-before-restore.aspx "Inspecting Deleted AD Objects before Restore"
 [19]: http://powershellgroup.org/content/powershell-best-practices "here"
 [20]: http://blogs.technet.com/b/jamesone/archive/2010/07/05/exploring-the-image-powershell-module.aspx "James O'Neil explorers the Image module"
 [21]: http://code.msdn.microsoft.com/PowerShellPack "PowerShellPack"
 [22]: http://serverfault.com/ "Serverfault.com"
 [23]: http://practicaladmin.wordpress.com/2010/07/05/taking-a-dump-dns/ "Pull DNS data with PowerShell"
 [24]: http://powershell.com/cs/blogs/tips/archive/2010/07/06/add-help-to-your-functions.aspx "Add help to your functions"
