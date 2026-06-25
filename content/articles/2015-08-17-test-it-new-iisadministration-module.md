---
title: "TEST IT: New IISAdministration Module"
authors:
  - Don Jones
date: "2015-08-17T17:35:08+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/test-it-new-iisadministration-module/
---

It's no secret that Microsoft's WebAdministration module isn't universally loved. It's functionality isn't deep, and it doesn't play well in the PowerShell pipeline. There are also a number of things in it that run really slowly, making bulk administration a pain.

Last week, [Baris Caglar announced that Windows 10 contains a new IISAdministration module][1], which is a rough draft of what is hoped to be a final module in Windows Server 2016. **If you use IIS, get hold of this and start testing so the team can get feedback.** Note that this is a _feature of Windows 10; _I haven't yet been able to test and see if file-copying it to another version of Windows will work or not (if you try, please post your results in a comment). The module seems to rely heavily on the [IIS Administration .NET class][2], going so far as giving you easy access to an instance of it so you can code against it directly for whatever the module itself doesn't offer.

IIS as a product is in a weird place, because it no longer has a dedicated sub-team within the Windows Server team (at least, it didn't last I checked). That's made it difficult for anyone at Microsoft to produce a better administration module, since nobody really "owned" the product as their daily job, and nobody was available to be tasked with PowerShell improvements. Hopefully this new module is a step in the right direction at last.

Some of what we still don't know:

  * Will this be released under an open-source license, perhaps posted on GitHub where others can contribute?
  * Is the Win2016 release a for-sure on finalizing this module, or is that more a target? How will subsequent releases be made available?
  * Can this be made available for downlevel operating systems? The .NET class in question has been around since IIS7, so it seems in theory that the code would run on older versions of Windows.

Unfortunately, because Microsoft's IIS.NET blog system doesn't seem to do well with handling spam 😉 I'm not sure asking the author there will produce any answers - but let's try!

 [1]: http://blogs.iis.net/bariscaglar/iisadministration-powershell-cmdlets-new-feature-in-windows-10-server-2016
 [2]: https://msdn.microsoft.com/en-us/library/microsoft.web.administration.servermanager(v=vs.90).aspx
