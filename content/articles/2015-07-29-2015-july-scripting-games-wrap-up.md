---
title: 2015-July Scripting Games Wrap-Up
authors:
  - Don Jones
date: "2015-07-29T17:39:26+00:00"
categories:
  - Scripting Games
aliases:
  - /2015/07/2015-july-scripting-games-wrap-up/
---

The [July puzzler][1] wasn't intended to break your brain - but it was intended to highlight an extremely important pipeline technique - and to make you think about how PowerShell parses command lines. Let's begin with our Celebrity Entry, from Boe Prox. We think you'll discover some interesting new techniques in this answer - and learn from understanding how he got there.

# Celebrity Entry

The 2015 Scripting Games have started and have taken a different route this year in that we are they are running a monthly puzzle vs. the usual format. That being said, I was asked to be a celebrity contestant and put together my solution as well as adding my thoughts (I promise to try and stay on a clear path) and various routes that I took to get to my final solution.

The event, while seemingly simple, did cause me to spend some time trying to whittle down the number of characters to try and get as few as possible (because shorter code, while harder to read is always fun to write ;)).

The rules of engagement for this particular puzzle are as follows:

_Write a one-liner that produces the following output (note that property values will be different from computer to computer; that’s fine). _

**_PSComputerName ServicePackMajorVersion Version  BIOSSerial  _**

_By definition, a one-liner is a single, long command or pipeline that you type, hitting Enter only at the very end. If it wraps to more than one physical line as you’re typing, that’s OK. But, in order to really test your skill with the parser, try to make your one-liner as short as technically possible while still running correctly._

That’s not all though, here are some extra pieces to make it a little more challenging;

  * Try to use no more than one semicolon total in the entire one-liner
  * Try not to use ForEach-Object or one of its aliases
  * Write the command so that it could target multiple computers (no error handling needed) if desired
  * Want to go obscure? Feel free to use aliases and whatever other shortcuts you want to produce a teeny-tiny one-liner.

Now that we have all of this understood, it is time to start looking at how I am going to handle this. 

I know already that I need to look at WMI as my source to pull this information. PSComputername is already available when I use Get-CIMInstance to handle my query.

The first thing that I need to do is that in order to pull both the **ServicePackMajorVersion** and **Version** I need to use the Cim_OperatingSystem class (it has everything I need from Win32_OperatingSystem, but at fewer characters!), but then I have the BIOSSerial property which happens to exist on the Win32_BIOS class. If I intend to overcome the _only use 1 semicolon_ challenge and also make this a one liner, I need to start thinking of a good workaround. Fortunately, a workaround exists in creating a custom property that will define the BIOSSerial label and then performs a query to the class that returns the serial number.


`Get-CIMInstance -Class Cim_OperatingSystem |
Select-Object PSComputername,ServicePackMajorVersion,Version,@{Label='BIOSSerial';Expression={(Get-CIMInstance -Class Win32_BIOS).SerialNumber}}
`This works great and also ensures that I only have a single semicolon to boot! At this point I technically have a submission that works…but it is missing a few things extra that would really meet all of the requirements to include being able to target multiple systems as well as shrinking the code down to its smallest possible size while still retaining its functionality.

## **Handling Multiple Systems**

First off is the concept of 
allowing for multiple systems
 (remember that this was one of the challenge requirements). I wanted something that would be dynamic enough to where I wasn’t hard coding a host file or computer names into the script.

I thought I could get away with this using Read-Host, but unfortunately for me, it displays everything as a single string, not an array of strings that I had hoped for. 


`(Read-Host ' ').GetType().Fullname
`That pretty much threw out one idea that I had until I had the idea of splitting the comma (which would be the common character to use with building a collection of items) if it was used with Read-Host and instantly this is back in the game! I also realized that I just needed to give a single character (that wasn’t a single or double quote) to knock out a couple of characters for the prompt.


`(Read-Host .).split(',')
`I almost thought that I had this done until I did a little more research. Sure enough, there is a better approach to be had here in the form of **Echo**, which happens to be an alias for Write-Output. If nothing is supplied to it, it prompts for input and continues to do so until you hit return on an empty line which means…you guessed it…instant collections that can be passed to the command!

That really knocked down my character count!

## **Shrinking Cmdlets**

