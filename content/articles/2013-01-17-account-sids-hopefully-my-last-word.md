---
title: "Account SIDs\"“hopefully my last word"
authors:
  - Richard Siddaway
date: "2013-01-17T08:25:50+00:00"
aliases:
  - /2013/01/account-sids-hopefully-my-last-word/
---

Ok the embarrassing moral of this story is that you shouldn't answer questions in a hurry at the end of the evening. 5 minutes after shutting down I realised that there is a far, far simpler way to get the info. Win32_AccountSID is a WMI linking class. It links Win32_SystemAccount and Win32_SID classes. 

Get-WmiObject -Class Win32_SystemAccount | select Caption, Domain, Name, SID, LocalAccount

gets you all you need

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2796/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2796/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2796&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
