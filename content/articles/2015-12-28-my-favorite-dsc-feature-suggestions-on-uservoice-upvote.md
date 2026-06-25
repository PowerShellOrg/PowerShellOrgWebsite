---
title: My Favorite DSC Feature Suggestions on UserVoice (upvote!)
authors:
  - Don Jones
date: "2015-12-28T19:35:27+00:00"
categories:
  - PowerShell for Admins
aliases:
  - /2015/12/my-favorite-dsc-feature-suggestions-on-uservoice-upvote/
---

Hopefully, you're aware that Microsoft is moving to UserVoice for accepting feature requests and bugs. [DSC in particular has 30-odd suggestions at present][1], and I thought I'd run through some of my fav's. Log in and up-vote the ones you like, or add comments to expand the discussion!

  * [Add Maintenance Windows Awareness to DSC/LCM][2]. This is one of mine, but it came from several customer suggestions.
  * [Change the Pull Server database to SQL Server][3]. Broadly, this is a great idea. In theory, you should be able to modify the web.config file and direct it to a SQL Server already, but nobody knows the database schema that the pull server expects.
  * [Refactor the LCM's validation logic][4]. This is another of mine, and it's crucial. Right now, only the LCM can validate multiple partial configs and tell you if there's a validation problem like a duplicate key. This means our only possible point of failure is the target node, which is the worst possible place for that to be. Factoring the logic out would let us built a pull server that could combine multiple configurations _server-side, _and spit out a combined, pre-validated MOF for the target to consume. We could also use the configuration logic to manually combine and validate MOFs in a test or RSoP mode, perhaps with a cmdlet.

There's plenty more - have a look, vote for ones you like, and add your own suggestions! And there's a lot more besides DSC in there - see anything that you think is important?

 [1]: https://windowsserver.uservoice.com/forums/301869-powershell/category/148047-desired-state-configuration-dsc
 [2]: https://windowsserver.uservoice.com/forums/301869-powershell/suggestions/11088780-add-maintenance-window-awareness-to-dsc-lcm
 [3]: https://windowsserver.uservoice.com/forums/301869-powershell/suggestions/11088516-change-from-edb-file-to-sql-server-database-for-de
 [4]: https://windowsserver.uservoice.com/forums/301869-powershell/suggestions/11088813-enable-proactive-validation-of-partial-configurati
