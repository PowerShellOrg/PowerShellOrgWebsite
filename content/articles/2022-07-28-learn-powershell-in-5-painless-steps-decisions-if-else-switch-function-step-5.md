---
title: Learn Powershell in 5 Painless Steps – Decisions (If/Else, Switch, Function) – Step 5
author: Cole McDonald
authors:
  - Cole McDonald
date: "2022-07-28T18:45:52+00:00"
categories:
  - Tutorials
tags:
  - Beginner
  - Functions
  - Tutorial
aliases:
  - /2022/07/learn-powershell-in-5-painless-steps-decisions-if-else-switch-function-step-5/
---

DevOps = Developers + Operations.  What if you're in Operations and don't have a developer at your disposal?  That should never stop you from making your job easier and more efficient.  Powershell is a scripting language from Microsoft that is already on your Windows PC and Servers and more recently, [open sourced to the OSX and Linux communities](https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/).  It ships with a great minimalist development environment (Powershell ISE).

The problem I had is that all of the tutorials out there either assume a background in scripting and programming, or act as nothing more than command references.  I'm hoping to enable you to automate your own workflows even if you've never programmed before.  You only need to learn 5 things: Storage, Input, Output, Decisions, Loops.  Everything you do manually is made up of these 5 things.  Every programming language is made up of these 5 things.

* * *


###### 
  [Step 4: Loops(I can give you more)](https://powershell.org/?p=294981&preview=true) <-- Step 5: Decisions(The time has arrived)


* * *

We've spent a month getting to this point. We're invested. Let's blow this party up! Sorry, I've had too much coffee this morning. That was a bad decision. That's our topic for this last installment of the 5 steps: DECISIONS, not coffee.

We know how to get information from various sources, store them in fairly complex ways, and send it out to our users in different formats. According to the stated format of these blogs, there's only one piece left in this puzzle. When we stand up a virtual server, they're not provisioned the same across the board. An SQL server needs a far different configuration than an IIS server, a nano server, or a terminal services server.

If we talk through the process, an SQL server wants more RAM and disk space, whereas an IIS server is more focused on RAM and CPU, Whereas the Terminal Services server wants more of all three: RAM, CPU, and disk. Lastly, a nano server wants as little as possible.

I've tricked you again. If you can talk through your decision making process again, you're already programming. Here's the pseudocode (fake code in comments to fill out afterwards):

> 
`# SQL:  RAM and DISK Heavy
# IIS:  RAM and CPU Heavy
# TS:   RAM, CPU, DISK Heavy
# Nano: Minimums
`I tricked you twice in the same paragraph. If we change the word whereas into else, we've actually got the SYNTAX (syntax is using the right words in the right order with the right punctuation) for the first structure we're going to look into:


  **IF / ELSE**


Let's start with the syntax statement for the IF / ELSE in Powershell:

> 
`if (condition) {statement 1} else {statement 2}
`A real example of this can look like this:

> 
`# Setup machine provisioning values
if ($machineType -eq "SQL") {
    # this is anything else, the DEFAULT for instance
    $CPU  = 2
    $RAM  = 8
    $DISK = 150 
} else {
   # this is anything else, the DEFAULT for instance
   $CPU   = 2
    $RAM  = 4
    $DISK = 50 
}

# Removing the space between $machineType and : will confuse Powershell
Write-Output "Building new $machineType server : NAME-$($ServerInfo_obj[0].name), RAM-$RAM, CPU-$CPU, DISK-$DISK"

# Build the server with the given requirements
# This doesn't actually work
# Note the line continuation ( `) added for readability
# Note everything lined up in nice little columns to feed my OCD

new-SCVirtualMachine `
    -ComputerName           $serverInfo_obj[0].name `
    -CPUCount               $CPU `
    -DynamicMemoryMaximumMB $RAM * 1024 `
    -VirtualHardDisk        "\Path\To\New\Drive\Object\$serverInfo_obj[0].name_$DISK" `
    -OperatingSystem        "Windows 3.1"
`Picture if you will reading in a CSV or JSON file defining a thousand servers into an object array, then using Powershell to deploy them! Imagine driving this based on rising numbers of users logged on to a set of load balanced terminal servers. Imagine removing machines as well based on lowering numbers of users toward the end of the workday.

This is where we start to see the benefit of using scripting to drive performance vs. cost savings. As we moved from physical servers to virtual we, the industry, largely kept the manual workflow. As we're moving to Azure and being charged for resource use, this becomes a huge cost savings solution.

In our initial list of server types, we had 4 types of servers "THERE WERE FOUR TYPES!" Let's look at how we can make that work with what we know now. If we have our default settings as an else, but need more types, let's move the defaults to a declaration at the top, then alter them if they are not the "nano" type:

