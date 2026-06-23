---
title: "Summit 2024 Speaker Spotlight: Steven Judd"
author: Mike Kanakos
authors:
  - Mike Kanakos
date: "2024-03-08T18:11:49+00:00"
categories:
  - PowerShell Summit
tags:
  - PowerShell Summit
  - Speaker Spotlight
legacy_featured_image: /wp-content/uploads/2024/03/Medenbauer-Resize.png
aliases:
  - /2024/03/summit2024-spotlight-steven-judd/
---

Hey there, PowerShell enthusiasts! Today marks the start of a series of interviews featuring select Summit 2024 presenters. I plan to sit and chat briefly with a mix of familiar and unfamiliar community presenters. Through these interviews, my aim is to provide you with an opportunity to get to know our presenters and generate some anticipation for their upcoming talks at the PowerShell Summit in Bellevue, Washington next month.

Joining me as my first guest is my good friend and active community member, **Steven Judd**!

Steven has been dedicating his time to helping others in the community for quite a while now. He's been a regular guest speaker and attendee at my user group, and together we hosted the virtual PowerShell Summit in 2021. Steven is famous for his dad jokes, custom PowerShell t-shirts, and programmable billboard hats. Despite his love for fun and enjoyment, Steven has been using and contributing to PowerShell for a long time. A vocal advocate for our community, he is known for his deep expertise in PowerShell and willingness to share his knowledge.

We wound up talking about PowerShell for 90 minutes on a call that was supposed to be only 20 minutes. Here's a not-so-brief rundown of that interview.

**Mike:**  
_Hi Steven! Good to see you again. Thanks for spending some time with me. Let's kick things off by sharing how you got into IT._

**Steven:**  
My entry into the IT field was completely unexpected. My IT career began in 1993 when I landed my first job, setting off a 30-year adventure. It all began when I completed my degrees in music performance and business administration, with dreams of working in the music business. However, reality hit hard, and I found myself working as a file clerk at a Trust Company in Oklahoma City.

Despite the humble beginnings, my passion for technology only increased as I helped colleagues navigate the world of computers, eventually leading me to my first IT job in tech support. The lesson I took from this experience was the value of seizing unexpected opportunities and embracing change, even if it means deviating from the initial plan.

**Mike:**  
_Did you go to college and complete a standard IT education program?_

**Steven:**  
I've mostly been self-taught in my journey into the world of programming. The only formal computer class I ever took was a visual basic course at a university, which shows how long ago it was. Since then, I've taken some training courses at work, but most of my skills have been honed through practical experience and personal exploration.

**Mike:**  
_Can you tell me about some of roles you had in the past and what you specialize in?_

**Steven:**  
Throughout my career, I've worn many hats and worked in various industries. I started in banking, then moved on to a .com until financial challenges arose and they went under. Then, I entered the oil and gas sector, switched to social media, and currently I'm working in software as a service for the transportation industry. Currently, my role is as a DevOps infrastructure engineer, focusing on ensuring seamless operations within this field.

**Mike:**  
_DevOps Engineer, nice! That's a pretty lofty title. What does a DevOps Infrastructure Engineer actually do at your org?_

**Steven:**  
It's interesting because I've returned to a small company. We're a software as a service company, so most of my colleagues have technical roles, which is fun because the transportation industry isn't known for its tech-savvy people.

The company serves a customer base that may not be tech-savvy, so everyone excels at translating technical language into everyday terms. I focus on keeping the infrastructure running. I am responsible for server management, VLAN configs, firewall security, audits, and working with the security team. Additionally, I delve into infrastructure as code and get to work across multiple cloud environments and handle disaster recovery measures. So it's a kitchen sink type role that keeps me engaged in various aspects of our operations.

**Mike:**  
_You mentioned that you do jack of all trades type work for this company since its smaller, but I know your previous roles were for large companies and you had very specific roles. Could you share a bit about your previous roles?_

**Steven:**  
Oh man, I've done a lot of things.

My previous gigs in larger companies were more specialized. Back in the oil and gas industry, I started as a web services coordinator, which was basically, "Hey, we've got web servers, and we need you to run them and keep everything afloat. From there, I was an early adopter of virtualization with VMware. I always ended up in these new areas because the businesses had a need and I was willing to give it go.

