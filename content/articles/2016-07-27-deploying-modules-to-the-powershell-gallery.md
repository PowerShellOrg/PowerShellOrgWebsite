---
title: Deploying Modules to the PowerShell Gallery
authors:
  - pscookiemonster
date: "2016-07-27T00:38:35+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/07/deploying-modules-to-the-powershell-gallery/
---

So! We've talked about [continuous integration and deployment with PSDeploy][1], the [importance of abstraction][2], and a bit on [how and why to write and publish PowerShell modules][3].  
It's time to combine these ingredients with a quick, real-world walk through on _automatically publishing your PowerShell modules to the PowerShell Gallery_.  If you want a full run-down showing how to deploy PSDeploy with PSDeploy, [hit the link][4]; otherwise, we'll pick up the [PSStackExchange module][5] where we left off, and drop in some continuous integration and deployment goodness!

### Is everything in order?

First things first, what do we already have?

  * A GitHub account, with a repo containing [a PowerShell module][6]
  * A [PowerShell Gallery][7] account ([register an existing Microsoft account][8])
  * Our [PowerShell Gallery API Key][9]

That's about it!  This is all you need to start automatically publishing to the PowerShell Gallery.

### Manual steps

There's one manual step to take - we'll use AppVeyor's [secure variables][10] feature to encrypt our PowerShell Gallery API key under our AppVeyor account.  
Chris Wahl has [a quick hit with instructions][11].  Long story short? Click your AppVeyor account drop down, Encrypt data.  Paste in your API key and Encrypt!  Copy out the resulting encrypted value.  
Okay, now what do we do with it?

### Drop in the scaffolding!

We're going to download four files and substitute in our encrypted data.  You could use the code below with a few substitutions to add automated deployments to your PowerShell modules:


`# Create a folder, clone PSStackExchange, browse to that repo
# Substitute in values for your own module as desired
$Repo = 'C:\sc\PSStackExchange\'
mkdir C:\sc
cd C:\sc
git clone https://github.com/RamblingCookieMonster/PSStackExchange.git
cd $Repo
# We're in the repo! Download 4 scaffolding files:
$wc = New-Object System.Net.WebClient
'https://raw.githubusercontent.com/RamblingCookieMonster/PSDeploy/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/appveyor.yml',
'https://raw.githubusercontent.com/RamblingCookieMonster/PSDeploy/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/build.ps1',
'https://raw.githubusercontent.com/RamblingCookieMonster/PSDeploy/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/psake.ps1',
'https://raw.githubusercontent.com/RamblingCookieMonster/PSDeploy/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/deploy.psdeploy.ps1' |
    ForEach-Object {
        $File = Join-Path $Repo ($_ -split "/")[-1]
        $wc.DownloadFile( $_, $File )
    }
# Replace my encrypted NuGetApiKey with yours!
$YourKey = 'SomeEncryptedKeyFromAppVeyor'  # <<<<<< Replace this with your encrypted data from AppVeyor <<<<<<
$AppVeyorPath = Join-Path $Repo appveyor.yml
$AppVeyorContent = Get-Content $AppVeyorPath -Raw
Set-Content $AppVeyorPath -Value $AppVeyorContent.replace('secure: oqMFzG8F65K5l572V7VzlZIWU7xnSYDLtSXECJAAURrXe8M2+BAp9vHLT+1h1lR0', "secure: $YourKey")
# Commit your changes, push them to GitHub, and you're good to go!
`I made these changes, pushed to GitHub with !Deploy in my commit message, and voila!  AppVeyor [ran the build][12], and PSStackExchange [was updated][13] in the gallery!

### Wait, what does this all mean?

So! Every time I make a change to PSStackExchange going forward, I have the option to say _!Deploy_ anywhere in my commit message.  When that happens, my changes run through Pester tests in AppVeyor, and are automatically pushed to the PowerShell Gallery in the unlikely event that I didn't make a mistake.

  * Someone submits a bug report and I have a fix to add?  Automatically !Deploy
  * Someone submits a pull request with an awesome new feature?  Automatically !Deploy
  * I discover I've made a terrible mistake and need to re-write something?  Automatically !Deploy
  * I'm literally too lazy to run a single command, with a key I could serialize using the DPAPI?  !Deploy

