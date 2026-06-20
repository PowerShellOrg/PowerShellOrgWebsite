---
title: Scripting Games Week 4
author: Glenn Sizemore
authors:
  - Glenn Sizemore
date: "2013-05-24T21:37:18+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/05/scripting-games-week-4/
---

Again if you"™re participating in the games this year you"™ve already won!  If you"™re not and you"™re reading this post what are you doing!  I"™ve watched authors step there game up over the past month, and I can tell you from personal experience the games will make you better at your real job.  It"™s like sharpening an axe, an axe made of super juice that can automate the world 🙂  
**Well that's clever!  
** I came across this script this morning.


`$prop = Write-Output Name,Title,Department,LastLogonDate,PasswordLastSet,LockedOut,Enabled
Get-ADUser -Filter * -Properties $prop |
    Get-Random -Count 20 | Select-Object $prop |
        ConvertTo-Html -Title "Active Directory Audit" -PostContent "
---
$(Get-Date)" | Out-File C:\adresult.html
`Well formatted, simple concise, all around a very clean approach to the problem.  However the use of write-output threw me for a second.  I actually had to run it to see what was happening there, for a second I thought maybe there was yet another way to create a custom object in PowerShell.  Alas no, our intrepid author has simply deduced a way to avoid having to put quotes around the text.  Consider the following Prop1, and Prop2 are identical, but it"™s one less character using write-output.


`$prop1 = Write-Output Name,Title,Department,LastLogonDate,PasswordLastSet,LockedOut,Enabled
$prop2 = 'Name','Title','Department','LastLogonDate','PasswordLastSet','LockedOut','Enabled'
`I"™m not saying we should start using write-output instead of quotation if for nothing other than syntax highlighting it"™s incorrect. However, this one time it"™s forgiven, and I"™m tipping my hat to you sir, well done.  
**Don"™t put spaces or dashes in your property names.  
** I"™ve seen this on and off throughout the games and I"™ll admit this one isn"™t a slam dunk, but that said don"™t do it. You"™re writing a script, camel case is the established standard for spaces. Yes the spaces do make it slightly easier to read, but at the cost of eliminate the reuse of the code.  
**Oh the Humanity.  
** Seriously read the damn help already. I could just fill this post with examples of simple mistakes that could have been avoided. Using the wrong cmdlet is one thing but take the following.


`Get-Process | Sort-Object {Get-Random} | select -First 5
`What"™s wrong with that picture? Well nothing except it"™s horribly inefficient since the Get-Random cmdlet has a count parameter!


`Get-Process | Get-Random -Count 5
`To the author You know who you are, everyone else read the help people!  
Light week this week, but I will say I am super excited about next weeks offerings it"™s a problem that tickles my kind of fancy, and I hope you all have as much fun solving it as I did.  
~Glenn
