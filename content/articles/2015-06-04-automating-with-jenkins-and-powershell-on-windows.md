---
title: Automating with Jenkins and PowerShell on Windows
authors:
  - Matthew Hodgkins
date: "2015-06-05T01:31:32+00:00"
categories:
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2015/06/automating-with-jenkins-and-powershell-on-windows/
---

Take a minute think about how many PowerShell scripts you have written for yourself or your team. Countless functions and modules, helping to automate this or fix that or make your teams lives easier. You spend hours coding, writing in-line help, testing, packaging your script, distributing it to your team. All that effort, and then a lot of the time the script is forgotten about! People just go back to doing things the manual way.  
I put this down to being out of sight, out of mind. Users who do not use the command line regularly will quickly forget about the amazing PowerShell-ing that you did to try and make their lives easier.  
Then there are are other problems, like working out the best way to give end users permissions to use your function when they aren’t administrators. Do you give them remote desktop access to a server and only provide a PowerShell session? Setup PowerShell Web Access? Configure a restricted endpoint? I thought the point of this module was to make your life easier, not make things harder!  
These problems are what an open source tool called **Jenkins** can solve for you. Traditionally used by developers to automate their build process, it can be leveraged to wrap web interfaces, job tracking and scheduling around the PowerShell scripts you worked so hard on.  
The below image shows what a Jenkins build looks like. In this basic example, the the build creates a text file on a remote machine by using PowerShell Remoting and the **Set-Content** CmdLet**. **The parameters for these commands can be entered into the form, and will be passed to your PowerShell script via variables.  
![jenkins](https://powershell.org/wp-content/uploads/2015/06/jenkins.png)  
To find out how to start leveraging Jenkins in your environment, take a look at the below blog posts:

  * [Part 1 - Installing Jenkins, Configuring Basic Security, The PowerShell Plugin, Creating Jobs](http://bit.ly/PSJenkins1)
  * [Part 2 - Using SSL on the Web Interface, Configuring PowerShell Remoting, How to Pass Credentials to Jobs](http://bit.ly/PSJenkins2)
