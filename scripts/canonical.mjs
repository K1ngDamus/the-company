/**
 * Canonical-address check.
 *
 * The site decides whether to let Google index it by comparing where it is
 * being served against CANONICAL_ORIGIN. Getting that comparison wrong does
 * not break anything visible: the site loads, looks right, and is silently
 * excluded from search. It went wrong once already, on 2026-08-25, because
 * GitHub Pages reports `http://` until Enforce HTTPS is on and the check was
 * comparing whole origins. The live site was noindexed for one deploy.
 *
 * So this builds the site at four addresses and asserts what each must
 * produce. It is slow — four builds — but it is the only check standing
 * between that mistake and an invisible site.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const CASES = [
  { name: 'the real address',              env: { SITE_URL: 'https://frontporchbuilds.com' },                          indexable: true },
  { name: 'the real address, before HTTPS', env: { SITE_URL: 'http://frontporchbuilds.com' },                          indexable: true },
  { name: 'the www variant',               env: { SITE_URL: 'https://www.frontporchbuilds.com' },                      indexable: false },
  { name: 'a Pages project URL',           env: { SITE_URL: 'https://k1ngdamus.github.io', BASE_PATH: '/the-company' }, indexable: false },
];

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

let failed = 0;
for (const c of CASES) {
  execFileSync('npx', ['astro', 'build'], {
    env: { ...process.env, BASE_PATH: '', ...c.env },
    stdio: 'pipe',
  });

  const pages = walk('dist').filter((f) => extname(f) === '.html');
  const noindexed = pages.filter((f) => readFileSync(f, 'utf8').includes('name="robots" content="noindex'));
  const robots = readFileSync('dist/robots.txt', 'utf8');
  const allows = robots.includes('Allow: /');
  const canonical = readFileSync('dist/index.html', 'utf8').match(/rel="canonical" href="([^"]*)"/)?.[1] ?? '';

  const problems = [];
  if (c.indexable) {
    if (noindexed.length) problems.push(`${noindexed.length}/${pages.length} pages carry noindex`);
    if (!allows) problems.push('robots.txt does not allow crawling');
    /* Whatever scheme the build was handed, what it PUBLISHES must be https —
       that is the address the site should be indexed at. */
    if (!canonical.startsWith('https://')) problems.push(`canonical is not https: ${canonical}`);
  } else {
    if (noindexed.length !== pages.length) problems.push(`only ${noindexed.length}/${pages.length} pages carry noindex`);
    if (allows) problems.push('robots.txt allows crawling on a non-canonical address');
  }

  const addr = c.env.SITE_URL + (c.env.BASE_PATH ?? '');
  if (problems.length) {
    failed++;
    console.error(`  FAIL  ${c.name} (${addr})`);
    for (const p of problems) console.error(`          ${p}`);
  } else {
    console.log(`  ok    ${c.name} — ${c.indexable ? 'indexable' : 'kept out of search'} (${addr})`);
  }
}

if (failed) {
  console.error(`\ncanonical: ${failed} case(s) wrong — the live site's visibility to search is at stake`);
  process.exit(1);
}
console.log('canonical: every address resolves to the right indexing decision');
