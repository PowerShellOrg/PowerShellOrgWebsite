---
title: "No \"Easy\" Button for Configuration Management"
authors:
  - Missy Januszko
date: "2016-10-12T00:18:44+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/10/no-easy-button-for-configuration-management/
---

A discussion in one of my Slack channels caught my eye today around someone’s reflections in a github repo regarding DSC. The posted comment that introduced the link was titled “DSC from a newbie perspective”, and I thought “Oh? I’m a newbie too, I wonder if we’re thinking the same things.”  
A little history is probably needed on my “newbie” status with DSC. I went to the Tech Mentor conference in March, where I spent most of my time in sessions learning DSC. I was hooked, but knew I needed much more in-depth training to make it something that would be useful to me in the real world. So I set a goal of learning DSC in depth about 4 months, so that I could attend DevOps Camp in August, and be able to converse intelligently about DSC, Configuration Management, and DevOps in general. And with some help from friend and mentor Jason Helmick along with blood, sweat, tears, and 10-15 extra hours a week spent on just DSC, I made it to DevOps Camp and managed to follow along and join in the discussions.  
I’ve got about 6 months of DSC experience under my belt at this point, but I still consider myself a “newbie” in the grand scheme, so I fell hook, line, and sinker to go check out the comments here:  
<https://github.com/18F/azure-sandbox/blob/master/dsc/README-dsc.md>  
I’m not an expert in Chef, so I won’t comment on the comparisons between the two. But while two weeks may be long enough to do a quick comparison between a product you know something about (in his case, Chef) and a product you are vetting against it (DSC), it isn’t nearly enough time to come to a conclusion like “DSC is too immature to even consider as a stopgap”.  
Reading on, the reasons for liking/hating DSC seem to be the reasons for hating/liking Chef. Not wanting others to need to deal with learning Ruby was mentioned as a plus for DSC.  But it also seems like the poster wanted or expected DSC to be easy so that folks didn’t have to learn Chef, and was disappointed that it wasn’t.  
There’s no “easy” button - if there really were an easy button for automation and configuration management, we’d have all the resources ever wanted neatly packaged and consumable, but the building of the platform and the tooling surrounding the platform takes time, people, and effort. So build and submit a High Quality Resource Module, or fork and fix some of the “awful error tracking”.  Some of these comments and feedback are really quite legit – but the points that need to be made and worked on are lost under the lamenting that DSC doesn’t have an Easy button.
