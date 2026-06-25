---
title: PowerGUI Pro® 3.0 Beta 2 is now available
authors:
  - Kirk Munro
date: "2011-06-17T14:21:40+00:00"
aliases:
  - /2011/06/powergui-pro-3-0-beta-2-is-now-available/
---

Hot on the heels of our first beta cycle for [PowerGUI Pro][1] 3.0, today we released beta 2 of PowerGUI Pro 3.0 to the web.  This release includes a lot of fixes and improvements based on the feedback we"™ve received from you during our first beta cycle, so thank you for that feedback!

Here are some details about the improvements that have been made in the 2nd beta of PowerGUI Pro 3.0:

#### Improved snippets hierarchy

Several users indicated that some of our snippets were hard to find.  To resolve this issue, I"™ve reorganized our snippets into an improved snippets hierarchy that should make it easier for you to find the snippets you are looking for and learn more about what you can do with PowerShell from our snippet collection.  A special thanks goes out to [Denniver Reining][2], author of the very popular [Snippet Manager Add-on][3].  Denniver was able to provide very useful feedback as I was going through the improvements in this release, which was very helpful.  To browse the new snippet hierarchy, simply press Ctrl+I while editing a document in the Script Editor.  Here"™s a screenshot showing the top level representation of the new snippets hierarchy:

[![PowerGUI Pro 3.0 Snippet Hierarchy](http://kirkmunro.files.wordpress.com/2011/06/snaghtml8b27913_thumb.png?w=604&h=427)](http://kirkmunro.files.wordpress.com/2011/06/snaghtml8b27913.png)

#### Installer option to open Script Editor

Since the first release of [PowerGUI][4] we have provided an option at the end of the installation to open the PowerGUI Admin Console.  This is useful, but myself and many of our users have requested if we could open the Script Editor as well.  With this beta 2 release, you can now open the Script Editor or the Admin Console at the end of the installation.

#### PowerPack Shared Scripts are now loaded from regular nodes and actions

When you author a PowerPack, you can create a function library inside a shared script for the PowerPack.  This is useful, however until now shared scripts would only load when you clicked on a script node or script action.  This has now been changed so that shared scripts are now loaded from regular nodes and actions, allowing you to keep all of your PowerPack functions in one location and then create regular nodes and actions using those functions.

#### Performance improvements, usability improvements and lots of bug fixes

In addition to these items, we have improved the performance in some scenarios in MobileShell and in the Script Editor, we have addressed some usability improvements in the Script Editor, the Admin Console and MobileShell, and we have fixed a lot of bugs as well (it is a beta cycle after all, and what good would a beta cycle be if it didn"™t include bug fixes?).

#### Don"™t forget all of the new features that were in the first beta!

Besides these changes, if you"™re just finding out about the beta of PowerGUI Pro 3.0, make sure you read my [other blog post][5] that highlights all of the new features like compiling scripts into executables, or the new MobileShell user interface that allows you to use PowerPacks from your smartphone or tablet "“ those features and many more were included in the [first beta][5] of this release.  If you want to try the awesome new MobileShell capabilities, this blog post will help you get that set up in your test lab: [Configuring RBAC for MobileShell in PowerGUI Pro 3.0][6].

#### Great, so where can I get beta 2?

Beta 2 is available for download now, in the same location where we posted the first beta.  You can find it on the [PowerGUI Pro 3.0 beta][7] page.  When you are installing this beta, you will need to provide a license key.  License keys for the beta are included in the zip file for the beta, right beside the msi and exe installers for the PowerGUI Pro 3.0 components "“ look for the asc file in the Components folder.

#### Please share your feedback!

We will be running the second beta for a short period while we work on finishing up this release.  Your feedback is very important during this beta cycle, so please give the beta release a try and share your feedback by posting messages on the [PowerGUI forums][8].  The sooner we get your feedback, the sooner we can respond to it.  I"™m really looking forward to hearing what you like, what you don"™t like, and what else you would like to see in this and future releases, so please share your thoughts with us.

Enjoy!

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[PowerGUI](http://technorati.com/tags/PowerGUI)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/592/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/592/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=592&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://www.powerguipro.com/ "PowerGUI Pro"
 [2]: http://bytecookie.wordpress.com/ "ByteCookie - Denniver Reining's blog"
 [3]: http://www.powergui.org/entry.jspa?externalID=3041&categoryID=389 "Snippet Manager Add-on"
 [4]: http://www.powergui.org/ "PowerGUI.org"
 [5]: http://poshoholic.com/2011/05/17/try-the-powergui-pro-3-0-beta-today/ "Try the PowerGUI Pro 3.0 beta today"
 [6]: http://poshoholic.com/2011/05/19/configuring-powerpacks-in-mobileshell-in-powergui-pro-3-0/ "Configuring RBAC for MobileShell in PowerGUI Pro 3.0"
 [7]: http://www.powergui.org/entry.jspa?externalID=3523 "PowerGUI Pro 3.0 Beta"
 [8]: http://www.powergui.org/forumindex.jspa?categoryID=55
