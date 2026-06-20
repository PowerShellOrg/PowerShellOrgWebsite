---
title: "Episode 38 \"“ PoshCode and PowerShellPlus"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-08-25T12:30:28+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-038.mp3"
aliases:
  - /2008/08/episode-38-poshcode-and-powershellplus/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

Today on the PowerScripting Podcast we have a special roundtable with guests [Joel Bennett][2] and [Mark Schill][3]. We also have the usual cornucopia of of news, tips, and resources. We'll also be announcing the winner of our [/n Software][4] contest from show 36.

### News

_This segment is brought to you by iTripoli!_  
_"Admin Script Editor (which recently received Windows IT Pro's top award) provides a true integrated scripting environment for PowerShell.  The guys at iTripoli haven't done a great job getting the word out about Admin Script Editor so to make up for it they are offering a 50% competitive discount.  Go to [adminscripteditor.com][5] to find out if you qualify."_

  * [PowerShell Plus][6] has gone Professional! Check out the [2.0 beta][7], it's got lots of cool new stuff.
  * [PowerShell Boot Camp Winter 08/09 | SAPIEN Technologies][8]

### Community Roundtable

_This segment is brought to you by Quest._  
_Do you have what it takes to be the ultimate script warrior? Find out with Quest"™s PowerPack Challenge "™08._  
_Quest Software is sponsoring a PowerShell Scripting contest where you can test your skills and get paid. Just create some cool PowerShell scripts using Quest"™s PowerGUI and then post them to our site. You"™ll get a score and our celebrity judges will weigh in as well._  
_Do you have the muscle to bring home the prize? Check out the details [here][9]._  
[This segment mostly revolves around a discussion of PoshCode.org, the script repository for PowerShell which aims to match [CPAN][10] or [PEAR][11] in scope. After an introduction to PoshCode and an update on the site activity, we launch into a discussion of the future of the tool.]

#### PoshCode Requirements List

The "use" requirements

  1. Host snippets of code
  2. Host scripts with multiple functions (including a way to search on verb/noun which will find all the functions in a script)
  3. Host script modules -- _which may_ _contain_ multiple files (need ui for multiple files, and download for "all at once")
  4. Easy in, easy out. (low barrier to entry to contribute, multiple ways to download, view, _browse_, sort, filter)
  5. Compiled Modules would require source code to be uploaded and PoshCode online would compile 
      * _I don't think we want to_ get into compiling things on the server ... let them compile them themselves (we'd have to require *proj files after all) (_Joel_)
      * I'm not actually sure we want to do this at all, it's a deep overlap with every other source control service ...
      * This may be v2 stuff (hal)
  6. Users would be able to select from a list of approved licenses to be applied to their scripts. 
      * License information would be prepended into script upon download
      * licenses: 
          * CC-By (Attribution)
          * CC-PD (Public Domain)
          * GPL (sucks [says Hal])
          * MS-PL
  7. Repository would have the following fields: Description, Usage, PSVersion,  and Version History 
      * Fields would be inserted as comments into the scripts when retrieved.
      * Dependency on other scripts would be controlled by a link to the other script(s).
      * Tags would be used to signify requirements on external dependencies. ex. "VMWare ESX 3.5", "AD 2003", etc.
      * Well we do need a version field for specifing PS version. 
          * We should ask that users be explicit about versions by using the #requires -version n.n header in their scripts/modules. (oisin)
      * Comments
  8. Published WCF interface for external use.
  9. Repository would designed so that users can host their own repositories.
 10. RSS fallback

### Resources

  * [Installing DotNetNuke with PowerShell][12] - "I started building a series of PowerShell scripts for simplifying the process. Although there are installers available for DotNetNuke, they are often out of date and are fairly rigid in how they perform the install. Using PowerShell provides a lot of advantages over a traditional installation program. I have complete control over the installation in an interactive environment and can change any one of dozens of parameters that control the installation."
  * [PowerShell Team Blog : V2 Interview: Universal Code Execution Model][13] - "At TechEd, I did an interview with Kevin Remde where I discussed the V2 Universal Code Execution model in detail. You can see it at: Universal Code Execution Model (UCEM)"”a vision of how PowerShell scripts can run anywhere, anytime in just the right semantics."
  * Dmitry posted about a [SQL Reporting Services PowerPack for PowerGui][14]

### Tips

  * [Nivot Ink - Auto mount/unmount new PSDrives for removable drives and network shares in PowerShell v2][15] - With this module, anytime you add or remove a removable device like an external harddrive or USB key, or map a new network drive in explorer, PowerShell will now automatically add or remove a corresponding PSDrive for you. Sweet!!
  * [IO.File]::ReadAllLines($file).Length is an order of magnitude faster than (get-content $file).length
  * [PowerShell Email Alerts][16]
  * [Neat script too allow RDP sessions only from white-listed workstations][17]

### Contest

Winners for the [/n software][4] [Netcmdlets][18] contest are:

  1. Steve Hiner - Wrote a wrapper for Send-Email script to send email using Gmail's SMTP server
  2. Mark Schill - Sent in two entries, the one we've chosen to highlight is his Twitter IM client bot thingy. It uses Send-IM and Get-Http
  3. Quintus - A script to download an ESPN podcast using the Get-Rss cmdlet

We will be posting the scripts over the next week, so watch the site for those.

### Gotcha

  * Downgrading from PS v2 to v1 causes the snapins installed from v2 to quit functioning--even if they are compatible with v1.  A reinstall of the snapin will fix.

We would like to thank Joel and Mark for coming on the show. We"™d also like to thank Ye11owbeard, JPayleck, and BrandonF for helping us test the [UStream][19] channel.  
Don"™t forget to follow us on twitter ([halr9000][20], [jonwalz][21]), [UStream][19], and [Facebook][22]!

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-038.mp3
 [2]: http://huddledmasses.org
 [3]: http://twitter.com/meson3902
 [4]: http://www.nsoftware.com/
 [5]: http://adminscripteditor.com/
 [6]: http://powershell.com
 [7]: http://www.idera.com/Products/PowerShell/
 [8]: http://blog.sapien.com/index.php/2008/08/19/powershell-boot-camp-winter-0809/
 [9]: https://quest.com/powerscripting
 [10]: http://www.cpan.org
 [11]: http://pear.php.net
 [12]: http://blog.theaccidentalgeek.com/post/2008/08/19/DNN-Tips-amp3b-Tricks-2-Installing-DotNetNuke-with-PowerShell.aspx#continue
 [13]: http://blogs.msdn.com/powershell/archive/2008/08/19/v2-interview-universal-code-execution-model.aspx
 [14]: http://dmitrysotnikov.wordpress.com/2008/08/20/sql-reporting-services-powerpack/
 [15]: http://www.nivot.org/2008/08/16/AutoMountunmountNewPSDrivesForRemovableDrivesAndNetworkSharesInPowerShellV2.aspx
 [16]: http://www.powershellpro.com/powershell-email-alerts/210/
 [17]: http://www.therightstuff.de/2008/02/08/General+Considerations+For+Securing+Windows+Servers+On+The+Internet+And+Anywhere+Else.aspx
 [18]: http://www.nsoftware.com/PowerShell/
 [19]: http://www.ustream.tv/channel/powerscripting-podcast
 [20]: http://twitter.com/halr9000
 [21]: http://twitter.com/jonwalz
 [22]: http://www.new.facebook.com/group.php?gid=7033985478&ref=ts
