---
title: Using PowerShell Parameter Validation to Make Your Day Easier
authors:
  - Boe Prox
date: "2014-02-05T03:59:24+00:00"
categories:
  - Scripting Games
aliases:
  - /2014/02/using-powershell-parameter-validation-to-make-your-day-easier/
---

A number of entries in the Winter Scripting Games use parameter validation, but some that I have seen may not be using it correctly or to its full potential.  
Writing functions or scripts require a variety of parameters which have different requirements based on a number of items. It could require a collection, objects of a certain type or even a certain range of items that it should only accept.  
The idea of parameter validation is that you can specify specific checks on a parameter that is being used on a function or script. If the value or collection that is passed to the parameter doesn’t meet the specified requirements, a terminating error is thrown and the execution of the code halts and gives you an error stating (usually readable) the reason for the halt. This is very powerful and allows you to have much tighter control over the input that is going into the function. You don’t want to have your script go crazy halfway into the code execution because the values sent to the parameter were completely off of the wall.  
[Click here](http://learn-powershell.net/2014/02/04/using-powershell-parameter-validation-to-make-your-day-easier/) to be redirected to the original post of this article on the author’s blog site where you can read the remainder of the article.
