---
title: "SAPIEN's new WMI Explorer Released"
authors:
  - Don Jones
date: "2014-04-21T22:59:41+00:00"
categories:
  - Tools
aliases:
  - /2014/04/sapiens-new-wmi-explorer-released/
---

We all know that working with WMI/CIM can be frustrating. So little of it is documented, and it can be tough to find the class that has the exact info you need.  
A long time ago, SAPIEN released a very nice WMI Explorer tool that, recently, was taken offline. The reason is that the company was producing an all-new, from-scratch replacement - [and it's now available][1].  
Their new approach is pretty interesting. Rather than just live-browsing the local WMI repository or a remote computer's repository, the tool can now go through the repo and actually create a local cache. That cache is optimized for searching, making it a ton easier to search not only for class names, but also for property names and more. Even property values! So if you know (for example) that "Windows 8.1" is part of _some_ property of _some_ class, this tool can help you find where it is. It also provides in-product links to what online WMI documentation exists, making it quicker to get to that stuff.  
Although the old tool was a freebie, this new one will set you back $40, and I imagine it's included with the $789 kitchen-sink bundle the company sells. While I miss the free tool, this new one is significant enough that I'd pay for it. After all, money is what keeps the programmers at SAPIEN employed, so we can't expect great tools for zero money. Frankly, this new WMI Explorer is one of the very, very, very, very few tools that's going to earn a place in my base VM images that I use in classes - simply because it's so useful. The ability to search for _property values_ gives me a whole new approach to finding the exact WMI class I need.  
It's a well thought-out tool. Now, it's not "zero footprint" like the old one - but the old one didn't do nearly as much, like creating a local, searchable cache of the repo. Also, this isn't something I'd install on all my servers. There's no need - you install it on _your_ computer, and let it reach out to key servers to discover their repositories. So it's "zero footprint" on the server, which is all I care about. That cache means I can even browse a remote machine's repo when I'm completely offline, like on an airplane working on a book. That's a huge deal for me.  
SAPIEN's blog article on the software release includes another interesting fact: They plan to release a new line of smaller tools like WMI Explorer, and either sell them separately or as a community package. Cool! But what's even cooler is this: _"The proceeds from these tools will go towards supporting user groups and non-profit organizations." _Well, damn. So that $40 isn't even funding the development of the tool per se, it's funding (in part) your local user group. That's awesome, and makes it well worth the standalone purchase if you don't own the whole Software Suite already.  
As usual, SAPIEN offers a free trial. Give it a whirl.

 [1]: http://www.sapien.com/blog/2014/04/17/wmi-explorer-2014-released/
