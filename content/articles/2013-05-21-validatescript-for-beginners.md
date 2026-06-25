---
title: ValidateScript for Beginners
authors:
  - June Blender
date: "2013-05-21T18:03:27+00:00"
aliases:
  - /2013/05/validatescript-for-beginners/
---

There"™s been a lot of chatter about in Scripting Games 2013 blog posts about the ValidateScript attribute. The chatter is, appropriately, confined to the advanced events "“ this sort of thing is not expected in a one-liner. But I thought I"™d take a minute and demystify it "“ and discuss an issue that it raises about when input should be rejected.  
Let"™s start with a quick description of ValidateScript and its siblings. For help, see [about_functions_advanced_parameters][1].

## What is ValidateScript?

ValidateScript and its siblings are _parameter validation attributes_. These attributes are statements that are added to the parameter definition. They tell Windows PowerShell to examine the parameter values that are used when the function is called and determine whether the parameter values meet some specified conditions. In particular, ValidateScript lets you write a script block to test the conditions that the values must satisfy. Windows PowerShell runs the validation script on the parameter values and, if the script returns $False, it throws a terminating error.  
Before we get to the details, let"™s talk about why you"™d want to use something like this. The answer is simplicity. "What!!?!," you say, incredulously? The syntax of this thing looks like a sampler of Windows PowerShell enclosures. There"™s a square bracket "[" or two "]", a pair of parentheses "( )" and even some curly braces "{  }". So it doesn"™t look simple.  
But once you get over the syntax, you realize that putting the parameter value validation into the parameter definition means that you don"™t need to test the parameter value in your script. Instead, the Windows PowerShell engine tests the parameter value and you can use the script to do scripty things.

# Using ValidateScript

Here"™s what I mean. Here"™s a silly function that will serve as our example.


