---
title: Recap of the Dec 2015 PowerShell Editor Services Hack Week
authors:
  - David Wilson
date: "2015-12-16T01:30:17+00:00"
categories:
  - Events
  - PowerShell for Developers
  - Tools
aliases:
  - /2015/12/recap-of-the-dec-2015-powershell-editor-services-hack-week/
---

Thanks to all those who participated in the PowerShell Editor Services Hack Week last week!  Much progress was made on fixing bugs and adding new features to both [PowerShell Editor Services][1] and the [PowerShell extension for Visual Studio Code][2].  Here's a quick summary of the contributions that were made during the week:  
**Variable Display Improvements in the Debugger**  
[Keith Hill][3] made many great improvements to how we display variable contents in the Visual Studio Code debugger.  First of all, he added support for variable scopes other than just "Local" as we had before.  You can now inspect variables from both the Global and Script scopes.  You will also see a special "Auto" section which filters the set of variables down to those that were defined in the current scope.  This is really helpful for quickly checking the state of the variables in your functions!  
[![keith_auto](https://powershell.org/wp-content/uploads/2015/12/keith_auto.png)](https://powershell.org/wp-content/uploads/2015/12/keith_auto.png)  
He also added greatly improved the variable value display for collections such as arrays and dictionaries and also objects which implement the ToString() method in .NET.  You will now see much greater detail for these variables in the debugger:  
[![keith_vars](https://powershell.org/wp-content/uploads/2015/12/keith_vars.png)](https://powershell.org/wp-content/uploads/2015/12/keith_vars.png)  
**New Expand Aliases Command**  
[Doug Finke][4] contributed a new "Expand Aliases" command which searches your script file or selection for the use of cmdlet aliases.  For any alias it finds, it replaces the text with the full command name.  This is helpful for developers who want to quickly write out scripts using aliases but resolve them to their command names before committing to source control.  
Here's a GIF of the feature in action (click to play!):  
[![Demo of Expand Alias in VS Code](https://powershell.org/wp-content/uploads/2015/12/vscodeExpandAlias2-628x360.gif)](https://powershell.org/wp-content/uploads/2015/12/vscodeExpandAlias2.gif)  
**Sublime Text Editor Integration**  
Work on the integration of PowerShell Editor Services in Sublime Text has progressed quite well this week.  The basic protocol implementation is now working, enabling language features to be integrated over time.  I've also implemented basic file management support so that opened files are sent to Editor Services for syntax checking and semantic analysis.  From this point it's just a matter of integrating the language features of PowerShell Editor Services into Sublime's UI using its [plugin API][5].  
Check out the current code in the [editor-services branch of my fork][6] of the PowerShell Sublime Text package.  Once this effort is stable enough for an initial release, I'll be submitting a PR back to the [original PowerShell Sublime Text package repo][7] and future work will continue there.  
**Atom Editor Integration**  
Some work was started on an integration with the Atom editor but it was quickly determine that Atom's APIs for language features were to sparse to make quick progress.  However, with the experience gained from the Sublime Text integration, future work on the Atom integration should be much easier.  Expect to see more effort in this area in the first half of 2016.  
**Miscellaneous Improvements**

  * [Mateusz Świetlicki][8] improved the "Run Selection" command so that it will run the line that the user's cursor is sitting on if there is no text selection
  * The default set of Script Analyzer rules used for semantic analysis has been reduced to provide helpful hints without giving too much feedback.  (In the future the rule set will be completely configurable.)
  * A set of bugs around code completion text replacements were fixed so that using IntelliSense no longer eats your code 🙂

**New Releases**  
As promised, I've prepared new releases of both PowerShell Editor Services and the PowerShell extension for Visual Studio Code which contain all of the contributions made during these week.  The new NuGet packages for PowerShell Editor Services have been released on NuGet today (see the following changelog link).  The Visual Studio Code extension will be released once a publishing issue has been resolved.  
Here are the changelog entries for both releases:

  * [PowerShell Editor Services 0.3.0][9]
  * [PowerShell for Visual Studio Code 0.3.0][10]

**Looking Ahead**  
Overall I am very impressed with the work that we accomplished this week even though there wasn't a large amount of contributors.  My guess is that PowerShell fans would feel more comfortable contributing by writing PowerShell rather than C#.  I've got some ideas on how to make this possible in the future so keep an eye out for another Hack Week next year!  
Thanks again to all the contributors and to all the users of these projects!

 [1]: https://github.com/PowerShell/PowerShellEditorServices
 [2]: https://github.com/PowerShell/vscode-powershell
 [3]: https://twitter.com/r_keith_hill
 [4]: https://twitter.com/dfinke
 [5]: http://www.sublimetext.com/docs/3/api_reference.html
 [6]: https://github.com/daviwil/SublimePowerShell/tree/editor-services
 [7]: https://github.com/SublimeText/PowerShell
 [8]: https://github.com/mswietlicki
 [9]: https://github.com/PowerShell/PowerShellEditorServices/blob/master/CHANGELOG.md#030
 [10]: https://github.com/PowerShell/vscode-powershell/blob/master/CHANGELOG.md#030
