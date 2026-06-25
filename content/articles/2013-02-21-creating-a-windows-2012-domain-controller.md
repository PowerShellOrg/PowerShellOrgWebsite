---
title: Creating a Windows 2012 Domain Controller
authors:
  - Richard Siddaway
date: "2013-02-21T19:50:09+00:00"
aliases:
  - /2013/02/creating-a-windows-2012-domain-controller/
---

I decided to replace one of the DCs in my test environment with a Windows 2012 Server Core machine. Server Core has really come of age in Windows 2012 "“ its easy to configure.

I"™ve covered configuring a server before but to recap:

  * Rename the machine "“ use Rename-Computer
  * Set Network "“ use Set-NetIPInterface (address) & et-DnsClientServerAddress( dns address) & Rename-netAdapter
  * Join to domain "“ use Add-Computer

To create the domain controller use the ADDSDeployment module. You"™ll only find this on servers where you"™ve installed the AD Domain Services feature which you do like this:

Install-WindowsFeature -Name AD-Domain-Services -Confirm:$false



Import the module

Import-Module ADDSDeployment  
Get-Command -Module ADDSDeployment

Create the Domain Controller. This is the equivalent of running DCPROMO in earlier versions. Even better you don"™t need the answer file. Everything is a parameter on the cmdlet.

Install-ADDSDomain Controller -DomainName "manticore.org" -InstallDns -Credential (Get-Credential manticore\richard) -ApplicationPartitionsToReplicate *

Thats it!  Just wait for replication to happen.

You can also demote a domain controller

$cred = Get-Credential  
Uninstall-ADDSDomainController -Credential $cred -RemoveApplicationPartitions -Confirm:$false

Restart the machine and uninstall AD & DNS

Uninstall-WindowsFeature -Name AD-Domain-Services, DNS -Confirm:$false  
Restart-Computer -ComputerName dc02 

Leave the domain

$cred = Get-Credential manticore\richard  
Remove-Computer -UnjoinDomainCredential $cred -Workgroup Test

Trash the VM.

And best of all it works over remoting.  You will need to recreate the session for restarts & changes but it is really easy.

Server Core is now a much friendlier option.

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2807/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2807/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2807&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
