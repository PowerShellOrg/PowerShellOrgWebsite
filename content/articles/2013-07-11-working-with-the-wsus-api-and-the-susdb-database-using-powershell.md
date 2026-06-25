---
title: Working with the WSUS API and the SUSDB Database using PowerShell
authors:
  - Boe Prox
date: "2013-07-12T02:38:43+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/07/working-with-the-wsus-api-and-the-susdb-database-using-powershell/
---

Tthe WSUS API can be used to perform a multitude of WSUS tasks from approving patches, removing clients to creating automatic approval rules to many other things. By diving deeper into the API reveals that we can also find out the name of the SQL server (if using a remote SQL database server) that the SUSDB database is residing on. Beyond that, we can actually perform queries to the database (using TSQL) or perform tasks against the database itself.  
I've written a couple of articles hat focus on making the database connection via the WSUS API and preform a simple query and then following up on that by performing some database maintenance by re-indexing and updating the statistics on the database tables.  
[Use the WSUS API and PowerShell to query the SUSDB Database](http://learn-powershell.net/2013/07/07/use-the-wsus-api-and-powershell-to-query-the-susdb-database/)  
[Using the WSUS API and PowerShell to Perform Maintenance on the SUSDB Database](http://learn-powershell.net/2013/07/07/using-the-wsus-api-and-powershell-to-perform-maintenance-on-the-susdb-database/)
