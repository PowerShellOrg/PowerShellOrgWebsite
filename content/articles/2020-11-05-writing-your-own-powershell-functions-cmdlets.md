---
title: Writing Your Own PowerShell Functions / Cmdlets
authors:
  - tobor79
date: "2020-11-05T18:53:35+00:00"
categories:
  - PowerShell for Admins
tags:
  - Functions
  - Modules
  - Comment-Based Help
  - Best Practices
aliases:
  - /2020/11/writing-your-own-powershell-functions-cmdlets/
---

This article is an attempt at describing some of my thought process when building functions. By functions I mean a command that you can execute after importing a module. I am not referring to running a script that accepts parameters and input. Having a task to complete for a function is of course the first objective. Once an idea is in mind I like to write as much as the Help section first as possible as this helps me outline and plan what I am going to do.


**Writing The Help Section**


Start with the easy part first, the **SYNOPSIS**. Best practice for this states that you should NOT include the name of your function or cmdlet in this section of the help. The idea behind this is similar to the idea that you do not want to use a word to define a word. That is one of those things that has always driven me crazy so I make a point to not be one of the references that does that. This section should be a very short description of what your cmdlet does. I typically start this sentence with the phrase format; "This cmdlet was created to accomplish this task on local and remote devices using WinRM to connect to remote devices".

The next part I start to write is the **DESCRIPTION**. Depending on how much you have planned out in your head you may not delve to deeply into this section yet. This is the area where you add details that may be useful to know about your function as well as instructions and insights. This might include information on how the pipeline works or settings required for the command to work.

With those descriptions fresh in mind I like to start the **PARAMETER** section. Parameter names should be singular and not plural, even if your parameter is an array. You do not need to get all of these ahead of time however, if you know you want your cmdlet to work on remote devices it is a good idea to start with the "ComputerName" parameter and if you are using WinRM use the "UseSSL" Parameter to cover all environment situations as best you can. Underneath the parameter's name in the help section you should provide a brief description of the parameters use to describe what the parameter is and the default value if you plan on giving it one. It is best practice to name the parameter with something typical of PowerShell. This is for interoperability as well as maintaining a set of standards. For example, I used the parameter title "ComputerName" and not hostname or FQDN. This should pretty much be the case for that situation every time. In a few cases, Computer is an acceptable parameter. An example of a case where this is acceptable is when your cmdlet is going to be passing the value of the $Computer parameter to a cmdlet that uses -Computer instead of -ComputerName. One such function that uses -Computer is Invoke-GPUpdate. With the "Computer" parameter value going into the Invoke-GPUpdate cmdlet it is best practice to use Computer and not ComputerName. Another thing I do sometimes is if I am going to use the -ComputerName parameter to pass the value to "Invoke-Command" or "New-PSSession" I do the below command :

`Get-Help -Name Invoke-Command -Parameter ComputerName`

I then copy and paste the description of that parameter into my functions description for that parameter since they are basically mirrored. This is a good way to provide the best information possible.

The **EXAMPLE** section I do not write until after I have completed the function. This prevents the need to make any unnecessary changes later on to this section. I have made assumptions thinking this section is done and it is left outdated using parameters that don't exist anymore. That is why I believe this is easiest to do last. If your command accepts pipeline input you should have an example demonstrating how that works and not just assume people will understand by reading everything else you have written. This may be the only thing they read. You should also demonstrate each parameter at least one of your examples. The more use cases you can come up with the better. I have found this practice to really improve my function development as well as my understanding of how PowerShell works. After each command example use a commented line to add a description of what each command example is accomplishing.

In the **NOTES** section I typically put my name as the author and contact information if someone needs to contact me on the function for whatever reason. Notes about your function can be added here as well.

I use the **LINK** section to include any documentation I may have used to write the cmdlet however this typically just includes links to my GitHub and other sites related to myself.

