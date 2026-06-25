---
title: Learn Powershell in 5 Painless Steps – Output (Console, File, XML/CSV) – Step 2
authors:
  - Cole McDonald
date: "2022-07-28T18:45:18+00:00"
categories:
  - Tutorials
tags:
  - Beginner
  - Output
  - Tutorial
aliases:
  - /2022/07/learn-powershell-in-5-painless-steps-output-console-file-xml-csv-step-2/
---

DevOps = Developers + Operations.  What if you're in Operations and don't have a developer at your disposal?  That should never stop you from making your job easier and more efficient.  Powershell is a scripting language from Microsoft that is already on your Windows PC and Servers and more recently, [open sourced to the OSX and Linux communities](https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/).  It ships with a great minimalist development environment (Powershell ISE).

The problem I had is that all of the tutorials out there either assume a background in scripting and programming, or act as nothing more than command references.  I'm hoping to enable you to automate your own workflows even if you've never programmed before.  You only need to learn 5 things: Storage, Input, Output, Decisions, Loops.  Everything you do manually is made up of these 5 things.  Every programming language is made up of these 5 things.

* * *


###### 
  [Step 1: Storage (Lots of fun)](https://powershell.org/?p=294975&preview=true) <-- Step 2: Output (So much we can do) -->[ Step 3: Input (Just you and me)](https://powershell.org/?p=294979&preview=true)


* * *

This week it's all about OUTPUT. We'll be covering ways to use the stored data to get information to either the User (the most important part of the GUI) or to another part of our script for further processing. I do have a confession to make. I've already tricked you into starting this lesson last week. If you haven't closed your ISE window yet, the next bit will show you exactly how to get information about our server objects we stored in the $serverInfo_obj array. If you did close it (I forgive you, it has been a week), open it back up and run the last chunk of code we wrote. It's the Object part from our last lesson. Any variable you put information into will be available in the console until you close the application.

Playing around with Variables is all well and good, although it would be better if we could do something useful with the values in there. I assume you're reading this because you want to do something with Powershell, not just learn Powershell for it's own sake. While writing scripts, we often find ourselves exploring objects that we didn't create in the console exactly the same way we were in the last exercise.


  **CONSOLE**


If you recall from the previous lesson on Storage, the editor is the top part of our PowerShell ISE application and the console is the bottom part of the window.

Try typing this into the console followed by the enter key to EXECUTE this command:

> 
`$serverInfo_obj[0] | Get-Member
`The VERTICAL PIPE character ( | ) takes the objects from the part to the left and hands them off to the part to the right. The process is called, simply enough, PIPING. I always envisioned it as a set of saloon doors from a western, though. In this case, we're sending our objects we created for our first server ( [0] ) across the pipe into GET-MEMBER. Get-Member is a function from Microsoft that shows you all of the elements of an object. We made a few PROPERTIES last time and you probably recognize them (name, totalRAM, etc...). It even tells you whether they're String or Int or some other data type.

When we're grabbing information from servers or software, it usually comes to us as an object. You will see other MEMBERS listed in those objects. Most specifically METHODS, which are little programs within the object itself but are a topic for another day. We used piping last week to send our object into a Format-Table with the autosize flag activated. In doing that task, I already had you output to the Console.

Let's imagine a scenario where we would use this. A client is coming to visit and the Powerpoint your marketing team is going to present gets that last minute slide added that needs information about a few of your servers. Name, number of cores, Installed RAM, Size of C: and D: ... sound familiar? We can ask VMM or the servers themselves for all of that information. We'll cover some of that in our next lesson on input. Right now, we've got a deadline to meet, the clients just pulled into the parking ramp. Boy, Cole (you might say), this sounds very specific ... it may or may not have happened just the other day. Here's the procedure I may or may not have followed for this:

> 
`# Create an empty array
# Add the object for server01 into the array
# Add the object for server02 into the array
# Add the object for server03 into the array
# Pipe the object through Format-Table
# Select the output from the console using the mouse
# Control-C to copy to the clipboard
# Open the PPT Deck
# Navigate to the slide in question
# Control-V to paste the text into the block they've assigned
# Control-S to save the document
# Control-Q to close the document and the application
# Lift Phone Handset
# Dial Sales department
# Let them know you've single-handedly saved their presentation
# Grow a mullet, you're a rockstar.
`That seems like I may have gotten carried away. I actually have a reason for that. It's the kind of detail we'll be using going forward to start our scripts. Now we just have to fill in the actual script parts. I recommend you go for a haircut, the mullet was a horrible idea, although it worked for MacGyver.

Let's start by adjusting our object that we've already created. They need specific pieces of information for their presentation:

> 
`# Create an empty array
$serverInfo_obj = @()

# Add the object for server01 into the array
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server01";
        "totalC"   = "50Gb";
        "totalD"   = "200Gb";
        "cores"    = "2";
        "totalRAM" = "8Gb"
    }
)

# Add the object for server02 into the array
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server02";
        "totalC"   = "50Gb";
        "totalD"   = "50Gb";
        "cores"    = "4";
        "totalRAM" = "16Gb"
}
)

# Add the object for server03 into the array
    $serverInfo_obj += @(
        new-object PSObject -Property @{
        "name"     = "server03";
        "totalC"   = "50Gb";
        "totalD"   = "50Gb";
        "cores"    = "4";
        "totalRAM" = "16Gb"
    }
)

# Pipe the object through Format-Table
$serverInfo_obj | Format-Table
`The rest is on you...

> 
`# Select the output from the console using the mouse
# Control-C to copy to the clipboard
`Wouldn't the smart programmer folks at Microsoft, in their infinite wisdom, have thought of this? Indeed they have, so let's change that last line:

> 
`$serverInfo_obj | Format-Table | clip
`Here's what ended up on my clipboard:

> 
`totalC totalD totalRAM name cores
------ ------ -------- ---- -----
50Gb 200Gb 8Gb server01 2 
50Gb 50Gb 16Gb server02 4 
50Gb 50Gb 16Gb server03 4
`I'm not happy with the order it chose for the properties. I'm going to force its hand using the SELECT-OBJECT command and a comma separated list of the properties I want it to show:

> 
`$serverInfo_obj | Select-Object name, cores, totalRAM, totalC, totalD | Format-Table | clip`name cores totalRAM totalC totalD
---- ----- -------- ------ ------
server01 2 8Gb 50Gb 200Gb 
server02 4 16Gb 50Gb 50Gb 
server03 4 16Gb 50Gb 50Gb
`That's better. Now off to PPT and pasting. I'm going to give you a freebie here! Are you down with OGV? It's a short name for Out-GridView and it's awesome! Imagine that instead of 3 servers, you've got 1000 and they are from different clients and the sales presentation is for a single client and you can't let them see the other client's information?

You can pipe through Out-GridView to make a selection interface that allows dynamic filtering, shift-selecting rows of information, ctrl-clicking individual rows. I use OGV all the time! There are actually quite a few shortcuts for common commands: Format-Table is ft, Format-List is fl, Get-Member is gm).

The Out-GridView command takes an option called passthru. These are indicated by a dash ( - ) and can either be flags (True/False) like this one is or take data directly after them to send it down the PIPELINE:

> 
`$serverInfo_obj | Select-Object name, cores, totalRAM, totalC, totalD | ogv -passthru | ft | clip
`I've sometimes found it difficult to get sales to let me adjust their slide decks. A better option would be to send them a file. That will allow them to do the copying and pasting how they like so they are in control of their presentation.


  **FILES**


The nice thing about Powershell is that piping from one small single purpose command to the next allows you to just change one piece to change part of your script. In this case, we can replace the clip command and change it to write to a file:

> 
`$serverInfo_obj | Format-Table | Out-File C:\Users\cole.mcdonald\Desktop\test.txt
`This places a text file with that little table on my desktop so I can attach it to an e-mail. This file can go anywhere you have access to. If you need to write out to a folder that requires admin access, you can run Powershell ISE just like any other program: Right-Click and Run as Administrator.

!!!Caution. This is the one time I'll be serious during this entire series... you can wipe out your whole environment if you're not careful with elevating the ISE. Use it only if you absolutely must. Use it only for the task you need it for. Triple check your code!!!

For our next example, we're going to use a special kind of string. We know it's got quotes... but we want to keep line formating intact as well. This calls for a stringwich @""@. We can open the stringwich (splat-quote) anywhere we'd like on the line, but the closing pair (quote-splat) has to be on its own line. Imagine that we're making a little bit of HTML to format that table we just made. The cool thing about strings is that we can access any of our variables inside them.

If we're using objects and looking to get at specific information in them, it gets a little bit fancy. We just have to hide what we're doing from the string using an AD HOC VARIABLE. It's just a fancy way to say we're solving what's in the parentheses first. For that we use this: $(). The dollar sign because it's a variable, and the parentheses means we're doing this first.

Getting to the name of server01, for example, we use this $($serverInfo_obj[0].name). We recognize all of the pieces of this from our objects lesson last time. It's the name property of element 0 of our $serverInfo_obj array. We've stuffed it into the $() to hide the [0].name part from the string. Otherwise, it just treats it as the next few characters in the string. That's no good. Let's see what that looks like:

> 
`$HTMLOutputFromTheObjectWeMadeEarlier = @"


        Server Configurations




                name
                cores
                totalRAM
                totalC
                totalD


                $($serverInfo_obj[0].name)
                $($serverInfo_obj[0].cores)
                $($serverInfo_obj[0].totalRAM)
                $($serverInfo_obj[0].totalC)
                $($serverInfo_obj[0].totalD)


                $($serverInfo_obj[1].name)
                $($serverInfo_obj[1].cores)
                $($serverInfo_obj[1].totalRAM)
                $($serverInfo_obj[1].totalC)
                $($serverInfo_obj[1].totalD)


                $($serverInfo_obj[2].name)
                $($serverInfo_obj[2].cores)
                $($serverInfo_obj[2].totalRAM)
                $($serverInfo_obj[2].totalC)
                $($serverInfo_obj[2].totalD)




"@
`Go ahead and look at that variable in the console. Should we be snooty about it and do it the "proper" powershell way?

> 
`# This variable name is horrible, feel free to fix it by using
# a better one when you enter and run the code in the editor

# Write-Host outputs strings to the console

Write-Host $HTMLOutputFromTheObjectWeMadeEarlier
`Note that all of the lines are separated and all of the tabs remain! If you'd like to see the difference, try it without the @ @ (that's a Star Wars PUNctuation). I've had inconsistent results keeping spacing without them. If the HTML code confuses you, feel free to just use the elements from our object array and build your own output, perhaps you can turn it into a comma separated text file (CSV). That would actually be really slick as it'll open directly in Excel or even insert as a table into the PPT deck. If only those super smart programmers at Microsoft had thought of that! Someone's talking to me in the background, hold on...


  **XML/CSV/HTML**


So, I'm back. I've been told Microsoft's programmers did think of that. I was all geared up to get you writing some fancy chunk of code called a FUNCTION to turn objects into CSV files to export to files... not at all necessary. Apparently, that will have to be a later blog as well. Apparently, or so I'm told, all we have to do is send it through another little command. Technically, in Powershell, these are called CMDLETS: pronounced command-lets. Powershell is still new enough they could afford full-blown commands. They are supposed to follow a specific format as well called verb-noun.

In the cases we've seen so far, we've used the verbs Get, Write, Format, and New. There are also Set (the dangerous one), Export, Read (which will be covered next week), and a few more. The nice thing about the ISE is that if you start typing a cmdlet, it'll suggest other ones for you. Microsoft calls this INTELLISENSE and it's a great way to explore what's available in the language. The right hand pane of the ISE window also contains a huge list of them and that's searchable as well. Explore there to find what all is available. You can even use Get-Help to find out more info about them:

> 
`Get-Help Write-Host -showwindow
`This will make you a little window with information and examples for the command. If this didn't work, you may need to run the cmdlet Update-Help the first time out to get it to download all the help files to your computer. Let's look at our CSV option using this technique:

> 
`get-help convertto-csv -ShowWindow
`This gives you a window that allows you to really dig into more information about the cmdlets. Let's try that using our out-file example and add the ability to select the elements to pass through using our GridView:

> 
`$serverInfo_obj | ogv -passthru | ConvertTo-CSV | Out-File ~\Desktop\servers.csv
`The ~ character is brought over from the Linux world and refers to your current user directory. It makes it easier to get to your documents/desktop/downloads directories, etc. This can also take UNC paths to get to network resources.

So this example takes our objects, pipes them into OGV for us to select the ones to pass through to the conversion and then to the outfile command. The resulting file can now be double-click opened into Excel, inserted as a table in PPT, whatever you could normally do with this type of data... even stuffed into PowerBI or R for big data analysis. That previous HTML example can be done with a ConvertTo-HTML which I saw while I was looking up the CSV command earlier. Did you notice it too? It also does XML and JSON for using across the web or to build DSC files. Yes, Virginia, we can build DSC files from scratch using Powershell allowing us to automate server buildouts modelled after a single instance. This build out could even be scripted to provision IP addresses from a database you're using to keep track of such things and make DNS changes to your environment so you don't have to. There's a whole bunch of built-in cmdlets for dealing with your Azure deployment and System Center if you have it installed. It also allows for DSC configuration of VMs through VMM with a little bit of fiddling.

Now, if only we could have the program we're writing ask us for information to store in scripts... maybe if we can figure out the cmdlet name. Writing to the Console is Write-Host. I wonder what Reading from it would be? You can either explore that or wait until next week when we look at INPUT. We'll cover a few more options as well. At the end of next week, you'll be able to gather information, store it in variables and output it in various ways. Sounds as if we'll have you doing useful things by the end of next week. After that groundwork has been laid, we'll dig into building SkyNet.


###### 
  [Step 1: Storage (Lots of fun)](https://powershell.org/?p=294975&preview=true) <-- Step 2: Output (So much we can do) -->[ Step 3: Input (Just you and me)](https://powershell.org/?p=294979&preview=true)
