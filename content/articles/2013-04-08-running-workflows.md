---
title: Running workflows
authors:
  - Richard Siddaway
date: "2013-04-08T17:12:38+00:00"
aliases:
  - /2013/04/running-workflows/
---

I tripped over an interesting issue recently regarding the running of PowerShell workflows.

Consider the world"™s simplest workflow

workflow test-w1 {"hello world"}

If I run this on a 32bit Windows 8  PowerShell machine "“ it works

If I run this on Windows 2012 (64bit) on PowerShell it works

if I run this on Windows 2012 PowerShell (x86) "“ it doesn"™t work!

Be aware of how you are running your workflows

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2827/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2827/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2827&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
