---
title: Pitfalls of the Pipeline
authors:
  - msorens
date: "2016-10-18T21:43:10+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2016/10/pitfalls-of-the-pipeline/
---

Pipelining is an important concept in PowerShell. Though the idea did not originate with PowerShell (you can find it used decades earlier in Unix, for example), PowerShell does provide the unique advantage of being able to pipeline not just text, but first-class .NET objects.  
Pipelining has several advantages:

  * It helps to conserve memory resources. Say you want to modify text in a huge file. Without a pipeline you might read the huge file into memory, modify the appropriate lines, and write the file back out to disk. If it is large enough you might not even have enough memory to read the whole thing.
  * It can substantially improve _actual_ performance. Commands in a pipeline are run concurrently-even if you have only a single processor, because when one process blocks, for example, while reading a large chunk of your file, then another process in the pipeline can do a unit of work in the meantime.
  * It can have a significant effect on your end-user experience, enhancing the _perceived_ performance dramatically. If your end-user executes a sequence of commands that takes 60 seconds, then until 60 seconds has elapsed he/she would see nothing without pipelining, whereas output could start appearing almost immediately with pipelining.

PowerShell provides a variety of techniques for using pipelining but it is all to easy to do it wrong, so you think you are pipelining but in fact you are not. In my article [Ins and Outs of the PowerShell Pipeline][1], I discuss the most common things that can trip you up with implementing pipelining and how to avoid them.

 [1]: https://www.simple-talk.com/sysadmin/powershell/ins-and-outs-of-the-powershell-pipeline/
