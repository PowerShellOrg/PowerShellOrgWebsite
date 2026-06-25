---
title: Building a Desired State Configuration Configuration
authors:
  - Steven Murawski
date: "2013-10-08T16:36:33+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/10/building-a-desired-state-configuration-configuration/
---

Now that's a title!  We've worked through my reasoning as to why I want Desired State Configuration (DSC) and how to build a pull server.  Today and in the next post we are going to look at how to create configurations which describe how our target systems are supposed to work.

## The High Points

  * [Overview](https://powershell.org/2013/10/02/building-a-desired-state-configuration-infrastructure/)
  * [Configuring the Pull Server (REST version)](https://powershell.org/2013/10/03/building-a-desired-state-configuration-pull-server/)
  * Creating Configurations (one of two - this post, [two of two][1])
  * [Configuring Clients](https://powershell.org/2013/11/06/configuring-a-desired-state-configuration-client/)
  * [Building Custom Resources](https://powershell.org/2014/03/13/building-desired-state-configuration-custom-resources/)
  * Packaging Custom Resources
  * Advanced Client Targeting

## Building Configurations

Configurations are the driving force for DSC.  A configuration is a [Managed Object Format](http://msdn.microsoft.com/en-us/library/aa823192(v=vs.85).aspx) (MOF) document that describes the how a specified server (or servers) should look.

### What You See

A basic configuration may look like


`/*
@TargetNode='8c7bfb10-8540-4a89-904c-5e6759de6d80'
@GeneratedBy=svc_build
@GenerationDate=10/07/2013 19:43:24
@GenerationHost=OR-WEB01
*/
instance of Pagefile as $Pagefile1ref
{
ResourceID = "[Pagefile]Default::[BaseServer]JustTheBasics::[VirtualServer]VMWare";
 InitialSize = 4294967296;
 SourceInfo = "C:\\windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\SELocalConfiguration\\StackExchangeConfiguration\\StackExchangeConfiguration.psm1::14::5::Pagefile";
 ModuleName = "Pagefile";
 MaximumSize = 4294967296;
 ModuleVersion = "1.0";
};
instance of PowerPlan as $PowerPlan1ref
{
ResourceID = "[PowerPlan]Default::[BaseServer]JustTheBasics::[VirtualServer]VMWare";
 SourceInfo = "C:\\windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\SELocalConfiguration\\StackExchangeConfiguration\\StackExchangeConfiguration.psm1::20::5::PowerPlan";
 Name = "High performance";
 ModuleName = "PowerPlan";
 ModuleVersion = "1.0";
};
instance of MSFT_RoleResource as $MSFT_RoleResource1ref
{
ResourceID = "[WindowsFeature]snmp::[BaseServer]JustTheBasics::[VirtualServer]VMWare";
 SourceInfo = "C:\\windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\SELocalConfiguration\\StackExchangeConfiguration\\StackExchangeConfiguration.psm1::25::5::WindowsFeature";
 Name = "SNMP-Service";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of OMI_ConfigurationDocument
{
 Version="1.0.0";
 Author="build_service";
 GenerationDate="10/07/2013 19:43:24";
 GenerationHost="OR-WEB01";
};
`Each instance of a MOF class (except for the OMI_ConfigurationDocument) refer to a DSC Resource and provides the parameters that resource will be called with when the configuration engine runs.  There are a couple of properties that are not passed to the resource module.  The ResourceID is a unique identifier that indicates the resource and the configuration inheritance tree where it is defined (we'll dig deeper into that shortly).  The ModuleVersion is the version number of the PowerShell module (from the psd1) of the DSC Resource.

### Getting From Here To There

We don't want to write straight MOF files to define configuration, mainly because they are kind of verbose, with a some boilerplate  stuff for each resource.  Fortunately, we've got a Domain Specific Language (DSL) in PowerShell v4 to generate them.

##### The Configuration Keyword

PowerShell v4 contains the keyword "configuration", which allows us to provide a name for the configuration (like a function name).


`configuration MyFirstServerConfig
{
}
`It looks just like how you would define a function or workflow. Now let's put something useful inside of it.


`configuration MyFirstServerConfig
{
    WindowsFeature snmp
    {
        Name = 'SNMP-Service'
    }
}
`In this most simple of examples, we've defined a particular feature to be installed on a Windows Server. When we run this snippet, a wrapper function will be generated (kind of like how a workflow wrapper is generated). At this point, no MOF file has been created or applied, this simply creates a function that can generate a configuration based on the resources specified within. If we execute this configuration


`PS> MyFirstServerConfig
`we'll get a file named localhost.mof in a folder at $pwd/MyFirstServerConfig.

##### Configuration Default Parameters - OutputPath

If we want to specify the server the configuration applies to, we can wrap the resources in a Node block.


`configuration MyFirstServerConfig
{
    Node Server1
    {
      WindowsFeature snmp
      {
          Name = 'SNMP-Service'
      }
    }
}
`This will create a configuration named Server1. Node names will be important as we move on to talking about targeting via Start-DscConfiguration and using the pull server.  
We do have some options as to how the configuration gets generated. We can use the OutputPath to control where the configuration files are deposited.


`PS> MyFirstServerConfig -OutputPath c:\Configurations
`##### Configuration Default Parameters - ConfigurationData

Our other major parameter is ConfigurationData. ConfigurationData is a way to separate out your environmental concerns from the configuration documents. We'll come back to this one after we explore a few more concepts. ConfigurationData is a hashtable that expects a certain structure. The hashtable should contain an key named AllNodes, which is an array of hashtables that describe the nodes whose data you want to inject. For example


`$ConfigurationData = @{
  AllNodes = @(
    @{NodeName = 'Server1';Role='Web'},
    @{NodeName = 'Server2';Role='FileShare'}
  )
}
`NodeName is a common convention for specifying the node name.  We don't want to use Node, as there are some automatic variables populated in a configuration, one of which is $Node.  All the other keys in the hashtable representing a node are completely up to you.  
_Just a quick aside.. the node name does not necessarily equate to the server name.  When we get in to targeting (a bit in this post and more in an upcoming one), we'll see how this is true._  
After we have some data in our ConfigurationData hashtable (and the variable doesn't need to be called ConfigurationData, I just did for convenience sake), we can use that to help drive our configuration. We'll tweak our configuration function a bit, so that it can take advantage of the extra data being supplied.


`configuration MyFirstServerConfig
{
    node $allnodes.NodeName
    {
        WindowsFeature snmp
        {
            Name = 'SNMP-Service'
        }
        switch ($Node.Role)
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
}
`Since this is a PowerShell DSL, I can use PowerShell functions, operators, and flow control to manipulate the configuration details. In this case, I'm using a switch statement to add roles to my server based on role definitions I'm supplying in my ConfigurationData.


`PS> MyFirstServerConfig -ConfigurationData $ConfigurationData
    Directory: C:\scripts\MyFirstServerConfig
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---         10/8/2013   4:03 PM       1494 Server1.mof
-a---         10/8/2013   4:03 PM       1516 Server2.mof
`If we look at the MOF files generated by this, we'll see that Server1 does not have the FS-FileServer role, but does have the Web-Server role.


`/*
@TargetNode='Server1'
@GeneratedBy=smurawski
@GenerationDate=10/08/2013 16:03:51
@GenerationHost=OR-UTIL02
*/
instance of MSFT_RoleResource as $MSFT_RoleResource1ref
{
ResourceID = "[WindowsFeature]snmp";
 SourceInfo = "::12::9::WindowsFeature";
 Name = "SNMP-Service";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of MSFT_RoleResource as $MSFT_RoleResource2ref
{
ResourceID = "[WindowsFeature]Web";
 SourceInfo = "::25::29::WindowsFeature";
 Name = "web-Server";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of OMI_ConfigurationDocument
{
 Version="1.0.0";
 Author="smurawski";
 GenerationDate="10/08/2013 16:03:51";
 GenerationHost="OR-UTIL02";
};
`And Server2 has the reverse.


`/*
@TargetNode='Server2'
@GeneratedBy=smurawski
@GenerationDate=10/08/2013 16:06:31
@GenerationHost=OR-UTIL02
*/
instance of MSFT_RoleResource as $MSFT_RoleResource1ref
{
ResourceID = "[WindowsFeature]snmp";
 SourceInfo = "::13::9::WindowsFeature";
 Name = "SNMP-Service";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of MSFT_RoleResource as $MSFT_RoleResource2ref
{
ResourceID = "[WindowsFeature]FileSharing";
 SourceInfo = "::20::29::WindowsFeature";
 Name = "FS-FileServer";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of OMI_ConfigurationDocument
{
 Version="1.0.0";
 Author="smurawski";
 GenerationDate="10/08/2013 16:06:31";
 GenerationHost="OR-UTIL02";
};
`To highlight a neat trick since we are using a switch statement and [switch can process collections](http://technet.microsoft.com/en-us/library/ff730937.aspx), we can specify more than one role in our hashtable and our configuration should be able to add all the required resources.


`$ConfigurationData = @{
  AllNodes = @(
    @{NodeName = 'Server1';Role='Web'},
    @{NodeName = 'Server2';Role='FileShare'}
    @{NodeName = 'Server3';Role=@('FileShare','Web')}
  )
}
configuration MyFirstServerConfig
{
    node $allnodes.NodeName
    {
        WindowsFeature snmp
        {
            Name = 'SNMP-Service'
        }
        switch ($Node.Role)
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
}
MyFirstServerConfig -ConfigurationData $ConfigurationData
`If we look at the configuration generated for Server3, we'll find both Web-Server and FS-FileServer roles described.


`/*
@TargetNode='Server3'
@GeneratedBy=smurawski
@GenerationDate=10/08/2013 16:06:31
@GenerationHost=OR-UTIL02
*/
instance of MSFT_RoleResource as $MSFT_RoleResource1ref
{
ResourceID = "[WindowsFeature]snmp";
 SourceInfo = "::13::9::WindowsFeature";
 Name = "SNMP-Service";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of MSFT_RoleResource as $MSFT_RoleResource2ref
{
ResourceID = "[WindowsFeature]FileSharing";
 SourceInfo = "::20::29::WindowsFeature";
 Name = "FS-FileServer";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of MSFT_RoleResource as $MSFT_RoleResource3ref
{
ResourceID = "[WindowsFeature]Web";
 SourceInfo = "::26::29::WindowsFeature";
 Name = "web-Server";
 ModuleName = "MSFT_RoleResource";
 ModuleVersion = "1.0";
};
instance of OMI_ConfigurationDocument
{
 Version="1.0.0";
 Author="smurawski";
 GenerationDate="10/08/2013 16:06:31";
 GenerationHost="OR-UTIL02";
};
`#### Next Up

In the next post, we'll continue this topic and look at other ways we can parameterize configurations as well as nesting configurations.  We'll also touch on how to apply these configurations from Start-DscConfiguration and via a Pull Server.  Stay tuned!

 [1]: https://powershell.org/2013/10/14/building-a-desired-state-configuration-configuration-part-2/
