---
title: My outline for accelerated PowerShell training
authors:
  - Don Jones
date: "2013-12-20T22:40:00+00:00"
categories:
  - Training
aliases:
  - /2013/12/my-outline-for-accelerated-powershell-training/
---

When I teach PowerShell, either at a private client or in a public class, I tend to use my own outlines. I'm comfortable with them, and they work really well. They formed the basis for the Microsoft 10961 and 55039 courses, although I had to make some changes to accommodate Microsoft standards and varying MCT delivery styles. But I'm often asked if there's a "MOC-equivalent" outline that combines the entry-level 10961 with the scripting-focused 55039.  
Yup.  
First, do understand that I naturally teach at a very concise and accelerated pace. I don't spend much time on slides; I tend to skip right to demos, and use those to explain what I'm explaining. If you follow a more common delivery style of around 5min per slide, plus taking your time on demos, my approach might not work well for you. I also tend to not tell a lot of ancillary stories, I tend to make students take break during lab time (rather than individually scheduling breaks), and I tend to be as concise as possible in my lectures.  
Also, when accelerating these courses together, you don't do _all_ of the labs. For labs with multiple components (find these 20 command), I'll do about 1/3 of them. For the 55039 main-sequence labs, I'll tell students to pick the "A," "B," or "C" version rather than doing all three; sometimes I'll just have them do the "D" version (which gives them a pre-done starting point for each module, rather than making them build on their own work from a previous module).  
For Day 1, I'll cover modules 1-5, and maybe module 6, from 10961. Day 2 will be modules 7, 9, 11, and 12 (covering 6 first, if I didn't get it done on Day 1). That's the "core" PowerShell stuff. It's a fast delivery; it's possible to spread those out over three days if you prefer, but I explicitly skip modules 6, 8, and 10 at this stage.  
When my students all have strong shell or scripting skills, 2 days often gets me through that. If they're newer, I'll go slower on modules 1-5, do more of the labs, and take 3 days to cover that 10961 material.  
The remainder of the course comes from 55039. That'll be 2 or 3 days, depending on how long it took you to do the 10961 material. Regardless, I'll cover modules 2-5. I'll usually skip module 6, and try to end the day with module 7 on debugging. I'll cover module 8, 9, and 10. That's usually 2 days, so it's the last thing I do if I took 3 days to cover the 10961 stuff.  
If I got through 10961 in 2 days, I'll finish the 55039 material, covering modules 11, 13, and 16. If students insist on workflows, I'll throw that module in there - I have mixed feelings and results when it comes to workflow, so it's not part of my standard accelerated delivery. If you have extra time, my priority then goes to modules 15, 13, and 14, in that order. 14 gets you some GUI-building experience, so if the class is pushing for that I'll include that module instead of workflow.  
If all that seems a little informal - well, it is. I'm very good at reading my students, and making sure folks are actually keeping up, so I don't press too hard. This is a _lot_ of conceptual and practical material to cover in a week.  
Price-wise, in the US, I see this kind of accelerated class going for around $3500, although a lot of training centers offer significant discounts. This accelerated outline is absolutely worth it: you're literally taking someone from zero and teaching them how to build their own script modules and tools in PowerShell. It's a _lot_ to cover; not every class will be up to it.  
The labs in both courses are solid, and I'm especially happy with the ones in 55039 in terms of what they cover, and in how challenging they are. I'll warn you that the 55039 labs don't do a lot of hand-holding. Students are expected to _learn_ the material and then execute the labs; the "answer keys" are outright sample solutions, not hints. But if you teach the material as provided, everything students _need_ is in there - if they're willing to work hard and retain what you've shared.