> 
`# Change me to SQL, IIS, TS, or NANO
$machineType = "NANO"

# Default Minimums for those pesky nano servers
$CPU  = 2
$RAM  = 4
$DISK = 50

# SQL: RAM and DISK Heavy
if ($machineType -eq "SQL") {
    $CPU  = 2
    $RAM  = 8
    $DISK = 150 
}

# IIS: RAM and CPU Heavy
if ($machineType -eq "IIS") {
    $CPU  = 4
    $RAM  = 8
    $DISK = 50 
}

# TS: RAM, CPU, DISK Heavy
if ($machineType -eq "TS") {
    $CPU  = 4
    $RAM  = 8
    $DISK = 150 
}

Write-Output "New $machineType : RAM-$RAM, CPU-$CPU, DISK-$DISK"
`**ELSEIF**


There's another mechanism for this type of thing that is cleaner to read as it groups the if / else decisions. We'll just flip the terms and remove the punctuation giving us elseif. Let's rewrite our decision to use this new term:

> 
`# Change me to SQL, IIS, TS, or NANO
$machineType = "SQL"

if ($machineType -eq "SQL") {
    # SQL: RAM and DISK Heavy
    $CPU  = 2
    $RAM  = 8
    $DISK = 150 
} elseif ($machineType -eq "IIS") {
    # IIS: RAM and CPU Heavy
    $CPU  = 4
    $RAM  = 8
    $DISK = 50 
} elseif ($machineType -eq "TS") {
    # TS: RAM, CPU, DISK Heavy
    $CPU  = 4
    $RAM  = 8
    $DISK = 150 
} else {
    # Default Minimums
    $CPU  = 2
    $RAM  = 4
    $DISK = 50
}

Write-Output "New $machineType : RAM-$RAM, CPU-$CPU, DISK-$DISK"
`I'd like you to note at this point that you've just read a few slightly larger blocks of code and it didn't look as weird as it did when you started this tutorial (just over a month ago if you followed it in real time. If you're from the future... welcome back, we still wear shoes on our feet in our time!). Once we learn what the individual pieces look like, we can start to see the matrix unfold.

These can get wonderfully complex as we can NEST these statements, like decision inception (deception?), perhaps to differentiate the type of ERP software an SQL server is supporting:

> 
`$machineType = "GP"

if ($serverInfo_obj[0].name -like "*SQL*") {
    if ($machineType -eq "CRM") {
        # SQL: RAM and DISK Heavy
        $CPU  = 2
        $RAM  = 8
        $DISK = 150 
    } elseif ($machineType -eq "VISUAL") {
        # IIS: RAM and CPU Heavy
        $CPU  = 4
        $RAM  = 8
        $DISK = 50 
    } elseif ($machineType -eq "GP") {
        # TS: RAM, CPU, DISK Heavy
        $CPU  = 4
        $RAM  = 8
        $DISK = 150
    } elseif ($machineType -eq "Dynamics 365") {
        # TS: RAM, CPU, DISK Heavy
        $CPU  = 4
        $RAM  = 16
        $DISK = 100
    }
} else {
    # Default Minimums
    $CPU  = 2
    $RAM  = 4
    $DISK = 50
}

Write-Output "New $machineType : RAM-$RAM, CPU-$CPU, DISK-$DISK"
`This allows for an amazing amount of gothic complexity once we start nesting more deeply. Since we're only using -eq on the internal IF statement, there's another structure that deals with these types of comparisons potentially more efficiently. We can think of it as taking an input variable and directing a specific output based on that. Like my Thom the Tanker (no relation) locomotive turntable track switch!


  **SWITCH**


Let's check out the syntax statement for this one:

> 
`SWITCH (input) {condition1 {output}; condition2 {output}; default {output}}
`That's uglier than previous ones... let's span a few lines with this one:

> 
`SWITCH (input) {
    condition1 {output}
    condition2 {output}
    default    {output}
}
`If we apply that to our previous statement, it really cleans it up:

> 
`$machineType = "SQL"

if ($serverInfo_obj[0].name -like "*SQL*") {
    switch ($machineType) {
        "CRM" {
            $CPU  = 2
            $RAM  = 8
            $DISK = 150
        }
        "VISUAL" {
            $CPU  = 4
            $RAM  = 8
            $DISK = 50 
        }
        "GP" {
            $CPU  = 4
            $RAM  = 8
            $DISK = 150
        }
        "Dynamics 365" {
            $CPU  = 4
            $RAM  = 16
            $DISK = 100
        }
        default {
            $CPU  = 2
            $RAM  = 4
            $DISK = 50
        }
    }
} else {
    # Default Minimums
    $CPU  = 2
    $RAM  = 4
    $DISK = 50
}

Write-Output "New $machineType : RAM-$RAM, CPU-$CPU, DISK-$DISK"
`My challenge to you is to find something in your tech environment that you do every day and write the pseudo code for it. You'll find yourself equipped to build out a script from that series of comment lines. Make work easier for yourself starting today.

