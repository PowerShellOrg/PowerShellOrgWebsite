---
title: "Media Sync: Organize Your Photos and Videos with PowerShell"
authors:
  - n2501r
date: "2020-12-16T22:34:38+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
  - Tools
  - Tutorials
tags:
  - File Management
  - GUI
  - Automation
aliases:
  - /2020/12/media-sync-organize-your-photos-and-videos-with-powershell/
---

Do you have photos and videos that you have taken over the years that are scattered all over the place? Do you want to have all your photos and videos organized? Do you want all your photos and videos to have a standardized naming scheme? If you answered YES to these questions, then this is the post for you. In this post, I will provide you with the PowerShell code and examples for how to use the Media Sync script. The Media Sync script utilizes the Shell.Application COM object to gather file metadata. Only files that have a picture or video metadata type will be processed. The script uses the date taken for pictures and the media created metadata fields to organize the photos and videos. If there is no date taken or media created available for a given file, the script will use the modify date instead. The script also ensures that you won't have any duplicate files by checking the file hashes of the two files in question. If the script detects duplicate files, it will only keep one copy of the file. There are also tools included to help you cleanup unwanted files or folders, delete empty directories and find duplicate files. The script has a simple menu driven PowerShell GUI similar to what I did in a previous [
post
](https://spiderzebra.com/2020/05/21/how-to-create-a-simple-powershell-gui/). The Media Sync PowerShell script provides the following features: 


  - 
    COPY all photos and videos in a given folder structure (maintains original file in original location).


  - 
    MOVE all photos and videos in a given folder structure (original file is renamed and moved).


  - 
    Rename the photo or video based on the date the photo or video was taken.


  - 
    Directory structure organized by year and month the photo or video was taken.


  - 
    Ability to delete any empty folders in a given path, this will help with the cleanup process after you have moved photos and videos from the original location.


  - 
    Remove all files based off a given file extension, this will help with the cleanup process after you have moved photos and videos from the original location.


  - 
    Utilize Out-GridView to highlight and delete files or folders, this can be used to cleanup files of any file extension.


  - 
    Find duplicate files in a given directory.


  - 
    View files in a given directory via Out-GridView.



 Take a look for yourself at my site: 


[SpiderZebra.com](https://spiderzebra.com/2020/12/16/media-sync-organize-your-pictures-and-videos-with-powershell/)
 **Nick Richardson (@ChiefNSR)**
