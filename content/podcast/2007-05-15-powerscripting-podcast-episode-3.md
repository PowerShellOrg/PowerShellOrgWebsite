---
title: Episode 3 – Select, Set, Measure
authors:
  - Jonathan Walz
date: "2007-05-15T16:20:10+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/03_PowerScripting_Podcast.mp3"
aliases:
  - /2007/05/powerscripting-podcast-episode-3/
---

A podcast about Windows PowerShell.[![](http://powerscripting.libsyn.com/img/podcastIcon.gif)][1]





**News**






    - 

Quest Software has released some beta cmdlets for managing Active Directory



    - 

PowerShell Analyzer RC1 has been released








    In this show I discussed the cmdlets:





    - 
      Select-String


    - 
      Set-Content


    - 
      Measure-Command








 Resources:
 [PowerShell newsgroup](http://www.microsoft.com/communities/newsgroups/list/en-us/default.aspx?dg=microsoft.public.windows.powershell)
 [Quest Software's PowerShell cmdlets for AD management](http://shrinkster.com/opb)
 Tips:






    - 

Quoting rules



    - 

Double quotes - variables are expanded and can contain text right after it














    - 

Uses of backtick or backquote ` 




Escapes the next character



        - 

Example "`$user is $user" 



        - 

Can be used to continue to the next line



        - 

`n is newline



        - 

`r is a carriage return



        - 

`t is a tab



        - 

`a is an alert



        - 

`b is a backspace



        - 

`' or `"



        - 

`0 is null








        - 

`is a single backtick

















    - 

Singe quotes "What you see is what you get"even escape characters are ignored










 PowerShell moment:





    - 
      I talked about creating 150 user accounts with the new Quest cmdlets


    - 
      I talked about doing a mass Group Policy update using PowerShell to update the gpttmpl.inf files







    One Liner:





    - 

Select-string 
[
\domainnetlogon
](//domain/netlogon)
 -pattern time



    - 

(Select-string 
[
\domainnetlogon
](//domain/netlogon)
 -pattern time).count












 [1]: http://media.libsyn.com/media/powerscripting/03_PowerScripting_Podcast.mp3
