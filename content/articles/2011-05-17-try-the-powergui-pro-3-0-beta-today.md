---
title: Try the PowerGUI Pro® 3.0 Beta today!
authors:
  - Kirk Munro
date: "2011-05-17T15:00:00+00:00"
aliases:
  - /2011/05/try-the-powergui-pro-3-0-beta-today/
---

Today marks another exciting milestone for [PowerGUI][1], as we release a [public beta][2] of [PowerGUI Pro][3] 3.0 to the web.  We"™ve been working very hard on this release, and it includes a lot of new and improved features.   The highlights of this release are shown below.

#### MobileShell Now Supports PowerPack Rendering

A lot of our customers have been requesting this feature for a while (myself included!).  With PowerGUI Pro 3.0, you can now expose PowerPacks to MobileShell users!  An xml document is used to provide role-based access control (RBAC) to PowerGUI PowerPacks.  You simply associate PowerPack files with Active Directory users or groups, and when a user logs in they will see the PowerPacks that are configured for them!  Here"™s a screenshot showing the top level of MobileShell, where you can see the PowerPacks that have been exposed to this user:

![MobileShell.PowerPackList](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-powerpacklist.png?w=354&h=640) 

Just like in the Admin Console, you can browse through nodes and see child nodes:

![MobileShell.BrowsingTheTree](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-browsingthetree.png?w=354&h=640) 

Once you invoke a node that returns data, you can see the records showing up in the MobileShell PowerPack Rendering UI:

![MobileShell.NodeDataInGrid](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-nodedataingrid.png?w=354&h=640) 

Clicking on any of these child nodes allows you to see more object detail if any is available as well as any actions that are available for the object:

![MobileShell.Actions](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-actions.png?w=354&h=640) 

This gives you full PowerPack support on your handheld device!  Devices supported include all iOS devices (iPhone, iPad), Android and BlackBerry 6.0 and later devices.  You can also use the Google Chrome or Apple Safari web browsers from your desktop.  If you don"™t have a webkit-enabled web browser on your device or laptop, or if you want to invoke an ad-hoc command from your mobile device, you can still use the other MobileShell user experiences that we released in previous versions of PowerGUI Pro "“ they are still supported in PowerGUI Pro 3.0.

#### New Interactive Welcome Page in Script Editor and Admin Console

We have updated our Welcome Page that we have had all along in the Admin Console and we"™ve made it available in the Script Editor as well.  This page now allows you to keep track of the latest PowerPacks or Add-ons on PowerGUI.org, monitor your favorite RSS feeds, see a featured video from the PowerShell and PowerGUI channel on YouTube, or read the latest tip of the day.

[![ScriptEditor.MainView](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-mainview_thumb.png?w=604&h=464)](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-mainview.png)

#### Create Executable Files from Scripts

Many customers have asked us for the ability to create executable files from scripts.  This is very useful, especially if you want to send someone the functionality you design in a script so that they can execute it without any difficulty.  PowerGUI Pro 3.0 includes this functionality, allowing you to build executable files that may be optionally password protected if they contain sensitive information.  You can also include any additional files that a script is dependent on as part of the package.  The only requirements for these executables are for PowerShell 2.0 itself to be installed and for the script requirements to be satisfied (if there are any).

[![ScriptEditor.CompileScript](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-compilescript_thumb.png?w=604&h=466)](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-compilescript.png)

#### Improved Version Control Integration

PowerGUI Pro has included Version Control support since its first release.  In PowerGUI Pro 3.0, we have improved this integration by providing a new **Get Files from Version Control** menu item in the **Version Control** menu to allow you to retrieve files from version control.  We have also simplified the check-in process so that you can disable the display of the check-in description dialog if it is not required by the version control provider.  This allows for a more streamlined check-in experience when working with Team Foundation Server.

#### Reset Runspace on Demand

As you create and modify scripts in the Script Editor, you are often changing the state of the PowerShell session, loading or unloading modules or snapins, or adding, removing or modifying functions or variables.  When this happens, it is a recommended practice to re-run your script from a clean state to make sure that something isn"™t working simply because of the current state of your system.  Getting to a clean state in the PowerGUI Script Editor just got easier in PowerGUI Pro 3.0.  Now all you need to do is select Reset Runspace from the Debug menu and your functions, aliases and variables will be cleaned up and all of your modules and snapins will be unloaded and reloaded.

