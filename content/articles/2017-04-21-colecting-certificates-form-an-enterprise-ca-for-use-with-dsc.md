---
title: Colecting Certificates form an Enterprise CA for use with DSC
authors:
  - David Jones
date: "2017-04-21T16:29:24+00:00"
categories:
  - DevOps
  - PowerShell for Admins
  - Tools
aliases:
  - /2017/04/colecting-certificates-form-an-enterprise-ca-for-use-with-dsc/
---

In a domain environment auto enrollment can be used to get create unique certificates for each node that can be used with DSC.  The problem is getting the public cert to the machine that creates the DSC MOF files. I wrote a module last year to collect them directly form the Enterprise CA. If it interests you take a look <https://blog.bladefirelight.com/nuggets/collecting-ca-certificates-for-dsc-configuration/>