The **INPUTS** section is for defining the .NET class types that your cmdlet accepts as input from the pipeline. Most of the time this is going to be something like System.String or System.Array when used. If you do not have the property value "ValueFromPipeline=$True" set on any of your parameters, the INPUTS section should be set to "None". If you are piping input to a specific cmdlet you can pull the trick I did earlier to obtain the INPUTS information using the below command:

`Get-Help -Name Enter-PSSession -Full | Out-String -Stream | Select-String -Pattern "INPUTS" -Context 1,4`

The **OUTPUTS** section is the .NET class type that your cmdlet returns as a value(s). One thing I have been meaning to do to work on expanding my knowledge is to consistently add the expected returned Outputs to the CmdletBinding property in my functions.




**Outlining The Function**


We are now ready to start working on the function. To name the function we need to use one of the PowerShell approved "Verbs". Use the command "Get-Verb" to retrieve a list of possible options as well as what they refer too. It is best practice to use these verbs as they will help with how PowerShell accepts pipeline input. If you need help in choosing a verb for your function I suggest checking out this [Microsoft article][1].  
    If you are going to accept pipeline input in your function; (_One of your parameter properties has a value of "ValueFromPipeline=$True"_) ; you should start out by creating 3 sections. Begin, Process, and End. For each value in the pipeline being passed to your function, the begin section will be carried out first. Typically I use the Begin section to

  * Import modules if any are needed
  * Define any variables that need to be defined
  * Ensure values are correct if not done already using something such as "ValidateScript".

Everything in the Begin brackets get executed before moving to the Process brackets and so forth. "Begin" is optional really as is the "End" section.

    The "End" section I use to

  * Close any open sessions
  * Clear variables if that needs to be done
  * Return the object or results of the Process section

The Process section should contain the meat of your cmdlets. This is going to be where the main purpose of your function is carried out.

If you are not using pipeline input in your function you do not need to include those 3 sections. You can simply just start putting together whatever you need.


**Example Using Information So Far**


The example function I am going to use here will be for a function I created to encode and decode Base64 values. The verb I am going to use is "Convert". I chose this value because the cmdlet is going to be changing the data from one representation to another. The Noun I am going to choose can be whatever I want really. To make the cmdlet easy to understand I am going to name it Convert-Base64. I could choose to create two different functions, for example ConvertTo-Base64 and ConvertFrom-Base64. I would personally rather use one command to perform both tasks as this is the kind of function that typically gets used both ways. Now that I know the name of my function I can write my help section which is below.

You can see from the above section that I have a good idea of how this is going to work. I next start my functions build by defining my parameters. I typically will always add **[CmdletBinding()]** to my functions. What this does is allow the use of 7 common parameters in PowerShell functions. Some examples of these are -Verbose, Debug, ErrorAction, ErrorVariable, etc. This also allows me to easily define a Default Parameter Set name which I have found to be a great way of simplifying my functions and improving execution times.


`Function Convert-Base64 {
    [CmdletBinding(DefaultParameterSetName='Encode')]
        param(
            [Parameter(
                Mandatory=$True,
                Position=0,
                ValueFromPipeline=$True,
                HelpMessage="Enter a string you wish to encode or decode using Base64. Example: Hello World!")] # End Parameter
            [String]$Value,
            [Parameter(
                ParameterSetName='Encode',
                Mandatory=$True)]
            [Switch][Bool]$Encode,
            [Parameter(
                ParameterSetName='Decode',
                Mandatory=$True)]
            [Switch][Bool]$Decode,
            [Parameter(
                Mandatory=$False,
                ValueFromPipeline=$False)]  # End Parameter
            [ValidateSet('ASCII', 'BigEndianUnicode', 'Default', 'Unicode', 'UTF32', 'UTF7', 'UTF8')]
            [String]$TextEncoding = 'UTF8'
        ) # End param
BEGIN
{...}}
`Notice in the above I have two "Switch" parameters. I have given them bool values so I can use the attribute "IsPresent" in any "If" statements that come up. For example I could do


