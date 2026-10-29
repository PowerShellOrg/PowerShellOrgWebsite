---
title: The PowerShell Podcast Night of the Living Certificates with Jake Hildreth
author: Andrew Pla
authors:
  - Andrew Pla
  - Jake Hildreth
date: "2026-10-26T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/g4mgdqqfvvjcaek6/The_PowerShell_Podcast_episode_252_Jake_Hildrethad73d.mp3"
episode: 252
youtube: ik4hlES4Uwc
guid: powershellpodcast.podbean.com/68cfc51f-f3e3-3f88-9f9c-d888ee1d2a0a
aliases:
  - /2026/10/the-powershell-podcast-night-of-the-living-certificates-with-jake-hildreth/
---

It's the Halloween episode, and Jake Hildreth is back to raise the dead. Fresh off Wild West Hackin' Fest in Deadwood, South Dakota (a town of 1,100 people that welcomes 1,200 hackers, a mechanical bull, and a round of Hacker Feud), Jake walks Andrew through his talk. The talk idea is simple and kind of brilliant: one tool to build a vulnerable AD CS lab, one tool to attack it, and one tool to defend and fix it. He also shares the very real story of ripping the auto-pwn pieces out of ESCalator four days before the talk and finishing his demos 45 minutes before showtime.

Then things get spooky. Jake explains "zombie certificates," a persistence risk he uncovered while feeding RFCs and open spec docs into an LLM-built wiki and hunting for mismatches. A single registry value meant for testing and troubleshooting flips certificate revocation checking from fail closed to fail open. Pair that with the CA's disable extension list, strip the CRL address off a certificate, and you've got a cert you can revoke all day long that still lets an attacker walk right back in. The good news is the fix is straightforward hygiene. Along the way, Jake and Andrew talk about the full circle moment of thanking the person who got Jake into AD security, why sharing what you learned yesterday matters, and how a little mentoring can change someone's whole career path.

Key Takeaways:

- Testing settings have a way of becoming permanent. A registry value meant for troubleshooting smart card logon can quietly turn certificate revocation into a fail open situation, so audit your domain controllers for it and only use it when you're actively testing.
- Certificates that can't be checked can't be killed. Keep the CA's disable extension list clean and make sure revocation info stays on your certificates, or revoking a compromised cert may do absolutely nothing.
- Learn it, then teach it. Jake turned years of AD CS work into tools, talks, workshops, and courses, and the people he's helped are now paying it forward with content of their own.

Guest Bio:

Jake Hildreth is a Principal Security Consultant at Semperis, a Microsoft MVP in both PowerShell and Identity/Access, and a recovering sysadmin with 25 years of IT under his belt. He's probably best known for building Locksmith, the open-source AD CS auditing and remediation tool, but he's also the creator of Stepper, Deck, BlueTuxedo, and PowerPUG! — a suite of tools designed to make identity security a little less painful for the admins who live in it. When he's not untangling Kerberos or chasing down ADCS misconfigurations, and can usually be found saying ridiculous things in the PDQ Discord's #off-topic channel.

Resource Links:

- Battling Zombie Certificates: The Persistent Risk Lurking in AD CS (Semperis blog): [https://www.semperis.com/blog/how-to-battle-zombie-certificates-persistent-ad-cs-risk/](https://www.semperis.com/blog/how-to-battle-zombie-certificates-persistent-ad-cs-risk/)
- Jake Hildreth's Website: [https://jakehildreth.com](https://jakehildreth.com)
- Jake's Blog: [https://blog.dotdot.horse](https://blog.dotdot.horse)
- Jake's GitHub: [https://github.com/jakehildreth](https://github.com/jakehildreth)
- ADCSGoat (Deliberately Vulnerable AD CS Lab): [https://github.com/jakehildreth/ADCSGoat](https://github.com/jakehildreth/ADCSGoat)
- ESCalator (AD CS Issue Combination Finder): [https://github.com/jakehildreth/ESCalator](https://github.com/jakehildreth/ESCalator)
- Locksmith (AD CS Auditing and Remediation): [https://github.com/jakehildreth/Locksmith](https://github.com/jakehildreth/Locksmith)
- Wild West Hackin' Fest: [https://wildwesthackinfest.com](https://wildwesthackinfest.com)
- Hybrid Identity Protection Conference (HIP Conf): [https://www.hipconf.com](https://www.hipconf.com)
- CodeMash: [https://www.codemash.org](https://www.codemash.org)
