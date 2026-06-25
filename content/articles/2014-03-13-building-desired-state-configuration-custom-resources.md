---
title: Building Desired State Configuration Custom Resources
authors:
  - Steven Murawski
date: "2014-03-14T03:07:14+00:00"
categories:
  - PowerShell for Admins
  - Tutorials
aliases:
  - /2014/03/building-desired-state-configuration-custom-resources/
---

Now that we've suitably rested, let's get back to working with Desired State Configuration.  Now, there are some basic features to work with that ship by default and the [PowerShell team has been blogging some additional resources](http://blogs.msdn.com/b/powershell/archive/2013/12/26/holiday-gift-desired-state-configuration-dsc-resource-kit-wave-1.aspx), but in order to do some really interesting thing with DSC, we'll need to create our own resources.

## The High Points

  * [Overview ](https://powershell.org/2013/10/02/building-a-desired-state-configuration-infrastructure/)
  * [Configuring the Pull Server (REST version)](https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/)
  * Creating Configurations ([one of two](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), [two of two](https://powershell.org/2013/10/14/building-a-desired-state-configuration-configuration-part-2/))
  * [Configuring Clients](https://powershell.org/2013/11/06/configuring-a-desired-state-configuration-client/)
  * Building Custom Resources (this post)
  * Packaging Custom Resources
  * Advanced Client Targeting

## The DSC Resource Structure

DSC resources are (at their most basic) a PowerShell module.  These modules are augmented by a schema.mof file (we'll get into that more in a minute or two).  These modules expose three main functions, Get-TargetResource, Set-TargetResource, and Test-TargetResource.  All three functions should share the same set of parameters.

### Test-TargetResource

Test-TargetResource validates whether your resource is currently in the desired state based on the parameters provided.  This function returns a boolean, $true if the resource is in the state described or $false if not.

### Set-TargetResource

Set-TargetResource is the workhorse in this module.  This is what will get things into the correct state.  The convention is to support one parameter called Ensure that can take two values, "Present" or "Absent" to describe whether or not a resource should be applied or removed as described.  
(Here's a little trick.. if you write break your Test-TargetResource into discrete functions, you can use those functions to only run the portions of Set-TargetResource that you need to!)

### Get-TargetResource

This is currently the least useful of the commands, but if experience has taught me anything, it'll likely have an a growing use case over time.  
Get-TargetResource returns the current state of the of the resource, returning a hash table of properties matching the parameters supplied to the command.

### Exporting Commands

This module should explicitly export these commands via either Export-ModuleMember or a module manifest.  If you don't, Import-DscResource will have trouble loading the resources when you try to generate a configuration (it's not a problem for running a configuration, just the generation part).

### The Managed Object Framework (MOF) Schema

The last piece of the DSC Resource is a schema file that maps the parameters for the command to a CIM class that can be registered in WMI.  This allows us to serialize the configuration parameters to a standards-based format and allows the Local Configuration Manager to marshal the parameters back to call the PowerShell functions for the phase that the LCM is in.  This file is named modulename.schema.mof.  
There is no real reason to write a schema.mof file by hand, both the [DSC Resource Designer](https://github.com/PowerShellOrg/DSC/tree/master/Tooling/cDscResourceDesigner) and my [New-MofFile](https://github.com/PowerShellOrg/DSC/blob/master/Tooling/DscDevelopment/New-MofFile.ps1) function can help generate that function.  The one key thing to be aware of in the schema.mof is that there is an attribute at the top of each of the MOF classes that denotes a friendly name, which is the identifier you will use in a configuration to specify a resource.


`[ClassVersion("1.0.0"), FriendlyName("Pagefile")]
`## How To Structure a Module With Resources

To get a good idea of the resource structure, we can look at [the StackExchangeResources module in the PowerShell.Org GitHub repository](https://github.com/PowerShellOrg/DSC/tree/master/Resources/StackExchangeResources).  There is a base module - StackExchangeResources, which has a module metadata file (required, you'll see why in a minute).  In that module, we need a folder DSCResources.  Our custom resource will be placed under that folder.  
The reason we need a module metadata file for the base module, is when resources from that module are used in a configuration, the generated configuration MOF files will reference the version of the base module (and that specific version is required on the node where the resource will be applied).  
Next up, we'll talk about how we package our resources to be distributed by a pull server.