So... we're at the end. My sidebar in notepad++ tells me I'm over 200 lines. I've covered all of the points I'd planned on covering. Should we do an encore? One last little tidbit to really help us with our code? Let's make a FUNCTION! Thank you !


  **FUNCTION**


This is basically just a chunk of code that we're going to be using over and over again. For instance, we're reading in a thousand machines and we'll need to set the CPU, RAM, and DISK for it each time. Wouldn't it be nice if we could to it this way?

> 
`$servers = read-csv c:\serverList.csv
foreach ($server in $servers) {
    $serverInfo_obj = make-serverObject $server
    new-scvirtualmachine $serverInfo_obj
}
`See that make-serverObject? I just made that up. That's not a real thing... yet.

although it can be done anywhere above the place we're calling it from, I like to group my functions at the top of my script. A function looks like this:

> 
`function verb-nounFunctionName {
    param (
        [type]$firstInputVariableName  = "default value"
        [type]$secondInputVariableName = "default value"
    )
    # Stuff we're doing...
    return $whateverOutputVariableWeWant
}
`Breaking this down, the verb-noun structure is what we see in any of the cmdlets we've been using so far: get-file, set-scvirtualmachine, clear-host, get-eventlog, etc... This makes the purpose of the function/cmdlet much easier to figure out. So much of our programming careers will be spent trying to figure out what the \*#$%\*&$!@#% we were thinking when we wrote that chunk of code 4 months ago at 3:30 in the morning after a week of horrible sleep deprivation.

It functions, but we're not quite sure why. Variable names like $stupidUnicornsWontStopRunningThroughMyOffice and function names like make-itstop -orGoJump and need-morecoffee -now don't lend themselves to easy interpretation.

The param() structure houses the input for the function/cmdlet we're building. It's just a comma separated list of variable assignments. I've added the [type] to the front of the variable to make it easier to figure out what it wants to have and make the error messages a little bit more informative when there is a TYPE MISMATCH error. This will be [string], [int], [int32], [switch]. Switch types are false by default, true when called:

> 
`function get-switchTest {
    param (
        [switch]$flipTheSwitch
    )
    return $flipTheSwitch
}

# We call it anywhere now and it gets replaced with its return value/object
write-output $(get-switchTest).isPresent
write-output $(get-switchTest -flipTheSwitch).isPresent
`From this example, you can see that the return does just that. This can be a single variable or a whole custom object.

Between the param block and the return, we can do any chunk of processing code we want, even all the object building stuff we did at the beginning way back in the first lesson (note the order of operations from the parentheses during the .add() ):

> 
`function make-serverObject {
    param (
        [string]$server = "SERVER",
        [string]$type   = "TS",
        [int]$instance  = 0,
        [int]$RAM       = 4,
        [int]$CPU       = 2,
        [int]$DISK      = 50
    )
    $newObject = new-object PSObject -Property @{
        "name"     = "$type-$server-$instance";
        "type"     = $type;
        "totalC"   = $DISK;
        "cores"    = $CPU;
        "totalRAM" = $RAM
    }
    return $newObject
}

# Create an empty array with the class arraylist
[System.Collections.arrayList]$serverInfo_obj = @()

# Returns all the defaults and adds it to the object array
$serverInfo_obj.add( (make-serverObject) )

# Returns custom values and adds it to the array
$serverInfo_obj.add(
    (make-serverObject `
        -type     "SQL" `
        -server   "Custom" `
        -instance 5 `
        -RAM      16 `
        -CPU      8 `
        -DISK     1024
    )
)
`I make functions out of anything I use more than 3 times. That way, I can just copy and paste them into the top of my script when I need them again... or did the brilliant developers at Microsoft think of a way to do that too? Note that I've been refering to them as function/cmdlets? Time to dig in and avail yourself of some free training from Microsoft:

<https://mva.microsoft.com/en-US/training-courses/getting-started-with-microsoft-powershell-8276>  
<https://mva.microsoft.com/en-US/training-courses/advanced-tools-scripting-with-powershell-30-jump-start-8277>

Thank you all for making this such a successful training series. I've received amazing feedback and wonderful critique. Don't be afraid to reach out to the Powershell development community on Powershell.org ( <https://powershell.org/> ), reddit ( <https://www.reddit.com/r/PowerShell/> ), and technet ( <https://social.technet.microsoft.com/forums/en-us/home?forum=ITCG&filter=alltypes&sort=lastpostdesc> ).

For higher end powershell/devops work, Tao Yang is prolific in his script releases and deep knowledge of Microsoft's System Center ( <http://blog.tyang.org/> )

Now that we've pulled back the curtain on the topic of scripting, development, devops, and powershell, keep digging into it. Share what you find with others. Always remember, someone else is asking exactly the same questions you are right now! Everything is possible through code.

**Ignore the box, define the curve.**


###### 
  [Step 4: Loops(I can give you more)](https://powershell.org/?p=294981&preview=true) <-- Step 5: Decisions(The time has arrived)
