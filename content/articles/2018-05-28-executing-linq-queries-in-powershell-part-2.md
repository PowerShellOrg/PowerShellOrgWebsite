---
title: Executing LINQ Queries in PowerShell – Part 2
authors:
  - Eli Hess
date: "2018-05-28T12:31:00+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tools
aliases:
  - /2018/05/executing-linq-queries-in-powershell-part-2/
---

And we're back!  
Ok, so in the last blog we began a conversation about delegates and using LINQ in PowerShell. In today's post, I'm going to give an example of how it can be incredibly useful. Let's talk about Joins.

## Joins

In my line of work, I'm constantly running into the need to combine datasets from multiple sources that relate to each other and pull out some specific properties. Say you have two internal services, one which is used to track production status and another which is used to monitor whether machines are online. To demonstrate this, let's initialize some mock data once again.


`#Create empty arrays
$DatasetA = @()
$DatasetB = @()
#Initialize "status" arrays to pull random values from
$ProductionStatusArray = @('In Production','Retired')
$PowerStatusArray = @('Online','Offline')
#Loop 1000 times to populate our separate datasets
1..1000 | Foreach-Object {
    #Create one object with the current iteration attached to the name property
    #and a random power status
    $PropA = @{
        Name = "Server$_"
        PowerStatus = $PowerStatusArray[(Get-Random -Minimum 0 -Maximum 2)]
    }
    $DatasetA += New-Object -Type PSObject -Property $PropA
    #Create a second object with the same name and a random production status
    $PropB = @{
        Name = "Server$_"
        ProductionStatus = $ProductionStatusArray[(Get-Random -Minimum 0 -Maximum 2)]
    }
    $DatasetB += New-Object -Type PSObject -Property $PropB
}
`Now we have two datasets with the same server names, one showing production status and the other showing power status. Our goal is to join that data together. In traditional PowerShell, we would likely iterate through one of the sets while doing a filter on the second set and then either add property members to the first set or create all new objects with a combination of properties from both sets. Something like this:


`$JoinedData = @()
foreach($ServerA in $DatasetA) {
    $ServerB = $DatasetB | Where-Object Name -eq $ServerA.Name
    $Props = @{
        Name = $ServerA.Name
        PowerStatus = $ServerA.PowerStatus
        ProductionStatus = $ServerB.ProductionStatus
    }
    $JoinedData += New-Object -Type PSObject -Property $Props
}
`This works fine. If I wrap it in a Measure-Command it takes right around 8.82 seconds to complete. Not awful, but at enterprise level where you're dealing with ten times that amount of data, you can see how that run time could get out of control. Now let's do the same with LINQ:


`$LinqJoinedData = [System.Linq.Enumerable]::Join(
    $DatasetA,
    $DatasetB,
    [System.Func[Object,string]] {param ($x);$x.Name},
    [System.Func[Object,string]]{param ($y);$y.Name},
    [System.Func[Object,Object,Object]]{
        param ($x,$y);
        New-Object -TypeName PSObject -Property @{
        Name = $x.Name;
        PowerStatus = $x.PowerStatus;
        ProductionStatus = $y.ProductionStatus}
    }
)
$OutputArray = [System.Linq.Enumerable]::ToArray($LinqJoinedData)
`This completed for me in just over 0.4 seconds! Hopefully after last week this syntax doesn't look too daunting, but let's walk through what we just did. We're calling the [Join method][1] on [System.Linq.Enumerable][2] and then passing it five parameters.

  1. The first dataset we're going to join
  2. The second dataset to join
  3. The delegate which defines the key to compare against on the first dataset
  4. The delegate which defines the key to compare against on the second dataset
  5. Finally, we pass in the delegate which defines what the output should look like

So it looks complicated, but once you use it a few times, it's really not too bad. Now you're probably wondering why I added that final line where I called "[System.Linq.Enumerable]::ToArray($LinqJoinedData)." For that we need to talk about "Deferred Execution vs. Immediate Execution." When you call the Join method, it's not actually joining the data at that time, rather it's building an expression tree which defines the relational algebra needed to perform the join. This defers the execution point to when the data is actually operated against. So in the above example, I called "ToArray()" merely to provide an accurate timespan for how long the join actually takes as opposed to the more traditional PowerShell approach we used before it. If this were production code and I wanted to see  machines with an offline status that are listed as in production, rather than that "ToArray()" line I could simply run this:


`$LinqJoinedData.Where({($_.PowerStatus -eq "Offline") -and ($_.ProductionStatus -eq "In Production")})
`The Join query would execute at that time and then "Where()" would filter down to just the objects I requested.  
And there you have it! If you found this interesting, I encourage you to check out these modules:

  * [ili101's PowerShell Module on the gallery, "Join-Object."][3]
  * [SeeminglyScience's Module, 'PSLambda' which is doing really fun things with delegates and threading][4]

Feel free to reach out to me on [Twitter][5] or check out my [personal site][6] from time to time for other content. If you've seen [my recent talk at PowerShell Summit][7], I'll be posting the blog I referenced there soon about turning my dog into a tea kettle.  (it's not PowerShell related, thus it will be landing somewhere other than here)  
Happy tinkering!  
-Eli

 [1]: https://msdn.microsoft.com/en-us/library/bb534675(v=vs.110).aspx
 [2]: https://msdn.microsoft.com/en-us/library/system.linq.enumerable_methods(v=vs.110).aspx
 [3]: https://github.com/ili101/Join-Object
 [4]: https://github.com/SeeminglyScience/PSLambda
 [5]: https://twitter.com/eshess
 [6]: http://elihess.com
 [7]: https://www.youtube.com/watch?v=QLalnXXwQeI
