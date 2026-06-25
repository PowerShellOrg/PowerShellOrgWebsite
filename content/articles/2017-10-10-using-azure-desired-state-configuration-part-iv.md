---
title: Using Azure Desired State Configuration – Part IV
authors:
  - Will Anderson
date: "2017-10-10T14:00:07+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/10/using-azure-desired-state-configuration-part-iv/
---

So we've talked about Azure Automation DSC and the extensive reporting we can get from it.  With the pricing as it is, it would be hard to argue as to why you would want to use anything else.  But I'm a completionist, and there may be some edge cases that might come up where you wouldn't be able to use the pull method for configurations.  So let's talk about how you can use Azure DSC to push a configuration to a virtual machine.  
So let's get started!  
**Publish the Configuration**  
In order to push a configuration, we need to publish it to a blob store.  When you use Publish-AzureRmVmDscConfiguration, the command bundles all of the required modules along with the configuration into a .zip file. It does this by pulling the modules from your local machine that you're running the command from, so you'll need to make sure that you have the appropriate modules installed on your system.  
First, we'll go ahead and grab a storage account where these binaries can be published.  In the storage account, we have a blob store for our configurations.  This blob store is a private store.


`$AutoResGrp = Get-AzureRmResourceGroup -Name 'mms-eus'
    $StorAcct = Get-AzureRmStorageAccount -ResourceGroupName $AutoResGrp.ResourceGroupName -Name 'modulestor'
`Now that we have our private store, we're going to publish our configuration using the Publish-AzureRmVMDscConfiguration command.


