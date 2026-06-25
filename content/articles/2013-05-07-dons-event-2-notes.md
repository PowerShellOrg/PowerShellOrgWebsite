---
title: "Don's Event 2 Notes"
authors:
  - Don Jones
date: "2013-05-07T23:02:02+00:00"
aliases:
  - /2013/05/dons-event-2-notes/
---

I thought I'd mentioned this last time (tap tap, this thing on?), but maybe not: don't format the output of your functions. The minute a function includes Format-\*, you've trapped me into on-screen display, a text file or piece of paper modeled after the on-screen display, or not a lot of other choices. If I want formatting, I'll pipe your function to my own Format-\* command of choice. But if I want CSV, or HTML, or XML, I'd like that option. Thanks.  
This is not a favorite technique of mine:


`$ServerInfo = "" | Select-Object Name, SerialNumber, OS, Model, CPU, CPUCount, Memory, GBMemory
$ServerInfo.Name = $Server.ToUpper()
$ServerInfo.SerialNumber =(Get-WmiObject -Class Win32_BIOS -ComputerName $Server -Credential $Credential).SerialNumber
`That said, it's not "wrong" so I only knock of like 1/10th of a point. For me, this technique is a bit of a hack, and it doesn't parse well visually. You're relying on Select-Object accepting non-existent property names and turning them into blank properties for you. It's... well, it's weird, and frankly this behavior - while convenient in this instance - causes more harm than good. Ever typo a property name on Select, and get a blank column as a result? Yeah, that. I wish Select didn't work this way, and so as a result I'm not a fan of this technique.  
\---


`if ($ServerInfo.CPU -is [array]) {
  $ServerInfo.CPU = $ServerInfo.CPU[0]
}
`Nice thinking, muchacho. You don't know if you've got more than one object, so you check. I'll note, however, that this could have been done more concisely when you got the property:


`$ServerInfo.CPU = (Get-WmiObject -Class Win32_Processor -ComputerName $Server -Credential $Credential).Name
`Add a **Select -First 1** to the end of that and you'd be guaranteed of only having one.  
\---


`$ServerInfo.SerialNumber =(Get-WmiObject -Class Win32_BIOS -ComputerName $Server -Credential $Credential).SerialNumber
$ServerInfo.OS = (Get-WmiObject -Class Win32_OperatingSystem -ComputerName $Server -Credential $Credential).Caption
$ServerInfo.Model = (Get-WmiObject -Class Win32_ComputerSystem -ComputerName $Server -Credential $Credential).Model
$ServerInfo.CPU = (Get-WmiObject -Class Win32_Processor -ComputerName $Server -Credential $Credential).Name
$ServerInfo.CPUCount = (Get-WmiObject -Class Win32_Processor -ComputerName $Server -Credential $Credential).count
$ServerInfo.Memory = (Get-WmiObject -Class Win32_ComputerSystem -ComputerName $Server -Credential $Credential).TotalPhysicalMemory
`Saw a lotta this. I'm kinda picking examples from one script, but this happened a lot. You're executing 6 queries. You needed 3. Double the effort, double the time. Bad call. Query it once, save it in a variable, extract what you need from that.  
\---


`param(
 [Parameter(
  Position=0,
  Mandatory=$true,
  ValueFromPipeline=$true,
  ValueFromPipelineByPropertyName=$true
 )]
 [string[]]$computers
)
`This hurts a little. Look at every native PowerShell command that accepts computer names, and it does so on a -ComputerName parameter. So why pick -computers for your function and be all nonstandard? Stay consistent.  
\---


`$s = New-Object System.Object
$os = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $computer
$s | Add-Member -Type NoteProperty -Name "Server Name" -Value $os.CSName
$s | Add-Member -Type NoteProperty -Name "OS Version" -Value $os.Caption
$cs = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $computer
$mem = [string]([Math]::Round(($cs.TotalPhysicalMemory / 1MB),2)) + " MB"
$s | Add-Member -Type NoteProperty -Name "PhysicalMem" -Value $mem
$s | Add-Member -Type NoteProperty -Name "# CPUs" -Value $cs.NumberOfProcessors
$cpu = Get-WmiObject -Class Win32_Processor -ComputerName $computer
`Ahh, that's better. One query per class, then extract what you want from a variable. You can be a bit more concise using a hashtable, but I'm jiggy with this technique.  
I said "jiggy."  
\---  
I want to point out that Dr. Scripto was optional about the "number of cores in each socket" thing. He said, "if you can do it." You can't. Not readily; XP doesn't expose that information (having existed before the advent of cores, um, time to upgrade okaythanksbuhbye) so you couldn't get it consistently for all of the operating systems you were asked for. Sometimes, the test is about seeing when you know to quit, not seeing if you can piledrive your way into a half-answer.  
\---  
You know you totally get downvoted if you don't include comment-based help with functions, right? Advanced track only. Just saying.\---


`"Server name: " + $Info.Caption
"OS: " + $Info2.Caption + $Info2.CSDVersion
"Processor sockets: " + $Info.NumberOfProcessors
"Processor cores: " + $Info.NumberOfLogicalProcessors
"Physical memory: " + [Math]::Round(($Info.TotalPhysicalMemory/1GB),2) + "GB"
`Yeah. Outputting formatted text instead of objects. I know. I cried for the dead puppies, and then drank. I drank _vodka._ I hate vodka, but the puppies. There is seriously a better way to output - outputting text prevents PowerShell from doing ANYTHING USEFUL with your output. [See how this guy did it][1]? Do that. I'm not a huge ordered hashtable fan, but that's just me. I don't hate them as much as vodka. Or text output.  
\---  
[This one is trending well][2]. I get it. It's beautiful. I think I wrote a book about this. My ONLY SINGLE NITPICK is that it's maybe a wee bit overwrought. I think it's because of the whole try CIM, then try DCOM, thing. He probably had to do it this way. I wish the new CIM cmdlets didn't require an explicit session to do DCOM. I think that's a big fail, because it forces you to write functions like this. Meh. I should write a proxy function for this. Anyway.  
\---


`Write-Verbose -Message 'Creating runspace pool'
$rp = [System.Management.Automation.Runspaces.RunspaceFactory]::CreateRunspacePool(1, $ThrottleLimit, $iss, $Host)
$rp.Open()
`I have no idea what to do with this. [Here's the whole thing][3]. This person is likely a LOT smarter than me. Certainly WAY more patient. I'm not sure Dr. Scripto anticipated a 317-line solution. I think he's rolled his own multithreading here. Just... wow. It's definitely overkill, by an order of magnitude, but props, man.  
Someone can explain it to me sometime after the vodka wears off, yeah?  
\---  
People are [hating on this one][4]. They're wrong. It's a good entry. Let me tell you something, stop giving a score of "2" because someone did something _extra_ like add logging. If it works, they went above and beyond. Do you not reward people for going above and beyond in your organization? No? Well, you should.

 [1]: http://scriptinggames.org/entrylist.php?entryid=519
 [2]: http://scriptinggames.org/entrylist.php?entryid=552
 [3]: http://scriptinggames.org/entrylist.php?entryid=482
 [4]: http://scriptinggames.org/entrylist.php?entryid=513
