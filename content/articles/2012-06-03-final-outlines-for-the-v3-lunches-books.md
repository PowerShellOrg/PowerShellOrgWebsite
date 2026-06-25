---
title: "FInal Outlines for the v3 \"Lunches\" Books"
authors:
  - Don Jones
date: "2012-06-03T13:35:00+00:00"
aliases:
  - /2012/06/final-outlines-for-the-v3-lunches-books/
---

1  
1095  
6247  
Concentrated Technology  
52  
14  
7328  
14.0  
Normal  

false  
false  
false  
EN-US  
JA  
X-NONE 

I wanted to get these posted for folks' reference. The books are proceeding apace, and now that PowerShell v3 is in Release Candidate, we're going to move forward with publication ASAP.



**ToC -- "Learn Windows PowerShell 3 in a Month of Lunches"**

1.      
Before You Begin

a.      
Why You Can't Afford to Ignore PowerShell

b.      
Is This Book for You?

c.       
How to Use this Book


i.     The  
Main Chapters


ii.     Hands-On  
Labs


iii.     Supplementary  
Materials


iv.     Further  
Exploration


v.     Above  
and Beyond

d.      
Setting up Your Lab Environment

e.      
Installing Windows PowerShell

f.       
Online Resources

g.      
Being _Immediately  
Effective_ with PowerShell

2.      
Meet PowerShell

a.      
Choose Your Weapon

b.      
The Console Window

c.       
The Integrated Scripting Environment

d.      
It's Typing Class All Over Again!

e.      
What Version is This?

f.       
Common Points of Confusion

g.      
**Lab**

h.      
**Further  
Exploration**

3.      
Using the Help System

a.      
The Help System: How You Discover Commands

b.      
Updatable Help

c.       
Asking for Help

d.      
Using Help to Find Commands

e.      
Interpreting the Help


i.     Parameter  
Sets and Common Parameters


ii.     Optional  
and Mandatory Parameters


iii.     Positional  
Parameters


iv.     Parameter  
Values


v.     Examples

f.       
Accessing "About" Topics

g.      
Accessing Online Help

h.      
**Lab**

4.      
Running Commands

a.      
Not Scripting: Just Running Commands

b.      
The Anatomy of a Command

c.       
The Cmdlet Naming Convention

d.      
Aliases: Nicknames for Commands

e.      
Taking Shortcuts


i.     Truncating  
Parameter Names


ii.     Parameter  
Name Aliases


iii.     Positional  
Parameters

f.       
Cheating, a Bit: Show-Command

g.      
Support for External Commands

h.      
Dealing With Errors

i.        
Common Points of Confusion


i.     Typing  
Cmdlet Names


ii.     Typing  
Parameters

j.        
**Lab**

5.      
Working with Providers

a.      
What are Providers?

b.      
How the File System is Organized

c.       
How the File System is Like Other Data Stores

d.      
Navigating the File System

e.      
Using Wildcards and Literal Paths

f.       
Working with Other Providers

g.      
**Lab**

h.      
**Further  
Exploration**

6.      
The Pipeline: Connecting Commands

a.      
Connect One Command to Another: Less Work For  
You!

b.      
Exporting to a CSV or XML File

c.       
Piping to a File or Printer

d.      
Converting to HTML

e.      
Using Cmdlets That Modify the System: Killing  
Processes and Stopping Services

f.       
Common Points of Confusion

g.      
**Lab**

7.      
Adding Commands

a.      
How One Shell Can Do Everything

b.      
About Product-Specific "Management Shells"

c.       
Extensions: Finding and Adding Snap-Ins

d.      
Extensions: Finding and Adding Modules

e.      
Playing With a New Module

f.       
Profile Scripts: Preloading Extensions When the  
Shell Starts

g.      
Common Points of Confusion

h.      
**Lab**

8.      
 "Objects:"  
Just Data by Another Name

a.      
What are Objects?

b.      
Why PowerShell Uses Objects

c.       
Discovering Objects: Get-Member

d.      
Object Attributes, or "Properties"

e.      
Object Actions, or "Methods"

f.       
Sorting Objects

g.      
Selecting the Properties You Want 

