---
title: Microsoft announces PowerShell v4, DSC
authors:
  - Don Jones
date: "2013-06-04T14:00:15+00:00"
categories:
  - Announcements
aliases:
  - /2013/06/microsoft-announces-powershell-v4-dsc/
---

Yesterday at TechEd North America, Jeffrey Snover and Kenneth Hansen began describing features to be delivered with PowerShell v4 in Windows Server 2012 R2 (the company has not yet announced availability dates for either).  
In particular, a new feature called Desired State Configuration promises to become the foundation for some pretty serious expansion. Essentially, DSC lets administrators write a declarative "script" that describes what a computer should look like. PowerShell takes that, matches the declarative components with underlying modules, and ensures that the computer does, in fact, look like that. Nearly anything can be checked and controlled: roles, features, files, registry keys - anything, in fact, that a PowerShell module can do.  
The architecture includes the notion of centrally stored declarative scripts, and the ability to dynamically deploy supporting modules on an as-needed basis to computers that are checking themselves. A System Center Virtual Machine Manager demonstration utilized the feature to dynamically spin up brand-new VM instances and have them immediately reconfigure to their desired state.  
At first glance, it's easy to see "more Microsoft stuff" in this feature. After all, the company has previous given us Dynamic Systems Management (DSM), various universal "configuration languages," and even System Center Configuration Manager's somewhat primitive configuration auditing feature. But keep in mind that DSC will **be a core part of the OS.** That means product teams and ISVs can rely on it being there, with no other dependencies to worry about. DSC is also built around DMTF standards - like the MOF format - making it natively suitable for cross-platform management. A demo from Opscode using their Chef product showed clever use of the new DSC feature.  
Hansen also mentioned that PowerShell modules will be deployable through DSC as ZIP files, helping make them more self-contained (not entirely unlike PECL packages in the Unix world).  
There has been no announcement as yet on how far back PowerShell v4 will be made available, nor whether or not DSC is a PowerShell feature or a Windows Server 2012 R2 feature. If it is indeed a PowerShell feature (which I suspect it is), then it'll be available on any system with v4 installed. That will hopefully include at least Windows 7, Windows Server 2008 R2, and later.
