---
title: "DevOps:  A Career Changer"
authors:
  - Missy Januszko
date: "2017-01-13T16:02:18+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/01/devops-a-career-changer/
---

Once upon a time, there was this woman at a TechMentor conference a few years ago, sitting in the front of the room during the “Don and Jason" show, a not-quite-scripted discussion on various “lightning” topics.



The topic at that moment was DevOps, and this woman was asking for advice on being an advocate for DevOps in her company.



Her company had just been acquired, she explained, which meant that the atmosphere was ripe for change, but the culture of the company they had been acquired from was very change-resistant.



Among other questions, she wanted to know the secrets of getting Dev and Ops to not only work together, but get along.



And after a short discussion it was pointed out that “if you feel you can’t affect change on your company, perhaps you should 'change your company'”.



To which she responded, “That will never happen.”



After all, she had been at the same company for nearly 20 years.



The company had been acquired twice, but really, she had been in the same place for nearly half her life.






Yes, that woman is me, and this is the story of how “that will never happen” changed into “happened”.




I returned to TechMentor in 2016.



I had spent some time in the Desired State Configuration (DSC) classes the previous year, and was astounded by DSC and its capabilities, but I hadn’t done anything with it since taking the classes at the previous conference.



So, once again I sat in the DSC classes and tried to absorb as much material as possible.



The content was different – WMF 5.0 had recently been released, the pull server demo was brand-new, and I began to wonder what I could really do with DSC if I really put some effort into it.



After all, I had some servers that were in need of a technical refresh that year and wondered if it would be possible to use DSC to configure them – both from a technical and a political point of view.






After returning from TechMentor, within a month, I saw a posting for DevOps Camp.





“Experts Only”, the brochure read.



I wondered if I could “ramp up” my skills in 4 months enough to attend and not be a lost camper.



I discussed it with a friend who is also a former colleague and fellow PowerShell enthusiast.



“But we’re not experts,” he reminded me.



And I put out the ultimate challenge – “Every year we talk about going to PowerShell Summit, and every year we say the same thing.



‘But we’re not experts!’



Well, if not now, when?



And how do we get there?”



The gauntlet was thrown, and we went about the daunting task of learning DSC in 4 months.




I had a full-time job, so I started working on DSC at night.



I watched the MVA videos on the weekends, 1-2 chapters a weekend, and spent the week making up my own labs to go along with whatever chapter of the MVA I was on.



I tried my best to come up with experiments that would not only prove to myself that I understood the material, but that would be useful in my day job.



My friend and I met once a week at a local Starbucks to discuss what we had learned that week, and what stumbling blocks we had come across.






Shortly after, I made the case to research DSC not just for my own learning, but for work use.



I was permitted to work on it during work hours.



I learned, and I stumbled.



I made mistakes and I shed blood.



I picked experiments that were supposed to be code snippets that I could use in “real server configurations” and quickly learned many lessons.



Like how installing WMF 5.0 via DSC is probably the worst first attempt at creating a config.



Or how turning off TLS 1.0 is the worst second attempt, thanks to the fact that the pull server at the time required it to be on.



I went a few rounds with the certificate authority trying to set up a certificate template for encrypting and decrypting credentials in MOF files.



For a long time, the certificate authority won, until finally, at last, I figured out the missing element in the template with the help of newly-updated MSDN documentation.



I did battle with an environmental issue that made my LCM “uncooperative”, and for the record, I lost that battle and the root cause still remains a mystery, though it was likely a combination of certificate revocation policies and ever-changing proxy configurations.



But despite my struggles, I learned valuable lessons from each and every one of them.






I spent two months working on mastering the concepts from the two MVA videos, and due to the environmental issues in the development environment, the second two months building out an “automated” lab that could be built on my laptop – a Dell XPS 13 with 8GB of RAM and 80GB or less of free hard drive space.



I borrowed a USB drive for the server images, and built out a lab with an authoring box, a single DC/Certificate authority, and a pull server, the intent of which was to give me a pristine place to develop configs without getting bogged down in whatever issues I was encountering in the dev environment. 




Then I went to DevOps Camp.



And from my perspective, it was a big success.



I wasn’t lost.



