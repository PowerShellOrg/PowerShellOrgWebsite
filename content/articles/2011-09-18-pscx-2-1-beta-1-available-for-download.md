---
title: PSCX 2.1 Beta 1 Available for Download
authors:
  - Keith Hill
date: "2011-09-19T04:17:17+00:00"
aliases:
  - /2011/09/pscx-2-1-beta-1-available-for-download/
---

I just uploaded beta 1 for the PowerShell Community Extensions version 2.1.  This beta drop adds better support for Windows PowerShell V3 that is in the Windows 8 Developer Preview.  There are a number of bug fixes in this drop:

  * 28023 Read-Archive : Cannot bind parameter 'Path'. Cannot convert the ... value of type "System.String" to type "Pscx.IO.PscxPathInfo". 
      * 28198 Test-XML not validating xml against schema correctly 
          * 28964 Get-FileTail access conflict 
              * 29255 Get-HttpResource Timeout Bug 
                  * 29598 String – PscxPathInfo ParameterBindingException 
                      * 30169 Invoke-Ternary example doesn't work 
                          * 30921 Invoke-Elevated demands arguments

                        You can download the beta from [here][1].

                        [![](http://feeds.wordpress.com/1.0/comments/rkeithhill.wordpress.com/232/)](http://feeds.wordpress.com/1.0/gocomments/rkeithhill.wordpress.com/232/)![](http://stats.wordpress.com/b.gif?host=rkeithhill.wordpress.com&blog=18780344&%23038;post=232&%23038;subd=rkeithhill&%23038;ref=&%23038;feed=1)

 [1]: http://pscx.codeplex.com/releases/view/73566
