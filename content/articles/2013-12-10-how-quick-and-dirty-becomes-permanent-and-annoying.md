---
title: "How \"Quick and Dirty\" Becomes \"Permanent and Annoying.\""
authors:
  - Don Jones
date: "2013-12-10T22:23:37+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/12/how-quick-and-dirty-becomes-permanent-and-annoying/
---

Consider the following:


`$computers = Get-ADComputer -filter * -searchBase "ou=test,dc=company,dc=pri"
foreach ($computer in $computers) {
  write-host "computer $computer"
  $result = Do-Something -computername $computer
  Write-Host "$($result.property) and $($result.value)"
}
`Would you ever consider that acceptable? Some folks might well say, "sure! if I was just testing this, throwing in those Write-Hosts is no big deal. Heck, even if I was the only one who was going to use this, Write-Host isn't bad."  
And the point I'm going to make doesn't just apply to Write-Host. It applies to _anytime_ when you're doing something that you _know_ breaks "best practices," but you justify it because it's "just for you" or because "it's just for testing."  
To wit: if you need your script to output some status or tracking information, as in the above, use Write-Verbose. Yes, Write-Verbose requires a script or function to have this at the top:


`[CmdletBinding()]
Param()
`Small price to pay for all the functionality it adds, but why not just use Write-Host and be done with it?  
**Begin as you mean to proceed.** That means, from the outset, assume everything is going to be a production-class tool and that it needs to be done right. You don't create output using Write-Host*, or output formatted text instead of objects, or any of a dozen other things because _eventually_ that thing you made "just for you" will end up copied and pasted into something that everyone in the organization depends upon.  
And weren't you the one complaining you never have time to do stuff? So where are you going to find the time to go back and _re-do something the right way_? You won't. Your quick-and-dirty "just for me" will end up becoming an ugly pimple for the rest of time.  
It is _rarely_ _harder to do something the right way_ in PowerShell. Yes, the right way might not be what habitually flies off of your fingertips - but that's not extra time, that's just you changing a habit. And again, Write-Host is just a convenient and easy example. I once was helping someone on a script, and in twelve different places, they had copied-and-pasted a short little logical construct to test connectivity to a computer on a specific protocol. It was maybe four lines of code. Most instances were commented out, indicating they'd just been for testing.  
"Why," I asked, "didn't you put that into a function, and build a toggle into the function?"  
"Oh, it was just for testing."  
"Yes, but this script is running a critical process now. It isn't just for testing. And it's fugly."  
"I didn't have time to go back and..."  
Just stop. Ugh. I know. Well, you had time to copy and paste in a dozen places, which took longer than just making the damn function would have taken in the first place.  
So the point: bad practices are always bad. Good practices are always good. And you should stay on the right side of the Force all the time, even when it's "just for you," because someday that code is going to wind up being not "just for you" anymore. Begin coding as you mean to proceed: write as if everything's for posterity.  

*unless you're specifically drawing an on-screen menu or something. Maybe then.
