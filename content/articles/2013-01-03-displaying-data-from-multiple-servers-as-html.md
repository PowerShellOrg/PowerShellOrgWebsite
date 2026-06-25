---
title: Displaying data from multiple servers as HTML
authors:
  - Richard Siddaway
date: "2013-01-03T19:12:53+00:00"
aliases:
  - /2013/01/displaying-data-from-multiple-servers-as-html/
---

A forum question regarding retrieving WMI based data from multiple servers and displaying it as HTML was interesting.  I would approach it like this


`$servers

=

Get-Content

-Path

C:\scripts\servers.txt


$data

=

@(

)


foreach

(

$server

in

$servers

)

{


$compdata

=

New-Object

-TypeName

PSObject

-Property

@{


Computer

=

$server


Contactable

=

$false


LastBootTime

=

""


AllowTSConnections

=

$false


}


if

(

Test-Connection

-ComputerName

$server

-Quiet

-Count

1

)

{


$compdata

.

Contactable

=

$true


$os

=

Get-WmiObject

-Class

Win32_OperatingSystem

-ComputerName

$server


$compdata

.

LastBootTime

=

$os

.

ConvertToDateTime

(

$os

.

LastBootUpTime

)


$ts

=

Get-WmiObject

-Namespace

root\cimv2\terminalservices

-Class

Win32_TerminalServiceSetting

-ComputerName

$server

-Authentication

PacketPrivacy


if

(

$ts

.

AllowTSConnections

-eq

1

)

{


$compdata

.

AllowTSConnections

=

$true


}


}


$data

+=

$compdata


}


$data


$data

|

ConvertTo-Html

|

Out-File

-FilePath

c:\scripts\report.html


Invoke-Item

-Path

c:\scripts\report.html

`Put the list of servers in a text file & read it in via get-content.

use foreach to iterate over the list of servers.

For each server create an object and then test if you can ping the server. Note that the default setting for Contactable is $false so don"™t need to deal with that case.

Get the WMI data and set the properties on the object.

Add the object to an array

After you"™ve hit all the servers use ConvertTo-Html and write to a file with out-file.

use Invoke-Item to view the report

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2780/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2780/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2780&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
