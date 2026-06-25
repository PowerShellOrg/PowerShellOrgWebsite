---
title: The Shell vs. The Host
authors:
  - Don Jones
date: "2013-10-19T18:03:11+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/10/the-shell-vs-the-host/
---

One thing that's often _very_ confusing about PowerShell is the difference between the shell itself - what I'll call _the engine_ in this article - and the application that hosts the engine.  
You see, you as a human being can't really interact directly with PowerShell's engine. Instead, you need a _host application_ that lets you do so. The standard console - PowerShell.exe - is one such host; the Integrated Script Environment (ISE) is another. Those hosts "spin up" a _runspace, _which is essentially an instance of the PowerShell engine. When you type a command and hit enter, the host creates a pipeline, jams your command into it, and then deals with the output.  
A number of standardized PowerShell commands actually require the host to implement some kind of command support. For example, most of the core Write- cmdlets actually depend upon the host to do something. Write-Verbose is a great example: The command causes the engine to spew text into the Verbose pipeline; the host is responsible for doing something with it. In the case of the console host, the Verbose text is displayed as yellow text (by default) preceded by the word "VERBOSE:".  
When you develop a script using the ISE or the console (which behave pretty similarly for most of the core commands), you get used to your script behaving in a certain way. If you then move that script over to another host - perhaps a runbook automation system that runs PowerShell scripts by hosting the engine, rather than by launching PowerShell.exe - you may get entirely different behavior.  
Here's a perfect example: most of the "built-in" variables you're used to working with in the ISE or the console aren't actually built into the _engine, _they're built into those _hosts. _For example, since the host is responsible for presenting verbose output, the _host_ is what creates and uses the $VerbosePreference variable. When your script is running in a different host, $VerbosePreference may not exist, and indeed verbose output may simply be ignored. An off-the-shelf PowerShell runspace doesn't actually come with very much "built-in" at all, so scripts can behave _very_ differently.  
It's pretty important to understand these potential differences. When a developer sets out to create their own host application - like most of the commercial script editors do - it can be very confusing and frustrating, because they essentially have to reverse-engineer much of what the PowerShell.exe console application is doing, so that they can provide an equivalent experience. But you should never _assume_ that a script's behavior under one host will be consistent in all other hosts; test and verify.
