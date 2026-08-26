/**
 * Build the Marshall Law preview into dist/.
 *
 * No dependencies, no framework, no build cache. `node build.mjs` and it is
 * done. The whole point of the pitch is that the "powered by GoDaddy" era ends
 * visibly — a site that needs a toolchain to change a phone number has not
 * really ended it.
 */
import { mkdirSync, writeFileSync, rmSync, cpSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PAGES } from './lib/pages.mjs';
import { CLIENT, FLAGS, HEADSHOT_FILE } from './data/client.mjs';

const OUT = 'dist';
const write = (rel, contents) => {
  const path = join(OUT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

/* Pages */
for (const p of PAGES) write(p.file, p.render());

/* Stylesheet and assets, copied verbatim. */
write('styles.css', readFileSync('lib/styles.css', 'utf8'));
/* The one script that ships. /start/ works fully without it — it adds autosave
   and the copyable summary, nothing more. */
write('intake.js', readFileSync('lib/intake.js', 'utf8'));
cpSync('assets', join(OUT, 'assets'), { recursive: true });

/* Favicon — her scales glyph in the rose, matching the header mark. Written
   here rather than kept as a file so it cannot drift from the palette. */
write('assets/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F49AC1" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect width="24" height="24" rx="5" fill="#1F1823" stroke="none"/><g transform="translate(2.4 2.4) scale(0.8)"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></g></svg>`);

/* robots.txt — a preview is never crawlable. This is not a toggle to forget:
   FLAGS.isPreview also drives the noindex meta on every page, and audit.mjs
   asserts the two agree with each other. */
write('robots.txt', FLAGS.isPreview
  ? `# PREVIEW BUILD — Front Porch Collective.\n# Marshall Law Practice, LLC has not signed. This build must never be indexed.\nUser-agent: *\nDisallow: /\n`
  : `User-agent: *\nAllow: /\nSitemap: ${CLIENT.websiteUrl}/sitemap.xml\n`);

/* sitemap.xml — built even in preview so the shape is reviewable, and pointed
   at her canonical domain rather than wherever this happens to be served. */
const urls = PAGES.filter((p) => p.route !== '/404/')
  .map((p) => `  <url><loc>${CLIENT.websiteUrl}${p.route}</loc></url>`).join('\n');
write('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const flags = Object.entries(FLAGS).map(([k, v]) => `${k}=${v}`).join('  ');
console.log(`build: headshot ${HEADSHOT_FILE ? `file assets/${HEADSHOT_FILE} found` : 'no file in assets/'}` +
            `, permission ${FLAGS.headshotPermission ? 'given' : 'NOT given'}` +
            ` → ${FLAGS.hasHeadshot ? 'RENDERING her photo' : 'rendering the placeholder frame'}`);
console.log(`build: ${PAGES.length} pages → ${OUT}/`);
console.log(`build: flags  ${flags}`);
if (!existsSync(join(OUT, 'assets/fonts/jost-latin-var.woff2')))
  { console.error('build: fonts missing from dist/'); process.exit(1); }
