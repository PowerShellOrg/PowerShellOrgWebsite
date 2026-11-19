---
title: "Why I Still Need the PowerShell ISE in a PowerShell 7 World"
description: "A production SQL Server DBA explains why VS Code never replaced the PowerShell ISE on locked-down servers, what PowerShell 7 left behind, and what he learned building his own ISE-style editor."
author: Keith Ramsey
authors:
- Keith Ramsey
date: "2026-11-12T00:00:00+00:00"
categories:
- PowerShell for Admins
tags:
- powershell-ise
- powershell-7
- editors
- parallelism
---

I'm a production SQL Server DBA. Where I work I hold rights on production that most people don't, so when something goes wrong on a live server, I'm usually the one logged in trying to work out why.

For that job I still open the PowerShell ISE, and I'm not being sentimental about it. VS Code never replaced it for me because I'm not allowed to have it there. VS Code is not permitted on our production servers, or on any server outside dev.

I don't blame anyone for that, because compliance and management are never going to put a development tool on every production machine. Ask for one as an admin and you get pointed at the DevOps tooling, which is a fair answer to a question I wasn't asking.

One disclosure before I go on. I ended up building my own ISE-style editor for PowerShell 7. It's called DetentShell, it's a paid product, and my company, Detent Point LLC, sells it. Weigh what follows with that in mind.

## The ISE was already on the server

Most of what I do with PowerShell on a server is investigating something live while somebody waits on the answer. Here's the kind of thing I mean:

- Mirroring endpoints go down. That's a network question, and I'm testing ports and paths between partners.
- RAM spikes on a box, and I'm sorting and filtering processes until one of them looks guilty.
- One cluster node behaves differently from the other. Now I'm comparing files across two machines that are supposed to match.

There's no repo and no pull request for any of that. I ask the server a question, look at the answer, and ask the next one, with my variables still sitting there so I can poke at them.

The ISE is built for that, and it's approachable. There's a script pane, a console pane, and a straightforward way to run selected code or the whole script. You can set breakpoints, inspect variables, and get command completion without spending much time thinking about the editor itself.

It also opens fast and ships with Windows, so it is on every server I work on that has the Desktop Experience. PowerShell 7 is not. Getting it onto a server takes approvals.

## PowerShell 7 left the ISE behind

