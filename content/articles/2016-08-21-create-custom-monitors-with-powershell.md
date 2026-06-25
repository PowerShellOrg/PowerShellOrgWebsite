---
title: Create Custom Monitors with PowerShell
authors:
  - msorens
date: "2016-08-21T23:44:53+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
aliases:
  - /2016/08/create-custom-monitors-with-powershell/
---

Sometimes, as a developer, you want to be be able to keep track of free space on a drive, the size of a log, the load on your CPU, the number of users logged in, etc. With PowerShell, it is typically just a matter of finding the right cmdlet amidst the large (and rapidly growing) pool of cmdlets provided by Microsoft and by third parties. Then you just run _Get-Foo_ to check details about the _foo_ resource. And then you come back 5 minutes later and run it again because you want to see how it changes over time.  
But wouldn't it be nice if you could just have it run automatically at regular intervals in a separate window that you could just keep in the corner of your screen? Well, I found the barebones of just such a utility sometime ago (authored by Marc van Orsouw,  aka ‘thePowerShellGuy’). His original post is no longer available, but I expanded upon his code and, over time, added features, bug fixes, and enhancements, making it more useful and more user-friendly. Here are a few screenshots of the Monitor Factory in action.  
_Monitor the size of a database_


`Start-Monitor -AsJob {`Invoke-Sqlcmd 'DBCC SQLPERF(logspace)' |`Select-Object 'Database Name','Log Size (MB)','Log Space Used (%)',HasErrors`}
`![Database Size Monitor](https://powershell.org/wp-content/uploads/2016/08/monitor-db-size-1.jpg)  
_Monitor drives on a system_  
![Drive Capacity Monitor](https://powershell.org/wp-content/uploads/2016/08/monitor-file-size-1.jpg)  
_Monitor longest running DB queries_  
![Long-runnning DB Query Monitor](https://powershell.org/wp-content/uploads/2016/08/monitor-queries-1.jpg)  
[Build Your Own Resource Monitor in a Jiffy][1] reveals how quick and easy it is to get started with the Monitor Factory.

 [1]: https://www.simple-talk.com/sysadmin/powershell/build-your-own-resource-monitor-in-a-jiffy/
