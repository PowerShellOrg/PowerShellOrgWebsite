---
title: Powershell IS for the desktop tech as well
authors:
  - Brian Bourque
date: "2015-07-29T00:06:26+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/07/powershell-is-for-the-desktop-tech-as-well/
---

Every day some one tends to ask me if there is a simpler way to do task A or B, and the minute I mention PowerShell the response is almost always the same, "yea i have been meaning to learn that but. This really saddens me for 2 reasons,   
1) Because PowerShell can and does make your life simpler   
2) i am already seeing peoples jobs get replaced when they fall behind in the skill and as more and more companies move closer to automation it will only get worse. 

It saddens me even more so when I see co-workers who i have taken the time to write the scripts to improve the speed of resolution not use them either. then wounder why i am able to fix the same issue in a fraction of the time they have. 

As you probably guessed from the title i am talking about people in the world of desktop technicians. the , in my opinion, unsung heroes of IT support.   
Powershell is not just for system admins, the local desktop guy can make his life much simpler by scripting out the simple stuff to save you time and money.   
here is an example,   
one of our clients has an issue with network printers getting jammed up if they do not print PDF documents as an image, once I had to do 3 or 4 of these i decided this took to long to fix, since we have to stop the print spooler, delete all the Print jobs and then restart then spooler again, and when you have 20-30 PCs to do this on i am sue you can guess this takes up a lot of our time. so I wrote a script to solve the issue, and it is really simple as well 




`/**
 * function Start-Error49FixV3
{
    [CmdletBinding()]
    [OutputType([int])]
    Param
    (
        # Enter the Hostname of the Target PC(s)
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        [string[]]$Computername
    )
    Begin
    {
    }
    Process
    {
        foreach ($Computer in $Computername)
{
        Invoke-Command -computername $Computer -ScriptBlock {Stop-Service -Displayname "Citrix Print Manager Service"}
        Invoke-Command -computername $Computer -ScriptBlock {Stop-Service -Name spooler -force}
        Remove-Item -Path \\$Computer\c$\Windows\System32\spool\PRINTERS\* -recurse
        Invoke-Command -computername $Computer -ScriptBlock {Start-Service -Displayname "Citrix Print Manager Service"}
        Invoke-Command -computername $Computer -ScriptBlock {Start-Service -Name spooler}
        Get-Service -Computername $Computer -name Spooler | Select name,status,$Computer | sort $Computer |format-table -AutoSize
        Get-Service -Computername $Computer -Displayname "Citrix Print Manager Service" | Select name,status,$Computer | sort $Computer |format-table -AutoSize
}
    }
    End
    {
    }
}
 */
`This simple line of Code was able to turn this process from being done after hours to a normall 20 minute fix for most of the clients locations, not only allowing us to get back to other issues faster but also helpinn to make the client happy since they no longer ad to wait a day for the printer to get backup and running.  
This is just one example, i could fill up your PC with other even simpler examples but instead i would rather show you. so over the course of the blog I am going to introduce you to a verity of topics from how to right clean code, how to test it safely, and lastly how to get a devops platform discussion into your work place for this so your code can get properly validated and confirmed safe in the environment.  
also if you have any questions on anything to do with PowerHhell feel free to drop it in the comments below or e-mail me @ Brian.Bourque@live.com  
until next time guys happy scripting
