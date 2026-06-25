---
title: The DSC Conversation Continues
authors:
  - Don Jones
date: "2014-03-05T18:58:37+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/03/the-dsc-conversation-continues/
---

Some [lovely conversation on DSC over on Reddit...][1] with some I wanted to perhaps offer an opinion on. From what I've seen, these are very common sentiments, and they definitely deserve... not argument or disagreement, but perhaps an alternate viewpoint. I'm not suggesting the commenters are wrong - but that maybe they're not considering the entire picture.

> Certainly if you work with a superset of MS OSs (i.e. you do Linux also), then Puppet or something like it seems like a no brainer. In fact, that is what we're doing now. Puppet has powershell modules you can install for instance. Personally, I still feel like Powershell is overrated except for small snippets of that's how something is exposed. Puppet can run powershell commands. AutoIT can run powershell commands... I just don't see value in Powershell today.

The point is that, until PowerShell, there were no PowerShell commands. Microsoft was incredibly inconsistent about providing automation-friendly commands of any kind. They could have gone down the path of building command-line tools for Cmd.exe; they didn't. The point of PowerShell is that Microsoft forced themselves to build commands. Now, if you run those from AutoIt, or Puppet, or whatever else - that's cool. PowerShell is an API, not a tool. Whatever tool you use to access that API is just dandy. Without the API, the tools are useless.

> As to DSC - I'm really confused. Why is this separate from Group Policy again? Why is it better? Or is MS giving up on Group Policy as needing a total re-write?

The advantage of Group Policy over DSC, today, is that GP has richer ability to target computers based on OU membership, WMI criteria, etc. Today, DSC targeting isn't that flexible. On the other hand, GP is extremely difficult to extend, since client extensions are native code. GP was built to manage the registry, although it's been extended to do more. DSC is built to do whatever PowerShell (and, via CIM, native code) can touch. My opinion? Yeah, DSC will obviate GP over time. Not instantly.

> Specifically, as I've been rolling out Puppet across Windows and Linux, I see that in some ways, it brings the computer GPO aspect to Linux, and duplicates it a bit on Windows.  
> Anyway, I won't be surprised to see someone start writing DSC modules in Puppet, because you'll want your config management to work across your platforms. And MS is kind of late to the game here - many many people have lots of knowledge already in Puppet, Chef etc...

The guys on the PowerShell team love Chef and Puppet. I think you're confusing "api" and "tool." There are two pieces to DSC: Piece one is the ability of PowerShell to read a configuration script and produce a MOF. Piece two is the ability of a Windows computer to receive that MOF and reconfigure itself accordingly. Any tool can do piece one. Use Puppet to produce the MOF. Use Puppet to control which MOFs get sent where. That's the _intent. _But Microsoft takes a big burden off the Puppet developers by having Windows _know what to do with the MOF. _Yeah, MS is late to the game. No question. But they're _joining_ the game, not reinventing it. What they're doing works with what everyone else is already doing.

> I would personally carry the sentiment even further and say that investing the bulk of your effort in DSC over something like Puppet would be needlessly tying your own hands. Why focus on something that's platform specific when there is a good cross-platform alternative. Don't put all your eggs in one basket as it were.

Wrong. It isn't an either-or thing. DSC's introduction at TechEd 2013 included a demo of Puppet (or was it Chef?) being used to send configurations to Windows - much more easily, because with DSC, Windows natively knew what to do with them. If you've _got_ tooling like Puppet, _use it. _DSC is just making Windows work better with it. The whole _point_ of DSC is that it plays the cross-platform game _everyone else has already been playing. _  
Purely on the Windows side, the need to focus on DSC is more about developing the DSC _resources_ you need, so that you can send a MOF (from Puppet, say) to a Windows computer, and that Windows computer will know how to configure everything _you_ need configured. Microsoft will continue to produce resources for core OS and server application stuff; any LOB stuff is what you'd be focusing on.  
Heck, even in a pure-Windows environment, with cross-platform off the table, Puppet provides _tooling__ _that DSC does not. You're going to need those tools, whether it's Puppet, some future System Center thing, or whatever. DSC is a mid-level API, not a tool.

> Configuration managment does seem to be the future -- I just don't agree completely with the author's point of a view that it will have to be DSC.

On Windows, DSC will be the underlying API that your configuration management tool talks to. DSC isn't a configuration management tool. DSC bridges the gap between a text-based MOF and the bajillion proprietary protocols MS uses internally in their products. Remember, on Linux, it's easier - everything already lives in a text file of some kind, right (oversimplifying, I know, but still)? In Windows, config information lives _everyplace_; DSC's main job is to bridge the gap. DSC doesn't provide _management_ of what configuration goes where; it just provides the implementation mechanism. In PowerShell, there's a primitive ability to write configurations, because MS has to give you something, but yeah... I think most organizations would benefit from good tooling atop that.  
I think this entire discussion is why more people need to start **learning** (not necessarily using) DSC if you have Windows in your environment. Find out what it is, what it isn't, and how it'll play into the other efforts you've got underway. There's a ton of misconception about what it is and where it's meant to fit in. When I say, "if you're not learning DSC, you're screwed," I don't mean, "if you're not _using_ DSC." I mean _learning. _Because if you're not _learning _it, you're going to be subject to the same misconceptions about it. You end up spending a lot of time reinventing what it's willing to do - and what it's willing to do _in conjunction with_ your existing tools.  



 [1]: http://www.reddit.com/r/sysadmin/comments/1ziudp/desired_state_configuration_dsc_musthave_or_just/
