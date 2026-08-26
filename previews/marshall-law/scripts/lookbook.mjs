/**
 * Build the look book — the picture preview that goes in the email.
 *
 * Loose screenshots in an attachment look like screenshots. The same images
 * on a laid-out, watermarked page look like a proposal, which is what this is.
 * Generated from the same palette and type as the site so the document and the
 * thing it shows are visibly one piece of work.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { CLIENT, FPC, MARKET } from '../data/client.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Written in the second person throughout. This document is addressed TO her,
   so "she stands today" reads like being talked about in the room. */
const PHONES = [
  ['phone-1-home.png', 'Home', 'Your name, what you do and where, your rating with its count, and a call button — all before a single scroll.'],
  ['phone-2-criminal.png', 'Criminal Defense', 'One page per practice area, written to what people in Muscogee County actually type into Google.'],
  ['phone-3-contact.png', 'Contact', 'Every channel from your card in one place, and the consultation form built into the page — never a button to somewhere else.'],
];
const DESKS = [
  ['desk-1-home.png', 'Home', 'Authoritative first, warm second. Your pink kept as the identity, deepened until it reads as a law practice.'],
  ['desk-2-about.png', 'About you', 'Built, and waiting on your words. We do not write a lawyer’s biography for them — that page stays yours.'],
  ['desk-3-results.png', 'Results & Reviews', 'Only what can be verified, with everything else marked as pending. No invented testimonials and no case results.'],
  ['desk-5-contact.png', 'Contact', 'Phone, email, the office on a map, your hours, and the form. Payment handles are built and switched off until you say otherwise.'],
  ['desk-4-exposure.png', 'How we get you found', 'The part that is not a website: the profile, the reviews, the listings, and the searches you are invisible for today.'],
];

