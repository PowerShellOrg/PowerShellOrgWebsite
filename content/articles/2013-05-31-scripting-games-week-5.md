---
title: Scripting Games Week 5
authors:
  - Glenn Sizemore
date: "2013-05-31T15:02:17+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/05/scripting-games-week-5/
---

I loved this week"™s challenge as it had the right wiggle room to bring out the best in our participants.  Of course, this is also the point in the games when we start to get everyone"™s "A" game.  At this point even our new competitors are all warmed up and in the zone, and let me tell you the entries this week show it!   I want to start with the beginners as I actually ran almost every entry this week.  Honestly everyone fell into one of three buckets Select-string, Import-CSV or ,Foreach.  Let me explain there where three primary means to solve this problem.  Use Select-String and some basic text parsing to get the ip addresses, and then using Select-Object to filter.  Converting the logs to objects with Import-CSV and using Where-Object to filter.  Or using Foreach and a combination of if and where.  
They are all three correct, so how does one judge one from another?  As this is a competition I used speed as the determining gauge.  For a long time I was convinced that the following was about perfect.  Quick simple and accurate.


`Select-String -Path C:\Reporting\LogFiles\*\*.log -Pattern "(\b\d{1,3}\.){3}.\d{1,3}\b" -AllMatches |
Select-Object -Unique @{Label="IP";Expression={$_.matches[1]}}
`I was particularly drawn to this approach because it only used two cmdlets if that"™s not PowerShell I don"™t know what is. At first I was convinced converting the logs to objects was a waste.  Let me explain.  Over the course of this past month you"™ve heard us rant and rave about objects, and how PowerShell is not text, but rich .Net objects.  For the most part that is an iron law, but it"™s a law with an exception.  There is one place where text is just text, log files!  That"™s why I loved this event.  This is the exception where all the old tricks still apply and where we found out which of you really know your regular expressions.  However in this one instant since we had a well formed log converting to a CSV was actually faster.   I wasn"™t expecting that, but consider my gold standard example takes about 10 Seconds on my PC.   The Following finishes in 3!


`$LogFilePath = 'C:\Reporting\LogFiles'
$header = 'date','time','s-ip','cs-method','cs-uri-stem','cs-uri-query','s-port','cs-username','c-ip','cs(User-Agent)','sc-status','sc-substatus','sc-win32-status','time-taken'
Import-Csv -Path $(Get-ChildItem -Path $LogFilePath -File -Recurse).FullName -Header $header -Delimiter ' ' |
# if the contents of 'c-ip' can be converted to an IP address then it is a valid IP
Select-Object @{n='ClientIP';e={if ([IPAddress]$_.'c-ip'){ $_.'c-ip' }}} |
Sort-Object -Property 'ClientIP' -Unique
`Now I"™m not crazy about that entry it"™s hard to follow, and will always return a blank string, but if you really look what makes it work is the author is offloading the IP filtering to the [IPAddress] type accelerator.  That is brilliant, and is x5 faster than a regular expression, which really adds up when you"™re performing over 6k comparisons.   I know the general consensus is to leave the .Net stuff alone, but I have no religion when it comes to this stuff. If it"™s better it"™s better and in this instance it was better.  
But that"™s not the end of the story. While sorting through the entries I found the following solution.


`Get-ChildItem -File C:\Reporting\LogFiles -Recurse | Get-Content |
    # Selecting "GET /" gives us only the lines we want from the files.
    Select-String -Pattern "GET /"  |
    # Split the remaining lines into an array and write element 8, the IP, to a file.
    ForEach-Object {$_.Line.Split("")[8] } | Select-Object -Unique @{Name="Source Address"; Expression={$_}}
`Now that"™s an old school PowerShell solution if I"™ve ever seen one, and you know what it"™s fast as hell!  There"™s no validation of any kind. It will only work with provided source files, and it"™s absolutely perfect!  You see the goal is to get the job done.  We don"™t always have to author a tool that can be used by the world.  There is nothing wrong with leveraging your brain and cheating a little!  
As for the advanced entries I think they"™ve been adequately covered by my fellow judges.  In general my feedback would be to start a slow clap for the group.  There not perfect, but as a group you"™ve learned from the feedback over this past month and man does it show! Heading into the final stretch I encourage you all to treat this last entry as your victory lap as you"™ve all already one.  
~Glenn
