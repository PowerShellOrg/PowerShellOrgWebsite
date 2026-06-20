---
title: Show Us Your Cmdlets!
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-05-05T02:17:05+00:00"
aliases:
  - /2008/05/show-us-your-cmdlets/
---

This little one-liner will show the most common verbs among all the cmdlets installed in the current PowerShell session.





`1:
 PS > gcm -CommandType cmdlet | Group Verb | Sort Count -Descending | Select -First 10`2:
`3:
 Count Name                      Group`4:
 ----- ----                      -----`5:
   128 Get                       {Get-Acl, Get-ADObject, Get-Alias, Get-Authentico...`6:
    46 Set                       {Set-Acl, Set-Alias, Set-AuthenticodeSignature, S...`7:
    36 New                       {New-Alias, New-CDDrive, New-Client, New-Cluster,...`8:
    34 Remove                    {Remove-CDDrive, Remove-Cluster, Remove-CustomFie...`9:
    15 Send                      {Send-Email, Send-FTP, Send-IM, Send-Mail, Send-M...`10:
    14 Write                     {Write-BZip2, Write-Clipboard, Write-Debug, Write...`11:
    13 Invoke                    {Invoke-Command, Invoke-Expression, Invoke-Histor...`12:
    11 Out                       {Out-Chart, Out-Clipboard, Out-Default, Out-File,...`13:
    10 Add                       {Add-Contact, Add-Content, Add-History, Add-Membe...`14:
    10 Move                      {Move-Cluster, Move-Datacenter, Move-Folder, Move...
`I just realized the above is the CLI equivalent of looking at a screenshot of someone"™s Windows desktop and wondering what all those tray icons do.  🙂  
What snapins do you think I have installed?  What about you guys?
