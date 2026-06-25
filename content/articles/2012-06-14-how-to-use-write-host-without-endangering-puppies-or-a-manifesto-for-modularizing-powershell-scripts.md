---
title: How To Use Write-Host Without Endangering Puppies (or, A Manifesto for Modularizing PowerShell Scripts)
authors:
  - Don Jones
date: "2012-06-15T01:04:00+00:00"
aliases:
  - /2012/06/how-to-use-write-host-without-endangering-puppies-or-a-manifesto-for-modularizing-powershell-scripts/
---

At this week's TechEd, I was speaking with Jeffrey Snover in the hallway on Wednesday when he remarked, "you know, Write-Host isn't all bad." After he got someone to come around with smelling salts to revive me, he elaborated, "so long as your verb is Show." I started to object - and then a subtle, yet brilliant light came upon me. 

He's write. Heh.

But, seriously, if you do three simple things, you can't go wrong when you write a PowerShell script or function - and this goes further than just Write-Host. Ask yourself:

  * Am I naming my script/function according to PowerShell verb-noun naming conventions?
  * Am I only using allowed verbs (run Get-Verb for a list)?
  * Am I _respecting the use of the verb I chose?_


  That last one's the doozy. But think about it: If your verb is Get, then your function/script *should just get stuff. *It shouldn't manipulate it. Shouldn't format it. Shouldn't (generally) change bytes into megabytes, or anything else. Just get the data, and output a single kind of object to the pipeline, using Write-Output. That's it.


  Ok, if you want some step-by-step progress information as it runs, use Write-Verbose. That's cool. Or use Write-Debug for trace code, if you need.


  The Get verb implies that you may want to do something else with the data. Convert it to HTML. Export it to CSV. Whatever. And so you just output raw objects. Need to put that data into a database? Fine, create an "Export-MyStuffToDatabase" function that does that - the Export verb makes it clear that the data is "leaving the shell" and going elsewhere.


  Want to display the data on-screen? *Write a "Show-Whatever" function. *The Show verb *implies* on-screendisplay. You'd never think to run something like "Get-Service | Show-ServiceData | Export-CSV." The Show verb tells you that "this is going to the screen, and by God it isn't going anywhere else." So if you're using the Show verb... go ahead and use Write-Host. *That's what it's for. *No puppies will be harmed.


  This gets back to my bigger design philosophy of *make each function/script do only one thing. *Each should automate some *task*, and should act appropriately for the verb you've chosen. If you have a function *Get*ting something as well as *Format*ting the output... that's two things. You'll also write larger scripts that automate *processes, *and those should generally just be calling sequences of your task-automating commands. A task, then, is something you might use in several different scenarios; a process is one such scenario that employs several tasks.


  Provisioning a new user? You've got tasks like New-ADUser, Add-ADGroupMember, New-UserHomeShare, New-HREmployeeRecord, and so on. But those tasks (some of which you'd write yourself, obviously) might be used in other circumstances: New-ADUser, for example, might also be used when you need to set up a new SQL Server and create an AD service account, right? With all the tasks written, you'd write a larger "process" script, perhaps called New-CompanyUser.ps1, which combined those various tasks into the sequence needed to provision a user - while leaving the tasks free to be used in other processes as well.


  Stick with the verbs, my friend. They won't lead you astray.





![](http://powershell.com/cs/aggbug.aspx?PostID=17079)
