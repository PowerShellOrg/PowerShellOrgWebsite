---
title: Every pithy witticism begins with quotation marks
authors:
  - msorens
date: "2016-07-23T22:56:52+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tutorials
aliases:
  - /2016/07/every-pithy-witticism-begins-with-quotation-marks/
---

**"To be or not to be".** Without getting into a debate over whether Shakespeare was musing about being a logician, suffice to say that in writing prose, the rules of _when_ and _how_ to use quotation marks are relatively clear. In PowerShell, not so much. Sure, there is an [about_Quoting_Rules][1] documentation page, and that is a good place to start, but that barely covers half the topic. It assumes you need quotes and then helps you appreciate some of the factors to consider when choosing single quotes or double quotes.  
But do you _need_ quotes? Remember PowerShell is a shell/command language so "obviously" you can do things like this:


`PS> Delete-Item C:\tmp\foobar.txt
PS> Get-ChildItem *.log
PS> Get-Process svchost, conhost, powershell
`It would certainly be cumbersome if you needed to quote each of those arguments, so PowerShell was designed well, in that respect.  
But what if you ran the same commands just slightly differently?


`PS> "C:\tmp\foobar.txt" | Delete-Item
PS> "*.log" | Get-ChildItem
`Here you _must_ use quotation marks or you will suffer the wrath of a terminating error from the PowerShell host most certainly!  
Those are just a couple of the many examples I consider in [When to Quote in PowerShell][2]. Accompanying the full article, I also included a wallchart that condenses all the article's salient points into a single-page reference. Here's a fragment of the wallchart:  
![Guide to PowerShell Quoting wall chart](https://powershell.org/wp-content/uploads/2016/07/quoting_thumbnail-300x198.png)  
Read the article and download the wallchart [here][2].

 [1]: https://technet.microsoft.com/en-us/library/hh847740.aspx
 [2]: https://www.simple-talk.com/sysadmin/powershell/when-to-quote-in-powershell/
