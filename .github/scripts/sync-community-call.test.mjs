import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyAgendaDiscussions,
  candidateOccurrences,
  communityCallSyncPlan,
  isCancelled,
  pacificDateTimeToIso,
  parseAgendaTitle,
  thirdThursday,
  upcomingOccurrences,
} from './sync-community-call.mjs';

test('thirdThursday matches known PowerShell Community Call dates', () => {
  assert.equal(thirdThursday(2026, 9), 15); // October 15, 2026
  assert.equal(thirdThursday(2026, 8), 17); // September 17, 2026
  assert.equal(thirdThursday(2026, 7), 20); // August 20, 2026
});

test('pacificDateTimeToIso accounts for DST on both sides of the clock change', () => {
  // PDT (UTC-7)
  assert.equal(pacificDateTimeToIso(2026, 9, 15, 9, 30), '2026-10-15T16:30:00.000Z');
  // PST (UTC-8)
  assert.equal(pacificDateTimeToIso(2026, 0, 15, 9, 30), '2026-01-15T17:30:00.000Z');
});

test('candidateOccurrences generates consecutive months starting from `from`, unfiltered', () => {
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex, o.day]), [
    [2026, 9, 15],
    [2026, 10, 19],
    [2026, 11, 17],
  ]);
});

test('candidateOccurrences rolls over into the next year', () => {
  const occurrences = candidateOccurrences(2, new Date(Date.UTC(2026, 11, 1)));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [
    [2026, 11],
    [2027, 0],
  ]);
});

test('upcomingOccurrences drops a month whose call already ended and keeps the window full', () => {
  // Nov 19, 2026's call ends 18:00Z; asking at 20:31Z should start from December.
  const from = new Date('2026-11-19T20:31:00Z');
  const occurrences = upcomingOccurrences(candidateOccurrences(5, from), 3, from);
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [
    [2026, 11],
    [2027, 0],
    [2027, 1],
  ]);
});

test('upcomingOccurrences still includes this month before its call ends', () => {
  const from = new Date('2026-11-19T10:00:00Z');
  const occurrences = upcomingOccurrences(candidateOccurrences(3, from), 1, from);
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [[2026, 10]]);
});

test('upcomingOccurrences keeps a rescheduled month whose default date already ended', () => {
  // Nov 19's default call already ended, but an agenda override (applied before
  // filtering) moves it to Nov 30, which is still ahead of `from`.
  const from = new Date('2026-11-20T00:00:00Z');
  const rescheduled = [
    { year: 2026, monthIndex: 10, day: 30, startDate: pacificDateTimeToIso(2026, 10, 30, 9, 30), endDate: pacificDateTimeToIso(2026, 10, 30, 10, 0) },
    { year: 2026, monthIndex: 11, day: 17, startDate: pacificDateTimeToIso(2026, 11, 17, 9, 30), endDate: pacificDateTimeToIso(2026, 11, 17, 10, 0) },
  ];
  const occurrences = upcomingOccurrences(rescheduled, 2, from);
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex, o.day]), [
    [2026, 10, 30],
    [2026, 11, 17],
  ]);
});

test('parseAgendaTitle extracts an explicit date when present', () => {
  assert.deepEqual(parseAgendaTitle('August 21 2025 Community Call'), { monthIndex: 7, day: 21, year: 2025 });
});

test('parseAgendaTitle falls back to the month name only', () => {
  assert.deepEqual(parseAgendaTitle('October Community Call'), { monthIndex: 9 });
});

test('parseAgendaTitle ignores titles without a recognizable month', () => {
  assert.equal(parseAgendaTitle('Will PS support uninstalling assemblies?'), undefined);
});

test('applyAgendaDiscussions attaches the link to the matching month without changing its date', () => {
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  const updated = applyAgendaDiscussions(occurrences, [
    { title: 'November Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/1', createdAt: '2026-10-20T00:00:00Z' },
  ]);

  assert.equal(updated[1].discussionUrl, 'https://github.com/PowerShell/PowerShell/discussions/1');
  assert.equal(updated[1].day, occurrences[1].day);
  assert.equal(updated[0].discussionUrl, undefined);
});

test('applyAgendaDiscussions overrides the computed date when the title has an explicit day and matching year', () => {
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 10, 1)));
  const updated = applyAgendaDiscussions(occurrences, [
    { title: 'November 30 2026 Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/2', createdAt: '2026-11-10T00:00:00Z' },
  ]);

  assert.equal(updated[0].day, 30);
  assert.equal(updated[0].startDate, pacificDateTimeToIso(2026, 10, 30, 9, 30));
});

