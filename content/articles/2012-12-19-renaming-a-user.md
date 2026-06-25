---
title: Renaming a user
authors:
  - Richard Siddaway
date: "2012-12-19T15:45:34+00:00"
aliases:
  - /2012/12/renaming-a-user/
---

I was asked about searching a user name for a string and replacing it so that the object is renamed.

This is a three stage activity.  First get the user. Two modify the name. Three rename the object.  In active directory the name attribute has the LDAP name of cn but the Microsoft AD cmdlets treta it as name. So we end up with this code:


`$user

=

Get-ADUser

-Filter

{

cn

-eq

'GREYIEN Bill'

}


$newname

=

$user

.

Name

.

Replace

(

"YI"

,

"A"

)


Rename-ADObject

-Identity

$user

-NewName

$newname

-PassThru

`The trick is in the middle line because the name is a string so you can use the standard string methods to perform the search and replacement.  Using "“Passthru displays the object so you can see the change has taken place.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2773/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2773/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2773&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
