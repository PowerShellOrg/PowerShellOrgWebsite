---
title: Decorating PowerShell Objects
authors:
  - pscookiemonster
date: "2015-06-22T12:44:21+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/06/decorating-powershell-objects/
---

Ever wonder how PowerShell seems to know how to format objects? When you run 


`Get-ChildItem
`or 


`Get-WmiObject
`, you only see a few key properties, but a wealth of other information is available through commands like 


`Select-Object
`and 


`Get-Member
`.

Have you ever written a PowerShell function that you nearly always pipe to 


`Format-Table
`? Wouldn't it be nice to specify some default properties and force them into a table?

Stop by for [a quick hit on how to decorate your PowerShell objects][1] with type names and formatting, including a re-usable tool to abstract out some of the details.

Cheers!

 [1]: http://bit.ly/DecoratePSObjects
