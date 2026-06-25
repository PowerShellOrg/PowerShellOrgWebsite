---
title: Help Me Test SSL on PowerShell.org
authors:
  - Don Jones
date: "2016-06-13T14:02:17+00:00"
categories:
  - Announcements
aliases:
  - /2016/06/help-me-test-ssl-on-powershell-org/
---

I'd appreciate your help in testing HTTPS/SSL here on PowerShell.org. Right now, it's "voluntary," meaning you have to explicitly ask for <https://powershell.org>. If you have any problems, please note them in a comment on this article.  
Some notes and known problems:

  * Most pages will not show the "lock" address bar icon in your browser, because we're delivering mixed content. For example, the site logo is being hardcoded as http:// by some Javascript in our theme, which I need to sort out.
  * _Your_ connection will be to CloudFlare, which is who issued the certificate you'll see. We've also SSL'd the traffic between them and our server using a DigiCert SSL certificate. We're also going to enable client certificate authentication, so our server will only deliver content to CloudFlare, which then delivers it to you. That's ahead.

I _think_ we can solve the mixed-content problem by forcing HTTPS, which is easy, but I want to make sure it's otherwise working before taking that step. We already have a WordPress plugin in place that's rewriting http:// or https:// with just // in URLs, but there're a couple of places where that plugin isn't able to help, and that's why we're delivering mixed content still.  
I'll point out that this is _mainly_ a bonus-points project; because almost everyone logs into the site using an external account, we don't store many passwords (and thus don't transmit them in the clear or otherwise). We don't store or transmit any other personally identifiable information. Still, SSL has some other benefits, and it shouldn't _hurt_ to have it on, so we're giving it a shot.  
Thanks!

## UPDATES 15 June 2016

  * The Lock icon in browser address bars should be working; we've fixed the mixed-content issues I've found.
  * We're forcing HTTPS.
  * We use CloudFlare; you're getting SSL from you to them, and they're getting (forced) SSL from them to us.
  * We're getting an "A" from SSLLabs and SecurityHeaders.io - thanks for that suggestion, Paal. CloudFlare doesn't let us implement _every_ security header yet, but we've got most of the recommended ones.
