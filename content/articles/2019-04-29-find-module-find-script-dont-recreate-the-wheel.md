---
title: "Find-Module, Find-Script – Don't Recreate the Wheel"
authors:
  - pwshliquori
date: "2019-04-29T18:52:07+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2019/04/find-module-find-script-dont-recreate-the-wheel/
---

The PowerShell Gallery is a collection of modules and scripts that is community driven to help us automate everyday tasks. Sometimes, we have an idea that could written into a function or script, however, most of the time, someone else had the same idea and published their work to the PowerShell Gallery. There is no need to recreate the wheel and re-write it, use the community to our advantage. We'll take a look at multiple Cmdlets, 


`Find-Module
`, 


`Find-Script
`, 


`Install-Module
`, and 


`Install-Script
`, and find out what each of them provide. 

**Find-Module** **and Install-Module**


`Find-Module
`allows us the 

_browse_ the PowerShell Gallery and find if there is a module in the community that has been created. Running 


`Get-Help Find-Module
`, we can see there are multiple parameters to use to help narrow our search. For demonstration, we will find the Azure PowerShell (Az) module by Microsoft using the 


`Find-Module
`Cmdlet.


`Get-Help Find-Module
NAME
    Find-Module
SYNTAX
    Find-Module [[-Name] ] [-MinimumVersion ] [-MaximumVersion ] [-RequiredVersion ] [-AllVersions] [-IncludeDependencies] [-Filter ] [-Tag
    ] [-Includes {DscResource | Cmdlet | Function | RoleCapability}] [-DscResource ] [-RoleCapability ] [-Command ] [-Proxy ] [-ProxyCredential
    ] [-Repository ] [-Credential ]  []
ALIASES
    fimo
REMARKS
    Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.
        -- To download and install Help files for the module that includes this cmdlet, use Update-Help.
        -- To view the Help topic for this cmdlet online, type: "Get-Help Find-Module -Online" or
           go to http://go.microsoft.com/fwlink/?LinkID=398574.
Find-Module -Name Az
Version    Name                                Repository           Description
-------    ----                                ----------           -----------
1.8.0      Az                                  PSGallery            Microsoft Azure PowerShell - Cmdlets to manage resources in Azure. This module is compatible with WindowsPowerShell and P...
`Great. We were able to find the Az module and returned some information about the module: Version, Name, Repository, and Description. But what if we did not know the name of a module we are looking for? The 


`-Name
`parameter accepts wildcards for partial searches, we can enter in 


`Find-Module -Name Az*
`and will return any module in the gallery that starts with "Az". We can also search for DSC Resources using the 


`Find-Module
`Cmdlet using the 


`-Includes DscResource
`parameter. This will only return DSC Resources available in the PowerShell Gallery


`Find-Module -Name xWeb* -Includes DscResource
`Once we found the module that we want to use, we can install the module using the 


`Install-Module
`Cmdlet. This will install the community module in our default module install directory: 


`C:\Program Files\WindowsPowerShell\Modules
`or if using PowerShell Core: 


`C:\Program Files\PowerShell\Modules
`. Lets take the example above and use it to install the Az Module.


`Find-Module -Name Az |Install-Module
`We can take the 


`Find-Module
`Cmdlet and pipe it to the 


`Install-Module
`Cmdlet to install the module. But, we also have the ability to install a specific version of a module using the 


`-RequiredVersion
`parameter.


`Install-Module -Name Az -RequiredVersion 1.7
`Not using the 


`-RequiredVersion
`parameter will install the latest version of the module.

**Note:** Find-Module and Install-Module was introduced in PowerShell version 5.0.

**Find-Script and Install-Script**


`Find-Script
`works the same way as 


`Find-Module
`, however, instead of finding modules, we are now finding scripts. 


`Find-Script
`will return 


`.ps1
`scripts in the PowerShell Gallery that could be installed. Lets take a look at an example to find a script and than later on we will install it. The same rules apply when trying to find a script, we can use wildcards in our search to find a certain script.


