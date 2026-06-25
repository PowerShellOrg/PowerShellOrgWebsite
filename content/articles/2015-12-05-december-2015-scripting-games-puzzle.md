---
title: 2015-December Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-12-05T16:33:35+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/12/december-2015-scripting-games-puzzle/
---

Our December 2015 puzzle comes from PowerShell.org board member Jeff Hicks, who wanted to share a little holiday fun for the season.  
<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.  
**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.

Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.  
**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## **Our Puzzle**

The 12 Days of PowerShell! It is that time of year again. Time to think about sugar plums, nutcrackers and PowerShell. Well, maybe we think about that last one all year long. Because I am a giving kind of guy, I thought I‘d give you a PowerShell present. I like to think my present is one that continues to give as it involves learning. I have a small set of challenges that shouldn’t be too difficult, should be fun and in the end educational.  
In PowerShell, and I think the ISE might work best for this, create this here-string.


`$list = @"
1 Partridge in a pear tree
2 Turtle Doves
3 French Hens
4 Calling Birds
5 Golden Rings
6 Geese a laying
7 Swans a swimming
8 Maids a milking
9 Ladies dancing
10 Lords a leaping
11 Pipers piping
12 Drummers drumming
"@
`The variable $list is technically a single string with a length of 226. Using $list, see if you can solve these questions or challenges. I have written these in such a way that the solutions build on earlier answers.

  1. Split $list into a collection of entries, as you typed them, and sort the results by length. As a bonus, see if you can sort the length without the number.
  2. Turn each line into a custom object with a properties for Count and Item.
  3. Using your custom objects, what is the total number of all bird-related items?
  4. What is the total count of all items?

For those of you who have been extra good this year, I have a bonus challenge (or maybe you’ll think it is a lump of coal). Some people interpret The 12 Days of Christmas cumulatively. That is, on day 1 your true love got 1 item. On the second day, your true love got 2 turtle doves AND a partridge in a pair tree. This is in addition to the previous day’s presents. If you were to manually plot this in PowerShell you might do:


`$t = 0
$t += 1
$t += 1+2
$t += 1+2+3
`…  
But you should be more elegant. Using PowerShell what is the total number of cumulative gifts?  


 [1]: https://powershell.org/?p=2574
