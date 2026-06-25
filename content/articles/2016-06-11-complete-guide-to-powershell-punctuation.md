---
title: Complete Guide to PowerShell Punctuation
authors:
  - msorens
date: "2016-06-11T22:57:55+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Training
aliases:
  - /2016/06/complete-guide-to-powershell-punctuation/
---

Quick as you can, can you explain what each of these different parentheses-, brace-, and bracket-laden expressions does?


`${save-items}
${C:tmp.txt}
$($x=1;$y=2;$x;$y)
(1,2,3 -join '*')
(8 + 4)/2
$hashTable.ContainsKey($x)
@(1)
@{abc='hello'}
{param($color="red"); "color=$color"}
$hash['blue']
[Regex]::Escape($x)
[int]"5.2"
`When you're reading someone else's PowerShell code, you will come across many of these constructs, and more. And you know how challenging it can be to search for punctuation on the web (symbolhound.com not withstanding) !  
That is why I put together a reference chart containing all of PowerShell's symbology on one page. making it much easier when you need to look up a PowerShell symbol as you read code--or to browse for the right construct when you are writing code.  
![PowerShell Punctuation wall chart](https://powershell.org/wp-content/uploads/2016/06/punctuation_thumbnail-300x152.png)  
Download the **Complete Guide to PowerShell Punctuation** wallchart from [here][1].

 [1]: https://www.simple-talk.com/sysadmin/powershell/the-complete-guide-to-powershell-punctuation/
