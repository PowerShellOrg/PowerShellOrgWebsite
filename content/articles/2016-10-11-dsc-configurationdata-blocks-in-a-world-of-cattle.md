---
title: DSC ConfigurationData Blocks in a World of Cattle
authors:
  - Don Jones
date: "2016-10-11T21:01:59+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/10/dsc-configurationdata-blocks-in-a-world-of-cattle/
---

As you may know, Jeffrey Snover and I have, for some time, been on a "servers are cattle, not pets" kick. Meaning, servers shouldn't be special, individualized snowflakes. They should be, in many regards, appliances. One dies, you eat it and make another. They don't have names - that you know of. They don't have IP addresses - that you know of. Oh, I mean, they _have_ them, but you don't know them and don't care.  
Anyway, one thing that came up in a recent conversation related to DSC's ConfigurationData blocks. Have a [look at the MSDN documentation][1] and tell me what you see.  
Go on, I'll wait.  
You see **NodeName. **But damnit, if servers are cattle and cattle don't have (known) names, what the dude is NodeName all about?  
Well, for one, it was a poor choice on the team's part. I'd have called it - and this is giving away the punchline - **NodeRole. **Imagine that your "NodeName" was "SalesAppWebServerRole." When you run your configuration script, you get a MOF named SalesAppWebServerRole.mof, right? Which you then checksum and load onto a pull server. And when you're spinning up a new server to host that role, you tell its LCM to grab the ConfigurationName "SalesAppWebServerRole."  
The server, when spinning up, makes up a name for itself. Charming, right? Cows think they have names. Sweet. Don't care. It gets an IP address for itself, partially from DHCP of course, and partially by making up the other necessary IPv6 stuff (oh, and IPv6 is a thing now, so get on board).  
Then, presumably, it runs to the pull server, grabs the MOF, and starts a consistency check. During which, presumably, _it registers some known name with DNS or load balancer or something. _Now you know it's "name!" Or the name you want to call it by, at least. Also presumably, your load balancer knows to remove or suspend the entry if the host stops responding, and to periodically scavenge stale records (remember, the node's own LCM will make sure its entry gets put back, on the next consistency check run). So if the node dies and you spin up a new one, the rest of the affected infrastructure - DNS, load balancers, what have you - clean themselves up automatically (and DSC could be involved in that process, too).  
Anyway... the point is that ConfigurationData blocks can absolutely be used for cattle farms, not just for pet shops. "NodeName" is a misleading setting, but if you think of it as a role, which could be applied to multiple actual machines, then it makes a lot more sense that way.

 [1]: https://msdn.microsoft.com/en-us/powershell/dsc/configdata
