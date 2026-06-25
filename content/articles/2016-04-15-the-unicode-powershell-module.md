---
title: The Unicode PowerShell module
authors:
  - Carlo Mancini
date: "2016-04-15T11:25:19+00:00"
categories:
  - PowerShell for Developers
  - Tools
aliases:
  - /2016/04/the-unicode-powershell-module/
---

After authoring last month scripting games puzzle, which involved some scripting around the Unicode standard, I decided to have some fun and write a **PowerShell module** which interacts directly with the online **Unicode Database** (UCD) to retrieve the main properties of characters.  
![poshunicode](https://powershell.org/wp-content/uploads/2016/04/poshunicode-628x453.png)  










Using this module you will be able to retrieve the following information for a single char or for every char in a given string:  
- Glyph name  
- General category  
- Unicode script  
- Unicode block  
- Unicode version (or age)  
- Decimal value  
- Hex value  
Here's a few sample outputs you can get from using the functions in the UnicodeInfo module:


`Get-Unicodeinfo '$'
 Glyph : $
 Decimal value : 36
 Hexadecimal value : U+0024
 General Category : CurrencySymbol
 Unicode name : DOLLAR SIGN
 Unicode script : Common
 Unicode block : BasicLatin
 Unicode version : 1.1`Get-Unicodeinfo 'Powershell!' | Format-Table
Glyph Decimal value Hexadecimal value General Category Unicode name Unicode script Unicode block Unicode
 version
 ----- ------------- ----------------- ---------------- ------------ -------------- ------------- ----------
 P 80 U+0050 UppercaseLetter LATIN CAPITAL LETTER P Latin BasicLatin 1.1
 o 111 U+006F LowercaseLetter LATIN SMALL LETTER O Latin BasicLatin 1.1
 w 119 U+0077 LowercaseLetter LATIN SMALL LETTER W Latin BasicLatin 1.1
 e 101 U+0065 LowercaseLetter LATIN SMALL LETTER E Latin BasicLatin 1.1
 r 114 U+0072 LowercaseLetter LATIN SMALL LETTER R Latin BasicLatin 1.1
 s 115 U+0073 LowercaseLetter LATIN SMALL LETTER S Latin BasicLatin 1.1
 h 104 U+0068 LowercaseLetter LATIN SMALL LETTER H Latin BasicLatin 1.1
 e 101 U+0065 LowercaseLetter LATIN SMALL LETTER E Latin BasicLatin 1.1
 l 108 U+006C LowercaseLetter LATIN SMALL LETTER L Latin BasicLatin 1.1
 l 108 U+006C LowercaseLetter LATIN SMALL LETTER L Latin BasicLatin 1.1
 ! 33 U+0021 OtherPunctuation EXCLAMATION MARK Common BasicLatin 1.1`160..170 | % {
   Get-Unicodeinfo ([char]$_) } |
   Where 'General Category' -eq "CurrencySymbol" |
   Format-Table
Glyph Decimal value Hexadecimal value General Category Unicode name Unicode script Unicode block Unicode version
 ----- ------------- ----------------- ---------------- ------------ -------------- ------------- ---------------
¢ 162 U+00A2 CurrencySymbol CENT SIGN Common Latin-1Supplement 1.1
£ 163 U+00A3 CurrencySymbol POUND SIGN Common Latin-1Supplement 1.1
¤ 164 U+00A4 CurrencySymbol CURRENCY SIGN Common Latin-1Supplement 1.1
¥ 165 U+00A5 CurrencySymbol YEN SIGN Common Latin-1Supplement 1.1
`Before you dive into the code, head over to the blog post I wrote describing each and every one of these properties, how some of them are accessible directly from the .NET framework, and how other less known but still relevant can be extracted from the UCD and integrated to the resulting object:  
[http://www.happysysadm.com/2016/04/working-with-unicode-scripts-blocks-and.html](http://www.happysysadm.com/2016/04/working-with-unicode-scripts-blocks-and.html)  
The UnicodeInfo module is available on Github:  
[https://github.com/happysysadm/UnicodeInfo](https://github.com/happysysadm/UnicodeInfo)  
The module is for sure 'Work-In-Progress' so if you find yourself willing to collaborate, you are very welcome to do so!