Obviously, this is where aliases begin to come into play. I start knocking down my cmdlets to get them as small as possible. Get-WMIObject becomes gwmi and Select-Object becomes Select. Next up I can take my custom property and bring Label down to just ‘l’ and then make Expression ‘e’.  Because it was not explicitly mentioned that we would be outputting this to a file or doing anything else with it, I am going to instead use Format-Table, or more appropriately, its alias of **FT** to further reclaim the valuable character count.


`FT @{l='BIOSSerial';e={(gcim -Class Win32_BIOS).SerialNumber}}
`As a bonus to this, I am also going to use the smallest possible property names with wildcards to still have the proper display but much fewer characters.


`ft PSC*,*aj*,V*,@{n='BIOSSerial';e={(gcim Win32_BIOS).SerialNumber}}
`## **Shrinking Parameters**

Getting there… Parameters also will sometimes have their own aliases that can be used, so –Computername can become –cn and –Class can be knocked down to –cl without fear of running into the dreaded ambiguous parameter error. But why stop at shortened parameter names when positional parameter can be much more fun while at the same time squeezing out more characters in my attempt to make this as small as possible. Using gwmi, we have the positional parameter for the –Class parameter meaning that we can specific the class first and the cmdlet will process it just as though we specified the parameter name.

## **Positional Parameter**

Parameter aliases are nice and all, but if I want to continue to shrink down my command, I need to look at parameters by position. With Get-WMIObject, I only have one option for a positional parameter with –Class (which happens to be as position 0). –Computername is unfortunately not a positional parameter (as shown in the image below) in the way that I can just have it right after –Class.


`(Get-Command Get-CimInstance).Parameters.GetEnumerator()|ForEach{
    $Param = $_.Key
    $_.Value.Attributes|ForEach{
        If ($_.TypeId -eq [System.Management.Automation.ParameterAttribute]) {
            [pscustomobject]@{
                Name=$Param
                Position=$_.Position
                ParamSet=$_.ParameterSetName
            }
        }
    }
}
`But…it turns out Computername is an accepted value via the pipeline, so now I can go that route and not have to worry about specifying any parameters in my one liner!

What I ended up with is the following submission (I’ve broke this out at a natural line break for the sake of readability):


`echo|gcim cim_operatingsystem|
ft PSC*,*j*,V*,@{n='BIOSSerial';e={(gcim Win32_BIOS).SerialNumber}}
`This one liner is **97** characters in length (woo hoo!) with the various aliases being used, removing any unnecessary white space in between things such as the pipe (|) and commas. I also ensure that the output is exactly what was shown in the example for the event. My victory was short lived however.

Did you notice what I was missing here in this approach? I didn’t realize this until I was at the end of this article that I was only querying the local system for the BIOS. With that issue, I quickly fixed it (at the cost of more characters) and now have something that comes in at **105 characters** 
and
 meets the requirements and challenges.


`echo|gcim cim_operatingsystem|
ft PSC*,*j*,V*,@{n='BIOSSerial';e={($_.csname|gcim Win32_BIOS).SerialNumber}}
`## **Side Note on Invoke-Command**

I could have went with Invoke-Command (using icm an alias) but the problem lies with the output object that includes Runspaceid which obviously would not meet the requirement of this puzzle.

With that, I look forward to seeing what everyone else has put together and learning some awesome ways of accomplishing this puzzle including who can put together an insanely short command that meets all of the design criteria!

# Official Answer

While there's no one right way to accomplish this task, our puzzle author obviously has an answer in mind. Here it is:


`gwmi win32_operatingsystem | select pscomputername,servicepackmajorversion,version,@{n='BIOSSerial';e={gwmi win32_bios | select -expand serialnumber}}
`This solution doesn't hit all of the additional challenges, but it perhaps makes it clearer to see the most important bit: using a custom property to execute a second query, and extracting the results of that query into the custom property's value. Boe's celebrity solution, above, is a much more concise version of this, and meets many more of the optional challenges!

# Interesting Submissions

Stephen Testino had an interesting approach:


`gwmi win32_operatingsystem -co @(".") | select *pu*, *j*, v*, @{n="BIOSSerial";e={(gwmi win32_bios -co $_.csname).serialnumber}}
`Here, you're seeing the value in using wildcards with Select-Object. Stephen also saved a little space by not using Select-Object and -ExpandProperty to get the SerialNumber property's contents; instead, he used a parenthetical expression. A but harder to read, perhaps, but more concise in this case. You might argue that the addition of the -ComputerName parameter isn't necessary, since the local computer is already the default; creating a one-element array was also unnecessary because PowerShell would have done that anyway.

