---
title: PowerShell Scheduled Jobs and Tableau analytics
authors:
  - Mike Roberts
date: "2015-09-21T18:43:21+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/09/powershell-scheduled-jobs-and-tableau-analytics/
---

Here’s a brief rundown of how we leverage a few Cmdlets from the PSScheduledJob module to manage our Analytics stack. For those of us on the Analytics team at 
[
Pluralsight
][1]
, PowerShell is the lynch-pin which binds our two worlds together. To manage the gaps inherent in all platforms (since one tool would be hard-pressed to cover all areas), we use PowerShell to link the worlds of Data and Analytics (and back). We do this because of its depth and the ease with which we can automate just about anything.


[![data_stack](https://powershell.org/wp-content/uploads/2015/09/data_stack.png)](https://powershell.org/wp-content/uploads/2015/09/data_stack.png)














All that said, we leverage two Cmdlets extensively: 
_
Register-ScheduledJob 
_
and 
_
New-JobTrigger. 
_
In all, there are: 


- 

90+ jobs 


- 

30+ enabled and scheduled


- 

2 jobs to manage the metadata 


- 

1 Tableau workbook that surfaces this data to our team


**The ‘How does the job perform’ part: **

So, you’ve registered a job which soon becomes about 50 jobs. How do you know if each of them succeeded, how long they took, and whether or not they had errors? What about knowing if one takes 10x longer on one particular day? This is certainly worth investigating and analyzing so that you can react quickly to potential hiccups. The below script will let you do that and is meant to be...wait for it...scheduled.


`$jobs = Get-ScheduledJob
foreach ($job in $jobs) {
  Get-Job -Name $job.Name -Newest 1 | select -Property @{n='Env';e={"$env:computername"}},@{n='Name';e={$job.name}},  @{n='State';e={$_.State}},@{n='DurationInSec';e={($_.PSEndTime -  $_.PSBeginTime).Total  Seconds}},@{n='TimeStart';e={$_.PSBeginTime}},@{n='TimeEnd';e={$_.PSEndTime}},@{n='ErrCnt';e={($_.Error).count}},@{n='Date';e={(Get-Date).ToString('yyyy-MM-dd')}} | Export-Csv -Path 'your path' -Delimiter ";" -NoTypeInformation -Append
}
`**The ‘When do these jobs happen’ part:**

While we didn’t use all the properties in the _Get-ScheduledJob_ cmdlet, we did pull out a few. Mostly, we want duration, error count and start/end times.


It’s one thing to have a few scheduled jobs running, but it becomes a different animal altogether when there are over 90 happening throughout the day (and on multiple machines). In order to both tame the chaos and control the inevitable job failures, it is necessary to know about (1) when they happened and (2) what happens 
_
when 
_
they, well, run.


Again, the basic assumption is that one has some scripts and/or files with code in them. The scheduled jobs, then, make this easier. Here’s a basic example of the ‘when’ regarding the scheduled jobs. We’re exporting a csv so that we can then consume it in 
[
Tableau
][2] 
for analysis and alerting:


`$t = New-JobTrigger -Daily -At "8:00PM" -RandomDelay 00:00:30
Register-ScheduledJob -Name 'Cool Name Here' -ScriptBlock {
$TsJobs = Get-ScheduledJob | select -expand Name
foreach($job in $TsJobs) {
  Get-JobTrigger -Name $job | select @{n='Env';e={"$env:computername"}},@{n='Date';e={(Get-Date).ToString('yyyy-MM-dd')}},@{n='JobName';e={$job}},Frequency,@{n='Time';e={([datetime]($_.At)).ToShortTime  String()}},@{n='DaysOfWeek';e={$_.DaysOfWeek}},Enabled,RepetitionInterval | export-csv 'your path' -delimiter ";" -NoTypeInformation -Append
   }
} -Trigger $t
`For this part, much like above, we use a few properties from the 
_
Get-JobTrigger
_ 
cmdlet for the analysis and trending of our jobs (see image below).




[![schd_job_triggers](https://powershell.org/wp-content/uploads/2015/09/schd_job_triggers.png)](https://powershell.org/wp-content/uploads/2015/09/schd_job_triggers.png)

















**Summary**

I have added a ‘Date’ field to both sections so that we can do some historical analysis with the jobs. What’s also important is whenever we have to update software/change things on the servers, we can use this to identify when, during the day, we might have a window to do this, not to mention what jobs would be affected by it.

With two simple bits, we’re able to get a deeper look into the performance and potential avenues for tuning of our analytics pipeline and the jobs. This type of analysis on the ScheduledJob cmdlets can also be correlated with system performance (eg: logs) and our Analytics infrastructure’s performance and logs. While it’s a unique look at a use case for PowerShell, we find it’s been invaluable at providing the data that might not fit into the domains listed above. In short, it’s a perfect ‘glue’ for each pillar we interact with.


In the image below, we’ve put it all together for the ‘Job Performance’ overview. This allows us to narrow in on the job/jobs that might not be performing up to par (or as they have historically). 


[![data_control_dashboard](https://powershell.org/wp-content/uploads/2015/09/data_control_dashboard.png)](https://powershell.org/wp-content/uploads/2015/09/data_control_dashboard.png)

 [1]: http://www.pluralsight.com/
 [2]: http://www.tableau.com/
