---
title: Get-Command – One of the best Cmdlets besides Get-Help
authors:
  - pwshliquori
date: "2019-04-19T16:59:06+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2019/04/get-command-one-of-the-best-cmdlets-besides-get-help/
---

So laying on the sofa, sick, bored out of my mind, what better way to spend my time then writing a blog post about 


`Get-Command
`. The 


`Get-Command
`Cmdlet is apart of the Microsoft.PowerShell.Core module, it was introduced in PowerShell version 1.0 and is one of the most useful Cmdlets to find a command you are looking for. It has a variety of parameters that allow you to search for a command by using a combination of parameters or just using 


`Get-Command
`on its own. Go ahead and run 


`Get-Command
`in your console before continuing with this post. As you can see, it returns all commands that are available in your PowerShell session. Later on, we will go through several example on how we can leverage the parameters to find specifics commands. 

Lets start with a basic example and then build on it to get a specific command, 


`Get-ADUser
`. First, lets get all of the command that are already imported into our PowerShell session.


`Get-Command -ListImported
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Function        New-HiiDistributionGroup                           1.0.0.0    ExchangeTools
Function        New-HiiExchangeSession                             1.0.0.0    ExchangeTools
Function        New-HiiMailContact                                 1.0.0.0    ExchangeTools
Function        Add-HiiSmtpEmailAddress                            1.0.0.0    ExchangeTools
Function        New-HiiMailbox                                     1.0.0.0    ExchangeTools
Function        New-HiiUserMailboxDistributionList                 1.0.0.0    ExchangeTools
Function        Get-HiiSmtpEmailAddress                            1.0.0.0    ExchangeTools
Function        Add-HiiDistributionGroupMember                     1.0.0.0    ExchangeTools
Function        Remove-HiiSmtpEmailAddress                         1.0.0.0    ExchangeTools
Function        Export-HiiMailboxToPST                             1.0.0.0    ExchangeTools
Cmdlet          Remove-Job                                         3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Register-PSSessionConfiguration                    3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Get-Help                                           3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Remove-Module                                      3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Out-Null                                           3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Receive-Job                                        3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Receive-PSSession                                  3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Register-ArgumentCompleter                         3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Get-History                                        3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Get-Job                                            3.0.0.0    Microsoft.PowerShell.Core
`The output does not have any Cmdlets from the ActiveDirectory module we need to find the 


`GetADUser
`. If you have RSAT Tools installed, import the module using 


`Import-Module ActiveDirectory
`and re-run 


`Get-Command -ListImported
`. As you can see now, a list of Active Directory Cmdlets are available. We can now start getting more complex to find 


`Get-ADUser
`. 

Lets get limit the scope of our command to get only the ActiveDirectory module Cmdlets that are available. 


`Get-Command -Module ActiveDirectory
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Add-ADCentralAccessPolicyMember                    1.0.1.0    activedirectory
Cmdlet          Add-ADComputerServiceAccount                       1.0.1.0    activedirectory
Cmdlet          Add-ADDomainControllerPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Add-ADFineGrainedPasswordPolicySubject             1.0.1.0    activedirectory
Cmdlet          Add-ADGroupMember                                  1.0.1.0    activedirectory
Cmdlet          Add-ADPrincipalGroupMembership                     1.0.1.0    activedirectory
Cmdlet          Add-ADResourcePropertyListMember                   1.0.1.0    activedirectory
Cmdlet          Clear-ADAccountExpiration                          1.0.1.0    activedirectory
Cmdlet          Clear-ADClaimTransformLink                         1.0.1.0    activedirectory
Cmdlet          Disable-ADAccount                                  1.0.1.0    activedirectory
Cmdlet          Disable-ADOptionalFeature                          1.0.1.0    activedirectory
Cmdlet          Enable-ADAccount                                   1.0.1.0    activedirectory
Cmdlet          Enable-ADOptionalFeature                           1.0.1.0    activedirectory
Cmdlet          Get-ADAccountAuthorizationGroup                    1.0.1.0    activedirectory
Cmdlet          Get-ADAccountResultantPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicySilo                     1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessPolicy                          1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessRule                            1.0.1.0    activedirectory
Cmdlet          Get-ADClaimTransformPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADClaimType                                    1.0.1.0    activedirectory
Cmdlet          Get-ADComputer                                     1.0.1.0    activedirectory
`Now we filtered only the ActiveDirectory module and can now filter down even more. 


