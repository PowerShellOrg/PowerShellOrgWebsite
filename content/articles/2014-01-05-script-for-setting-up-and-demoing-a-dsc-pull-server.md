---
title: Script for Setting Up and Demoing a DSC Pull Server
authors:
  - Don Jones
date: "2014-01-05T18:59:47+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/01/script-for-setting-up-and-demoing-a-dsc-pull-server/
---

[DSC Setup and Demo Scripts][1]  
I recently set up a virtual machine to use for Desired State Configuration (DSC) demos. I wanted to make the demo-ing fairly brainless, as DSC requires a number of setup steps to get a pull server running. So I took some demo scripts Microsoft offered from TechEd 2013, updated them to work with Windows Server 2012 R2 RTM, and thought I'd offer them to you.  
**SetupDSC.ps1** is the main script. Now, because I didn't want to use good ol' Start-Demo, there's a who crapload of kinda ugly Write-Debug statements. That way I can get an "about to do ____" message and then have the script pause before doing it. Lets me explain to the class what's about to happen. You can remove all that crud if you like.  
**InstallPullServerConfig.ps1** and **PSWSIISEndpoint.psm1** are the updated Microsoft scripts. SetupDSC.ps1 calls these. They're intended to run locally; you'll need to be _on _the machine you want to make into a pull server, and it needs to be Windows Server 2012 R2 (the DSC pull server role is part of the OS, not part of Windows Management Framework v4). Setup takes a few minutes, and will install IIS. This sets up an HTTP pull server.  
**SampleConfig.ps1** is a sample DSC configuration, targeted to a computer named MEMBER2. It just specifies that the Windows Server Backup feature be installed. SetupDSC.ps1 actually runs this, which produces a MOF. SetupDSC.ps1 also copies the MOF to the DSC pull server configuration directory.  
**SampleSetPullMode.ps1** also gets run by SetupDSC.ps1. This contains a DSC Local Configuration Manager configuration, targeted to MEMBER2, that turns on pull mode and directs MEMBER2 to pull the previously-created configuration. I think I have it refreshing every 5 minutes, which is totally unrealistic for production. Again, this was made for class demos, but you can adjust the time or leave it off to default to 30min. Running this script creates the MOF and pushes it to MEMBER2. That, in turn, causes MEMBER2 to start pulling the sample config, which causes Windows Server Backup to be installed.  
SetupDSC.ps1 has some additional code to show that Windows Server Backup isn't installed, and then is installed (after you give the pull time to occur).  
Anyway, might need some tweaking to use in production, but hopefully it'll give you a snapshot of the whole DSC process. Much thanks to [James Dawson's article on DSC][2], which gave me a couple of the tweaks I needed to get all this working on RTM code.  
Enjoy.

 [1]: https://powershell.org/wp-content/uploads/2014/01/dsc.zip
 [2]: http://readsource.co.uk/blog/2013/10/1/configuring-powershell-dsc-pull-mode
