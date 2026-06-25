---
title: "Select-string \"“ keeping in context"
authors:
  - Richard Siddaway
date: "2013-01-11T19:43:05+00:00"
aliases:
  - /2013/01/select-string-keeping-in-context/
---

Today"™s question involves using the Context parameter:


  *It's probably just me, but I've never gotten the switch '-context 5 **or -context 2, 7′ to work predictably – where 5 lines before and after or 2 
before and 7 after will come out – have you?*


  Let"™s start by looking at the default behaviour of select-string using the search pattern you"™ve seen previously:


  PS> Select-String -Path c:\test\*.txt -Pattern "\A\w{5}ABCD"


  C:\test\fixedcol.txt:1:12345ABCD123451234512345


  C:\test\fixedcol.txt:3:12345ABCD123451234512345


  C:\test\fixedcol.txt:4:12345abcd123451234512345


  C:\test\fixedcol.txt:6:12345ABCD123451234512345


  C:\test\fixedcol2.txt:1:12345ABCD123451234512345


  As you can see the line which matches your pattern is returned.

Often this is all that is required but there are occasions when you need to be able to put the line into context that is you need to understand how the line containing you pattern relates to the data around it.

The is what the context parameter can provide.



  If you look at the Select-String help file you will find this information on context.



-Context** *




Captures the specified number of lines before and after the line with the match. This allows you to view the match in context.




Required?

false




Position?

named




Default value




Accept pipeline input?

false




Accept wildcard characters?

false




  The first thing to note is that the parameter takes an array of integers. The first (or only member of the array) tells PowerShell how many lines to show from before* and *after *the matching line while the second member of the array controls the number of lines that are displayed *after* the matching line. Put simply if you supply one values it controls the number of lines from before and after you match that are displayed but if you specify two values then you explicitly control the lines from before the match with the first value and the lines from after the match with the second. Some examples should make this clear.


  I"™m going to use a file where we know the contents "“ it makes the explanations easier. If you run this:


  Get-Process | sort CPU -Descending | Out-File -FilePath c:\test\proc.txt "“Force


  You get a text file with the processes listed by CPU usage. You can examine the file for a particular process "“ this case let"™s look at Word:


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch





  C:\test\proc.txt:8:

360

25

20368

61728



331

41.89

4976 WINWORD


  You know that the file is ordered by CPU usage so what are the processes using similar amounts of CPU to Word?


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 2







C:\test\proc.txt:6:

653

34

66640

94416

286

48.77

3724 powershell




C:\test\proc.txt:7:

1124

29

13912

19336

210

47.71

5868 LiveComm


  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD




C:\test\proc.txt:9:

212

9

2788

10956

78

28.67

4112 SynTPEnh




C:\test\proc.txt:10:

565

35

49172

82572

347

12.50

5660 WWAHost





  The matching line is marked with a > symbol. I"™ve made it bold in the above listing for emphasis.


  If you specify a number such that the file doesn"™t have enough lines to display then only those lines that are available will be displayed for instance


  Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 12


  This can only display the seven lines prior to the match so that"™s all it does.


  What about the situation where you only want the three processes that are using more CPU than Word?


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 3,0







C:\test\proc.txt:5:

1555

74

30660

87176

465

80.70

5308 explorer




C:\test\proc.txt:6:

653

34

66640

94416

286

48.77

3724 powershell




C:\test\proc.txt:7:

1124

29

13912

19336

210

47.71

5868 LiveComm


  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD


  This works as well


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 3,$null







C:\test\proc.txt:5:

1555

74

30660

87176

465

80.70

5308 explorer




C:\test\proc.txt:6:

653

34

66640

94416

286

48.77

3724 powershell




C:\test\proc.txt:7:

1124

29

13912

19336

210

47.71

5868 LiveComm


  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD 


  The one thing you can"™t do is this:


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 3,


  >> 


  PowerShell expects something after the comma and will prompt you to supply it.


  The converse holds true if you want the lines that occur after the match. You can use a 0 as the first element:


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 0,3





  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD




C:\test\proc.txt:9:

212

9

2788

10956

78

28.67

4112 SynTPEnh




C:\test\proc.txt:10:

565

35

49172

82572

347

12.50

5660 WWAHost




C:\test\proc.txt:11:

276

19

6608

12628

88

9.33

5252 taskhostex


  Or $null


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context $null,3





  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD




C:\test\proc.txt:9:

212

9

2788

10956

78

28.67

4112 SynTPEnh




C:\test\proc.txt:10:

565

35

49172

82572

347

12.50

5660 WWAHost




C:\test\proc.txt:11:

276

19

6608

12628

88

9.33

5252 taskhostex





  You can"™t leave the first element blank


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context ,3


  At line:1 char:76


  + Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context ,3


  +

~


  Missing argument in parameter list.




+ CategoryInfo

: ParserError: (:) [], ParentContainsErrorRecordException




+ FullyQualifiedErrorId : MissingArgument


  This leads to the situation where you need to display a different number of lines before and after the match:


  PS> Select-String -Path c:\test\*.txt -Pattern "Winword" -SimpleMatch -Context 3,2







