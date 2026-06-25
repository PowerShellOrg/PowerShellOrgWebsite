---
title: "FAQ: PowerShell on Linux/Mac"
authors:
  - Don Jones
date: "2016-08-18T21:02:51+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/08/faq-powershell-on-linuxmac/
---

_Be sure to check back often, as we'll add to this._  


## So does this mean I'll be able to run [add your favorite module name here] on Linux/Mac?

Likely not. PowerShell on Linux/Mac is, at present, "PowerShell Core," which is a subset of the total _Windows_ PowerShell product. Similar situation to PowerShell on Nano. So any module that requires something outside Core, won't run.  
And further, most modules have dependencies on underlying technologies in Windows. The SMBShare module, for example, depends on CIM classes that only exist on Windows.  
So many add-in modules _won't, _in fact work on Linux - because they're designed to manage Windows machines. Over time, I'm sure we'll see modules that only run on Linux and/or Mac, because they're tied to dependencies on those operating systems.  
Ideally, of course, you can always remote to the OS of your choice and run whatever commands it has. And from [The Register][1]:

> Vendors with PowerShell libraries for their products will be able to port them to the new Core version, and early examples are AWS (Amazon Web Services) and VMware. Steve Roberts, AWS Software Development Engineer, has shown the AWS Tools for PowerShell running on a Mac; and VMware's Alan Renouf has done a similar demonstration using vSphere PowerCLI. "We’ve got commands that will manage every aspect of vCenter administration already," said Renouf.



## Snover's blog post mentioned Remoting over SSH. So does that mean I can Remote into any Linux box?

No, not exactly. It's worth understanding, first, how the existing Remoting over WS-MAN works. In Remoting, you type or compose a command on one node. It is packaged into XML, and transmitted as text over the WS-MAN protocol. The receiving node unpackages it, runs the command, and _serializes_ the resulting objects into XML. That XML is sent back, again over WS-MAN (which is based on HTTP), to the originating node. The originating node _deserializes _the XML to recreate the original objects.  
Remoting over SSH will work exactly the same way, except that SSH will be used to transmit the XML text back and forth, rather than WS-MAN. This isn't the same as a simple SSH session where you're just sending keystrokes to the remote machine. A "plain" Linux machine's SSH daemon wouldn't know what to do with the XML-packaged traffic used by Remoting. Remoting over SSH will require both nodes to be running PowerShell. SSH isn't the end-game, here; it's merely being used to get text from one place to another. This isn't "PowerShell SSH-ing into a remote machine," either. PowerShell isn't an SSH client or server, in that sense.  
Microsoft has already said they plan to release an SSH server and client for Windows. _That_ will get you the plain-Jane SSH interactive sessions that you're used to. SSH, in that scenario, works a lot like encrypted Telnet (it's based on Telnet, after all, as is nearly every other Internet protocol). You press a letter on your keyboard, and it's sent to the remote machine, which then echoes it back to you, so the letter also appears on your local console. When you hit enter to run a command, the text output is sent to your console. "Plain" SSH is a purely text-based thing - while PowerShell's strengths come from its use of objects, rather than text.  
So it's important to differentiate, in your mind, "using SSH the way I'm used to" and "Remoting using SSH as a text transport." There's actually precedent for what Remoting is doing: SCP. SCP encodes binary files as a text stream (vaguely like SMTP does), and uses SSH to transmit that text. It's then decoded into the original binary on the other end. But although SCP _uses_ SSH under the hood, we certainly don't think of it as "using SSH" the way we do when we have an interactive SSH login on a remote box.

 [1]: http://www.theregister.co.uk/2016/08/18/microsoft_brings_powershell_to_linux_and_mac_publishes_as_open_source/
