---
title: Get-Directory Function
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-03-24T15:02:56+00:00"
legacy_featured_image: /wp-content/uploads/2019/03/psp-banner2-1.png
aliases:
  - /2008/03/get-directory-function/
---

In the olden days (i.e. when I used CMD.EXE), I often did "dir *." to quickly get a list of the directories in the current path. PowerShell doesn't work this way (which is good because it would be unexpected), so I had to make a replacement.


`function Get-Directory { ls $Args | ? { $_.PSIsContainer } }
`The alias which makes most sense to me for this function is "lsd". What, that acronym is already in use? 🙂
