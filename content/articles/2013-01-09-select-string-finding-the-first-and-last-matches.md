---
title: "Select-String \"“ finding the first and last matches"
authors:
  - Richard Siddaway
date: "2013-01-09T17:55:40+00:00"
aliases:
  - /2013/01/select-string-finding-the-first-and-last-matches/
---

Today's question concerns finding the first and last matches in a file

Sometimes, I need to make two passes at seeking content in this file, once for the first occurrence; and a second grep for obtaining the last occurrence of a phrase. After the second pass, I figure placing the values into an array is the best way, then need to combine first and last values onto one output line {somewhere else}.

Let's consider the file we used in the first article in the series – <http://msmvps.com/blogs/richardsiddaway/archive/2013/01/07/select-string-scenarios-fixed-columns.aspx>

The file looks like this

12345ABCD123451234512345  
1234512345ABCD1234512345  
12345ABCD123451234512345  
12345abcd123451234512345  
123451234512345ABCD12345  
12345ABCD123451234512345  
123451234512345ABCD12345  
12345123451234512345ABCD  
1234512345ABCD1234512345

If you this select-string 

Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD

you will get multiple matches

C:\test\fixedcol.txt:1:12345ABCD123451234512345  
C:\test\fixedcol.txt:3:12345ABCD123451234512345  
C:\test\fixedcol.txt:4:12345abcd123451234512345  
C:\test\fixedcol.txt:6:12345ABCD123451234512345

So, how can we find the first and last matches – preferably in one pass.

I think the easiest way is to use the trick from the last article

$finds = Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD" 

$finds[0]$finds[-1]

The $finds variable conatins a collection of the MatchInfo objects created by Select-String.  The first match will always have the index of 0 and the last can always be referenecd by an index of -1. This information is returned: 

C:\test\fixedcol.txt:1:12345ABCD123451234512345  
C:\test\fixedcol.txt:6:12345ABCD123451234512345

If you want this in an object for further processing – try something like this

Get-ChildItem -Path c:\test -Filter *.txt -Recurse |  
foreach {

$finds = $null  
$finds = Select-String -Path $_.Fullname -Pattern "\A\w{5}ABCD" 

if ($finds){  

  $props = [ordered]@{  
    Filename  = $finds[0].Path  
    FirstLine = $finds[0].LineNumber  
    FirstData = $finds[0].Line  
    LastLine = $finds[-1].LineNumber  
    LastData = $finds[-1].Line  
  }  
  New-Object -TypeName PSObject -Property $props  
}  
}

Use Get-ChildItem to find the files. For each of them run Select-String with your pattern. If you get any matches create an object holding the file path and your required properties. In this case I'm taking the first and last line numbers with the match data.

If you only have a single match in a file you will get the same data in the First\* and Last\* properties as the first and last match are the  same.  You could put another if statement to control this so the Last* properties aren't populated if you want.  

[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2787/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2787/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2787&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
