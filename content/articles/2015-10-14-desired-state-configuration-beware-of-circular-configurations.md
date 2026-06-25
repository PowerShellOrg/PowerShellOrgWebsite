---
title: Desired State Configuration – Beware Of Circular Configurations
authors:
  - Will Anderson
date: "2015-10-14T13:00:37+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/10/desired-state-configuration-beware-of-circular-configurations/
---

Lately, I've been working at converting a lot of my server configuration scripts into DSC configurations.  After all, what better way to learn than by updating your existing methods?  I recently ran into an issue, however, while converting my SCCM Distribution Point deployment script into a config, where the test systems inexplicably began rebooting every thirty minutes or so.  The Local Configuration Manager was configured to reboot if necessary, and these were fresh installs, so I knew that my culprit was most likely in my configuration.

The config was pretty basic: Put the server into a Core state and uninstall the UI management tools, ensure RDC is installed, install the distribution point prerequisites (IIS, IIS 6 WMI Compatibility, .NET 4.5, etc), and configure some firewall rules.  My original script had always served me well, so I was dumbfounded as to what the problem could be.  I decided to [enable the debug logging](http://blogs.msdn.com/b/powershell/archive/2014/01/03/using-event-logs-to-diagnose-errors-in-desired-state-configuration.aspx) for DSC and see what came up.


`Get-WinEvent -LogName "Microsoft-Windows-Dsc/Debug" -ComputerName LWINCM02 -Oldest | Out-Gridview
`When I get the output, I'm seeing a lot of looping around my Remote Differential Compression resource, which ensures that the RDC component is installed.  A further look in the logs showed that the UI Management Tools were also being uninstalled repeatedly.  Hmm...

[![](https://powershell.org/wp-content/uploads/2015/10/RDCOGV-628x331.jpg)](https://powershell.org/wp-content/uploads/2015/10/RDCOGV.jpg)

So on another system that isn't receiving the configuration, I decide to run the Install-WindowsFeature command with the WhatIf switch against the RDC component.  Upon the result, I immediately see what my problem is:

[![RDCInst](https://powershell.org/wp-content/uploads/2015/10/RDCInst-e1444781798166-628x413.jpg)](https://powershell.org/wp-content/uploads/2015/10/RDCInst-e1444781815463.jpg)

The Remote Differential Component requires the installation of the GUI Management Tools.  Likewise, the uninstallation of these tools results in the removal of the RDC component.  So what was happening was this:

  * GUI Tools are removed by DSC, also removing the RDC component.
  * Server reboots.
  * GUI tools are verified uninstalled.  RDC component is reinstalled, which reinstalls the GUI Tools.
  * Server Reboots.
  * Wash.  Rinse.  Repeat.

I've since removed the GUI tools removal from my configuration, as RDC is a required component for my distribution points, and my configuration is now working flawlessly.  In tracing the root of my problem, I came to realize two very important lessons.

First, as admins, engineers, and solution providers, we often don't take a very close look at our scripts and what it's really doing behind the scenes if it gives us the result we're looking for.  In the case of my configuration script, I added a line to install the RDC component after removing the UI and tools and didn't look any further into why I had to do this in the first place.  DSC kept me honest in this respect - and gave me a gentle reminder to look a little deeper if something unexpected occurs, rather than slapping a band-aid on it and calling it good.

Second, it can be very easy to find yourself dealing with a configuration loop if you're altering the state of components that other components in your config rely on.  Be sure to test your configurations, check your logs, and most importantly, make sure you know what you're really configuring when you configure it.
