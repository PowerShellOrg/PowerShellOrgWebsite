---
title: Using PowerShell, Azure Automation, and OMS – Part I
authors:
  - Will Anderson
date: "2017-07-25T14:00:01+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/07/using-powershell-azure-automation-and-oms-part-i/
---

Microsoft's Operations Management Suite provides some exceptional tools for monitoring and maintaining your environments in both the cloud and in your datacenter.  One of it's best features, however, is its ability to leverage the tools that you've already developed to perform tasks and remediate issues using PowerShell, Azure Automation Runbooks, and OMS Alert triggers.  In this series, we'll be discussing how you can configure these tools to take care of problems in your own environment.  Today, we'll be talking about how you can take your own PowerShell Modules and upload them to Azure Automation.  
**Creating The Azure Automation Account**  
In order to create the Azure Automation Account, you'll need to have create the automation account object in the target resource group, and the ability to create an AzureRunAs account in AzureAD.  It's also important to be mindful that not every Azure region has the Microsoft.Automation resource provider registered to it, so you'll want the resource group to exist in the appropriate locale.  You can check this with the Get-AzureRmResourceProvider cmdlet:


`Get-AzureRmResourceProvider -ProviderNamespace 'Microsoft.Automation'
`![](https://powershell.org/wp-content/uploads/2017/07/1-AutomationLocation-300x158.png)  
For our purposes, we'll be deploying a resource group to East US 2.  Once the resource group has been created, we'll use New-AzureRmAutomationAccount


`$BaseName = 'testautoacct'
$Location = 'eastus2'
$ResGrp = New-AzureRmResourceGroup -Name $BaseName -Location $Location -Verbose
$AutoAcct = New-AzureRmAutomationAccount -ResourceGroupName $ResGrp.ResourceGroupName -Name ($BaseName + $Location) -Location $ResGrp.Location
`It's good to note that while -Verbose is available for New-AzureRmAutomationAccount, it will not return any verbose output.  
![](https://powershell.org/wp-content/uploads/2017/07/2-CreateAccount-300x63.png)  
**Creating A Blob Container in AzureRM**  
Now that we have our automation account created, we can begin uploading our modules to be available for Azure Automation to use.  In order to do so, we'll need to create a blob store that we can upload our modules to so that the Azure Automation Account can import them; unlike in the Azure UI, you cannot currently upload your modules directly from your local machine, so you'll need to supply a URI for Azure Automation to access.  
Another 'gotcha' is that there is no AzureRm cmdlet for creating a blob container, or for uploading content to that container, so you'll need to do so using the Azure storage commands and passing the Storage Context Key from AzureRM to Azure.  Here is how you can create the storage account, get the storage account key, create a context, and pass it to Azure:


`$Stor = New-AzureRmStorageAccount -ResourceGroupName $ResGrp.ResourceGroupName -Name modulestor -SkuName Standard_LRS -Location $ResGrp.Location -Kind BlobStorage -AccessTier Hot
Add-AzureAccount
$Subscription = ((Get-AzureSubscription).where({$PSItem.SubscriptionName -eq 'LastWordInNerd'}))
Select-AzureSubscription -SubscriptionName $Subscription.SubscriptionName -Current
$StorKey = (Get-AzureRmStorageAccountKey -ResourceGroupName $Stor.ResourceGroupName -Name $Stor.StorageAccountName).where({$PSItem.KeyName -eq 'key1'})
$StorContext = New-AzureStorageContext -StorageAccountName $Stor.StorageAccountName -StorageAccountKey $StorKey.Value
`Once we've run our storage commands, you'll have captured the storage context object like so:  
![](https://powershell.org/wp-content/uploads/2017/07/3-StorageContext-300x105.png)  
Now that we've got access to our AzureRm storage account in Azure, we can now create our blob container:


`$Container = New-AzureStorageContainer -Name 'modules' -Permission Blob -Context $StorContext -Permission Blob
`![](https://powershell.org/wp-content/uploads/2017/07/4-BlobContainer-300x86.png)  
\*NOTE\* - I have my container permission set to Blob, which makes this directory publicly available.  At some time in the near future, I'll walk you through how you can use SAS Tokens to access secure blobs at runtime.  Just be mindful of this if you use this code in production.  
**Upload to a Blob Container**  
Now we can finally upload our modules to the blob store, and register them in Azure Automation!  What we're going to do here is take our custom module, compress it into a .zip file, and then use the Set-AzureStorageBlobContent cmdlet to ship it up to our blob store.  Once the content is shipped, we use the $Blob.ICloudBlob.Uri.AbsoluteUri to feed the New-AzureRmAutomationModule the URI required for the ContentLink parameter.


`$ModuleLoc = 'C:\Scripts\Presentations\OMSAutomation\Modules\'
$Modules = Get-ChildItem -Directory -Path $ModuleLoc
    ForEach ($Mod in $Modules){
        Compress-Archive -Path $Mod.PSPath -DestinationPath ($ModuleLoc + '\' + $Mod.Name + '.zip') -Force
    }
$ModuleArchive = Get-ChildItem -Path $ModuleLoc -Filter "*.zip"
ForEach ($Mod in $ModuleArchive){
    $Blob = Set-AzureStorageBlobContent -Context $StorContext -Container $Container.Name -File $Mod.FullName -Force -Verbose
    New-AzureRmAutomationModule -ResourceGroupName $ResGrp.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName -Name ($Mod.Name).Replace('.zip','') -ContentLink $Blob.ICloudBlob.Uri.AbsoluteUri
}
`![](https://powershell.org/wp-content/uploads/2017/07/5-UploadModule-300x65.png)  
Now that we've done all that, we can validate that we have our module in Azure Automation through the UI:  
![](https://powershell.org/wp-content/uploads/2017/07/6-Validate-300x282.png)  
Now that we've uploaded our modules into Azure Automation, we can start using them to perform tasks in Azure.  Next week, we'll look at how we'll be getting more familiar with configuring runbooks and take a closer look at the input data that OMS can pass along to them.  
**Part I - Azure Automation Account Creation and Adding Modules**  
[Part II - Configuring Azure Automation Runbooks And Understanding Webhook Data][1]  
Part III - Utilizing Webhook Data in Functions and Validate Results - Coming Soon!

 [1]: https://powershell.org/2017/08/01/using-powershell-azure-automation-and-oms-part-ii/
