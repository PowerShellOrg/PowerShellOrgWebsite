---
title: Secure Your Powershell Session with JEA and Constrained Endpoints
authors:
  - Nathaniel Webb (ArtisanByteCrafter)
date: "2019-03-28T20:57:51+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2019/03/secure-your-powershell-session-with-jea-and-constrained-endpoints/
---

## Index {.wp-block-heading}


  - 
    [What is a Constrained Endpoint and Why Would I Need One?](#what-is-a-constrained-endpoint-and-why-would-i-need-one)


  - 
    [Setup and Configuration](#setup-and-configuration)


  - 
    [Using our Endpoint](#using-our-endpoint)



## What is a constrained endpoint and why would I need one? {.wp-block-heading}

Powershell constrained endpoints are a means of interacting with powershell in a manner consistent with the [principal of least privilege][1]. In Powershell terms, this is referred to as Just-Enough-Administration, or JEA.

JEA is very well documented, so this won't simply be repeating everything those references detail. Instead, we'll go through a simple, real-world use-case of when and why you might need to deploy one.

**Scenario:**

A subset of your team needs permissions to do one single action outside the normal scope of their jobs - The ability to restart a service on a server. This particular application will not accept changes to it without a restart, so this access needs to be delegated to the team responsible for maintaining the application, rather than calling you ever 12-15 minutes throughout the day.

You might be thinking, why not just email them a link to a one-liner of code and say "Hey, run this in the terminal thingy!"


`Invoke-Command -Server myserver -ScriptBlock {Get-Service myservice | Restart-Service}
`First, now the **entire team** needs PS-Remoting rights, administrator rights on the remote server (!), and a contract with HR not to replace the contents of 


`-ScriptBlock { }
`with something more sinister or destructive. Instead, we're going to let them do just enough administration to accomplish what they need to.

## Setup and Configuration {.wp-block-heading}

Now that we've established why we need a constrained endpoint, let's use powershell to create one. For this example, we will have a custom module 


`mymodule.psm1
`that exposes two functions:


  - 

`Get-Foo
`- a custom function we wrote for demonstration purposes


- 

`Restart-OurCustomService
`- a function that explicitly calls 


`Restart-Service -Service OurCustomService
`Here is our custom module, 


`mymodule.psm1
`:


`Function Get-Foo {
	param(
	    [string] $Message = "Hello World!"
    )
    Write-Output $Message
    Write-EventLog -LogName 'MyPSEndpoint' -Source 'Get-Foo' -EntryType Information -EventId 2000 -Message "Get-Foo -Message '$Message' was run."
}
Function Restart-OurCustomService {
    [cmdletbinding()]
    param()
    Try {
        Restart-Service -Name OurCustomService -Force -ErrorAction Stop -ErrorVariable err
        Write-Host -ForegroundColor green "OurCustomService was restarted!"
        Write-EventLog -LogName 'MyPSEndpoint' -Source 'Restart-OurCustomService' -EntryType Information -EventId 2001 -Message "Successfully restarted."
    }
    Catch {
        Write-Host -ForegroundColor red "OurCustomService could not be restarted."
        Write-EventLog -LogName 'MyPSEndpoint' -Source 'Restart-OurCustomService' -EntryType Error -EventId 2002 -Message "$err"
    }
}
`These are the only two commands we want our team members to be able to run.

**Logging**

It's always good idea to have some type of logging, so before we even create the actual PS-Session, we're going to create a Windows Event Log source for it:


`$Sources = @(
    'Get-Foo',
    'Restart-OurCustomService'
)
New-EventLog -LogName "MyPSEndpoint" -Source $Sources
`Now, we'll be able to see what commands were run through the Event Log, as well as audit any errors thrown.

**Creating the module**

We'll need to make sure our module is available on the remote computer. There are several ways to do this, but for this demo, we'll simply create a folder for it in one of the standard module directories.

The file path will end up being:


`C:\Windows\system32\WindowsPowerShell\v1.0\Modules\MyModule\mymodule.psm1
`.

**Creating the session configuration file**

Next, we need to actually create the session endpoint. We need to ensure our users can only use the functions and cmdlets we've specified, so in order to do that we need to configure a few parameters. 

First, is 


`LanguageMode
`, of which we'll be using the 


`Restricted
`type. The help file for 


`New-PSSessionConfigurationFile
`explain exactly what this entails:

> 

> RestrictedLanguage: Users may run cmdlets and functions, but are not permitted to use script blocks or variables except for the following permitted variables: $PSCulture, $PSUICulture, $True, $False, and $Null. Users may use only the basic comparison operators (-eq, -gt, -lt). Assignment statements, property references, and method calls are not permitted.
> 


Similar to language mode, we also want to set a custom ExecutionPolicy for our endpoint. For this example, since we really only need our 3 defined commands, we'll use 


`RemoteSigned
`. For more information on various execution policies, see Microsoft's 

[about_Execution_Policies][2] documentation.

Last, we will configure a 


`SessionType
`. Another brief look at 


`Get-Help New-PSSessionConfigurationFile
`shows:

> 

> RestrictedRemoteServer: Includes only the following proxy functions:
> 
> 
> `> Exit-PSSession
> `> ,
> 
> 
> `> Get-Command
> `> ,
> 
> 
> `> Get-FormatData
> `> ,
> 
> 
> `> Get-Help
> `> ,
> 
> 
> `> Measure-Object
> `> ,
> 
> 
> `> Out-Default
> `> , and
> 
> 
> `> Select-Object
> `> . Use the parameters of this cmdlet to add modules, functions, scripts, and other features to the session.
> 


Our code to create our session should now look like this:


`$sessionparams = @{
    'Path'            = "$env:windir\system32\WindowsPowerShell\v1.0\MyPSEndpoint.pssc"
    'LanguageMode'    = 'RestrictedLanguage'
    'ExecutionPolicy' = 'RemoteSigned'
    'SessionType'     = 'RestrictedRemoteServer'
    'ModulesToImport' = @('MyModule')
}
New-PSSessionConfigurationFile @sessionparams
`The last thing necessary to begin using our constrained endpoint is to register it with Powershell:


`$registerparams = @{
    'Name'                     = 'MyPSEndpoint'
    'Path'                     = "$env:windir\system32\WindowsPowerShell\v1.0\MyPSEndpoint.pssc"
    'ShowSecurityDescriptorUI' = $True
}
Register-PSSessionConfiguration @registerparams
`A very important screen should now appear. This is the SecurityDescriptorUI, which will allow us to delegate permissions for who can access our endpoint.

> 

> NOTE: You won't be able to set the SecurityDescriptorUI over a remote PSSession, so be sure to use the console to do this part. If you mess this up, you can reset it from a console:
> 
> 
> `> Get-PSSessionConfiguration -Name MyPSEndpoint | SetPSSessionConfiguration -ShowSecurityDescriptorUI
> `> 
> 


Assign permissions as needed, and then verify your configuration has appropriate permissions:


`PS C:\Users\nate> Get-PSSessionConfiguration -Name MyPSEndpoint
Name          : MyPSEndpoint
PSVersion     : 5.1
StartupScript :
RunAsUser     :
Permission    : NT AUTHORITY\INTERACTIVE AccessAllowed, BUILTIN\Administrators AccessAllowed, BUILTIN\Remote Management Users AccessAllowed
`Without any additional configuration, commands run through the endpoint will execute as the logged in user. For this example, we need to specify other credentials on the server to execute our commands so our users do not need admin rights themselves.


`$RunAsCred = (Get-Credential)
Set-PSSessionConfiguration -Name MyPSEndpoint -RunAsCredential $RunAsCred
`## Using our endpoint {.wp-block-heading}

Now we're ready to connect and use our endpoint. As a user with permissions delegated via the Security Descriptor above, run the following:


`New-PSSession -ComputerName 'remoteserver' -ConfigurationName 'MyPSEndpoint' | Enter-PSSession
`If all goes well, we should be greeted with a remote session PS prompt, as denoted by the 


`[remoteserver] PS>
`in front of the console prompt.

Now we can start to explore what we can can't do! (As long as we configured our session correctly)

Familiar commands like 'Get-ChildItem' won't work, and will result in an 'unknown cmdlet' error. In fact there's literally nothing we can run except the commands in our module, and a few pre-defined commands necessary for the session to function. We can list our options with 


`Get-Command`[wincore2019demo]: PS> Get-Command
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Function        Clear-Host
Function        Exit-PSSession
Function        Get-Command
Function        Get-Foo                                            0.0        MyModule
Function        Get-FormatData
Function        Get-Help
Function        Measure-Object
Function        Out-Default
Function        Restart-OurCustomService                           0.0        MyModule
Function        Select-Object
`Our two commands are present from our module, and that's essentially it. The other functions are pre-defined by the session type 


`RestrictedRemoteServer
`, and are needed for the endpoint to function correctly.

We can run 


`Get-Foo
`:


`[wincore2019demo]: PS>Get-Foo -Message "I love Powershell!"
I love Powershell!
PS>
`We can run 


`Restart-OurCustomService
`:


`PS> Restart-OurCustomService
OurCustomService could not be restarted.
PS>
`We can see the results of our interactions in the event log. My demo VM has no service "OurCustomService" so it displayed a friendly error to the console, and logged the verbose error to the event log.

> 

> TIP: In Restricted Language Mode, we do not have access to the global variable $error. However, by utilizing advanced functions, we can specify -ErrorVariable to still be able to write the error to the event log, even if we don't present this information to our users in the console. This can be seen in the Restart-OurCustomService function, and in the screenshot below.
> 


![Imgur](https://i.imgur.com/Jk0Iwaq.png)  

At this point we've gone over creating a Powershell JEA Endpoint using restricted language and an available custom module for restarting a service. There is a massive amount more you can do with this, but I hope this real-world demonstration has made JEA just a little bit less intimidating and easy to use!

 [1]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
 [2]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-5.1
