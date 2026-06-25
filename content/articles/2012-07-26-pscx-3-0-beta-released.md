---
title: PSCX 3.0 Beta Released
authors:
  - Keith Hill
date: "2012-07-27T04:12:31+00:00"
aliases:
  - /2012/07/pscx-3-0-beta-released/
---

We"™ve just released a [beta of the PowerShell Community Extensions 3.0][1] which targets PowerShell 3.0 specifically.  This new version uses a WiX based installer.  We may look at providing an xcopy deployable ZIP file but we had so many users get burned by not unblocking the ZIP file that the move back to MSI seemed warranted.  The MSI really doesn"™t do much other than copy files into the Program Files dir and add a path to the PSModulePath environment variable.  

Be sure to read the installation notes on the download page.  If you"™re having problems importing the PSCX module, you might need to reboot.  Yeah I know that sucks but either WiX 3.6 just isn"™t handling environment variable updates quite right or I"™m not using WiX right.  

If you"™re using PSCX and Windows PowerShell 3.0, please take this version for a spin.  You can use it side-by-side with your current version of PSCX 2.x.  When you import PSCX specify the RequiredVersion parameter as shown below e.g.:

Import-Module pscx "“RequiredVersion 3.0.0.0

And please, [report problems back to the CodePlex site][2].  I haven"™t always been able to reply quickly to issues but we do monitor them.  Thanks!

[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/268/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/268/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=268&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)

 [1]: http://pscx.codeplex.com/releases/view/91403
 [2]: http://pscx.codeplex.com/workitem/list/basic
