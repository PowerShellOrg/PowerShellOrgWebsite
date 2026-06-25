---
title: Questions about an Advanced PowerShell Class Design
authors:
  - Don Jones
date: "2013-10-15T19:45:18+00:00"
categories:
  - Training
aliases:
  - /2013/10/questions-about-an-advanced-powershell-class-design/
---

As we continue collecting responses to an outline survey about an Advanced PowerShell class, I've come up with a couple of questions and would appreciate any feedback you'd care to leave here.  
Keep in mind that we're a bit bound by this course being Microsoft Official Curriculum. I gotta make sure, in other words, that the average MCT can teach it. Ahem. I also have to face facts that people don't read or obey course pre-requisite suggestions, and that a lot of people taking the course will have zero programming background.  


## Question 1: GUI

First, we desperately want to include some module on "building friendly GUI tools for techs and end-users." It's a massively demanded topic. That said, hand-coding a GUI in either WinForms or WPF is physically painful and time-consuming, and nobody would do it. Asking the class to use SAPIEN PowerShell Studio is probably not on the table; Microsoft has rules, these days, about third-party applications in classes, even if they're free (which Studio isn't). Using Visual Studio to generate WPF XAML is probably also out of the question - it adds a lot of build effort for just a single module.  
So I'm down to a couple of options. Option A would be to provide students with a basic module that used PowerShell commands to construct a WinForms GUI. They would have after-class access to the module, too. After all, the big thing to teach here is less about how to physically build a GUI (if you were serious about it, you'd get PowerShell Studio), and more about the process of hooking up code to the GUI. By providing a module that shortcuts the hand-coding effort, we'd get to the important bit.  
But there's also a valid perspective that creating little distributable GUI tools is dumb, and that you should be building Web-based ones instead. We could certainly build a module around a simple ASPX page - which is much easier to hand-code with a few examples in front of you - that hosts the PowerShell engine to execute PowerShell commands. They're centralized, great self-service tools, and easy to crank out once you've got a pattern to work from (which we'd provide in the class).  
Thoughts?  


## Question 2: Workflow

We'd originally proposed a workflow overview module, with a basic example. Folks have quite rightly commented that workflow isn't all it was hyped to be. It's slow, in many cases. It's hard. It isn't really PowerShell. There aren't a ton of killer examples that you can cover in the scope of a class.  
But it offers parallelization, which is a great feature. So we're considering replacing workflow with a module on parallelizing PowerShell. My thought is to do that mainly with jobs. Jobs work very consistently inside the shell, and are easy to use. They have some straightforward caveats, like the fact that they return serialized objects.  
There's an argument to be made for runspace pools, too. But those get very programmer-y. You have to start worrying about concurrency, thread safety, thread and pool management, and a lot more. I'm not sure, in the context of a PowerShell class, we can sufficiently cover all those extras so that someone could be safely effective with runspace pools. I get that they're more flexible and low-level, but they're a big topic, and nothing else in the course "leads up" to that level of .NET programming.  
Thoughts?  


## Anything Else?

Any other suggestions aside from these two questions would be better served in the [original survey][1]. I'm not the only one evaluating those responses, and that survey is the only place we can guarantee the entire team will see everything.

 [1]: http://t.co/Pv7lmFsUWu
