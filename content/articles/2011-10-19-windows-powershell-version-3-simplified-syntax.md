---
title: Windows PowerShell Version 3 Simplified Syntax
authors:
  - Keith Hill
date: "2011-10-20T00:44:42+00:00"
aliases:
  - /2011/10/windows-powershell-version-3-simplified-syntax/
---

Windows PowerShell version 3 introduces a simplified syntax for the Where-Object and Foreach-Object cmdlets.  The simplified syntax shown below, eliminates the curly braces as well as the need for the special variable $_.







`C:\PS> Get-Process | Where PM -gt 100MB
...
C:\PS> Get-Process | Foreach Name
...
`The intent of this "syntax" is to make it easier for folks get started with PowerShell.  Compared to the commands below, I can see the value of the simplified syntax:







`C:\PS> Get-Process | Where {$_.PM -gt 100MB}
...
C:\PS> Get-Process | Foreach {$_.Name}
...
`When folks are first learning PowerShell, the special variable $_ is one of those mental model hurdles they have to get over.  The simplified syntax feature of V3 seems to generate a fair amount of controversy (is it really necessary, doesn"™t this just complicate things more, etc).  Regardless of where you stand on the simplified syntax it is useful to understand how it works.

Given that it appears to be a simplified expression syntax you might think this required a change to the PowerShell parser"™s grammar but you would be wrong.  It turns out that the simplified syntax is implemented by additional parameter sets "“ lots of additional parameter sets. In fact, for every operator supported, there is an additional parameter set to support that operator.  Let"™s see this with the Where-Object cmdlet by listing out all of its parameter set names:



`C:\PS> Get-Command Where-Object | Select -Expand ParameterSets | Format-Table Name
Name
----
EqualSet
ScriptBlockSet
CaseSensitiveGreaterThanSet
CaseSensitiveNotEqualSet
LessThanSet
CaseSensitiveEqualSet
NotEqualSet
GreaterThanSet
CaseSensitiveLessThanSet
GreaterOrEqualSet
CaseSensitiveGreaterOrEqualSet
LessOrEqualSet
CaseSensitiveLessOrEqualSet
LikeSet
CaseSensitiveLikeSet
NotLikeSet
CaseSensitiveNotLikeSet
MatchSet
CaseSensitiveMatchSet
NotMatchSet
CaseSensitiveNotMatchSet
ContainsSet
CaseSensitiveContainsSet
NotContainsSet
CaseSensitiveNotContainsSet
InSet
CaseSensitiveInSet
NotInSet
CaseSensitiveNotInSet
IsSet
IsNotSet
`Most of these correspond to the operators you are already familiar with such as: "“GT, "“LT, "“GE, "“LE, "“LIKE, "“MATCH, "“NOTMATCH, "“CONTAINS, "“NOTCONTAINS, etc.  Note however there are two new operators in PowerShell V3: "“In and "“NotIn which you can use like so:





`C:\PS> 1 -In 1..10
True
C:\PS> 20 -NotIn 1..10
True
`Let"™s look at the interesting parameters on these operator specific parameter sets.  Let"™s look at the EqualsSet parameter set:





`C:\PS> Get-Command Where-Object | Select -Expand ParameterSets | Where Name -eq EqualSet |
           Select -Expand Parameters | Where Position -ge 0 |
           Format-Table Name,Position,IsMandatory -AutoSize
Name     Position IsMandatory
----     -------- -----------
Property        0        True
Value           1       False
`As it turns out, these results are the same for all the _operator_ oriented parameter sets.  At the very minimum, the Property parameter is required and is always the first positional parameter.  And as you would expect, if you don"™t provide it, you get prompted for a value:





`C:\PS> Get-Process | Where -eq
cmdlet Where-Object at command pipeline position 2
Supply values for the following parameters:
Property:
`Now even though Value parameter is specified as not mandatory, in many cases if you don"™t provide it you will get a terminating error e.g.:





`C:\PS> Get-Process | Where Name -eq
Where-Object : The specified operator requires both the -Property and -Value parameters. Supply both parameters and
retry.
At line:1 char:15
+ Get-Process | Where Name -eq
+               ~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Where-Object], PSArgumentException
    + FullyQualifiedErrorId : ValueNotSpecifiedForWhereObject,Microsoft.PowerShell.Commands.WhereObjectCommand
`There are some cases where you don"™t have to provide the value nor the operator e.g.:





`C:\PS> Get-Process | Where Responding
Handles  NPM(K)    PM(K)      WS(K) VM(M)   CPU(s)     Id ProcessName
-------  ------    -----      ----- -----   ------     -- -----------
    216      10     3560       2896    73            4000 atieclxx
    130       7     2380       1028    33            1020 atiesrxx
    157      11    17288      13344    49            7876 audiodg
     28       6     1256        420    42     0.06   2752 BluetoothHeadsetProxy
...
`This works because A) the EqualsSet parameter set is the default parameter set and B) the Where-Object implementation appears to coerce the property specified (_Responding_ in this case) to Boolean. If the result is $true then the object is output by Where-Object and sent on its way down the pipeline.

