---
title: "Validate Azure Resource Relationships with PSRule and PowerShell Graphs"
description: "Learn how to combine PSRule for Azure with PSQuickGraph to validate relationships that span multiple Bicep resources, such as VNet integration and private endpoint connectivity."
author: eosfor
authors:
  - eosfor
date: 2026-07-24T00:00:00+00:00
categories:
  - DevOps
tags:
  - psrule
  - azure
  - bicep
  - graph
  - infrastructure-as-code
---

PSRule for Azure makes it straightforward to validate the properties of individual
resources before deployment. But some architecture requirements describe a
relationship, not a property: every Function App must connect to the expected virtual
network, or every application must have exactly one private endpoint.

This article shows how to collect those relationships in a PowerShell graph while
PSRule processes a Bicep deployment, then validate the completed graph at the end of
the pipeline.

## Why per-resource rules are not enough

Consider an architecture with a Function App, a virtual network, an integration
subnet, and a private endpoint subnet. We can easily write rules that check:

- whether the Function App has public access disabled;
- whether the virtual network uses the correct address space;
- whether the expected subnets exist.

Those checks still do not prove that the Function App is connected to the correct
subnet or that its private endpoint belongs to the expected virtual network. The
required information is spread across several expanded ARM resources.

A graph is a natural representation of this problem:

- resources and subnets become vertices;
- references between them become edges;
- an architecture requirement becomes a path or edge-count assertion.

## Prepare PSRule and the graph module

The example uses
[PSRule.Rules.Azure](https://github.com/Azure/PSRule.Rules.Azure) to expand and
analyze Bicep and
[PSQuickGraph](https://github.com/eosfor/PSGraph) to build the dependency graph.

```powershell
Install-Module -Name PSRule.Rules.Azure -Scope CurrentUser
Install-Module -Name PSQuickGraph -Scope CurrentUser

Import-Module PSQuickGraph
```

In `ps-rule.yaml`, enable Bicep expansion and include the convention that will collect
relationships:

```yaml
include:
  module:
    - PSRule.Rules.Azure
    - PSQuickGraph

convention:
  include:
    - FullConnectivityTest

configuration:
  AZURE_BICEP_FILE_EXPANSION: true
```

## Collect relationships with a convention

A PSRule
[convention](https://microsoft.github.io/PSRule/v2/concepts/PSRule/en-US/about_PSRule_Conventions/)
can run custom PowerShell at different stages of the pipeline. Its `Process` block
runs once for each input object, while its `End` block runs after all objects have
been processed.

That lifecycle gives us a convenient two-phase approach:

1. Add every relevant resource and relationship to a graph.
2. Validate the graph only after the complete deployment has been seen.

The following is a simplified version of the convention. The example uses
child-to-parent edges so a valid dependency chain ends at the virtual network.

```powershell
$global:vnetId = $null
$global:webSites = @()
$global:connectionGraph = New-Graph
$global:privateEndpointGraph = New-Graph

Export-PSRuleConvention 'FullConnectivityTest' -Process {
    if ($TargetObject.Type -eq 'Microsoft.Network/virtualNetworks') {
        $global:vnetId = $TargetObject.Id

        foreach ($subnetResource in $TargetObject.Resources) {
            Add-Edge `
                -From $subnetResource.Id `
                -To $TargetObject.Id `
                -Graph $global:connectionGraph

            Add-Edge `
                -From $subnetResource.Id `
                -To $TargetObject.Id `
                -Graph $global:privateEndpointGraph
        }
    }

    if ($TargetObject.Type -eq 'Microsoft.Web/sites') {
        $vnetIntegration = $TargetObject.Resources |
            Where-Object Type -eq 'Microsoft.Web/sites/networkConfig'

        $global:webSites += $TargetObject.Id

        Add-Edge `
            -From $TargetObject.Id `
            -To $vnetIntegration.Properties.SubnetResourceId `
            -Graph $global:connectionGraph
    }

    if ($TargetObject.Type -eq 'Microsoft.Network/privateEndpoints') {
        Add-Edge `
            -From $TargetObject.Id `
            -To $TargetObject.Properties.Subnet.Id `
            -Graph $global:privateEndpointGraph

        foreach ($connection in $TargetObject.Properties.PrivateLinkServiceConnections) {
            Add-Edge `
                -From $connection.Properties.PrivateLinkServiceId `
                -To $TargetObject.Id `
                -Graph $global:privateEndpointGraph
        }
    }
} -End {
    # The completed graphs are validated here.
}
```

The sample uses global variables because the state must remain available across
PSRule callback invocations. In a larger rule set, wrap this state in a single object
and reset it before each run.

## Validate complete dependency paths

Once PSRule reaches the `End` block, every relevant Bicep resource has been expanded
and processed. We can now ask questions about the deployment as a whole.

For example, the following check confirms that every Function App has a VNet
integration path:

```powershell
foreach ($webApp in $global:webSites) {
    $path = Get-GraphPath `
        -From $webApp `
        -To $global:vnetId `
        -Graph $global:connectionGraph

    if ($null -eq $path) {
        throw "No VNet integration path was found for Function App: $webApp"
    }
}
```

We can apply the same idea to private endpoint connectivity:

```powershell
foreach ($webApp in $global:webSites) {
    $path = Get-GraphPath `
        -From $webApp `
        -To $global:vnetId `
        -Graph $global:privateEndpointGraph

    if ($null -eq $path) {
        throw "No private endpoint path was found for Function App: $webApp"
    }
}
```

Throwing from the `End` block causes the validation run to fail. This works well in
CI, although it does not produce the same detailed assertion output as a normal
PSRule `Rule` block.

Run the rules against the Bicep entry point with:

```powershell
Invoke-PSRule -Format File -InputPath ./deployments/non-prod/main.bicep
```

## Export the graph for troubleshooting

The same model used for validation can produce a diagram. This is particularly
helpful when a CI check reports a missing path and you need to see which relationship
was absent. PSQuickGraph can export the graph in Graphviz DOT format; the
[Graphviz](https://graphviz.org/download/) `dot` executable can then render it as SVG.

```powershell
Export-Graph `
    -Graph $global:privateEndpointGraph `
    -Format Graphviz `
    -Path ./output/private-endpoints.dot

& dot `
    -Tsvg ./output/private-endpoints.dot `
    -o ./output/private-endpoints.svg
```

![An Azure Function App connected through a private endpoint and subnet to a virtual network](/images/articles/psrule-azure-resource-relationships.svg)

This separates the solution into three clear steps:

1. PSRule expands Bicep into resource objects.
2. A convention converts cross-resource references into graph edges.
3. Graph queries validate the architecture after all resources are available.

The result complements normal per-resource rules instead of replacing them. Use
regular PSRule assertions for local properties and graph assertions for requirements
that span the deployment.

A complete Bicep project, PSRule configuration, architecture document, and runnable
Codespaces environment are available in the
[psrule-demo repository](https://github.com/eosfor/psrule-demo).
