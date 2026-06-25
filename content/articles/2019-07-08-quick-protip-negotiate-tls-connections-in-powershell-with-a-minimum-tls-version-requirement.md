---
title: "Quick ProTip: Negotiate TLS Connections In Powershell With A Minimum TLS Version Requirement"
authors:
  - Nathaniel Webb (ArtisanByteCrafter)
date: "2019-07-08T21:28:23+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
aliases:
  - /2019/07/quick-protip-negotiate-tls-connections-in-powershell-with-a-minimum-tls-version-requirement/
---

## Synopsis {#synopsis.wp-block-heading}

This is a quick post to highlight the nuances of Powershell and protocol management in regard to TLS connections. If you've ever attempted to make a secure connection (for example, an API request) to a service with certain net security requirements, you might have run into this problem.

While TLS is negotiated at the highest level existing on both the server and the client, the minimum protocols defined by Powershell may include ones that you explicitly do not want. While explicitly declaring an enumerated protocol list is easy enough, what happens when Tls13 becomes more common, and we want to start utilizing it when it's available? Then Tls14, and beyond?

Surely there's a way to give both a minimum version and account for newer protocols once they become available.

## Retrieving and Configuring TLS {#retrieving-and-configuring-tls.wp-block-heading}

The first thing we'll want to do is figure out what the default security protocol for our system is, and what all versions are supported. To do this, we leverage the .NET method 


`[Net.ServicePointManager]::SecurityProtocol
`.


`PS> [Net.ServicePointManager]::SecurityProtocol
SystemDefault
`On my Windows 10 system with Powershell v5.1, this returns a value of 


`SystemDefault
`. This value was introduced in .NET 4.7 (prior versions of .NET return no default value, only an enumerated list), and allows your operating system to pick the protocol to best negotiate the connection with. Under normal circumstances, this would be the best option to use, as defaults change based on the current security landscape.

However, 


`SystemDefault
`might be a bit too lenient in it's declared available protocols. SSLv3?! - yeah, 

[no thanks][1].

We can see the default available protocols with the following:


`PS> [enum]::GetValues('Net.SecurityProtocolType')
SystemDefault
Ssl3
Tls
Tls11
Tls12
Tls13
`Changing the protocol list is a fairly straight forward command:


`[System.Net.ServicePointManager]::SecurityProtocol = 'Tls11, Tls12'
`This would declare Tls 1.1 and 1.2 all valid protocols to use. As long as those are present on your computer, this works perfectly fine, and I've seen this method used a lot. This will accomplish our goal of setting a minimum required security protocol.

Herein lies the nuance of what we're trying to accomplish. While TLS is negotiated at the highest level existing on both the server and the client, the minimum protocols defined in 


`SystenDefault
`may include ones that you explicitly do not want. If Tls protocols are explicitly defined, we'd need to update our code whenever a new protocol became available. This might be preferable in certain circumstances where you need exact control over how your application communicates, but for my use case, I want this to be a dynamic declaration.

It turns out that adding support for newer available protocols on a client machine is fairly easy to implement.


`PS> $CurrentVersionTls = [Net.ServicePointManager]::SecurityProtocol
PS> $AvailableTls = [enum]::GetValues('Net.SecurityProtocolType') | Where-Object { $_ -ge 'Tls12' }
PS> $AvailableTls.ForEach({
        [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor $_
    })
PS> [Net.ServicePointManager]::SecurityProtocol
Tls12, Tls13
`What we've done here is enumerated all available protocols on our computer and declared everything above Tls12 as fit for negotiation. This allows us to be able to both specify a minimum, and include newer protocols once they are available - effectively leveraging the best of 


`SystemDefault
`and explicit declarations.

As a courtesy to your users, I would recommend setting the security protocol back to the way it was once your connection or request is finished.


`# Be nice and set session security protocols back to how we found them.
[Net.ServicePointManager]::SecurityProtocol = $currentVersionTls
`Happy (secure) shelling!

Note: This is a cross-post of my original blog post here:

<https://www.natelab.us/quick-protip-negotiate-tls-in-powershell/>

 [1]: https://disablessl3.com/
