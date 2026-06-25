---
title: "PowerShell Great Debate: PowerShell Versions?"
authors:
  - Don Jones
date: "2013-08-01T14:32:38+00:00"
aliases:
  - /2013/08/powershell-great-debate-powershell-versions/
---

_Today's Great Debate is a bonus, offered from former team member June Blender. Take it away, June!_  
Like several of the excellent debates in our Great Debate series, this debate issue arose during in Scripting Games 2013 when different judges used different selection criteria to evaluate entries.  
Some judges, like me, wanted to see evidence that the scripter had studied all features of the newest version of the Windows PowerShell language and selected the best approach for their solution. Other judges wanted the solutions to work on as many computers as possible.  
Outside of the Scripting Games, this issue is very practical and very important. If you"™re writing a script to work on particular computers in your enterprise, you know which versions of Windows PowerShell are installed and which features you can use. But when you write a shared script or functions for a module, your scripts/functions can run in any environment.  
What"™s the version best practice?  
I think we can all agree that a #Requires statement should appear in any shared script.


`#Requires -Version [.]
`In fact, maybe we need a version property of commands that can be queried by using Get-Command, like the PowerShellVersion property of modules?  
But, beyond that, should you restrict yourself to features in the oldest supported version of Windows PowerShell, or the most common version, or can you use features in the newest version, even if your scripts don"™t run on all computers in all enterprises?  
Sometimes, the answers are trivial. The simplified syntax in Windows PowerShell 3.0 that omits curly braces {} and "$_." is just syntactic sugar for the original syntax. We might decide that it"™s best to avoid it unless you"™re sure that all computers are running at least 3.0.  
At the other extreme are features that don"™t have any equivalent in a previous version. What if your module would benefit from using scheduled jobs, CIM commands, or workflows? Must you avoid them?  
In the middle are cases where you can use a somewhat equivalent feature. Can you use Get-CimInstance, or are we forever tied to Get-WmiObject? Can you use PSCustomObject or are you committed to Add-Member? Do you need to write Types.ps1xml files when dynamic type data would suffice?