`function Get-EventDate
{
    Param($EventDate)
    if ($EventDate -is [DateTime] -and $EventDate -gt (Get-Date))
        {"The event is happening on $EventDate."}
    else
        {Write-Error "Event date must be a DateTime object `
         that represents a date in the future."}
}
`The Get-EventDate function has a $EventDate parameter. If the value of the $EventDate parameter is a DateTime object and it"™s later than now, the function writes a nice sentence with the date to the console or host program. But, if the value of $EventDate is not a DateTime object, or it"™s not a future date, the function generates an error. (To be complete, this info would be in the Help for the function.)  
But much of this little function is wrapped around validating the value of the $EventDate parameter. So let"™s see if we can get Windows PowerShell to validate it for us.  
In this version, we add a parameter value type enclosed in square brackets ([DateTime]) on the line before the parameter name ($EventDate).  
But that"™s enough to allow us to delete the "if $EventDate "“is [DateTime]" from the If statement and from the error message.


`function Get-EventDate
{
    Param(
    [DateTime]
    $EventDate
    )
    if ($EventDate -gt (Get-Date))
      {"The event is happening on $EventDate."}
    else
      { Write-Error "Event date must represents a future date."}
}
`Let"™s make sure it works. I"™ll send it a process object instead of a date. And, sure enough, Windows PowerShell generates an error explaining that it can"™t convert ("process argument transformation" "“ oy!) a process object to a DateTime object.


`PS C:\> Get-EventDate -EventDate (Get-Process PowerShell)
Get-EventDate : Cannot process argument transformation on parameter
'EventDate'. Cannot convert the "System.Diagnostics.Process (powershell)"
value of type "System.Diagnostics.Process" to type "System.DateTime".
At line:15 char:26
+ Get-EventDate -EventDate (Get-Process PowerShell)
+                          ~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : InvalidData: (:) [Get -EventDate],
ParameterBindingArgumentTransformationException
+ FullyQualifiedErrorId : ParameterArgumentTransformationError,Get-EventDate
`Now, let"™s get Windows PowerShell to test the other date condition for us. Here"™s where ValidateScript comes in.  
The syntax is a bit wonky. ValidateScript is enclosed in square brackets: [ValidateScript]. Its parameter is enclosed in parentheses: [ValidateScript( )] and the parameter value is a script block, complete with curly braces: [ValidateScript({ Your-script-goes-here })]. I can never remember this, so I use an ISE snippet or copy it from [about_functions_advanced_parameters][1].  
But aside from the syntax, ValidateScript is easy to use. I just moved the (-gt (Get-Date)) from the script into the ValidateScript script block. Now, I can eliminate the error message, too.  
In the script block, "$_" represents the parameter value. If a parameter takes a collection (more than one) of objects, "$_" represents each value in the collection, which is tested one at a time "“ no need for a Foreach-Object command.


`function Get-EventDate
{
    Param(
    [ValidateScript({$_ -gt (Get-Date)})]
    [DateTime]
    $EventDate
    )
    "The event is happening on $EventDate."
}
`When a parameter value fails a test, ValidateScript generates a terminating error. If the parameter value takes a collection, like a list of dates, and any one of the dates fails the test, ValidateScript throws an error that stops the script, even if all other dates pass the test.  
Let"™s test by sending it a date in the past. (Today"™s date would generate the same error.) The error message explains (in more words that I could use) that the date failed the validation test.  
It"™s not a great error message, but it"™s the best we could do, because Windows PowerShell just executes the validation script in the script block. It can"™t guess your intent.


`PS C:\> Get-EventDate -EventDate (Get-Date -Month 9 -Day 21 -Year 2007)
Get-EventDate : Cannot validate argument on parameter 'EventDate'.
The "$_ -gt (Get-Date)" validation script for the argument with value
"9/21/2007 5:36:36 PM" did not return true. Determine why the validation
script failed and then try the command again.
At line:1 char:26
+ Get-EventDate -EventDate (Get-Date -Month 9 -Day 21 -Year 2007)
+                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : InvalidData: (:) [Get-EventDate], ParameterBindingValidationException
+ FullyQualifiedErrorId : ParameterArgumentValidationError,Get-EventDate
`And, just for kicks, let"™s pass it a date in the future. This one works.


`PS C:\ > Get-EventDate -EventDate (Get-Date -Month 9 -Day 21 -Year 2013)
The event is happening on 09/21/2013 18:00:50.
`## ValidateScript in Advanced Functions

This is the sort of clever thing that the advanced folks are doing. For example, here"™s the parameter section from Toni"™s totally terrific Archival Atrocity solution.


`[CmdletBinding()]
param(
[ValidateScript({ Test-Path $_ -PathType Container })]
[string]$LogPath="C:\Application\Log",
[Parameter(Mandatory=$true)]
[ValidateScript({ Test-Path "$LogPath\*" -Include $_ -PathType Container })]
[string[]]$ApplicationLogFolder,
[Parameter(Mandatory=$true)]
[ValidateScript({ Test-Path $_ -PathType Container })]
[string]$DestinationPath,
[int]$Period=90
)
`We"™re not even in the function statements yet, but we already know for sure that the values of the $LogPath, $ApplicationLog, and DestinationPath parameters are folders (not files), and the full path to these folders already exists in the file system. Not bad! Excellent, really. Clever enough to win second prize in the Nobel Prizes of PowerShell scripting. (Congratulations, Toni!)  
In fact, almost all of the advanced scripts used validation parameters. Take a peek. Keep a copy of [about_functions_advanced_parameters][1] nearby.

## Should we use ValidateScript?

This is very clever scripting, but is it a good idea? It"™s easier for the author and easier to maintain, because the conditions are in a predictable place.  
But, is this the right thing to do for users? I don"™t know the answer, but I think that we, as a community, need to consider the question.  
Jeffrey Snover, the Windows PowerShell grand architect, wisely proclaims that Windows PowerShell differs from other languages in that scripts should "just work." Windows PowerShell scripts should make the user successful.  
The language goes to all ends in its pursuit of this principle. When you send the wrong type of parameter value to a cmdlet, Windows PowerShell tries to convert the value to the right type. It returns an error only when its attempts to convert fail.  
In Windows PowerShell 3.0, if you send it a collection of object and ask for a property that the collection doesn"™t have, Windows PowerShell checks to see if the objects in the collection have that property and, if they do, it returns the property value. (Try: (Get-Process).Name ).  
If you ask Windows PowerShell 3.0 how many items are in an empty object, it tells you 0, even though empty objects don"™t have a Count or Length property.


`PS C:\> $zoo = $null
PS C:\> $zoo.Count
0
`Many scripts, including those we"™ve seen in these esteemed Games, have elaborate try-catch syntax to capture errors and create a pleasant user experience.  
So, given that background, should we encourage scripting techniques that throw errors to users, instead of making them successful? And, in particular, errors that cannot provide very helpful error messages?  
Personally, I prefer scripts that optimize the user experience, instead of the authoring experience. In the Get-EventDate example, where I planned to write an error anyway, ValidateScript is probably a cleaner alternative. But in the Archival Atrocity script, it would have been a much better user experience to create a directory if it didn"™t already exist.  
On the other hand, if I were writing a script only for myself, I would keep it strict. I would prefer the error message to the risk that I just created a directory structure for a typo.  
What do you think? Should we create community guidance for using validation attributes?

 [1]: http://go.microsoft.com/fwlink/?LinkID=135173
