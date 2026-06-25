---
title: Select-String confusion
authors:
  - Richard Siddaway
date: "2013-01-05T13:08:59+00:00"
aliases:
  - /2013/01/select-string-confusion/
---

I have seen a lot of confusion recently over the use of Select-String.

One mis-conception is that you need to use Get-Content to pipe the file contents into Select-String.  Not so. Select-String will read the file for you.

If you just want to scan the files in a single folder to find a specific string then Select-String can do the work for you

Select-String -Path C:\Test\*.txt -Pattern "trial" "“SimpleMatch

If you need to work through a folder structure add get-ChildItem to the pipeline

Get-ChildItem -Path C:\Test -Filter *.txt -Recurse |  
Select-String -Pattern "trial" "“SimpleMatch

One line of PowerShell gives you a very powerful way of filtering the files recursively and testing their contents for a given string

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2783/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2783/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2783&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
