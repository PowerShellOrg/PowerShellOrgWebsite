---
title: "Is this list \"Everything\" in PowerShell?"
authors:
  - Don Jones
date: "2013-08-06T20:11:04+00:00"
categories:
  - Training
aliases:
  - /2013/08/is-this-list-everything-in-powershell/
---

Soooo.... it's time for me to start looking at updating my various training materials (books, videos, courses, whatnot) for v4.  
I'm going to, with at least some of these, take an all-versions approach. I'll teach what's in v2, then cover what v3 added, then cover v4, etc. It'll be easier to maintain over the upcoming years.  
For right now, I'm trying to assemble an organized topic list of "everything" the shell does. Now, I need to wrap that in an important caveat: I'm aiming at _admins_. Not developers. I'm not saying devs aren't a great audience, but for this project I need to constrain my scope to just the admin audience. I'm also focused mainly on what the shell does _natively, _with only a few diversions into external or underlying technologies. Those are fixed caveats for this project - no exceptions.  
Right now I"m kind of chunking the list into what I feel can be taught (by me) in 20-30 minutes, or a book chapter, or something like that. This isn't necessarily how the material will be presented - this is just me organizing my thoughts so as to not miss important stuff.  
So, given the list below, what do you feel is missing?  
(Numbers are major topics; letters are basically my mental notes about what the topic might include that I might otherwise forget; like I said, this isn't meant to be a real book outline - it's just a topic list)  
PowerShell Core  
1. Series Introduction and Lab Setup  
2. Windows PowerShell Introduction and Requirements  
3. Finding and Discovering Commands  
a. Importing modules and snapins  
4. Interpreting Command Help  
5. Running Commands  
6. Running External Commands: Tips and Tricks  
a. $Lastexitcode  
7. Working with PSProviders and PSDrives  
8. Variables, Strings, Hashtables, and Core Operators  
a. Double quote tricks, subexpressions  
b. Here-strings  
c. Escapes  
d. Variable types  
e. Arrays  
f. Math operators  
9. Regular Expression Basics  
a. Basic regex language  
b. "“Match  
c. Select-String  
10. Learning the Pipeline: Exporting and Converting Data  
11. Understanding Objects in PowerShell  
12. Core Commands: Selecting, Sorting, Meauring, and More  
13. How the PowerShell Pipeline Works  
14. Formatting Command Output  
15. Comparison Operators and Filtering  
16. Advanced Operators  
17. Setting Default Values for Command Parameters  
18. Enumerating Objects in the Pipeline  
a. Working with object methods  
19. Advanced Date and String Manipulation  
20. Soup to Nuts: Completing a New Task  
PowerShell Remoting  
21. PowerShell Remoting Basics  
22. Persistent Remoting: PSSessions  
23. Implicit Remoting: Using Commands on Another Computer  
24. Advanced Remoting: Passing Data and Working with Output  
25. Advanced Remoting: Crossing Domain Boundaries  
26. Advanced Remoting: Custom Session Configurations  
27. Web Remoting: PowerShell Web Access  
WMI and CIM  
28. WMI and CIM: WMI, Docs, and the Repository  
29. WMI and CIM: Using WMI to Commands Query Data  
30. WMI and CIM: Using CIM Commands to Query Data  
31. WMI and CIM: Filtering and WMI Query Language  
32. WMI and CIM: Associations  
33. WMI and CIM: Working with CIM Sessions  
34. WMI and CIM: Executing Instance Methods  
Jobs  
35. Background Job Basics: Local, WMI, and Remoting Jobs  
36. Scheduled Background Jobs  
Scripting in PowerShell  
37. PowerShell Script Security  
38. Prompting for Input, Producing Output  
39. Creating Basic Parameterized Scripts  
40. PowerShell Scripting: Logical Constructs  
41. PowerShell Scripting: Looping Constructs  
a. Break and Continue  
42. PowerShell Scripting: Basic Functions, Filters, and Pipeline Functions  
43. PowerShell Scripting: Best Practices  
a. Line breaking  
b. Splatting  
c. Formatting  
d. Source Control  
e. Etc.  
44. PowerShell Scripting: From Command to Script to Function to Module  
45. PowerShell Scripting: Scope  
46. PowerShell Scripting: Combining Data from Multiple Sources  
a. Ordered hashtables  
Advanced Functions ("Script Cmdlets")  
47. Advanced Functions: Adding Help  
48. Advanced Functions: Parameter Attributes  
49. Advanced Functions: Pipeline Input  
50. Advanced Functions: Parameter Sets  
Advanced Scripting Techniques  
51. Creating Private Utility Functions and Preference Variables  
52. Adding Error Capturing and Handling to a Function  
53. Advanced Error Handling  
a. Variety of error capturing options  
b. Catching multiple exceptions  
c. Etc.  
54. Error Handling the Old Way: Trap  
55. Debugging Techniques  
56. Creating Custom Formatting Views  
57. Creating Custom Type Extensions  
58. Working with SQL Server (and other) Databases  
59. Working with XML Data Files  
60. Supporting "“WhatIf and "“Confirm in Functions  
61. Troubleshooting and Tracing the Pipeline  
62. Using Object Hierarchies for Complex Output  
63. Creating a Proxy Function  
PowerShell in the Field  
64. From the Field: Enhanced HTML Reporting  
65. From the Field: Trend Analysis Reporting  
66. From the Field: Scraping HTML Pages  
PowerShell Workflow  
67. Introduction to PowerShell Workflow  
Desired State Configuration  
68. Desired State Configuration: The Basics  
69. Desired State Configuration: Configuration Scripts  
70. Desired State Configuration: Writing Resources  
71. Globalizing a Function or Script  
72. Discovering and Using COM Objects  
73. Discovering and Using .NET Classes and Instances  
Writing Scripts for Other People  
74. Controller Scripts: Automating Business Processes  
75. Controller Scripts: A Menu of Tools  
76. Creating a GUI Tool: The GUI  
77. Creating a GUI Tool: The Code  
78. Creating a GUI Tool: The Output  
79. Creating a GUI Tool: Using Data Tables  
Advanced Core Techniques, Tricks, and Tips  
80. Using Type Accelerators  
a. [ADSI]  
b. [XML]  
c. [VOID]  
d. where they"™re documented  
81. The Big Gotchas in PowerShell  
a. (from the ebook list)  
82. Fun with Profiles  
a. Profiles and hosts  
b. Prompt  
c. Colors  
d. Get a credential  
83. Random Tips and Tricks  
a. Redirection changing pipelines  
b. $$  
c. $?  
d. Dot sourcing
