---
title: List users logged on to your machines
authors:
  - Jonas Sommer Nielsen
date: "2015-08-28T11:12:07+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/list-users-logged-on-to-your-machines/
---

Password policies are the best 😀 Sometimes they lead to account logouts when someone forgets to logout of a session somewhere on the network though. It might be the TS session they use once a quarter for reporting or maybe you know the feeling when you RDP to a server only to find that it is locked by 2 other admins who forgot to logoff when they left. (Off cause this never happens… we all use PowerShell…) Anyway, this had me searching for a user session somewhere on the network. The worst thing is when my own password expires. I hate when my account ends up being locked. Therefor I made it a rule to just check all servers before I change password. There are multiple ways to do this but of course I tend to go the PowerShell route. 

## Research

The originally method I used is from [TechNet gallery][1]

In short: Get-WmiObject -Class Win32_process

This basically finds all unique users running processes on the machine. This is cool because it finds everything even stuff running as a service but I'm not convinced it is the most efficient way.

Checking up with google I find a lot of creative ways to check who is logged on to your box.

[peetersonline.nl/2008/11/oneliner-get-logged-on-users-with-powershell/][2] gave me the idea to check Win32_LoggedOnUser which seems obvious.

[![2015-08-28 (1)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-1.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-1.png)

This looks great and seems to work with Get-CimInstance too though the output is a little different.

![2015-08-28](https://powershell.org/wp-content/uploads/2015/08/2015-08-28.png) 

[learn-powershell.net/.../Quick-hit-find-currently-logged-on-users/][3] took a little more old-school approach which I kind of like because it's a little rough and forces me to play with my [template based parsing.][4]

 [![2015-08-28 (2)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-2.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-2.png)

I'm not really sure which method is faster so why not try implementing all 3 in a module and test it out.

## Sketching

It's always a good idea to begin by making a sketch of what you're trying to accomplish.


`Pseudo code:
Get-ActiveUser -ComputerName [] -Method [Cim,Wmi,Query]
Wanted output:
Username                          ComputerName
--------                          ------------
TestUser1                         Svr3
TestUser3                         Svr3
DonaldDuck                        Client2
`Now I have all the information I need to set up the GitHub repository.

[github.com/mrhvid/Get-ActiveUser][5]

## Code

First of all the parameters I'm interested in are ComputerName and Method.


`Param
    (
        # Computer name, IP, Hostname
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        [String[]]
        $ComputerName,
        # Choose method, WMI, CIM or Query
        [Parameter(Mandatory=$true,
            ValueFromPipelineByPropertyName=$true,
            Position=1)]
        [ValidateSet('WMI','CIM','Query')]
        [String]
        $Method
    )
`I already have 3 possible Methods in mind so I set ValidateSet with the 3 possibilities. Then I don't have to worry about that input later.


`Process
    {
        switch ($Method)
        {
            'WMI'
            {
            }
            'CIM'
            {
            }
            'Query'
            {
            }
        }
    }
`In the Process part of my function I simply use a switch for the 3 different methods I allowed in the Parameter.

Now it's basic fill-in-the-blanks.

### WMI

My old solution is simpel and works fine.


`$WMI = Get-WmiObject -Class Win32_Process -ComputerName $ComputerName -ErrorAction Stop
$ProcessUsers = $WMI.getowner().user | Select-Object  -Unique
`[![2015-08-28 (3)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-3.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-3.png)

But now that I found Win32_LoggedOnUser it seams wrong to do it this way. Lets look at the new idea instead.

[![2015-08-28 (4)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-4.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-4.png)

[![gwmi-Wmi32_LoggedOnUser_gm](https://powershell.org/wp-content/uploads/2015/08/gwmi-Wmi32_LoggedOnUser_gm.png)](https://powershell.org/wp-content/uploads/2015/08/gwmi-Wmi32_LoggedOnUser_gm.png)

This is all the right data but it seems to be in a string format so I'll have to do a little manipulation. This can be done in a million ways.


`function Get-MyLoggedOnUsers
 {
  param([string]$Computer)
  Get-WmiObject Win32_LoggedOnUser -ComputerName $Computer | Select Antecedent -Unique | %{“{0}{1}” -f $_.Antecedent.ToString().Split(‘”‘)[1], $_.Antecedent.ToString().Split(‘”‘)[3]}
 }
`Peter's aforementioned one-liner didn't seem very reader-friendly to me, which is ok for a one-liner, but I would like it to be a little more readable if possible.


`$WMI = (Get-WmiObject Win32_LoggedOnUser).Antecedent
$ActiveUsers = @()
foreach($User in $WMI) {
    $StartOfUsername = $User.LastIndexOf('=') + 2
    $EndOfUsername = $User.Length - $User.LastIndexOf('=') -3
    $ActiveUsers += $User.Substring($StartOfUsername,$EndOfUsername)
}
`[![2015-08-28 (5)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-5.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-5.png)

 This seams right 🙂 I'll save the output in $ActiveUsers variable and do the same for CIM and Query.

### CIM

Lets try with CIM.

[![2015-08-28 (6)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-6.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-6.png)

This looks way more structured.

[![2015-08-28 (7)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-7.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-28-7.png)

CIM ends up being an easy to understand one-liner 😀


`$ActiveUsers = (Get-CimInstance Win32_LoggedOnUser -ComputerName $ComputerName).antecedent.name | Select-Object -Unique
`### Query

Using the good ol' Query.exe I found the [template based parsing discussed earlier][4] very useful.


`$Template = @'
 USERNAME              SESSIONNAME        ID  STATE   IDLE TIME  LOGON TIME
>{USER*:jonas}                 console             1  Active    1+00:27  24-08-2015 22:22
 {USER*:test}                                      2  Disc      1+00:27  25-08-2015 08:26
'@
$Query = query.exe user
$ActiveUsers = $Query | ConvertFrom-String -TemplateContent $Template | Select-Object -ExpandProperty User
`### Output

Now I just need to format and output the users in a nice way. I want clean objects with ComputerName and UserName.


`# Create nice output format
$UsersComputersToOutput = @()
foreach($User in $ActiveUsers) {
        $UsersComputersToOutput += New-Object psobject -Property @{
                                        ComputerName=$ComputerName;
                                        UserName=$User
                                    }
        }
}
# output data
$UsersComputersToOutput
`## Testing

Now I have a problem. I can't test this as I don't have a bunch of test serveres at my disposal. All my testing has been done against my own Windows 10 box. It's seems that query is a lot faster running locally but WMI/CIM might give a more complete view of what services are running.  

[![get-activeuser_wmi_highlight](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_wmi_highlight.png)](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_wmi_highlight.png)

I have a bunch of standard service accounts running that might be nice to remove from the output. Also for this to be useful we will want to run it against a lot of machines.

[![get-activeuser_query](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_query.png)](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_query.png)

Combining Get-ActiveUser with [Start-Multithread from last weeks post][6] seems to be working as intended.


`Start-Multithread -Script {
        param($C)
        Get-ActiveUser -ComputerName $C -Method Query
    } -ComputerName ::1,Localhost | Out-GridView
`Piping the above to Out-GridView is proberbly my personal favorite way of accomplishing something truly useful.

[![get-activeuser_query_out-gridview](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_query_out-gridview.png)](https://powershell.org/wp-content/uploads/2015/08/get-activeuser_query_out-gridview.png)

Now we have all the data in a nice searchable way and it's really easy to check if your user is logged in on some random machine. It also an easy way to check for rouge users on your network.



## Publishing and feedback

The code is published on [PowerShellGallery][7].

Please help me out by testing it for me. I would love to know if this works in the real world 🙂


`# To install Get-ActiveUser
Install-Module Get-ActiveUser
#To install Start-Multithread
Install-Module Start-Multithread
`This should work when you have WMF 5 + installed and on Windows 10 out of the box. 

As this is my third blogpost ever I would love some feedback. Is there something I could do better or in a better format? Have you used this and for what? Please let me know in the comments 🙂



#### Contact me

Twitter [@mrhvid][8]  
Web [Jonas.SommerNielsen.dk][9]

 [1]: https://gallery.technet.microsoft.com/scriptcenter/d46b1f3b-36a4-4a56-951b-e37815a2df0c
 [2]: http://www.peetersonline.nl/2008/11/oneliner-get-logged-on-users-with-powershell/
 [3]: http://learn-powershell.net/2010/11/01/quick-hit-find-currently-logged-on-users/
 [4]: https://powershell.org/2015/08/12/template-based-parsing-and-progress-bars/
 [5]: https://github.com/mrhvid/Get-ActiveUser
 [6]: https://powershell.org/2015/08/20/multithreading-using-jobs/
 [7]: https://www.powershellgallery.com/packages/Get-ActiveUser/
 [8]: https://twitter.com/mrhvid
 [9]: http://Jonas.SommerNielsen.dk
