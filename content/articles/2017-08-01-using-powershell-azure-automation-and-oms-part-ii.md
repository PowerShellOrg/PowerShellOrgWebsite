---
title: Using PowerShell, Azure Automation, and OMS – Part II
authors:
  - Will Anderson
date: "2017-08-01T14:00:46+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/08/using-powershell-azure-automation-and-oms-part-ii/
---

So last time we learned how to upload our custom modules into Azure Automation so we can start using them in Azure Automation Runbooks.  This week we're going to take a look at configuring a runbook to see what kind of data we can ingest from OMS Webhook data, and how we can leverage that data to pass into our functions.  
**Creating the Runbook Script**  
So first off, let's talk about basic runbooks and running them against objects in Azure.  As previously discussed, when your automation account is created, it creates with it an AzureRunAsAccount.  This account is configured to act on behalf of the user that has access to the automation account and the runbooks in order to perform the runbook task.  In order to leverage this account, you need to invoke it in the runbook itself.  You can actually find an example of this snippet in the AzureAutomationTutorialScript runbook in your automation account.


`$connectionName = "AzureRunAsConnection"
try
{
    # Get the connection "AzureRunAsConnection "
    $servicePrincipalConnection=Get-AutomationConnection -Name $connectionName
    "Logging in to Azure..."
    Add-AzureRmAccount `
        -ServicePrincipal `
        -TenantId $servicePrincipalConnection.TenantId `
        -ApplicationId $servicePrincipalConnection.ApplicationId `
        -CertificateThumbprint $servicePrincipalConnection.CertificateThumbprint
}
catch {
    if (!$servicePrincipalConnection)
    {
        $ErrorMessage = "Connection $connectionName not found."
        throw $ErrorMessage
    } else{
        Write-Error -Message $_.Exception
        throw $_.Exception
    }
}
`So now that we've got our opening snippet, we'll add that into a new .ps1 script file in our preferred integrated scripting environment tool and get to work.  
Now, in order to be able to ingest data from an OMS Alert, we need to be able to pass the data to our Azure Automation runbook.  In order to do so, we only need to add a $WebHookData parameter to the runbook and specify the data type as object.


`Param (
    [Parameters()][object]$WebHookData
)
`Now, we need to convert that data from a JSON object into something readable in our output.  Webhook data is presented with three primary datasets - WebhookName, RequestHeader, and RequestBody.  WebhookName, obviously is the name of the incoming webhook.  RequestHeader is a hash table containing all of the header data for the incoming requestion.  And finally, RequestBody is the body of the incoming request.  This is where the data we want to parse will reside.  Specifically, it will reside under the SearchResults property of the RequestHeader dataset.


`$WebhookData.WebhookName
        $WebhookData.RequestHeader
        $WebhookData.RequestBody
`So let's configure our runbook to display the incoming data to examine what we have to play with.


`$SearchResults = (ConvertFrom-Json $WebhookData.RequestBody).SearchResults.value
$SearchResults
`**Publish the Runbook**  
Now, we'll go ahead and save our script as a .ps1 file and upload it to our automation account with the Import-AzureRmAutomationRunbook cmdlet.