So all this simplified syntax really is, is a bunch of operator specific parameter sets on Where-Object that have a positional and mandatory Property parameter of type [string] and a positional Value parameter of type [object].  In the case of Foreach-Object it is one extra parameter set called PropertyAndMethodSet which has one mandatory, positional parameter called MemberName.  And as with any cmdlet, you provide the parameter values and the cmdlet determines how to interpret them.  In fact, given standard parameter parsing behavior the below is as valid as the conventional notation:





`C:\PS> Get-Process | Where -GT PM 100MB
...
C:\PS> Get-Process | Where PM 100MB -GT
...
C:\PS> Get-Process | Where -Value 100MB -Property PM -GT
...
`Now where this syntax can lead you astray if you don"™t understand how it works, is if you make the assumption that this is a parsed expression.  In that case, folks might expect this to work:








`C:\PS> Get-Process | Where Threads.Count -GT 100
`There *is* a Threads collection on each Process object.  We might think that we can access a property on that collection but in effect, what happens is that the Where-Object Property parameter gets the value "Threads.Count" and there is no property on a Process object called "Threads.Count". This silently fails which might lead you to believe there are no processes with greater than 100 threads.  But reverting back to the standard syntax we see that isn"™t the case:








`C:\PS> Get-Process | Where {$_.Threads.Count -GT 100}
Handles  NPM(K)    PM(K)      WS(K) VM(M)   CPU(s)     Id ProcessName
-------  ------    -----      ----- -----   ------     -- -----------
   2080     126   155680     139928   531   113.68   4920 msnmsgr
   1087       0      312       8800    15               4 System
`So when you are using the simplified syntax be sure to keep in mind that you can **only **specify property names and you cannot access sub-properties.  Keep your property names simple and you should be copasetic with the new, simplified syntax.  While I"™m a little unsure about the new simplified syntax given how quickly you can fall off the "simple" path into the sharp rocks and lava below, I will say this.  As I wrote this blog post, I used the simplified syntax quite a bit and I have to say that it is growing on me.





  One final item to mention about simplified syntax.  It turns out that some folks have a hard time grokking $_ but when they"™re presented with **$PSItem** it apparently makes more sense to them.  So in PowerShell v3, wherever you can use $_ you can also use $PSItem.  $PSItem is not an alias. It seems to be a duplicate variable defined in all the same scopes as $_ and its value tracks that of $_ e.g.:






`C:\PS> 1 | Foreach {Get-Variable _,psitem; $_ = 4; Get-Variable _,psitem}
Name                           Value
----                           -----
_                              1
PSItem                         1
_                              4
PSItem                         4
`[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/233/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/233/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=233&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)
