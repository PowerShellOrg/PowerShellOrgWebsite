---
title: Using Install-WindowsFeature with Offline Source
authors:
  - Don Jones
date: "2014-01-01T17:04:06+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/01/using-install-windowsfeature-with-offline-source/
---

As you probably know, the Install-WindowsFeature (used to be Add-WindowsFeature; that's now an alias to Install-) can add Windows roles and features from PowerShell. If your server doesn't have the installer source on the local disk, then the cmdlet will default to grabbing it from Windows Update - a pain for disconnected servers. Install-WindowsFeature does offer a means of using an alternate local source (like a DVD or file server location), but using it can be a bit hinky.  
The cmdlet help indicates that you should point to a Windows image (WIM) file. That'll work, but you can't just provide the path of the WIM. You also need to put a **wim:/** prefix on the front of the path, and a suffix that tells the thing which edition of Windows you're working with, so that it grabs the right bits. For example, **wim:/d:/sources/install.wim:4**. That "4" is the suffix for Datacenter Edition, telling the installer to look at index 4 within the WIM for the necessary feature.

  * 1 is Standard Edition Server Core
  * 2 is Standard Edition
  * 3 is Datacenter Edition Server Core
  * 4 is Datacenter Edition

Wanted to post this, as there isn't a good example in the docs.  
**UPDATE:** I've [bugged this in Connect][1] if you'd like to vote it up, so that the team gains sight of it and can have an opportunity to expand the docs.

 [1]: https://connect.microsoft.com/PowerShell/feedback/details/812950/install-windowsfeature-docs-incomplete
