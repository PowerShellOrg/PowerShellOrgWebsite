---
title: The Ternary Cometh
authors:
  - Colyn Via
date: "2019-09-12T21:35:34+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tutorials
aliases:
  - /2019/09/the-ternary-cometh/
---

Developers are likely to be familiar with ternary conditional operators as they're legal in many languages (Ruby, Python, C++, etc).  They're also often used in coding interviews to test an applicant as they can be a familiar source of code errors.  While some developers couldn't care less about ternary operators, there's been a cult following waiting for them to show up in Powershell.  That day is [almost upon us.][1]  
Any Powershell developer can easily be forgiven for scratching their heads and wondering what a ternary is.  In the most basic sense a ternary evaluates an expression to a binary result and carries out one of two possible outcomes.  Lets start by looking at some code examples:


`puts (if 1 then 2 else 3 end)
2`PS > 1 ? 2 : 3
PS > 2
`The above is the same conditional expressed first in Ruby, then in Powershell, and both examples have a return of 2.  First off, let's get around the obvious confusion in the Powershell example.  The alias for Where-Object is '?', and that is not what the '?' represents in the powershell ternary operation.  The likely reason for implementing '?' instead of another character is for inter-language operability and reducing the level of effort for migrating code from other languages to Powershell.  
The best way to explain how to read the ternary example above is to express it in a more familiar context.  That is to say, let's turn it into an If/Then/Else statement:


`if(1){2}else{3}
`Right off we can see one of the benefits of a ternary is that it makes code more succinct.  It should also make more sense why we refer to the ternary as a conditional operator.  It's intended as an optional replacement for If/Than/Else in much the same way that Select/Case is for organizing multiple conditional statements.  Wondering if there's a performance enhancement?  
![](https://scontent.xx.fbcdn.net/v/wl/t1.15752-0/s480x480/70352759_377454299851433_6857271860543881216_n.png?_nc_cat=105&_nc_log=1&_nc_oc=AQmAjykQ4CuOWI8SBA_aHRSBjOdpHV-OrzlMs9iI9J6egJ2w6vNGr5AuYIRZkJNQJiQ4JH7ENVdcNKNy-UGUyGb-&_nc_ht=scontent.xx&oh=4db9b829b678c0e87ec610471f7054b5&oe=5DF6EE21)  
Nope.  So the ternary is intended to boost readability but does that happen in reality?  Some engineers, who shall remain nameless, misuse its purpose into statements you'll wish you could unsee or will make your eyes bleed.  For example:


`Bool c1, c2,c3;
// Assign some values to c1, c2 and c3.
int x = c1?c2?1:2:c3?3:4;
`Who wants to code review that?  Or decipher it while trying to resolve a problem that's affecting your critical operations?  
There's a definite place for ternary operators in Powershell.  They have the potential to enhance the programing experience while simplifying readability.  Some will look upon the ternary as a way to show off their elite skills and create code only they can read.  The great engineers will leverage the best syntax for the correct reason at just the right moment in their code.  If you want to experiment with Powershell ternary operators early, grab the build linked above (or any later build) and run '
Enable

-

ExperimentalFeature

PSTernaryOperator'.


Please, enjoy ternary operators responsibly.  
Remembering [Dorothy Vaughan][2] on this anniversary of JFK's "We choose to go to the Moon" speech.

 [1]: https://powershell.visualstudio.com/PowerShell/_build/results?buildId=31915
 [2]: https://en.wikipedia.org/wiki/Dorothy_Vaughan
