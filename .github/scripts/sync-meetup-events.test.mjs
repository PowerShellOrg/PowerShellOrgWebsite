import assert from 'node:assert/strict';
import test from 'node:test';

import { calendarSyncPlan } from './sync-meetup-events.mjs';

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
