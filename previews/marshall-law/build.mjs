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
import { CLIENT, FLAGS, HEADSHOT_FILE, IMAGES } from './data/client.mjs';

const OUT = 'dist';

/* -------------------------------------------------------------------------
   BASE_PATH — serving the preview from a sub-path.

   A GitHub Pages *project* site lives at /<repo>/, not at the root, so every
   absolute link in the build ("/about/", "/styles.css") would 404 there.

   This is done as ONE post-processing pass over the emitted HTML rather than
   by threading a link() helper through ~250 call sites, because a helper is
   something a future edit can forget and this is not. Only root-relative
   paths are touched: absolute URLs, mailto:, tel: and bare #anchors are left
   exactly as they are, and so are the canonical/sitemap URLs, which point at
   her real domain and must never carry a base path.

   Unset (the normal case) it is a no-op.
   ---------------------------------------------------------------------- */
const BASE = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const withBase = (html) =>
  BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html;

const write = (rel, contents) => {
  const path = join(OUT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

/* Pages */
for (const p of PAGES) write(p.file, withBase(p.render()));

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

/* _headers — Cloudflare Pages reads this and sends the headers on every
   response. Belt and braces on top of the <meta robots> and robots.txt: an
   X-Robots-Tag header is obeyed even for a file type that cannot carry a meta
   tag (the PDFs, the SVGs), and it applies even if someone links straight to
   an asset. Harmless anywhere else — a static host that does not understand
   the file just serves it as a text file nobody requests. */
if (FLAGS.isPreview) write('_headers', [
  '/*',
  '  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet',
  '  X-Frame-Options: SAMEORIGIN',
  '  Referrer-Policy: no-referrer',
  '  Cache-Control: no-store',
  '',
].join('\n'));

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

if (BASE) console.log(`build: mounted at ${BASE}/ — every root-relative link rewritten`);
const flags = Object.entries(FLAGS).map(([k, v]) => `${k}=${v}`).join('  ');
/* Say out loud which gate is open and which is not, every run. A photo that
   silently fails to appear is the kind of thing you discover in the meeting. */
const gate = FLAGS.isPreview ? FLAGS.headshotPreviewUse : FLAGS.headshotPublishRights;
const gateName = FLAGS.isPreview ? 'preview use' : 'PUBLISH rights';
console.log(`build: headshot — file ${HEADSHOT_FILE ? `assets/${HEADSHOT_FILE} ✓` : '✗ none in assets/'}` +
            `, ${gateName} ${gate ? '✓' : '✗'}` +
            ` → ${FLAGS.hasHeadshot ? 'RENDERING her photo' : 'placeholder frame'}`);
if (!HEADSHOT_FILE && gate)
  console.log('build:   ↳ permission is given; drop the image at assets/keyanna-marshall.jpg and rebuild.');
for (const [slot, img] of Object.entries(IMAGES))
  if (slot !== 'headshot') console.log(`build: image slot "${slot}" — ${img.file ? `assets/${img.file} ✓` : 'empty'}`);
console.log(`build: ${PAGES.length} pages → ${OUT}/`);
console.log(`build: flags  ${flags}`);
if (!existsSync(join(OUT, 'assets/fonts/jost-latin-var.woff2')))
  { console.error('build: fonts missing from dist/'); process.exit(1); }
