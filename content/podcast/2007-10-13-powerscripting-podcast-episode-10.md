---
title: Episode 10 – WinRM will power PowerShell Remoting in V2
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-10-14T01:57:32+00:00"
podcast_url: "http://media.libsyn.com/media/powerscripting/PSPodcast-010.mp3"
aliases:
  - /2007/10/powerscripting-podcast-episode-10/
---

**A Podcast about Windows PowerShell.**  
Listen: [**![](http://powerscripting.libsyn.com/img/podcastIcon.gif)**][1]  
**Introduction**

  * We've had over 5,400 downloads so far! Thanks, everyone!

**News**

  * PowerShell remoting will work via WinRM according to [this][2]from the Scripting NewsWire 
      * _**"Something else to consider**. Sometime before the end of the year an upgraded CTP (Community Technology Preview) version of Windows PowerShell will be released, an upgrade that will enable you to run most Windows PowerShell cmdlets against remote computers. The catch? This new version of Windows PowerShell also relies on WinRM as its remote transport protocol. If you"™re interested in using Windows PowerShell to manage remote computers you"™ll need to download and install WinRM on your Windows XP and Windows Server 2003 machines."_
  * New Blog: [PowerShell Pro][3] 
      * _"PowerShell Pro is a community devoted to compiling the leading resources needed in achieving that goal. Whether you are an advanced PowerShell user or just starting out, PowerShell Pro is dedicated to presenting information required for your success."_
      * Lots of content. Nice format.
  * [Powershell "Yahoo Pipe"][4]created by Jaykul. 
      * Aggregate RSS feed containing articles from tons of PowerShell blogs.
  * Another company "Gets it": IBM 
      * Dale Lane in the UK has [written on his blog][5] about PowerShell Cmdlets he's developing for IBM WebSphere.
  * Overview of next PS Virtual User's Group - Dec 4th 
      * Oisin presenting talk about cmdlet development, new foundations in pscx, and touching on providers  
        and paths in PowerShell

**Cmdlet of the week: Set-PSDebug**  
Check out Keith Hill's article on Set-PSDebug: [Effective PowerShell Item 5: Use Set-PSDebug -Strict In Your Scripts - Religiously][6]

  * dynamic languages like PS allow you to use a variable without initializing it
  * equivalent to "option explicit" in Vbscript
  * ERROR: set-psdebug -strict; $foo += "bar"
  * NO ERROR: $foo = "hello" ; $foo += "bar"

**Resources**

  * [New Scott Hanselman video][7]
  * [New PowerGUI 1.0.11][8](thanks Dmitry) 
      * Very nice built-in code editor
      * free!
  * [More Powershell + news][9] 
      * PS+ beta available to all PowerShell Analyzer customers

**Tips**

  * Hal talks about working with CSV and other forms of structured text.
  * Source: Import-WebCsv


`# Import a URL as CSV and write output to pipeline`Function Import-WebCsv {`Param ( $url )`$tempFile = [System.IO.Path]::GetTempFileName()`$webClient = new-object System.Net.WebClient`$webClient.DownloadFile($url,$tempFile)`$data = import-csv $tempFile`[System.IO.File]::Delete($tempFile)`write-output $data`}
`**PowerShell Moments**

  * 
"netsh dhcp server SERVERNAME scope SCOPEID add reservedip 
[
10.10.0.1
](http://10.10.0.1/)  

00c0ffee0001"

  * 
$vms = import-csv ipandmacs.csv
 $vms | % {"netsh dhcp server myserver scope myscope " + $_.IP + " "+ $_.Mac} | out-file createdhcpreservations.cmd

  * 
There is a bigip.conf file that for nodes at least looks like this 

  * 
node 
[
10.10.10.1
](http://10.10.10.1/) 
{
 limit 1
 }

the limit has to do with how many connections per host you can have.
 Well i banged out this config file using Powershell 1..216 | % {"node 10.10.10." + $_ + " {`n   limit 1`n}"} | out-file
 bigipconf.txt - Thanks Andy!


**One-Liners**

  *  $ErrorActionPreference = "silentlycontinue"
  * gc scott.txt | %{$u=$_; trap {"$u,deleted"} if(get-qaduser $_ -disabled){"$_,disabled"}else{"$_,active"}} | out-file "User Status.csv"

**Gotchas**

  * Bug in About_Filter help topic 
      * Jaykul's blog post: [About_Filter considered Harmful][10]

**Closing**  
Thanks for listening! Keep the feedback coming, we really love hearing from you. Also don't forget to write reviews and vote for us on iTunes, Podcast Alley and wherever else you may find us.

 [1]: http://media.libsyn.com/media/powerscripting/PSPodcast-010.mp3
 [2]: http://www.microsoft.com/technet/scriptcenter/newswire/winrm.mspx
 [3]: http://www.powershellpro.com/
 [4]: http://huddledmasses.org/powershell-blog-rss-pipe/
 [5]: http://dalelane.co.uk/blog/?p=185
 [6]: http://keithhill.spaces.live.com/blog/cns%215A8D2641E0963A97%21796.entry
 [7]: http://scriptolog.blogspot.com/2007/09/new-powershell-video-on-dnrtv.html
 [8]: http://dmitrysotnikov.wordpress.com/2007/10/08/notepad-for-powershell-powergui-1011-is-out/
 [9]: http://powershelllive.com/blogs/shelltools/default.aspx
 [10]: http://huddledmasses.org/about_filter-considered-harmful/
