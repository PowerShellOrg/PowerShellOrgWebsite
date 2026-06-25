---
title: What are variables anyway…
authors:
  - Stephen Moore
date: "2015-08-07T09:03:51+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/what-are-variables-anyway/
---

Fellow Admins.

A quick chat if you're new to variables.

So if you're like me and don't know any other programing/scripting language then all this PowerShell stuff is a bit daunting. So to help, this articles is on 
PowerShell Variables. The thing is that Variables in PowerShell are very important. I'm assuming you know what a cmdlet is? The very basic underlying tools that make powershell work. They are like powershell building blocks or bricks in a PowerShell wall. For example, get-aduser gets a list of all the users in AD and includes a few details like SID, name and distinguished name. So that little cmdlet gets all that information, and more once you learn to manipulate it. If cmdlets are the bricks then Variables are the mortar. They hold all this information you have gathered together and let you save and pick and choose what you want.


Let's stick with get-aduser as an example. By the way, it's available if you have the AD module installed on your server. It will work out of the box if you try it on a domain controller but you can install it on other servers so you don't have to log  into your DC. The reason it's a good example is that if you have a thousand users then you get 1000 entries in your list when you use the get-ADuser cmdlet. Thats a lot of information and it may take some time for the cmdlet to finish running. Say you want just the names that start with P. And you also want to look at the users who were created in the last week. And you also want to see their email address. This is what a Variable is for. You run the cmdlet once, collecting all the user information, and then you have the information sitting there to use in anyway you want for as often as you want. There is a lot to learn about Variables but the most import thing is you understand the idea. So look at this...

$ADusers = get-ADuser

Powershell uses the $ sign to denote a variable. So these are variables. $servers, $comp, $process, and $Itdoesntmatterwhatthenameis. They are just containers - thats it!  And just like any bucket or plastic box you can put a label on it that is anything you like. But it must start with a $ so 
PowerShell knows it's a container. There is a cmdlet called new-variable for creating variables which you can explore but the easiest way is using the = sign. So now all the users in the domain are stored in the variable $ADusers. Let use another example. Say we wanted to work with services. We could use the get-service cmdlet and get a list of all the services on our machine. And if we want to work with them we can store them in a variable. Like this. $myservices = Get-service. So now if we enter $myservices in powershell and press enter, all the services gathered by the get-service cmdlet are listed.


[![Services](https://powershell.org/wp-content/uploads/2015/08/Services.png)](https://powershell.org/wp-content/uploads/2015/08/Services.png)



Now we get to work with a variable. Quite a lot of information is in our variable and we want to get some out. This is where we can use a thing called a pipeline. It is a big thing in 
PowerShell. I'm not sure about other languages but for powershell it's like a production line. So we could do something like this. $myservices  | where {$_.name -like "*spool*"}.  That straight up and down bar is like a pipe from one part of the line to the next. They are a bit like filters.  So we have all this information in our variable but we only want to look at the print service. And worse I can't remember what the name of the print service is. Something about spool... No problem though because we told PowerShell to get something* like "*spool" and I'm sure I'll recognise it.


So lets have a look at what happens when we run the line of script.

[![SpoolerSVC](https://powershell.org/wp-content/uploads/2015/08/SpoolerSVC.png)](https://powershell.org/wp-content/uploads/2015/08/SpoolerSVC.png)

You can do all kinds of things now you have all that information in the variable. We just extract what we want. Maybe you think to yourself...I wonder how many running services I have? Or how many are not running. Don't be concerned with the code you see here, as if you're beginning it is hard to get a handle on it all at once. The point is that the Variable has all this information stored and we can get it out. Variables are great if not essential in scripts as the script can do all these things once it collects the information for the Variable at the beginning. 

![statuscount](https://powershell.org/wp-content/uploads/2015/08/statuscount.png) 

There is something else about Variables that is really important to understand in PowerShell. And I have to say it took me quite a while to "get it". PowerShell is an Object Orientated language.  It is very important to understand and deserves a blog post in it's own right. It's like saying it's a 3 dimensional language instead of a 2 dimensional language. So when we create a variable we are not just holding a word or a string we are holding an object. And objects are exciting! Because they hold heaps of information (properties)  and another another thing called methods. All of this is inside the variable. In the example above the "name" spooler is a property. It's like naming anything. Like a car. The cars name is Ford. But the method is drive, for example. There (hopefully) is also a method for stop. In our PowerShell example the method is count and the property we are looking for is status. Some properties have properties...like "running". It can get complex. The thing is all this is in a variable and all of it you can access bit by bit when and how you want it.

In other languages variables have to be declared. There are lots of kinds of variables but PowerShell is smart enough to automatically work out what kind of variable it should be looking at. So declaring a variable is usually not needed. The problem in Powershell is that most of the time the automatic part works well .... so well sometimes I forget that variables can be declared. Sometimes the script just doesn't work like you thought it would. It turns out you need to declare the variable. And sometimes you want to because there are some juicy methods you want to get to. Image you want to work with a date. 12/05/15. So you put it in a variable called $date. $date = "12/05/15". Remember we talked about methods. Methods are things we can do. By the way that date is just some writing. It's basic. What PowerShell thinks is, that it's a sting. Like this: [string]$date. That's how you can declare a variable in PowerShell. Use [] and the appropriate syntax. If you want to work with numbers [int]$date and PowerShell knows you want to work with numbers. In out case we want to work with a date. So we declare our variable. [datetime]$date. There is a very cool cmdlet called get-member that shows all the properties and methods (and other things) in a variable. Check this out. This is what _$date | get-member_  gives us when we don't declare the variable.

[![stringmethod](https://powershell.org/wp-content/uploads/2015/08/stringmethod.png)](https://powershell.org/wp-content/uploads/2015/08/stringmethod.png)



All those methods let you do things to the content of the variable. Like _toupper_. That will make all the letters capital. Or _replace_. Lets you replace letter or words in a string stored in the variable. But we don't want that! We want to work with our date! Now check this out... [datetime]$date | get-member

![datemethods](https://powershell.org/wp-content/uploads/2015/08/datemethods.png) 

It's totally different. There's all those juicy properties like _month,minute_ and _dayofyear_. And cool methods like _todatetime_, and _tolongdatestring_. So now that we have made available _tolongdatestring_ we can use it like this_. _Our 12/05/15 has become Saturday, 5 December 2015. If we hadn't declared our variable we wouldn't have been able to do that.

[![tolongdate2](https://powershell.org/wp-content/uploads/2015/08/tolongdate2.png)](https://powershell.org/wp-content/uploads/2015/08/tolongdate2.png)

Hopefully if you didn't know what those $ sign things were you now have a better idea. Oh and that . in the .count or .tolongdatestring is so cool. I had no idea when I was starting out and you should try looking up . on the internet. That . is like a short cut to get into the variables and access methods or properties. $myservice.name, $myservice.status, and $myservice.displayname will give just those properties.  All that complexity is yours to play with, explore and use once it's stored in a variable. 

Keep practicing, PowerShell is the best thing since Windows.



Steve
