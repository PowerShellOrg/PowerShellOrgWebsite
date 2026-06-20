---
title: Advanced Practice Event
author: Don Jones
authors:
  - Don Jones
date: "2013-04-20T16:00:56+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/04/advanced-practice-event/
---

I want to direct your attention to [this forums post][1], which I think is worth anyone's time to look through. I've left a pretty long reply with some comments on the entry that would also be worth a read.  
I find that a LOT of folks - like the gentleman who posted his script - have a really good approach to PowerShell scripts. They want to use parameters. They want verbose output. They want to proactively check for errors. Where I think folks get lost is in the fine points of how PowerShell enables these features. I see folks working harder than they need to, coding functionality that the shell will actually give them for free. I also see some not-entirely-perfect approaches to things like parameters and error handling, and some occasional mis-use of advanced features (I often see SupportsShouldProcess _declared_ but not actually _implemented_).  
Sometimes, this simply happens because a lot of these advanced features aren't well-documented in one convenient spot - they're all spread out - and because folks are learning from blog posts, which may themselves have been written by someone with an incomplete understanding. Or, they're pasting bits together without _really_ knowing what they're doing. That's cool - what you have to sometimes do is take a whack at something like this poster did, and get some feedback. I'm _really_ glad he did, because it offers an opportunity to clear up some misunderstandings, which will just make his scripts even better in the future.  
I hope everyone's looking at the Games as a learning opportunity. I hope _everyone_ will vote on folks' entries and leave comments when they do; I hope as many people as possible spend some time blogging about what  they see, what they've learned, and _what they don't understand._ That's how we'll all improve.  
Let me give you a perfect example (we're no longer discussing the forums post, here - I'm moving on to a new topic):


`Try {
  $continue = $true
  $bios = Get-WmiObject -class Win32_BIOS -computername $computer -EA Stop
} Catch {
  $continue = $false
  $computer | Out-File errors.txt -append
}
if ($continue) {
 $os = Get-WmiObject -class Win32_OperatingSystem -computername $computer
 # and so on...
}
`This is how I used to code for error handling when querying multiple WMI classes. I'd set a "flag" variable, $continue, to $false if the first WMI call failed, so that I didn't waste time on subsequent calls. Note that this is just a snippet; it isn't an entire script. Then I had a student who coded it this way:


`Try {
  $bios = Get-WmiObject -class Win32_BIOS -computername $computer -EA Stop
  $os = Get-WmiObject -class Win32_OperatingSystem -computername $computer
  # and so on...
} Catch {
  $computer | Out-File errors.txt -append
}
`Much more concise, and same effect. If the first WMI call fails, I jump into the Catch block, and skip the remaining code anyway. So there are constantly learning opportunities in seeing someone else's approach. For me, I learn new approaches that are sometimes better than what I've been doing. I also learn how to better teach PowerShell to people, by seeing common mistakes and misunderstandings. It's great to share your failures - that's how we grow!  
**Update:** Someone dropped me a line and made a couple of points, which I want to address:

> In the reply to the blog post you say: "Please consider properly setting -ErrorAction on the command (Get-WmiObject, in your case) and using a Try/Catch construct to actually handle errors, not just hide them." The example shown does the exact opposite. Any terminating error is caught, logged to a file, but not re-thrown effectively hiding the exception.

I disagree. First, _handling_ an error _may still involve suppressing the error message._ But I'm suppressing it for just one command, not the entire script; I'm also _handling_ the error by, in my case, logging it to a file. How you choose to handle may differ. What I don't want to do is toss a terminating exception - I'm in a loop, and want my command to continue processing the next object.

> Also the $os  = ... part is missing the -errorAction STOP.

That's deliberate. If there's going to be an _anticipated_ error - lack of connectivity, bad credentials, etc., I'm going to get an error on the first WMI call ($bios). I'll trap it, log it, and move on to the next computer (one presumes those snippets of mine are running in a loop of some kind, processing one computer at a time). If there's an _unexpected_ error, like a corrupt WMI repository or something, the second WMI call ($os) will explode, generating an error that I very much want to see, because I didn't anticipate it.  
Notice a word that I used a lot there: "I." I'm coding the script for the way _I_ want to it to run. _I_ want anticipated errors logged, and _I_ want unanticipated errors to continue exploding. _You_ may want your scripts to do different things. I'm not putting these snippets out there as the One True Way To Code, because there's no such thing. What I _am_ saying is that you need to _think about_ why you're coding the way you are, and have some justification for it.  
Globally suppressing error messages, but not doing anything to handle errors that you do suppress, is a poor practice. Beyond that, do what you need to do. I'm fine with someone suppressing an error _they've dealt with._ But if your code isn't dealing with it, then the person running the script needs to see something's gone wrong.  


 [1]: https://powershell.org/discuss/viewtopic.php?f=39&t=1810&p=8059#p8059
