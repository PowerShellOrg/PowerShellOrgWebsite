---
title: "Episode 7 – Don't Forget What You Already Know"
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-09-04T02:49:24+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PowerScripting_Episode_7.mp3"
aliases:
  - /2007/09/powerscripting-podcast-episode-7/
---

**A Podcast about Windows PowerShell.**[**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]




    - 

News




[PowerShell Google group](http://groups.google.com/group/powershell-users) 













      - 

Cmdlets of the week




New-item



          - 

Test-path



          - 

Get-WMIObject




[MSDN WMI Reference](http://msdn2.microsoft.com/en-us/library/Aa394572.aspx) 














      - 

Resource




[Windows PowerShell and WMI - Technet webcast w/ Don Jones](http://shrinkster.com/rpd) 



          - 

"Active Directory Management Made Easy with PowerShell" from Quest Software, [link to Dmitry's post ](http://shrinkster.com/rqf)













        - 
          Great [blog post](http://www.leadfollowmove.com/powershell-toolbox/) listing PowerShell tools







        - 

Tips




On remoting




[/n software "PowerShell Remoting"](http://www.nsoftware.com/powershell/remoting/default.aspx) beta SSH Terminal session to remote server (requires agent install)
















          - 

Can you use -match instead of -eq?  Jeffery Snover's [blog post](http://tinyurl.com/2thy5w).









"

Whenever you find yourself using "“EQ, ask yourself if that is really want you want. You might be cheating yourself out of a ton great stuff. "








            - 

Don't forget what you already know     




$u = "user"; net localgroup administrators | where {$_ -match $u}







            - 

Scott Hanselman's [blog post](http://www.hanselman.com/blog/HowToDetermineIfAUserIsALocalAdministratorWithPowerShell.aspx) about finding out if a user is in the local admin group 










              - 

Gotchas














              - 




[Excellent description](http://www.scriptinganswers.com/forum2/forum_posts.asp?TID=1041&PID=6127) of the PowerShell bug I ran into passing credentials with WMI from

 //o//



                  - 
                    [Forum post thread](http://www.scriptinganswers.com/forum2/forum_posts.asp?TID=1041&PID=6127)












                - 

Powershell challenge




out-file $profile -noclobber -append -input `n'function sub($x,$y){$x - $y}'












 **Thanks for listening!**




 [1]: http://media.libsyn.com/media/powerscripting/PowerScripting_Episode_7.mp3
