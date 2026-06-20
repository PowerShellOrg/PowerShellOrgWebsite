---
title: Building a Desired State Configuration Configuration – Part 2
author: Steven Murawski
authors:
  - Steven Murawski
date: "2013-10-14T18:19:03+00:00"
categories:
  - PowerShell for Admins
  - Tutorials
aliases:
  - /2013/10/building-a-desired-state-configuration-configuration-part-2/
---

Ok, let's get back to creating a DSC configuration.  [If you haven't read the last post in this series, go back and do that now](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), I'll wait.  Now with that out of the way, let's get back to it...

## The High Points

  * [Overview](https://powershell.org/2013/10/02/building-a-desired-state-configuration-infrastructure/)
  * [Configuring the Pull Server (REST version)](https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/)
  * Creating Configurations ([one of two](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), two of two - this post)
  * [Configuring Clients](https://powershell.org/2013/11/06/configuring-a-desired-state-configuration-client/)
  * [Building Custom Resources](https://powershell.org/2014/03/13/building-desired-state-configuration-custom-resources/)
  * Packaging Custom Resources
  * Advanced Client Targeting

### Picking Back UP

Now that we have some of the basics down, we can start to look deeper at how composable these configurations are. A DSC configuration defined in PowerShell offers several advantages, not the least of which is that a configuration can be parameterized.

#### Parameterization


`configuration MyFirstServerConfig
{
	param ([string[]]$NodeName)
	node $NodeName
	{
		WindowsFeature snmp
        {
            Name = 'SNMP-Service'
        }
	}
}
`With this simple tweak, I've taken a configuration that was hard-coded to one server name to one that can take an array of server names. The PowerShell savvy are probably going, "Big deal.. functions could do that since Monad". If you remember back in the last post, I showed how ConfigurationData could be used to pass data into a configuration. Then my main configuration did some stuff based on metadata about the node. My configuration was starting to look a bit complicated. The ability to parameterize configurations really helps us when we are ready for the next step, nesting configurations.

#### Nesting Configurations

Let's start with an example...


`$ConfigurationData = @{
  AllNodes = @(
    @{NodeName = 'Server1';Role='Web'},
    @{NodeName = 'Server2';Role='FileShare'}
    @{NodeName = 'Server3';Role=@('FileShare','Web')}
  )
}
configuration RoleConfiguration
{
	param ($Roles)
	switch ($Roles)
    {
        'FileShare' {
                        WindowsFeature FileSharing
                        {
                            Name = 'FS-FileServer'
                        }
                    }
        'Web'       {
                        WindowsFeature Web
                        {
                            Name = 'web-Server'
                        }
                    }
    }
}
configuration MyFirstServerConfig
{
    node $allnodes.NodeName
    {
        WindowsFeature snmp
        {
            Name = 'SNMP-Service'
        }
        RoleConfiguration MyServerRoles
        {
        	Roles = $Node.Role
    	}
    }
}
`So, what did we just see? I defined a parameterized configuration and then used it like a DSC Resource in my main configuration. Parameters are passed to the nested configuration in the exact same way as to a DSC Resource. This syntax also means that we can use DependsOn to create dependency chains between groups of functionality more easily.


`configuration MyFirstServerConfig
{
    node $allnodes.NodeName
    {
        WindowsFeature snmp
        {
            Name = 'SNMP-Service'
        }
        RoleConfiguration MyServerRoles
        {
        	Roles = $Node.Role
        	DependsOn = '[WindowsFeature]snmp'
    	}
    }
}
`We can leverage this technique of creating nested configurations to simplify our configuration scripts, minimize dependency chains, and provide an easy way to reuse configuration sections for multiple configurations, all using the same semantics of any DSC resource.

#### Applying Configurations

Once we have our configurations generated, we have a couple of ways to distribute and apply the configurations. We'll start assuming that we have generated our configurations for the servers we would like to target.

##### Start-DscConfiguration

Our first option is Start-DscConfiguration. We can point Start-DscConfiguration to the configuration files that we've generated (just point to the directory with the configuration files in them).


`Start-DscConfiguration -Path ./MyFirstServerConfig
`Doing this will attempt to run the configurations generated against any nodes specified. You can target specific servers by using the -computername or -cimsession parameters.  
One downside to using Start-DscConfiguration is that any custom resources (not nested configurations) need to be present on the remote node BEFORE applying the configuration.  
You CANNOT create a configuration that uses the file resource (or any other resource) to create the resource on disk during the DSC run. While this would be a cool trick, the resources contain a schema.mof file that defines the interface that DSC can use and the DSC engine will error if it cannot find the resource interface when the configuration is validated before it applies. One option is having two-phased configurations, one to distribute resources and the second to apply it.

##### Pulling a Configuration

The next alternative is to distribute configurations and resources using a pull Server. In box, DSC supports two types of pull server, an REST based pull server ([like described in my previous post][1]) and an SMB based pull server ([described here][2]). The pull server requires nodes to be labeled with a GUID (the configuration ID, which we'll talk about in an upcoming post), instead of server name. The pull server also requires that each config be accompanied by a checksum file with the file hash of the configuration file (example 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof and 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof.checksum).  One word off caution.. there can be no extra whitespace after the hash in the checksum file or the hash check will fail on the client node.  This means you cannot use


`Get-FileHash 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof | out-file 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof.checksum
`or


`Get-FileHash 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof | set-content 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof.checksum
`as those leave extra whitespace at the end of the file. I've been using


`[System.IO.File]::AppendAllText('72ed4117-fc49-4f81-822c-5bc59db64dd3.mof.checksum', (Get-FileHash 72ed4117-fc49-4f81-822c-5bc59db64dd3.mof).Hash)
`In my next post, I'll be talking about we can configure our clients to talk to a pull server, then we can see stuff really start to happen.

 [1]: https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/
 [2]: http://blog.cosmoskey.com/powershell/desired-state-configuration-in-pull-mode-over-smb/