`Get-Command
`has a parameter 


`-Verb
`that allows us to filter by using the verb of the Cmdlet (e.g. Get, Set, Import, Reset). Lets filter by verb 


`Get
`and view the output.


`Get-Command -Module ActiveDirectory -Verb Get
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Get-ADAccountAuthorizationGroup                    1.0.1.0    activedirectory
Cmdlet          Get-ADAccountResultantPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicySilo                     1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessPolicy                          1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessRule                            1.0.1.0    activedirectory
Cmdlet          Get-ADClaimTransformPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADClaimType                                    1.0.1.0    activedirectory
Cmdlet          Get-ADComputer                                     1.0.1.0    activedirectory
Cmdlet          Get-ADComputerServiceAccount                       1.0.1.0    activedirectory
Cmdlet          Get-ADDCCloningExcludedApplicationList             1.0.1.0    activedirectory
Cmdlet          Get-ADDefaultDomainPasswordPolicy                  1.0.1.0    activedirectory
Cmdlet          Get-ADDomain                                       1.0.1.0    activedirectory
Cmdlet          Get-ADDomainController                             1.0.1.0    activedirectory
Cmdlet          Get-ADDomainControllerPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Get-ADDomainControllerPasswordReplicationPolicy... 1.0.1.0    activedirector
`Great! we now have all Cmdlets that start with the verb 


`Get
`. Lets keep building, another parameter 


`-Noun
`. We know the prefix for most ActiveDirectory Cmdlets start with AD, so lets use the noun User and see what the output is.


`Get-Command -Module ActiveDirectory -Verb Get -Noun *User
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Get-ADUser                                         1.0.1.0    activedirectory
`Success! We found exactly the command we needed to. But did you notice the 


`*
`character in the noun parameter? This is because we know the prefix is 


`AD
`and the noun parameter acts as a filter, this tells PowerShell to find anything that has User in the noun. You can do the same for the parameter 


`-Verb
`.



So now what? We found the command, but what else can we do with 


`Get-Command
`. Besides just getting the command, we can get syntax, command info, or search by parameter type or parameter name. Lets see the syntax of 


`Get-ADUser
`so we can better understand what it does.


`Get-Command -Module ActiveDirectory -Verb Get -Noun *User -Syntax
Get-ADUser -Filter  [-AuthType ] [-Credential ] [-Properties ] [-ResultPageSize ] [-ResultSetSize ] [-SearchBase ] [-SearchScope ] [-Server ] []
Get-ADUser [-Identity]  [-AuthType ] [-Credential ] [-Partition ] [-Properties ] [-Server ] []
Get-ADUser -LDAPFilter  [-AuthType ] [-Credential ] [-Properties ] [-ResultPageSize ] [-ResultSetSize ] [-SearchBase ] [-SearchScope ] [-Server ] []
`We can now see the parameters and parameter types of each. This is a great way to understand how the Cmdlet works and how we can use it in our own code.  

Now that we built our command to find just the 


`Get-ADUser
`and get the syntax. Lets look at another example that searches for a certain parameter name


`Identity
`. Using the parameter 


`ParameterName
`will allow us to filter through Cmdlets in the ActiveDirectory module that has an 


`-Identity
`parameter.


