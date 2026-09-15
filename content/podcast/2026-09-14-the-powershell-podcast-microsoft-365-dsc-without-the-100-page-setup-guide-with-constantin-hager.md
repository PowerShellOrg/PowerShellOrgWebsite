---
title: The PowerShell Podcast Microsoft 365 DSC Without the 100 Page Setup Guide with Constantin Hager
author: Andrew Pla
authors:
  - Andrew Pla
  - Constantin Hager
date: "2026-09-14T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/ckdtu932g9skteh5/The_PowerShell_Podcast_episode_246_Constantin81603.mp3"
episode: 246
youtube: Vy4kaayGT2M
guid: powershellpodcast.podbean.com/41fb9672-0b27-337c-8c09-13d664555b85
aliases:
  - /2026/09/the-powershell-podcast-microsoft-365-dsc-without-the-100-page-setup-guide-with-constantin-hager/
---

Andrew welcomes back Constantin Hager, a senior systems engineer, PowerShell User Group organizer, and brand new Microsoft MVP. They open by revisiting Constantin's infamous "size of a finger" intro from his first appearance, then dig into his talks at PSConfEU this year on dev containers with GitHub Codespaces and on Maester, the testing framework for M365 and on-prem AD. A quick detour into the GitHub vs. GitLab vs. Codeberg debate leads into the main event: a deep breakdown of Microsoft365DSC, what it actually does, how it treats M365 tenant settings like Intune, Entra, and Exchange as idempotent, drift-monitored code, and how the M365DSC Workshop wraps the notoriously painful setup process into a lab folder anyone can run. They cover the workshop's multi-tenant design, its DSC Community roots, and the honest limitations, like settings that still aren't exposed through public APIs. Constantin also shares his organic path to becoming an MVP, updates on his user group's shift to English-language talks, and a heads up on an upcoming blog series diving deeper into M365DSC. They close with news on the free PSConfEU MiniCon, happening October 13th with the CFP open until September 25th.
Key Takeaways:

- Microsoft365DSC turns M365 tenant configuration into idempotent, drift-monitored code, and the M365DSC Workshop exists specifically to make the notoriously painful setup process approachable through a ready-to-run lab folder instead of a hundred-page whitepaper.
- Not everything in M365 is automatable yet. Settings without a public API (some Copilot controls, for example) still require manual portal fixes or an interactive token, so full automation has real gaps today.
- Constantin's MVP award grew out of years of showing up, organizing his user group, speaking at conferences, and opening GitHub issues, not out of being the loudest voice in the room.

Guest Bio:

Constantin Hager is a senior systems engineer based in Germany, organizer of the PowerShell User Group Inn-Salzach, and a newly awarded Microsoft MVP. A returning guest of the podcast, he's known for his enthusiasm around dev containers, PSFramework, and now Microsoft365DSC.

Resource Links:

Constantin Hager on LinkedIn [https://www.linkedin.com/in/constantin-hager/](https://www.linkedin.com/in/constantin-hager/)
Constantin's blog, The IT Guide [https://the-itguide.de](https://the-itguide.de)

PowerShell User Group Inn-Salzach (Meetup) [https://www.meetup.com/de-DE/powershell-usergroup-inn-salzach/](https://www.meetup.com/de-DE/powershell-usergroup-inn-salzach/)
Maester (M365 and Entra security testing framework) [https://maester.dev/](https://maester.dev/)
Microsoft365DSC official site [https://microsoft365dsc.com](https://microsoft365dsc.com)
Microsoft365DSC on GitHub [https://github.com/microsoft/Microsoft365DSC](https://github.com/microsoft/Microsoft365DSC)
M365DSC whitepaper and CI/CD pipeline scripts [https://github.com/ykuijs/M365DSC_CICD](https://github.com/ykuijs/M365DSC_CICD)
DSC Community [https://dsccommunity.org](https://dsccommunity.org)
PSConfEU [https://psconf.eu](https://psconf.eu)
PSConfEU MiniCon Call for Papers (Sessionize) [https://sessionize.com/psconfeu-minicon/](https://sessionize.com/psconfeu-minicon/)
