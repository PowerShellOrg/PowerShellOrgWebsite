---
title: Using PowerShell to Scrape the Web
authors:
  - Don Jones
date: "2012-06-07T14:22:00+00:00"
aliases:
  - /2012/06/using-powershell-to-scrape-the-web/
---

One of the things administrators often look to do with PowerShell is "scrape" Web pages. In the past, you had a couple of options: Use Internet Explorer's COM object (which can get a bit fugly), or use the .NET Framework's WebRequest stuff (slightly less fugly, but still a bit).

PowerShell v3 to the rescue. Microsoft has wrapped much of the fugly in some cool and simple cmdlets, and given PowerShell a native ability to understand an HTML document's object model (DOM). Note that the ability to parse the HTML document tree is dependent upon IE being installed, which means it won't work on a Server Core system (since IE doesn't exist there). You'll still get some HTML parsing, but it won't be the full, broken-down tree.

Start by running Invoke-WebRequest, passing it a -URI with the URL of the Web page you want to download. It'll handle the full task of connecting to the Web server, getting the text of the HTML page, and parsing it. Other parameters let you specify a -Credential, modify the HTTP -Headers, redirect the text to an -OutFile so that you have a local copy, specify -Proxy settings, and more. You'll specify -UseBasicParsing when IE isn't available.

What you get back (store it in a variable to work with it) is an HTML response. it'll have a StatusCode property, a Content property, and more. What's useful are some of the parsed properties:

  * Images - all the  tags
  * InputFields - all form fields
  * Links - all  tags
  * Forms - all  tags


  These are collections of objects, each one giving you access to the most commonly-needed data from he HTML. You can easily grab all of the images, links, and so forth, and process them however you like. For example, assume that you put your HTML results in $html. Run $html.links[0].href to get the destination of the first hyperlink in the page. Cool!


  Here's a quick example that grabs the first page of search result links from a Bing search for "cmdlet:"



 0
 1
 68
 392
 Concentrated Technology
 3
 1
 459
 14.0
 Normal
 0
 false
 false
 false
 EN-US
 JA
 X-NONE




    PS C:\> Invoke-WebRequest -uri
 'http://www.bing.com/search?q=cmdlet&form=AP





    MCS1' | select -expand links | select -expand href -first 10





    /?scope=web&FORM=Z9FD





    /images/search?q=cmdlet&FORM=BIFD





    /videos/search?q=cmdlet&FORM=BVFD





    /shopping/search?q=cmdlet&mkt=en-US&FORM=BPFD





    /news/search?q=cmdlet&FORM=BNFD





    /maps/default.aspx?q=cmdlet&mkt=en-US&FORM=BYFD





    /explore?q=cmdlet&FORM=BXFD





    http://www.msn.com/





    http://mail.live.com/



Now that's just nifty. And it works fine against local HTML pages as well as ones served up from a Web server. There's obviously a LOT more you can do, but this should give you a great starting point!

_This article was inspired by the chapter "Working with HTML and XML Data" in the upcoming [PowerShell in Depth][1], co-authored with Jeffery Hicks and Richard Siddaway. That book can be purchased from the publisher, and is [available directly from the authors][2] in a signed, limited edition package._


![](http://powershell.com/cs/aggbug.aspx?PostID=16940)

 [1]: http://bit.ly/Psh3InDepth
 [2]: http://store.concentratedtech.com/indepth.php
