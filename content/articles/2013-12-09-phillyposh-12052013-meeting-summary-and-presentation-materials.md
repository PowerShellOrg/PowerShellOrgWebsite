---
title: PhillyPoSH 12/05/2013 meeting summary and presentation materials
authors:
  - John Mello
date: "2013-12-10T03:51:19+00:00"
aliases:
  - /2013/12/phillyposh-12052013-meeting-summary-and-presentation-materials/
---

1.  [Sunny Chakraborty][1] gave an in-depth presentation on WMI Eventing using PowerShell. A copy of his presentation and scripts can be found [here][2], and a [recording][3] of his presentation can be found on our [YouTube channel][4]. If you want to learn even more about WMI, Sunny recommends checking out [Alain Lissoir's][5] webpage and downloading he WSH and VBS scripts hosted on his site for the two books he was written: "[How to exploit the power of Microsoft's WMI to create mission-critical computing infrastructures][6]" and "[Leveraging Windows Management Instrumentation (WMI) Scripting][7]"
  2. Announcements: 



        - 
          January's meeting will be on the 2nd Thursday (***01/09/2014***) of January as opposed to the       1st


        - 
          Since we didn't get to last months homework assignment we are pushing it to January's meeting. Here it is again and hopefully this will be a fun task that we can discuss during our next meeting:







    > **Title**: On This Day in Pictures  
    > **Description:** You have folder of photos on your computer that you take with your Smartphone or digital camera. From time to time you want to be reminded of the cool and interesting things you snapped photos of years before on this day. Being a PowerShell scripter you imagine that PowerShell would be a quick and easy tool for exploring your photo's meta-data to re-discover some fun memories you had by emailing yourself some pictures you took on this same day last year or any year before. You decide to format the email as HTML including the pictures and some data about them. Finally, using the task scheduler to set your script to run every morning so you can take a trip down memory lane with your photos on this day in history. As a PowerShell scripter you roll up your sleeves and get to work.  
    > **Requirements:**
    > 
    >   1. Your script should look into a directory that may contain sub folders for image files (you may want to support .jpg, .jpeg, .png, etc.).
    >   2. The script should then determine the date a photo was taken. Examining the [EXIF][8] meta-data might be handy.
    >   3. Get the date the script runs and find all the photos taken on the same day other than the current year.
    >   4.  Finally send an email containing the photos taken on this day in history*


 [1]: https://twitter.com/sunnyc7
 [2]: https://powershell.org/wp-content/uploads/2013/12/PhillyPosh_12_05_2014-Sunny.zip
 [3]: http://www.youtube.com/watch?v=h3V6K8ov1Ao
 [4]: http://www.youtube.com/channel/UCAc_ow5FIJtRpvew__9Iqzg
 [5]: http://www.lissware.net/
 [6]: http://www.amazon.com/exec/obidos/tg/detail/-/1555582664/qid=1048198398/sr=8-1/ref=sr_8_1/102-5879685-5285706?v=glance&s=books&n=507846
 [7]: http://www.amazon.com/exec/obidos/tg/detail/-/1555582990/qid=1048198398/sr=8-2/ref=sr_8_2/102-5879685-5285706?v=glance&s=books&n=507846
 [8]: http://en.wikipedia.org/wiki/Exchangeable_image_file_format
