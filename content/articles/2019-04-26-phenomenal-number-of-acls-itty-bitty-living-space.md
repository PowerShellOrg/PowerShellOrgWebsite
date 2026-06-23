---
title: Phenomenal number of ACLs, itty-bitty living space
author: Mark Roloff
authors:
  - Mark Roloff
date: "2019-04-26T16:19:53+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
legacy_featured_image: /wp-content/uploads/2019/04/itty-bitty_living_space.png
aliases:
  - /2019/04/phenomenal-number-of-acls-itty-bitty-living-space/
---

I recently had a need to backup file and folder ACLs for a client that would then need to restore them to their original objects following a hardware upgrade that would wipe them out. Easy enough, but the catch was that there was 1.5 million of them. Fortunately, getting ACLs in PowerShell is easy.


`PS > Get-Acl -Path somefile.txt
    Directory: C:\
Path          Owner                  Access
----          -----                  ------
somefile.txt  BUILTIN\Administrators BUILTIN\Administrators Allow...
`See? 

Now, if you needed multiple ACLs, say, all 1.5 million of them on a file share, you could use **Get-ChildItem** to feed files and folders to **Get-Acl**. But then what? **Export-Clixml** is a generally great way to convert a PowerShell object to XML and save it to file.


`PS > Get-Acl -Path somefile.txt | Export-Clixml -Path AclBackup.ps1xml
`You then get an ugly monstrosity that looks like this.

![](https://powershell.org/wp-content/uploads/2019/04/image.png)  

In my case, there's a serious problem with this approach. Ballpark 100 lines per ACL x 1.5 million filesystem objects = 150 million lines of backup data, and my small test on several thousand files and folders was already about 32MB on disk. In production, it would balloon to a hefty size and this needed to run on a server with 3.5GB of RAM and space constraints. Yeah... I'm not offering that as a solution to anybody.

Luckily, we can do a little dotnet black magic to trim this down to something much more manageable. Thanks to sk82jack and Chris Dent in the PowerShell Discord, I learned that the [SDDL][1] is the only component that's really necessary for recreating the ACL object. They look like this:


`O:BAG:S-1-5-21-1192226125-608885206-469304335-1001D:AI(A;ID;FA;;;BA)(A;ID;FA;;;SY)(A;ID;0x1200a9;;;BU)(A;ID;0x1301bf;;;AU)
`File ACLs are **[System.Security.AccessControl.FileSecurity]** type objects and folder ACLs are **[System.Security.AccessControl.DirectorySecurity]** type objects. 


`PS > [System.Security.AccessControl.FileSecurity]::new()
Path Owner Access
---- ----- ------
`Instantiating one of these just gives us a blank object, but we can feed the SDDL as a string to the **SetSecurityDescriptorSddlForm()** method in order to populate it.


`PS > $a = [System.Security.AccessControl.FileSecurity]::new()
PS > $a.SetSecurityDescriptorSddlForm('O:BAG:S-1-5-21-1192226125-608885206-469304335-1001D:AI(A;ID;FA;;;BA)(A;ID;FA;;;SY)(A;ID;0x1200a9;;;BU)(A;ID;0x1301bf;;;AU)')
PS > $a
Path Owner                       Access
---- -----                       ------
     NT SERVICE\TrustedInstaller NT AUTHORITY\SYSTEM Allow  Modify, Synchronize...
`I haven't seen a way to fill in the path but that's easily worked around. Armed with this information, I would only need to backup the full path of each object, whether it is a file or a folder, and the SDDL.


`Get-ChildItem -Path C:\apps -Recurse | Foreach-Object {
    [pscustomobject]@{
        Path        = $_.Fullname
        IsContainer = $_.PSIsContainer
        Sddl        = $(Get-Acl -Path $_.Fullname).Sddl
    }
}
Path                             IsContainer Sddl
----                             ----------- ----
C:\apps\aclbackup.ps1xml               False O:S-1-5-21-1192226125-608885206-469304335...
C:\apps\az_tenant2tenant.ps1           False O:BAG:S-1-5-21-1192226125-608885206-46930...
C:\apps\bb_saml_resp_success.xml       False O:S-1-5-21-1192226125-608885206-469304335...
C:\apps\somefile.txt                   False O:S-1-5-21-1192226125-608885206-469304335...
C:\apps\testvnet.json                  False O:BAG:S-1-5-21-1192226125-608885206-46930...
`Now we're getting somewhere. Flat objects like this will export nicely to CSV, which would be significantly smaller on disk than the ps1xml we started with. When I run the code above against a directory tree with about 56k objects and pipe it to **Export-Csv**, I end up with a 16MB CSV. Some PowerShell napkin math to double-check this...


`PS >  16MB / 56000
299.593142857143     # Just shy of 300 bytes per ACL
PS > (300 * 1500000) / 1MB     # Per ACL size by the number of ACLs, converted to MBs
429.153442382813
`... So around 430MB. That sounds like a much more reasonable backup size to me and it won't chew through what little RAM I have to work with. If we went with **Export-Clixml**, it would have ended up around 8GB, taken significantly longer to run, and probably would have crashed.

So how would we restore these?


`$ACLs = Import-Csv -Path AclsBackup.csv
foreach ($ACL in $ACLs) {
    switch ($ACL.IsContainer) {
        $true {
            $AclObj = [System.Security.AccessControl.DirectorySecurity]::new()
            $AclObj.SetSecurityDescriptorSddlForm($ACL.Sddl)
            Set-Acl -Path $ACL.Path -AclObject $AclObj
        }
        $false {
            $AclObj = [System.Security.AccessControl.FileSecurity]::new()
            $AclObj.SetSecurityDescriptorSddlForm($ACL.Sddl)
            Set-Acl -Path $ACL.Path -AclObject $AclObj
        }
    }
}
`And simple as that the ACLs right back where they came from.

 [1]: https://docs.microsoft.com/en-us/windows/desktop/secauthz/security-descriptor-definition-language-for-conditional-aces-
