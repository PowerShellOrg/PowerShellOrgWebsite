---
title: "Why Puppet vs. DSC Isn't Even a Thing"
authors:
  - Don Jones
date: "2014-05-14T13:06:15+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2014/05/why-puppet-vs-dsc-isnt-even-a-thing/
---

After all the DSC-related excitement this week, there have been a few online and Twitter-based discussions including Chef, Puppet, and similar solutions. Many of these discussions start off with a tone I suppose I should be used to: fanboy dissing. "Puppet already does this and is cross-platform! Why should I bother with DSC?" Those people, sadly, miss the point about as entirely as it's possible to do.

## Point 1: Coolness

First, what Microsoft has accomplished with DSC is **cool.** Star Wars Episode V was also cool. These facts do not prevent previous things - Puppet/Chef/etc and Episode IV - from being cool as well. Something new being cool does not make other things less cool. This shouldn't be a discussion of, "Puppet did this first, so nothing else can possibly be interesting at the same time." As _IT professionals,_ we should be looking at _everything_ with an eye toward what it does, and what new ideas it might offer than can be applied to existing approaches.

## Point 2: Switching

Have you seen the magazine ads suggesting you ditch Puppet and start using DSC? No, you have not - and you will not. If Puppet/Chef/etc is meeting your needs, keep using it. The fact that Microsoft has introduced a technology that accomplishes similar things (make no mistake, they're not the same and aren't intended to be), doesn't mean Microsoft is trying to convince you to change.  
I know where people get confused on this, because in the past that's exactly what Microsoft intended to do. They're not, this time. And I'll explain why in a minute.

## Point 3: DSC on Linux

Snover demonstrated a DSC Local Configuration Manager running on Linux, consuming a standard DSC MOF file, being used to set up an Apache website on the server. The underlying DSC resources were native Linux code.  
This is not an attempt to convince Linux people to switch to Windows, nor is it an attempt to convince them to use DSC. Saying so is like saying, "Microsoft made PowerShell accept forward slashes as path separators in an attempt to convert Linux people.... _but we're too smart for that, hahahahah!"_ It's idiotic. Microsoft knows you're not going to suddenly break down and switch operating systems. They may be a giant corporation that sometimes makes silly moves, but they're not _dumb._  
No, DSC on Linux is for _Windows admins_ who choose to use DSC, and who want to extend that skill set to other platforms they have to manage. People who aren't, in other words, faced with a "switch" decision.

## Point 4: Puppet/Chef/etc Should Use DSC

Linux is, in many many ways, a more simplistic OS than Windows. And I mean that in a very good way, not as a dig. Most config information comes form text files, and text files are ridiculously easy to edit. Getting a solution like Puppet to work on Linux is, form a purely technical perspective, pretty straightforward. Windows, on the other hand, is built around an enormous set of disparate APIs, meaning getting something like Chef/DSC/whatever working on Windows is not only harder, it's essentially a never-ending task.  
Microsoft is pouring time and money into creating DSC resources that can, through a very simple and consistent interface, configure tons of the OS. The coverage provided by DSC resources will continue to grow - exponentially, I suspect. That means Microsoft is doing a lot of work that you don't have to.  
Even if you're using Puppet/Chef/etc instead of DSC, you can still piggyback on all the _completely open and human-readable code_ that actually makes DSC work. Your recipes and modules can simply call those DSC resources directly. You're not "using" DSC, but you're snarfing its code, so that you don't have to re-invent that wheel yourself. This should make Puppet/Chef people super-happy, because their lives got easier. Yes, you'll doubtless have to write some custom stuff still, but "save me 
some
 work" should always be a good thing.

## Point 5: Tool vs. Platform

Another thing that sidetracks these discussions is folks not understanding that Puppet/Chef/etc each provide a complete solution stack. They are a management console, they are a domain-specific language, and they are a platform-level implementation. When you adopt Puppet, you adopt it from top to bottom.  
DSC isn't like that.  
DSC only provides the platform-level implementation. It doesn't come with the management tools you actually need in a large environment, or even in many medium-sized environments. I completely expect tools like System Center Configuration Manager, or something, to provide the management-level tooling on top of DSC at some point - but we aren't discussing System Center.  
So arguing "Puppet vs. DSC" is a lot like arguing "Toyota vs. 6-cylinder engine." The argument doesn't make sense. Yes, at the end of the day, Puppet/Chef/etc and DSC are meant to accomplish every similar things, but DSC is only a piece of the picture, which leads to the most important point.

## Point 6: Microsoft Did Something Neat

