/**
 * A QR encoder, ~300 lines, no dependencies. Byte mode, versions 1–20,
 * all four error-correction levels, full mask selection.
 *
 * WHY NOT A QR WEBSITE. A free online generator almost always encodes a
 * redirect on *their* domain rather than the destination. That means the code
 * stops working when they change their terms, they can meter or monetise it
 * later, and every person who scans it is logged by a third party — here, a
 * criminal-defense client scanning a card in a lawyer's office. Encoding the
 * destination directly means the code is permanent, private, and works with
 * no internet on our side at all.
 *
 * WHY NOT AN NPM PACKAGE. This build has no dependencies and no install step
 * (see README). One QR is not worth a node_modules.
 *
 * Spec tables in qr-tables.mjs are GENERATED from a reference encoder, not
 * transcribed — a single wrong number there yields a QR that looks perfectly
 * normal and silently does not scan. Regenerate them with:
 *
 *   python3 -m pip install qrcode
 *   # then the extraction snippet in scripts/gen-qr-tables.py
 *
 * Verified by scripts/verify-qr.mjs: every matrix is compared module-for-module
 * against the reference encoder, and every code is decoded back with OpenCV.
 */
import { EC_BLOCKS, ALIGN } from './qr-tables.mjs';

/* --- GF(256), primitive polynomial 0x11D --------------------------------- */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x; LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
}
const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];

/** Reed–Solomon generator polynomial of the given degree. */
function rsGenerator(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], 1);
      next[j + 1] ^= gfMul(poly[j], EXP[i]);
    }
    poly = next;
  }
  return poly;
}

/** EC codewords for one block. */
function rsEncode(data, ecLen) {
  const gen = rsGenerator(ecLen);
  const res = new Array(ecLen).fill(0);
  for (const byte of data) {
    const factor = byte ^ res[0];
    res.shift();
    res.push(0);
    for (let i = 0; i < ecLen; i++) res[i] ^= gfMul(gen[i + 1], factor);
  }
  return res;
}

/* --- bit buffer ---------------------------------------------------------- */
class Bits {
  constructor() { this.bits = []; }
  put(value, length) {
    for (let i = length - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  }
  get length() { return this.bits.length; }
}

/* --- capacity ------------------------------------------------------------ */
const dataCodewords = (version, level) =>
  EC_BLOCKS[level][version - 1].reduce((n, [, dataCount]) => n + dataCount, 0);

const charCountBits = (version) => (version < 10 ? 8 : 16);

/** Smallest version that fits `byteLength` bytes at this EC level. */
function pickVersion(byteLength, level) {
  for (let v = 1; v <= 20; v++) {
    const capacity = dataCodewords(v, level) * 8;
    const needed = 4 + charCountBits(v) + byteLength * 8;
    if (needed <= capacity) return v;
  }
  throw new Error(`QR: ${byteLength} bytes does not fit in version 20 at level ${level}`);
}

/* --- codeword stream ----------------------------------------------------- */
function buildCodewords(bytes, version, level) {
  const total = dataCodewords(version, level);
  const bb = new Bits();
  bb.put(0b0100, 4);                       // byte mode
  bb.put(bytes.length, charCountBits(version));
  for (const b of bytes) bb.put(b, 8);

  const capacity = total * 8;
  bb.put(0, Math.min(4, capacity - bb.length));           // terminator
  while (bb.length % 8 !== 0) bb.bits.push(0);            // pad to byte boundary

  const data = [];
  for (let i = 0; i < bb.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bb.bits[i + j];
    data.push(byte);
  }
  const PAD = [0xec, 0x11];
  for (let i = 0; data.length < total; i++) data.push(PAD[i % 2]);

  // Split into blocks, compute EC per block, then interleave.
  const spec = EC_BLOCKS[level][version - 1];
  const dataBlocks = [], ecBlocks = [];
  let offset = 0;
  for (const [totalCount, dataCount] of spec) {
    const block = data.slice(offset, offset + dataCount);
    offset += dataCount;
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, totalCount - dataCount));
  }

  const out = [];
  const maxData = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxData; i++)
    for (const b of dataBlocks) if (i < b.length) out.push(b[i]);
  const maxEc = Math.max(...ecBlocks.map((b) => b.length));
  for (let i = 0; i < maxEc; i++)
    for (const b of ecBlocks) if (i < b.length) out.push(b[i]);
  return out;
}

