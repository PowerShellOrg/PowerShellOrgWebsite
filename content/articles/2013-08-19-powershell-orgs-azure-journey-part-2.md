---
title: "PowerShell.org's Azure Journey: Part 2"
author: Don Jones
authors:
  - Don Jones
date: "2013-08-20T01:10:01+00:00"
aliases:
  - /2013/08/powershell-orgs-azure-journey-part-2/
---

I had no idea Azure gives MSDN subscribers a huge free monthly credit - $200 for the first month, and then on the Ultimate subscription level (which is what I get as an MVP) you get  $175 per month thereafter. That starts to really justify the MSDN pricing. You want a lab in the cloud? Free Azure!  
Given the free-ness of it, I decided to set up a PowerShell.org in the sky to see how it went. Configuring dual CentOS VMs was a bit of an all-day affair; I have less experience with RHEL (which is what CentOS is based on) and it took me a while to figure out that the built-in firewall was causing all my grief. Fixed now.  
Microsoft publishes some pretty good guides for getting a LAMP stack running on CentOS in Azure. Not great guides, but good. They lack a decent guide on getting Passive FTP working - and it's a PITA because Azure only lets you configure incoming ports on a one-at-a-time basis (not ranges), and you can only have 25. So that's kind of a pain. But I got it working, got MySQL installed and working, and I'm presently waiting on VaultPress to smush up our latest site backup and spew it onto the Azure server. Remember: you don't pay for bandwidth going _into_ Azure, so I can load the backup in as many times as I want without incurring bandwidth.  
This VaultPress thing is neat, if it works. It continually pulls changes from our WordPress installation and backs them up, timestamped, a la Apple Time Machine. Allegedly, if you give them the FTP info on you new server, and you have a base WordPress install working on the new server, they can "push" your whole site down to the new server. Given my fits and starts with FTP on CentOS today, we'll see how well it works, but I'm optimistic. Dunno. It's been saying "Testing Connection" for a long time now. Sigh.  
Anyway, I'm starting both VMs in extra-small instances. Part of what I want to play with is whether or not I can upgrade those to bigger instances without breaking the universe. Depends on how CentOS behaves when it suddenly finds itself running on "new hardware." We shall see! If it works, then it'll truly be killer in terms of scaling. I also want to see if we get more "juice" running two load-balanced extra-small instances vs. a small instance (which is technically twice as big as an extra-small). Common logic suggests that more, smaller servers is better - a la every web farm, ever. But it'll be fun to test.  
**Question:** anyone have any Web site load-testing software they're fond of? Mac or Windows is fine, or even both. I'll enlist some folks to help with that, since I know my DSL line's upstream side will chokepoint long before the Azure server does. Ooo, maybe we can have a PowerShell.org botnet that I could control... bwaa haa haa!  
Meantime, Eric Courville, our new volunteer Webmaster, is setting up a similar Azure-based VM set with his own MSDN subscription. In addition to documenting the setup process, we're going to try and do some load-testing and see what kind of instances we need to run in to get solid performance out of the site. PowerShell.org currently peaks at fewer than 50-60 concurrent connections (and even that day was a rare peak), so we'll load test to that number.  
Stay tuned!
