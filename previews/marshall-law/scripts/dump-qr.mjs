/* Emit test matrices for scripts/verify-qr.py to check. Dev-only. */
import { encode } from '../lib/qr.mjs';
const CASES = [
  'https://search.google.com/local/writereview?placeid=ChIJXXXXXXXXXXXXXXXXXXXXXXX',
  'https://g.page/r/CXXXXXXXXXXXXEBM/review',
  'https://themarshall-law.com/',
  'tel:+17622660767',
  'A',
  'Marshall Law Practice, LLC — 233 12th Street Suite # 911-C, Columbus, Georgia 31901',
  'x'.repeat(200),
  'https://themarshall-law.com/practice-areas/criminal-defense/?utm_source=card&utm_medium=qr',
];
const out = [];
for (const content of CASES)
  for (const level of ['L', 'M', 'Q', 'H']) {
    const qr = encode(content, { level });
    out.push({ content, level, version: qr.version, size: qr.size, mask: qr.mask,
               matrix: qr.matrix.map(r => r.join('')) });
  }
process.stdout.write(JSON.stringify(out));
