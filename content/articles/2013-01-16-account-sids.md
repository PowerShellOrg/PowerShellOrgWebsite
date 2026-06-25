---
title: Account SIDs
authors:
  - Richard Siddaway
date: "2013-01-16T22:22:45+00:00"
aliases:
  - /2013/01/account-sids/
---

A question on the forum asked about finding the accounts and SIDs on the local machine.


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


$da

=

(

(

$_

.

Element

)

.

Split

(

"."

)

[

1

]

)

.

Split

(

","

)


$sid

=

(

$_

.

Setting

-split

"="

)

[

1

]

-replace

'"'

,

''


$props

=

[ordered]

@{


Domain

=

(

$da

[


]

-split

"="

)

[

1

]

-replace

'"'

,

''


Account

=

(

$da

[

1

]

-split

"="

)

[

1

]

-replace

'"'

,

''


SID

=

$sid


}


New-Object

-TypeName

PSObject

-Property

$props


}


}

`Pass a computer name into the function "“ default is local machine.

Use the AccountSID class which links Win32_SystemAccount and Win32_SID.  For each returned instance clean up the data and create an object with three properties "“ domain, account and SID. 

You will see more than you thought "“ some very useful information buried in there

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2793/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2793/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2793&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
