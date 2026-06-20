---
title: Episode 9 – PowerShell V2 news is coming in November
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-09-29T23:55:53+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-009.mp3"
aliases:
  - /2007/09/powerscripting-podcast-episode-9/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]  
**Introduction**

  * Thanks to //o// and Kirk at [Poshoholic][2] for mentioning us on their blogs. We loved Kirk's post about [namespaces][3] with the Star Trek references.  That's the Trouble with Tribbles!

**News**

  * According to Bruce Payette in this [post][4], details of PowerShell V2's upcoming features will be released in November at ITForum!
  * From <$hay@Israel'> s blog: [There is a new book][5] titled "Windows PowerShell in Practice" that is being worked on by [Jim Truher][6] and [//o//][7].  It will be published by Manning and will cover topics such as, the PowerShell SDK (writing cmdlets, providers etc) advanced scripting techniques and domain specific examples.
  * [Citrix, Citrix, and more Citrix][8]!  Brandon Shell has gifted us with a veritable cornucopia of sixteen (16!) Citrix management functions such as: 
      * Get-CitrixFarm
      * Publish-CitrixApplication
  * Keith Hill and [//o//][7] will be a guest speaker in the first [Windows PowerShell Virtual User Group Meeting][9] (From Marco Shaw's blog) 
      * Keith will talk about [PSCX (PowerShell Community Extensions)][10] and open source development
      * [//o//][7] will talk about [PowerTab][11]
      * October 3rd noon EST Online via Live Meeting 2007 (Microsoft is hosting so you need to use your Live ID)
  * Phoul from the #Powershell IRC channel has a new blog up(<http://insecure-complexity.com/>).  In his own words: 
      * "Especially to the new PowerShell users. I'm writing a blog that will be focused around my findings in my experience learning PowerShell. It will have scripts and tutorials and some neat tips n tricks after I get a little more acquainted with PowerShell. For now it has a profile example and a useful script for signing your scripts."

**Cmdlet of the week**

  * We were going to do Set-PSDebug but Hal didn't do his homework.  Instead, we gave the royal treatment to [Get-Service][12]!

**Resources** - Got a ton for ya this week:

  * Keith Hill's Blog series on Effective PowerShell - [Item 1: The Four Cmdlets That are the Keys to Finding Your Way Around PowerShell][13] .  This article in particular is a must-read for all the PowerShell newbies out there.  So far there are eight articles in the series, we highly recommend checking those out.  Hal also mentioned the [Mastering PowerShell in your Lunch Break][14] series.
  * [PowerShellPlus][15] 
      * Hal has put some screenshots up on his blog: <http://halr9000.com/article/439>
      * Notable features: 
          * powertab & real intellisense
          * pretty console features (transparency, bg image)
          * command history (transcript)
          * built-in editor w/syntax highlighting & intellisense
          * snippet manager
          * extensible w/powershell code
          * variable & object explorer
      * We don't have an release date yet but Karl from PowerShell Live has said they are widening the closed beta to include their PS Analyzer customers sometime around Oct 1st.
      * [Quick Reference to AD cmdlets][16] - on Dmitry's PowerBlog
      * IRC Channel: #Powershell @ [Freenode network][17]
      * A series on [Managing SQL with PowerShell][18] (thanks $cript Fanatic)

**Tips**

  * PowerShell is a scripting engine AND a shell 
      * Don Jones had an article about this in Technet (October Issue) when it comes out online it should be [here][19]
      * Don Jones Technet article ["Scripting One Line at a Time"][20].  This talks about how you go about building a script based on the interactive nature of PowerShell
  * $profile discussion part 2 
      1. Gather your reusable bits into functions. Since they may be shared, be sure to comment them well.
      2. Categorize these functions by type.
      3. Organize each category of functions into a unique .PS1 file. I recommend prepending the filenames with "lib-" or similar.
      4. Place all the files in your profile directory, or on a file server, and dot-source them in your profile using something like this:


# place in your profile to load shared scripts


New-Psdrive -name Scripts -Psprovider FileSystem -root [\serverscripts](//\serverscripts)
 Get-ChildItem Scripts:lib-*.ps1 | Foreach-Object { . $_ }

**Powershell Moments**

  * Hal shares his frustration having to work with an NT 4.0 domain and how many ADSI queries don't work against it, even if he uses the WinNT addressing scheme, as opposed to LDAP.
  * Jonathan shares how easy the Quest cmdlets make it to "copy" users from one domain to another. His code was similar to this: 
      * Connect-QADService -service 'domain.dev'
      * $users - GetQADUser -SearchRoot 'OU=Users,DC=domain,DC=dev'
      * Disconnect-QADService
      * Connect-QADService -service 'domain.tst'
      * $users | %{new-qaduser -name $_.Name -ParentContainer 'OU=Users,DC=domain,DC=tst' -SamAccountName $_.LogonName -description $_.description -displayname $_.DisplayName -firstName $_.firstname -lastname $_.lastname -UserPrincipalName $_.name}

**One-liners**  

# extract part of a filename


dir | Foreach-Object { $_.name.substring(0,8) }

**Gotchas**

  * From [Poshoholic][21]- If you convert any string to a boolean value in PowerShell, the resulting boolean value will be boolean True.  (With the exception of empty strings, which are $false.)

**Powershell challenge**

  * Hal asked if anyone knows how to set SACLs on remote files.  Not file ACLs but security auditing stuff.  Turns out it might be much easier than he thought (using set-acl on a UNC path), but if you've got any code to share that's great!

Thanks for listening!  Keep the feedback coming, we really love hearing from you.  Also don't forget to write reviews and vote for us on iTunes, Podcast Alley and wherever else you may find us.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-009.mp3
 [2]: http://poshoholic.com/
 [3]: http://poshoholic.com/2007/09/20/the-trouble-with-the-tribbles/
 [4]: http://blogs.msdn.com/powershell/archive/2007/09/26/howto-invoking-cmdlets-from-within-a-cmdlet.aspx
 [5]: http://scriptolog.blogspot.com/2007/09/windows-powershell-in-practice.html
 [6]: http://jtruher.spaces.live.com/
 [7]: http://thepowershellguy.com/blogs/posh/
 [8]: http://bsonposh.com/modules/wordpress/?p=47
 [9]: http://marcoshaw.blogspot.com/2007/09/windows-powershell-virtual-user-group.html
 [10]: http://www.codeplex.com/PowerShellCX
 [11]: http://thepowershellguy.com/blogs/posh/pages/powertab.aspx
 [12]: http://www.microsoft.com/technet/scriptcenter/topics/msh/cmdlets/get-service.mspx
 [13]: http://keithhill.spaces.live.com/Blog/cns%215A8D2641E0963A97%21788.entry
 [14]: http://powershelllive.com/blogs/lunch/default.aspx
 [15]: http://www.powershell.com/plus/
 [16]: http://dmitrysotnikov.wordpress.com/2007/08/30/quick-reference-to-ad-cmdlets-104/
 [17]: http://freenode.net
 [18]: http://scriptolog.blogspot.com/2007/09/manage-your-sql-server-with-powershell.html
 [19]: http://www.microsoft.com/technet/technetmag/issues/2007/10/PowerShell/?loc=en
 [20]: http://www.microsoft.com/technet/technetmag/issues/2007/02/PowerShell/?loc=en
 [21]: http://poshoholic.com/2007/09/13/essential-powershell-beware-of-promiscuous-types/
