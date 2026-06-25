---
title: "Select-String scenarios \"“ fixed columns"
authors:
  - Richard Siddaway
date: "2013-01-07T22:43:53+00:00"
aliases:
  - /2013/01/select-string-scenarios-fixed-columns/
---

I had some questions come in after mu recent post regarding select-string. I"™ll answer them as a series of posts. First off:

_I'm recursively searching thru many files, and want to pull out specific data in 'fixed column' positions from the line(s) that match the phrase I'm seeking, i.e. position 10 thru 15 of the line or  position 6 thru the end of the line (which might be unknown).  
What is your preferred method for handling this situation?_ 

I started by creating a file

12345ABCD123451234512345  
1234512345ABCD1234512345  
12345ABCD123451234512345  
12345abcd123451234512345  
123451234512345ABCD12345  
12345ABCD123451234512345  
123451234512345ABCD12345  
12345123451234512345ABCD  
1234512345ABCD1234512345

I want to pick out the string ABCD but ONLY when its in columns6-9.  A quick inspection shows I should get four lines returned.

If you go with a simple match you get all lines returned

PS> Select-String -Path c:\test\*.txt -Pattern "ABCD" -SimpleMatch

C:\test\fxedcol.txt:1:12345ABCD123451234512345  
C:\test\fxedcol.txt:2:1234512345ABCD1234512345  
C:\test\fxedcol.txt:3:12345ABCD123451234512345  
C:\test\fxedcol.txt:4:12345abcd123451234512345  
C:\test\fxedcol.txt:5:123451234512345ABCD12345  
C:\test\fxedcol.txt:6:12345ABCD123451234512345  
C:\test\fxedcol.txt:7:123451234512345ABCD12345  
C:\test\fxedcol.txt:8:12345123451234512345ABCD  
C:\test\fxedcol.txt:9:1234512345ABCD1234512345

Notice the match is case INSENSITIVE

This means we get into the world of regular expressions "“ joy!

This will work

Select-String -Path c:\test\*.txt -Pattern "\A.{5}ABCD"

The regular expression means match any 5 characters followed by ABCD starting at the beginning of the string.

Alternatively you could use  

Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD"    

This is the same except its accepting any word character (letter, digit, math symbol and punctuation)

These two searches are case INSENSITIVE

if you need case sensitivity then compare

Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD"  -CaseSensitive  
Select-String -Path c:\test\*.txt -Pattern "\A\w{5}abcd"  -CaseSensitive

or

Select-String -Path c:\test\*.txt -Pattern "\A.{5}ABCD" -CaseSensitive  
Select-String -Path c:\test\*.txt -Pattern "\A.{5}abcd" -CaseSensitive

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2784/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2784/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2784&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
