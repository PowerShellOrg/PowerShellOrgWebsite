---
title: "PowerShell Great Debate: The Purity Laws"
author: Don Jones
authors:
  - Don Jones
date: "2013-07-30T17:50:21+00:00"
aliases:
  - /2013/07/powershell-great-debate-the-purity-laws/
---

This should be interesting.  
During The Scripting Games, I observed (and in some cases made) a great many comments that I'm lumping under the name "Purity Laws."

  * 
You shouldn't use a command-line utility like Robocopy in a PowerShell script.

  * You shouldn't use .NET classes in a PowerShell script.
  * You should map a drive using New-PSDrive, not **net use**.

And so on. You see where I'm going: there are folks out there who feel as if the only thing that goes into a PowerShell script is Pure PowerShell. Which is odd, because it isn't an approach the product team actually gave much value. They spent _extra time_ making sure the shell could use .NET, and could run external utilities - why not use them, if they work and get the job done?  
A counterargument involves maintenance and readability. External commands, for example, are harder to read, may not be well-documented, and don't work consistently with the rest of PowerShell. .NET classes are hard to discover, and force you into a very "programmer-y" approach. Some environments might not want the extra overhead - even if it means giving up functionality.  
So where do you come down on this debate? I'd really love some _detailed recommendations. _What's right for _your_ environment, and most importantly _why? _Are there any facts or situations that would sway you to the other side of the argument?  
Go.  
[boilerplate greatdebate]
