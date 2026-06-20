---
title: PhillyPoSH 11/07/2013 meeting summary and presentation materials
author: John Mello
authors:
  - John Mello
date: "2013-11-13T02:07:36+00:00"
aliases:
  - /2013/11/phillyposh-11072013-meeting-summary-and-presentation-materials/
---

1. [John Mello][1] gave a presentation on a script that searches a mailbox for an email by subject and downloads any attachments it may contain. A copy of his scripts can be obtained [here.][2]
  2. [Jason Helmick][3], Senior Technologist at [Concentrated Tech][4] and [Windows PowerShell MVP][5], gave a presentation on "Understanding the Pipeline "“ Getting your one-liners to work!" A copy of his script can be found [here][6]. 
      1. [A recording of Jason Helmick"™s presentation][7] can be found on our [YouTube channel][8]. Due to audio issues, John Mello"™s portion is not included in the recording.
  3. Announcements 
      1. Tickets are still available for the [2014 PowerShell Summit North America][9], if you"™re going then make sure to say hi to [Lido Paglia][10]!
      2. We are still trying to arrange for a PowerShell Saturday sometime in 2014, if you are interested in presenting please let us know!
  4. We are assigning homework this week! Hopefully this will be a fun task that we can discuss during our next meeting, so try your hand at the following problem:


  **Title**: On This Day in Pictures


  **Description:** You have folder of photos on your computer that you take with your Smartphone or digital camera. From time to time you want to be reminded of the cool and interesting things you snapped photos of years before on this day. Being a PowerShell scripter you imagine that PowerShell would be a quick and easy tool for exploring your photo"™s meta-data to re-discover some fun memories you had by emailing yourself some pictures you took on this same day last year or any year before. You decide to format the email as HTML including the pictures and some data about them. Finally, using the task scheduler to set your script to run every morning so you can take a trip down memory lane with your photos on "this day in history". As a PowerShell scripter you roll up your sleeves and get to work.


  **Requirements:**


  - 
    Your script should look into a directory that may contain sub folders for image files (you may want to support .jpg, .jpeg, .png, etc.).


  - 
    The script should then determine the date a photo was taken. Examining the [EXIF](http://en.wikipedia.org/wiki/Exchangeable_image_file_format) meta-data might be handy.


  - 
    Get the date the script runs and find all the photos taken on the same day other than the current year.


  - 
     Finally send an email containing the photos taken on this day in history*



 [1]: http://mellositmusings.com/
 [2]: http://mellositmusings.com/2013/10/29/powershell-script-to-download-attachments-from-an-email/
 [3]: http://www.jasonhelmick.com/
 [4]: http://concentratedtech.com/
 [5]: http://mvp.microsoft.com/en-us/mvp/Jason%20Helmick-5000354
 [6]: https://powershell.org/wp-content/uploads/2013/11/PhillyPosh_11_07_2013_Jason_Helmick.zip
 [7]: https://www.youtube.com/watch?v=uVsMbxj6188
 [8]: http://www.youtube.com/channel/UCAc_ow5FIJtRpvew__9Iqzg
 [9]: https://powershell.org/community-events/summit/powershell-summit-north-america/
 [10]: http://paglia.org/
