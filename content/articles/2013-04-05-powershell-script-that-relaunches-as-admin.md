---
title: PowerShell Script that Relaunches as Admin
authors:
  - Keith Hill
date: "2013-04-05T15:08:17+00:00"
aliases:
  - /2013/04/powershell-script-that-relaunches-as-admin/
---

If were following good security practices we run our Windows system with UAC enabled.  This means that if you forget to launch your PowerShell prompt as Administrator when you run a script that requires administrative privilege then that script will fail. 

It would be nice to build a mechanism into our script to "auto-elevate" if UAC is enabled.  The trick to doing this is to run Start-Process "“verb runas.  After that you only need to figure out if the current user is an administrator and if UAC is enabled.  And you have to package up the script"™s parameters as an array of strings.  All of this can be accomplished fairly easily with this bit of PowerShell script:



`function
 IsAdministrator
{
    $Identity = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $Principal = New-Object System.Security.Principal.WindowsPrincipal($Identity)
    $Principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
}


function
 IsUacEnabled
{
    (Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Policies\System).EnableLua 
-ne
 0
}


#


# Main script


#


if
 (!(IsAdministrator))
{

if
 (IsUacEnabled)
    {
        [string[]]$argList = @(
'-NoProfile'
, 
'-NoExit'
, 
'-File'
, $MyInvocation.MyCommand.Path)
        $argList += $MyInvocation.BoundParameters.GetEnumerator() | Foreach {
"-$($_.Key)"
, 
"$($_.Value)"
}
        $argList += $MyInvocation.UnboundArguments
        Start-Process PowerShell.exe -Verb Runas -WorkingDirectory $pwd -ArgumentList $argList 

return

    }

else

    {

throw

"You must be administrator to run this script"

    }
}


`If you launch this script from a non-elevated context, it will fire up a new PoweShell session that is elevated assuming UAC is enabled. 

[![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/276/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/276/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=276&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)
