---
title: Introduction to Powershell
authors:
  - Stephen Moore
date: "2015-07-31T11:07:47+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/07/introduction-to-powershell/
---

Hi Guys,

I'm going to have a PowerShell ramble on a semi regular basis. What prompts me to write here on powershell.org is that I love powershell. I makes my job so much better. I'm an IT Pro and work for a large ish world spanning company. I mostly work with windows servers but get to work with other technology too. Like VMware and Citrix for example. The other thing I want to point out is that I'm not a programer. I don't know VB Script and no one taught me 
PowerShell
. There are many people though that helped me on my PowerShell Journey through their books, blogs, postings, and videos. 

I want to spread the word of PowerShell. I want people to understand that it helps in so many ways. I've learned about wmi, .net classes and all the properties of an AD object. This helps me understand the computers I work with every day. With a GUI these things are under the hood and no one needs to know too much about them. With 
PowerShell you naturally learn about these things as you come across them. Didn't know that you can install VMware tools without having to restart? Well if you use PowerShell there's a switch that stands out that makes it obvious.  It makes life easier.


One thing I really love about 
PowerShell is that it is very consistent (well mostly). So once you learn the basics anything else you want to do is kind of the same. I don't need complication. I have so many technologies to learn ( the System Center Suite comes to mind) that I really don't want to waste my time learning where in the GUI Microsoft have hidden what I'm looking for this time. You see, I have always thought computers existed for a reason. To automate things. To do the work for us. To make life easier. We have i7 processors. They are so powerful.. just amazing. So why as an admin would you want to be clicking on menus and buttons. Hit the PowerShell go button and let the computer do all the work. It's liberating!


Now I know what some people think. It's too hard. And it is hard. There are people that are so good at powershell that it just blows me away. But what I want to stress is that you don't have to be that good. You can be, but you don't have to be. So take it one step at a time and then it's not so hard. But it's like a snow ball rolling down hill. If you use it your knowledge will grow exponentially. So I want to stress 3 things this week.

1.   You _can_ learn 
PowerShell.


2.   
PowerShell has a shell..... Don't know what a shell is? It's a window into the operating system that lets you communicate with it.  So open PowerShell and start communicating. Always have the shell open. If you want to open the temp folder on C drive. Type invoke-item c:\temp and press enter. Now you think of something to do! One step at a time. If you're not in a hurry try and find out how to do it in powershell. Remember you are just starting out so don't be hard on yourself.


3.   Of course 
PowerShell is a scripting language as well. So think of something to automate. Maybe there is a process you have to restart everyday. That old server with the legacy app. Automate it! It will be a great first script. And don't forget that you can use scheduled tasks to help with the automation. And it's not that hard to send an email letting you know it's been done with the send-mail cmdlet. Enjoy. Don't start with something critical.




I haven't told you specifically how to do things on purpose. There are heaps of books, technet articles and other plog posts. Google is your best friend. (sorry Bing). So today I got an alert from Operations Manager telling me a C drive on a server was running out of space. It wasn't the usual suspects like a large profile or log files etc. I didn't want to look through every folder and I can't use programs like treesize for policy reasons. So I wrote a quick script that looped through all the folders, measured the length of the files, added them together and let me know where the space had gone. I used Google. And I confess I do not understand 100% how the cmdlet for measuring stuff works. You're probably smarter than me so don't worry.  I can worry about that later. I worked out how to use it to do what I wanted. That was enough for today. I got the job done and the Server fixed. I don't know how I would have found the solution without 
PowerShell. In case you are curious the little script looked like this. Open the Powershell ISE. Make sure under view you change it so you can see the scripting pane. Poke around.... explore, you'll find it. 





# so this bit gets the names of all the directories and stores them in a Variable called $folders. I know! It's so cool!


$folders = Get-ChildItem \\Yourservername\C$\windows -force | where {$_.mode -like "\*d\*"}



#And this bit goes through each one and counts the file lengths adding them together. It prints out the name of the folder followed by how big it is. Powershell is like magic, what can I say.

foreach ($folder in $folders)

{

$folder.name

$colItems = (Get-ChildItem "\\
Yourservername
\C$\windows\$($folder.name)" -Recurse -force | Measure-Object -Property length -Maximum -Minimum -Average -Sum)

"{0:N2}" -f ($colItems.sum / 1MB) + " MB"

}



Now there are many different ways to write the same script. For me the important thing is that I understand it. In more permanent or bigger scripts in production make sure you explain each part of the script in detail. # lets you write in the script without powershell reading it when it's running the script. Keep this script. Start a collection of all your scripts. You can safely keep them all in a folder in text files. And always test scripts first!!!. Do not just run them. As a rule of thumb though if the cmdlet is get-..... then you are safe enough. The get- cmdlets just read information and then display it for you. For example get-ADuser -filter \* will just give you a list of all your users in Active Directory. If you use remove-ADuser -filter \* the results will be far more tragic... (Please don't try it!)



Thanks for reading. Comment if you feel you want to. The blogs is titled introduction to 
PowerShell. Should be called introduction to blogging.... 
It's my first ever blog so sorry if it's a bit rough. I'll write some more PowerShell insights next week. I sincerely hope you start your 
PowerShell journey or continue with it. The rewards are definitely worth it. 


Steve
