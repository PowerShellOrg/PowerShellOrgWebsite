---
title: "Winter Scripting Camp: The Post Mortem"
authors:
  - Don Jones
date: "2013-02-11T21:51:59+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/02/winter-scripting-camp-the-post-mortem/
---

Ok, aftermath time. In Winter Scripting Camp I saw some very cool stuff, but I know folks want to learn from this event too, so I want to call out some stuff that I didn't like so much, and explain why. I'm keeping these brief - if you'd like a longer explanation, hit me up in the [PowerShell Q&A forum](/discuss/). BTW, none of the discussion below implies anything about the grade I awarded the entry. I considered a much broader range of criteria and opinions in awarding grades.


## 
  My -f Nitpick


  This bugged me a wee bit. I know, it's a nit:


`Write-Warning ("{0} not online" -f $computer)
`I'd personally have done:


`Write-Warning "$computer not online"
`Personal preference; the latter is easier to read. I don't like using -f unless I actually need its formatting capability.

## My Preference is No Preference

Next up, a script with this:


`#$script:DebugPreference = "Continue" # debug msgs on
$script:DebugPreference =  "SilentlyContinue" # debug msgs off
`This only bugged me because this was in a script that contained a function; the function implemented [CmdletBinding()]. That means the function would suppress Write-Debug by default, and enable it when run with -Debug. Never a need to mess with those preference variables in an advanced function.

## Redundant Code

I noticed this:


`END{Clear-Variable -Name obj}
`Nothing wrong with that, but it's redundant. The variable $obj was created inside the function; PowerShell deletes the variable when its enclosing scope is destroyed. So the END block is just unnecessary code and an unnecessary step - forcing the shell to delete something before removing the scope, which would have deleted it anyway.

## No Examples?

Another one: The author took a great deal of time to put in detailed usage examples for their command. But didn't do so in comment-based help... which seems odd, because they'd added comment-based help already. That made the examples impossible to see unless you opened the script, which kinda defeats the point :(.

## I Got Your SilentlyContinue Right Here...

This is a huge concern for me, and it **is** something I deducted points for. **Please don't misuse** _-ErrorAction SilentlyContinue_ **and be very judicious** with _$ErrorActionPreference='SilentlyContinue'_. The former is appropriate when _you don't care if there's an error,_ like deleting a file that doesn't exist. You get an error, but who cares, because mission accomplished, right? Don't just suppress errors. I get really bugged at SilentlyContinue on Get-WmiObject statements, for example. It's bad coding. The latter example _will make me fail your script entirely_ if you just chuck it in at the top of a script. You're suppressing every error the script might generate, and it makes me wonder what you're hiding. Messing with $ErrorActionPreference is appropriate only when you need to suppress/handle a specific error that might be raised by a method or something else that doesn't have an -ErrorAction parameter. I saw some egregious overuse of this, and it's a bad, bad, bad, bad, bad coding practice.  
Sadly, some of my fellow judges disagree with me on this and think that _-ErrorAction SilentlyContinue_ is merited. That's fine; that's why we have multiple judges looking at each entry. I say, if you're not going to _handle_ an error, don't _suppress_ it. Otherwise whoeever is running your command will be, like, "did anything just happen, or not?" Either let the default error messages shine through, or come up with your own alternative.  
I'm gonna get a class of whiskey. Be right back.

## Consistency!

Ah, that's better. Next up is this:


`[Parameter(Mandatory=$true, ValueFromPipeline=$true)][string[]]$ComputerNames
`Try to stay consistent with PowerShell's own naming. Look at Get-WmiObject. What parameter does it use to accept computer names? -ComputerName. Not -ComputerNames. So your commands should all use -ComputerName, even if they're accepting more than one computer name. Keep your public interface - your parameter and command names - consistent.

## You're Not an Accumulator


`begin {         $results = @()     }
process { $results += # whatever }
end {
        $results | Format-Table -AutoSize
    }
`Ouch. Don't like to see this. The purpose of the pipeline is to accumulate output - you shouldn't be building internal arrays to do that. And you also shouldn't ever, ever, ever, ever, almost ever use a Format command in your function. When you do that, you're preventing me from piping the output of your command to a CSV, or to XML, or into a GridView, or anyplace else. You've made your command non-reusable outside of your original scenario, a very poor programming practice. Just use Write-Output to write objects to the pipeline, and let the shell handle it from there.

## $Args[0]

Look, if you're going to accept parameters, _document them_ in a Param() block. So they have names and I can figure them out. $ComputerName I understand; what does $args[0] contain? I can't glance and tell - I have to follow the logic if your script, which means it isn't self-documenting, which means I'm sad.

## Write-Host

I will not be kind to you if you use Write-Host as a means of producing output from your script, unless your script/command is named "Show-XXXXX," indicating its only sad purpose in life is to display information on the screen and never anyplace else.

## Don't OVERTHINK

Too many people started treating this like a certification exam, unfortunately, and we're going to be making some changes to the real Games to address that. A lot of folks just frankly overthought things. In one case, we were really just looking for something like:


`Get-WmiObject -ClassName Win32_Volume -ComputerName (Get-Content names.txt) | Select-Object -Property DeviceID,@{n='FreeSpace(GB)';e={$PSItem.FreeSpace / 1GB -as [int]}}
`(That isn't the exact answer to an event - it's an illustration). In many cases we got multi-line scripts that created a dozen variables, suppressed errors (grr), pinged computers... sometimes, less is more. Again, I'm not saying anyone got down-checked for all the extra work, but guys and gals _try not to overthink this._ As I said, we're going to implement changes in the way scenarios are created for the real Games, because we want you all using creative approaches and worrying less about ticking off marks in a list. "Did I add error handling? Did I ping the computers? What am I missing? What secret thing are they looking for that I forgot?" Relax a little!

## Up Next...

Now... what's coming up for the real Scripting Games? Some changes, based on what we learned during Camp. Stay tuned.
