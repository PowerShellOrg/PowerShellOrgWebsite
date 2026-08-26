import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API_URL = 'https://api.meetup.com/gql-ext';
const GROUPS_FILE = path.join('data', 'meetup_groups.json');
const CALENDAR_DIR = path.join('content', 'calendar');
const DRY_RUN = process.argv.includes('--dry-run');

const QUERY = `
  query UpcomingGroupEvents($urlname: ID!) {
    group(urlname: $urlname) {
      name
      events(input: { first: 100, filter: { status: "UPCOMING" } }) {
        edges {
          node {
            id
            title
            description
            dateTime
            eventUrl
            type
            venue {
              name
              address
              city
              state
              country
            }
          }
        }
      }
    }
  }
`;

function yaml(value) {
  return JSON.stringify(value ?? '');
}

function plainText(html = '') {
  return html
    .replace(/<\/(?:p|div|li|h[1-6])>/gi, '\n')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function venueLabel(venue, groupName, isVirtual) {
  if (isVirtual) return 'Online';

  const parts = [venue?.name, venue?.address, venue?.city, venue?.state, venue?.country]
    .filter(Boolean);
  return parts.length ? [...new Set(parts)].join(', ') : groupName;
}

function isVirtual(event) {
  return ['ONLINE', 'HYBRID'].includes(event.type);
}

function eventFile(event, groupName) {
  const virtual = isVirtual(event);
  const startDate = event.dateTime.slice(0, 10);
  const body = plainText(event.description);

  return `---\nmeetupEventId: ${yaml(String(event.id))}\nmeetupSource: meetup\nstartDate: ${yaml(startDate)}\ntitle: ${yaml(event.title)}\nexternalUrl: ${yaml(event.eventUrl)}\nvirtual: ${virtual}\nwhere: ${yaml(venueLabel(event.venue, groupName, virtual))}\n---\n${body}\n`;
}

async function groups() {
  const parsed = JSON.parse(await readFile(GROUPS_FILE, 'utf8'));
  if (!Array.isArray(parsed) || !parsed.every(({ urlname }) => typeof urlname === 'string' && urlname)) {
    throw new Error(`${GROUPS_FILE} must be an array of Meetup group objects with a urlname.`);
  }
  return parsed;
}

async function fetchEvents(urlname, token) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { urlname } }),
  });

  if (!response.ok) {
    throw new Error(`Meetup returned ${response.status} for ${urlname}.`);
  }

  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(`Meetup query failed for ${urlname}: ${result.errors.map(({ message }) => message).join('; ')}`);
  }
  if (!result.data?.group) {
    throw new Error(`Meetup group ${urlname} was not found or is not accessible to this token.`);
  }

  return result.data.group;
}

async function managedFiles() {
  const names = await readdir(CALENDAR_DIR);
  const files = await Promise.all(names.filter((name) => name.endsWith('.md')).map(async (name) => {
    const file = path.join(CALENDAR_DIR, name);
    const content = await readFile(file, 'utf8');
    return content.includes('meetupSource: meetup') ? file : null;
  }));
  return files.filter(Boolean);
}

async function main() {
  const token = process.env.MEETUP_ACCESS_TOKEN;
  if (!token) {
    throw new Error('MEETUP_ACCESS_TOKEN is required. Create it from a Meetup OAuth client and store it as a repository secret.');
  }

  const configuredGroups = await groups();
  const result = await Promise.all(configuredGroups.map(({ urlname }) => fetchEvents(urlname, token)));
  const desired = new Map();

  for (const group of result) {
    for (const { node: event } of group.events.edges) {
      if (!event.id || !event.dateTime || !event.eventUrl || !event.title) {
        throw new Error(`Meetup event from ${group.name} is missing required calendar fields.`);
      }
      desired.set(path.join(CALENDAR_DIR, `meetup-${event.id}.md`), eventFile(event, group.name));
    }
  }

  await mkdir(CALENDAR_DIR, { recursive: true });
  const existing = new Set(await managedFiles());
  const changes = [];

  for (const [file, content] of desired) {
    let current;
    try {
      current = await readFile(file, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (current !== content) {
      changes.push(`${current === undefined ? 'add' : 'update'} ${file}`);
      if (!DRY_RUN) await writeFile(file, content);
    }
    existing.delete(file);
  }

  for (const file of existing) {
    changes.push(`remove ${file}`);
    if (!DRY_RUN) await rm(file);
  }

  console.log(changes.length ? changes.join('\n') : 'Meetup events are already synchronized.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
