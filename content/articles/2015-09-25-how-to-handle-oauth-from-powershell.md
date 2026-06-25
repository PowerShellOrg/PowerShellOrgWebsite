---
title: How to handle oAuth from PowerShell
authors:
  - Stephen Owen
date: "2015-09-25T15:35:24+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2015/09/how-to-handle-oauth-from-powershell/
---

One of the coolest features of PowerShell is the many tools we have available to work with services on the web, be they SOAP, REST, RPC or even WSDL services.  It's no question, PowerShell makes it very easy to pull down data from any of these places.

Unfortunately, getting data from a service isn't always as easy as embedding your credentials in a URL. In fact, some services require us to authenticate and ask the user for permission before giving up the goods.  For these, oAuth is the de-facto standard for delegated access.  

In this blog post today on FoxDeploy.com, we cover an easy method to present a user with an oAuth window to ask for permission, and offer a guide of how to handle the somewhat complicated flow of credentials and URLs needed to delegate permissions, using WordPress as an example.  

[Using PowerShell and oAuth][1]

#### Special Thanks

This post couldn't have happened without contributions by Lee Holmes, [Adam Bertram][2], [Keith Hill][3], [Chris Wu][4], and [Ryan Yates][5] for helping me to understand how to safely store credentials, and for other questions.  Extra thanks go to Adam and Ryan for helping me fact-check the post, and to Chris Wu for his excellent write-up on the '[Hey, Scripting Guy][6]' blog.  



-Stephen

 [1]: http://foxdeploy.com/2015/09/25/using-powershell-and-oauth/
 [2]: http://www.adamtheautomator.com/
 [3]: https://rkeithhill.wordpress.com/
 [4]: https://twitter.com/ps4it
 [5]: https://twitter.com/ryanyates1990
 [6]: http://blogs.technet.com/b/heyscriptingguy/archive/2013/07/01/use-powershell-3-0-to-get-more-out-of-windows-live.aspx
