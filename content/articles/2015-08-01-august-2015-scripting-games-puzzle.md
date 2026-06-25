---
title: 2015-August Scripting Games Puzzle
authors:
  - Don Jones
date: "2015-08-01T13:10:40+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/08/august-2015-scripting-games-puzzle/
---

Our August 2015 puzzler tests your ability to retrieve data from the Web. If you've never done this before, it can be a real brain-bender - but don't overthink it; experts can probably pull this off in a one-liner if they're using a newer version of PowerShell!

<!--more-->

## **Instructions**

The Scripting Games have been re-imagined as a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.

**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. You are not allowed to come back and post corrected or improved versions. If you do, all of your posts will be ignored. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit.


Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.

**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

##  

## **Our Puzzle**

At www.telize.com/geoip, you'll find a JavaScript Object Notation endpoint. It's public. Your goal is to get PowerShell to display something like the following (because this is based on _your_ IP address, the property values will be different than what's shown here):


`longitude latitude continent_code timezone
--------- -------- -------------- --------
-115.1685 36.2212  NA             America/Los_Angeles
`Being able to query information from the Web - often in XML or JavaScript Object Notation - is an important integration skill. PowerShell can actually make it pretty easy. Although this challenge _can_ be solved using a one-liner, you could also go further and write a complete "Get-GeoInformation" function around it. However, keep in mind that a function would not normally (a) limit the data that's output or (b) pre-format the data. Why not?

**Challenges:**

  * Try to do this in a one-liner, but spell out all command and parameter names.
  * Write an advanced function that provides a complete Get-GeoInformation "wrapper" around this endpoint.
  * Along with your entry, include the endpoint for another XML or JavaScript Object Notation web service that you think is cool, along with a brief notation of what it does



 [1]: https://powershell.org/?p=2574
