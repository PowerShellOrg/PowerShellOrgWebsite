---
title: Creating a PowerShell Module to Improve Your Code
authors:
  - n2501r
date: "2020-07-27T18:24:52+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tutorials
tags:
  - Modules
  - SQL
  - Best Practices
aliases:
  - /2020/07/creating-a-powershell-module-to-improve-your-code/
---

Do you have PowerShell code that you reuse in your scripts over and over? Do you have server names hard coded in variables? Are you using a text file or CSV file to import server names? Do you find yourself only utilizing one server out of a cluster of servers to make your PowerShell commands? These are the questions I asked myself and the answer used to be YES. In this post, I will go over how you can store your infrastructure server information in a SQL database and call that data from a custom PowerShell module. By utilizing this method, you can expect the below benefits:


  - 
    Centralized code means less places to modify if you want to make a change


  - 
    Randomized server selection to prevent over usage of one server


  - 
    Centralized location to store server information


  - 
    Easily add or remove server infrastructure as your environment changes


  - 
    Flexibility to pull server data from multiple sites and locations


  - 
    Standardized scripts make for easier readability and debugging



Feel free to check it out for yourself at my site: 
[SpiderZebra.com](https://spiderzebra.com/2020/07/27/creating-a-powershell-module-to-improve-your-code/)
 **Nick Richardson (@ChiefNSR)**
