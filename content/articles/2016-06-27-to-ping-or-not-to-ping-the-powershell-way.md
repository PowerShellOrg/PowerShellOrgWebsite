---
title: To ping or not to ping..The PowerShell way
authors:
  - Graham Beer
date: "2016-06-27T20:29:29+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/06/to-ping-or-not-to-ping-the-powershell-way/
---

As this is my first blog here, here’s a bit about me. I’m a current lead SCCM Admin in the UK, and have found this great enjoyment for PowerShell in the last 18 months. I’ve started my own blog, <http://www.get-configmgr-content.co.uk/>, to share my passion. The chance to blog on Powershell.org was too exciting not to do!  
The inspiration for this blog came from a forum post on Powershell.org that I helped contributed on. The question asked was, how to display the name of failed ping, i.e. $computer is offline.  
There were some great responses, the one I most liked which I slightly amended into a function was:


`function test-ping { $args | % {[pscustomobject]@{online = test-connection $_ -Count 1 -quiet;computername = $_}} }
`The simplicity and power is brilliant. (Credit to Dan Potter!)  
I expanded on this and came up with a way to use the results in several different ways. All this by the power of advanced functions.  
I have two advanced functions 'ValueFromPipeline' and 'ValidateSet' in this script:  
1. **'ValueFromPipeline'** gives the capability to pass more than one object to our script. Perfect for passing one or many devices.  
Other than the message "Online: PC1", I wanted to be able to use the ping status to pass to another cmdlet, collate all online or offline devices and display the results in a table.  
2. Using **'ValidateSet'** I could define my options, "Online","Offline" and "ObjectTable". But by not setting the parameter to mandatory, you don’t have to use the additional options.  
To continue using the ping response, I needed to hold them somewhere. I did this by creating an empty array in the Begin block and append each ping response to it.  
Regardless of what option I choose, if any, the below block of code will always run:


`$device| foreach {
            if (Test-Connection $_ -Count 1 -Quiet) {
                if(-not($GetObject)){write-host -ForegroundColor green "Online: $_ "}
                    $Hash = $Hash += @{Online="$_"}
            }else{
                if(-not($GetObject)){write-host -ForegroundColor Red "Offline: $_ "}
                    $Hash = $Hash += @{Offline="$_"}
                }
        }
`Devices in the variable, $device, will each be 'pinged' then passed through a 'if' statement depending on offline or online status and get added into the $hash array variable.  
**DISCLAIMER:** I should apologies to Don here for killing the puppies with write-host. I wanted to just push out some colored output to the host only!  
Before I go any further, let me briefly explain how I am 'pinging' the devices. I am using the cmdlet 'Test-Connection'. The synopsis on 'get-help' for test-connection states, 'Sends ICMP echo request packets ("pings") to one or more computers.' A nice feature of this cmdlet is the '-quiet' syntax. This is cool as it gives a Boolean result (True or False) of the 'ping' status. By adding a '-count' as well I can limit the number of times I request a connection check. Now I can pass as many devices through the pipeline to my function and get an online or offline message pretty quickly.  
The second half of the script only runs if you add the '$getObject' option from the function. The use of the 'validateSet' allows me to make sure the three options I defined are used only.  
The data collected in the $hash array variable is passed through a foreach statement and creates customobjects. The final part is use of a 'Switch'. Depending on what was chosen in the $getObject parameter is the output at the end of the script.  
The advantage to this switch is I can pass all the online PC's to something else via the pipeline. For example, an AD group or a deployment collection:


`'PC1','PC2' | Get-PingStatus -GetObject Online | # pass to another cmdlet
`Capture the 'online' PC's to a variable and use:


`$Online = 'PC1','PC2' | Get-PingStatus -GetObject Online
`Or if you need to report back a list of PC's which are either on or offline in an object group:


`'PC1','PC2', 'PC3','PC4 | Get-PingStatus -GetObject objectTable
DeviceName Online offline
---------- ------ -------
pc4        Online
pc1               Offline
pc2               Offline
pc3               Offline
`Again this script has great flexibility in how you pass the device objects.  
Say you have a list of PC's in a txt for CSV file, you can use Get-content and pipe it to Get-PingStatus:


`get-content pcs.csv | Get-PingStatus
`NOTE:  
The use of the $Global: variable allowed me to use $Global:Objects once the script has complete. Just something I thought could be useful. The $Script: variable would have worked fine should I not want to use the variable outside the script.  
I hope you've enjoyed my blog and I welcome any comments. I've posted the script on GitHub should you wish to download.  
<https://github.com/Gbeer7/GetPingStatus.git>  
The full script:


`Function Get-PingStatus
 {
    param(
        [Parameter(ValueFromPipeline=$true)]
        [string]$device,
        [validateSet("Online","Offline","ObjectTable")]
        [String]$getObject
    )
begin{
    $hash = @()
    }
process{
    $device| foreach {
            if (Test-Connection $_ -Count 1 -Quiet) {
                if(-not($GetObject)){write-host -ForegroundColor green "Online: $_ "}
                    $Hash = $Hash += @{Online="$_"}
            }else{
                if(-not($GetObject)){write-host -ForegroundColor Red "Offline: $_ "}
                    $Hash = $Hash += @{Offline="$_"}
                }
        }
    }
end {
    if($GetObject) {
            $Global:Objects = $Hash | foreach { [PSCustomObject]@{
                DeviceName = $_.Values| foreach { "$_" }
                Online     = $_.Keys| where {$_ -eq "Online"}
                offline    = $_.Keys| where {$_ -eq "Offline"}
                }
            }
    Switch -Exact ($GetObject)
        {
            'Online'      { $Global:Objects| where 'online'| select -ExpandProperty DeviceName }
            'Offline'     { $Global:Objects| where 'offline'| select -ExpandProperty DeviceName }
            'ObjectTable' { return $Global:Objects }
        }
    }
  }
}
`
