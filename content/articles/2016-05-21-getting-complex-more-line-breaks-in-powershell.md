---
title: Getting complex – More line breaks in Powershell
authors:
  - Tim Curwick
date: "2016-05-21T20:09:16+00:00"
categories:
  - Tips and Tricks
aliases:
  - /2016/05/getting-complex-more-line-breaks-in-powershell/
---

This is a follow up to Jacob Moran's article [Keeping it simple - Line breaks in PowerShell][1].  
I am strongly in the pro backtick camp, but I won't get into that debate here. Instead, I'll cover more of the common ground between the two camps.  
In addition to after a pipe, there are many, many more places where you can put in a line break without a backtick and without breaking your code.  
As a rule of thumb, any spot where the syntax unambiguously must be followed by something more, you can break the line.  
As an extreme example, this:








$A

=

1

,

1

+

1

,

3


$B

=
 @( 
"a"

,

"b"

,

"c"
 )
 If ( 
$A

[

2

]

.
ToString() 
-eq

$B

[

2

]

.
Length 
-or
 (
Get-Date
)
.
Date
.
DayOfWeek 
-eq

'Tuesday'
 ) { 
[pscustomobject]
@{ Name 
=

"x"
 } }







Can be written like this:








$A

=

1

,


1

+


1

,


3







$B

=
 @(

"a"


"b"


"c"

 )






If
 (

$A

[


2


]

.

 ToString(
 ) 
-eq


$B

[


2


]

.

 Length 
-or

 (

Get-Date

 )
.

 Date
.

 DayOfWeek 
-eq


'Tuesday'

 )
 {

[
 pscustomobject]
@{
 Name 
=


"x"

 }
 }







That example is, of course, silly.  
But combine judicious use of the line break with appropriate horizontal whitespace, and you can turn this:








If
 ( 
$SourceFile1

.
Length 
/

1Gb

-gt

$MaxSizeGB

-and
 ( 
$SourceFile1

.
FullName 
-like

"*\Accounting\*"

-or

$SourceFile1

.
FullName 
-like

"*\Finance\*"
 ) )
 {

$Destination

=

$SourceFile1

.
FullName
.
Replace( 
$SourceShare

,

$DestinationShare
 )
.
Replace( 
'\Accounting\'

,

'\ACC\'
 )
.
Replace( 
'\Accounting\'

,

'\FIN\'
 )
 }







Into this:








If
 ( 
$SourceFile1

.
Length 
/

1Gb

-gt

$MaxSizeGB

-and


     ( 

$SourceFile1

.
FullName 
-like

"*\Accounting\*"

-or


       $SourceFile1

.
FullName 
-like

"*\Finance\*"
 ) )

    {


    $Destination

=

$SourceFile1

.
FullName
.


                    Replace( 

$SourceShare

,

$DestinationShare
 )
.


                    Replace( 

'\Accounting\'

,

'\ACC\'
 )
.


                    Replace( 

'\Accounting\'

,

'\FIN\'
 )

    }








 [1]: https://powershell.org/2016/04/20/keeping-it-simple-line-breaks-in-powershell/
