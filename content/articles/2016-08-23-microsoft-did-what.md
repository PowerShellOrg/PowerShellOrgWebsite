---
title: Microsoft did WHAT?
authors:
  - Missy Januszko
date: "2016-08-23T01:51:05+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/08/microsoft-did-what/
---

Unless you’ve been living under a rock for the last couple of days, you already know that Microsoft announced last Thursday that the shell/scripting language formerly known as “Windows Powershell” is now supported on Linux and MacOS and that Powershell has been open-sourced. And for days, thoughts of “how can I use this?” or “I wonder if ‘x’ will be supported” have been flying through the minds of every system architect as we internally grapple with the possibilities of what could be, while at the same time trying to understand Microsoft’s motivation for this radical change.  
Only the change isn’t so surprising if you think about the changes that Microsoft has been making leading up to this announcement. Separating Powershell Desktop Edition and Core Edition in WMF 5.1. Announcing SQL Server on Linux – after all, IT professionals are going to need a way to administer that SQL instance and it isn’t going to be through a GUI. Supporting Powershell on Linux seemed like a logical next step.  
But it is likely just a step along the road to heterogeneous system management. Microsoft Technical Fellow and Powershell inventor Jeffrey Snover isn’t at all secretive over the fact that the vision is built upon Microsoft’s Operations Management Suite (OMS), a suite of automation and management tools that needs to be able to configure, control, manage, monitor, and self-heal a workload that runs anywhere and on any operating system.  
From the perspective of a system architect that isn’t typically on the bleeding edge of technology, I am still extremely excited over this announcement. Why? The possibilities seem endless. For one, applications that run on either Windows or Linux or a combination of the two can now be configured by the same language, or maybe even the same set of well-designed scripts. Second, the possibility of using Desired State Configuration (DSC), or third-party tooling such as Chef or Puppet in conjunction with DSC, means I can keep \*all\* servers in compliance with their configurations using the same tooling. Third, what Devops engineer wouldn’t love having spent a few years learning a scripting language like Powershell only to have its reach extended to other platforms? This change invariably makes us more valuable to the company by being able to take on additional management responsibilities by using the skills we already have. It can then lead to even more cross-platform learnings and opportunities. I definitely plan to learn more about Linux and how I can help build cross-platform tools. If you have similar interests, here are some great resources to get you started!  
<https://www.pluralsight.com/courses/essential-tools-red-hat-enterprise-linux>  
<https://www.pluralsight.com/courses/linux-networking-advanced-lfce>  
I haven’t even scratched the surface of thinking about all of the ways I want to take advantage of Powershell on Linux, and I have lots of exploring to do to find out what can or can’t be done – but the energy of the entire Powershell community over these changes certainly carries over to me as well. I’m excited to find out what is possible, to build what may not have been possible, and to contribute back to the Powershell community. So kudos to you, “new Microsoft”, for energizing the entire community of Powershell enthusiasts. I can’t wait to see what’s next.
