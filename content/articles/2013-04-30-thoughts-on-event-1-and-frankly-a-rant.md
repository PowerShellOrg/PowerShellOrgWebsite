---
title: Thoughts on Event 1 – and, frankly, a rant.
authors:
  - Don Jones
date: "2013-05-01T00:06:53+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/04/thoughts-on-event-1-and-frankly-a-rant/
---

There's been a lot of dismay floating around the community about the state of "community voting" in the Scripting Games. Some folks are voting without leaving comments (we've expanded the comment field to 2000 characters, hopefully that'll help), and some disagreement about scores.  
Disagreement is natural. For example, stick a **Write-Host** in your script and I'm likely to score you lower. You may disagree, but it's how I feel in many situations... and I'm seeing a distressing amount of it.  
Did you know that using **[CmdletBinding(SupportsShouldProcess=$True)]** doesn't automatically and universally _make the -confirm switch work?_ You have to do a bit more.  
Did you know that if you put **$DebugPreference='SilentlyContinue'** in your **BEGIN{}** block, that you disable the built in -Debug switch's functionality? Yep, seen this one a few times also.  
The community is showing a distinct lack of love for scripts that look like VBScript scripts. Does that mean your script is wrong? No - but it means you're not approaching the problem in a way that the world in general feels is best. It doesn't mean your script won't work - but it means it wouldn't be widely accepted.  
If you're not happy with your score, look at some higher-scoring scripts. See what they're doing differently. If you can't figure it out, post in the forums on PowerShell.org (there's a Scripting Games forum). Provide the permalink to your script, and solicit some feedback from the community. Tweet people and ask them to take a look. You can _ask_ for more feedback, if you want it and aren't getting enough.  
As our judges begin to post their notes, look at what they're writing. Maybe they didn't pick your script to write about - but are they writing about things that you also did in your script?  
I'm seeing a lot of good scripts. But I'm also seeing some misunderstandings of some core, advanced features, like error handling, use of Verbose output, and so on. Each of those is a star to a half-star off, for me... some of these things, _in my opinion,_ are severe, and I score accordingly. I haven't seen a perfect, un-improve-able script, yet (I'm not even halfway through, yet). So no 5-stars yet. But I _am_ trying to leave comments, and I know others are, too, so hopefully folks can improve. But be patient - it takes _time._  
And _opinions differ._ Let me offer an example:  
**Write-Verbose ("Script: {0} ended at {1}" -f $MyInvocation.ScriptName, (get-date) )**  
****Dislike. Not saying it's wrong at all - and some people will disagree, vehemently, with me. But I find -f strings hard to read.  
**Write-Verbose "Script $($MyInvocation.ScriptName) ended at $(Get-Date)"**  
****For me, that's easier to read. Not any more "right," but in my company that's the standard we adopted and that we use. Now, hopefully my opinion is being balanced by others' opinions. But, if a substantial number of people share my opinion, this code would get a low score, and a _community standard practice_ would emerge - something we can learn from _after the Games are complete._ Because yes, I'm going to harvest the Games entries and comments long after the Games are over to help keep the conversation and education going.  
My point of this is that _none of us_ are as awesome as we think. Others will always have points of disagreement. What's really exciting here is the opportunity to create a community consensus of what's best. That won't come for several weeks, yet... but it _will_ come. There is **zero immediate benefit in getting a high score in the Games, and zero immediate detriment to a low score.** This is going to seem harsh, but the Games are not about _you._ They're about _all of us._ They're about us developing a sense of community involvement and standards in an industry that doesn't supply many of its own. This will happen over time, and with a lot of effort. But it's worth it.  
Let's continue.  
**[ValidateScript({(Test-Path $_ -PathType Container)})]**  
I love that. I never thought to do that, and I love it. I've seen a few people do it. Bless them. I learned something!  
An aside: There's this general undercurrent of, "I wish 'expert' judges were scoring me instead of the great unwashed masses." Let me point out some practical realities. One, every entry in the Games at this point has at least 4 votes; many have double that. The last event, most had 1, 2 at most. And yes, while 'expert' judges are allegedly well-qualified to render judgment, I'm not seeing a ton of scores I completely disagree with, yet. A few. Not a ton. And you want to know a dirty secret? How many entries do you think an 'expert' can look at, in the evening, after working all day (we're all volunteers), before he just starts getting a little arbitrary and inconsistent? The number is not "infinite." I know I got a little arbitrary last year before I caught myself and stopped for the night. So... don't discount the value of your peers' opinions. If you're getting a low score and don't know why, seek out answers. Yes, people should leave comments with their votes. If they don't, take charge and seek out answers yourself.  
I **love** that I'm seeing so many divergent approaches to a single (admittedly open-ended) problem. Frankly, the value here is in browsing others' approaches and picking up some tips from them. Or just seeing something different. You shouldn't care about your _score._ You should care about what other people are doing, and about why you think their way might be better, worse, or just different. _Make_ a learning opportunity. Don't wait for someone to come to you with a free, written analysis of your code. Analyze _other people's entries_ and judge yourself against their work.  
I've seen this a few times:


`# Validate that the source/log path provided is valid
if (-not (Test-Path $LogDirectory)) {
  Read-Host -Prompt 'Please provide a valid log directory';
}
`I had honestly never thought of that. I'm not sure how I feel about it. Generally, PowerShell commands throw errors - they don't prompt you to retry, and I'm a big fan of consistency with the native commands. Right now I think this is a 1/8th point off for me... but I appreciate the approach and I'm still thinking about it.  
I've seen this a **lot:**


`Get-ChildItem -Path $LogDirectory -Filter $Filter |
Where-Object {
  $_.PSIsContainer -eq $false
  -and
  $_.LastWriteTime -le (Get-Date).AddDays(-($RetentionPeriod)) } |
ForEach-Object {
  $RelativePath = $_.FullName.Substring($LogDirectory.Length);
  # (truncated)
`Personally, dislike. That's command-line, console-host approach - not a script. I think these massive pipeline blocks, in a script, are harder to read. Are they wrong? No. Will someone disagree with me? Yes. Again, vehemently. But I'm entitled to my opinion, and my opinion is that I'd rather see a scripting construct (ForEach) than a massive pipeline construct. Not in every scenario ever, perhaps, but... I'm biased against this approach. Understand that **Where-Object** is really just a ForEach loop in sheep's clothing... I suspect a single ForEach scripting construct could accomplish this block of logic in less time. As-is, you're looping through each object at least once... and many of them twice. That could be tighter.  
**Write-Warning $_.Exception.Message**  
****This bums me out a little and I've seen it a lot. $_ can get hijacked a little easily, depending on your code... and frankly, it's hard to read. Why not take one extra step and use -ErrorVariable to capture the error into an easy-to-read variable name, and work with that? There _are_ some arguments why not... but, in a broad sense, I prefer declarative, explicit stuff vs. weird built-in variables. I hate $_ even though it's used bloody everywhere.

> Another aside: I've gotten several support e-mails from folks who missed the cutoff time. The site **clearly indicates that all times are GMT.** This is a global competition, and your local time zone isn't the only one out there. We can't provide exceptions to the cutoff - I'm truly sorry about that, but you can continue to participate in the next event. **All times are GMT.** The Competitor Guide also clearly states that all ties will be given as GMT, and if you've any confusion, the menu bar of the Games Web site lists the current time in GMT, which is what the server uses to make all scheduling decisions.

**[ValidateScript({Test-Path $_})]**  
****I freaking love that. Points off if you've included that **and** you've coded a manual check for the path. Redundancy doesn't pay, unless it's a server cluster.


`if (!(Get-PSDrive -Name "dest" -ErrorAction:SilentlyContinue)){
  try {
    New-PSDrive -Name "dest" -PSProvider FileSystem -Root $Destination -ErrorAction:Stop | Out-Null }
  catch { throw "Cannot establish PS Drive for destination: $Destination. Check the path and try again." } }
`I am at a bit of a loss as to why this solution needed a PSDrive. I mean... not wrong, but befuddling. I do tend to down-vote code I regard as unnecessary (and a lengthy comment explaining why you feel it's necessary won't help, if I disagree). In this case... I was just confused as to the need. Oh, and **-ErrorAction:SilentlyContinue** looks plain weird. Why would you include the colon? You didn't for any other parameter. Minus 1/8th point for style - just because I'm a stickler for consistency, and using the colon breaks consistency. Some poor slob in the future is going to look at this and wonder, "when do I use a colon and when don't I? Aggh!" and I'm going to have to write a book about it. Argh. .  
Look at <http://scriptinggames.org/entrylist.php?entryid=16> and tell me why I love it. Man, I hope that link works. If it doesn't don't yell - I'll fix it.  
Oh:


`param(
[Parameter(Position=0)]
[string]$Source = "C:\Application\Log",
[Parameter(Position=1)]
[string]$Destination = "\\NASServer\Archives",
[int]$MaxAge = 90
)
`I don't downvote for this, but I'm curious: Why declare a position for every parameter, when what you've declared is the default? Without those **Position=x** statements, you'd get exactly the same thing, right? Seems unnecessary?  
Want more feedback? http://scriptinggames.org/entrylist.php?entryid=165. That's the Scripting Wife's entry. She's an _accountant._ But she's taken the time to be loved, so everyone votes on her entry. And I'll point out she's not getting a 5.0 score - so folks are clearly willing to be critical, even in spite of love.  
Go, and be loved .
