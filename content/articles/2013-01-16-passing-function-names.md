---
title: Passing function names
authors:
  - Richard Siddaway
date: "2013-01-16T22:32:38+00:00"
aliases:
  - /2013/01/passing-function-names/
---

A question asked about passing a function name into another function which then called the function. It sounds worse than it is. if you need to pass the name of a command and then call it try using invoke-expression


`function

ffour

{


Get-Random


}


function

fthree

{


Get-Date


}


function

ftwo

{


param

(


[string]

$fname


)


Invoke-Expression

$fname


}


"date"


ftwo

fthree


"random"


ftwo

ffour

`[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2794/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2794/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2794&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
