---
title: Judge Notes for Event 1
authors:
  - Art Beane
date: "2013-05-02T17:24:49+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/05/judge-notes-for-event-1/
---

 A lot of you have been working too hard at solving the problem (both beginner and advanced). Some of this is clearly related to trying to offer a very complete solution but some look like attempts to write extra clever or elegant code. In the "real world", there"™s probably not enough time or interest in putting lots of effort into these extras. The minimum it takes to achieve the goal is most often good enough. Here are a couple of examples to illustrate this (with the intent of providing a learning opportunity).  
Working with the destination folder address.  
A common error here was missing the subdirectory. Most folks got this correct by using some version of _$_.FullName.Replace("˜C:\Application\Log"™,"™\\NASServer\Archives"™)_ or _Join-Path "˜\\NASServer\Archives"™ $_.Directory.Name_, but there were a number who just used the root destination folder name without looking for the subfolder. And some others had solutions that (although I thought were innovative), took too much effort. Among them are:


`Join-Path "˜\\NASServer\Archives"™ ($_.Directory.Split("˜\"™)[-1])
$_.FullName "“Replace [regex]::Escape("˜C:\Application\Log"™,"™\\NASServer\Archives"™)
`Once computing the destination, most solutions checked to see if the folder existed and created it if it was missing. But some just tried to create it anyway (too much effort) and others who did not (too little effort).  
I"™m not going to comment on the use of Copy-Object vs. Move-Object other than to say that (related to the destination folder) it looks like some people thought the cmdlets would create the path structure but never tested to see that they don"™t. Don't forget to test your solution to verify that it works: working code is far more important that "pretty" or "elegant" code.  
**Using Try-Catch-Finally.**  
Try-Catch-Finally is an awesomely potent construct but you really need to understand how it works. Here's why I think it is serious overkill for this problem. Compare these:


`If (-not (Test-Path $DestinationFolder)) {New-Item "“ItemType Directory "“Path $DestinationFolder}`Try {Test-Path $DestinationFolder "“ErrorAction Stop} Catch {New-Item "“ItemType Directory "“Path $DestinationFolder}
`Look the same, right? But they have very different results, not to mention different typing efforts. If the destination folder does not exist, then with IF, the folder gets created, but with Try-Catch it will not. This is because Test-Path will return $false, but NO error, so the catch clause will never execute.  
Most folks understand that a terminating error has to occur in the Try script block in order for the Catch block to execute. But, instead of using the "“ErrorAction Stop parameter in the cmdlet, some of the solutions set $ErrorActionPreference to Stop and then reset it to Continue in a Finally block. There are two problems with this. First, it forces every command in the Try block to generate terminating errors, when there"™s normally only one that you care about. Second, $ErrorActionPreference might not have been originally set to Continue. Shouldn"™t the previous value be saved and then restored in Finally?  
So, going forward, think about how hard you"™re working to get to an answer. Don"™t use a more complex method than you need to in order to solve a problem. Make good use of Get-Help to verify the parameters and outputs of the cmdlets that you use. And test your objects with Format-List and Get-Member to make sure that the properties really are what you think they are.
