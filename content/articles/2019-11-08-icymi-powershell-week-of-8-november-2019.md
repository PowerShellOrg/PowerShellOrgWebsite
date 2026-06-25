---
title: "ICYMI: PowerShell Week of 8-November-2019"
authors:
  - Robin Dadswell
date: "2019-11-08T15:00:58+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
tags:
  - ICYMI
  - Community
  - Weekly Roundup
legacy_featured_image: /wp-content/uploads/2018/08/shutterstock_399116026.jpg
aliases:
  - /2019/11/icymi-powershell-week-of-8-november-2019/
---

Topics include speeding up the pipeline, while/until loops, why you shouldn't use += and more!


  <!--more-->


  Special thanks to Robin Dadswell, Prasoon Karunan V, and Kevin Laux.


###### 
  [*Speeding Up the Pipeline - powershell.one*](https://powershell.one/tricks/performance/pipeline)


  by Tobias Weltner on the 3rd November


  The PowerShell Pipeline is robust but tends to be slow. With a couple of tricks you can speed it up tremendously and make it as fast as classic foreach loops.


###### 
  [*PowerShell: Do-While vs. Do-Until vs. While*](https://sid-500.com/2019/11/04/powershell-do-while-vs-do-until/)


  by Patrick Gruenauer on the 4th November


  Understanding the differences between a do-while, do-until and while loop could be confusing. Is it the same? Why are there multiple techniques? In this blog post you will learn the differences.


###### 
  [*PowerShell’s plus equals (+=), the array serial killer*](https://theposhwolf.com/howtos/PS-Plus-Equals-Dangers/)


  by Anthony Howell on the 4th November


  "I did a livestream recently where I created a function to parse an HTML table and convert it to a PowerShell object. If you followed along, you probably noticed that I used a += with no shame whatsoever. Luckily, @PrzemyslawKlys caught it and asked that I fix it (you can see the commit history here, the actual request was a Twitter DM). This was a great reminder to me that += should be avoided!"


###### 
  [*Ansible, Windows and PowerShell: the Basics – Part 7, Utilising PowerShell DSC*](https://www.jonathanmedd.net/2019/11/ansible-windows-and-powershell-the-basics-part-7-utilising-powershell-dsc.html)


  by Jonathan Medd on 5th November


  In Part 7 of this series we’ll continue our journey with Ansible, Windows and PowerShell and look at how utilise PowerShell DSC. If you or your team already own some automation created using PowerShell DSC then it is possible to re-use that via an Ansible Playbook. Or maybe you think that you or they would prefer to create configuration automation going forward using a perhaps more familiar PowerShell DSC, then this could be a solution for you.


###### 
  [*Creating a PowerShell Backup System*](http://jdhitsolutions.com/blog/powershell/6905/creating-a-powershell-backup-system/)


  by Jeff Hicks on the 7th November


  The start of a series of articles demonstrating how Jeff built a PowerShell-based backup system for critical files employing the System.IO.FileSystemWatcher.


###### 
  [*Tweet of the Week*](https://twitter.com/azureposh/status/1192801892314861569)


  New PowerShell module for managing Azure Functions


###### 
  [*Youtube: Send Email with SendGrid and PowerShell*](https://www.youtube.com/watch?v=AsAQr9XK1Fc&feature=youtu.be)


  In this video, I set up a free SendGrid account in Azure and send email with the Rest API and PowerShell. I walk through the reusable function that builds the header and body of the message. This function is helpful for anyone who needs to send email from a PowerShell script that doesn’t have access to an SMTP relay or are behind a firewall that blocks outbound SMTP traffic.
