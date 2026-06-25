---
title: Writing and Publishing PowerShell Modules
authors:
  - pscookiemonster
date: "2015-09-06T20:31:29+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
aliases:
  - /2015/09/writing-and-publishing-powershell-modules/
---

Earlier in August [we mentioned](https://powershell.org/2015/08/16/abstraction-and-configuration-data/) that modularity and abstraction are quite helpful. PowerShell modules can help enable these concepts.


  You might ask "Modules... why can't I just write a function?" There are a number of benefits to bundling your functions into modules:




  * Simplify code organization
  * Group related functions together
  * Share state between functions, but not with the user
  * Re-use "helper functions" that you don't want exposed to the user
  * Improve discoverability: 
`Find-Module MyModule`Get-Command -Module MyModule
`* Simplify distribution: 
`Install-Module MyModule
`Where does that last bullet come from?




## The PowerShell Gallery


  If you've worked with Perl, you've probably used [CPAN](https://www.perl.org/about/whitepapers/perl-cpan.html), which archives more than 150,000 modules. Other languages have similar tools, like [PyPI](https://pypi.python.org/pypi) for Python, or [RubyGems](https://rubygems.org/) for Ruby.





  In the PowerShell world we've had a few community alternatives, but nothing official until late 2014, when Microsoft introduced the [PowerShell Gallery](https://www.powershellgallery.com/). The gallery is still under limited preview, with less than 300 modules published.





  The PowerShell community can benefit from the PowerShell Gallery through simplified and centralized discovery and distribution. We can find, install, or publish modules with a single command in PowerShell 5. Perhaps some day we will see a vibrant PowerShell community that extends [beyond IT administration](http://ramblingcookiemonster.github.io/PowerShell-Beyond-Administration/).




## Write and Publish PowerShell Modules


  Let's help build up the PowerShell Gallery. Do you write PowerShell modules at work or at home? Consider [open sourcing](http://stevenmurawski.com/powershell/2015/8/moving-in-to-open-source) them on GitHub, and publishing them in the PowerShell Gallery!





  If you're comfortable writing PowerShell functions, but haven't started writing modules, check out [Building a PowerShell Module](http://ramblingcookiemonster.github.io/Building-A-PowerShell-Module), where we walk through the creation and publication of a PowerShell module.





  Edit: [This follow-up](https://powershell.org/deploying-modules-to-the-powershell-gallery/) shows a simple way to automatically deploy your modules to the gallery.





  Cheers!
