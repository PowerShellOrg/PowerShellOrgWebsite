---
title: Charts in PowerShell-Generated Reports
authors:
  - Don Jones
date: "2012-11-16T23:09:05+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2012/11/charts-in-powershell-generated-reports/
---

So, as you may know, I have an ongoing hobby project called _Creating HTML Reports in PowerShell. _I'm working on an update for next year, and one of the things I've been looking at are embedded charts within the report.  
Problem is, I don't know what people would actually chart. Now... I'm going to ask you for ideas, but you need to read this whole post before you go popping a comment in. Because there are some restrictions.  
**First**, I'm 
not talking about historical data or trend reports
. Those require a data store of historical data. If you're not using SQL Server for that (even free SQL Express), learn how. Excel is 
not
 your trend database, no matter how little learning it requires (and I bet if you added up all the time you've spent becoming an Excel jockey, you'd be shocked). Once you've got the data in SQL (even Express), you can use SQL Server Reporting Services (SSRS) to generate truly kick-butt reports with very little effort. Reports which can be scheduled and e-mailed. Truly, folks, this is worth spending time on - and I may make that my next ebook project.  
**Second, **don't tell me "disk space." I know that one. Pie and stacked bar charts showing size/free space are a great idea. Got it. Anything else?  
**Third, **I'm not talking about performance charts. PerfMon does those, and also, see my first point. PowerShell is not a performance monitoring tool. Operations Manager is. Oh, and it dumps data into SQL Server and you can use SSRS to report on it. If your company needs historical performance reports (and most probably do) and is to cheap to get you a real monitoring solution, consider taking drastic measures. I'm not suggesting you put Ex-Lax in the boss' coffee every time he asks you to re-create OpsMan on your own. He'd deserve it, and it might help, but I'm not suggesting it.  
In keeping with point 3, that means I don't want suggestions like "charts showing network throughput." That's performance. I'm not suggesting such a thing wouldn't be useful, because I know it would be. I'm saying it's out of scope for this particular project. If you give me in-scope suggestions, I'll build you a tool. Fire off out-of-scope stuff and I'm just going to go build a kegerator for my beer instead.  
**SO**... given those restrictions, what sort of data could you query from a computer (say, using WMI/CIM or something) that you'd want displayed in chart form? Anything?
