---
title: "Episode 45 – Rockin' Roundtable"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2008-10-13T02:53:57+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-045.mp3"
aliases:
  - /2008/10/episode-45-rockin-roundtable/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]



## 
    In This Episode







Today we have a rockin' roundtable which includes:







    - 
      Jeffrey Snover


    - 
      Don Jones


    - 
      Alex Riedel


    - 
      Kirk Munro







    And of course we'll throw in our other usual goodies.




## 
    News





    *The news is brought to you by iTripoli.*




      *What can you really do with PowerShell?  With Admin Script Editor the question becomes what ****can't**** you do with PowerShell?  Besides all the advanced code generating tools this is the only tool offering a true PowerShell Forms Designer.  To illustrate what can be done the guys at iTripoli created a full-featured MP3/Podcast player written entirely in PowerShell and delivered as a single script.  Check it out at *[*adminscripteditor.com/player*](http://adminscripteditor.com/player)*.*







        - 
          [Sapien has announced](http://hosted.verticalresponse.com/172892/13e80641d0/176000434/c46cbf224d/) a forthcoming forms editor called PrimalForms which will allow you to create forms, save them as XML and create PowerShell code. On top of that they are going to release it for free!


        - 
          Be sure to catch the UK [PowerShell UG: November 20th in Reading](http://richardsiddaway.spaces.live.com/Blog/cns%2143CFA46A74CF3E96%211806.entry)


        - 
          Dmitry will be presenting some PowerShell sessions at [Quest Connect](http://dmitrysotnikov.wordpress.com/2008/10/08/quest-connect/) on Oct 22nd-23rd.


        - 
          New software release on IIS.net: [Microsoft Web Deployment Tool - Beta 1 Go Live](http://www.iis.net/downloads/default.aspx?tabid=34&i=1602&g=6)


        - 
          If you'd like to get an early peek at Richard Siddaway's new book [
PowerShell in Practice
](http://richardsiddaway.spaces.live.com/Blog/cns%2143CFA46A74CF3E96%211783.entry), you can do so on Manning's site.










## 
        Roundtable










*This segment is brought to you by Quest:*








*Quest Software is offering Powerscripting Podcast listeners a free copy of Jeffery Hicks new book, Managing Active Directory with Windows PowerShell: TFM from Sapien Press. Visit *[*quest.com/powerscripting*](http://quest.com/powerscripting)* to register for your copy, before they run out. While you"™re there download their free graphical user interface, script editor and Active Directory commands.*


















          - 
            [A Thousand Things 1% Better](http://blogs.msdn.com/powershell/archive/2008/09/19/a-thousand-things-1-better.aspx)


          - 
            What's most important for a posh newbie to learn?


          - 
            JeffHicks : ## What do you see as the biggest obstacles to PowerShell adoption?


          - 
            "PowerShell isn't complete?" 


                 no admin worth his salt is going to go through and update hundreds of servers with yet another thing to patch, another to mantain, another security to worry about, reboots, touching things, etc, just to be able to run a non complete technology that they haven't learned yet because it is a pain in the ass, and oh, it's not complete


              - 
                cartershanklin : ## Jeffrey, do you think user adoption of PS is faster or slower than you anticipated?






          - 
            [Script vs. Shell](http://concentratedtech.com/content/index.php/2008/09/weekly-shell-script-vs-shell/)


          - 
            Coolest use of PowerShell that you've seen--and what's to come.


          - 
            What third-party software is 
missing
?


          - 
            Is PowerShell useful for ? 


                e.g. cloud computing










          Ustream Questions







            - 
              rfoust : ## what is the easiest way for non-developers to find .net methods to work with in powershell?  searching msdn is a pain


            - 
              JeffHicks : ## Where will PowerShell be in 3-5 years?


            - 
              JeffHicks : ## What will MS take responsiblity for in PowerShell and what do they expect 3rd parties to support or add?


            - 
              rfoust : ## whats a good bridge for scripters wanting to convert scripts into real c# compiled cmdlets


            - 
              rfoust : ## do you see cmdlet naming conflicts becoming a problem in the future?  not the namespace but the actual cmdlet name


            - 
              rfoust : ## do you see scripts running as a service anytime in the future?


            - 
              cartershanklin : ## script scheduling, same question.


            - 
              ye110wbeard : ## Can Powershell be used to email backup logs made in W2K8 Server backup?


            - 
              rfoust : ## is microsoft helping Pash devlopment any?


            - 
              JeffHicks : ## Is MS promoting PowerShell at the management level in orgs or letting it bubble up from the admins?


            - 
              makson : ## is there a cmdlet for powershell that is equivelent to sed in bash?














## 
        Resources





        *This segment is brought to you by Idera.
 Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to www.idera.com/PodcastPeople to get your copy today!*








              - 
                From the SAPIEN blog: [PrimalScript: Did you know about Snippets?](http://blog.sapien.com/index.php/2008/10/08/primalscript-did-you-know-about-snippets/)


              - 
                New PowerGUI PowerPack: [PowerShell for WSUS](http://dmitrysotnikov.wordpress.com/2008/09/30/powershell-for-wsus/)


              - 
                From Brandon Shell, now writing on TurboChargeAD.org: 
[Bulking Importing User from CSV file using Quest cmdlets](http://turbochargead.org/articles/index.php/2008/10/bulking-importing-user-from-csv-file-using-quest-cmdlets/#more-85) 













## 
            Gotcha





            From Stephen Campbell:




## 







Open a cmd prompt on a Win2003 server and type the following:




            > 

> 
mkdir c:test1

> 

> 
> 

> 
net share test1=c:test1 /grant:everyone,full

> 







Now type the name commands in Powershell





            > 

> 
new-item c:test2 -type directory

> 

> 
> 

> 
net share test2=c:test2 /grant:everyone,full

> 







When I do the net share command in Powershell, the /Grant returns a syntax error.  Until I remembered about the comma!!  The following works great.





            > 

> 


> 
> 

> 
net share test2=c:test2 /grant:everyone`,full

> 

> 
> 

> 











 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-045.mp3
