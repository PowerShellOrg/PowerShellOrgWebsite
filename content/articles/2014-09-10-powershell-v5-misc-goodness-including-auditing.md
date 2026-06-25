---
title: "PowerShell v5: Misc Goodness (including Auditing)"
authors:
  - Don Jones
date: "2014-09-10T14:49:04+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/09/powershell-v5-misc-goodness-including-auditing/
---

Aside from classes and new DSC features, which I've already written about, there are a number of less-headline, but still-very-awesome, new capabilities.  
_This article is based on the September 2014 preview release of WMF 5.0. Information is highly subject to change._  
First up is the **ability to automatically create PowerShell cmdlets from an OData endpoint. **Huh? OData is a kind of web service (basically); PowerShell gains the ability to look at the endpoint and construct a set of proxy cmdlets that let you interact with the endpoint more naturally. This is spiritually similar to what PowerShell can already do for a SOAP web service endpoint.  
Next are some 7-years-overdue cmdlets for **managing ZIP files**: Compress-Archive and Expand-Archive. Finally. These use underlying .NET Framework ZIP functionality (I think), which has had _some_ compatibility problems in the past, so we'll see how these hold up. But they should be the missing link to letting you do everything DSC-related right in PowerShell, since you can now ZIP up your custom resources for deployment via pull server.  
**Auditing gets a huge win**, and this is really more of a headline feature than people think. For one, the ISE now supports transcript creation. Yay! You can also "nest" transcripts, meaning you can have one running, and then start a second one to cover only a portion of time. Closing the second one lets the first remain running. You can also specify a central transcript directory, which is useful when you want to collect these things into a central folder for reporting. For example, you should now be able to set up Remoting endpoints that automatically kick off a transcript when someone connects, and saves them to that central location.  
**More auditing** comes in the form of Group Policy settings. You've always been able to log the fact that certain commands were run (did you know that?), but now you can enable detailed script tracing that logs a crapload of detail to the PowerShell operational log (which can, like any other event log, be forwarded to another server). You get the complete details of every script block executed, even if it creates another script block. Again, this is set up in Group Policy - check out the WMF 5.0 release notes for the location.  
**Ed Snowden gets a face slap** with new Cryptographic Message Syntax (CMS) cmdlets, including Get-CmsMessage, Protect-CmsMessage, and Unprotect-CmsMessage. These use PKI to encrypt data. By the way, **if your organization doesn't already have an internal PKI, WTF are you waiting for, you're ten years behind the curve, man. **PKI becomes more important to Windows environments every single day, and you need to get with the program.  
There's also a new **fun feature for extracting content from strings. **This system uses some Microsoft Research functionality called FlashExtract. Essentially, you give it examples of what your data looks like, and then point it to a big string (like a text file) full of data. It can extract all the data pieces based on your example. It's early days for this technology, but it's kind of _awesome_ to see the PowerShell team giving us an easy way to play with it.  
Because WMF 5.0 **introduces PowerShellGet**,** **it now includes commands to add PowerShellGet repositories. That means you can stand up your own repo, host your modules there, and install modules by simply running Install-Module (or find them using Find-Module). Tres awesome! We don't yet have technical details on what the heck a PowerShellGet repository actually looks like, but I'm sure that'll crop up.  
ARE YOU PLAYING WITH WMF 5.0 ON A NON-PRODUCTION VM YET? YOU SHOULD BE. Times are changing and you gotta keep up!
