---
title: Using Local Functions in a Scriptblock with Existing Code
authors:
  - timpringle
date: "2016-01-18T15:14:03+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
aliases:
  - /2016/01/using-local-functions-remotely-in-an-existing-scriptblock/
---

When you are wanting to run code remotely, it's common to do this via the use of **Invoke-Command** (though other options exist, such as through **Start-Job** for example). The biggest downfall to date i've found with remoting is the lack of an option to combine the use of your local functions within a _ScriptBlock_ that has other code in it. As an example, the following is not possible:


`function Add ($param1, $param2)
{
$param1 + $param2
}
function Multiply($param1,$param2)
{
$param1 * $param2
}
Invoke-Command -ComputerName $env:COMPUTERNAME -ScriptBlock {
$addResult = Add $args[0] $args[1]
$multiplyResult = Multiply $args[0] $args[1]
Write-Output "The result of the addition was : $addResult"
Write-Output "The result of the multiplication was : $multiplyResult"
} -ArgumentList 3, 2
`However, there is a way to achieve this type of operation, and make as many local functions as you want available to be used and combined with other code in your _ScriptBlock_. You can find the full article at [powershell.amsterdam](http://www.powershell.amsterdam/2015/11/09/using-local-functions-on-remote-computers/).
