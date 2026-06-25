---
title: We Want Your DSC Resource Wish List!
authors:
  - Don Jones
date: "2014-03-20T16:08:03+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/03/we-want-your-dsc-resource-wish-list/
---

What sorts of things would you want to configure via DSC that don't already have a resource?  
NB: Focusing on the core Windows OS and its components only; Exchange, SharePoint, SQL Server, and other products are off the table for this discussion.  
For example, I want a "log file rotator" resource, that lets me specify a log file folder, an archive folder, and a pair of dates. Files older than one date are moved from the log folder to the archive folder; archived files older than the second date are deleted.  
I'd also like a File Permissions resource. Specify a folder or file, optional recursion, and a set of access control entries (in plain English terms), and it'll make sure the permissions stay that way.  
Maybe also a User Home Folder resource, which would (a) ensure a folder exists for a given set of user accounts, and (b) ensures a set of "template" permissions, so that each individual user has the rights to their folder, plus rights given to global users like admins.  
What resources would YOU like to have to ease configuration and maintenance in YOUR environment? Drop a comment!
