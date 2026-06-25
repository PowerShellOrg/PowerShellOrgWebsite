---
title: How to Name Your Help Files
authors:
  - June Blender
date: "2013-04-30T22:42:53+00:00"
aliases:
  - /2013/04/how-to-name-your-help-files/
---

The first challenge of Scripting Games 2013 is complete! Honestly, you win by getting the experience of playing. I hope everyone is in there voting and writing really constructive comments. I'll get over there in a minute, but I wanted to make sure that I got this information out to everyone before I get involved in voting.  
Everyone who writes shared Windows PowerShell cmdlets, functions, scripts, CIM commands, and workflows also writes help topics "“ or gets a friend or colleague to do it.  
For scripts and functions, you can write [comment-based help][1] (aka "inline help").  All parameters of the Get-Help cmdlet support comment-based help, including the new ShowWindow parameter, and by adding a URL to the first related link, you can support the Online parameter in comment-based help.  
But XML help files are required to document cmdlets (C#), CIM commands, and workflows, and to support Updatable Help. If you're delivering your content in a module, you typically want to use XML-based help topics.  
When you create XML-based help topics, you need to put them where Get-Help looks and give them the name that Get-Help expects. Otherwise, Get-Help will not find the help topic.  
Get-Help looks for the XML-based help topics for the commands in a module in language-specific subdirectories of the module's installation directory.  This is generally well-known and an easy instruction to follow.  
The naming guidelines are a bit trickier. In general (specifics follow), Get-Help expects the help topic for a command to be in a help file that is named for the file in which the command is defined, including the file name extension. When the commands in a module are defined in multiple assemblies or multiple CDXML files, the module must include a separate help file for each assembly or CDXML file.  
The help file name format is: **-help.xml**  
For example:

  * System.Management.Automation.dll-help.xml    #Cmdlets, providers
  * MSFT_NetIPAddress.cdxml-help.xml             # CIM commands
  * RemoteDesktop.psm1-help.xml                  # Functions, Script workflows

Here are the specifics:

  * **Cmdlets**:  Help topics for cmdlets must be in a file that is named for the _assembly_ in which the cmdlet is defined.
  * **Providers**:  Just like cmdlets, the help topics for providers must be in a file that is named for the assembly in which the provider is defined. The order in which cmdlet and provider help topics appear in the XML file doesn't matter a bit.
  * **CIM Commands**: Help topics for CIM commands must be in a file that is named for the CDXML file in which the cmdlet is defined. Yup, if you have a module with 22 nested CIM modules, each with its own CDXML file, you need to create 22 CDXML-help.xml files. J

Easy, right? Now it gets a bit weird.

  * **Script workflows**: You can write XML help files for script workflows in modules. The names don't matter. Get-Help looks in all XML files in the language-specific subdirectories of the module directory. However, to be consistent, it's best to name script workflow help files for the script module in which they are defined. For example, .psm1-help.xml.
  * **Functions**:  Get-Help looks in the function code for an **.ExternalHelp** comment. The value of the comment is the help file name. If there's no ExternalHelp comment, Get-Help cannot find the XML based help file, no matter where it is or what it's named.Get-Help does not require a particular name for function help files, but they're typically named for the script module in which they are defined, such as MyModule.psm1-help.xml.For example: 

`Function MyFunction
{
    #.ExternalHelp MyModule.psm1-help.xml
    [CmdletBinding()]
    [OutputType([int])]
    Param . . .
}
`-or


`#.ExternalHelp MyModule.psm1-help.xml
Function MyFunction
{
    [CmdletBinding()]
    [OutputType([int])]
    Param . . .
}
`If your module contains cmdlets and functions, you can put all of your help topics in the same XML file, but each function must include an ExternalHelp comment with the name of the XML help file. 


That's the story. So, if you are writing XML help files, be sure that the name and placement of the help files is correct. If you're stuck, ping me on Facebook or Twitter (@juneb_get_help) and I'll give you a hand.

 [1]: http://go.microsoft.com/fwlink/?LinkID=144309
