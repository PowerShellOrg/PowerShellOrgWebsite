---
title: A Better Way To Search Events
authors:
  - tobor79
date: "2019-08-30T17:09:21+00:00"
categories:
  - PowerShell for Admins
legacy_featured_image: /wp-content/uploads/2019/08/LegionImageShadowling.png
aliases:
  - /2019/08/a-better-way-to-search-events/
---

I have put together a security script to use as an alerting system. Using a CSV file containing information on which users are assigned which computer, the event logs are searched to discover when a user signs into a device outside their normal assignments. The final result of that script can be viewed [HERE](https://github.com/tobor88/BTPS-SecPack/blob/master/Event%20Alerts/UnusualUserSignInAlert.ps1) if interested. I will do my best to provide unique real world search queries for my examples.



In order to accomplish this task, I originally believed I was going to need to search the event logs based on user and computer. Although this turned out to not be the case I figured it was a pretty useful thing to figure out how to do. That is the task that led me here.


The best way to search events is using the [Get-WinEvent](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent?view=powershell-6) cmdlet. This method is far superior to [Get-EventLog](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-eventlog?view=powershell-5.1) in both speed and filtering ability. The documentation for the Filter Hash related parameters are a little lacking.

When searching events you will want to keep in mind that each event source is handled as a document containing a sequence of events. Windows Event Log uses query expressions based on a subset of XPath 1.0 for selecting events from their sources. When you specify a query, you are also specifying an event channel for the context of the query. When you select an event with an event query, the entire event is selected, not a portion of the event information.  

**FILTERHASHTABLE**



The FilterHashTable parameter is probably the most straight forward to use. I have taken the below example from Microsoft's TechNet site as this Paramter is the most straight foward and easy to use. The format is easy to understand as we are searching for an array of properties. To accurately describe these properties, it is easiest to view the events in Event Viewer.



`$StartTime = (Get-Date).AddDays(-7)
Get-WinEvent -FilterHashtable@{ Logname='Application'; ProviderName='Application Error'; Data='iexplore.exe'; StartTime=$StartTime }
`If you have experience with the [New-Object](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/New-Object?view=powershell-6) cmdlet you have most likely added properties to the newly created object in this same fashion. Looking at the list of available property queries below, we are not able to search by computer name. I checked to see what other options were available. Data below is showing as an array. I have known this option to allow the entering of an SID or a username to query the event log. I have not been able to successfully add multiple properties into that value.



  * **LogName**=
  * **ProviderName**=
  * **Path**=
  * **Keywords**=
  * **ID**=
  * **Level**=
  * **StartTime**=
  * **EndTime**=
  * **UserID**=
  * **Data**=
  * `=`* **SuppressHashFilter**=`Below is a FilterHashTable query that searches the Sysmon events for all Network connections that happened over the last 1.2 hours.


`Get-WinEvent -MaxEvents 1 -FilterHashtable @{LogName="Microsoft-Windows-Sysmon/Operational"; Id=3; StartTime=(Get-Date).AddHours(-1.2)}
`**FILTERXPATH**


The next parameter defined is the FilterXPath parameter. This ended up being the one I used because it required less typing than FilterXML. More on this towards the end of the juicy stuff we are about to get into. To ensure the correct information is being used open the Event Viewer, (eventvwr.msc) and go to the XML view of the event you wish to query. In my case it was Security Event ID 4624.Below is a sample of the xml format for this event.



`4624
1
0
12544
0
0x8020000000000000

53282


Security
DC1


S-1-5-0 ####
david.haller
LEGION
0x3e7
S-1-5-21-1005
david.haller
LEGION
0x33648
2
I_Am_God
Negotiate
Why-Is-It-Blue
{00000000-0000-0000-0000-000000000000}
-
-
0 0x210
C:\Windows\System32\winlogon.exe
10.0.0.8 0
%%1833


`===============================================================


Microsoft has given us this syntax:`Get-WinEvent -FilterXPath "*[System[Level=3 and TimeCreated[timediff(@SystemTime) <= 86400000]]]"`  

This starts with a wildcard character which I have to apologize I do not remember the significance of. Each XML section is enclosed inside a set of [ ]. Starting small, If we wanted to query the '**System**' section and the '**EventData**' section it would look like the this.


`$XPath = '*[System[] and EventData[]]'
`To define the properties we wish to search for we need to add those properties inside the set of brackets for **System** and or **EventData**. I am going to add on to what we have defined so far. The event id is an integer. Because it is an integer we do not want to add single quotes around the value.



`$XPath = '*[System[EventID=4624] and EventData[]]'
`Adding to the "**EventData**" gets a little more tricky. In the XML format above you can see that a property has been defined for the XML tags and each tag is called Data. Following the format at this TechNet reference: [https://docs.microsoft.com/en-us/previous-versions//aa385231(v=vs.85)](https://docs.microsoft.com/en-us/previous-versions//aa385231(v=vs.85)), we are able to view how to define this type of property. I placed a variable in the value field to demonstrate the need for single quotes as this is a string and single quotes are expected in order for the query to work.


`$SamAccountName = 'Amahl.Farouk';
Get-WinEvent -FilterXPath "*[System[EventID=4624] and EventData[Data[@Name='TargetUserName']='$SamAccountName']"']]
`To add a second field to query the System section is fairly straight forward. To accomplish this we need to follow the last value with 'and' and add the new property as can be seen from the original Microsoft TechNet example. For those of you are unfamliar there are 86400000 seconds in 24 hours. So the time created value below gets the current system time and queries events that are less than or equal to a day old.



`$XPath = "*[System[EventID=4624 and TimeCreated[timediff(@SystemTime) <= 86400000
]] and EventData[Data[@Name='TargetUserName']='$SamAccountName']"
`Now We are searching for Event ID 4624, over the last 24 hours containing a specific username. Time to add the IP Address property. In the event log this value has an IP address and the computer's name was not able to be found. I have a list of computer names so I will need to convert those names to IP addresses for my query to be successful. This meant for my script, that a [Resolve-DnsName](https://docs.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname?view=win10-ps) cmdlet had to be used to get the required value. There are numbers in this value but it is still not an integer so we are going to need single quotes around the value again.



`$XPath = "*[System[EventID=4624 and TimeCreated[timediff(@SystemTime) <= 86400000]] and EventData[Data[@Name='TargetUserName']='$SamAccountName'] and EventData[Data[@Name='IpAddress']='$IPv4Address']]"
`As you can see above, in order to successfully query the computer value and TargetUsername in the EventData XML tags we needed to add a second "and EventData". This successfully finds what I was looking for. 



**FI
LTERXML
**



FilterXML was another possible option that could have been used. In Microsoft's TechNet Documentation, one of the examples they gave was as follows.


`# Using the FilterXML parameter:
PS> Get-WinEvent -FilterXML "*[System[Level=3 and TimeCreated[timediff(@SystemTime)<= 86400000]]]"
`I should mention you can easily get yourself started with the -FilterXML value using Windows Event Viewer. Simply open Windows Event Viewer, in the right hand pane select "**Create Custom View**" than enter the Event ID values you wish to search for, keywords, time frames, computer names, etc. Then click the XML tab and it will show you what the XML query looks like. This is great for getting started however it will not work for more detailed queries which I will build on in the information below.  

To query the Event Log using the FilterXML parameter we need to add the QueryList and Query tags on the outside of the defining properties we wish to filter by. Using -FilterXML is simply XML formatted text of what we are looking for. The same sectioning rules apply as before except FilterXML wants an XML formatted document when FilterXPath wants just the properties defined. The XPath 1.0 language Windows uses must resolve to "Events" not a single "Event". This seemed to make the most sense for my original situation so it is what I went with. 


Why would these two similar options be available for use you might question?!?!?! The Windows Event log does not fully support XPath query language. More information on this can be read 
[HERE](https://docs.microsoft.com/en-us/windows/win32/wes/consuming-events#xpath-10-limitations) 
and 
[HERE](https://docs.microsoft.com/en-us/windows/win32/wes/consuming-events#limitations) 
if interested. Windows Event Log uses a subset of XPath 1.0. There are specific limitations of XPath 1.0. The more options available the better the chance you are able to find what you are looking for using this cmdlet. Below we can view an example of why we need to have these two query parameters.

I wanted to build a query that returns services I do not have record of or know about. To do this I need to filter out known services. Although this list of services below can be extended greatly there is a max limit of 32 expressions that can be added to the XPath query. If you exceed this limit you will receive the PowerShell error message "_Get-WinEvent : The specified query is invalid_". This prevents my ability to accomplish this task.  
If you run the below query you will notice that it returns every Event ID under the sun after filtering the one Event ID I am trying to return information on.


`$FilterXML = @"


        *[System[(EventID="7045")]]
