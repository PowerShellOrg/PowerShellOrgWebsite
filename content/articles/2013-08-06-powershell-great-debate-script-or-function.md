---
title: "PowerShell Great Debate: Script or Function?"
authors:
  - Don Jones
date: "2013-08-06T14:31:41+00:00"
aliases:
  - /2013/08/powershell-great-debate-script-or-function/
---

One of the most frequent comments in The Scripting Games this year was along the lines of, "you should have submitted this as a function, not a script." Of course, the second-most frequent comment was something like, "you shouldn't have submitted this as a function."  
Let's be clear: if an assignment explicitly asks for a function, you should write one. What we're debating are the pros and cons of a _single tool_ being written one way or another. Read that again: _a single tool. _If you're writing a library of tools, it's obvious that writing them as functions for inclusion in a single file (like a script module) is beneficial.  
Some argue that any tool is potentially going to be included in a function... so why not write it that way to begin with? Others argue that functions are a smidge harder to test, so why not just write a script?  
This is a debate I don't personally have a strong stake in. I mean, we're literally talking about a _single keyword. _Take _any_ script, add the **function** keyword, a function name, and a couple of curly brackets, and you've got a function. This really shouldn't be a criteria when you're looking at a contest entry... or even when you're looking at something a colleague offered to you.  
Or should it?  
[boilerplate greatdebate]
