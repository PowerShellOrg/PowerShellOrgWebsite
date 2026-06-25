---
title: "PSCustomObject: Save Puppies and Avoid Dead Ends"
authors:
  - June Blender
date: "2013-04-24T21:06:59+00:00"
aliases:
  - /2013/04/pscustomobject-save-puppies-and-avoid-dead-ends/
---

Welcome to Scripting Games 2013. Here's my favorite hint for improving your functions and scripts. Avoid writing to the console or formatting your output. Instead use **PSCustomObject** in Windows PowerShell 3.0 and leave the formatting to the end user.  
Windows PowerShell provides lots of great ways to return the output of a command or function. You can write to the host program (Write-Host), write to a file (Out-File), and format your output to look really pretty (Format-*). But all of these techniques kill puppies and bring the pipeline to an abrupt halt.  
"Puppies?," you ask. Yes! Windows PowerShell MVP and Scripting Games 2013 Viceroy Don Jones (@concentrateddon) famously says that every time you use Write-Host, a puppy dies. So sad!  
The Format cmdlets are almost as bad, although no deaths have yet been attributed to them. Instead, when you use a Format cmdlet, a huge STOP sign should appear warning you that you've brought the pipeline to a halt. Not technically, of course, but for all practical purposes.  
To see what I mean, take a peek at these two commands. The output of these commands looks very similar, but it's really quite different.


`PS C:\ Get-Process csrss
Handles NPM(K) PM(K) WS(K) VM(M) CPU(s) Id ProcessName
------- ------ ----- ----- ----- ------ -- -----------
885 14 2568 5092 49 516 csrss
714 19 3996 28036 92 632 csrss
PS C:\ Get-Process csrss | Format-Table
Handles NPM(K) PM(K) WS(K) VM(M) CPU(s) Id ProcessName
------- ------ ----- ----- ----- ------ -- -----------
885 14 2568 5092 49 516 csrss
714 19 3996 28036 92 632 csrss
`These two commands return different objects and the difference really matters. To see the different output types, you can pipe them to Get-Member. I've used a slightly different approach that gets only the names of types in the output, but it's the same idea.


`PS C:\ Get-Process csrss | foreach {$_.gettype().fullname}
System.Diagnostics.Process
System.Diagnostics.Process
PS C:\ Get-Process csrss | Format-Table | foreach {$_.gettype().fullname}
Microsoft.PowerShell.Commands.Internal.Format.FormatStartData
Microsoft.PowerShell.Commands.Internal.Format.GroupStartData
Microsoft.PowerShell.Commands.Internal.Format.FormatEntryData
Microsoft.PowerShell.Commands.Internal.Format.FormatEntryData
Microsoft.PowerShell.Commands.Internal.Format.GroupEndData
Microsoft.PowerShell.Commands.Internal.Format.FormatEndData
`Instead of a process object, the formatted command returns a bunch of format objects. You usually discover this when you try to use them in another command. For example, these format objects don't have the properties of a process object, like PagedMemorySize or Handles.


`PS C:\ $p = Get-Process csrss
PS C:\ $p | foreach PagedMemorySize
2629632
4075520
PS C:\ $pf = Get-Process csrss | Format-Table
PS C:\ $pf | foreach PagedMemorySize
PS C:\
PS C:\ get-process csrss | sort Handles
Handles  NPM(K)    PM(K)      WS(K) VM(M)   CPU(s)     Id ProcessName
-------  ------    -----      ----- -----   ------     -- -----------
    723      19     3980      28416    87             632 csrss
    881      14     2568       5096    49             516 csrss
PS C:\ get-process csrss | ft | sort Handles
out-lineoutput : The object of type "Microsoft.PowerShell.Commands.
Internal.Format.FormatEntryData" is not valid or not in the correct
sequence. This is likely caused by a user-specified "format-*"
command which is conflicting with the default formatting.
    + CategoryInfo          : InvalidData: (:) [out-lineoutput],
InvalidOperationException
    + FullyQualifiedErrorId : ConsoleLineOutputOutOfSequencePacket,
Microsoft.PowerShell.Commands.OutLineOutputCommand
`So you've lost the opportunity to use these objects in subsequent commands. Unless you really want formatting object, the pipeline is effectively dead. Almost as sad as those puppies.  
I realized this problem when some colleagues at Microsoft asked me to generate a report that listed the CDXML files in a CIM module and the CIM commands that were defined in each CDXML file. I wrote a tiny script that produced a nice report that looked like this:


