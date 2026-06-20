---
title: "PSDepend"
description: "A PowerShell dependency handler. Declare your dependencies in a .psd1 file and let Invoke-PSDepend resolve, install, import, and test them."
layout: "module"
icon: "fas fa-sitemap"
logo: "/images/modules/psdepend.svg"
weight: 20
repo: "https://github.com/PowerShellOrg/PSDepend"
gallery: "https://www.powershellgallery.com/packages/PSDepend"
docs: "https://github.com/PowerShellOrg/PSDepend/blob/main/docs/en-US/about_PSDepend.help.md"
install:
  - label: "PowerShell 7+"
    command: "Install-PSResource PSDepend"
  - label: "PowerShell 5.1"
    command: "Install-Module PSDepend"
features:
  - icon: "fas fa-file-code"
    title: "Declarative DependencyFiles"
    body: "Declare every Dependency in a simple .psd1 file. Invoke-PSDepend finds your *.depend.psd1 and requirements.psd1 files automatically — think pip install -r or bundle install for PowerShell."
  - icon: "fas fa-plug"
    title: "Pluggable DependencyTypes"
    body: "Each Dependency picks a DependencyType — PSGalleryModule, Git, Chocolatey, FileDownload and more — that selects the DependencyScript handling it. Register your own to extend PSDepend."
  - icon: "fas fa-list-check"
    title: "Install, Test, or Import"
    body: "Run a DependencyFile with any combination of the Install, Test, and Import PSDependActions — verify an environment in CI, or hydrate one from scratch."
  - icon: "fas fa-tags"
    title: "Tag-based selection"
    body: "Tag your Dependencies and pass -Tags to Invoke-PSDepend to resolve just the subset you need for a given task or pipeline stage."
  - icon: "fas fa-diagram-project"
    title: "Ordered Prerequisites"
    body: "Express ordering constraints between Dependencies with DependsOn. PSDepend resolves them into topological order before anything is installed."
  - icon: "fas fa-bullseye"
    title: "Flexible Target"
    body: "Send a Dependency to a scope (CurrentUser, AllUsers) or any filesystem path via Target. The DependencyScript branches on whichever you give it."
cmdlets:
  - name: "Invoke-PSDepend"
    description: "The main entry point. Resolves a DependencyFile and installs, tests, and/or imports its Dependencies."
  - name: "Get-Dependency"
    description: "Parse a DependencyFile into typed Dependency objects without acting on them — handy for inspection and debugging."
  - name: "Get-PSDependType"
    description: "List the registered DependencyTypes and the DependencyScript each one maps to."
  - name: "Get-PSDependScript"
    description: "Resolve the DependencyScript that will handle a given DependencyType."
  - name: "Install-Dependency"
    description: "Run only the Install PSDependAction for a Dependency."
  - name: "Test-Dependency"
    description: "Run only the Test PSDependAction to check whether a Dependency is already satisfied."
---

## Declare your dependencies

Store your Dependencies in a PowerShell data file named `*.depend.psd1` or
`requirements.psd1`. The simplest form maps a module name to a version:

{{< terminal title="requirements.psd1" lang="powershell" >}}
@{
    psake        = 'latest'
    Pester       = 'latest'
    BuildHelpers = '0.0.20'
    PSDeploy     = '0.1.21'
}
{{< /terminal >}}

Then resolve everything in one call:

{{< terminal title="PowerShell" lang="powershell" >}}
Import-Module PSDepend
Invoke-PSDepend -Path .\requirements.psd1
{{< /terminal >}}

Need more control? Expand any entry into a full Dependency to set its
`DependencyType`, `Target`, `Tags`, or `DependsOn` ordering — and add a
`PSDependOptions` block to apply defaults across the whole DependencyFile.
