---
title: "PowerShell Great Debate: Capturing Errors"
authors:
  - Don Jones
date: "2013-06-17T14:30:30+00:00"
aliases:
  - /2013/06/powershell-great-debate-capturing-errors/
---

Hot on the heels of [our last Great Debate][1], let's take the discussion to the next logical step and talk about how you like to capture errors when they occur.  
The first technique is to use -ErrorVariable:


`Try {
  Get-WmiObject Win32_BIOS -comp nothing -ea stop -ev mine
} Catch {
  # use $mine for error
}
`Another is to use the $Error collection:


`Try {
  Get-WmiObject Win32_BIOS -comp badname -ea stop
} Catch {
  # use $error[0]
}
`And a third is to use $_:


`Try {
  Get-WmiObject Win32_BIOS -comp snoopy -ea stop
} Catch {
  # use $_
}
`Personally, I've always disliked the last approach, because people don't realize that in some situations $_ can get "hijacked." For example:


`Get-Content names.txt |
ForEach-Object {
  Try {
    Get-WmiObject Win32_BIOS -Comp $_ -EA Stop
  } Catch {
    # is $_ an error or a computer name?
  }
}
`Now, I'm a big not-fan of using pipelines like this in a script, but that's another debate (it's on my list). The point is really that I can't universally, 100% rely on $_... and when someone uses $_ without realizing what's happening, they back themselves into a tricky corner that's difficult to diagnose. Since my big focus is on learning and teaching, I tend to want to teach techniques that are universal and always work the same way.  
That said, $error[0] and the -ErrorVariable (-EV) technique return slightly different objects, meaning you have to work with them somewhat differently.  
So what's your preference? Why? Which of these don't you like so much... and why?  
[boilerplate greatdebate]

 [1]: https://powershell.org/2013/06/11/powershell-great-debate-error-trapping/ "PowerShell Great Debate: Error Trapping"
