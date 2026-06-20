---
title: Some notes on Event 2 Advanced
author: Art Beane
authors:
  - Art Beane
date: "2013-05-10T16:17:32+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/05/some-notes-on-event-2-advanced/
---

I hate to seem negative, but I've noticed a few things about a number of the advanced entries that seem like folks didn't read the instructions, or just weren't careful about details.  
There were a surprising number of entries that had [string]$ComputerName instead of [string[]]$ComputerName in the params section and then went on to treat the parameter as if it were an array.

  * Somewhat related to the array issue, the problem statement indicated that there could be several files that had computer identification for piping into the solution. Several scripts went beyond the minimum by accepting a filename property to process those files directly. I don't think that extension is out-of-bounds, but  scripts that accepted only filenames and excluded ComputerName input didn't get my vote.
  * The instructions asked for a "full help display", but many of the entries had fairly limited documentation. One thing I especially missed was a .PARAMETER description.
  * My last negative comment is about parameter names. Although there's nothing in PowerShell to prevent it, best practices in parameter names should be followed. The parameter ought to be $ComputerName, not $Name, $Server, $Computer, etc. I know it's easier with verbs and nouns because of the Get-Verb and Get-Noun cmdlets, but please pay attention to how you name your parameters.

On the whole, though I really liked the effort everyone put into their scripts. Those that exactly met the requirements were short, sweet, and to the point. There were several extensions that I also liked.

  * Working with optional credentials. It was reasonable to assume that the script would be run using appropriate credentials, some of the scripts accepted alternate credentials for making the CIM or WMI queries. I consider it a best practice to log in and execute tasks at low permissions levels (standard user) and to use elevated credentials only on the specific commands that need them. Kudos also to those of you who accepted either a credentials object or a user name and found the credentials.
  * Using parallel execution to speed up the process. PowerShell provides runspaces, workspaces, and jobs to allow multiple commands to execute concurrently. Nothing in the event hinted at using parallelism, so I put these on my "clever" list.
  * Using PowerShell 3's CIM cmdlets. Using the new features of the latest version of PowerShell is quite good, especially when making use of the backwards compatibility features. I would have done this a bit differently than most, though. Instead of always using the Dcom session option, I would have opened a SimSession using a _try {WSMAN} Catch {DCOM}_ and running the queries against the session.

So, good work, everybody. Let's see what more we can learn in event 3.