`Import-AzureRmAutomationRunbook -Path 'C:\Scripts\Presentations\OMSAutomation\ExampleRunbookScript.ps1' -Name WebhookNSGRule -Type PowerShell -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName -Published
`And now we can see our return.  
![](https://powershell.org/wp-content/uploads/2017/07/7-ImportRunbook-300x150.png)  
And if we check through the UI, we can see a brand-new, shiny runbook sitting in our automation account!  Now, we can configure a basic alert to monitor in OMS.  
**Create an Alert**  
For the purposes of this example, I've create a couple of virtual machines with network security group rules for HTTP:80 and RDP:3389 accepting connections from anywhere.  I do not recommend doing this for a production virtual machine.  /endDisclaimer  
As you can well expect, these machines are throwing MaliciousIP traffic alerts in Operations Management Suite's console:  
![](https://powershell.org/wp-content/uploads/2017/07/8.5-AlertUI-3-300x298.png)  
So if we click on the MaliciousIP flag, it'll take us to the Log Search screen.  This includes the query data that we can use for the alert.  However, you'll want to clean up the query data a bit to generalize it.  In this example, the query is specific to the country that is displayed in the given flag.  But if we remove the country specific portion of the query, it'll allow us to cast a wider net and get data on potentially malicious traffic from any given country.


`Canned Query:
MaliciousIP=* AND (RemoteIPCountry=* OR MaliciousIPCountry=*) AND (((Type=WireData AND Direction=Outbound) OR (Type=WindowsFirewall AND CommunicationDirection=SEND) OR (Type=CommonSecurityLog AND CommunicationDirection=Outbound)) OR (Type=W3CIISLog OR Type=DnsEvents OR (Type = WireData AND Direction!= Outbound) OR (Type=WindowsFirewall AND CommunicationDirection!=SEND) OR (Type = CommonSecurityLog AND CommunicationDirection!= Outbound))) (RemoteIPCountry="People's Republic of China" OR MaliciousIPCountry="People's Republic of China")
Modified Query:
MaliciousIP=* AND (RemoteIPCountry=* OR MaliciousIPCountry=*) AND (((Type=WireData AND Direction=Outbound) OR (Type=WindowsFirewall AND CommunicationDirection=SEND) OR (Type=CommonSecurityLog AND CommunicationDirection=Outbound)) OR (Type=W3CIISLog OR Type=DnsEvents OR (Type = WireData AND Direction!= Outbound) OR (Type=WindowsFirewall AND CommunicationDirection!=SEND) OR (Type = CommonSecurityLog AND CommunicationDirection!= Outbound)))
`![](https://powershell.org/wp-content/uploads/2017/07/9-ConfigureQuery-1-300x136.jpg)  
After testing our query to make sure it's valid, we can now hit the alert button and configure the alert.  Here you'll need to give it an alert name, a schedule, and number of results before it triggers the alert.  You'll also want to select the Runbook option under actions and select the test runbook we created.  Then we hit save, and wait for our alert to trigger and the runbook to fire.  
![](https://powershell.org/wp-content/uploads/2017/07/10-ConfigureAlert-300x193.jpg)  
And as you can see, I didn't have to wait long:  
![](https://powershell.org/wp-content/uploads/2017/07/11-RunbookFired-300x240.jpg)  
**Validate our Data**  
If we click on one of the completed instances, and navigate to the output blade, we can now see the data we're receiving from our triggered alert.  This particular data shows that inbound traffic from Colombia is attempting an RDP connection to my virtual machine.  With the inbound IP Address and target system name, we now have enough data to be able to create a full-blown auto-remediation solution.


`Logging in to Azure...
Environments                                                                                           Context
------------                                                                                           -------
{[AzureCloud, AzureCloud], [AzureChinaCloud, AzureChinaCloud], [AzureUSGovernment, AzureUSGovernment]} Microsoft.Azur...
Computer                   : server1
MG                         : 00000000-0000-0000-0000-000000000001
ManagementGroupName        : AOI-cb0eefe8-b88f-47ce-ae91-dbc46df99751
SourceSystem               : OpsManager
TimeGenerated              : 2017-07-21T12:17:37.45Z
SessionStartTime           : 2017-07-21T12:16:52Z
SessionEndTime             : 2017-07-21T12:16:52Z
LocalIP                    : 10.119.192.10
LocalSubnet                : 10.119.192.0/21
LocalMAC                   : 00-0d-3a-03-ea-a6
LocalPortNumber            : 3389
RemoteIP                   : 200.35.53.121
RemoteMAC                  : 12-34-56-78-9a-bc
RemotePortNumber           : 4935
SessionID                  : 10.119.192.10_3389_200.35.53.121_4935_2184_2017-07-21T12:16:52.000Z
SequenceNumber             : 0
SessionState               : Listen
SentBytes                  : 20
ReceivedBytes              : 40
TotalBytes                 : 60
ProtocolName               : TCP
IPVersion                  : IPv4
SentPackets                : 1
ReceivedPackets            : 2
Direction                  : Inbound
ApplicationProtocol        : RDP
ProcessID                  : 888
ProcessName                : C:\Windows\System32\svchost.exe
ApplicationServiceName     : ms-wbt-server
LatencyMilliseconds        : 116
LatencySamplingTimeStamp   : 2017-07-21T12:16:52Z
LatencySamplingFailureRate : 0.0%
MaliciousIP                : 200.35.53.121
IndicatorThreatType        : Botnet
Confidence                 : 75
Severity                   : 2
FirstReportedDateTime      : 2017-07-20T20:10:32Z
LastReportedDateTime       : 2017-07-21T11:25:11.0661909Z
IsActive                   : true
ReportReferenceLink        : https://interflowinternal.azure-api.net/api/reports/download/generic/webbot.json
RemoteIPLongitude          : -75.88
RemoteIPLatitude           : 8.77
RemoteIPCountry            : Colombia
id                         : 149270bc-74fc-13d0-34a9-3fd665a457b2
Type                       : WireData
__metadata                 : @{Type=WireData; TimeGenerated=2017-07-21T12:17:37.45Z}
`It's a long road, and we're almost there!  Next week, I'll take you through my process of modifying my module to directly ingest webhook data, and how we can take our OMS queries and deploy them to other Operations Management Suite solutions using PowerShell.  See you then!  
[Part I - Azure Automation Account Creation and Adding Modules][1]  
**Part II - Configuring Azure Automation Runbooks And Understanding Webhook Data**  
Part III - Utilizing Webhook Data in Functions and Validate Results - Coming Soon!

 [1]: https://powershell.org/2017/07/25/using-powershell-azure-automation-and-oms-part-i/
