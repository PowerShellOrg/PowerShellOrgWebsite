---
title: Learn Powershell in 5 Painless Steps – Input (Console, File, Applications) – Step 3
authors:
  - Cole McDonald
date: "2022-07-28T18:45:31+00:00"
categories:
  - Tutorials
tags:
  - Beginner
  - Input
  - Tutorial
aliases:
  - /2022/07/learn-powershell-in-5-painless-steps-input-console-file-applications-step-3/
---

DevOps = Developers + Operations.  What if you're in Operations and don't have a developer at your disposal?  That should never stop you from making your job easier and more efficient.  Powershell is a scripting language from Microsoft that is already on your Windows PC and Servers and more recently, [open sourced to the OSX and Linux communities](https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/).  It ships with a great minimalist development environment (Powershell ISE).

The problem I had is that all of the tutorials out there either assume a background in scripting and programming, or act as nothing more than command references.  I'm hoping to enable you to automate your own workflows even if you've never programmed before.  You only need to learn 5 things: Storage, Input, Output, Decisions, Loops.  Everything you do manually is made up of these 5 things.  Every programming language is made up of these 5 things.

* * *


###### 
  [Step 2: Output (So much we can do)](https://powershell.org/?p=294977&preview=true) <-- Step 3: Input (Just you and me)  --> [Step 4: Loops(I can give you more)](https://powershell.org/?p=294981&preview=true)


* * *

We've spent the last few weeks laying down the ground work to be able to deal with the one main thing that we as developers have to shuttle around our applications' data. We're now able to store them, explore them, and send them somewhere useful. We're going to hit the third piece of this today and begin getting our data from somewhere else. Once we're done today, all that's left is to figure out what to do with the data we're collecting, storing, and distributing.

This one digs in a little bit deeper yet. After today, you get to get your programmer's card... that's not actually a thing. Sorry if I got you excited, perhaps you can make your own card. I'd take one if you do.


  **CONSOLE**


We're starting in the same place we always do, in our console. Do you still have it open or are you a console closing type of person? If you closed it, go ahead and open up the Powershell ISE again. We're going to start up top in the editor this time. Last time, we learned the "correct" way to write information out to the console:

> 
`$someVariable = "another string"
WRITE-HOST "String to display on the screen"
WRITE-HOST $someVariable
WRITE-HOST "Another string and $someVariable"
`Now, we've got to figure out how to allow the user give us information. If we can trust that Microsoft is using logical naming for their CMDLETS, it should be about reading and writing information. Since output is WRITE-HOST, the input should be READ-HOST. If we start typing it, INTELLISENSE will start to show us possible things we want to enter as pop-up suggestions as we go. It shows me that they did indeed make the command READ-HOST.

We're going to go ahead and write a real live useful program that does a thing. It's not a particularly useful thing, but it will hit all 3 points: Input, Store, and Output. So that we're using the process of breaking down the task to smaller points, I'm going to start with PSEUDO-CODE (It's just a step by step description of the task):

> 
`# Ask the user for their name
# Display their name in a sentence
`Sounds pretty simple, but this could be anything we'd want to store, like client information for recalling during a sales call; "How's the kids?  Bobby and Fran

> 
`# Ask the user for their name
$firstName = Read-Host "Enter your first name:"
$lastName = Read-Host "Enter your last name:"

# Display their name in a sentence
Write-Host "Your full name is $firstName $lastName"
Write-Host "Your last,first is $lastName, $firstName"
`Look! We made a thing. It does something almost useful. We should be able to store this type of information in an object as well once we collect it:

> 
`$userInfo = @{"first" = $firstName; "last" = $lastName}
`This let's us store larger pieces of information so we can access it using our dot notation (we must use an AD-HOC STRING $() to make it solve before showing it to the string):

> 
`Write-Host "L,F is $($userInfo.last), $($userInfo.first)"
`We could have the user's age, significant other's first name, last name, age, assigned server name, start date, last login date, etc. Store these in an array and we can catalog an entire company. This programming thing is starting to show some promise. For the record, this is the fundamental idea behind DSC (Desired State Configuration). All the information for a server is bundled in an XML object and delivered as an XML file to a program that knows how to read that XML to build a server based on that description.


  **FILE**


Speaking of reading from files, wouldn't it be great if we could do that? Imagine being handed an excel file with systems and pertinent data in it that we want to process. We know we can export a CSV, we can also import one. Let's start with the most basic form of this. We want to get the content of a file. The command for that is ... um ... GET-CONTENT. They're smart, but I made no claims to their creativity in naming. The best thing about their naming conventions for the cmdlets is that we can start to see the pattern they're using and start to guess at the kind of command we want to use and allow Intellisense to guide our exploration. Let's try reading a file. Hop down to the console and try this:

> 
`get-content ~\Desktop\servers.csv
`This should read the contents of the file we exported in the last lesson and write it directly to the console. Useless Cole! No, I retort. We can store that in a variable and manipulate it as a variable, trapped in its temporary digital prison, our plaything; MUHAHAHAHA! Too Dramatic? You started it. Let's try this. You can either enter these directly into the console or add them to the editor and run the whole thing or the selection as you see fit:

> 
`$serverInfo = Get-Content ~\Desktop\servers.csv
Write-Host $serverInfo
`Looks about the same, but we can now do this as well:

> 
`$serverInfo = $serverInfo | ConvertFrom-Csv
Write-Host $serverInfo

# We even have access to it as an array now
Write-Host $serverInfo[1]
`Now that's different. We assigned the variable to itself after sending it through CONVERTFROM-CSV. Remember from the first lesson when I mentioned it does all the stuff on the right of the = and stuffs that into the stuff on the left? This allows us to change the content of a variable on the fly. We were technically doing that to our $serverInfo_obj using the += OPERATOR. These two examples do the same thing:

> 
`# Add the object for server02 into the array using +=
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server01";
        "freeC"    = "27Gb";
        "totalC"   = "50Gb";
        "CPU"      = "76%";
        "RAMUsed"  = "10Gb";
        "RAMTotal" = "16Gb"
    }
)

# Add the object for server02 into the array
$serverInfo_obj = $serverInfo_obj + @(
    new-object PSObject -Property @{
        "name"     = "server01";
        "freeC"    = "27Gb";
        "totalC"   = "50Gb";
        "CPU"      = "76%";
        "RAMUsed"  = "10Gb";
        "RAMTotal" = "16Gb"
    }
)
`This method of adding items to an array or object is actually really slow. You won't notice it in these examples, but if you are dealing with thousands of items being added over and over again, each time you add a piece, it gets longer. So each time we want to add to the end of it, it gets to count the contents to find the end. This can really add up after a bit. There are much more efficient ways to do some of these exercises.

Know that, then put it out of your head, understanding that if you get to the point where that matters, the information about those methods are out there, and we're learning here. This method illustrates my points best. It is also a more approachable way to make quick and functional scripts for those of you who haven't ever programmed before and are being thrust kicking and screaming into this new and automated version of the future.  
\*** (Shout out to user toregroneng on reddit for pointing out that I'm not specifically using "correct" powershell style and practices)

All that said, we're starting to tie it all together. Let's see if there's a more efficient way to do the last CSV example.

> 
`$serverInfo = Get-Content ~\Desktop\servers.csv | ConvertFrom-Csv
Write-Host $serverInfo[1]
`Sweet, we made it a single line thing. If they built in a function for converting a CSV file into an object, I bet they added one for importing directly from a CSV file. Since we had EXPORT-CSV before, let's just go wild and try replacing EXPORT with IMPORT! Crazy programmers. Perhaps we can streamline it even more:

> 
`$serverInfo = Import-csv ~\Desktop\servers.csv
Write-Host $serverInfo[1]
`Look at that. These cmdlets don't yet exist for XML, HTML, and JSON, so we'll still have to convert those formats. Here's how that works:

> 
`# First, we'll take our $serverInfo object and
# turn it into an JSON file using the cmdlets we're familiar with
Get-Content ~\Desktop\server.csv | ConvertTo-Json | out-file ~\Desktop\servers.json

# Then read it back in as the point of our exercise here
$JSON_obj = Get-Content ~\Desktop\servers.json | ConvertFrom-Json

# Prove to ourselves that it did something useful
Write-Host $JSON_obj.name
`That first bit is a really common type of Powershell task structure. We're reading in a file, converting it from one format to another and then saving it out to a file. The task itself doesn't matter. The workflow and way of thinking of passing one thing into the next is a very common way of working that makes this an amazingly useful tool to learn, even if you don't use it as a programming platform.

Now, in our promise of automating absolutely everything so we never have to do anything again (we won't tell anyone that part), let's figure out how to ask VMM for some information. Even if your goal is just to never have to open extra applications on your server other than your Powershell ISE, this is the first step on that quest.


  **APPLICATION**


In the last lesson, we imagined a story of darkness and woe whereby our hero (an anonymous everyman IT technician) was cornered by the opposing forces (Sales) and forced to do manual data entry under threat of eternal flogging and being forced to listen to zydeco standards as sung by a group of cats and dogs. Having actually had that job for a little while, our hero decided that s/he would never again perform those sorts of tasks for anyone, ever again. What did s/he do? Powershell. Powershell is always the answer. At least in a Powershell focused blog, it's a strong bet if you've stopped paying attention and are asked a question.

We can assume that nearly everything an application displays in its interface is stored somewhere behind the scenes that we can get to. Many applications allow us to hook into them. Some by exposing their .NET guts like a tauntaun in winter, others through a package of cmdlets called a MODULE. Your installed modules are listed in the pulldown menu on the right side pane of the ISE interface. I tend to keep mine closed as I like to have as much blue space on the screen as possible without actually having a blue screen. Under the Module "Storage" I find the command get-volume.

Let's ask Windows for something... Like those bits from our $serverInfo_obj from the output lesson:

> 
`$driveCInfo = Get-Volume C
`The output shows me the parts I am looking for, and other info as well.

$driveCInfo.Size would be great. As would SizeRemaining. They fit right into our existing object. If we pull up that code again, we can put in an object for our current host machine. In my case, it's a laptop.

> 
`$serverInfo_obj = $serverInfo_obj + @(
    new-object PSObject -Property @{
        "name"     = "server01";
        "freeC"    = $(Get-Volume C).SizeRemaining;
        "totalC"   = $(Get-Volume C).Size;
        "CPU"      = "76%";
        "RAMUsed"  = "10Gb";
        "RAMTotal" = "16Gb"
    }
)
`This can be sped up slightly. Again, not that big a deal with one server, but with 1000 of them, we can cut our information grabs in half by assigning the results of Get-Volume to a variable first, then calling that instead of the cmdlet twice:

> 
`# Query for our info
$volumeCInfo = Get-Volume C

# So now $volumeCInfo.Size gets the size for us,
# but it's not in GB, let's math!
$volumeCTotal = $volumeCInfo.size / 1GB
`1GB is a built in value that converts your Bytes to GB. But we'd like to see it as a nice round number. Let's look at that. There's a bunch of math built into the system through .NET . I'll show it to you, then show you a cheat:

> 
`# Using the math functions built into the system
$volumeCRoundedTotal1     = [system.math]::Round($volumeCInfo.Size / 1GB)
$volumeCRoundedRemaining1 = [system.math]::Round($volumeCInfo.SizeRemaining / 1GB)

# Cheating by casting it into integer
[int]$volumeCRoundedTotal2     = $volumeCInfo.Size / 1GB
[int]$volumeCRoundedRemaining2 = $volumeCInfo.SizeRemaining / 1GB

# Add it to the Object
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server01";
        "freeC"    = $$volumeCRoundedRemaining2;
        "totalC"   = $volumeCRoundedTotal2;
        "CPU"      = "76%";
        "RAMUsed"  = "10Gb";
        "RAMTotal" = "16Gb"
    }
)
`We can get ram using the WMI system built into windows. This returns the total ram in bytes.

> 
`# Total
$(Get-WMIObject win32_PhysicalMemoryArray).MaxCapacity

# Used
$(Get-WmiObject win32_OperatingSystem).freephysicalmemory

# computer name
$(Get-WmiObject win32_OperatingSystem).csname

# CPU Usage.
# This we have to force to calculate using Measure-Object
Get-WmiObject win32_processor | Measure-Object -Property LoadPercentage -Average | select-object Average
`Like with sun screen, it is time to apply. Take a little bit of time to rewrite the rest of the object for the server with these new little chunks of code. If you need pieces of information from your systems, Google will find even more of the CLASSES of information you can grab using Get-WMIObject. I searched for these using:

> 
`Get-WMIObject class powershell
`Go ahead and send that out to a CSV so that you can import it anywhere you'd like. You can either use the | ConvertTo-CSV | Out-File combination, or the | Export-CSV technique.

Our business does quite a bit of work with PowerBI. Most of my reports that aren't for my own personal use, which end up as just text or in an excel table, get turned into dashboards for analyzing our clients' environments to make them run more efficiently and allow stronger optimization based on actual use rather than "one size fits all" standards.

If you choose to get farther into this sort of thing, you'll start to notice that the older Visual Basic classes and the .NET classes are available to us using that ugly [class.name]::method(data) format.

For the purposes of this tutorial, I'm only grabbing information that everyone has access to. The best thing about this technique is that we can grab information from any application that has cmdlets available to us. All of System Center grants us access. I happen to be a SCOM admin, so I use the information made available to me from Operations Manager for many of the tasks I need to complete.

To get to System Center Virtual Machine Manager, we'll need to get the cmdlets loaded by importing the module. Can you guess the cmdlet name for that?

> 
`import-module virtualmachinemanager
`If this doesn't work on your computer you're using to learn powershell, you'll have to have either install the VMM Console, or be running the scripts from the VMM server.

What we're going to start running into is a matter of volume. Entering information about three servers by hand is a little bit annoying, but not too bad. Let's do that for 500 machines. How about 1000. Now we're talking some pretty serious RSI. The thought of it is enough to drive someone loopy. We should do that next. LOOPS. That will save us quite a bit of typing.  That should be a blog someone writes...


###### 
  [Step 2: Output (So much we can do)](https://powershell.org/?p=294977&preview=true) <-- Step 3: Input (Just you and me)  --> [Step 4: Loops(I can give you more)](https://powershell.org/?p=294981&preview=true)
