---
title: Desired State Configuration – General Availability Changes
authors:
  - Steven Murawski
date: "2013-10-18T13:19:21+00:00"
categories:
  - Tips and Tricks
aliases:
  - /2013/10/desired-state-configuration-general-availability-changes/
---

PowerShell DSC, along with Windows Server 2012 R2 has reached General Availability!  Yay!  
However, there is (at least one so far) _**breaking change**_** **in Desired State Configuration (DSC).  
Fortunately, the change is in an area I haven't blogged about yet.. creating custom resources.  Unfortunately, it does mean I'll have to update the [GitHub repository](https://github.com/PowerShellOrg/DSC) and all my internal content (should be done by early next week).  
The short version is that DSC resources are now resources inside modules, rather than each resource being independent modules.  The benefit of this is that now DSC resources won't pollute the module scope, each resource won't need its own psd1 file (the source module will require one though), and it provides an easier way to group resources, which wasn't really possible before.  
So, with GA, resources should go under the module root in a folder DSCResources.  You can have one or more resources in one PowerShell module.  The PowerShell module version is what will be used for the resource version number, so if you have several resources, a version number bump affects all the resources in the module.  
I'll be picking back up with the DSC series next week with how to configure DSC clients, so stay tuned.
