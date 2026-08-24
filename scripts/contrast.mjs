/**
 * Contrast check for the company palette (WCAG 2.x relative luminance).
 *
 * The colours are PARSED OUT OF src/styles/global.css rather than repeated
 * here. That matters: a check that hard-codes the values it is checking will
 * happily pass after someone edits the stylesheet, which is worse than no
 * check at all because it looks like assurance.
 *
 * Exits non-zero if any required pair drops below its floor.
 */
import { readFileSync } from 'node:fs';

const CSS = readFileSync('src/styles/global.css', 'utf8');

/* Solid hex tokens from :root. rgba()-derived tokens are skipped — they sit on
   varying grounds and are covered by the solid pairs they resolve toward. */
const tokens = {};
for (const m of CSS.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6});/g)) {
  tokens[m[1]] = m[2];
}

const need = ['coal', 'graphite', 'slate', 'pitch', 'chalk', 'ash', 'ash-dim', 'signal'];
const missing = need.filter((t) => !tokens[t]);
if (missing.length) {
  console.error(`Palette tokens not found in global.css: ${missing.join(', ')}`);
  console.error('If a token was renamed, update scripts/contrast.mjs to match.');
  process.exit(1);
}

const luminance = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [luminance(tokens[a]), luminance(tokens[b])].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/* 4.5 = AA for body text. 3.0 = AA for large text and non-text UI. */
const PAIRS = [
  ['chalk', 'coal', 4.5, 'body text'],
  ['chalk', 'graphite', 4.5, 'body text on band'],
  ['chalk', 'slate', 4.5, 'body text on cards'],
  ['chalk', 'pitch', 4.5, 'body text in footer'],
  ['ash', 'coal', 4.5, 'secondary text'],
  ['ash', 'graphite', 4.5, 'secondary text on band'],
  ['ash', 'slate', 4.5, 'secondary text on cards'],
  ['ash', 'pitch', 4.5, 'secondary text in footer'],
  ['ash-dim', 'coal', 4.5, 'tertiary text'],
  ['ash-dim', 'slate', 4.5, 'tertiary text on cards'],
  ['signal', 'coal', 4.5, 'accent text'],
  ['signal', 'graphite', 4.5, 'accent text on band'],
  ['signal', 'slate', 4.5, 'accent text on cards'],
  ['coal', 'signal', 4.5, 'BUTTON + checked chip: Coal on Signal fill'],
  ['coal', 'chalk', 4.5, 'ghost button hover'],
  ['signal', 'coal', 3.0, 'focus ring vs page'],
  ['signal', 'slate', 3.0, 'focus ring vs card'],
];

let failed = 0;
for (const [fg, bg, floor, label] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= floor;
  if (!ok) failed++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (floor ${floor.toFixed(1)})  ${label}`);
}

/* Stated, not asserted: this pair is meant to fail. It is printed every run so
   the number stays in front of anyone tempted to put white on a red button. */
console.log(`\n  note   ${ratio('chalk', 'signal').toFixed(2)}:1  Chalk on Signal — BELOW the floor by design.`);
console.log('         Red fills take Coal text. See docs/DESIGN.md.');

if (failed) {
  console.error(`\ncontrast: ${failed} pair(s) below the AA floor`);
  process.exit(1);
}
console.log(`\ncontrast: all ${PAIRS.length} pairs pass`);
