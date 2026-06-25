---
title: "PowerShell V3 \"“ ObsoleteAttribute"
authors:
  - Keith Hill
date: "2012-04-30T04:39:06+00:00"
aliases:
  - /2012/04/powershell-v3-obsoleteattribute/
---

PowerShell V3 now supports the ObsoleteAttribute for compiled cmdlets but unfortunately not advanced functions.  This is handy to let your users know that a binary cmdlet will be going away in a future release of your binary module. 

As we work on PSCX 3.0 there are a few binary cmdlets that we will mark with this attribute to let you know to switch over to PowerShell"™s built-in equivalent before we eliminate the cmdlet completely in the next release.  Here"™s a snippet that shows how to apply the ObsoleteAttribute in your source code:



`1

[OutputType(

typeof

(MailMessage))]


2

[Cmdlet(VerbsCommunications.Send, PscxNouns.SmtpMail,


3

        DefaultParameterSetName 

=



"

Authenticated

"

,


4

        SupportsShouldProcess 

=



true

)]


5

[Obsolete(

@"

The PSCX\SendSmtpMail cmdlet is obsolete 

"



+




6



"

and will removed in the next version of 

"



+




7



"

PSCX. Use the built-in Send-MailMessage.

"

)]


8



public



class

 SendSmtpMailCommand : PscxCmdlet


9

{


`<!-- Code inserted with Steve Dunn's Windows Live Writer Code Formatter Plugin.  http://dunnhq.com -->




    The resulting of executing this cmdlet with PSCX v3 loaded is:






`C:\PS> Send-SmtpMail

WARNING: The PSCX\SendSmtpMail cmdlet is obsolete and will removed in the next version of 
PSCX. Use the built-in Send-MailMessage.

`There is an ObsoleteAttribute constructor overload that takes a boolean that converts the warning to an error.  I"™m not sure how useful that is but PowerShell does honor that setting and will generate a terminating error in this case:



`C:\PS> Send-SmtpMail

The PSCX\SendSmtpMail cmdlet is obsolete and will removed in the next version of PSCX. Use 
the built-in Send-MailMessage.
At line:1 char:1
+ Send-SmtpMail
+ ~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (Send-SmtpMail:String) [], RuntimeException
    + FullyQualifiedErrorId : UseOfDeprecatedCmdlet

`It"™s nice to see PowerShell honoring more of the .NET attributes "“ where it makes sense that is.


  [![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/256/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/256/) ![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=256&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)
