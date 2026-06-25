---
title: "Essential PowerShell: To alias, or not to alias, that is the question"
authors:
  - Kirk Munro
date: "2012-01-05T14:30:00+00:00"
aliases:
  - /2012/01/essential-powershell-to-alias-or-not-to-alias-that-is-the-question/
---

Recently there was a discussion between community experts and a product team about a module they are working on.  The topic being discussed was cmdlet aliases: whether or not they should provide aliases for their cmdlets out of the box and if so, how they should be provided.  Aliases are great for ad-hoc PowerShell work, which is what most PowerShell users do at this point, and incredibly useful when you"™re trying to put out a fire and managing your infrastructure using PowerShell.  However, there are many important things that module authors need to consider when planning aliases for their cmdlets, as follows:

1. There are many cmdlets out now, and more and more every month.  Coming up with a vsa (very short alias) that is _unique_ is a challenge at best, and the more time goes by the more tla's (three-letter aliases) will get used up.  The likelihood of an alias conflict is already high, and increasing all the time given the number of commands that are available both from Microsoft and from third party vendors.

2. The land grab with alias names is worse than it is with functions or cmdlets.  With functions or cmdlets, you can have multiple modules loaded with conflicting names and access either command using the fully qualified command name.  With aliases though you are not provided this same capability "“ there can be only one.  Aliases are simply commands set to a single value and they cannot be qualified using a module name qualifier to disambiguate if a name conflict arises.

3. Depending on how careful (or not) that developers are, it is very easy for a module author to completely take over (overwrite) an existing alias with no warning or message indicating that this has happened, resulting in potential command hijacking between module teams.  A simple call to Set-Alias does this without warning.  On the flipside, if developers don"™t hijack aliases, then some of the aliases they would otherwise create may simply not be defined.

4. When aliases are hijacked, unloading a module doesn't correct the problem because an alias that was overwritten by a module alias will simply become completely unavailable when the alias is removed as the module is unloaded.

As far as I am aware, this situation does not improve with the next version of PowerShell either, so it's years away from getting better.

Believe it or not, even with these things in mind, I'm actually still pro aliases.  I just think that some extra care/thought needs to be put into their definition.  There is no real standard here that both satisfactorily addresses the issues identified above and that allows for consistency across companies/teams at this time.  Given that is the current state of affairs, if you are considering aliases for your module I recommend one of the following approaches:

1. [SAFEST] Rather than trying to come up with something that can be shipped despite these issues, at this time I think aliases would be best addressed in a "tips and tricks" type of blog post, proposing a short script that defines some useful aliases for the module/snapin in question in order to allow admins to be able to deal with fires quickly using ad-hoc PowerShell commands via some aliases.  Such a script should generate warnings whenever a name conflict is discovered so that users are aware when an alias either cannot be created or is overwritten.

2. [EXPERIMENTAL] Ship aliases with your module, but try to make sure they really are unique.  For example, if you"™re a vendor whose company name starts with Q, you could prefix all of your aliases with "q".  This is attractive because there are no verbs that start with "q", so right from the start you've dramatically reduced the chance that you'll have a conflict, setting yourselves up better to have aliases that belong to you.  Then you would only have to coordinate within your company to make sure the aliases used across teams are unique.  This isn"™t foolproof though because there may be multiple products/vendors that adopt the same standard, and if the name of your company or product starts with G, the likelihood of a conflict would be much higher (the alias prefix used for "get-*" cmdlets is "g") so you may want to choose a pair of letters instead.  Regardless, you've likely reduced the risk, and you could generate a warning whenever you run into a conflict that prevents an alias from being created.

3. [RECOMMENDED] Lots of 1 and a little bit of 2: use unique alias names that work for your product team/company, but don't ship them with the module.  Instead, push them out as a value add on a blog post, and see how the community responds.  At the same time work with MVPs and Microsoft to get these issues addressed such that a shorthand system for command names does work.  Some MVPs, already proposed a few things to the Microsoft PowerShell team that could help here (aliases for module names for one — think PS\gsv for a core PowerShell version of Get-Service or EX\gu for the Get-User cmdlet that comes with the Microsoft Exchange module or AD\gu for the Get-User cmdlet that comes with the Microsoft Active Directory module, and so on), but more discussions need to happen and this will take more time.

I recommend the third option because given the current issues with alias hijacking and with no support for disambiguation, it seems to be the best solution for now (from my perspective at least).  If you have come up with other alternatives that resolve these issues, please share them with the community so that this improves going forward.

Hope this helps,

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[Essential PowerShell](http://technorati.com/tags/Essential+PowerShell),[alias](http://technorati.com/tags/alias)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/738/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/738/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=738&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)
