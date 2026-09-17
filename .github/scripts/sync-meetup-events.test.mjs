import assert from 'node:assert/strict';
import test from 'node:test';

import { calendarSyncPlan, eventMetadata } from './sync-meetup-events.mjs';

const managedEvent = {
  file: 'content/calendar/meetup-123.md',
  content: 'meetupSource: meetup\nexternalUrl: "https://www.meetup.com/example/events/123/"',
};

test('removes a generated event explicitly cancelled by Meetup', () => {
  const plan = calendarSyncPlan([managedEvent], [{
    events: [{ event: { STATUS: 'CANCELLED', UID: 'event_123@meetup.com' } }],
    groupName: 'Example group',
  }]);

  assert.deepEqual([...plan.desired], []);
  assert.deepEqual([...plan.cancelled], [managedEvent.file]);
});

test('retains generated historical events absent from the current feed', () => {
  const plan = calendarSyncPlan([managedEvent], [{ events: [], groupName: 'Example group' }]);

  assert.deepEqual([...plan.desired], []);
  assert.deepEqual([...plan.cancelled], []);
});

test('retains manual historical events when Meetup reports cancellation', () => {
  const historicalEvent = { ...managedEvent, content: 'externalUrl: "https://www.meetup.com/example/events/123/"' };
  const plan = calendarSyncPlan([historicalEvent], [{
    events: [{ event: { STATUS: 'CANCELLED', UID: 'event_123@meetup.com' } }],
    groupName: 'Example group',
  }]);

  assert.deepEqual([...plan.cancelled], []);
});

test('preserves the start and end instants supplied by Meetup', () => {
  const event = {
    UID: 'event_456@meetup.com',
    DTSTART: '20260916T000000Z',
    DTEND: '20260916T010000Z',
    SUMMARY: 'Intune - Not Just Another Graph Resource',
    DESCRIPTION: 'Hailey presents Intune automation.',
    URL: 'https://www.meetup.com/example/events/456/',
  };
  const metadata = eventMetadata({
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation' },
    startDate: '2026-09-16T19:00:00-04:00',
    endDate: '2026-09-16T20:00:00-04:00',
  }, event.URL);

  assert.deepEqual(metadata, {
    virtual: true,
    where: 'Online',
    startDate: '2026-09-16T23:00:00.000Z',
    endDate: '2026-09-17T00:00:00.000Z',
  });

  const plan = calendarSyncPlan([], [{ events: [{ event, metadata }], groupName: 'Example group' }]);

  assert.equal(plan.desired.get('content/calendar/meetup-456.md'), `---
meetupEventId: "456"
meetupSource: meetup
startDate: "2026-09-16T23:00:00.000Z"
endDate: "2026-09-17T00:00:00.000Z"
title: "Intune - Not Just Another Graph Resource"
externalUrl: "https://www.meetup.com/example/events/456/"
virtual: true
where: "Online"
---
Hailey presents Intune automation.
`);
});