/* --- matrix -------------------------------------------------------------- */
const EC_BITS = { L: 0b01, M: 0b00, Q: 0b11, H: 0b10 };

function newMatrix(size) {
  return { m: Array.from({ length: size }, () => new Array(size).fill(null)), size };
}

function placeFunctionPatterns(mx, version) {
  const { m, size } = mx;
  const finder = (r0, c0) => {
    for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
      const rr = r0 + r, cc = c0 + c;
      if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
      const inRing = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                     (c >= 0 && c <= 6 && (r === 0 || r === 6));
      const inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      m[rr][cc] = (inRing || inCore) ? 1 : 0;
    }
  };
  finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

  for (const centre of ALIGN[version - 1]) {
    for (const other of ALIGN[version - 1]) {
      // Skip the three that would sit on a finder pattern.
      if ((centre === 6 && other === 6) ||
          (centre === 6 && other === size - 7) ||
          (centre === size - 7 && other === 6)) continue;
      for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++)
        m[centre + r][other + c] =
          (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) ? 1 : 0;
    }
  }

  for (let i = 8; i < size - 8; i++) {
    const bit = i % 2 === 0 ? 1 : 0;
    m[6][i] = bit; m[i][6] = bit;
  }
  m[size - 8][8] = 1;                       // the always-dark module

  // Reserve the format areas so data placement skips them.
  for (let i = 0; i < 9; i++) {
    if (m[8][i] === null) m[8][i] = 0;
    if (m[i][8] === null) m[i][8] = 0;
  }
  for (let i = 0; i < 8; i++) {
    if (m[8][size - 1 - i] === null) m[8][size - 1 - i] = 0;
    if (m[size - 1 - i][8] === null) m[size - 1 - i][8] = 0;
  }
  if (version >= 7) {
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) {
      m[size - 11 + j][i] = 0; m[i][size - 11 + j] = 0;
    }
  }
}

/** BCH(18,6) version information, versions 7+. */
function versionBits(version) {
  let d = version << 12;
  for (let i = 0; i < 6; i++) if (d >>> (17 - i) & 1) d ^= 0x1f25 << (5 - i);
  return (version << 12) | d;
}

/** BCH(15,5) format information, masked with 0x5412. */
function formatBits(level, mask) {
  const data = (EC_BITS[level] << 3) | mask;
  let d = data << 10;
  for (let i = 0; i < 5; i++) if (d >>> (14 - i) & 1) d ^= 0x537 << (4 - i);
  return ((data << 10) | d) ^ 0x5412;
}

function placeFormat(mx, level, mask) {
  const { m, size } = mx;
  const bits = formatBits(level, mask);
  for (let i = 0; i < 15; i++) {
    const bit = (bits >>> i) & 1;
    // copy 1 — around the top-left finder
    if (i < 6) m[i][8] = bit;
    else if (i < 8) m[i + 1][8] = bit;
    else if (i === 8) m[8][7] = bit;
    else m[8][14 - i] = bit;
    // copy 2 — split between top-right and bottom-left
    if (i < 8) m[8][size - 1 - i] = bit;
    else m[size - 15 + i][8] = bit;
  }
  m[size - 8][8] = 1;
}

function placeVersion(mx, version) {
  if (version < 7) return;
  const { m, size } = mx;
  const bits = versionBits(version);
  for (let i = 0; i < 18; i++) {
    const bit = (bits >>> i) & 1;
    const r = Math.floor(i / 3), c = i % 3;
    m[size - 11 + c][r] = bit;
    m[r][size - 11 + c] = bit;
  }
}

