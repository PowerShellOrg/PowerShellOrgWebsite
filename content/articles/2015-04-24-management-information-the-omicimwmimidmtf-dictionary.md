---
title: "Management Information: The OMI/CIM/WMI/MI/DMTF Dictionary"
authors:
  - Don Jones
date: "2015-04-24T22:57:48+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/04/management-information-the-omicimwmimidmtf-dictionary/
---

Not too long ago, over on DonJones.com, I [wrote an article][1] that tried to explain some of the confusion between Microsoft's World of Management Instrumentation - e.g., WMI, OMI, CIM, and a bunch of other acronyms. I glossed over some of the finer details, and this article is intended to provide more specificity and accuracy - thanks to Microsoft's Keith Bankston for helping me sort things out.

## CIM and the DMTF

Let us begin with CIM. CIM stands for Common Information Model, and it is not a tangible thing. It isn't even software. It's a set of standards that describe how management information can be represented in software, and it was created by the Distributed Management Task Force (DMTF), an industry working group that Microsoft is a member of.

## Old WMI, DCOM, and RPC

Back in the day - we're talking Windows NT 4.0 timeframe - Microsoft created Windows Management Instrumentation, or WMI. This was a server component (technically, a background service, and it ran on Workstation as well as Server) that delivered up management information in the CIM format. Now, at the time, the CIM standards were pretty early in their life, and WMI complied with what existed at the time. But the standards themselves were silent on quite a few things, like what network communications protocol you'd use to actually talk to a server. Microsoft opted for Distributed Component Object Model, or DCOM, which was a very mainstream thing for them at the time. DCOM talks by using Remote Procedure Calls, or RPCs, also a very standard thing for Windows in those days.

## New WMI, WS-MAN, and WINRM

Fast forward a bit to 2012. With Windows Management Framework 3, Microsoft releases a new version of WMI. They fail to give it a unique name, which causes a lot of confusion, but it complies with all the latest CIM specifications. There's still a server-side component, but this "new WMI" talks over WS-Management (Web Services for Management, often written as WS-MAN) instead of DCOM/RPC. Microsoft's implementation of WS-MAN lives in the Windows Remote Management (WinRM) service. The PowerShell cmdlets that talk this new kind of WMI all use CIM as part of the noun, giving us Get-CimInstance, Get-CimClass, Invoke-CimMethod, and so on. But make no mistake - these things aren't "talking CIM," because CIM isn't a protocol. They're talking WS-MAN, which is what the new CIM standard specifies.  
Sidebar: From a naming perspective, Microsoft was pretty much screwed with the new cmdlets' names, no matter what they called them. "Cim" is a terrible part of the noun. After all, the "old WMI" was compliant with the CIM of its day, but it didn't get to be called CIM. The new cmdlets don't use any technology called "Cim," they're merely compliant with the newest CIM standards. Maybe they should have been called something like Get-Wmi2Instance, or Invoke-NewWmiMethod, but that wasn't going to make anyone happy, either. So, Cim it is.

## OMI

Now, at some point, folks noticed that implementing a full WMI/DCOM/RPC stack wasn't ever going to happen on anything but Windows. It was too big, too "heavy," and frankly too outdated by the time anyone noticed. But there was a big desire to have all this CIM-flavored stuff running elsewhere, like on routers, switches, Linux boxes, you name it. So Microsoft wrote Open Management Instrumentation, or OMI. This is basically a CIM-compliant server that speaks WS-MAN, just like the "new WMI." But it's really teeny-tiny, taking up just a few megabytes of storage and a wee amount of RAM. That makes it suitable for running on devices with constrained compute capacity, like routers and switches and whatnot. Microsoft open-sourced their OMI server code, making it a good reference item that other people could adopt, build on, and implement.

## Under the Hood: Provider APIs

Time to dig under the hood a bit. "Old WMI" got its information from something called the WMI Repository. The Repository, in turn, was populated by many different WMI Providers. These Providers are written in native code (e.g., C++) and only run on Windows. They're what create the classes - Win32_OperatingSystem, Win32_BIOS, and so on - that we IT ops people are used to querying.  
As Microsoft started looking at OMI, and at updated WMI to the newer CIM standards, they realized these old-school Providers weren't hot stuff. First, they were kinda hard to write, which didn't encourage developers to jump on board. They were also kinda huge, relatively speaking, making them less suitable for constrained environments like routers and switches.  
So Microsoft came up with a new Application Programming Interface (API) for writing providers, calling it simply Management Instrumentation, or MI. MI providers are easier to write, and a lot smaller. MI providers, at an API level, work under the "new WMI" as well as under OMI. So if you're getting a router hooked up to all this CIM stuff, you're going to implement the teeny OMI server, and underneath it you're going to write one or more MI providers to provide information to the OMI server. MI providers don't necessarily need a repository, meaning they provide information "live" to the server component. That helps save storage space.  
MI providers are also written in native code, which is nice because lots of developers who work with low-level system stuff greatly prefer native code. The client and server APIs are (on Windows, at least) available in native or managed (.NET) versions, so both kinds of developers get access. Providers, though, are always native code.  
As an IT ops person, you'll probably never care what kind of provider you're using. The "new WMI" on Windows supports both old-style WMI Providers and new-style MI Providers, so developers can pick and choose. Also, Microsoft doesn't need to go re-do all the work they already did writing providers for "old WMI," because "new WMI" can continue to use it.

