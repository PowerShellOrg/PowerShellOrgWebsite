---
title: Command and query separation in Pester tests
authors:
  - nohwnd
date: "2015-10-18T19:15:14+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
aliases:
  - /2015/10/command-and-query-separation-in-pester-tests/
---

Do you feel that writing tests is confusing, and you often end up with complicated test code? I did too, before I learned about Command-query separation principle (or CQS). This principle lead me to start thinking about data flow directions in tests and in the end I realized there are few basic patterns that I use in my test code over and over.

## Command-query separation principle

The command and query separation principle tells us that we should separate commands from queries (duh!). To do that, we first need to learn the difference between a command and query: A command is a function that has an observable side-effect and returns no result. A query is the opposite. A function that has no observable-side effect, and returns a result.  
https://gist.github.com/nohwnd/fb5616fb92995555480c  
The call to _Set-Variable_ has a side effect of creating a variable named "a" and setting it to value "1". This side effect is clearly observable, because we had no variable _$a_ before the call and now we have one, so _Set-Variable_ must be a command. Also the _Set-Variable_ does not return any output which should be another clue (unless you provide the _-PassThru_ parameter, more on that later).  
The other call, the call to _Get-Variable_, has no observable side effect. You could call it once or 100 times and that would have no effect on the value of the _$a_ variable. Plus the Get-Variable returns a result so it must be a query.  
PowerShell also gives us another clue whether a function is a command or query with the Verb used for that function. Anything with Set, Add and New verb is supposed to be a command. Anything with Get verb should be a query.  
Understanding the difference between commands and queries is important, because data flows through them in opposite directions, and so you need to test them differently.

### Data flow in commands and queries 

Let's see some (almost) real-life examples of tests that deal with commands and queries, identify the data flow in them, and try to discover some patterns.  
https://gist.github.com/nohwnd/f6be402363baa4fb15e7  
In this code the first two functions only act as place-holders for the actual Active Directory cmdlets, feel free to ignore them. The next two functions are more interesting, they are the actual production code that we test - the SUT (System Under Test). Notice that the first function, _New-SalesUser_ is a command, and the second, _Get-SalesUser_ is a query. The most important part are the actual tests, let's have a closer look on each one of them separately.

### Testing New-SalesUser

The _New-SalesUser_ is a command, it won't return any value, but it should have an observable side-effect. The side-effect is that a new user is created in the Sales department. The _New-SalesUser_ is not able to do that by itself, instead it delegates the work to the _New-ADUser_ cmdlet. Because we believe that the _New-ADUser_ will do it's work, all we need to test is if it was invoked with the correct parameters, and that's exactly what's happening.  
As you can hopefully see the data (input parameters) flow from the input of the _New-SalesUser_ (SUT) towards the internal function _New-ADUser_, we then use the _Assert-MockCalled_ to verify that the internal command was called correctly. I call this the command direction.

### Testing Get-SalesUser

The _Get-SalesUser_ is a query. It will return a value and will have no side-effect. We know that the _Get-ADUser_ is a query as well, so the only part that needs testing is whether or not the _FullName_ property was added. To do that we create a mock of the _Get-ADUser_ function that returns an object and set it's _GivenName_ and _Surname_ properties. We run the _Get-SalesUser_ function and check the values of _FullName_ property.  
In this case the data go from the internal function Get-ADUser to the output of the _Get-SalesUser_ (SUT), and we use the Should assertion to check if data was processed correctly. I call this the query direction.

## Command-Query hybrids 

Unfortunately the world of PowerShell is not so black and white as we might like. There are numerous commands that support _-PassThru_ parameter. The _-PassThru_ parameter breaks the clean separation between commands and queries, and so our example function would become a _New-Get-SalesUser_ hybrid.  
Such hybrids are a source of confusion and lot of people end up with code like this:  
https://gist.github.com/nohwnd/86dc22cede6736c2647c  
As you can see both the production code and the tests are simply a merge of the _Get-SalesUser_ and _New-SalesUser_ seen in the previous example. The test no longer tests a single thing. If you take your time and track the flow of the data you should see the both the command and query directions are used, and asserted.  
The test still works, but is unnecessarily complex and can fail for at least two different reasons. It would be way better to have two separate simpler tests. One testing the query path of the command and another testing the command path. Such conversion is easily done, all we need to do is take the _Get-SalesUser_ test and change the command to _New-SalesUser_:  
https://gist.github.com/nohwnd/31df2ef5686f77f1b910  
The tests were split into two and the _-PassThru_ switch was implemented in the _New-SalesUser_ function.  
The first _It_ tests the command part of the function, it does not specify the _-PassThru_ switch and so the _New-SalesUser_ acts as a pure command and is tested like that.  
The second _It_ tests the query part of the function, specifying the _-PassThru_ switch, and hitting the mock, which produces no side-effects, in result it acts as a pure query function, and is also tested like one.

## Are query-command hybrids really that bad?

No not really. Such hybrids have some useful properties that make PowerShell better. Probably the most useful is that they enable you to combine both queries and commands in a single pipeline. The also enable you to immediately retreive result of your changes and for example print them to screen.  
All in all such hybrids are quite useful beasts. The downside unfortunately is that a lot of people unconiously end up with such hybrid, and without seeing the way to split it they start to produce overly-complicated tests. Often copy pasting the code to set up the whole environment, just to assert the result of the "query". Setting up twenty properties on the resulting object just to ignore it while testing the "command". Or worst all of this together.

## Summary

Hopefully this article gave you the minimum to tell commands from queries and outlined possible approaches to testing them. You should now be aware of the command query hybrids and be able to identify them even if they don't specify a _-PassThru_ parameter.  
Happy coding!
