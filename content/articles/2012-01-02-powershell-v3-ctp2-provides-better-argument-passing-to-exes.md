---
title: PowerShell V3 CTP2 Provides Better Argument Passing to EXEs
authors:
  - Keith Hill
date: "2012-01-02T19:56:23+00:00"
aliases:
  - /2012/01/powershell-v3-ctp2-provides-better-argument-passing-to-exes/
---

Within PowerShell it has always been easy to pass "simple" arguments to an EXE e.g.:



`C:\PS> ipconfig -all
`However passing arguments to certain exes can become surprising difficult when their command line parameter syntax is complex i.e. they require quotes and use special PowerShell characters such as @ $ ;.  A lot of these problems can be solved by placing single or double quotes in the right places or by escaping PowerShell"™s special characters e.g.:



`C:\PS> tf.exe status . /workspace:HILLR1;hillr /r
There are no pending changes.
The term 'hillr' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the
spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:35
+ tf.exe status . /workspace:HILLR1;hillr /r
+                                   ~~~~~
    + CategoryInfo          : ObjectNotFound: (hillr:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
`Note that in the command line above the "/workspace" parameter value is specified using a special syntax that TF.exe recognizes i.e. ;.  Unfortunately the semicolon is a statement separator in PowerShell which means that TF.exe only sees the parameters before the semicolon.  We can use the ECHOARGS.exe utility from the [PowerShell Community Extensions][1] to verify this:



`C:\PS> echoargs.exe status . /workspace:HILLR1;hillr /r
Arg 0 is 
Arg 1 is <.>
Arg 2 is 
`In this case, the solution is simple "“ just escape the semicolon e.g.:



`C:\PS> tf.exe status . /r /workspace:HILLR1`;hillr
File name     Change Local path
------------- ------ -----------------------------------------
$/Foo/Trunk/Tools/Bin
TfsTools.psm1 edit   C:\Tfs\Foo\Trunk\Tools\Bin\TfsTools.psm1
1 change(s)
`This works up to the point where you get quite frustrated figuring out which characters to escape and which parameter/argument pairs need to be quoted and whether you should use single quotes or double quotes.  Fortunately, it looks like we will get a way to tell the PowerShell argument parser to stop doing so much work for us and just pass the args through "as-is".  In other words, you can tell PowerShell to become a "dumber" command line parser.  This mode is invoked using the character sequence: "“% and it works from the point it appears on the command line to the end of that line.  Note that the character sequence may change or the feature could be completely removed before V3 ships.

Given this new feature, here"™s how you use it.  Take this example of a problematic set of command line parameters:



`C:\PS> sqlcmd -S .\SQLEXPRESS -v lname="Gates" -Q "SELECT FirstName,LastName FROM
AdventureWorks.Person.Contact WHERE LastName = '$(lname)'"
The term 'lname' is not recognized as the name of a cmdlet, function, script
file, or operable program. Check the spelling of the name, or if a path was
included, verify that the path is correct and try again.
At line:1 char:126
+ ...  LastName = '$(lname)'"
+                    ~~~~~
    + CategoryInfo          : ObjectNotFound: (lname:String) [], CommandNotFou
   ndException
    + FullyQualifiedErrorId : CommandNotFoundException
`In this case the V2 solution is to escape the $ character in the last part of the command line e.g.: '`$(lname)' but if you don"™t want to spend the time to figure this out you can easily use –% like so:



`C:\PS> sqlcmd --% -S .\SQLEXPRESS -v lname="Gates" -Q "SELECT FirstName,LastName F
ROM AdventureWorks.Person.Contact WHERE LastName = '$(lname)'"
FirstName                                          LastName
---------------------------------- -----------------------------------
Janet                              Gates
(1 rows affected)
`You can put the –% later in the parameter list if you want.  You might want to do this if you need to use PowerShell variable expansion in some of the arguments.  Just note that once you specify –% the rest of the command line will be parsed "dumbly".  You will get no PowerShell variable expansion or grouping expressions and you won"™t be able to escape newlines.  One thing you can do in this special parsing mode is expand environment variables using the batch syntax of %ENV_VAR% e.g.:



`C:\PS> $env:colname = "LastName"
C:\PS> sqlcmd -S .\SQLEXPRESS -v lname="Gates" --% -Q "SELECT FirstName,LastName F
ROM AdventureWorks.Person.Contact WHERE %colname% = '$(lname)'"
FirstName                                          LastName
---------------------------------- -----------------------------------
Janet                              Gates
(1 rows affected)
`I believe this new command line parsing feature will greatly simplify interacting with exes that have a complex command line parameter syntax.  Thanks to the PowerShell team for listening to the [community feedback on this issue](https://connect.microsoft.com/PowerShell/feedback/details/376207/executing-commands-which-require-quotes-and-variables-is-practically-impossible) and providing a solution.


[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/241/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/241/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=241&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)

 [1]: http://pscx.codeplex.com/
