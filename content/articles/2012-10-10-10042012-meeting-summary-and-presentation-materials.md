---
title: PhillyPoSH 10/04/2012 meeting summary and presentation materials
authors:
  - John Mello
date: "2012-10-10T13:08:07+00:00"
aliases:
  - /2012/10/10042012-meeting-summary-and-presentation-materials/
---

Our inaugural meeting was as follows:

  1. 10 minute demo from [MVP Systems][1] about how [JAMS Scheduler works with PowerShell][2]
  2. Presentation on what Remoting is and how it works 
      1. See the [zip file][3] in the post for the PowerPoint with speaking notes
  3. Pizza break!
  4. Live remoting demo 
      1. See the zip file in the post for a text file of the PowerShell demo

On the topic of deploying a GPO to set your script execution policy, [Bhargav Shukla][4] from the [Philadelphia Exchange User Group][5] brought to our attention [KB2467565][6] which address the following issue:   "You cannot install an update rollup for Exchange Server 2010 with a deployed GPO that defines a PowerShell execution policy for the server to be updated". So if you do set the script execution policy through group policy don"™t apply it to your Exchange 2010 servers!  
Meeting materials zip file: [PhillyPosh_2012-1004][3]

 [1]: http://www.jamsscheduler.com/
 [2]: http://www.jamsscheduler.com/PowerShell.aspx
 [3]: https://powershell.org/wp-content/uploads/2012/10/PhillyPosh_2012-1004.zip
 [4]: http://www.bhargavs.com/
 [5]: http://www.ehlougphila.com/
 [6]: http://support.microsoft.com/kb/2467565
