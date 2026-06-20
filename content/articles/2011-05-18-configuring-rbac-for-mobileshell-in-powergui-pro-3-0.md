---
title: Configuring RBAC for MobileShell in PowerGUI Pro 3.0
author: Kirk Munro
authors:
  - Kirk Munro
date: "2011-05-19T05:07:45+00:00"
aliases:
  - /2011/05/configuring-rbac-for-mobileshell-in-powergui-pro-3-0/
---

Yesterday we released the public [beta of PowerGUI® Pro 3.0][1], which comes with all sorts of cool new features for [PowerGUI][2] users.  My favorite feature is definitely the new management interface for MobileShell.  With this interface, you can perform systems management from your handheld device very easily.  Here"™s what that might look like from your webkit-enabled web browser:  
[![MobileShell.Actions](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-actions_thumb.png?w=354&h=640)](http://kirkmunro.files.wordpress.com/2011/05/mobileshell-actions1.png)  
Since this is only a beta release, it doesn"™t necessarily have everything fully polished just yet.  One thing that we didn"™t get to include in the beta release was a management console allowing you to associate PowerPacks with AD users and groups as well as instructions describing how you set up MobileShell to use this new interface with the beta.  The PowerPack that will be used to do that will come later.  In the meantime, this post will give you the necessary instructions to get started.

#### Step 1: Install the MobileShell Server

First, you need to find a system with IIS 7 or later installed.  Once you have a system where you will install the MobileShell server, you can run the [PowerGUI Pro][3]MobileShell installer that was included in the beta package.  During that installation, make sure you indicate you will use https for your web site, because the new MobileShell user experience requires https in order for it to function properly. With the MobileShell server installation complete, you have a few configuration tasks that you need to perform to set up PowerPacks

#### Step 2: Add MobileShell Users to the PowerGUI MobileShell Users Local Group

Any user who will access MobileShell needs to be a member of the PowerGUI MobileShell Users local group.  The local group is created automatically by the MobileShell Server installer, so all you need to do is make sure you put the appropriate user accounts in to that local group so that they will have access to MobileShell.  Note that it may take several minutes before MobileShell checks the group again to see if there are new users in the group, so you may need to wait before newly added users can log in to MobileShell.

#### Step 3: Associate PowerPacks with AD Users and Groups

With your MobileShell users configured, you can now associate PowerPacks with different AD users and groups.  When a user logs on to MobileShell, they are presented with any PowerPacks that are associated with their user account or with any groups in which their user account is a member. MobileShell PowerPack configuration is done via a simple xml file.  The file does not exist by default, so you need to create it.  Invoke the following PowerShell script on your MobileShell server to create and open the configuration xml file:


`$programDataPath 

=

 [

Environment

]::

GetFolderPath

(

'

CommonApplicationData

'

)


$powerGUIDataPath 

= 

'

Quest Software\PowerGUI Pro

'


$folder 

= 

Join-Path 

-Path 

$programDataPath 

-ChildPath 

$powerGUIDataPath


if

 (

-not

 (

Test-Path 

-LiteralPath 

$folder

)) {


    New-Item 

-ItemType 

Directory 

-Path 

$folder

 | 

Out-Null


}


$configPath 

= 

Join-Path 

-Path 

$folder 

-ChildPath 

'

MobileShellConfig.xml

'


$configuration 

= 

@"


<?xml version="1.0" encoding="utf-8"?>


  


    


      


        


        


        


        


        


        


      


    


  


  <!-- 


    


      


        


        


      


    


   -->


"@


$configuration

 | 

Out-File 

-FilePath 

$configPath 

-Encoding 

UTF8


notepad 

$configPath

`Once you have the configuration file open, you will see the layout that is used to associate AD user or group SIDs with PowerPacks.  Copy all of the core PowerPacks that you have in the PowerPacks subfolder of your PowerGUI Pro installation folder that you want to use via the MobileShell UI into the same path where this file was created (the value of the $folder variable in the script above contains this path).  Then modify this file to contain only the PowerPacks you copied over, update the first User SID for your user account, and this will finish off the initial configuration of PowerPacks for MobileShell.  If you want to add additional users, you can copy and paste the User node in the XML document and then modify the SID for the users you add.  Retrieving a SID should be an easy task of course: simply use Get-QADUser from the Quest AD cmdlets!![Smile](http://kirkmunro.files.wordpress.com/2011/05/wlemoticon-smile.png?w=595) 

Note: With this beta release there is a bug in the Groups support in this configuration document, so simply associate PowerPacks to users for now.  Thanks!

#### Step 4: Open the New MobileShell User Interface

The new MobileShell User Interface we have in the beta is accessed by opening your webkit-enabled web browser and pointing it to the following website:

> https://_MobileWebServerAddress_/MobileShell/Admin

This web address allows you to try out the new systems management features that you can get from the PowerPacks you just associated with your user account.  Once you log in you should be all set to start using your PowerPacks!

#### A Note About MobileShell Support for PowerPacks

Note that if you try to use this new user interface with a PowerPack other than the ones that currently are included in the beta, by default the nodes and actions in those PowerPacks will not be visible in the MobileShell UI.  This must be explicitly turned on in PowerPacks that you want to access this way.  The reason behind this is because there may be some script that displays a Windows Forms or WPF-based UI on the system where they are run.  When you are remotely managing your environment via your MobileShell Server, you don"™t want any UI to be displayed on the server because that would freeze your web client interface.  For this reason, nodes and actions must be explicitly configured to work with the new MobileShell UI.  I will write a separate post later about how you can do that really easily.  In the meantime, please try MobileShell with the core PowerPacks and see what you think! Hopefully this will help get you up and running with the new MobileShell UI in your test environment.  If you have any questions about this process, please let me know.

Thanks,

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[beta](http://technorati.com/tags/beta),[MobileShell](http://technorati.com/tags/MobileShell)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/568/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/568/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=568&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://poshoholic.com/2011/05/17/try-the-powergui-pro-3-0-beta-today/ "PowerGUI Pro 3.0 Beta"
 [2]: http://www.powergui.org/ "PowerGUI.org"
 [3]: http://www.powerguipro.com/ "PowerGUI Pro"
