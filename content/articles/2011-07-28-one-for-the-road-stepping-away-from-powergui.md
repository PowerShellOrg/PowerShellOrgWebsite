---
title: "One for the road: Stepping away from PowerGUI®"
author: Kirk Munro
authors:
  - Kirk Munro
date: "2011-07-29T04:01:30+00:00"
aliases:
  - /2011/07/one-for-the-road-stepping-away-from-powergui/
---

Today was one of my most difficult days in my 7½+ year career at Quest Software.  The same week that I was given a performance raise (I got that email on Monday), this afternoon I got a phone call from the director over my business unit letting me know that my position has been cut effective immediately.  Part of a book balancing effort it seems –  funny (or not so much) how life works sometimes.

I"™ve accomplished a lot while working at Quest, and spent a ton of professional and personal energy on the company and its products, particularly [PowerGUI][1] (far too much energy if you ask my wife, and today I must say I"™m tending to agree).

Since I started working with the PowerGUI team at Quest back in 2007 (back in the version 1.0.x days) I have:

  * been awarded the Microsoft MVP award for my community support Windows PowerShell four years in a row 
  * received recognition as a Quest Software expert in Windows Management (only 1% of the company employees have received this recognition) 
  * provided feedback and direction over the product and its features through 3 major release cycles and many minor releases 
  * supported the product and the community as a PowerPack developer, then as a PowerShell Solutions Architect, and most recently as the Product Manager (although I never could get those other positions backfilled so I ended up wearing all three hats most of the time) 
  * released dozens of extensions for the product, including PowerPacks for platforms such as Active Directory, VMware, Hyper-V, and Exchange, and Add-ons such as the [Script Editor Essentials][2] Add-on or others for specific features such as script signing, transcription, the PowerShell blue console theme, and many more 
  * pushed the number of commercial features in PowerGUI Pro from two when I took over as Product Manager to over six in the current version with many more on the way 
  * initiated strategic partnerships with key enterprises such as NetApp and Intel and helped them create their own PowerPacks for their platforms 
  * helped drive traffic to the [powergui.org][3] site through my blog and through social media as we grew the number of downloads from 100000 to over 1.2 million 
  * provided feedback and direction to internal teams at Quest with PowerShell support in their products 
  * successfully presented well-received PowerShell-focused sessions at many user groups and also at conferences such as Microsoft TechEd, the TEC conference, the PowerShell Deep Dive (a mini-conference in the TEC conference), and TechDays Canada 
  * been elected as President for the [PowerShellCommunity.org][4] site 
  * coordinated and provided direction over the first ever PowerShell Deep Dive conference

Unfortunately, most of that is now a legacy as it came to an abrupt end today.  I"™m still a PowerShell MVP, and I will still be involved with the PowerShell community, however my work on PowerGUI has stopped for now.

Before I step back from this though, and before I reorganize/refocus my efforts onto more important things, I wanted to share one more new PowerGUI feature that I recently created for the community that I have spent so much time with these past 4 years.  I still have a strong affinity for PowerGUI and a lot of my heart and soul has gone into this product, and this feature is just a small example of that effort.  The new feature comes as part of the [Call Stack Window add-on][5] that I just published in the PowerGUI Add-on library.  Here"™s a screenshot showing you what this add-on looks like in action:

[![PowerGUI Script Editor Call Stack Window](http://kirkmunro.files.wordpress.com/2011/07/debugwindows-callstack.png?w=604&h=422)][5]

This add-on adds a call stack window to your PowerGUI Script Editor every time you start debugging a script. Working with a call stack while you debug anything beyond the most simple of scripts is essential because it provides you with a list of all nested calls that led up to the current line of script in your debug session. You can use this to determine where functions are being called from by setting a breakpoint inside a function and then walking up the call stack to see the script used to call the function. Also, this window has double-click support, so if you would like to go to any location in the call stack, simply double-click on the location you wish to see and the add-on will take you there, even if the file in question isn"™t open at the time.

I was considering putting this feature in the Pro version in a future release, but that is beyond my control now so I decided I"™d share what I have today and let you guys have fun with it.  Since I created the feature in this add-on, it"™s been an incredibly useful feature to me and I hope you guys enjoy it as well.  To get this Add-on, simply select Tools | Find Add-ons Online in your PowerGUI Script Editor and search for "Call Stack".

That will most likely be my last PowerGUI-centric post for a while, and it will be my last post for at least a week while I take a much needed vacation before moving on to new things.

Thank you for your continued support through the past four years.  I hope this post finds you well.

Sincerely,

Kirk Munro  
Former Product Manager of PowerGUI Pro and PowerGUI

P.S. If you are in need of someone with my skills, either as a Product Manager, a PowerShell MVP, an expert in Windows management (with a strong focus on Active Directory and Exchange although I"™ve also gotten deeply involved in virtualization with Hyper-V and VMware as well), a social media/community site manager, or as a freelance writer, my schedule has all of a sudden become much less busy and I"™m interested in filling up that time with new work once I come back from vacation, so please get in touch.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerGUI Pro](http://technorati.com/tags/PowerGUI+Pro),[PowerGUI](http://technorati.com/tags/PowerGUI)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/679/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/679/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=679&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://www.powergui.org/ "PowerGUI.org"
 [2]: http://www.powergui.org/entry.jspa?externalID=2952 "PowerGUI Script Editor Essentials Add-on"
 [3]: http://www.powergui.org/entry.jspa?externalID=3523 "PowerGUI.org"
 [4]: http://powershellcommunity.org/
 [5]: http://www.powergui.org/entry.jspa?categoryID=387&externalID=3641 "PowerGUI Script Editor Call Stack Window Add-on"