`If ($Encode.IsPresent) { $Value = 'Encode' }
`I have also created two parameter set names. The reason for this is to ensure that only one option or the other is selected. We need to know whether to Encode or Decode the -Value parameters value. This prevents errors from occurring because the person executing the function may think extra parameters need to be defined. This may not always be as intuitive as this function. It is a best practice that should be adhered too. It eliminates the need to add code in your function that attempts to accomplish this same task. For example, if you did not create the Parameter Set names you would need to do this in your "BEGIN" brackets to ensure one of the other was defined.


`If (!($Encode.IsPresent -or $Decode.IsPresent))
{
    Throw "Switch parameter -Decode or -Encode needs to be defined. "
} # End If
`The Parameter "Value" is mandatory and accepts pipeline input. I did not include the property "ValueFromPipelineByPropertyName" because we want to convert a string and not just the property value of a PowerShell object. This places a limitation on the kind of value placed to cmdlet which we do not want in this scenario. The HelpMessage property for this parameter can be used here because the "Value" property is Mandatory. If the property is not included when the cmdlet is executed, PowerShell will prompt the executor for this value using the message you define there. If you are familiar with bash and python you probably are familiar with positional parameters. This is the same concept here when defining the Position value. I like to set this value to prevent the need for someone using the cmdlet to enter each parameter value. Position=0 is referring to the first value after Convert-Base64. In an example this gives us the ability to do:


`Convert-Base64 'Convert me to base64' -Encode
`Instead of:


`Convert-Base64 -Value 'Convert me to base64' -Encode
`We can also prevent the need to include -Encode by setting a default Parameter Set Name value. This is done by changing


`[CmdletBinding()]
`To


`[CmdletBinding(DefaultParameterSetName='Encode')]
`The person executing the command can now simply do this to encode their string :


`Convert-Base64 'Convert me to base64'
`In the "TextEncoding" parameter I did my best to name this as I do not know of any functions that offer this kind of option. I have added **[ValidateSet()]** to this parameter because I know all the possible values that can be used and we do not want anything else to be in this value. This also creates a Tab Autocomplete for the person using the cmdlet which saves typing as well. Other options that can be used to validate parameter values are **ValidateRange** and **ValidateScript**. These are the 3 I use most often. Validate your parameters whenever possible as this shows a professionalism in your abilities and will set you apart from others. It also ensures that your cmdlets work as expected. In the PROCESS area of my cmdlet I am using the .NET object System.Text.Encoding to convert the base64 related values. I used Tab autocomplete to come up with the list in "ValidateSet".


`[ValidateSet('ASCII', 'BigEndianUnicode', 'Default', 'Unicode', 'UTF32', 'UTF7')]
`**
Building the Body of the Cmdlet
**

There are a couple of values that exist by default in every function. The main ones to know that get used often are PSCmdlet and PSBoundParameters. I often use these in Switch statements to help guide the direction of my functions script execution. For example you could do something such as

**$PSCmdlet.ParameterSetName** to refer to the parameter set name your function is using. In my example, the default value for this would be 'Encode'. You can also return the value of your parameters using **$PSBoundParameters.Keys.Value**

In our situation there is not really a good way to use the BEGIN brackets. This section is optional so I am going to jump right into the PROCESS brackets. I am going to add a Switch statement to my PROCESS brackets using $PSCmdlet.ParameterSetName. If the parameter set name is Encode the commands inside the brackets next to encode will be executed. Same goes for Decode if that is the parameter set name defined.


`PROCESS {
    Switch ($PSCmdlet.ParameterSetName)
    {
        'Encode' { }
        'Decode' { }
    }  # End Switch
`Now that the cmdlet knows which action to carry out, I need to work with the next parameter value needed to be defined before the convert action can be taken. This is the "TextEncoding" parameter. I am going to make another switch statement for this.

**NOTE**: As a side note Switch statements are faster than If statements in situations such as this where we have a good amount of options to filter through.

Below is my switch statement. I am using this to convert the string value into whatever character encoding I want converted to Base64.


