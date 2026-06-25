---
title: The current and future state of the Windows Management Framework
authors:
  - Bjorn Houben
date: "2014-10-06T11:04:50+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/10/the-current-and-future-state-of-the-windows-management-framework/
---

At the 2nd of October, [Lee Holmes](http://www.leeholmes.com/) gave a presentation about the current and future state of the Windows Management Framework (WMF) during the [Dutch PowerShell User Group (DuPSUG)](http://www.dupsug.com/?page_id=914) at the Microsoft headquarters in The Netherlands.  
The slide decks and recorded videos will be made available soon, but this is what was discussed:  

**The release cycle of the Windows Management Framework (WMF)**

Faster incremental releases of preview versions are being released. This rapid development means that companies that need specific new functionalities to tackle current problems they're having, don't have to wait as long as they had to in the past.  
Everyone should keep in mind that documentation for preview versions can be more limited, but should still read the [release notes ](http://www.microsoft.com/en-us/download/details.aspx?id=44070)carefully. They contain descriptions of some of the improvements that are discussed in this blog post, but also cover other things that aren't discussed here. Also be sure to take a look at [What's New in Windows PowerShell](http://technet.microsoft.com/en-us/library/hh857339.aspx) at TechNet.  
A request from the audience was to include more helpful real-life examples until documentation is fully up-to-date.  


**Desired State Configuration (DSC) partial/split configurations**

With DSC partial/split configuration it is possible to combine multiple separate DSC configurations to a single desired state. This could be useful when a company has different people or departments that are responsible for a specific part of the configuration (by example Windows, database, applications).  


**OneGet**

OneGet is a Package Manager Manager (it manages package managers). It enables companies to find, get, install and uninstall packages from both internal and public sources. Public repositories can contain harmful files and should be treated accordingly.  
Besides the OneGet module included in the Windows Management Framework Preview, updated versions are continuously being uploaded to [https://github.com/OneGet/oneget](https://github.com/OneGet/oneget) by Microsoft. These can include bug fixes and new functionality like support for more provider types.  
While in the past it seemed that Nuget was required, during the [PowerShell Summit](https://powershell.org/community-events/summit/) it was demonstrated that a file share can be used as well.  
From the audience a question was raised whether BITS (Background Intelligent Transfer Service) could be used. This is currently not the case and there were also no plans yet to implement it.  


**PowerShellGet**

PowerShellGet is a module manager which should make it easier to find the many great modules that are already available, but are not very discoverable because they're fragmented on numerous websites across the Internet.  
Microsoft is currently hosting a gallery of modules. The modules that are available in there are currently being controlled by Microsoft, but this might change in the future.  
It is possible to create an internal module source and the save location for modules can be specified as well.  


**PSReadLine**

PSReadLine is a bash inspired readline implementation for PowerShell to improve the command line editing experience in the PowerShell.exe console. It includes syntax coloring and CTRL+C and CTRL+V support, for more information about other improvements, view their [website](https://github.com/lzybkr/PSReadLine).  
PSReadLine is one of the modules that can be installed using PowerShellGet:  


Find-Module 


PsReadLine 


| 


Install-Module 





**Security**


  * Always be careful when running scripts that include Invoke-Expression or its alias iex because it might run harmful code. 
      * For a non harmful example, take a look at this [blog post](http://www.leeholmes.com/blog/2011/04/01/powershell-and-html5/) by Lee Holmes.
  * Many people in the security community are adopting PowerShell.
  * PowerShell is done in memory and is therefore volatile. To improve security the following enhancements were introduced: 
      * Transcript improvements 
          * Transcript support was added to the engine so it can used everywhere, also in the Integrated Scripting Environment (ISE).
          * A transcript file name automatically includes the computer name.
          * Transcript logging can be enforced to be redirected to another system.
          * Transcription can be enforced by default.
  * Group Policy 
      * An ADMX file is currently not available to configure it on all platforms, but it can be found in the technical preview versions of Windows 10 and Windows Server under: Administrative Templates -> Windows Components -> Windows PowerShell
  * More advanced Scriptblock logging 
      * Enable ScriptBlockLogging through GPO (in later Windows versions) or by registry by setting EnableScriptBlockLogging to 1 (REG_DWORD) in: HKLM:\SOFTWARE\Wow6432Node\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging
      * The additional logging will show you what code was run and can be found in event viewer under Applications and Services Logs\Microsoft\Windows\PowerShell\Operational.
      * Scriptblocks can be split across multiple event log entries due to size limitations.
      * Using Get-WinEvent -FilterHashTable it is possible to get related events, extract the information and combine it.
      * Since attackers would want to remove these registry settings and clear event logs, consider using Windows Event Forwarding/SCOM ACS to store this information on another server. Also consider enabling cmdlet logging.
  * Just Enough Admin (JEA) 
      * JEA enables organizations to provide operators with only the amount of access required to perform their tasks.



**New and improved functionality and cmdlets**


**Manage .zip files using Expand-Archive and Compress-Archive**  
.zip files can be managed using Compress-Archive and Expand-Archive. Other archive types like .rar are not currently supported, but this might be added in future versions.  

**New-Item**  
It is now not necessary anymore to specify the item type. To create a new item, simply run  


New-Item 


foo.txt 




**Get-ItemPropertyValue**  
This makes it easier to get the value of a file or registry:

  * 


Get-ItemPropertyValue 


$Env:windir


\system32\calc.exe 


-name 


versioninfo


  * 


Get-ItemPropertyValue


-Path


HKLM:\SOFTWARE\Microsoft\PowerShell\1\ShellIds\ScriptedDiagnostics 


-Name 


ExecutionPolicy



**Symbolic links support for New-Item, Remove-Item and Get-ChildItem**  
Symbolic link files and directories can now be created using:

  * 




New-Item 


-ItemType 

SymbolicLink 

-Path 

C:\Temp\MySymLinkFile.txt 

-Value 

$pshome

\profile.ps1





  * 




New-Item 


-ItemType 

SymbolicLink 

-Path 

C:\Temp\MySymLinkDir 

-Value 

$pshome





Junctions cannot currently be created, but this might also be added in a later version.  

**Debugging using Enter-PSHostProcess and Exit-PSHostProcess**  
Let you debug Windows PowerShell scripts in processes separate from the current process that is running in the Windows PowerShell console (by example long running or looping code). Run Enter-PSHostProcess to enter, or attach to, a specific process ID, and then run Get-Runspace to return the active runspaces within the process. Run Exit-PSHostProcess to detach from the process when you are finished debugging the script within the process.  

**Use Psedit to edit files in a remote session directly in ISE**  
Simply open a new PSSession to a remote computer and type PSEdit 
.  

**Classes and other user-defined types**

  * The goal is to enable a wider range of use cases, simplify development of Windows PowerShell artifacts (such as DSC resources), and accelerate coverage of management surfaces.
  * Classes are useful for structured data. Think by example about custom objects that you need to change afterwards.
  * Name of the class and the constructor must be the same.
  * Code is case insensitive.
  * In classes, variables are lexically scoped (matching braces) instead of dynamically scoped.
  * Every return must be explicit.
  * Sample code:







Class

 MyClass



{




MyClass

(

$int1

,



$int2

)


   {




"In the constructor"


   }




[int]

$Property1




[DateTime]

$Property2




[int]

MyHelper

(

$param1

)


   {




return



42


   } 


}
