import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const USER_GROUPS_DIR = path.join('content', 'user-groups');
const CALENDAR_DIR = path.join('content', 'calendar');
const DRY_RUN = process.argv.includes('--dry-run');

function yaml(value) {
  return JSON.stringify(value ?? '');
}

function unescapeIcal(value = '') {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function property(line) {
  const separator = line.indexOf(':');
  if (separator < 1) return null;
  const declaration = line.slice(0, separator);
  return { name: declaration.split(';', 1)[0], value: line.slice(separator + 1) };
}

function eventsFromIcal(calendar) {
  const events = [];
  let event;
  let groupName;

  for (const line of calendar.replace(/\r?\n[ \t]/g, '').split(/\r?\n/)) {
    if (line === 'BEGIN:VEVENT') {
      event = {};
      continue;
    }
    if (line === 'END:VEVENT') {
      if (event) events.push(event);
      event = undefined;
      continue;
    }

    const parsed = property(line);
    if (!parsed) continue;
    if (event) event[parsed.name] = parsed.value;
    if (parsed.name === 'X-WR-CALNAME') groupName = unescapeIcal(parsed.value);
  }

  return { events, groupName };
}

function date(value, field, url) {
  const match = value?.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) throw new Error(`Meetup event ${url} has no valid ${field}.`);
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function eventId(event, url) {
  const match = event.UID?.match(/^event_(.+?)@meetup\.com$/);
  if (match) return match[1];
  const urlMatch = url.match(/\/events\/([^/?#]+)/);
  if (urlMatch) return urlMatch[1];
  throw new Error(`Meetup calendar event has no recognized ID: ${url}`);
}

function eventSchema(html, url) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, script] of scripts) {
    const value = JSON.parse(script);
    const candidates = Array.isArray(value) ? value : value['@graph'] ?? [value];
    const event = candidates.find(({ '@type': type }) => type === 'Event');
    if (event) return event;
  }
  throw new Error(`Meetup event page has no Event structured data: ${url}`);
}

function eventMetadata(event) {
  const virtual = /(?:Online|Mixed)EventAttendanceMode$/.test(event.eventAttendanceMode ?? '');
  const locations = Array.isArray(event.location) ? event.location : [event.location].filter(Boolean);
  const place = locations.find(({ '@type': type }) => type === 'Place');

  if (!place) return { virtual, where: virtual ? 'Online' : '' };

  const address = place.address;
  const addressParts = typeof address === 'string'
    ? [address]
    : [address?.streetAddress, address?.addressLocality, address?.addressRegion, address?.addressCountry];
  const where = [place.name, ...addressParts].filter(Boolean).reduce(
    (parts, part) => parts.some((existing) => existing.toLowerCase().includes(part.toLowerCase())) ? parts : [...parts, part],
    [],
  ).join(', ');
  return { virtual, where };
}

function eventFile(event, metadata, groupName) {
  const url = event.URL;
  if (!url) throw new Error('Meetup calendar event has no URL.');

  const startDate = date(event.DTSTART, 'start date', url);
  const endDate = event.DTEND ? date(event.DTEND, 'end date', url) : undefined;
  const endDateField = endDate && endDate !== startDate ? `endDate: ${yaml(endDate)}\n` : '';
  const description = unescapeIcal(event.DESCRIPTION).trim();

  return `---\nmeetupEventId: ${yaml(eventId(event, url))}\nmeetupSource: meetup\nstartDate: ${yaml(startDate)}\n${endDateField}title: ${yaml(unescapeIcal(event.SUMMARY))}\nexternalUrl: ${yaml(url)}\nvirtual: ${metadata.virtual}\nwhere: ${yaml(metadata.where || groupName)}\n---\n${description}\n`;
}

async function groups() {
  const files = await readdir(USER_GROUPS_DIR, { withFileTypes: true });
  const urlnames = new Set();

  await Promise.all(files
    .filter((file) => file.isFile() && file.name !== '_index.md' && file.name.endsWith('.md'))
    .map(async (file) => {
      const content = await readFile(path.join(USER_GROUPS_DIR, file.name), 'utf8');
      const frontMatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontMatter) return;

      for (const [, url] of frontMatter[1].matchAll(/^\s*url:\s*["']?(https?:\/\/[^\s"']+)["']?\s*$/gmi)) {
        const match = url.match(/^https:\/\/(?:www\.)?meetup\.com\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (match) urlnames.add(match[1]);
      }
    }));

  return [...urlnames];
}

async function fetchGroupEvents(urlname) {
  const response = await fetch(`https://www.meetup.com/${urlname}/events/ical/`);
  if (!response.ok) throw new Error(`Meetup iCalendar feed returned ${response.status} for ${urlname}.`);

  const calendar = eventsFromIcal(await response.text());
  const events = await Promise.all(calendar.events.map(async (event) => {
    if (event.STATUS === 'CANCELLED') return { event };
    if (!event.URL || !event.DTSTART || !event.SUMMARY) {
      throw new Error(`Meetup calendar event for ${urlname} is missing required fields.`);
    }

    const page = await fetch(event.URL);
    if (!page.ok) throw new Error(`Meetup event page returned ${page.status}: ${event.URL}`);
    return { event, metadata: eventMetadata(eventSchema(await page.text(), event.URL)) };
  }));

  return { events, groupName: calendar.groupName || urlname };
}

async function calendarFiles() {
  const names = await readdir(CALENDAR_DIR);
  return Promise.all(names.filter((name) => name.endsWith('.md')).map(async (name) => ({
    file: path.join(CALENDAR_DIR, name),
    content: await readFile(path.join(CALENDAR_DIR, name), 'utf8'),
  })));
}

async function main() {
  const configuredGroups = await groups();
  if (configuredGroups.length === 0) {
    throw new Error(`No Meetup group links found in ${USER_GROUPS_DIR}.`);
  }
  const groupEvents = await Promise.all(configuredGroups.map(fetchGroupEvents));
  await mkdir(CALENDAR_DIR, { recursive: true });

  const calendar = await calendarFiles();
  const managed = new Set(calendar.filter(({ content }) => content.includes('meetupSource: meetup')).map(({ file }) => file));
  const manualUrls = new Set(calendar
    .filter(({ content }) => !content.includes('meetupSource: meetup'))
    .map(({ content }) => content.match(/^externalUrl:\s*["']?([^\s"']+)/m)?.[1])
    .filter(Boolean));
  const desired = new Map();

  for (const { events, groupName } of groupEvents) {
    for (const { event, metadata } of events) {
      if (event.STATUS === 'CANCELLED' || manualUrls.has(event.URL)) continue;
      desired.set(path.join(CALENDAR_DIR, `meetup-${eventId(event, event.URL)}.md`), eventFile(event, metadata, groupName));
    }
  }

  const changes = [];
  for (const [file, content] of desired) {
    const current = calendar.find((entry) => entry.file === file)?.content;
    if (current !== content) {
      changes.push(`${current === undefined ? 'add' : 'update'} ${file}`);
      if (!DRY_RUN) await writeFile(file, content);
    }
    managed.delete(file);
  }

  for (const file of managed) {
    changes.push(`remove ${file}`);
    if (!DRY_RUN) await rm(file);
  }

  console.log(changes.length ? changes.join('\n') : 'Meetup events are already synchronized.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
