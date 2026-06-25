---
title: "High-Level: Designing Your PowerShell Command Set"
authors:
  - Don Jones
date: "2016-06-20T10:27:41+00:00"
categories:
  - PowerShell for Developers
aliases:
  - /2016/06/high-level-designing-your-powershell-command-set/
---

So you've decided to write a bunch of commands to help automate the administration of ____. Awesome! Let's try and make sure you get off on the right path, with this high-level overview of command design.

## Start with an inventory

You'll need to start by deciding _what commands to write, _and an inventory is often the best way to begin. Start by inventorying your nouns. For example, suppose you're writing a command set for some internal order-management system. You probably have nouns like Customer, Employee, Order, OrderItem, CustomerAddress, and so on. Write 'em all down in an Excel spreadsheet, one noun per row.  
Then inventory your verbs. For each noun, what can you do with it? For example, you can probably create orders, so a New-Order command will be needed. Make a "New" column in your spreadsheet, and put an "X" in the row next to the Order noun. However, you probably can't _remove_ an order from the system, so although your spreadsheet might have a "Remove" column to cover things like Remove-Employee, that column won't get an "X" in the Order row. Orders might be voidable, though, so what's a good verb for that? <https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx> has the official verb list, but there's no "Void" or "Cancel" that seems appropriate. Don't go making up new verbs!!! Instead, it might be that Set-Order could be the answer, enabling approved changes to orders, including cancelling them (but retaining the record).  
Finally, pick a prefix for your nouns. If your order system is named "Order Awesomeness," then maybe OAwe is a good noun prefix, as in Set-OAweOrder. The prefix will help keep your command names from bumping up against other people's, so making sure that noun prefix is pretty unique... is pretty important.

## Design individual commands

Now it's time to start designing individual commands. This is usually a kind of iterative process, meaning you'll go back and change your mind, expand, and so on a few times before you're done.  
Start by _writing examples of how each command will be used_ to accomplish whatever tasks you'll be accomplishing. Save these examples, too - they should become examples in your commands' help files. Write as many examples as possible, covering as many situations and needs as you can think of. Enlist users to help.  
As you write the examples, try to pay attention to the following:

  * Parameter names should be consistent across the commands. If order objects have an ID, and you need to be able to specify it, then it should be something like -OrderId every time. Don't use -OrderId on some commands and -Id on thers. Also pay attention to what the underlying software objects' property names are. For example, if customer names are exposed through a CustNameFirst and CustNameLast property, consider using those as corresponding parameter names, or at least as parameter name aliases.
  * Start thinking about which parameters are going to be mandatory.
  * Give some thought to different ways that commands might be used, and start denoting those as different parameter sets.

This kind of example-based specification will help you think through how you want the commands to work, and it may highlight cases where you need more commands, where commands may need to be combined, and so on.

## Sketch out your help files

Believe it or not, it's not a bad idea to start drafting out your help files at this point. Define parameter sets, parameters, and examples. Briefly describe what each parameter is for - you can always make the language nicer and more formal later, so just a brief draft should work at this point. This kind of forces you to think through how your commands will work, and how other people will end up approaching them. It also gives you a good start on writing documentation! "Documentation as specification" helps a lot of people write specs that can end up being repurposed as docs, killing two birds with one stone.

## Define expected results

Go back to your examples, and provide some examples of the results you'd expect to see if you actually ran those commands as shown in your examples. This helps you to start defining the tests that you'll run against your code. "For this command, we should get this output" is exactly what testing is all about. "This command should generate this error, this command should do this," and so on.

## Start coding

With some good design work out of the way, you can start coding. Not just your commands, mind you, but also the Pester tests you'll use to validate those commands. Code 'em at the same time, if you like, and use those tests in unit testing as you work.
