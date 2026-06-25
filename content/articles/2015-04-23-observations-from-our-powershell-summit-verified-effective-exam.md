---
title: Observations from our PowerShell Summit VERIFIED EFFECTIVE Exam
authors:
  - Don Jones
date: "2015-04-23T14:24:29+00:00"
categories:
  - PowerShell Summit
aliases:
  - /2015/04/observations-from-our-powershell-summit-verified-effective-exam/
---

We offered our first in-person, proctored VERIFIED EFFECTIVE exam at PowerShell Summit in April 2015, located in Charlotte, NC. While the exam is not intended as a diagnostic or learning tool, there are definitely some observations I can share from glancing through some of the submissions so far.  
First, the exam isn't easy. 31 people signed up to take it (our room capacity; more would have if we'd had space), and only 12 turned in submissions. Of those, fewer than 5 are probably going to pass by the end of the grading process.

  * If you don't know what **[CmdletBinding(SupportsShouldProcess=$True)]** does, then you shouldn't be using it. It should never be used in a cmdlet that merely queries information and doesn't make changes to the system. It isn't boilerplate that should be included in every function, and it has nothing to do with the PROCESS script block.
  * If you don't understand **ValueFromPipeline** and **ValueFromPipelineByPropertyName, **then you need to learn.
  * If you're using aliases like **%** in a function, you're not creating a readable, maintainable script. Avoid aliases, especially ones that don't immediately communicate the task being completed. **Dir** might be acceptable; **?** not so much.
  * If you're not neatly indenting your constructs, your script is not going to be readable.
  * Creating a parameter that accepts a limited set of values (say, "foo" and "bar") doesn't create internal variables with those names (e.g., $foo and $bar). Don't confuse parameter names with their values.

In the end analysis, there's a difference between being able to hack out a working script, and being able to create a professional, maintainable tool that complies with PowerShell's native practices and patterns. If you're to the point where you're able to hack out a working script, take a next step by reading something like _The Community Book of PowerShell Practices_ (available for free), or solidify your skills and understanding through a book like (gratuitous plug) _Learn PowerShell Toolmaking in a Month of Lunches. _  
Most of the non-passing submissions we're seeing have simple mistakes - for example, including a static computer name in a verbose message, rather than inserting the name of the currently-processing computer. Or creating a CIMSession, but then not using it (forcing a later command to spin up a second session). In other instances, we saw poor practices (like globally and unnecessarily setting $ErrorActionPreference, suggesting a lack of understanding about the more specific -ErrorAction). There was also a few instances where a lack of attention to details - or perhaps simply running out of time - was a problem, such as failing to define a needed parameter, or defining a ValidateSet() with incorrect values.  
We're going to be removing one of our VERIFIED EFFECTIVE exam scenarios from production use, and turning that into an "example scenario" that you can use to self-assess your toolmaking skills. Look for that in the next few weeks. We'll continue offering in-person proctored exams at PowerShell Summit, with Europe 2015 in Stockholm being our next go. In 2016, look for us to expand the program with more capacity (so more people can sit the exam), and for us to eventually offer a DSC-related exam.  
In the meantime, anyone with a VERIFIED EFFECTIVE certificate has indeed completed a challenging, practical exam that shows they are definitely _effective_ toolmakers, capable of building professional-grade tools that are consistent with PowerShell's native use patterns. Thus far, fewer than 20 certificates have been earned.
