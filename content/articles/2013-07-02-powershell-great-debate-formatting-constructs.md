---
title: "PowerShell Great Debate: Formatting Constructs"
authors:
  - Don Jones
date: "2013-07-02T15:23:43+00:00"
aliases:
  - /2013/07/powershell-great-debate-formatting-constructs/
---

Here's an easy, low-stakes debate: How do you like to format your scripting constructs? And, more importantly, _why_ do you like your method?  
For example, I tend to do this:


`If ($this -eq $that) {
 # do this
} else {
 # do this
}
`I do so out of long habit with C-like syntax, and because when I'm teaching this helps me keep more information on the screen. However, some folks prefer this:


`if ($this -eq $that)
{
  # do this
}
else
{
  # do this
}
`Because of my own long habits, I find that hard to read, but it does make it easier to see if your squigglies are lining up properly. It takes up a ton of room, though, and I personally don't follow this as easily as the previous example.  
But what's your preference? _Why? _  
[boilerplate greatdebate]
