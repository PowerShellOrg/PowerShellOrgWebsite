---
title: Template based parsing and progress bars
authors:
  - Jonas Sommer Nielsen
date: "2015-08-12T22:54:37+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/template-based-parsing-and-progress-bars/
---

Working with wifi I have often needed to do a survey of the surroundings, and therefor I loved that windows 7 (maybe even Vista) introduced more advanced netsh with wifi support.

There’s a lot of useful information but it might be nice to have a more graphical overview. The thing is that a text blob like this is not very handy to work with.

[![image1](https://powershell.org/wp-content/uploads/2015/08/image1.png)](https://powershell.org/wp-content/uploads/2015/08/image1.png)

Some time late last year I heard a guy from the powershell team on the Powerscripting podcast talk about ConvertFrom-String and the new template based parsing. And it occurred to me that you can combine this with a simple powershell progress bar (write-progress) to give a visual representation of signal strength.

**Why not try it out**

Ps> help ConvertFrom-String -[online][1]

[![Help_ConvertFrom-String](https://powershell.org/wp-content/uploads/2015/08/Help_ConvertFrom-String.png)](https://powershell.org/wp-content/uploads/2015/08/Help_ConvertFrom-String.png)

This looks straight forward.


`$TemplateSSID = @'
Interface name : Wi-Fi
There are 9 networks currently visible.
SSID 1 : {SSID*:My Movies 5G}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    BSSID 1                 : bc:ae:c5:eb:59:8c
         Signal             : {SIGNAL:88}%
         Radio type         : 802.11n
         Channel            : 36
         Basic rates (Mbps) : 6 12 24
         Other rates (Mbps) : 9 18 36 48 54
SSID 3 : {SSID*:blackbox}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    BSSID 1                 : c8:be:19:aa:98:a4
         Signal             : {SIGNAL:41}%
         Radio type         : 802.11n
         Channel            : 2
         Basic rates (Mbps) : 1 2 5.5 11
         Other rates (Mbps) : 6 9 12 18 24 36 48 54
SSID 4 : {SSID*:Greenbox}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    BSSID 1                 : 20:c9:d0:28:fb:05
         Signal             : {SIGNAL:60}%
         Radio type         : 802.11n
         Channel            : 1
         Basic rates (Mbps) : 1 2 5.5 11
         Other rates (Mbps) : 6 9 12 18 24 36 48 54
    BSSID 2                 : 20:c9:d0:28:fb:06
         Signal             : 40%
         Radio type         : 802.11n
         Channel            : 100
         Basic rates (Mbps) : 6 12 24
         Other rates (Mbps) : 9 18 36 48 54
'@
$Netsh = netsh.exe wlan show networks mode=bssid
$Netsh | ConvertFrom-String -TemplateContent $TemplateSSID
`Executing the the above code resulted in

[![testoutput1](https://powershell.org/wp-content/uploads/2015/08/testoutput1.png)](https://powershell.org/wp-content/uploads/2015/08/testoutput1.png)

This looks great. The data is structured nicely in a easy to use form.

Now lets combine that with a progress bar. We need a while loop to keep the progress bar alive and a one second sleep timer is probably a good idea.


`while ($true) {
    $Netsh = netsh.exe wlan show networks mode=bssid
    $Networks = $Netsh | ConvertFrom-String -TemplateContent $TemplateSSID
    $i = 0
    foreach($Network in $Networks) {
        Write-Progress -Id $i -Activity $Network.SSID -PercentComplete $Network.SIGNAL
        $i++
    }
    Start-Sleep -Seconds 1
}
`The essential part is just a foreach looping through the networks objects. We use Write-Progress with parameters SIGNAL strength as PercentComplete and SSSID as Activity.

[![ise progress bars](https://powershell.org/wp-content/uploads/2015/08/image3.png)](https://powershell.org/wp-content/uploads/2015/08/image3.png)

It looks great in ISE and even works in the shell

[![shell progress](https://powershell.org/wp-content/uploads/2015/08/image4.png)](https://powershell.org/wp-content/uploads/2015/08/image4.png)

How cool is that?

The bright reader might have spotted an obvious flaw in the first template. It doesn’t handle networks with multiple radios e.g. a network with both a 2.4 ghz and 5 ghz and same ssid. And all the other nice information from netsh is simply ignored.

**Second try**


`$TemplateSSID = @'
Interface name : Wi-Fi
There are 9 networks currently visible.
{NETWORK*:SSID 1 : {SSID:My Movies 5G}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    {BSSID*:BSSID 1                 : {MAC:bc:ae:c5:eb:59:8c}
         Signal             : {SIGNAL:88}%
         Radio type         : 802.11n
         Channel            : {CHANNEL:36}
         Basic rates (Mbps) : 6 12 24
         Other rates (Mbps) : 9 18 36 48 54}}
{NETWORK*:SSID 3 : {SSID:blackbox}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    {BSSID*:BSSID 1                 : {MAC:c8:be:19:aa:98:a4}
         Signal             : {SIGNAL:41}%
         Radio type         : 802.11n
         Channel            : {CHANNEL:2}
         Basic rates (Mbps) : 1 2 5.5 11
         Other rates (Mbps) : 6 9 12 18 24 36 48 54}}
{NETWORK*:SSID 4 : {SSID:Greenbox}
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    {BSSID*:BSSID 1                 : {MAC:20:c9:d0:28:fb:05}
         Signal             : {SIGNAL:60}%
         Radio type         : 802.11n
         Channel            : {CHANNEL:1}
         Basic rates (Mbps) : 1 2 5.5 11
         Other rates (Mbps) : 6 9 12 18 24 36 48 54}
    {BSSID*:BSSID 2                 : {MAC:20:c9:d0:28:fb:06}
         Signal             : {SIGNAL:40}%
         Radio type         : 802.11n
         Channel            : {CHANNEL:100}
         Basic rates (Mbps) : 6 12 24
         Other rates (Mbps) : 9 18 36 48 54}}
'@
$Netsh = netsh.exe wlan show networks mode=bssid
$Networks = $Netsh | ConvertFrom-String -TemplateContent $TemplateSSID
$Networks
`There's a bit more markup here, and I admit it took me a few tries to get my head around the nested data structure. Look more closely at SSID 4 above, and how this have 2 BSSID's, because of this they are marked with a *.

Now $Networks contain a little more complicated data structure

[![testoutput2](https://powershell.org/wp-content/uploads/2015/08/testoutput2.png)](https://powershell.org/wp-content/uploads/2015/08/testoutput2.png)

Though if we dive into it                             

[![testoutput3](https://powershell.org/wp-content/uploads/2015/08/testoutput3.png)](https://powershell.org/wp-content/uploads/2015/08/testoutput3.png)

It does look more like what we saw first. But with more info. And we can even dig into TDC-TC network and see each channel.

[![testoutput4](https://powershell.org/wp-content/uploads/2015/08/testoutput4.png)](https://powershell.org/wp-content/uploads/2015/08/testoutput4.png)

A slightly modified loop


`while ($true) {
    $Netsh = netsh.exe wlan show networks mode=bssid
    $Networks = $Netsh | ConvertFrom-String -TemplateContent $TemplateSSID
    $i = 0
    foreach($Network in $Networks) {
        Write-Progress -Id $i -Activity $Network.network.SSID
        $i++
    }
    Start-Sleep -Seconds 1
}
`And the percentage complete is a sub object. So we will need another loop to go through every BSSID attached to the SSID


`while ($true) {
    $Netsh = netsh.exe wlan show networks mode=bssid
    $Networks = $Netsh | ConvertFrom-String -TemplateContent $TemplateSSID
    $i = 0
    foreach($Network in $Networks) {
        foreach($bssid in $Network.NETWORK.bssid) {
            Write-Progress -id $i -Activity $Network.network.SSID -Status "Channel: $($bssid.CHANNEL) MAC: $($bssid.MAC)" -PercentComplete $bssid.SIGNAL
            $i++
        }
    }
    Start-Sleep -Seconds 1
}
`The main thing here is of course using the template based parsing. It took me a few tries to figure it out, but it’s cool when it works and might be very useful in many other situations. The progress is just a hack that makes the presentation a little more fun.

**References**

  * <http://www.lazywinadmin.com/2014/09/powershell-convertfrom-string-and.html>
  * <http://www.powershellmagazine.com/2014/09/09/using-the-convertfrom-string-cmdlet-to-parse-structured-text/>
  * <http://blogs.msdn.com/b/powershell/archive/2014/10/31/convertfrom-string-example-based-text-parsing.aspx> 

#### Contact me

Twitter [@mrhvid][2]  
Web [Jonas.SommerNielsen.dk][3]

 [1]: https://technet.microsoft.com/library/dn807178(v=wps.640).aspx
 [2]: https://twitter.com/mrhvid
 [3]: http://Jonas.SommerNielsen.dk
