---
title: "PowerShell Workflow: When Should You Use It?"
author: Don Jones
authors:
  - Don Jones
date: "2012-08-30T16:29:19+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2012/08/powershell-workflow-when-should-you-use-it/
---

Microsoft recently posted the online help for PowerShell v3 Workflow (http://technet.microsoft.com/en-us/library/jj134242), and I wanted to take an opportunity to explore some of what the help says - and perhaps offer an outsider's perspective.

## What is Workflow?

Workflow is a set of technologies included with PowerShell v3, and is available on any computer running v3 (which can include Windows 7, Windows Server 2008, Windows Server 2008 R2, Windows 8, and Windows Server 2012). A workflow is a special kind of PowerShell script that looks a lot like a function. When run, however, PowerShell translates the workflow to Windows Workflow Foundation (WWF) code, and hands it off to WWF to execute. That means the contents of a workflow are a bit different than the contents of a script.

## When might you use workflow?

This is where I take issue with the help files, a bit. They state:

> In general, you should consider using a workflow instead of a cmdlet or script when you must meet any of the following requirements.
> 
>   * You need to perform a long-running task that combines multiple steps in a sequence.
>   * You need to perform a task that runs on multiple devices.
>   * You need to perform a task that requires checkpointing or persistence.
>   * You need to perform a long-running task that is asynchronous, restartable, parallelizable, or interruptible.
>   * You need to run a task on a large scale, or in high availability environments, potentially requiring throttling and connection pooling.

I don't think that's an accurate list. I think it's incomplete, for one, and I think it includes some things it shouldn't. Understand that workflow is _complicated. _These things require some up-front planning. Not every PowerShell command can be used natively in a workflow (despite what the help files imply), because not every command has a WWF equivalent. For me, workflow is something you should use _when no other, simpler mechanism_ will meet your specific needs. This list in the help file is supposed to help you identify situations where workflow is _the only way to go_ - but I think it's a bit misleading.  
Let's look at why.

### You need to perform a long-running task that combines multiple steps in a sequence.

Well, that's what a script does. Any script. Just because you need to run multiple steps in a sequence doesn't mean you should be using workflow.

### You need to perform a task that runs on multiple devices.

OK, workflow _can_ do this, but so can the much easier-to-use Invoke-Command. Give it a command, or even a script, and you can run multiple steps, in a sequence, on multiple devices. Understand that workflow _uses _remoting to talk to remote devices; if you're using workflow, you've already enabled remoting - so why not use it when the need is simpler?

### You need to perform a long-running task that is asynchronous, restartable, parallelizable, or interruptible.

It's really the "or" I have a problem with here. PowerShell jobs will let you run tasks asynchronously, and in parallel; restartable and interruptible are legitimate workflow-only features. If you need those, you need workflow; if you _merely_ need asynchronous, consider using a job.

### You need to run a task on a large scale, or in high availability environments, potentially requiring throttling and connection pooling.

I don't see why Invoke-Command, which supports throttling of connections, couldn't accomplish this criteria. I'll admit that this one's borderline for me; because workflows are executed by WWF and not by PowerShell per se, it's probably better at scale-out. But I wouldn't _immediately_ head for workflow just because I needed to run some command on a few thousand machines. I might, after further evaluation of the situation, select workflow after all - but it's not an automatic for me.

### You need to perform a task that requires checkpointing or persistence.

Truth. This is unique to workflow. As WWF executes your workflow tasks, it "checkpoints" its status to disk. That way, if the entire environment crashes, WWF can resume where it left off when things are rebooted. If you need this, it's a legitimate reason to head straight for workflow. And for a very long-running task with multiple steps _that might well be interrupted, _this would drive me right to workflow every time.

### You need to perform a task that combines steps which can be run in parallel with those which must be run sequentially

This is really a unique workflow thing, and one that isn't listed in the help files. Workflow can designate specific chunks - _activities_ is the term workflow uses - that contain commands which must be run in a strict sequence, and designate other chunks to be run in parallel, in any particular order. This can massively improve performance, and is one of the main advantages that would push me to use workflow over an ordinary script.

## Features vs. Drivers

For me, this discussion is about workflow _features_ - things it can do - versus workflow _drivers_ - reasons you'd use workflow and workflow alone. My last two points - checkpointing and persistence, along with parallel/sequential mixing - are the main workflow _drivers_ for me. The ability to target multiple machines is a _feature; _something I can do with workflow once I've decided to use it.  
To be fair, I'm simplifying things a bit. Workflow's ability to target multiple machines in parallel may be more robust that remoting's ability to do so; I haven't tested that. Under the hood, though, I know that workflow _relies on remoting_ for communications, so I suspect the two would perform similarly.

## Hey, I Think Workflow is Cool!

Don't get me wrong. As I've outlined above, there are definitely reasons I'd choose to use workflow. But those aren't necessarily the reasons given by the help file. While I appreciate the time and effort Microsoft has put into workflow, I think they're a wee bit over-enthusiastic when suggesting that "you should use a workflow when you have a task that combines multiple steps in a sequence." Workflow is a challenging technology, with a fairly steep learning curve. As yet, troubleshooting and debugging tools are scant. I'll stick with simpler mechanisms when they meet my needs - and aim for workflow when I need some of the amazing things that it alone can do for me.  
My concern with the help files is that they could drive relative newcomers to workflow by giving them the impression that it was the only way to achieve some of those things, or was the preferred way of achieving them. Those newcomers could easily be intimidated by workflow (heck, I still am), and just walk away from PowerShell entirely, not realizing that there were other, simpler ways of "performing a task that runs on multiple devices." Help files like this should provide direction and guidance... and I just think in this case that the guidance oversells workflow a teeny bit.  
I've sent a longer, more detailed version of this feedback to Microsoft as well. Perhaps the help files can evolve over time (hey, that's why PowerShell v3 has updatable help!) to provide better, more accurate guidance on when you _should_ use workflow over some other approach.
