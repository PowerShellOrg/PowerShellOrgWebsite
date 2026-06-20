---
title: Episode 108 – SharePoint 2010 with Gary LaPointe
author: Jonathan Walz
authors:
  - Jonathan Walz
  - Gary LaPointe
date: "2010-04-06T03:57:50+00:00"
podcast_url: "http://traffic.libsyn.com/powerscripting/PSPodcast-108.mp3"
aliases:
  - /2010/04/episode-108-sharepoint-2010-with-gary-lapointe/
---

**A Podcast about Windows PowerShell.**  
Listen:


  [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**](http://traffic.libsyn.com/powerscripting/PSPodcast-108.mp3)



## 
    In This Episode





    Tonight on the PowerScripting Podcast we talk to Gary LaPointe about SharePoint 2010



## News

_Version 2.1 of PowerWF Studio has just been released. PowerWF is a Visual PowerShell development tool allowing users to build PowerShell scripts as workflows, which are similar to a flowchart or Visio diagram.Â  Once created, workflows can be deployed as applications, run as a scheduled task, or back to PowerShell as a script.Â  You can even push data to System Center with the click of a button. To get your free 30 day trial go toÂ [PowerWF.com][1]{#j2hk}.__  
_ 

  * @marcoshaw: #PowerShell v3 will be released at this year's TechEd North America in the Big Easy! Complete overwrite for .NET 4!
  * The 2010 Scripting Games are ON! Check outÂ [the announcement][2]{#kh6n}Â on the Scirpting Guys blog, and you can help spread the news by puttingÂ [a badge][3]{#v7ln}Â on your blog.
  * User Group News 
      * [Arizona PowerShell User Group][4]{#fu19}Â meets April 7th
  * It's MVP day! Two new MVPs have joined the ranks 
      * [Sean Kearney][5]{#yfxf}
      * [Jonathan Medd][6]{#vwah}
      * Doug Finke and Richard Siddaway were renewed
  * [PowerGUI turns 3!][7]{#km0-}

Â 

  * Â 

## Interview

_Before you acquire power, you must acquire knowledge "“ and Quest Software has what you need! In Jeffery Hicks"™ e-book, "Managing Active Directory with Windows PowerShell," learn how PowerShell helps you master local accounts and groups, password management, security and permissions and much, much more. You"™ll also learn about the PowerShell extras and out-of-the-box features that will help you control Active Directory. Don"™t wait "“ visitÂ [quest.com/powershellbook][8]{#od7t}Â to register for your free copy orÂ [quest.com/powerguipro][9]{#jqf7}Â and see why PowerShell and Quest PowerGUI are the ultimate Windows management tools._

#### Links

  * Company:Â [http://www.sharesquared.com][10]
  * Blog:Â <http://stsadm.blogspot.com/>

#### Questions

  * AndrewTearle: ## How large would an enterprise need to be to consider using SharePoint ?
  * CodyGros: ## Can he explain the disposal of SharePoint objects in PowerShell? and why it is important?
  * TobyM: ## Does think the MSFT will continue to develope PowerShell cmdlets for SharePoint 2010 to fill in the holes he mentioned earlier?

#### Hero/Power - Sylar

## Resources

_This segment is brought to you byÂ _[_SAPIEN Technologies_][11]{#zah2}_._  
_  
_ 

  * Doug Finke wrote aÂ [Netflix catalog browser][12]{#x6.z}Â using PowerShell with OData
  * Ravikanth ChagantiÂ [wrote a Layman's guide to PowerShell 2.0 remoting][13]{#i57e}
  * Al RenoufÂ [has released v5][14]{#u.7h}Â of his popularÂ [vCheck script][15]{#j_8-}Â (VMware PowerCLI)
  * MVP Jonathan MeddÂ [posted on Enabling PowerShell 2.0 Remoting in an Enterprise][16]{#s-.1}
  * MVPÂ Tibor SoósÂ [wrote a cool post][17]{#tkb2}Â on the Scirpting Guys blog about old-school text-mode graphics

**  
** 


  **Tips**


Â 


  Our tips are brought to you today byÂ [ServerFault](http://serverfault.com/)Â andÂ [StackOverflow](http://stackoverflow.com/), the best place to find answers to your toughest questions!


Â 

  * [PowerShell quick start for Server Core R2][18]{#g5ou}
  * [Working with the [console] class][19]{#u9.7}
  * Getting objects into Start-Job 
      * start-job -ArgumentList $list {$arg | start-process}

Â 


  **Gotcha**


**  
**  
Listener John sent this one in:

> _I got one! (he yelled through tears while pounding his fist on the floor) Â After being so good to me and so reasonable about its idiosyncracies, PowerShell has hung it to me good on this one._  
> _  
>_  
> _Here's what I was after. Â I wanted to format my IP addresses I was iterating through so that I could later sort the collection and have it sort correctly. Â I used string formating to take the pieces of the address and concatenate it with periods and wound up with this:_  
> _010.001.001.001_  
> _Before doing the wmi query I had in mind, I wanted to make sure the system was up and not have to wait on the wmi timeout so I had something like this:_  
> _if (test-connection prettyip($_) -count 1 -quiet) {go do other stuff}_  
> _  
>_  
> _The prettyip thing came late in the day just so I could further analyze the data and when I put it in, everything stopped. Â The test-connection test sat and sat before finally giving up and then my script went on with its fail routine even though I knew these machines were up._  
> _  
>_  
> _I'm going to let you go try test-connection or ping (that's all I've tested so far) and you're going to find that it tries to ping 8.1.1.1 Â It's converting the ip to octal. Â It has something to do with the leading 0 (and the number being otherwise acceptable in base 8). Â 060.001.001.001 will ping 48.1.1.1_  
> _It isn't hard to work around, but WHO, honestly, expects this behavior?! Â If you have (as I did) a mix of 10.x.x.x and 198.216.24.x (our public range) IP's, it will make you think you've lost it._  
> _test-connection 198.216.24.104 works and 198.216.024.104 doesn't._  
> _I can see how it's happening (or think I can) just as 0x0e is hex, 010 CAN be interpreted as octal but should it be? Â Really?_  
> _  
>_  
> _It took me lots longer to figure this out than I'd like. Â I had about 4 red herrings flopping around on the editor and though I didn't cry, it's only because I'm just too manly and pirate-like. Â Otherwise... Â I'da been sobbing._  
> _  
>_  
> _So... Â There you go, fellers. Â It got me. Â Don't let it get you._

 [1]: http://powerwf.com/ "PowerWF.com"
 [2]: http://blogs.technet.com/heyscriptingguy/archive/2010/04/01/registration-now-open-for-2010-scripting-games-no-foolin.aspx "the announcement"
 [3]: http://blogs.technet.com/heyscriptingguy/archive/2010/03/24/grab-the-2010-scripting-games-badge.aspx "a badge"
 [4]: http://www.azposh.com/ "Arizona PowerShell User Group"
 [5]: http://ye110beard.spaces.live.com/blog/cns!952F95CB5DE3F349!2942.entry "Sean Kearney"
 [6]: http://www.jonathanmedd.net/ "Jonathan Medd"
 [7]: http://dmitrysotnikov.wordpress.com/2010/03/29/powergui-turns-3/ "PowerGUI turns 3!"
 [8]: http://quest.com/powershellbook "quest.com/powershellbook"
 [9]: http://quest.com/powerguipro "quest.com/powerguipro"
 [10]: http://www.sharesquared.com/Pages/default.aspx
 [11]: http://sapien.com/ "SAPIEN Technologies"
 [12]: http://dougfinke.com/blog/index.php/2010/03/28/powershell-wpk-netflix-viewer-using-microsofts-odata/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+DevelopmentInABlink+(Development+in+a+Blink) "Netflix catalog browser"
 [13]: http://www.ravichaganti.com/blog/?p=1305 "wrote a Layman's guide to PowerShell 2.0 remoting"
 [14]: http://www.virtu-al.net/2010/03/26/vcheck-v5/ "has released v5"
 [15]: http://www.virtu-al.net/featured-scripts/vcheck/ "vCheck script"
 [16]: http://www.jonathanmedd.net/2010/03/enabling-powershell-2-0-remoting-in-an-enterprise.html "posted on Enabling PowerShell 2.0 Remoting in an Enterprise"
 [17]: http://blogs.technet.com/heyscriptingguy/archive/2010/03/26/hey-scripting-guy-march-26-2010.aspx "wrote a cool post"
 [18]: http://jdhitsolutions.com/blog/2010/03/powershell-quick-start-on-server-core-r2/#utm_source=feed&utm_medium=feed&utm_campaign=feed "PowerShell quick start for Server Core R2"
 [19]: http://jdhitsolutions.com/blog/2010/03/cool-custom-consoles/#utm_source=feed&utm_medium=feed&utm_campaign=feed "Working with the [console] class"
