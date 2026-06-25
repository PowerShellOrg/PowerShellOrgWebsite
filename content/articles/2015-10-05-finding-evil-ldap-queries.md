---
title: Finding Evil LDAP Queries
authors:
  - pscookiemonster
date: "2015-10-05T14:17:34+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/10/finding-evil-ldap-queries/
---

Have you ever wondered what LDAP queries were hitting your domain controllers? Even outside of fun investigations, it can be insightful to get a sampling of queries hitting your domain controller. The more services you have integrated with Active Directory, the more likely a vendor or sysadmin unwittingly configured their service to produce evil queries.

Mark Morowczynski from Microsoft wrote a great post on [finding these expensive, inefficient, or long running queries][1] - But something was missing. Screen shots of regedit? If you have more than a handful of domain controllers, enabling and disabling this logging is going to be quite a chore.

[Here's a quick bit][2] on using PowerShell to enable and disable this logging quickly. Take a peek, you might find some misbehaving applications.

 [1]: http://blogs.technet.com/b/askpfeplat/archive/2015/05/11/how-to-find-expensive-inefficient-and-long-running-ldap-queries-in-active-directory.aspx
 [2]: http://ramblingcookiemonster.github.io/Evil-LDAP-Queries/
