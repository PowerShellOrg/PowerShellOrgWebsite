---
title: Some Event 3 Notes
authors:
  - Don Jones
date: "2013-05-18T14:23:25+00:00"
aliases:
  - /2013/05/some-event-3-notes/
---

I didn't see anyone (although I'll admit I haven't checked every entry) using my EnhancedHTML module from _Creating HTML Reports in PowerShell._ I am ensaddened.  
But man, Event 3 shows that you can really do well by learning a wee bit of HTML. Knowing an H2 and HR tag makes for much pretty results. Take it as career advice.  
As a nitpick, don't use Convert as a function verb unless all the function is going to do is convert something. It shouldn't "Get" as well. That said, because this event wants a single function that both gets and converts... which is something I'd ordinarily avoid packing into one function... no big. It's interesting to see the function names folks picked out.  
Folks, **test your scripts.** Seriously.  
I kinda giggled when I saw this comment in an entry:


`# I'd like to Splat this but I don't know how / ran out of time
`Heh. In general, this is like a cooking show. If you know your food doesn't taste good, don't bring it to the judges. And if you do bring it to them, don't tell them all the cool toppings you were going to add. Just give them what you made.  
Note to self: Don't write scenarios that require HTML. It messes up the Scripting Games Web site. Duh.  
You know, overall, I'm seeing good stuff. I ran through some of the low-scoring entries and didn't see anything that didn't deserve a lowered score. If you constructed your own HTML instead of using ConvertTo-HTML, you pretty much got universally dinged, and I can understand and support that philosophy.  
Oh, and ConvertTo-HTML doesn't output to stdout, whoever wrote that. It writes to the pipeline. Big difference.  
Folks, when using Get-WmiObject, _use the -Filter parameter._ Don't get _everything_ and pipe it to Where-Object. Get the filtering done early - this is a huge performance concept.  
This was interesting:


`[Parameter(Mandatory=$True,ValueFromPipeline=$True)]
            [ValidateScript({Test-Connection -ComputerName $_ -Quiet -Count 2})]
            [STRING[]]$ComputerName,
`I'm entirely unsure how I feel about this. I like the idea. I keep telling people than a Ping doesn't really tell you anything when you're about to use WMI, though. If the computer responds, WMI might still fail; if the computer doesn't respond, WMI might still succeed. A ping is not useful diagnostic information for WMI connections. I understand the desire to try and eliminate the WMI timeout, but you're not doing so. What if I block ICMP traffic but not WMI traffic - a very common thing at a lot of my clients? Just bear that in mind.  
We're done with Hungarian notation ($objDisk, $strComputer). Time to move on.  
Commenters: Dudes, you need to read. For example, this:

> When localhost, an IP address, or an alias is provided, the actual computer name is not displayed on the web page and the file name is also incorrect. Consider using one of the properties from the WMI class that has the computer name instead of what the user provided on input.

Was next to a 1-star vote. Totally inappropriate. 1 star, as the voting page clearly indicates, is when the script is totally non-functional. "Bad entry - does not function at all" is what it says under 1 star. This comment was on a working script. Maybe it didn't fulfill every requirement, but seriously, you'd _fire a guy_ whose script simply put an IP address instead of a computer name? No. This was a 3-star script according to the guidelines.  
Anyway... things are looking great. On to Event 4, which opens for voting real soon!
