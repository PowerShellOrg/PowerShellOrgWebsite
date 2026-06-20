---
title: "Episode 128 \"“ Kirk Munro from Quest on the 2010 PowerPack Challenge"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2010-10-15T03:50:28+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-128.mp3"
aliases:
  - /2010/10/episode-128-kirk-munro-from-quest-on-the-2010-powerpack-challenge/
---

**A Podcast about Windows PowerShell.**
 Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://traffic.libsyn.com/powerscripting/PSPodcast-128.mp3)



## 
    In This Episode





    Tonight on the PowerScripting Podcast, we talk to Kirk Munro from Quest Software about PowerGUI Pro and the 2010 PowerPack Challenge! 



## News

Execute commands and scripts from anywhere including the office and remote locations, as well as from a Web browser or smart phone with PowerGUI Pro from Quest Software. With the MobileShell feature, administrators can quickly run commands to troubleshoot problems or make changes, even when away from your desk! This gives teams more flexibility to work remotely while traveling, and to leverage admins from other offices in case of an emergency.  
_·         Execute queries remotely to determine if services or processes are running_  
_·         Restart services, processes, or entire servers_  
_·         Check mailbox settings_  
_·         Unlock user accounts_  
_·         Reset passwords_  
_·         Run custom scripts_  
Visit [quest.com/powerguipro][1]{#i040} and see why PowerShell and Quest PowerGUI are the ultimate Windows management tools.

  * [Central Ohio PowerShell User Group next meeting: Oct 27th][2]{#w4ye}
  * There are plans in the works for [PowerShell sessions during the Worldwide Online TechDay 2010][3]{#ze-4}
  * [Automating Administration with Windows PowerShell 2.0][4]{#e5zg}
  * Congrats to our new PowerShell MVP: Efran Cobisi from [PowerShell.IT][5]{#i5kd}

 

## **Interview**

Our interview is brought to you by SAPIEN Technologies, makers of PrimalScript and PrimalForms.  
Links:

  * PowerGUI Add-ons: 
      * [PowerGUI Online][6]{#sfkn}
      * [Expand Aliases][7]{#aei7}
  * [PowerGUI Challenge 2010][8]{#hk20}

#### Chatroom Buzz

  *  Can the version control features in PowerGUI Pro help keep a consistent scripting environment from multiple places? Home, Work, Laptop etc.

**Hero - [Taskmaster][9]{#fvpp}**

## **Resources**

This segment brought to you by [ServerFault.com][10]{#u8o0}

  * Use PowerShell to [scan ports on multiple hosts][11]{#ntz-}
  * PowerWF tutorial: [Integration with Service Manager][12]{#vitk}
  * [Did you know Quest's AD cmdlets now include support for automating PKI?][13]{#vuw6}
  * [Kirk Munro explains how to create add-ons for PowerGUI][14]{#e1zc}
  * [New Technet page][15]{#m_rs} lists PowerShell "features" offered by various product groups within Microsoft
  * Don Jones is [working on a PowerShell punctuation cheat sheet][16]{#basa}

**  
Tips**

  * Carl writes to the podcast: 
      * for (;;){Sleep -s 5; netstat -an | ss "TIME_WAIT" | ss ":443" | mo -line}
  * Aaron H writes to the podcast: 
      * Use Start-Transcript in your profile and have it write to a network share with your username, date, etc. in the filename.
      * Use Write-Verbose to comment a script
      * Grab a user logged on by grabbing the username of the explorer.exe process.
  * Greg reminds us that both the forward and backwards slash will work as path separators
  * Gregg-with-two-G's says to go to SQL Saturday!
  * Ken says: 
      * You can find lots of goodies in Twitter, especially by following [Hal][17]{#kdi9} & [Jon][18]{#kntt}, as well as [@alexandair/powershellmvp][19]{#wwfk}
      * get-help * | %{get-help $_.name -full >"c:posh$($_.name).txt"}
  * [Jan has some tips][20]{#t_o2} for how to create graphs using visifire and PowerShell


  **Contest**


Thanks to everyone who entered! Congratulations to our winners who receive a copy of Lee Holmes PowerShell Cookbook, 2nd. Ed.! The winners are:

  * Bud P.
  * Aaron H
  * Ken M.
  * Carl P.

 [1]: http://quest.com/powerguipro "quest.com/powerguipro"
 [2]: http://powershellgroup.org/content/october-central-ohio-powershell-users-group-0 "Central Ohio PowerShell User Group next meeting: Oct 27th"
 [3]: http://www.maxtblog.com/index.php/2010/10/some-sql-server-and-powershell-news-10072010/ "PowerShell sessions during the Worldwide Online TechDay 2010"
 [4]: http://www.microsoft.com/learning/en/us/Course.aspx?ID=10325a&locale=en-us "Automating Administration with Windows PowerShell 2.0"
 [5]: http://powershell.it/ "PowerShell.IT"
 [6]: http://www.powergui.org/entry.jspa?externalID=2994&categoryID=387 "PowerGUI Online"
 [7]: http://www.powergui.org/entry!default.jspa?categoryID=387&externalID=2931&fromSearchPage=true "Expand Aliases"
 [8]: http://www.powergui.org/contest.jspa "PowerGUI Challenge 2010"
 [9]: http://en.wikipedia.org/wiki/Taskmaster "Task Master"
 [10]: http://serverfault.com/ "ServerFault.com"
 [11]: http://boeprox.wordpress.com/2010/09/11/scanning-ports-on-multiple-hosts/ "scan ports on multiple hosts"
 [12]: http://blog.powerwf.com/post/1262591698/tutorial-integration-with-service-manager-authoring "Integration with Service Manager"
 [13]: http://blogs.msdn.com/b/powershell/archive/2010/10/04/a-jug-fills-drop-by-drop-quest-pki-cmdlets.aspx "Did you know Quest's AD cmdlets now include support for automating PKI?"
 [14]: http://poshoholic.com/2010/10/01/how-to-create-powergui-script-editor-add-ons-the-easy-way/ "Kirk Munro explains how to create add-ons for PowerGUI"
 [15]: http://technet.microsoft.com/en-us/library/ee829690.aspx "New Technet page"
 [16]: http://www.windowsitpro.com/blogs/PowerShellwithaPurpose/tabid/2248/entryid/13107/Default.aspx?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+winblog/pspurpose+(WIN%3EBlog%3EPowerShell+with+a+Purpose) "working on a PowerShell punctuation cheat sheet"
 [17]: http://twitter.com/halr9000 "Hal"
 [18]: http://twitter.com/jonwalz "Jon"
 [19]: http://twitter.com/#!/alexandair/powershellmvp "@alexandair/powershellmvp"
 [20]: http://blog.powershell.no/2010/09/26/creating-graphs-with-windows-powershell/ "Jan has some tips"
