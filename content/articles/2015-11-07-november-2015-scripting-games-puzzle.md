---
title: 2015-November Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-11-07T14:06:18+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/11/november-2015-scripting-games-puzzle/
---

Our November 2015 puzzle comes from PowerShell.org user [Tim Curwick][1], who created the puzzle based on a challenge he ran across at work. There's nothing more real-world than this!

<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.

**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.


Don't forget the [main rules and purpose of these monthly puzzles][2], including the fact that you won't receive individual scoring or commentary on your entry.

**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

##  

## **Our Puzzle**

Scripting challenge: Understanding and cleaning up someone else's code

Below is an actual script that was in production use at a large enterprise client. The script worked as desired, but as you can see, it could benefit from some clean up. There is some old code in there that may have served a function at one time, but no longer does. The original author and several editors donít seem to have understood PowerShell very well, and it is far more complex than it needs to be.

Your challenge is to replace everything after the Param statement with a single line of code (no semicolons), while retaining all functionality.

We are not looking for the _shortest_ line. The whole point is to make the code _more readable_. Don't replace unnecessarily complex with unnecessarily cryptic.

As in real life, you should also add internal documentation in the form of any concise comments about the script or your new code which may be of value to the next person troubleshooting or updating the script.


`param([string]$VMNameStr)
$VMs=@()
$VMNames=@()
if($VMNameStr.indexof(",") -gt 0)
{
$Trace="Found Comma..."
$VMs=$VMNameStr -split "," | %{$_.trim()}
$trace+="Length = $($VMs.length)"
$trace+=$VMs -is [array]
for($i=0;$i -lt $VMs.length;$i++){
if($VMs[$i] -gt ""){
set-variable -Name ("vmname" + $i) -value $VMs[$i]
$VMNames+=$VMs[$i]
}
}
}
else{$VMName0=$VMNameStr;$VMNames=$VMName0}
$VMNames
`[1]: http://madwithpowershell.com
 [2]: https://powershell.org/?p=2574
