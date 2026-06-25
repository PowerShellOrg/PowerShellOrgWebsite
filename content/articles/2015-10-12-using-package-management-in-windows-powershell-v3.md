---
title: Using Package Management in Windows PowerShell v3
authors:
  - Timothy Warner
date: "2015-10-12T20:48:32+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2015/10/using-package-management-in-windows-powershell-v3/
---

Hey now! The [PowerShell team][1] published a preview version of [PackageManagement][2] for Windows PowerShell v3 and v4. As it happens, I have a Windows 7 SP1 box running PowerShell v3--why not run a little experiment?


`$PSVersionTable.PSVersion
Major   Minor   Build   Revision
-----   -----   -----   --------
3       0      -1       -1
`## Preparing the Environment

You need [.NET Framework 4.5][3] or later, so take care of that prerequisite before you install the following two assets:

  * [Windows Management Framework (WMF) v3][4]
  * [PackageManagement PowerShell Modules Preview][2]

I restarted the computer after each installation just to be safe.

Before we proceed we also need to relax our Windows 7 client's script execution policy or we won't see the PSModule package provider or the PowerShellGet module:


`Set-ExecutionPolicy -ExecutionPolicy Bypass -Force
`As you can see in the following screenshot, installing the PackageManagement Preview also gives us PowerShellGet. By the way, in case you didn't know, we use PowerShellGet to discover, install, and manage PowerShell modules, and we use PackageManagement to discover, install, and manage software packages.


  [![Modules folder on our Windows 7 workstation](https://powershell.org/wp-content/uploads/2015/10/Modules-folder-on-our-Windows-7-workstation-628x313.png)](https://powershell.org/wp-content/uploads/2015/10/Modules-folder-on-our-Windows-7-workstation.png)



    Modules folder on our Windows 7 workstation





## Poking Around with the Commands

Let's do this! Open an administrative PowerShell console examine the PackageManagement commands:


`Get-Command -Module PackageManagement | Select-Object -Property Name | Format-Wide -Column 2
Find-Package            Get-Package
Get-PackageProvider     Get-PackageSource
Install-Package         Register-PackageSource
Save-Package            Set-PackageSource
Uninstall-Package       Unregister-PackageSource
`In PackageManagement nomenclature, a package provider represents the "conduit" between the local computer and the PackageManagement engine. As a matter of fact, PackageManagement is most often called a package manager manager (no, that's not a typo).

Next, take a look at the default package providers:


`Get-PackageProvider | Select-Object -Property Name | Sort-Object -Property Name
Name
----
msi
msu
Programs
PSModule
`Your intuition is correct if you think that you can manage locally installed software by working with the **msi, msu,** and **Programs** providers. A single package provider can be associated with one or more package sources (repositories).


`Get-PackageSource | Select-Object -Property Name, ProviderName, IsTrusted
Name        ProviderName       IsTrusted
----        ------------       ---------
PSGallery   PSModule           False
`The [PowerShell Gallery][5] (PSGallery for short) is a Microsoft-run PowerShell module repository. That's fine, but where are the software packages? That's what PackageManagement package sources are for!

Microsoft promotes the [Chocolatey package repository][6] as a starting point for PowerShell package management. Please note that Chocolatey is not owned by Microsoft and using Chocolatey packages is at your own risk.

Moreover, be aware also that setting the **-Trusted** flag on a repository performs no source code validation. Instead, it simply suppresses an "Are you sure?" confirmation sanity check before you install a package.

All that having been said, let's register Chocolatey as a trusted repo on our Windows 7 workstation, and then verify its installation:


`Register-PackageSource -Name Chocolatey -Location http://chocolatey.org/api/v2 -ProviderName PSModule -Trusted -Verbose
Get-PackageSource | Select-Object -Property Name, ProviderName, IsTrusted
Name        ProviderName     IsTrusted
----        ------------     ---------
PSGallery   PSModule         False
Chocolatey  PSModule         True
`I didn't show it in the previous code example, but on first run you'll be prompted to let PowerShell download and install the NuGet provider. [NuGet][7] is a package manager intended for .NET developers and makes it easier to find and install code libraries in Visual Studio. Chocolatey has a dependency on NuGet, so that's why it's required.

The open-source world seems to love word puns; perhaps you derived a few 'yuk yuks' over the idea of "chocolatey nuget," right? Er, maybe not. 🙂

## Installing Some Software

Well, the great moment has arrived: Let's install some software. How about 7-Zip, the freeware file archiver? Does the Chocolatey repo host a copy of the tool?


`Find-Package -Name *7zip*
`I'll spare you the output, but the answer is "Yes, of course." Now that we know the name of the package, we can pipeline the object to **[Install-Package][8].** We'll specify** **the **-Verbose** switch parameter so we see as many "behind the scenes" details as possible:


`Find-Package -Name 7zip | Install-Package -Verbose -Force
`Sadly, I learned through bitter experience (as well as by inspecting the **-Verbose** package installation output) that different packages put the executables in different folders. For instance, the Chocolatey [7-Zip][9] package uses the traditional **C:\Program Files**. On the other hand, the Chocolatey [Windows Sysinternals][10] package places its executables in the path **C:\Chocolatey\bin**. Thus, I needed to add this path permanently to my [PATH][11] environment variable to make the Sysinternals utilities easier to use from within PowerShell. 

Now for the bad news. What I said in the previous paragraph is perfectly valid for PackageManagement under Windows PowerShell v5. However, I was unable to install any packages on my Windows 7 SP1 machine. Strangely, the package installations failed not with a traditional red error message but with the yellow (or green? I'm colorblind) warning message:


`WARNING: The module '7zip' cannot be installed or updated because it is not a properly-formed module.
`This is obviously a bug. Either that or I did something stupid on my own on this computer .:)

## Testing PowerShellGet

Just for grins, let's use PowerShellGet to install [ISE Steroids][12], my favorite script editor. We'll begin by enumerating the PowerShellGet functions as usual:


`Get-Command -Module PowerShellGet | Select-Object -Property Name | Format-Wide -Column 2
Find-Module        Get-InstalledModule
Get-PSRepository   Install-Module
Publish-Module     Register-PSRepository
Save-Module        Set-PSRepository
Uninstall-Module   Unregister-PSRepository
Update-Module
`Fun fact: The PowerShellGet functions are simply wrappers for PackageManagement commands. PowerShellGet runs through the PSModule package provider by default.

Next we'll install the module. Yes, we could use **Find-Module**, but I already know that [Dr. Weltner][13] posted his module to the Gallery:


`Install-Module -Name ISESteroids -Verbose -Force
`This time a smile crept across my face when I issued **Start-Steroids** from within my PowerShell v3 ISE and ISE Steroids loaded. 

## Final Thoughts

I have two parting thoughts for you. First, the PackageManagement Modules Preview for PowerShell v3 and v4 (wow, say that three times quickly) is indeed a preview release. Therefore, we can always file bug reports on [Microsoft Connect][14] and I'm sure the PowerShell team will validate and correct them.

Second, any self-respecting business should deploy their own private, internal package and module repositories rather than use public ones like Chocolatey. The best instructions I've found online for building your own package management repository come from PowerShell MVP [Boe Prox][15] in his blog post "[Setting Up a NuGet Feed for Use with OneGet][16]." By the way, OneGet was the original name for what's now called PackageManagement.

I hope you found this article useful. Let's chat about it in the comments! Thanks for reading and take good care.

 [1]: http://blogs.msdn.com/b/powershell/archive/2015/10/09/package-management-preview-for-powershell-4-amp-3-is-now-available.aspx
 [2]: https://www.microsoft.com/en-us/download/details.aspx?id=49186
 [3]: https://www.microsoft.com/en-us/download/details.aspx?id=40779
 [4]: https://www.microsoft.com/en-us/download/details.aspx?id=34595
 [5]: https://www.powershellgallery.com/
 [6]: https://chocolatey.org/
 [7]: https://www.nuget.org/
 [8]: https://docs.nuget.org/consume/package-manager-console-powershell-reference#install-package
 [9]: http://www.7-zip.org/
 [10]: https://technet.microsoft.com/en-us/sysinternals/bb545021.aspx
 [11]: https://www.wikiwand.com/en/PATH_(variable)
 [12]: http://www.powertheshell.com/isesteroids/
 [13]: https://mvp.microsoft.com/en-us/PublicProfile/9199?fullName=Tobias%20Weltner
 [14]: https://connect.microsoft.com/PowerShell
 [15]: https://mvp.microsoft.com/en-us/PublicProfile/5000355?fullName=Boe%20Prox
 [16]: http://learn-powershell.net/2014/04/11/setting-up-a-nuget-feed-for-use-with-oneget/
