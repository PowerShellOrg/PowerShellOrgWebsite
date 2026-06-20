---
title: Episode 57 – Carter Shanklin and the VI Toolkit
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2009-02-02T04:05:47+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-057.mp3"
aliases:
  - /2009/02/episode-57-carter-shanklin-and-the-vi-toolkit/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]



## 
    In This Episode





    Tonight on the PowerScripting Podcast Carter Shanklin from VMWare joins us to talk about the new version of the VI toolkit for PowerShell.




## 
    News





    **





    *When it comes to scripting, you"™re a warrior. But mighty warriors need mighty tools! For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.
 *





    *

Is your scripting might equal to the challenge? Put the power in your hands "“ 
*

*
[download PowerGUI today](http://info.quest.com/QuestSoftwareSponsoredPodcastPowerScripting110408)
*









      **






          - 
            [VMware announces](http://blogs.vmware.com/vipowershell/2009/01/vi-toolkit-15-released.html)

version 1.5 of their VI PowerShell toolkit is now out! [Download](http://www.vmware.com/sdk/vitk_win/index.html)

 -- [Release notes](http://www.vmware.com/support/developer/windowstoolkit/wintk15/windowstoolkit15-200901-releasenotes.html)

 -- [intro videos](http://www.vimeo.com/videos/search:vi-toolkit%2015-release) -- [demo scripts](http://cid-9d77e103d96b1fe8.skydrive.live.com/browse.aspx/Public/PowerShell%20Demos)


          - 
            [Don Jones](http://concentratedtech.com/content/)

is working on a new OSS project called [Cahoots](http://sourceforge.net/projects/cahoots). Please help him [test](http://test.concentratedtech.com/)!


          - 
            According to [Marco Shaw](http://marcoshaw.blogspot.com/2009/01/microsoft-scripting-games-2009.html) the 2009 Scripting Games will be held this summer


          - 
            The PowerShell team is [looking for some feedback](http://blogs.msdn.com/powershell/archive/2009/01/12/please-give-us-feedback.aspx)


          - 
            [There's some great news](http://developer.db4o.com/blogs/product_news/archive/2008/12/30/storing-powershell-objects-into-a-db4o-database.aspx)

from the DB4o team with regards to PowerShell support.


          - 
            The Micrsofot Clustering & HA team [recently announced](http://blogs.msdn.com/clustering/archive/2008/12/26/9253786.aspx) their upcoming support for PowerShell in 2008 Server R2.  Over 30 new cmdlets!










## 
          Interview





          **











                **






                    *This segment is brought to you by Idera:
 *





                    *Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to [www.idera.com/PodcastPeople](http://www.idera.com/PodcastPeople) to get your copy today!*







                  **




#### 

*New stuff:
 *








                      - 

*buncha new cmdlets*



                      - 

*invoke-vmscript, remoting into VMs*









#### 

*Questions:
 *







*meson : ## So what about a XenServer PowerShell book? 😉
 rfoust : ## what is the best way to get started with the vi toolkit - is there a "getting started" guide?*
 jeffculb-1 : ## Why aren't the release notes for the vitoolkit accessible from the download page







*palen : ## Is 1.5 developed with PoSh v2 in mind, or is it still largely targetted at v1?*








*rfoust : ## are there any limitations in this version or is all of the api stuff available through cmdlets?*








*bsonposh : ## make vmotion easier*








*jon_medd : ## can Carter tell us about the new command that lets you run powershell code into vm guests?*








*rfoust : ## does vmware provide an opsmgr mp? if not, why?
 *







*meson : ## Does the toolkit allow you to manage DPM?*








*jeffculb-1 : ## Will there be more videos upcoming demonstrating new commandlets*








*meson : ## Any chance of allowing V2 remoting through VMWare?*








*Pasdargent : ## When running one of these scripts into the VM, does it show the shell on the VM server or is it completely "behind the scenes" to anyone on that box?*








*Pasdargent : This is probably too newbie a question but is the remoting traffic secure?*







                      *glnsize : ## does the explosion of powershell in vmworld, and it's presence at the virtual congress surprise you?*





                      *glnsize : ## why must i include host credentials the guest i get but if im auth through VC*






*Pasdargent : ## Will it pass throough your logged on credentials or do you HAVE to send creds?*








*Jaykul : ## So, is there a way to Invoke-VMScript from, say, 'nix?*








*Jaykul : ## And, do you get results back? (sync? async?)
 *







*meson : ## Is there anything that any PowerShell toolkits can't do?*








*bmichel7150 : ## Is it possible to pipe in multiple text files as variables, i.e., 1 text file with VM names and 2 text files with username and password, kind of like arrays in PS?
 *







*jon_medd : ## what's it like being a product manager for a windows based product in a company that doesn't always have the most friendly relationship with microsoft?
 *







*glnsize : ## do you oversee all the toolkits?
 *







*Pasdargent : ## Aside from PowerShell installed on your guest OS, what else has to be installed or opened to use invoke command?*







                      *A) Needs 3.5 U2 or higher*






*meson : ## can you interact with the host or VMFS partitions within POwerSHell
 *






                      *meson : ## Can I get rid of the VC Client is a good way to ask the question.*






*palen : ## Have any of the new cmdlets in v1.5 originate from the VI Toolkit community extensions?*








*bmichel7150 : ## Can the VI Toolkit talk into the ESX services themselves, I.E, a script to restart mgmt-vmware service?*








*jon_medd : ## will hal update his book for 1.5? i know he is not very busy 🙂*







                      *glnsize : ## what corner of the API are you looking at next, or at this point is it all fit and finish*






*jeffculb-1 : ## is version specific info referenced in the help for the commandlets*








*glnsize : ## what does the release cycle for the toolkit look like only major revs, or will you release as you go?
 *







*aleksandar : ## could carter say something about his experience with running ThinApped PowerShell?
 *







*Pasdargent : ## Are there plans to monetize the VI Toolkit or are you determined for this to be free indefinitely?*







                      **





## 
                          Resources





                          **









                              - 

*eJournal: [Windows Administration in Realtime](http://nexus.realtimepublishers.com/RTWA.htm), look for the Practical PowerShell columns*



                              - 

*In case you missed it Jeffrey Snover was on the [Mind of Root podcast](http://www.mindofroot.com/2009/01/19/episode-83-whos-the-ws-man/) discussing WSMAN
 *



                              - 

*[PoshCode #829 New-Task](http://poshcode.org/829), "Allows for the creation of tasks in Microsoft Outlook from Windows PowerShell. The majority of task options available can be configured with the function."*



                              - 

*[Cool PowerGUI video tutorials](http://www.youtube.com/view_play_list?p=807CCBBC67873456) latest video is on [how to use debugging](http://www.youtube.com/watch?v=jY2pZYxad_0&feature=PlayList&p=807CCBBC67873456&index=5).*












                          **






## 
                            Tips









                            - 
                              [How to open a remote powershell tab in ISE](http://halr9000.com/article/690) (V2 CTP3)














## 
                            One-Liner







                      > 

> 
Write-Host -ForegroundColor Yellow "Modules loaded: $(get-module)"

> 






## 
                          Giveaway





                          Our book offer is brought to you by SAPIEN Press.  You can find information about their books at sapienpress.com.







                            We're giving away two copies of Hal's upcoming book: [Managing VMware Infrastructure with PowerShell: TFM](http://sapienpress.com/vmware.asp).  If you'd like to win a copy, leave us a review on iTunes, or Podcast Alley, or your own blog, or mention us on your Facebook page or whatever. Send a link to [feedback@powerscripting.net](mailto:feedback@powerscripting.net)

 and let us know what and where to verify and you are entered to win!  Be sure to include your mailing address and name.



 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-057.mp3