`MSFT_NetIPAddress.cdxml-help.xml
------------------------------------
Get-NetIPAddress
Set-NetIPAddress
Remove-NetIPAddress
New-NetIPAddress
MSFT_NetIPInterface.cdxml-help.xml
------------------------------------
Get-NetIPInterface
Set-NetIPInterface
MSFT_NetIPv4Protocol.cdxml-help.xml
------------------------------------
Get-NetIPv4Protocol
Set-NetIPv4Protocol
MSFT_NetIPv6Protocol.cdxml-help.xml
------------------------------------
Get-NetIPv6Protocol
Set-NetIPv6Protocol
. . .
`But, instead of being delighted, they reported that they now had data that they couldn't use. I had created a dead end. Pretty, but useless. They were happier with a command that produced useable results, even if they weren't pretty.


`PS C:\ (Get-Module $ModuleName).NestedModules | Select-Object Name, Path, ExportedCommands
Name                      Path                                    ExportedCommands
----                      ----                                    ----------------
MSFT_NetIPAddress         C:\windows\system32\WindowsPowerShel... {[Get-NetIPAddres
MSFT_NetIPInterface       C:\windows\system32\WindowsPowerShel... {[Get-NetIPInterf
MSFT_NetIPv4Protocol      C:\windows\system32\WindowsPowerShel... {[Get-NetIPv4Prot
MSFT_NetIPv6Protocol      C:\windows\system32\WindowsPowerShel... {[Get-NetIPv6Prot
. . .
`To avoid this dead end in the silly Get-Process case, you just remove the Format-Table command. Or, you can use the Select-Object cmdlet to create an object that is a filtered subset of the current object, if that's what you need.  
But how do you manage when you're returning values from different objects? It's easy to put them in a table, but there's a much better way that doesn't stop the pipeline.  
Windows PowerShell 3.0 introduces PSCustomObject. You can read all about it, and about Windows PowerShell 2.0 alternatives, in about_Object_Creation. PSCustomObject makes it easy for you to create objects.  
As the name implies, PSCustomObject creates a custom object with the properties that you specify. The resulting custom object works just like any .NET class object, so you can pass it through the pipeline and use it in subsequent commands.  
The value of PSCustomObject is a hash table (@{Key = Value; Key=Value...}) where the keys are property names and the values are property values. When you define a PSCustomObject hash table in a script or function, Windows PowerShell magically creates an object for every instance that you pass to it.  
Here's how I used it in a little script that tells you the versions of Updatable Help you have on your local machine.


`foreach ($helpInfoFile in $helpInfoFiles)
{
    $ModuleName = $HelpInfoFile.Name.Split('_')[0]
    $CultureInfo = ([xml](Get-Content `
         $HelpInfoFile)).HelpInfo.SupportedUICultures.UICulture
    $UICulture = $CultureInfo.UICultureName
    $Version = $CultureInfo.UICultureVersion
    [PSCustomObject]@{"ModuleName"=$ModuleName;
                      "Culture"=$UICulture;
                      "Version"=$Version}
}
`In this case , I was processing a bunch of HelpInfo XML files. I want to return an object that contains the module name, the name of the UI culture, and the version number for that UI culture. The details don't matter, except that the property values weren't all in the same object, so I couldn't just select from an object.  
PSCustomObject to the rescue! See how easy this is!  
In the ForEach loop, I get the values that I need. Then I just define a PSCustomObject and "¦ voila! "¦ I have my objects. The default formatting makes them look nice enough.


`ModuleName              Culture        Version
----------              -------        -------
AppLocker               en-US          3.1.0.0
Appx                    en-US          3.1.0.0
BitLocker               en-US          3.1.0.0
BranchCache             en-US          3.1.0.0
`But more importantly, the pipeline continues. When I pipe to Get-Member, it shows that I have a usable custom object:


`PS C:\ $u | get-member
   TypeName: System.Management.Automation.PSCustomObject
Name        MemberType   Definition
----        ----------   ----------
Equals      Method       bool Equals(System.Object obj)
GetHashCode Method       int GetHashCode()
GetType     Method       type GetType()
ToString    Method       string ToString()
Culture     NoteProperty System.String Culture=en-US
ModuleName  NoteProperty System.String ModuleName=AppLocker
Version     NoteProperty System.String Version=3.1.0.0
`And, I can use the output in subsequent commands.


`PS C:\ $u | sort Version | group Version
Count Name                      Group
----- ----                      -----
   24 3.0.0.0                   {@{ModuleName=NetSwitchTeam;
    1 3.0.1.0                   {@{ModuleName=MsDtc; Culture=
    1 3.0.2.0                   {@{ModuleName=Wdac; Culture=e
   15 3.1.0.0                   {@{ModuleName=ScheduledTasks;
    4 3.2.0.0                   {@{ModuleName=Microsoft.WSMan
    1 {3.2.15.3, 3.2.15.0, 3... {@{ModuleName=Show-Calendar;
    1 3.4.0.0                   {@{ModuleName=NetTCPIP; Cultu
`Now, go out and try it! Some of the Scripting Games challenges might require a table, list, or some other formatting, but if it doesn't, be sure return a really useful object.  
Good luck to everyone!
