---
title: Using PowerShell, Azure Automation, and OMS – Part III
authors:
  - Will Anderson
date: "2017-08-08T14:00:43+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/08/using-powershell-azure-automation-and-oms-part-iii/
---

It's been a long road, but we're almost there!  A couple of weeks ago we looked at how we can create an Azure Automation Account and add our own custom modules to the solution to be used in Azure Automation.  Last week, we took a deeper dive into configuring a runbook to take in webhook data from an alert using Microsoft's Operations Management Suite.  Then we looked into the data itself to see how we can leverage it against our runbook to fix problems for us on the fly.  
This week, we're going to modify an existing function to use that webhook data directly.  
**Building on Webhook Data**  
We could actually build our logic directly into the runbook to parse the webhook data and then pass the formatted information to our function that we've made available in Azure.  But I prefer to keep my runbooks as simple as possible and do the heavy lifting in my function.  This makes the runbook look a little bit cleaner, and allows me to minimize my code management a little more.  Also, Azure Automation Runbooks, as of this writing, don't play nicely with parameter sets in them, so I might as well pass my data along to a command that does.  
Originally, I had built a one-liner that allowed me to create an NSG rule on the fly to block and incoming traffic from a specific IPAddress.  It was a fairly simple command.  But today, we're going to make it a little more robust, and give it the ability to use webhook data.  Here's my original code:


`Function Set-AzureRmNSGMaliciousRule {
    [cmdletbinding()]
    Param(
        [Parameter(Mandatory=$true)][string]$ComputerName,
        [Parameter(Mandatory=$true)][string]$IPAddress
    )
    $ResGroup = (Get-AzureRmResource).where({$PSItem.Name -eq $Sys})
    $VM = Get-AzureRmVM -ResourceGroupName $ResGroup.ResourceGroupName -Name $Sys
    $VmNsg = (Get-AzureRmNetworkSecurityGroup -ResourceGroupName $VM.ResourceGroupName).where({$PSItem.NetworkInterfaces.Id -eq $VM.NetworkProfile.NetworkInterfaces.Id})
    $Priority = ($VmNsg.SecurityRules) | Where-Object -Property Priority -LT 200 | Select-Object -Last 1
    If ($Priority -eq $null){
        $Pri = 100
    }
    Else {
        $Pri = ($Priority + 1)
    }
    $Name = ('BlockedIP_' + $IPAddress)
    $NSGArgs = @{
        Name = $Name
        Description = ('Malicious traffic from ' + $IPAddress)
        Protocol = '*'
        SourcePortRange = '*'
        DestinationPortRange = '*'
        SourceAddressPrefix = $IPAddress
        DestinationAddressPrefix = '*'
        Access = 'Deny'
        Direction = 'Inbound'
        Priority = $Pri
    }
    $VmNsg | Add-AzureRmNetworkSecurityRuleConfig @NSGArgs | Set-AzureRmNetworkSecurityGroup
}
`I want to keep my mandatory parameters for my original one-liner solution in-case I need to do something tactically.  So we'll go ahead and split the parameters for on-prem vs. webhook into different parameter sets.  As webhook data is formatted as a JSON object, we'll need to specify the data type for the WebhookData parameter as object.


`Param(
        [Parameter(ParameterSetName='ConsoleInput')][string]$ComputerName,
        [Parameter(ParameterSetName='ConsoleInput')][string]$MaliciousIP,
        [Parameter(ParameterSetName='WebhookInput")][object]$WebhookData
    )
`Now, we're going to add some logic to parse out the data that we're looking to use:


`If($PSCmdlet.ParameterSetName -eq 'WebhookInput'){
        $SearchResults = (ConvertFrom-Json $WebhookData.RequestBody).SearchResults.value
        Write-Output ("Target computer is " + $SearchResults.Computer)
        Write-Output ("Malicious IP is " + $SearchResults.RemoteIP)
        $ComputerName = (($SearchResults.Computer).split(' ') | Select-Object -First 1)
        $MaliciousIP = (($SearchResults.RemoteIP).split(' ') | Select-Object -First 1)
    }
    If ($ComputerName -like "*.*"){
        $Sys = $ComputerName.Split('.') | Select-Object -First 1
    }
    Else {
        $Sys = $ComputerName
    }
`You'll notice that I'm doing some string formatting with our data here.  Webhook data can concatenate multiple alerts together and separate the array by using spaces, so we're splitting that up and grabbing the first entry for each input we need.  The additional splitting on the ComputerName is to accomodate for systems that are domain joined, as Azure isn't necessarily aware of a system's FQDN.  Mind you, this is a rough example, and continuously growing; So as my use cases evolve, so will my code.  
Now that we have our data formatted, we can update our module and upload it to our Azure Automation Account using the same process outlined in Part I, but with the -Force parameter added so we can overwrite the existing instance.


