---
title: "PowerShell Great Debate: To Accelerate, or Not?"
authors:
  - Don Jones
date: "2013-06-25T14:38:57+00:00"
aliases:
  - /2013/06/powershell-great-debate-to-accelerate-or-not/
---

At his [Birds of a feather session at TechEd 2013][1], Glenn Sizemore and I briefly debated something that I'd like to make the topic of today's Great Debate. It has to do with how you create new, custom objects. For example, one approach - which I used to favor, but now think is too long-form:


`$obj = New-Object -Type PSObject
$obj | Add-Member NoteProperty Foo $bar
$obj | Add-Member NoteProperty This $that
`We saw some variants in The Scripting Games, including this one:


`$obj = New-Object PSObject
Add-Member -InputObject $obj -Name Foo -MemberType NoteProperty -Value $bar
`I generally don't like any syntax that explicitly uses -InputObject like that; the parameter is designed to catch pipeline input, and using it explicitly strikes me as overly wordy, and doesn't really leverage the shell.  
Glenn and I both felt that, these days, a hashtable was the preferred approach:


`$props = @{This=$that;
           Foo=$bar;
           These=$those}
`The semicolons are optional when you type the construct that way, but I tend to use them out of habits that come from other languages. The point of our debate was that Glenn would use the hashtable like this:


`$obj = [pscustomobject]$props
`Because he feels it's more concise, and because he puts a high value on quick readability. I personally prefer (and teach) a somewhat longer version:


`$obj = New-Object -Type PSObject -Prop $props
`Because, I argued, type accelerators like [pscustomobject] aren't documented or discoverable. Someone running across your script can't use the shell's help system to figure out WTF is going on; with New-Object, on the other hand, they've got a help file and examples to rely on.  
(BTW, I never worry about ordered hashtables; if I need the output in a specific order, I'll use a custom view, a Format cmdlet, or Select-Object. A developer once explained to me that unordered hashtables are more memory-efficient for .NET, so I go with them).  
But the big question on the table here is "to use type accelerators, or no?" You see this in many instances:


`[null]Do-Something
# vs.
Do-Something | Out-Null
`Same end effect of course, but I've always argued that the latter is more discoverable, while Glenn (and many others) prefer the brevity of the former.  
So we'll make today's Great Debate two-pronged. What approach do you favor for creating custom objects? And, do you tend to prefer type accelerators, or no?  
[boilerplate greatdebate]

 [1]: http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/BOF-ITP23
