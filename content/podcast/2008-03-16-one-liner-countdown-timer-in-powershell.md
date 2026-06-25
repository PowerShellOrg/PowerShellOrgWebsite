---
title: "One-Liner: Countdown Timer in PowerShell"
authors:
  - Jonathan Walz
date: "2008-03-16T19:36:45+00:00"
legacy_featured_image: /wp-content/uploads/2019/03/psp-banner2-1.png
aliases:
  - /2008/03/one-liner-countdown-timer-in-powershell/
---

Here's a quick one for ya. Perfect kitchen timer. Who doesn't have a laptop with PowerShell on it in their kitchen? 🙂


start-sleep (60*9); write-host ("`a"*4)</pre>
Start-Sleep works in seconds, so you see where I've done some quick
math to get nine minutes. Not sure if the ()'s were required, but they
don't hurt. I didn't know the precedence of parameter parsing versus
multiplication off the top of my head. Next is Write-Host with some
more multiplication. This one uses "`a" which is the special character

which emits a beep (old schoolers know this as the ASCII code for

BELL). If you multiply a string by a number in this way (and in this

order, actually), then posh concatenates it the number of times you

specify. Due to the magical parsing that PowerShell does, if you were

to try this the other way around, with the 4 first, you would get an

error when it tries to convert "`a" to an INT.

Happy Powershelling!
