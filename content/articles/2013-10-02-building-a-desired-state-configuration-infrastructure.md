---
title: Building a Desired State Configuration Infrastructure
author: Steven Murawski
authors:
  - Steven Murawski
date: "2013-10-02T19:35:41+00:00"
categories:
  - Tutorials
aliases:
  - /2013/10/building-a-desired-state-configuration-infrastructure/
---

This is a the kickoff in a series of posts about building a [Desired State Configuration (DSC)](http://technet.microsoft.com/en-us/library/dn249912.aspx) infrastructure. I'll be leveraging concepts I've been working on as I've been building out our DSC deployment at [Stack Exchange](http://stackexchange.com).

## The High Points

  * Overview (this post)
  * [Configuring the Pull Server (REST version)](https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/)
  * Creating Configurations ([one of two](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), [two of two](https://powershell.org/2013/10/14/building-a-desired-state-configuration-configuration-part-2/))
  * [Configuring Clients](https://powershell.org/2013/11/06/configuring-a-desired-state-configuration-client/)
  * [Building Custom Resources](https://powershell.org/2014/03/13/building-desired-state-configuration-custom-resources/)
  * Packaging Custom Resources



  * Advanced Client Targeting

I'm starting today with the general overview of what I'm trying to accomplish and why I'm trying to accomplish this. The **what** and **why** are critical in determining the **how**

## The Overview

### Goal:

All systems have basic and general purpose roles configured and monitored for drift via Desired State Configuration.

### Reason:

System configuration is the one of the silent killers for sysadmin (yes, I prefer sysadmin to IT Pro - deal with it). In the case where deployments are not automated, each system is unique, a snowflake that results from the our fallibility as humans.  
The more steps involved that require human intervention allow for more potential failure points. Yes, if I make a mistake in my automation, then that mistake can be replicated out. But as Deming teaches with the Wheel of Continuous Improvement ([Plan, Do, Check, Act](http://totalqualitymanagement.wordpress.com/2009/02/25/deming-cycle-the-wheel-of-continuous-improvement/)),  we can't correct a process problem until we have a stable process.  


  [![](http://totalqualitymanagement.files.wordpress.com/2009/02/deming-wheel4.png?w=459&h=306)](http://totalqualitymanagement.wordpress.com/2009/02/25/deming-cycle-the-wheel-of-continuous-improvement/)



    Deming Cycle




Every intervention by a human adds instability to the equation, so first we need to make the process consistent. We do that by standardizing the location(s) of human intervention.  Those touch points become the areas that we can tweak to further optimize the system.  I'm getting a bit ahead of myself though.  
Let's continue to look at how organizations tend to deploy systems.  Organizations tend to have several levels of flexibility in their organizations about how systems are built and provided for use.  The three main categories I see are:

  * Automated provisioning from a purpose built image
  * Install and configure from checklist
  * Install and configure on demand

Usually, the size of the organization tends to indicate to what level they've automated deployments, but that is less true today.  Larger organizations tend to have more customized and automated deployments.  It's mainly been a matter of scale.  With virtualization and (please forgive me) cloud infrastructures, even smaller organizations can have ever increasing numbers of servers to manage, with admin to server ratios of 1 to hundreds being common and where the number of servers starts to overtake the client OS count.  
If we aren't in a fully automated deployment environment, each server has the potential to be subtly (or not so subtly) unique.  Checklists and scripts can help with how varied our initial configurations can start out, but each server is like a unique piece of art ([or a snowflake](http://martinfowler.com/bliki/SnowflakeServer.html)).  


  [![](http://upload.wikimedia.org/wikipedia/commons/7/7d/Poseidon_sculpture_Copenhagen_2005.jpg)](http://upload.wikimedia.org/wikipedia/commons/7/7d/Poseidon_sculpture_Copenhagen_2005.jpg)



    Try to make more than one of me...




That's kind of appealing to sysadmins who like to think of themselves as crafters of solutions.  However, in terms of maintainability, it is a nightmare.  Every possible deviation in settings can cause problems or irregularities in operations that can be difficult to track down.  It's also much more work overall.  
What we want our servers to be is like components fresh off the assembly line.  


  [![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmOiGPPMI-4_RYvO-um41VjgVBE6i04TQWKUF83Gc_RhVbE8r7FyJcYCt)](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmOiGPPMI-4_RYvO-um41VjgVBE6i04TQWKUF83Gc_RhVbE8r7FyJcYCt)



    Keeping it consistent




Each server should be consistently stamped out, with minimal deviations, so that troubleshooting across like servers is more consistent.  Or, even more exciting, if you are experiencing some local problems, refreshing the OS and configuration to a known good state becomes trivial.  Building the assembly line and work centers can be time consuming up front, but pays off in the long haul.

#### My Situation:

At Stack Exchange, we are a mix of these categories.  All of our OS deployments are driven by PXE boot deployments.  For our Linux systems, we fall into the first group.  We can deploy an OS and make the addition to our [Puppet](https://puppetlabs.com/puppet/puppet-open-source) system, which will configure the box for the designated purpose.  For our Windows systems, we operate out of the second and third groups.  We have a basic checklist (about 30-some items) that details the standards our systems should be configured with, but once we get to configuring the server for a specific role, it's been a bit more chaotic.  As we've migrated to Server 2012 for a web farm and SQL servers, we've began to script out our installations for those roles, so they were kind of automated, but in a very one-time run way.  
Given where we stood with our Windows deployments and the experience we had with Puppet, we looked at using Puppet with our Windows systems (like [Paul Stack](https://twitter.com/stack72) - [podcast](http://herdingcode.com/herding-code-174-paul-stack-on-automating-windows-configuration-management-with-puppet-and-powershell/), [video](https://vimeo.com/68226718)) and decided not to go that route (why is probably worthy of another post at another time).  That was around the time that DSC was starting to peek it's head out from under the covers of the Server 2012 R2 preview.  Long story made short, we decided to use DSC to standardize our Windows deployments and bring us parity with our Linux infrastructure in terms of configuration management.

#### Proposed Solution: Desired State Configuration

DSC offers us a pattern for building idempotent scripts (contained in DSC resources) and offers an engine for marshaling parameters from an external source (in my case a DSC Pull Server, but could be a tool like Chef or some other configuration management product) to be executed on the local machine, as well as coordinating the availability of extra functionality (custom resources).  I'm building an environment where a deployed server can request it's configuration from the pull server and reduce the number of touch points to improve consistency and velocity in server deployments.  
**Next up, I'm going to talk about how I've configured my pull server, including step by step instructions to set one up on Server 2012 R2.**
