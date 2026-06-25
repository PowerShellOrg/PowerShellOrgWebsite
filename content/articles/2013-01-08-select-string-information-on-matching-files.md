---
title: "Select-String\"“information on matching files"
authors:
  - Richard Siddaway
date: "2013-01-08T21:31:36+00:00"
aliases:
  - /2013/01/select-string-information-on-matching-files/
---

Following on from yesterday"™s post this is the second question:

_Since I'm recursively searching thru files to find matching phrases, how can I obtain other directory service information about the matching files file(s) – this is more of a methodology technique question because I realize there are multiple ways of achieving this?_

You could do something like this

foreach ($find in Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD" -List){  
Get-ChildItem -Path $find.Path  
}

Run the Select-String as before but only get the first match in each file.  Use foreach to access the match information and use the Path property to feed into Get-ChildItem.

If you want things to be a bit simpler "“ break it down to:

$finds = Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD" -List  
foreach ($find in $finds){  
Get-ChildItem -Path $find.Path  
}

Alternatively if you want the PowerShell one-liner approach try

Get-ChildItem -Path  (Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD" -List).Path

Personally I would probably go for the simple approach

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2785/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2785/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2785&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
