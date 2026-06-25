---
title: A Helpful Message about HelpMessage
authors:
  - June Blender
date: "2013-05-06T23:39:21+00:00"
aliases:
  - /2013/05/a-helpful-message-about-helpmessage/
---

The Scripting Games 2013 winners have not yet been announced, but for the 3rd year running, I'm in the lead for the "Learned Most from the Scripting Games" award. I'm making space for the prize on my bookshelf. Seriously, I play with PowerShell all the time and read lots of blogs, but nothing compares to looking at dozens of scripts and commands and seeing how people do things in the real world.  
One of the practices I've noticed is use of the [HelpMessage parameter attribute][1] to document a parameter. It's a real thing, but I didn't know that anyone used it any more.  
Here's my help message about HelpMessage:  
**Don't use it!** Users can't see it. It does no harm, but it has no value. Danger lurks in writing a HelpMessage instead of writing help that users can see. Write help that Get-Help gets, that is, XML help or comment-based help.  
Here's what I'm talking about. This code is valid. The language permits it. But it's not useful. And I saw it in several of the advanced solutions.


`function Get-PowerShellLog
{
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory=$true, HelpMessage="Your message goes here")]
        $InstanceID
    )
    Get-Eventlog -LogName "Windows PowerShell" -InstanceId $InstanceID
}
`But Get-Help doesn't get the HelpMessage string.  
There are two ways for the user to see this help message. Here's one way. These commands get the value of the HelpMessage property of the parameter. I don't think people run commands like these very often, but I don't get out much.


`#Windows PowerShell 3.0
C:\> ((Get-Command Get-PowerShellLog).ParameterSets.Parameters |
           Where-Object Name -eq InstanceId).HelpMessage
Your message goes here
#Windows PowerShell 2.0
C:\> ((Get-Command Get-PowerShellLog).ParameterSets |
         Foreach {$_.Parameters} |
         Where-Object {$_.Name -eq InstanceId).HelpMessage
Your message goes here
`Here's the other way. It works only on mandatory (required) parameters. When you omit a mandatory parameter, you get a message like this one:


`PS C:\> Get-PowerShellLog
cmdlet Get-PowerShellLog at command pipeline position 1
Supply values for the following parameters:
(Type !? for Help.)
InstanceID:
`And then you type "!?" to get the HelpMessage value.


`InstanceID: !?
Your message goes here
`You've never done that? Me neither!  
To get a sense of how often HelpMessage is used, I played Nate Silver with Kim's famous test server. My dear friend, Kim Ditto, is famous for many things -- she's a fabulous person and a renowned Microsoft Certified Trainer -- but, in addition, she set up and maintains a test server on which she's installed almost all of the Windows PowerShell modules from Microsoft. I could not live without Kim's test server.  
Here are the results. Out of 2468 commands with 8471 parameters, 8 have the HelpMessage attribute and none are mandatory, so the HelpMessage is _NEVER DISPLAYED_ unless you go hunting for it.


`# How many commands?
PS C:\> Invoke-Command -Session $s {(Get-Command).Count}
2468
# How many parameters?
PS C:\> $a = Invoke-Command -Session $s `
        {(Get-Command).ParameterSets.Parameters.Count}
8471
# How many parameters have HelpMessage?
PS C:\> Invoke-Command -Session $s `
       {((Get-Command).ParameterSets.Parameters | where HelpMessage).Count}
8
# How many of the parameters with HelpMessage are mandatory?
PS C:\> Invoke-Command -Session $s `
        {((Get-Command).ParameterSets.Parameters |
          where HelpMessage -and isMandatory).Count}
0
`If you want to be helpful, the correct way to provide help for a parameter in a script or function is this:


`<#
.PARAMETER  InstanceId
 Specifies the instance IDs of events in the
 event log. Get-PowerShellLog gets only logs
 with the specified ID.
#>
`Or, this:


`[Parameter(Mandatory=$true, HelpMessage="Your message goes here")]
# Specifies the instance IDs of events in the
# event log. Get-PowerShellLog gets only logs
# with the specified ID.
$InstanceID
`Hope that's helpful.

 [1]: http://msdn.microsoft.com/en-us/library/windows/desktop/system.management.automation.parameterattribute.helpmessage(v=vs.85).aspx
