---
title: "[UPDATED] Review: SAPIEN VersionRecall"
authors:
  - Don Jones
date: "2014-04-15T19:44:42+00:00"
categories:
  - Tools
aliases:
  - /2014/04/review-sapien-versionrecall/
---

I recently played around with [SAPIEN's VersionRecall][1], and thought I'd share a bit about the experience. As a note, SAPIEN provided me with a license key to use. VersionRecall is advertised as a simple, single-user version control system "for the rest of us." There are no servers, no databases, and nothing complex, according to the marketing copy.  
Setup is quick - a 3-screen wizard and you're done. Installation took under a minute. When you first launch the product, it attempts to find all the places on your computer where you might store scripts, so that it can connect those to a version-control repository. You can skip that bit, but it only took a few moments on my virtual machine. It found my DSC scripts, my PowerShell modules, and several other places I'd dropped scripts. You then indicate where you'd like your version-control repository - this is where old versions of files will be saved. You can also pick a certificate, to have the software automatically sign scripts each time you make a new version. That's a subtle and very cool feature - and it's a way to make AllSigned a more convenient execution policy.  
I selected an option to have my version control repository updated every day at 4:30pm. That seems to let the software capture a snapshot of any changed files at that time every day; it was clear that you could also manually submit an update to the repository using VersionRecall or Windows' own File Explorer.  
From there, you're in an Explorer-like view. It includes a tab for each folder where you store scripts. I find that I like that approach a lot - I tend to organize my scripts that way. I've got my modules in one spot, some sample scripts in another, stuff I'm playing with in a third, and so on - so the tabbed approach fits my organizational style. You can open files for editing right there. I don't have PrimalScript installed on this test machine, but files opened in the ISE just fine. Ribbon buttons let you open the shell, the ISE, or SAPIEN's PrimalScript or PowerShell Studio products.  
[![fig1](https://powershell.org/wp-content/uploads/2014/04/fig1.png)](https://powershell.org/wp-content/uploads/2014/04/fig1.png)  

Here's how this works: You have to manually submit changed files to the version-control repository, or wait for the daily check-in (remember, I set mine to 4:30pm). This doesn't magically capture changes throughout the day. But, you can always manually submit an update if you've been making significant edits. That's how most "big boy" source control systems work - only they don't usually have an automatic daily-check in as a backup plan. VersionRecall does.  
You can always compare the current version against a repository version - and it's a very slick comparison view.  
[![fig2](https://powershell.org/wp-content/uploads/2014/04/fig2.png)](https://powershell.org/wp-content/uploads/2014/04/fig2.png)  

Once you've checked in a few versions, you can easily see the complete list, quickly see what each file contains, and either restore a previous version or copy it to a different location. You can also compare two versions to see what's different.  
[![fig3](https://powershell.org/wp-content/uploads/2014/04/fig3.png)](https://powershell.org/wp-content/uploads/2014/04/fig3.png)  

Notably, VersionRecall doesn't stick your files into a database or some proprietary storage. Your check-in files _stay_ files, in their original formats. That means, if you ever need to do so, you can simply go to the folder where VersionRecall's repository is, and grab the files yourself. It should also allow files to be indexed by Windows (for filetypes where it does that), found by Windows search, and so on.  
Unfortunately, PowerShell Studio doesn't seem to recognize VersionRecall as a source control provider (at least, it didn't show up when I tried to configure source control in PowerShell Studio). That means you can't use the integrated check-in/out controls in PowerShell Studio. Instead, you almost want to open files by using VersionRecall's Explorer, save them in PowerShell Studio, and then submit them to the repository back in VersionRecall. That's a shame; the automatic check-in/out in PowerShell Studio would make it all a bit simpler.  
VersionControl uses a "Modern" user interface scheme for the most part. Its ribbon is pretty clean and well-organized, and the icons were meaningful. As with most recent SAPIEN products, you can change the theme to one of almost a dozen different styles, so you should be able to find something you like. Icons remain the same either way; all you're changing is the "chrome" of the UI.  
Not much else to say. For a product that bills itself as simple and easy, VersionControl certainly delivers. It does one thing, and it does it pretty well. It's definitely easy - and there's less excuse than ever for not using some kind of version control for your scripts. [A FAQ on SAPIEN's blog][2] answers questions like why VersionRecall doesn't check-in files automagically each time they change, how it compares to something like Git, and more.  
[**Update**: I've removed the section on the license key and activation; SAPIEN's Alex Riedel pointed out that I had some factual errors, because my observations were based on my use of a "real" license key that was issued for my particular use, not a "trial" key. I admit that I find software licensing uninteresting, and none of it has any impact on the usefulness of the software, which is what the article was meant to cover.]  
VersionRecall sells for $179 as a standalone product, which includes a year of updates. I think that price might be a bit high, given what the product does. I expect, however, that most people are getting VersionRecall as part of a SAPIEN software bundle. For $789, for example, you get everything they make. For me, the perfect combo is PowerShell Studio and VersionRecall, which retails for $568.  


 [1]: http://www.sapien.com/software/versionrecall
 [2]: http://www.sapien.com/blog/2014/04/09/versionrecall-2014-faq/
