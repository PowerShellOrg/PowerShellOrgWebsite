---
title: Pipeline or Script? That is the Question
authors:
  - Don Jones
date: "2013-06-21T17:52:14+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/06/pipeline-or-script-that-is-the-question/
---

When I teach PowerShell classes, I often start by assuring students that, with the shell, you can _accomplish a great deal without ever writing a script. _And it's true - you can. Unlike predecessor technologies like VBScript, PowerShell lets you pack a lot of goodness into a one-liner - or even into several lines run manually in the console.  
What I never say is _you can accomplish 
anything
 without ever writing a script. _That isn't true. I see folks struggle all the time to squeeze something into a one-liner pipeline, when life would be so much easier if they switched a script-style, procedural approach.  
So what's the tipping point?  
Actually, it's really easy to spot. You should be writing a script if:

  * 
You need to take different actions based on some condition, like send an e-mail if there's data to send, but send nothing if there's no data.

  * You need to do more than one discrete task. Yeah, you can sometimes jam multiple actions into a one-liner using things like passthrough, but it's not consistently available, and the command becomes dreadfully difficult to read and debug.
  * You need to run a command repeatedly over time, and each time some of its values will change (scripts offer declarative parameters).

Many smart folks _start_ in the console to test a command, and then paste it into a script they're working on (I do that, too). And there are other reasons to switch from "running a command in the console" to "banging out a script in the ISE [or editor of choice]." What tips would you offer to a PowerShell newbie to help them get the most from the command-line... but know when it's time to move into a script-based approach?
