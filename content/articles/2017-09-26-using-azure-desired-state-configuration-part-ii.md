---
title: Using Azure Desired State Configuration – Part II
authors:
  - Will Anderson
date: "2017-09-26T14:00:21+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2017/09/using-azure-desired-state-configuration-part-ii/
---

Today we're going to be talking about adding configurations to your Azure Automation Account.  In this article, we'll be discussing special considerations that we need to take into account when uploading our configurations.  Then we'll talk about compiling the configurations into Managed Object Format (.mof) files, which we'll be able to use to assign to our systems.  
**Things to Consider**  
When building configurations for Azure DSC (or anything where we are pulling pre-created .mof files from), there are some things that we need to keep in mind.  
_Don't embed PowerShell scripts in your configurations._ - I spent a lot of time cleaning up my own configurations when learning Azure Automation DSC.  When configurations are compiled, they're done so on a virtual machine hidden under the covers and can cause some unexpected behaviours.  Some of the issues that I ran into were:

  * Using environment variables like $env:COMPUTERNAME - This actually caused me a lot of headaches when I started building systems that were being joined to a domain.  The name of the instance that _compiles_ the .mof will be used for $env:COMPUTERNAME instead of the target computer name and you'll be banging your head on the table wondering what happened.  Some of the resources that have been published in the gallery have been updated to use a 'localhost' option as a computer name input, such as xActiveDirectory.  This takes care of a lot of those headaches.
  * Using Parenthetical Commands to establish values - Using something like Get-NetAdapter in a parenthetical argument to get a network adapter of your target system and pass the needed values on to your DSC Resource Providers won't work for the same reasons as above.  In this instance, I received a vague error indicating that I was passing an invalid property, and took a little bit of time before I understood what was going on.
  * I also ran into an issue with compiling a configuration because I had been using Set-Item to configure the WSMan maxEnvelopeSize in my configs because they can get really big.  The error that I received was that WSMan wasn't installed on the machine.  It took me a bit to realize that this was because the machine compiling the .mof didn't have WSMan running on the box and it was blowing up on the config.

Instead, if you need to run PowerShell scripts ahead of your deployment, you can use the custom script extension to perform those tasks in Azure, or just put the script into your image on-prem.  There is one exception to this, and that's what we'll be talking about next.  
_Leverage Azure Automation Credential storage where possible_ - Passing credentials in as a parameter can cause all kinds of issues.

  * First and foremost, anyone that is building or deploying those configurations will know those credentials.
  * Second of all, it brings the possibility of someone tripping over the keyboard and entering a credential in improperly.

Allowing Azure Automation to tap the credential store during .mof compilation allows to credentials to stay in a secured bubble through the entire process.  To pass a credential from Azure Automation to your config, you need to modify the configuration.  Simply call Get-AutomationPSCredential to a variable inside your configuration, and then set that variable wherever those credentials are required.  Like so:


