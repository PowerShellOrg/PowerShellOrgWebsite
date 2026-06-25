---
title: Unit Testing is “Pestering” the Hell Out Of Me
authors:
  - Missy Januszko
date: "2016-09-02T17:31:14+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/09/unit-testing-is-pestering-the-hell-out-of-me/
---

About a week or two before Devops Camp, the attendees were asked how much experience they had using Pester, because another attendee was preparing a discussion on Pester and wanted to gauge the other attendees’ comfort level. Learning Pester had been on my to-do list for a while, but I had procrastinated on it for far longer than I intended. I answered “Beginner” - although “complete and utter newbie” would have been more accurate - and I vowed to spend some quality time looking at Pester before arriving at camp.  
There are some really great resources out there devoted to Pester, from beginner to intermediate to way-over-my-head. I read articles and watched videos. And I understood, in a conceptual kind of way, how to use Pester. Describe, Context, It, Mock, Assert-MockCalled – I understood what these things were used for. The examples made sense. I was ready to move on to trying it myself. But here is where I stumbled and recovered, and I would like your feedback and opinions on my discoveries.  
I took a piece of code I was currently working on and decided that a small function in that code was the perfect function to attempt my first unit test on. I mean, it was the tiniest little function - 7 lines of code! What could possibly be easier? Right?  
Boy, was I wrong. The struggle IS real.  
In a nutshell, my function really is 7 lines – an If/Else statement and a For-loop – and inside each is an external call to an Active Directory cmdlet. Those would definitely need to be mocked. After all, we know or assume that Set-ADAccountControl and Set-ADObject do what they are supposed to. I was stumped at where to even start because after mocking these external calls – there isn’t actually anything left to the code!  
Even after a wise person told me that “This probably isn’t a great example of a “Pester 101” example”, I was still determined to figure out how to write a Pester test to test this function, but I needed to set aside my thoughts of “I can’t figure out how to write a Pester test for this” and instead, start with “Figure out how to write a unit test for this.” My brain freeze wasn’t about Pester – it was about unit testing. What do I need to test? My next step was to do some reading up on general unit testing concepts.  
I’m not opposed to buying a book on testing concepts, but I wanted some quick answers and not a research project just to get me started. I turned to “Dr. Google” and I found some useful definitions, both formal and informal, on what unit testing really is. But it wasn’t until I found a comment buried deep in a StackExchange forum post that I realized what my next steps were.  

**Red-Green-Refactor-Repeat**  
**Red:** Write a test that fails.  
**Green:** Write the simplest code that makes the test pass. For the first pass, don’t handle edge cases, just enough to make the test pass.  
**Refactor:** Clean up the code and optimize if necessary. Make sure the test still passes.  
**Repeat:** Now think about handling those edge cases and repeat the previous steps with tests, then code, to handle them.  
The entire thread can be found here and the detailed explanation of the Red-Green-Refactor-Repeat concept in the comments is definitely worth a read:  
<http://programmers.stackexchange.com/questions/750/what-should-you-test-with-unit-tests>  

When I started thinking about writing this article, I knew that I was struggling with the concept of unit testing and I had planned to include the code that I was looking to test as part of the blog. After doing the reading to try to wrap my brain around the concepts, I changed my approach. I’ve decided to scrap the original version of this code and try to use the above approach to re-develop the function instead. I plan to blog about my journey through this process in a future post.  
Until then, I’d like to initiate a dialog with you, the readers: How do you approach unit testing? What is your thought process? What do you feel is important or not important to include in a unit test?
