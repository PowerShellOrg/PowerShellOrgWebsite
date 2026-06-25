---
title: "Regular Expressions are a -replace's best friend"
authors:
  - Don Jones
date: "2013-08-29T17:31:13+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2013/08/regular-expressions-are-a-replaces-best-friend/
---

Are you familiar with PowerShell's -replace operator?


`"John Jones" -replace "Jones","Smith"
`Most folks are aware of it, and rely on it for straightforward string replacements like this one. But not very many people know that -replace also does some amazing stuff using regular expressions.


`"192.168.15.12,192.168.22.8" -replace "\.\d{2}\.","10"
`That'd change the input string to "192.168.10.12,192.168.10.8," replacing all occurrences of two digits, between periods, to 10. The 12 would be skipped because it isn't followed by a period, as specified in the pattern. Note that _all_ occurrences are replaced, in keeping with the usual operation of -replace.  
The operator can also do capturing expressions, and this is where it gets really neat-o.


`"Don Jones" -replace "([a-z]+)\s([a-z]+)",'$2, $1'
`Here, I've specified two capturing expressions in parentheses, with a space character between them. PowerShell will capture the first to $1, and the second to $2. Those aren't actually variables, which is important. In my replacement string, I put $2 first, followed by a comma, a space, and $1. The resulting string will be "Jones, Don". It's important that my replacement string be in single quotes. In double quotes, the shell will try and treat $1 and $2 as variables, instead of using them as captured regex placeholders. I kinda wish they'd used something other than a $ for the captured placeholders, so that they didn't look like variables, but the syntax is in keeping with regex standards.  
I think it's cool to see all the places a regex can be put to use. The -split operator also supports regex syntax as a way of specifying the separator that will be used to break a string into components, so you're not limited to splitting just on a single character like a comma.  
Apart from the well-known -match operator and the Select-String command, where else have you used a regex in PowerShell?