`Switch ($TextEncoding)
{
    'ASCII' {$StringValue  = [System.Text.Encoding]::ASCII.GetBytes("$Value")}
    'BigEndianUnicode' {$StringValue  = [System.Text.Encoding]::BigEndianUnicode.GetBytes("$Value")}
     'Default' {$StringValue  = [System.Text.Encoding]::Default.GetBytes("$Value")}
     'Unicode' {$StringValue  = [System.Text.Encoding]::Unicode.GetBytes("$Value")}
     'UTF32'  {$StringValue  = [System.Text.Encoding]::UTF32.GetBytes("$Value")}
     'UTF7' {$StringValue  = [System.Text.Encoding]::UTF7.GetBytes("$Value")}
     'UTF8' {$StringValue  = [System.Text.Encoding]::UTF8.GetBytes("$Value")}
}  # End Switch
`Once that value is defined the convert operation can be carried out. Error handling is another important aspect of cmdlet building. Typically we can accomplish this using Try Catch statements. Also using the -ErrorVariable parameter of a cmdlet is a great way to handle errors and redirect your functions execution.

**NOTE**: A good thing to know about Try Catch is there is a third option called Finally. If you were to stop the execution of a function using Ctrl + C while inside of a Try Catch statement, the code inside the Finally brackets will still execute. This is great for leaving an infinite"While" loop with a message like "Exiting loop".

Below is the Try Catch statement I have added:


