---
title: "[UPDATED] Tweaks to PowerShel v3 Updatable Help"
authors:
  - Don Jones
date: "2012-06-04T23:58:00+00:00"
aliases:
  - /2012/06/updated-tweaks-to-powershel-v3-updatable-help/
---

[I've written before about how PowerShell v3 won't come with help][1] "in the box," but will instead require you to download help from Microsoft's servers. 

ASIDE: Technically, _any_ module author can provide updatable help on their own Web server; you just have to tag your module manifest with the appropriate information so that PowerShell can locate your online content and download it.

Now that Windows PowerShell v3 Release Candidate is out, I've noticed a slight tweak to the help system. Previously, if you looked at a command's help prior to downloading the help content, you still got the basic syntax and a reminder that you hadn't yet downloaded help. That still occurs, but when you first try to ask for help (if you haven't downloaded it), you actually get an interaction-required Yes/No prompt, reminding you to run Update-Help to get the help content to your computer.

UPDATE: And, if you hit "Y" on that prompt, it runs Update-Help. So... this is pretty smart.

I think this is a great compromise. Now, there's no way you can possibly _not realize_ that you haven't downloaded help, and you're told _exactly_ how to do so, and Microsoft (and other authors) are able to provide more accurate, continuously-updated content.


![](http://powershell.com/cs/aggbug.aspx?PostID=16885)

 [1]: http://powershell.com/cs/blogs/donjones/archive/2012/03/02/wait-powershell-v3-doesn-t-come-with-help.aspx
