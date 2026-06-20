---
title: "PowerShell Great Debate: Piping in a Script"
author: Don Jones
authors:
  - Don Jones
date: "2013-07-16T17:40:09+00:00"
aliases:
  - /2013/07/powershell-great-debate-piping-in-a-script/
---

Take a look at this:


`# version 1
Get-Content computers.txt |
ForEach-Object {
  $os = Get-WmiObject Win32_OperatingSystem -comp $_
  $bios = Get-WmiObject Win32_BIOS -comp $_
  $props = @{computername=$_;
             osversion=$os.version;
             biosserial=$bios.serialnumber}
  New-Object PSObject -Prop $props
}
# version 2
$computers = Get-Content computers.txt
foreach ($computer in $computers) {
  $os = Get-WmiObject Win32_OperatingSystem -comp $computer
  $bios = Get-WmiObject Win32_BIOS -comp $computer
  $props = @{computername=$computer;
             osversion=$os.version;
             biosserial=$bios.serialnumber}
  New-Object PSObject -Prop $props
}
`These two snippets do the same thing. The first uses a more "pipeline" style approach, and I've personally never felt the urge to do that in a script. Probably habit - I come from the VBScript world, so a construct like foreach($x in $y) is natural for me. I've seen folks get into that "pipeline" approach inside a script and get into trouble, and if I'm scripting I often prefer to use the more formal, structured approach of the version 2 snippet.  
What're your thoughts? For me, version 1 has some downsides - forcing yourself into that pipeline structure can be limiting, and I find the approach in version 2 to be more readable and a bit easier to follow. Frankly, I'm never a fan of having to mentally track what's in $_.  
(Which brings up a sidebar: I tend to evaluate a script's goodness based on how well I can understand what it does _without running it_. That's a common criteria, in fact, and one I personally think helps aid in debugging as well as maintaining scripts.)_  
_  
Anyway... discuss!  
[boilerplate greatdebate]
