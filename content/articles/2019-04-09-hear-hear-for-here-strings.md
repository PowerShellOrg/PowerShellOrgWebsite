---
title: Hear, Hear for Here-Strings
authors:
  - pwshliquori
date: "2019-04-09T01:40:55+00:00"
categories:
  - Tips and Tricks
  - Tools
aliases:
  - /2019/04/hear-hear-for-here-strings/
---

Running commands in PowerShell that require a format that will not run natively in PowerShell could be a difficult task, or can it? PowerShell provides a way to store, for example, a JSON as a string, enter here-string. A here-string is a single or double quoted string in which the quotation marks are interpreted literally. An example would be invoking a Rest API that requires a JSON body. Lets take a look at an example and see how here-strings work.

Trying to store JSON in a variable will return the following error: 


`$Body =
{
    "apple": [
        "red",
        "green"
    ],
    "grape": [
        "green",
        "red"
    ],
    "blueberry": "blue"
}
At line:3 char:12
+     "apple": [
+            ~
Unexpected token ':' in expression or statement.
At line:6 char:6
+     ],
+      ~
Missing argument in parameter list.
At line:10 char:6
+     ],
+      ~
Missing argument in parameter list.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : UnexpectedToken
`Oh man... What happened? PowerShell does not understand what is being done and throws an error for an unexpected token. Lets declare this as a here-string by using 


`@'
`at the start and end of the JSON variable. 


`$Body = @'
{
    "apple": [
        "red",
        "green"
    ],
    "grape": [
        "green",
        "red"
    ],
    "blueberry": "blue"
}
'@
`Great! No errors were thrown, but… Why?

Notice the 


`@'
`at the beginning and end, this tells PowerShell to create a here-string and store this string in a variable. Also, a rule to follow: the 


`@'
`must be on their own line at the start and end of the declaration or the here-string will not be declared.


`# This will not work, PowerShell will not throw an error, but thinks you are still working to create something.
$Body = @'{
    "apple": [
        "red",
        "green"
    ],
    "grape": [
        "green",
        "red"
    ],
    "blueberry": "blue"
}
'@
`We can also store variables in a here-string, but that requires double quotes after the 


`@
`. The same rules apply as using single quoted here-strings.


`$Red = 'red'
$Green = 'green'
$Blue = 'blue'
$Body = @"
{
    "apple": [
       $Red,
       $Green
    ],
    "grape": [
        $Green,
        $Red
    ],
    "blueberry": $Blue
}
"@
`Now that we built our here-string, we can now invoke a Rest API and do something with it. This will help when a vendor supplies a JSON payload to be used in a Rest API, all that needs to be done is substitute your values in a here-string and invoke the Rest API. As always, practice makes perfect, try running examples in the console before running in a production environment. Here-strings will save you some lines of code and time when building your PowerShell scripts.

To learn about here-strings, visit Microsoft's documentation on quoting rules.  
[https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-6][1] 

Chris Liquori - Twitter: [@pwshliquori][2]

 [1]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-6
 [2]: https://twitter.com/pwshliquori