`Get-Command -Module ActiveDirectory -ParameterType IdentityCommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Add-ADCentralAccessPolicyMember                    1.0.1.0    activedirectory
Cmdlet          Add-ADComputerServiceAccount                       1.0.1.0    activedirectory
Cmdlet          Add-ADDomainControllerPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Add-ADFineGrainedPasswordPolicySubject             1.0.1.0    activedirectory
Cmdlet          Add-ADGroupMember                                  1.0.1.0    activedirectory
Cmdlet          Add-ADPrincipalGroupMembership                     1.0.1.0    activedirectory
Cmdlet          Add-ADResourcePropertyListMember                   1.0.1.0    activedirectory
Cmdlet          Clear-ADAccountExpiration                          1.0.1.0    activedirectory
Cmdlet          Clear-ADClaimTransformLink                         1.0.1.0    activedirectory
Cmdlet          Disable-ADAccount                                  1.0.1.0    activedirectory
Cmdlet          Disable-ADOptionalFeature                          1.0.1.0    activedirectory
Cmdlet          Enable-ADAccount                                   1.0.1.0    activedirectory
Cmdlet          Enable-ADOptionalFeature                           1.0.1.0    activedirectory
Cmdlet          Get-ADAccountAuthorizationGroup                    1.0.1.0    activedirectory
Cmdlet          Get-ADAccountResultantPasswordReplicationPolicy    1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADAuthenticationPolicySilo                     1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessPolicy                          1.0.1.0    activedirectory
Cmdlet          Get-ADCentralAccessRule                            1.0.1.0    activedirectory
Cmdlet          Get-ADClaimTransformPolicy                         1.0.1.0    activedirectory
Cmdlet          Get-ADClaimType                                    1.0.1.0    activedirectory
Cmdlet          Get-ADComputer                                     1.0.1.0    activedirectory
Cmdlet          Get-ADComputerServiceAccount                       1.0.1.0    activedirectory
Cmdlet          Get-ADDefaultDomainPasswordPolicy                  1.0.1.0    activedirectory
Cmdlet          Get-ADDomain                                       1.0.1.0    activedirectory
`We have found all of the command that have a parameter name of 


`Identity
`. For purposes, there are a limited set listed above, the actual total number of Cmdlets that have the parameter of 


`Identity
`is 117.



The last two parameters to take a look at are the 


`-Name
`and 


`-ShowCommandInfo
`parameters. If we already know the Cmdlet name and want to find which module it is in, we can use the 


`-Name
`parameter and view the Source.


`Get-Command -Name Get-ADUser
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Get-ADUser                                         1.0.1.0    activedirectory
`The command found the Cmdlet and is found in the ActiveDirectory module. The final parameter will build on the previous example, but we will add the 


`-ShowCommandInfo
`parameter. The 


`-ShowCommandInfo
`show the information pertaining to the command you a attempting to get. 


`Get-Command -Name Get-ADUser -ShowCommandInfo
Name          : Get-ADUser
ModuleName    : activedirectory
Module        : @{Name=activedirectory}
CommandType   : Cmdlet
Definition    :
                Get-ADUser -Filter  [-AuthType ] [-Credential ] [-Properties ] [-ResultPageSize ] [-ResultSetSize ] [-SearchBase
                ] [-SearchScope ] [-Server ] []
                Get-ADUser [-Identity]  [-AuthType ] [-Credential ] [-Partition ] [-Properties ] [-Server ] []
                Get-ADUser -LDAPFilter  [-AuthType ] [-Credential ] [-Properties ] [-ResultPageSize ] [-ResultSetSize ] [-SearchBase
                ] [-SearchScope ] [-Server ] []
ParameterSets : {@{Name=Filter; IsDefault=True; Parameters=System.Management.Automation.PSObject[]}, @{Name=Identity; IsDefault=False; Parameters=System.Management.Automation.PSObject[]},
                @{Name=LdapFilter; IsDefault=False; Parameters=System.Management.Automation.PSObject[]}}
`Now we can see all of the information in the 


`Get-ADUser
`Cmdlet, including syntax information. 



We took a look at multiple examples of the 


`Get-Command
`Cmdlet that can help us build tools in our scripts and module. It is a very help tool and that is why, (IMHO), it is one of the best Cmdlets to use besides 


`Get-Help
`. To find out more information about 


`Get-Command
`view Microsoft's documentation. 

[Get-Command ](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command?view=powershell-6) 

Note: At the time of writing this post, PowerShell is in version 6. The 


`-ShowCommandInfo
`parameter was introduced in PowerShell version 5.0.

Update: Get-Command was introduced in PowerShell v1.0, not 3.0. Thanks to Ryan Yates for the correction. Microsoft's docs on Get-Command only goes back to v3.0.  

pwshliquori
