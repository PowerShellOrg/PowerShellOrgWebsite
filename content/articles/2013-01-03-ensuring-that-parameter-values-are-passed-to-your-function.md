---
title: Ensuring that parameter values are passed to your function
authors:
  - Richard Siddaway
date: "2013-01-03T18:46:59+00:00"
aliases:
  - /2013/01/ensuring-that-parameter-values-are-passed-to-your-function/
---

A question on the forum about a function had me thinking. The user had defined two parameters for the function and then used Read-Host to get the values.

NO

Much better way is to use an advanced function and make the parameters mandatory


`function

Getuserdetails

{


[

CmdletBinding

(

)

]


param

(


[

parameter

(

Mandatory

=

$true

)

]


[string]

$Givenname

,


[

parameter

(

Mandatory

=

$true

)

]


[string]

$Surname


)


Get-ADUser

-properties

telephonenumber

,

office

-Filter

{

(

GivenName

-eq

$Givenname

)

-and

(

Surname

-eq

$Surname

)

}


}

`If you call the function and don"™t give values for the parameters you will be prompted for them

The other point is the "“Filter property on get-aduser.  Don"™t put quotes round the variable

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2779/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2779/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2779&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
