---
title: Multithreading using jobs
authors:
  - Jonas Sommer Nielsen
date: "2015-08-20T10:23:48+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/08/multithreading-using-jobs/
---

Often I have had to check something against all servers or clients. A classic problem and every time I run into the it it's time consuming and running the job multithreaded would be nice.

A few years back I found a nice little script for multithreading which I have been using quite often. Unfortunately this wasn't a module. And I can't remember where it came from. So this week I set my mind on recreating this as a module and to see if I can publish it on [PowerShell Gallery][1].

## **Version control 101**

I recently watched the [crash course][2] Warren did on youtube a month back and I started out creating a repository for the project.

[github.com/mrhvid/Start-MultiThread][3]

I will let the video explain the concept. But I already feel more productive and safe while coding. Only thing left is to get in a process where I commit often or at least when it makes sense.

## **Idea**

The original version was just a function I found on google somewhere. It worked fine but it wasn't too handy to load up each time. And the input for the function was for two files, a script and a text file with a list of ComputerNames.

It would be nice if I could just call it with a list of computer names from whereever. e.g. Get-ADComputer, (Computer1, Computer2, localhost) or (Get-content servers.txt).b

And for quick oneliners if I need something simple it would be nice to be able to just write the script and not have to save a .ps1 file with the command.

**Pseudo code**:


`Multi-Thread -Script { Test-Connection } -Computers [list of computers]
`## Execution

First off I needed to figure out a good name.

Get-Verb lists 98 verbs on my machine. Sadly "multi" is not one of them. After som consideration I chose **"Start"** as a good verb, and **"multithread"** as the noun.


`Start-MultiThread
`Sounds fair so I created a new folder with this name and a Start-MultiThread.psm1 file for the module.

