---
title: "PowerShell.org's Azure Journey, Part 4: Incoming Advice and Fun Facts"
author: Don Jones
authors:
  - Don Jones
date: "2013-08-23T14:40:43+00:00"
aliases:
  - /2013/08/powershell-orgs-azure-journey-part-4-incoming-advice-and-fun-facts/
---

Had an opportunity to speak with some folks on the Azure team yesterday - Mark Russinovich was kind enough to make a contact for me.  
First of all, fun fact: Azure only charges you for _used pages_ in VHDs. That is, if you create a 100GB VHD and load 1GB of data on it, you're paying for 1GB of data. Very clever. So it's charging you as if it was a dynamically expanding VHD, but of course it's a fixed VHD with all of the related performance improvements. Nice.  
Second, they basically confirmed something I'd suspected. Azure's "website model" tends to appeal more to smaller businesses or personal Web sites; most "serious" players (my word) are using the IaaS model, meaning they're hosting VMs in the cloud, not just hosting a Web site. Having a full VM under your control obviously has advantages in terms of management, along with the ability to run things like in-memory caching software, load additional Web extensions, and so on. IaaS is absolutely the right model for PowerShell.org for many of those reasons.  
That said, they also confirmed that the Web site model and the IaaS model cost about the same, at least as you get started. So it's really - for a smaller Web site - a matter of what you want to do. Again, there are specifics about the IaaS model that work well for us, so that's what we're looking to do.  
Azure also costs about the same, in an apples-to-apples comparison, as Amazon Web Services. That's probably somewhat deliberate on Microsoft's part, but Azure has advantages. For one, their virtualization layer has been approved by the various Microsoft product teams, so if you're running SharePoint or SQL Server in an Azure VM, the team will support you. Not the case with AWS. Also, I frankly found Azure's presentation of the costs easier to grok.  
Fifth (I love numbered lists, sorry), I confirmed that the IaaS option charges you for (a) the VM's you're running, by the minute; (b) the storage used by all VM VHDs' used pages, and (c) outbound bandwidth. This can potentially make IaaS more expensive than the "website" model because Azure won't spin down an IaaS VM, so you run 24x7 unless you're manually deallocating. With a website, Azure only spins up worker processes when they're needed, so your site isn't "running" 24x7, so you might pay less if it's not being "hit" 24x7. Again, though, the website model offers us less control and flexibility.  
Just thought you'd enjoy some of those details!
