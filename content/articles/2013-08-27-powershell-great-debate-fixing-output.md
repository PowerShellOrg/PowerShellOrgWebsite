---
title: "PowerShell Great Debate: \"Fixing\" Output"
authors:
  - Don Jones
date: "2013-08-27T14:11:31+00:00"
aliases:
  - /2013/08/powershell-great-debate-fixing-output/
---

When should a script (or more likely, function) output raw data, and when should it "massage" its output?  
The classic example is something like disk space. You're querying WMI, and it's giving you disk space in bytes. Nobody cares about bytes. Should your function output bytes anyway, or output megabytes or gigabytes?  
If you output raw data, how would you expect a user to get a more-useful version? Would you expect someone running your command to use Select-Object on their own to do the math, or would you perhaps provide a default formatting view (a la what Get-Process does) that manages the math?  
The "Microsoft Way" is to use a default view - again, it's what Get-Process does. But views are separate files, and they're only really practical (many say) when they're part of a module that can auto-load them.  
What do you think?  
[boilerplate greatdebate]
