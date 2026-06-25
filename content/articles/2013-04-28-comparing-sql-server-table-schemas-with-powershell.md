---
title: Comparing SQL Server table schemas with PowerShell
authors:
  - Enrique Puig
date: "2013-04-28T22:44:17+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/04/comparing-sql-server-table-schemas-with-powershell/
---

As a SQL Server DBA or SQL Server developer sometimes is necessary to know whether two tables have equal schemas or not. For example, a few months ago I had to consolidate two SQL Server instances in just one. One of the main problems were the collisions between Databases and Tables. I found out that both instances had Databases with equal name and the same thing happened with tables inside those databases. When consolidating databases is very important to make sure that users and apps will find the same schema they were used to find before consolidation, so in order to consolidate databases it will be necessary to find tables with different schemas, merge them and solve conflicts.


  SQL Server provides a tool to compare schemas between databases, the tool comes with visual Studio or SQL Server Data tools with Database Projects. That could be very useful to identify schema differences among objects from both databases and see what tables have to be merged. So that"™s it, if we have a tool that provides us that functionality, why do we need PowerShell? The answer to this question is quite surprising, it happens that the tool compares schemas based on the T-SQL Code, which means that the comparison is made by using Strings. Let"™s see an example to introduce the issue.


  If we create in SQL Server two databases with one table per database as it is showed in the following script:


`--------------------------
-- Enrique Puig
-- epuig1984@gmail.com
-- Databases Demo creation
---------------------------
--Database1


create database 
TableCompare
;


alter database 
TableCompare 
set recovery simple

;


use 
TableCompare
;


create table 
dbo
.
TestTable

(

id 
int identity

(
1
,
1
) 

primary key

,

col1 
int 

not null,

col2 
int 

not null,

col3 
int 

not null
);


--Database2


create database 
TableCompare2
;


alter database 
TableCompare2 
set recovery simple

;


use 
TableCompare2
;


create table 
dbo
.
TestTable

(

id 
int identity

(
1
,
1
),

col1 
int 

not null,

col2 
int 

not null,

col3 
int 

not null
);


--create primary key


alter table 
dbo
.
TestTable

add constraint 
PK_TestTable 
primary key

(
id
);

`The databases and tables look like follows:


