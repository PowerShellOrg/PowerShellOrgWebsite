---
title: "I'm Not A Developer"
authors:
  - pscookiemonster
date: "2016-02-19T12:57:33+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/02/im-not-a-developer/
---

Are you intimidated by scripting? Does PowerShell seem too much like programming to you? You aren't a developer, why should you learn this mumbo jumbo?  
It turns out, PowerShell is quite easy to get started with. Can you run ipconfig? Do you know how to give someone instructions? You could probably pick up the PowerShell basics in a month of lunches or so.  
Don't believe me? [I spent a few minutes to compare a simple task in four languages](http://ramblingcookiemonster.github.io/PowerShell-Is-Too-Hard/). PowerShell is a single, easy to understand command. Python is two lines and starts to include some syntax like .().  
We won't even look at the C example here, but check out this C# code that simply reads and prints out the content of a file:


`// Modified with suggestions from Anton.
// Better ways to do this, but, I'm not a developer ; )
using System;
using System.IO;
class ReadFromFile
{
    static void Main()
    {
        foreach(string s in File.ReadAllLines(@"C:\file.txt"))
        {
            Console.WriteLine(s);
        }
    }
}
`You can get a feel for what's going on, and there are many ways to skin a cat, but let's compare this to PowerShell:


`Get-Content C:\file.txt
`This was one example among many. Read or write a CSV, execute a SQL query, create a VM, kick off an AzureRM template, modify an AD user, the list goes on. All of these are individual PowerShell commands, that handle a whole bunch of code behind the scenes, giving you simple, task-based commands.  
This lets you worry about the actual problem you are trying to solve, not the nitty gritty programming details. Have you ever had to write your own [sorting code](http://www.sorting-algorithms.com/), rather than just using 


`Sort-Object
`?  
Come join the fun, you'll save yourself time and effort, and help out your team and organization in the process. Learn PowerShell.  
Cheers!