[![Snip](https://powershell.org/wp-content/uploads/2015/08/Snippit.png)](https://powershell.org/wp-content/uploads/2015/08/Snippit.png)

A snippet for a full advanced function is always a good starting point. I added this to my version control and things are looking good so far.

[https://github.com/mrhvid/Start-Multithread/...][4] (first upload)

It already looks way more organized than what I usually come up with.

### Coding

Tuesday afternoon I put on my headphones, started banging away on my keyboard and the result was this code


`function Start-Multithread
{
    [CmdletBinding(DefaultParameterSetName='Parameter Set 1',
                  SupportsShouldProcess=$true,
                  PositionalBinding=$false,
                  HelpUri = 'https://github.com/mrhvid/Start-MultiThread/',
                  ConfirmImpact='Medium')]
    [Alias()]
    [OutputType([String])]
    Param
    (
        # Command or script to run. Must take ComputerName as argument to make sense.
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        $Script,
        # List of computers to run script against
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=1)]
        [String[]]
        $Computers,
        # Maximum concurrent threads to start
        [Parameter(Mandatory=$false,
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=2)]
        [int]
        $MaxThreads = 20 ,
        # Number of sec to wait after last thred is started.
        [Parameter(Mandatory=$false,
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=3)]
        [int]
        $MaxWaitTime = 600,
        # Number of Milliseconds to wait if MaxThreads is reached
        [Parameter(Mandatory=$false,
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=4)]
        $SleepTime = 500
    )
    Begin
    {
    }
    Process
    {
        if ($pscmdlet.ShouldProcess('Target', 'Operation'))
        {
            $i = 0
            $Jobs = @()
            Foreach($Computer in $Computers) {
                # Wait for running jobs to finnish if MaxThreads is reached
                While((Get-Job -State Running).count -gt $MaxThreads) {
                    Write-Progress -Id 1 -Activity 'Waiting for existing jobs to complete' -Status "$($(Get-job -State Running).count) jobs running" -PercentComplete ($i / $Computers.Count * 100)
                    Start-Sleep -Milliseconds $SleepTime
                }
                # Start new jobs
                $i++
                $Jobs += Start-Job -ScriptBlock $Script -ArgumentList $Computer -Name $Computer -OutVariable LastJob
                Write-Progress -Id 1 -Activity 'Starting jobs' -Status "$($(Get-job -State Running).count) jobs running" -PercentComplete ($i / $Computers.Count * 100)
            }
            # All jobs have now been started
            # Wait for jobs to finish
            While((Get-Job -State Running).count -gt 0) {
                $JobsStillRunning = ''
                foreach($RunningJob in (Get-Job -State Running)) {
                    $JobsStillRunning += $RunningJob.Name
                }
                Write-Progress -Id 1 -Activity 'Waiting for jobs to finish' -Status "$JobsStillRunning"  -PercentComplete (($Computers.Count - (Get-Job -State Running).Count) / $Computers.Count * 100)
                Start-Sleep -Milliseconds $SleepTime
            }
            # Output
            Get-job | Receive-Job
            # Cleanup
            Get-job | Remove-Job
        }
    }
    End
    {
    }
}
`This is by no means final code. (I already made small changes check [GitHub][5] for latest code). But the outline started to look good.

The Foreach just runs through the list of computers supplied and for each one starts a new job with the script code and the ComputerName as argument.  

To make sure the throttle limit is kept I have a small While loop that checks the number of running jobs and just sleeps until it falls under $MaxThreads limit.

When all jobs are started it's just a matter of waiting for all jobs to finish. (It would be wise to add a timer here and kill hanging jobs after some time)

And lastly I just output all the results.

### Testing

 [![2015-08-19 (6)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-6.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-6.png)

 This looks great but unfortunately it fails to receive the computername.

[![2015-08-19 (7)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-7.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-7.png)

It does run the code once for each computer but it asks for a computername each time which kind of defeats the point.

Good thing we have google and good ol' [Don][6].

[![2015-08-19 (8)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-8.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-8.png)

Adding a parameter() block to the script makes it work.

Clearly there's still a lot to be done here.

### Publishing

But creating modules is only really fun if you can share them with others. And this is where I'm beginning to love PowerShell v5. It turns out it's quite simpel to do this.

[PowerShellGallery.com][7] describes this. After signing up it's a one-liner.


`PS> Publish-Module -Name  -NuGetApiKey
`You need to create a manifest for your module first.

Now I have my module published and it has it's own page on the internet WUUHU

[www.powershellgallery.com/packages/Start-Multithread][8]

Cool as that might seem the really cool stuff comes next.

### Installing on a new machine

This requires WMF 5 or newer. Aka. Windows 10 works out of the box. Try it out from your elevated powershell promt.

![2015-08-19 (9)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-9.png) 

The module is available from the standard PSGallery repository. And installing it on your machine is as simpel as piping this to Install-Module

[![2015-08-19 (10)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-10.png)](https://powershell.org/wp-content/uploads/2015/08/2015-08-19-10.png)

Now you can try out the module on your own machine. Promission to be impressed. 

## Help make it better

This module is not flawless so if you have any ideas feel free to get on your [GitHub][5] and submit changes 🙂

My idea is to keep it simple and try to follow some good practices e.g. as described in [Learn PowerShell Toolmaking in a Month of Lunches][9].





#### Contact me

Twitter [@mrhvid][10]  
Web [Jonas.SommerNielsen.dk][11]

 [1]: https://www.powershellgallery.com/
 [2]: https://www.youtube.com/watch?v=wmPfDbsPeZY
 [3]: https://github.com/mrhvid/Start-MultiThread
 [4]: https://github.com/mrhvid/Start-Multithread/commit/9355446aae85c9f23abe07481edc3ec84d487fe4
 [5]: https://github.com/mrhvid/Start-Multithread
 [6]: https://powershell.org/forums/topic/passing-parameter-to-start-job/
 [7]: https://www.powershellgallery.com/packages/upload
 [8]: https://www.powershellgallery.com/packages/Start-Multithread/
 [9]: http://www.manning.com/jones4/
 [10]: https://twitter.com/mrhvid
 [11]: http://Jonas.SommerNielsen.dk
