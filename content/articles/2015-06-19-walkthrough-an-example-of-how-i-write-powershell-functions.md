---
title: "Walkthrough: An example of how I write PowerShell functions"
authors:
  - Mike F Robbins
date: "2015-06-19T14:59:15+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/06/walkthrough-an-example-of-how-i-write-powershell-functions/
---

A couple of days ago I posted a blog article titled "[PowerShell function: *Test-ConsoleColor* provides a visual demonstration of the foreach scripting construct](http://mikefrobbins.com/2015/06/17/powershell-function-test-consolecolor-provides-a-visual-demonstration-of-the-foreach-scripting-construct/)" and today I thought I would walk you through that function step by step since it's what I consider to be a well written PowerShell function.

It starts out by using the [#Requires](https://technet.microsoft.com/en-us/library/hh847765.aspx) statement to require at least PowerShell version 3 or it won't run. It also requires that the [PowerShell Community Extensions](https://pscx.codeplex.com/) module be installed since it uses a function from that module and continuing without it only leads to errors:


`#Requires -Version 3.0 -Modules Pscx
`The function is then declared using a [Pascal case name](https://msdn.microsoft.com/en-us/library/dd878270(v=vs.85).aspx#SD02) that uses an [approved verb](https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx) along with a [singular noun](https://msdn.microsoft.com/en-us/library/dd878270(v=vs.85).aspx#SD01). [Comment based help](https://technet.microsoft.com/en-us/library/hh847834.aspx) is provided just inside the function declaration. This isn't the only location where comment based help can be specified at, but it's my preferred location for it.

[Click here](http://mikefrobbins.com/2015/06/19/walkthrough-an-example-of-how-i-write-powershell-functions/)
 to be redirected to the original post of this article on the author’s blog site where you can read the remainder of the article.


µ
