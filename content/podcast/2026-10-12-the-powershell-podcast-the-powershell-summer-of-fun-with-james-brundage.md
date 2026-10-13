---
title: The PowerShell Podcast The PowerShell Summer of Fun With James Brundage
author: Andrew Pla
authors:
  - Andrew Pla
  - James Brundage
date: "2026-10-12T14:00:00+00:00"
podcast_url: "https://mcdn.podbean.com/mf/web/n6ir5psye3ut38jv/The_PowerShell_Podcast_episode_250_James_Brundage7acig.mp3"
episode: 250
youtube: WLEo6EjZqFM
guid: powershellpodcast.podbean.com/f7ec5daf-0741-3e5c-8308-d9f9d676d9a6
aliases:
  - /2026/10/the-powershell-podcast-the-powershell-summer-of-fun-with-james-brundage/
---

Andrew sits down with longtime PowerShell legend James Brundage to recap what he calls his "summer of fun," a stretch of side projects that prove PowerShell can go way further than most of us ever thought to push it. James kicks things off with Wave, a module for creating and manipulating real .wav files in the object pipeline. Once you see audio as a sine wave and some math, you can generate notes, play music, and even draw animated SVG waves straight from PowerShell.

From there, the tour keeps rolling. MarkX turns Markdown into queryable XML so you can pull out code blocks or turn Markdown tables into typed data tables. James also shares how a vibe coded Wolfenstein 3D style clone in PowerShell (that got pulled from the internet after some tough feedback) sent him down the audio rabbit hole, and how he's collaborating with Bruce Payette on getting Braid to play nicely with PowerShell.

Then it gets visual. James walks through his Matrix module, which brings the transformation matrices already baked into .NET over to PowerShell and CSS, and shows off a hallway of fake 3D depth built entirely with PowerShell generated SVG. He explains the simple trick behind PowerShell static sites (a .html.ps1 script that spits out HTML, plus a ToString or HTML property on your objects) and shares Fun, a tiny web server where any function named with a leading slash becomes a web page. The episode wraps with a promise of a Part 2, because there is clearly way more to cover.

Key Takeaways:

- PowerShell can do a lot more than most of us assume. Audio waveforms, Markdown as queryable data, matrix transforms, and fake 3D graphics are all fair game once you understand the small piece of math or tech underneath.
- Static websites in PowerShell have been possible since version 1. Redirect output from a .html.ps1 script to a file, and add a ToString or HTML property to your objects so they render nicely on the web instead of dumping text in a terminal.
- With the Fun module, naming a function with a leading slash turns it into a route on a local PowerShell web server, which makes web experiments quick and low stakes.

Guest Bio:

James Brundage is a former Microsoft engineer and one of the most prolific PowerShell developers around, known through his company Start-Automating and the handle MrPowerShell. He is the author of a long list of open source modules, including RoughDraft for multimedia work with FFMpeg, and he founded the PoshWeb GitHub organization to bring together open source PowerShell web development projects. James is currently heads down on creative projects around PowerShell web development, audio, and graphics.

Resource Links:

PoshWeb GitHub organization (open to new contributors) [https://github.com/PoshWeb](https://github.com/PoshWeb)
Wave (work with wave files in PowerShell) [https://github.com/PoshWeb/Wave](https://github.com/PoshWeb/Wave)
MarkX (Markdown, XML, and PowerShell) [https://github.com/PoshWeb/MarkX](https://github.com/PoshWeb/MarkX)
Matrix (matrix transforms with PowerShell, CSS compatible) [https://github.com/PoshWeb/Matrix](https://github.com/PoshWeb/Matrix)
[ https://www.powershellgallery.com/packages/Matrix](https://www.powershellgallery.com/packages/Matrix)
Fun (a fun functional PowerShell server) [https://github.com/PoshWeb/Fun](https://github.com/PoshWeb/Fun)
James Brundage on GitHub [https://github.com/StartAutomating](https://github.com/StartAutomating)
James Brundage's website [https://MrPowerShell.com](https://MrPowerShell.com)
Previous PowerShell Podcast episode with Bruce Payette on PowerShell and Braid [https://pdq.com/resources/the-powershell-podcast/ep-82-exploring-powershell-braid-and-beyond-with-bruce-payette](https://pdq.com/resources/the-powershell-podcast/ep-82-exploring-powershell-braid-and-beyond-with-bruce-payette)
