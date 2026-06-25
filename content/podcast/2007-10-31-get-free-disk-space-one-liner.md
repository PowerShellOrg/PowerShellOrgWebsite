---
title: Get free disk space one-liner
authors:
  - Jonathan Walz
date: "2007-10-31T19:18:34+00:00"
aliases:
  - /2007/10/get-free-disk-space-one-liner/
---

Listener Bill writes,

> I have been looking at the get-help and get-member cmdlets, but have so far not found one thing I want to have as a "one-liner" - a command line that will return the free space on a certain drive.

**"`"${env:computername}`",`"" + (gwmi -Query "SELECT FreeSpace FROM Win32_LogicalDisk WHERE DeviceID = 'C:'").FreeSpace / 1GB + '"' | sc my.csv **  
Got kinda ugly with the quote escaping. I'll explain...  
The concept here is to, in one line, build a string and then write it to a log file. First I write a quote to the string, because I chose to create it in CSV style. Had to escape it using the backtick ` character. Then I snag the computername from the env: virtual drive (or PSProvider). I had to use the curly braces around it because during variable substitution inside of a string, the colon can be a delimiter for setting scope on a variable so I wanted to tell it explicitly not to do that. We talk about this in Episode 11. Then more quotes and commas for the CSV format. Then I do a Get-WmiObject call. I felt like being fancy so I used a WQL query string which looks a lot like SQL. The query said to grab just one property from the Win32_LogicalDisk class where the ID is "C:". Then access that property and divide it by 1 GB and add a closing quote. Pipe the whole thing to Set-Content and Bob's your uncle.  
Having said that, I wouldn't do it this way. But it would work, I tested it.  
Keep the feedback, and questions coming!  
-hal
