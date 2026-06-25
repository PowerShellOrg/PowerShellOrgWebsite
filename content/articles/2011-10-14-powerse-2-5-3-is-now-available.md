---
title: PowerSE 2.5.3 is now available
authors:
  - Kirk Munro
date: "2011-10-14T15:02:05+00:00"
aliases:
  - /2011/10/powerse-2-5-3-is-now-available/
---

A little over a week ago we released [PowerSE 2.5.3][1] to the web.  You can download the latest release [here][1].  This release includes many great improvements to the [PowerSE][1] product, many of which were requested by you, so thanks for your feedback and please keep it coming!

#### No time limit for freeware

With this release, we"™ve removed the requirement to re-download this product every 60 days.  This was our number one feature request since we made [PowerSE][1] a freeware product.  Now when you download [PowerSE][1] 2.5.3, it is truly freeware and you can use it as long as you like!

#### PowerVI Integration

Since [PowerVI][2] has joined the Devfarm family of products, we have now improved the integration between [PowerVI][2] and [PowerSE][1] and [PowerWF][3]. This enables easier authoring and testing of VMware automation scripts and workflows before you publish them to be integrated in the vSphere client, and it highlights one of the greatest values of the Devfarm products "“ the rich integration between them that make everything much easier.

#### **Tabs to spaces support**

We"™ve added support for configuring how tabs are used in the [PowerSE][1] Script Editor.  If you want spaces inserted when you press the Tab key while editing scripts, all you need to do is to set $psise.Settings.AutoConvertTabsToSpaces to $true in the embedded console.  If you want the tab size to be something other than the default value of 4, you simply set $psise.Settings.TabSize to the number of spaces you want to use for tab characters.  These only need to be set once, so you can simply make the calls in the embedded console and then you"™ll always have it configured that way going forward.

#### Enhanced history pane

The history pane in [PowerSE][1] has always been useful, but now it"™s much better!  With the history pane in [PowerSE][1] 2.5.3, you can identify which commands were successful and which were not, all at a glance by looking at the icon.  You can also tell which commands were allowed to run to completion and which were cancelled.  Most importantly, you can identify the duration of any command that you run, so if you are trying to get the most performance from your scripts, this is an easy way to compare the performance for several related commands so that your scripts run as fast as they can.

#### Greatly improved support for international environments

In previous releases of [PowerSE][1], there were a number of defects preventing international keyboard layouts (i.e. those other than "US English") from working properly in the embedded console.  Those defects have been fixed, so now you can use the embedded console with international keyboards just fine.

We also added support for Unicode characters to the embedded console, making it easier for customers to get the output they expect regardless of where they happen to be.

#### Multi-select support in the File|Open dialog

With [PowerSE][1] 2.5.3, you can open multiple files in one folder at once by simply selecting the files you want before you click on the Open button.  This can be a big timesaver when you are working with modules containing many files!

#### Smarter variable Intellisense

When you enter a variable name in a script, it can be difficult to determine if you are entering the name of an existing variable or if you are creating a new variable.  Previous releases would sometimes complete a variable name incorrectly when you were in fact creating a new variable name.  This shouldn"™t be a problem any longer, because we now allow you to enter new variable names and the auto-completion should only happen when you want it to happen.

#### Proper ps1xml file support

In [PowerSE][1] 2.5.3, if you are working with ps1xml files, you will now get proper Intellisense as well as auto-completion of xml elements as you would expect.

#### Fast clearing of the embedded console window

In today"™s era of PowerShell, we all want to do more in less time, so much so that even typing in cls in the embedded console and pressing Enter can be cumbersome when you do it repeatedly.  [PowerSE][1] 2.5.3 allows you to clear the embedded console window at any time by simply pressing Ctrl+Del.

#### And more"¦

This is just a short list of some of the key changes we have made in this release.  There are others that I want to talk about, but I"™m going to save a few for follow-up blog posts.  We"™ve been spending a lot of time on [PowerSE][1] recently, and between our hard work and your great feedback, we"™ve built a fantastic, best-in-class PowerShell script editor!  If you write PowerShell scripts, I encourage you to give this release a try, and be sure to let us know what you think!  Also, if you have any questions, feel free to leave me a note on my blog or pop over to [www.devfarm.com][4] and ask us directly in the chat window.  We"™re always listening!

Thanks,

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[PowerSE](http://technorati.com/tags/PowerSE),[PowerWF](http://technorati.com/tags/PowerWF),[PowerVI](http://technorati.com/tags/PowerVI),[Devfarm](http://technorati.com/tags/Devfarm)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/717/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/717/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=717&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://powerwf.com/products/powerse.aspx
 [2]: http://powerwf.com/products/powerscripter.aspx
 [3]: http://powerwf.com/products/powerwf.aspx
 [4]: http://www.devfarm.com/
