---
title: Time for D-CRUD?
authors:
  - Richard Siddaway
date: "2013-04-28T17:52:28+00:00"
aliases:
  - /2013/04/time-for-d-crud/
---

I was thinking on the plane back from the PowerShell summit about the CRUD activities. They are a concept we have inherited from the database world:

C = Create

R = Read

U = Update

D= Delete

Create, Update and Delete correspond directly to the PowerShell verbs "“ New,Set and Remove respectively.

The Read action corresponds to the Get verb. 

Well sort of.

Get-* is used in two distinct scenarios.  Firstly we know of an object and we we want to read its properties "“ for example:

Get-Process -Name powershell

We are reading the information about the PowerShell process. That corresponds directly to the Read action in the CRUD paradigm.

However, we also use Get* when we want to Discover the processes that are running:

Get-Process

In which case we are Discovering the processes that are running.

I think its time to update the CRUD concept and make it DCRUD where D stands for discovery.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2840/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2840/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2840&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
