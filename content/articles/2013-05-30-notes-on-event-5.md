---
title: Notes on Event 5
author: Art Beane
authors:
  - Art Beane
date: "2013-05-30T13:54:17+00:00"
aliases:
  - /2013/05/notes-on-event-5/
---

Into the home stretch and the entries just keep getting better! The only advice I'd like to offer this time is to be careful to read the instructions carefully. They included the specific folder where the files were located and I noticed several misinterpretations in the scripts. Some included a mandatory Path parameter and others had a default Path that was not the specified folder. Including an optional Path with the correct default would certainly be acceptable, but not those variations.  
The instructions also included some ambiguity about what the log file actually contains. Was the client IP address in the first column (as specified in the instructions) or in a different column (as presented in the example logs)? There were a number of entries that just searched the logs for IP addresses and returned all of them. This approach would not be able to distinguished between the client and server addresses, which would give a wrong answer. Another approach searched for the "c-ip" column, but this would only work if the log files were as in the samples. Another method, select the second IP address in a line would also only work on the sample log style. There weren't many entries that supported both file types, but one of them did it in a very concise manner, checking the first and ninth columns for an IP address and selecting the correct one.  
Most of the entries used _Sort-Object -Unique_ or _Select-Object -Unique_ to eliminate duplicates, which was the first approach that I thought of. There were several entries, however, that used alternate methods that I thought were quite clever applications of PowerShell technology: hash tables with the IP address as the key, and _Group-Object_ on the IP address. Both options provided a fairly simple way to also report the instance count for each address.  
Returning an instance count sounds like an interesting option, but after thinking about it some more, I'm not so sure. Counts of the number of sessions and the hits per session would be much more interesting than the raw hits count. But that's way, way beyond the scope of this event.  
Anyway, just one more event to go. I'm expecting a spectacular finish!
