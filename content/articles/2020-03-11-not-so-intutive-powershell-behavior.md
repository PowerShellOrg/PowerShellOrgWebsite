---
title: Not So Intutive PowerShell Behavior
authors:
  - tobor79
date: "2020-03-11T21:36:45+00:00"
categories:
  - Tips and Tricks
aliases:
  - /2020/03/not-so-intutive-powershell-behavior/
---

The below link leads to the module I am writing about in this blog post.  
**[
LINK TO POWERSHELL MODULE
](https://github.com/tobor88/PowerShell/blob/master/Set-LockScreenImage.psm1)**  
At my place of work a task needed to be completed that would allow us IT administrators to set the default lock screen image for our devices. Group Policy was my first thought however it was to broad of a solution. The rules basically became, set the default lock screen on some of the newer laptops and if a default lock screen has been manually chosen by a user; don't change it.  
I figured great that is an easy module to write. I wanted to add the option to execute the command on remote computers as well which is what brought up a couple great unexpected behaviors.  
The cmdlets these include are New-PsDrive being executed on a remote machine and Copy-Item from a network location to a local location.


**

COPY-ITEM

**  
In order to set the lock screen image for a laptop, we first need to ensure the image will always available. If something ever changes where the laptop needs to pull the image file again and the image is not reachable; the default image will be a black screen. I prefer to save the image file locally on the laptops. In order to do that, when I execute my function, I need to copy the file from a shared resource onto the local device. This is done with Copy-Item because PowerShell is object oriented where Command Prompt's robocopy is text/string oriented. We are not able to just copy a file from a local location.  
The first line in [Microsoft's Documentation](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Management/Copy-Item?view=powershell-5.0) states the function only works between objects in the same namespace. This prevents copying a file to a Certificate Drive or Registry Drive. This rule is what prevents '\\networkshare\folder$\image.png' from being copied to 'C:\Users\Public\Pictures\image.png'. A fairly simple concept.  
What this means is that if we want to copy an item from one location to another the drive needs to be seen by PowerShell to have a 'Provider' property with the value 'FileSystem'. This can be seen in the image below.





    ![Type Information for Get-PsDrive](https://img1.wsimg.com/isteam/ip/8f3c0f3f-85e4-413f-bd91-f19d4f317a5a/Get-Member.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)



*Type Information for Get-PsDrive*  




    ![Results for the cmdlet Get-PsDrive in PowerShell](https://img1.wsimg.com/isteam/ip/8f3c0f3f-85e4-413f-bd91-f19d4f317a5a/GetPsDrive.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)



*Get-PsDrive Results* 

In the above images we see that Provider is a property of the Get-PsDrive function. The Provider property must share a value in order to copy an item from one FileSystem to another FileSystem.  
The location of the lock screen image for this blog and the function on GitHub is located at '\\networkshare\files$\Backgrounds'. We need to map this location to a drive letter in order to move the file to a local or remote computer.  How do we do that? New-PsDrive is how.  
**

NEW-PSDRIVE

**  
Here is the [Microsoft Documentation](https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Management/New-PSDrive?view=powershell-5.0) for New-PsDrive. New-PsDrive can be used to create temporary or persistent drives. When the '-Persist' parameter is used, a persistent Windows mapped  network drive that is associated with a file system location on a  remote computer is created.  
Temporary drives exist only in the current PowerShell session and in  sessions that you create in the current session. This in essence means we need to use the "New-PsSession" cmdlet in order for New-PsDrive to work. Without reading the documentation as I have done before trying this command you may believe that an "Access Denied" PowerShell error has to do with using the '-Credential' parameter. I have demonstrated a few misleading events below. 




    ![New-PsDrive's not so intuitive behavior](https://img1.wsimg.com/isteam/ip/8f3c0f3f-85e4-413f-bd91-f19d4f317a5a/Tricky-0002.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)



*New-PsDrive's not so intuitive behavior* 

**
FIRST: 
**The first attempt above gives us an Access Denied error. No credentials were entered. It was just me executing a command.  
**
SECOND:
** My next attempt/reaction to that adds the -Credential parameter to the Invoke-Command cmdlet. Invoke-Command runs commands on a remote computer and displays the output in the PowerShell terminal. I added this to ensure the command was running as an administrator. I received another access is denied error.  

**THIRD:** 
My response to that was to cover all basis and add another -Credential parameter to the New-PsDrive command to map the drive and have the remote computer authenticate my credentials. This time it returned a result as though it was successful and it was for a brief moment.  
Even though I added the -Persist parameter it was only persistent for that session and closed as soon as Invoke-Command's ScriptBlock finished running.  
If I were to run Get-PsDrive right after mapping the drive in that version of Invoke-Command it would return a result showing the T drive I just mapped. A PowerShell function should do one thing and one thing only. To better adhere to that rule for the Set-LockScreenImage function  we should use New-PsSession to create a $Session variable. This way we have one session that can be used to execute multiple commands instead of multiple commands being executed in multiple sessions.  
I believe these to be a couple of great examples to explain to someone who is just getting into PowerShell or decided those functions did not work. Hope you found this helpfule.  

- tobor  
https://roberthosborne.com
