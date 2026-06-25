---
title: Creating a new disk
authors:
  - Richard Siddaway
date: "2013-04-12T18:44:16+00:00"
aliases:
  - /2013/04/creating-a-new-disk-3/
---

I really like Windows Server Core. The concept has come of age in Windows 2012.

I needed to add a new disk to a virtual machine  – that"™s easy using the Hyper-V cmdlets. But what about formating the disk.

A module new to Windows 2012 & Windows can be used.  Its the Storage module.  I"™ve not had chance, or reason, to play with this module yet. So many cmdlets so little time.

Start with viewing the disks:

PS C:\Users\richard> Get-Disk | ft -a

Number Friendly Name          OperationalStatus Total Size Partition Style 
—— ————-          —————– ———- ————— 
0      Virtual HD ATA Device  Online                120 GB MBR 
1      Microsoft Virtual Disk Offline               127 GB RAW



Disk 1 is the new disk so need to initialise it.

PS C:\Users\richard> Initialize-Disk -Number 1 -PartitionStyle MBR 

View the disks again

PS C:\Users\richard> Get-Disk | ft -a

Number Friendly Name          OperationalStatus Total Size Partition Style 
—— ————-          —————– ———- ————— 
0      Virtual HD ATA Device  Online                120 GB MBR 
1      Microsoft Virtual Disk Online                127 GB MBR



Create a partition on the disk -   -useMaximimSize means use all of the disk for this partition

PS C:\Users\richard> New-Partition -DiskNumber 1 -UseMaximumSize -DriveLetter R

Now view the partitions

PS C:\Users\richard> Get-Partition | ft -a

   Disk Number: 0

PartitionNumber DriveLetter Offset         Size Type 
————— ———– ——         —- —- 
1                           1048576      350 MB IFS 
2               C           368050176 119.66 GB IFS

   Disk Number: 1

PartitionNumber DriveLetter Offset    Size Type 
————— ———– ——    —- —- 
1               R           1048576 127 GB Logical

And finally format the new disk:

PS C:\Users\richard> Get-Volume | where DriveLetter -eq R | Format-Volume -FileSystem NTFS -NewFileSystemLabel Backup

Confirm  
Are you sure you want to perform this action?  
Warning, all data on the volume will be lost!  
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): Y

You get a nice friendly warning (you could bypass using "“Confirm $false) and the format happens

You could pipe the cmdlets together to do everything in one pass. Best of all "“ the cmdlets are WMI based.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2830/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2830/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2830&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
