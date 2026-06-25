---
title: What are Your PowerShell Newbie Gotchas?
authors:
  - Don Jones
date: "2013-04-18T13:55:31+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2013/04/what-are-your-powershell-newbie-gotchas/
---

I'm putting together a list of common "gotchas" for PowerShell, mainly things that affect newcomers. So far, I've got:

  * Piping the output of a Format cmdlet to nearly anything else
  * Using -contains instead of -like
  * Selecting a subset of object properties and then trying to sort/fiter on a now-missing property
  * Wrong syntax for -filter parameters on various commands
  * Commands that don't produce pipeline output (e.g., piping Export-CSV to something)
  * Using ConvertTo-HTML without -Fragment and appending multiple pages in one file
  * Confusion with ( [ { and the other punctuation
  * Concatenating strings (hard) vs. using double quotes (easier)
  * $ not being part of the variable name (esp with -ErrorVariable)
  * Accumulating objects in a variable and returning it, vs. outputting to the pipeline directly

What are your "gotchas?"
