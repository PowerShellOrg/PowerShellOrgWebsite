---
title: Keeping it simple – Line breaks in PowerShell
authors:
  - Jacob Moran
date: "2016-04-20T23:18:07+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2016/04/keeping-it-simple-line-breaks-in-powershell/
---

Trying to get your code to look good when reading it later can be tricky  
For line breaks in function scripts, there are two out-of-the-box options:  
First, you can break a line _after the pipe key_, which is an elegant and easy-to-read approach.  
Second, you can arbitrarily break a line with a _back tick_ mark, which you will find left of the number 1 on a standard US keyboard.  
**It looks like this: ` **  
But did you know that the back tick is a hack?  
The back tick ` means, “literally interpret the next character,” or also said, escape the following character.”  
For example, you might want to literally reference a quotation mark “ in a path name, but because it’s inside “” for strings, you need to literally interpret it: “`”PATH`”” – it’s hard to see, but squint.  
But here’s another takeaway: if you use the back tick to create a line break, make sure there’s no space after it; otherwise, the space – not the carriage return – will be the escaped, literal character!  
So here's are some examples of what works and what doesn't:  
First, no line breaks - works like a charm, but if we add a few more pipes and parameters this could get ugly.


  [![](https://1.bp.blogspot.com/-YhA2DFvuvJ0/VxgKrXR9-iI/AAAAAAAACpI/mxnNdjgJHnsJdBm5CJcDIlH0MZFU14SPgCLcB/s640/psbreaks1.jpg)](https://1.bp.blogspot.com/-YhA2DFvuvJ0/VxgKrXR9-iI/AAAAAAAACpI/mxnNdjgJHnsJdBm5CJcDIlH0MZFU14SPgCLcB/s1600/psbreaks1.jpg)


Next we have an example with a line break after the pipe, also functioning normally


  [![](https://4.bp.blogspot.com/--yAWo97K86g/VxgKrQ1vGQI/AAAAAAAACpA/rU1Ufre9k5kIX0uHOGromWmrHM9lvBWlACLcB/s640/psbreaks2.jpg)](https://4.bp.blogspot.com/--yAWo97K86g/VxgKrQ1vGQI/AAAAAAAACpA/rU1Ufre9k5kIX0uHOGromWmrHM9lvBWlACLcB/s1600/psbreaks2.jpg)


  Here we see the line break before the pipe, and the script fails


  [![](https://3.bp.blogspot.com/-Ws06dXUMVcY/VxgKrQbqwMI/AAAAAAAACpE/Gv7ug-qwjeA8HyxfnK7jV0S7DI0zO6nPACLcB/s640/psbreaks3.jpg)](https://3.bp.blogspot.com/-Ws06dXUMVcY/VxgKrQbqwMI/AAAAAAAACpE/Gv7ug-qwjeA8HyxfnK7jV0S7DI0zO6nPACLcB/s1600/psbreaks3.jpg)


  In this sample we use the tick immediately followed by a return. If we wanted to we could insert these ticks numerous times, before each parameter, for example


   [![](https://4.bp.blogspot.com/-E0dteWkhckg/VxgKr6uTTWI/AAAAAAAACpM/p_Qm4KDNuuoivzH61YGi5ul04sno3bGUwCLcB/s640/psbreaks4.jpg)](https://4.bp.blogspot.com/-E0dteWkhckg/VxgKr6uTTWI/AAAAAAAACpM/p_Qm4KDNuuoivzH61YGi5ul04sno3bGUwCLcB/s1600/psbreaks4.jpg)


  Finally we see the effect of using the back tick AND A SPACE before the carriage return - this one is tricky to find when troubleshooting, so don't let it happen to you!


  [![](https://2.bp.blogspot.com/-VifS3zKujEs/VxgKrwPG4FI/AAAAAAAACpQ/Ytct-gqOnJUbigd84aSFoV-xB--6h2OTwCLcB/s640/psbreaks5.jpg)](https://2.bp.blogspot.com/-VifS3zKujEs/VxgKrwPG4FI/AAAAAAAACpQ/Ytct-gqOnJUbigd84aSFoV-xB--6h2OTwCLcB/s1600/psbreaks5.jpg)


A special thanks to Sarah Wischmeyer for the introductory comments on this one!  
Keep your scripts snappy!  
[![](https://4.bp.blogspot.com/-VLGIBDlOUUk/UzrUDRXA08I/AAAAAAAABCI/y25G69eJcXExhjHjBEa4OZvklXQdv5GuACKgB/s1600/MBLogo4.png)](http://majorbacon.blogspot.com/)
