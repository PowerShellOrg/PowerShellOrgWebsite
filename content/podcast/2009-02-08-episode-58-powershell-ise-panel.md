---
title: Episode 58 – PowerShell ISE panel
authors:
  - Jonathan Walz
date: "2009-02-09T04:03:40+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-058.mp3"
aliases:
  - /2009/02/episode-58-powershell-ise-panel/
---

**A Podcast about Windows PowerShell.**

Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]



## 
    In This Episode





    Tonight on the PowerScripting Podcast we have a panel discussion to discuss the PowerShell Integrated Script Editor. And of course we'll bring you news, tips and resources.




## 
    News





    **





    *This segment is brought to you by SAPIEN Technologies*







      **







    - 

Idera

[has released a beta](http://powershell.com/cs/blogs/news/archive/2009/02/01/powershellplus-v2-1-beta-is-live.aspx)

for PowerShell Plus 2.1



    - 

Marco has posted the

[video](http://marcoshaw.blogspot.com/2009/01/windows-powershell-virtual-user-group-8.html)

for the PSUG #8 meeting



    - 

Oisin

[put up a great post](http://www.nivot.org/2009/02/04/DifferencesBetweenPowerShell10RTMAndPowershell20CTP3Win7Beta.aspx)

talking about the differences between PowerShell 1.0 RTM and V2 CTP3







## 
    Interview





    **











          ** 






              **





              *When it comes to scripting, you"™re a warrior. But mighty warriors need mighty tools! For awesome PowerShell scripting, nothing matches the might of Quest"™s PowerGUI. Versatile and easy to use, PowerGUI helps you build commanding scripts that leverage PowerShell"™s strength across the enterprise. Now, ruling your domain is easier than ever.*





              **





              *Is your scripting might equal to the challenge? Put the power in your hands "“ *[*download PowerGUI*](http://quest.com/powerscripting)* today*








            **










### 


Guests







        **Andy Schneider**, orginally an Electrical Engineer, has worked in the IT Industry for the last 10 years. He now works with a team of IT Infrastructure Engineers for Avanade, a Global IT Consulting firm. Specializing in automation, Andy has been a huge fan of PowerShell since the Monad days and is very interested in using PowerShell as a 
means to bridge the gap between the world of IT Pros and Developers.





        **Ibrahim Abdul Rahim**, MSFT, the primary tester on the ISE since its beginning days. I have a Perl background, loved PowerShell from day one, and use it everywhere to try to automate everything. Sadly I have never been an IT Admin, other than to setup and mess around with HyperV, Apache, MySQL/PostGres stuff.












### 


Agenda 







        - 

Open



        - 

Introduce old guys





Karl Prosser







        - 

Introduce new guys





Andy Schneider



            - 


Ibrahim Abdul Rahim











        - 

Topics



        - 

Close







### 


Topics 









          - 

The Object Model ($psISE) 




          - 

Legacy non-support story 




          - 

PowerShell compatibility (Host, command execution, remoting etc) 




          - 

Known bugs 




          - 

Karl's PowerShell ISE-Cream project, and other third-party organized efforts 




          - 

Questions from the audience




                glnsize : ## why do the ISE, what does the ISE provide that the console doesn't besides tabs


              - 
                halr9000: ## how does ISE handle $profile stuff?


              - 
                glnsize : ## I'm an admin... explain what the ISE having an object model means.  What can i do with it?


              - 
                klumsykarl : ## what about console input. will that work in ISE going forward?


              - 
                glnsize : ## will the help return help from advanced functions


              - 
                JeffHicks : ##Why did you separate the console from the output?


              - 
                klumsykarl : ## will it have the ability to put panes through $psise


              - 
                KirkAMunro : ## What will you _not_ be able to do with the object model in v2?


              - 
                klumsykarl : ## will there be codefolding?


              - 
                klumsykarl : ## will there be any pulldown intellisense?


              - 
                glnsize : ## is there an option to just use the ISE as an editor


              - 
                JeffHicks : ##will we be able to move the panels around or even undock them?


              - 
                aleksandar : ## could we add more than one Custom menu?


              - 
                ustreamer-20790 : ## any plans for a runspace browser?  something that allows you to snoop around the execution environment?


              - 
                glnsize : ## is the ISE intended to be a gateway for a none cli admin, or is it to be a day to day replacement for the console?


              - 
                JeffHicks : ##Is there any usability data on whether people want a GUI vs the console?























## 
    Resources





    This segment is brought to you by Idera:





    *Want to make Windows PowerShell easier than ever to learn and master? Checkout Idera's PowerShellPlus Professional Edition which is now available for download! The new version has vastly improved code completion and a slick interactive Learning Center. Go to

*[*www.idera.com/PodcastPeople*](http://idera.com/podcastpeople)*

to get your copy today!*










        - 

Karl's

[post about ISE-Cream](http://karlprosser.com/coder/2009/02/05/powershell-ise-cream/)



        - 

Al from the

[Get-Scripting Podcast](http://get-scripting.blogspot.com/)

and the

[Virtu-Al](http://teckinfo.blogspot.com/)

blog

[has a script called vDiagram](http://teckinfo.blogspot.com/2009/01/vdiagram-document-your-vi-with-one.html)

he's been working on for a while that will create a Visio diagram of your VMware Virtual Infrastructure



        - 

Don Jones has started a

[series about PowerShell Debugging](http://concentratedtech.com/content/index.php/2009/01/powershell-debugging-part-1/)

over at Concentrated Technology 



        - 

Andy Schneider talked about this on the interview:

[Using a Color Dialog to Choose Colors for ISE](http://get-powershell.com/2009/01/29/using-a-color-dialog-to-choose-colors-for-ise/)



        - 

//ow posted

[a really cool script](http://thepowershellguy.com/blogs/posh/archive/2007/01/21/powershell-gui-scripblock-monitor-script.aspx)

which is a GUI to monitor script blocks



        - 

Ibrahim

[posted some information](http://blogs.msdn.com/powershell/archive/2009/02/04/console-application-non-support-in-the-ise.aspx)

about things to watch out for when useing the ISE



        - 

Jeffrey Snover

[posted his ISE Profile](http://blogs.msdn.com/powershell/archive/2008/12/29/my-powershell-ise-profile.aspx)













    **






## 
      Tips









      - 

Shay posted a

[CTP3 tip](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2009/01/29/powershell-ctp3-quick-tip.aspx)

for finding static members of a type







## 
      One-Liner





      This one is from Jeffrey Snover:















New-PsDrive -Name Mod -PSProvider FileSystem -Root (($env:PSMODULEPATH -split ";")[0])










## 
      Mailbag





      This was

[a post](http://www.powershellcommunity.org/Forums/tabid/54/aff/1/afv/topic/aft/3607/Default.aspx)

to PowerShellCommunity.org forums, but we think it fits well here.  🙂










> 

> *
One of our clients has a very convoluted file/folder structure on a file share. Due to regulations and practices in place, they need specific permissions on certain folders. This seems simple at first glance, but it gets murky when you notice they have a top level folder, named Insurance, then below that they have one folder for each letter of the alphabet, and below that a name of their client. Below each of the client folders, there is a folder called Financial statements.
*
> 

> 
> 

> *
That Financial statements folder needed special permissions, and there was close to a thousand individual folders to change.
*
> 

> 
> 

> *
With a relatively simple powershell script I setup a example folder, which had the permissions I needed. Then using a powershell script I did multiple get-childitem commands, until I found the right folder, then using a variable I populated with the ACL of my test folder, I stamped it on all the Financial statements folders.
*
> 

> 
> 

> *
In about 1.5 hours, I did the work of one of their summer students for the entire two months(no kidding they had one person doing this manually).
*
> 

> 
> 

> ***- Darrin*
> 



## 
    Giveaway





    Our book offer is brought to you by SAPIEN Press.  You can find information about their books at sapienpress.com.







      We're giving away two copies of Hal's upcoming book: [Managing VMware Infrastructure with PowerShell: TFM](http://sapienpress.com/vmware.asp).  If you'd like to win a copy, leave us a review on iTunes, or Podcast Alley, or your own blog, or mention us on your Facebook page or whatever. Send a link to [feedback@powerscripting.net](mailto:feedback@powerscripting.net)

and let us know what and where to verify and you are entered to win!  Be sure to include your mailing address and name.





 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-058.mp3
