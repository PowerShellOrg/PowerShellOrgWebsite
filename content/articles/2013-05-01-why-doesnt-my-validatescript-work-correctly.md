---
title: "Why Doesn't My ValidateScript() work correctly?"
authors:
  - Don Jones
date: "2013-05-01T13:52:06+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2013/05/why-doesnt-my-validatescript-work-correctly/
---

I've received a few comments from folks after my observations on the Scripting Games Event 1. In those observations, I noted how much I loved:  
**[ValidateScript({Test-Path $_})][string]$path**  
As a way of testing to make sure your -Path parameter got a valid value, I love this. I'd never thought of it, and I plan to use it in classes. I may write a book about it someday, or maybe even an ode. Seriously good logic. But... I also bemoaned some scripts that provided an additional Test-Path, in the script's main body of code. Why have a redundant check?  
So, first, thanks for the e-mails you all sent. Second... please understand that I can't respond to you all. I've got this full-time job thing, and I've _got_ to do it or the grocery store will stop taking our checks. You're _welcome_ to drop comments here, and I _really appreciate_ when you say stuff like, "can you explain ___ in a future post?" because it gives me ideas to write about. I just can't get into private e-mail based education for a dozen folks. Teaching is kinda what I do for my job, so most of my time has to go to that.  
But - there's a great teaching point here. Let's take this example:  
[![valid-default-path](https://powershell.org/wp-content/uploads/2013/05/valid-default-path.png)](https://powershell.org/wp-content/uploads/2013/05/valid-default-path.png)  
This works as you would hopefully expect. When given a valid path, it's fine. When allowed to use a valid default, it's fine. When given an invalid path, it barfs in the ValidateScript. Now look at the next example - which more closely approximates what people have been seeing in their Scripting Games scripts:  
[![invalid-default-path](https://powershell.org/wp-content/uploads/2013/05/invalid-default-path.png)](https://powershell.org/wp-content/uploads/2013/05/invalid-default-path.png)  
In the Games, you were given a default path that _wasn't valid on your computer._ So folks allowed their script to run with that default, and got errors, and were annoyed that ValidateScript() didn't catch the problem.  
It never will.  
When you run a command, PowerShell goes through a process called parameter binding, wherein it attaches values to parameters and runs any declarative validation - like ValidateScript(). That validation will _always_ catch invalid incoming data that's been manually specified or sent in via the pipeline (for parameters that accept pipeline input). Because my -Path parameter wasn't declared as mandatory, the validation routine will let me run the script and not specify -path.  
_Then_ the shell actually _runs_ my code - and _that's_ when it assigns the default value to $path if one wasn't specified on -path. Validation is over by this point, so an invalid default value will sneak by. The assumption by the shell is that _you're_ providing the default value, so _you're_ smart enough to provide a valid one. If you don't, it's your problem.  
So do you just add a second, in-code check for the parameter? I'd still say no. I really dislike redundancy. If you know, because of your situation, that you can't rely on ValidateScript(), then don't use it at all - one check should suffice, and if it needs to be in-code instead of declarative, that's fine. What'd be nice is if there was a declarative way of specifying a default, like **[Default('whatever')]** that ran before the validation checks, but such a thing doesn't exist. Frankly, you could probably argue that if you can't guarantee the validity of a default, then you shouldn't provide one - and I'd probably buy into that argument, and subscribe to your newsletter.  
In this case, the problem is entirely artificial. The default path value given to you in the Games scenario _is_ valid _in the context of the Games;_ it's just when you test it on _your_ system, _outside_ that context, that a problem crops up.  
Hopefully this helps explain how the ValidateXXX() attributes work, and how they interact with other features, like a default value.  
_Now_ explain why this will never assign C:\ as a default value:  
**[Parameter(Mandatory=$True)][string]$path = 'c:\'**
