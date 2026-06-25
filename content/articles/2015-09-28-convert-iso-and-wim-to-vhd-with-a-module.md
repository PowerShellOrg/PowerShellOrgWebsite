---
title: Convert ISO and WIM to VHD with a module
authors:
  - David Jones
date: "2015-09-29T04:24:03+00:00"
categories:
  - Tools
aliases:
  - /2015/09/convert-iso-and-wim-to-vhd-with-a-module/
---

Convert-WindowsImage.ps1 is a very popular method to create VHD's with. However it's not a module, and in it's current form cant be added to one.

So I have started a new project on GitHub called WindowsImageTools and posted the results to the [PowerShell Gallery][1].

It has a few functions so far. Convert-Wim2Vhd, to do the work,  and New-UnattendXml because it hate having to edit XML to make minor changes. The resulting XML is universal in that it works on both 32 and 64 bit and will do a silent install (currently on Volume Media only). Then it auto-logs on the Admin and run a PowerShell script to kick off what ever you need bootstrapped (like DSC)

To find out more. take look at the details over on [my blog about WindowImageTools][2] (and Yaks) or the [GitHub repo][3]

 [1]: https://www.powershellgallery.com/packages/WindowsImageTools/
 [2]: https://bladefirelight.wordpress.com/2015/09/29/shaving-the-yak-leads-me-to-create-new-module-windowsimagetools/
 [3]: https://github.com/BladeFireLight/WindowsImageTools
