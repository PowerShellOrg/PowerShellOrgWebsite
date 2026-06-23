---
title: "One-liner: Pop up a message box"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-03-03T18:33:00+00:00"
legacy_featured_image: /wp-content/uploads/2019/03/psp-banner2-1.png
aliases:
  - /2008/03/one-liner-pop-up-a-message-box/
---

You could paste this into a scheduled task or something if you want an annoying reminder to pop up on your screen.  :)  Now if only schtasks.exe was as easy to use as PowerShell...


`PowerShell -NoProfile -NonInteractive -Command [reflection.assembly]::loadwithpartialname('system.windows.forms'); [system.Windows.Forms.MessageBox]::show('reminder: buy milk')
`
