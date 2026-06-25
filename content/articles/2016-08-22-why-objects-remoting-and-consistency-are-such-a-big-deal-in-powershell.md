---
title: "Why \"Objects,\" Remoting, and Consistency are Such a Big Deal in PowerShell"
authors:
  - Don Jones
date: "2016-08-22T20:39:49+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/08/why-objects-remoting-and-consistency-are-such-a-big-deal-in-powershell/
---

As PowerShell begins to move into a cross-platform world, it's important to really understand "why PowerShell." What is it, exactly, that sets PowerShell apart? Notice that I do not mean, "what makes it better," because "better" is something you'll have to decide on your own. I just want to look at what makes it _different. _  
<!--more-->

## It's the Objects

Folks often say that Linux is a text-based OS, whereas Windows is an object-based OS. That's a convenient simplification, but it isn't exactly accurate. And to understand why PowerShell is different, you need to understand the _actual_ differences - and how Linux and Windows have actually come closer together over the years.  
*nix - including Unix, macOS, and Linux - is based on very old concepts. "Old" isn't "bad" at all; much of Linux' current flexibility comes from these old concepts. Core to the Unix ethos is the fact that OS configurations come from text files. There's no Registry, there's no database, it's just text files. Kinda like, um, Windows was, back in the old days, with .ini files (and where do you think the idea for those came from). Text files are super-easy to view, search, modify, and so on. Heck, when I wrote my first Point of Sale system, it was largely text-based, because text files were super-easy for us to troubleshoot remotely, compared to a complex ISAM table structure.  
Windows, on the other hand, is an API-based operating system. When you want to query an OS configuration element, you don't just look in a text file - you run code, and query an API. When you need to make a change, you don't just change a text file and hup a daemon - you run code, and submit your changes to an API.  
When you need to pass data from one hunk of code to another, you need to have an agreed-upon structure for that data, so that the code on both ends understands the data. These structures are called _objects. _Traditionally, Unix didn't really have structured data. The file format used by Apache for its configuration was different from the format used by Iptables. Which is totally fine, by the way, because those two things never need to talk to each other. But when you start considering all the things the OS can do - users, file permissions, groups, ports, you name it - you started to end up with a lot of different formats. Indeed, the main reason that Unix had (has?) a reputation for being a complex OS to administer is largely because all of its data is scattered hither and yon, and all in different formats.  
That's been changing, though. You're starting to see more and more new projects pop up that rely on _structured_ configuration data, often using JavaScript Object Notation (JSON), although in other cases something like XML. This is a big deal for *nix administration. Why?  
Traditionally, re-using the output of a Unix command was complex. Output was pure text, sent to your console via the stdout "channel." Commands typically formatted their output for human eyeball consumption, so if you wanted to send that output instead to another command, you had to do a lot of text parsing. "Skip the first two rows of output, and then for each remaining row, go over 32 columns and grab 5 columns worth of text." Or, "skip the first row, and then in each subsequent row, look for text matching this [regex] and return only the matching text." Unix admins tend to _own_ regular expressions for this reason.  
But the problem with all that is that your workflow, and your tooling, becomes very version-bound. Nobody can ever improve tools like **ps**, because so many scripts rely on the output being exactly as it is today. Instead, you create entire new versions of those tools - which people then take dependencies on, and which can then never change, unless they provide some backward-compatibility switches to force old-version output. The end result is a highly fragmented landscape of tooling, a very high learning curve for incoming administrators, and a high amount of overhead in automating business processes.  
When you code a command-line utility in 1973, it's easy to imagine it'll never need to change. On the other hand, when you start building APIs in the 1990s, it's much more obvious that change will be constant. By passing objects - structured data - between themselves, APIs provide a kind of inbuilt forward-compatibility. If v1 of an API outputs objects that have 10 properties, v2 can easily add five more without breaking anything downstream. Anything consuming those objects won't care if there's extra data, so long as the data it was expecting is all there. Object-based data doesn't have any sense of "ordering," so it doesn't matter if the "first" property is Name or if the "first" property is Size. Consumers refer to properties by name, not by position, and the magic of the API itself makes it all match up.  
Objects also lend themselves to hierarchies of data. A computer object can have a Drives property, which can be a collection of Drive objects, which can have a Files property, which is a collection of File objects, and so on. Structured data like XML and JSON handle these hierarchies with ease, as do object-oriented APIs; textual output - which is essentially a flat-file at best - doesn't.  
So what sets PowerShell apart from other shells is the fact that its commands pass objects from one to another. When you reach the end of a "chain," or pipeline, of commands, the shell takes what's left and generates textual output suitable for human eyeball consumption. So you get the advantages of a text-based command - easy to read output - and the advantages of working with an API. For example, in PowerShell for Linux, Microsoft ships a command that wraps around the Cron feature. Cron is configured from a text file; Microsoft's command "understands" the text file format, and turns it into objects. That means nobody will ever have to grep/sed/awk that text file again - instead, you can deal with structured data. That's a really good example of taking something PowerShell is good at - objects - and applying it to something Linux is really good at - Cron. It's not forcing Cron to look like the Windows Task Scheduler in any way; it's simply applying a new shell paradigm to an already-solid OS component.  
This concept of a shell passing objects - again, just structured data - was unique enough that Microsoft was [granted a patent][1] for it (the patent also includes other innovations).  