and *[EventData[Data[@Name="ServiceName"]!="MpKslDrv"]]
and *[EventData[Data[@Name="ServiceName"]!="Microsoft Edge Update Service (edgeupdate)"]]
and *[EventData[Data[@Name="ServiceName"]!="Microsoft Edge Update Service (edgeupdatem)"]]
and *[EventData[Data[@Name="ServiceName"]!="Microsoft Edge Elevation Service (MicrosoftEdgeElevationService)"]]
and *[EventData[Data[@Name="ServiceName"]!="Wireless Keyboard Filter Device Service"]]
and *[EventData[Data[@Name="ServiceName"]!="FileSyncHelper"]]
and *[EventData[Data[@Name="ServiceName"]!="OneDrive Updater Service"]]
and *[EventData[Data[@Name="ServiceName"]!="Google Update Service (gupdatem)"]]
and *[EventData[Data[@Name="ServiceName"]!="Google Update Service (gupdate)"]]
and *[EventData[Data[@Name="ServiceName"]!="Google Chrome Elevation Service"]]
and *[EventData[Data[@Name="ServiceName"]!="Adobe Genuine Monitor Service"]]
and *[EventData[Data[@Name="ServiceName"]!="Adobe Genuine Software Integrity Service"]]
and *[EventData[Data[@Name="ServiceName"]!="AdobeUpdateService"]]
and *[EventData[Data[@Name="ServiceName"]!="Mozilla Maintenance Service"]]



