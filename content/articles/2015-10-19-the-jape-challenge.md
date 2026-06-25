---
title: The JAPE challenge
authors:
  - Carlo Mancini
date: "2015-10-19T08:58:34+00:00"
categories:
  - PowerShell for Developers
aliases:
  - /2015/10/the-jape-challenge/
---

I have wanted to write my very own obfuscated e-mail signature for a long time but kept myself from doing it. At the time I thought of all these lines of obfuscated code that people wrote during competitions such as the _International Obfuscated C Code Contest (IOCCC)_ or the _Obfuscated Perl Contest_ as beyond interest.

Then I started competing in the Scripting Games, and some tasks involved writing Powershell oneliners that required **mastering the use of the pipeline** as a tool to refine what each cmdlet passed to another. Once I added a few aliases to these oneliners - which sometimes happened to involve pretty arcane regular expressions - I often came back with hard-to-read and impossible-to-maintain pieces of Powershell code. But, hey, this was fun!

So, today I have reviewed my point of view. I have understood that reading and understanding obfuscated code can be an interesting **mental challenge.** And being able to write it is a game I like to play.

Last week I was writing an [article exploring different ways to implement primality tests in Powershell](http://www.happysysadm.com/2015/10/powershell-gymnastics-prime-numbers.html). In the last part of that article I show how to port to Powershell a powerful Perl onliner that can find prime numbers only by matching strings whose length is not prime.

This Perl oneliner, originally written by Abigail, is part of a collection of famous **JAPHs** - Usenet posting signatures in the 90s - that will output the text '_Just another Perl Hacker,_' to screen.

When you have a look at some of these JAPHs (there is a canonical list on CPAN.org), you can see how it can actually be surprisingly difficult to write truly breathtaking obfuscated code.

Having said all that, I have come up with the idea of starting some kind of similar challenge around Powershell.

## Write your JAPE

The challenge consists of writing the most intricate, illegible, awe-inspiring piece of code you can think of, which prints the text '_JUST ANOTHER POWERSHELL ENTHUSIAST,_'.

Feel free to post your contribution in the comments. The rules are:

  1. the code has to be carefully formatted to fit into max four lines of max 77 characters each, in the style of a Usenet signature
  2. the comma at the end of the string is mandatory (hey, we are just adding ourselves to the basket!)
  3. letter case in the output is not important, so you can go for pOwErShElL if you feel like it
  4. every JAPE has to be presented in the canonical list format, with a date and author attribution

Rule 1 can be thrown out of the window in case you want to go artistic, as in this notable Perl JAPH by Kickstart:


`#Kickstart from http://www.perlmonks.com/
#note: a slight valentine variation :)
      $LOVE=               AMOUR.
    true.cards.        ecstacy.crush
  .hon.promise.de    .votion.partners.
 tender.truelovers. treasure.affection.
devotion.care.woo.baby.ardor.romancing.
enthusiasm.fealty.fondness.turtledoves.
lovers.sentiment.worship.sweetling.pure
attachment.flowers.roses.promise.poem;
 $LOVE=~ s/AMOUR/adore/g; @a=split(//,
  $LOVE); $o.= chr (ord($a[1])+6). chr
   (ord($a[3])+3). $a[16]. $a[5]. chr
    (32). $a[0]. $a[(26+2)]. $a[27].
      $a[5].$a[25]. $a[8].$a[3].chr
        (32).$a[29]. $a[8].$a[3].
          $a[62].chr(32).$a[62].
           $a[2].$a[38].$a[4].
               $a[3].'.';
                 print
                  $o;
`Now, the most notable contributions will be added to the **JAPE Hall of Fame** below.

**Do come up with some interesting piece of 'educational' code, and let's see what creative minds we have here. And remember to have fun!**

To start with, I have decided, with the consent of the author, that the first JAPE be one by Lee Holmes. Even if it breaks the rule of outputting 'JUST ANOTHER POWERSHELL ENTHUSIAST,', it's probably the first Powershell obfuscated code I have ever seen. Hence the index 0.

## JAPE Hall of Fame

Index: $jape[0] - Author: Lee Holmes - Date: June 6th, 2007


`$ofs="";
'"$(0'+
  '..(0'+
    'xa*['+
      'Math'+
        ']::R'+
          'ound'+
            '([Ma'+
              'th]:'+
                ':Pi/'+
                  '2,1)'+
                    ')|%{'+
                      '[cha'+
                        'r][i'+
                          'nt]"'+
                            '"$($'+
                              '("""'+
                                '"0$('+
                                   '1838'+
                                   '1589'+
                                '*726'+
                              '371*'+
                            '60)$'+
                          '(877'+
                        '7365'+
                      '981*'+
                    '263*'+
                  '360)'+
                '$(22'+
              '2330'+
            '793*'+
          '1442'+
        '99)$'+
      '(310'+
    '9*37'+
  ') ""'+        '"")[' + '($_*' + '3)..' +
'($_*'+        '3+2)' + '])""' + ' })"'|iex
`Here's my first JAPE as a very basic example to start with. It's a signature block composed of 4 lines of 59 chars.

Index: $jape[1]  - Author: Carlo - Date: October 9th, 2015


`([regex]::Matches(",{0}S{1}I{2}U{3}T{4}E{5}L{6}E{7}S{8}E{9}
O{10} {11}E{12}T{13}N{14} {15}S{16}J" -f 'T!A$S!H$N! $L!H$R
!W$P!R$H!O$A!T$U'.split('!|$',[System.StringSplitOptions]::
RemoveEmptyEntries),'.','RightToLeft')|%{$_.value}) -join''
`References:

  * [http://www.leeholmes.com/blog/2007/06/06/obfuscated-powershell/](http://www.leeholmes.com/blog/2007/06/06/obfuscated-powershell/)
  * [http://www.happysysadm.com/2015/10/powershell-gymnastics-prime-numbers.html](http://www.happysysadm.com/2015/10/powershell-gymnastics-prime-numbers.html)
  * [http://www.cpan.org/misc/japh](http://www.cpan.org/misc/japh)
  * [http://www.happysysadm.com/p/jape.html](http://www.happysysadm.com/p/jape.html)

Contact me:

  * Twitter [@sysadm2010](https://twitter.com/sysadm2010)
