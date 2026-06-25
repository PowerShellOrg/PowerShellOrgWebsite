---
title: Universal Dashboard Templates – Scaffolding a New UD Project with Powershell
authors:
  - Nathaniel Webb (ArtisanByteCrafter)
date: "2019-06-14T15:28:58+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2019/06/universal-dashboard-templates-scaffolding-a-new-ud-project-with-powershell/
---

_All code from this article is freely available on Github as a template repository. Just click "Use this template" on the repository page here:_


  https://github.com/ArtisanByteCrafter/ud-template



## Index {.wp-block-heading}


  - 
    [What are the advantages of project scaffolding](the-why)


  - 
    [How does ud-template work](the-how)



## The Why {.wp-block-heading}

Why should you consider scaffolding a new project? While we're here, what exactly is scaffolding? Much like the term's origin a project scaffold is meant to build a consistent framework and design that you can use to build your projects with.

If you've used products like Visual Studio, you're already familiar with scaffolding when you choose to begin a "New Project". The IDE will auto-generate commonly used files and folder structures for the language you're writing in.

I'm taking this same approach with my ud-template utility. By simply running the included 


`New-UDProject
`script with a single parameter 


`-ProjectName 'myProject'
`we invoke all the necessary steps to create a running dashboard with some pretty handy features already enabled.

Let's take a look at what we get and how it works.

## The How {.wp-block-heading}

![Imgur](https://i.imgur.com/y7nBe0G.gif)  


`New-UDProject -ProjectName 'myProject'
`is the only command you need to run in order to create a new project framework for UD. It performs several things on your behalf:

**Creating the module**

We start by creating a module for our dashboard. We're going to use this module along with some boilerplate code in the .psm1 file to automatically import and source our functions. 

It's definitely possible to import functions into all runspaces without a module using a 


`New-EndpointInitialization
`declaration in the 


`dashboard.ps1
`but I find this get's unwieldy very quickly on more robust projects, so I prefer each function in it's own file in a standard location, 


`/src
`.

**Creating the file/folder structure**

The basic strucutre of our project is laid out as follows:


`│   dashboard.ps1
│   dbconfig.json
│   New-UDProject.ps1
│   README.md
│
├───assets
├───pages
│       home.ps1
│
├───src
└───themes
        SampleTheme.ps1
`- 
    Functions



Every function we want to declare will be in it's own 


`function.ps1
`file in the 


`/src
`folder, which our module will pick up and dot-source for all runspaces. This means every function should automatically be available for use in every script block of our dashboard.


  - 
    Pages



I like to keep every page of my dashboard in it's own 


`page.ps1
`file in 


`/pages
`. Every file in this directory will be appended automatically to our dashboard and available from the navigation menu. a home page is included by default.


  - 
    Themes



Similar to functions, every theme should be in it's own .ps1 file in 


`/themes
`and will be sourced for the dashboard. Note, only a single theme can be used at a time, as this is the design of Universal Dashboard. By default, the dark-themed 


`SampleTheme.ps1
`is enabled, as seen in the screenshot above.


  - 
    Dashboard Configuration



I love json. It's ok if you don't but you're wrong and you should feel bad <3 that's fine. For this project however, I'm using a very simple json configuration to keep track of the project name, root module, and port our dashboard is running on. This is auto-generated from 


`New-UDProject
`when you run it the first time. I'm sure this will evolve to include more aspects of my dashboards in the future.

> 

> If you're considering storing any form of credential in your json file…don't. Please. Think of the kittens. There are excellent ways to deal with [authentication requests in code](https://github.com/ArtisanByteCrafter/KaceSMA/wiki/FAQ#q-i-want-to-run-my-api-script-in-an-automated-fashion-can-i-store-credentials-to-use-rather-than-being-prompted).
> 


  - 
    Assets



Assets are anything that needs to be included with your project and don't have another home- for example, fonts or images. This empty folder is created by 


`New-UDProject
`as well.


  - 
    Running the dashboard



The last aspect i want to cover is how this project runs the dashboard. Our 


`dashboard.ps1
`covers several areas.

Import our config file


`$ConfigurationFile = Get-Content (Join-Path $PSScriptRoot dbconfig.json) | ConvertFrom-Json
`Import our module we created


`Try {
    Import-Module (Join-Path $PSScriptRoot $ConfigurationFile.dashboard.rootmodule) -ErrorAction Stop
} Catch {
    Write-Warning "Valid function module not found. Generate one by running $(Join-Path $PSScriptRoot New-UDProject.ps1) -ProjectName 'myProject'"
    break;
}
`Source our themes folder


`. (Join-Path $PSScriptRoot "themes\*.ps1")
`Generate our pages


`$PageFolder = Get-ChildItem (Join-Path $PSScriptRoot pages)
$Pages = Foreach ($Page in $PageFolder){
    . (Join-Path $PSScriptRoot "pages\$Page")
}
`Auto-import our module, and thus our functions in /src


`$Initialization = New-UDEndpointInitialization -Module @(Join-Path $PSScriptRoot $ConfigurationFile.dashboard.rootmodule)
`Start our dashboard


`$DashboardParams=@{
    Title = $ConfigurationFile.dashboard.title
    Theme = $SampleTheme
    Pages = $Pages
    EndpointInitialization = $Initialization
}
$MyDashboard = New-UDDashboard @DashboardParams
Start-UDDashboard -Port $ConfigurationFile.dashboard.port -Dashboard $MyDashboard -Name $ConfigurationFile.dashboard.title
`This project is completely open source and I always like to hear feedback, or even a pull request for something you think is neat.

Happy dashboarding!

Nate

This is a cross-post of the original blog post on my personal blog here: [https://www.natelab.us/universal-dashboard-templates-scaffolding-a-new-ud-project-with-powershell][1]

 [1]: https://www.natelab.us/universal-dashboard-templates-scaffolding-a-new-ud-project-with-powershell/
