---
title: "PowerShell Summit Community Sessions List [Updated]"
authors:
  - Kirk Munro
date: "2012-11-02T19:19:22+00:00"
aliases:
  - /2012/11/powershell-summit-community-sessions-list/
---

[Update: April 19, 2013] **Important Note:** Due to some last minute schedule changes for some of our speakers, several of the sessions below were replaced with other sessions.  To see the final list of sessions offered at the 2013 PowerShell Summit, please visit this page: <https://powershell.org/2013/04/19/powershell-summit-2013-conference-schedule/>{.vt-p}

After almost 100 people voted for the sessions they would like to see the most at the [2013 PowerShell Summit][1]{.vt-p}, the results are in!  These votes are for the sessions chosen by the community, and additional sessions from the PowerShell Team will be announced at a later date (as soon as I have them).

Below you will find the not-quite-finalized list of community sessions that will be included in the 2013 PowerShell Summit, sorted alphabetically by speaker.  It is not quite finalized because I am still awaiting final confirmation from a handful of speakers (those marked with an asterisk).  I will update this post as the final confirmations come in.

Thank you to everyone who submitted a session proposal for this conference.  There were a lot of great proposals this year, and I personally think no matter which sessions were voted for, the conference would have been fantastic.  Also thank you to anyone who took the time to vote for their favorite sessions.  Your votes really helped us a lot here, both for the upcoming 2013 conference and for conferences we"™ll be planning in the future too!

If you would like to attend this conference so that you can learn from these great sessions and others that are not yet announced, and so that you can participate in the fantastic conversations that happen at such an event, you can purchase your ticket here: <https://powershell.org/summit/>{.vt-p}.

