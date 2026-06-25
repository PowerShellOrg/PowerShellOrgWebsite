---
title: Learn Powershell in 5 Painless Steps – Storage (Variables, Arrays, Hashtables) – Step 1
authors:
  - Cole McDonald
date: "2022-07-28T18:45:08+00:00"
categories:
  - Tutorials
tags:
  - Beginner
  - Variables
  - Tutorial
aliases:
  - /2022/07/learn-powershell-in-5-painless-steps-storage-variables-arrays-hashtables-step-1/
---

DevOps = Developers + Operations.  What if you're in Operations and don't have a developer at your disposal?  That should never stop you from making your job easier and more efficient.  Powershell is a scripting language from Microsoft that is already on your Windows PC and Servers and more recently, [open sourced to the OSX and Linux communities](https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/).  It ships with a great minimalist development environment (Powershell ISE).

The problem I had is that all of the tutorials out there either assume a background in scripting and programming, or act as nothing more than command references.  I'm hoping to enable you to automate your own workflows even if you've never programmed before.  You only need to learn 5 things: Storage, Input, Output, Decisions, Loops.  Everything you do manually is made up of these 5 things.  Every programming language is made up of these 5 things.



---



###### 
    Step 1: Storage (Lots of fun) --> [Step 2: Output (So much we can do)](https://powershell.org/?p=294977&preview=true)




---


This is a slightly longer one, but I cover a lot of ground work we'll need in the next few weeks.

For our first week, I'm covering storing information in your script. Without storage, none of the rest of what we're going to learn makes sense. The most basic type of storage is the VARIABLE, a collection of information can be stored as separate pieces of an ARRAY, and accessing the information over and over again in a script is made easier using a HASHTABLE, the last piece of storage we'll cover is the OBJECT... which will serve you later if you choose to get deeper into scripting or programming.


  **VARIABLES**


When we're scripting, we're going to be grabbing information from various places, making decisions based on that information, doing stuff with that informaiton, and delivering it to various places. We need somewhere to store that information. Let's do this!

> 
`$ourFirstVariable = "Stuff Inside the Variable"
`There... you're a programmer. There may be a little bit more to it, but this fundamental building block provides the basis for all fo the rest. I'll explain what the parts mean, then we'll get started in Powershell ISE to make it happen and to prove that something actually happened.

In Powershell, anything that begins with a Dollar Sign ($) is a variable. After that, the developer gives it a name. This name can be just about anything with letters and numbers as long as it starts with a letter:

> 
`$x
$x1
$myThing
$cellContents_1
$ServerName
$Server_Name
`... you get the picture. As a matter of style, I use what is called "Camel Case" for my variables. I always start with a lowercase letter and each word after that in the variable name is capitalized.

If you see a $ in a script, some piece of information is being stored or recalled at that point in the script. The equals sign (=) is what we refer to as an "assignment operator." Basically, whatever is on the right side of it gets solved and assigned to what ever is on the left side. In the first case, the sentence (technical name: STRING) "Stuff Inside the Variable" is being assigned into the variable $ourFirstVariable. I liken it to writing down the sentence on a piece of paper and putting it in an empty coffee cup. When you need it later, you can just reach into the cup and pull the slip of paper back out to read. In the case of variables, you can label them... of course, in the coffee cup example, my variable would be $WithEnoughCoffeeNothingIsImpossible and the contents would be "C8H10N4O2"

Speaking of Strings, there are some different types of information we should be aware of. As I mentioned, the STRING has quotes around it and is any combination of letters, numbers, and most symbols on the keyboard. The different types of information (or DATA TYPES) can be indicated using the square brackets on your keyboard: []. And you thought you'd never use those keys... we'll get to the squiggly ones later. In our first example, we can tell the computer exactly what data type we're assigning to the variable.

> 
`$ourFirstVariable = [string]"Stuff Inside the Variable"
`It's not terribly useful in this case because Powershell can see that you've got quotes and a bunch of letters and stuff in side it. It assumes it's a string. What if you were storing a number? You can't really do math with a string, so assigning a number to our variable stays a number. There are a few different kinds, but we'll stick to integers for now.

> 
`$storingANumber = [int]2
$storingAString = [string]2
`These store the number 2 differently. The first stores it as a straight integer, whereas the second stores it as a string with only the character "2" in it. Being particular like this isn't neccessary all the time, but can help solve problems if you run into them. Powershell is pretty good at guessing what you're trying to do. The second example is called CASTING an integer to a string or CASTING to a string.

Enough talk... let's get the software running and play with some variables for real! Launch Powershell ISE (My Menu bar is on the left of my screen for ... reasons):

![Powershell ISE in the Windows Menu](https://powershell.org/wp-content/uploads/2022/07/blogImage01-300x177.png) 

If you've done any work in the command prompt before, this is basically the same thing. A bunch of the commands even work in here the same way they used to. One of the biggest differences you'll see is the top part looks a bit like a text editor... with numbers down the left hand margin. The top half is the EDITOR, the bottom half is the CONSOLE.

![](https://powershell.org/wp-content/uploads/2022/07/blogImage02-300x218.png) 

The stuff done in the console happens right away, whereas the stuff in editor won't do anything until we "Run" it. For simplicity's sake, we're going to start in the console.

When you first open the ISE (Integrated Scripting Environment), it will show you a PS \ > prompt in the console. The \ part will be the path where the console is currently operating. If we type DIR here and hit enter, it'll give us a directory listing of that directory. As in the old CMD.exe prompt, it'll use CD to change directories. Let's enter our variable assignment from above:

> 
`$ourFirstVariable = "Stuff Inside the Variable"
`Hit enter. Nothing happens. How can we tell what happened? Let's ask the console what it has in that variable.

> 
`$ourFirstVariable
`Hit enter. Now we've got the contents of our variable on the very next line!

I have a confession to make. Like in the matrix - "There is no string!" A string is actually a different storage type called an ARRAY. Let's look at those.


  **ARRAYS**


At some point the string / integer may not be enough for you. Underneath, the string is just a series of characters, one after the other S, t, u, f, f. There's a special way to store that type of informaiton that becomes extremely useful for us. Much like the junk drawer, we can put anything we want in there and access it right away. The way to get at individual pieces of data in an array is fairly simple. Square brackets and an integer. Since we're programmers now, we start cointing at zero. There's a real reason for it... just go with it for now. [0] is the first ELEMENT in the array. We access it using the variable name and the INDEX of the element we're trying to get to. Let's prove that my statement about strings was true. In the console:

> 
`$ourFirstVariable[0]
`Hit enter. It should return an S on the next line. Try other indexes in there. Each of our letters in turn is there. To have some real fun, let's put a RANGE in there:

> 
`$ourFirstVariable[0..24]
`Did you hit enter already? good. This should be our entire string with each element of it per line... including the spaces, which are just another character to the computer.

What if we wanted to store a different collectio of things in an array? Perhaps a parts list or a DVD list of titles from your collection. Defining a string we used the double-quote character ". To define an array, we're going to use what I like to call a Splat sandwich - or a Splatwich @(). Each of the elements are separated by a comma.

> 
`$ourFirstArray = @("thing1", "thing2")
`Now we can access them using [0]and [1] after the variable. I'm going to let you try that on your own, it'll speed up the rest of the tutorials. You may also notice that I have 2 strings inside an array... and a string is an array... array-ception? You would be absolutely correct. A MULTIDIMENSIONAL ARRAY makes for a very powerful data structure. Imagine this problem we need to solve:

Problem - We need a report of all of the servers on our network, their C: freespace, total C: size, CPU%Usage, RAM Used, and RAM Total.

Solution is to ask AD for all of the servers, Ask System Center VMM for the configurations of the servers. If they're physicals, you can use wmi to get performance counters. Now we have to store all that information in an array to make our report. Let's look at that array structure.

> 
`$server1 = @("server01", "27Gb", "50Gb", "76%", "10Gb", "16Gb")
$server2 = @("server02", "20Gb", "50Gb", "53%", "12Gb", "16Gb")
$server3 = @("server03", "14Gb", "50Gb", "14%", "3Gb", "16Gb")
$serverInfo = @($server1, $server2, $server3)
`You can either enter each of these lines in the console or try typing them into the editor and hitting the Run button on the ribbon (F5). Back in the console, let's explore this structure.

$serverInfo[0][0] will get you the name of the first item in the array (Server01). $serverInfo[2][3] will get you the CPU% for Server03. Good storage, horrible way to access it. I wish there were a way to access it something like $serverInfo[0]["CPU%"]... luckily, we can. Stick with this, we're nearly done and I'm going to start making it look more programmy. We're going to split the assignment onto multiple lines.


  **HASHTABLES**


Looking at the splatwich, you'll note that it opens and closes with parentheses. Powershell will allow anything to happen inside those.

> 
`$serverInfo = $(
    $server1,
    $server2,
    $server3
)
`This will work and allows you to look at this information in blocks. How you break the lines is a matter of style. I've learned quite a few languages, and this style works for me. It's not the only way. Use what works for you once you get to that point.

To make this easier to get to the information inside our variable, we're going to name each of the pieces. The name of it is the KEY. The information inside is the VALUE. They are referred to as a KEY/VALUE pair. That looks like this:

> 
`$server1 = @{
    "name"     = "server01";
    "freeC"    = "27Gb";
    "totalC"   = "50Gb";
    "CPU"      = "76%";
    "RAMUsed"  = "10Gb";
    "RAMTotal" = "16Gb"
}
`So, you'll note we've siwtched the square brackets [] to curly brackets {} (one of my coworkers refers to them jokingly as curly fries). You'll also notice the commas have changed to semi-colons. I don't know why, but that's how it works. If you put the other 2 server's information together and add them at the end to the $serverInfo, it looks like this:

> 
`# This is a comment line, anything that starts with a # is ignored by Powershell
# We can use them to talk to our future selves as we often have to come back to code
# Most of the time, we've forgotten everything we've written and what it's for...

# Gather data for server01, store in variable
$server1 = @{
    "name"     = "server01";
    "freeC"    = "27Gb";
    "totalC"   = "50Gb";
    "CPU"      = "76%";
    "RAMUsed"  = "10Gb";
    "RAMTotal" = "16Gb"
}

# Gather data for server02, store in variable
$server2 = @{
    "name"     = "server02";
    "freeC"    = "20Gb";
    "totalC"   = "50Gb";
    "CPU"      = "53%";
    "RAMUsed"  = "12Gb";
    "RAMTotal" = "16Gb"
}

# Gather data for server03, store in variable
$server3 = @{
    "name"     = "server03";
    "freeC"    = "14Gb";
    "totalC"   = "50Gb";
    "CPU"      = "14%";
    "RAMUsed"  = "3Gb";
    "RAMTotal" = "16Gb"
}

# Collect server information into an array for later reference
$serverInfo = $(
    $server1,
    $server2,
    $server3
)
`My initial Script actually only consisted of this:

> 
`# Gather data for server01, store in variable
# Gather data for server02, store in variable
# Gather data for server03, store in variable
# Collect server information into an array for later reference
`I started here so I could talk through the process I'd be completing, then write the code after each of the comments to flesh out the code. Now we've got a real program looking thing. Let's look at the data we've got in $serverInfo now.

$serverInfo[1]["totalC"] will show us our total C drive allocation for server02. This is now useful. We can also use "DOT NOTATION" to reference these named pieces.

$serverInfo[1].totalC will reference exactly the same piece of information. The editor now also has some cool things going on it it. You'll note each of the lines that start a block have a little square next to it. You can click this to collapse the block. This makes it so if you have longer scripts, you can have most of it collapsed and view just the portions you're working on. It aids in the readability of the code.


  **OBJECTS**


The last one is very similar to what we just did, but is dealt with differently internally. We're going to make an OBJECT. It's going to look very similar to what we've just done... but later when we're passing our information to and from other parts of code, Powershell is made to deal with "objects" in a more robust fashion than passing variables like we've been making. They look like this:

> 
`# Clear the array
$serverInfo_obj = @()

# I'm adding _obj to the variable name just to remind my future self what is in this variable
# I can see here that it's an array @() of objects _obj
# You can choose not to add the _obj if you don't like the looks of it

# Add the object for server02 into the array
# The += adds the contents of the @() below (the new "psobject" object) to the end of the existing array
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
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server02";
        "freeC"    = "20Gb";
        "totalC"   = "50Gb";
        "CPU"      = "53%";
        "RAMUsed"  = "12Gb";
        "RAMTotal" = "16Gb"
    }
)

# Add the object for server03 into the array
$serverInfo_obj += @(
    new-object PSObject -Property @{
        "name"     = "server03";
        "freeC"    = "14Gb";
        "totalC"   = "50Gb";
        "CPU"      = "14%";
        "RAMUsed"  = "3Gb";
        "RAMTotal" = "16Gb"
    }
)
`To refer to these now, we can still use index and dot notation $serverInfo_obj[0].name but you'll note as you type it, the property "name" shows up in the popup list! We made Powershell know about our data. This lets us do cool things with it. For instance:

> 
`$serverInfo_obj | Format-Table -autosize
`Looks really useful. whereas:

> 
`$serverInfo | Format-Table -autosize
`does not. The | character passes objects through to the next command for processing. In this case, we're formatting a table for OUTPUT. Which is, coincidentally, next week's topic.


###### 
  Step 1: Storage (Lots of fun) --> [Step 2: Output (So much we can do)](https://powershell.org/?p=294977&preview=true)
