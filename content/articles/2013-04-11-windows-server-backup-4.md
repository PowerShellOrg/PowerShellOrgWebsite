---
title: Windows Server Backup
authors:
  - Richard Siddaway
date: "2013-04-11T19:50:36+00:00"
aliases:
  - /2013/04/windows-server-backup-4/
---

Windows Server 2012 has a PowerShell enabled backup utility. When you enable the feature you get a module called WindowsServerBackup.  It has the cmldets you would expect for creating and managing backups. No surprise you may say as this was avialable in Windows 2008 R2.

The difference with Windows Server 2012 is that you can do restores from PowerShell cmdlets whcih wasn"™t available in the earlier version.

The restore cmdlets are

Start-WBFileRecovery

Start-WBHyperVRecovery

Start-WBSystemStateRecovery

Start-WBVolumeRecovery



This might not replace your currebt backup system but is very useful for backing up test environments and experimenting with things like authorative AD restores. 

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2828/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2828/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2828&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
