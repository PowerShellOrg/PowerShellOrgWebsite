---
title: 2016-March Scripting Games Puzzle
authors:
  - Don Jones
date: "2016-03-05T14:55:49+00:00"
categories:
  - Scripting Games
aliases:
  - /2016/03/2016-march-scripting-games-puzzle/
---

Our March 2016 puzzle comes from Carlo Mancini. We're actively interested in receiving Scripting Games puzzles from members of the community - submit yours, along with an official solution, to us at admin@ via email!  
<!--more-->

## **Instructions**

The Scripting Games are a monthly puzzle. We publish puzzles the first Saturday of each month, along with solutions and commentary for the previous month's puzzle. You can find them all at https://powershell.org/category/announcements/scripting-games/. Many puzzles will include optional challenges, that you can use to really push your skills.  
**To participate**, add your solution to a public Gist (http://gist.github.com; you'll need a free GitHub account, which all PowerShellers should have anyway). After creating your public Gist, just copy the Gist URL from your browser window and paste it, by itself, as a comment of this post. 
**Only post one entry per person. **However, remember that you can always go back and edit your Gist. We'll always pull the most recent one when we display it, so there's no need to post multiple entries if you want to make an edit. Just edit the original Gist and we'll see your changes shortly.

Don't forget the [main rules and purpose of these monthly puzzles][1], including the fact that you won't receive individual scoring or commentary on your entry.  
**User groups are encouraged to work together** on the monthly puzzles. User group leaders should submit their group's best entry to Ed Wilson, the Scripting Guy, via e-mail, prior to the third Saturday of the month. On the last Saturday of the month, Ed will post his favorite, along with commentary and excerpts from noteworthy entries. The user group with the most "favorite" entries of the year will win a grand prize from PowerShell.org.

## **Our Puzzle**

Our Puzzle this month comes in a "Beginner" and "Advanced" variety. Indicate in a code comment which one you're shooting for. And, you're welcome to submit one entry apiece for Beginner and Advanced, if you like. These are a bit tricky - be sure to read carefully!  
There's a ZIP file with some sample filenames to help you practice and test your solution - this is applicable to both versions of the puzzle:  
[FileShare](https://powershell.org/wp-content/uploads/2016/03/FileShare.zip)

### Diacritics: The Beginner Version

You are a server administrator for an international company with four branch back-offices in Western Europe (France, Norway, Italy and Germany). People at these sites store their files (invoices, receipts, customer complaints, as well as internal documents) on a central file server located in the United States.  
Since these back-office people have keyboards with a different layout from English QWERTY, they are able to save files with diacritical marks in their names on your central file server.  
It seems that your corporate backup routine has problems with these files and your backup tools hangs.  
Your boss has tasked you with finding precisely what kind of filenames interfere with the backup routine. After some time spent investigating the Unicode standard, you discover that this is a common problem in these European countries, and you find out that the culprits are, the ß used in German, the å, æ, ø used in Nordic languages, the é, é, ì and ò used in Italian, the ç used in French and, in general, all letters which are part of the Latin-1 Supplement character block.  
Unhappy with the situation, your boss has asked you to run a script against your file server to identify all the files whose names have letters (not symbols nor numbers) in that character block and return the following information:  
•                The name of the file  
•                The containing folder  
•                The time of creation  
•                The date of the last modification  
•                The size of the file  
An acceptable output for this task is shown in the following image.  
![image001](https://powershell.org/wp-content/uploads/2016/02/image001.png)  
Design Points  
·       Do not return files with other Latin symbols or numbers (like ©, ¼, ½, ÷) in their names.  
·       Assume that the appropriate ports are opened on your file server.  
·       Assume that Powershell Remoting is enabled on your file server.  
·       Use the simplest command that will work and feel free to write a one-liner if you able to.  
·       Display the output to the screen; you do not need to write to a text file.

### **Diacritics: The Advanced Version**

Thanks to your reputation of Powershell guru, you have been hired by a fast growing international company with four branch back-offices in Western Europe (France, Norway, Italy and Germany). People at these sites store their files (invoices, receipts, customer complaints, as well as internal documents) on a central file server located in the United States.  
Since these back-office people have keyboards with a different layout from English QWERTY, they are able to save files with diacritical marks in their names on your central file server.  
It seems that your corporate backup routine has problems with these files and your backup tools hangs.  
Your boss has tasked you with finding what kind of filenames interfere with the backup routine. After some time spent investigating the Unicode standard, you discover that this is a common problem in these European countries, and you find out that the culprits are, the ß used in German, the å, æ, ø used in Nordic languages, the é, é, ì and ò used in Italian, the ç used in French and, in general, all letters which are part of the Latin-1 Supplement character block.  
Unhappy with that situation, and confident with your Powershell skills, your boss has asked you to setup a scheduled task that runs every Saturday night on your central file server which call a function that extracts a list of all the filenames which have letters (not symbols nor numbers) in that character block and send them to him by e-mail.  
The e-mail must include the following information:  
•                The name of the file  
•                The containing folder  
•                The time of creation  
•                The date of the last modification  
•                The size of the file  
The e-mail should be sent every two weeks on Saturday 11PM.  
An acceptable output for this task is shown in the following images.  
![image001](https://powershell.org/wp-content/uploads/2016/02/image001-1.png)  

![image002](https://powershell.org/wp-content/uploads/2016/02/image002.png)  

![image003](https://powershell.org/wp-content/uploads/2016/02/image003.png)  
Design Points

  * Your boss says you should provide two scripts: 
      * One which leverages Powershell Remoting to create the Scheduled task on the file server with the appropriate job trigger. Your boss challenges you to this to be a one-liner.
      * One that contains the Get-Diacritic function that identifies the filenames with diacritic marks and e-mails the report.
  * The function Get-Diacritic must generate a CSV file containing the mentioned information. The CSV file should by default be named yyyyMMdd_FileNamesWithDiacritics.csv (where yyyyMMdd represents the current year, month and day) and be stored in the system temp folder.
  * No CSV report must be generated if the count of filenames with diacritic marks is null.
  * The size of the retrieved files should be presented in a readable format followed by the most appropriate unit (i.e. 1.2MB, or 500Kb).
  * You can assume that you have the required permissions to remotely access the File Server.
  * Appropriate parameter validation and error handling must be put in place.

### **About the author of this scenario:**

Carlo Mancini has been working as a system administrator for over 15 years and on PowerShell since its first release in 2007.  
He is one of the winners of the 2013 PowerShell Scripting Games and is currently employed by one of the largest European IT companies where he is in charge of maintaining and administering both the physical and virtual architecture.  
Carlo is also a technical speaker of renown at conferences around Europe and was awarded with the Microsoft MVP Award for Powershell in 2013 and 2014.  
He is involved on many technical forums as well as on his blog, [happysysadm.com][2].

 [1]: https://powershell.org/?p=2574
 [2]: http://happysysadm.com