[![clip_image002](https://powershell.org/wp-content/uploads/2013/04/clip_image002_thumb.jpg)](https://powershell.org/wp-content/uploads/2013/04/clip_image002.jpg)


  Figure 1-Database comparison-


  As it is showed in Figure 1, both Tables look exactly the same, they have:


  * 

      - Equal Name



  * 

      - Equal number of columns



  * 

      - Equal name of columns



  * 

      - Equal number of keys



  * 

      - Equal columns in every key






  The only different thing is the name of the key, because for the first table was created automatically and in the second one it was created manually specifying a name. Does it really matter? In this case the name of the key is not relevant as long as the columns are the same. Well, if we compare it with Visual Studio 2012 we get the following results:


[![clip_image004](https://powershell.org/wp-content/uploads/2013/04/clip_image004_thumb.jpg)](https://powershell.org/wp-content/uploads/2013/04/clip_image004.jpg)


  Figure 2- Database Comparison-


  The figure 2 shows the result. According to the result the tables are not equals because of a name. This is not the logic intended for us, because when we want to consolidate tables the only thing that matters is that the table will have a primary key clustered by Id column, the name does not make a difference. So this method is going to show us **a lot of false positives** when looking for tables with different schemas. The same thing happens with some third party tools, I"™ve tried to compare objects with them and got the same result. For this example we are working with one database and only one table per database for a better understanding of the issue, but imagine when you are working with 100 database and an average of 70 or 80 tables per database, you need to make sure that you are no getting false positives identifying tables with different schemas. So here is when PowerShell comes up to save the day.


  Using SMO we are able to create a function to compare schemas. The function looks like follows:


`#################################################################
## Enrique Puig Nouselles
## Epuig1984@gmail.com
## Compare SQL Server Table schemas
#################################################################


function 

Compare-SQLServerTables

(

[

string

]

$srv1

,[

string

]

$bd1

,[

string

]

$sch1

,[

string

]

$TableName1

,
    [

string

]

$srv2

,[

string

]

$bd2

,[

string

]

$sch2

,[

string

]

$TableName2

)
{

[

reflection.assembly

]::
LoadWithPartialName(
"Microsoft.SqlServer.Smo"
) 
| 

Out-Null


$S1

=

New-Object 

"Microsoft.SqlServer.Management.Smo.Server" 

$srv1


if
(
$S1 

-ne 

$null
)
        {

if
(
$S1

.
databases
[

$bd1

] -ne 

$null
)
            {

$tab1

=

$S1

.
databases
[

$bd1

].
Tables
[

$TableName1

]


$res

=

$tab1 

| 

Where-Object 
{
$_

.
Schema 
-eq 

$sch1
}

if
(
$res

.
Count 
-eq 


)
                {

throw 

"Error: The schema 

$sch1 

doesn't contain any table called 

$TableName1

."

}
            }

else

{

throw 

"Error: The database '

$bd1

' doesn't exist."

}
        }

else

{

throw 

"Error: We couldn't connect to the server '

$srv1

'. Please check your credentials and the servername"

}

$S2

=

New-Object 

"Microsoft.SqlServer.Management.Smo.Server" 

$srv2


if
(
$S2 

-ne 

$null
)
        {

if
(
$S2

.
databases
[

$bd2

] -ne 

$null
)
            {

$tab2

=

$S2

.
databases
[

$bd2

].
Tables
[

$TableName2

]


$res

=

$tab2 

| 

Where-Object 
{
$_

.
Schema 
-eq 

$sch2
}

if
(
$res

.
Count 
-eq 


)
                {

throw 

"Error: The schema 

$sch2 

doesn't contain any table called 

$TableName2

."

}
            }

else

{

throw 

"Error: The database '

$bd2

' doesn't exist."

}
        }

else

{

throw 

"Error: We couldn't connect to the server '

$srv1

'. Please check your credentials and the servername"

}

##check columns


$ncols1

=

$tab1

.
Columns
.
Count

$ncols2

=

$tab2

.
Columns
.
Count

$eqCols

=

$true
        $eqChecks

=

$true
        $eqIndexes

=

$true
        $resultCompare

=

$true


if
(
$ncols1 

-ne 

$ncols2
)
        {

return 

$false
;
        }

[

Array

]

$colList

=
@()

##check data types, nullable columns,computed columns, identity columns, persisted columns, cols with default
        ## rimary keys and foreign keys


$tab1

.
Columns 
| 

ForEach-Object
{

$c1

=

$_
            $aux

=

$tab2

.
Columns 
| 

Where-Object 
{

$_

.
Name 
-eq 

$c1

.
Name 
-and 

$c1

.
DataType 
-eq 

$_

.
DataType 
-and 

$c1

.
Nullable 
-eq 

$_

.
Nullable 
-and 

$c1

.
Identity 
-eq 

$_

.
Identity 
-and 

$c1

.
IdentitySeed 
-eq 

$_

.
IdentitySeed 
-and 

$c1

.
Computed 
-eq 

$_

.
Computed 
-and 

$c1

.
ComputedText 
-eq 

$_

.
ComputedText 
-and 

$c1

.
DefaultConstraint
.
Text 
-eq 

$_

.
DefaultConstraint
.
Text 
-and 

$c1

.
InPrimaryKey 
-eq 

$_

.
InPrimaryKey 
-and 

$c1

.
IsPersisted 
-eq 

$_

.
IsPersisted 
-and 

$c1

.
IsForeignKey 
-eq 

$_

.
IsForeignKey
            }

if
(
$aux 

-eq 

$null
)
            {

$eqCols

=

$false


return
;
            }
        }

#check the other way to make sure that are completely equal tables


if
(
$eqCols
)
        {

$tab2

.
Columns 
| 

ForEach-Object
{

$c1

=

$_
                $aux

=

$tab1

.
Columns 
| 

Where-Object 
{

$_

.
Name 
-eq 

$c1

.
Name 
-and 

$c1

.
DataType 
-eq 

$_

.
DataType 
-and 

$c1

.
Nullable 
-eq 

$_

.
Nullable 
-and 

$c1

.
Identity 
-eq 

$_

.
Identity 
-and 

$c1

.
IdentitySeed 
-eq 

$_

.
IdentitySeed 
-and 

$c1

.
Computed 
-eq 

$_

.
Computed 
-and 

$c1

.
ComputedText 
-eq 

$_

.
ComputedText 
-and 

$c1

.
DefaultConstraint
.
Text 
-eq 

$_

.
DefaultConstraint
.
Text 
-and 

$c1

.
InPrimaryKey 
-eq 

$_

.
InPrimaryKey 
-and 

$c1

.
IsPersisted 
-eq 

$_

.
IsPersisted
                }

if
(
$aux 

-eq 

$null
)
                {

$eqCols

=

$false


return
;
                }
            }
        }

##check constraints
        ##we cannot create 2 constraints with the same name at the same database


$tab1

.
Checks 
| 

ForEach-Object
{

$tab2

.
Columns 
| 

ForEach-Object
{

$chk1

=

$_
                $checks

=

$tab2

.
Checks 
| 

Where-Object 
{ 
$chk1

.
Text 
-eq 

$_

.
Text 
-and 

$chk1

.
IsEnabled 
-eq 

$_

.
IsEnabled}

if
(
$checks 

-eq 

$null 

-or 

$checks

.
Count 
-eq 


)
                {

$eqChecks

=

$false


return
;
                }
            }
        }

##check it out in the other way


if
(
$eqChecks
)
        {

$tab2

.
Checks 
| 

ForEach-Object
{

Write-Host 

"hola que ase"


$chk1

=

$_
                $checks

=

$tab1

.
Checks 
| 

Where-Object 
{ 
$chk1

.
Text 
-eq 

$_

.
Text 
-and 

$chk1

.
IsEnabled 
-eq 

$_

.
IsEnabled}

if
(
$checks 

-eq 

$null 

-or 

$checks

.
Count 
-eq 


)
                {

$eqChecks

=

$false


return
;
                }
            }
        }

##Indexes section


[

Array

]

$indexes1

=
@()

[

Array

]

$cols

=
@()

##check indexes


$tab1

.
Indexes 
| 

ForEach-Object
{

$ix1

=

$_


            #check index type and properties


$ix

=

$tab2

.
Indexes 
| 

Where-Object
{

$ix1

.
IsClustered 
-eq 

$_

.
IsClustered 
-and 

$ix1

.
HasFilter 
-eq 

$_

.
HasFilter 
-and 

$ix1

.
IgnoreDuplicateKeys 
-eq 

$_

.
IgnoreDuplicateKeys 
-and 

$ix1

.
IndexedColumns
.
Count 
-eq 

$_

.
IndexedColumns
.
Count 
-and  

$ix1

.
IsIndexOnComputed 
-eq  

$_

.
IsIndexOnComputed 
-and 

$ix1

.
IsPartitioned 
-eq 

$_

.
IsPartitioned 
-and 

$ix1

.
IsSpatialIndex 
-eq 

$_

.
IsSpatialIndex 
-and 

$ix1

.
IsUnique 
-eq 

$_

.
IsUnique 
-and 

$ix1

.
IsXmlIndex 
-eq 

$_

.
IsXmlIndex
            }

if
( 
$ix 

-eq 

$null 

-or 

$ix

.
Count 
-eq 


)
            {

$eqIndexes

=

$false


return
;
            }

else

{

##check index column names


$ix1

.
IndexedColumns 
| 

ForEach-Object
{

$col1

=

$_


#Get all indexed columns


$cols

= 

$ix

.
IndexedColumns 
| 

Where-Object
{

$col1

.
Name 
-eq 

$_

.
Name
                    }

if
(
$cols 

-eq 

$null 

-or 

$cols

.
Count 
-eq 


)
                    {

$eqIndexes

=

$false


return
;
                    }
                }
            }
        }

if
(
$eqIndexes
)
        {

$tab2

.
Indexes 
| 

ForEach-Object
{

$ix1

=

$_


#check index type and properties


$ix

=

$tab1

.
Indexes 
| 

Where-Object
{

$ix1

.
IsClustered 
-eq 

$_

.
IsClustered 
-and 

$ix1

.
HasFilter 
-eq 

$_

.
HasFilter 
-and 

$ix1

.
IgnoreDuplicateKeys 
-eq 

$_

.
IgnoreDuplicateKeys 
-and 

$ix1

.
IndexedColumns
.
Count 
-eq 

$_

.
IndexedColumns
.
Count 
-and  

$ix1

.
IsIndexOnComputed 
-eq  

$_

.
IsIndexOnComputed 
-and 

$ix1

.
IsPartitioned 
-eq 

$_

.
IsPartitioned 
-and 

$ix1

.
IsSpatialIndex 
-eq 

$_

.
IsSpatialIndex 
-and 

$ix1

.
IsUnique 
-eq 

$_

.
IsUnique 
-and 

$ix1

.
IsXmlIndex 
-eq 

$_

.
IsXmlIndex
                }

if
( 
$ix 

-eq 

$null 

-or 

$ix

.
Count 
-eq 


)
                {

$eqIndexes

=

$false


return
;
                }

else

{

##check index column names


$ix1

.
IndexedColumns 
| 

ForEach-Object
{

$col1

=

$_
                        $cols

= 

$ix

.
IndexedColumns 
| 

Where-Object
{

$col1

.
Name 
-eq 

$_

.
Name
                        }

if
(
$cols 

-eq 

$null 

-or 

$cols

.
Count 
-eq 


)
                        {

$eqIndexes

=

$false


return
;
                        }
                    }
                }
            }
        }

if
(
$eqCols 

-eq 

$false 

-or 

$eqChecks 

-eq 

$false 

-or 

$eqIndexes 

-eq 

$false
)
        {

$resultCompare

=

$false

}

return 

$resultCompare

}
`[][1]


  This is a personalized function and three main blocks are checked in order to determine whether two tables have the same schema or not:


  1. **Columns**: In this section we check the number of columns, the name of the columns, the data types for every column, if is part of a primary key, if is part of a foreign key, if is a computed column and so on.


  2. **Checks**: In this section all checks defined in a table are compared. As we explained before, the name doesn"™t matter, the only thing that matters is the check definition text and the columns involved.


  3. **Indexes:** In this sections all the indexes are compared. The index name doesn"™t make a difference, we only check for index type, columns and so on.


  In order to test this PowerShell function we will run a main program to test it:


`#main program
##Define Variables


$srv1

=

"(local)\SQLDWH"


$srv2

=

"(local)\SQLDWH"


$bd1

=

"TableCompare"


$bd2

=

"TableCompare2"


$sch1

=

"dbo"


$sch2

=

"dbo"


$TableName1

=

"TestTable"


$TableName2

=

"TestTable"


#function call


Compare-SQLServerTables 

$srv1 $bd1 $sch1 $TableName1 $srv2 $bd2 $sch2 $TableName2


`[][1]


  The result that we get by running the main program is:


[![clip_image005](https://powershell.org/wp-content/uploads/2013/04/clip_image005_thumb.png)](https://powershell.org/wp-content/uploads/2013/04/clip_image005.png)


  Figure 3-Execution result-


  Now we are getting **True** as a result, which means that both tables are equals in terms of schema. If we change the schema of one of the test tables we will get a different result. Let"™s say we change the primary for one of the tables:


`--alter table


use 
TableCompare2
;


alter table 
TestTable

drop constraint 
PK_TestTable
;


alter table 
TestTable

add constraint 
PK_TestTable 
primary key

(
id
,
col1
);

`Now the table schemas look like follows:


[![clip_image007](https://powershell.org/wp-content/uploads/2013/04/clip_image007_thumb.jpg)](https://powershell.org/wp-content/uploads/2013/04/clip_image007.jpg)


  Figure 4- New Table schemas-


  The schemas have changed as it is showed in Figure 4. The primary key of the table TestTabe in TableCompare2 Database has two keys instead of one. If we execute again our function the result is:


[![clip_image009](https://powershell.org/wp-content/uploads/2013/04/clip_image009_thumb.jpg)](https://powershell.org/wp-content/uploads/2013/04/clip_image009.jpg)


  Figure 5- Result with different schemas-


  Now we get **False** because the schemas are different, so our function is working as intended. As you can see, once again PowerShell shows us its power and allows us to solve a problem easily.


  **Note**: Is very important to remark that this function **only compares Columns, Checks and indexes**. The main reason is because the function was created to solve a given problem but it could be extended to compare more object types like triggers, users and so on.


 [1]: http://11011.net/software/vspaste
