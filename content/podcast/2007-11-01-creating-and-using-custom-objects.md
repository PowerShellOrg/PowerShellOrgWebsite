---
title: Creating and using custom objects
author: Jonathan Walz
authors:
  - Jonathan Walz
date: "2007-11-02T01:43:33+00:00"
aliases:
  - /2007/11/creating-and-using-custom-objects/
---

Listener Mace writes:



I've seen this code:


$values = new-object 'object[,]' 5,2  
Can you expound on that?  
The author fills the array.  
$k = 0  
foreach ($j in $exchangeserverlist)  
{  
$perf = New-Object System.Diagnostics.PerformanceCounter($perfobj1,  
$counter1, $instance1, $j.Name)  
$values[$k,0] = $j.Name  
$values[$k,1] = $perf.RawValue  
$k = $k + 1  
}  
Now, how do you sort the array based on the performance data in the second  
column?  
I'm guessing there's a more "powershell" was of doing what's needed rather  
than resorting to arrays. E.g.,  
$p = get-process  
$p | sort-object ws  
How would you create a collection of custom objects. Each custom object  
would have two custom properties "exchangeserver" and "perfdata".  
{create the custom collection -- somehow}  
$co | sort-object perf  
<!--[if !supportLineBreakNewLine]-->  
Here is my response:


  Hal taught me a cool way to create custom objects that he learned from PowerShell MVP Brandon Shell. Here's a [link](http://bsonposh.com/modules/wordpress/?p=25) to the post.[ ](http://bsonposh.com/modules/wordpress/?p=25)





  Here's the code you may want to try...





  $k = 0
 $co = $(foreach ($j in $exchangeserverlist)
 {


> 

>   
$values
 = "" | Select-Object server,perf #
 this is where your custom object is created


$perf = New-Object System.Diagnostics.PerformanceCounter($perfobj1,


$counter1, $instance1, $j.Name)


$values

 .server = 

$

j.Name #
populating custom object


> 

> 
> 

>   
$values

.perf = 

$

perf.RawValue #
populating custom object 


 $k = $k + 1
> 

> 
> 

>   $values
> 


  })


> 

  $co | sort-object perf








  [Jaykul ](http://huddledmasses.org/)on IRC helped me figure out that you need to create the custom object in the loop. I tried to do it outside the loop and it didn't work the way I wanted it to.





  Or you could use this method that Hal suggested





  $k = 0
 $co = @() # 
this creates an empty array





  foreach ($j in $exchangeserverlist)
 {


> 
$values
 = "" | Select-Object server,perf # 
this is where your custom object is created

> 
$perf = New-Object System.Diagnostics.PerformanceCounter($perfobj1,

> 
$counter1, $instance1, $j.Name)

> 
$values

.server = 

$

j.Name #
populating custom object


> 
$values

.perf = 

$

perf.RawValue #
populating custom object 


> $k = $k + 1  
> $co += $values # this populates the array


  })


  $co | sort-object perf





  **
Thanks for listening!
**


  **
Jonathan
**
