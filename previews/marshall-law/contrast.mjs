/**
 * Palette contrast against the WCAG AA floor.
 *
 * Like the company site's version, this PARSES THE TOKENS OUT OF
 * lib/styles.css rather than repeating them. A repeated list drifts silently
 * and then reassures you with stale numbers; a parsed one fails loudly the
 * moment a token is renamed or edited. That property is the whole point.
 *
 * Every ratio in the stylesheet's comments came from this script.
 */
import { readFileSync } from 'node:fs';

const css = readFileSync('lib/styles.css', 'utf8');
const token = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m) { console.error(`contrast: token --${name} not found in lib/styles.css`); process.exit(1); }
  return m[1];
};

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const ratio = (a, b) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const T = {};
for (const n of ['porcelain', 'blush', 'card', 'ink', 'slate', 'slate-dim',
                 'on-ink', 'on-ink-dim', 'rose', 'rose-bright', 'gold', 'gold-bright'])
  T[n] = token(n);

/* Every pair the design system actually uses, in BOTH themes — the light body
   and the ink footer. Adding a pair to the CSS without adding it here is how a
   system quietly ships a failing combination. */
const PAIRS = [
  // light body
  ['ink', 'porcelain', 4.5, 'body text on the page ground'],
  ['ink', 'blush', 4.5, 'body text on the alternating band'],
  ['ink', 'card', 4.5, 'body text on cards and form panels'],
  ['slate', 'porcelain', 4.5, 'secondary text'],
  ['slate', 'blush', 4.5, 'secondary text on the band'],
  ['slate', 'card', 4.5, 'secondary text on cards'],
  ['slate-dim', 'porcelain', 4.5, 'tertiary — the dimmest allowed'],
  ['slate-dim', 'card', 4.5, 'tertiary on cards'],
  ['rose', 'porcelain', 4.5, 'accent text and links'],
  ['rose', 'blush', 4.5, 'accent on the band'],
  ['rose', 'card', 4.5, 'accent on cards'],
  ['porcelain', 'rose', 4.5, 'BUTTONS — porcelain text on a rose fill'],
  ['card', 'rose', 4.5, 'checked choice chips — white on rose'],
  ['gold', 'porcelain', 4.5, 'the scales detail and rating stars'],
  ['gold', 'blush', 4.5, 'gold on the band'],
  ['card', 'gold', 4.5, 'the "awaiting client" tag — white on gold'],
  ['rose', 'porcelain', 3.0, 'focus ring against the page'],
  // the ink footer — the dark undertone
  ['on-ink', 'ink', 4.5, 'footer text on the ink ground'],
  ['on-ink-dim', 'ink', 4.5, 'footer secondary text'],
  ['rose-bright', 'ink', 4.5, 'footer accent — her actual pink, on ink'],
  ['gold-bright', 'ink', 4.5, 'gold on the ink footer'],
];

console.log('contrast: tokens read from lib/styles.css\n');
let failed = 0;
const w = 34;
for (const [fg, bg, floor, why] of PAIRS) {
  const r = ratio(T[fg], T[bg]);
  const ok = r >= floor;
  if (!ok) failed++;
  console.log(
    `  ${ok ? '✓' : '✗'} ${`${fg} on ${bg}`.padEnd(w)} ${r.toFixed(2).padStart(6)}:1   floor ${floor}   ${why}`,
  );
}

/* The rule that is not taste, checked rather than trusted. On this light theme
   the rose is DEEP, so a rose fill takes porcelain text and ink on it fails —
   the inverse of the dark-theme rule. Her own brand pink is measured here too:
   it fails AA on light AND dark grounds, which is why the palette matured it
   rather than copying it. That is a pitch point, not just a build note. */
const inkOnRose = ratio(T.ink, T.rose);
const HER_PINK = '#f02491';
console.log('\ncontrast: the checks behind the design decisions');
console.log(`  ink on rose                 ${inkOnRose.toFixed(2)}:1 — under 4.5, which is why every rose fill takes porcelain text`);
console.log(`  her pink ${HER_PINK} on porcelain  ${ratio(HER_PINK, T.porcelain).toFixed(2)}:1 — FAILS AA on a light ground`);
console.log(`  her pink ${HER_PINK} on card       ${ratio(HER_PINK, T.card).toFixed(2)}:1 — FAILS AA on white too`);
console.log(`  our rose ${T.rose} on porcelain  ${ratio(T.rose, T.porcelain).toFixed(2)}:1 — clears it`);
console.log(`  her pink kept as --rose-bright on the ink footer: ${ratio(T['rose-bright'], T.ink).toFixed(2)}:1 — where it DOES clear`);

if (inkOnRose >= 4.5) {
  console.error('\ncontrast: ink now passes on rose — the button rule in styles.css is stale, re-check it');
  failed++;
}

if (failed) { console.error(`\ncontrast: ${failed} failing pair(s)`); process.exit(1); }
console.log('\ncontrast: every pair clears its floor');
