---
title: Beginner Practice Event
authors:
  - Don Jones
date: "2013-04-18T19:07:38+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/04/beginner-practice-event/
---

As you may be aware, we posted [Practice Events for the 2013 Scripting Games][1], in an effort to give people an idea of what the events would look like and involve. There's been a [lively discussion][2] in the PowerShell.org forums about the Beginner Practice, so I thought I'd weigh in. Here's my solution:  
[![Beginner practice event](https://powershell.org/wp-content/uploads/2013/04/VMware-FusionScreenSnapz001.png)](https://powershell.org/wp-content/uploads/2013/04/VMware-FusionScreenSnapz001.png)  
Of course, that's hardly the only way to go about it. I used this approach because it minimizes the use of extra variables, and doesn't create a script-style approach - it's a "one-liner," although I've broken it across several physical lines for readability. I think it makes good use of PowerShell's native ability to deal with multiple objects in a stream - there's no need for a ForEach loop, here.

 [1]: https://powershell.org/2013/04/03/2013-scripting-games-schedule/
 [2]: https://powershell.org/discuss/viewtopic.php?f=39&t=1674
