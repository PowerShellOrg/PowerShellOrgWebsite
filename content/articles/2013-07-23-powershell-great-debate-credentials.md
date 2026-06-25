---
title: "PowerShell Great Debate: Credentials"
authors:
  - Don Jones
date: "2013-07-23T17:47:45+00:00"
aliases:
  - /2013/07/powershell-great-debate-credentials/
---

Credentials suck.  
You obviously don't want to hardcode domain credentials into a script - and PowerShell actually makes it a bit difficult to do so, for good reason. On the other hand, you sometimes _need_ a script to do something using alternate credentials, and you don't necessarily want the runner of the script to know those credentials.  
So how do you deal with it?  
Let's be clear: This is _not_ a wish list. Comments like, "I wish PowerShell could do ____" aren't valid. What _do you do using the technology as it exists today_? Do you prompt for a credential and assume the script user will have it? Do you try to hardcode it? Do you set up a constrained endpoint? What?  
[boilerplate greatdebate]
