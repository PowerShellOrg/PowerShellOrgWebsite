---
title: My DSC Demo-Class Setup Routine
authors:
  - Don Jones
date: "2014-03-17T22:52:26+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/03/my-dsc-demo-class-setup-routine/
---

I think I've gotten my DSC classroom and demo setup ready. Understand that this isn't meant to be production-friendly - it doesn't automate some stuff because I **want** to cover that stuff in class by walking through it. But, I thought I'd share.  
I've basically made an ISO that I can carry into class, attach to a Win2012R2 VM and a Win81 VM, and run students through. The server VM is a DC in "company.pri" domain, and the client VM belongs to that domain.  
In the root of the ISO are these scripts: [ISO_Root][1] (unzip that). Students basically just open PowerShell, set the execution policy to RemoteSigned or Unrestricted, and then run **SetupLab -DVD D:**, replacing "D:" with the drive letter of the VM's optical drive. The script isn't super-intelligent since I demo it at the same time; it needs the colon after the drive letter.  
In a folder called DSC_Modules, I add the following DSC modules (unzipped): xActiveDirectory, xComputerManagement, xDscDiagnostics, xDscResourceDesigner, xNetworking, xPSDesiredStateConfiguration_1.1, xSmbShare, xSqlPs, xWebAdministration.  
In a folder called DSC_Pull_Examples, I include these scripts: [DSC_Pull_Examples][2] (unzip that).  
In a folder called eBooks, I include these files: [eBooks][3] (unzip that). Those get used in a lot of the demos I do, so I have the lab setup scripts copy over some script modules.  
In a folder called Help, I have a file called Help.zip. This contains everything downloaded by the Save-Help command in PowerShell. The Setup script unzips this into the VM and then runs Update-Help against it, so the VM doesn't need to be Internet-connected.  
In a folder called Hotfix, I have the Windows8.1-KB2883200-x64.msu hot fix installer. I include the 32-bit version also, just in case, but my script doesn't use it.  
In a folder called Installers, I have installers for PrimalScript, PowerShell Studio, and SQL Server Express with Advanced Services. Again, those get used a lot in my classes, but the setup script doesn't rely on them.  
Finally, in a folder called sxs, I have the contents of the Windows 8.1 installation media's \Sources\sxs folder. Some of the things my setup script does - like adding .NET Framework 3.5 so SQL Server 2012 will work - rely on features that aren't in a Win8.1 VM, normally. Because I don't want to rely on the Internet, I include this source so I can install new features from it.  
This is all pretty specific to the way I run classes, but if there's any use you can make of it, feel free.

 [1]: https://powershell.org/wp-content/uploads/2014/03/ISO_Root.zip
 [2]: https://powershell.org/wp-content/uploads/2014/03/DSC_Pull_Examples.zip
 [3]: http://files.concentratedtech.com/ebooks.zip
