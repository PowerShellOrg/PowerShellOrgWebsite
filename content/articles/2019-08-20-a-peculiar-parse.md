---
title: A Peculiar Parse
authors:
  - Colyn Via
date: "2019-08-20T19:40:17+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Training
aliases:
  - /2019/08/a-peculiar-parse/
---

##   {.wp-block-heading}

One of the best enhancements to Powershell was the inclusion of custom classes in v5. We originally wrote scripts, then we wrote cmdlets, followed by modules, and now we've graduated, with Class.  

I recently decided I wanted to write some code that would build a website. What better way to do that than by creating a class just for me? That's rhetorical by the way. My early class code looked like this:




`class mysite {
  [string]$SiteName = 'mysite'
  [string]$PhysPath = 'c:\mysite'
  [string]$Binding = '*:8000:'
  mysite(){
    Import-Module IISAdministration,WebAdministration
  }
  [void]CreateSite(){
    $newsite = @{
      Name = $this.SiteName
      PhysicalPath = $this.PhysPath
      BindingInformation = $this.Binding
    }
    New-IISSite @newsite
    (Get-IISServerManager).CommitChanges()
  }
}
`With this code I'm able to create my IIS website and see it in IIS Manager. But then I thought it'd be great to add the object representing the new site to my custom class. To do this I'll need to create another property. It's generally a good idea to cast properties as the appropriate object type.  That means adding a new property to the class and loading the appropriate namespaces so the casting would work.  I also updated my method to pass the object representing my website to the new property.


`class mysite {
  [string]$SiteName = 'mysite'
  [string]$PhysPath = 'c:\mysite'
  [string]$Binding = '*:8000:'
  [Microsoft.Web.Administration.Site[]]$SiteObject
  mysite(){
    [void][System.Reflection.Assembly]::LoadWithPartialName(
      'Microsoft.Web.Administration')
    [void][System.Reflection.Assembly]::LoadWithPartialName(
      'Microsoft.Web.Management')
    Import-Module IISAdministration,WebAdministration
  }
  [void]CreateSite(){
    $newsite = @{
      Name = $this.SiteName
      PhysicalPath = $this.PhysPath
      BindingInformation = $this.Binding
    }
    $this.SiteObject += New-IISSite @newsite -Passthru
    (Get-IISServerManager).CommitChanges()
  }
}
`Looks great right?  I was able to create my new site and see it in IIS Manager.  The next day I wanted to try it out again so I deleted my website, loaded my code, and then got hit with a nasty error from the parser.  

