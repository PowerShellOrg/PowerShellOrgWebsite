---
title: Monitoring SQL Server Backups
author: Enrique Puig
authors:
  - Enrique Puig
date: "2013-11-07T07:30:31+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/11/monitoring-sql-server-backups/
---

One of the most important tasks for the** **DBAs is to ensure that there is a maintenance plan to recover data from a given disaster.
  
As a DBA we need to design a maintenance plan according to our scenario and business requirements. Do we want to be able to recover data at any point of time? How much data loss can we accept? All these questions and many more must be answered before designing the plan. In this post we will assume a basic daily full backup to keep our data safe, we will assume that there is a job performing full backups to our databases every day at midnight. 



The next step after we have defined and implemented the maintenance plan is to monitor that all backups are being executed. In order to reach our goal it will be necessary to know whether a backup has been done or not and that could be possible by monitoring the backup job or querying the msdb database metadata among many other options. For this post we will use the second option, we will query msdb to check databases backup information. The main reason why we choose this option is because of the variability of backup maintenance plan definitions. The backup job is defined by every DBA and we cannot assume that all databases are included in the maintenance plan, on the other hand by querying msdb we will know for sure the databases which have been backed up and those that have not been backed up.


# 
Querying msdb database



As it has been explained before querying msdb database will give us the truth about database backups. Running the following query we will know how many days have happened since the last full backup of every database:





Use

 msdb
;








 







with

 backup_info







as







(








    

select









        
bck
.
database_name
,









        
bck
.
database_guid
,









        
bck
.
backup_start_date
,









        
bck
.
backup_finish_date
,









        
bckmf
.
physical_device_name 
as
 BackupFile_Path
,









        
BackupType
=









        

case









            

when
 bck
.
[type]
=

'I'

then

'Differential'









            

when

type

=

'D'

then

'Full'









            

when

type

=

'L'

then

'Log'









            

else

'Unknown'









        

end









    

from
 backupset 
as
 bck








    

inner

join
 backupmediafamily 
as
 bckmf








        

on
 bck
.
media_set_id
=
bckmf
.
media_set_id







),

 Last_Backups







as







(








      

select

*









      

from









      


(








            

select









                  

ROW_NUMBER

()

over 

(

PARTITION

BY
 V
.
database_guid, V.BackupType 
order

by
 V
.
backup_start_date 
desc

)

as
 r
,









                  

*









            

from
 backup_info 
as
 V








      

)

as
 VV








      

where
 VV
.
r
=
1 
and
 VV
.
BackupType
=

'FULL'








),

dbs







as







(








      

select









    
name
,
database_guid
,
state_desc








      

from

sys

.

databases

as
 dbs








      

inner

join

sys

.

database_recovery_status

as
 dbrs








            

on
 dbrs
.
database_id
=
dbs
.
database_id







)







select








    
name
,









    

case

when
 V
.
database_name 
is

null

then
 365 
else

DATEDIFF

(

day

,
backup_start_date
,

GETDATE

())

end

as
 DaysSinceLastBackup







from

 dbs







left


join
 Last_Backups 
as
 V








    

on
 V
.
database_guid
=
dbs
.
database_guid







where

 dbs
.
state_desc
=

'ONLINE'

and
 name 
<>

'TempDB'








order


by
 2 
desc

;






 



Notice that databases that never have been backed up will return 365 days as the number of days since the last full backup.



