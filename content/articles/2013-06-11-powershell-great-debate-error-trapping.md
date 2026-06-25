---
title: "PowerShell Great Debate: Error Trapping"
authors:
  - Don Jones
date: "2013-06-11T21:17:36+00:00"
aliases:
  - /2013/06/powershell-great-debate-error-trapping/
---

In the aftermath of The Scripting Games, it's clear we need to have several community discussions - thus, I present to you, The Great Debates. These will be a series of posts wherein I'll outline the basic situation, and you're encouraged to debate and discuss in the comments section.  
The general gist is that, during the Games, we saw different people voting "up" and "down" for the exact same techniques. So... which one is right? Neither! But all approaches have pros and cons... so that's what we'll discuss and debate. In the end, I'll take the discussion into a community-owned (free) ebook on patterns and practices for PowerShell.

## Today's Debate: Error Trapping

There are a few different approaches folks take to trapping an error (I'm not discussing _capturing_ the error, just knowing that one occurred).  
Hopefully the Trap construct is familiar to everyone; I've always believed it's awkward and outdated. The product team has said as much; it was just the best they could do in v1 given time constraints. Its use of scope makes it especially tricky sometimes.  
Try...Catch...Finally seems to be what a lot of people prefer. It's procedural and structured, and it works against any terminating exception. You do have to remember to make errors into terminating exceptions (**-EA Stop** on a cmdlet, for example), but it's a very programmatic approach.  
I see folks sometimes use $?:


`Do-Something
If ($?) {
 # deal with it
}
`A "con" of this approach is that $? doesn't indicate an error. It indicates whether or not _the previous command 
thinks
 it completed successfully. _It's reliable with _most_ cmdlets - but I've seen it fail for a lot of external utilities. Given that it isn't 100% reliable as an indicator, I tend to shy away from it. I'd rather learn one way that always works, and that's been Try/Catch for me.  
Try/Catch also makes it easy to catch different exceptions differently. I don't always need to do so... but again, I'd rather learn _one_ way to do things that _always_ works and provides more flexibility. I don't want to use $? sometimes, and then use something else other times, because that's more to remember, teach, learn, etc.  
Some folks will do an **$error.clear()**, clearing the error collection, and then run a command. They'll then check **$error.count** to see if it's nonzero. I don't like that as much because it looks messy to me, and again - it doesn't let me easily handle different exceptions as easily as Try/Catch.  
Ok... your thoughts?  

[boilerplate greatdebate]
