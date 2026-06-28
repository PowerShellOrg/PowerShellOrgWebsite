// Strips unused Tailwind 2.2.19 rules against the fully built site.
// Retained rules are byte-identical to the CDN file, so there is no visual
// change for classes actually used anywhere in the output.
//
// Regenerate after changing markup that introduces new Tailwind classes:
//     npm run build:css      (see scripts/build-tailwind.mjs)
// then commit the updated assets/css/tailwind.css.
module.exports = {
  content: ['tmp/purge-src/**/*.html', 'tmp/purge-src/**/*.js'],
  css: ['tmp/tailwind-src.css'],
  // Tailwind-aware extractor: keep `:` `/` `.` `%` in candidate class tokens.
  defaultExtractor: (content) => content.match(/[\w-/:%.\[\]!]+/g) || [],
  // Classes toggled only at runtime (Alpine `:class`, JS classList) — these do
  // appear as literals in the built HTML, but pin them so markup churn is safe.
  safelist: {
    standard: [
      'hidden', 'block', 'flex',
      'transform', 'absolute', 'inset-0', 'w-full', 'h-full',
      /^rotate-/, /^translate-/, /^opacity-/, /^scale-/,
      // Activity-dot colors injected at build time from data/community_stats.json
      // (see .github/scripts/fetch-discourse-activity.js + deploy.yml fallback).
      // These never appear in committed markup, so pin the whole status palette.
      'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-orange-500', 'bg-red-500', 'bg-yellow-500',
    ],
  },
  output: 'assets/css/tailwind.css',
};
