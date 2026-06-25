---
title: Event 4 Notes
authors:
  - Don Jones
date: "2013-05-23T15:10:15+00:00"
aliases:
  - /2013/05/event-4-notes/
---

Loved seeing **[OutputType([PSObject])]** in an entry this morning... that helps the help system document what your script produces. It's a shame it doesn't work well with custom type names (since those are a bit of a fake-out on the object), but it's an attention to detail I appreciate.  
I **am** seeing a little bit of misunderstandings. Keep in mind that the lastLogonTimestamp attribute in AD is the one that replicates, although there is a long possible delay in that replication. There are other "last logged on" attributes that _don't_ replicate so you can't rely on them unless you're querying every DC (pretty inefficient).  
Hey, one thing to think about: sometimes simpler is better. For example, instead of adding a dozen lines to check and see if a module exists and can be loaded, just add a #requires comment for that module. Let the shell do that work and spew an error if the module isn't present. It'll even force-load the module into memory. Saves lots of steps.  
Hey, don't declare functions as **global:Do-This**. It's a neat trick, but you're polluting the shell's global scope. Plan to write in-scope functions and make them a script module, so they can be loaded and unloaded. From the Games perspective, "whatever," but in the real world... don't pollute the global scope.  
A comment I saw: "You should check to make sure the module isn't loaded before loading it again." Disagree. The shell does this for you when you use Import-Module. But, doc your module dependency in a #requires, and you won't have to worry about the module. In fact, the whole theme of "checking to see if the AD module is loaded" appears to be a major point of commenting. I'm a fan of "easier" and a 1-line **#requires -module ActiveDirectory** is far easier to write and maintain than, say, and entire function designed specifically to load the ActiveDirectory module.