/** Zigzag data placement, right to left, skipping the vertical timing column. */
function placeData(mx, codewords) {
  const { m, size } = mx;
  let bitIndex = 0;
  const nextBit = () => {
    const byte = codewords[bitIndex >> 3];
    if (byte === undefined) return 0;        // remainder bits are light
    const bit = (byte >>> (7 - (bitIndex & 7))) & 1;
    bitIndex++;
    return bit;
  };
  let upward = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right = 5;              // the timing column is never data
    for (let v = 0; v < size; v++) {
      const row = upward ? size - 1 - v : v;
      for (let c = 0; c < 2; c++) {
        const col = right - c;
        if (m[row][col] !== null) continue;
        m[row][col] = nextBit();
      }
    }
    upward = !upward;
  }
}

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

/** Penalty scoring, ISO 18004 §8.8.2 rules 1–4. */
function penalty(m, size) {
  let score = 0;
  const line = (get) => {
    for (let a = 0; a < size; a++) {
      let run = 1;
      for (let b = 1; b < size; b++) {
        if (get(a, b) === get(a, b - 1)) run++;
        else { if (run >= 5) score += 3 + (run - 5); run = 1; }
      }
      if (run >= 5) score += 3 + (run - 5);
    }
  };
  line((r, c) => m[r][c]);                    // rule 1, rows
  line((c, r) => m[r][c]);                    // rule 1, columns

  for (let r = 0; r < size - 1; r++)          // rule 2
    for (let c = 0; c < size - 1; c++) {
      const v = m[r][c];
      if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
    }

  const A = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];   // rule 3
  const B = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const scan = (get) => {
    for (let a = 0; a < size; a++)
      for (let b = 0; b <= size - 11; b++) {
        let mA = true, mB = true;
        for (let k = 0; k < 11; k++) {
          const v = get(a, b + k);
          if (v !== A[k]) mA = false;
          if (v !== B[k]) mB = false;
        }
        if (mA) score += 40;
        if (mB) score += 40;
      }
  };
  scan((r, c) => m[r][c]);
  scan((c, r) => m[r][c]);

  let dark = 0;                                // rule 4
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) dark += m[r][c];
  const percent = (dark * 100) / (size * size);
  score += Math.floor(Math.abs(percent - 50) / 5) * 10;
  return score;
}

/**
 * Encode `content` and return { matrix, size, version, level, mask }.
 * `matrix` is an array of rows of 0/1, 1 = dark.
 */
export function encode(content, { level = 'Q', minVersion = 1 } = {}) {
  const bytes = [...new TextEncoder().encode(content)];
  const version = Math.max(pickVersion(bytes.length, level), minVersion);
  const codewords = buildCodewords(bytes, version, level);
  const size = version * 4 + 17;

  let best = null;
  for (let mask = 0; mask < 8; mask++) {
    const mx = newMatrix(size);
    placeFunctionPatterns(mx, version);
    placeVersion(mx, version);
    const reserved = mx.m.map((row) => row.map((v) => v !== null));
    placeData(mx, codewords);
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++)
      if (!reserved[r][c] && MASKS[mask](r, c)) mx.m[r][c] ^= 1;
    placeFormat(mx, level, mask);
    const score = penalty(mx.m, size);
    if (!best || score < best.score) best = { score, mask, matrix: mx.m };
  }
  return { matrix: best.matrix, size, version, level, mask: best.mask, content };
}

/**
 * Render to SVG. `quiet` is the mandatory light border — 4 modules is the
 * spec minimum and scanners genuinely fail without it, so it is not optional.
 */
export function toSvg(qr, {
  moduleSize = 8, quiet = 4, dark = '#1F1823', light = '#FFFFFF',
  label = 'QR code', rounded = true,
} = {}) {
  const dim = (qr.size + quiet * 2) * moduleSize;
  const parts = [];
  for (let r = 0; r < qr.size; r++) {
    for (let c = 0; c < qr.size; c++) {
      if (!qr.matrix[r][c]) continue;
      const x = (c + quiet) * moduleSize, y = (r + quiet) * moduleSize;
      parts.push(`M${x} ${y}h${moduleSize}v${moduleSize}h-${moduleSize}z`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" role="img" aria-label="${label.replace(/"/g, '&quot;')}">` +
    `<rect width="${dim}" height="${dim}" fill="${light}"${rounded ? ' rx="12"' : ''}/>` +
    `<path d="${parts.join('')}" fill="${dark}"/></svg>`;
}
