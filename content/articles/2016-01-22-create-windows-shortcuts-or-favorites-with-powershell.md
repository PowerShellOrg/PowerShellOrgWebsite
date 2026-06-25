---
title: Create Windows Shortcuts or Favorites With PowerShell
authors:
  - Steve Parankewich
date: "2016-01-22T16:37:59+00:00"
categories:
  - DevOps
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tutorials
aliases:
  - /2016/01/create-windows-shortcuts-or-favorites-with-powershell/
---

Creating windows shortcuts are usually done through the New Shortcut Wizard, MSI files, Group Policy Objects, or even a simple file copy. Shortcut files are .lnk files that Microsoft Windows uses for shortcuts to local files while .url is used for destinations such as web sites. As we all are aware, the .lnk filename extension is hidden in Windows Explorer even when "Hide extensions for known file types" is unchecked in File Type options. The reason for this is the NeverShowExt string value in HKEY_CLASSES_ROOT\lnkfile. Shortcuts are also displayed with a curled arrow overlay icon. The IsShortcut string value causes the arrow to be displayed.  
For a full run down on creating shortcuts and favorites with PowerShell head over to [PowerShellBlogger.com][1].

 [1]: http://powershellblogger.com/?p=301