## PowerShell Cmdlets

When you're using Get-CimInstance in PowerShell, by default you're using "new WMI," meaning you're talking WS-MAN to the remote machine. Those commands also have the ability to talk DCOM/RPC, mainly for backward compatibility with machines that either aren't running WMF3 or later, or that haven't enabled WinRM (remember, WinRM is what "listens" for the incoming WS-MAN traffic).

## Client API Differences: This Matters

It's massively important that you understand the inherent differences between DCOM/RPC and WS-MAN. Under DCOM, you were basically connected to a "live" object on the remote machine. That meant you could get a WMI instance, execute methods, change properties in some cases, and generally treat it as functioning code. The RPC protocol was designed for that kind of continuous back-and-forth, although it wasn't terribly network- or memory-efficient, because of the "live connection" concept. WS-MAN, on the other hand, is basically like talking to a web server. Heck, it uses HTTP, even. So when you run Get-CimInstance, your data is generated on the remote machine, serialized into XML, transmitted back in an HTTP stream, and then deserialized into objects on your computer. Those aren't "live" objects; they're not "connected" to anything. That's why they don't have methods. To execute a method, you have to send another WS-MAN request to the machine, which will execute the method and send you any results - which is what Invoke-CimMethod does. The entire relationship between you and the remote machine is essentially stateless, just like the relationship between a web browser and a web server. So your coding technique has to change a bit as you move from "old WMI" to "new WMI." The good news is that the new, web-style approach is a lot lighter-touch on the server, requiring less network and memory, so it becomes a lot more scalable.

## Versions

Anything running WMF3 or later (Win2008R2 and later, Win7 and later) has "new WMI." Microsoft continues to include "old WMI" for backward compatibility, although on newer versions of Windows (I'm playing with Win2012R2), the ports for DCOM/RPC may not be open, while the ports for WS-MAN are, by default. So we're clearly moving forward.

## Enabling WinRM CIM Remoting New WMI

Oh, and as a complete side note, a LOT of us in the industry will say stuff like "enable PowerShell Remoting" when we refer to enabling WS-MAN. Technically, that's not accurate. Enabling Remoting, if you do it right, enables WinRM, and enables WinRM to pass traffic to PowerShell. It'll also enable most of the other cool stuff we use WS-MAN for, including PowerShell Workflow, the "new WMI" communications for CIM cmdlets, and so on. But you could also enable the "new WMI" stuff without also turning on PowerShell Remoting. At the end of the day, though, turning on Remoting is just the Right Thing To Do, so why not make life easy and turn it all on at once?

## Summary

OLD WMI: Uses DCOM/RPC. Uses old-style native code providers and a repository. Available only on Windows. More or less deprecated, meaning it's not a focus area for further improvement or development. You're connected to "live" objects and can play with them.  
NEW WMI: Uses WS-MAN (via WinRM service). Supports old-style native code providers and a repository, as well as new-style MI providers. Available only on Windows. The way forward. If something can talk to "NEW WMI" it should be able to talk to OMI, also. You're not connected to "live" objects, and have an essentially stateless relationship with the remote machine.  
OMI: Uses WS-MAN (OMI code includes the protocol stack). Supports only new-style MI providers. Available on any implementing platform. Also the way forward. If something can talk to OMI, it should be able to talk to "NEW WMI" also.  
CIM: Defines the standard. Created by DMTF. Early versions were implemented as "OLD WMI" by Microsoft, newest version implemented both in "NEW WMI" and OMI by Microsoft and others.  
And if you prefer summaries by layer:  
SERVER (or, the bit that serves up the info, which could technically be a client device like a laptop) uses PROVIDERS (either old-style WMI, new-style MI, or both) to generate management information. If the SERVER is a non-Windows device, it would run OMI and only support new-style MI providers.  
CLIENT (the machine doing the querying) uses either old-style WMI (DCOM/RPC) or new-style (WS-MAN) to send requests to SERVER and to receive the results. CLIENT doesn't care what API was used to write the providers running on the server, because the server makes the information all look the same. If CLIENT queries a SERVER that only supports WS-MAN, then CLIENT must obviously use WS-MAN.  
Hope that helps.

 [1]: http://donjones.com/2015/04/14/omi-cim-wmi/