C:\test\proc.txt:5:

1555

74

30660

87176

465

80.70

5308 explorer




C:\test\proc.txt:6:

653

34

66640

94416

286

48.77



3724 powershell




C:\test\proc.txt:7:

1124

29

13912

19336

210

47.71

5868 LiveComm


  > C:\test\proc.txt:8:

360

25

20368

61728

331

41.89

4976 WINWORD




C:\test\proc.txt:9:

212

9

2788

10956

78



28.67

4112 SynTPEnh




C:\test\proc.txt:10:

565

35

49172

82572

347

12.50

5660 WWAHost


  What happens if you have multiple matches and their contexts overlap?


  PS> Select-String -Path c:\test\*.txt -Pattern "PowerShell" -SimpleMatch





  C:\test\proc.txt:9:

669

34

67544

62228

286

54.99

3724 powershell


  C:\test\proc.txt:12:

473

23

69112

86616

366

11.73

1688 powershell_ise


  C:\test\proc.txt:19:

346

13

39576

44540

207

3.15

280 PowerShell


  This file shows matches on lines 9, 12 and 19 so let"™s try this


  PS> Select-String -Path c:\test\*.txt -Pattern "PowerShell" -SimpleMatch -Context 4,5







C:\test\proc.txt:5:

1840

91

35836

75652

545

142.49

5308 explorer




C:\test\proc.txt:6:

618

23

68524

28788

194

108.84

5072 SkyDrive




C:\test\proc.txt:7:

1377

29

15668

23440

210

95.07

5868 LiveComm




C:\test\proc.txt:8:

211

9

2792

4516

78

59.98

4112 SynTPEnh


  **> C:\test\proc.txt:9:

669

34

67544

62228

286

54.99

3724 powershell**




C:\test\proc.txt:10:

560

35

53480

88760

370

22.95

2656 WWAHost




C:\test\proc.txt:11:

240

8

1952

2340

71

12.32

5580 TabTip


  **> C:\test\proc.txt:12:

473

23

69112

86616

366

11.73

1688 powershell_ise**




C:\test\proc.txt:13:

254

9

4684

9940

86

11.31



6136 RuntimeBroker




C:\test\proc.txt:14:

285

14

4116

4724

84

10.19

5252 taskhostex




C:\test\proc.txt:15:

82

5

2008

6148

55

7.52

2416 conhost




C:\test\proc.txt:16:

305

14

17608

5088

184

5.19

404 IAStorIcon




C:\test\proc.txt:17:

337

8

2180

536

76

4.79

376 InputPersonalization




C:\test\proc.txt:18:

409

12

4416

5464

79

4.26

5276 taskhost


  **> C:\test\proc.txt:19:

346



13

39576

44540

207

3.15

280 powershell**




C:\test\proc.txt:20:

125

5

2820

744

70

2.61

908 splwow64




C:\test\proc.txt:21:

347

13

12180

804

183

2.40

4788 PopUp_DM




C:\test\proc.txt:22:

335

10

2576

1756

83

2.20

4636 AdobeARM




C:\test\proc.txt:23:

249

21

6628

540

129

1.44

5220 SRSPremiumPanel




C:\test\proc.txt:24:

387

11

3436

12280

83

0.94

