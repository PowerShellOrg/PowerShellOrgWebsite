---
title: Judge notes for event 3
author: Art Beane
authors:
  - Art Beane
date: "2013-05-16T15:33:16+00:00"
aliases:
  - /2013/05/judge-notes-for-event-3/
---

This event's entries are impressive. Scoring appears to be higher than in the earlier events, so this one must have been easier to solve. So this time, instead of talking about good and bad scripts, I'm going to comment on some of the techniques I saw.  
There was some "conversation" over whether Win32_Volume or Win32_LogicalDisk was the better approach to take. Fact is, either will return the requested data. So it really doesn't matter which one you use. The controversy seemed to include misreading or misunderstanding the requirement of reporting on "local hard drives", which implies that you need to use _-Filter "DriveType=3"_ (or equivalent) with either to eliminate network or CD/DVD drives.  
When passing a Path parameter into a function, it's a good practice to include _[ValidateScript ({Test-Path -PathType Container})]_ in the definition to avoid having a file name passed in error. Doing the existence test for the path and creating it if necessary in the Begin section of the function would save some time over the various techniques used in the Process section.  
One thing to remember when using a CIMSession is to close it when you've finished using it. A couple other points to pay attention to include accounting for the DCOM/WSMAN options when looking at remote computers and including _#requires -version 3_ in scripts that might be run by other people on computers that might not have PowerShell 3 installed.  
Using a REGEX to validate a string parameter, such as a computer name, isn't a bad idea, but it's important to understand exactly what the match string means. As an example, some of the match strings included a pattern like this: _"[a-zA-Z0-9.-]"_. This means all lower and upper case letters, any numeric digit, any character, or a minus sign. The any character (".") defeats the whole purpose of the match. It really should have been escaped to "\." to mean a period. This error would probably never appear due to the unlikelihood of a badly formatted computer name being fed into the function.  
Lastly, a caution when including an optional credentials parameter. It's probably not a good idea to default it to an empty credential object _($Credential = [System.Management.Automation.PSCredential]::Empty)_. If you do a _if ($Credential) {}_ call later in the script, it will always be $true and you may end up calling for the user to enter credentials far too many times. A better solution would be to check PSBoundParameters to see if a credential object was passed in.  
Hope these ideas help. Good luck in Event 4.
