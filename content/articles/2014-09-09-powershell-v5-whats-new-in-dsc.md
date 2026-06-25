---
title: "PowerShell v5: What's New in DSC"
authors:
  - Don Jones
date: "2014-09-09T17:11:57+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/09/powershell-v5-whats-new-in-dsc/
---

When Desired State Configuration (DSC) came out - gosh, just about a year ago - I kept telling people that there was more to come. And a lot of it is now just around the corner in PowerShell v5.  
_This article is written to the September 2014 preview release - things may change for the final release._  
A major set of changes in DSC is a much more detailed and granular configuration of the Local Configuration Manager (LCM), the local "agent" that makes DSC work on the target node. This new level of configuration really shows you where Microsoft's thinking is.  
For example, a single target node can be configured _to pull configurations from multiple pull servers. _That doesn't necessarily mean separate _machines, _as a single IIS instance can host multiple websites, but it means you're no longer limited to one MOF per computer.  
Yes, I said that. The LCM can now _pull_ (but not have pushed to it) _partial configurations. _Each partial configuration is a MOF, but the understanding is that there can be more than one. There's still no dynamic evaluation of _which_ MOFs will be pulled; you have to specify them all in the LCM configuration, but now you can break a machine's total configuration into multiple bits. Each partial configuration is given a _source_, which is a pull server.  
Each partial configuration can be given exclusivity over certain resources. This helps avoid overlap. For example, you might decided that Partial Config A has exclusive control over all xIPAddress settings, meaning those settings from _any other_ partial config wouldn't work. Partial configurations can also depend on each other, so that (for example), Partial Config B won't even run until Partial Config A is complete.  
The LCM can also have a separate server configured for web- or file-based resource repositories, meaning those can be separated from the pull server endpoint.  
What used to be called the "compliance server" is now simply the _reporting server_ - we mentioned in "The DSC Book" that the name of this would likely change. It's now a distinct configuration item, meaning _even a node in Push mode can report its status to the reporting server!_  
New global synchronization capabilities also exist. A node's configuration can be made dependent on _a configuration item from another node. _Meaning, Node "A" won't try to configure until Node "B" completes certain items first. Communications is all via WS-MAN and CIM.  
A new **Get-DscConfigurationStatus** returns a high-level status for a node - similar to what the reporting server would collect - and an amazing new **Compare-DscConfiguration** can now accept a configuration and tell you _where a given node differs. _This is a big deal, and something a lot of folks wanted in PowerShell v4. There's also an **Update-DscConfiguration, **which forces a node to evaluate its DSC stuff right away.  
DSC is quickly coming of age. In less than a year, we've seen (so far) 6 releases of additional resources, and now with PowerShell v5 we're seeing a number of important enhancements and evolutions in the core technology. Many of the things that frustrated folks initially are now taken care of.
