---
title: "Why Get-Content Ain't Yer Friend"
authors:
  - Don Jones
date: "2013-10-21T20:18:41+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2013/10/why-get-content-aint-yer-friend/
---

Well, it isn't your _enemy_, of course, but it's definitely a tricky little beast.  
Get-Content is quickly becoming my nemesis, because it's sucking a lot of PowerShell newcomers into its insidious little trap. Actually, the real problem is that most newcomers don't really understand that PowerShell is an object-oriented, rather than a text-oriented shell; they're trying to treat Get-Content like the old Type command (and why not? **type** is an alias to Get-Content in PowerShell, isn't it?), and failing.  
Worse, PowerShell has just enough under-the-hood smarts to make _some_ things work, but not _everything. _  
For example, this works to replace all instances of "t" with "x" in the file test.txt, outputting the result to new.txt:


`$x = Get-Content test.txt
$x -replace "t","x" | Out-File new.txt
`Sadly, this reinforces - for newcomers - the notion that Get-Content is just reading in the text file as a big chunk o' text.  
Nope.  
You see, in reality, Get-Content reads _each line of the file individually,_and returns _collection of System.String objects. _It "loses" the carriage returns from the file at the same time. But you'd never know that, because when PowerShell _displays_ a collection of strings, it displays them _one object per line and inserts carriage returns._So if you do this, it'll look like you're dealing with a big hunk o' text:


`$x = Get-Content test.txt
$x
`But you're not. $x, in that example, is a _collection of objects,_ not a single string.  
Never fear - you can make sense of this. First, if you use the **-Raw** parameter of Get-Content (available in v3+), it does in fact read the entire file as a big ol' string, preserving carriage returns instead of using them to separate the file into single-line string objects. In v2, you can achieve something similar by using Out-String:


`$x = Get-Content test.txt | Out-String
`So if you just _need_ to work with a big ol' string, you can. Alternately, you might find that some operations are quicker when you actually do work line-by-line. For example, asking PowerShell to do a regex replace on a huge string can consume a ton of memory; working with one line at a time is often quicker. Just use a foreach:


`ForEach ($line in (Get-Content test.txt)) {
  $line -replace "\d","x" | Out-File new.txt -Append
}
`Of course, don't _assume_ it'll be quicker - Measure-Command lets you test different approaches, so you can see which one is _actually_ quicker.  
You should also consider _not_ using Get-Content, especially with very large files. That's because it wants to read the _entire_ file into memory at once, at that can take a lot of memory - not to mention a bit more processor power, swap file space, or whatever else.  
Instead, read your file from disk one line at a time, work with each line, and then (if that's your intent) write each line back out to disk. Instead of caching the entire file in RAM, you're reading it off disk one line at a time.


`$file = New-Object System.IO.StreamReader -Arg "test.txt"
while ($line = $file.ReadLine()) {
  # $line has your line
}
$file.close()
`Or at least something like that. Yeah, welcome to .NET Framework. Other options available to the Framework include reading a text file in chunks - again, to help conserve memory and improve processing speed, but not necessarily making you read line-by-line.  
Whatever approach you choose, just remember that, by default, Get-Content isn't just reading a stream of text all at once. You'll be getting, and need to be prepared to deal with, a _collection_ of objects. Those will often require that you enumerate them (line by line, in other words) using a foreach construct, and with large files the act of reading the entire file might negatively impact performance and system resources.  
Knowing is half the battle!
