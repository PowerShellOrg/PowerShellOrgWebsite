---
title: Find any E-Mail Address or Proxy Address In Active Directory
authors:
  - Steve Parankewich
date: "2015-10-23T16:58:00+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tutorials
aliases:
  - /2015/10/find-any-e-mail-address-or-proxy-address-in-active-directory/
---

I am back this week with some more Exchange and Unified Communications goodness. This is another request I see a lot, someone want's to know where an e-mail address is assigned. This opens up the possibilities of user mailboxes, shared mailboxes, distribution lists, public folders, conference rooms, contacts or resources. I have also seen duplicate e-mail addresses being assigned outside of Exchange causing delivery failures. I take a look at how you can quickly find any e-mail address in your environment along with partial searches of e-mail addresses. The two attributes for e-mail addresses being mail and proxyAddresses.

I cover finding specific types of proxy addresses such as sip: x500: eum: etc. I also touch briefly on creating a simple function that will accept e-mail addresses as an input to return all of the AD objects that contain it. I cover the search through Active Directory commandlets, including LDAP query syntax, as well as the Exchange commandlets. Head on over to [PowerShellBlogger.com][1] for the full article.

 [1]: http://powershellblogger.com/?p=200
