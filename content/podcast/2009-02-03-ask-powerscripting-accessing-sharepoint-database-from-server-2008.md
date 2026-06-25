---
title: "Ask PowerScripting: Accessing Sharepoint database from Server 2008"
authors:
  - Jonathan Walz
date: "2009-02-03T16:47:31+00:00"
aliases:
  - /2009/02/ask-powerscripting-accessing-sharepoint-database-from-server-2008/
---

Mark from San Jose California writes:

> I have a powershell script currently running on a Windows2003 server.  It acts upon an Access DB (I know "“ not ideal but it is the only way I could figure out how to add / manipulate records in a Sharepoint list ( the Access DB is just link tables from SharePoint)) "“ via the following Conn String:  $ConnString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=$mdb"
> 
> When I attempt to run in this our new Windows2008 server, I run into the following error:  Exception calling "Open" with "0" argument(s): "The 'Microsoft.Jet.OLEDB.4.0' provider is not registered on the local machine."
> 
> Everything I have found on the web states that you can"™t install the 32bit jet oledb driver on Windows2008.
> 
> Do you have any suggestions on how to get around this issue?

If you have any tips for Mark, please leave them as comments on this post or email them to . We"™ll be reading the question and any helpful answers on an upcoming show. You"™ll also be entered to win a prize in our most recent contest from [Episode 57][1].

 [1]: http://powerscripting.wordpress.com/2009/02/01/episode-57-carter-shanklin-and-the-vi-toolkit/
