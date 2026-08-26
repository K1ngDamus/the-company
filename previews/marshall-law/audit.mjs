/**
 * Preview audit — the gate between "it looks finished" and "it is finished".
 *
 * Adapted from the company site's scripts/audit.mjs (same dependency-free
 * approach, same non-zero exit) and extended with the four things that only
 * matter because this is an UNSIGNED CLIENT PREVIEW:
 *
 *   • the FPC watermark is on every page, and its CSS is still in the sheet
 *   • the preview footer line is on every page
 *   • noindex and robots.txt agree with FLAGS.isPreview
 *   • no unverified claim has crept in — checked by asserting the exact strings
 *     that must not appear while the flags behind them are false
 *
 * A watermark that can be removed by deleting one line of markup is not a
 * watermark. This is the half that makes removing it deliberate.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { CLIENT, FLAGS } from './data/client.mjs';

const DIST = 'dist';
/* The build can be mounted under a sub-path (a Pages project URL). Links carry
   the prefix; the files on disk do not. Read the same env the build read, so a
   link that lost its prefix shows up here as a dead link rather than in a
   browser. Same approach as the company site's scripts/audit.mjs. */
const BASE = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const MARK_PATH = 'M60,26 V94';   // the FPC monogram's stem — canon geometry
const DESC_MIN = 50, DESC_MAX = 170;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const all = walk(DIST);
const pages = all.filter((f) => extname(f) === '.html').sort();
if (!pages.length) { console.error('No HTML in dist/ — did the build run?'); process.exit(1); }

const routes = new Set();
const route = (r) => routes.add((BASE + r).replace(/\/$/, '') || '/');
route('/robots.txt'); route('/sitemap.xml');
for (const f of pages) {
  const rel = relative(DIST, f);
  if (rel === '404.html') { route('/404'); continue; }
  route(('/' + rel.replace(/index\.html$/, '')).replace(/\/$/, '') || '/');
}
for (const f of all) if (extname(f) !== '.html') route('/' + relative(DIST, f).split('\\').join('/'));

const findings = [];
const add = (page, msg) => findings.push(`${relative(DIST, page)} — ${msg}`);

/* Claims that may never appear while the flag behind them is false. If one of
   these shows up, someone wrote a promise the client never made. */
