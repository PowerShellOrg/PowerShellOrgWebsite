---
title: Name that Property
author: June Blender
authors:
  - June Blender
date: "2013-04-29T18:47:25+00:00"
aliases:
  - /2013/04/name-that-property/
---

Challenge #1 of Scripting Games 2013 is coming to a close. I can't wait to see the results! I solved both the Beginner and Advanced versions just for practice and I learned a lot along the way. They're not easy, but if you haven't yet tried them, go for it. And be sure to review the candidate solutions for new techniques.  
In my last post, I showed a very easy way to create a custom object in Windows PowerShell 3.0 and I argued that returning a custom object is far better than returning formatted objects. But, when you are formatting or selecting properties from an existing object, you can customize the names of the properties and their values. This techique isn't new to Windows PowerShell 3.0 "“ it works in all versions -- but it's really handy, and I've noticed that not a lot of people use it.  
Let's start by changing the name of a table column. In this case, the big boss wants a list of files and their attributes. Get-ChildItem ("dir") just about does it, but the property name is "Mode," not "Atrributes," and the big boss is a picky dude.


`PS C:\ Get-ChildItem
    Directory: C:\
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----         10/9/2012   1:05 PM            2008
d----         10/9/2012   1:05 PM            2009
d----         10/9/2012   1:05 PM            AssemblyTest
d----         10/9/2012   1:05 PM            CabTest
d----        10/24/2012   1:27 PM            Snippets
-ar--          3/7/2011   6:50 AM          0 ApplicationError.txt
-ar--        11/19/2010   2:42 PM        274 archive-Projects.ps1
-a--         12/13/2010  11:18 AM       3052 Backup-Files.ps1
-a--           3/2/2011   7:42 PM        312 Check-Examples.ps1
-a--          9/29/2010   6:57 AM        728 Compare-ParameterSets.ps1
-ar--        10/24/2012  12:44 PM       1146 Compare-UpdatableHelpVersion.ps1
`Quick fix! Change the name of the Mode property to Attributes.


`Get-ChildItem | Select-Object @{Name="Attributes";Expression={$_.Mode}}, `
LastWriteTime, Name
Directory: C:\
Attributes   LastWriteTime           Name
----------   -------------           ----
d----         10/9/2012   1:05 PM    2008
d----         10/9/2012   1:05 PM    2009
d----         10/9/2012   1:05 PM    AssemblyTest
d----         10/9/2012   1:05 PM    CabTest
d----        10/24/2012   1:27 PM    Snippets
-ar--          3/7/2011   6:50 AM    ApplicationError.txt
-ar--        11/19/2010   2:42 PM    archive-Projects.ps1
-a--         12/13/2010  11:18 AM    Backup-Files.ps1
-a--           3/2/2011   7:42 PM    Check-Examples.ps1
-a--          9/29/2010   6:57 AM    Compare-ParameterSets.ps1
-ar--        10/24/2012  12:44 PM    Compare-UpdatableHelpVersion.ps1
`Note: I omitted the Length property here so the table is easier to display, but you can add it back if you'd like.  
This value is called a _calculated property_. You can use calculated properties in Select-Object, Format-Table, and Format-List commands, and in commands that use other cmdlets where it's noted in the help topic.  
A _calculated property_ is a hash table (@{Name=Value; Name=Value"¦} ). The first key is either **Name** or **Label** and the second key is **Expression**. The value of the **Name** (or **Label**) key is the name that you want to assign to the property. The value of the **Expression** key is a script block (inside braces) that gets the property value.  
In this case, I just want to rename the "Mode" property to "Attributes," so the value of the **Name** key is "Attributes" and the value of the **Expression** key is a tiny script block that gets the value of the Mode property of each object that is passed to it.


`@{Name = "Attributes"; Expression = {$_.Mode}}
`Just for practice, let's rename "LastWriteTime" to "Updated."


`@{Name = "Updated"; Expression = {$_.LastWriteTime}}
`Now, you can use the calculated property in a Select-Object, Format-Table, or Format-List command. Put it where you usually put the property name.


`Get-ChildItem | Select-Object @{Name = "Attributes"; Expression = {$_.Mode}}, `
         @{Name = "Updated"; Expression = {$_.LastWriteTime}}, Name
Directory: C:\
Attributes   Updated                 Name
----------   -------                 ----
d----         10/9/2012   1:05 PM    2008
d----         10/9/2012   1:05 PM    2009
d----         10/9/2012   1:05 PM    AssemblyTest
d----         10/9/2012   1:05 PM    CabTest
d----        10/24/2012   1:27 PM    Snippets
-ar--          3/7/2011   6:50 AM    ApplicationError.txt
-ar--        11/19/2010   2:42 PM    archive-Projects.ps1
-a--         12/13/2010  11:18 AM    Backup-Files.ps1
-a--           3/2/2011   7:42 PM    Check-Examples.ps1
-a--          9/29/2010   6:57 AM    Compare-ParameterSets.ps1
-ar--        10/24/2012  12:44 PM    Compare-UpdatableHelpVersion.ps1
`After you've played with this for a while, try changing the value of the **Expression** key so that it gets exactly the value that you need instead of the default property value.  
What if the big boss wants that Updated (LastWriteTime) value in Coordinated Universal Time (UTC)? No problem! Just change the expression to call the ToUniversalTime method of DateTime objects. And while we're perfecting, let's change the property name to better describe its new value.  
Here's the calculated property:


`@{Name = "Updated_UTC";Expression={$_.LastWriteTime.ToUniversalTime()}}
`And here it is in a command:


`PS C:\ Get-ChildItem | Select-Object @{Name = "Attributes"; Expression = {$_.Mode}},
        @{Name = "Updated_UTC"; Expression = {$_.LastWriteTime.ToUniversalTime()}}, Name
Attributes    Updated_UTC               Name
----------    -----------               ----
d----         10/9/2012 8:05:46 PM      2008
d----         10/9/2012 8:05:46 PM      2009
d----         10/9/2012 8:05:46 PM      AssemblyTest
d----         10/9/2012 8:05:46 PM      CabTest
d----         10/24/2012 8:27:30 PM     Snippets
-ar--         3/7/2011 2:50:08 PM       ApplicationError.txt
-ar--         11/19/2010 10:42:33 PM    archive-Projects.ps1
-a---         12/13/2010 7:18:18 PM     Backup-Files.ps1
-a---         3/3/2011 3:42:02 AM       Check-Examples.ps1
-a---         9/29/2010 1:57:27 PM      Compare-ParameterSets.ps1
-ar--         10/24/2012 7:44:49 PM     Compare-UpdatableHelpVersion.ps1
`I find this technique to be really handy and I hope you do, too. Just don't get caught up in syntax errors. Remember that a calculated property ends in _**two braces**_; one to end the expression script block and the other to end the hash table.