I could follow along with the sessions, and I had a great time learning about the release pipeline and other tools and concepts that would take my DevOps skills and automation to the next level.



Some of my code even got shown during the camp, specifically, in the session on building an automated lab, the config for the DC that I built for my laptop lab was used in the demo.



I returned from DevOps camp full of information and also maybe a little overwhelmed with the things I wanted to try and play with when I returned.



I almost didn’t quite know what to do next.








I changed focus a little bit after that.



I wanted to start socializing PowerShell and DSC more.



I wanted to converse with people who were using it in production environments.



I started getting involved in the PowerShell community – writing an occasional blog, meeting members of the PowerShell community and PowerShell team at Ignite, joining some Slack channel discussions, and submitting a few topics for the PowerShell Summit.



And as I was doing these things, I started wondering if I was in the wrong place.



My primary responsibility was infrastructure, specifically Active Directory, and while my newfound passion for DevOps was well-received at work, it felt out of place with my “day job”.




And then, one day in mid-October, an opportunity presented itself.



It was one that would require me to think, to reflect, and most of all, move out of that comfort zone that 18 months ago I was so adamant that I would never leave.



If I were to act on this opportunity, it would require me to leave my company of 20+ years.



But was I ready?



Would what kept me there all those years continue to keep me there?




I began to seek out advice.



I spoke to family, friends, colleagues, mentors, and my financial planner.



Most were encouraging, some thought I was nuts.



Sometimes even I thought I was nuts.



Leave my comfort zone?



Leave the people that I had cultivated friendships with inside and outside work?



My former and present co-workers always said that the thing that keeps them there is the people that they work with, and that’s no lie.






The financial planner didn’t think I was nuts, and helped come up with a plan.



I listened intently to any and all advice given by all, but ultimately the decision was mine, and I had to figure out if I had the guts to move on.



Only 18 months ago, I was stating with authority to Don Jones that “That will never happen.”



But yet, now this thing that started out as just wanting to learn more about DSC and DevOps had grown from a spark into a fire.



And the opportunity to change myself and my career was presenting itself on a silver platter.






I made the decision to accept the opportunity – and that’s exactly what it was – an opportunity that I couldn’t pass up.



I doubt that I would have made the same decision had I not spent the last year working on improving my skill set.



My life is about to change in ways I never would have dreamed possible a year ago.



I’m scared shitless of the future, but I’m also eagerly anticipating the next chapter.



I’m excited about all the things that I could possibly do.



I’m jumping off the ledge into the abyss, and hoping for a soft landing.




My last day is looming as I write this, and I’m filled with constantly-changing emotions.



Saying good-bye to people I have known nearly half my life is HARD.



On those days, I’m sad, after all, they are what has kept me here and sane all these years.



The good part is that I’m not technically going anywhere, so I can see my friends any time I want, just not within the confines of the corporate walls.



The opportunity to keep in touch and socialize is still there.




But the remainder of the time I’m excited – excited to try something new.



I’ve finally decided to say out loud that I am going to go independent.



It’s risky – I’m relatively unknown, but I have some exciting things to work on, like working on the DSC book and speaking at PowerShell Summit.



I have a backlog of articles to read and videos to watch and will be grateful for the flexibility in my time to do all these things.



I’m nervous about the future but my confidence in my abilities has grown so much over the last year.




I’m worried about the financial aspects of my decision.



This is probably first and foremost in my mind, but luckily, I have a cushion that makes the risk of making the decision to go independent somewhat less.



It still concerns me, though.



It’s odd not to have to count working hours, or justify or categorize what I spent my time on that day.



If I want to spend two hours writing this article – I can.



I will probably spend the next year just figuring out how to get into a daily routine and making sure that the things on my to-do list get done.






Writing down how I got here has been an interesting trip down memory lane.



I wish I had started writing down my journey when it started, but I recall that it started out with a desire to learn and a challenge to learn for my own personal knowledge.



As I went along, I realized that to be happy and challenged and really expand my knowledge, capabilities, and skills, that it was time to move on. 






I leave you with a quote, one that I saw while out Christmas shopping, that rang true for me.






“Do not be afraid of change.



Be afraid of not changing.”
