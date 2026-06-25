---
title: A Practical Guide for Using Regex in PowerShell
authors:
  - Duffney
date: "2016-10-04T00:49:59+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tutorials
aliases:
  - /2016/10/a-practical-guide-for-using-regex-in-powershell/
---

Regular Expressions is often referred to as wizardry or magic and for that reason I stayed away from it for most of my career. I used it only when I had to and most of the time just reused examples that I found online. There's nothing wrong with that of course, but I never took the time to learn it. I thought it was reserved for the elite. Turns out that it's not that complicated and that I had been using it for years without knowing it.  
In an effort to shorten the learning curve for others and to show you the value of learning regular expression I've written a blog post titled [A Practical Guide for Using Regex in PowerShell][1]. It will walk you through how to use regular expression in PowerShell and gives you a glimpse into how powerful regular expression is.  
Below is an example of how to use regular expression to extract a user's name from their distinguished name in Active Directory. To learn more check out this [blog post][1].  
![matches](https://powershell.org/wp-content/uploads/2016/10/matches-1.png)  
Topics Covered

  * -match operator
  * -match operator with regular expression metacharacters
  * -notmatch with where-object
  * -replace operator
  * -split operator
  * Select-String
  * Switch Statements
  * Regex Object

 [1]: http://duffney.io/APracticalGuideforUsingRegexinPowerShell
