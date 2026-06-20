---
title: Configuring a Desired State Configuration Client
author: Steven Murawski
authors:
  - Steven Murawski
date: "2013-11-06T23:47:22+00:00"
categories:
  - PowerShell for Admins
  - Tutorials
aliases:
  - /2013/11/configuring-a-desired-state-configuration-client/
---

Once we have our pull server in place and we're starting to create configurations, we need to set up our client nodes to be able to connect to the pull server and how we want the node to behave.

## The High Points

  * [Overview](https://powershell.org/2013/10/02/building-a-desired-state-configuration-infrastructure/)
  * [Configuring the Pull Server (REST version)](https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/)
  * Creating Configurations ([one of two](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), [two of two](https://powershell.org/2013/10/14/building-a-desired-state-configuration-configuration-part-2/))
  * Configuring Clients (this post)
  * [Building Custom Resources](https://powershell.org/2014/03/13/building-desired-state-configuration-custom-resources/)
  * Packaging Custom Resources
  * Advanced Client Targeting

### Examining the Local Configuration Manager

The Desired State Configuration agent included in Windows Management Framework 4 (or natively on Server 2012 R2 / Windows 8.1) is exposed through the Local Configuration Manager.


`PS> Get-DscLocalConfigurationManager
AllowModuleOverwrite           : False
CertificateID                  :
ConfigurationID                :
ConfigurationMode              : ApplyAndMonitor
ConfigurationModeFrequencyMins : 30
Credential                     :
DownloadManagerCustomData      :
DownloadManagerName            :
RebootNodeIfNeeded             : False
RefreshFrequencyMins           : 15
RefreshMode                    : PUSH
PSComputerName                 :
`This is where we can configure the behavior of DSC for a particular node.  So, how do we configure it?  With DSC of course!  
There is a configuration option LocalConfigurationManager that allows us to set values for the Local Configuration Manager.  A sample configuration looks something like this:


`configuration LetsGetConfiguring
{
    param ($NodeId, $PullServer)
    LocalConfigurationManager
    {
        AllowModuleOverwrite = 'True'
        ConfigurationID = $NodeId
        ConfigurationModeFrequencyMins = 60
        ConfigurationMode = 'ApplyAndAutoCorrect'
        RebootNodeIfNeeded = 'True'
        RefreshMode = 'PULL'
        DownloadManagerName = 'WebDownloadManager'
        DownloadManagerCustomData = (@{ServerUrl = "https://$PullServer/psdscpullserver.svc"})
    }
}
`While this configuration looks similar to other configurations we might create, we need to apply it with a different command - Set-DscLocalConfigurationManager.


`LetsGetConfiguring -NodeId 71defb7f-232b-4213-b289-08c3d424e162 -PullServer pullserver.somedomain.com
Set-DscLocalConfigurationManager -path LetsGetConfiguring
`The Local Configuration Manager offers a number of options, which we'll examine.

#### AllowModuleOverwrite

This one is pretty straight-forward and only impacts configurations where you are using a pull server.  If you allow module overwrite, newer versions of modules can replace existing modules.  If you don't enable this, you'll have to manually remove modules if you want a new copy to pull down.

#### CertificateID

CertficateID is a thumbprint of a certificate in the machine certificate store that will be used to decrypt any secrets present in the configuration.  DSC allows PSCredential objects to be marshaled through a MOF file, but requires them (without explicit authorization) to be encrypted. (There is another option as well, if you use the ConfigurationData feature, you can also supply the path to a certificate file to use - I'll be blogging that scenario later when I cover some more advanced scenarios.)

#### ConfigurationID

The ConfigurationID is a GUID which uniquely identifies what configuration a node should retrieve from a pull server.  If you haven't had to generate GUIDs before, a really easy way to do so is:


`PS> [guid]::NewGuid().Guid
`#### ConfigurationMode

ConfigurationMode defines how the DSC client operates.  There are three valid values:

  * Apply
  * ApplyAndMonitor
  * ApplyAndAutoCorrect

(NOTE:  These descriptions of functionality are based on limited testing - the TechNet documentation is not up to date yet, but should be in the near future.)  
Apply will apply the configuration once and after a successful run is logged, it will stop attempting to apply configuration or checking the configuration.  ApplyAndMonitor will apply a configuration as in Apply, but will continue to validate that a node is configured as described.  No corrective action will take place if there is configuration drift.  Finally, ApplyAndAutoCorrect is what most of us think of when looking at DSC as a configuration management tool.  This setting applies a configuration and checks it regularly.  If configuration drift is detected, the configuration manager will attempt to return the machine to the _desired state_ (see how I worked the product name in there..).

#### ConfigurationModeFrequencyMins

This setting determines how frequently the configured method (the RefreshMode) will be run.  In the case of a pull server, this is how frequently the pull server will be checked for updated configurations.  The minimum value for this is 30.  This value needs to be a multiple of the RefreshFrequencyMins.  If it is not, the engine will treat it as if it was a multiple (rounded up).

#### Credential

The Credential supplied can be used for accessing remote resources.

#### DownloadManagerCustomData

DownloadManagerCustomData is a hashtable of values that is passed to the specified download manager.  In the case of a a pull server, the two possible keys are ServerUrl and AllowUnsecureConnection.

#### DownloadManagerName

Here is where we specify which download manager to use.  DSC ships with two options, the WebDownloadManager (for the web-based pull server) and the DSCFileDownloadManager (for using an SMB share).

#### RebootNodeIfNeeded

Here's another pretty self-explanatory setting.  DSC offers a method for resources to request a reboot.  If this setting is $true, then DSC will reboot the node when it is requested.  If it is set to $false, DSC will notify (via the verbose stream and the DSC log) that a reboot is required, but not actually reboot the node.

#### RefreshFrequencyMins

The RefreshFrequencyMins setting determines how often DSC runs an integrity check against the cached configuration value (or if the check falls on the ConfigurationModeFrequencyMins interval against the pull server if one is configured).  The minimum value for this setting is 15 minutes.

#### RefreshMode

RefreshMode is either PUSH or PULL.  If you set the RefreshMode to PULL, you'll need to configure a download manager (via DownloadManagerName).  
Next up, we'll look at how we can build custom resources.
