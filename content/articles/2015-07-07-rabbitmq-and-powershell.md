---
title: RabbitMQ and PowerShell
authors:
  - pscookiemonster
date: "2015-07-07T11:22:36+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/07/rabbitmq-and-powershell/
---

Have you ever needed to communicate between scripts, perhaps running on different servers and in different languages?  Did you use a non-standard "messaging" solution like the file system or a SQL database? Did you try to avoid this and squeeze everything into a monolithic, delicate script?








  [RabbitMQ](http://ramblingcookiemonster.github.io/RabbitMQ-Intro/) is a solid messaging solution that happens to have a handy REST API and .NET client, which means we can use PowerShell!








  Wrote a quick hit on setting up a simple RabbitMQ deployment and using PowerShell to manage the solution and send and receive messages. Thanks go to Mariusz Wojcik and Chris Duck for writing and sharing the PowerShell modules that were tweaked for this article.





  [RabbitMQ and PowerShell](http://ramblingcookiemonster.github.io/RabbitMQ-Intro/)








  Here's an example showing two independent PowerShell sessions talking to each other over a RabbitMQ server:








  [![listener-small](https://powershell.org/wp-content/uploads/2015/07/listener-small.gif)](https://powershell.org/wp-content/uploads/2015/07/Listener.gif)[](https://powershell.org/wp-content/uploads/2015/07/Listener.gif)








  Is this something you could use in your solutions? Hit the link and check it out - pull requests and input would be welcome.








  Cheers!
