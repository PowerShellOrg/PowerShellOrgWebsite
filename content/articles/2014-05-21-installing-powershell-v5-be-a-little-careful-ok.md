---
title: Installing PowerShell v5? Be a Little Careful, OK?
authors:
  - Don Jones
date: "2014-05-21T17:37:46+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2014/05/installing-powershell-v5-be-a-little-careful-ok/
---

I'm getting a lot of questions from folks, via Twitter and other venues, regarding Windows Management Framework 5.0 - which is where PowerShell v5 comes from. It's awesome that people are installing v5 and kicking the tires - however, please help spread the word:

  * v5 **is a preview.** It isn't done, and it isn't guaranteed bug-free. It shouldn't be installed on production computers until it's officially released.
  * v5 doesn't install 'side by side' with v3 or v4. You can't run it with "-version 3" to "downgrade." Now, v5 shouldn't _break_ anything - something that runs in v3 or v4 should still work fine - but there are no guarantees **as it's a preview and not released code** at this stage.
  * Server software (Exchange, SharePoint, etc) often has a hard dependency on a specific version of PowerShell. You need to look into that before you install v5.
  * After installing v5, you might not be able to cleanly uninstall and revert to a prior version.

Generally speaking, v5 should be installed in a test virtual machine at the very least, not on a production computer. It's great to play with it, and you should absolutely log bugs and suggestions to http://connect.microsoft.com.  
This situation will be true for **any** pre-release preview of PowerShell or WMF going forward. "Preview" is the new Microsoft-speak for "beta," and you should treat it as such. Play with it, yes - that's the whole point, and it's how we get a stable, clean release in the end. But play with caution, and never on production computers.
