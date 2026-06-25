---
title: Scripting Games beta entry viewer
authors:
  - Don Jones
date: "2013-05-10T19:43:04+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/05/scripting-games-beta-entry-viewer/
---

If you'd like a quick peek at something, log into the [Scripting Games Web site][1], and go look at the entries in Event 1. Your URL should look like this:  
**http://scriptinggames.org/entrylist.php?eventid=11**  
Change it to this:  
**http://scriptinggames.org/entrylist_.php?eventid=11**  
This is the new viewer I'm building. It isn't rigged up to accept votes or comments, yet, but I'm working on that. It's being developed for Firefox; I'll test the other major browsers once it's a bit more complete. This is under development, so it may be offline or unreliable. Don't _tell_ me about it - I'm _already working on it_ .  
You can probably use this on Event 2 as well. The voting and commenting should be working. Note that you must vote before you can comment, and right now it'll only accept one comment per person. That will probably remain the case for the current iteration of the Games based on some back-end dependencies. However, you CAN tie a comment to a particular line number or range of lines, and when viewing the comment it'll highlight those lines. It's pretty neat, I think.  
Oh, and I know the coloring on block comments is wonky. I need to dive into the color-er's regexes and see if I can tweak that. Any regex wizards who want to volunteer to help with that, drop me a line. Right now the PowerShell syntax in the color-er is a little primitive. Actually, there are probably several regexes we could add to this to spruce up the listings.  
And yes, I know the comments now show the author's user name. That's been a big back-and-forth. I'm not a huge fan of anonymous commenting, and right now it's just your username anyway. Hopefully nobody said anything truly offensive simply because they thought they were anonymous :).  
Back to work.

 [1]: http://scriptinggames.org/