Here is the list of sessions that made the final cut:




      Speaker



      Title



      Description





      June Blender



      Help for Help: A Help Authoring Deep Dive



      A comprehensive 400-level talk for module authors about authoring techniques for all types of Windows PowerShell Help, including About help and help for all command types, including cmdlets (and the MAML schema), scripts, functions, CIM commands, workflows (script and XAML), providers (including custom cmdlet help), and snippets. What you can and cannot do, and what's worth doing when time and resources are short. We'll cover online help, Updatable Help, and all the gotchas (HelpInfo XML, HelpInfoUri, HelpUri, CHMs), and I'll share the scripts that I use to generate help files and verify the accuracy of parameters, parameter values, parameter attributes, GUIDs, and URIs.





      James Brundage*



      The Powers of PowerShell Pipeworks



      Ever wanted to make PowerShell easy for others? Or realize that a simple script you have would be a great backbone of a business (if only you could charge for it)? PowerShell Pipeworks is a web platform built in PowerShell that makes is simple to build compelling web applications and software services in a snap. In this session, you will see: – How to use Pipeworks to store your data to the cloud – How to create a monitoring dashboard with Pipeworks – How to build a Facebook application with PowerShell Pipeworks – How to put a price tag on a cmdlet





      Ian Davis



      Metaprogramming PowerShell



      PowerShell can be a fun and crazy language to use, but we can take it a step further with metaprogramming. By taking advantage of PowerShell's flexible language features including dynamic scoping, modules, deferred evaluation, and ScriptBlocks, we can create simple and powerful applications applications leveraging metaprogramming idioms.





      Ian Davis



      Automated Builds With PowerShell



      Automated builds are a critical part of application lifecycle management. PowerShell is very well suited for making this process easier. We have gone full circle with scripting builds and by leveraging PowerShell on the command line and building DSLs, our builds can be more robust and intuitive than ever.





      Adam Driscoll



      Inside PowerShell: Abstract Syntax Tree Manipulation



      In this session we will take apart PowerShell. This session will highlight the new abstract syntax tree and node visitor API that is exposed in v3. An instrumentation profiler will be used as an example of how to traverse and manipulate PowerShell scripts from within the engine.





      Adam Driscoll



      .NET Reverse Engineering with PowerShell



      In this session we will look at how to utilize ILSpy to decompile .NET assemblies and quickly access internal aspects of them using PowerShell. We will see how to easily expose private members for access and manipulation within scripts. Adam Driscoll





      Jeffery Hicks



      Adding a GUI to PowerShell without WinForms



      Graphical PowerShell scripts seem all the rage these days. But most often that means using Windows Forms which can be very tedious to work with. But that is not the only game in town. Depending on your requirements there are a number of techniques you can use to add graphical elements to your PowerShell scripts. This session will explore how to create message boxes, input forms and more, all without a single Windows Form. If you are just getting started with writing PowerShell scripts, you'll find these techniques simple to use, plus there will be plenty of sample code for all!





      Don Jones



      Workflow Walkthrough



      It seems like everyone's interested in v3′s new Workflow feature, so let's do a quick walkthrough of building one from scratch. We'll skip the usual "provisioning" example and go for something a bit more constrained, and perhaps real-world, where workflow's unique features can really be put to solid use. This'll also be an opportunity to discuss what workflow can and can't do, and discuss some of the options and permutations of using it.





      Don Jones



      Remoting Configuration Deep Dive



      What do you do when Enable-PSRemoting isn't enough? Dig deeper. We'll run through all of the major configuration scenarios, including how to use (and not abuse) TrustedHosts, how to set up an HTTPS listener (and use it), how to do non-domain authentication, how to enable CredSSP and configure it to be less than a major security hole, and more. Pretty much every possible Remoting config, we'll cover. With detailed, step-by-step instructions!





      Kirk Munro



      Creating Add-on Tools for PowerShell ISE



      PowerShell 3 includes a ton of improvements to the integrated scripting editor, PowerShell ISE. As great as PowerShell ISE is in this version, there is still a lot of room for improvement. Fortunately, Microsoft anticipated that they wouldn't be able to do everything, so they extended their support for creating Add-on Tools for PowerShell ISE.In this session, the worlds first self-proclaimed Poshoholic and PowerShell MVP Kirk Munro will provide a soup to nuts demonstration of PowerShell ISE Add-on Tools, showing how you can create everything from simple menu extensions to feature rich windows that respond to ISE events and that are docked right inside of the ISE.




        Technologies covered in this session include the PowerShell ISE object model, C#, WPF, eventing, Visual Studio 2012, and of course several core PowerShell features.  



            Kirk Munro



            Authoring PowerShell like a Poshoholic



            I've been using PowerShell for over 6 years. Blogging about it for over 5 years. Creating and managing products based on PowerShell for about that long as well, and writing a whole lot of scripts during the process. During this time I've come up with a trick or three to make that work easier. Some of these tricks are simple time savers, while others are ground breaking opportunities that just might change the way you write PowerShell.Come and join me in this session to get a bird's eye view at some of the work I've been doing with PowerShell, as I talk about tips, tricks, and best practices while demonstrating some of the extensions I've written specifically to make authoring with PowerShell easier to do.




              Topics discussed include proxy functions, WMI/CIM, Microsoft Office, DSVs, WiX, merge modules, type accelerators, and more.  



                  Aleksandar Nikolic



                  How to Delegate Administration and Customize PowerShell Session Configuration



                  In this session you will learn how to customize PowerShell session configuration, and then use it to assign specific administrative tasks to the appropriate users and groups without changing the membership of local Administrators group. By using new Windows PowerShell and Windows Remote Management 3.0 capabilities we will enable dynamic creation of customized automation environments that users can access through the Windows PowerShell Web Access.





                  Aleksandar Nikolic



                  Configuring Your Windows PowerShell Workflow Environment



                  In this session you will learn how to set up your environment to run Windows PowerShell workflows. We will discuss different workflow configurations, how to prepare computers to run workflows, what is workflow session configuration and how to customize it. At the end, you will learn how to properly run your Windows PowerShell workflows.





                  Aleksandar Nikolic



                  Build Your Demo Environment or a Test Lab with Windows PowerShell



                  With Windows PowerShell 3.0 and the new Client Hyper-V available in Windows 8, it is so easy, and fun, to automate creation of your demo environment or a test lab infrastructure. You can easily convert ISO files to VHDs, deploy your VMs and configure networking and storage. Join us for this demo-heavy session to see all the steps.





                  Alan Renouf



                  Creating a complex and reusable HTML reporting structure



                  In this session I will show you the shortcuts and tricks picked up when creating a complex reporting structure with PowerShell, how a simple HTML output script grew to be a reporting structure which can adapt to give detailed, nicely formatted reports on any application or system that has a PowerShell interface, and even some that don't!





                  Alan Renouf



                  Practical PowerShell Integration from Bare Metal to the Cloud



                  See how PowerShell can be used as the glue of the datacenter, take information from VMware, Cisco and Microsoft, Glue them all together and go from bare metal up to the cloud and beyond. Learn how PowerShell is now expanding to be the language of choice and how Microsoft and third party products can be tied together to create fantastic solutions.





                  Andy Schneider



                  PowerShell and Source Control for the IT Pro



                  Are you ever concerned about updating a script, having it break, and can't remember what you changed. This is source control by an IT Pro for IT Pros. Come check out some best practices and lessons learned on how to incorporate source control as part of writing scripts. Learn how to have your code available via the web and easily accessed on multiple machines. We'll take a look at using GIT to ensure your code is always up to date and you can always get back to where you were if you break something.





                  Andy Schneider



                  PowerShell and Active Directory



                  This session will provide a quick overview of different options to manage AD using PowerShell. It will quickly jump into some of the shortcomings of the MSFT provided Active Directory module and how to work around them, and even "fix" them using proxy functions and the new Default Parameter Set feature in V3.





                  Richard Siddaway



                  CIM sessions



                  The introduction of the CIM cmdlets and "cmdlets over objects" in PowerShell v3 provide new ways to work with WMI. In addition, they bring a new way to access remote systems ? CIM sessions. Analogous to PowerShell remoting sessions they provide a new flexibility when working with WMI and remote machines. This session will demonstrate:
 - How to use CIM sessions against systems running PowerShell v3
 - How to work with legacy installations of PowerShell v2
 - How to use the available CIM session options to configure the session to meet your requirements
 - Compare and contrast working with WMI, CIM and WSMAN cmdlets against remote machines to illustrate the strengths and weaknesses of each
 - How to mix and match CIM sessions using WSMAN and DCOM.The key takeaways from this session will be:
 - The CIM cmdlets provide a new way to access WMI
 - WSMAN is required knowledge
 - WSMAN and DCOM can both be used with the CIM cmdlets
 - CIM sessions are easy to use and very powerful
 - No more DCOM problems





                  Richard Siddaway



                  PowerShell Web Access



                  PowerShell Web Access is a new feature in Windows Server 2012 that provides a web based PowerShell console. You don't need PowerShell on your client to administer remote machines as long as you have PWA. This session will demonstrate how to configure PWA, its strengths and weaknesses – you might even see PowerShell being accessed from a non-Windows machine! The security implications of PWA will be discussed. PWA will be compared to other ways to access remote machines through PowerShell including PS Remoting and CIM sessions.





                  Richard Siddaway



                  PowerShell events



                  The PowerShell event engine enables you to work with .NET; WMI and PowerShell engine events. What are these and how do they work? What can I do with them? Want to stop a process that shouldn't be running? Want to start a process that's stopped? That's what this session will show you with PowerShell events.





                  Ed Wilson



                  Write modules, not scripts



                  Learn how to get the most from Windows PowerShell by learning a simple five-step method to transform your Windows PowerShell code into a highly reusable module. This presentation is a live demo that begins with a single line of Windows PowerShell code, transforms the code into a function, adds comment based help to the function, and converts it into a module. Next, the installation and discovery of Windows PowerShell modules is covered, as is updating the module and creating a Windows PowerShell module manifest. Ed Wilson





                  Ed Wilson



                  What I learned by grading 2000 PowerShell Scripts in the 2012 Scripting Games



                  The 2012 Scripting Games attracted both experienced and novice scripters from more than 100 countries around the world. In grading the 2000 submitted scripts, I noticed a common theme emerged. Some of the things that were consistently confused by both beginners and advanced scripters include the following: failure to return objects from functions, not creating reusable functions, spending too much duplicating capabilities of native PowerShell, using meaningless comments, omission of error handling, and an overreliance on Write-Host. In this session, I will address each of these areas of concern and show both good and bad examples from the games. A thorough discussion of each of these topics rounds out the presentation. This presentation uses live demos to illustrate the techniques that are discussed. Ed Wilson





                  Ed Wilson



                  PoshMon: PowerShell does performance counters



                  One of the cool features on Windows PowerShell 3.0 is easy consumption of WMI performance counters into Windows PowerShell. In the past, leveraging these performance counters meant writing long lines of cryptic code, calling refresher objects, and dealing with weird timestamp issues. But no more! Using a simple cmdlet, Windows PowerShell throws open the door to the treasure trove of performance counter information. But where does the oversubscribed IT pro begin? A question on my Windows NT 3.51 MCSE exam stated there are four areas for performance monitoring: disk, memory, network, and CPU. These four resources have not changed much, regardless of the application these basic areas of investigation still ring true. In this session, I talk about discovering performance counters, using performance counters, and storing information gathered from performance counters. The talk will be strengthened by live demos at each stage of the presentation.





                  Matt Wrock*



                  Unit Testing PowerShell



                  This talk will provide a walk through of Unit Testing PowerShell scripts. The OSS project Pester ([https://github.com/pester/Pester](https://github.com/pester/Pester)) will be used to illustrate popular unit testing patterns such as ArrangeActAssert and Mocking to provide testability to PowerShell. There will be discussion on why and when to use unit testing in PowerShell as well.





                Keep an eye on my blog for additional news about this conference, because more exciting news is on the way!





                Thanks,





                Kirk out.





                Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerShell Summit](http://technorati.com/tags/PowerShell+Summit)





                [![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/824/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/824/) ![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=824&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)



 [1]: http://powershellsummit.org/
