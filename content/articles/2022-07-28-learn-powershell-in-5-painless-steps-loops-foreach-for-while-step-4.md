---
title: Learn Powershell in 5 Painless Steps – Loops (Foreach, For, While) – Step 4
author: Cole McDonald
authors:
  - Cole McDonald
date: "2022-07-28T18:45:44+00:00"
categories:
  - Tutorials
tags:
  - Beginner
  - Loops
  - Tutorial
aliases:
  - /2022/07/learn-powershell-in-5-painless-steps-loops-foreach-for-while-step-4/
---

DevOps = Developers + Operations.  What if you're in Operations and don't have a developer at your disposal?  That should never stop you from making your job easier and more efficient.  Powershell is a scripting language from Microsoft that is already on your Windows PC and Servers and more recently, [open sourced to the OSX and Linux communities](https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/).  It ships with a great minimalist development environment (Powershell ISE).

The problem I had is that all of the tutorials out there either assume a background in scripting and programming, or act as nothing more than command references.  I'm hoping to enable you to automate your own workflows even if you've never programmed before.  You only need to learn 5 things: Storage, Input, Output, Decisions, Loops.  Everything you do manually is made up of these 5 things.  Every programming language is made up of these 5 things.

* * *


###### 
  [Step 3: Input (Just you and me)](https://powershell.org/?p=294979&preview=true) <-- Step 4: Loops(I can give you more) --> [Step 5: Decisions(The time has arrived)](https://powershell.org/?p=294983&preview=true)


* * *

We've spent three weeks now learning to move data from point A to point B. Let's see how we scale this from a list of 3 servers to 30, 300, or 3 Million (Pinky to corner of mouth... yes I did, I assume you did as well). We'll start with our object code from before.

There is a matter of scale that happens here, and how we add to our object array matters. Using the += we've been using isn't a big deal with 3 objects. When we start to ramp this up, we run into a problem. The problem is this:

> 
`# Declare a test array $a
$a = @("thing 1", "thing 2", "thing 3")

# Add an element to the end
$a += @("thing 4")

# This is what it's actually doing
$a = $a + @("thing 5")
`We start on the right side of the equals sign (technical name: assignment operator). From left to right on that side, we (the computer) figure out what is in $a so we can find the end of it for the + then put the contents of the array @("Thing 5") into the existing array and return it across the assignment operator (equals sign).  When there are only 3 elements in $a, it's not a big deal.  When we get to thousands of them, it starts to take a long time.

It's as if our new object has to go to the front of the line in the deli and ask each customer in line if they're at the back of the line before getting into the back of that line.

The object knows how many elements it has.  It would be nice to take the new element, hand it the next index out of a virtual red counter number spindle and tell it to stand in that deli line.  This is a much better way to do this to make it faster at scale as it no longer needs to read through the whole array to find the end.

> 
`# Create an empty array with the class arraylist
[System.Collections.arrayList]$serverInfo_obj = @()

# I've changed the server naming conventions slightly
# Add the object for server-01 into the array
$newObject = new-object PSObject -Property @{
    "name"     = "server-01" ;
    "totalC"   = "50Gb" ;
    "totalD"   = "200Gb" ;
    "cores"    = "2" ;
    "totalRAM" = "8Gb"
}
$serverInfo_obj.add($newObject)

# Add the object for server-02 into the array
$newObject = new-object PSObject -Property @{
    "name"     = "server-02" ;
    "totalC"   = "50Gb" ;
    "totalD"   = "50Gb" ;
    "cores"    = "4" ;
    "totalRAM" = "16Gb"
}
$serverInfo_obj.add($newObject)

# Add the object for server-03 into the array
$newObject = new-object PSObject -Property @{
    "name"     = "server-03" ;
    "totalC"   = "50Gb" ;
    "totalD"   = "50Gb" ;
    "cores"    = "4" ;
    "totalRAM" = "16Gb"
}
$serverInfo_obj.add($newObject)
`Now, we'll just enter another object for each of our 3 million servers we're managing.. I'll wait. No? Let's see how we can make our script LOOP through a large number of things. We'll start by noticing our naming convention has a simple format that would be suited well to just bumping the number a bunch of times and setting the name of the server to "Server-$instance". This will be simple to perform using a RANGE. To see how a range works, enter this into your console:

> 1..100

Cool... we made a computer count to 100. I may have played with this dumb little piece of code far too much when I first learned it. We'll note that the numbers don't have the leading zeroes to make them the same number of digits. It's easier to read a list of them if they all line up. This looks a little bit like I sneezed while typing but I'll explain it once we've run it:

> 1..100 | %{ "{0:000}" -f $_ }

1) We know that the range generates all the numbers between 1 and 100.  
2) We know that the PIPE character passes data from the left to the right.  
3) We recognize that there is some sort of string in there "" and some CURLY BRACES {}