`Find-Script -Name Get-*
Version    Name                                Repository           Description
-------    ----                                ----------           -----------
1.4        Get-WindowsAutoPilotInfo            PSGallery            This script uses WMI to retrieve properties needed by the Microsoft Store for Business to support Windows AutoPilot deplo...
1.0.0      Get-Quotation                       PSGallery            Get-Quote cmdlet data harvests a/multiple quote(s) from  Web outputs into your powershell console
1.0.0      Get-UsersOnlineOnReddit             PSGallery            Script to web data scrape reddit user trend and pump all the data points script captured from Reddit’s Powershell Communi...
1.0.4      Get-PacFile                         PSGallery            This script will access updated information to create a PAC file to prioritize Microsoft 365 Urls for...
1.1.2.7    Get-AzureAutomationDiagnosticRes... PSGallery            Capture diagnostic information for Azure Automation accounts. ...
1.1.0      Get-VMotion                         PSGallery            Report on recent vMotion events in your VMware environment.
1.2.1      Get-RemoteProgram                   PSGallery            This function generates a list by querying the registry and returning the installed programs of a local or remote computer.
1.1        get-uptime                          PSGallery            Get the uptime of the current machine.
1.0.1      Get-InstalledProgram                PSGallery            Get-InstalledProgram retrieves the programs installed on a local or remote machine. To specify a remote computer, use the...
0.0.1      Get-LockoutBlame                    PSGallery            Script to get a Windows Event about Locked Accounts, including the host which caused the lockout....
0.1.1      get-lastreboot                      PSGallery            Get the last reboot information from multiple machines
1.0        Get-DnsConfiguration                PSGallery            Retrives primary, secondary, tertiery DNS Servers from on online system using Windows Management Instrimentation.
1.0        Get-Github                          PSGallery            Download a github repository or a gist
1.1        Get-MyIP                            PSGallery            Get your External IP address...
1.3.5      Get-WindowsUpTime                   PSGallery            Get Windows UpTime StartTime and LocalTime by Wmi on local and remote system
2.9        Get-Parameter                       PSGallery            Lists all the parameters of a command, by ParameterSet, including their aliases, type, etc....
2.0        Get-LastLoggedOnUser                PSGallery            Gets the last not special user to have a loaded profile on a given system.
`We searched for all scripts that start with 


`Get-*
`, now lets find the script we want to install: 


`Join-String`Find-Script -Name Join-String
Version    Name                                Repository           Description
-------    ----                                ----------           -----------
1.0        Join-String                         PSGallery            Join String from Array
`Now that we found the scripts, lets install it using the same pipeline. Using the 


`Install-Script
`Cmdlet, the script will install in the default script location: 


`C:\Program Files\WindowsPowerShell\Scripts
`or if using PowerShell Core: 


`C:\Program Files\PowerShell\Scripts
`.


`Find-Script -Name Join-String |Install-Script
`We can still use the 


`-RequiredVersion
`parameter if a specified version is required, but using the command above will install the latest. 


`Find-Module
`, 


`Find-Script
`, 


`Install-Module
`, and 


`Install-Script
`are great to find and install modules or scripts from the PowerShell Gallery, there is no need to recreate the wheel, (Most of the time). You can also search the PowerShell Gallery by visiting the website 

[here][1]. When searching for a module or script, the site will show you the command to run in PowerShell to install the module or script.  

Just a reminder that these Cmdlets were introduced in PowerShell version 5.0 and are in the [PowerShellGet][2] module. The links below are Microsoft's documentation for each Cmdlet with examples and other parameters that can be used. 

[Find-Module][3]  
[Install-Module][4]  
[Find-Script  
][5] [Install-Script][6]  

pwshliquori

 [1]: https://www.powershellgallery.com/
 [2]: https://docs.microsoft.com/en-us/powershell/module/powershellget/?view=powershell-6
 [3]: https://docs.microsoft.com/en-us/powershell/module/powershellget/Find-Module?view=powershell-6%EF%BB%BF
 [4]: https://docs.microsoft.com/en-us/powershell/module/powershellget/Install-Module?view=powershell-6%EF%BB%BF
 [5]: https://docs.microsoft.com/en-us/powershell/module/powershellget/Find-Script?view=powershell-6
 [6]: https://docs.microsoft.com/en-us/powershell/module/powershellget/Install-Script?view=powershell-6
