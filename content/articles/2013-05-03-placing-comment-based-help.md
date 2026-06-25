---
title: Placing Comment-Based Help
authors:
  - June Blender
date: "2013-05-03T19:03:39+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2013/05/placing-comment-based-help/
---

What an amazing event. I'm now reading through each of the Advanced entries in a vain attempt to whittle the entries down to a short list. It's an incredibly difficult task, which is testament to your skill and diligence. We are so lucky to have so many competent scripters in the community.  
As I read through the comments on each script, I've noticed several that say:  
"Help should be nested under the function to work properly."  
Au contraire! This is not true and I want to make sure that people who see this comment are not misled. The Windows PowerShell team designed comment-based help to be really flexible.  
As I explained in [about_Comment_Based_Help][1], you can put comment-based help for a function in one of three positions:

  * At the beginning of the function body
  * At the end of the function body
  * On the line before the Function keyword

So, all of these work.


`function Move-OldFiles
{
<#
.Synopsis
 Moves old log files to an archive directory.
#>
      Param
      (
         [parameter(Mandatory=$true)]
         [String]
         $InputDirectory
      )
}`function Move-OldFiles
{
  Param
      (
         [parameter(Mandatory=$true)]
         [String]
         $InputDirectory
      )
   #Script logic goes here
<#
.Synopsis
 Moves old log files to an archive directory.
#>
}`<#
.Synopsis
 Moves old log files to an archive directory.
#>
function Move-OldFiles
{
  Param
      (
         [parameter(Mandatory=$true)]
         [String]
         $InputDirectory
      )
   #Script logic goes here
}
`If you place the comment-based help on the line before the Function keyword, make sure that there is, at most, one blank line between the end of the comment-based help and the line with the function keyword. To avoid this problem, I always make sure that there are no blank lines between the end of the comment-based help and the Function keyword.  
When reading the comments about your solutions, please remember that we are all volunteers. Everyone who takes the time to comment on your solution is trying to help, and should be appreciated, but not every comment is correct. Trust, but verify!

 [1]: http://go.microsoft.com/fwlink/?LinkID=144309
