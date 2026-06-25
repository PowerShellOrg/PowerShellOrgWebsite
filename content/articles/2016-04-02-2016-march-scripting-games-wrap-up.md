---
title: 2016-March Scripting Games Wrap-Up
authors:
  - Don Jones
date: "2016-04-02T15:04:22+00:00"
categories:
  - Scripting Games
aliases:
  - /2016/04/2016-march-scripting-games-wrap-up/
---

Carlo really put a brain-twister out for our [March 2016 Puzzle][1]. Also, as a note, we're eagerly awaiting submissions of next month's puzzle, so don't delay in handing that in. [Here's how you can contribute to the community's favorite scripting game][2].

## Official Solution

It's probably easiest just to share his solutions as actual script files, so here's both the Beginner and Advanced versions that he provided, as a ZIP:  
[Solutions](https://powershell.org/wp-content/uploads/2016/02/Solutions.zip)  
Carlo also provided some notes on his thinking:  
Just a precision concerning the regex: the idea I had was to 'force' competitors to think in terms of Unicode categories and block ranges (unknown concept to most I bet).  
Without digging, some people could come up with an expression like this, which is NOT what we want:


`[char]$_ -match '[^\x20-\x7E]'
`My idea is to force inclusion of latin chars (hence {IsLatin-1Supplement}) which are letters {L}, then progressively exclude all numbers {N}, all punctuation characters {P}, all symbols {S} and all separators {Z}.  
A proper use of the \p (in lowercase) and \P (in uppercase) constructs to force inclusion and exclusion is essential here:


`[char]$_ -match "(?=\p{IsLatin-1Supplement})(?=\p{L})(?=\P{N})(?=\P{P})(?=\P{S})(?=\P{Z})")
`Did you follow his thinking? How's you do?

 [1]: https://powershell.org/2016/03/05/2016-march-scripting-games-puzzle/
 [2]: https://powershell.org/2016/02/06/2016-february-scripting-games-puzzle/
