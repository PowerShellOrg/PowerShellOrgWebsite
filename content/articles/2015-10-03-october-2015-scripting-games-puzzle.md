---
title: 2015-October Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-10-03T13:31:53+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/10/october-2015-scripting-games-puzzle/
---

Our October 2015 puzzle might take us beyond the realm of one-liners, but it circles back to the August 2015 theme of retrieving information from the web. This is another scenario that actually has a lot of real-world applications, in that there's a lot of practical uses in the work environment for this technique. 

<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.

**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. You are not allowed to come back and post corrected or improved versions. If you do, all of your posts will be ignored. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.


Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.

**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## 

## **Our Puzzle**

Write a short script that can retrieve the most recent article headlines from a blog by using the blog’s RSS or Atom feed. You should ideally just display the headlines, but might also choose to display a URL that links to the article, and might display a short excerpt of the article. If the feed contains the full article text, don’t display it – at most, display a short excerpt.

While you could definitely write this as a one-liner, and might choose to do so as you start, there's real value in turning this into a "Get-RSSFeed" function. To be fair, lots of folks have done this before - but challenge yourself, and try to figure it out without opening a search engine!



**Challenges:**

  * Try to write this to be a PowerShell command (an advanced function) that uses parameters to direct the behavior of the command.
  * Try to ensure your script’s output could be easily displayed in an on-screen table, or redirected to a CSV file.
  * Try to minimize your use of “raw” .NET classes (e.g., try to use only PowerShell commands as much as possible).

 [1]: https://powershell.org/?p=2574