`Param(
    [Parameter(Mandatory=$true)]
    [object]$WebhookData
)
$connectionName = "AzureRunAsConnection"
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
Set-AzureRmNSGMaliciousRule -WebHookData $WebhookData
`Now, in a few minutes, our runbook should trigger and we can monitor the result.


`$Job = (Get-AzureRmAutomationJob -RunbookName WebhookNSGRule -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName)
$Job[0] | Select-Object -Property *
ResourceGroupName      : mms-eus
AutomationAccountName  : testautoaccteastus2
JobId                  : 339601cd-14e9-4002-8fcd-7d2008726445
CreationTime           : 7/24/2017 10:11:43 AM -04:00
Status                 : Completed
StatusDetails          :
StartTime              : 7/24/2017 10:12:21 AM -04:00
EndTime                : 7/24/2017 10:13:31 AM -04:00
Exception              :
LastModifiedTime       : 7/24/2017 10:13:31 AM -04:00
LastStatusModifiedTime : 1/1/0001 12:00:00 AM +00:00
JobParameters          : {}
RunbookName            : WebhookNSGRule
HybridWorker           :
StartedBy              :
`We can start digging into the outputs of the runbook after completion to gather a little more data.


`$Job = (Get-AzureRmAutomationJob -RunbookName WebhookNSGRule -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName)
$JobOut = Get-AzureRmAutomationJobOutput -Id $Job[0].JobId -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName
ForEach ($JobCheck in $JobOut){
    $JobCheck.Summary
}
PS C:\WINDOWS\system32> ForEach ($JobCheck in $JobOut){
    $JobCheck.Summary
}
Logging in to Azure...
Target computer is server1 server1 server1
Malicious IP is 183.129.160.229 183.129.160.229
Target system is server1
Incoming MaliciousIP is 183.129.160.229
Creating rule...
`And now if I check against my system, we will see that OMS is auto-generating rules for us!


`$VM = (Get-AzureRmResource).where({$PSItem.Name -like 'server1'})
$Machine = Get-AzureRmVM -ResourceGroupName $VM[0].ResourceGroupName -Name $VM[0].Name
$NSG = (Get-AzureRmNetworkSecurityGroup -ResourceGroupName $Machine.ResourceGroupName).where({$PSItem.NetworkInterfaces.Id -eq $Machine.NetworkProfile.NetworkInterfaces.Id})
(Get-AzureRmNetworkSecurityRuleConfig -NetworkSecurityGroup $NSG[0]).where({$PSItem.Name -like "BlockedIP_*"})
Name                     : BlockedIP_206.190.36.45
Id                       : /subscriptions/f2007bbf-f802-4a47-9336-cf7c6b89b378/resourceGroups/test/providers/Microsoft.Network/networkSecurityGroups/server1nsgeus2domain
                           Controller/securityRules/BlockedIP_206.190.36.45
Etag                     : W/"279e0fee-05c6-43ef-b897-19f927dd9a40"
ProvisioningState        : Succeeded
Description              : Auto-Generated rule - OMS detected malicious traffic from 206.190.36.45
Protocol                 : *
SourcePortRange          : *
DestinationPortRange     : *
SourceAddressPrefix      : 206.190.36.45
DestinationAddressPrefix : *
Access                   : Deny
Priority                 : 100
Direction                : Inbound
Name                     : BlockedIP_183.129.160.229
Id                       : /subscriptions/f2007bbf-f802-4a47-9336-cf7c6b89b378/resourceGroups/test/providers/Microsoft.Network/networkSecurityGroups/server1nsgeus2domain
                           Controller/securityRules/BlockedIP_183.129.160.229
Etag                     : W/"279e0fee-05c6-43ef-b897-19f927dd9a40"
ProvisioningState        : Succeeded
Description              : Auto-Generated rule - OMS detected malicious traffic from 183.129.160.229
Protocol                 : *
SourcePortRange          : *
DestinationPortRange     : *
SourceAddressPrefix      : 183.129.160.229
DestinationAddressPrefix : *
Access                   : Deny
Priority                 : 101
Direction                : Inbound
`After letting my system go for about 24 hours, my OMS Alert triggered the runbook an additional five times.  Each time generating an additional network security group rule in response to traffic that OMS had recognized as potentially malicious, and thus remediating my problem while I slept.  
![](https://powershell.org/wp-content/uploads/2017/07/12-NSG-300x48.jpg)  
Using a monitoring tool that can tightly integrate with your automation tools is a necessity in the age of the Cloud.  I hope you enjoyed this series and find it to be useful!  
[Part I - Azure Automation Account Creation and Adding Modules][1]  
Part II - Configuring Azure Automation Runbooks And Understanding Webhook Data  
**Part III - Utilizing Webhook Data in Functions and Validate Results**

 [1]: https://powershell.org/2017/07/25/using-powershell-azure-automation-and-oms-part-i/
