---
title: 20115-September Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-09-05T13:26:02+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/09/september-2015-scripting-games-puzzle/
---

Our September 2015 puzzle is another one-liner, to help get you out of Summer Mood and back into Work Mode. This time, it's a pretty real-world scenario, designed to test your understanding of the pipeline and how data can be manipulated within it. You'll need to really grasp pipeline parameter binding to make this work in the shortest command possible.

<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.

**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. You are not allowed to come back and post corrected or improved versions. If you do, all of your posts will be ignored. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.


Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.

**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## 

## **Our Puzzle**

You’ve been given a CSV file (named Input.csv) that has a single column, named MACHINENAME. The contents of that column are either computer host names or IP addresses. The computers named run a mix of operating systems, from Windows Server 2003 and Windows XP, up through the newest versions. All have at least PowerShell v2 installed. RPC communications are open between all computers on the network. All computers belong to the same domain.

Write a command or short script that reads the CSV file, contacts each computer, and retrieves each computer’s textual operating system version (e.g., “Microsoft Windows 8.1 Pro”, not “6.3.9600”). The command or script should output a CSV file, named Output.csv, that has two columns: MACHINENAME and OSVERSION.

There’s no need to handle errors for machines that aren’t reachable.





**Challenges:**

  * Try to do write this as a one-liner, using as few semicolons as possible.
  * Try to minimize your use of curly brackets (just for fun) in your answer.

 [1]: https://powershell.org/?p=2574
