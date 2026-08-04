---
title: The PowerShell Podcast Engineering AD from the Ground Up So Security Is Not an Afterthought with Evgenij Smirnov
author: Andrew Pla
authors:
  - Andrew Pla
  - Evgenij Smirnov
date: "2026-08-03T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/raz5xyccz46k5g8i/The_PowerShell_Podcast_episode_239_Evgenij_Smirnov8tqdc.mp3"
episode: 239
youtube: EQb7H6vBOtg
guid: powershellpodcast.podbean.com/77dd4bcd-aa10-3047-b5a2-9284516686ac
aliases:
  - /2026/08/the-powershell-podcast-engineering-ad-from-the-ground-up-so-security-is-not-an-afterthought-with-evgenij-smirnov/
---

Andrew sits down with Evgenij Smirnov, a Berlin-based IT veteran with 30 years of experience in Active Directory and security consulting, to dig into what actually gets organizations popped. Evgenij walks through the most common escalation paths he sees in real-world AD environments, including over-permissioned accounts, exposed certificate authorities, and unencrypted domain controller backups, and explains how attackers chain these together to produce golden tickets and gain god-mode access. The conversation covers why these misconfigurations keep happening (bad defaults, lazy vendors, and a long history of "just click next"), how PowerShell fits into both hardening and attack scenarios, and what proper tier isolation actually looks like when you implement it with both authentication policies and user rights assignments. Evgenij also introduces his book, Building Modern Active Directory, and makes the case for treating security not as a chapter you can skip, but as something baked into the design from day one.

Key Takeaways:

- The most common Active Directory escalation paths are not sophisticated. Over-permissioned accounts with ACL chains to DC sync, exposed certificate authorities, and unencrypted backup tapes are consistently the entry points attackers exploit. If you can find these first, you are already ahead of most threat actors.
- Tier isolation done right requires both authentication policies and user rights assignment policies working together. Either technique alone leaves a blind spot that a determined attacker can walk through.
- Cybersecurity is a team sport, and bad cybersecurity is too. Microsoft ships AD with questionable defaults, vendors demand domain admin for service accounts, and administrators make shortcuts under pressure. The fix is not one heroic hardening sprint; it is a culture of least privilege built into every decision from the start.

Guest Bio:

Evgenij Smirnov is a Principal Solutions Architect at Semperis and a Microsoft MVP in both Security and PowerShell since 2020. Based in Berlin, Germany, he has spent more than 30 years in IT and security consulting, with deep expertise in Active Directory, identity security, and hybrid infrastructure. He is a longtime community leader, running the PowerShell User Group Berlin and the Windows Server User Group Berlin, and a regular speaker at conferences including PSConfEU. He is the author of Building Modern Active Directory, published by Apress in 2024.

Resource Links:

Building Modern Active Directory (book site): [ad2049.com](http://ad2049.com)

Evgenij's personal blog): [it-pro-berlin.de](http://it-pro-berlin.de)

Evgenij on LinkedIn: [linkedin.com/in/evgenijsmirnov](https://www.linkedin.com/in/evgenijsmirnov)

ADMF (Active Directory Management Framework) on GitHub: [github.com/ActiveDirectoryManagementFramework/ADMF](https://github.com/ActiveDirectoryManagementFramework/ADMF)

ADMF documentation and project site: [admf.one](https://admf.one)

Attack Scenario To Go: [https://github.com/HerrHoZi/AS2Go](https://github.com/HerrHoZi/AS2Go)
