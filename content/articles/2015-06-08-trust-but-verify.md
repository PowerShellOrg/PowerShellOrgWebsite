---
title: Trust, but Verify
authors:
  - pscookiemonster
date: "2015-06-09T00:12:33+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/06/trust-but-verify/
---

The PowerShell code you write can turn up in interesting places. Production services might rely on it. Your co-workers might take a peak and borrow ideas from it. You might decide to share it online. Someone might see your code online and use it in their own solutions.

[Hit the link][1] for a quick bit on how we can help create more reliable, consistent, and secure solutions. Simplified to one line: always ask yourself "what could go wrong?"

What do you think? Is this over the top? Do you have any funny or awe-inspiring-train-wreck stories that resulted from assumptions around PowerShell or other code?

I've been lucky so far. My scariest moment? A while back, I was testing some code against a test server or two with [Invoke-Parallel][2]. Oops! The code to pull test systems hit a bug, and pulled all computer accounts. A number of domain controllers were hit before I could press ctrl+c. After recovering from a minor heart attack, I realized the code was benign, quickly fixed the bug, and broke the bad habit of running with a high-privilege account.

Cheers!


 [1]: http://ramblingcookiemonster.github.io/Trust-but-Verify/
 [2]: https://github.com/RamblingCookieMonster/Invoke-Parallel
