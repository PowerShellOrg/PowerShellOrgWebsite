---
title: "PowerShell V3 Beta\"“Better NTFS Alternate Data Stream Handling"
authors:
  - Keith Hill
date: "2012-03-05T04:37:08+00:00"
aliases:
  - /2012/03/powershell-v3-beta-better-ntfs-alternate-data-stream-handling/
---

One of the many new features in Windows PowerShell V3 is better support for alternate data streams (ADS) in NTFS files.  ADS allows an NTFS file to contain additional data that is not part of the "main" stream i.e. the file"™s primary content.  Tools like Windows Explorer or even PowerShell"™s **Get-ChildItem** cmdlet don"™t show these extra data streams.  In fact the file size reported by both of these tools does not take into account the data stored in the alternate streams.  For more information on ADS check out the [NTFS topic on Wikipedia][1].

A common use of ADS is to indicate that a file downloaded by Internet Explorer came from the Internet Zone.  Files coming from the internet could be potentially dangerous.  Various applications check for this stream and if it is present and contains information indicating the "Internet" zone, they might block access or in the case of PowerShell"™s _RemoteSigned_ execution policy, only execute the file if it is signed.

Previous to PowerShell V3, you could use the [SysInternals streams.exe tool][2] to list and remove alternate data streams.  A common application of this tool was to delete all streams in a file.  That was a rather crude but effective way to "unblock" a file downloaded from the internet.

This is also one area where CMD.EXE was one up on PowerShell.  From a CMD prompt, you can use "dir /r" to list files and their alternate data streams.  You can also create/overwrite streams with CMD.exe like so "
echo.>test.exe:Zone.Identifier
" which would "unblock" an internet zone file.  You can also unblock such files by selecting the file"™s Properties in Windows Explorer and pressing the "Unblock" button at the bottom right of the general tab.  However this is not convenient if you need to do this to dozens or hundreds of files.  With the [PowerShell Community Extensions][3] 2.0, we introduced an **Unblock-File** cmdlet that would delete only the stream named Zone.Identifier.  That is the stream that Internet Explorer creates when you download a file.  Fortunately with PowerShell V3, we can obsolete that cmdlet because V3 offers several ways to manage alternate data streams.

First up is PowerShell"™s own **Unblock-File** cmdlet which, like the PSCX equivalent, is quite easy to use:


`C:\PS> Get-Command Unblock-File -All
Capability      Name   ModuleName
----------      ----                                     ----------
Cmdlet          Unblock-File                             Pscx
Cmdlet          Unblock-File                             Microsoft.PowerShell.Utility
C:\PS> Get-ChildItem *.ps1 | Microsoft.PowerShell.Utility\Unblock-File
`Note that you wouldn"™t normally need to prefix **Unblock-File** with _Microsoft.PowerShell.Utility_.  In this case, I wanted to make sure I was using the PowerShell **Unblock-File** and not the one from PSCX.

In addition to using the big gun of **Unblock-File** you can also manipulate streams with the following cmdlets:


`C:\PS> Get-Command -ParameterName Stream | Where ModuleName -match 'Microsoft.*?Manag'
Capability Name          ModuleName
---------- ----          ----------
Cmdlet     Add-Content   Microsoft.PowerShell.Management
Cmdlet     Clear-Content Microsoft.PowerShell.Management
Cmdlet     Get-Content   Microsoft.PowerShell.Management
Cmdlet     Get-Item      Microsoft.PowerShell.Management
Cmdlet     Remove-Item   Microsoft.PowerShell.Management
Cmdlet     Set-Content   Microsoft.PowerShell.Management
`Here is how you can list all the alternate data streams in a file and the contents of any particular data stream:


`C:\PS> Get-Item .\Pscx-2.0.0.1.zip -Stream *
   FileName: C:\Users\Keith\Downloads\Pscx-2.0.0.1.zip
Stream                   Length
------                   ------
:$DATA                  1799345
Zone.Identifier              26
C:\PS> Get-Content .\Pscx-2.0.0.1.zip -Stream Zone.Identifier
[ZoneTransfer]
ZoneId=3
`Note that **:$DATA** is the main stream i.e. the file"™s primary contents.

If you need to clear the contents of a data stream without removing the stream completely, you can use **Clear-Content"™s "“Stream** parameter e.g.:


`C:\PS> Clear-Content .\Pscx-2.0.0.1.zip -Stream Zone.Identifier
C:\PS> Get-Content .\Pscx-2.0.0.1.zip -Stream Zone.Identifier
C:\PS> Get-Item .\Pscx-2.0.0.1.zip -Stream *
   FileName: C:\Users\Keith\Downloads\Pscx-2.0.0.1.zip
Stream                   Length
------                   ------
:$DATA                  1799345
Zone.Identifier               0
`To completely remove the stream, use **Remove-Item"™s "“Stream** parameter e.g.:


`C:\PS> Remove-Item .\Pscx-2.0.0.1.zip -Stream Zone.Identifier
C:\PS> Get-Item .\Pscx-2.0.0.1.zip -Stream *
   FileName: C:\Users\Keith\Downloads\Pscx-2.0.0.1.zip
Stream                   Length
------                   ------
:$DATA                  1799345
`And if you need to create an alternate stream, you can do so using **Add-Content"™s "“Stream** parameter e.g.:


`C:\PS> Add-Content Pscx-2.0.0.1.zip -Str Zone.Identifier "[ZoneTransfer]`r`nZoneId=3"
C:\PS> Get-Item Pscx-2.0.0.1.zip -Stream *
   FileName: C:\Users\Keith\Downloads\Pscx-2.0.0.1.zip
Stream                   Length
------                   ------
:$DATA                  1799345
Zone.Identifier              26
C:\PS> Get-Content .\Pscx-2.0.0.1.zip -Stream Zone.Identifier
[ZoneTransfer]
ZoneId=3
`Finally, **Set-Content "“Stream** can be used to modify the content of an existing stream.

The new  **Unblock-File** cmdlet as well as the upgrades to the ***-Content** and **Get/Remove-Item**  cmdlets are a very welcome enhancement to PowerShell"™s file handling capabilities.

[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/248/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/248/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=248&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)

 [1]: http://en.wikipedia.org/wiki/NTFS#Alternate_data_streams_.28ADS.29
 [2]: http://technet.microsoft.com/en-us/sysinternals/bb897440
 [3]: http://pscx.codeplex.com/
