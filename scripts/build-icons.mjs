#!/usr/bin/env node
// Regenerates the self-hosted Font Awesome subset: assets/css/fontawesome-subset.css
// plus assets/fonts/fa-{solid,brands,regular}-subset.woff2 containing ONLY the
// glyphs the built site actually uses (a few KB vs ~270 KB of CDN webfonts).
//
// Prereq: `npm install` (needs @fortawesome/fontawesome-free + subset-font devDeps).
// Run after changing markup/content that introduces new `fa-*` icon classes:
//     npm run build:icons
// then commit the regenerated assets/css/fontawesome-subset.css and the
// assets/fonts/fa-*-subset.woff2 files. CI ships the committed files as-is
// (deploy builds run bare `hugo`, not this script) — same model as build:css.
//
// Detection mirrors PurgeCSS: we scan the fully built HTML output, so icons
// pulled from content frontmatter or data files are captured automatically.
// Routing/codepoints come from Font Awesome's own metadata (icon-families.json),
// including FA5-era alias names (e.g. fa-ticket-alt -> ticket-simple) so legacy
// class names in the markup are not silently dropped.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import subsetFont from 'subset-font';

const FA = 'node_modules/@fortawesome/fontawesome-free';
const BASE_URL = 'https://powershell.org';
const SRC_DIR = 'tmp/icons-src';
const CSS_OUT = 'assets/css/fontawesome-subset.css';
const FONT_OUT = {
  solid: 'assets/fonts/fa-solid-subset.woff2',
  brands: 'assets/fonts/fa-brands-subset.woff2',
  regular: 'assets/fonts/fa-regular-subset.woff2',
};
const FONT_SRC = {
  solid: 'fa-solid-900.ttf',
  brands: 'fa-brands-400.ttf',
  regular: 'fa-regular-400.ttf',
};

// Icons injected only at runtime (JS/Alpine) that never appear in static HTML.
// Keep minimal — anything rendered server-side is detected automatically.
const SAFELIST = [];

// 1. Build a token -> { unicode, styles } lookup from FA metadata, registering
//    each icon under its canonical name AND its alias names.
const meta = JSON.parse(readFileSync(join(FA, 'metadata', 'icon-families.json'), 'utf8'));
const lookup = new Map();
for (const [name, e] of Object.entries(meta)) {
  const styles = new Set((e.familyStylesByLicense?.free ?? []).map((s) => s.style));
  if (styles.size === 0) continue;
  const record = { unicode: e.unicode, styles };
  lookup.set(name, record);
  for (const alias of e.aliases?.names ?? []) if (!lookup.has(alias)) lookup.set(alias, record);
}

// Pick the webfont that should carry a given icon (the site uses fas/fab, so
// prefer solid over regular for dual-style icons).
function fontFor(styles) {
  if (styles.has('brands')) return 'brands';
  if (styles.has('solid')) return 'solid';
  if (styles.has('regular')) return 'regular';
  return null;
}

// 2. Bootstrap placeholder outputs so the scan build's resources.Get calls don't
//    fail on a fresh checkout (the HTML markup is independent of these bytes).
for (const f of [CSS_OUT, ...Object.values(FONT_OUT)]) {
  if (!existsSync(f)) {
    mkdirSync(resolve(f, '..'), { recursive: true });
    writeFileSync(f, f.endsWith('.css') ? '/* placeholder — regenerated below */' : Buffer.alloc(0));
  }
}

// 3. Build the site so we can scan the real output HTML.
console.log('> building site to', SRC_DIR);
execSync(`hugo --destination ${SRC_DIR} --baseURL ${BASE_URL}`, { stdio: 'inherit' });

// 4. Collect every `fa-*` token from the built HTML.
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const tokens = new Set(SAFELIST);
for (const file of htmlFiles(SRC_DIR)) {
  const html = readFileSync(file, 'utf8');
  const re = /\bfa-([a-z0-9-]+)\b/g;
  let m;
  while ((m = re.exec(html))) tokens.add(m[1]);
}

// 5. Resolve tokens to real icons and group by webfont. Tokens that don't match
//    a Font Awesome icon (utility classes like fa-fw / fa-lg, unrelated `fa-*`
//    strings) are simply ignored.
const used = { solid: new Map(), brands: new Map(), regular: new Map() };
for (const token of tokens) {
  const rec = lookup.get(token);
  if (!rec) continue;
  const font = fontFor(rec.styles);
  if (font) used[font].set(token, rec.unicode);
}

// 6. Subset each non-empty font to its used glyphs.
for (const style of ['solid', 'brands', 'regular']) {
  const icons = used[style];
  if (icons.size === 0) {
    // No icons for this style — don't ship an empty font (and clean up a stale one).
    if (existsSync(FONT_OUT[style])) rmSync(FONT_OUT[style]);
    continue;
  }
  const text = [...new Set(icons.values())].map((cp) => String.fromCodePoint(parseInt(cp, 16))).join('');
  const src = readFileSync(join(FA, 'webfonts', FONT_SRC[style]));
  const out = await subsetFont(src, text, { targetFormat: 'woff2' });
  writeFileSync(FONT_OUT[style], out);
  console.log(`> ${style}: ${icons.size} classes -> ${FONT_OUT[style]} (${(out.length / 1024).toFixed(1)} KB)`);
}

// 7. Emit the subset CSS: base rules + only the used per-icon `content` rules,
//    keyed by the class name actually used (alias names included).
//    @font-face is declared in baseof.html so the woff2 URLs can be fingerprinted.
let css = [
  '.fa,.fas,.fa-solid,.far,.fa-regular,.fab,.fa-brands{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}',
  '.fa,.fas,.fa-solid{font-family:"Font Awesome 6 Free";font-weight:900}',
  '.far,.fa-regular{font-family:"Font Awesome 6 Free";font-weight:400}',
  '.fab,.fa-brands{font-family:"Font Awesome 6 Brands";font-weight:400}',
].join('\n');
const all = new Map([...used.solid, ...used.brands, ...used.regular]);
for (const [name, cp] of [...all].sort((a, b) => a[0].localeCompare(b[0]))) {
  css += `\n.fa-${name}:before{content:"\\${cp}"}`;
}
writeFileSync(CSS_OUT, css + '\n');

console.log(
  `> done — ${all.size} classes (${used.solid.size} solid, ${used.brands.size} brands, ${used.regular.size} regular)`
);
console.log(`> ${CSS_OUT} (${(Buffer.byteLength(css) / 1024).toFixed(1)} KB)`);
