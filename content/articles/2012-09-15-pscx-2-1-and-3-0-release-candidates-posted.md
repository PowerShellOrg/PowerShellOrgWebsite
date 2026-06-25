---
title: PSCX 2.1 and 3.0 Release Candidates Posted
authors:
  - Keith Hill
date: "2012-09-16T02:45:47+00:00"
aliases:
  - /2012/09/pscx-2-1-and-3-0-release-candidates-posted/
---

Oisin and I have been busy prepping the PowerShell Community Extensions to support Windows PowerShell 3.0.  With this release, we are providing two packages.  There is a [Pscx-2.1.0-RC.zip][1] that is xcopy deployable just like PSCX 2.0.  Just remember to unblock the ZIP before extracting it otherwise you"™ll get errors when you try to import the module.  Pscx 2.1 can be used to target both Windows PowerShell 2.0 and 3.0.  In order to do this, Pscx 2.1 is still compiled against .NET 2.0 and it can"™t take advantage of any Windows PowerShell 3.0 specific features.  

The second package is [Pscx-3.0.0-RC.msi][2].  This is a traditional Windows installer package.  The benefit of using an MSI is that the user doesn"™t have to worry about unblocking the file before installing it.  The MSI file is also Authenticode signed with an extended validation code signing certificate so it should make it past Windows 8 SmartScreen.  I"™d like to extend a big thanks to [DigiCert][3] for graciously donating the EV code signing certificate to us.

INSTALLATION NOTE: the WiX-based installer modifies the PSModulePath environment variable but the modification doesn"™t always seem to be in effect after installation.  If Import-Module Pscx "“RequiredVersion 3.0.0.0 fails to load PSCX, import the module by path (C:\Program Files (x86)\PowerShell Community Extensions\Pscx3\Pscx\Pscx.psd1) until you get a chance to reboot.  After that, you shouldn"™t have to specify the path.

Another aspect of Pscx 3.0 is that it is compiled against .NET 4.0 and takes advantage of some features specific to Windows PowerShell 3.0.  Over time, we will focus our new feature efforts on the Pscx 3.0 branch.

### PSCX 2.1 and 3.0 Side-by-Side Support

With this release, you can install Pscx 2.1 and 3.0 side-by-side.  Note however that if you xcopy install Pscx 2.1 into your user"™s Modules directory, PowerShell will find that version of Pscx before the 3.0 version.  In order to ensure you load a specific version of Pscx, use the "“RequiredVersion parameter on Import-Module e.g.


`Import-Module Pscx -RequiredVersion 3.0.0.0
`### Support for AllSigned Execution Policy

Each of the two packages above (2.1 and 3.0) supported execution in an AllSigned environment.  All of the script files (\*.ps1, \*.psm1 and *.ps1xml) have been signed.  Of course, this means you can"™t modify these scripts (i.e. to fix bugs) and still run them AllSigned.

### New Features

There are not a lot of new features in this release but there are a few handy additions including:

  * Get-Parameter "“ thanks to Jason Archer for contributing this great way to visual a command"™s parameter information.
  * Import-VisualStudioVars "“ for developers who like to spend their time in PowerShell instead of cmd.exe, this function takes care of importing the build environment for the specified version of Visual Studio.  The 2008, 2010 and 2012 versions of Visual Studio are supported.
  * Start-PowerShell "“ a wrapper for PowerShell.exe that utilizes the PowerShell parameter parsing engine to make invocation of various flavors of PowerShell (from PowerShell obviously) easier.  While testing the AllSigned support I used this command a lot: 
`Start-PowerShell -NoProfile -ExecutionPolicy AllSigned -Version 2
`* Get-ExecutionTime "“ since PowerShell 2.0, the HistoryInfo object for a command has included both the StartExecutionTime and the EndExecutionTime. This command makes it easy to see the total execution time for any command e.g.: 


`C:\PS> Get-ExecutionTime
  Id ExecutionTime    HistoryInfo
  -- -------------    -----------
   1 00:00:02.9919258 Get-ChildItem C:\Windows\System32
   2 00:00:00.2650339 Get-Process
   3 00:00:00.2499424 Get-Service
`### Bug Fixes

Oisin spent a good deal of time fixing issues in the Read-Archive and Expand-Archive cmdlets.  We updated the version of 7z that we are using (to 9.x) and modified the cmdlets to use [SevenZipSharp][4].  I also fixed a number of bugs in Invoke-Elevated (alias su), Set-Writable, Edit-File and type accelerators breaking on PowerShell 3.0.

As you use these release candidates please report any issues to the [Pscx CodePlex project][5].  Thanks for supporting Pscx!

[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/271/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/271/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=271&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)

 [1]: http://pscx.codeplex.com/releases/view/93945
 [2]: http://pscx.codeplex.com/releases/view/94637
 [3]: http://www.digicert.com/
 [4]: http://sevenzipsharp.codeplex.com/
 [5]: http://pscx.codeplex.com/workitem/list/basic
