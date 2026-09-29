---
title: The PowerShell Podcast From Burnout to Buy In, Justin Grote on Building in the Age of AI Agents
author: Andrew Pla
authors:
  - Andrew Pla
  - Justin Grote
date: "2026-09-28T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/4bwusb5bjqwca76p/The_PowerShell_Podcast_episode_248_Justin_Grote6anx4.mp3"
episode: 248
youtube: MsgZoIKYnY0
guid: powershellpodcast.podbean.com/334241e9-dd22-3040-a634-a2cc4d732f8a
aliases:
  - /2026/09/the-powershell-podcast-from-burnout-to-buy-in-justin-grote-on-building-in-the-age-of-ai-agents/
---

Justin Grote (posh.guru) rejoins the PowerShell Podcast a year after his last appearance to talk about how fast the agentic AI world has moved since then. He walks through his experiments with the agent host protocol, running coding agents in isolated dev boxes and spot VMs so a stray command can only trash a container instead of his laptop. He and Andrew dig into what a "harness" actually is, how tools like these steer raw model output into something useful, and why that shift pushed Justin into a real existential dip this past summer, wondering what the point of hand building modules is when an agent can spin one up on demand. He works through how he came out the other side (doing it for the love of the game and the community), then gets into the practical stuff: a from-scratch C# rewrite of ModuleFast that cut Az module install time from seven seconds to three, the ExcelFast beta for slinging PowerShell objects in and out of Excel, and how he's tuning prompts using VS Code's new debug view and token caching. They also cover the rise of agent plugins (bundled skills plus MCP), his favorite lightweight plugin Ponytail, and Justin's read on where PowerShell fits once AI can talk to APIs directly. The conversation closes on advice for people getting into PowerShell right now and where to find Justin online.

Key Takeaways:

- Agentic coding is moving fast enough that "harnesses" (the coordination layer around an LLM, like GitHub Copilot or Claude Code CLI) matter as much as the underlying model, and running agents in isolated dev boxes or spot VMs lets you hand over real autonomy without real risk.
- Feeling threatened by AI generating modules on the fly is common right now. Justin's answer was to keep building for the love of the craft and the community rather than chasing relevance.
- PowerShell's role is shifting from "the way you talk to a computer" toward a rapid prototyping and troubleshooting tool that both humans and AI agents reach for, especially anywhere a GUI or a full compiled language is overkill.

Guest Bio:

Justin Grote is a PowerShell MVP and the author of ModuleFast and ExcelFast, along with other tools in the PowerShell ecosystem like PoshNmap and several SecretManagement extensions. He works for a managed services provider and has been a fixture of the PowerShell community for years, known online as posh.guru.

Resource Links:

Justin Grote on GitHub [https://github.com/JustinGrote](https://github.com/JustinGrote)
Justin Grote on Bluesky (posh.guru) [https://bsky.app/profile/posh.guru](https://bsky.app/profile/posh.guru)
ModuleFast [https://github.com/JustinGrote/ModuleFast](https://github.com/JustinGrote/ModuleFast)
ExcelFast [https://github.com/JustinGrote/ExcelFast](https://github.com/JustinGrote/ExcelFast)
Ponytail (the agent plugin Justin mentioned) [https://github.com/DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)
PowerShell Discord [https://discord.com/invite/powershell](https://discord.com/invite/powershell)
