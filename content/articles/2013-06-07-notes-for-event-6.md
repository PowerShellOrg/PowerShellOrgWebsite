---
title: Notes for Event 6
authors:
  - Art Beane
date: "2013-06-07T13:26:41+00:00"
aliases:
  - /2013/06/notes-for-event-6/
---

When I read the instructions for event 6, I thought that here's a tough one. A lot of competitors won't have access to a test environment with Windows Server 2012 and Virtual Machines that they can actually work with. So, I expected that many of the entries wouldn't get tested and intended to forgive minor errors that would have shown up in testing.  
Well, there was one thing that really surprised me. The instructions were quite clear about minimizing "Are You Sure" queries to the user, but you can count on one hand the number of entries that included _-Confirm:$false_. This is just an example of why it's so important to read the problem statement very carefully and extract the solution requirements. Then, after creating the solution, go back and verify that the requirements have all been met. Many of the entries called out this requirement in the comments, but then didn't account for it in the script.  
I had mentioned in a previous blog entry that, particularly in the advanced entries, the author was working too hard. Sometimes this means putting more emphasis on "completeness" than in solving the problem. Here's an example of a wasted effort. A few entries used the _[ValidateNotNullOrEmpty()]_ test for a possible alternate to the default value for "Server".  Because there is a default value for the parameter, it won't be null or empty making this test unnecessary. Here, give this a try:


`function Test-NullOrEmpty { [CmdletBinding()] Param ( [ValidateNotNullOrEmpty()] $Name = "Server" ) "Got $Name" } Test-NullOrEmpty
`Note that calling the function without a named parameter just assigns the default value. In order to make it fail you have to deliberately call the function with an empty value (_Test-NullOrEmpty -Name_), which is not going to happen in the real world.  
I know that these are just nit-picking -- and if these are examples of the nits in the Event 6 entries, then CONGRATULATIONS!! y'all did a mighty fine job of solving the problem. Calling out these issues is just intended as a learning opportunity. There are lots and lots of correct ways to write PowerShell solutions, it's just that some are more efficient or take less typing than others. And learning about them is one of the important results of participating in the games.  
Thanks to all of you for your efforts!