h.      
Objects Until the Very End

i.        
Common Points of Confusion

j.        
**Lab**

9.      
The Pipeline, Deeper

a.      
The Pipeline: Enabling Power With Less Typing

b.      
How PowerShell Passes Data Down the Pipeline

c.       
Plan A: Pipeline Input ByValue

d.      
Plan B: Pipeline Input ByPropertyName

e.      
When Things Don't Line Up: Custom Properties

f.       
Parenthetical Commands

g.      
Extracting the Value from a Single Property

h.      
**Lab**

10. Formatting  
- and Why it's Done on the Right

a.      
Formatting: Making What You See Prettier

b.      
About the Default Formatting

c.       
Formatting Tables

d.      
Formatting Lists

e.      
Formatting Wide

f.       
Custom Columns and List Entries

g.      
Going Out: To a File, a Printer, or the Host

h.      
Another Out: GridViews

i.        
Common Points of Confusion


i.     Always  
Format Right


ii.     One  
Object at a Time, Please

j.        
**Lab**

k.      
**Further  
Exploration**

11. Filtering  
and Comparisons

a.      
Making the Shell Give You Just What You Need

b.      
Filter Left

c.       
Comparison Operators

d.      
Filtering Objects out of the Pipeline

e.      
The Iterative Command-Line Model

f.       
Common Points of Confusion


i.     Filter  
Left, Please


ii.     When  
$_ is Allowed

g.      
**Lab**

h.      
**Further  
Exploration**

12. A  
Practical Interlude

a.      
Defining the Task

b.      
Finding the Commands

c.       
Learning to Use the Commands

d.      
Tips for Teaching Yourself

e.      
**Lab**

13. Remote  
Control: One on One, and One to Many

a.      
The Idea Behind Remote PowerShell

b.      
WinRM Overview

c.       
Using Enter-PSSession and Exit-PSSession for  
One-to-one Remoting

d.      
Using Invoke-Command for One-to-many Remoting

e.      
Differences Between Remote and Local Commands


i.     Invoke-Command  
vs -ComputerName


ii.     Local  
vs Remote Processing


iii.     Deserialized  
Objects

f.       
But Wait, There's More

g.      
Remoting Options

h.      
Common Points of Confusion

i.        
**Lab**

j.        
**Further  
Exploration**

14. Using  
Windows Management Instrumentation

a.      
WMI Essentials

b.      
The Bad News About WMI

c.       
Exploring WMI

d.      
Choose Your Weapon: WMI or CIM

e.      
Using Get-WmiObject

f.       
Using Get-Ciminstance

g.      
WMI Documentation

h.      
Common Points of Confusion

i.        
**Lab**

j.        
**Further  
Exploration**

15. Multitasking  
with Background Jobs

a.      
Making PowerShell Do Multiple Things at the Same  
Time

b.      
Synchronous versus Asynchronous

c.       
Creating a Local Job

d.      
WMI, as a Job

e.      
Remoting, as a Job

f.       
Getting Job Results

g.      
Working with Child Jobs

h.      
Commands for Managing Jobs

i.        
Scheduled Jobs

j.        
Common Points of Confusion

k.      
**Lab**

16. Working  
with Bunches of Objects, One at a Time

a.      
Automation for Mass Management

b.      
The Preferred Way: "Batch" Cmdlets

c.       
The WMI Way: Invoking WMI Methods

d.      
The Backup Plan: Enumerating Objects

e.      
Common Points of Confusion


i.     Which  
Way is the Right Way?


ii.     WMI  
Methods versus Cmdlets


iii.     Method  
Documentation


iv.     ForEach-Object  
Confusion

f.       
**Lab**

17. Security  
Alert!

a.      
Keeping the Shell Secure

b.      
Windows PowerShell Security Goals

c.       
Execution Policy and Code Signing


i.     Execution  
Policy Settings


ii.     Digital  
Code Signing

d.      
Other Security Measures

e.      
Other Security Holes?

f.       
Security Recommendations

g.      
**Lab**

18. Variables:  
A Place to Store Your Stuff

a.      
Introduction to Variables

b.      
Storing Values in Variables

c.       
Fun Tricks with Quotes

