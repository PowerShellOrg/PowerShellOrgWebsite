---
title: "Find Free Azure CIDR Blocks with PowerShell"
description: "Turn an Azure address-space plan into correctly aligned CIDR blocks, discover gaps between existing virtual networks, and allocate several new ranges without overlap."
author: Andrey Vernigora
authors:
  - Andrey Vernigora
date: 2026-07-24T00:00:00+00:00
categories:
  - PowerShell for Admins
tags:
  - azure
  - networking
  - cidr
  - ipam
  - automation
---

Suppose the network team assigns `10.172.0.0/16` to an Azure landing zone. You
need to divide it into correctly aligned virtual network and subnet ranges, then find
space for future networks without overlapping anything already deployed.

This article uses PowerShell to perform both tasks: break a parent range into planned
CIDR blocks and find free blocks around an existing allocation.

## A small module for CIDR calculations

[ipmgmt](https://www.powershellgallery.com/packages/ipmgmt/0.1.18) is a small
open-source PowerShell module I maintain. It contains two commands:

- `Get-VLSMBreakdown` divides a parent network into requested subnet sizes;
- `Get-IPRanges` finds free blocks of a requested CIDR size around occupied ranges.

Install and inspect the current version:

```powershell
Install-Module -Name ipmgmt -RequiredVersion 0.1.18 -Scope CurrentUser
Import-Module ipmgmt

Get-Command -Module ipmgmt
```

```text
CommandType Name              Version Source
----------- ----              ------- ------
Function    Get-IPRanges      0.1.18  ipmgmt
Function    Get-VLSMBreakdown 0.1.18  ipmgmt
```

## Divide an address space with VLSM

CIDR notation is less ambiguous than expressing a subnet as a number of usable
addresses, so define the plan with a name and prefix length:

```powershell
$subnetPlan = @(
    @{ type = 'GatewaySubnet';       cidr = 27 }
    @{ type = 'AzureFirewallSubnet'; cidr = 26 }
    @{ type = 'application';         cidr = 24 }
    @{ type = 'private-endpoints';   cidr = 25 }
)

$breakdown = Get-VLSMBreakdown `
    -Network '10.172.0.0/16' `
    -SubnetSizeCidr $subnetPlan

$breakdown |
    Where-Object type -ne 'reserved' |
    Select-Object type,
        @{ Name = 'CIDR'; Expression = { "$($_.Network)/$($_.Cidr)" } },
        Total,
        Usable
```

The requested blocks are aligned and do not overlap:

```text
type                CIDR            Total Usable
----                ----            ----- ------
GatewaySubnet       10.172.1.192/27    32     30
AzureFirewallSubnet 10.172.1.128/26    64     62
private-endpoints   10.172.1.0/25     128    126
application         10.172.0.0/24     256    254
```

The command also returns the unused portions of the parent network with their `Type`
set to `reserved`. Those blocks can be kept for later allocations.

### Azure usable addresses are different

The `Usable` property in this output is the conventional IP-network value: total
addresses minus the network and broadcast addresses. It is not the number of
addresses Azure can assign to resources.

[Azure reserves five addresses in every subnet](https://learn.microsoft.com/azure/networking/design-guide/vnets-subnets):
the first four and the last address. A `/24` therefore has 251 Azure-assignable
addresses, not 254. Always apply Azure service requirements and reservations when
sizing a subnet; use the module to calculate block boundaries, not service capacity.

## Find a free block

Now assume that two `/24` ranges are already occupied and a new workload needs a
`/22`:

```powershell
$result = Get-IPRanges `
    -Networks '10.172.0.0/24', '10.172.1.0/24' `
    -CIDR 22 `
    -BaseNet '10.172.0.0/16'

$result |
    Where-Object IsFree |
    Select-Object -First 1 Network, Cidr, IsFree
```

```text
Network    Cidr IsFree
-------    ---- ------
10.172.4.0   22   True
```

The command returns the occupied ranges with `IsFree` set to `$false` and matching
free candidates with `IsFree` set to `$true`. Selecting the first free candidate
gives us `10.172.4.0/22`.

## Use Azure as one source of occupied ranges

Instead of maintaining the list by hand, retrieve VNet address spaces with the
Az.Network module:

```powershell
Connect-AzAccount

$existingRanges = Get-AzVirtualNetwork |
    ForEach-Object { $_.AddressSpace.AddressPrefixes } |
    Sort-Object -Unique

$existingRanges
```

If you work across several subscriptions, select each context and aggregate its
ranges before calculating. Azure is also not necessarily the complete source of
truth: include connected on-premises networks, peered environments, reservations in
an external IPAM system, and ranges assigned to work that has not been deployed yet.

`Get-IPRanges` only knows about the occupied ranges you pass to it.

## Allocate several blocks in one run

When several new VNets are needed, add each proposed range to the occupied list
before calculating the next one:

```powershell
$baseNetwork = '10.172.0.0/16'
$requestedCidrs = 23, 24, 24, 25

$occupied = [System.Collections.Generic.List[string]]::new()
$occupied.Add('10.172.0.0/24')
$occupied.Add('10.172.1.0/24')

$allocations = foreach ($cidr in $requestedCidrs) {
    $candidate = Get-IPRanges `
        -Networks $occupied `
        -CIDR $cidr `
        -BaseNet $baseNetwork |
        Where-Object IsFree |
        Select-Object -First 1

    if ($null -eq $candidate) {
        throw "No free /$cidr range remains in $baseNetwork."
    }

    $range = "$($candidate.Network)/$($candidate.Cidr)"
    $occupied.Add($range)

    [PSCustomObject]@{
        CIDR  = $cidr
        Range = $range
    }
}

$allocations
```

```text
CIDR Range
---- -----
  23 10.172.2.0/23
  24 10.172.4.0/24
  24 10.172.5.0/24
  25 10.172.6.0/25
```

Adding every candidate to `$occupied` prevents a later iteration from returning an
overlapping block.

These results are proposals, not reservations. In a shared automation environment,
two jobs can still calculate the same free range at the same time. Persist or reserve
each allocation in your authoritative IPAM system before another process can claim
it.

## Where to go next

The same approach can feed Bicep parameters, Terraform variables, or
`New-AzVirtualNetwork`. The important separation is:

1. collect every occupied or reserved range;
2. calculate aligned, non-overlapping candidates;
3. account for Azure service-specific sizing;
4. reserve the selected range before deployment.

The module source, command documentation, and Pester tests are available in the
[ipmgmt repository](https://github.com/eosfor/ipmgmt).
