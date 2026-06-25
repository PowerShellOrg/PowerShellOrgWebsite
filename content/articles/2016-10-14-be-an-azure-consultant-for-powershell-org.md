---
title: Be an Azure Consultant for PowerShell.org!
authors:
  - Don Jones
date: "2016-10-14T22:14:54+00:00"
categories:
  - Announcements
aliases:
  - /2016/10/be-an-azure-consultant-for-powershell-org/
---

So, after our nearly-2-day outage, which was due to a still-not-fully-explained Apache fail, we're looking to make some changes. We need to migrate PowerShell.org to a different Azure subscription anyway, so this is a good time to change the kind of service we're using.  
First, using Azure is non-negotiable. If your expert opinion is to use something else, please just don't ;). **Update: **This might be changing. AWS could be an option.  
Second, our current environment is a classic VM running CentOS 6 (yeah, it's old), WordPress, and MySQL. WordPress and MySQL are also non-negotiable, this isn't about switching CMSs or anything. We use VaultPress for to-the-minute backups, but their restore process is a beast and has never been easy or reliable.  
What we WANT is the ability to more or less push a button and re-deploy the entire site from backup, ideally automated through some OMS trigger that senses when the site has crashed.  
Now, some caveats.

  * Our budget is $200/mo. We take about 150k-200k visitors per month, and WordPress is a reasonably demanding piece of software. We have about 500MB in files and about 300MB (currently) in data, and we grow about 75-ish MB a year.
  * We would ideally like the data backups to be distinct from the site itself. That is, if we could simply kill an old server and deploy a new one, and then drop the data onto it (all automatically), that'd be ideal. This is distinct from simply backing up an entire VM image, since the OS, files, and data would all be one chunk.
  * It'd be lovely if, instead of having to patch and upgrade the OS, we can just kill the current server, deploy a new one with all the new hotness in versions, and drop the data on it.
  * The more of this that lives in Azure (e.g., Backups), the more likely - we feel - we'll be able to automate this entire kill-and-deploy process in OMS or something.

Staying on Linux is fine. It also isn't a pre-req. WordPress (and MySQL, since WordPress doesn't play well with much else) are the main requirements. We'd like to be on a modern (6+) version of PHP, as well.  
**Update: **So, let me outline the kind of thing we're thinking. So far we've gotten a lot of suggestions on which OS to use, or which DB to use, and that wasn't really the question so much as the architecture. For example:

  1. Run a small, on-demand staging instance where patches (WordPress and plugins) are applied to the site. The site's folder is under Git, and after applying updates and testing, we push to a private (because configs contain passwords) GitHub repo. This instance isn't backed up - the important bits are in GitHub.
  2. Use ____ to deploy the actual instance(s) that people will use. This deployment is a la Elastic Beanstalk, where you just push a base OS image and it sucks down your GitHub repo to populate the files of the site. Again, not backed up - GitHub is the backup.
  3. Except for the WordPress Uploads folder, which you redirect to another, simpler instance that serves these as static files. This is a bit complex, because WordPress needs file-based access to this for uploading, while it also needs to be exposed as a web server for downloading. Simple backups to ensure we have copies of the files handy, and we don't need to retain a backup history because there's no code that could break and need to be rolled back.
  4. Data lives on a distinct hosted RDBMS. That's probably MySQL, as it's what's supported with WordPress. We're aware of Namiproject, but unless that's moving in lockstep with the base WP releases and is 100% guaranteed to work with all the plugins we need.... The RDBMS is backed up separately.

A concern with #4 in Azure is that they only offer this (for MySQL) through ClearDb, and I've seen latency and persistency problems. I'm ideally wanting everything hosted in one datacenter/region to reduce that problem. And I'm aware of Namiproject, but we have something a bit more complex than a stock WP install, so someone's going to have to _convince_ me that SQL Server's a safe choice.  
So... any suggestions for a full-stack? Please, be serious and complete - if your suggestion is, "just run VMs," that's not helpful and it'll likely be deleted. But if you've got ideas for a mix of services that you think will do the job - by all means, please, speak up!
