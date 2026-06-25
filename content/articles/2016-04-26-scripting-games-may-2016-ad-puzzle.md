---
title: Scripting Games May 2016 AD Puzzle
authors:
  - i255d
date: "2016-04-27T02:32:52+00:00"
categories:
  - Scripting Games
aliases:
  - /2016/04/scripting-games-may-2016-ad-puzzle/
---

I love working in AD (Active Directory) with PowerShell. I find that I have had to really dig in to learn some of the syntax nuances that you need to understand to really mine data and change configurations within Active Directory. This puzzle reflects the kind of situation that people have to deal with in PowerShell everyday. I am interested to see what kinds of approaches each of you will take, this is a real chance to learn more of the diversity of methods that can be used in Active Directory with PowerShell.  
This month Bartek Bielawski has submitted two puzzles, I am going to post the beginner to medium one first and then the advanced one next month. This is going to be a real learning opportunity. Keep the puzzles coming in, Mike F. Robbinson has submitted one recently too, so you can look forward to that in a couple of months.  
Here we go:  
During an internal IT audit of rights on your file server it was discovered that certain group had rights to the share used by finance and HR with sensitive data and the main question is: who was able to access these files because of that. When it happens you are attending a conference (surprise, surprise) and can’t really do anything remotely. That doesn’t stop your boss from calling you and asking for help. All she wants is a list of all users that are members of that group. The problem is that this group suffers from snow-ball effect and has multiple nested groups, that contain nested groups, that contain nested…  
You respond with “use Get-ADGroupMember -Recursive” but your boss complains, that when she tried to use it, she just got some red text on her screen with information, that common delete is not recognized. You roll your eyes and eventually decide to write a short script and send it over e-mail. Luckily, you have sandbox domain controller running on your laptop, so testing your code is not that difficult. As you are in the middle of an interesting talk, you try to make it as simple and minimalistic as possible. You also decide not to try any other tools that require something to be installed on a computer running the code. One call from the boss is enough.  
Design goals:  
- Solution has to be quick. Don’t waste time on producing nice, informative error messages.  
Your boss won’t read them anyway  
- Try to use a solution that requires least testing possible  
- Writing simple function could be nice, but if you manage to get it done in two lines, or even one – just do it  
- You are limited to build-in functionality only.
