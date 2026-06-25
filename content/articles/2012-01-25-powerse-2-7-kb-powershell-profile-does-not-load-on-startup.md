---
title: "PowerSE 2.7 KB: PowerShell profile does not load on startup"
authors:
  - Kirk Munro
date: "2012-01-25T19:01:59+00:00"
aliases:
  - /2012/01/powerse-2-7-kb-powershell-profile-does-not-load-on-startup/
---

Note: This blog post refers to an issue identified in PowerSE 2.7.0. It has been corrected in PowerSE 2.7.1, which is now available.

With the release we published yesterday, both [PowerSE][1] and [PowerWF][2] received a new feature: product-specific profiles.  This feature allows you to have profile scripts that you only want run in PowerSE or PowerWF run there so that you don"™t have to use if statements to check the host name in your profile scripts.  With this feature we also created the initial PowerSE and PowerWF profile scripts such that they dot-source the native PowerShell profile script by default so that what runs in PowerShell also runs in PowerSE.

Unfortunately there is one small detail that was left out of the PowerSE installer for this feature: the installation of the initial PowerSE-specific profile. As a result, if you download PowerSE 2.7, your PowerShell profile won"™t run right away.  Fortunately the fix is simple.  All you need to do is invoke this script from inside PowerSE 2.7:

> if (-not (Test-Path -LiteralPath $profile)) {  
>     Set-Content -Path $profile -Value @'  
> if (Test-Path -LiteralPath $profile.CurrentUserPowerShellHost) {  
>     . $profile.CurrentUserPowerShellHost  
> }  
> '@  
> }

Once you have run that script, your PowerSE profile will exist and it will be defined to load your PowerShell profile.  Restart PowerSE 2.7 and you"™ll have your PowerShell profile loaded by default again.

Note that this does not apply to PowerWF users, the profile scripts were added correctly to the installer for that release.

My apologies for the inconvenience.  We hope to have this resolved in the product itself very soon.  In the meantime this short script should work around the issue for you.

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerSE](http://technorati.com/tags/PowerSE),[KB](http://technorati.com/tags/KB),[profile](http://technorati.com/tags/profile)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/750/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/750/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=750&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://powerwf.com/products/powerse.aspx
 [2]: http://powerwf.com/products/powerwf.aspx