3828 WSHost


  I"™ve highlighted the lines that actually match.


  Starting with the first match you get 4 lines before it as requested. There should be 5 lines after the match BUT the next match is only 3 lines on and you asked for 5 lines after that. The lines before the last match overlap the lines after the second match. The lines after the last match are shown as requested.


  At first glance it looks like the command hasn"™t worked but what seems to be happening is that only unique lines are displayed. 


  I looked at the individual matches


  $finds = Select-String -Path c:\test\*.txt -Pattern "PowerShell" -SimpleMatch -Context 4,5


  for ($i=0; $i -le $finds.count; $i++){$finds[$i]; "###"*8}


  and received this output (I"™ve split the display so you can see what is produced.


  First match:




C:\test\proc.txt:5:

1840

91

35836

75652

545

142.49

5308 explorer




C:\test\proc.txt:6:

618

23

68524

28788

194

108.84

5072 SkyDrive




C:\test\proc.txt:7:

1377

29

15668

23440

210

95.07

5868 LiveComm




C:\test\proc.txt:8:

211

9

2792

4516

78

59.98

4112 SynTPEnh


  **> C:\test\proc.txt:9:

669

34

67544

62228

286

54.99

3724 powershell**




C:\test\proc.txt:10:

560

35

53480

88760

370

22.95

2656 WWAHost




C:\test\proc.txt:11:

240

8

1952

2340

71

12.32

5580 TabTip


  ########################


  Correct number before but restricted output after


  Second match:


  **> C:\test\proc.txt:12:

473

23

69112

86616

366

11.73

1688 powershell_ise**




C:\test\proc.txt:13:

254

9

4684

9940

86

11.31

6136 RuntimeBroker




C:\test\proc.txt:14:

285

14

4116

4724



84

10.19

5252 taskhostex




C:\test\proc.txt:15:

82

5

2008

6148

55

7.52

2416 conhost




C:\test\proc.txt:16:

305

14

17608

5088

184

5.19

404 IAStorIcon




C:\test\proc.txt:17:

337

8

2180

536

76

4.79

376 InputPersonalization


  ########################


  Nothing before and correct output after the match 


  Last match:




C:\test\proc.txt:18:

409

12

4416

5464

79

4.26

5276 taskhost


  **> C:\test\proc.txt:19:



346

13

39576

44540

207

3.15

280 powershell**




C:\test\proc.txt:20:

125

5

2820

744

70

2.61

908 splwow64




C:\test\proc.txt:21:

347

13

12180

804

183

2.40

4788 PopUp_DM




C:\test\proc.txt:22:

335

10

2576

1756

83

2.20

4636 AdobeARM




C:\test\proc.txt:23:

249

21

6628

540

129

1.44

5220 SRSPremiumPanel




C:\test\proc.txt:24:

387

11

3436

12280

83

0.94

3828 WSHost


  ########################


  One line before the match and correct number after the match.


  This confirms that if a line has appeared in a previous match you won"™t see it again. Is there a way to see the full context for each match? Unfortunately, Select-String doesn"™t appear to provide that capability directly. A little bit of working with the output should enable this.


  Select-String -Path c:\test\*.txt -Pattern "PowerShell" -SimpleMatch -Context 4,5 | 


  foreach {


  #matching line


  $padlength = (" {0}:{1:00}: " -f $_.Path, $_.LineNumber).Length


  $pad = " "*$padlength 





  $_.Context.PreContext | foreach {$_.Trim().Insert(0,$pad)}


  ""


  " {0}:{1:00}: {2}" -f $_.Path, $_.LineNumber, ($_.Line).Trim() 


  ""


  $_.Context.PostContext | foreach {$_.Trim().Insert(0,$pad)}


  ""


  ""


  } 





  Run the select-string as before. For each of the matches find the length of the formatted path and line number and create a blank string of that length.


  If you examine the MatchInfo type that Select-String produces you will see a Property called Context. If you examine that you will see it contains the collection of data for the pre and post context. (There are also display versions of the context).



  For each line in the pre-context insert the pad characters at the beginning. Display the formatted match line and then display the post-context data.

I"™ve inserted some blank lines to help format the display


  You will get output like this:






1840

91

35836

75652

545

142.49

5308 explorer




618

23

68524

28788

194

108.84

5072 SkyDrive




1377

29

15668

23440

210

95.07

5868 LiveComm




211

9

2792

4516

78

59.98

4112 SynTPEnh







C:\test\proc.txt:09: 669

34

67544

62228

286

54.99

3724 powershell







560

35

53480

88760

370

22.95

2656 WWAHost




240

8

1952

2340

71

12.32

5580 TabTip




473

23

69112

86616

366

11.73

1688 powershell_ise




254

9

4684

9940

86

11.31

6136 RuntimeBroker




285

14

4116

4724

84

10.19

5252 taskhostex










211

9

2792

4516

78

59.98

4112 SynTPEnh




669

34

67544

62228

286

54.99

3724 powershell




560

35

53480

88760

370

22.95

2656 WWAHost




240

8

1952

2340

71

12.32

5580 TabTip







C:\test\proc.txt:12: 473

23

69112

86616

366

11.73

1688 powershell_ise







254

9

4684

9940

86

11.31

6136 RuntimeBroker




285

14

4116

4724

84

10.19

5252 taskhostex




82

5

2008

6148

55

7.52

2416 conhost




305

14

17608

5088

184

5.19

404 IAStorIcon




337

8

2180

536

76

4.79

376 InputPersonalization










82

5

2008

6148

55

7.52

2416 conhost




305

14

17608

5088

184

5.19

404 IAStorIcon




337

8

2180

536

76

4.79

376 InputPersonalization




409

12

4416



5464

79

4.26

5276 taskhost







C:\test\proc.txt:19: 346

13

39576

44540

207

3.15

280 powershell







125

5

2820

744

70

2.61

908 splwow64




347

13

12180 

804

183

2.40

4788 PopUp_DM




335

10

2576

1756

83

2.20

4636 AdobeARM




249

21

6628

540

129

1.44

5220 SRSPremiumPanel






387

11

3436

12280

83

0.94

3828 WSHost 


  Not the greatest of displays but you do get to see the data. It should be possible to do this through PowerShell"™s formatting system but that"™s a post for another day.


  Bottom line "“ the context parameter only displays unique lines so you won"™t necessarily get what you expect if there are multiple matches in a file.


[![](http://feeds.wordpress.com/1.0/comments/richardspowershellblog.wordpress.com/2788/)](http://feeds.wordpress.com/1.0/gocomments/richardspowershellblog.wordpress.com/2788/)![](http://stats.wordpress.com/b.gif?host=richardspowershellblog.wordpress.com&blog=16267735&%23038;post=2788&%23038;subd=richardspowershellblog&%23038;ref=&%23038;feed=1)