const page = (cls, inner) => `<section class="sheet ${cls}">${inner}<div class="wm" aria-hidden="true"></div></section>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(CLIENT.firm)} — design preview</title>
<style>
@font-face{font-family:'Playfair Display';src:url('fonts/playfair-display-latin-var.woff2') format('woff2-variations');font-weight:400 900;font-display:block}
@font-face{font-family:'Jost';src:url('fonts/jost-latin-var.woff2') format('woff2-variations');font-weight:100 900;font-display:block}
:root{
  --porcelain:#FDFBFC; --blush:#FBF1F5; --card:#FFF; --ink:#1F1823;
  --slate:#5C5266; --slate-dim:#6B5F75; --rose:#B3195C; --gold:#7D6329;
  --line:rgba(31,24,35,.13);
  --display:'Playfair Display',Georgia,serif; --ui:'Jost',Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box;margin:0}
body{font-family:var(--ui);color:var(--ink);background:var(--porcelain);font-size:11pt;line-height:1.5}
.sheet{position:relative;page-break-after:always;break-after:page;padding:18mm 16mm;height:297mm;background:var(--porcelain);overflow:hidden;display:flex;flex-direction:column}
.sheet:last-child{page-break-after:auto;break-after:auto}
h1{font-family:var(--display);font-weight:600;font-size:34pt;line-height:1.05;letter-spacing:-.01em}
h2{font-family:var(--display);font-weight:600;font-size:19pt;line-height:1.1;margin-bottom:2mm}
h3{font-family:var(--display);font-weight:600;font-size:12pt;line-height:1.2}
.eyebrow{font-size:8pt;letter-spacing:.18em;text-transform:uppercase;color:var(--rose);font-weight:600;display:block;margin-bottom:3mm}
.lede{font-size:12pt;color:var(--slate);line-height:1.5;max-width:52ch}
p{color:var(--slate)} strong{color:var(--ink)}
.rule{height:2px;background:var(--ink);margin:6mm 0 5mm}

/* cover */
.cover{background:var(--ink);color:#FDFBFC;display:flex;flex-direction:column;justify-content:space-between}
.cover h1{color:#FDFBFC;font-size:40pt;max-width:16ch}
.cover .lede,.cover p{color:#C9BFD2}
.cover .eyebrow{color:#F06AA6}
.cover .mark{width:26px;color:#F06AA6}
.cover .foot{font-size:8.5pt;color:#C9BFD2;border-top:1px solid rgba(253,251,252,.2);padding-top:4mm;margin-top:6mm}
.cover > div:nth-child(2){margin-top:auto}
.cover .wm{color:#FDFBFC}

.phones{display:grid;grid-template-columns:repeat(3,1fr);gap:7mm;margin-top:6mm}
.phones img{width:100%;border-radius:14px;border:1px solid var(--line);box-shadow:0 4mm 10mm -6mm rgba(31,24,35,.4)}
.cap{margin-top:3mm}
.cap p{font-size:8.5pt;line-height:1.4;margin-top:1mm}

.shot{margin-top:5mm}
.shot img{width:100%;border-radius:8px;border:1px solid var(--line);box-shadow:0 3mm 9mm -6mm rgba(31,24,35,.45)}
.shot .cap{margin-top:2.5mm}
.shot .cap p{font-size:9pt;max-width:76ch}

.grid2{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.stat{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:5mm}
.stat b{display:block;font-family:var(--display);font-size:22pt;color:var(--rose);line-height:1}
.stat span{font-size:9pt;color:var(--slate);display:block;margin-top:1.5mm}
ul{margin:3mm 0 0 5mm;padding:0;color:var(--slate)} li{margin-bottom:2mm;font-size:10pt}

/* watermark — every sheet, same rule as the site */
.wm{position:absolute;inset:0;pointer-events:none;opacity:.13;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-family='Helvetica,Arial,sans-serif' font-size='17' font-weight='bold' fill='%231F1823' text-anchor='middle' transform='rotate(-35 150 150)'%3EPREVIEW %E2%80%94 FRONT PORCH%3C/text%3E%3C/svg%3E");
  background-repeat:repeat}
.cover .wm{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ctext x='150' y='150' font-family='Helvetica,Arial,sans-serif' font-size='17' font-weight='bold' fill='%23FDFBFC' text-anchor='middle' transform='rotate(-35 150 150)'%3EPREVIEW %E2%80%94 FRONT PORCH%3C/text%3E%3C/svg%3E")}
.foot{font-size:8pt;color:var(--slate-dim);margin-top:auto;border-top:1px solid var(--line);padding-top:3mm}
.sheet > *:not(.wm):not(.foot){flex:none}
</style></head><body>

${page('cover', `
  <div>
    <svg class="mark" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M60,26 V94"/><path d="M60,26 H74 a13,13 0 0 1 0,26 H60"/><path d="M60,26 H43"/><path d="M60,52 H48"/><circle cx="60" cy="94" r="4.2" fill="currentColor" stroke="none"/></svg>
  </div>
  <div>
    <span class="eyebrow">A design preview for</span>
    <h1>${esc(CLIENT.firm)}</h1>
    <p class="lede" style="margin-top:5mm">A working preview of a new website for ${esc(CLIENT.attorney)}, ${esc(CLIENT.credential)} — built, not sketched. Every page in this document is a real page you can open on your phone.</p>
  </div>
  <div class="foot">
    Prepared by ${esc(FPC.legal)} · 26 August 2026<br>
    Nothing here is live, published, or indexed. ${esc(FPC.footerLine)}
  </div>`)}

${page('', `
  <span class="eyebrow">On a phone, before scrolling</span>
  <h2>Most people will find you on a phone, at a bad moment.</h2>
  <p class="lede">So the phone is where this design starts, rather than where it gets squeezed in afterwards.</p>
  <div class="phones">
    ${PHONES.map(([f, t, c]) => `<figure><img src="shots/${f}" alt="${esc(t)} on a phone"><figcaption class="cap"><h3>${esc(t)}</h3><p>${esc(c)}</p></figcaption></figure>`).join('')}
  </div>
  <div class="foot">Captured at 390&times;844 — an ordinary iPhone. Nothing is cropped or mocked up.</div>`)}

${DESKS.map(([f, t, c]) => page('', `
  <span class="eyebrow">${esc(t)}</span>
  <h2>${esc(c.split('.')[0])}.</h2>
  <div class="shot"><img src="shots/${f}" alt="${esc(t)}"><figcaption class="cap"><p>${esc(c)}</p></figcaption></div>`)).join('')}

${page('', `
  <span class="eyebrow">Where things stand today</span>
  <h2>Being good is not the same as being findable.</h2>
  <p class="lede">Checked on ${esc(MARKET.verifiedOn)} against public sources — none of it is an estimate.</p>
  <div class="rule"></div>
  <div class="grid2">
    <div class="stat"><b>${MARKET.reviewGap.hers}</b><span>Google review for your practice today.</span></div>
    <div class="stat"><b>${esc(MARKET.reviewGap.competitorRange)}</b><span>Reviews held by the firms appearing above you.</span></div>
  </div>
  <div style="margin-top:6mm">
    <h3>Searches you are not on the first page for</h3>
    <ul>${MARKET.moneyTerms.map((t) => `<li>&ldquo;${esc(t.term)}&rdquo;</li>`).join('')}</ul>
    <p style="font-size:9pt;margin-top:3mm">Currently held by ${esc(MARKET.competitorsOwningPageOne.join(', '))}.</p>
  </div>
  <div style="margin-top:6mm">
    <h3>What that is worth fixing</h3>
    <ul>
      <li>A claimed and completed Google Business Profile — the panel that appears before any website does.</li>
      <li>A simple way of asking for a review after a case closes, built to whatever you are comfortable with.</li>
      <li>One correction we have already found: your Avvo profile and your card disagree on the ZIP code.</li>
      <li>A page for each thing you practise, written to the words people actually type.</li>
    </ul>
  </div>
  <div class="foot">Every figure on this page is checked against a public source and dated. Where we could not verify something, the site leaves it blank rather than filling it in.</div>`)}

${page('', `
  <span class="eyebrow">What happens next</span>
  <h2>Two things, and neither of them is a contract.</h2>
  <div class="rule"></div>
  <div style="margin-top:2mm">
    <h3>1 &nbsp; Look at it on your phone</h3>
    <p style="margin-top:1.5mm">The link in the email opens the real thing. Tap the call button, open the menu, fill in the form — it all works. It is not a picture of a website.</p>
  </div>
  <div style="margin-top:6mm">
    <h3>2 &nbsp; Answer what you can</h3>
    <p style="margin-top:1.5mm">The <strong>Getting Started</strong> form attached to this email covers everything we would need to know. Most of it is tapping, nothing is required, and &ldquo;not sure&rdquo; is a real answer on every question. It saves as you go and sends nothing anywhere until you choose to send it.</p>
  </div>
  <div style="margin-top:6mm">
    <h3>And one thing that is yours either way</h3>
    <p style="margin-top:1.5mm">The <strong>review card</strong> — a printable card whose QR code takes a client straight to your review box in one tap. It is yours to keep and use whether or not anything else goes ahead.</p>
  </div>
  <div class="foot">
    ${esc(FPC.legal)} · frontporchbuilds.com<br>
    ${esc(FPC.footerLine)}
  </div>`)}

</body></html>`;

writeFileSync('outbox/lookbook.html', html);
console.log('lookbook.html written');
