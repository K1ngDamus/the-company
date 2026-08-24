/**
 * Page audit — the checks that were run by hand through the whole build, now
 * owned by the repo so they run for anyone on every push.
 *
 * Deliberately dependency-free: it reads the built HTML in dist/ with regex
 * rather than pulling in a parser. The checks are structural enough that this
 * holds, and it keeps CI to one `npm ci` with nothing extra to install.
 *
 * Exits non-zero on any finding, so CI fails rather than reporting quietly.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const DIST = 'dist';
const MARK_PATH = 'M60,26 V94';        // the FPC monogram's stem
const DESC_MIN = 50, DESC_MAX = 170;   // what search engines actually show

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
if (pages.length === 0) {
  console.error('No HTML in dist/ — did the build run?');
  process.exit(1);
}

/* Every URL the built site actually serves. */
const routes = new Set(['/sitemap.xml', '/robots.txt']);
for (const f of pages) {
  const rel = relative(DIST, f);
  if (rel === '404.html') { routes.add('/404'); continue; }
  routes.add(('/' + rel.replace(/index\.html$/, '')).replace(/\/$/, '') || '/');
}
for (const f of all) {
  if (extname(f) !== '.html') routes.add('/' + relative(DIST, f));
}

const findings = [];
const add = (page, msg) => findings.push(`${relative(DIST, page)} — ${msg}`);

for (const page of pages) {
  const html = readFileSync(page, 'utf8');

  const h1s = html.match(/<h1[^>]*>/g) ?? [];
  if (h1s.length !== 1) add(page, `${h1s.length} <h1> tags (want exactly 1)`);

  const desc = html.match(/name="description" content="([^"]*)"/);
  if (!desc) add(page, 'no meta description');
  else if (desc[1].length < DESC_MIN || desc[1].length > DESC_MAX)
    add(page, `meta description ${desc[1].length} chars (want ${DESC_MIN}–${DESC_MAX})`);

  if (!/rel="canonical"/.test(html)) add(page, 'no canonical link');

  /* Company law, bible v1.3: the mark ships on every page — header and footer. */
  const marks = html.split(MARK_PATH).length - 1;
  if (marks < 2) add(page, `FPC mark appears ${marks}× (want header + footer)`);

  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(block[1]); }
    catch (e) { add(page, `invalid JSON-LD: ${e.message}`); }
  }

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const isBare = href.startsWith('#');
    const base = isBare ? null : (href.split('#')[0].replace(/\/$/, '') || '/');
    const frag = href.includes('#') ? href.split('#')[1] : null;
    if (base && !routes.has(base)) add(page, `dead link → ${href}`);
    if (frag) {
      const target = isBare ? page
        : join(DIST, base === '/' ? 'index.html' : base + '/index.html');
      try {
        if (!readFileSync(target, 'utf8').includes(`id="${frag}"`))
          add(page, `dead anchor → ${href}`);
      } catch { /* dead base already reported above */ }
    }
  }

  for (const svg of html.match(/<svg[^>]*>/g) ?? []) {
    if (!/aria-hidden|aria-label/.test(svg))
      add(page, `<svg> with no aria-hidden or aria-label: ${svg.slice(0, 60)}…`);
  }

  for (const input of html.match(/<input[^>]*>/g) ?? []) {
    if (/type="hidden"/.test(input)) continue;
    if (/type="radio"/.test(input)) continue;      // wrapped in <label class="choice">
    if (/name="_gotcha"/.test(input)) continue;    // honeypot, visually-hidden label
    if (/aria-label/.test(input)) continue;
    const id = input.match(/id="([^"]+)"/);
    if (!id || !html.includes(`for="${id[1]}"`))
      add(page, `unlabelled input: ${input.slice(0, 70)}…`);
  }
}

const bytes = all.reduce((n, f) => n + statSync(f).size, 0);
console.log(`audit: ${pages.length} pages, ${(bytes / 1024).toFixed(1)} KB total`);

if (findings.length) {
  console.error(`\n${findings.length} finding(s):`);
  for (const f of findings) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log('audit: no findings');
