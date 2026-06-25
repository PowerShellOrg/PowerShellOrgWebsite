---
title: PowerWF and PowerSE 2.7 are now available
authors:
  - Kirk Munro
date: "2012-01-24T17:44:30+00:00"
aliases:
  - /2012/01/powerwf-and-powerse-2-7-are-now-available/
---

This morning [PowerWF][1] and [PowerSE][2] 2.7 were released to the web and they can now be downloaded from [http://www.powerwf.com][3].  These releases offer a lot of new value to PowerWF and PowerSE users, as follows:

#### PowerWF 2.7 Highlights

**New Start Page with New Workflows**

The start page in PowerWF has been completely redesigned to provide immediate value out of the box for PowerWF customers.  The new design highlights the Workflow Library that is included with PowerWF, allowing customers to play workflows in the library without opening a workflow or script document.  Users can also customize the workflows on the start page and add their own groups of workflows for easier runbook automation.  This immediate out of the box value is included for PowerWF customers to allow them to leverage the power of Workflows and PowerShell in their environments without requiring any knowledge of PowerShell or Workflows.

**New Management Packs for System Center Service Manager (SCSM)**

PowerWF for Service Manager has always included several useful management packs for SCSM in the product.  In this release, even more management packs for SCSM have been added.  Now, with a click of a button you can deploy management packs that automatically close resolved incidents, expire inactive problem announcements, cancel pending activities for closed change requests, identify problems from incident trends, notify incident authors about unresolved incidents, and get SCSM statistics.  These management packs are only available for licensed users of PowerWF for Service Manager.

**Improved Toolbox Search**

The search engine in the Activity toolbox just got better!  Now you can search using command names or keywords and PowerWF will return the best matches based on the terms you provided.  This includes searching with keywords that are only referenced in activity documentation and not in the command name itself.  For example, if you"™re a VMware administrator, simply entering "vMotion" into the search box will reveal the MoveVM activity that is necessary to perform vMotion tasks.

**Product-Specific Profile Support** 

PowerWF now uses its own product-specific profile support, and it updates the $profile variable to include the paths to each of the relevant profiles that you use. By default the PowerWF profile dot-sources the native PowerShell console profile, however you can change this behaviour as required by simply modifying the profile yourself in PowerSE.

#### PowerSE 2.7 Highlights

**Easier Breakpoint Management**

Breakpoint management in PowerSE just got a lot easier.  PowerSE now includes a Breakpoints pane to allow you to see all breakpoints you have set in your scripting environment, and you can now manage breakpoints using the breakpoint cmdlets and see the breakpoints you have created in the Breakpoints pane.  This gives you easy creation of line breakpoints using the Toggle Breakpoint feature or command and variable breakpoints using the Set-PSBreakpoint cmdlet (or sbp alias for short).

**Breakpoints Preserved Across Sessions**

Breakpoints are now automatically preserved across sessions, allowing you to continue debugging your scripts from one session to the next.  They are also preserved when you close a file, so you won"™t have to reset breakpoints each time you return to a script you were working on.  You can still remove breakpoints of course, using the Toggle Breakpoint feature or the Remove-PSBreakpoint cmdlet.

**Improved Help Search**

PowerShell help topic files are now included in the help search pane, allowing you to search for help for integral keywords like if or foreach, or for topics like "Advanced functions", or you can learn more about remoting by searching for "Remote".  Also, if no results are found when you search, PowerSE will now include a keyword search in command descriptions to allow for users to discover commands using related terms, such as "vMotion".

**Product-Specific Profile Support**

PowerSE now uses its own product-specific profile support, and it updates the $profile variable to include the paths to each of the relevant profiles that you use.  By default the PowerSE profile dot-sources the native PowerShell console profile, however you can change this behaviour as required by simply modifying the profile yourself in PowerSE.

#### And that"™s not all!

This shows you a few of the highlights of this release, but of course there were plenty of bug fixes, some performance improvements, and a few other minor enhancements that were included as well.  Whether you"™re a current PowerWF or PowerSE customer, or someone who is looking for great tools for working with PowerShell, Workflow, and Management Packs, I strongly encourage you to give this release a try and let us know what you think.

Kirk out.


  Technorati Tags: [PowerShell](http://technorati.com/tags/PowerShell),[PoSh](http://technorati.com/tags/PoSh),[Poshoholic](http://technorati.com/tags/Poshoholic),[PowerWF](http://technorati.com/tags/PowerWF),[PowerSE](http://technorati.com/tags/PowerSE),[SCSM](http://technorati.com/tags/SCSM),[management pack](http://technorati.com/tags/management+pack),[workflow](http://technorati.com/tags/workflow)


[![](http://feeds.wordpress.com/1.0/comments/kirkmunro.wordpress.com/747/)](http://feeds.wordpress.com/1.0/gocomments/kirkmunro.wordpress.com/747/)![](http://stats.wordpress.com/b.gif?host=poshoholic.com&blog=1436967&%23038;post=747&%23038;subd=kirkmunro&%23038;ref=&%23038;feed=1)

 [1]: http://powerwf.com/products/powerwf.aspx
 [2]: http://powerwf.com/products/powerse.aspx
 [3]: http://www.powerwf.com/
