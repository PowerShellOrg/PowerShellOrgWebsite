---
title: "PowerGUI® Pro 3.0: Mobile Systems Management Using MobileShell"
authors:
  - Kirk Munro
date: "2011-07-18T21:18:22+00:00"
aliases:
  - /2011/07/powergui-pro-3-0-mobile-systems-management-using-mobileshell/
---

In case you missed the announcement last Friday, [[PowerGUI Pro][1] ][2]3.0 was released to the web.  With this release we included a new feature that I"™m really excited about: Mobile Systems Management Using MobileShell.  We"™ve had MobileShell for quite a while, but prior to this release you could only use it to invoke your favorite scripts or commands from modules associated with your user account as well as ad hoc commands you wanted to run.  Here"™s a screenshot tour showing you what this interface would look like on a handheld device:

[![PowerGUI Pro MobileShell - Favorites - 1 of 4](http://kirkmunro.files.wordpress.com/2011/07/image_thumb1.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image1.png)   [![PowerGUI Pro MobileShell - Favorites - 2 of 4](http://kirkmunro.files.wordpress.com/2011/07/image_thumb2.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image2.png)   [![PowerGUI Pro MobileShell - Favorites - 3 of 4](http://kirkmunro.files.wordpress.com/2011/07/image_thumb3.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image3.png)   [![PowerGUI Pro MobileShell - Favorites - 4 of 4](http://kirkmunro.files.wordpress.com/2011/07/image_thumb4.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image4.png)

As you can see from this, the capabilities in this version were very cool (what"™s not to like about running PowerShell from your smartphone), but they were somewhat limiting as well because you couldn"™t really work with a management user interface from your handheld device this way.

[PowerGUI Pro][1] 3.0 changes all of that, by including a new management interface for MobileShell that is based on PowerPacks (in case you don"™t know already, PowerPacks are extensions for the [PowerGUI][2] Administrative Console that provide a management experience much like MMC, but that are driven entirely by Windows PowerShell commands and scripts).  With 3.0 we"™ve provided a new mobile interface for MobileShell that allows you to use PowerPacks associated with your AD user account or groups that you are a member of from your mobile device!  Also, we"™ve made the management experience even more responsive at the same time, so now you can do more with MobileShell and it will do it more quickly than before!  All you need is a mobile device with a WebKit-enabled web browser (sorry, that means no BlackBerry 5.x or Windows Phone 7 support for now).

Here"™s a screenshot tour showing you how this new experience can be used to do something very simple like unlock a user account:

[![PowerGUI Pro MobileShell ScreenShot Tour - 1 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb5.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image5.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 2 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb6.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image6.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 3 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb7.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image7.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 4 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb8.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image8.png)

[![PowerGUI Pro MobileShell ScreenShot Tour - 5 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb9.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image9.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 6 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb10.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image10.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 7 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb11.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image11.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 8 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb12.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image12.png)

[![PowerGUI Pro MobileShell ScreenShot Tour - 9 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb13.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image13.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 10 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb14.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image14.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 11 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb15.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image15.png)   [![PowerGUI Pro MobileShell ScreenShot Tour - 12 of 12](http://kirkmunro.files.wordpress.com/2011/07/image_thumb16.png?w=136&h=244)](http://kirkmunro.files.wordpress.com/2011/07/image16.png)

As you can see from this screenshot tour, this user experience is much richer and it gives you a full management console on the go, allowing you to respond to issues you are responsible for no matter where you are or what time it is.  It"™s also configurable using role-based access control (RBAC), so you can assign different PowerPacks to different MobileShell users based on their AD user and group membership.  Even better, we make configuration of this functionality even easier by providing you with a MobileShell Administration PowerPack as part of the PowerGUI Pro 3.0 package.

If you"™re interested in trying this functionality out, here"™s what you need to do:

  1. Make sure you have an IIS server ready where you can install it.
  2. Install MobileShell on the IIS server.  The MobileShell installer is pretty self-explanatory.
  3. If you didn"™t add the MobileShell users during the installation, add anyone who you want to be able to access MobileShell to the PowerGUI MobileShell Users group (note: there may be a delay once you add users before they have access, up to 15 minutes).
  4. Install the PowerGUI Pro Admin Console on the IIS Server with the MobileShell Administration PowerPack.
  5. Open the PowerGUI Pro Admin Console.
  6. In the MobileShell Administration PowerPack, select Users and then click on the Add User action to add your user account.  Repeat this for each user account you want to provide access to.
  7. Select the PowerPacks node and then click on the Publish PowerPack action.  Provide the path for the PowerPack you want to expose via MobileShell and then click on OK.  Repeat this for each PowerPack you want to expose via MobileShell.
  8. Go back to the Users node, select the users you want to provide PowerPack access to, and then click on Assign PowerPack to assign one of the PowerPacks you have published to the selected users.

At this point you should be ready to go with your first MobileShell management experience.  Point your WebKit-enabled web browser to https://_serverName_/MobileShell/Admin, sign-in, and you"™re off and running!

Note: PowerPacks don"™t support the new MobileShell management experience by default.  We made the decision to make it off by default because we wouldn"™t be able to tell which PowerPacks would display UI on the web server (such as a message box) reliably.  Any PowerPack can support this new experience though, they just need to be updated to suppor tit. The core PowerPacks that ship with PowerGUI Pro have been updated to support this new management experience so you"™re already enabled with a rich mobile management experience for Active Directory, VMware, Exchange, and Windows management.  I"™ll write another post later that describes what is required to turn on mobile management for a PowerPack.

That"™s it for this post.  If you have any questions, don"™t hesitate to ask.

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[MobileShell](http://technorati.com/tags/MobileShell)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/648/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/648/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=648&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://www.powerguipro.com/ "PowerGUI Pro"
 [2]: http://www.powergui.org/ "PowerGUI.org"
