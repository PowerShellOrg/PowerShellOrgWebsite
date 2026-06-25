---
title: "Microsoft's Brave New World Needs Version Numbers"
authors:
  - Don Jones
date: "2015-12-28T19:21:23+00:00"
categories:
  - News
  - PowerShell for Admins
aliases:
  - /2015/12/microsofts-brave-new-world-needs-version-numbers/
---

In Microsoft's brave new world of agile, more-frequent software releases, including numerous pre-release cycles... Microsoft needs to rethink the way it communicates versioning.  
Windows Management Framework (WMF) v5 has, for me, been pretty much the perfect example of what _not_ to do, and the perfect example of Microsoft still shoehorning itself into old nomenclature that no longer fills the bill. I know a bunch of folks on the PowerShell team are probably still trying to figure out what works, too, so this isn't meant to be a hammer-on-'em post, but WMF5's lifecycle was, from a versioning perspective, pretty hellish.  
We had several "technology preview" releases, which were simply named after their month of release. April 2015. November. Whatever. It was really difficult from within the product - e.g., via $PSVersionTable - to tell which one you were running, which made helping people difficult. None of these were supported in production until the "WMF5 Production Preview" released in late 2015, and in December we got "RTM" code. RTM means "Released to Manufacturing," which is kind of absurd as a milestone, because there's literally zero actual manufacturing going on. It's just a word Microsoft is used to using. Windows 10 shipped with a production-supported version of WMF5, but it still wasn't "final," meaning RTM WMF is better than what shipped with the RTM OS. God willing, what ships in Windows Server 2016 will be v5.1 or something, because if we get yet another 5.0 release folks are going to start throwing up their hands and quitting.  
Now that Microsoft's all lovey-huggy with open source and Linux and stuff, can we just copy what those guys do?  
Every time you release code, increment the version number. It's that simple. There's no "production preview," there's just "5.3." And you maintain a list of what's supported in production. If 5.3 isn't a production milestone, fine - say so. But it's still a real version, because it was released unto the world. The next release is 5.4. Then 5.5. And maybe 5.6 is supported in production, but once 5.7 is out, 5.6 remains supported for only 90 days. Or whatever. Just have a list of what's supported, and increment the version number every time you release it. 5.8 might only last a week before someone finds some heinous bug and releases 5.9 - that's fine. After that comes 5.10, and then 5.11, and so on.  
6.0 is the first release of a major new evolution in the product, and it's probably a "preview" release. 6.1 will be a bit better, with fewer bugs and more features nailed down, but it won't be until maybe 6.5 that we get a "supported in production" release.  
All of this is a **lot easier to keep track of** than vague "version" numbers like "April 2016 Production Preview."  
And while we're at it, let's have a Get-PSVersionInfo cmdlet. It can wrap around the existing $PSVersionTable variable, of course, but it can also ping a web service on Microsoft.com to tell you what the _latest_ version is, what the _latest supported_ version is, and whether or not your current version is supported in production. OMG, that would be _wonderful. _


`PS C:\> Get-PSVersionInfo
Name                   Value
----                   ------
PSVersion              5.8
ProductionOK           False
LatestPSVersion        6.0
LatestProductionPSVer  5.9
`This tells me that I have 5.8, and it isn't supported in production at this time. I can get 5.9, which is supported in production, although there's a newer 6.0 which obviously isn't supported in production.  
So please. [Vote for this on UserVoice][1].

 [1]: https://windowsserver.uservoice.com/forums/301869-powershell/suggestions/11226561-version-numbering-for-all-releases
