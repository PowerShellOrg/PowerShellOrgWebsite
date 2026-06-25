---
title: A look at PowerShell jobs – Part 1
authors:
  - Jonathan Walz
date: "2010-06-03T21:16:16+00:00"
aliases:
  - /2010/06/a-look-at-powershell-jobs-part-1/
---

One of the cool new features of PowerShell v2 is remoting. We"™ve talked about it several times on the podcast and it is a huge topic with many facets. One piece of PowerShell remoting is the ability to create jobs. PowerShell jobs are kicked off locally or on remote machines and exist in their own **independent** runspaces. This allows you to do things like running tasks in parallel to improve efficiency. Traditionally, in PowerShell if you want to perform an action on a list of servers (for example) you loop through the servers one at a time and you have to wait until the task is finished on the 1st server before it starts on the 2nd server and so it progresses in a serial fashion. Jobs allow you to run these tasks simultaneously.  
The job related cmdlets in PowerShell v2 are these:

  * Start-Job
  * Stop-Job
  * Get-Job
  * Wait-Job
  * Receive-Job
  * Remove-Job

I am not going to focus on the ins and outs of these cmdlets but I will be using all of them in one way or another during this blog post series.  
I"™m fascinated by the prospect of using jobs to make my scripts more efficient but my road to learning has been bumpy. I haven"™t seen anything yet that talks about jobs in the depth I"™ve needed so I want to start the ball rolling and share my findings.  
I have found that it"™s important to remember that each job runs in it"™s own **independent** runspace. I"™ve been trying to drill this into my own head and here are some consequences of that fact. Unless you take some steps we"™re going to discuss later your job will not have access to:

  * Anything in your profile
  * Any snap-ins or modules you have loaded
  * Any functions you have "loaded"
  * Any variable from any scope (local, global etc.)
  * Other things I haven"™t run into yet?

A job has no concept of it"™s context or environment. Any information you need for your job to do it"™s job has to be loaded.  
I have a script that I run periodically that deletes old user profiles from a group of virtual desktops. It takes a long time to run because it has to delete hundreds of files off of each virtual desktop. I decided I would try to use jobs to speed this up. So I wanted to create a job for each virtual desktop that would delete the correct folders for that particular desktop so I could delete files off of my virtual desktops simultaneously.  
This is where I hit my first snag. How do I get my list of directories into the job? I looked at the help file for the [Start-Job](http://technet.microsoft.com/en-us/library/dd347692.aspx) cmdlet and tried to find an example where information in a variable is passed to a job. No luck there. On to the parameter list I went. The one that looked the most promising to me was the "“InputObject parameter. This is what the help says:

> Specifies input to the command. Enter a variable that contains the objects, or type a command or expression that generates the objects.  
> In the value of the ScriptBlock parameter, use the $input automatic variable to represent the input objects.

Cool, that looked like it would do the trick for me. Now to build a job"¦  
A PowerShell job can have various parts (some of which we"™ll get to) but the first one we need to talk about is the "“ScriptBlock parameter. It does just what you think it does. It"™s where the code goes that you want to run in your job. So let"™s build a simple example that uses "“InputObject and "“ScriptBlock.


`$list

=

1

..

5


Start-Job

-InputObject

$list

-ScriptBlock

{

$list

}

`Unfortunately, it doesn"™t work that way. If you look at the documentation above from the help file it says use the $input automatic variable. Let"™s give that a try.


`$list

=

1

..

5


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

}


Wait-Job

*


Receive-Job

*


Remove-Job

*

`Here"™s the output:            
1  
2  
3  
4  
5  
_In case you were wondering "Wait-Job \*" waits for all existing jobs to complete before continuing. "Receive-Job \*" will receive the output from all jobs (that have any output.) You guessed it! "Remove-Job *" removes all existing jobs._   
Sweet! We"™re in business. Or at least that"™s what I thought until I started to do some actual work. This does what I would expect"¦


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

}


wait-job

*


receive-job

*


remove-job

*

`Returns:  
PSPath            : Microsoft.PowerShell.CoreFileSystem::C:Userse42793.imindmap  
PSParentPath      : Microsoft.PowerShell.CoreFileSystem::C:Userse42793  
PSChildName       : .imindmap  
PSDrive           : C  
PSProvider        : Microsoft.PowerShell.CoreFileSystem  
PSIsContainer     : True  
Mode              : d\----  
Name              : .imindmap  
Parent            : e42793  
Exists            : True  
Root              : C:  
FullName          : C:Userse42793.imindmap  
Extension         : .imindmap  
CreationTime      : 3/30/2009 10:18:08 AM  
CreationTimeUtc   : 3/30/2009 2:18:08 PM  
LastAccessTime    : 12/1/2009 10:23:12 AM  
LastAccessTimeUtc : 12/1/2009 3:23:12 PM  
LastWriteTime     : 12/1/2009 10:23:12 AM  
LastWriteTimeUtc  : 12/1/2009 3:23:12 PM  
Attributes        : Directory, NotContentIndexed  
PSPath            : Microsoft.PowerShell.CoreFileSystem::C:Userse42793B35ABFD8A0A842348EC0B194B2098055.TMP  
PSParentPath      : Microsoft.PowerShell.CoreFileSystem::C:Userse42793  
PSChildName       : B35ABFD8A0A842348EC0B194B2098055.TMP  
PSDrive           : C  
PSProvider        : Microsoft.PowerShell.CoreFileSystem  
PSIsContainer     : True  
Mode              : d\----  
Name              : B35ABFD8A0A842348EC0B194B2098055.TMP  
Parent            : e42793  
Exists            : True  
Root              : C:  
FullName          : C:Userse42793B35ABFD8A0A842348EC0B194B2098055.TMP  
Extension         : .TMP  
CreationTime      : 3/20/2009 11:21:54 AM  
CreationTimeUtc   : 3/20/2009 3:21:54 PM  
LastAccessTime    : 12/1/2009 10:23:21 AM  
LastAccessTimeUtc : 12/1/2009 3:23:21 PM  
LastWriteTime     : 12/1/2009 10:23:21 AM  
LastWriteTimeUtc  : 12/1/2009 3:23:21 PM  
Attributes        : Directory, NotContentIndexed  
Etc. Etc. You get the idea. What I really need though is the FullName property. This is where things get weird. Check this out:


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

|

foreach

{

$_

.

Fullname

}

}


wait-job

*


receive-job

*


remove-job

*

`Returns nothing from the job. Crazy. So what is $_? I would expect it to be a DirectoryInfo object. Let"™s check it out.


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

|

foreach

{

$_

.

gettype

(

)

}

}


