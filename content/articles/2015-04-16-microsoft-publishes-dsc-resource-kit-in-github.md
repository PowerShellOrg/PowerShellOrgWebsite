---
title: Microsoft Publishes DSC Resource Kit in GitHub
authors:
  - Don Jones
date: "2015-04-16T11:47:50+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/04/microsoft-publishes-dsc-resource-kit-in-github/
---

When Microsoft first released the DSC Resource Kit (in [Wave 10][1] as of this writing), they opened the door to community contributions. Our own [PowerShell.org GitHub repo][2] consists partly of DSC resource that used Microsoft's code as a baseline, and then corrected problems or expanded capabilities.  
What we never had was a way for Microsoft to circle back, pick up those enhancements, and include them as part of an official future Resource Kit Wave. Now, we do.  
<!--more-->


Microsoft has moved the entire DSC Resource Kit to an [open GitHub repo][3]. They've also included some [basic guidelines for potential contributors][4]. This now allows anyone to jump in, make corrections, or potentially even expand capabilities, knowing that their work has a chance of being reviewed and included in the "official" repository. That means we have a shot at having One True Version of these modules, which anyone can find and use, rather than scattered versions that inherited from the originals, but were harder for the general public to find.  
As of this writing, there are over 45 DSC resources you can download, check out, modify, and submit changes for - as well as using them in your environment. Thank you, Microsoft!

 [1]: https://gallery.technet.microsoft.com/scriptcenter/DSC-Resource-Kit-All-c449312d
 [2]: https://github.com/powershellorg
 [3]: https://github.com/PowerShell/DscResources
 [4]: https://github.com/PowerShell/DscResources/blob/master/CONTRIBUTING.md
