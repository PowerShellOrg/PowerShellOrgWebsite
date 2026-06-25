---
title: Learn To Use Verbose Output Streams In Your Pester Tests
authors:
  - Nathaniel Webb (ArtisanByteCrafter)
date: "2019-04-18T19:51:31+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tutorials
aliases:
  - /2019/04/learn-to-use-verbose-output-streams-in-your-pester-tests/
---

I'm going to file this under "Either I'm a genius, or there's a much better way and everyone knows it except for me."

I recently began adding a suite of Pester tests to one of my projects and I found myself needing to mock some unit tests against a particular function that would modify a variable based on the parameter specified. Since all the functions I write nowadays are considered advanced functions (and yours should be too, they're free!), I discovered a nice way to test the function's actions using the 


`-Verbose
`stream output.

> 

> Full source code for these examples is available on the Pester branch of my KaceSMA project [on GitHub](https://github.com/ArtisanByteCrafter/KaceSMA/tree/pester)
> 


## A Real World Example {.wp-block-heading}

I'm going to use a public function Get-SmaAsset for this example. For this particular function, I'm wrapping an API call and passing a specific endpoint as a string, determined by the parameter set(s) given. Here is the relevant bit of code:


`Begin {
    $Endpoint = '/api/asset/assets/'
    If ($AssetID) {
        $Endpoint = "/api/asset/assets/$AssetID/"
        If ($AsBarcodes) {
            $Endpoint = "/api/asset/assets/$AssetID/barcodes"
        }
    }
}
`We see 


`$Endpoint
`being dynamically defined according to the parameters fed to the parent 


`Get-SmaAsset
`function. I needed to ensure that the correct value of 


`$Endpoint
`was being fed to the next part of the chain, which was the 


`Invoke-RestMethod
`call to the API itself. The last thing I want to debug is why my API call is hitting the wrong endpoint. (Not to mention the potentially disastrous results when HTTP methods other than GET are used!) 

You don't need an intimate knowledge of the project to understand what's going on here - I'm really just wanting to make sure that this particular function only uses a single GET method, and that it calls the correct endpoint. An easy way to do this is by leveraging the verbose output stream to ensure that 


`Get-SmaAsset
`is in fact, seeking out the correct endpoint with the correct HTTP method.

Here's part of what the function returns when run verbosely under normal circumstances:


`PS> Get-SmaAsset -Server 'https://server.example.com' -Credential (Get-Credential) -Verbose
VERBOSE: Performing the operation "GET /api/asset/assets/" on target "https://server.example.com".
`## Plugging It Into Pester {.wp-block-heading}

Pester is the perfect tool to test that my API calls go out consistently every time, and to do so I just need to use the Verbose output stream, then mock some response data, and then I should get a pretty clear idea exactly what is going on within my function scope.

Let's see what the 'Backend Calls' context block looks like for this particular test:


`Context 'Backend Calls' {
    Mock New-ApiGetRequest { } -ModuleName KaceSMA
    Mock New-ApiPostRequest { } -ModuleName KaceSMA
    Mock New-ApiPutRequest { } -ModuleName KaceSMA
    Mock New-ApiDeleteRequest { } -ModuleName KaceSMA
    $MockCred = New-Object System.Management.Automation.PSCredential ('fooUser', (ConvertTo-SecureString 'bar' -AsPlainText -Force))
    $GenericParams = @{
        Server          = 'https://foo'
        Credential      = $MockCred
        Org             = 'Default'
        QueryParameters = "?paging=50"
    }
    $AssetIDParams = @{
        Server          = 'https://foo'
        Credential      = $MockCred
        Org             = 'Default'
        AssetID         = '1234'
        QueryParameters = "?paging=50"
    }
    $AsBarcodesParams = @{
        Server          = 'https://foo'
        Credential      = $MockCred
        Org             = 'Default'
        AssetID         = '1234'
        AsBarcodes      = $True
        QueryParameters = "?paging=50"
    }
    Get-SmaAsset @AssetIDParams
    It 'should call New-ApiGETRequest' {
        Assert-MockCalled -CommandName New-ApiGETRequest -ModuleName KaceSMA -Times 1
    }
    It 'should not call additional HTTP request methods' {
        $Methods = @('POST', 'DELETE', 'PUT')
        Foreach ($Method in $Methods) {
            Assert-MockCalled -CommandName ("New-Api$Method" + "Request") -ModuleName KaceSMA -Times 0
        }
    }
    It "should call generic endpoint if AssetID parameter is NOT specified" {
        $Generic = $(Get-SmaAsset @GenericParams -Verbose) 4>&1
        $Generic | Should -Be 'Performing the operation "GET /api/asset/assets" on target "https://foo".'
    }
    It "should call AssetID endpoint if AssetID parameter is specified" {
        $WithAssetID = $(Get-SmaAsset @AssetIDParams -Verbose) 4>&1
        $WithAssetID | Should -Be 'Performing the operation "GET /api/asset/assets/1234" on target "https://foo".'
    }
    It "should call AsBarcodes endpoint if AsBarcodes parameter is specified" {
        $AsBarcodes = $(Get-SmaAsset @AsBarcodesParams -Verbose) 4>&1
        $AsBarcodes | Should -Be 'Performing the operation "GET /api/asset/assets/1234/barcodes" on target "https://foo".'
    }
}
`Now, let's focus on a single test. This is where the 'cool' factor of output streams comes into play. $Generic performs a mocked call to our function, which has a curious bit at the end, 


`4>&1
`. 


`It "should call generic endpoint if AssetID parameter is NOT specified" {
        $Generic = $(Get-SmaAsset @GenericParams -Verbose) 4>&1
        $Generic | Should -Be 'Performing the operation "GET /api/asset/assets" on target "https://foo".'
    }
`What this does is take the verbose output stream (


`4
`) and redirect it to stdout (


`>&1
`) for our test to report on. The beauty of this is in it's simplicity. We don't have to modify anything in our code itself since it's an advanced function, and 


`-Verbose
`is included by default.

When we do this we get several key benefits. By explicitly stating the known-good verbose output in our tests, it would begin failing if any of these scenarios occurred in our codebase:


  - 
    If the endpoint is changed intentionally


  - 
    If the endpoint selection logic is flawed


  - 
    If the HTTP method declared is changed


  - 
    If the HTTP Method is ever used more than once



I hope this has been helpful in exploring how the verbose output stream can help detect stealthy bugs in your codebase.
