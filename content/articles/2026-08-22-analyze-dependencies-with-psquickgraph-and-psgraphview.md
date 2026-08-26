---
title: "Analyze Dependencies with PSQuickGraph and PSGraphView"
description: "Build a dependency graph from PowerShell objects, trace paths and blast radius, calculate a safe deployment order, and render the same model as diagrams and a design structure matrix."
author: Andrey Vernigora
authors:
  - Andrey Vernigora
date: 2026-08-22T00:00:00+00:00
categories:
  - Graph
tags:
  - powershell
  - psquickgraph
  - psgraphview
  - dependency-graphs
  - graphviz
---

PowerShell is excellent at collecting objects. The harder question often comes
one step later: how are those objects related?

A table can tell us that an Orders API uses a database, a message broker, and a
vault. It is much less useful when we need to answer questions such as:

- What will be affected if Azure Service Bus is unavailable?
- Why does the customer-facing application depend on Key Vault?
- In what order should the platform be deployed or migrated?
- Where are the cycles and tightly coupled groups when the model grows?

Those are graph questions. [PSGraph](https://github.com/eosfor/PSGraph) provides
the graph model and algorithms through the `PSQuickGraph` PowerShell module. The
sibling [PSGraphView](https://github.com/eosfor/PSGraphView) module renders those
models as Graphviz, Vega, MSAGL, and design structure matrix views.

This article builds one small platform model and uses it for several jobs. The
point is not the fictional architecture. The point is that the same native
PowerShell objects can support automation, analysis, and documentation without
maintaining three separate models.

## Two modules with different jobs

The naming is worth explaining before installing anything:

| Name | Responsibility |
| --- | --- |
| `PSGraph` | The project and GitHub repository. |
| `PSQuickGraph` | The installable module for graph objects, algorithms, GraphML, Graphviz/DOT export, and DSM analysis. |
| `PSGraphView` | The installable visualization module for Graphviz, Vega, MSAGL, and DSM output. |

`PSQuickGraph` is not the Microsoft Graph API, and it is not the older Graphviz
DSL module named `PSGraph`. Its focus is an object graph that can be queried and
passed through PowerShell pipelines.

The examples below use the current prerelease pair because the renderer split is
new. Pinning the versions makes the article reproducible:

```powershell
Install-PSResource `
    -Name PSQuickGraph `
    -Version 2.6.0-beta1 `
    -Prerelease `
    -Scope CurrentUser

Install-PSResource `
    -Name PSGraphView `
    -Version 0.2.0-beta1 `
    -Prerelease `
    -Scope CurrentUser

Import-Module PSQuickGraph -RequiredVersion 2.6.0
Import-Module PSGraphView -RequiredVersion 0.2.0
```

If you only need graph construction and algorithms, `PSGraphView` is optional.

## Model a platform with ordinary objects

The sample inventory contains applications, services, workers, shared platform
services, databases, and observability. There is no required vertex class in the
calling code; each item is a normal `PSCustomObject`:

```powershell
$services = @(
    [pscustomobject]@{ Name = 'Customer Portal';      Kind = 'Application';   Team = 'Experience' }
    [pscustomobject]@{ Name = 'Admin Portal';         Kind = 'Application';   Team = 'Operations' }
    [pscustomobject]@{ Name = 'Orders API';           Kind = 'Service';       Team = 'Orders' }
    [pscustomobject]@{ Name = 'Inventory API';        Kind = 'Service';       Team = 'Inventory' }
    [pscustomobject]@{ Name = 'Billing Worker';       Kind = 'Worker';        Team = 'Billing' }
    [pscustomobject]@{ Name = 'Notification Worker';  Kind = 'Worker';        Team = 'Experience' }
    [pscustomobject]@{ Name = 'Azure Service Bus';    Kind = 'Platform';      Team = 'Platform' }
    [pscustomobject]@{ Name = 'Orders DB';            Kind = 'Data';          Team = 'Orders' }
    [pscustomobject]@{ Name = 'Inventory DB';         Kind = 'Data';          Team = 'Inventory' }
    [pscustomobject]@{ Name = 'Billing DB';           Kind = 'Data';          Team = 'Billing' }
    [pscustomobject]@{ Name = 'Key Vault';            Kind = 'Platform';      Team = 'Platform' }
    [pscustomobject]@{ Name = 'Application Insights'; Kind = 'Observability'; Team = 'Platform' }
)
```

Dependencies are data too. In this model an edge points from a consumer to its
dependency: `Orders API -> Orders DB` means that the API depends on the database.

```powershell
$dependencies = @(
    [pscustomobject]@{ From = 'Customer Portal';     To = 'Orders API';           Reason = 'HTTPS' }
    [pscustomobject]@{ From = 'Customer Portal';     To = 'Inventory API';        Reason = 'HTTPS' }
    [pscustomobject]@{ From = 'Admin Portal';        To = 'Orders API';           Reason = 'HTTPS' }
    [pscustomobject]@{ From = 'Admin Portal';        To = 'Inventory API';        Reason = 'HTTPS' }
    [pscustomobject]@{ From = 'Orders API';          To = 'Orders DB';            Reason = 'SQL' }
    [pscustomobject]@{ From = 'Orders API';          To = 'Inventory API';        Reason = 'HTTPS' }
    [pscustomobject]@{ From = 'Orders API';          To = 'Azure Service Bus';    Reason = 'AMQP' }
    [pscustomobject]@{ From = 'Orders API';          To = 'Key Vault';            Reason = 'Secrets' }
    [pscustomobject]@{ From = 'Inventory API';       To = 'Inventory DB';         Reason = 'SQL' }
    [pscustomobject]@{ From = 'Inventory API';       To = 'Key Vault';            Reason = 'Secrets' }
    [pscustomobject]@{ From = 'Billing Worker';      To = 'Azure Service Bus';    Reason = 'AMQP' }
    [pscustomobject]@{ From = 'Billing Worker';      To = 'Billing DB';           Reason = 'SQL' }
    [pscustomobject]@{ From = 'Billing Worker';      To = 'Key Vault';            Reason = 'Secrets' }
    [pscustomobject]@{ From = 'Notification Worker'; To = 'Azure Service Bus';    Reason = 'AMQP' }
    [pscustomobject]@{ From = 'Notification Worker'; To = 'Key Vault';            Reason = 'Secrets' }
    [pscustomobject]@{ From = 'Customer Portal';     To = 'Application Insights'; Reason = 'Telemetry' }
    [pscustomobject]@{ From = 'Admin Portal';        To = 'Application Insights'; Reason = 'Telemetry' }
    [pscustomobject]@{ From = 'Orders API';          To = 'Application Insights'; Reason = 'Telemetry' }
    [pscustomobject]@{ From = 'Inventory API';       To = 'Application Insights'; Reason = 'Telemetry' }
    [pscustomobject]@{ From = 'Billing Worker';      To = 'Application Insights'; Reason = 'Telemetry' }
    [pscustomobject]@{ From = 'Notification Worker'; To = 'Application Insights'; Reason = 'Telemetry' }
)
```

Build the graph in two passes. Explicitly adding vertices preserves isolated
services; adding only edges would omit objects that currently have no
relationships.

```powershell
$serviceByName = @{}
$graph = New-Graph

foreach ($service in $services) {
    $serviceByName[$service.Name] = $service
    $vertex = Add-Vertex -Graph $graph -Vertex $service -PassThru
    $vertex.Metadata |
        Add-Member -NotePropertyName Team -NotePropertyValue $service.Team
}

foreach ($dependency in $dependencies) {
    Add-Edge `
        -Graph $graph `
        -From $serviceByName[$dependency.From] `
        -To $serviceByName[$dependency.To] `
        -Tag $dependency.Reason |
        Out-Null
}
```

The sample graph contains 12 vertices and 21 directed edges. The wrapper vertex
retains the original object in `OriginalObject`, so analysis results can return
to normal PowerShell processing at any time.

## First view: the dependency map

`PSQuickGraph` exports the model as DOT; `PSGraphView` asks Graphviz to lay it out
and return SVG. Keeping these steps separate is useful: algorithms can run on a
server that never renders an image, while a documentation build can apply its
own visual style.

```powershell
$dot = Export-Graph `
    -Graph $graph `
    -Format Graphviz `
    -GraphScript { @{ rankdir = 'LR'; bgcolor = 'white' } } `
    -VertexScript {
        @{
            shape = 'Record'
            style = 'filled'
            label = "{{ {0} | {1} }}" -f $_.Name, $_.Kind
        }
    }

Export-GraphvizView `
    -InputObject $dot `
    -Renderer Dot `
    -As Svg `
    -OutputPath ./platform-dependencies.svg
```

![A consumer-to-dependency graph of the sample platform. Each record shows the component name and kind.](/images/articles/psgraphview-platform-dependencies.svg)

A drawing is already useful for a design review, but the graph becomes more
valuable when it answers operational questions.

## Immediate dependencies and dependents

Because the edge direction is explicit, outgoing and incoming edges answer two
different questions:

```powershell
$orders = $graph.Vertices | Where-Object Label -EQ 'Orders API'

# What does Orders API require?
Get-OutEdge -Graph $graph -Vertex $orders |
    ForEach-Object { $_.Target.OriginalObject }

# What calls Orders API directly?
Get-InEdge -Graph $graph -Vertex $orders |
    ForEach-Object { $_.Source.OriginalObject }
```

The result is still the inventory object, not display text. It can be grouped by
team, joined with ownership data, exported to CSV, or used to open incidents.

## Explain a dependency with a path

Knowing that two components are connected is not always enough. `Get-GraphPath`
returns the edge sequence that explains the relationship:

```powershell
$from = $graph.Vertices | Where-Object Label -EQ 'Customer Portal'
$to = $graph.Vertices | Where-Object Label -EQ 'Key Vault'

$path = Get-GraphPath -Graph $graph -From $from -To $to

@($path.Source.Label) + $path[-1].Target.Label
```

For this model the result is:

```text
Customer Portal -> Orders API -> Key Vault
```

This is useful in change reviews and incident response because it provides an
explanation, not just a Boolean answer.

## Calculate blast radius

Suppose Azure Service Bus is unavailable. Every vertex that can reach it through
consumer-to-dependency edges is transitively affected:

```powershell
$serviceBus = $graph.Vertices |
    Where-Object Label -EQ 'Azure Service Bus'

$affected = $graph.Vertices |
    Where-Object Label -NE $serviceBus.Label |
    Where-Object {
        Test-GraphPath -Graph $graph -From $_ -To $serviceBus
    } |
    Sort-Object Label

$affected.OriginalObject
```

![Azure Service Bus and every direct or transitive consumer are marked with a bold border and a warning marker.](/images/articles/psgraphview-service-bus-impact.svg)

The result includes both direct consumers and applications affected indirectly:

```text
Admin Portal
Billing Worker
Customer Portal
Notification Worker
Orders API
```

`Get-InEdge` finds immediate consumers. `Test-GraphPath` also finds portals that
depend on Service Bus indirectly through Orders API.

## Derive a deployment order

The same graph can become an execution plan. With consumer-to-dependency edges,
reversing the topological order puts dependencies before their consumers:

```powershell
$deploymentOrder = Get-GraphTopologicalSort `
    -Graph $graph `
    -Reverse

$deploymentOrder |
    Select-Object -ExpandProperty OriginalObject |
    Select-Object Name, Kind, Team
```

The result starts with shared dependencies and ends with applications:

```text
Azure Service Bus
Orders DB
Key Vault
Inventory DB
Billing DB
Application Insights
Inventory API
Billing Worker
Orders API
Notification Worker
Customer Portal
Admin Portal
```

Topological sorting is appropriate only for a directed acyclic graph. If two
services depend on each other, the sort fails rather than inventing a safe
order. That failure is useful evidence: the cycle needs an explicit migration
strategy or an architectural change.

## When a node-link diagram becomes too dense

Arrows work well for a dozen components. They become a hairball for a hundred. A
design structure matrix (DSM) represents the same edges as cells: the row is the
consumer and the column is its dependency.

`PSQuickGraph` creates and sequences the matrix; `PSGraphView` renders it:

```powershell
$dsm = New-DSM -Graph $graph
$sequencedDsm = Start-DSMSequencing `
    -Dsm $dsm `
    -LoopDetectionMethod Condensation

Export-DSMView `
    -SequencedDsm $sequencedDsm `
    -Renderer DsmVegaMatrix `
    -As Json `
    -Path ./dependency-matrix.json
```

![A sequenced design structure matrix of the same platform. Filled cells map consumers to dependencies without crossing edges.](/images/articles/psgraphview-dependency-matrix.svg)

The Vega renderer produces an interactive matrix whose row and column labels can
be highlighted on hover. The static image above uses the same Vega specification
for the article page. For larger models, `Start-DSMClustering` can group strongly
related components before rendering. That makes the matrix useful for finding
candidate service boundaries, not merely documenting the current state.

## Other scenarios for the same pattern

Only the data collection step changes between domains. The graph workflow
remains: collect objects, create stable vertices, add directed relationships,
ask questions, then choose a view.

- **Security events:** connect processes, users, hosts, files, and network
  destinations to reconstruct a suspicious chain.
- **Network policy:** turn accepted and rejected firewall flows into host and
  port relationships.
- **Infrastructure as code:** model semantic Bicep dependencies and validate
  cross-resource relationships, as shown in
  [Validate Azure Resource Relationships with PSRule and PowerShell Graphs](/articles/2026-07-24-validate-azure-resource-relationships-with-psrule-and-powershell-graphs/).
- **Web diagnostics:** connect pages to scripts, APIs, and third-party origins
  discovered through Chrome DevTools Protocol.
- **Execution graphs:** use topological order to evaluate a computation graph,
  as shown in
  [Explore Micrograd with Verso and PowerShell](/articles/2026-07-24-explore-micrograd-with-verso-and-powershell/).

These examples look different on screen, but the useful questions are the same:
what depends on this, how did we get there, what order is valid, and where is the
system too tightly coupled?

## Takeaways

`PSQuickGraph` is most useful when a diagram is not the final product. The graph
can drive impact reports, validation, deployment ordering, and incident
analysis. `PSGraphView` then turns that same tested model into the representation
that fits the audience: a familiar node-link diagram, an interactive view, or a
dense DSM.

The practical pattern is small:

1. Keep vertices as domain objects with stable names or IDs.
2. Decide and document the edge direction.
3. Use algorithms before reaching for visualization.
4. Render from the same model instead of maintaining diagrams by hand.

Once relationships become first-class data, PowerShell can do much more than
draw boxes and arrows.
