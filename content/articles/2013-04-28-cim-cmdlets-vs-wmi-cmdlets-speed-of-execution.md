---
title: "CIM cmdlets vs WMI cmdlets\"“speed of execution"
authors:
  - Richard Siddaway
date: "2013-04-28T21:04:47+00:00"
aliases:
  - /2013/04/cim-cmdlets-vs-wmi-cmdlets-speed-of-execution/
---

One question that came up at the summit was the comparative speed of execution of the new CIM cmdlets vs the old WMI cmdlets.  No of us knew the answer because we"™d never tried measuring the speed.

I decided to perform some tests.

This first test is accessing the local machine.  In both cases the cmdlets are using COM.  WMI uses COM and CIM will use COM if a "“ComputerName parameter isn"™t used.

The results are as follows:

**PS> 1..100 |  
foreach {Measure-Command -Expression {  
1..100 | foreach {Get-WmiObject -Class Win32_ComputerSystem} }  
} | Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 2008.953978  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds



**PS> 1..100 |  
foreach {Measure-Command -Expression {  
1..100 | foreach {Get-CimInstance -ClassName Win32_ComputerSystem} }  
} | Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 2078.763174  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds



So for pure COM access the WMI cmdlets are marginally (3.4%) faster.

What if we use the ComputerName parameter?

**PS> 1..100 |  
foreach {  
Measure-Command -Expression {  
1..100 | foreach {Get-WmiObject -Class Win32_ComputerSystem -ComputerName $env:COMPUTERNAME } }  
} | Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 1499.14379  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds

**PS> 1..100 |  
foreach {  
Measure-Command -Expression {  
1..100 | foreach {Get-CimInstance -ClassName Win32_ComputerSystem -ComputerName $env:COMPUTERNAME } }  
} | Measure-Object -Average TotalMilliseconds**

Count    : 100  
Average  : 3892.921851  
Sum      :  
Maximum  :  
Minimum  :  
Property : TotalMilliseconds

This one surprised me "“ the WMI cmdlets are 2.5 times faster.  I suspect that is because the CIM cmdlet has to build and then breakdown the WSMAN connection each time.

Next time we"™ll look at accessing a remote machine.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2842/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2842/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2842&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
