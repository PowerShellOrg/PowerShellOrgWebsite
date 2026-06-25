---
title: Abstraction and Configuration Data
authors:
  - pscookiemonster
date: "2015-08-16T20:55:20+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/abstraction-and-configuration-data/
---

Modularity and abstraction are a huge benefit in scripting and coding. Which of the following blocks of code are easier to understand?


`$SQLConnection = New-Object System.Data.SqlClient.SQLConnection
$SQLConnection.ConnectionString = 'Server=SqlServer1;Database=MyDB;Integrated Security=True;Connect Timeout=15'
$cmd = New-Object system.Data.SqlClient.SqlCommand("SELECT * FROM Table1",$SQLConnection)
$ds = New-Object system.Data.DataSet
$da = New-Object system.Data.SqlClient.SqlDataAdapter($cmd)
[void]$da.fill($ds)
$SQLConnection.Close()
$ds.Tables[0]
`Or...


`#
Invoke-Sqlcmd2 -ServerInstance SQLServer1 -Database MyDB -Query 'SELECT * FROM Table1'
`If you aren't a masochist, [the latter][1] probably looks a bit nicer. Oh, and it offers other parameters, error handling, parameterized SQL queries, built in help, and other benefits the .NET code block misses.

The takeaway? You should be writing or using Advanced Functions and Modules, not monolithic scripts and snippets. Do it for yourself. Do it for anyone who might have to read your code down the line.

Some modules can benefit from persistent configurations. If you have a module that wraps a REST API, you might want to allow the end user to specify a default URL, rather than specify it every time they run a command.

This begs the question: what data format should you use? XML? JSON? YAML? INI?

[This is a quick hit on options for storing configuration data in PowerShell][2].

Don't be ashamed. Many of us sysadmins pride ourselves on learning through experience. That doesn't mean you need to re-invent all the wheels. It can be a great learning experience to write your own code and functions, but at the end of the day, there's nothing wrong with finding the best tool for the job, and sticking with it. Developers make a living writing code, yet they all borrow existing libraries.

Once you start writing modules and advanced functions, be sure to [share them with the community][3]!

 [1]: https://raw.githubusercontent.com/RamblingCookieMonster/PowerShell/master/Invoke-Sqlcmd2.ps1
 [2]: http://ramblingcookiemonster.github.io/PowerShell-Configuration-Data/
 [3]: http://stevenmurawski.com/powershell/2015/8/moving-in-to-open-source
