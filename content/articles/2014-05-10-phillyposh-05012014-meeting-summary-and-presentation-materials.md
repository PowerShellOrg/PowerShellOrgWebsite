---
title: PhillyPoSH 05/01/2014 meeting summary and presentation materials
authors:
  - John Mello
date: "2014-05-10T22:21:17+00:00"
aliases:
  - /2014/05/phillyposh-05012014-meeting-summary-and-presentation-materials/
---

* [Boe Prox][1] gave a presentation entitled “Managing WSUS with Windows PowerShell”. During his talked Boe went over the various ways you can orchestrate [WSUS][2] using PowerShell. A copy of his [presentation materials are available here][3].
  * We then had a group discussion around: 
      * [Lido Paglia][4] and [John Mello][5] discussed their experiences and what they learned at the [2014 PowerShell Summit][6],,
      * The differences between how Active Directory Users and Computers displays groups when compared to [Get-Aduser][7] in regards to primary group membership. In PowerShell the primary group is only returned in the _PrimaryGroup_ property and all other groups are returned in the _MemberOf_ property, while ADUC will show every group the user is a member of.

  * A [recording of this meeting][8] has been posted to our [YouTube channel][9]

 [1]: http://learn-powershell.net/author/boeprox/
 [2]: http://technet.microsoft.com/en-us/windowsserver/bb332157.aspx
 [3]: https://powershell.org/wp-content/uploads/2014/05/PhillyPosh-2014_05_01-BoeProx_WSUS.zip
 [4]: http://paglia.org/
 [5]: http://mellositmusings.com/
 [6]: https://powershell.org/community-events/summit/powershell-summit-north-america/
 [7]: http://technet.microsoft.com/en-us/library/ee617241.aspx
 [8]: http://youtu.be/k4geOLcrQec
 [9]: http://www.youtube.com/channel/UCAc_ow5FIJtRpvew__9Iqzg
