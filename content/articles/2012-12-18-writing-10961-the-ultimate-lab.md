---
title: "Writing 10961: The Ultimate Lab"
authors:
  - Don Jones
date: "2012-12-18T20:50:30+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2012/12/writing-10961-the-ultimate-lab/
---

My company has been contracted by Microsoft to design and author Microsoft Official Curriculum (MOC) course 10961A, Automating Administration with Windows PowerShell v3. While there is no announced release date I can share, I did want to share some of the experience.  
As I write this, 10961A's proposed outline is going through several review cycles. In the meantime, I wanted to sit down and start doing some detail-level design on some of the more complex labs in the course - the most complex of which is a proposed Module 10, consisting of little more than a big, 2-hour lab where you write a script to provision a newly installed Server Core computer.  
This, for me, is the ultimate lab. It's practical, meaning it focuses on a scenario that's extremely real-world. It's also not "perfect," meaning it doesn't throw you into an everything-just-works environment and hand-hold you though a few self-guided demos. Initiating communications between a domain client and a non-domain machine is tricky in PowerShell, and automating that is not entirely straightforward.  
The approach I'm planning to take will break down all the major sub-tasks, and then walk students through some of the considerations for each. What commands will you need? What information will you need up front in order to run them? Where will you get that information - and how? I think it'll be a very nice "putting it all together" module (although there are two modules after it, so it isn't exactly the end of the course). It should occupy the entire afternoon of the course's fourth day (Thursday), which makes for a nice open-ended wrap to that day (meaning faster students can finish and leave early, while leaving time for slower students to work through everything without feeling rushed).  
In the lab, you'll write a parameterized script that saves off your old Remoting TrustedHosts list, queries DHCP for the new server's IP address, and saves that IP address into your TrustedHosts. You'll make a Remoting connection to the new machine and have it join itself to the domain while renaming itself, wait for it to reboot, and then add a role (IIS) to it. You wrap by putting TrustedHosts back to where it came from.  
This is actually a trimmed-down, more methodical version of a workshop I just did last week at Live! 360 in Orlando. That workshop took four hours, which I don't have in the class' time budget, so I trimmed out a few things that were cool, but not entirely necessary, such as testing to see if a DHCP reservation already exists before creating one (without testing, you can potentially get an error, but it's non-tragic).  
I'm looking forward to getting into the actual writing of the module once the outline is approved; I think this'll really be the highlight of the course. It replaces a module in the older 10325A course (which I also wrote) where you break down a script _someone else wrote,_ customizing it to run in your environment. While I think that's a useful skill, the feedback I got was that it wasn't the most interesting lab possible, and that the script I provided (written by Jeffery Hicks, actually) was pretty complex given the time allotted. This new lab provides the same beginning-to-end scripting opportunity, but hopefully folks will find it to be a lot more practical and useful, both educationally and when they get back to the office.