const FORBIDDEN = [
  ...(FLAGS.consultIsFree ? [] : [
    ['free consultation', 'consult cost is unverified (FLAGS.consultIsFree is false)'],
    ['free case evaluation', 'consult cost is unverified'],
  ]),
  ['no fee unless we win', 'contingency claim — never verified, and wrong for defense work'],
  ['best criminal defense', 'superlative — GA Rules of Professional Conduct 7.1'],
  ['we guarantee', 'outcome guarantee — GA Rules of Professional Conduct 7.1'],
  ['years of experience', 'years licensed is unverified (OPEN.yearsLicensed)'],
  ['licensed since', 'admission year is unverified (OPEN.yearsLicensed)'],
];

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const text = html.toLowerCase();

  const h1s = html.match(/<h1[^>]*>/g) ?? [];
  if (h1s.length !== 1) add(page, `${h1s.length} <h1> tags (want exactly 1)`);

  const desc = html.match(/name="description" content="([^"]*)"/);
  if (!desc) add(page, 'no meta description');
  else if (desc[1].length < DESC_MIN || desc[1].length > DESC_MAX)
    add(page, `meta description ${desc[1].length} chars (want ${DESC_MIN}–${DESC_MAX})`);

  if (!/rel="canonical"/.test(html)) add(page, 'no canonical link');

  /* --- the preview gates ------------------------------------------------ */
  if (!html.includes('class="fpc-mark watermark"'))
    add(page, 'NO WATERMARK — the fixed FPC mark is missing from this page');
  if (!html.includes('class="watermark-field"'))
    add(page, 'no watermark-field — export/print watermark missing');
  if (!html.includes('Not a live site.'))
    add(page, 'no preview footer line');
  if (html.split(MARK_PATH).length - 1 < 1)
    add(page, 'the FPC monogram geometry does not appear on this page');
  if (FLAGS.isPreview && !/name="robots" content="noindex/.test(html))
    add(page, 'FLAGS.isPreview is true but this page is missing noindex');
  if (!FLAGS.isPreview && /name="robots" content="noindex/.test(html))
    add(page, 'FLAGS.isPreview is false but this page still carries noindex');

  for (const [phrase, why] of FORBIDDEN)
    if (text.includes(phrase)) add(page, `FORBIDDEN CLAIM "${phrase}" — ${why}`);

  /* NAP consistency. One character of drift across pages is a ranking problem
     that nobody catches by reading. */
  if (html.includes(CLIENT.nap.street) && !html.includes(CLIENT.nap.zip))
    add(page, 'address appears without the ZIP — NAP must be identical everywhere');
  /* Her number must never drift. Two other numbers are legitimately on the
     build: the example in the form's placeholder, and Front Porch's own number
     on the pages that are FROM us (/start/, /review-card/). Both are listed
     explicitly so a genuinely wrong number still fails. */
  const ALLOWED_PHONES = new Set([CLIENT.phone, '(762) 555-0123', '(678) 525-8154']);
  for (const m of html.matchAll(/\(\d{3}\)\s?\d{3}-\d{4}/g))
    if (!ALLOWED_PHONES.has(m[0]))
      add(page, `phone drift: "${m[0]}" is not ${CLIENT.phone}`);

  /* --- structure -------------------------------------------------------- */
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(block[1]);
      if (data.aggregateRating)
        add(page, 'aggregateRating in JSON-LD — self-serving review markup, deliberately omitted');
      if (data.geo) add(page, 'geo in JSON-LD — coordinates are unverified (OPEN.geo)');
    } catch (e) { add(page, `invalid JSON-LD: ${e.message}`); }
  }

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const isBare = href.startsWith('#');
    const base = isBare ? null : (href.split('#')[0].replace(/\/$/, '') || '/');
    const frag = href.includes('#') ? href.split('#')[1] : null;
    if (base && !routes.has(base)) add(page, `dead link → ${href}`);
    if (frag) {
      /* Strip the base prefix to get back to the path on disk. */
      const onDisk = !isBare && BASE && base.startsWith(BASE) ? (base.slice(BASE.length) || '/') : base;
      const target = isBare ? page
        : join(DIST, onDisk === '/' ? 'index.html' : onDisk + '/index.html');
      try {
        if (!readFileSync(target, 'utf8').includes(`id="${frag}"`)) add(page, `dead anchor → ${href}`);
      } catch { /* dead base already reported */ }
    }
  }

  for (const svg of html.match(/<svg[^>]*>/g) ?? [])
    if (!/aria-hidden|aria-label|role="img"/.test(svg))
      add(page, `<svg> with no accessible name or aria-hidden: ${svg.slice(0, 60)}…`);

  /* Chip controls wrap their input inside the <label>, which is a valid
     labelling method with no `for` to find. Exempt the ones that ACTUALLY sit
     inside such a label rather than exempting a type wholesale — a stray radio
     or checkbox outside a chip is still a real finding. */
  const wrapped = new Set(
    [...html.matchAll(/<label class="(?:choice|check)"[^>]*>\s*(<input[^>]*>)/g)].map((m) => m[1]),
  );
  for (const input of html.match(/<input[^>]*>/g) ?? []) {
    if (/type="hidden"/.test(input)) continue;
    if (wrapped.has(input)) continue;
    if (/aria-hidden="true"/.test(input) && /tabindex="-1"/.test(input)) continue;  // honeypot
    if (/aria-label/.test(input)) continue;
    const id = input.match(/id="([^"]+)"/);
    if (!id || !html.includes(`for="${id[1]}"`))
      add(page, `unlabelled input: ${input.slice(0, 70)}…`);
  }

  /* Duplicate ids silently break label/input association and anchor links. */
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  for (const d of dupes) add(page, `duplicate id="${d}"`);
}

/* --- whole-build gates --------------------------------------------------- */
const css = readFileSync(join(DIST, 'styles.css'), 'utf8');
/* Match the RULE, not the substring. `css.includes('.watermark')` is satisfied
   by `.watermark-field` alone, so it passed even with the main rule deleted —
   found by deleting it on purpose, which is the only way that surfaces. */
for (const sel of ['.watermark', '.watermark-field', '.watermark__caption']) {
  const rule = new RegExp(`^\\${sel}\\s*\\{`, 'm');
  if (!rule.test(css)) findings.push(`styles.css — watermark rule "${sel} {" has been removed`);
}
if (!/opacity:\s*0\.1[2-5]/.test(css))
  findings.push('styles.css — watermark opacity is outside the 12–15% the brief specifies');

const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (FLAGS.isPreview && !/^Disallow:\s*\/\s*$/m.test(robots))
  findings.push('robots.txt — preview build is not disallowed to crawlers');

const bytes = all.reduce((n, f) => n + statSync(f).size, 0);
console.log(`audit: ${pages.length} pages, ${(bytes / 1024).toFixed(1)} KB total`);

if (findings.length) {
  console.error(`\n${findings.length} finding(s):`);
  for (const f of findings) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log('audit: no findings');