wait-job

*


receive-job

*


remove-job

*

`Returns:  
RunspaceId                : 8d57fad2-dfc1-4895-a986-6ea6b53ffc8d  
Module                    : CommonLanguageRuntimeLibrary  
Assembly                  : mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089  
TypeHandle                : System.RuntimeTypeHandle  
BaseType                  : System.Object  
UnderlyingSystemType      : System.Collections.ArrayList  
**FullName                  : System.Collections.ArrayList**  
AssemblyQualifiedName     : System.Collections.ArrayList, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089  
Namespace                 : System.Collections  
I cut out the rest of the output but you can see that $_ is an array. Well, if $_ is an array than what was $input?


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

.

gettype

(

)

.

Fullname

}


wait-job

*


receive-job

*


remove-job

*

`Returns:  
System.Management.Automation.Runspaces.PipelineReader`1+d__0[[System.Object, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]  
That"™s cute, so if I pipe $input to something I get an array. Maybe this will work"¦


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$input

|

%

{

$_

}

|

%

{

$_

.

fullname

}

}


wait-job

*


receive-job

*


remove-job

*

`Returns:  
C:Userse42793.imindmap  
C:Userse42793B35ABFD8A0A842348EC0B194B2098055.TMP  
C:Userse42793Bluetooth Software  
C:Userse42793Contacts  
C:Userse42793Desktop  
C:Userse42793Documents  
C:Userse42793DownloadDirector  
C:Userse42793Downloads  
C:Userse42793Favorites  
C:Userse42793Links  
So that worked but it"™s got to be one of the strangest work-arounds I"™ve done. There is at least one other way to get around this problem and it looks like this:


`$list

=

Get-ChildItem

|

Select

-First

10


Start-Job

-InputObject

$list

-ScriptBlock

{

$Input

.

'<>4__this'

.

read

(

)

|

%

{

$_

.

fullname

}

}


wait-job

*


receive-job

*


remove-job

*

`Returns the same output as the code above. This solution was sent to me by Robert Robelo and [I"™ll let him explain it to you](http://robertrobelo.spaces.live.com/blog/cns!1D7FE2F4A61D31E1!291.entry).  
That"™s all I"™ve got for part 1. I can"™t say for sure when I"™ll have part 2 finished but we"™ll mention it on the podcast if you are a listener.  
-Jonathan Walz
