---
title: Network adapters
authors:
  - Richard Siddaway
date: "2013-03-04T20:24:52+00:00"
aliases:
  - /2013/03/network-adapters/
---

The WMI classes Win32_NetworkAdapter and Win32_NetworkAdapterConfiguration have seen a lot of use over the years. They can be a bit fiddly to use which is why the NetAdapter module in Windows 8/2012 is a so welcome.

Lets start by looking at basic information gathering

PS> Get-NetAdapter | ft -a

Name     InterfaceDescription                        ifIndex Status MacAddress        LinkSpeed 
—-     ——————–                        ——- —— ———-        ——— 
Ethernet NVIDIA nForce 10/100/1000 Mbps Ethernet          13 Up     00-1F-16-63-F5-DF  100 Mbps 
WiFi     Qualcomm Atheros AR5007 802.11b/g WiFi Adapter   12 Up     00-24-2B-2F-9C-A5   54 Mbps

We get the Name & description, status, MAC address and link speed as the default display. Contrast with Win32_NetworkAdapter for the same two interfaces

ServiceName      : athr 
MACAddress       : 00:24:2B:2F:9C:A5 
AdapterType      : Ethernet 802.3 
DeviceID         : 10 
Name             : Qualcomm Atheros AR5007 802.11b/g WiFi Adapter 
NetworkAddresses : 
Speed            : 54000000

ServiceName      : NVNET 
MACAddress       : 00:1F:16:63:F5:DF 
AdapterType      : Ethernet 802.3 
DeviceID         : 11 
Name             : NVIDIA nForce 10/100/1000 Mbps Ethernet 
NetworkAddresses : 
Speed            : 100000000

Notice the ifIndex from Get-NetAdapter & DeviceId from Win32_NetworkAdapter.  Two different numbers to identify the device.

What else can Get-NetAdapter tell us:

PS> Get-NetAdapter  -Name Ethernet | fl *

ifAlias                                          : Ethernet 
InterfaceAlias                                   : Ethernet 
ifIndex                                          : 13 
ifDesc                                           : NVIDIA nForce 10/100/1000 Mbps Ethernet 
ifName                                           : Ethernet_7 
DriverVersion                                    : 73.3.0.0 
LinkLayerAddress                                 : 00-1F-16-63-F5-DF 
MacAddress                                       : 00-1F-16-63-F5-DF 
Status                                           : Up 
**LinkSpeed                                        : 100 Mbps 
MediaType                                        : 802.3 
PhysicalMediaType                                : 802.3 
AdminStatus                                      : Up 
MediaConnectionState                             : Connected 
**DriverInformation                                : Driver Date 2010-03-04 Version 73.3.0.0 NDIS 6.20 
DriverFileName                                   : nvmf6232.sys 
NdisVersion                                      : 6.20 
ifOperStatus                                     : Up 
Caption                                          : 
Description                                      : 
ElementName                                      : 
InstanceID                                       : {188C370D-AD90-46F3-8AD2-0C10AFB6490C} 
CommunicationStatus                              : 
DetailedStatus                                   : 
HealthState                                      : 
InstallDate                                      : 
Name                                             : Ethernet 
OperatingStatus                                  : 
OperationalStatus                                : 
PrimaryStatus                                    : 
StatusDescriptions                               : 
AvailableRequestedStates                         : 
EnabledDefault                                   : 2 
EnabledState             
                         : 5 
OtherEnabledState                                : 
RequestedState                                   : 12 
TimeOfLastStateChange                            : 
TransitioningToState                             : 12 
AdditionalAvailability                           : 
Availability                                     : 
CreationClassName                                : MSFT_NetAdapter 
DeviceID                                         : {188C370D-AD90-46F3-8AD2-0C10AFB6490C} 
ErrorCleared                                     : 
ErrorDescription                                 : 
IdentifyingDescriptions                          : 
LastErrorCode                                    : 
MaxQuiesceTime                                   : 
OtherIdentifyingInfo                             : 
PowerManagementCapabilities                      : 
PowerManagementSupported                         : 
PowerOnHours                                     : 
StatusInfo                                       : 
SystemCreationClassName                          : CIM_NetworkPort 
SystemName                                       : RSLAPTOP01 
TotalPowerOnHours                                : 
MaxSpeed                                         : 
OtherPortType                                    : 
PortType                                         : 
RequestedSpeed                                   : 
Speed                                            : 100000000 
UsageRestriction                                 : 
ActiveMaximumTransmissionUnit                    : 1500 
AutoSense                                        : 
FullDuplex                                       : True 
LinkTechnology                                   : 
NetworkAddresses                                 : {001F1663F5DF} 
OtherLinkTechnology                              : 
OtherNetworkPortType                             : 
PermanentAddress                                 : 001F1663F5DF 
PortNumber                                       : 0 
Support
 edMaximumTransmissionUnit                 : 