## Remoting

The parent also touches on _remoting, _which was equally innovative. Yes, I know that Unix has _forever_ had the ability to log into a remote machine, first using things like Telnet, later SSH, and even later still more things. But that's _remote logon, _and it's not Remoting.  
With remote logon, you're essentially turning your local computer into a dumb terminal for a remote computer, a concept literally as old as computers themselves. It's a 1:1 connection, and it was fine when a given company didn't have more than a few machines. But modern, cloud-based architecture involves _thousands_ of machines, and 1:1 doesn't cut it. Remoting enables 1:many connections - "here is a command; go tell these 1200 computers to run it individually, using their own local resources, and then send me the results - as objects." Going forward, PowerShell can use either WS-MAN or SSH as the low-level transport for that conversation, but the protocol isn't important. It's the idea of running one command _locally, _piping that output to another command _which runs remotely, _and then taking _that_ output and piping it to yet more commands that run _locally. _This mixing-and-matching of computing resources and runtime locations is _huge. _  


## Consistency

And finally, the one argument that's the toughest to make. Plenty of *nix admins, and plenty of old-school MS-DOS command-line admins, take great pride in their mastery of obscure command-line syntax. It sets them apart from lesser humans, provides a veneer of job security, and proves their dominance of their field.  
Unfortunately, it's bad for the planet.  
Look, maybe your country is in fine economic shape (_ahem, _Norway), but here in the United States we have a fairly precarious hold on Biggest Economy in the World. We aren't a manufacturing powerhouse. We basically have two experts: information technology and Hollywood, and we're sometimes sorry about the latter. But for our economy to thrive in this century, we need all hands on deck when it comes to IT. That means a high barrier of entry, and the need to memorize arbitrary and obscure syntax, ain't gonna cut it. Computing is hard enough without making it artificially more obscure through syntax.


`chmod ugo+rwx sample.sh
`Yeah, see, that's too hard to teach a 12-year-old.


`Set-FilePermission -FileName sample.sh -Permissions Read,Write,Execute -Principal User,Group,Others -Action Add
`See, you still need to know _what's going on_ in both cases, but the syntax is much easier to read and understand without having to look it up. The command syntax becomes less obscure, and more self-documenting. More maintainable. Obviously, this is just a bogus example, but it illustrates the _pattern_ of PowerShell - meaningful command names, meaningful parameter names, and meaningful parameter value enumerations. And I use _meaningful_ in the correct way, as in, "full of meaning."  
PowerShell still allows for a shorthand syntax, if you're just in a hurry -


`sfp sample.sh -p r,w,x -for u,g,o -a add
`- but you're not forced into it, and it's easier to figure out what those things mean (again, this is a bogus example meant to show the shell's syntax pattern, not an actual run-able command).

## So... that's the big deal

And so that's what makes PowerShell _different. _It's not going to obviate Bash on Linux anytime soon, although it's happy to let you run your same old text-based commands, and even integrate their output as best it can into its object-based pipeline. But at least now, anyone approaching PowerShell for the first time can understand _what makes it different, _and decide for themselves if they think that's worth an investment to learn to use PowerShell well.

 [1]: http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PG01&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.html&r=1&f=G&l=50&s1=%2220050091201%22.PGNR.&OS=DN/20050091201&RS=DN/20050091201
