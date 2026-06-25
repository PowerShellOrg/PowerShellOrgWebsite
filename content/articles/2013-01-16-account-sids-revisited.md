---
title: Account SIDs revisited
authors:
  - Richard Siddaway
date: "2013-01-16T22:48:05+00:00"
aliases:
  - /2013/01/account-sids-revisited/
---

I realised there is an easier way to get the data


`function

get-SID

{


param

(


[string]

$computername

=

$env:COMPUTERNAME


)


Get-WmiObject

-Class

Win32_AccountSID

-ComputerName

$computername

|


foreach

{


$exp

=

"[wmi]'"

+

$(

$_

.

Element

)

+

"'"


Invoke-Expression

-Command

$exp

|


select

Domain

,

Name

,

SID

,

LocalAccount


}


}

`Use the wmi type accelerator with the path from the Element and you can just select the data you want.  As a bonus you can discover if the account is local or not

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2795/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2795/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2795&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
