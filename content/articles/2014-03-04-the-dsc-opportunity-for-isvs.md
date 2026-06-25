---
title: The DSC Opportunity for ISVs
authors:
  - Don Jones
date: "2014-03-04T23:45:02+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/03/the-dsc-opportunity-for-isvs/
---

Desired State Configuration offers a number of immediate opportunities for independent software vendors (ISVs) who are smart enough to jump on board _now. _DSC currently suffers from a marked lack of tooling. That's partially deliberate; MS obviously needs to deliver the functionality, and they may well rely on third parties or the System Center team to build tools on top of that functionality. But let's explore some of the immediate opportunities.  
**Change Control and Versioning**. This should be pretty easy. We basically need a way to "check in" a new DSC configuration, possibly have it go through an approvals workflow, and then deploy it. In more detail, I'd want to be able to submit a configuration script to this tool. It would run the config, generate a MOF, and deploy it to a "lab" pull server location. I could then verify its functionality, and "approve" it to deploy the MOF to a production pull server. Deployment would include creating the necessary checksum file. Obviously, rollback capability to a previous version would be nice.**  
**  
**Configuration Consolidation. **Natively, DSC requires me to specify the nodes I want to push a configuration too. I'd like to see a tool that lets me create server lists somewhat graphically, organizing things so that a single server might appear in a "domain controllers" list, a "New York servers" list, and a "Win2012R2" list.  I could target configurations at each list, and the tool would combine those configurations to create the appropriate one for each node based on its "folder memberships." That might be done through composite resources. This makes DSC work a bit like GPO, with this tool doing the work of combining configurations into a single one per node.  
**DSC Studio. **Using the underlying DSC Resource Kit and Resource Designer for functionality, give me an IDE that lets me graphically design a resource (specify properties) and then spit out the schema MOF and skeleton PSM1 file. This could probably be a very simple PowerShell ISE add-on, in fact.  
**Node management. **In a pull server environment, give me a tool that lets me group servers. The tool should modify the LCM on each group, so that each member of the group has the same DSC configuration ID. That way, they're all pulling the correct MOF from the pull server. Otherwise, managing GUIDs gets out of hand pretty quickly - I can see a lot of Excel spreadsheets.  
**Resources**. There are obviously a ton of resources to be written. This might be a bit of a bad call for an ISV, as you never know what MS is going to release resources for. Now that MS has built so many PowerShell cmdlets, building resources on top of them gets pretty straightforward. They've pumped out two waves of resources pretty fast already.  
In short, I think there's a big opportunity for a smart company. It's a matter of seeing the "holes" in the technology, which currently focus mainly on management, and filling them in.
