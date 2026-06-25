---
title: "[UPDATED] Snover School: FANCY Wildcards"
authors:
  - Don Jones
date: "2012-06-19T20:13:00+00:00"
aliases:
  - /2012/06/updated-snover-school-fancy-wildcards/
---

So, I'd previously posted about a cool trick Jeffrey Snover demonstrated at TechEd:


  Get-Service -Name [a-b]*


This will return a list of all services whose names start with A or B. Now for me, this was a cool trick: I didn't realize that wildcards could be more than * or ?! And Snover described these as "rich regular expressions."

Well, not exactly. We've corresponded, and what's actually happening is that PowerShell's wildcard support is essentially a dumbed-down set of the regex syntax. Specifically, read the about_wildcards help topic and you'll learn that you can use ranges like [a-b], the * and ? characters, or a set of characters like [abeft] - but not much else. So it looks like a regex at first blush, but isn't, really.

This is a nifty trick, though! Keep in mind that it's only supported on parameters that have been explicitly designed, by their developers, to support wildcards. That's usually documented in the cmdlet's full help (e.g., Help Get-Service -full), although in some cases you'll need to use a bit of trial and error to see what works and what doesn't.

Another aspect of this is the -like operator. You're probably familiar with something like this:




    get-service | where { $_.name -like 'b*' }



But the operator also supports these richer, semi-regex wildcards:


  get-service | where { $_.name -like '[abd]*' }


Give it a shot! It was very cool to be doing a session at TechEd _with Jeffrey Snover,_ especially when he kept whipping out these little gems that I'd never even thought to try. I'll share some more of them in the upcoming weeks!


![](http://powershell.com/cs/aggbug.aspx?PostID=17124)