d.      
Storing Lots of Objects in a Variable

e.      
More Tricks with Double Quotes

f.       
Declaring a Variable's Type

g.      
Commands for Working with Variables

h.      
Variable Best Practices

i.        
Common Points of Confusion

j.        
**Lab**

k.      
**Further  
Exploration**

19. Input  
and Output

a.      
Prompting For, and Displaying, Information

b.      
Read-Host

c.       
Write-Host

d.      
Write-Output

e.      
Other Ways to Write

f.       
**Lab**

g.      
**Further  
Exploration**

20. Sessions:  
Remote Control, with Less Work

a.      
Making PowerShell Remoting a Bit Easier

b.      
Creating and Using Reusable Sessions

c.       
Using Sessions with Enter-PSSession

d.      
Using Sessions with Invoke-Command

e.      
Implicit Remoting: Importing a Session

f.       
Disconnected Sessions

g.      
**Lab**

h.      
**Further  
Exploration**

21. You  
Call This Scripting?

a.      
Not Programming... More Like Batch Files

b.      
Making Commands Repeatable

c.       
Parameterizing Commands

d.      
Creating a Parameterized Script

e.      
Documenting Your Script

f.       
One Script, One Pipeline

g.      
A Quick Look at Scope

h.      
**Lab**

22. Improving  
Your Parameterized Script

a.      
Starting Point

b.      
Getting PowerShell to do the Hard Work

c.       
Making Parameters Mandatory

d.      
Adding Parameter Aliases

e.      
Validating Parameter Input

f.       
Adding the Warm and Fuzzies with Verbose Output

g.      
**Lab**

23. Advanced  
Remoting Configuration

a.      
Using Other Endpoints

b.      
Creating Custom Endpoints


i.     Creating  
the Session Configuration


ii.     Registering  
the Session

c.       
Enabling Multi-Hop Remoting

d.      
Digging Deep into Remoting Authentication


i.     Defaults  
for Mutual Authentication


ii.     Mutual  
Authentication via SSL


iii.     Mutual  
Authentication via TrustedHosts

e.      
**Lab**

24. Using  
Regular Expressions to Parse Text Files

a.      
The Purpose of Regular Expressions

b.      
A RegEx Syntax Primer

c.       
Using RegEx with -Match

d.      
Using RegEx with Select-String

e.      
**Lab**

f.       
**Further  
Exploration**

25. Additional  
Random Tips, Tricks, and Techniques

a.      
Profiles, Prompts and Colors: Customizing the  
Shell


i.     PowerShell  
Profiles


ii.     Customizing  
the Prompt


iii.     Tweaking  
Colors

b.      
More Operators: -as, -is, -replace, -join,  
-split


i.     -as  
and -is


ii.     -replace


iii.     -join  
and -split


iv.     -contains  
and -in

c.       
String Manipulation

d.      
Date Manipulation

e.      
Dealing with WMI Dates

f.       
Setting Default Parameter Values

g.      
Playing with Script Blocks

26. Using  
Someone Else's Script

a.      
The Script

b.      
It's a Line-by-line Examination

c.       
**Lab**

27. Never  
the End

a.      
Ideas for Further Exploration

b.      
"Now That I'm Done, Where Do I Start?"

c.       
Other Resources You'll Grow to Love

28. PowerShell  
Cheat Sheet

a.      
Punctuation 

b.      
Help File 

c.       
Operators

d.      
Custom Property and Column Syntax

e.      
Pipeline Parameter Input

f.       
When to Use $_

29. Appendix  
A: Review Labs

a.      
Review Lab 1 (Chapters 1-6)

b.      
Review Lab 2 (Chapters 1-14)

c.       
Review Lab 3 (Chapters 1-19)





1  
784  
4474  
Concentrated Technology  
37  
10  
5248  
14.0  
Normal  

false  
false  
false  
EN-US  
JA  
X-NONE 

**ToC -- "PowerShell Scripting and Toolmaking in a Month of Lunches"**

** **

**Part I: Introduction  
to Toolmaking**

1.      
Before You Begin

a.      
What is Toolmaking?

b.      
Is This Book for You?

