---
title: Piping between functions
authors:
  - Richard Siddaway
date: "2013-01-19T17:04:01+00:00"
aliases:
  - /2013/01/piping-between-functions/
---

A question came up about piping between advanced functions. The input to the second function might be an array. To illustrate how this works imagine a function that gets disk information "“ or better still use this one.


`function

get-mydisk

{


[

CmdletBinding

(

)

]


param

(


[string]

$computername

=

"$env:COMPUTERNAME"


)


BEGIN

{

}

#begin 


PROCESS

{


Get-WmiObject

-Class

Win32_LogicalDisk

-ComputerName

$computername

|


foreach

{


New-Object

-TypeName

PSObject

-Property

@{


Disk

=

$_

.

DeviceID


Free

=

$_

.

FreeSpace


Size

=

$_

.

Size


}


}


}

#process 


END

{

}

#end


}

`Use a computername as a parameter. Use WMI to get the disk information and output an object.

PS> get-mydisk | ft -AutoSize

Disk         Free         Size
—-         —-         —-
C:   149778239488 249951154176
D:       69271552    104853504
E:                            
F:                            

This works as well



PS> get-mydisk | where Size -gt 0 | ft -AutoSize

Disk         Free         Size
—-         —-         —-
C:   149778108416 249951154176
D:       69271552    104853504

You now have a function outputs objects that behave properly on the pipeline.

So now you want those objects piped into another function or you want an array of objects used as the input


`function

get-freeperc

{


[

CmdletBinding

(

)

]


param

(


[

parameter

(

ValueFromPipeline

=

$true

)

]


[Object[]]

$disklist


)


BEGIN

{

}

#begin 


PROCESS

{


foreach

(

$disk

in

$disklist

)

{


if

(

$disk

.

Size

-gt



)

{


$disk

|

Select

Disk

,


@{

N

=

"Size(GB)"

;

E

=

{

[math]

::

Round

(

(

$(

$_

.

Size

)

/

1GB

)

,

2

)

}

}

,


@{

N

=

"FreePerc"

;

E

=

{

[math]

::

Round

(

(

$(

$_

.

Free

)

/

$(

$_

.

Size

)

)

*

100

,

2

)

}

}


}


}


}

#process 


END

{

}

#end


}

`* Set the parameter to accept pipeline input 
      * Set the parameter to accept an array of objects 
          * Use a process block 
              * Use a foreach block in the process block

            This works

            PS> get-mydisk | get-freeperc | ft -AutoSize

            Disk Size(GB) FreePerc
—- ——– ——–
C:     232.79    59.92
D:        0.1    66.07

            or this

            $disks = get-mydisk  
            get-freeperc -disklist $disks 

            or this

            get-freeperc -disklist (get-mydisk)

            [![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2798/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2798/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2798&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
