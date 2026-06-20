---
title: Judge notes for Event 4
author: Art Beane
authors:
  - Art Beane
date: "2013-05-23T14:56:59+00:00"
aliases:
  - /2013/05/judge-notes-for-event-4/
---

 Wow! That's the only word I can think of to describe the submissions this time. I'm really impressed with the approaches taken to solve this problem. The only thing that could have been better is quitting when the ActiveDirectory module or the Quest snapin weren't found. I chalked that up to not having experience with an actual audit where no answer is not acceptable, so I didn't count against it when evaluating the scripts. But, on this point kudos to the one script that tested for the AD module, then the Quest snapin, and fell back to the ADSI accelerator if neither were found.  
**Beginner entries**  
For me, the best entries were those that had the shortest pipelines. Those of you who used _Get-Random -Count 20 -InputObject (Get-ADUser...) | Select ... | ConvertTo-Html | Out-File_ had the shortest. And those who used _Get-ADUser | Get-Random -Count 20_ were a close second.  
A couple of entries had something that at first I thought was silly. But, instead, it offers a learning opportunity. Here's the code fragment: _Get-ADUser -Filter {ObjectClass -eq 'User'}_. Paying attention to what the cmdlet does saves a lot of typing, not only here where the filter is redundant, but also when entering other parameters. For example, a similar extra effort occurs when default properties are explicitly listed in a -Properties parameter.  
**Advanced entries**  
As mentioned, the best entries were those that fell back to the [ADSI] accelerator when the AD module or the Quest snapin weren't found. Making this kind of check and fallback is pretty important when responding to audit requests. This reminds me of a case where I actually had to respond to an audit request with the actual last logon date in a domain with mixed W2K3, W2K8, and W2K8R2 domain controllers. The default choice was to use the AD module, but since we had to check each domain controller (there were 72 of them), it turned out to be a real pain determining which method to use on each of them. In the end, we decided to install the Quest tools on the audit server and just avoid the issue.  
There were several different methods used to verify the presence of the AD module before trying to load it. Most of them were actually more work that really necessary. The reason for this is that the Import-Module cmdlet does not return an error if the module has already been loaded. Thus, the easiest test would be:


`Try { Import-Module ActiveDirectory -ErrorAction Stop $Users = Get-ADUser ... } Catch { Write-Error "AD Module not available" # Fall back to ADSI to get User data }
`The same is true for Add-PSSnapin for PowerShell 3, but in V2, it generates an error with "because it is already added" in $Error[0].Exception.Message. So, you can use something similar to check for that.  
To close out this set of comments, here's something to think about. The topic is embedded, or local, functions in a master function. Question 1: should you even go through the trouble of writing a local function if it's only going used one time? Question 2: since the local function will execute in a controlled environment, does it need to be an advanced function with comments and parameter validation, or would a simple function make more sense?  
Until next time: keep up the great work!!
