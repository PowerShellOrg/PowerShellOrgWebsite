---
title: Take home from PowerShell Summit Europe
authors:
  - Jonas Sommer Nielsen
date: "2015-09-17T12:25:55+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/09/take-home-from-powershell-summit-europe/
---

WOOHA it's been a great week.

I sat down last night my brain all fried and tried to compile a list of things to remember from the past week.

[![PowerShellMagazine - (wallpaper) - KEEP CALM.cdr](https://powershell.org/wp-content/uploads/2015/09/KeepCalmAndLearnPowerShell_1024x768.jpg)][1]

There is  much focus on "changing the mindset" of the community. Get into the DevOps mindset and become a toolmakers. This is my take-home from the conference. There's no way to summarize all of the conference other than to say: Look forward to the videos on YouTube.

#### Stuff to read:

  * A great short read about "[Toolmaking][2]"
  * [Steven][3] did a [DevOps Reading list][4].

### Concepts:

  * **[Iain Brighton][5]'s talk "Man vs Testlab"**. I'm definitely going home and testing his [script][6] He created a script that will do everything from downloading .iso's from Microsoft, Configure Hyper-V, create instances and spawns servers for you. To stand up a entire Testlab following the [Microsoft Lab guides standard][7]. (DC, Server, Non-domain joined server and a client) You can of cause easily change the setup.
  * **GitHub** I was amazed by [Hemant Mahawar][8] and [Krishna C Vutukuri][9]'s talk on the way the PowerShell team uses GitHub and how easy it is to contribute to the code today. (Go 
get a GitHub account today
! and start learning if you haven't already, and [go here][10] to contribute)
  * **PowerShell Gallery** There were multiple talks on the [Gallery][11] and I personally love this. It's nice to hear that the PowerShell Team feels the same way. (See earlier [post][12])
  * **Pester tests** Unfortunately I didn't attend any pester specific talks this time. But it's clear from the general theme that pester is a big part of the DevOps' mindset and the way tools are being developed in the future. 
      *  Quote [June Blender][13]: _Free! #PowerShell Community Build Server. Runs Pester tests on v2-v5 automatically. Best thing since the pipeline. <http://t.co/1SFKWez7O2>_
  * **DSC** This is a crucial platform for the future. The ability to use the "Make it so" mindset. To configure and services and prevent drift, this is the documentation of the future. [Getting started][14]

[![makeitso](https://powershell.org/wp-content/uploads/2015/09/makeitso.png)](https://powershell.org/wp-content/uploads/2015/09/makeitso.png)

There were tons of other things going on. On a personal note after my trip to [PSUG.dk][15] a few weeks ago where we had a session on [ARM][16] and spend a day creating JSON files by hand by following the schema's on GitHub and had a horrible experience.  [Jeff][17] blew my mind when he demoed roughly the same and noted, off cause we just do: ConvertFrom-Json play with the PowerShell object and ConvertTo-Json back to JSON. He had some really nice examples on how not to do JSON templates, and better ways to generate them.

And I got really excited when during [Simon][18]'s talk on GitHub, I asked for ISE integration and [Tobias][19] replied from somewhere behind me.

-_Working on that_.

Meaning [ISESteroids][20] will have that soon. Happy times 😀



When all the above is done, I only need to figure out how to get to the next Summit 🙂





#### Contact me

Twitter [@mrhvid][21]

Web [Jonas.SommerNielsen.dk][22]

 [1]: http://www.powershellmagazine.com/2011/09/23/powershell-wallpapers/
 [2]: http://www.itskeptic.org/content/important-devops-word-toolmakers
 [3]: https://twitter.com/StevenMurawski
 [4]: http://stevenmurawski.com/devops-reading-list/index.html
 [5]: https://twitter.com/iainbrighton
 [6]: https://github.com/iainbrighton/PSHSummit-Man-vs-Testlab
 [7]: http://social.technet.microsoft.com/wiki/contents/articles/7807.windows-server-2012-test-lab-guides.aspx
 [8]: https://twitter.com/HemantMahawar
 [9]: https://github.com/KrishnaV-MSFT
 [10]: https://github.com/powershell/
 [11]: http://www.PowerShellGallery.com
 [12]: https://powershell.org/2015/09/11/working-with-powershellgallery/
 [13]: https://twitter.com/juneb_get_help
 [14]: https://www.microsoftvirtualacademy.com/en-US/training-courses/getting-started-with-powershell-desired-state-configuration-dsc--8672
 [15]: http://www.psug.dk/?p=649
 [16]: https://azure.microsoft.com/en-us/documentation/articles/resource-group-overview/
 [17]: https://twitter.com/JeffWouters
 [18]: https://twitter.com/SimonWahlin
 [19]: https://twitter.com/TobiasPSP
 [20]: http://www.powertheshell.com/isesteroids/
 [21]: https://twitter.com/mrhvid
 [22]: http://Jonas.SommerNielsen.dk
