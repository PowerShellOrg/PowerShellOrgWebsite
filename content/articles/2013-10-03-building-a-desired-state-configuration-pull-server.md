---
title: Building a Desired State Configuration Pull Server
author: Steven Murawski
authors:
  - Steven Murawski
date: "2013-10-03T19:40:59+00:00"
categories:
  - PowerShell for Admins
  - Tutorials
aliases:
  - /2013/10/building-a-desired-state-configuration-pull-server/
---

Quick recap, I'm working through a series of posts about the [Desired State Configuration](http://technet.microsoft.com/en-us/library/dn249912.aspx) infrastructure that I'm building at [Stack Exchange](http://stackexchange.com), including some how-to's.

## The High Points

  * [Overview](https://powershell.org/2013/10/02/building-a-desired-state-configuration-infrastructure/)
  * Configuring the Pull Server (REST version) (this post)
  * Creating Configurations ([one of two](https://powershell.org/2013/10/08/building-a-desired-state-configuration-configuration/), [two of two](https://powershell.org/2013/10/14/building-a-desired-state-configuration-configuration-part-2/))
  * [Configuring Clients](https://powershell.org/2013/11/06/configuring-a-desired-state-configuration-client/)
  * [Building Custom Resources](https://powershell.org/2014/03/13/building-desired-state-configuration-custom-resources/)
  * Packaging Custom Resources
  * Advanced Client Targeting

I started with an overview of **what** and **why**.  Today, I'm going to start the **how**.

### Building a Pull Server

I'm going to describe how to do this with Server 2012 R2 RTM (NOTE: this is not the General Availability  release, so there may be changes at GA), since that's the environment I'm working most in.  If there is enough demand, I may follow up with how to do this using the Windows Management Framework on downlevel operating systems after the GA version of WMF 4 is released.  
The first step is adding the required roles and features, including the DSC Service.


`Add-WindowsFeature Dsc-Service
`Fortunately, the Dsc-Service feature has the right dependencies configured so IIS, the correct modules, and the Management OData Extension are all enabled.  
Next we need to set up the IIS web site:

  * Create an directory to serve the web application from (I'll use c:\inetpub\wwwroot\PSDSCPullServer)
  * Copy several files from $pshome/modules/psdesiredstateconfiguration/pullserver (Global.asax, PSDSCPullServer.mof, PSDSCPullServer.svc, PSDSCPullServer.xml) to this directory.
  * Copy PSDSCPullServer.config and rename it to web.config
  * Create a subdirectory named "bin".
  * Copy one file from $pshome/modules/psdesiredstateconfiguration/pullserver (Microsoft.Powershell.DesiredStateConfiguration.Service.dll) to the "bin" directory.
  * In IIS, create an application pool that runs under the "Local System" account.
  * In, IIS, create a new site (or application in an existing site or just use the existing default site)
  * Point the site or application root to the directory you designated as the root of the site.
  * Unlock the sections of the web config as below


`$appcmd = "$env:windir\system32\inetsrv\appcmd.exe"
& $appCmd unlock config -section:access
& $appCmd unlock config -section:anonymousAuthentication
& $appCmd unlock config -section:basicAuthentication
& $appCmd unlock config -section:windowsAuthentication
`Now we need to set up the location where the pull server content will be served from.  Installing the DSC Service feature creates a default location ( $env:programfiles\WindowsPowerShell\DscService ).  There'll you find sub-directories for configuration and modules.  We can use these folders or we can create another location.  I'm going to stick with the defaults for now.  We've got a few steps left.  
First, we need to copy the Devices.mdb from $pshome/modules/psdesiredstateconfiguration/pullserver to the root of our pull server data location (in this case, $env:programfiles\WindowsPowerShell\DscService )  
Update the web.config app settings with the following settings:`After that your pull server should be up and running.  You should see something like this if you navigate to http://yourpullserver/psdscpullserver.svc  
[![PullServerDefaultUrl](https://powershell.org/wp-content/uploads/2013/10/PullServerDefaultUrl-300x83.png)](https://powershell.org/wp-content/uploads/2013/10/PullServerDefaultUrl.png)
