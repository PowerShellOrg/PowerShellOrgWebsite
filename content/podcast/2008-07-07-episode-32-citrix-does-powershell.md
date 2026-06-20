---
title: "Episode 32 \"“ Citrix does PowerShell"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-07-07T12:19:18+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-032.mp3"
aliases:
  - /2008/07/episode-32-citrix-does-powershell/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

We have a great show lined up for you today.  We're interviewing Peter Schulz with Citrix to talk about their PowerShell product Workflow Studio.  And as always: News, Resources, Tips, and more!

### News

_Today's news is brought to you by SAPIEN Technologies._

  * [Windows PowerShell : IIS7 PowerShell Provider Tech Preview 2][2].  What's new with TP2? 
      * IIS7 Powershell provider now supports SSL (installing and acquiring a certificate, creating an ssl site binding)
      * Tech Preview 2 ships with 40 new cmdlets.
  * PowerGUI hit a major milestone in [surpassing 100,000 downloads!][3]
  * From the GPO Guy: [New Version of GPMC PowerShell Cmdlets Released!][4] 
      * This new version represents a significant updgrade to the existing cmdlets. The biggest change is that we incorporated new functionality that became available in the version of GPMC that shipped with Vista, SP1 and Windows Server 2008.
  * Sapien has released [build 567 of PrimalScript 2007][5]. New features include: 
      * PowerShell Debugger now integrated into Professional and Enterprise Editions
      * PrimalSense for PowerShell operators
      * Parameter prompting for PowerShell scripts
  * A new version of the [GPMC PowerShell Cmdlets has been released][4]

### Interview

_This interview is brought to you by iTripoli.  
"Admin Script Editor provides a true integrated scripting environment for PowerShell.  Advanced features include an integrated PowerShell debugger, advanced code generating tools for Active Directory, Databases, XML files and the exclusive PowerShell forms designer.  Come see for yourself-- Admin Script Editor v3.5 is availble for a 45 day trial at AdminScriptEditor.com."  
_  
Our interview today is with Peter Schulz from Citrix.  Enjoy.  Here's our notes from the conversation:

  1. Intro 
      1. Peter Schulz has been with Citrix for over 8 years in Consulting, Engineering, Product Marketing, and is now the Technical Product Manager for Citrix Workflow Studio, a new IT Process Automation tool that is currently available as a technology preview.
      2. Background
      3. PowerShell's adoption inside Citrix
  2. Workflow Studio 
      1. Background / Why the acquisition?
      2. Features 
          1. Overview
          2. Built-in tasks 
              1. How are these made?
              2. Can a user create new ones?
              3. How often will Citrix be updating them?
              4. Selected Categories / tasks 
                  1. AD: Create Random Password
                  2. input/output: user choice
                  3. flow control: split task
          3. Can workflows be executed on remote systems directly?
          4. You can double-click on a task and you drill down into a function?  How does this work?
      3. Will the product remain free? 
          1. There will always be a free version similar to what is in the tech preview now.  The commercial version will of course have more stuff in it.
      4. Ship date? 
          1. Second half of this year
      5. How are customers using it so far?
      6. Vision / future plans 
          1. .net 3.5
  3. For more information? 
      1. Peter's blog: <http://community.citrix.com/blogs/citrite/petersc>
      2. Workflow Studio download link: <http://citrix.com/wfsinsider>
      3. Community page: <http://community.citrix.com/display/cdn/Citrix+Workflow+Studio>

### Resources

_Do you have what it takes to be the ultimate script warrior? Find out with Quest"™s PowerPack Challenge "™08._  
_Quest Software is sponsoring a PowerShell Scripting contest where you can test your skills and get paid. Just create some cool PowerShell scripts using Quest"™s PowerGUI and then post them to our site. You"™ll get a score and our celebrity judges will weigh in as well._  
_Do you have the muscle to bring home the prize? Check out the details_ [_here_][6]_._ 

  * Don Jones gives a great illustration of [how the pipeline works][7] in this month's TechNet Magazine
  * Jon Noble points us out to [Updated PowerShell resources from TechNet Script Center][8] 
      * Two of the more comprehensive resources on Script Center have just been updated, the [PowerShell Owner's Manual][9] and the [Vbscript to PowerShell conversion guide][10].
  * And Jaykul from HuddledMasses.org has posted [part two of the powershell profile article][11] we mentioned last week.
  * Oisin brings us a script that will [resolve all Aliases in a script][12]. Uses CTP2 tokenizer

### Tips 

  * Variable expansion in strings. We've talked about it before, but I saw someone fighting with it just yesterday. 
      * "$object.parameter something else" does not work. Use "$($object.parameter) something else" instead
  * From Poshoholic: [Essential PowerShell: Name your custom object types][13] 
      * One important thing that is often overlooked when people are writing scripts that do this is that they can also give those objects a type name.
  * Sepeck on the #PowerShell IRC channel (irc.freenode.net) shared a link with us [about his experiences with PowerShell help files][14].  It's a good before-and-after story with a lesson.  :)  He links to one of [Don Jones' articles][15] with further advice on the topic.

### One-Liner

  * [system.directoryservices.activedirectory.domain]::GetCurrentDomain().DomainControllers | fl Name

   
A big thanks to Peter Schulz for coming on the show tonight.  We're looking forward to interviewing the Kirk and Dmitry from the PowerGUI team.  Send in your questions!  As always, you can contact the show by email to .  You can also leave us reviews on iTunes and comments on the blog.  Don't forget to check out Quest's contest details at [quest.com/powerscripting][6].  
Other ways to interact with us: [Facebook Group][16] (forums, networking), Twitter ([jonwalz][17] & [halr9000][18])

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-032.mp3
 [2]: http://blogs.msdn.com/powershell/archive/2008/07/03/iis7-powershell-provider-tech-preview-2.aspx
 [3]: http://poshoholic.com/2008/07/02/powergui-hits-100000-downloads/
 [4]: http://sdmsoftware.com/blog/2008/07/new_version_of_gpmc_powershell.html
 [5]: http://blog.sapien.com/index.php/2008/06/24/primalscript-build-567-released/
 [6]: http://quest.com/powerscripting
 [7]: http://technet.microsoft.com/en-us/magazine/cc644947.aspx
 [8]: http://jonoble.spaces.live.com/Blog/cns%21CC73D8744F0894A5%21613.entry
 [9]: http://www.microsoft.com/technet/scriptcenter/topics/winpsh/manual/default.mspx
 [10]: http://www.microsoft.com/technet/scriptcenter/topics/winpsh/convert/default.mspx
 [11]: http://huddledmasses.org/getting-started-with-powershell-2-part-2/
 [12]: http://www.nivot.org/2008/07/01/PSParserTricks1NdashResolveAllAliasesToDefinitionsInAScript.aspx
 [13]: http://poshoholic.com/2008/07/03/essential-powershell-name-your-custom-object-types/
 [14]: http://www.blkmtn.org/reading-help-files
 [15]: http://concentratedtech.com/content/index.php/2008/05/23/fun-wmi-trick-proves-you-should-read-the-help/
 [16]: http://www.facebook.com/group.php?gid=7033985478
 [17]: http://twitter.com/jonwalz
 [18]: http://twitter.com/halr9000