For example, the lead into virtualization sort of went like this: We're thinking about giving VMware a shot. Are you interested? I was like, "ooh yes, I am very much interested." We figured it out and was a gigantic success for the enterprise.

I have also worked as a SharePoint admin and switched over to architecture and design. So I've definitely had my hands in lots of different things! Workflow software like K2 also made its way into my repertoire over the years. It's been a wild ride of different roles and responsibilities!

**Mike:**  
_I've known you for a while, and I know you're all about the command line. Have you always been into the command line stuff? How did you get started with PowerShell?_

**Steven:**  
My journey into PowerShell wasn't love at first sight. When I worked at the oil and gas company, we had a really tight partnership with Microsoft and they said, "We have this new thing called Monad". At the time, Monad was just coming out of beta. This was back in 2008 when I did some official Microsoft training classes that were available to us at the time. I trained on PowerShell with the official Microsoft documentation they released.

Here's the funny thing though; I thought it was stupid. I was like, I don't know why I would use this. I have VB Script now. Looking back on that it's pretty comical, but at the time I didn't get it and, it's OK because the truth is there's times in your career you may see something and just not get it.  
I was like, OK, why would I use PowerShell to invoke WMI when I've got VB script to invoke WMI. However, a pivotal moment came during a SharePoint conference in 2010 where PowerShell took center stage for advanced administration tasks. Most of the advanced administration, in fact a ton of it, was in PowerShell.

You could do things in the UI, but about 25% of the work was in the UI and everything else was in PowerShell and I looked at that and went, oh the writings on the wall. I figured I had better learn this, and I dove into learning PowerShell with the help of colleagues who were equally enthusiastic. Together, we crafted a custom training program for our organization and PowerShell became part of our daily operations.

**Mike:**  
_It's so interesting to see where you are today with your knowledge and to see that you sort of just stumbled into many of the things you have now mastered. Seeing your background now, I think I already know the answer to my next question, but here goes..._

_What keeps you motivated to keep doing talks and demos and sharing with people?_

**Steven:**  
Let me tell you something... You want to know the best way to learn something?

**Mike:**  
_Teach it?_

**Steven:**  
Well, I would say you're going to speak about it or teach it. Demos force me to learn the material. So, that's a big driver for me.

**Mike:**  
_Did you have a moment with PowerShell where you were like, "oh, I need to know this"?_

**Steven:**  
Early on, it was probably when I started automating our code deploys. I mean, I'd had wins before but when I started using PowerShell I didn't really understand what object-oriented meant or the benefits.

So, the first thing I did with PowerShell was use the Get-Content cmdlet on a file. I had this text file with all my servers and I could connect to them using PowerShell, and I was like, oh, that's cool! Then I figured out how to pipe my server list to the Test-Connection cmdlet.

So now I've imported my list of servers, passed that data into Test-Connection, and it tells me whether all these servers are online or not. Then I made some scripts that would output status messages with Write-Host. It was really janky, but it's what I knew initially and at the time was a massive time saver.

**Mike:**  
_So even if it's janky, you do it and you feel like, oh man, I couldn't do that previously?_

**Steven:**  
Yeah! And then I learned I can use Where-Object, and then I learned I can group things. Oh look! I can also sort the data. And then the light bulb goes off. I was like, “ahhhh,” and I have this epiphany about objects and PowerShell. Well, once the epiphany hit, then I realized I can start doing some powerful stuff with PowerShell. So, what I did was set out to automate our code deploys. That was really the moment for me when I understood what's possible.

**Mike:**  
_You mentioned getting involved in setting up curriculums and sharing knowledge early on. You've done a bunch of talks for my group and others. We were also the hosts for the Summit in 2021. What's the motivation behind doing these demos? What's the reason that makes you want to do that?_

**Steven:**  
The thing for me is that this product helped me in my career, and what I want is for other people to realize the gains that are out there for the taking. Once you learn a bit, you quickly discover the ability to do many powerful things. For me it was like, "Oh, I learned PowerShell, so this is all I know." But actually, learning PowerShell made me realize that I also learned the basics of object-orientated programming. 

That motivated me to put some effort into learning good logic flows. Then I learned to write code really fast. It’s just been a very rewarding path for me, and I would like others to have a chance at the same. I want to show them that if someone like me, with no formal IT education and with music and business degrees can do this, then so can you.