We'll start with the curly braces. Anything inside a set of curly braces is a set of commands that get run and solved once we get to them. A very common structure you'll see frequently in scripts we get from online is this bit |%{}

| passes information across. Specifically, it passes objects. Those objects can be as simple as the number we're generating here, or as complicated as objects containing multiple properties and methods.

{} contains a set of commands, we just learned this.

% is a shorthand for a command called...


  **FOREACH**


I just heard the dramatic hamster soundtrack in my head when I typed that. I need a hobby. The foreach command takes a set of 0 or more objects and runs the contents of the paired curly braces once for each of the objects being passed to it. In our case, we're passing it a bunch of numbers, one per object. Within the foreach structure, I'd like to draw your attention to the $_ but. That is a shorthand for $PSItem, which is the current object coming across the PIPELINE. We can verify this thusly:

> 
`# Shorthand
"Ferdinand" | % { Write-Output $_ }

# Full commands, I prefer these for readability
"Imelda" | Foreach { Write-Output $PSItem }

# Passing an array across
@("Ferdinand", "Imelda") | Foreach { Write-Output $PSItem }
`All that's left is to PARSE (figure out) the "{0:000}" -f $_ part. It's a special structure that allows us to format strings. We now know that the $_ is the object coming across the pipeline... in our case, a number; let's say 42. The -f is called a format operator, the bits inside the string are the PLACEHOLDERS. To show you how they work, we'll do a simple demonstration.

> 
`"First {0}, Second {1}" -f "thing", "one"
`You'll note that the stuff on the right is like an array with a part 0 and a part 1. Indices are difficult to talk about outside the code. I blame the binary numbering system for this problem. So "thing" is the zeroth item and "one" is the oneth item on the right side of the -f operator. They are represented by their index number in curly braces on the left, inside the string.

Now, as we look back at our initial piece of code we're working through, we've got "{0:000}". The 0 to the left of the : is our index. we know that the $PSItem is in our zeroth item in our single item array to the right of the -f operator, so that should show up there. To the right of the : we can only assume is the part that adds the zeroes to our number, making it 042, and we'd be correct.

This is amazingly powerful for information display allowing left and right alignment, hexadecimal conversion, currency, number percision, etc. In our case, it's just setting aside digits that will be filled in with our 42. We could also use {0:D3} to do the same thing, I just like the {0:000} because it's a little easier to look at and tell what it's doing. To write that whole thing out without the short hand:

> 
`1..100 | Foreach { "{0:000}" -f $PSItem }
`Here's a list of different formatting you can use with the -f operator: <http://ss64.com/ps/syntax-f-operator.html>

So, lets get back to naming our servers:

> 
`1..100 | foreach { "server-{0:000}" -f $PSItem }
`I have another way to do this same type of thing. Instead of sending it things, this one generates them based on whatever you tell it to do. This structure exists in nearly every programming language out there. It is a little bit more programmer looking than the foreach loop.


  **FOR**


We'll start by generating exactly the same thing as our last piece of code:

> 
`for ($i=1; $i -lt 101; $i++) { "server-{0:000}" -f $i }
`Since it's more programmy, I'm going to break it up into multiple lines. I'm going to do this in a couple different ways to illustrate that it's really the same code, just formated differently. You can technically do this with most examples of code within curly braces {} or parentheses ():

> 
`# More of a .NET / C# way of looking at this code
# One thing per line
# Blocks open and close on their own line
# Lots of white space
for
(
    $i=1
    $i -lt 101
    $i++
)
{
    "server-{0:000}" -f $i
}

# The traditional "correct" Powershell way
# Very C++ or Java-y
for ($i=1; $i -lt 101; $i++)
{
    "server-{0:000}" -f $i
}

# The more Python looking way, if you're into that
# In Python, White space at the beginning of a line counts
# The curly braces wouldn't even be necessary there
for ($i=1; $i -lt 101; $i++) {
    "server-{0:000}" -f $i
}

# How I prefer it
# - Collapses better in the ISE
# - Shows me the block start and finish Easier when nesting
# - Has the brevity of the Python without the open ended closing bracket
for ($i=1; $i -lt 101; $i++) {
    "server-{0:000}" -f $i
}
`Use whatever makes the code easier for you to read. Feel free to reformat the scripts you download from others as well to make them easier for you to read. I use the latter format for the reasons I stated in the comments. Let's get back to the for statement:

> 
`for ($i=1; $i -lt 101; $i++) {
    "server-{0:000}" -f $i
}
`The command is FOR (initiate variable; condition; increment variable){code block}

We recognize the $i=1 We're setting the variable $i to the value 1 as a starting point. We can use the semi-colon ; to separate commands on the same line.

