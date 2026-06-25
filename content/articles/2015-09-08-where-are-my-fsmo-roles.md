---
title: Where Are My FSMO Roles?
authors:
  - Thomas Rayner, MVP
date: "2015-09-08T14:00:21+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2015/09/where-are-my-fsmo-roles/
---

Hello, PowerShell people! I've never posted on PowerShell.org before and so I feel as though I owe you a quick introduction before we dive into the tip I'd like to share with you.

My name is Thomas Rayner and I am a Microsoft MVP for Windows PowerShell. I'm also a systems administrator and degree program instructor. I volunteer a fair bit of time as the President of the Edmonton Microsoft User Group (EMUG). EMUG has a more in depth bio for me on their [About Executive](http://emug.ca/executive/) page in case you want to know more about the person behind the avatar. If you're in the Edmonton area, I strongly recommend [signing up for our mailing list](http://emug.ca/contact-us/) so you can come attend the great events we put on.

I'm pretty active on Twitter at [@MrThomasRayner](http://twitter.com/MrThomasRayner) and I post bi-weekly on my own blog, [workingsysadmin.com](http://workingsysadmin.com).

**Ok, tip time!**

If you're an IT pro of any kind, it would be difficult to not bump into Active Directory from time to time. If you're a reader of PowerShell.org, you most likely administer Active Directory in some capacity. Inevitably, as an AD admin, you're going to find yourself asking "Which server is holding which FSMO role right now?" and "Isn't there a way to do this in PowerShell?". _If you're scratching your head right now wondering what a Flexible Single Master Operation (FSMO) role is, please check out this prerequisite reading: [https://support.microsoft.com/en-us/kb/197132](https://support.microsoft.com/en-us/kb/197132). _

Of course there's a way to do this in PowerShell! Let's work through a solution. Firstly, we need to import the Active Directory module. _[Stuck already?](http://blogs.msdn.com/b/rkramesh/archive/2012/01/17/how-to-add-active-directory-module-in-powershell-in-windows-7.aspx)_


`Import-Module ActiveDirectory
`That was easy. Now, let's get digging. There's a cmdlet called Get-ADDomainController which seems like a good place to start since we know our FSMO roles are going to be on Domain Controllers (DC). Let's take a look at what gets returned for each DC.


`Get-ADDomainController -Filter * | Select-Object -First 1 | Get-Member
   TypeName: Microsoft.ActiveDirectory.Management.ADDomainController
Name                       MemberType            Definition
----                       ----------            ----------
Contains                   Method                bool Contains(string propertyName)
Equals                     Method                bool Equals(System.Object obj)
GetEnumerator              Method                System.Collections.IDictionaryEnumerator GetEnumerator()
GetHashCode                Method                int GetHashCode()
GetType                    Method                type GetType()
ToString                   Method                string ToString()
Item                       ParameterizedProperty Microsoft.ActiveDirectory.Management.ADPropertyValueCollection Item(string propertyName) {get;}
ComputerObjectDN           Property              System.String ComputerObjectDN {get;}
DefaultPartition           Property              System.String DefaultPartition {get;}
Domain                     Property              System.String Domain {get;set;}
Enabled                    Property              System.Boolean Enabled {get;}
Forest                     Property              System.String Forest {get;set;}
HostName                   Property              System.String HostName {get;}
InvocationId               Property              System.Guid InvocationId {get;}
IPv4Address                Property              System.String IPv4Address {get;set;}
IPv6Address                Property              System.String IPv6Address {get;set;}
IsGlobalCatalog            Property              System.Boolean IsGlobalCatalog {get;}
IsReadOnly                 Property              System.Boolean IsReadOnly {get;}
LdapPort                   Property              System.Int32 LdapPort {get;}
Name                       Property              System.String Name {get;set;}
NTDSSettingsObjectDN       Property              System.String NTDSSettingsObjectDN {get;}
OperatingSystem            Property              System.String OperatingSystem {get;}
OperatingSystemHotfix      Property              System.String OperatingSystemHotfix {get;}
OperatingSystemServicePack Property              System.String OperatingSystemServicePack {get;}
OperatingSystemVersion     Property              System.String OperatingSystemVersion {get;}
OperationMasterRoles       Property              Microsoft.ActiveDirectory.Management.ADPropertyValueCollection OperationMasterRoles {get;}
Partitions                 Property              Microsoft.ActiveDirectory.Management.ADPropertyValueCollection Partitions {get;}
ServerObjectDN             Property              System.String ServerObjectDN {get;}
ServerObjectGuid           Property              System.Guid ServerObjectGuid {get;}
Site                       Property              System.String Site {get;set;}
SslPort                    Property              System.Int32 SslPort {get;}
`That's a lot of stuff. We can see if a DC is an RODC, which forest and domain it's in, the OS, its site... and its OperationMasterRoles! Looks like we're in business. The following code just about accomplishes our goal.


`Get-ADDomainController -Filter * |
Select-Object -Property Name, OperationMasterRoles
`The above script will get all the DCs in the environment and return the name of the DC and the FSMO roles held. That's great, but, what if you have dozens of DCs and looking at a big list of DCs isn't appealing? There must be a way to get _only _the DCs that actually have FSMO roles, right?


`Get-ADDomainController -Filter "OperationMasterRoles -like '*'" |
Select-Object -Property Name, OperationMasterRoles
`Of course there is! We don't even need to pipe our output into another cmdlet like Where-Object because we can simply adjust our filter on which DCs we return in the first place. "OperationMasterRoles -like '*'" translates to "Domain Controllers whose OperationMasterRoles field have a value in them" which doesn't include the DCs whose OperationMasterRoles field are null (because they're not holding any FSMO roles).

**That's it!**

Locating your Active Directory FSMO roles is just that easy.

Thank you, PowerShell.org for letting me post on your blog. I've got tremendous respect and admiration for the people who contribute to this website and the PowerShell community. PowerShell.org is an incredible resource for people of any experience level to improve their skills and learn new things. The world is a better place for having resources like this one.