`Try
{
    [System.Convert]::ToBase64String($StringValue)
} # End Try
Catch
{
    Throw "String could not be converted to Base64. The value entered is below. `n$Value"
    $Error[0]
} # End Catch
`Notice the value **$Error[0]** I have included in the Catch brackets. This is another value that is automatically assigned when an error occurs inside a cmdlet. Using the first positional value "0" of $Error will put the PowerShell generated error message on screen. Otherwise the only message being displayed would be mine which is not going to give information on what caused the error. You are able to add multiple catch statements where you can catch specific error types to provide your own messaging in each situation. To do this you need to know the object name of the error that will occur. Just to provide an example of this you could catch incorrectly entered credentials in a catch statement using the below:


`Catch [System.Security.Authentication.AuthenticationException]
{
    Throw "The credentials you entered were incorrect"
}  # End Catch
Catch
{
    $Error[0]
}
`The END brackets are also optional. Usually I use this area to close any session connections and to build a custom object. However to save script execution time, I am not going to do include that in this cmdlet. Whatever results are returned from the Try Catch statements is going to be the result of the command. The final result of these efforts can be view in the code below or at this [LINK:](https://github.com/tobor88/PowerShell-Red-Team/blob/master/Convert-Base64.ps1)





`<#
.SYNOPSIS
This cmdlet is used to Encode or Decode Base64 strings.
.DESCRIPTION
Convert a string of text to or from Base64 format. Pipeline input is accepted in string format. Use the switch parameters Encode or Decode to define which action you wish to perform on your string
.PARAMETER Value
Defines the string to be encoded or decoded with base64.
.PARAMETER Encode
This switch parameter is used to tell the cmdlet to encode the base64 string
.PARAMETER Decode
This switch parameter is used to tell the cmdlet to decode the base64 string
.PARAMETER TextEncoding
This parameter is used to define the type of Unicode Character encoding to convert with Base64. This value you can be ASCII, BigEndianUnicode, Default, Unicode, UTF32, UTF7, or UTF8. The default value is UTF8
.EXAMPLE
Convert-Base64 -Value 'Hello World!'' -Encode
# This example encodes "Hello World into Base64 format.
.EXAMPLE
Convert-Base64 -Value 'SGVsbG8gV29ybGQh' -Decode -Encoding ASCII
# This example decodes Base64 to a string in ASCII format
.NOTES
Author: Robert H. Osborne
Alias: tobor
Contact: rosborne@osbornepro.com
.LINK
https://roberthsoborne.com
https://osbornepro.com
https://btps-secpack.com
https://github.com/tobor88
https://gitlab.com/tobor88
https://www.powershellgallery.com/profiles/tobor
https://www.linkedin.com/in/roberthosborne/
https://www.youracclaim.com/users/roberthosborne/badges
https://www.hackthebox.eu/profile/52286
.INPUTS
System.String, -Value accepts strings from pipeline.
.OUTPUTS
System.String
#>
Function Convert-Base64 {
    [CmdletBinding(DefaultParameterSetName='Encode')]
        param(
            [Parameter(
                Mandatory=$True,
                Position=0,
                ValueFromPipeline=$True,
                HelpMessage="Enter a string you wish to encode or decode using Base64. Example: Hello World!")] # End Parameter
            [String]$Value,
            [Parameter(
                ParameterSetName='Encode',
                Mandatory=$True)]
            [Switch][Bool]$Encode,
            [Parameter(
                ParameterSetName='Decode',
                Mandatory=$True)]
            [Switch][Bool]$Decode,
            [Parameter(
                Mandatory=$False,
                ValueFromPipeline=$False)]  # End Parameter
            [ValidateSet('ASCII', 'BigEndianUnicode', 'Default', 'Unicode', 'UTF32', 'UTF7', 'UTF8')]
            [String]$TextEncoding = 'UTF8'
        ) # End param
PROCESS
{
    Switch ($PSCmdlet.ParameterSetName)
    {
        'Encode' {
            Switch ($TextEncoding)
            {
                'ASCII' {$StringValue  = [System.Text.Encoding]::ASCII.GetBytes("$Value")}
                'BigEndianUnicode' {$StringValue  = [System.Text.Encoding]::BigEndianUnicode.GetBytes("$Value")}
                'Default' {$StringValue  = [System.Text.Encoding]::Default.GetBytes("$Value")}
                'Unicode' {$StringValue  = [System.Text.Encoding]::Unicode.GetBytes("$Value")}
                'UTF32'  {$StringValue  = [System.Text.Encoding]::UTF32.GetBytes("$Value")}
                'UTF7' {$StringValue  = [System.Text.Encoding]::UTF7.GetBytes("$Value")}
                'UTF8' {$StringValue  = [System.Text.Encoding]::UTF8.GetBytes("$Value")}
            }  # End Switch
            Try
            {
                [System.Convert]::ToBase64String($StringValue)
            } # End Try
            Catch
            {
                Throw "String could not be converted to Base64. The value entered is below. `n$Value"
                $Error[0]
            } # End Catch
        }  # End Switch Encode
        'Decode' {
            $EncodedValue = [System.Convert]::FromBase64String("$Value")
            Switch ($TextEncoding)
            {
                'ASCII' {
                    Try
                    {
                        [System.Text.Encoding]::ASCII.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch ASCII
                'BigEndianUnicode' {
                    Try
                    {
                        [System.Text.Encoding]::BigEndianUnicode.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch BigEndianUnicode
                'Default' {
                    Try
                    {
                        [System.Text.Encoding]::Default.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch Default
                'Unicode' {
                    Try
                    {
                        [System.Text.Encoding]::Unicode.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch Unicode
                'UTF32'  {
                    Try
                    {
                        [System.Text.Encoding]::UTF32.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch UTF32
                'UTF7' {
                    Try
                    {
                        [System.Text.Encoding]::UTF7.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Swithc UTF7
                'UTF8' {
                    Try
                    {
                        [System.Text.Encoding]::UTF8.GetString($EncodedValue)
                    } # End Try
                    Catch
                    {
                        Throw "Base64 entered was not in a correct format. The value received is below. `n$Value"
                    } # End Catch
                }  # End Switch UTF8
            }  # End Switch
        }  # End Switch Decode
    }  # End Switch
}  # End PROCESS
} # End Function Convert-Base64
`Thanks for reading!

- [tobor](https://roberthosborne.com)

 [1]: https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7
