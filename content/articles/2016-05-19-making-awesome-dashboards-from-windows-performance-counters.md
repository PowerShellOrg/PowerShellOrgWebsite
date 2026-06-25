---
title: Making Awesome Dashboards from Windows Performance Counters
authors:
  - Matthew Hodgkins
date: "2016-05-19T18:25:55+00:00"
categories:
  - DevOps
  - Tools
  - Tutorials
aliases:
  - /2016/05/making-awesome-dashboards-from-windows-performance-counters/
---

Having an understanding of your systems performance is a crucial part of running IT infrastructure.  
If a user comes to us and says _"why is my application running slowly?"_, where do we start? Is it their machine? Is it the database server? Is it the file server?  
The first thing we usually do is open up perfmon.exe and take a look at some performance counters. You then see the CPU on the database server is 100% and think _ "was the CPU always at 100% or did this issue just start today? Was it something I changed? If only I could see what was happening at this time yesterday when the application was running fine!". _It might take you a few hours to find the performance issue on your infrastructure, and you are probably going to need to open up perfmon.exe on a couple of other systems. There is a better way!  
What if you could turn your Windows performance counters into dashboards that look like this? How much time would you save?  
![Full Hyper-V Dashboard](https://hodgkins.io/images/posts/influxdb_grafana_windows/fulldashboard.png)  
Using a combination of the open source tools **InfluxDB** to store the performance counter data, **Grafana **to graph the data and the **Telegraf** agent to collect Windows performance counters, you will be a master of your metrics in no time!  
Read the detailed walk through over at [hodgkins.io](https://hodgkins.io/windows-metric-dashboards-with-influxdb-and-grafana)
