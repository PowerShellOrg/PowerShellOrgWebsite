import { readFile } from 'node:fs/promises';

const input = process.argv[2];

if (!input) {
  throw new Error('Usage: node scripts/validate-calendar.mjs <calendar.ics|URL>');
}

const calendar = new URL(input, 'file:').protocol === 'file:'
  ? await readFile(input, 'utf8')
  : await (await fetch(input)).text();

const errors = [];
const fail = (message) => errors.push(message);

if (/(^|[^\r])\n/.test(calendar)) {
  fail('Content lines must use CRLF line endings.');
}

const lines = calendar.replace(/\r?\n[ \t]/g, '').split(/\r?\n/).filter(Boolean);
const components = [];
const events = [];
const timezones = new Set();
const timezoneReferences = new Set();
let event;

for (const line of lines) {
  if (line.startsWith('BEGIN:')) {
    const component = line.slice('BEGIN:'.length);
    components.push(component);
    if (component === 'VEVENT') {
      event = new Map();
      events.push(event);
    }
    continue;
  }

  if (line.startsWith('END:')) {
    const component = line.slice('END:'.length);
    if (components.pop() !== component) {
      fail(`Mismatched component terminator: ${line}`);
    }
    if (component === 'VEVENT') {
      event = undefined;
    }
    continue;
  }

  const separator = line.indexOf(':');
  if (separator < 1) {
    fail(`Malformed content line: ${line}`);
    continue;
  }

  const declaration = line.slice(0, separator);
  const [name, ...parameters] = declaration.split(';');
  const value = line.slice(separator + 1);

  for (const parameter of parameters) {
    if (parameter.startsWith('TZID=')) {
      timezoneReferences.add(parameter.slice('TZID='.length));
    }
  }

  if (components.at(-1) === 'VTIMEZONE' && name === 'TZID') {
    timezones.add(value);
  }

  if (event) {
    event.set(name, [...(event.get(name) ?? []), value]);
  }
}

if (components.length) {
  fail(`Unclosed component: ${components.at(-1)}`);
}

if (lines[0] !== 'BEGIN:VCALENDAR' || lines.at(-1) !== 'END:VCALENDAR') {
  fail('Calendar must be wrapped in BEGIN:VCALENDAR and END:VCALENDAR.');
}

for (const [index, properties] of events.entries()) {
  for (const property of ['UID', 'DTSTAMP', 'DTSTART']) {
    if (properties.get(property)?.length !== 1) {
      fail(`VEVENT ${index + 1} must contain exactly one ${property}.`);
    }
  }

  const uid = properties.get('UID')?.[0];
  if (uid && events.some((other) => other !== properties && other.get('UID')?.[0] === uid)) {
    fail(`VEVENT ${index + 1} reuses UID ${uid}.`);
  }
}

for (const timezone of timezoneReferences) {
  if (!timezones.has(timezone)) {
    fail(`TZID=${timezone} has no matching VTIMEZONE component.`);
  }
}

if (errors.length) {
  throw new Error(`Invalid RFC 5545 calendar:\n- ${errors.join('\n- ')}`);
}

console.log(`Validated ${events.length} VEVENT components.`);