This query returns the desired information like follows:


  [![image](https://powershell.org/wp-content/uploads/2013/11/image_thumb.png)](https://powershell.org/wp-content/uploads/2013/11/image.png)



In this case we can see a basic example with system databases with 0 days since last full backup, which means that all databases are up to date with full backups. Another possible result could be:


  [![image](https://powershell.org/wp-content/uploads/2013/11/image_thumb1.png)](https://powershell.org/wp-content/uploads/2013/11/image1.png)



In this case databases last full backup was four days ago. This second example could be a reason to be alarmed because in case of a disaster we only can recover data until four days ago, all changes made during the last four days would be lost.



Notice that databases that never have been backed up will return 365 days as the number of days since the last full backup.



As it was shown before, the query could help us to monitor backups in a single instance but what happen when the DBA has to monitor and manage more than one instance? And what if those instances are from different SQL Server Versions? Things start to get complicated and doing it one by one manually is not an option! I"™m currently facing that situation; I"™m managing more than 80 SQL Server instances from different versions. Here is when PowerShell comes to help the DBA.


# 
PowerShell Solution



With PowerShell we will be able to query all msdb databases from all the desired SQL Server instances. The solution will have two files:



              1. Xml file with Server information




a.
       


SQL Server instance, user name, password"¦



              2. PowerShell script



The idea is to run the query to msdb for every server registered in the xml file. For instance the XML file structure could like follows:


  [![image](https://powershell.org/wp-content/uploads/2013/11/image_thumb5.png)](https://powershell.org/wp-content/uploads/2013/11/image5.png)



For this demonstration we only need to provide the instance name, the SQL Server user name and the password to connect. The reason why I"™m using SQL Server authentication is because not all my SQL Server instances are in the same domain so I need to be able to connect to all of them from a single point (where the script is running). Anyway the script can always be modified to connect with integrated authentication easily.



With the xml file ready the only thing missing is the script file which will read the xml file and execute the query for every server. The script looks like follows:





Param

(








  
[

int

]

$DaysSinceLastBackup

=-

1,








  
[

string

]

$serversPath

=

"C:\tmp\Servers.xml"








 
)








 


Function

Get-SQLServer-DataTable

 ([

string

]

$conn

 , [

string

]

$query

)








 
{








     


$SqlConnection

=

New-Object

System.Data.SqlClient.SqlConnection

;








     


$SqlConnection

.

ConnectionString

=

$conn








     


$SqlCmd

=

New-Object

System.Data.SqlClient.SqlCommand

;








     


$SqlCmd

.

CommandText

=

$query

;








     


$SqlCmd

.

Connection

=

$SqlConnection

;








     


$SqlAdapter

=

New-Object

System.Data.SqlClient.SqlDataAdapter

;








     


$SqlAdapter

.

SelectCommand

=

$SqlCmd

;








     


$DataTable

=

New-Object

System.Data.DataTable

;








     


$SqlAdapter

.

Fill

(

$DataTable

) 

|

out

-

Null;








     


$SqlConnection

.

Close

() 

;








     









     


return

$DataTable

;







}







 







Function

Get-SQLDatabaseBackupsInfo

 ([

string

] 

$conn

)







{








      


$query

=

"








            


Use

msdb;








            









            


with

backup_info








            


as








            
(








                  


select








                        


bck.database_name

,








                        


bck.database_guid

,








                        


bck.backup_start_date

,








                        


bck.backup_finish_date

,








                        


bckmf.physical_device_name

as

BackupFile_Path

,








                        


BackupType

=








                        


case








                             


when

bck

.[

type

]

=

'I'

then

'Differential'








                             


when

type

=

'D'

then

'Full'








                             


when

type

=

'L'

then

'Log'








                             


else

'Unknown'








                        


end








                  


from

backupset

as

bck








                  


inner

join

backupmediafamily

as

bckmf








                        


on

bck.media_set_id

=

bckmf.media_set_id








            
), 

Last_Backups








            


as








            
(








                  


select

*








                  


from








                  
(








                        


select








                             


ROW_NUMBER

() 

over

 (

PARTITION 

BY 

V.database_guid, V.BackupType 

order 

by 

V.backup_start_date 

desc

) 

as

r

,








                             


*








                        


from 

backup_info 

as 

V








                  
) 

as 

VV








                  


where 

VV.r

=

1 

and 

VV.BackupType

=

'FULL'








            
),

dbs








            


as








            
(








                  


select








                  


name

,

database_guid

,

state_desc








                  


from 

sys.databases 

as 

dbs








                  


inner 

join 

sys.database_recovery_status 

as 

dbrs








                        


on 

dbrs.database_id

=

dbs.database_id








            


)








            


select








                  


@@

SERVERNAME 

as 

ServerName

,








                  


name

as

DbName

, 








                  


case 

when 

V.database_name 

is 

null 

then

 365 

else 

DATEDIFF

(

day

,

backup_start_date

,

GETDATE

()) 

end 

as 

DaysSinceLastBackup








            


from 

dbs








            


left 

join 

Last_Backups 

as 

V








                  


on 

V.database_guid

=

dbs.database_guid








            


where 

dbs.state_desc

=

'ONLINE' 

and 

name

 <>

'TempDB'








            


order 

by

 2 

desc;








                  
"

;








      


return 

Get

-

SQLServer

-

DataTable 

$conn 

$query

;







}







 


    









 
[

xml

]

$xml

=

Get-Content 

$serversPath








 


$xml

.

Servers

.

server

|

foreach

-

object

{








    


$it

=

$_

;








    


$instance

=

$it

.

InstanceName

;








    


$user

=

$it

.

username

;








    


$pass

=

$it

.

password

;








    









    


$conn

=

"Server = $instance; Database = master; User=$user;Password=$pass;"

;








      









      


Get-SQLDatabaseBackupsInfo 

$conn 
|

where-object

 {

$_

.

DaysSinceLastBackup 

-gt 

$DaysSinceLastBackup

}


 

|

 

select

ServerName

, 

DbName

, 

DaysSinceLastBackup

;








 









 


}





The script has two parameters:





  
         


**
DaysSinceLastBackup
**
 : A threshold to filter result. The result will show all databases which latest full backups are older than the parameter value. The value by default is -1, a negative value that will make to show all results.





 
          


**
ServersPath
**
: The path where the XML file with all servers is allocated.



So we can execute the script like follows:


  [![image](https://powershell.org/wp-content/uploads/2013/11/image_thumb6.png)](https://powershell.org/wp-content/uploads/2013/11/image6.png)



The example shown before executes the script passing the two parameters, the first one is the xml file and the second one is the Threshold. In this case we have used the value 2, which means that the script will return all databases which latest full backups are older than 2 days. In this case only the database **test** matches the condition, the result shows 365 days since the last full backup which means that this database has never been backed up.



On the other hand, if we execute the script without parameters we will see the information of all databases, this is what it will look like :


  [![image](https://powershell.org/wp-content/uploads/2013/11/image_thumb7.png)](https://powershell.org/wp-content/uploads/2013/11/image7.png)


# 
Conclusion



As it has been shown during this post, is very easy to monitor SQL Server Backups over different servers in a very fast and efficient way by using PowerShell. Once we have this script we can implement a scheduled task and use it to generate HTML reports or alarms to notify the DBAs and System administrators about the databases backup status. Once again PowerShell comes up to save the day and make our working life easier.
