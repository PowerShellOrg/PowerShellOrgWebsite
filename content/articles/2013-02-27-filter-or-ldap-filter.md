---
title: Filter or LDAP filter
authors:
  - Richard Siddaway
date: "2013-02-27T20:16:47+00:00"
aliases:
  - /2013/02/filter-or-ldap-filter/
---

Many of the Microsoft AD cmdlets have a "“Filter and an "“LDAPFilter parameter.  So what"™s the difference?

PS> Get-Help Get-ADUser -Parameter \*Filter\*

-Filter   
    Specifies a query string that retrieves Active Directory objects. This string uses the PowerShell Expression  
    Language syntax. The PowerShell Expression Language syntax provides rich type-conversion support for value types  received by the Filter parameter. The syntax uses an in-order representation, which means that the operator is placed between the operand and the value. For more information about the Filter parameter, see  about_ActiveDirectory_Filter.

-LDAPFilter   
    Specifies an LDAP query string that is used to filter Active Directory objects. You can use this parameter to run  your existing LDAP queries. The Filter parameter syntax supports the same functionality as the LDAP syntax. For  more information, see the Filter parameter description and the about_ActiveDirectory_Filter.

This means you have two ways to approach a problem. Lets think about finding a single user:

Get-ADUser -LDAPFilter "(samAccountName=Richard)"

Get-ADUser -Filter {samAccountName -eq 'Richard'}

The LDAPFilter uses LDAP query syntax "“ attribute and value.  Filter uses PowerShell syntax. You could think of the "“Filter as a condensed version of

Get-ADUser -Filter * | where samAccountName -eq 'Richard'

Use the "“Filter parameter because its less typing and you filter early "“ especially important if querying across a network.

You can use multiple attributes in the filters  – & implies AND in the LDAP filter

Get-ADUser -LDAPFilter "(&(givenname=Bill)(sn=Green))"

Get-ADUser -Filter {GivenName -eq 'Bill' -and Surname -eq 'Green'}

The LDAP filter HAS to use the correct attribute name but Filter uses the property name returned by Get-ADUser.

LDAP filters can get very complicated very quickly. For instance if you want to find the disabled user accounts

Get-ADUser -LDAPFilter "(&(objectclass=user)(objectcategory=user)(useraccountcontrol:1.2.840.113556.1.4.803:=2))"

Get-ADUser -Filter {Enabled -eq $false}

Alternatively,and in my opinion, its simpler to use Search-ADaccount

Search-ADAccount -AccountDisabled "“UsersOnly

Which one should you use?  The one that best solves your problem. I mix & match to suit the search I"™m performing

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2811/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2811/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2811&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
