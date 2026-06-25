---
title: "Azure DevOps – Enable \"Allow scripts to access the OAuth token\" using PowerShell"
authors:
  - pwshliquori
date: "2019-04-20T23:20:30+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2019/04/azure-devops-enable-allow-scripts-to-access-the-oauth-token-using-powershell/
---

Azure DevOps allows us to run custom scripts to help our software and infrastructure get delivered quickly. There are times that the scripts run without an issue, however, sometimes there is a need to invoke the Azure DevOps Rest API in the release pipeline to get our scripts running. Sure, you can create a script invoking the API, authenticating with Azure DevOps with your personal access token and should work, but there is a better solution.

Allowing scripts to access the OAuth token authenticates the script with the 


`System.AccessToken
`variable, which runs as the Project Collection Build Service, a built-in service account in Azure DevOps. Today, we will be taking a look on how to enable this feature using PowerShell.

Since the feature needs to be enabled per release definition, the first item we need to find is the definitionId of the release definition. This can be found by using the Rest API or in the URL when clicking on the release definition in Azure DevOps. Since we are using PowerShell, let’s try it, but first, be sure to have your personal access token handy. The below commands are for my own blog organization, please substitute with your organization and project name. There will be a function provided at the end that parameterizes these values.


`$Params = @{
    Uri = "https://vsrm.dev.azure.com/pwshliquori-blog/blog/_apis/release/definitions/1?api-version=5.0"
    Headers = @{
        Authorization = "Basic $PersonalAccessToken"
    }
}
$Def = Invoke-RestMethod @Params
`Let’s take a look at the command:


  - 
    $Params: A hash table we will splat when we are ready to run the command.


  - 
    $Params.Uri: The components needed to get the release definitions.


  - 
    pwshliquori-blog: Organization name.


  - 
    blog: Project name.


  - 
    _apis: Standard for calling the rest API.


  - 
    release: The area of the API call.


  - 
    definitions: The resource of the API call.


  - 
    api-version=5.0: The latest version of the API.


  - 
    $Headers: Authorization header using your base 64 encoded personal access token.


  - 
    Invoke-RestMethod @Params: Invokes the Rest API splatting the $Params hashtable.



The command should return the release definition in the project with definitionId 1. Now we need to dig down and find the property needed to enable, in this case: “enableAccessToken.”

The "enableAccessToken" property is set to false by default, lets find and set it to true:


`$Def.environments.deployPhases.deploymentInput
parallelExecution         : @{parallelExecutionType=none}
skipArtifactsDownload     : False
artifactsDownloadInput    : @{downloadInputs=System.Object[]}
queueId                   : 3
demands                   : {}
enableAccessToken         : False
timeoutInMinutes          : 0
jobCancelTimeoutInMinutes : 1
condition                 : succeeded()
overrideInputs            :
$Def.environments.deployPhases.deploymentInput.enableAccessToken = $true
$Def.environments.deployPhases.deploymentInput
parallelExecution         : @{parallelExecutionType=none}
skipArtifactsDownload     : False
artifactsDownloadInput    : @{downloadInputs=System.Object[]}
queueId                   : 3
demands                   : {}
enableAccessToken         : True
timeoutInMinutes          : 0
jobCancelTimeoutInMinutes : 1
condition                 : succeeded()
overrideInputs            :
`Now that we set the “enableAccessToken” to true, we need to update the release definition with the changed value. To do this, we need to convert the $Def variable to JSON format and set the ContentType to application/json.


`$Body = ConvertTo-Json -InputObject $Def -Depth 10
$Params = @{
    Uri = "https://dev.azure.com/pwshliquori-blog/blog/_apis/release/definitions/1?api-version=5.0"
    Headers = @{
        Authorization = "Basic $ConvertToBase64"
    }
    Body = $Body
    ContentType = 'application/json
    Method = 'Put'
}
Invoke-RestMethod @Params
`The body needs to contain the entire release definition with the updated “enableAccessToken” property. After running the command, we can now utilize the 


`System.AccessToken
`to run scripts and processes using OAuth authentication that uses the Project Collection Build Service account. By using PowerShell, we can now turn the commands above into a function to automate the process of enabling this feature.


`function Enable-AzureDevOpsReleaseDefinitionOAuthToken {
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory,
            ValueFromPipeline,
            Position = 0)]
        [string]$OrganizationName,
        [Parameter(Mandatory,
            ValueFromPipeline,
            Position = 1)]
        [string]$ProjectName,
        [Parameter(Mandatory,
            Position = 2)]
        [string]$ReleaseDefinitionId,
        [Parameter(Position = 3)]
        [string]$PersonalAccessToken
    )
    Begin {
        $BasicAuth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f '', $PersonalAccessToken)))
    }
    Process {
        Try {
            $Params = @{
                Uri = "https://vsrm.dev.azure.com/$OrganizationName/$ProjectName/_apis/release/definitions/$($ReleaseDefinitionId)?api-version=5.0"
                Headers = @{
                    Authorization = "Basic $BasicAuth"
                }
            }
            $ReleaseDefinition = Invoke-RestMethod @Params
            $ReleaseDefinition.environments |ForEach-Object {
                $_.deployPhases.deploymentinput.enableAccessToken = $true
            }
            $JsonObject = foreach ($Definition in $ReleaseDefinition) {
                ConvertTo-Json -InputObject $Definition -Depth 10
            }
            $Params.Method = 'Put'
            $Params.ContentType = 'application/json'
            foreach ($Json in $JsonObject) {
                $Params.Body = $Json
                Invoke-RestMethod @Params
            }
        }
        Catch {
            throw $_
        }
    }
}
`The function will enable the OAuth token for all environments in the given release definition, which gives us the option to use the 


`System.AccessToken
`variable. This is handy when we want to run custom scripts without using our own personal access token. Another example is if we needed to create an annotated tag for a release and need to use the Build Service Account to tag the release instead of a release administrators personal access token. 

For purposes of this post, I have provided one function, but this should be split into two separate functions. One function to get the release definition, and then next to enable the OAuth token, taking an 


`InputObject
`parameter. As the legendary Don Jones states "A function is a tool that should do one thing really well."



To find more information on using the Rest API, visit Microsoft documentation on the Azure DevOps Rest API.  

[https://docs.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-5.0](https://docs.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-5.0)

pwshliquori
