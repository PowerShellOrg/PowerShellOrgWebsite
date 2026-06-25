---
title: "DevOps: A Practical Example"
authors:
  - Don Jones
date: "2015-09-11T11:22:12+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/09/devops-a-practical-example/
---

If you look at DevOps as a means of removing hurdles between coders and users, there's almost no better real-world, practical example than Amazon Elastic Beanstalk. If you're not familiar with EBS, look into it - it's kinda cool.

EBS isn't suitable for every situation, to be sure. It's mainly useful for Linux VMs, running Web sites, in fact, which isn't 100% of your workloads. But the _idea_ is pretty awesome. Developers store their code in a source control repo - ideally, Git. Along with their code - and this is the cool bit - they include a configuration file. This file can list things like environment variables, packages (installed from repos using NPM, RHL, YUM, etc), and so on.

When you recycle the application, EBS spins up new VMs _and configures them on the fly to match your configuration file. _It then shuts down any currently running machines. 

So the deal is, _the developer_ specifies the machine configuration - and they can do that in a test silo. All the code, _including the configuration directives, _live in Git. So when it's working in test, you just point the production silo at the same Git repo, and SHAZAM! application is up and running. Nobody manually configures anything. Change the app? No problem - just check in the code and recycle the application, and the new code - and its configuration - is live.

The "ops" portion of the scenario, in other words, is completely automated. Amazon has automated all the bits that sit between a developer and deployed code. Amazon's back end magic reads that configuration document and uses it to configure 1-to-infinity virtual machines as directed. Nobody has to do anything manual. The "server," in the form of a VM, just becomes another software element. "Infrastructure as code," if you will.

Gosh, what could Microsoft do to compete with that in Azure? What could _you_ do, in your "private cloud," to provide similar capabilities?

Hmm... 🙂
