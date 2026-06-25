---
title: Measure PowerShell Performance
authors:
  - Don Jones
date: "2012-07-19T14:10:00+00:00"
aliases:
  - /2012/07/measure-powershell-performance/
---

I'm often asked by folks if there's a "better way" to do something in a script. Often times, they're looking for a better procedural approach - following best practices like object-based output, for example. But sometimes, they're looking for better performance from a script or command. Well, the good news is that PowerShell itself can help with that.

Let's consider two short scripts that produce almost identical output. Here's the first:






Get-Process


|








    Select-Object


Name

,

ID

,






                  @{n
=

'PM(KB)'
;e
=
{
$_

.
pm 
/

1kb

-as

[

int

]
}}
,






                  @{n
=

'VM(KB)'
;e
=
{
$_

.
vm 
/

1kb

-as

[

int

]
}} 
|







Where
 { 
$_

.
Name 
-like

's*'
 } 
|






    Format-Table


-AutoSize 




Which outputs the following:






Name            Id PM(KB)  VM(KB)





    ----            -- ------  ------





    SearchIndexer 2400  16332  511936





    services       532   3700   34296





    smss           292    272    4276





    spoolsv       1060   3688   55996





    svchost        264  12980   93388





    svchost        644   2132   38588





    svchost        684   2428   31988





    svchost        756  10192 1414100





    svchost        768  15724  104180





    svchost        896  23096  589812





    svchost        976   5064   87876





    svchost       1100  12528  348288





    svchost       2172   5056   94256





    System           4    120    4196 





Now consider this second version:






Get-Process


-Name



s*



|






    Format-Table


Name

,

ID

,






                  @{n
=

'PM(KB)'
;e
=
{
$_

.
pm};formatstring
=

"N2"
}
,






                  @{n
=

'VM(KB)'
;e
=
{
$_

.
vm};formatstring
=

"N2"
} 
-AutoSize 




And its output:






Name            Id        PM(KB)           VM(KB)





    ----            --        ------           ------





    SearchIndexer 2400 16,723,968.00   524,222,464.00





    services       532  3,788,800.00    35,119,104.00





    smss           292    278,528.00     4,378,624.00





    spoolsv       1060  3,776,512.00    57,339,904.00





    svchost        264 13,295,616.00    95,629,312.00





    svchost        644  2,183,168.00    39,514,112.00





    svchost        684  2,539,520.00    33,288,192.00





    svchost        756 10,436,608.00 1,448,038,400.00





    svchost        768 16,326,656.00   108,277,760.00





    svchost        896 15,773,696.00   449,454,080.00





    svchost        976  5,132,288.00    89,452,544.00





    svchost       1100 12,881,920.00   357,179,392.00





    svchost       2172  4,464,640.00    94,494,720.00





    System           4    122,880.00     4,296,704.00 





Again, same data, just a different way of getting it. The second one is a bit prettier, too. So is there a performance difference? PowerShell's **Measure-Command** approach can tell us. I've saved these in script files named First.ps1 and Second.ps1, mainly for convenience; it's completely legitimate to ask Measure-Command to measure a command, rather than a script file, but when the commands get complex I find them easier to read in a script.




    PS C:\> measure-command -Expression { C:\first.ps1 }

















    Days              : 0





    Hours             : 0





    Minutes           : 0





    Seconds           : 0





    Milliseconds      : 82





    Ticks             : 825043





    TotalDays         : 9.5491087962963E-07





    TotalHours        : 2.29178611111111E-05





    TotalMinutes      : 0.00137507166666667





    TotalSeconds      : 0.0825043





    TotalMilliseconds : 82.5043























    PS C:\> measure-command -Expression { C:\second.ps1 }

















    Days              : 0





    Hours             : 0





    Minutes           : 0





    Seconds           : 0





    Milliseconds      : 87





    Ticks             : 871232





    TotalDays         : 1.00837037037037E-06





    TotalHours        : 2.42008888888889E-05





    TotalMinutes      : 0.00145205333333333





    TotalSeconds      : 0.0871232





    TotalMilliseconds : 87.1232





Holy smokes. _The first one was faster._ OK, only by 5 milliseconds, but it was faster! And the first one doesn't exactly use what I'd call "best practices." It's filtering out processes whose names don't start with "S" way late in the game - after doing all that Select-ing. It's possible that the second script's Format-Table, with all that FormatString fanciness, is what's making the second script run longer. Fortunately, we can now go in and start tweaking things around, re-testing, and even testing individual commands to get the script running as fast as possible. I'll leave that to you, for these two examples - how fast can you get one to run while producing substantially the same output?

Measure-Command is a useful tool, but always remember that _it's really running your script._ This isn't some kind of testing mode (and if you run commands with -WhatIf, you won't get the same performance results). So you'll often want to test this in a virtual environment, getting your command fine-tuned and read for production. 








![](http://powershell.com/cs/aggbug.aspx?PostID=17813)
