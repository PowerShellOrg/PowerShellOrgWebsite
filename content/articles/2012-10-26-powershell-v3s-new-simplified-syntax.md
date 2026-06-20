---
title: 
author: Don Jones
authors:
  - Don Jones
date: "2012-10-26T18:02:31+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2012/10/powershell-v3s-new-simplified-syntax/
---

One of the ballyhooed new features in PowerShell v3 is the new "simplified" syntax for Where-Object and ForEach-Object. I'm going to focus on the former for this article. In essence, instead of doing this:


`Get-Service | Where-Object { $_.Status -eq 'Running' }
`You can now do this also:


`Get-Service | Where Status -eq Running
`Last week, I had the opportunity to include this new syntax in a class I was teaching - mainly to beginners - and I came away with mixed feelings. Whereas once I'd felt awesome about the new syntax... now I'm conflicted.

## A Caveat

I want to point out up front that my upcoming comments are confined to a pretty tight scenario: Teaching newcomers to PowerShell. I'm not sure if these feelings apply universally. I'm also not trying to beat up on Microsoft's PowerShell team with this article; instead, I'm trying to provide a discussion. I'm also hopeful that this article can help clear up some confusion for anyone who experiences the same confusion my students did.

## Simplified or Complexified?

First, understand that this new syntax **is not** a "simplified" syntax; it's an _additional_ syntax. The old syntax hasn't been cleaned up in any way, and it hasn't gone away; it's been joined by a new compatriot. This presents a teaching challenge: Now, rather than teaching _one_ syntax and helping students get through it, I have to teach _two. _After all, they're going to encounter both "in the wild," and there are six years of the "old" syntax out there in blogs and examples and whatnot. So the addition of a second syntax doesn't lower the learning barrier; it _raises_ it. That's because, without introducing a breaking change in the product, _you can't fix syntax once it's out there._

## Limitations

I also have to continue teaching the "original" syntax because the "simplified" syntax is limited to just one expression: this equals that (or not equals, or whatever). You can't, in other words, do this:


`Get-WmiObject Win32_Service | Where State -ne 'Running' -and StartMode -eq 'Auto'
`Only the "old" syntax supports expressions with more than one operator. And don't think my students didn't try the above - they did, despite explicit explanations up front that it wouldn't work. The problem is that, especially in a class, students are getting so much thrown at them that their brains instinctively attempt to simplify. "Ok, if there's two syntaxes, and one has ugly { $_ } garbage in it, I'll focus on the other one." Problem is, that other one won't get you through the whole day.  
In fact, I'm seriously considering, for my next class, _not_ teaching the "simplified" syntax right away. I'll stick with the old one, because it's _one_ way I can teach that will _always_ work. Yeah, the $_ is ugly - but you have to know that $_ thing in so many other places, that I've gotta get students past it anyway. I'll show them the "simplified" syntax, for sure, but probably later in class after they've mastered the old one.  
**Help Files**  
My big pain is that the "simplified" syntax has made a wreck of the help file for Where-Object. It used to be a simple syntax section: One parameter set, with really only one parameter: -FilterScript. Now it's an unholy mess.  
Here's why: the new syntax is really a hack, which takes advantage of the fact that both PowerShell operators (like -eq) and parameters (like -property) look alike. They both start with a dash. The new syntax:


`Get-Service | Where Status -eq Running
` Really means this:



`Get-Service | Where -Property Status -eq -Value Running
`You've got three parameters on Where-Object: -Property, -Value, and -eq, with -eq being a switch parameter that accepts no value. That means this is equally valid:



`Get-Service | Where -eq -Value Running -Property Status
`Since named parameters can come in any order. The upshot of this is that the help file for Where-Object now has to list a bazillion parameter sets, each with a different "operator" parameter:


  [![](https://powershell.org/wp-content/uploads/2012/10/VMware-FusionScreenSnapz001-300x258.png)
 (](https://powershell.org/wp-content/uploads/2012/10/VMware-FusionScreenSnapz001.png)Click for larger)


  Barf. The problem is that the help file is *syntactically* correct, but it is *semantically* wrong, meaning it doesn't accurately reflect the *meaning* of the command. I'm whined about this to a friend on the PowerShell help team, and they - quite accurately - noted that the help file needed to be syntactically accurate. They also suggested that beginners should be focusing on the excellent Description section of the help file, which better explains the meaning. Okay... but the Syntax section takes up two screenfuls, and appears before the Description. People tend to read top-down. I caught one of my students trying to do this:`Get-Service | Where $_ -eq Running -Property Status[/property]


  Before I said, "Ok, enough, no more playing with the new syntax, everyone back into the {curly bracket} pool."


## Inconclusion

That's an accurate heading - I didn't mean "in conclusion." I'm actually knotted up about this. I totally get, and appreciate, what the team was trying to do with this syntax. Someone accustomed to PowerShell can probably reel off the new syntax with no issues, and love the fact that they have to type a whole five fewer characters. But "simplified" suggests that the feature was meant to help beginners - and I'm not sure it does. It's like giving a kid training wheels on their bike: Sooner or later, those have to come off, and they haven't necessarily prepared you for the big-boy world.  
What're your thoughts? I'm genuinely interested, especially if you have some experience with _newcomers_ encountering the new syntax. There's no argument that it's easier _to begin with_ - it just doesn't take you very far before you have to "grow up" to the "real" syntax anyway, so I'm not sure it's a "win" from an educational perspective.
