---
title: Episode 15 – Joel Bennett, for the developers in the house
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-12-23T19:06:46+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-015.mp3"
aliases:
  - /2007/12/powerscripting-podcast-episode-15-for-the-developers-in-the-house/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]

### In This Episode

  * Special guest this episode, Joel Bennett aka "Jaykul" from [HuddledMasses.org][2]
  * "The Developer Show"
  * New software releases, interviews, other goodies

### News

  * [AD Cmdlets RTM][3] (Dmitry"™s PowerBlog)"We kind of kept sticking to the fashion of perpetual betas for quite some time now (since the first 1.0 beta released late March through the RC 1.0.5 this fall) and we feel that the product is now feature rich and stable enough..."
  * [Windows PowerShell Holiday Gift Guide: Books][4] (Technet Scripting Center)"The Scripting Guys present their first-ever Windows PowerShell Holiday Gift Guide. In this inaugural gift guide we survey some of the best PowerShell software, script editors, cmdlets, and add-ins that money can buy."
  * [An Interview with Lee Holmes][5] (Technet Scripting Center)"Lee Holmes is a developer on the Windows PowerShell team and author of the new book Windows PowerShell Cookbook (which includes a foreword written by Scripting Guy Dean Tsaltas)."
  * [An Interview with Lee Holmes][6] (A Couple of Admins Podcast)
  * [Cisco opening up IOS][7] (Network World)"Cisco's plan to open up its venerable IOS routing software to customers and third-party developers is a bold move designed to further the company's push to make the network the epicenter of the virtual data center."

### Resources

  * [Expresso Regular Expression Development Tool][8]Very cool tool to create regexes.  Free registration required.[![image](http://halr9000.com/stuff/PowerScriptingPodcastEpisode15Forthedeve_C63E/image.png)][8]

### Tips

  * Discussion on an email from listener John Cook:

> "I'm a programmer, so I don't find PowerShell (or VBScript etc.) difficult as a language. What I find difficult about scripting is scripting itself, such as recognizing when it's worth the effort to write a script. I'm a big fan of scripting, but I don't write a lot of scripts because I don't think to do it. Or I'm doing something that's not repetitive enough to script.  
> I would find it interesting to listen to a show about scripting strategy: organizing tasks so they can be scripted, etc.  
> I would also find it interesting to hear a discussion about testing scripts. I'm a fan of test-driven development, but scripts are hard to test. Scripts are full of side effects: creating or deleting files, setting properties, sending email, etc."

  * Discussion with Joel about his new Windows Automation Snapin for PowerShell (WASP) 
      * Blog post: [http://huddledmasses.org/window-gui-automation-from-powershell/][9]
      * New Codeplex project: [http://codeplex.com/WASP][10]
      * This is basically an upgrade to the [Win32.Windows snapin][11] Joel released a while back, the one thing that"™s missing in this release that was possible in that one is using frame-set definitions to position windows. That will make it back in eventually, but in the meantime, I present some major new additions which add up to the ability to do 90% of what you"™d want to do in testing or automating your winforms app"™s UI.
  * Also covered: Joel's experiences developing a Windows Presentation Foundation (WPF) PowerShell host.

### One-Liner


`(new-object -com SAPI.SpVoice).Speak("Hello $($env:UserName)",2)
`[1]: http://media.libsyn.com/media/powerscripting/PSPodcast-015.mp3
 [2]: http://HuddledMasses.org
 [3]: http://dmitrysotnikov.wordpress.com/2007/12/20/ad-cmdlets-rtm/
 [4]: http://www.microsoft.com/technet/scriptcenter/topics/winpsh/tools/guide.mspx
 [5]: http://www.microsoft.com/technet/scriptcenter/resources/interviews/leeholmes.mspx
 [6]: http://acoupleofadmins.com/2007/12/14/recipes-this-aint-stone-soup-were-makin/
 [7]: http://www.networkworld.com/news/2007/121207-cisco-ios.html
 [8]: http://www.ultrapico.com/Expresso.htm
 [9]: http://huddledmasses.org/window-gui-automation-from-powershell/ "http://huddledmasses.org/window-gui-automation-from-powershell/"
 [10]: http://codeplex.com/WASP "http://codeplex.com/WASP"
 [11]: http://huddledmasses.org/control-windows-from-powershell/