Okay, to be fair, this pipeline borrows from the PowerShell team and [deploys developer builds to AppVeyor][14] regardless of whether you say !Deploy.  
More specifically:

  * AppVeyor reads the [appveyor.yml][15], which tells it to run the build.ps1
  * The [build.ps1][16] downloads a few modules, sets some build variables, and runs psake.ps1
  * [Psake.ps1][17] includes our steps to test via Pester, build via BuildHelpers (bump the module version, etc.), and deploy via PSDeploy
  * [Deploy.psdeploy.ps1][18] tells PSDeploy what to deploy, and includes some gates - for example, only deploy the master branch to the PowerShell gallery

That's about it!

### Takeaways

Three quick takeaways:  
(1) Each of the components in this pipeline, and the pipeline itself are open source:  [psake][19], [Pester][20], [PSDeploy][21], and [BuildHelpers][22].  Feel free to contribute ideas, bug reports, tests, documentation, code, and the like.  
(2) It goes without saying, but do consider writing modules, [open sourcing][23] them, and publishing them to the PowerShell Gallery - ideally automatically with something like the process we just walked through!  
(3) This is a great way to get your feet wet with [release pipelines][24] for infrastructure.  You might have different tests, and you might deploy systems and services rather than modules, but ultimately:

  * You're pushing changes to source control
  * You have a build system that watches this, and... 
      * Runs a suite of tests
      * Perhaps "builds" some artifacts you need
      * Pushes out your changes.  Perhaps to production

Cheers!

 [1]: https://powershell.org/continuous-integration-continuous-delivery-and-psdeploy/
 [2]: https://powershell.org/abstraction-and-configuration-data/
 [3]: https://powershell.org/writing-and-publishing-powershell-modules/
 [4]: http://ramblingcookiemonster.github.io/PSDeploy-Inception/
 [5]: https://github.com/RamblingCookieMonster/PSStackExchange/tree/db1277453374cb16684b35cf93a8f5c97288c41f/PSStackExchange
 [6]: https://github.com/RamblingCookieMonster/PSStackExchange/tree/db1277453374cb16684b35cf93a8f5c97288c41f
 [7]: https://www.powershellgallery.com/
 [8]: https://www.powershellgallery.com/users/account/LogOn?returnUrl=%2F
 [9]: https://www.powershellgallery.com/account
 [10]: https://www.appveyor.com/docs/build-configuration#secure-variables
 [11]: http://wahlnetwork.com/2016/07/19/encrypting-environmental-variables-with-appveyor/
 [12]: https://ci.appveyor.com/project/RamblingCookieMonster/psstackexchange/build/1.0.4
 [13]: https://www.powershellgallery.com/packages/PSStackExchange/1.0.3
 [14]: http://psdeploy.readthedocs.io/en/latest/Example-AppVeyorModule-Deployment/
 [15]: https://github.com/RamblingCookieMonster/PSDeploy/blob/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/appveyor.yml
 [16]: https://github.com/RamblingCookieMonster/PSDeploy/blob/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/build.ps1
 [17]: https://github.com/RamblingCookieMonster/PSDeploy/blob/8b83d7a4e068b08be3293281b3d2c88c9ccd8c16/psake.ps1
 [18]: https://github.com/RamblingCookieMonster/PSDeploy/blob/master/deploy.psdeploy.ps1
 [19]: https://github.com/psake/psake
 [20]: https://github.com/pester/Pester
 [21]: https://github.com/RamblingCookieMonster/PSDeploy/
 [22]: https://github.com/RamblingCookieMonster/BuildHelpers
 [23]: http://www.themacro.com/articles/2016/05/why-the-best-give-away/
 [24]: http://aka.ms/trpm
