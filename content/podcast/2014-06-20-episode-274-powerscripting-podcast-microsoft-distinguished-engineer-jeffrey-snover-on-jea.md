---
title: Episode 274 – PowerScripting Podcast – Microsoft Distinguished Engineer Jeffrey Snover on JEA
authors:
  - Jonathan Walz
date: "2014-06-21T03:46:36+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-274.mp3"
aliases:
  - /2014/06/episode-274-powerscripting-podcast-microsoft-distinguished-engineer-jeffrey-snover-on-jea/
---

**A Podcast about Windows PowerShell.** Listen:


  **[![](http://powerscripting.libsyn.com/img/podcastIcon.gif)](http://traffic.libsyn.com/powerscripting/PSPodcast-274.mp3)**


## In This Episode

Tonight on the PowerScripting Podcast, we talk to Distinguished Engineer Jeffrey Snover

## News

  * The European PowerShell Summit Agenda has been posted
  * NoVaPowerShell User Group is [meeting June 26th][1]
  * SQL Saturday is coming to Birmingham, AL and they are [looking for speakers][2]

## Interview

Guest - Jeffrey Snover

#### Links

  * [PowerShell videos from TechEd 2014][3]
  * [Announcing DSC for Linux][4]
  * [DSC for Linux step by step][5]
  * [How to Enable Powershell Logging][6]
  * [Connect Item: PowerShell support for async APIs][7]
  * [PowerShell Summit videos][8]

#### Notes

  * JEA premises

  * reduce the # of admin privs users
  * credentials persist and can be used to spider
  * limit actions

  * New toolkit based on powershell remoting
  * JEA endpoint = powershell configuration 
      * provisions user w/set of toolkits (and only those)
      * runs as an account with local admin privs
      * JEA endpoint account has only local admin privs
  * “security that isn’t deployed, isn’t security”
  * How can we take advanced features and reduce to a simple set of features to deploy
  * Implemented as DSC
  * PowerShell v5 is required 
      * Why: any time that WinRM changes are made, WinRM service must be restarted, and v4 has a bug in WinRM
  * Very similar to sudo from *nix, but more fine-grained, e.g. limit which process can be stopped by stop-process
  * Build CSV as input to a toolkit spec 
      * module
      * command(s)
      * parameters
  * Logging is sent to ETW/PowerShell, and is broken down by module
  * Will ship as a set of toolkits
  * OMI runs on 41 Linux distros
  * “CTP next month” (meaning July?)
  * “yes, moving back towards developers and new .net features”

#### Chatroom Highlights:

[21:37:02]  ## when is the next one [MVA]?  
[21:38:07]  ## Will there be a DSC video series on MVA?  
[21:45:05]  ## What kind f pats do yu wear  
[21:45:15] 
 just to get it out of the way - ## are classes coming to PS5, anything to share on the implementation?  Is a new PowerShell MVA on the way, what might be covered?  when will we get the PowerShell source code? : )  Maybe too early for the last one!  
[21:45:18]  ## is JEA based on PowerShell remoting?  
[21:48:48]  ## DSC for Linux is based on OMI. Can we expect easy OMI-to-DSC implementations? Like DSC for Cisco/ Arista/ Huawei?  
[21:49:05]  ## Whats the approach for using JEA on Domain Controllers? I guess you'd be forced to use a Domain Account for RunAs  
[21:51:17]  ## Can JEA be ran on all version of powershell?  
[21:58:43]  ## Why New-Object in JEA?  
[21:59:26]  halr9000: When I was watching Jeffrey presentation: he defined (exposed) new-object in endpoint.  
[21:59:11] 
 ## How do you handle the "chain of evidence" for the actions performed?  
[22:03:18]  ##### Payette "outed" classes in v5 on Twitter yesterday. Inquiring minds wanna confirmation.  
[22:13:54] 
 ## will the slides from the Monad Manifesto update be made available?  Might be helpful for those that missed it  
[22:18:24]  wish OMI was packaged and available in most distros  
[22:20:17]  ## @jsnover With a project as huge as Powershell, how have you gone about managing it (other than check marks off the Monad Manifesto)?  
[22:22:11]  ## @jsnover How do you 'unplug' -- to clear your head -- before diving back into the work?  
[22:42:26] 
 ## Jeffrey tweeted about DSC being fast tracked for the common engineering criteria a while back... in what sense?  standard for configuration management? Something else?  
[22:44:23] <_____> "How I learned to stop clicking and love the shell" Jeffrey Snover  
[22:47:50]  ## why not xResources on GitHub, so that others can jump on it and help? We had some fixes to cResources and than almost the same on xResource.  
 @sepek I was looking at this one <http://www.ncix.com/detail/cooler-ma...85648-1141.htm>  
 <http://www.ncix.com/detail/cooler-master-storm-devastator-ms1k-cc-85648-1141.htm>  
 ## <http://channel9.msdn.com/Events/TechEd/NorthAmerica/2014?sort=sequential&direction=desc&term=powershell#fbid=>  
 http://vaughnlive.tv/embed/video/jonwalz  
 <http://channel9.msdn.com/Events/TechEd/NorthAmerica/2014/DCIM-B362#fbid=>   <_- refered to video  

 jcotton - check out <http://blogs.technet.com/b/privatecloud/archive/2014/05/14/just-enough-administration-step-by-step.aspx>  
 DSC on linux: <http://blogs.msdn.com/b/powershell/archive/2014/05/19/announcing-windows-powershell-desired-state-configuration-for-linux.aspx>  
 DSC on linux step by step: <http://blogs.technet.com/b/privatecloud/archive/2014/05/19/powershell-dsc-for-linux-step-by-step.aspx>  
 Steve Murawski is speaking on DSC next Wednesday for the PowerShell Virtual Chapter of SQLPASS: <http://powershell.sqlpass.org/>  
 <http://www.petri.co.il/enable-powershell-logging.htm>\# - enable command logging  
 <https://powershell.org/community-events/summit/>  

 <https://connect.microsoft.com/PowerShell/feedback/details/838221/powershell-must-support-calling-async-apis>  
 gpduck: <http://gallery.technet.microsoft.com/Invoke-Generic-Methods-bf7675af>  
 <http://blog.opslogix.com/?p=217>  
 Nexus 6k OMI guide - [http://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus6000/sw/omi/b_OMI_guide_chapter_01.html][9]  
 did anyone see this article last month: <http://blog.opslogix.com/?p=203>  
 any chance of a DSC getting added to the TLGs?   <http://social.technet.microsoft.com/wiki/contents/articles/1262.test-lab-guides.aspx>  
 AlexTeachesTech: <http://technet.microsoft.com/en-us/virtuallabs/bb467605.aspx>  
 <https://vlabs.holsystems.com/vlabs/technet?eng=VLabs&auth=none&src=microsoft.holsystems.com&altadd=true&labid=10846>  

 AlexTeachesTech - presumably a subset or superset of something like <https://automatedlab.codeplex.com/> could be handled by DSC  

 AlexTeachesTech <https://www.youtube.com/channel/UCX27-k3xeNSgXVklCx-dnXQ>  
<_____> <https://powershell.org/2013/05/07/powershell-summit-videos/>  
<_____> <https://pbs.twimg.com/media/BpxkHsKCUAAUPcN.jpg:large>  
 this song in spotify <http://open.spotify.com/track/6wfPPd3eNgBoW7YXMwzRb0>  
 <http://grooveshark.com/s/Hurricane+Season/3Ctx2y?src=5>  


#### The Question - How do you unplug?

  * Beer and yoga

 [1]: https://powershell.org/event/june-nova-powershell-user-group/
 [2]: http://www.sqlsaturday.com/328/eventhome.aspx
 [3]: http://channel9.msdn.com/Events/TechEd/NorthAmerica/2014?sort=sequential&direction=desc&term=powershell#fbid=
 [4]: http://blogs.msdn.com/b/powershell/archive/2014/05/19/announcing-windows-powershell-desired-state-configuration-for-linux.aspx
 [5]: http://blogs.technet.com/b/privatecloud/archive/2014/05/19/powershell-dsc-for-linux-step-by-step.aspx
 [6]: http://www.petri.co.il/enable-powershell-logging.htm#
 [7]: https://connect.microsoft.com/PowerShell/feedback/details/838221/powershell-must-support-calling-async-apis
 [8]: https://powershell.org/2013/05/07/powershell-summit-videos/
 [9]: http://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus6000/sw/omi/b_OMI_guide_chapter_01.html
