---
title: Use PnP PowerShell to add ContentType for your SharePoint site
authors:
  - Eli Hess
date: "2018-08-21T18:16:02+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2018/08/use-pnp-powershell-to-add-contenttype-for-your-sharepoint-site/
---

You can achieve the task by using SharePoint GUI. However, if your sites collection has tens of hundreds sites and each site has more than one document library, it will become a nightmare for a SharePoint administrator to do the task by using GUI. 


  Luckily, there is PnP Powershell which can help us achieve the goal.


  The steps will be like below:


  #Step1: export your login credential to a secure file on your local machine


  get-credential|export-clixml -path c:\safe\mycredential.txt


  #Step2: import your credential to Powershell


  $cred=import-clixml -path c:\safe\mycredential.txt


  #Step3: connect PnP online


  connect-pnponline -url "your site url here" -credentials $cred


  #Step4: get all sub sites of your site collection


  $subsites=get-pnpsubwebs -recurse|select-url


  #Step5: Use for each loop to loop through each subsites and add the content type into document libraries in each sub site.


  foreach ($site in $subsites) 
{


  connect-pnponline -url $site.url -credentials $cred


  $docids=get-pnplist|where-object {$_.basetemplate -eq 101 -and $_title -ine "Site Assets"}|select id


  foreach ($docid in $docids) {


       add-pnpcontenttypetolist -list $docid.id -contenttype "content type name of your choice for default one" -DefaultContentType


       add-pnpcontenttypetolist -list $docid.id -contenttype "2nd content type"


          } 


  }


  To remove the contenttype from your sharepoint libraries, you need to use remove-pnpcontenttypefromlist command.


  See the following code:


  Foreach($site in $subsites) {


  connect-pnponline -url $sites.url -credentials $cred


  $docids=get-pnplist|where-object {$_.basetemplate -eq 101 -and $_.title -ine "Site Assets"}|select id


  foreach ($docid in $docids) {


  remove-pnpcontenttypefromlist -list $docid.id -contenttype "the name of the content type you want to remove"}


       }



}