c.       
Pre-Requisites


i.     PowerShell  
v3


ii.     Admin  
Privileges


iii.     Multiple  
Computers


iv.     SQL  
Server


v.     PowerShell  
ISE


vi.     Optional  
Pre-Requisites

d.      
How To Use this Book

2.      
PowerShell Scripting Overview

a.      
What _is_  
PowerShell Scripting?

b.      
PowerShell's Execution Policy

c.       
Running Scripts

d.      
Editing Scripts

e.      
**Further  
Exploration: Script Editors**

f.       
**Lab**

3.      
PowerShell's Scripting Language

a.      
One Script, One Pipeline

b.      
Variables

c.       
Quotation Marks

d.      
Object Members and Variables

e.      
Parentheses

f.       
Refresher: Comparisons

g.      
Logical Constructs


i.     If  
Construct


ii.     Switch  
Construct

h.      
Looping Constructs


i.     Do...While  
Construct


ii.     ForEach  
Construct


iii.     For  
Construct

i.        
Break and Continue in Constructs

j.        
**Lab**

4.      
Simple Scripts and Functions

a.      
Start with a Command

b.      
Turn the Command into a Script

c.       
Parameterize the Command

d.      
Turning the Script into a Function

e.      
Testing the Function


i.     Dot-Sourcing


ii.     Calling  
the Function in the Script


iii.     A  
Better Way Ahead: Script Modules

f.       
**Lab**

5.      
Scope

a.      
What is Scope?

b.      
Seeing Scope in Action

c.       
Working Out-of-Scope

d.      
Getting Strict with Scope

e.      
Best Practices for Scope

f.       
**Lab**

** **

**Part II: Building an  
Inventory Tool**

6.      
Tool Design Guidelines

a.      
Do One Thing, and Do it Well


i.     Input  
Tools


ii.     Functional  
Tools


iii.     Output  
Tools

b.      
**Lab**

7.      
Advanced Functions, Part 1

a.      
Advanced Function Template

b.      
Designing the Function

c.       
Declaring Parameters

d.      
Testing the Parameters

e.      
Writing the Main Code

f.       
Outputting Custom Objects

g.      
What Not to Do

h.      
Coming Up Next

i.        
**Lab**

8.      
Advanced Functions, Part 2

a.      
Making Parameters Mandatory

b.      
Verbose Output

c.       
Parameter Aliases

d.      
Accepting Pipeline Input

e.      
Parameter Validation

f.       
Adding a Switch Parameter

g.      
Parameter Help

h.      
Coming Up Next

i.        
**Lab**

9.      
Writing Help

a.      
Comment-Based Help

b.      
XML-Based Help

c.       
Coming Up Next

d.      
**Lab**

10. Error  
Handling

a.      
It's All About the Action

b.      
Setting the Error Action

c.       
Saving the Error

d.      
Error Handling v1: Trap

e.      
Error Handling v2+: Try...Catch...Finally

f.       
Providing Some Visuals

g.      
Coming Up Next

h.      
**Lab**

11. Debugging  
Techniques

a.      
Two Types of Bugs

b.      
Solving Typos

c.       
The Real Trick to Debugging: Expectations

d.      
Dealing with Logic Errors: Trace Code

e.      
Dealing with Logic Errors: Breakpoints

f.       
Seriously, Have Expectations

g.      
Coming Up Next

h.      
**Lab**

12. Creating  
Custom Format Views

a.      
The Anatomy of a View

b.      
Adding a Type Name to Output Objects

c.       
Making a View

d.      
Loading and Debugging the View

e.      
Using the View

f.       
Coming Up Next

g.      
**Lab**

13. Script  
and Manifest Modules

a.      
Introducing Modules


i.     Module  
Location


ii.     Module  
Name


iii.     Module  
Contents

b.      
Creating a Script Module

c.       
Creating a Module Manifest

d.      
Creating a Module-Level Setting Variable

e.      
Coming Up Next

f.       
**Lab**

14. Adding  
Database Access

a.      
Simplifying Database Access

b.      
Setting Up Your Environment

c.       
The Database Functions

d.      
About the Database Functions

e.      
Using the Database Functions

f.       
**Lab**

