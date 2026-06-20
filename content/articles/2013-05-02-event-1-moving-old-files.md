---
title: "Event #1: Moving Old Files"
author: June Blender
authors:
  - June Blender
date: "2013-05-02T21:31:40+00:00"
aliases:
  - /2013/05/event-1-moving-old-files/
---

As a celebrity judge, I'm not required to blog "“ I'm just here for my good looks :> -- but I'm having a great time reading the blogs posted by the Expert Judges about the [Event #1][1] candidate solutions.  Much of the judging is subjective, but I'll add the criteria that I use to distinguish a working solution from a great solution.  
Before I do, though, I want to congratulate everyone who submitted an entry. Most of the entries work and you probably learned just from playing with the challenge. Keep it up and come back year after year.  
One hint to everyone: **TEST!** Most of the entries work, but many fail if the directory for the application (e.g. App1 in \\NASServer\Archives\App1) does not already exist. And, a few fail with regular expression errors on the Replace operator (more in the blog). There are lots of great test strategies, but you can just run your code on file in your own directories or step through the code in the Windows PowerShell ISE debugger.

## Get-Help: An Archival Atrocity

Let's start with a quick review of the event challenge. You can read the beginner challenge [here][1].  
Basically, the task is to move log files older than 90 days old from their current locations in application-specific subdirectories of C:\Application\Log  (such as C:\Application\Log\\.log) to an archive share, \\NASServer\Archives.  
The files have GUID filenames (read: you can't predict them). You need to maintain the subdirectory structure, so if a log file starts in the App582 subdirectory of C:\Application\Log, after the move, it should be in the App852 subdirectory of NASServer\Archives.  
The final instruction/hint is that the applications generate the files and never touch them again. I'm not an expert, but I interpreted this to mean that the CreationTime property and the LastWriteTime property of these log files will be the same and you can use either in your solution. (Is that right?)  
The advanced challenge involves the same task, but generalized into a reusable tool, so you want to create a script with parameters for the log path and archive paths. This is one of those advanced challenges that many beginners should be able to do. For giggles, try it on your beginner solution.  
To recap, here are the elements of this challenge and solutions, all of which I think are acceptable in a beginner challenge.

  * Find the log files
  * Get only the ones that are at least 90 days old (CreationTime or LastWriteTime)
  * Move them to the same subdirectory in the archive directory

Finding the log files is pretty easy:


`Get-ChildItem C:\Application\Log\*.log "“Recurse
Get-ChildItem C:\Application\Log  -Include *.log  "“Recurse
Get-ChildItem C:\Application\Log  -Filter *.log  "“Recurse
Get-ChildItem C:\Application\Log\ *\*.log
`Calculating 90 days is only a bit harder:


`(Get-Date).AddDays(-90)     #Yes, a negative number!
(Get-Date).Subtract(New-TimeSpan -Days 90)
((Get-Date) - $file.LastWriteTime).Days -gt 90
`Because the only really tricky part in this challenge is moving the file and maintaining the directory structure, I'm concentrating on that part.

  * First,  you need to get the current subdirectory and make sure the file goes in that same subdirectory in the new location.
  * Second, if you try to copy or move an item to a directory that doesn't exist, the command fails "“ and the Force parameter will not build the path for you.

## Get-MyVote

Here are the elements that I look for in a solution.

  * **Preserve the path**:  I look for solutions that preserve or build the new path correctly. This is required by the challenge, but it's also a place for some creativity.
  * **Test-Path/New-Item**: I look for solutions that test to see if the path exists in the new location (Test-Path) and creates the directories in the path if they don't already exist, typically by using Mkdir (md) or New-Item "“Type Directory.
  * **New-Item | Out-Null**:  When you create a new path, New-Item and Mkdir return a directory object. This can be confusing to users who run your script, so I give extra points for suppressing the output. I typically do this by piping the output to Out-Null. Here's a possible solution, but I'm open to creative variation. 

`New-Item -Type Directory -Path C:\Application\Log\$p | Out-Null
`* **Help** (of course). More below
  * **Test.** Don't share a solution that you haven't tested. There are many ways to test, but running the solution on datasets with different elements is a great way. I always run my code in the Windows PowerShell ISE debugger before using it or sharing it. ****

## Get-Help

All shared functions and scripts should have help. Help helps the end user and makes the script maintainable. Unless you plan a use a command once and toss it, you need help.  
Comment-based help for a simple script like this is easy to write:  
<#


`.SYNOPSIS
  Move-Oldfiles.ps1
  By juneb 4/25/2013
.DESCRIPTION
  Moves files that are at least 90 days old from a
  subdirectory of C:\Application\Log to the same
  subdirectory in NASServer\Archives.
.EXAMPLE
 Move-OldFiles.ps1
`#>  
Additional comments are great, especially if you're doing something clever. For example, if you use the $Path.Directory.Name to get the path (thanks to [Bartek Bielawski][2] for this hint), a comment that it gets only the immediate parent directory would be very helpful to someone reading the script.  
I actually deduct points for "help" that Get-Help can't get, such as this sort of stuff:


`# This script moves files that are older than 90 days
# old from a subdirectory of C:\Application\Log to the
# same subdirectory in NASServer\Archives. I wrote it
# for Scripting Games 2013, Event 1
`It's so easy to do it right that doing it wrong is pretty silly.

## Efficiency: Calculating 90 Days

I've seen a lot of this approach in solutions, usually in one-liners.


`Get-ChildItem C:\Application\Log\*\*.log |
    Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-90)} |
    Move-Item -Destination ...
`This approach recalculates the archive date FOR EVERY FILE. That would make sense only if the script took more than a day to run. Computers are pretty fast these days, but there's no reason to be purposefully inefficient. It's much better to calculate the archive date once, save it, and reuse it.


`$ArchiveDate = (Get-Date).AddDays(-90)
Get-ChildItem C:\Application\Log\*\*.log |
   Where-Object {$_.LastWriteTime -lt $ArchiveDate} |
   Move-Item -Destination ...
`## Get-ChildItem: -File, -Directory -Hidden -ReadOnly, -Attributes

The FileSystem provider in Windows PowerShell 3.0 adds awesome new parameters to the Get-ChildItem cmdlet. For help, Get-Help [Get-ChildItem for FileSystem][3]. I give extra points to people who use them correctly and deduct points for the more old-fashioned PSISContainer.  
The following code works:


`Get-ChildItem C:\Application\Log -Recurse | Where-Object {$_.PSIsContainer}
`But the preferred version uses the new features and it is really much easier to interpret:


`Get-ChildItem C:\Application\Log -Directory -Recurse
`On the same note, I noticed the following:


`Get-ChildItem -Attributes D ...
`Like a lot of solutions, this works -- it gets only directories in the path -- but it's more confusing than the simpler equivalent:


`Get-ChildItem -Directory
`The Attributes parameter is designed for attribute combinations and for attributes that cannot be expressed with the simpler parameters, like this expression, which gets files that are compressed and not hidden.


`Get-ChildItem -File -Attributes Compressed+!Hidden
`## Regular Expressions in Replace Statements

One of the tricky parts of this challenge was preserving the original path in the new archive directory. There were many clever ways to do this. But several (presumably untested) solutions will fail with a regular expression error.  
For example:


`foreach ($file in $files)
{
    $newName = $file.fullname -replace 'C:\Application\Log','\\NASServer\Archives'
    move-item -Destination $newName
}
`Generates this error:


`Regular expression pattern is not valid: C:\Application\Log.
At C:\ps-test\ScriptingGames2013\Move-TestEsc.ps1:5 char:5
+     $newName = $file.fullname -replace 'C:\Application\Log','\\NASServer\Archive ...
+     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : InvalidOperation: (C:\Application\Log:String) [], RuntimeException
+ FullyQualifiedErrorId : InvalidRegularExpression
`The problem here is that you didn't intend to supply a regular expression as input, but the Replace operator interprets the text that it is replacing (the first operand) as a regular expression. In this case, it interprets the backslashes as escape characters.  To resolve the error, escape the backslashes by doubling them, that is, preceding each backslash with another backslash.  
For example:


`-replace 'C:\\Application\\Log' ...
`Here is the corrected code:


`foreach ($file in $files)
{
    $newName = $file.fullname -replace 'C:\\Application\\Log','\\NASServer\Archives'
    move-item -Destination $newName
}
`You don't need to escape the backslash in the replacement text (second operand), because the Replace operator doesn't interpret that text as a regular expression. It just pastes it.  
NOTE: The [Replace method of strings][4] does not use regular expressions, so you don't need to worry about those backslashes.


`$newName = ($file.fullname).Replace('C:\ps-test','\\NASServer\Archives')
`## Simplify Booleans

Here's a very frequent pattern:


`if ($a -eq $true) {} elseif ($a -eq $false) {}
`But notice that:


`$a -eq $true
`Is equivalent to:


`$a
`Similarly:


`$a -eq $false
`Is equivalent to:


`!$a
`And, if $a is not true, the only alternative, is that it's false. So you can simplify that original code to:


`if ($a) {} else {}
`So, when you see yourself typing:


`Where {$_.PSIsContainer -eq $true}
`You can react immediately and change it to:


`Where {$_.PSIsContainer }
`Or change:


`$_.PsISContainer -ne $True
`To:


`!$_.PsISContainer
`A side note: In some languages, $a is true if it contains a true statement or any numeric value other than zero. In Windows PowerShell $a is true if it contains a true statement or a value of 1; otherwise, it is false.

## Enumerating the paths

Many of the solutions included enumerated paths, like this:


`Get-Childitem -Path "C:\Application\Log\App1", `
    "C:\Application\Log\OtherApp", `
    "C:\Application\Log\OtherApp" -Recurse ...
`I feel badly, but I think these folks misinterpreted examples to be absolute paths. It's really important for us to write the challenges clearly and unambiguously, especially because we have a truly international audience, but participants need to read carefully, too.

## Don't use aliases

Aliases are terrific for interactive commands and commands that you don't share with others. But for anything else, including the Scritping Games, avoid them. Can you imagine a beginner trying to intepret a solution in which "?" is used instead of Where-Object? How would the person search for that "?"?  Because understanding is the goal, I have no trouble with eliminating the "Object" in Where-Object, Sort-Object, Select-Object, but it's better to leave it in.  
In general, you should also include the names of positional parameters, although I don't mind omitting the most frequently used ones. Other people might be pickier, but I don't use "Where-Object -Property" or "Get-ChildItem -Path" in my own code and I don't require it from others.

## One-Liners

A final note: one-liners are very useful, but I don't count lines of code or characters in a command when evaluating solutions. Solutions that use fancy regular expression statements are impressive but they can be difficult to interpret and maintain. If you can get your code onto one line, that's terrific, but it's not necessary and I don't give it any extra points.  
Now, we can get ready for Event #2. Good luck, everyone!

 [1]: http://blogs.technet.com/b/heyscriptingguy/archive/2013/04/25/2013-scripting-games-beginner-event-1.aspx
 [2]: http://becomelotr.wordpress.com/2013/04/30/event-1-my-way/
 [3]: http://technet.microsoft.com/en-us/library/hh847897.aspx
 [4]: http://msdn.microsoft.com/en-us/library/fk49wtc1.aspx
