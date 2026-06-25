---
title: Charlotte Powershell User Group Holiday-themed Scripting Games
authors:
  - Terri Donahue
date: "2013-12-10T22:16:10+00:00"
aliases:
  - /2013/12/charlotte-powershell-user-group-holiday-themed-scripting-games/
---

The Charlotte Powershell Users Group meeting was held on Dec 5th. Jim put together a nifty challenge related to image manipulation. We started off with this nifty image. Pretty huh?  
[![stegan1](https://powershell.org/wp-content/uploads/2013/12/stegan1.png)](https://powershell.org/wp-content/uploads/2013/12/stegan1.png)  
The challenge was to manipulate the image using PowerShell to find the hidden message. After some discussion, the code was cracked and the image was displayed. As is normal with Powershell, there were multiple ways to achieve the end goal. Feel free to stop reading here and grab the image if you want to give this a go yourself. Spoilers are below.  




Here is one way to find the hidden message:  
add-type -AssemblyName system.drawing  
$height = $img.Height - 1  
$width = $img.Width - 1  
$img = [System.Drawing.Image]::FromFile("c:\temp\stegan1.png")  
0..$height | %{  
$y=$_;  
0..$width | %{  
$x=$_;  
$p = $img.GetPixel($x,$y);  
if ($p.r -ne 0) {  
$img.setpixel($x,$y,[System.Drawing.Color]::Green)  
}  
}  
}  
$img.save('c:\temp\update.png')  
Merry Christmas and Happy Holidays from your Charlotte Powershell Users Group.