![](https://scontent.xx.fbcdn.net/v/wl/t1.15752-0/s480x480/69283328_2866413096703634_4259896023284973568_n.png?_nc_cat=104&_nc_log=1&_nc_oc=AQnsep46eWke901Uzia9GmY3zbuEAnbk9WImb3IVthQegbzYfeL8zjSXiEj6381xEfXtbK1gLIP9kNUgzJ-kXykw&_nc_ht=scontent.xx&oh=95f0b7ade60da2b13897597e64bfdc4f&oe=5DD64557) 


`PS C:\Dev> . .\powershellorg.ps1
At C:\Dev\powershellorg.ps1:5 char:4
+   [Microsoft.Web.Administration.Site[]]$SiteObject
+    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unable to find type [Microsoft.Web.Administration.Site].
    + CategoryInfo          : ParserError: (:) [], ParseException
    + FullyQualifiedErrorId : TypeNotFound
`Turns out, the parser in powershell is reading my code and sees an object type it doesn't know.  That would be my new property with the casting to [Microsoft.Web.Administration.Site].  At this point, the namespace containing the class I'm casting as hasn't been loaded because that code is in the class constructor.  So I figure, no problem!  I'll just load the namespaces before I define my class, score one point for Colyn!


`[void][System.Reflection.Assembly]::LoadWithPartialName(
    'Microsoft.Web.Administration')
[void][System.Reflection.Assembly]::LoadWithPartialName(
    'Microsoft.Web.Management')
class mysite {
  [string]$SiteName = 'mysite'
  [string]$PhysPath = 'c:\mysite'
  [string]$Binding = '*:8000:'
  [Microsoft.Web.Administration.Site[]]$SiteObject
  mysite(){
    Import-Module IISAdministration,WebAdministration
  }
  [void]CreateSite(){
    $newsite = @{
      Name = $this.SiteName
      PhysicalPath = $this.PhysPath
      BindingInformation = $this.Binding
    }
    $this.SiteObject += New-IISSite @newsite -Passthru
    (Get-IISServerManager).CommitChanges()
  }
}
`Or so I thought, as it turns out I still receive the same exception.  Going back to my troubleshooting skills I stepped through my code in the ISE, without exception.  Wait, what?  That's right, there was no exception when I stepped through my code.  Thinking I might have fat fingered my code, or maybe didn't save correctly, I tried again.  Same error.  

Upon further research I discovered that the parsing protocol in powershell doesn't read linearly.  In its early passes over my code it observed I was creating a class and decided to load the class first.  Because the [mysite] class is loading before my reflection calls, the code bombs.  +1 for non linear dynamics.  This is true even when implementing the 'using namespace' capability that launched with v5:


`using namespace Microsoft.Web.Administration;
using namespace Microsoft.Web.Management;
class mysite {
  [string]$SiteName = 'mysite'
  [string]$PhysPath = 'c:\mysite'
  [string]$Binding = '*:8000:'
  [Microsoft.Web.Administration.Site[]]$SiteObject
  mysite(){
    Import-Module IISAdministration,WebAdministration
  }
  [void]CreateSite(){
    $newsite = @{
      Name = $this.SiteName
      PhysicalPath = $this.PhysPath
      BindingInformation = $this.Binding
    }
    $this.SiteObject += New-IISSite @newsite -Passthru
    (Get-IISServerManager).CommitChanges()
  }
}
`I determined two ways around this problem.  The first was to keep the class in a separate file, but create a new .ps1 file that would load the dependent namespaces and then use dot sourcing to load the class file.  I did a quick experiment to test this assumption which gave positive reinforcement for the idea:  

![](https://scontent.xx.fbcdn.net/v/wl/t1.15752-0/s480x480/68576638_490740718161416_4996682901111177216_n.png?_nc_cat=108&_nc_log=1&_nc_oc=AQkZ0I7swgdlk0kzRJoAdY15EGff-nFrtXlSm8-wdGcmEnR3-P_Aa6STzf3v2TiOOReuw2c7x0Q3XWpjIbuLyvAh&_nc_ht=scontent.xx&oh=896b4925e9a6a684a06ba200a974802b&oe=5DD6844A) 

Of course the polymorphism of powershell allows a less cumbersome and equally less exact solution.  I can simply recast the property as a generic object.


`class mysite {
  [string]$SiteName = 'mysite'
  [string]$PhysPath = 'c:\mysite'
  [string]$Binding = '*:8000:'
  [Object[]]$SiteObject
  mysite(){
    [void][System.Reflection.Assembly]::LoadWithPartialName(
      'Microsoft.Web.Administration')
    [void][System.Reflection.Assembly]::LoadWithPartialName(
      'Microsoft.Web.Management')
    Import-Module IISAdministration,WebAdministration
  }
  [void]CreateSite(){
    $newsite = @{
      Name = $this.SiteName
      PhysicalPath = $this.PhysPath
      BindingInformation = $this.Binding
    }
    $this.SiteObject += New-IISSite @newsite -Passthru
    (Get-IISServerManager).CommitChanges()
  }
}
`As with anything in Powershell or coding in general, there's always more than one way to achieve a goal.  The lesson learned in this experience is that custom classes will always be loaded ahead of the rest of your code.  You can work around this by abstracting your classes to a separate file or "library" to ensure your code executes in the order you intend.  If you get a TypeNotFound error from a casting call in your class, you can use the code abstraction method or simply recast to a default but similar type.
