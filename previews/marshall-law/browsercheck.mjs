/**
 * Browser-rendered checks — the ones a regex audit cannot do.
 *
 * The company site notes these as "run by hand, not covered by CI". For a
 * client preview that is not good enough: the whole promise is that it renders
 * flawlessly on a phone, and "we checked once" is not a gate. This is.
 *
 *   • console errors and failed requests, per page, per viewport
 *   • horizontal overflow — the single most common mobile defect
 *   • tap-target size on mobile (44px, the Apple/Google floor)
 *   • the above-the-fold contract on a phone: name, what+where, rating,
 *     CALL button and the form anchor all reachable without a scroll
 *   • the watermark is actually painted and actually inert
 *
 * Usage: node browsercheck.mjs   (serves dist/ itself, no external server)
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const DIST = 'dist';
const SHOTS = 'shots';
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.js': 'text/javascript' };

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = join(DIST, p);
  if (p.endsWith('/')) file = join(DIST, p, 'index.html');
  if (!existsSync(file) || !extname(file)) {
    const alt = join(DIST, p, 'index.html');
    file = existsSync(alt) ? alt : file;
  }
  if (!existsSync(file)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const ROUTES = ['/', '/about/', '/practice-areas/', '/practice-areas/criminal-defense/',
  '/results/', '/contact/', '/exposure/', '/start/', '/review-card/'];
const VIEWS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true },
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
];

mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const findings = [];
const note = (m) => findings.push(m);

for (const view of VIEWS) {
  const ctx = await browser.newContext({
    viewport: { width: view.width, height: view.height },
    deviceScaleFactor: 2,
    isMobile: view.isMobile, hasTouch: view.isMobile,
  });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('requestfailed', (r) => errs.push(`request failed: ${r.url()}`));

    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const tag = `${view.name}${route.replace(/\//g, '_')}`;
    for (const e of errs) note(`${tag} — console: ${e}`);

    /* Horizontal overflow — and which element causes it, or the finding is
       useless to act on. */
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      if (doc.scrollWidth <= doc.clientWidth) return null;
      const culprits = [...document.querySelectorAll('*')]
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
        .slice(0, 4)
        .map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''));
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, culprits };
    });
    if (overflow) note(`${tag} — HORIZONTAL OVERFLOW ${overflow.scrollWidth}px > ${overflow.clientWidth}px via ${overflow.culprits.join(', ')}`);

    /* Watermark: painted, positioned, and inert. */
    const wm = await page.evaluate(() => {
      const el = document.querySelector('.watermark');
      if (!el) return { missing: true };
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        opacity: parseFloat(cs.opacity), position: cs.position,
        pointerEvents: cs.pointerEvents, zIndex: cs.zIndex,
        visible: r.width > 10 && r.height > 10,
        inViewport: r.bottom <= innerHeight + 1 && r.right <= innerWidth + 1,
      };
    });
    if (wm.missing) note(`${tag} — watermark element absent from the DOM`);
    else {
      if (!(wm.opacity >= 0.12 && wm.opacity <= 0.15)) note(`${tag} — watermark opacity ${wm.opacity} outside 0.12–0.15`);
      if (wm.position !== 'fixed') note(`${tag} — watermark position is ${wm.position}, not fixed`);
      if (wm.pointerEvents !== 'none') note(`${tag} — watermark is not pointer-events:none (it would block taps)`);
      if (!wm.visible) note(`${tag} — watermark renders at zero size`);
      if (!wm.inViewport) note(`${tag} — watermark is outside the viewport`);
    }

    if (view.isMobile) {
      /* Tap targets. 44px is the floor both Apple and Google publish; anything
         under it on a phone is a mis-tap waiting to happen. */
      const small = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('a, button, input[type=radio], summary')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;      // hidden
          /* WCAG 2.5.8 exempts a link inline in a sentence — the surrounding
             text is the target's context and cannot be padded. The test: the
             parent carries text beyond the link itself. A footer <li> whose
             only content is the link is NOT exempt and must clear 44px. */
          const par = el.parentElement;
          if (el.tagName === 'A' && par &&
              par.textContent.trim() !== el.textContent.trim()) continue;
          const box = el.closest('label') || el;
          const br = box.getBoundingClientRect();
          if (br.height < 44) out.push(`${el.tagName.toLowerCase()}"${(el.textContent || '').trim().slice(0, 26)}" ${Math.round(br.width)}x${Math.round(br.height)}`);
        }
        return out;
      });
      for (const s of new Set(small)) note(`${tag} — tap target under 44px: ${s}`);

      /* The above-the-fold contract (brief §2). */
      if (route === '/') {
        const fold = await page.evaluate(() => {
          const inFold = (sel) => {
            const el = document.querySelector(sel);
            if (!el) return 'MISSING';
            return el.getBoundingClientRect().top < innerHeight ? 'ok' : 'BELOW FOLD';
          };
          return {
            name: inFold('.hero__name'),
            role: inFold('.hero__role'),
            rating: inFold('.rating'),
            call: inFold('.hero__cta .btn'),
            callbar: inFold('.callbar .btn'),
          };
        });
        for (const [k, v] of Object.entries(fold))
          if (v !== 'ok') note(`mobile fold — ${k}: ${v}`);
      }
    }

    if (['/', '/contact/', '/exposure/'].includes(route))
      await page.screenshot({ path: join(SHOTS, `${view.name}${route === '/' ? '_home' : route.replace(/\//g, '_')}.png`), fullPage: false });

    await page.close();
  }
  await ctx.close();
}

await browser.close();
server.close();

console.log(`browsercheck: ${ROUTES.length} routes x ${VIEWS.length} viewports`);
if (findings.length) {
  console.error(`\n${findings.length} finding(s):`);
  for (const f of findings) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log('browsercheck: no findings');
