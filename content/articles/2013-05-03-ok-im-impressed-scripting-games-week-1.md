---
title: "OK i'm impressed: Scripting Games Week 1"
authors:
  - Glenn Sizemore
date: "2013-05-03T14:44:21+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/05/ok-im-impressed-scripting-games-week-1/
---

Well guys, and gals another year has passed, and the annual scripting games are upon us again.  After a week of reviewing submissions for their technique and style I must say that I am truly impressed!  As a community the average ability seems to be growing by leaps and bounds.  That"™s not to say we"™re all Samurai just yet, but we"™re getting there!  
Before I go off and nit-pick I want to congratulate you all on a small mountain of really well written scripts.  Some of the things that the community was preaching 5 years ago are now just standard.  Stuff like comment your code, format for readability, and Parameters.  At this point I"™m convinced those who still aren't conforming are simply non-conformist and well that"™s a lost cause.  For the rest of us great work and keep it up!  
**Where is the Help!  
** 
What I 
didn't
 see enough of in the advanced category is help.  Honestly if you"™re going to write a 200 line script fill out the help!  It"™s not that hard and it is THE difference between a good script and a great solution! It"™s also one of the fundamental differences between hacking and tool building, both are focused around automating a given problem set.  The hacker just gets it to work, the tool builder makes it usable by the masses.  If you haven"™t figured it out yet the real money is in tool building, I"™m just sayin!

**Trust but Validate.  
** 
I was pleasantly surprised by the amount of error handling in this first round of submissions, however I was disappointed by the lack of parameter validation.  When done correctly parameter validation can remove most of the potential errors a script can run into, and the best part is you find out that it"™s not going to work before the script does anything!  For example in this week"™s scenario every single script was asked to supply a source and destination path.  The following would have removed all but an access denied error.


`Param (
    [Parameter(Mandatory=$true, ValuefrompipelineByPropertyName=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [Alias("FullName")]
    [string]$Source
,
    [Parameter(Mandatory=$true, ValuefrompipelineByPropertyName=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [Alias("FullName")]
    [string]$Destination
)
`This is the equivalent of filter to the left, and 
I've
 talked to endless developers who are a little jealous of our ability to use an arbitrary scriptblock for parameter validation. For more static values the ValidateSet attribute will perform the same function, but with the added benefit of Intelli-sense and tab completion.* Guys use this* I"™m telling you it"™s one of the most powerful features in PowerShell and I just don"™t see it use often enough, but then again[ I"™ve been tilting at this windmill for years now.](http://blogs.technet.com/b/heyscriptingguy/archive/2011/05/15/simplify-your-powershell-script-with-parameter-validation.aspx)

**Parameter names  
** 
This one is a little more nitpicky than the average, but honestly there simply isn"™t an excuse for a script with three parameters to all start with the same letter.  Meaning the following is just disrespectful to yourself and your users.


`Param(
    [String]$ArchiveSource,
    [String]$ArchiveDestination,
    [String]$ArchiveAge
)
`I mean that"™s a no-brainer right?  I don"™t assume malice here just a lack of focus.  Anyone who stops and thinks about it immediately sees the problem, and solution. So I guess what I"™m asking is that we collectively take a second to think about usability.  For those of you that haven"™t had your coffee yet. The solution is that since three parameters all contain Archive we need to move that bit from the beginning of each parameter name.   In this case since there is no real need to differentiate I would suggest removing it all together.


`Param(
    [String]$Source,
    [String]$Destination,
    [String]$Age
)
`Here we"™re focusing on what"™s really important which makes the parameters easier to comprehend, but also lets us get to TAB faster which is a huge part of usability!  
**Bring it in  
** 
In summary all in all I would say we had a fantastic showing for our industry this initial week.  I really like the new site and voting has been very productive which is nice.  As we head into week two I look forward to what"™s to come as we collectively build upon what we"™ve learned this week.


~Glenn
