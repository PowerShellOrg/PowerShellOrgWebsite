---
title: Putting the date in a file name
authors:
  - Richard Siddaway
date: "2013-04-03T19:18:43+00:00"
aliases:
  - /2013/04/putting-the-date-in-a-file-name/
---

I often need to create file names that include the date & time the file was created in the name. I"™ve come up with all sorts of ways to do but this I think is the simplest.

I want the date in this format:  year-month-day-hour-minute-second.  In other words a format that is easily sortable. I discovered that if you convert a data to a string there is a formatter that does most of the work for you.  That"™s a lower case s.

PS> (Get-Date).ToString("s")  
2013-04-03T20:09:31

You can"™t have a : symbol in a file name so need to get rid of those

PS> (Get-Date).ToString("s").Replace(":","-")  
2013-04-03T20-10-02

To complete the file name

PS> $datestring = (Get-Date).ToString("s").Replace(":","-")  
PS> $file = "c:\folder\Prefix_$datestring.txt"  
PS> $file  
c:\folder\Prefix_2013-04-03T20-16-48.txt  
PS>

I"™ve done this as a two step process otherwise when you replace the : you also take out the one for the disk drive "“ oops

Enjoy

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2824/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2824/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2824&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
