---
title: Delete Specific E-Mail or E-Mails From All Exchange Mailboxes
authors:
  - Steve Parankewich
date: "2015-10-02T15:27:10+00:00"
categories:
  - PowerShell for Admins
  - Tips and Tricks
aliases:
  - /2015/10/delete-specific-e-mail-or-e-mails-from-all-exchange-mailboxes/
---

Well this is week number two in my quest to post an article once a week and I am back with a common request for Exchange administrators. There are a lot of scenarios that bring up a need to remove an e-mail or e-mails from all mailboxes in your environment. Perhaps there was a disgruntled employee, a virus outbreak, or a reply all to the whole company. We all know that the "Retract" button is best effort (yes I still miss GroupWise for that purpose).

As always we can turn to PowerShell for our scripting needs. The Search-Mailbox command is your best friend for these scenarios. With a simple Get-Mailbox | Search-Mailbox you can take control of all your mailboxes. Be extremely cautious when executing, with great power comes great responsibility. For a full run down on how to accomplish this head on over to [PowerShellBlogger.com][1]. I look forward to seeing everyone again next week!

 [1]: http://powershellblogger.com/?p=117
