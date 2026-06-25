---
title: 2015-July Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-07-04T08:01:13+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/07/2015-july-scripting-games-puzzle/
---

Our July 2015 puzzler is designed to make you really think about the PowerShell parser. Normally, you can more or less ignore the parser, because if you're typing best-practice, long-form code (no aliases, spell out parameter names, etc), the parser deals really well with everything. But knowing how the parser works is useful, because when you get into tricky syntax, the parser can be harder to work with. So we're going to test the limits of the parser's patience - and your skills!

<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.

**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. You are not allowed to come back and post corrected or improved versions. If you do, all of your posts will be ignored. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.


Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.

**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## 

## **Our Puzzle**

Write a one-liner that produces the following output (note that property values will be different from computer to computer; that’s fine). 


`PSComputerName ServicePackMajorVersion Version  BIOSSerial                                -------------- ----------------------- -------  ----------                                win81                                0 6.3.9600 VMware-56 4d 09 1 71 dd a9 d0 e6 46 9f
`By definition, a one-liner is a single, long command or pipeline that you type, hitting Enter only at the very end. If it wraps to more than one physical line as you’re typing, that’s OK. But, in order to really test your skill with the parser, try to make your one-liner as short as technically possible while still running correctly.



**Challenges:**

•	

Try to use no more than one semicolon total in the entire one-liner

•	

Try not to use ForEach-Object or one of its aliases

•	

Write the command so that it could target multiple computers (no error handling needed) if desired

•	

Want to go obscure? Feel free to use aliases and whatever other shortcuts you want to produce a teeny-tiny one-liner.

 [1]: https://powershell.org/?p=2574
