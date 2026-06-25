---
title: Home Labs for the IT pro
authors:
  - Greg Altman
date: "2015-03-25T15:34:48+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/03/home-labs-for-the-it-pro/
---

Every IT pro needs a lab. It’s not just the fact that we all have a little mad scientist in us, it’s a playground for experimentation and learning. By “lab” I do not mean a formal test or dev environment, but a much more informal setting that typically goes before the “dev” part gets started. This lab need not be expensive. A little creative repurposing and virtualization will go a long way towards getting started with a home lab.

  1. Hardware- Obviously you have to have a computer. 
      * The least expensive is the system you already have. When you bought it did you buy a high end Core i7 with lots of ram for gaming or just future proofing? If so then you’re done! Windows 8.1 or Windows 10 preview do a great job of Hyper-V hosting. Of course you may need more hard drive space, but then again drives are relatively cheap these days. The system I use is a 3 year old Dell XPS with a Core i7 and 6GB of Ram and an added 1TB SATA drive. Hardware cost = zero. Of course, I want to add more ram and disk but for now it gets along. I run 3-4 windows core servers at a time, but more than 4 causes the system to go into disk thrash mode pretty seriously due to RAM overuse.
      * The next best option takes up more space but can potentially be even cheaper in a strictly monetary sense. How does your company dispose of old outdated equipment? Can you score 5-10 laptops or a server or two? What about old Ethernet switches? That plus $50 at Walmart for some shelving and you have your own network in the basement to play with.
      * Finally if you have an extra $600 -800 you can get a dedicated PC bare-bones kit with a Core i7, 16+ GB of ram and a 2-3 TB hard drive.


  - 
    Software- If you are learning Linux then you’re in luck here as the cost is pretty much free. However in the Windows PowerShell lab, we need Windows! The approach to this is pretty much dependent on the cash you want to spend and the approach you took to solve the hardware problem. If you are using option a) then you don’t need a ‘host’ OS as you already have an OS. Microsoft offers free demo versions for download, and although they are time locked, these VMs aren’t going to usually live long enough to expire. If you already have a MSDN subscription from work, then you already have access to server OS downloads.



  - 
    Networking- Obviously you have an internet connection. Beyond that, if your home is like mine, there are a dozen or so devices connected to the home LAN. Gaming consoles, televisions, DVRs, etc. that anyone else in the house may want to use while you are using your lab equipment. I strongly recommend that you keep the “lab” separate from your home network. If you are going the basement shelves of equipment route, you’ll certainly need some Ethernet switches and perhaps a router or firewall to keep the “lab” network separate. If you are going the more virtual route, you can do as I did and install a Linux router on a VM to act as firewall/gateway from the “virtual” subnet to the “real” LAN. I used VyOS ([http://www.vyos.net](http://www.vyos.net)), which is nice since you can simply follow the directions on their site to do a basic setup. This keeps lab services in the virtual space where they belong.



  - 
    Time- I know we are all busy, but seriously make the time. Getting this set up takes literally a couple of hours depending on your internet connection. Once it’s set, then you can squeeze in a little here and there and make surprising strides in your learning. Get up an hour earlier and play in the lab a bit while drinking coffee. Stay up an hour later and work on the lab after the family is in bed. Dedicate two or three lunch hours a week. You’ll be amazed how much faster you can learn things when you can just “try it and see what happens” with no fear of breaking something important. After all you built it- you can rebuild it!



So now that we have all the parts together, what specifically do we need to build?  Since in most instances, we’ll be building this in a virtual space, let’s focus on that one. Those of you building a lab physically may have to fill in some blanks to match up with your physical setup but the concepts are the same.  
I start off with the most basic: the network. Servers are much more interesting when they can talk to each other some right? In Hyper-V Manager make two virtual switches, one is linked to your host machine’s NIC and therefore to the rest of your LAN and presumably the internet. The second one is an Internal Only type. These should be on separate subnets to keep the routing simple. I like to use a 10.x.x.x/24 network so that I have lots of room to play around with subnets and software based networking.  
Once we have those two networks, we need a router. As I mentioned before, I use VyOS installed on a VM with two NICS, one on the internal LabNet switch and on the external “HomeLan” switch.  
Next it’s time to start standing up servers. This can be done one of two ways; manually or via Desired State Configuration.   If you are like me, and just getting started with DSC, I recommend a mixed approach. Get your Domain Controller going and a Windows 8.1 or later client installed on your LabNet.  Now you have a stable network and can start playing around with DSC. I have a standard build of a configured router, DC, Windows 10 client, and a DSC server saved to a 1 TB USB drive as a backup. That way no matter how badly I hose up the lab, I can get back to a minimum stable configuration quickly and easily.  On the DSC server I keep a couple of copies of configurations for web servers, video servers, Windows 10 desktops, whatever it is that I’m playing with that week.  
The only thing I haven’t been able to really introduce test wise is Apple products since I’m running in a PC environment and there is no legal way to virtualize a Mac on hardware that isn’t Apple. Of course with a little twiddling of the router configuration and by introducing a VLAN on my wireless router I’m sure I could incorporate external wireless devices like a MacBook. However, that violates the premise of keeping the “Mad Scientist Stuff” in an isolated virtual space.  
Obviously there wasn’t much PowerShell in this discussion, and equally obviously, much of this you can do from a PowerShell prompt or with DSC. Unfortunately in order to get your skills to that level, the lab has to come first.