[Microsoft has been clear about where the ISE stands](https://learn.microsoft.com/powershell/scripting/windows-powershell/ise/introducing-the-windows-powershell-ise). It is no longer in active feature development. It supports Windows PowerShell up to 5.1, and it does not support PowerShell 6 or 7.

The ISE is a .NET Framework application, and PowerShell 6 and 7 run on .NET Core, now just called .NET. I have never seen Microsoft publish what a port would take, so I won't guess at one.

The recommended replacement is VS Code with the PowerShell extension. Microsoft's own documentation also says the PowerShell extension [doesn't seek complete feature parity](https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/how-to-replicate-the-ise-experience-in-vscode) with the ISE. [The extension's README](https://github.com/PowerShell/vscode-powershell) says Windows PowerShell 5.1 is supported "only on a best-effort basis". VS Code even has an ISE mode that mimics the old layout, but it wasn't for me.

So the admin on a locked-down server has an editor that will never run PowerShell 7, and a recommended replacement that is not allowed on the box.

## Why I wanted PowerShell 7 anyway

For a long time, I could shrug at all this. PowerShell 6 broke enough code that staying on 5.1 was the safe call. Ten years on, that has changed. PowerShell 7 no longer breaks my code the way 6 did.

And it has one feature a DBA with a long server list cannot ignore, which is built-in parallelism:

```powershell
$servers | ForEach-Object -Parallel {
    Test-NetConnection -ComputerName $_ -Port 5022 -InformationLevel Quiet
} -ThrottleLimit 10
```

Do the arithmetic on a check that takes 5 seconds per server. Across 100 servers, one at a time, that is 500 seconds. At 10 concurrent it is about 50 on paper. That assumes the checks are independent and nothing is contending for the same resource, but most health checks fit that description. I run with a throttle limit of up to 20.

Windows PowerShell 5.1 can run work concurrently too. `Invoke-Command` fans out to remote machines, and jobs or hand-built runspaces cover the rest. In 7, I take an ordinary pipeline and make it parallel with one parameter, which is a lot less ceremony for "ask a hundred servers the same question."

And that's where I was stuck, because I could not learn PowerShell 7 on the job, where I had no editor for it.

## So I built one

DetentShell is a Windows desktop app: WPF on .NET, with AvalonEdit as the editor and the PowerShell SDK hosted in-process. Windows PowerShell 5.1 sessions run out of process, so both worlds live in one window.

As for the name, anything containing "PowerShell" was off limits, so it is named after my company, Detent Point.

Before I wrote any code, I had 76 engineering briefs across 20 epics, 20 behavioral acceptance scenarios, an architecture document, and an execution plan broken into waves. The design goal I wrote down was to "re-engage the PowerShell audience with their own tool that wows them and invites new users into the fold."

My guiding principle was to keep the application simple, even when I was tempted to add more features. The ISE earned its place by being small, and a full-featured editor would have missed the point.

Much of the plumbing was written with Claude Code, which left me with the architecture, the project management, proving it worked, and shipping it. Now that AI is turning the patching world into DEFCON 1, I'm putting DetentShell through every CI pipeline I have so it keeps pace with Microsoft's PowerShell updates and with vulnerability and penetration testing. I'm a contractor with the federal government, and I take all of that very seriously.

## What a PowerShell 7 editor has to get right

Building one forced me to write down the five things I had been taking for granted in the ISE.

Runspaces come first, because the session has to outlive the script. When I press Stop, the script should stop and everything I loaded should still be there. DetentShell's Stop button stops the script but keeps the session.

For IntelliSense, completion has to be live and has to know the commands actually present in that session. Help has to go deep enough that I'm not leaving the window to look up a parameter.

Admins need a debugger, with breakpoints and stepping, as much as developers do. When a script does something odd on one node and not the other, a debugger is how I find out.

A hosted console has to behave like a console. The plain example is `Read-Host`: when a script asks a question, the editor has to show a prompt and pass the answer back.

Server work is where an admin editor differs from a developer one. DetentShell has remote tabs, labeled user@computer, so I always know where a command is about to run. It bundles PowerShellGet and PSResourceGet, has a Format Script command, and is tested under Constrained Language mode, which matters on locked-down servers.

I added a guardrail of my own. A check flags 5.1-only habits such as `Get-WmiObject` and snap-ins, which is the kind of nudge I needed while learning 7. A second one is written and tested but not wired into the shipped app yet: a gentle warning when `Remove-Item`, `Stop-Service`, `Restart-Computer`, and similar commands appear without `-WhatIf` or `-Confirm`. It is on the list for the next release.

DetentShell has no AI features. If you install a module or run a command that talks to an AI service, that is your choice and your module doing it, exactly as it would be in the ISE.

## What I underestimated

Testing took far longer than the build. When most of the plumbing is written quickly, the question stops being "can I build it" and becomes "how do I know it works." On a tool people will point at production, that question deserves a real answer. Mine ended up looking like this:

- A release gate that runs before every build: unit tests with xUnit, FluentAssertions, and Moq, mutation testing with Stryker, and complexity and duplication checks.
- UI tests with FlaUI that click through the real app, 61 scenarios of them.
- Clean installs in Windows Sandbox with no PowerShell 7 present, installing the real Store package.
- Runs under Constrained Language mode.
- An accessibility pass with Axe.Windows. It found 74 issues. Twelve remain, and I have put out a call to anyone who is disabled or knows accessibility code to help me close the rest.

I underestimated publishing too. The app is packaged as MSIX and submitted through Partner Center, and my first upload bounced over the publisher's name. It took a few submissions to get through.

Microsoft never pushed back on the idea, though. They accepted it without resistance, and DetentShell is live in the Microsoft Store as a paid app with a free trial.

## Will it get approved?

A new editor does not make anyone's installation restrictions go away. I should be clear that my own organization has not approved DetentShell, and I have not asked. My company's software is kept separate from my contract work, and I intend to keep it that way. Anywhere else, DetentShell has to be approved like anything else. What I believe is that its footprint makes that a far shorter conversation than the one about a development platform. This is what I would put in front of a security reviewer:

- It is one package, a signed MSIX that passed Microsoft Store certification, and it installs and removes as a unit. It takes approximately 240 MB on disk.
- Windows Server has no Microsoft Store, so teams get the same code in an MSIX I sign myself, [directly from Detent Point](https://detentpoint.com/licensing/) and push it with Intune, Configuration Manager, or a manual install. The license is a local file checked offline. There is no activation server and no phone-home.
- That size includes its own .NET runtime and PowerShell 7 engine. I test clean installs on machines with no PowerShell 7 present, so neither has to be installed separately. A security team will still want to review that bundled runtime, and I ship new versions as PowerShell gets patched.
- PowerShellGet and PSResourceGet are already in the box.
- It is tested under Constrained Language mode, the mode many locked-down servers enforce.
- There are no AI features. The package installs no services and no startup or background tasks. Sitting idle it holds no network connections. It reaches the network only when you run something that does, such as `Install-Module` or your own scripts.
- There is no extension marketplace. Everything ships in the box, and PowerShell modules still install the usual way, with `Install-Module` from the PowerShell Gallery or your own repository.

None of that guarantees approval. A security team still has to evaluate the package, the bundled runtime, and how it will be used. What it gives them is one small, specific application to review, and that is an easier ask than a whole development environment.

## This is not an anti-VS Code article

I know plenty of people who use Visual Studio Code and love it. I use VS Code myself, just not as my PowerShell editor. I'm in it every day with Claude or ChatGPT.

All I'm saying is that a lot of us spend the day on servers, where the work is investigation and the list of approved tools is short. The ISE served that work well for years because it was simple and it was already there. PowerShell 7 never got an equivalent, and I think admins and many developers noticed that more than anyone said out loud.

I built mine because I love PowerShell and wanted to learn PowerShell 7. It turned out to be a great development tool too. I build in it the way I have for more than 15 years, and it holds up to the abuse I give it.

If you still keep the ISE pinned to your taskbar, you are in good company. The job it does on a server has not gone away.
