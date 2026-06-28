#!/usr/bin/env node
// Regenerates assets/css/tailwind.css — the Tailwind 2.2.19 utility set purged
// down to only the classes the built site actually uses (~35 KB vs ~2.9 MB).
//
// Prereq: `npm install` (needs the `purgecss` devDependency).
// Run after changing markup that introduces new Tailwind classes:
//     npm run build:css
// then commit the updated assets/css/tailwind.css. CI ships the committed file
// as-is (the deploy builds run bare `hugo`, not this script).
//
// Steps: download the pinned Tailwind source, build the whole site to a throwaway
// dir, then purge the source against that output using purgecss.config.cjs.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { PurgeCSS } from 'purgecss';

const TAILWIND_VERSION = '2.2.19';
const SRC_URL = `https://cdn.jsdelivr.net/npm/tailwindcss@${TAILWIND_VERSION}/dist/tailwind.min.css`;
const BASE_URL = 'https://powershell.org';

const config = createRequire(import.meta.url)(resolve('purgecss.config.cjs'));

mkdirSync('tmp', { recursive: true });

console.log(`> downloading Tailwind ${TAILWIND_VERSION}`);
const res = await fetch(SRC_URL);
if (!res.ok) throw new Error(`failed to download ${SRC_URL}: ${res.status}`);
writeFileSync('tmp/tailwind-src.css', Buffer.from(await res.arrayBuffer()));

// baseof.html does `resources.Get "css/tailwind.css"`, so the input build needs
// the file to exist. On a fresh checkout it's committed; only bootstrap a
// placeholder when missing (class usage in the HTML is independent of its bytes).
if (!existsSync(config.output)) {
  mkdirSync(resolve(config.output, '..'), { recursive: true });
  writeFileSync(config.output, '/* placeholder — regenerated below */');
}

console.log('> building site to tmp/purge-src');
execSync(`hugo --destination tmp/purge-src --baseURL ${BASE_URL}`, { stdio: 'inherit' });

console.log('> purging unused Tailwind rules');
const [result] = await new PurgeCSS().purge(config);
writeFileSync(config.output, result.css);

console.log(`> done — ${config.output} regenerated (${result.css.length} bytes)`);
