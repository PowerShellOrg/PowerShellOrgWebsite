---
title: "Why Remoting vs. SSH Isn't Even a Thing"
authors:
  - Don Jones
date: "2015-06-09T21:13:04+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/06/why-remoting-vs-ssh-isnt-even-a-thing/
---

As you've probably read, Microsoft [recently announced][1] that they're getting on board with [SSH][2], and that they've plans to, in some future-and-unspecified version of Windows, include a default SSH server and client. Some folks have taken to the Twittersphere rejoicing this decision, even though I suspect they've no idea why Microsoft is doing it. Others have suggested that this is the downfall of Remoting (management via [WS-MAN][3]), because who would want that when you've got SSH?

And so now I have to write this.

First of all, let's speculate - with some objectivity - why Microsoft is getting involved with SSH at all. My personal belief is that an SSH client is simply massively overdue. Literally every other business-grade operating system on the entire planet comes with a decent command-line SSH client, so for pity's sake, let's get Windows one, too. Being able to reach out to Linux boxes, routers, switches, and all manner of other devices isn't a convenience, it's a necessity.

The SSH server piece is a little more interesting. My suspicion is that Microsoft wants to further enable management systems that are primarily built for Linux to log into Windows and manage Windows boxes. If you've got Ansible or Salt, for example, then you know that they revolve in part around using SSH to log into nodes and run commands. Fine - Microsoft can enable that on Windows if it'll help.

But.

Let's be clear on why making a decision between Remoting and SSH isn't actually a decision.

SSH is, basically, Telnet*. You send characters to the remote computer, and it sends characters back. It's built entirely around stdin and stdout. On a Unix system, this works beautifully, because at the end of the day everything on Unix is a process, a file, or a folder. It's all text, all the way down to the turtles. SSH is great at accessing text. Now, _text itself _isn't necessarily a wonderful management API, because it requires administrators to become experts at string manipulation and slicing, but in the Unix world that's a de facto skill. In other words, _for the type of management API that Unix uses, SSH is a wonderful data transport mechanism. _

(*yes, I know that SSH has evolved tremendously beyond Telnet - but for the purpose of discussing how SSH moves data back and forth, Telnet is a useful analogy. I know SSH does a lot more than just the Telnet-y bits. That's less relevant to my discussion, but thanks to the SSH fans who've pointed it out. I'm simplifying so I can get to the point - I don't regard SSH as bad or weak.)

Windows, on the other hand, is entirely different. It is based on APIs. Data doesn't move between bits of software as a text stream; it moves as a data structure called an _object. _Windows APIs all assume that you're passing objects back and forth, and text parsing-and-slicing isn't part of the deal. When an API gets input, it expects the computer name to be in the ComputerName property of an input object, not hiding in columns 26 to 46 of a text block. SSH, therefore, is _not_ a good mechanism for transmitting the data structures that Windows uses for management.

Remoting, on the other hand, _is_ a good mechanism. It has built-in code for serializing objects into XML, and then deserializing them back into objects on the other end. Like SSH, Remoting natively supports encryption. Unlike SSH, which is really just a remote console, Remoting wasn't built with synchronous operations in mind. Remoting is perfectly happy to fire off a command and then wait until the data comes back some time later. Remoting's underlying protocol, WS-Management, as implemented by the WinRM service, is capable of connecting to far more than just PowerShell, too. CIM and OMI, for example, communicate using WS-MAN. So, unlike SSH, Remoting (well, its underlying infrastructure) connects _software endpoints_ for manageability. That's important in Windows, because those endpoints are where we call the APIs we need to get stuff done.

SSH and Remoting (and WS-MAN) solve different problems. The fact that both solutions involve transmitting encrypted bits across the wire is _literally_ the only thing they have in common. Yes, when you use **Enter-PSSession** to interactively connect to a remote machine, it looks and feels a lot like SSH in how it works. It isn't. It's _entirely and completely_ different, and if you don't know why, you should learn.

(Briefly, Enter-PSSession doesn't send one character out, and then receive that same character echo back. Your typing occurs entirely inside your _local console_, where you can have rich tools like PSReadLine running. When you hit Enter, what you've typed is transmitted _all at once_ to the remote box. It runs your commands, serializes the results into XML, and sends 'em. Your console deserializes the XML into objects, and _your local formatting system_ takes over to display those objects. SSH assumes a dumb client; Remoting and Enter-PSSession require a smarter client.)

Remoting and SSH enable different functionality. Neither is better than the other, any more than cars are better than hot tubs. Both have their place, and both have strengths and weaknesses that devolve primarily from the operating system environments in which they were born. Microsoft _is not implementing an SSH server_ because they believe it's the best way to administer Windows; they're doing it to enable some customer scenarios that, previously, were unnecessarily difficult. Rich management of Windows will always be easier to accomplish using Remoting, but if your management solution can only do SSH, at least you'll be able to do what that can do.

Keep in mind that Microsoft's also provided a reference implementation for WS-MAN running on Linux, because if your solution supports WS-MAN - as Microsoft's do - then it's nice to be able to use that cross-platform.

Now, another argument is, "my security people won't approve Remoting, but they already approve SSH, so we should just use that." First, your "security" people (and they're clearly anything but secure or people) have also probably allowed RDP for managing servers, which is just dumb. Choosing to use an inappropriate tool just because the organization won't grouse about it suggests that you have H.R. problems. Either someone in "security" should be fired, or you should be applying for new jobs at companies that aren't stupid. SSH wasn't _always_ approved; someone had to understand it, what it did, how it worked, and become comfortable with it. They're going to need to do that with WS-MAN whether they like it or not, because it's _what Microsoft is going to fixate on, exclusively, for proper management of their operating system. _You're not going to be able to properly manage Windows via SSH, trust me. Microsoft investing some time in OpenSSH is not the same as Microsoft investing time to re-architect their entire operating system around Telnet as a management communications protocol. If you don't believe me on that, then you're just being obstinate. Which is fine, but time will prove me right on this. So, if your organization doesn't "like"  Remoting, fix your organization.

And SSH will be another tool in our toolbox. Hopefully, you'll use it when it's the very best thing to do, and use other tools when _they_ offer the best way to accomplish a particular task.

 [1]: http://blogs.msdn.com/b/powershell/archive/2015/06/03/looking-forward-microsoft-support-for-secure-shell-ssh.aspx
 [2]: http://en.wikipedia.org/wiki/Secure_Shell
 [3]: http://en.wikipedia.org/wiki/WS-Management
