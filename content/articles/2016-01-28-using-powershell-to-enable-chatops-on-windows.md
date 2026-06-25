---
title: Using PowerShell to enable ChatOps on Windows
authors:
  - Matthew Hodgkins
date: "2016-01-28T14:31:19+00:00"
categories:
  - DevOps
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2016/01/using-powershell-to-enable-chatops-on-windows/
---

ChatOps is a term used to describe bringing development or operations work that is already happening in the background into a common chat room. It involves having everyone in the team in a single chat room, then bringing tools into the room so everyone can automate, collaborate and see how automation is used to solve problems. In doing so, you are unifying the communication about what work gets done and have a history of it happening.  
ChatOps can be supplemented with the use of tools or scripts exposed using a chat bot. Users in the chat room can talk to the bot and have it take actions on their behalf, some examples of this may be:

  * Checking the status of a Windows Service
  * Finding out who is on call via the PagerDuty API
  * Querying a server via WMI to see how much disk space is available

Bots can also be a great way to expose functionality to low-privledged users such as help desk staff, without having to create web interfaces or forms.  
If you want more details on the concept of ChatOps, I recommend watching **[ChatOps, a Beginners Guide][1] **presented by [Jason Hand][2].  
A popular toolset for ChatOps is [Slack][3] as the chat client, and [Hubot][4] as the bot. In this post we will use Slack and Hubot together with a PowerShell module I’ve written called [PoshHubot][5]. The module will handle installation and basic administration of Hubot. From there, we will integrate Hubot with PowerShell so we can perform some ChatOps in the Microsoft ecosystem.  
Continue reading over at [hodgkins.io][6]

 [1]: https://www.youtube.com/watch?v=F8Vfoz7GeHw
 [2]: https://twitter.com/jasonhand
 [3]: https://slack.com/
 [4]: https://hubot.github.com/
 [5]: https://github.com/MattHodge/PoshHubot
 [6]: http://bit.ly/PSHubot
