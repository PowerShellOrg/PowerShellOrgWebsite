---
title: A Real-World DevOps Implementation – and Food for Thought
authors:
  - Don Jones
date: "2015-12-03T21:02:23+00:00"
categories:
  - DevOps
  - PowerShell for Admins
aliases:
  - /2015/12/a-real-world-devops-implementation-and-food-for-thought/
---

Want to see what a real-world, functional, production-grade DevOps environment looks like?  
Look no further than Amazon Web Services' Elastic Beanstalk (EBS). EBS is a neat combination of their EC2 IaaS product, S3 storage, and some DevOps magic. From a working perspective, it goes something like this:

  1. Developer checks code into Git. A portion of this code is actually a set of EBS directives, outlining changes that need to be made to the base operating environment. This can include things like setting environment variables, installing packages, and so on.
  2. Someone indicates that what's in GitHub is ready for release. You can do this by pushing a button in your AWS console, or by making a call to AWS' REST APIs. It's pretty easy to automat this step.
  3. AWS spins up virtual machines, and reads the EBS directives to get that environment configured the way it's supposed to be. The code is loaded from Git into the VMs. The VMs are registered with AWS' load balancer, and whatever old VMs were running are de-registered and destroyed. Poof, your app is up and running.

This model accomplishes the basic goal of DevOps, which is to shorten the path between developers and users. So where's the "Ops" role in all this? Amazon did it. Their contribution to ops was to create all the automation necessary to make these steps happen. And the beauty of this model is that it supports tiered environments. For example, the above three steps might serve to spin up a testing environment, where you then run automated tests to validate the code. If the code validates, it's pushed into a production tier - all automatically - running on a separate EBS application. So from check-in to in-production is entirely automated, and the process can be performed consistently every single time.  
Now... what would this look like in a Windows world?  
In Step 1, imagine that instead of a set of EBS configuration directives - which are just text files - your developers create DSC configurations. Yes, the developers. After all, they're the ones who are coding for the environment, so that DSC configuration documents what they need the environment to look like. You might have a second DSC configuration that documents corporate standards for security, manageability, and so on. Whatever.  
Step 3 might be Microsoft Azure Pack or System Center Virtual Machine Manager, told - perhaps via an SMA automation script - to spin up the new VMs from a base OS image. The DSC configurations are run to produce a MOF, which is injected into the new VM. The developer's code is deployed to the VM. The VM is registered with DNS and perhaps a load balancer, which provide access to it.  
There are a couple of important details that I've glossed over a bit. Jeffrey Snover is fond saying, "treat servers like cattle, not pets." But servers by their nature have to have a few unique pieces of information, right? Well... yes and no. For all I know, cows make up names for themselves. I just don't care. Take IP addresses, for example. You shouldn't be assigning static IP addresses to servers; your DHCP system should be highly available, fault tolerant, and set up to handle servers. As you spin up a new VM, you can obviously have it register itself with DNS, so the IP address is mapped to a hostname. And speaking of that hostname - you as a human never need to know it. Or you shouldn't. Windows will make up a host name for itself as the VM spins up, and you can - through your automation scripts - capture that host name. That lets you set up DNS CNAME records, a load balancer, or whatever else. The point is that while the server may have made up a name for itself, you don't care. Nobody will ever address that server by its host name - they'll use an abstraction, like a load-balanced name, or a CNAME, or something else. Your automation scripts handle the mapping for you. When a VM is spun down, automation de-registers the dying host's name from whatever, closing the lifecycle loop.  
Interestingly, you could probably do this exact model, today, with a huge number of applications in your environment. Why bother? I mean, this model makes sense in web apps where you're constantly spinning up and destroying VMs, but what about the majority of your apps that just run all the time without change? Well, this same model could spin them up in a disaster recovery scenario. Or in testing environments, which are constantly re-created to provide "clean" tests. Yes, it's a lot of _investment_ up front to make it all work, but once it's set up it just runs itself.  
And that's what DevOps looks like.
