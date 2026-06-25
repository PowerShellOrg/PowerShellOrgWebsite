---
title: 2016-January Scripting Games Puzzle
authors:
  - Don Jones
date: "2016-01-02T15:00:01+00:00"
categories:
  - Scripting Games
aliases:
  - /2016/01/january-2016-scripting-games-puzzle/
---

Our January 2016 puzzle comes from MVP Adam Bertram. We're actively interested in receiving Scripting Games puzzles from members of the community - submit yours, along with an official solution, to us at admin@ via email!  
<!--more-->

## **Instructions**

The Scripting Games are a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.  
**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the Gist URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit. Just edit the original Gist and we'll see your changes shortly.

Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.  
**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## **Our Puzzle**

Server uptime is the lifeblood of system administrators. We strive on it, get addicted to it..we need…more server uptime! Don't you think something as addictive and important as server uptime be measured?  How do we know we're getting our uptime fix?  As that famous quote goes, "Reality does not exist until it's measured.".  Let's measure it not only for our own sake but also to give a pretty report to our manager with all those whizbang, doohickey Excel juju that they love to see!  
For this month's challenge, I want you to create a PowerShell function that you can remotely point to a Windows server to see how long it has been up for. Here's an example of what it should output.  
![image001](https://powershell.org/wp-content/uploads/2015/12/image001.png)  
Requirements:  
1.     Support pipeline input so that you can pipe computer names directly to it.  
2.     Process multiple computer names at once time and output each computer's stats with each one being a single object.  
3.     It should not try to query computers that are offline. If an offline computer is found, it should write a warning to the console yet still output an object but with Status of OFFLINE.  
4.     If the function is not able to find the uptime it should show ERROR in the Status field.  
5.     If the function is able to get the uptime, it should show 'OK' in the Status field.  
6.     It should include the time the server started up and the uptime in days (rounded to 1/10 of a day)  
7.     If no ComputerName is passed, it should default to the local computer.  

Bonus:  
1.     The function should show a MightNeedPatched property of $true ONLY if it has been up for more than 30 days (rounded to 1/10 of a month).  If it has been up for less than 30 days, MightNeedPatched should be $false.

 [1]: https://powershell.org/?p=2574
