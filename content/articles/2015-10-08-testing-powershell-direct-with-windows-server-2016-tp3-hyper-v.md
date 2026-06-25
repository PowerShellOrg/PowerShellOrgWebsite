---
title: Testing PowerShell Direct with Windows Server 2016 TP3 Hyper-V
authors:
  - Timothy Warner
date: "2015-10-08T14:03:48+00:00"
categories:
  - PowerShell for Admins
  - Training
aliases:
  - /2015/10/testing-powershell-direct-with-windows-server-2016-tp3-hyper-v/
---

Hey there! I  thought we could test [PowerShell Direct][1] together today. Here's the elevator pitch: In Windows Server 2016 and Windows 10, we can send PowerShell commands from the Hyper-V host directly to its corresponding virtual machines (VMs), _**even in the absence of guest VM networking**_. Yeah, that's cool, isn't it?

What's just as impressive is that PowerShell Direct works _**even if PowerShell remoting is disabled on the guest VM!** _PowerShell Direct also circumvents Windows Firewall. Note that PowerShell Direct requires that commands are sent only from a Hyper-V host to its local VMs.

Also, PowerShell Direct is supported at this point only by Windows Server 2016 TP3 and Windows 10. That means a Windows Server 2016 TP3 Hyper-V host cannot leverage PowerShell Direct against, say, Windows Server 2012 R2 virtual machines (give the Hyper-V, PowerShell, and Windows Server teams time; I'm sure this will be supported in the future).

The secret sauce behind PowerShell Direct is [PowerShell Remoting Protocol][2] (MS-PSRP), which used to be called just plain ol' garden variety "PowerShell remoting."

## The Lab Setup

In my test lab, I started with a domain controller and Hyper-V host (yeah, I'm combining server roles--what of it?) named **hyperv1.company.pri**. That server's running [Windows Server 2016 Technical Preview 3][3].

In Hyper-V I created a single virtual switch named **Internal** that is connected to the host/guest network. Of course, we don't care about the switch fabric because we're going to use PowerShell Direct.

Next, I built a Windows Server 2016 TP3-based guest VM named **server1** and disabled the network adapter as you can see in the following screenshot. No smoke and mirrors here!


  [![Our lab is set up and ready to test PowerShell Direct.](https://powershell.org/wp-content/uploads/2015/10/Our-lab-set-up-and-ready-to-test-PowerShell-direct.png)](https://powershell.org/wp-content/uploads/2015/10/Our-lab-set-up-and-ready-to-test-PowerShell-direct.png)



    Our lab is set up and ready to test PowerShell Direct.



As a final "sanity check" to ensure the guest VM is as theoretically inaccessible as possible, I blocked access to all remote access session configurations and disabled the Windows Remote Management (WinRM) service by running the following command from within the guest (thanks to PowerShell MVP [Aleksandar Nikolić][4] for clarification on this point):


`Disable-PSRemoting -Force
Get-Service -Name WinRM | Stop-Service -Force | Set-Service -StartupType Disabled
`Okay. Let's move onto the next phase of our experiment.

## Sending Commands to the Guest VM

Let's obtain the name and globally unique identifier (GUID) of our Windows Server 2016 VM (you'll see why in just a moment):


`Get-VM | Select-Object -Property Name, VMid
Name        VMId
----        ----
server1     31d787fe-02cd-4363-b50b-16bc8243fc77
`PowerShell Direct makes itself manifest by means of two new parameters:

  * VMname
  * VMGuid

Handy, eh? The following two cmdlets support the **-VMname** and **-VMGuid** parameters as of this writing in October 2016:

  * [Enter-PSSession][5]
  * [Invoke-Command][6]

Time to test! Let's start a remote session with the **server1** guest VM by specifying its GUID. Note that you will need:

  * Hyper-V administrative privileges on the host
  * Local administrative privileges on the guest


`$cred = Get-Credential
Enter-PSSession -VMGuid 31d787fe-02cd-4363-b50b-16bc8243fc77 -Credential $cred
[server1]: PS C:\Users\Administrator\Documents>
`We'll finish by using Invoke-Command to send ad-hoc PowerShell pipelines and entire scripts from host to guest:


`Invoke-Command -VMName 'server1' -Credential $cred -ScriptBlock { Get-Service | Where-Object {$_.Status -eq 'Stopped'} }
Invoke-Command -VMName 'server1' -FilePath 'D:\scripts\setup-ip.ps1' -Credential $cred
`## Conclusions

Convenience is the primary advantage that PowerShell Direct brings to us Hyper-V administrators. We can connect to and fully administer our guest virtual machines regardless of their networking, firewall, or WS-Man state. Thanks for reading, and more power to the shell!

 [1]: http://blogs.technet.com/b/virtualization/archive/2015/05/14/powershell-direct-running-powershell-inside-a-virtual-machine-from-the-hyper-v-host.aspx
 [2]: https://msdn.microsoft.com/en-us/library/dd357801.aspx
 [3]: https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-technical-preview
 [4]: https://twitter.com/alexandair
 [5]: https://technet.microsoft.com/en-us/library/hh849707.aspx
 [6]: https://technet.microsoft.com/en-us/library/hh849719.aspx
