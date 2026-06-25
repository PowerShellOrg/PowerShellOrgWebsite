---
title: "PowerShell Great Debate: Backticks"
authors:
  - Don Jones
date: "2013-07-10T21:26:50+00:00"
aliases:
  - /2013/07/powershell-great-debate-backticks/
---

Here's an age-old debate that we can finally, perhaps, put an end to: The backtick character for line continuation.  
The basic concept looks like this:


`Get-WmiObject -Class Win32_BIOS `
              -ComputerName whatever `
              -Filter "something='else'"
`This trick relies on the fact that the backtick (grave accent) is PowerShell's escape character. In this case, it's escaping the carriage return, turning it from a logical end-of-line marker into a literal carriage return. It makes commands with a lot of parameters easier to read, since you can line up the parameters as I've done.  
My personal beefs with this:

  * 
The character is visually hard to distinguish. On-screen, it's just a couple of pixels; in a book, it looks like stray ink or toner.

  * If you put any whitespace after the backtick, it escapes _that_ character instead of the carriage return, and everything breaks.
  * On some non-US keyboards, it's a difficult character to get to.

In  many cases, you can achieve nice formatting without the back tick.


`Do-Something -Parameter this |
  Get-Something -Parameter those -Parm these |
  Something-Else -This that -Foo bar
`This is because a carriage return after a pipe, semicolon, or comma is always interpreted as a visual thing, and not as a logical end of line. Of course, some argue that you can make that command prettier by using the back tick:


`Do-Something -Param this `
| Something-Else -this that -foo bar `
| Invoke-Those -these those
`Here, the pipes line up on the front, making the command into a kind of visual block - but you have to rely on the backticks. You could then argue that a combination of splatting and careful formatting could be nicer, without the backticks:


`$do_something     = @{parameter = $this;
                      foo       = $bar}
$invoke_something = @{param     = $these;
                      param     = $those}
Do-Something     @do_something     |
Invoke-Something @invoke_something |
Something-Else
`Visually blocked-out, but no back ticks.  
And the debate rages on. Your thoughts? Pros? Cons? _Why?_  

[boilerplate greatdebate]