**Mike:**  
_Ok, I get that. I have had some similar experiences and motivation around giving back to others. I find that this line of thought is a powerful motivator. I never thought I'd be a community leader, but I'm happy it turned out that way. Sharing with others has been super rewarding for me too._

_Let's talk Summit experience. When did you first present at Summit and what was that like?_

**Steven:**  
Last year was my first time presenting at Summit. The build-up is scary 'cause you want to do a good job, and you never know when a well-known person in the community might stroll in and wonder, "What's this speaker gonna say?"

My talks got a lot of positive feedback and people were really excited about them. But you know, when you're getting ready, you want everything to be perfect and nothing ever is. During one of my talks, the room's projector didn't work as a second monitor, so I couldn't see my speaker notes. After fiddling around for a bit, I realized I was wasting my time as a presenter, and I just decided to go for it without my notes.

**Mike:**  
_Wow, that's a tough way to kick off Summit presentations. That's great to hear that it all worked out. For those who haven't been to Summit, share any hidden insights about the Summit that first-time participants might not know. What might they encounter? What's the general attitude at the Summit?_

**Steven:**  
The 2019 Summit was a game-changer for me. The people I met were genuinely interested in my perspective and what I could gain from the event. The people at the event were so friendly that I felt comfortable and connected with them right away, and that's something you hardly ever come across.

**Mike:**  
_Before we finish, can you tell me what you'll be discussing this at Summit this year?_

**Steven:**  
I have three talks scheduled for this year. Two are for the main Summit conference and one is for the On-Ramp program. My first talk is about using PowerShell to be a Linux admin, because in my current role, unlike my 30 prior years of IT work, there are zero Windows servers at this organization. It is all Linux based, and so I've been becoming a Linux admin, among other duties.

**Mike:**  
_Wow, that sounds challenging!_

**Steven:**  
It's challenging alright. Especially when you don't have years and years of experience with it. But what I have is knowledge of PowerShell, and they did not have a problem with me putting PowerShell on a couple of servers. I'm using that to my advantage as a Linux admin, so that's what I'm gonna be talking about.

Also, I'm teaming up with Jason Helmick for another talk. We'll be discussing how to quickly and securely manage your resources using Azure Cloud Shell. It's gonna be a talk about Azure Cloud Shell. But guess what? It's based on Linux too! So I'll be doing two Linux talks at this Summit.

**Mike:**  
_Any specific topics or people you're excited to see at Summit this year?_

**Steven:**  
I think what I'm looking forward to the most is seeing how many dad jokes I can pepper people with. You know, whether it's in conversation or my presentations or whatever, 'cause that's just what I love to do.

I haven't bothered looking at the schedule yet to see which talks I'll go to because I know there'll be some stupid one-hour block where four of my friends are speaking at the same time and I'll have to make a terrible decision. I know it's gonna happen, so I haven't bothered looking since I don't want to feel overwhelmed while I'm working on my presentations.

**Mike:**  
_I can relate so much to what you just said. I keep forgetting about this thing every year. Ugh, it's so hard to decide what to go to. You forget that every hour of demos is FOUR great choices. It's torture. You want to see everything, but you have to pick just one session. You know, I'll be like, "I'm going to session A," but then I run into someone in the hall right before a session starts and they're like, "No way! You HAVE to see this next session!" and then I make some last-minute change. That's Summit in a nutshell, if you ask me. There are so many tough choices._

_Got any special plans for your sticker game on this trip?_

**Steven:**  
I have a brand new, never before seen sticker design. And I have some swag I have been stockpiling because I love that kind of stuff.

**Mike:**  
_I need one of those stickers! Will "Travel Piggy" and the Billboard Hat be making it to Summit as well?_

**Steven:**  
If I'm there and they're not, something has gone completely off the rails. Travel Piggy is super pumped for the Summit. He always has a bag ready to go traveling. He's all set and itching to go and start posting his adventures on Twitter to @travelpiggie. Plus, I know where the batteries and controller are for my hat.

**Mike:**  
_That's amazing! Thanks a bunch for spending time with me and sharing your thoughts with the readers!_

**Steven:**  
Thanks for having me. This was so much fun, and I know Summit will be too. I can't wait to go!

If you're planning on going to Summit, be sure to say hi to Steven Judd and think about attending one of his three sessions. He's the perfect example of why the Summit experience is so unique and fun! Stay tuned for more chats with Summit speakers!
