---
title: Using Azure Desired State Configuration – Part III
authors:
  - Will Anderson
date: "2017-10-03T14:00:59+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/10/using-azure-desired-state-configuration-part-iii/
---

Last week we talked about modifying and uploading our configurations to Azure Automation DSC.  We were able to import credentials from Azure's Automation Account Credential store, and then compile the .mof files in the automation account for deployment.  This week, we'll be looking at how we apply those configurations to existing systems via PowerShell.  Then we'll take a look at some of the reporting available via Azure Automation DSC and send those reports over to Operations Management Suite for dashboarding.  
So when we left off.  We successfully published our configurations in Automation DSC.  If we run Get-AzureRmAutomationDscNodeConfiguration against the configuration I published, we get the following:


`Get-AzureRmAutomationDscNodeConfiguration -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName -ConfigurationName TestConfig
`![](https://powershell.org/wp-content/uploads/2017/09/aadscmofs-300x198.jpg)  
As you can see, when we published the configuration, it generated two configuration .mofs based on our node names - domainController and webServer.  Now of course, we're not going to be calling our servers webServer and domainController, rather, these are generalized names for our configurations.  We get the root configuration (TestConfig), and then the node specific configuration based on the root document (webServer or domainController).  This gives us a lot of flexibility as we can now statefully name our configurations, and assign them to machines without dealing with guids or having all of the mofs defined by a computer name or any other nonsense!  We just assign what named configuration goes to what system, and away we go.  
We don't even really care what the computer name is, as long as the correct config gets assigned.  This is really helpful when working on Azure Resource Manager templates, because I don't even really know what the system name will be until runtime.  I just designate a set of systems as 'webServer', assign the config and deploy.  
[_Moo._][1]  
**Register the Virtual Machine**  
So let's go ahead and get a system that we want to target.  I just so happen to have one in Azure right here:


`$TargetResGroup = 'nrdtste'
$VMName = 'ctrxeusdbnp01'
$VM = Get-AzureRmVM -ResourceGroupName $TargetResGroup -Name $VMName
`Now that we have our VM object, we're going to create a hash-table with some configuration items for the DSC Local Configuration Manager on the target system.


`$DSCLCMConfig = @{
    'ConfigurationMode' = 'ApplyAndAutocorrect'
    'RebootNodeIfNeeded' = $true
    'ActionAfterReboot' = 'ContinueConfiguration'
}
`Once we have all of this, we can now go ahead and register our target node in Automation DSC using the Register-AzureRmAutomationDscNode command.


`Register-AzureRmAutomationDscNode -AzureVMName $VM.Name -AzureVMResourceGroup $VM.ResourceGroupName -AzureVMLocation $VM.Location -AutomationAccountName $AutoAcct.AutomationAccountName -ResourceGroupName $AutoAcct.ResourceGroupName @DSCLCMConfig
`You might note with this command that you can also assign it a configuration as you register the node.  However, I've had occasional issues with this method.  So we're going to go ahead and register the node first, then assign the configuration.  As another note, while the system is being registered, the command will hold your session until it returns a success or failure.  So grab another cup of coffee and enjoy it for a few minutes while we wait.  
![](https://powershell.org/wp-content/uploads/2017/09/VMregistered-300x123.jpg)  
**Apply a Configuration**  
Now we can see our machine has registered successfully.  But if we run the Get-AzureRmAutomationDscNode command, we can see that the NodeConfigurationName property is empty.  So let's fix that.  
![](https://powershell.org/wp-content/uploads/2017/09/ConfigEmpty-300x76.jpg)  
What we need to do is capture the configuration we want to apply, so we do this by grabbing it with Get-AzureRmAutomationDscNodeConfiguration.  Then, we'll capture the target DSC endpoint with the Get command we previously used, and cast both objects to our Set-AzureRmAutomationDscNode command to apply the configuration to the appropriate node.


`$Configuration = Get-AzureRmAutomationDscNodeConfiguration -AutomationAccountName $AutoAcct.AutomationAccountName -ResourceGroupName $AutoAcct.ResourceGroupName -Name 'CompositeConfig.webServer'
$TargetNode = Get-AzureRmAutomationDscNode -Name $VM.Name -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName
Set-AzureRmAutomationDscNode -Id $TargetNode.Id -NodeConfigurationName $Configuration.Name -AutomationAccountName $AutoAcct.AutomationAccountName -ResourceGroupName $AutoAcct.ResourceGroupName -Verbose -Force
`After a couple of seconds, we can see that the configuration has been assigned to our node.  Once the LCM hits it's next review cycle, it'll pick up the configuration and start applying:  
![](https://powershell.org/wp-content/uploads/2017/09/NodeConfigd-300x96.jpg)  
We can check on the status of our target node by using the Get-AzureRmAutomationDscNodeReport command like so to get some useful information:


`Get-AzureRmAutomationDscNodeReport -NodeId $TargetNode.Id -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName -Latest
`And it will output some pretty useful information.  
![](https://powershell.org/wp-content/uploads/2017/09/PSReport-300x139.jpg)  
**Azure Automation DSC Reports**  
This is where I have to admit that the UI really shines.  You can see all of your systems at a glance, with what configuration is assigned and it's current state.  
![](https://powershell.org/wp-content/uploads/2017/09/Report1-300x91.jpg)  
Furthermore, you can actually drill down through the nodes to see what resources are being applied, what their dependencies are, and what the state of the particular configuration item is.  
![](https://powershell.org/wp-content/uploads/2017/09/Report2-300x282.jpg)  
There is a wealth of data that you can find here in an easy to read dashboard.  Furthermore, you can connect this to a Log Analytics instance (or other products that support restful API), and ship it up for alerting and more dashboarding.  
**Connecting to Log Analytics**  
So connecting your Azure Automation DSC is pretty straightforward.  To be able to use it, you need to have an OMS tier that includes the Automation and Control offering to start.  If you do, then all you have to do is follow a couple of simple commands.  
First, we have to get the resourceIds for the Automation Account and the Log Analytics workspace.


`#Get the resourceId of the automation account.
    $AutoAcctResource = Find-AzureRmResource -ResourceType "Microsoft.Automation/automationAccounts" -ResourceNameContains 'testautoaccteastus2'
    #Get the resourceId of the Log Analytics Workspace
    $LogAnalyticsResource = Find-AzureRmResource -ResourceType "Microsoft.OperationalInsights/workspaces" -ResourceNameContains 'LWINerd'
`Then we can use those resourceIds to pass to Set-AzureRmDiagnosticSetting and specify our DSCNodeStatus category.


`Set-AzureRmDiagnosticSetting -ResourceId $AutoAcctResource.ResourceId -WorkspaceId $LogAnalyticsResource.ResourceId -Enabled $true -Categories "DscNodeStatus" -Verbose
`Then you'll get a return similar to this:


`PS C:\Scripts\Presentations\AzureAutomationDSC\ResourcesToUpload> Set-AzureRmDiagnosticSetting -ResourceId $AutoAcctResource.ResourceId -WorkspaceId $LogAnalyticsResource.ResourceId -Enabled $true -Categories "D
scNodeStatus" -Verbose
StorageAccountId            :
ServiceBusRuleId            :
EventHubAuthorizationRuleId :
Metrics
    TimeGrain       : PT1M
    Enabled         : False
    RetentionPolicy
    Enabled : False
    Days    : 0
Logs
    Category        : JobLogs
    Enabled         : False
    RetentionPolicy
    Enabled : False
    Days    : 0
    Category        : JobStreams
    Enabled         : False
    RetentionPolicy
    Enabled : False
    Days    : 0
    Category        : DscNodeStatus
    Enabled         : True
    RetentionPolicy
    Enabled : False
    Days    : 0
WorkspaceId                 : /subscriptions/f2007bbf-f802-4a47-9336-cf7c6b89b378/resourceGroups/mms-eus/providers/Microsoft.OperationalInsights/workspaces/LWINerd
Id                          :
/subscriptions/f2007bbf-f802-4a47-9336-cf7c6b89b378/resourcegroups/mms-eus/providers/microsoft.automation/automationaccounts/testautoaccteastus2/providers/microsoft.insights/diagnosticSettings/service
Name                        : service
Type                        :
Location                    :
Tags                        :
`After a little while, we can check back to our log search and start performing queries and configuring alerts.  
![](https://powershell.org/wp-content/uploads/2017/09/DSCReporting-300x154.jpg)  
So that's Azure Automation DSC in a nutshell!  But don't worry, I haven't forgotten about Azure DSC's push method.  We'll be talking about that next blog!

 [1]: https://twitter.com/jsnover/status/553249369852358657