You can't take your Puppet scripts and push them to a Chef agent, nor can you do the reverse. Puppet/Chef/etc are, as I mentioned, fully integrated stacks - and they're proprietary stacks. "Proprietary" is not the same as "close-sourced;" and I realize that the languages used by these products aren't specifically proprietary. But the Puppet agent only knows how to handle Puppet scripts, and the Chef agent only knows how to read Chef scripts. That's 
not
 a dig at those products - being an integrated, proprietary stack isn't a bad thing at all.  
But it's interesting that Microsoft took a different approach. Interesting in part because _they're_ usually the ones making fully-integrated stacks, where you can only use their technology if you fully embrace their entire product line. This time, _Microsoft bucked the trend_ and didn't go fully-integrated, proprietary stack. Microsoft did this, and the simple fact that they did is important, even if you don't want to use _any_ of their products.  
From the top-down, that is from the management side down, Microsoft isn't forcing you to use PowerShell. They're not forcing you to use Microsoft technology at all, in fact. The configuration file that goes to a managed node is a static MOF file. That's a plain-text file, as in "Management Object Format," as in developed by the Distributed Management Task Force (DMTF). A vendor-neutral standard, in other words.  
See, Microsoft _isn't_ pushing DSC as a fully integrated stack. DSC is just the bottom layer that accepts a configuration and implements it. Puppet Labs could absolutely design their product to turn Puppet scripts into the MOF file that DSC needs. You'd be able to completely leverage _the OS-native, built-in configuration agent_ and all its resources, right from Puppet.  
Frankly, de-coupling the administrative tooling from the underlying API should make people _happy._ If we're having a really professional, non-fanboy discussion about declarative configuration, I think you have to admit that Microsoft has kinda done the right thing. In a perfect world, the Puppet/Chef/etc administrative tools would let you write your configuration scripts in their domain-specific language, and then compile those to a MOF. Everyone's agents would accept the same kind of MOF, and execute the MOF using local, native resources. That approach means _any_ OS could be managed by _any_ tool. _That's_ cross-platform. You'd be free to switch tools anytime you wanted, because the underlying agents would all accept the same incoming language - MOF.  
I'm not saying Puppet/Chef/etc _should_ do that. But if you're going to make an argument about cross-platform and vendor-agnostic tooling, Microsoft's _approach_ is the right one. They've implemented a service that accepts _vendor-neutral configurations_ (MOF), and implements them using local, native resources. You can swap out the tooling layer anytime you want to. You don't need to write PowerShell; you just need to produce a MOF.

## At the End of the Day

I think the folks behind Puppet/Chef/etc totally "get" all this. I think you're probably going to see them taking steps to better leverage the work MS is doing on DSC, simply because it saves _them,_ and their users, work. And I don't think you're going to see Microsoft suggesting you ditch Puppet in favor of DSC. That's a complete non-argument, and nobody at Microsoft even understands why people thing the company wants that.  
I fully recognize that there's a lot of "Microsoft vs. Linux" animosity in the world - the so-called "OS religions." I've never understood that, and I certainly am not trying to convince anyone of the relative worth of one OS over another. PowerShell.org - a community dedicated to a Microsoft product - runs on a CentOS virtual machine, which should tell you something about my total lack of loyalty when it comes to choosing the right tool for a job. If you're similarly "non-religious" about operating systems, I think DSC is worth taking a look at _just to take a look at it._ What's it do differently? How can you leverage that in your existing world? Are there any approaches that might be worth considering?  
Part of my frustration about the whole "Puppet vs DSC" meme is that it smacks of, "my toys are shinier than your toys," which is just... well, literally childish. And it worries me that people are missing some of the above, very important, points - mainly, that Microsoft is trying really damn hard to play nicely with the other kids in the sandbox for a change. _Encourage_ that attitude, because it benefits everyone.

## Once More...

And again, I don't think Microsoft is trying to convince you to use DSC, or any other MS product, here. I'm certainly not trying to do so. I think DSC presents an opportunity for folks who already have a declarative configuration management system, strictly in terms of saving you some work in custom module authoring. And I think for folks that _don't_ have a declarative configuration management solution, and who already have an investment in Microsoft's platform, DSC is going to be an exceptionally critical technology to master. That doesn't in any way diminish the accomplishment of the folks behind Puppet/Chef/etc. In fact, if nothing else, it further validates those products' goals. And I think it's massively interesting that Microsoft took an approach that is open to be used by those other products, rather than trying to make their own top-to-bottom stack. It's a shift in Microsoft's strategic thinking, if nothing else, and an explicit acknowledgement that the world is bigger than Redmond.  
Let's at least "cheers" for that shift in attitude.