"@
Get-WinEvent -FilterXML $FilterXML
`You are able to add Suppress tags to remove Event ID's you do not want returned. Under other circumstances this can work. For the goal of the above query, I will need over 32 'Suppress' tags to filter Event ID's I do not want returned. If you run into a situation such as the one above you **DO NOT NEED** to add the Suppress tags. Simply use the -FilterXPath parameter instead. This would turn my above query into this:


`$XPath = '*[System[(EventID="7045")]] and [EventData[Data[@Name="ServiceName"]!="MpKslDrv"]] and [EventData[Data[@Name="ServiceName"]!="Action1 Agent"]] and [EventData[Data[@Name="ServiceName"]!="Microsoft Edge Update Service (edgeupdate)"]] and [EventData[Data[@Name="ServiceName"]!="Microsoft Edge Update Service (edgeupdatem)"]] and [EventData[Data[@Name="ServiceName"]!="Microsoft Edge Elevation Service (MicrosoftEdgeElevationService)"]] and [EventData[Data[@Name="ServiceName"]!="Microsoft Update Health Service"]] and [EventData[Data[@Name="ServiceName"]!="Sysmon"]] and [EventData[Data[@Name="ServiceName"]!="SysmonDrv"]] and [EventData[Data[@Name="ServiceName"]!="Wireless Keyboard Filter Device Service"]] and [EventData[Data[@Name="ServiceName"]!="FileSyncHelper"]] and [EventData[Data[@Name="ServiceName"]!="OneDrive Updater Service"]] and [EventData[Data[@Name="ServiceName"]!="Splashtop Software Updater Service"]] and [EventData[Data[@Name="ServiceName"]!="Splashtop Virtual Hid"]] and [EventData[Data[@Name="ServiceName"]!="Google Update Service (gupdatem)"]] and [EventData[Data[@Name="ServiceName"]!="Google Update Service (gupdate)"]] and [EventData[Data[@Name="ServiceName"]!="Google Chrome Elevation Service"]] and [EventData[Data[@Name="ServiceName"]!="Adobe Genuine Monitor Service"]] and [EventData[Data[@Name="ServiceName"]!="Adobe Genuine Software Integrity Service"]] and [EventData[Data[@Name="ServiceName"]!="AdobeUpdateService"]] and [EventData[Data[@Name="ServiceName"]!="Mozilla Maintenance Service"]]'
Get-WinEvent -FilterXPath $XPath
`The query must have at least one select statement. For each suppress statement, there must be at least one select statement that specifies the same path. If the select and suppress query return the same events, the suppress statement takes precedence. If you select events from multiple sources, the events are returned in time stamp order. If you use the system time stamp and the rate of events is high, it is possible that more than one event will have the same time stamp. When this occurs, the ordering of events becomes ambiguous and the events may appear out of order. Be careful when comparing floating point numbers in XPath queries. Any string representation of a floating point number is approximated and the value displayed in XML might not match the number stored with the event. Floating point numbers should be compared as being less than or greater than a constant.  
If you are required to use XML filtering for your situation my conclusion so far is that you need to know what you are looking for. As far as I am aware there is not a solution to perform the above kind of process of elimination without manual overview or FilterXPath.  
To compensate for this in my own environment, (where I have centralized important events using Windows Event Forwarding), I import centralized events into a SQL database and perform queries there. There are a lot of benefits to this including speed. If you wish to use the tool I created for this it can be obtained from [HERE][1]. I have set up instructions [HERE][2] if you wish to use the application as well.  
The "Suppress" '[Query Schema Element][3]' I mentioned can be used to filter out the extra Event ID's returned by a query. There is a limit of 32 expressions for the 'Suppress' tags as well.  The below example is used to query the event logs for any user accounts that have been added to high privileged administrator groups. The 'Suppress' expression is used to filter out Event ID 4799, preventing the return of unwanted information


`$FilterXML = @"