The second part is called an evaluation. The -lt stands for "less than." So the middle statement reads: $i is less than 101. Our FOR LOOP will run as long as this is true (or as powershell sees it, $TRUE as opposed to $FALSE).

The third piece states what happens each time the loop comes back up to the top. In this case, we are incrementing our $i by 1. The ++ adds 1 to whatever integer based variable it's attached to. If we start at 0 instead of 1, we can loop through index numbers.

It's a little bit pointless as we can just pass through, but perhaps we want to loop through every other item in an array. We could do a $i=$i+2 for the third bit. Very useful on our search for the next prime number and that huge award! (2 is the only possible even prime)

I find the FOR loop a bit ugly for most of the processing I do. There are times it is exactly the thing needed, but I very much prefer having more control within the body of the loop. For this, I primarily use the WHILE loop instead.


  **WHILE**


It is simple in concept, it loops WHILE the condition () is true (careful, this first example will loop forever - keep an eye on the stop button at the top of the editor):

> 
`While ( $TRUE ) { # Does a thing; Write-Output "Can't sleep" }
While ( $FALSE ) { # Doesn't do a thing; Write-Output "Clowns will catch me" }
`Let's talk TRUE and FALSE. There are special variables defined in almost every language for $TRUE and $FALSE. These are the two BOOLEAN conditions, the binary bread and butter of 1 and 0, so to speak. In fact, they are stored as a 1 and a 0 and can be used that way:

> 
`While ( 1 ) { # Does a thing; Write-Output "Can't Sleep" }
While ( 0 ) { # Doesn't do a thing; Write-Output "Clowns will catch me" }
`Let's talk BOOLEAN a little bit (get it... bit? Like a single 1/0 piece of storage in the computer? I slay me).

During the for loop discussion, we looked at the -lt operator, which I mentioned was a boolean operator. This one will take some explanation.

A boolean statement is any comparison that can be resolved to true or false. In our for loop, we had the statement $i -lt 101. As long as $i was less than 101, that statement resolved to $TRUE. As soon as it was equal (-eq) to 101, it was no longer less than it and therefore considered $FALSE. As seen in the simple statements above, $FALSE in the condition () part of the while loop "# Doesn't do a thing." If we replace the $TRUE/$FALSE with a CONDITIONAL STATEMENT, we can build that same FOR loop using a WHILE loop.

> 
`$i = 1
While ( $i -lt 101 ) {
    "server-{0:000}" -f $i
    $i++
}
`We've got a bunch of different boolean operators we can use against numbers:

> 
`-eq Equal To
-lt Less Than
-le Less Than or Equal To
-gt Greater Than
-ge Greater Than or Equal To
`A few for strings:

> 
`-like    This takes wildcards: "server-1*"
-notlike same as above, but excludes instead of includes
`EXTRA CREDIT! There are a few more that will evaluate multiple boolean statements as well:

-and (both true)

> 
`$true  -and $false = $false
$true  -and $true  = $true
$false -and $true  = $false
$false -and $false = $false
`-or (at least one true)

> 
`$true  -or $false = $true
$true  -or $true  = $true
$false -or $true  = $false
$false -or $false = $false
`-xor (one true, not both)  
("exclusive or", not the bad guy from a low budget 80s sci-fi movie)

> 
`$true  -xor $false = $true
$true  -xor $true  = $false
$false -xor $true  = $true
$false -xor $false = $false
`-not (you're so negative, also known as !)

> 
`-not $false = $true
!$false     = $true
-not $true  = $false
!$true      = $false`# Returns $TRUE when $i is 50 to 100
($i -gt 49) -and ($i -lt 101)

# Makes more sense as
($i -ge 50) -and ($i -le 100)
`You'll note the () I've used. These are used in this case to indicate order of operations. The parentheticals are solved first. This turns them into a $TRUE or a $FALSE. Then those results are compared with the boolean operator. You can make these quite complex. Imagine you need to find all servers that have more than 8GB installed and smaller than 250GB disk, but not the ones named SQL-xxx

> 
`(
    ( $server.memory -gt 8 ) -and
    ( $server.diskC -lt 250 )
) -and (
    $server.name -notlike "SQL-*"
)
`This will evaluate the memory and disk space part first, then evaluate the server name, then check them against each other. This is great if all we're ever doing is checking whether to stop a loop. What if we want to adjust our dynamic memory settings on a VM based on its memory and disk configurations? We'd need to be able to do this test, then have the results drive a DECISION! Have you guessed next week's topic yet?

Next week, we learn DECISIONS. Or as I like to call it, how SKYNET begins.


###### 
  [Step 3: Input (Just you and me)](https://powershell.org/?p=294979&preview=true) <-- Step 4: Loops(I can give you more) --> [Step 5: Decisions(The time has arrived)](https://powershell.org/?p=294983&preview=true)
