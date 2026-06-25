---
title: "[UPDATE: It's Safe] CAUTION: Don't Run Update-Help Right Now"
authors:
  - Don Jones
date: "2013-06-28T15:19:22+00:00"
categories:
  - Announcements
  - PowerShell for Admins
aliases:
  - /2013/06/caution-dont-run-update-help-right-now/
---

**UPDATE 2 JULY 2013: Microsoft is informing MVPs that the fix is in, and new help files should be downloadable by (at latest) the morning of 3 July 2013. So get your Update-Help ready to run. [More info][1].**  
If you haven't recently run Update-Help... don't. There's a problem with the help files that have been produced recently so that instead of:  
**-computername **  
You're getting:  
**-computername**  
This affects all parameters - no value types will be shown. This has been reported to Microsoft, and they've acknowledged receipt of that report and are investigating. Personally, I believe the problem may be related to internal-use-only tools that are used to create the syntax section of the help files, so hopefully it'll be an easy fix.  
The -full and -detail help still shows the correct information, so if you've downloaded the borked help files, you're not totally out of luck.  
As far as I can determine, this only currently affects core PowerShell cmdlets, not add-in modules from product teams like Exchange, etc. I believe that's because the core cmdlets were just updated and re-published, something the PowerShell team tends to do a bit more frequently than some of the other product groups.  
I'll keep you posted as I learn anything new.

 [1]: http://wp.me/p3priC-25s
