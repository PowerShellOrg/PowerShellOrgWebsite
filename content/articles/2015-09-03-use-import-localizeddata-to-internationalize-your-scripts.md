---
title: Use Import-LocalizedData to Internationalize your Scripts
authors:
  - Adam Platt
date: "2015-09-03T21:13:28+00:00"
categories:
  - PowerShell for Developers
  - Tutorials
aliases:
  - /2015/09/use-import-localizeddata-to-internationalize-your-scripts/
---

Whether you're working with an enterprise client with a global presence or building a tool that you want to share with the world, you may find yourself wanting to build support for multiple languages into your scripts. The Import-LocalizedData Cmdlet is a simple and powerful way to achieve this. I put up a pair of posts about my recent experience with a globalization effort and how we were able to get a lot of functionality with only a few lines of code.

The first post, [Internationalization with Import-LocalizedData](http://www.plattsoft.net/2015/08/24/internationalization-with-import-localizeddata/), describes the Cmdlet itself, how it works, and how to use it to automatically detect and load the correct language files for display at runtime. This is based on the regional settings of the user under which the PowerShell session is running.

The second post, [Internationalization with Import-LocalizedData: Part 2](http://www.plattsoft.net/2015/08/27/internationalization-with-import-localizeddata-part-2/), goes into more detail about some research we had to do into what exact regional settings control the language that PowerShell will attempt to use.

Even if you're not planning to localize your scripts into other languages right now, you should still think about globalizing your code so that it's easy to do if you change your mind, or if someone is kind enough to want to contribute some translations.
