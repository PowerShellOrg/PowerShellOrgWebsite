---
title: Reporting On Installed Windows Programs Via The Registry
authors:
  - Jonathan Medd
date: "2014-01-31T14:37:18+00:00"
categories:
  - Scripting Games
aliases:
  - /2014/01/reporting-on-installed-windows-programs-via-the-registry/
---

Quite a common request for working with Windows machines is to report the software installed on them. If you don’t have a centralised system for reporting on client software (many places don’t) then you may turn to some form of scripted method to obtain this information.  
Most people tend to head to **Add / Remove Programs** when thinking about what software is installed in Windows. However, not all applications will always populate information in there, depending on how they have been installed. Additionally, to query that information you would typically query the WMI class Win32_Product, however this [can lead to performance issues](http://support.microsoft.com/kb/974524).  
[Click here](http://www.jonathanmedd.net/2014/01/reporting-on-installed-windows-programs-via-the-registry.html) to be redirected to the original post of this article on the author’s blog site where you can read the remainder of the article.