(*[EventData[Data[@Name="TargetUserName"] = "Administrators"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Domain Admins"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Schema Admins"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Enterprise Admins"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Print Operators"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Server Operators"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "DnsAdmins"]]) or
(*[EventData[Data[@Name="TargetUserName"] = "Backup Operators"]])
and
*[System[(EventID='4732') or (EventID='4733') or (EventID='4756') or (EventID='4757') or (EventID='4728') or (EventID='4729')]]

*[System[(EventID=4799)]]


"@
Get-WinEvent -FilterXML $FilterXML
`Another query you might find useful is one that searches the event log for an instance where the local Administrator user entered a password to execute a process with elevated privileges over the last 24 hours.



`$XML = "


            *[System[(EventID=4648) and TimeCreated[timediff(@SystemTime) <= 86400000]] and EventData[Data[@Name='ProcessName']='C:\Windows\System32\consent.exe'] and EventData[Data[@Name='TargetUserName']='Administrator']]


"
$AdminConsentGiven = Get-WinEvent -FilterXml $XML -MaxEvents 1 | Select-Object -Property *
`It is suggested to use XPath queries when you are searching the event logs for a simple expression from a single source. Use an XML structured query when you are searching from more than one event log source or you are using a compound expression with a dozen or more expressions.






Another example Microsoft gives for filtering events involves the[ Where-Object](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/where-object?view=powershell-6) cmdlet. The overhead on Where-Object is fairly high so I try to avoid using it whenever I can as it will search through everything a second time and can noticeably slow down the execution time of a script. I hope you found this useful and were able to learn what I was able to through this. Until next time...



- [tobor](https://roberthosborne.com)




 [1]: https://github.com/tobor88/BTPS-SecPack/tree/master/WEF%20Application
 [2]: https://btps-secpack.com/wef-application
 [3]: https://docs.microsoft.com/en-us/windows/win32/wes/queryschema-elements
