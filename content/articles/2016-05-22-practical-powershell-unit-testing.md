---
title: Practical PowerShell Unit-Testing
authors:
  - msorens
date: "2016-05-22T20:44:14+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2016/05/practical-powershell-unit-testing/
---

By the time you are using PowerShell to automate an increasing amount of your system administration, database maintenance, or application-lifecycle work, you will likely come to the realization that PowerShell is indeed a first-class programming language and, as such, you need to treat it as such. That is, you need to do development in PowerShell just as you would with other languages, and in particular to increase robustness and decrease maintenance cost with **unit tests** and--dare I say--**test-driven development** (TDD). I put together several articles on getting started with unit tests and TDD in PowerShell using [Pester][1], the leading test framework for PowerShell. This series introduces you to Pester and provides what I like to call "tips from the trenches" on using it most effectively, along with a gentle prodding towards a TDD style.  
Part 1: [Getting Started with the Pester Framework][2]  
Starting with the ubiquitous "Hello, World", this introduces Pester, showing how to execute tests, how to start writing tests, and the anatomy of a test.  
Part 2: [Mock Objects and Parameterized Test Cases][3]  
To be able to create true unit tests, you need to be able to isolate your functions and modules to be able to focus on the component under test; mocks provide great support for doing that. Another topic of "power" unit tests is making them parameterizable, i.e. being able to run several scenarios through a single test simply by providing different inputs.  
Part 3: [Validating Data and Call History][4]  
The final part of this series provides a "how-to" for several other key parts of Pester: how to validate data, how to determine if something was called appropriately, and how to address a particular challenge with Pester, validating arrays. I've included a library for array validation to supplement Pester.  
For a more general treatment of unit tests, I refer you to Roy Osherove's canonical text on the subject, [The Art of Unit Testing][5].  
![... you wanted to know about Unit Testing in .NET | Coding in .NET](https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcoding-in.net%2Fblog%2Fwp-content%2Fuploads%2FArtOf%C2%B5UnitTesting.jpg&f=1)

 [1]: https://github.com/pester/Pester
 [2]: http://www.simple-talk.com/sysadmin/powershell/practical-powershell-unit-testing-getting-started/
 [3]: http://www.simple-talk.com/sysadmin/powershell/practical-powershell-unit-testing-mock-objects/
 [4]: http://www.simple-talk.com/sysadmin/powershell/practical-powershell-unit-testing-checking-program-flow/
 [5]: http://artofunittesting.com/