"powershelleanpeoplesfront" offered one of the Invoke-Command approaches we saw:


`icm{gwmi cim_operatingsystem|ft psc*,*j*,v*,@{n='BIOSSerial';e={(gwmi win32_bios).SerialNumber}}}-cn .
`Basically the same idea. In this case, Format-Table is being used as an alternate for Select-Object. Within the scope of the puzzle, they're doing the same thing; the only downside to using Format-Table is that the output can't then be piped on to very many other cmdlets. So in a more real-world scenario, Select-Object offers more flexibility.

Paal had one of the "who cares about the optional challenges?" answers (which is totally fine, as it's a lot easier to read!!!) - a lot of people came up with something similar to this.


`# https://powershell.org/2015/07/04/2015-july-scripting-games-puzzle/
Get-CimInstance -ClassName Win32_OperatingSystem -ComputerName $Computers | Format-Table -AutoSize PSComputerName,ServicePackMajorVersion,Version,@{l="BIOSSerial"; e={(Get-CimInstance -ClassName Win32_BIOS -ComputerName $_.PSComputerName).SerialNumber}}
`Again, note the use of Format-Table. Within the scope of this puzzle, it's fine - but make sure you know why Select-Table can do more or less the same thing, and how it differs from formatting.

Joshua Wortz used pipeline input to save some space:


`@('Comp1','Comp2')|gcim win32_operatingsystem|ft PSC*,*j*,V*,@{N="BIOSSerial";E={(gwmi win32_bios -cn $_.pscomputername).serialnumber}}
`By piping in the computer names, you eliminate the need to manually specify -ComputerName. However, Joshua could have eliminated the **@()** array construct; PowerShell usually treats comma-separated strings as arrays anyway, so you'd reduce your character count by three more that way. With the Win32_OperatingSystem class in particular, you also get a CSName property that could be used instead of PSComputerName, for ad additional reduction in character count. You'll notice that some entries used CSName, probably for that reason. The PSComputerName property wasn't added until PowerShell 3, also.

Stephen Owen [posted an entry that included his thoughts][2], and that's something _everyone_ is welcome, and encouraged, to do. It's super-useful to everyone in the community to see your thought process as well as your solution! Stephen also had the same learning moment that Boe had, which was that the output of Read-Host is a single string, not the array you need in order to feed the names to a parameter. That's valuable knowledge! Several others, based on their solutions' use of -Split or the Split() method, learned the same thing.

"kvprasoon" has an absolutely unique approach:


`foreach($O in "Win32_operatingsystem","win32_bios"){if($O -eq "win32_bios"){$r+=(gwmi $O|select @{E="Serialnumber";L="BIOS Serialnumber"},Pscomputername,@{E={$r.servicepackmajorversion};L="servicepackmajorversion"},@{E={$R.version};L="version"})} else{[array]$r+=(gwmi $O|select @{E={""};L="Serialnumber"},Pscomputername,servicepackmajorversion,version)};$R[1]}
`I think that's probably _way_ more code than anyone else wrote, and having it as a one-liner makes it pretty tough to read, but it's definitely an interesting approach. I think, though, that this demonstrates how _not_ to use the pipeline in PowerShell. This is really structural code, and it doesn't let PowerShell do most of the work that it's willing to do. But hopefully everyone can learn a little bit by comparing this to some of the more commonly offered patterns, including those I've shared here. For the record, the same user also posted other, better solutions; in the future, we ask folks to post just one submission, to make the read-through a little easier.

I hope everyone found this puzzle to be fun, a little challenging, and perhaps learned something new. Two notes going forward:

  * **Please post only one solution. **Keep in mind that you can always go back and edit your Gist, and we'll always pull the most recent one, so there's no need to re-post a new solution if you want to change something.
  * **Please use Gists, as indicated in the instructions. **That's different from a regular GitHub URL, and it's not the same as just pasting code into a comment. 

If you're a blogger, you are **more than welcome** to create a blog article about your solution; just add that article's URL to the comment with your Gist URL.

See you in a little bit with next month's puzzle!

 [1]: https://powershell.org/2015/07/04/2015-july-scripting-games-puzzle/
 [2]: https://gist.github.com/1RedOne/e2a89f1a2ec5413d2c37#file-july-2015-powershell-challenge
