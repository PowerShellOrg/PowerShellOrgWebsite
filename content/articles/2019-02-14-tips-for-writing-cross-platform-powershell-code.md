---
title: Tips for Writing Cross-Platform PowerShell Code
authors:
  - Aaron Jensen
date: "2019-02-14T18:17:40+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
aliases:
  - /2019/02/tips-for-writing-cross-platform-powershell-code/
---

I just spent a month updating [one of our PowerShell modules][1] to support Linux and MacOS. I learned a lot that I wanted to share with the community as cross-platform support becomes more and more important.

## Use "Environment" Class Properties Instead of "env:" Drive {.wp-block-heading}

Environment variables are different between the different operating systems. All of them have 


`PATH
`, but not much else. Windows and MacOS both have variables for the temp directory, but they have different names. 

Instead of using environment variables like 


`$env:USERNAME
`, use the 

[static properties on the Environment class instead][2]. They return the correct values across operating systems.


`Instead Of           Use
----------           ---
$env:USERNAME        [Environment]::UserName
$env:COMPUTERNAME    [Environment]::MachineName


n                   [Environment]::NewLine
`r`n                 [Environment]::NewLine
$env:TEMP            [IO.Path]::GetTempDirectory()


The 


`Environment
`class also has neat properties like 


`Is64BitProcess
`, 


`Is64BitOperatingSystem
`, and 


`UserInteractive
`, which aren't exposed in the 


`env:
`drive.

## Use the Same Case When Reading/Setting Environment Variables {.wp-block-heading}

Environment variable names are case-sensitive on MacOS and Linux, regardless of how you access them. So,


`$env:Path
[Environment]::GetEnvironmentVariable('Path')
`would return nothing on MacOS or Linux, because the path environment variable is 


`PATH
`on those platforms. Since environment variable names are case-insensitive on Windows, you should prefer the case from Linux/MacOS. 

## Always Use "Join-Path" to Create Path Strings {.wp-block-heading}

### When the Path Originates in Your Code {.wp-block-heading}

Never, ever put paths together with strings, e.g. 


`"BasePath\ChildPath"
`. That path won't work on Linux or MacOS because their file systems see the 


`\
`character as an escape character, not a directory separator. Instead, use 


`Join-Path
`. Not only does it use the correct directory separator, but it converts directory separators to the directory separator for the current platform.

For example,


`Join-Path -Path '\usr\bin' -ChildPath 'dotnet'
`returns 


`/usr/bin/dotnet
`on Linux/MacOS and 


`\usr\bin\dotnet
`on Windows.

### When the Path Comes from the User {.wp-block-heading}

In one situation, our module took in a path from the user via a configuration file. Normally, we would use 


`Resolve-Path
`to get the full path to the file, which normalizes the directory separator, but in this situation, the path may be to a file the user wants us to create and 


`Resolve-Path
`requires that the path exists. Here's how we got our paths normalized:


`# If the user didn't give us an absolute path,
# resolve it from the current directory.
if( -not [IO.Path]::IsPathRooted($archivePath) )
{
    $archivePath = Join-Path -Path (Get-Location).Path -ChildPath $archivePath
}
$archivePath = Join-Path -Path $archivePath -ChildPath '.'
$archivePath = [IO.Path]::GetFullPath($archivePath)
`This trick relies on: 


  - 

`Join-Path
`normalizing our directory separators (line 7) and


- 
  The 
`GetFullPath
`method on the 


`IO.Path
`object replacing 


`..
`and 


`.
`characters to the parent/current item name, respectively (line 8).


This way we don't have to use regular expressions. We let .NET Core/PowerShell do that work for us.

## Use "[IO.Path]::DirectorySeparatorChar" When You Can't Use "Join-Path" {.wp-block-heading}

If for some reason you can't use 


`Join-Path
`to create a path or our strategy above, instead of hard-coding the directory separator character, use the 


`[IO.Path]::DirectorySeparatorChar
`property to get the correct separator for the current operating system. For example,


`'ParentPath{0}ChildPath' -f [IO.Path]::DirectorySeparatorChar
`## Don't Use the "-Qualifier" Switch on "Split-Path" {.wp-block-heading}

In some of our tests, we want to create a path on the current drive:


`$drive = Split-Path -Qualifier -Path $PSScriptRoot
$path = Join-Path -Path $drive -ChildPath 'SomePath'
`This doesn't work on Linux/MacOS because "Qualifier" is synonomous with "Drive" and only Windows has the concept of a drive. Instead, use the 


`PSDrive
`property on the 


`FileInfo
`object for the current file (or whatever file whose root path you want) to get the root path:


`$root = (Get-Item -Path $PSScriptRoot).PSDrive.Root
$path = Join-Path -Path $root -ChildPath 'SomePath'
`The above code returns 


`/SomePath
`on Linux/MacOS and 


`C:\SomePath
`on Windows (assuming the current script is on the C: drive).

## Use the Same Case for Hashtable Keys {.wp-block-heading}

On Linux, hashtable keys are case-sensitive. On Windows and MacOS, they aren't. So,


`$ht = @{ 'Key' = 'Value' }
$ht['KEY']
`returns 


`Value
`on Windows and MacOS, and 


`$null
`on Linux. 

## Don't Use Aliases {.wp-block-heading}

Don't use PowerShell's aliases in your scripts. They are different between operating systems. Many of the aliases on Windows were originally added to help non-Windows users find familiar commands, e.g. 


`ls
`mapping to 


`Get-ChildItem
`. We had one test fixture that was using 


`sc
`instead of 


`Set-Content
`. Those tests failed when run under Linux.

## Use "[IO.Path]::PathSeparator" for "PATH" Environment Variable {.wp-block-heading}

Windows uses a different path separator than Linux/MacOS for paths in the 


`PATH
`environment variable. Windows uses 


`;
`. Linux/MacOS use 


`:
`. Instead of hard-coding those characters, use the 


`[IO.Path]::PathSeparator
`property to use the correct separator for the current operating system. For example, this code shows how to split/join the 


`PATH
`environment variable in a cross-platform way:


`# Get each path in the PATH environment variable.
$env:PATH -split [IO.Path]::PathSeparator
# Add a path to the current session's PATH environment variable
$env:PATH = '{0}{1}{2}' -f $env:PATH,[IO.Path]::PathSeparator,$NewPath
`## Warning: Windows Executables Run Under the Windows Subsystem for Linux {.wp-block-heading}

The Windows Subsytem for Linux is great. We used it a lot to get our module working under Linux instead of spinning up an entire VM. Even though it's running Linux, it's still on Windows, so Windows executables can still run. This is awesome but be mindful of the trade-off: if you have tests or code that run Windows executables, they'll appear to run fine under WSL, but fail when actually run on a Linux machine.

## Omit the Extension When Searching for or Running Executables {.wp-block-heading}

On Windows, executable files have the


`.exe
`extension. On Linux/MacOS, an executable has file system permissions that mark a file as executable. If you're searching for or running a command that could exist on all operating systems, omit the extension from the name. On Windows, PowerShell will implicitly add the 


`.exe
`extension for you (it actually uses the extensions in the 


`PATHEXT
`environment variable to look for commands). For example, this code will return the path to the .NET Core and Node.js executables, if they exist in your 


`PATH
`:


`# Finding commands
Get-Command -Name 'dotnet' -ErrorAction Ignore
Get-Command -Name 'node' -ErrorAction Ignore
# Running commands
dotnet --version
node --version
`If your commands exists outside a directory in your 


`PATH
`environment variable, consider adding that directory to your 


`PATH
`either permanently or temporarily so you don't have to build the logic of cross-platform executable naming yourself. 

## Supporting Windows PowerShell and PowerShell Core {.wp-block-heading}

Some changes we encountered between operating systems weren't because of the operating systems but because we use PowerShell 5.1 on Windows. PowerShell 6 behaves differently from PowerShell 5.1 in some ways.

### Use the "FullName" Property on "FileInfo" and "DirectoryInfo" Objects {.wp-block-heading}

In some situations converting 


`FileInfo
`and 


`DirectoryInfo
`objects to strings (i.e. the objects returned by using 


`Get-ChildItem
`against the file system) behave differently. On Windows PowerShell, you'll get just the file's name. On PowerShell Core, you'll get the item's full name. 

For example, this snippet returns each item's name on Windows PowerShell and each item's full name on PowerShell Core:


`Get-ChildItem | ForEach-Object { [string]$_ }
`Instead, use the 


`FullName
`property to get the full path or 


`Name
`to get just the name:


`# Returns each item's full path
Get-ChildItem | ForEach-Object { $_.FullName }
# Returns each item's name
Get-ChildItem | ForEach-Object { $_.Name }
`### Use an Empty Error Type and Capability Checking When Handling "Invoke-WebRequest" Failures {.wp-block-heading}

The exception thrown by 


`Invoke-WebRequest
`is different between Windows PowerShell and PowerShell Core. On Windows PowerShell, it is a 

[System.Net.WebException][3]. On PowerShell Core, it is a [Microsoft.PowerShell.Commands.HttpResponseException][4].

So, if you were handling failed web requests like this:


`$uri = 'https://httpstat.us/500'
try
{
    Invoke-WebRequest -Uri $uri
}
catch [Net.WebException]
{
    Write-Error -Message ('Failed requesting "{0}": {1}' -f $uri,$_.ErrorDetails)
}
`You should instead do:


`$uri = 'https://httpstat.us/500'
try
{
    Invoke-WebRequest -Uri $uri
}
catch
{
    $errorDetails = $null
    $response = $_.Exception | Select-Object -ExpandProperty 'Response' -ErrorAction Ignore
    if( $response )
    {
        $errorDetails = $_.ErrorDetails
    }
    # Not an exception making the request or the failed request didn't have a response body.
    if( $errorDetails -eq $null )
    {
        Write-Error -ErrorRecord $_
    }
    else
    {
        Write-Error -Message ('Request to "{0}" failed: {1}' -f $uri,$errorDetails)
    }
}
`Notice that instead of checking what version of PowerShell we're on to know if the 


`ErrorDetails
`contains the error's response body, we instead check for the existence of the 


`Response
`property on the thrown exception. This property exists on the exception objects thrown by Windows PowerShell and PowerShell Core. This is called a capability check and is the preferred pattern for supporting different ways of doing things across versions and operating systems. When you check for functionality instead of versions, your code will work in more places.

### Use "IsWindows", "IsLinux", and "IsMacOS" Variables _Sparingly_ {.wp-block-heading}

PowerShell 6 introduces three global variables that you can use to check which platform you're on. You should use these sparingly, and instead use capability checks (see above). If you absolutely need to know what operating system you're on, the 


`IsWindows
`, 


`IsLinux
`, and 


`IsMacOS
`variables work great.

We turn on strict mode in all our scripts (i.e. 


`Set-StrictMode -Version 'Latest'
`), so we can't just use these variables without getting errors on Windows PowerShell. Since they were introduced in PowerShell 6, and that version of PowerShell is the first to run on Linux and MacOS, if any of the variables don't exist, you know you're on Windows. If you have code/modules that need to run on Windows PowerShell 

_and_ PowerShell Core, you can use this snippet to conditionally create these variables:


`if( -not (Test-Variable 'variable:IsWindows') )
{
    # We know we're on Windows PowerShell 5.1 or earlier
    $IsWindows = $true
    $IsLinux = $IsMacOS = $false
}
`Be a good script/module neighbor by _not_ making these global and instead restricting them to your script/module scope.

Thanks to [Joseph Larionov][5], who helped edit this article.

 [1]: https://www.powershellgallery.com/packages/Whiskey/
 [2]: https://docs.microsoft.com/en-us/dotnet/api/system.environment
 [3]: https://docs.microsoft.com/en-us/dotnet/api/system.net.webexception
 [4]: https://docs.microsoft.com/en-us/dotnet/api/microsoft.powershell.commands.httpresponseexception?view=pscore-6.0.0
 [5]: https://github.com/DecoyJoe
