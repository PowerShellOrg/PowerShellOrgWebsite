---
title: Episode 199 – Rob Reynolds talks PowerShell and Chocolatey
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2012-09-07T12:15:27+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-199.mp3"
aliases:
  - /2012/09/episode-199-rob-reynolds-talks-powershell-and-chocolatey/
---

**A Podcast about Windows PowerShell.**
 Listen:


  **[![](http://powerscripting.libsyn.com/img/podcastIcon.gif)](http://traffic.libsyn.com/powerscripting/PSPodcast-199.mp3)**


## In This Episode

****Tonight on the PowerScripting Podcast, we talk to Rob Reynolds about Chocolatey****

## Interview


  Guests - Rob Reynolds


#### Links

  * 

      [http://chocolatey.org](http://chocolatey.org/)



  * 

      [http://github.com/chucknorris](http://github.com/chucknorris)



  * 

      [http://devlicio.us/blogs/rob_reynolds](http://devlicio.us/blogs/rob_reynolds)



  * 

      [http://ferventcoder.com](http://ferventcoder.com/)



  * 

      [http://twitter.com/ferventcoder](http://twitter.com/ferventcoder)



  * 

      [http://octopusdeploy.com](http://octopusdeploy.com/)



  * 

      [http://www.myget.org](http://www.myget.org/)



  * 

      [http://nuget.org](http://nuget.org/)



#### The Question -


  Superhero: Hiro


**** ****


  Chatroom Banter


**** ****


  [22:22:16]  http://chocolatey.org/


  [22:23:34]  http://nuget.org/


  [22:24:32]  a Visual Studio extension that makes it easy to install and update third-party libraries and tools


  [22:26:20]  [http://docs.castleproject.org/](http://docs.castleproject.org/)


  [22:26:41]  [http://docs.castleproject.org/Windsor.MainPage.ashx](http://docs.castleproject.org/Windsor.MainPage.ashx)


  [22:31:24]  http://www.myget.org/


  [22:32:07]  paste the command from the site into your CMD prompt


  [23:10:48] 
 Kick the bucket == A common theory is that the idiom comes from a method of execution such as hanging, or perhaps suicide, in the Middle Ages.[3] A noose is tied around the neck while standing on an overturned bucket. When the pail is kicked away, the victim is hanged.


  [23:50:50]  so I'm still checking out this Chocolatey stuff...just to clarify it goes out and finds the bits to install, then silent installs for me?


  [23:51:01]  yep


  [23:51:09]  best example is just to do it


  [23:51:32]  @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('http://bit.ly/psChocInstall'))" && SET PATH=%PATH%;%systemdrive%chocolateybin


  [23:51:43]  in a command line


  [23:51:47]  followed by


  [23:51:59]  it's a powershell module that it installs?


  [23:52:15]  cinst 7zip.commandline


  [23:52:31]  chocolatey is a collection of powershell modules


  [23:52:37]  but they don't end up in your profile at all


  [23:52:47]  where do they go?


  [23:52:48]  because in the end chocolatey is a command line application


  [23:52:58]  oh


  [23:53:03]  chocolatey.cmd ends up on the path


  [23:53:06]  so does it get installed to add/remove programs?


  [23:53:10]  nope


  [23:53:28]  it works (darn it, should have mentioned this) in low privilege environments


  [23:53:33]  not that I would want to, but how would you uninstall?


  [23:53:48]  delete the folder


  [23:53:54]  oh


  [23:53:57]  and update the path reference
