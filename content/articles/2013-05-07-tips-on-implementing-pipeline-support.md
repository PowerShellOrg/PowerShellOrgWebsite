---
title: Tips on Implementing Pipeline Support
authors:
  - Boe Prox
date: "2013-05-08T03:16:27+00:00"
aliases:
  - /2013/05/tips-on-implementing-pipeline-support/
---

While reviewing Event 1 (and now Event 2) I've seen some scripts that don't quite have the correct pipeline support and others that do a great job with it. Whether it is an unneeded Begin or End statement, or throwing everything into a Process block and not quite getting the expected output or even having a Process block when ValueFromPipeline/ValueFromPipelineByPropertyName is not even enabled. Before I start working through my notes for Event 2, I wanted to get this post out of the way. I hope that what I put together here will help those out who are working to implement pipeline support in their code as well as providing a method of troubleshooting the parameter binding using Trace-Command. The blog post is available [here to view][1].

 [1]: http://learn-powershell.net/2013/05/07/tips-on-implementing-pipeline-support/
