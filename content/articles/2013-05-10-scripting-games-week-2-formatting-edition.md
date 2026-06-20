---
title: "Scripting Games Week 2: Formatting edition"
author: Glenn Sizemore
authors:
  - Glenn Sizemore
date: "2013-05-10T12:40:16+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/05/scripting-games-week-2-formatting-edition/
---

This time of the year always feels like someone is holding down the fast forward button.  I blinked and here we are Friday morning another week of scripts in the rear view.  I spent most of my week in the beginner class this week, and was greeted by a combination of beginners and scripters who weren"™t quite ready to step up to advanced.  More of the latter if I"™m to be honest.  This was a pleasant surprise as it"™s another sign of the continuing growth of our community.  Now on to the scripts I knew when I signed up to do this, that at least one of these weeks I"™d talk about formatting.  It"™s one of those best practices that you don"™t appreciate until you"™re asked to review someone else"™s code.  
**Don"™t Crunch the Code, and for the love of all things, Hit Enter!**  
I did not deduct any points for readability, but you didn"™t make my good list either.  Personally I find it disrespectful to share an ungodly one-liner, but it"™s downright wrong if that single line has semicolons!  We"™re not printing these scripts the crunch gets us nothing. I"™m not going to call out the litany of scripts that were manually formatting the data directly which is even worse, but consider the following.


`Get-Content C:\IpList.txt | Foreach-Object { $Processor = Get-WmiObject -ComputerName $_ -NameSpace "Root\CIMV2" -Class "Win32_Processor"; $OpSystem  = Get-WmiObject -ComputerName $_ -Namespace "Root\CIMV2" -Class "Win32_OperatingSystem"; New-Object -TypeName PSObject -Property @{ Name = $Processor.SystemName; Cores = $Processor.NumberOfCores; OS = $OpSystem.Caption; Version = $OpSystem.Version; Memory = $OpSystem.TotalVisibleMemorySize }  }
`This is an almost perfect solution and it"™s utilizing my next tip for this week already, but the formatting made it unnecessarily hard to read. Let just clean this up a bit by inserting a proper CR in place of all those semi-colons.


`Get-Content C:\IpList.txt | Foreach-Object {
    $Processor = Get-WmiObject -ComputerName $_ -Class "Win32_Processor"
    $OpSystem  = Get-WmiObject -ComputerName $_ -Class "Win32_OperatingSystem"
    New-Object -TypeName PSObject -Property @{
        "Name"    = $Processor.SystemName
        "Cores"   = $Processor.NumberOfCores
        "OS"      = $OpSystem.Caption
        "Version" = $OpSystem.Version
        "Memory"  = $OpSystem.TotalVisibleMemorySize
    }
}
`Does anyone honestly not think the latter is better? The whitespace cost nothing at execution, and makes it an order of magnitude easier for a human being to read, process, and comprehend! I don"™t care what you do in your own scripts but when another human being is going to be asked to read it take a moment and format it. By the way for those in audience in love with the all-powerful one-liner both those examples are one-liners.  
**That"™s Sooooo 2006!**  
Seriously, it"™s okay to use the latest features of the language! Heck how about we just agree to use the features from the last version! What am I talking about? object creation! Again I didn"™t take any points off for this, and you may have made my good list, but I didn"™t like it. Select-Object and Add-Member NoteProperty were how we built custom object in 2006 with PowerShell v1. PowerShell V2 added an extremely powerful "“Property parameter to New-Object that completely removed the need for Add-Member, and PowerShell V3 introduced the [PSCustomObject] type accelerator that removed them all! Consider the following look back at the past six years of PowerShell Object Creation.


`# 2006
Get-Content .\IpList.txt | Foreach-Object {
    $Processor = Get-WmiObject -ComputerName $_ -Class "Win32_Processor"
    $OpSystem  = Get-WmiObject -ComputerName $_ -Class "Win32_OperatingSystem"
    New-Object -TypeName PSObject |
        Add-Member -MemberType Noteproperty -Name "Name" -value $Processor.SystemName -PassThru |
        Add-Member -MemberType Noteproperty -Name "Cores" -value $Processor.NumberOfCores -PassThru |
        Add-Member -MemberType Noteproperty -Name "OS" -value $OpSystem.Caption -PassThru |
        Add-Member -MemberType Noteproperty -Name "Version" -value $OpSystem.Version -PassThru |
        Add-Member -MemberType Noteproperty -Name "Memory" -value $OpSystem.TotalVisibleMemorySize -PassThru
}
# 2007 This worked in 2006, but it took a little while to catch on.
Get-Content .\IpList.txt | Foreach-Object {
    $OpSystem  = Get-WmiObject -ComputerName $_ -Class "Win32_OperatingSystem"
    Get-WmiObject -ComputerName $_ -Class "Win32_Processor"|
        Select-Object -Property SystemName, NumberOfCores,
            @{'Name'="OS";"Expression"={$OpSystem.Caption}},
            @{'Name'="Version";"Expression"={$OpSystem.Version}},
            @{'Name'="Memory";"Expression"={$OpSystem.TotalVisibleMemorySize}}
}
# 2009
Get-Content .\IpList.txt | Foreach-Object {
    $Processor = Get-WmiObject -ComputerName $_ -Class "Win32_Processor"
    $OpSystem  = Get-WmiObject -ComputerName $_ -Class "Win32_OperatingSystem"
    New-Object -TypeName PSObject -Property @{
        "Name"   = $Processor.SystemName
        "Cores"  = $Processor.NumberOfCores
        "OS"     = $OpSystem.Caption
        "Version"= $OpSystem.Version
        "Memory" = $OpSystem.TotalVisibleMemorySize
    }
}
# 2012
Get-Content .\IpList.txt | Foreach-Object {
    $Processor = Get-WmiObject -ComputerName $_ -Class "Win32_Processor"
    $OpSystem  = Get-WmiObject -ComputerName $_ -Class "Win32_OperatingSystem"
    [PSCustomObject]@{
        "Name"   = $Processor.SystemName
        "Cores"  = $Processor.NumberOfCores
        "OS"     = $OpSystem.Caption
        "Version"= $OpSystem.Version
        "Memory" = $OpSystem.TotalVisibleMemorySize
    }
}
`They are all more or less the same. When properly formatted they are all equally readable. Most of them use a hash table of some sort. Therefor there are some language hurdles that need to be cleared, so why bother, why does it matter?... simple performance, with every release the PowerShell team have refined Object creation and the new way is always just a little bit faster. I used measure-command to measure the execution times for the above examples and well as you can see while minute every subsequent technique is slightly faster.  
New-Object/Add-Member = 1128 Milliseconds  
Select-Object                    = 1114 Milliseconds  
New-Object "“property      = 1107 Milliseconds  
PSCustomObject             = 1100 Milliseconds  
Again not a huge deal but given a large enough dataset every tick counts. There were a litany of other things that I saw this week that made my list. The good news is this is all nitpicky stuff which is awesome!   Keep it up, and for the rest of you voters out there lets ease up with the ones and twos these are awesome scripts.  They may not use the technique you'd prefer but for the most part they're getting the job done.  
~Glenn
