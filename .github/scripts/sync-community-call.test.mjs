import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyAgendaDiscussion,
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

test('upcomingOccurrences generates consecutive months starting from `from`', () => {
  const occurrences = upcomingOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex, o.day]), [
    [2026, 9, 15],
    [2026, 10, 19],
    [2026, 11, 17],
  ]);
});

test('upcomingOccurrences skips this month when its call already ended', () => {
  // Nov 19, 2026's call ends 18:00Z; asking at 20:31Z should start from December.
  const occurrences = upcomingOccurrences(3, new Date('2026-11-19T20:31:00Z'));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [
    [2026, 11],
    [2027, 0],
    [2027, 1],
  ]);
});

test('upcomingOccurrences still includes this month before its call ends', () => {
  const occurrences = upcomingOccurrences(1, new Date('2026-11-19T10:00:00Z'));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [[2026, 10]]);
});

test('upcomingOccurrences rolls over into the next year', () => {
  const occurrences = upcomingOccurrences(2, new Date(Date.UTC(2026, 11, 1)));
  assert.deepEqual(occurrences.map((o) => [o.year, o.monthIndex]), [
    [2026, 11],
    [2027, 0],
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

test('applyAgendaDiscussion attaches the link to the matching month without changing its date', () => {
  const occurrences = upcomingOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  const updated = applyAgendaDiscussion(occurrences, {
    title: 'November Community Call',
    url: 'https://github.com/PowerShell/PowerShell/discussions/1',
  });

  assert.equal(updated[1].discussionUrl, 'https://github.com/PowerShell/PowerShell/discussions/1');
  assert.equal(updated[1].day, occurrences[1].day);
  assert.equal(updated[0].discussionUrl, undefined);
});

test('applyAgendaDiscussion overrides the computed date when the title has an explicit day', () => {
  const occurrences = upcomingOccurrences(3, new Date(Date.UTC(2026, 10, 1)));
  const updated = applyAgendaDiscussion(occurrences, {
    title: 'November 30 2026 Community Call',
    url: 'https://github.com/PowerShell/PowerShell/discussions/2',
  });

  assert.equal(updated[0].day, 30);
  assert.equal(updated[0].startDate, pacificDateTimeToIso(2026, 10, 30, 9, 30));
});

test('applyAgendaDiscussion is a no-op when no discussion is found', () => {
  const occurrences = upcomingOccurrences(3, new Date(Date.UTC(2026, 9, 1)));
  assert.deepEqual(applyAgendaDiscussion(occurrences, undefined), occurrences);
});

test('communityCallSyncPlan reports add vs. update vs. unchanged', () => {
  const occurrences = upcomingOccurrences(1, new Date(Date.UTC(2026, 9, 1)));
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

test('isCancelled detects a manual cancellation flag', () => {
  assert.equal(isCancelled('communityCallSource: powershell\ncancelled: true\n'), true);
  assert.equal(isCancelled('communityCallSource: powershell\nstartDate: "x"\n'), false);
  assert.equal(isCancelled(undefined), false);
});

test('communityCallSyncPlan leaves a manually cancelled file untouched', () => {
  const occurrences = upcomingOccurrences(1, new Date(Date.UTC(2026, 9, 1)));
  const file = [...communityCallSyncPlan([], occurrences).desired.keys()][0];
  const cancelled = {
    file,
    content: '---\ncommunityCallSource: powershell\ncancelled: true\ncancelledReason: "Holidays"\n---\nCancelled.\n',
  };

  const plan = communityCallSyncPlan([cancelled], occurrences);
  assert.equal(plan.changes.length, 0);
  assert.equal(plan.desired.get(file), cancelled.content);
});
