---
title: "New PS Module for working with F5's LTM REST API"
authors:
  - Joel Newton
date: "2015-05-27T04:54:03+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
aliases:
  - /2015/05/new-ps-module-for-working-with-f5s-ltm-rest-api/
---

If you use F5's BIG‑IP Local Traffic Manager (LTM) for load-balancing, then you may find the new PS module I've written helpful. The module uses the REST API in ver. 11.6 of the LTM to query and manipulate an F5 LTM device. You can add and remove members from a pool, enable and disable them, and find out what pools a member is in, among other things.  
I've made the module files available [here][1]. I welcome all comments.  
A few notes: Since the module uses the Invoke-WebRequest cmdlet, PowerShell 3 or higher is required. Also, since some F5's utilize self-signed certificates, and Invoke-WebRequest is unhappy if part of the certificate chain isn't trusted, I've included a dependency on Jaykul's PS module [TunableSSLValidator](https://github.com/Jaykul/Tunable-SSL-Validator), which allows for temporarily ignoring certificate errors. If you're using a trusted certificate chain, then you don't need the TunableSSLValidator module and can remove the -insecure flags from the Invoke-WebRequest calls.  
Cheers,  
Joel

 [1]: https://github.com/joel74/POSH-LTM-Rest
