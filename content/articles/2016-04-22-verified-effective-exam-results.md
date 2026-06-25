---
title: Verified Effective Exam Results
authors:
  - Don Jones
date: "2016-04-22T16:14:26+00:00"
categories:
  - PowerShell Summit
aliases:
  - /2016/04/verified-effective-exam-results/
---

We've uploaded the results of the Verified Effective: PowerShell Toolmaker exam, which was administered at the recent PowerShell + DevOps Global Summit 2016. Note that this exam has, for a couple of years now, been available only as an on-site, in-person, proctored experience - we do not offer online delivery.  
We had our best pass rate ever - about 20%. That said, nobody hit 100%. I had actually done a pre-con, full-day session on the very topic being tested - writing advanced functions - and had more than a few folks tell me that the session wasn't as "advanced" as they wanted. Notwithstanding, 80% of the people who took the test didn't pass (and I wasn't the one grading the tests, either, so it's not just spite!). Unfortunately, a lot of us _think_ we're "advanced," but in fact are missing a lot of details. In some cases, having reviewed the graded tests, folks are missing some of the basics.  
If you took the test, head over to [VerifiedEffective.org][1] and enter your candidate ID to see if you passed. I want to stress that I personally don't have access to the graded tests with names attached - I only have anonymized copies.  
We're not going to offer the exam again at Summit 2017. We're considering making some schedule changes that won't accommodate the time and space and personnel needed to administer the exam and - to be frank - I think _education_ would benefit a lot of people more than a test. Whether we offer the test again in future years hasn't yet been decided, although I'll share our general feelings at the end of this article.  
In fact, with that "education" in mind, I'm going to break a rule. I'm going to post the entire exam packet, exactly as it was given to the attendees who took the exam. I did something similar after PowerShell Summit Europe 2015, but this is the _exact_ exam packet. Go ahead - give yourself an hour to finish the test, and then check back here. I'll wait.  
[Exam](https://powershell.org/wp-content/uploads/2016/04/Exam.docx)  
<!--more-->


All done? Now I'm going to break another rule and go through the exam. I'm going to point out a bunch of stuff that people got wrong, although _just because you did or did not get these things wrong does not mean you did or did not pass, _if you were one of the folks who took this at Summit. This is an amalgamation of comments. So _do not_ drop into comments all angry that you "should have passed" because you think you did perfectly based on my comments in this article. If you didn't pass, you didn't pass for at least a couple of good reasons, and no, I'm not going to ask the scoring panel to go over your exam with you personally. We don't have the tests with names on them anymore, anyway.  
So.  
The first thing people ran across is the fact that the function in the exam clearly has comment-based help, but when run in the transcript no help appeared. _No_ help. Not even the auto-generated help, _which should have been a clue. _The problem is the blank line between the end of the help block and the **function** keyword _[NB: Dave Wyatt points out that this was fixed in v5; it's irrelevant for the exam scoring because you were not expected to fix it anyway]_. PowerShell _(in v4, at least, which is obviously what was used to create the transcript) _chokes on this and abandons all hope. _You were not expected to fix this, _because it was like this in the transcript - and your goal was to make the function look as needed to reproduce the transcript. Some (most) folks deleted the comment block. But do me a favor - paste this function into a script, omit the comment block, and see what PowerShell does when you ask for help. Is that what's shown in the transcript? Only two left it alone, recognizing the problem for what it was. "But that's tricky!" you might say. No, it isn't - not if you know the details of how this technology works. The _technology_ may be tricky, but knowing those ins and outs is what sets you apart as an expert. However, nobody failed solely because they suggested deleting the comment block - the goal of this article is to point out what was going on, not describe the ways in which people failed or passed.  
Now for the parameter block, which caused more grief than almost anything else.


`Param(
        [Parameter(ValueFromPipelineByPropetyName=$True)]
        [string[]]$ComputerName,
        [ValidateSet('Cim','Wmi')]
        [string]$Protocol = 'Cim'
    )
`Most everyone recognized that **ValueFromPipeline** needed to be added; very few struck **ByPropertyName**. It's fine; it doesn't hurt to have it there and nothing in the transcript suggested it was wrong.  
There is no need to add **[Parameter()]** to the second parameter. However, that **[ValidateSet()]** really caused a lot of variation in the responses. The transcript clearly shows **Dcom** as one value, so **Wmi** is clearly wrong. While the transcript does not show any other value _being passed to the parameter, _it _clearly_ shows **Wsman** as the "default" value - this is in the verbose output when the command is first run. Ergo, if Wsman is the default, then it must also be part of the validation set, not Cim. This is the kind of deductive reasoning that makes you a good debugger.  
Many people correctly pointed out that **[CmdletBinding()]** is missing, which is required to enable the built-in -Verbose parameter. Some folks wrote entire If() block to test for -Verbose, which _is not the right thing to do. [NB: Dave Wyatt points out that the -Verbose parameter would be implied by including [Parameter()], which is fine; I checked with the scoring panel and nobody was docked for not specifying [CmdletBinding()]. It's the If() construct that was unnecessary.]_  
Several people insisted on adding a **BEGIN{}** and **END{}** block. These are unnecessary _to reproducing the transcript. _Advanced functions work fine without them, even in pipeline input mode.


`if ($Protocol -eq 'Dcom') {
                $opt = New-CimSessionOption -Protocol Dcom
            } else {
                $opt = New-CimSessionOption -Protocol Wsman
            }
`Many folks made extensive changes to that section. However, _according to the transcript, _the If() block is correct. It's the ValidateSet() that was wrong. Some folks felt that **-Protocol $protocol** could have removed the need for the whole If() block. That's fine, and the opinion wasn't counted against you, but the goal was to _reproduce the transcript_, not to simply simplify the code.  
Now for the main chunk.


`try {
                $session = New-CimSession -SessionOption $opt `
                                          -ComputerName $Comp
                $os = Get-CimInstance -CimSession $session `
                                      -ClassName Win32_OperatingSystem
                $disk = Get-CimInstance -CimSession $session `
                                        -ClassName Win32_Volume `
                                        -Filter "Name = 'C:\\'"
                $props = @{'ComputerName' = $Computername
                           'OSVersion' = $os.version
                           'SPVersion' = $os.ServicePackMajorVersion
                           'CDiskSize' = $disk.Capacity
                           'CDiskFree' = $disk.FreeSpace}
                New-Object -TypeName PSObject `
                           -Property $props
            } catch {
                Write-Error "Failed to connect to $comp"
            }
`Ignoring the annoying backticks, which were there only to make this fit onto a printed sheet of paper, nearly _everyone missed the lack of **-ErrorAction** on **New-CimSession. **_Without that, the entire Try/Catch block doesn't work. That's a fairly grievous oversight.  
Others added in a slew of **Write-Verbose** statements to duplicate what was in the transcript. Problem is, if you'd added **[CmdletBinding()]**, most of the verbosity in the transcript came from New-CimSession and Get-CimInstance, because running the function with -Verbose "passes down" the verbose instruction to cmdlets within the function. That's important to know as a Toolmaker. Other added **-Verbose** to the end of all the **Get-CimInstance** commands, which is clearly wrong, since those did not _always_ produce verbose output.  
Many folks, by the way, caught that **Write-Error** should have been **Write-Warning. **Many also added #end comments to the construct closing brackets. Unnecessary, as there was no instruction to modify the script to conform with any particular set of practices, but it didn't count against you. Most caught the replacement of **$comp** with **$computername** in the **$props** hash table. Several insisted on saving the new object to a variable and then writing it with **Write-Output**; that's unnecessary but didn't count against them.  
A couple of folks insisted on saving the new object to a variable, and then writing that variable to the pipeline _after the end of the Catch block. _If you follow the logic, you'll see the problems that will produce. It's wrong. Others pointed out that the new object variable would have to be set to $null at the end of the ForEach construct. It doesn't. Not if you're doing it right.  
_Several_ folks unnecessarily asked for the order of the hash table to be different, to match the output of the transcript. Because an unordered hash table is used, PowerShell won't respect the order shown in the script, and what's in the transcript is what you actually get. Changing the order of the hash table in the code won't necessarily have any effect on the output. Again, this is an important thing to know if you're going to be expert-level in Toolmaking.  
A few folks pointed out that Get-CimInstance would require a -Namespace. It doesn't, because we're querying the default namespace. Others somewhat inexplicably crossed out the **-ClassName** parameter, so I'm not sure how the script would be expected to work that way.  
I want to emphasize that _I have not covered every single grade point from the exam - _only the major things that I noticed as I reviewed the already-graded packets. I reviewed those without people's names attached, too, so I can't even tell you who did what, which is as it should be.  
Now, for the good news. Pass or fail, most people got the _gist_ of the thing. Some people were probably just freaked out about taking an exam, and flubbed a few bits they might ordinarily get right. A couple of people got time-pressured, and that can cause screwups. So know that, even if you didn't pass, _you were probably close. _And there's a massively legitimate position that you can't easily test this kind of skill without throwing in all kinds of off-topic stresses and complications. Fortunately, this isn't a certification exam, you're not going to lose your job if you didn't pass, and you didn't pay a dime to try (the exam was free to all attendees). And I want to emphasize that _nobody_ got it 100% right. There were, I think, 11 errors, and you needed to find 8 of them to pass. So it was easy to fall just on one side or the other of that line.  
If there's a takeaway, it's that _there's always room to learn more. _If you made one of the silly mistakes, or missed -ErrorAction, it might well simply be because of the nature of this experience, not because you didn't know better. In which case - awesome. But I'm pretty sure everyone "legitimately" missed at least one important thing, or added something unnecessary in the belief that it was required - and if you can make this a learning experience, then you'll at least grow as a professional.  
So, on to the future of this thing. This whole exam idea was started because Microsoft simply refuses to do a certification, and people wanted _some_ kind of measuring stick for their skills. Thing is, _any_ kind of exam (and perhaps Microsoft recognizes this?) tosses unrelated factors into the soup, and you get people failing just because of the nature of the exam. They tense up. They stress out. They overthink it. They start looking for "tricks" and second-guessing themselves. Whatever it is, the yardstick itself becomes a problem, perhaps more of a problem than what it was trying to solve. So for now, at least, we're not going to pursue this any further. I do recognize the need to measure yourself against a standard, and I recognize the value that can have in the workplace. But we're seeing that the testing process (and we've tried this in four different processes in an attempt to combat this) is artificial, and introduces too many extraneous variables to be, I think, a super-accurate standard. So for now, we don't feel our best value as an organization is to pursue this at the moment. Instead, we're going to focus on education.  
Perhaps in some months the new Scripting Games can take on the role of giving you a task like this one - one with a more defined "answer." A way for you to test yourself against a standard, just for your own satisfaction and edification. As always, we're open to suggestions (especially suggestions that come with an offer to _actually implement the suggestion, _since we're not gifted with any more free time than you are) on how we can help the community better serve itself and meet its needs.  
In the meantime, thanks for your support.

 [1]: http://verifiedeffective.org