`$DSCBlob = Publish-AzureRmVMDscConfiguration -ConfigurationPath C:\Scripts\Configs\cmdpconfig.ps1 -ResourceGroupName $StorAcct.ResourceGroupName -ContainerName 'dscpushconfig' -StorageAccountName $StorAcct.StorageAccountName -Force
    $Archive = $DSCBlob.Split('/') | Select-Object -Last 1
`As previously mentioned, the command reads your configuration, and then grabs the necessary modules from your local machine and adds them to the package when it publishes the configuration.  This way, the machine has all of the necessary bits to perform the configuration.  You can actually validate this by downloading the packaged .zip file from the blob store and seeing for yourself.  
Along with the modules and configuration, you'll also find a dscmetadata.json file that is essentially a manifest of the required modules.  
![](https://powershell.org/wp-content/uploads/2017/10/PushPackage-300x136.jpg)  
**Install the VM Extension**  
Now that our binaries have been published, we can get our target machine and deploy the Azure DSC VM extension to it while assigning the configuration.  When you deploy the extension, it's best to use the latest version available.  If you want to check which version is the latest, you can check out the release history on the [PowerShell Team Blog][1].


`$ArmVmRsg = Get-AzureRmResourceGroup -Name 'nrdtste'
    $ArmVm = Get-Azurermvm -ResourceGroupName $ArmVmRsg.ResourceGroupName -Name 'ctrxeusdbnp01'
    Set-AzureRmVMDscExtension -ArchiveResourceGroupName $StorAcct.ResourceGroupName -ArchiveBlobName $Archive -ResourceGroupName $ArmVm.ResourceGroupName -ArchiveStorageAccountName $StorAcct.StorageAccountName -ArchiveContainerName 'dscpushconfig' -Version '2.26' -VMName $ArmVm.Name -ConfigurationName 'CMDPConfig' -Verbose
`Like with Azure Automation DSC, when you register the VM extension, your PowerShell session will be held open until the extension returns a success or failure status.  Once it returns, you can check the status of the configuration using Get-AzureRmVmDscExtensionStatus.


`PS C:\Users\willa> Get-AzureRmVMDscExtensionStatus -ResourceGroupName $ArmVm.ResourceGroupName -VMName $ArmVm.Name
ResourceGroupName   : nrdtst3
VmName              : ctrxeusdbnp01
Version             : 2.26
Status              : Provisioning succeeded
StatusCode          : ProvisioningState/succeeded
Timestamp           : 10/9/2017 1:12:22 PM
StatusMessage       : DSC configuration was applied successfully.
DscConfigurationLog : {[2017-10-09 13:11:18Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] The operation 'Get-WindowsFeature' succeeded: Server-Gui-Shell, [2017-10-09
                      13:11:18Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Test     ]  [[WindowsFeature]RemoveUI]  in 9.5980 seconds., [2017-10-09 13:11:18Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ Start  Set
                      ]  [[WindowsFeature]RemoveUI], [2017-10-09 13:11:19Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Uninstallation started......}
`If you want to dive a little deeper, we can of course grab the specific DscConfigurationLog information:


`PS C:\Users\willa> (Get-AzureRmVMDscExtensionStatus -ResourceGroupName $ArmVm.ResourceGroupName -VMName $Armvm.Name).DscConfigurationLog
[2017-10-09 13:11:18Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] The operation 'Get-WindowsFeature' succeeded: Server-Gui-Shell
[2017-10-09 13:11:18Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Test     ]  [[WindowsFeature]RemoveUI]  in 9.5980 seconds.
[2017-10-09 13:11:18Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ Start  Set      ]  [[WindowsFeature]RemoveUI]
[2017-10-09 13:11:19Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Uninstallation started...
[2017-10-09 13:11:19Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Continue with removal?
[2017-10-09 13:11:19Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Prerequisite processing started...
[2017-10-09 13:11:24Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Prerequisite processing succeeded.
[2017-10-09 13:12:21Z] [WARNING] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] You must restart this server to finish the removal process.
[2017-10-09 13:12:21Z] Settings handler status to 'transitioning' (C:\Packages\Plugins\Microsoft.Powershell.DSC\2.26.1.0\Status\0.status)
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Uninstallation succeeded.
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] Successfully uninstalled the feature Server-Gui-Shell.
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]:                            [[WindowsFeature]RemoveUI] The Target machine needs to be restarted.
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Set      ]  [[WindowsFeature]RemoveUI]  in 62.7090 seconds.
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Resource ]  [[WindowsFeature]RemoveUI]
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]:                            [] A reboot is required to progress further. Please reboot the system.
[2017-10-09 13:12:21Z] [WARNING] [ctrxeusdbnp01]:                            [] A reboot is required to progress further. Please reboot the system.
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Set      ]
[2017-10-09 13:12:21Z] [VERBOSE] [ctrxeusdbnp01]: LCM:  [ End    Set      ]    in  74.8080 seconds.
[2017-10-09 13:12:21Z] [VERBOSE] Operation 'Invoke CimMethod' complete.
[2017-10-09 13:12:21Z] [VERBOSE] Time taken for configuration job to complete is 75.071 seconds
`As you can see, the configuration is complete pending a reboot.  This brings us to a few of the caveats associated with the push method for Azure DSC.

  * Unfortunately, unlike with the Register-AzurRmAutomationDscNodeConfiguration command available for Azure Automation, you cannot currently configure the LCM direct from the command.  Instead, you'll want to add a LocalConfigurationManager block to your top level config to set any attributes for the LCM.
  * As the system is downloading the packaged modules and configuration files, the mof file is configured locally on the machine.  While the current.mof file is encrypted, there is a copy of the mof that is generated in the C:\Packages\Plugins\Microsoft.Powershell.DSC\
\\ directory.  You'll want to be careful as to what you're passing in plain text in that regard.
  * You can retrieve the DscConfigurationLog data for validation of your configs and the state of the machines, but this process requires automation and can take some time to compile.

So now we've explore Azure Desired State Configuration using the available push and pull methods.  And we've explored the rich reporting capabilities that are available to you in Azure Automation DSC.  It's been a long journey, but I hope you've found this content to be useful to you!  
Until next time!

 [1]: https://blogs.msdn.microsoft.com/powershell/2014/11/20/release-history-for-the-azure-dsc-extension/
