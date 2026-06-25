---
title: "Network Adapters\"“Disable/Enable"
authors:
  - Richard Siddaway
date: "2013-03-11T20:09:06+00:00"
aliases:
  - /2013/03/network-adapters-disableenable/
---

Last time we saw the Get-NetAdapter cmdlet from the NetAdapter module

PS> Get-NetAdapter | ft Name, InterfaceDescription, Status -a

Name     InterfaceDescription                           Status 
—-     ——————–                           —— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Up 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter Up

If you look in the module you also find Disable-NetAdapter & Enable-NetAdapter

PS> Disable-NetAdapter -Name Wifi -Confirm:$false  
PS> Get-NetAdapter | ft Name, InterfaceDescription, Status -a

Name     InterfaceDescription                           Status 
—-     ——————–                           —— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Up 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter Disabled

PS> Enable-NetAdapter -Name Wifi -Confirm:$false  
PS> Get-NetAdapter | ft Name, InterfaceDescription, Status -a

Name     InterfaceDescription                           Status 
—-     ——————–                           —— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Up 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter Up

You can also enable/disable based on an Input Object, the alias (-ifalias) or the description (-InterfaceDescription)

PS> Get-NetAdapter -Name Wifi | Disable-NetAdapter -Confirm:$false  
PS> Get-NetAdapter | ft Name, InterfaceDescription, Status -a

Name     InterfaceDescription                           Status 
—-     ——————–                           —— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Up 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter Disabled

PS> Get-NetAdapter -Name Wifi | Enable-NetAdapter -Confirm:$false  
PS> Get-NetAdapter | ft Name, InterfaceDescription, Status -a

Name     InterfaceDescription                           Status 
—-     ——————–                           —— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Up 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter Up

What"™s the alias?

PS> Get-NetAdapter | ft Name, InterfaceDescription, ifAlias, InterfaceAlias -a

Name     InterfaceDescription                           ifAlias  InterfaceAlias 
—-     ——————–                           ——-  ————– 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet        Ethernet Ethernet 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter WiFi     WiFi

If you want to use these cmdlets against remote machines you can run them through a CIMsession

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2816/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2816/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2816&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
