---
title: Scripting Games Voting Continues!
authors:
  - Don Jones
date: "2013-04-30T17:52:21+00:00"
categories:
  - Scripting Games
aliases:
  - /2013/04/scripting-games-voting-continues/
---

As of right now, we've got almost 1900 votes on entries in the [Scripting Games][1]. Remember that each vote is a "pointlet" (see the PowerShell tie-in we did there?), which is basically a raffle ticket in our prize lottery.  
But... there's a secret about the lottery. It's weighted based on how many entries you've voted on.  
The algorithm is a bit complex, but for example, if you've voted on 90% of the available entries, you're something like 30% more likely to win a prize. Vote on 50%, and you're about 12% more likely to win... and so on. It's a bit logarithmic... as you get closer to 100% your chances of winning increase more and more, with about a 39% advantage if you've voted on 100% of the events.  
Of course, you can't just abuse the system. We've got automated and manual checks in place for people who are just randomly voting - clicking all the same vote, voting in patterns, or voting with very little time separation between votes. All of those things will trigger a manual review, and you can be banned _for life_ for attempting to game the system. We're also tracking IP addresses and whatnot, so if you're voting from multiple accounts, or trying to upvote your own entries... we're going to just shut you out. You won't even necessarily be notified, because we're not confrontational folks.   
But I know nobody'd do all that - we're all in this to make the Games fun and educational! So get in there and vote. And leave comments. If you vote 1-star, tell the author why, so they can improve. Hey, it's what YOU would want if someone 1-starred YOUR code, right? Right!  
So vote! [http://ScriptingGames.org][1]!  
(PS - please don't report any tech problems in the comments here. The Games Web site has a feedback link)

 [1]: http://scriptinggames.org/
