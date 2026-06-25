---
title: Notes on Beginner Event 2
authors:
  - Art Beane
date: "2013-05-08T15:29:51+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/05/notes-on-beginner-event-2/
---

 First of all, congratulations! It looks to me like a lot of learning is going on; the 2nd event entries look really good to me. I especially liked the way a number of you built up a one-liner by starting with a_ Get-WmiObject Win32_ComputerSystem -ComputerName (Get-Content file.txt)_ and piping it into _Select-Object_ to generate the data. However, there were a couple of areas within the Select block that make me think that some more discussion of what $_ means in a pipeline would be helpful.  
Within the Select block, it is necessary to make a call to _Get-WmiObject Win32_OperatingSystem_ to get come additional information. It looks like everybody got the format correct: _@{Name='OS';Expression={Get-WmiObject}}_ where folks got into trouble was in specifying the ComputerName property. Some didn't even include it, meaning that the OS value would be taken from the local computer and not the remote one. But, more often than not, the code contained a plain $_ : _@{Name='OS';Expression={(Get-WmiObject Win32_OperatingSystem -ComputerName $_).Caption}}_. So, what's wrong with this? The problem is the value of $_ at this point in the pipeline.  
Let's try an experiment to show what I mean. Try this:


`Get-WmiObject Win32_ComputerSystem | Select-Object @{Name='OS';Expression={Get-WmiObject Win32_OperatingSystem -ComputerName $_}}
`What does it return? Only the label "OS" with no data and no error message. Why? To find out, lets change the code a little and see.


`Get-WmiObject Win32_ComputerSystem | foreach {Get-WmiObject Win32_OperatingSystem -ComputerName $_}
`This time, we do get an error message:


`Get-WmiObject : Invalid parameter At line:1 char:47 + Get-WmiObject Win32_ComputerSystem | foreach {Get-WmiObject Win32_OperatingSyste ... + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ + CategoryInfo : InvalidOperation: (:) [Get-WmiObject], ManagementException + FullyQualifiedErrorId : GetWMIManagementException,Microsoft.PowerShell.Commands.GetWmiObjectCommand
` "Invalid Parameter" means that $_ isn't a computer name. What is it? It's actually the entire Win32_ComputerSystem object. What you need to do is to select one of the object properties that contains the system's name ($_.__SERVER, $_.Name, or $_.PSComputerName).  
Hopefully, this wasn't too long or complex a description. The point is be careful in your pipelines that you know exactly what $_ means at each step.

>    
>
