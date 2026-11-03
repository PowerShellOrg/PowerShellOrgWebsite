---
title: "Normalize the Loudness of a Folder of Videos with PowerShell and FFmpeg"
description: "Measure every video in a folder with FFmpeg's loudnorm filter, normalize the files that miss the target in a two-pass run with ForEach-Object -Parallel, and check what was written."
author: Mark Santos
authors:
  - Mark Santos
date: "2026-10-31T00:00:00+00:00"
categories:
  - Tutorials
tags:
  - powershell
  - ffmpeg
  - loudness
  - foreach-object
  - shouldprocess
---

Exports from different sources rarely agree on volume. In my test folder one file measures
-30.2 LUFS and another -8.91 LUFS. I run a video editing studio where every delivery is checked
against a loudness target, and fixing a whole folder at once is a good job for PowerShell.

This article builds `Invoke-LoudnessNormalization`, an advanced function that measures every
video in a folder, normalizes the ones that miss the target, and returns a before-and-after
table. It parses ffprobe JSON with `ConvertFrom-Json`, runs FFmpeg's two-pass `loudnorm` inside
`ForEach-Object -Parallel`, and supports `-WhatIf`.

The defaults are -14 LUFS integrated loudness, a -1.5 dBTP true peak and a loudness range (LRA)
of 11 LU, the `loudnorm` settings my studio's pipelines use for online video. Broadcast work
follows [EBU R 128](https://tech.ebu.ch/docs/r/r128.pdf): -23.0 LUFS, a true peak that shall
not exceed -1 dBTP, and ±0.2 LU of tolerance in quality control for measurement error.

Everything here was run with PowerShell 7.6.9 and FFmpeg 9.0.2 on macOS, against seven
20-second test videos made with FFmpeg's `lavfi` sources: too loud, too quiet with sharp peaks,
already on target, no audio stream, digitally silent audio, a name with spaces, and an export
that was cut off partway through.

## Two passes

`loudnorm` can run in a single pass, which live streams need, but with a file you can measure
first. The first pass decodes the audio, measures it and discards it:

```powershell
ffmpeg -hide_banner -nostats -i ./media/promo-loud.mp4 -map 0:a:0 `
    -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -
```

Near the end of the output is the report:

```text
[Parsed_loudnorm_0 @ 0x7b74c20a80]
{
	"input_i" : "-8.91",
	"input_tp" : "-3.01",
	"input_lra" : "0.10",
	"input_thresh" : "-18.91",
	"output_i" : "-14.01",
	"output_tp" : "-8.14",
	"output_lra" : "0.10",
	"output_thresh" : "-24.01",
	"normalization_type" : "dynamic",
	"target_offset" : "0.01"
}
```

Ignore `normalization_type` here. With nothing measured yet, a first pass always runs in
dynamic mode.

The second pass hands the `input_*` values back as `measured_I`, `measured_TP`, `measured_LRA`
and `measured_thresh`, with `offset` set from `target_offset` and `linear=true`. Linear mode
applies one fixed gain, so the audio keeps its dynamics. According to the
[loudnorm documentation](https://ffmpeg.org/ffmpeg-filters.html#loudnorm), that only works if
the target LRA isn't lower than the source LRA and the gain doesn't push the true peak over the
target. Otherwise `loudnorm` reverts to dynamic normalization.

## The function

```powershell
function Invoke-LoudnessNormalization {
    <#
    .SYNOPSIS
        Normalizes the loudness of every video in a folder with a two-pass FFmpeg loudnorm.

    .DESCRIPTION
        Measures the first audio stream of each video, skips files with no audio, silent audio
        or loudness already within Tolerance, and writes normalized copies to OutputPath.
        Video is stream-copied; audio is re-encoded to AAC at the source sample rate.

    .PARAMETER Path
        Folder with the source videos. Subfolders are not searched.

    .PARAMETER OutputPath
        Folder for the normalized copies. Created when needed.

    .PARAMETER TargetLoudness
        Integrated loudness target in LUFS. EBU R 128 broadcast delivery uses -23.

    .PARAMETER TruePeak
        True-peak target in dBTP.

    .PARAMETER LoudnessRange
        Loudness range target in LU.

    .PARAMETER Tolerance
        A file is on target when its loudness is within this many LU of TargetLoudness and its
        true peak is no more than this many dB above TruePeak. On-target files are skipped,
        and normalized files that miss are flagged in Note.

    .PARAMETER Extension
        File extensions to process.

    .PARAMETER ThrottleLimit
        Number of ffmpeg processes to run at once.

    .EXAMPLE
        Invoke-LoudnessNormalization -Path ./exports -OutputPath ./normalized | Format-Table

    .EXAMPLE
        Invoke-LoudnessNormalization ./exports ./r128 -TargetLoudness -23 -Tolerance 0.2 -WhatIf
    #>
    [CmdletBinding(SupportsShouldProcess)]
    [OutputType([pscustomobject])]
    param(
        [Parameter(Mandatory, Position = 0)]
        [ValidateScript({ Test-Path -LiteralPath $_ -PathType Container })]
        [string]$Path,

        [Parameter(Mandatory, Position = 1)]
        [string]$OutputPath,

        [ValidateRange(-70, -5)]
        [double]$TargetLoudness = -14,

        [ValidateRange(-9, 0)]
        [double]$TruePeak = -1.5,

        [ValidateRange(1, 50)]
        [double]$LoudnessRange = 11,

        [ValidateRange(0, 5)]
        [double]$Tolerance = 0.5,

        [string[]]$Extension = @('.mp4', '.mov', '.mkv', '.m4v'),

        [ValidateRange(1, 32)]
        [int]$ThrottleLimit = 4
    )

    $ffmpeg = (Get-Command -Name ffmpeg -CommandType Application -ErrorAction Stop)[0].Source
    $ffprobe = (Get-Command -Name ffprobe -CommandType Application -ErrorAction Stop)[0].Source

    # Runs ffmpeg and returns loudnorm's JSON report as an object. It is kept as a string
    # because -Parallel runspaces can't see this function's scope, and $using: refuses
    # script blocks.
    $runLoudnorm = {
        param([string]$FFmpeg, [string[]]$Arguments)
        $log = & $FFmpeg -hide_banner -nostats @Arguments 2>&1 | ForEach-Object { "$_" }
        if ($LASTEXITCODE -ne 0) {
            throw "ffmpeg exited with code ${LASTEXITCODE}: $($log[-1])"
        }
        $json = [regex]::Match(($log -join "`n"), '(?s)\{\s*"input_i".*?\}')
        if (-not $json.Success) { throw 'No loudnorm JSON found in the ffmpeg output.' }
        $json.Value | ConvertFrom-Json
    }.ToString()

    $target = "I=${TargetLoudness}:TP=${TruePeak}:LRA=${LoudnessRange}"
    $files = Get-ChildItem -LiteralPath $Path -File | Where-Object { $_.Extension -in $Extension }

    # Pass 1: probe and measure. Read-only, so it also runs under -WhatIf.
    $measured = $files | ForEach-Object -ThrottleLimit $ThrottleLimit -Parallel {
        $runLoudnorm = [scriptblock]::Create($using:runLoudnorm)
        $item = [ordered]@{ File = $_; Audio = $null; Stats = $null; Error = $null }
        try {
            # With 2>&1, stdout lines arrive as strings and stderr lines as ErrorRecords.
            $probe = & $using:ffprobe -v error -select_streams a:0 -of json `
                -show_entries 'stream=codec_name,sample_rate,channels' $_.FullName 2>&1
            if ($LASTEXITCODE -ne 0) {
                $reason = @($probe | Where-Object { $_ -isnot [string] })[0]
                throw ('ffprobe: ' + ([string]$reason -replace '^\[.+?\]\s*'))
            }
            $json = $probe | Where-Object { $_ -is [string] }
            $item.Audio = @(($json | ConvertFrom-Json).streams)[0]
            if ($item.Audio) {
                $item.Stats = & $runLoudnorm $using:ffmpeg @(
                    '-i', $_.FullName, '-map', '0:a:0',
                    '-af', "loudnorm=$($using:target):print_format=json", '-f', 'null', '-')
            }
        }
        catch { $item.Error = $_.Exception.Message }
        [pscustomobject]$item
    }

    # Decide what to do with each file. ShouldProcess only works here, in the caller's runspace.
    $results = foreach ($m in $measured) {
        $r = [pscustomobject]@{
            Name = $m.File.Name; Status = $null; Type = $null
            InputI = $null; InputTP = $null; OutputI = $null; OutputTP = $null; Note = $null
        }
        if ($m.Error) { $r.Status = 'Failed'; $r.Note = $m.Error }
        elseif (-not $m.Audio) { $r.Status = 'Skipped'; $r.Note = 'No audio stream' }
        elseif ($m.Stats.input_i -eq '-inf') { $r.Status = 'Skipped'; $r.Note = 'Silent audio' }
        else {
            $r.InputI = [double]$m.Stats.input_i
            $r.InputTP = [double]$m.Stats.input_tp
            $gain = $TargetLoudness - $r.InputI
            if ([math]::Abs($gain) -le $Tolerance -and $r.InputTP -le $TruePeak + $Tolerance) {
                $r.Status = 'Skipped'; $r.Note = 'Within tolerance'
            }
            else {
                # The test loudnorm itself uses to decide whether it can stay linear.
                # It reads a measured LRA of exactly 0 as "not supplied".
                $lra = [double]$m.Stats.input_lra
                $lraOk = $lra -gt 0 -and $lra -le $LoudnessRange
                $linear = $lraOk -and ($r.InputTP + $gain) -le $TruePeak
                $r.Type = if ($linear) { 'linear' } else { 'dynamic' }
                $action = "Normalize from $($r.InputI) to $TargetLoudness LUFS ($($r.Type))"
                if ($PSCmdlet.ShouldProcess($m.File.Name, $action)) {
                    $r.Status = 'Queued'
                    $r | Add-Member -NotePropertyMembers @{
                        Source     = $m.File.FullName
                        Stats      = $m.Stats
                        SampleRate = $m.Audio.sample_rate
                    }
                }
                else { $r.Status = if ($WhatIfPreference) { 'WhatIf' } else { 'Declined' } }
            }
        }
        $r
    }

    $finished = @($results | Where-Object { $_.Status -ne 'Queued' })
    $queued = @($results | Where-Object { $_.Status -eq 'Queued' })

    # ForEach-Object resolves $using:outDir before it looks at its input, so this pass
    # only starts when there is something to do.
    if ($queued) {
        $outDir = (New-Item -ItemType Directory -Path $OutputPath -Force -Confirm:$false).FullName

        # Pass 2: apply the measured values. Video is stream-copied, audio re-encoded.
        $finished += $queued | ForEach-Object -ThrottleLimit $ThrottleLimit -Parallel {
            $runLoudnorm = [scriptblock]::Create($using:runLoudnorm)
            $r = $_
            $s = $r.Stats
            $destination = Join-Path $using:outDir $r.Name
            $filter = 'loudnorm=' + ((
                    $using:target,
                    "measured_I=$($s.input_i)", "measured_TP=$($s.input_tp)",
                    "measured_LRA=$($s.input_lra)", "measured_thresh=$($s.input_thresh)",
                    "offset=$($s.target_offset)", 'linear=true', 'print_format=json'
                ) -join ':')
            try {
                $report = & $runLoudnorm $using:ffmpeg @(
                    '-y', '-i', $r.Source, '-map', '0:v?', '-map', '0:a:0', '-c:v', 'copy',
                    '-af', $filter, '-c:a', 'aac', '-b:a', '192k', '-ar', $r.SampleRate,
                    $destination)
                $r.Status = 'Normalized'
                $r.Type = $report.normalization_type

                # loudnorm's own output_* figures are taken before the AAC encoder, so measure
                # the file that was actually written.
                $after = & $runLoudnorm $using:ffmpeg @(
                    '-i', $destination, '-map', '0:a:0',
                    '-af', "loudnorm=$($using:target):print_format=json", '-f', 'null', '-')
                $r.OutputI = [double]$after.input_i
                $r.OutputTP = [double]$after.input_tp
                $r.Note = @(
                    if ([math]::Abs($r.OutputI - $using:TargetLoudness) -gt $using:Tolerance) {
                        'Loudness off target'
                    }
                    if ($r.OutputTP -gt $using:TruePeak + $using:Tolerance) {
                        'True peak over target'
                    }
                ) -join '; '
            }
            catch {
                $r.Status = 'Failed'
                $r.Note = $_.Exception.Message
                Remove-Item -LiteralPath $destination -ErrorAction SilentlyContinue
            }
            $r
        }
    }

    $finished | Sort-Object Name |
        Select-Object Name, Status, Type, InputI, InputTP, OutputI, OutputTP, Note
}
```

Only the first audio stream is mapped, so files with several audio tracks, subtitles or data
streams need their own `-map` options.

## Running it

`-WhatIf` still measures, because measuring only reads files. `$plan` gets the same table as a
real run, with `WhatIf` as the status of the files that would be normalized:

```powershell
$plan = Invoke-LoudnessNormalization -Path ./media -OutputPath ./normalized -WhatIf
```

```text
What if: Performing the operation "Normalize from -25.98 to -14 LUFS (linear)" on target "client review cut v2.mp4".
What if: Performing the operation "Normalize from -30.2 to -14 LUFS (dynamic)" on target "interview-quiet.mp4".
What if: Performing the operation "Normalize from -8.91 to -14 LUFS (linear)" on target "promo-loud.mp4".
```

`interview-quiet.mp4` is 16.2 LU under the target, but its peaks already reach -1.71 dBTP, so a
fixed gain would put them near +14.5 dBTP. The function applies the same test `loudnorm` uses,
so `-WhatIf` already knows that file will go dynamic.

Without `-WhatIf` it writes the files. Timed three times on an Apple silicon Mac, the run took
between 4.3 and 6.1 seconds:

```powershell
Invoke-LoudnessNormalization -Path ./media -OutputPath ./normalized | Format-Table -AutoSize
```

```text
Name                        Status     Type     InputI InputTP OutputI OutputTP Note
----                        ------     ----     ------ ------- ------- -------- ----
already-on-target.mp4       Skipped            -14.170  -3.340                  Within tolerance
client review cut v2.mp4    Normalized linear  -25.980 -15.320 -14.030 -3.000
export-interrupted.mp4      Failed                                              ffprobe: moov atom not found
interview-quiet.mp4         Normalized dynamic -30.200  -1.710 -14.250 -1.480
promo-loud.mp4              Normalized linear   -8.910  -3.010 -13.990 -7.930
screen-capture-no-audio.mp4 Skipped                                             No audio stream
webinar-muted-mic.mp4       Skipped                                             Silent audio
```

`InputI` and `InputTP` come from the first pass, `OutputI` and `OutputTP` from measuring the
written files. Both linear files landed within 0.03 LU of -14, and the interview at -14.25 LUFS
with peaks at -1.48 dBTP. A single dynamic pass on that file only reached -18.78 LUFS.
The cut-off export failed in ffprobe without stopping the batch, because each file has its own
`try`/`catch`.

As a cross-check, FFmpeg's other meter (`ebur128=peak=true`) read the three outputs at -14.0,
-14.1 and -14.0 LUFS, and ffprobe still showed H.264 video and 48 kHz audio. Running the function
again on `./normalized` skips all three files as within tolerance.

For an R 128 delivery:

```powershell
Invoke-LoudnessNormalization ./media ./broadcast -TargetLoudness -23 -Tolerance 0.2 |
    Format-Table -AutoSize
```

```text
Name                        Status     Type     InputI InputTP OutputI OutputTP Note
----                        ------     ----     ------ ------- ------- -------- ----
already-on-target.mp4       Normalized dynamic -14.170  -3.340 -23.130  -12.190
client review cut v2.mp4    Normalized linear  -25.980 -15.320 -23.100  -12.310
export-interrupted.mp4      Failed                                              ffprobe: moov atom not found
interview-quiet.mp4         Normalized dynamic -30.200  -1.710 -23.970   -1.490 Loudness off target
promo-loud.mp4              Normalized linear   -8.910  -3.010 -23.070  -16.850
screen-capture-no-audio.mp4 Skipped                                             No audio stream
webinar-muted-mic.mp4       Skipped                                             Silent audio
```

Dynamic mode missed the interview by almost 1 LU here, and the re-measure flags it instead of
reporting success. The last gotcha below explains why `already-on-target.mp4` went dynamic.

## Gotchas

### FFmpeg writes to stderr

`$log = & ffmpeg ...` captures nothing, because the log and the `loudnorm` report go to stderr.
With `2>&1`, PowerShell 7.6 wraps each line in an `ErrorRecord`, but nothing lands in `$Error`
and nothing throws, even with `$ErrorActionPreference = 'Stop'`. `ForEach-Object { "$_" }`
turns them back into strings. Don't add `-v error` either: the report is logged at info level and disappears with the
rest. FFmpeg's `stats_file=` option can write the JSON to a file instead, but it only arrived in
February 2026, so reading stderr works with more builds.

ffprobe sends JSON to stdout and errors to stderr, so after `2>&1` the strings are the JSON and
the `ErrorRecord` objects are the failure reason (`moov atom not found`).

The values in the report are strings, and a silent stream reports `"-inf"`, which `[double]`
can't parse, so silence is checked before any cast.

### A colon after a variable name

```powershell
$TargetLoudness = -14; $TruePeak = -1.5
"loudnorm=I=$TargetLoudness:TP=$TruePeak"
```

```text
loudnorm=I==-1.5
```

PowerShell reads `$TargetLoudness:TP` the way it reads `$env:PATH`, as a variable `TP` in a
namespace called `TargetLoudness`. It finds nothing and inserts an empty string, with no error.
Braces fix it: `"I=${TargetLoudness}:TP=${TruePeak}"`, and the same goes for `${LASTEXITCODE}:`
in the error message.

### -Parallel runs in another runspace

- A function defined outside the block isn't found (`The term 'Get-Greeting' is not
  recognized...` for my test function).
- `$using:` refuses script blocks (`A ForEach-Object -Parallel using variable cannot be a script
  block.`), so `$runLoudnorm` travels as a string and is rebuilt with `[scriptblock]::Create()`.
- `$using:` variables are resolved even with no input. My first version only set `$outDir` when
  a file needed work, and the `-WhatIf` run failed with `The value of the using variable
  '$using:outDir' cannot be retrieved because it has not been set in the local session.`
- `$WhatIfPreference` doesn't carry over (the block saw `False`) and `$PSCmdlet` is `$null`, so
  `ShouldProcess` runs between the passes, in the function's own runspace.

### Dynamic mode changes the sample rate

The docs say dynamic mode upsamples to 192 kHz to find true peaks and suggest setting `-ar`.
Without it, the 48 kHz interview came out at 96 kHz, while a linear file stayed at 48 kHz. The
function passes the source rate from ffprobe to `-ar`.

### The second pass reports numbers from before the encoder

The encoding pass prints its own report, but its `output_*` values describe the audio leaving
the filter, before AAC. For `promo-loud.mp4` the report said -8.56 dBTP; the written file
measured -7.93. So the function measures what it wrote, and the true-peak check gets the same
tolerance as loudness: with the defaults, a file passes at -14.5 to -13.5 LUFS with peaks at or
below -1.0 dBTP. If your ceiling is strict, set `-TruePeak` under it.

### A measured LRA of 0 turns off linear mode

Steady signals can measure an LRA of exactly 0.00 LU, as the pink-noise test file did.
[af_loudnorm.c](https://github.com/FFmpeg/FFmpeg/blob/6b949407cb78455ced00a3acf8cd58c8c704d27c/libavfilter/af_loudnorm.c#L820)
only allows linear mode when `measured_LRA` isn't 0, the option's default. That's why
`already-on-target.mp4` went dynamic at -23 although an 8.8 dB cut couldn't cause a peak
problem. The function's prediction includes the same check.

## References

- [FFmpeg filters documentation: loudnorm](https://ffmpeg.org/ffmpeg-filters.html#loudnorm)
- [EBU R 128: Loudness normalisation and permitted maximum level of audio signals (PDF)](https://tech.ebu.ch/docs/r/r128.pdf)
- [ForEach-Object](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/foreach-object)
