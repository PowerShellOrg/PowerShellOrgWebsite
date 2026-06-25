---
title: "PowerShell.org's Azure Journey, Part 3: Load Testing [UPDATED]"
authors:
  - Don Jones
date: "2013-08-21T17:43:58+00:00"
aliases:
  - /2013/08/powershell-orgs-azure-journey-part-3-load-testing/
---

So, I've gotten a two-VM version of PowerShell.org running in Azure. Yay, me! My *nix skills are unaccountably rusty (go fig), but it didn't take too long. Restoring the WordPress installation was the toughest, as a number of settings had to be tweaked since the site is no longer under the same URL (the  test site that is).

## Baseline

I ran a load test against the existing production site yesterday; you can view the results at <http://loadimpact.com/load-test/powershell.org-1aa960e59c5972af12898b745de9ec49>. This simulated a 50-person concurrent load from three US locations and on UK location, which approximates our real-world traffic. The results are what they are; we're looking for the delta between these and the Azure-based system. In this test, the green line is the number of concurrent connections, and the blue is the time it took each page to load. The test ran for 10 minutes total, with each simulated user hitting three different pages on the site (home page, a forums topic, and a blog post).  
A key fact is that the site currently runs under a shared hosting plan; I don't have any details on how much RAM, how much CPU, or what kind of bandwidth exists for the site. It's also important to note that the production Web site uses a Content Delivery Network, or CDN, which offloads a good amount of traffic from the site proper. Because that costs, we didn't implement a CDN for the test site. I'd therefore expect it to be somewhat slower.

## Azure 1: XS+XS

The first Azure test is at <http://loadimpact.com/load-test/powershellorg.cloudapp.net-715a0a249934417d3d3b51dd6109ca86>. This uses an extra-small instance for both the Web server and the database server (separate VMs; that reflects the fact that the current site runs the DB on a separate shared server). As you can see, the results weren't promising. By around 40 users, page load times exceeded 3 minutes, at which point they started timing out. So the test clearly overwhelmed the instance. That wasn't unexpected; an XS instance runs on a shared core with 768MB of RAM. That ain't much. I think it's also powered by a 9-volt battery. But I wanted a baseline; XS instances are super-cheap.  
(As an aside, scaling out the Web tier of PowerShell.org isn't trivial, due mainly to the presence of user uploads. We'd need to make some tweaks to have all uploads sent to, and downloaded from, a single server; if we just scale-out by load-balancing in a second Web server, user-uploaded content won't work correctly. Also, doubling the instance size - e.g., from XS to S - costs the same as adding a second XS instance. Scale-out isn't off the table, but since it's more complicated to set up, I'm not testing it right now.)

## Azure 2: S+XS

The third test moved the Web server to a Small instance, which offers a dedicated core and 1.75GB of RAM. The DB server remained at an XS instance size. It was super-cool that you can upsize the instances whenever you want. You pay by the minute based on instance size, and the Azure Price Calculator rolls that up into a monthly estimate based on 24x7 usage. One thing I've learned is that when the Azure Web console says it's done with something, like starting a VM, you really still need to wait a few minutes before all the bits and bobs are in place to make the Web site work. Another PITA is that, when you shut down a VM, you lose both your public IP (no problem, since they handle DNS for you) and private IP (a bit of a pain since there's no DNS for it, so I had to re-point the Web server at the database server's new private IP).  
(As another aside, Azure also offers the option of just moving the Web site and the database into the cloud, using PaaS rather than IaaS. We get to select the kind of instance our site runs on, but it's potentially shared with other sites. MySQL gets outsourced to ClearDB. There's some more complexity in that model from the perspective of getting the site working, and having our own VMs gives us some additional performance-improving abilities, like in-memory opcode caching. Either model costs about the same, so we're playing with the VM model at present.)  
Anyway, the third test results are at <http://loadimpact.com/load-test/powershellorg.cloudapp.net-ee5ffaba02b4adcd7a7e1d70f6525176>. I'll mention that the S instance size allows a lot more room for opcode caching, which can help tremendously, as well as having more RAM and CPU for handling the concurrent requests. Because the simulated users are all asking for the same pages, the caching should go a long way toward helping. For this test, response times held pretty well under 20s for the majority of the test, excluding some spikes (likely due to cached items expiring and being re-generated). Things started to get dicey at 40 concurrent users, but still held about the same average performance that the current production site offers. Using the test site interactively while this load test was underway was slow, but not utterly painful.  
(Real-world note: We disable a number of caching mechanisms for logged-in site users, because we don't want to serve a cached page form a logged-in user to an anonymous user. So logged-in users will get somewhat different results. For the purposes of this test, we're comparing apples to apples with anonymous simulated users.)

## Azure 3: S+S

Now the database server has also been upgraded to a small instance, featuring a dedicated CPU core and 1.75GB of RAM. Having to update the database server's private IP address each time it restarts is a PITA. I need to find out if there's any way to use a DNS name for that instead - something Azure updates for me when it reassigns the IP. I don't want to use the public IP/DNS, because I'd pay for bandwidth - with the internal IP, the traffic stays inside the Azure datacenter, so I don't pay for it.  
Anyway, this test result is at <http://loadimpact.com/load-test/powershellorg.cloudapp.net-8b824df0db0a9ea67c2329150068200b>. Can I tell you how much I love LoadImpact for doing these tests? Set up the test once, run it over and over against different configurations. Awesome.  
As you're comparing the charts, pay close attention to the scale on the sides. They're not necessarily the same - you actually have to look at the numbers, not just the height of the blue line.  This time, although the blue line climbed high, it was actually under 1m for the entire test. That's a marked improvement over the XS+XS test! In addition, a S+S configuration is pretty affordable. It's about $180/mo in VMs, plus about $35 for storage and estimated bandwidth. That's less than two dedicated rackmount servers would cost, for sure.

## Conclusion

I need to do a bit of analysis - LoadImpact lets me download CSVs, which will let me make some direct-comparison charts - but Azure's looking like a good option for us, especially in the S+S option. I may also run a Medium+Small test (I have one credit left with LoadImpact for the month, so why not) just to see the difference. **UPDATE: **I did. The M+S test is at <http://loadimpact.com/load-test/powershellorg.cloudapp.net-89328e1adfb4afa6af8b7c409dfa687f>.
