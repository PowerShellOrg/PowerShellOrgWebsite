---
title: Starting virtual machines for WSUS
authors:
  - Richard Siddaway
date: "2013-01-17T19:50:54+00:00"
aliases:
  - /2013/01/starting-virtual-machines-for-wsus/
---

My test environment usually has a dozen or so machines at any one time. Some of these are short lived and used for a particular piece of testing "“ others are kept for  years. I decided that I wanted to keep up to date on the patching of these virtual machines so installed WSUS on a Windows 2012 box.

One issue is that if a VM isn"™t started for 10 days WSUS starts complaining that it hasn"™t been contacted and if you run the WSUS clean up wizard the non-reporting servers may be removed. Checking the WSUS console for which machines haven"™t sync"™d recently is a chore.

In Windows 2012 both WSUS and Hyper-V come with a PowerShell module. This means I can do this:


`$date

=

(

Get-Date

)

.

AddDays

(

-10

)


Get-WsusComputer

-ToLastSyncTime

$date

|


sort

LastSyncTime

|


select

-First

4

|


foreach

{


$computer

=

(

$_

.

FullDomainName

-split

"\."

)

[


]


Start-VM

-Name

$computer

-ComputerName

Server02

-Passthru


}

`I"™m using the WSUS server as my admin box but if you were accessing a remote WSUS machine change the code to 

Get-WsusServer -Name w12sus -PortNumber 8530 | Get-WsusComputer "“ToLastSyncTime $date |

I sorted the computers WSUS knows about by date "“ picked the last 4 to sync so I didn"™t overwhelm the Hyper-V host and started them up. Only trick is to get the computer name out of the FullDomainName property.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2797/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2797/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2797&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
