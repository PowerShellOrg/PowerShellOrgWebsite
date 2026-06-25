---
title: Going Deeper on DSC Resources
authors:
  - Steven Murawski
date: "2014-03-19T14:43:37+00:00"
categories:
  - Tips and Tricks
aliases:
  - /2014/03/going-deeper-on-dsc-resources/
---

Desired State Configuration is a very new technology and declarative configuration management is a very young space yet.  We (Microsoft and the community) are still figuring out the best structure for resources, composite configurations, and other structures.  
That said, there are certain viewpoints that I've come to, either from hands on experience or in watching how other communities (like the Puppet community or Chef community) handle similar problems.

# How Granular Should I Get?

There is no absolute answer.

## Very, Very Granular

Resources should be very granular in the abstract, but in practice, you may need to make concessions to improve the user experience.  
For example, when I configure an IP address for a network interface, I can supply a default gateway. A default gateway is a route, which is separate from the interface and IP address, but in practice they tend to be configured together. In this case, it might make sense to offer a resource that can configure both the IP address and the default gateway.  
I tend to think resources should be very granular. We can use composite resources to offer higher level views of the configuration. If I were implementing a resource to configure a network adapter's IP and gateway, I would have a route resource, an IP address resource, and probably a DNS server setting resource. I would then also have a composite resource to deal with the default use case of configuring a network adapter's IP address, gateway, and DNS servers together.  
The benefit of doing it this way is that I still have very discrete, flexible primitives (the IP address resource, the route resource, and the DNS server resource). I can then leverage the route resource to create static routes, or use them directly to more discretely configure the individual elements.

## Unless...

You have some flow control that you need to happen based on the state of the client or the environment.  Since your configuration is statically generated and is declarative, there are no flow control statements in the configuration MOF document.  That means that any logic that needs to occur at application time  
Unfortunately, this leads to the need to re-implement common functionality.  For example, if I have a service that I need to be able to update the binary (not via an MSI), I need to basically re-implement parts of the file and service resource.  This use case requires a custom resource because I need to stop the service before I can replace the binary, but I don't want to stop the service with every consistency check if I don't need to replace the file.  
This scenario begs for a better way to leverage existing resources in a cross resource scenario (kind of like RequiredModules in module metadata), but there isn't a clean way to do this **that I've found** (but I'm still looking!).

## My Recommendation

So for most cases, I would try to use existing resources or build very granular custom resources.  If I need to offer a higher level of abstraction, I'd escalate to putting a composite resource on top of those granular resources.  Finally, if I need some flow control or logic for a multistep process, I'd implement a more comprehensive resource.

# What Should I Validate?

Now that we are seeing some more resources in the community repository (especially thanks to the waves of resources from the Powershell Team!), we are seeing a variety of levels of validation being performed.  
I think that the Test-TargetResource function should validate all the values and states that Set-TargetResource can set.  
An example of where this isn't happening currently is in the [cNetworking resource for PSHOrg_cIPAddress](https://github.com/PowerShellOrg/DSC/blob/master/Resources/cNetworking/DSCResources/PSHOrg_cIPAddress/PSHOrg_cIPAddress.psm1).  I'm going to pick on this resource a bit, since it was the catalyst for this discussion.  
The resource offers a way to set a default gateway as well as the IP address.  So what happens if after setting the IP and default gateway, someone changes the default gateway to point to another router?  
In this case, the validation is only checking that the IP address is correct.  DSC will never re-correct the gateway and our DSC configuration document (the MOF file) is no longer an accurate representation of the system state, despite the fact that the Local Configuration Manager (LCM) will report that everything matches.  
**This is BAD!!**  If a resource offers an option to configure a setting, that setting should be validated by Test-TargetResource, otherwise that setting should be removed from the resource.  The intent of DSC is to control configuration, including changes over time and return a system to the desired state.  If we ignore certain settings, we weaken our trust in the underlying infrastructure of DSC.

# What should I return?

The last element I'm going to tackle today is what should be returned from Get-TargetResource.  I've been on the fence about this one.  Like with Test-TargetResource, there are a number of implementation examples that vary in how they come up with the return values.  
Currently, I don't see a ton of use for Get-TargetResource and it doesn't impact the Test and Set phases of the LCM, so it's been easy to ignore.  This is bad practice (shame on me).  
Here's my thoughts around Get-TargetResource.  It should return the currently configured state of the machine.  Directly returning parameters passed in is misleading.  
Going back to the PSHOrg_cIPAddress from the earlier example, it directly returns the default gateway from the parameter, regardless of the configured gateway.  This wouldn't be so bad if the resource actually checked the gateway during processing and could correct it if it drifted.  But it does not check the gateway, so Get-TargetResource could be lying to you.  T  
he most consistent result of Get-TargetResource would be retrieving the currently configured settings.

# What's left?

What other burning questions do you have around DSC?  Let's keep talking them through either in the [forums](https://powershell.org/forums/forum/windows-powershell-qa/) or in the comments here.
