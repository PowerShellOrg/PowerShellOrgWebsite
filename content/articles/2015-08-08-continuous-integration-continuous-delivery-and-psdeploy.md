---
title: Continuous Integration, Continuous Delivery, and PSDeploy
authors:
  - pscookiemonster
date: "2015-08-08T15:16:01+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
aliases:
  - /2015/08/continuous-integration-continuous-delivery-and-psdeploy/
---

Are you starting to use version control at work? Are you being pestered by fellow PowerShell aficionados to start learning version control? Did you catch the PowerShell.org [Crash Course in Version Control](https://powershell.org/event/techsession-a-crash-course-in-version-control-and-git/) and pick up some Git and GitHub experience? Shameless plug, sorry : )


  Version control is just the start. What if we want to automate testing? To deploy our files, folders, and other artifacts out to production or other environments? Version control alone offers some nice benefits, but without these extra steps, it might introduce some pain points!


  Developers have a bit of a head start on some of the interesting ideas and tools that streamline these processes. These will be increasingly important as IT professionals start to rely on version control. Let's take a quick look at a few key concepts.


## Continuous Integration


  Let's pretend we have a PowerShell project called ProjectX.


  Traditionally, we might check this out of version control, work on it for days on end, and integrate it back into version control once we were done with some major component, or at some arbitrary interval (check in once a day!).


  With [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) (CI), we focus on making many small changes, integrating into version control often, rather than only after completing a major task, or at some pointless interval.


  CI is often associated with running automated unit and integration tests, perhaps with [Pester](https://www.youtube.com/watch?v=SftZCXG0KPA).


  You can get practical experience with this at home - set up a PowerShell project in GitHub, add some Pester tests, and sign up for AppVeyor - If you need some pointers, hit [the walk through here](http://ramblingcookiemonster.github.io/GitHub-Pester-AppVeyor/).


  So! What does this look like? I make a change, commit to version control, tests automatically run, validate that I didn't break anything, and [update my view from version control](http://ramblingcookiemonster.github.io/GitHub-For-PowerShell-Projects/#continuous-integration) to let me know the build is passing.


## Continuous Deployment


  Okay! We have our files in version control, and maybe we set up some automatic tests to run when we make a change. There's still a small problem. Will you remember to update the files where they actually live? Will you update those files outside of source control because this process is a pain? Continuous deployment (CD) can help with this.


  For our purposes, the idea is that you can set up a series of validations, and if everything passes, you deploy to production.


  While you can certainly involve [more gates](https://en.wikipedia.org/wiki/Continuous_delivery#Principles), you might have CI/CD pipeline that works as follows:


  * You make a change
  * You commit to source control
  * Automated tests run
  * If the automated tests pass, the deployment runs


  So, now you don't need to worry about keeping production and other environments in sync with source control - this can all happen automatically!


  We left out an important bit. What exactly happens with a deployment?


## PSDeploy


  We use [Jenkins](https://powershell.org/2015/06/04/automating-with-jenkins-and-powershell-on-windows/) at work. What if we move to TeamCity? or Bamboo? Or some other solution? [PSDeploy](http://ramblingcookiemonster.github.io/PSDeploy/) is a quick and dirty module to help deployments on your preferred CI/CD platform.


  Long story short, you have a deployment config file in each project. This spells out what you want to deploy (perhaps files or folders) and where to deploy them. You invoke PSDeploy, and it runs these deployments.


  A few quick examples:


  * We have a PowerShell module in version control.  Deployments.yml tells PSDeploy to copy the module to a network share, and a few servers.  Now, any time I commit a change to this module, Jenkins runs some Pester tests, and if they succeed, PSDeploy copies the module out. No extra work for me!
  * We have a repository that stores a variety of config files.  Deployments.yml tells PSDeploy to copy these config files out to the various shares and servers that need them.  John Doe, who struggled a bit with version control (imagine forcing them to use Jenkins!) pushes a commit, a few Pester tests run, and we deploy the config files out as needed.
  * We have an _everything but the kitchen sink_ repository, containing scheduled task scripts, PowerShell session configuration scripts, and other files. Same deal. Commit to source control, tests run, these files are delivered to their homes.


  All I need to do in these cases is pick out what to deploy and where to deploy it to; PSDeploy does the rest. I can use the exact same build script for each of these projects, invoking PSDeploy against the deployments.yml.


  What does this look like in practice? Here's a quick illustration:


  [![PSDeployFlowSmall](https://powershell.org/wp-content/uploads/2015/08/PSDeployFlowSmall.png)](https://powershell.org/wp-content/uploads/2015/08/PSDeployFlow.png)


  There are certainly product-specific ways to do this, but if PSDeploy sounds interesting, you can [read more here](http://ramblingcookiemonster.github.io/PSDeploy/).


## Next Steps


  That's about it! If you plan to start using version control, take a look at the concepts and tools that can make your life easier.


  [GitHub, Pester, and AppVeyor](http://ramblingcookiemonster.github.io/GitHub-Pester-AppVeyor/) are a great free way to get started, but be sure to check out [Dave Wyatt's TechSession on TeamCity and the Build.PowerShell.org](https://powershell.org/event/techsession-discovering-teamcity-and-build-powershell-org/), which will cover a handy new service enabling free continuous integration and delivery for community PowerShell projects.


  Lastly, I can't help but mention Steven Murawski's great post [on joining the open source community](http://stevenmurawski.com/powershell/2015/8/moving-in-to-open-source). This is a great way to learn, to get involved, and to help others - skim through his post, and definitely consider it!