AdminLocked                                      : False 
ComponentID                                      : pci\ven_10de&dev_0760 
ConnectorPresent                                 : True 
DeviceName                                       : \Device\{188C370D-AD90-46F3-8AD2-0C10AFB6490C} 
DeviceWakeUpEnable                               : False 
DriverDate                                       : 2010-03-04 
DriverDateData                                   : 129121344000000000 
DriverDescription                                : NVIDIA nForce 10/100/1000 Mbps Ethernet 
DriverMajorNdisVersion                           : 6 
DriverMinorNdisVersion                           : 20 
DriverName                                       : \SystemRoot\system32\DRIVERS\nvmf6232.sys 
DriverProvider                                   : NVIDIA 
DriverVersionString                              : 73.3.0.0 
EndPointInterface                                : False 
**HardwareInterface                                : True 
**Hidden                                           : False 
HigherLayerInterfaceIndices                      : {26} 
IMFilter                                         : False 
InterfaceAdminStatus                             : 1 
InterfaceDescription                             : NVIDIA nForce 10/100/1000 Mbps Ethernet 
InterfaceGuid                                    : {188C370D-AD90-46F3-8AD2-0C10AFB6490C} 
InterfaceIndex                                   : 13 
InterfaceName                                    : Ethernet_7 
InterfaceOperationalStatus                       : 1 
InterfaceType                                    : 6 
iSCSIInterface                                   : False 
LowerLayerInterfaceIndices                       : 
MajorDriverVersion                               : 73 
MediaConnectState                                : 1 
MediaDuplexState                                 : 2 
MinorDriverVersion                               : 30 
**MtuSize                                          : 1500 
**NdisMedium                                       : 0 
NdisPhysicalMedium                               : 14 
NetLuid                                  &n
 bsp;       : 1688849977704448 
NetLuidIndex                                     : 7 
NotUserRemovable                                 : False 
OperationalStatusDownDefaultPortNotAuthenticated : False 
OperationalStatusDownInterfacePaused             : False 
OperationalStatusDownLowPowerState               : False 
OperationalStatusDownMediaDisconnected           : False 
PnPDeviceID                                      : PCI\VEN_10DE&DEV_0760&SUBSYS_360A103C&REV_A2\3&2411E6FE&0&50 
**PromiscuousMode                                  : False 
**ReceiveLinkSpeed                                 : 100000000 
State                                            : 2 
TransmitLinkSpeed                                : 100000000 
Virtual                                          : False 
VlanID                                           : 
WdmInterface                                     : False 
PSComputerName                                   : 
**CimClass                                         : ROOT/StandardCimv2:MSFT_NetAdapter 
**CimInstanceProperties                            : {Caption, Description, ElementName, InstanceID...} 
CimSystemProperties                              : Microsoft.Management.Infrastructure.CimSystemProperties

Notice the CimClass property ROOT/StandardCimv2:MSFT_NetAdapter   – this is one of the new WMI classes introduced in Windows 8.  Does this class have any methods?

Get-CimClass -Namespace ROOT/StandardCimv2 -ClassName MSFT_NetAdapter | select -ExpandProperty CimClassMethods

Name  
—-  
RequestStateChange  
SetPowerState  
Reset  
EnableDevice  
OnlineDevice  
QuiesceDevice  
SaveProperties  
RestoreProperties  
Enable  
Disable  
Restart  
Lock  
Unlock  
Rename

These will be investigated in other posts "“ maybe we get cmdlets to work with these as well

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2815/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2815/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2815&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
