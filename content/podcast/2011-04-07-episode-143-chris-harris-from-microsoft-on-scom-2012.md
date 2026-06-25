---
title: Episode 143 – Chris Harris from Microsoft on SCOM 2012
authors:
  - Jonathan Walz
date: "2011-04-08T00:41:45+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-143.mp3"
aliases:
  - /2011/04/episode-143-chris-harris-from-microsoft-on-scom-2012/
---

**A Podcast about Windows PowerShell.**
 Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://traffic.libsyn.com/powerscripting/PSPodcast-143.mp3)


## 
In This Episode
 {#tiap}

Tonight on the PowerScripting Podcast, we talk to Chris Harris from Microsoft about System Center Operations Manager 2012!

## News


  This segment is brought to you by *PowerGUI Pro with MobileShell, Version Control, and Easy Remote Script Execution.*


_  
At Quest we are passionate about Windows PowerShell. PowerGUI Pro enables organizations to harness the power of PowerShell without the expense of training and custom scripts and applications. PowerGUI Pro solves issues regardless of the time and place by using MobileShell to remotely manage your infrastructure. Ensure scripting best practices by leveraging integration with popular Version Control systems. Automate against thousands of computers using Easy Remote Script Execution. [Get PowerGUI Pro at quest.com/powerguipro][1]{#q7ty}_

  * James Brundage is blogging over at <http://blog.start-automating.com/>
  * [Hal's new PowerCLI TrainSignal course is out!][2]{#xhkm}
  * User group news: 
      * [NYC Apr 11th, MVP Aleksandar Nikolic will be talking about PowerShell Remoting][3]{#r1_0}
  * Dmitry [did an interview][4]{#irfb} with Sean Kearney about PowerShell at the MVP Summit
  * [The Scripting Games 2011 are here!][5]{#o7sd}
  * [Episode 22 of the Get-Scripting Podcast][6]{#jh_b} has Travis Jones on talking about the PowerShell Deep Dive
  * Jonathan Medd is [giving away a copy of the new PowerCLI book][7]{#x38v}
  * [Take the PowerShell Quiz!][8]{#d.9e}

## **
Interview
**


  This segment brought to you by Start-Automating


 


  *Start Scripting to Your Fullest Potential.  At Start-Automating, we can help you unleash the full Power of PowerShell V2.  You can use our deep PowerShell expertise to build rich PowerShell solutions, or we can train you to use PowerShell like a pro. Isn"™t it time you Save-Time, Save-Money, and Start-Automating?  Find out more at [Start-Automating.com](http://start-automating.com/).*


 


  **Links:**


 

#### Chatroom Buzz:

21:47  ## are you deprecating or removing your old commands?


  21:50  ## Is there a way we can pull the OpsMgr alerts and perf numbers from a VISIO diagram? 


  21:52  ## monitoring other devices, any intentions for storage arrays?  NetApp has Powershell SDK. 


  21:52  ## F5 BigIP also supports PowerShell, any intention to hook inot that API?


  21:56  ## Will SCOM 2012 deliver any new features associated with monitoring cross platform?


  21:58  ## Does the new 2012 design and the removal of the Root Management Server provide support for a larger number of Windows and Web Console users? 


  **Superhero: Jesus**

**
 **



**Resources**


 

  * 
Tobias posted a one-hour [Getting Started with PowerShell video](http://powershell.com/cs/media/p/9371.aspx)

  * Marco Shaw [blogged about the VMM changes from 2008 R2 to 2012 Beta 1][9]{#nomw}
  * Tome's presentation to the UK PSUG [was recorded and is now available online][10]{#c7-y}
  * [Making the most of the 2011 Scripting Games][11]{#p4pk}
  * Ravi posted a very cool PowerShell ISE Addon: [Get-History GUI][12]{#e2xa}

   





  **
Tips
**


This segment brought to you by [ServerFault.com][13]

  * [It's what's on the inside that counts][14]{#dkr9}

[][13]  





### 
Feedback


This one is from Aaron Nelson aka SQLVariant:  
I have a PowerShell question for you gurus. I know precisely how to do this in SQL, but I"™m only kinda-sure how to do this in PowerShell.  
My question is how do you contain an OR to only a certain portion of a Where-Object? In SQL all you have to do is put parens around the clauses and that will make their results act as one "˜where"™ clause. In PowerShell all I could think to do is to break it up into multiple Where-Object statements. There has to be a better way to do this right?  
SQL Example:  


WHERE 


(


NAME 
LIKE
 
'%SQL%'





       
OR
 NAME 
LIKE
 
'Reporting%'

)





   
AND
 StartMode 
=
 
'Auto'





   
AND
 
Started
 
!=
 
'True'




PowerShell Example (that doesn't work)







Get-WmiObject


 
win32_service
 
-ComputerName
 
AARON
 
|





Where


 
{

$_

.

name
 
-match
 
"^*SQL*"
 
-or
 
$_

.

name
 
-match
 
"Report"

}
 
|





Where


 
{

$_

.

StartMode
 
-eq
 
"Auto"
 
-and
 
$_

.

Started
 
-ne
 
"True"

}
 
|





Select


 
SystemName

,
 
Name

,
 
StartName

,
 
Started

,
 
StartMode
 
|
 
Ft
 
-a


  Hal's answer: 


Review the [Operator Precedence help page][15]{#dsyu}, you'll see that -and -or are near the bottom, so you need parentheses to make this work. For example:  


get-stuff | ? { ($_ -gt $x) -and ($_ -ne $y) }


 [1]: http://www.quest.com/PowerGUIPro/ "Get PowerGUI Pro at quest.com/powerguipro"
 [2]: http://www.trainsignal.com/VMware-vSphere-PowerCLI-Training.aspx "Hal's new PowerCLI TrainSignal course is out!"
 [3]: http://powershellgroup.org/content/april-11-2011-aleksandar-nikolic-mvp-powershell-remoting-0 "NYC Apr 11th, MVP Aleksandar Nikolic will be talking about PowerShell Remoting"
 [4]: http://dmitrysotnikov.wordpress.com/2011/03/25/video-sean-kearney-the-most-energized-powershell-mvp/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+DmitrysPowerblog+%28Dmitry%27s+PowerBlog%29 "did an interview"
 [5]: http://blogs.technet.com/b/heyscriptingguy/archive/2011/02/19/2011-scripting-games-all-links-on-one-page.aspx "The Scripting Games 2011 are here!"
 [6]: http://get-scripting.blogspot.com/2011/03/get-scripting-podcast-episode-22-travis.html "Episode 22 of the Get-Scripting Podcast"
 [7]: http://www.jonathanmedd.net/2011/03/powercli-book-raffle.html "giving away a copy of the new PowerCLI book"
 [8]: http://quizapp.cloudapp.net/powershell.aspx "Take the PowerShell Quiz!"
 [9]: http://marcoshaw.blogspot.com/2011/03/virtual-machine-manager-changes-from.html "blogged about the VMM changes from 2008 R2 to 2012 Beta 1"
 [10]: http://powertoe.wordpress.com/2011/03/29/regular-expression-presentation-recording-now-available/ "was recorded and is now available online"
 [11]: http://blogs.technet.com/b/heyscriptingguy/archive/2011/03/25/making-the-most-of-the-2011-scripting-games.aspx "Making the most of the 2011 Scripting Games"
 [12]: http://www.ravichaganti.com/blog/?p=2079 "Get-History GUI"
 [13]: http://serverfault.com/
 [14]: http://get-powershell.com/post/2011/03/02/Its-whats-on-the-inside-that-counts.aspx "It's what's on the inside that counts"
 [15]: http://technet.microsoft.com/en-us/library/ee681734.aspx "Operator Precedence help page"
