---
title: Working with PowershellGallery
authors:
  - Jonas Sommer Nielsen
date: "2015-09-11T13:34:23+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/09/working-with-powershellgallery/
---

After my two first posts ([Multithreading using jobs][1], [List users logged on to your machines][2]) where I mentioned [PowershellGallery.com][3] a few times and after [Warren talked about the Gallery a few days ago][4] I felt like digging a little deeper to see if I was actually doing it right.

So I wrote them an email and this was their reply:

 --------------------------


  *"Hi Jonas – The “limited preview” designation on the PowerShell Gallery is because we are doing significant development to the site.* * However, there is nothing about that status which should prevent you from sharing your code. *


_A couple of things you will want to consider as you get ready to publish to the Gallery:_

  * _You will want to scan your modules with PSSCriptAnalyzer (see <http://www.powershellgallery.com/packages/PSScriptAnalyzer/>), as we scan all modules that have been posted with that tool. Anything flagged as an “error” must be corrected, things flagged as “warnings” should be fixed._
  * _Most submitters have a project site on GitHub, or something of that nature, that they link to from the Gallery. That allows them to get feedback on what they have submitted, & it’s something we would recommend._


  *Hope this helps –* * The PowerShell Gallery Operations Team"*


   --------------------------


  Really nice feedback. To the commandline.


  [![Install-PSScriptAnalyzer.a](https://powershell.org/wp-content/uploads/2015/09/Install-PSScriptAnalyzer.a.png)](https://powershell.org/wp-content/uploads/2015/09/Install-PSScriptAnalyzer.a.png)


  Installing the analyser is a breeze, suddenly I have two new commands. Lets try out the analyzer and see what it can do.


  [![2015-09-10 (1)](https://powershell.org/wp-content/uploads/2015/09/2015-09-10-1.png)](https://powershell.org/wp-content/uploads/2015/09/2015-09-10-1.png)


  Unfortunately the help on my machine is not updated, but the online version seems to be updated.


`help Invoke-ScriptAnalyzer -online
`This goes to the [online version](http://go.microsoft.com/fwlink/?LinkId=525914). Also from the [PowerShell Gallery PSScriptAnalyzer site](http://www.powershellgallery.com/packages/PSScriptAnalyzer/) there is a link to the [Project Site at GitHub.](https://github.com/PowerShell/PSScriptAnalyzer/) 


  [![ScriptAnalyzer-start-multithread](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.png)](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.png)


  This is kind of neat and it looks like I only have one warning, though 6 times.


  ***"Cmdlet 'Write-Verbose' has positional parameter. Please use named parameters instead of positional parameters when calling a command."***


  Opening the same file in ISE  looking at line 92 and running the script analyser


  [![ScriptAnalyzer-start-multithread.ise.slim](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.ise_.slim_.png)](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.ise_.slim_.png)


  The help from Write-Verbose tells me that they are referring to the -Message parameter.


  [![help-write-verbose](https://powershell.org/wp-content/uploads/2015/09/help-write-verbose.png)](https://powershell.org/wp-content/uploads/2015/09/help-write-verbose.png)


That looks like a pretty easy fix. Going through the file and fixing the 6 warnings and suddenly there are none left.

[![ScriptAnalyzer-start-multithread.ise.fixed](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.ise_.fixed_.png)](https://powershell.org/wp-content/uploads/2015/09/ScriptAnalyzer-start-multithread.ise_.fixed_.png)

I'm sure the fact that there weren't more errors was mostly due to dumb luck combined with me testing [ISESteroids][5] at the time of writing. (Side note: Try it out. **Install-Module ISESteroids.** It is really AWSOME or quoting Tim Cook; It's AMAZING) ISESteroids is an add-on for ISE which adds some neat stuff like highlighting errors in the code but that's a subject for some other day. Let's just say it saved my behind this time.

[![github.update](https://powershell.org/wp-content/uploads/2015/09/github.update.png)](https://powershell.org/wp-content/uploads/2015/09/github.update.png)

Now that really wasn't too bad. To update the code on PowerShellGallery I need to increment the version of the module. This is done in the manifest file .psd1.

[![update-version](https://powershell.org/wp-content/uploads/2015/09/update-version.png)](https://powershell.org/wp-content/uploads/2015/09/update-version.png)

Now I can update the module by running the command from the [Publish Module][6] page


`PS> Publish-Module -Name  -NuGetApiKey
`[![publish-module](https://powershell.org/wp-content/uploads/2015/09/publish-module.png)](https://powershell.org/wp-content/uploads/2015/09/publish-module.png)

Now the code is accessible to all .... And there was [much rejoicing][7]. 

## Looking a little closer at the ScriptAnalyzer

Lets see what the help says. 

#### Invoke-ScriptAnalyzer

_"Parameter Set: Default_  _Invoke-ScriptAnalyzer [-Path]  [-CustomizedRulePath  ] [-
ExcludeRule 
 ] [-
IncludeRule
  ] [-LoggerPath  ] [-Recurse] [-
Severity
  ] [ ]_

_Detailed Description_  _Invoke-ScriptAnalyzer starts analyzing one or more specified scripts by using ScriptAnalyzer, evaluating your scripts against a set of best practice measures called rules. ScriptAnalyzer works by evaluating scripts against either all available rules, or against a set of rules that you specify by adding the ExcludeRule or IncludeRule parameters. After ScriptAnalyzer finishes evaluating your scripts, it displays results in the console window."_

Looks like IncludeRule and ExcludeRule parameters are straight forward. To get a list of rules and their descriptions Get-ScriptAnalyzerRule is very helpful.

#### Get-ScriptAnalyzerRule

Parameter Set: Default Get-ScriptAnalyzerRule [-CustomizedRulePath  ] [-Name  ] [-Severity  ] [ ]

[![Get-ScriptAnalyzerRule](https://powershell.org/wp-content/uploads/2015/09/Get-ScriptAnalyzerRule.png)](https://powershell.org/wp-content/uploads/2015/09/Get-ScriptAnalyzerRule.png)

The output gives us much useful information, severity level and a nice description of each rule.

## More

PowerShellGallery.org has a nice [GettingStarted][8] page. 

## ps.

Remember PowerShell Summit Europe starts Monday. Check out the [Event Schedule][9] and I hope to see you there. If on the other hand you're missing out check out these videos from [PowerShell Summit North America 2015][10].





#### Contact me

Twitter [@mrhvid][11]  
Web [Jonas.SommerNielsen.dk][12]

 [1]: https://powershell.org/2015/08/20/multithreading-using-jobs/
 [2]: https://powershell.org/2015/08/28/list-users-logged-on-to-your-machines/
 [3]: http://www.PowershellGallery.com
 [4]: https://powershell.org/2015/09/06/writing-and-publishing-powershell-modules/
 [5]: http://www.powertheshell.com/isesteroids/
 [6]: https://www.powershellgallery.com/packages/upload
 [7]: https://www.youtube.com/watch?v=GjjZGyYcH9E
 [8]: https://www.powershellgallery.com/pages/GettingStarted
 [9]: https://eventmgr.azurewebsites.net/event/home/PSEU15
 [10]: https://www.youtube.com/playlist?list=PLfeA8kIs7CochwcgX9zOWxh4IL3GoG05P
 [11]: https://twitter.com/mrhvid
 [12]: http://Jonas.SommerNielsen.dk
