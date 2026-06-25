---
title: Documenting your PowerShell API–solved!
authors:
  - msorens
date: "2016-04-29T22:01:52+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tips and Tricks
  - Tools
  - Tutorials
aliases:
  - /2016/04/documenting-your-powershell-api-solved/
---

Long has it been known how to easily document your PowerShell source code simply by embedding properly formatted documentation comments right along side your code, making maintenance relatively painless...  

![Sample Doc-Comments for PowerShell source](https://powershell.org/wp-content/uploads/2016/04/ps-doc-comment-sample.png)  
But if you advanced to writing your PowerShell cmdlets in C#, you have largely been on your own, either hand-crafting MAML files or using targeted MAML editors far removed from your source code. **But not anymore.** With the advent of Chris Lambrou's open-source **XmlDoc2CmdletDoc**, the world has been righted upon its axis once more: it allows instrumenting your C# source with doc-comments just like any other C# source:  
![csharp doc-comment sample](https://powershell.org/wp-content/uploads/2016/04/csharp-doc-comment-sample-628x422.png)  
All of the above provides fuel for Get-Help, i.e. providing help one cmdlet at a time. But we are a civilized people; we also need a web-based version of our full custom PowerShell API. That is, a hierarchical and indexed set of Get-Help pages for all the cmdlets in our module. For this task, my own open-source effort, **DocTreeGenerator**, nicely fills the gap, requiring very little beyond the doc-comments described above to do the complete job.  
I have written extensively on using both XmlDoc2CmdletDoc and DocTreeGenerator, and just this week, released a one-page wallchart that shows how all the pieces work together:  
![doc wallchart thumbnail](https://powershell.org/wp-content/uploads/2016/04/doc-wallchart-thumbnail-628x409.png)  
Here's the link to get you started on this fun journey:  
[Unified Approach to Generating Documentation for PowerShell Cmdlets][1]

 [1]: https://www.simple-talk.com/sysadmin/powershell/unified-approach-to-generating-documentation-for-powershell-cmdlets/