test('applyAgendaDiscussions ignores a month-only title created a year before the occurrence', () => {
  // A real example: "January Community Call" was created Jan 2026 for the
  // January 2026 call. Without a year in the title, it must not match the
  // January 2027 occurrence just because the month name lines up.
  const occurrences = candidateOccurrences(1, new Date(Date.UTC(2026, 11, 1)));
  const updated = applyAgendaDiscussions(occurrences, [
    { title: 'January Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/old-january', createdAt: '2026-01-12T17:43:03Z' },
  ]);

  assert.equal(updated[0].discussionUrl, undefined);
});

test('applyAgendaDiscussions ignores a discussion whose explicit year does not match the occurrence', () => {
  // A stale 2025 thread with the same month name must never be applied to the
  // 2026 occurrence (it would otherwise point the write at community-call-2025-11.md).
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  const updated = applyAgendaDiscussions(occurrences, [
    { title: 'November 20 2025 Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/3', createdAt: '2025-11-15T00:00:00Z' },
  ]);

  assert.deepEqual(updated, occurrences);
});

test('applyAgendaDiscussions resolves each month independently, not just the globally-latest discussion', () => {
  // A November reschedule resolved earlier must survive a newer December
  // discussion being published later — each month picks its own best match.
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  const discussions = [
    { title: 'December Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/5', createdAt: '2026-11-20T00:00:00Z' },
    { title: 'November 30 2026 Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/4', createdAt: '2026-11-10T00:00:00Z' },
  ];
  const updated = applyAgendaDiscussions(occurrences, discussions);

  assert.equal(updated[1].day, 30); // November, overridden
  assert.equal(updated[1].discussionUrl, 'https://github.com/PowerShell/PowerShell/discussions/4');
  assert.equal(updated[2].discussionUrl, 'https://github.com/PowerShell/PowerShell/discussions/5'); // December
});

test('applyAgendaDiscussions picks the most recently created matching discussion for a month', () => {
  const occurrences = candidateOccurrences(1, new Date(Date.UTC(2026, 9, 1)));
  const discussions = [
    { title: 'October Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/old', createdAt: '2026-02-26T00:00:00Z' },
    { title: 'October Community Call', url: 'https://github.com/PowerShell/PowerShell/discussions/new', createdAt: '2026-10-14T00:00:00Z' },
  ];
  const updated = applyAgendaDiscussions(occurrences, discussions);

  assert.equal(updated[0].discussionUrl, 'https://github.com/PowerShell/PowerShell/discussions/new');
});

test('applyAgendaDiscussions is a no-op when no discussion matches', () => {
  const occurrences = candidateOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  assert.deepEqual(applyAgendaDiscussions(occurrences, []), occurrences);
});

test('isCancelled detects a manual cancellation flag', () => {
  assert.equal(isCancelled('communityCallSource: powershell\ncancelled: true\n'), true);
  assert.equal(isCancelled('communityCallSource: powershell\nstartDate: "x"\n'), false);
  assert.equal(isCancelled(undefined), false);
});

test('communityCallSyncPlan reports add vs. update vs. unchanged', () => {
  const occurrences = candidateOccurrences(1, new Date(Date.UTC(2026, 9, 1)));
  const first = communityCallSyncPlan([], occurrences);
  assert.equal(first.changes.length, 1);
  assert.equal(first.changes[0].action, 'add');

  const existing = [{ file: [...first.desired.keys()][0], content: [...first.desired.values()][0] }];
  const second = communityCallSyncPlan(existing, occurrences);
  assert.equal(second.changes.length, 0);

  const stale = [{ file: existing[0].file, content: 'stale' }];
  const third = communityCallSyncPlan(stale, occurrences);
  assert.equal(third.changes.length, 1);
  assert.equal(third.changes[0].action, 'update');
});

test('communityCallSyncPlan leaves a manually cancelled file untouched', () => {
  const occurrences = candidateOccurrences(1, new Date(Date.UTC(2026, 9, 1)));
  const file = [...communityCallSyncPlan([], occurrences).desired.keys()][0];
  const cancelled = {
    file,
    content: '---\ncommunityCallSource: powershell\ncancelled: true\ncancelledReason: "Holidays"\n---\nCancelled.\n',
  };

  const plan = communityCallSyncPlan([cancelled], occurrences);
  assert.equal(plan.changes.length, 0);
  assert.equal(plan.desired.get(file), cancelled.content);
});
