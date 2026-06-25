---
title: Finding the domain controller that authenticated you
authors:
  - Richard Siddaway
date: "2013-01-04T17:57:56+00:00"
aliases:
  - /2013/01/finding-the-domain-controller-that-authenticated-you/
---

A question on my blog asked how do you know which domain controller you are running against when you search Active Directory. Unless you explicitly instruct your script to use a specific domain controller it will use the one to which you authenticated.

You can find the DC to which you authenticated with this simple function

function get-logonserver{  
$env:LOGONSERVER -replace "\\", ""  
}

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2781/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2781/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2781&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
