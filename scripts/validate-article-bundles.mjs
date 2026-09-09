#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const contentRoot = 'content/articles';
const outputRoot = 'public';
const inventory = JSON.parse(readFileSync('scripts/article-route-inventory.json', 'utf8'));
const failures = [];

function fail(message) { failures.push(message); }

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function frontMatter(markdown) {
  return markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] ?? '';
}

function stringValue(metadata, field) {
  return metadata.match(new RegExp(`^${field}:\\s*["']?([^\\n"']+)["']?\\s*$`, 'm'))?.[1].trim();
}

function listValues(metadata, field) {
  const values = metadata.match(new RegExp(`^${field}:\\s*\\r?\\n((?:\\s{2}- .+\\r?\\n?)*)`, 'm'))?.[1] ?? '';
  return [...values.matchAll(/^\s{2}-\s+(.+)$/gm)].map((value) => value[1].trim());
}

function outputFile(route) { return join(outputRoot, route.replace(/^\//, ''), 'index.html'); }
function checkOutput(route, description) {
  if (!existsSync(outputFile(route))) fail(`${description} does not render at ${route}`);
}
function includesRoute(html, route) {
  return html.includes(`href=${route}`) || html.includes(`href="${route}"`) || html.includes(route);
}
function archiveHtml(route) {
  const directory = join(outputRoot, route.replace(/^\//, ''));
  const files = [join(directory, 'index.html'), ...(existsSync(join(directory, 'page')) ? walk(join(directory, 'page')).filter((path) => path.endsWith('index.html')) : [])];
  return files.filter(existsSync).map((path) => readFileSync(path, 'utf8')).join('\n');
}
function urlize(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

const sourceArticles = new Map();
for (const path of walk(contentRoot).filter((path) => path.endsWith(`${sep}index.md`) && path !== join(contentRoot, '_index.md'))) {
  const parts = relative(contentRoot, path).split(sep);
  if (parts.length !== 4 || !/^\d{4}$/.test(parts[0]) || !/^\d{2}$/.test(parts[1])) continue;
  const markdown = readFileSync(path, 'utf8');
  const metadata = frontMatter(markdown);
  const route = stringValue(metadata, 'url');
  if (!route) fail(`Article must declare its preserved dated URL: ${path}`);
  else sourceArticles.set(route, { aliases: listValues(metadata, 'aliases'), authors: listValues(metadata, 'authors'), categories: listValues(metadata, 'categories'), tags: listValues(metadata, 'tags'), year: parts[0], month: parts[1], path });
  for (const asset of markdown.matchAll(/\]\((\/images\/articles\/[^)#?]+)/g)) {
    if (!existsSync(join(outputRoot, asset[1].replace(/^\//, '')))) fail(`Referenced static asset is missing: ${asset[1]} (${path})`);
  }
}

const inventoryByRoute = new Map(inventory.map((article) => [article.route, article]));
for (const route of sourceArticles.keys()) if (!inventoryByRoute.has(route)) fail(`Unexpected Article route: ${route}`);
for (const article of inventory) {
  const source = sourceArticles.get(article.route);
  if (!source) { fail(`Missing migrated Article for preserved route: ${article.route}`); continue; }
  if (article.aliases.some((alias) => !source.aliases.includes(alias))) fail(`Article aliases changed: ${article.route}`);
  for (const field of ['authors', 'categories', 'tags']) if (JSON.stringify(source[field]) !== JSON.stringify(article[field])) fail(`Article ${field} changed: ${article.route}`);
  if (article.draft) continue;
  checkOutput(article.route, `Article ${source.path}`);
  for (const alias of article.aliases) {
    checkOutput(alias, `Alias for ${source.path}`);
    if (existsSync(outputFile(alias)) && !readFileSync(outputFile(alias), 'utf8').includes(article.route)) fail(`Alias does not redirect to its Article: ${alias}`);
  }
}

const articleOutput = join(outputRoot, 'articles');
const listingHtml = archiveHtml('/articles/');
for (const article of inventory.filter((article) => !article.draft)) {
  if (!includesRoute(listingHtml, article.route)) fail(`Article is missing from the paginated Articles archive: ${article.route}`);
  for (const [taxonomy, terms] of Object.entries({ authors: article.authors, categories: article.categories, tags: article.tags })) {
    for (const term of terms) if (!includesRoute(archiveHtml(`/${taxonomy}/${urlize(term)}/`), article.route)) fail(`Article is missing from ${taxonomy} term ${term}: ${article.route}`);
  }
}

for (const year of readdirSync(contentRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const yearRoute = `/articles/${year.name}/`;
  if (!existsSync(join(contentRoot, year.name, '_index.md'))) fail(`Year branch is missing _index.md: ${year.name}`);
  else checkOutput(yearRoute, `Year archive ${year.name}`);
  const yearHtml = archiveHtml(yearRoute);
  for (const [route, source] of sourceArticles) if (source.year === year.name && !inventoryByRoute.get(route).draft && !includesRoute(yearHtml, route)) fail(`Article is missing from its year archive: ${route}`);
  for (const month of readdirSync(join(contentRoot, year.name), { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const monthRoute = `${yearRoute}${month.name}/`;
    if (!existsSync(join(contentRoot, year.name, month.name, '_index.md'))) fail(`Month branch is missing _index.md: ${year.name}/${month.name}`);
    else checkOutput(monthRoute, `Month archive ${year.name}/${month.name}`);
    const monthHtml = archiveHtml(monthRoute);
    for (const [route, source] of sourceArticles) if (source.year === year.name && source.month === month.name && !inventoryByRoute.get(route).draft && !includesRoute(monthHtml, route)) fail(`Article is missing from its month archive: ${route}`);
  }
}

const feedPath = join(articleOutput, 'index.xml');
if (!existsSync(feedPath)) fail('Articles RSS feed is missing');
else {
  const feed = readFileSync(feedPath, 'utf8');
  for (const article of inventory.filter((article) => !article.draft)) if (!feed.includes(article.route)) fail(`Article is missing from the Articles RSS feed: ${article.route}`);
}

if (failures.length) {
  console.error(`Article bundle contract failed (${failures.length}):`);
  for (const message of failures) console.error(`- ${message}`);
  process.exitCode = 1;
} else console.log('Article bundle contract passed');