[![ScriptEditor.ResetRunspaceOnDemand](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-resetrunspaceondemand_thumb.png?w=604&h=466)](http://kirkmunro.files.wordpress.com/2011/05/scripteditor-resetrunspaceondemand.png)

#### Go to Definition Support for Functions

As you work with PowerShell, the number of files containing commands you use can grow.  This commonly happens as users create multiple modules they manage or use modules they download from other sources.  In cases where you work with functions from different sources, you may want to go to a definition for a function to see how it is implemented.  In PowerGUI Pro 3.0, you can right-click on a function name in the Script Editor and go to the definition of that function by selecting **Go to Definition** from the context menu.

#### Find PowerPacks Online with Click-Once Install

You can now search for PowerPacks on the PowerGUI.org website right from within the PowerGUI Administrative Console.  Searching is done using keyword matches, and if you want to see all PowerPacks simply perform a search without entering any keywords.  Once you have found the PowerPack you want, select it and click on the **Install** button to download, unblock, install and import the PowerPack automatically.

[![AdminConsole.FindPowerPacksOnline](http://kirkmunro.files.wordpress.com/2011/05/adminconsole-findpowerpacksonline_thumb.png?w=604&h=449)](http://kirkmunro.files.wordpress.com/2011/05/adminconsole-findpowerpacksonline.png)

#### Authoring Mode for the Administrative Console

If you know PowerShell, you may want all the capabilities that are available in the Administrative Console to be available to you so that you can customize it to meet your needs.  This allows you to create a tailored management experience for yourself or other users in your organization.  If you provide the Administrative Console with PowerPacks to other users in your organization, they may not know PowerShell, in which case you really don"™t want them to change the configuration of the PowerPacks you give them.  The PowerGUI Administrative Console now has Authoring Mode for users who want to be able to modify PowerPacks, and basic (read-only) mode for users who shouldn"™t be modifying PowerPacks.  Simply set the system up with the appropriate shortcut for the user who uses the Administrative Console and you won"™t have to worry about them accidentally changing something anymore.

#### 

#### And that"™s not all!

We also have a lot of other improvements in the product as well that were added as part of the PowerGUI Pro 3.0 release.  Here"™s a list of a few more notable changes:

  * Improved Action functionality in the Administrative Console;
  * Automatic loading of required modules or snapins when a PowerPack is loaded;
  * Automatic variables for $PGHome, $PGUICulture, $PGVersionTable and $PGSE;
  * Multi-line command support for the embedded PowerShell Console; and
  * For Add-on authors, $PGSE is now defined by default and name lookups of UI elements is now case-insensitive

There are other fixes as well, but this short list gives you an idea of some of the other things that are included in this release.  Each of these improvements were suggested by various members of our community, so please keep the feedback coming, we"™re really listening!

#### This sounds great!  Where can I get the beta?

You can download the public beta of PowerGUI Pro 3.0 right now by clicking on the **Download** button on the [PowerGUI Pro 3.0 Public Beta page][2] on [PowerGUI.org][4].  That page also describes what the beta package contains as well.  PowerGUI Pro can be installed side-by-side with PowerGUI freeware, so if you are a freeware user and want to try this out, you can install the beta without disrupting anything you do with the freeware product.

#### Provide your feedback on the PowerGUI forums!

We will be running this beta for a short period while we work on finishing up this release.  Your feedback is very important during this beta cycle, so please give the beta release a try and share your feedback by posting messages on the [PowerGUI forums][5].  The sooner we get your feedback, the sooner we can respond to it.  I"™m really looking forward to hearing what you like, what you don"™t like, and what else you would like to see in this and future releases, so please share your thoughts with us.

That about wraps it up for this post, so if you made it here, thank you for reading this far and please, give [PowerGUI Pro 3.0 Beta][6] a try to see what you think about it!

Happy testing!

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[beta](http://technorati.com/tags/beta)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/558/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/558/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=558&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://www.powergui.org/ "PowerGUI.org"
 [2]: http://www.powergui.org/entry.jspa?externalID=3523 "PowerGUI Pro 3.0 Public Beta"
 [3]: http://www.powerguipro.com/ "PowerGUI Pro"
 [4]: http://www.powergui.org/entry.jspa?externalID=3523 "PowerGUI.org"
 [5]: http://www.powergui.org/forumindex.jspa?categoryID=55 "PowerGUI Forums"
 [6]: http://www.powergui.org/entry.jspa?externalID=3523 "PowerGUI Pro 3.0 Beta"