`$AdminCreds = Get-AutomationPSCredential -Name $AdminName
    Node ($AllNodes.Where{$_.Role -eq "WebServer"}).NodeName
    {
            JoinDomain DomainJoin
            {
                DependsOn = "[WindowsFeature]RemoveUI"
                DomainName = $DomainName
                Admincreds = $Admincreds
                RetryCount = 20
                RetryIntervalSec = 60
            }
    }
`Azure Automation under the covers will authenticate to the Credentials store with the RunAs account, and then pass those credentials as PSCredential to your DSC resource provider.  
_Stop Using localhost (or a specific computer name) as the Node Name_ - Azure Automation DSC allows you to use genericized, but meaningful names to configurations instead of just assigning things to localhost.  So now you can use webServer, or domainController, or something that describes the role instead of a machine name.  This makes it much easier to decide which configuration should go to what machine.  
![](https://powershell.org/wp-content/uploads/2017/09/roles-267x300.jpg)  
**Upload The Configuration**  
So much like in my previous series on Azure Automation and OMS, we're going to upload our DSC resources to our Automation Account's modules directory.  This requires getting the automation account, zipping up our local module files, sending them to a blob store, and importing those modules from the blob store.  I've sectioned out the code into different regions to better break it down for your own purposes.


`#region GetAutomationAccount
$AutoResGrp = Get-AzureRmResourceGroup -Name 'mms-eus'
$AutoAcct = Get-AzureRmAutomationAccount -ResourceGroupName $AutoResGrp.ResourceGroupName
#endregion
#region compress configurations
    Set-Location C:\Scripts\Presentations\AzureAutomationDSC\ResourcesToUpload
    $Modules = Get-ChildItem -Directory
    ForEach ($Mod in $Modules){
        Compress-Archive -Path $Mod.PSPath -DestinationPath ((Get-Location).Path + '\' + $Mod.Name + '.zip') -Force
    }
#endregion
#region Access blob container
$StorAcct = Get-AzureRmStorageAccount -ResourceGroupName $AutoAcct.ResourceGroupName
Add-AzureAccount
$AzureSubscription = ((Get-AzureSubscription).where({$PSItem.SubscriptionName -eq $Sub.Name}))
Select-AzureSubscription -SubscriptionName $AzureSubscription.SubscriptionName -Current
$StorKey = (Get-AzureRmStorageAccountKey -ResourceGroupName $StorAcct.ResourceGroupName -Name $StorAcct.StorageAccountName).where({$PSItem.KeyName -eq 'key1'})
$StorContext = New-AzureStorageContext -StorageAccountName $StorAcct.StorageAccountName -StorageAccountKey $StorKey.Value
$Container = Get-AzureStorageContainer -Name ('modules') -Context $StorContext
#endregion
#region upload zip files
$ModulesToUpload = Get-ChildItem -Filter "*.zip"
ForEach ($Mod in $ModulesToUpload){
        $Blob = Set-AzureStorageBlobContent -Context $StorContext -Container $Container.Name -File $Mod.FullName -Force
        New-AzureRmAutomationModule -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName -Name ($Mod.Name).Replace('.zip','') -ContentLink $Blob.ICloudBlob.Uri.AbsoluteUri
}
#endregion
`Once we've uploaded our files, we can monitor them to ensure that they've imported successfully via the UI, or by using the Get-AzureRmAutomationModule command.  
![](https://powershell.org/wp-content/uploads/2017/09/ModuleImport-300x109.jpg) 


`PS C:\Scripts\Presentations\AzureAutomationDSC\ResourcesToUpload> Get-AzureRmAutomationModule -Name LWINConfigs -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountNa
me
ResourceGroupName     : mms-eus
AutomationAccountName : testautoaccteastus2
Name                  : LWINConfigs
IsGlobal              : False
Version               : 1.0.0.0
SizeInBytes           : 5035
ActivityCount         : 1
CreationTime          : 9/13/2017 9:56:10 AM -04:00
LastModifiedTime      : 9/13/2017 9:57:26 AM -04:00
ProvisioningState     : Succeeded
`**Compile the Configuration**  
Once we've uploaded our modules, we can then upload and compile our configuration.  For this, we'll use the Import-AzureRmAutomationDscConfiguration command.  But before we do, there's two things to note when formatting a configuration for deployment to Azure Automation DSC.

  * The configuration name has to match the name of the configuration file.  So if your configuration is called SqlServerConfig, your config file has to be called SqlServerConfig.ps1.
  * The sourcepath parameter errors out with an 'invalid argument specified' error if you use a string path.  Instead, it works if you use (Get-Item).FullName

We'll be casting this command to a variable, as we'll be using it later on when we compile the configuration.  You'll also want to use the publish parameter to publish the configuration after importation, and if you're overwriting a configuration you'll want to leverage the force parameter.


`$Config = Import-AzureRmAutomationDscConfiguration -SourcePath (Get-Item C:\Scripts\Presentations\AzureAutomationDSC\TestConfig.ps1).FullName -AutomationAccountName $AutoAcct.AutomationAccountName -ResourceGroupName $AutoAcct.ResourceGroupName -Description DemoConfiguration -Published -Force
`![](https://powershell.org/wp-content/uploads/2017/09/ConfigPublished-300x97.jpg)  
Now that our configuration is published, we can compile it.  So let's add our parameters and configuration data:


`$Parameters = @{
            'DomainName' = 'lwinerd.local'
            'ResourceGroupName' = $AutoAcct.ResourceGroupName
            'AutomationAccountName' = $AutoAcct.AutomationAccountName
            'AdminName' = 'lwinadmin'
}
$ConfigData =
@{
    AllNodes =
    @(
        @{
            NodeName = "*"
            PSDscAllowPlainTextPassword = $true
        },
        @{
            NodeName     = "webServer"
            Role         = "WebServer"
        }
        @{
            NodeName = "domainController"
            Role = "domaincontroller"
        }
    )
}
`You'll notice that I have PSDscAllowPlainTextPassword set to true for all of my nodes.  This is to allow the PowerShell instance on the compilation node to compile the configuration with credentials being passed into it.  This PowerShell instance isn't aware that once the .mof is compiled, it is encrypted by Azure Automation before it's stored in the Automation Account.  
Now that we have our parameters and configuration data set, we can pass this to our Start-AzureRmAutomationDscCompilationJob command to kick off the .mof compilation.


`$DSCComp = Start-AzureRmAutomationDscCompilationJob -AutomationAccountName $AutoAcct.AutomationAccountName -ConfigurationName $Config.Name -ConfigurationData $ConfigData -Parameters $Parameters -ResourceGroupName $AutoAcct.ResourceGroupName
`And now we can use the Get-AzureRmAutomationDscCompilationJob command to check the status of the compilation, or check through the UI.


`Get-AzureRmAutomationDscCompilationJob -Id $DSCComp.Id -ResourceGroupName $AutoAcct.ResourceGroupName -AutomationAccountName $AutoAcct.AutomationAccountName
`The compilation itself can take up to around five minutes, so grab yourself a cup of coffee.  Once it returns as complete, we can get to registering our endpoints and delivering our configurations to them.  Join us next week as we do just that!  
![](https://powershell.org/wp-content/uploads/2017/09/CompComplete-300x161.jpg)
