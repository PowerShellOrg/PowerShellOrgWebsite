---
title: Using Azure Desired State Configuration – Part I
authors:
  - Will Anderson
date: "2017-09-25T14:00:45+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/09/using-azure-desired-state-configuration-part-i/
---

I've been wanting to do this series for a while, and with some of the recent changes in Azure Automation DSC, I feel like we can now do a truly complete series.  So let's get started!  
Compliance is hard as it is.  And as companies start moving more workloads into the cloud, they struggle with compliance even more so.  Many organizations are moving to Infrastructure-as-a-Service for a multitude of reasons (both good and bad).  As these workloads become more numerous, IT departments are struggling with keeping up with auditing and management needs.  Desired State Configuration, as we all know, can provide a path to not only configuring your environments as they deploy as new workloads, but can maintain compliancy, and give you rich reporting.  
Yes.  Rich reporting from Desired State Configuration, out of the box.  You read it right.  You can get rich graphical reporting out of Azure Automation Desired State Configuration out of the box.  And you can even use it on-prem!  
![](https://powershell.org/wp-content/uploads/2017/08/Compliance-300x200.jpg)  
In this series, we're going to be discussing the push and pull methods for Desired State Configuration in Azure.  We'll be going over some of the 'gotchas' that you have to keep in mind while deploying your configurations in the Azure environment.  And we'll be talking about how we can use hybrid workers to manage systems on-prem using the same tools.  
**Push vs. Pull**  
Desired State Configuration, like a datacenter implementation, can be handled via push or pull method.  Push method in Azure does not give you reporting, but allows you to deploy your configurations to a new or existing environment.  These configurations, and the modules necessary to perform the configuration, are stored in a private blob that you create, and then the Azure Desired State Configuration extension can be assigned that package.  It is then downloaded to the target machine, decompressed, modules installed, and the configuration .mof file generated locally on the system.  
Pull method fully uses the capabilities of the Azure Automation Account for storing modules, configurations, and .mof compilations to deploy to systems.  The target DSC nodes are registered and monitored through the Azure Automation Account and reporting is generated and made available through the UI.  This reporting can also be forwarded to [OMS Log Analytics][1] for dashboarding and alerting purposes (which, as we discussed in [my previous series][2], can be used with Azure Automation Runbooks for auto-remediation).  
**Pros and Cons to Each**  
So let's talk about some of the upsides and downsides to each method.  These may affect your decisions as you architect your DSC solution.

  * _Pricing_ - Azure DSC is essentially free.  Azure Automation DSC is free for Azure nodes, while there is a cost associated with managed on-prem nodes.  This charged per month and is dependent on how often the machines are checking in.  You can get more information on the particulars [here][3].
  * _Reporting_ - If you're looking for rich reporting, Azure Automation DSC is definitely the way to go.  You can still get statuses from your Azure DSC nodes via PowerShell, but this leaves the onus on you to format that data and make it look pretty.  We'll be taking a look at how we can do this a bit later.
  * _Flexibility_ - Azure Automation DSC allows you to use modules stored in your Azure Automation Account.  If you wish to use a new module, you simply add that module, update your configuration file, and recompile.  With Azure DSC, you need to repackage your configuration with all of the modules, re-publish them, and re-push them to your target machines.
  * _Side-by-Side Module Versioning Tolerance_ - Currently, Azure DSC actually has an advantage over Azure Automation DSC in this respect.  You cannot currently have multiple module versions in your module repository.  So if you're using Automation DSC and calling the same DSC resources in multiple configs, they need to all be on that same module version.
  * _On-Prem Management Capabilities_ - Azure Automation DSC has the ability to manage on-prem virtual machines, either directly or via Hybrid Workers.  This gives you the ability to manage all of your virtual machines and monitor their configuration status from a single pane of glass.  Azure DSC does not have this capability.
  * _Managing Systems in AWS_ - Yes.  You can also manage your virtual machines in AWS using the AWS DSC Toolkit via Azure Automation DSC!

So that's the overview of what we're going to be talking about through this series.  Tomorrow, we'll be getting into how to add configurations into Azure Automation DSC and compiling your configs.

 [1]: https://docs.microsoft.com/en-us/azure/automation/automation-dsc-diagnostics
 [2]: https://powershell.org/2017/07/25/using-powershell-azure-automation-and-oms-part-i/
 [3]: https://azure.microsoft.com/en-us/pricing/details/automation/
