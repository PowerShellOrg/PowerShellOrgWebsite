---
title: "Want to be VERIFIED EFFECTIVE for PowerShell? Here's what to expect."
authors:
  - Don Jones
date: "2013-02-05T20:24:27+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/02/want-to-be-verified-effective-for-powershell-heres-what-to-expect/
---

We're well into our beta for the VERIFIED EFFECTIVEâ„¢ Windows PowerShell 3.0 Toolmaker exam, and expect the program to go live in March or April of 2013. There's a good bit of information on the [program home page](http://donjones.com/verified) that you should review if you're interested in getting verified.


  [As a note, once the program goes live, it'll be available to anyone worldwide - although the exam will only be available in English for the foreseeable future; we don't have the resources at this time to offer localized versions]
 I should point out first that we're doing this program through my company, rather than directly through PowerShell.org, mainly because of some legalities. My company (Concentrated Tech) has the insurance and other items in place needed to do something like this, and I didn't want PowerShell.org, Inc., to have to pay for those things. That said, a *lot* of folks have been involved in vetting and designing the exam scenarios. Another advantage of using Concentrated Tech is that the company is set up to do a lot of the interviewing and statistical analysis needed to make a relevant exam.
 The cost is the second thing I'll discuss: at $150/person, I know it's not cheap. But at least two human beings look at each person's work - there's no machine grading - and they gotta get paid. We also need to recoup some of the substantial investment that went into the exam design. Over a 3-year period, it'll hopefully be about break-even. We'll see.
 On to the exam itself. There are a variety of "forms" for the exam, meaning everyone isn't getting the same assignment. That said, the approach for each form is pretty much the same. You'll get 2-3 "assignments" to complete, all of which involve writing scripts and/or commands. You get a specified amount of time to complete your assignments.
 (as an aside, making multiple different exams that all test substantially the same skills is really tough, which is one reason we did a lot of testing and statistical analysis - to ensure the equivalency of each form - as part of the development process).
 Some assignments are straightforward: write a script that does this, this, and that. You're given a bunch of criteria and just have to spew out the commands. There's room for creativity - so long as you (a) meet all the criteria and (b) comply with the stated best practices, you pass. "Extra" stuff doesn't count against you, and the exact approach you use isn't graded - so long as you achieve all of the results and comply with all of the stated criteria.
 The "main" assignment in each form is harder. You're given a shell transcript, and you're asked to look at it and duplicate the tools you see used in it. For example:


`PS C:\> 'localhost' | Do-Something -confirm -verbose
VERBOSE: Checking for status.txt
VERBOSE: Status.txt exists, will append status to it
VERBOSE: Pinging localhost
VERBOSE: localhost responds
Performing action "Do-Something" on "localhost". Continue?
`That transcript should tell you that the command Do-Something accepts strings from the pipeline, supports the ShouldProcess mechanism, and outputs certain verbose status messages. You typically see each command used in several ways within the transcript, and each way reveals more about how that command works. Your job is to re-create the command, so that it produces the same results as shown in the transcript.  
We've tried to use this approach to make the exam as objective as possible. If we can run the same commands using your code, and get the same output, then you probably pass. We then run a check on the "best practices" section (which is given to you in your assignment packet) to make sure you didn't deviate.  
There's a tiny little bit of unstated stuff. Like, if you hand in awfully-formatted code, you just take a terribly long-winded approach that could have been vastly simplified, you write code that takes 12x longer to run than it could or should... if you do _enough_ of those wrong things in your assignment, you won't pass. We discussed these "soft" things a lot.  
For example, we didn't want to add a best practice, "your code must run as efficiently as possible." That would let us explicitly ding someone who took a too-slow approach... but that kind of statement also makes people start to obsess and overthink the assignment. We don't care if your code runs 1s longer than our model solution. We care if it runs 10m longer. That's hard to state... and frankly, if someone has to _tell_ you not to write crappy, slow code... you shouldn't be "certified."  
So you _can_ fail on unstated things... but you'd have to be pretty egregious about it. Two humans grading you would have to be in agreement, and in a case like that our internal policy is to get a third judge to agree with the decision.  
Hopefully some of you are excited about this program and can't wait to start. Now, for some more logistics - this is stated elsewhere, but just so you're clear:  
You get started by paying, and submitting a signed Program License Agreement and a copy of a government-issued photo ID. We do store that, offline, for our records. It isn't in a database anywhere. Once we have those items, we enroll you and you receive an enrollment e-mail.  
The e-mail contains basic instructions for logging into our system and obtaining your Assignment Packet. Once you log in, your 24-hour countdown starts. From that point, you have a specified number of hours to download the Packet, read it, construct your script(s), ZIP them, and upload the ZIP file to us. You get one upload - once you do that, your answer is locked and we start grading.  
Allow about 5 business days for grading - longer if we're swamped, although if that's the case we'll let you know. After grading, you'll get a pass/fail e-mail. We don't send you commentary on why - the goal of this isn't to make you a better person, it's to see if you've got the skills or not. If you fail, you can re-take after a 3-month wait (that helps prevent someone from slamming through all of our exam variations in a short period of time and cheating).  
I know one thing that will frustrate some folks is that we don't provide any feedback. That's very common in exam situations - Microsoft certification exams don't provide item-by-item feedback, either. So, for folks who _want_ feedback, you can get that. We haven't come up with a full program yet, but you'll be able to purchase time with an expert, and you'll get a scenario similar to (but not exactly like) one of the exam assignments. You can work on your answer for as long as you like, and then sit down in LiveMeeting or Skype or whatever with the expert, who will go over your work with you. If you did a great job, you're still _not verified_ - you have to take the exam for that. But if you're unsure, it's a way to have a small "trial run" that gives you some feedback on how you did. It can also be a good distance-learning experience, for someone who's so inclined.  
Anyway... there's the VERIFIED EFFECTIVE program in a nutshell.