15. Interlude:  
Creating a New Tool

a.      
Designing the Tool

b.      
Writing and testing the Function

c.       
Dressing Up the Parameters

d.      
Adding Help

e.      
Handling Errors

f.       
Creating a Custom Format View

g.      
Making a Module

h.      
Coming Up Next



**Part III: Advanced  
Toolmaking Techniques**

16. Making  
Tools that Make Changes

a.      
The -Confirm and -WhatIf Parameters

b.      
Passthrough ShouldProcess

c.       
Defining the Impact Level

d.      
Implementing ShouldProcess

**e.      
** **Lab**

17. Creating  
a Custom Type Extension

a.      
The Anatomy of an Extension

b.      
Creating a Script Property

c.       
Creating a Script Method

d.      
Loading the Extension

e.      
Testing the Extension

f.       
Adding the Extension to a Manifest

g.      
**Lab**

18. Creating  
PowerShell Workflows

a.      
Workflow Overview


i.     Common  
Parameters for Workflows


ii.     Activities  
and Stateless Execution


iii.     Persisting  
State


iv.     Suspending  
and Resuming Workflows


v.     Inherently  
Remotable


vi.     Parallelism

b.      
General Workflow Design Strategy

c.       
Example Workflow Scenario

d.      
Writing the Workflow

e.      
Workflows vs. Functions

f.       
**Lab**

19. Troubleshooting  
Pipeline Input

a.      
Refresher: How Pipeline Input Works

b.      
Introducing Trace-Command

c.       
Interpreting Trace-Command Output

d.      
**Lab**

20. Using  
Object Hierarchies for Complex Output

a.      
When a Hierarchy Might be Necessary

b.      
Hierarchies and CSV: Not a Good Idea

c.       
Creating Nested Objects

d.      
Working with Nested Objects


i.     Using  
Select-Object to Expand Child Objects


ii.     Using  
Format-Custom to Expand an Object Hierarchy


iii.     Using  
a ForEach Loop to Enumerate Sub-Objects


iv.     Using  
PowerShell's Array Syntax to Access Individual Sub-Objects

e.      


f.       
**Lab**

21. Globalizing  
a Function

a.      
Introduction to Globalization and Localization

b.      
PowerShell's Data Language

c.       
Storing Translated Strings

d.      
Do You Need to Globalize?

e.      
**Lab**

22. Crossing  
the Line: Utilizing the .NET Framework

a.      
.NET Classes and Instances

b.      
Static Methods of a Class

c.       
Instantiating a Class

d.      
Using Reflection

e.      
Finding Class Documentation

f.       
PowerShell vs. Visual Studio

g.      
**Lab**



**Part IV: Creating  
Tools for Delegated Administration**

23. Creating  
a GUI Tool, Part 1: The GUI

a.      
Introduction to WinForms

b.      
Using a GUI to create the GUI

c.       
Manually Coding the GUI

d.      
Showing the GUI

e.      
**Lab**

24. Creating  
a GUI Tool, Part 2: The Code

a.      
Addressing GUI Objects

b.      
Example: Text Boxes

c.       
Example: Button Clicks

d.      
Example: List Boxes

e.      
**Lab**

25. Creating  
a GUI Tool, Part 3: The Output

a.      
Using Out-GridView

b.      
Creating a Form for Output

c.       
Populating and Showing the Output

d.      
**Lab**

26. Creating  
Proxy Functions

a.      
What are Proxy Functions?

b.      
Creating the Proxy Function Template

c.       
Removing a Parameter

d.      
Adding a Parameter

e.      
Loading the Proxy Function

f.       
**Lab**

27. Setting  
Up Constrained Remoting Endpoints

a.      
Refresher: Remoting Architecture

b.      
What are Constrained Endpoints?

c.       
Creating the Endpoint Definition

d.      
Registering the Endpoint

e.      
Connecting to the Endpoint

f.       
**Lab**

** **

**Conclusion**

28. Never  
the End

a.      
Welcome to Toolmaking

b.      
Cool Ideas for Tools

c.       
What's Your Next Step?






![](http://powershell.com/cs/aggbug.aspx?PostID=16860)
