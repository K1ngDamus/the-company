/**
 * The two pages that are FROM Front Porch rather than part of her site:
 *
 *   /start/        the client intake form — one sitting, mostly tapping
 *   /review-card/  a printable card whose QR opens her Google review box
 *
 * Both carry the preview watermark and the FPC chrome, so neither can be
 * mistaken for a page of hers.
 */
import { CLIENT, FPC, OPEN, REVIEW, MARKET, isAsk } from '../data/client.mjs';
import { INTAKE } from '../data/intake.mjs';
import { esc, attr, ICONS, fpcMark, page, blank } from './render.mjs';
import { encode, toSvg } from './qr.mjs';

/* Front Porch's own contact details — this is our document, so replies come
   to us. Both are the company's published details (see ../../docs/BLANKS.md). */
const FPC_EMAIL = 'jacksonleon24@gmail.com';
const FPC_PHONE = '(678) 525-8154';

/* ==========================================================================
   THE FORM CONTROLS
   Every question type renders through here, so the whole form speaks one
   control language and a new question cannot invent a new one.
   ========================================================================== */
const qid = (sectionId, q) => `${sectionId}-${q.id}`;

const control = (sectionId, q) => {
  const id = qid(sectionId, q);

  if (q.type === 'note') {
    return `<div class="notebox">
      <strong>${esc(q.label)}</strong>
      <p>${esc(q.body)}</p>
    </div>`;
  }

  const head = `<span class="label" id="${attr(id)}-label">${esc(q.label)}</span>
    ${q.hint ? `<span class="hint">${esc(q.hint)}</span>` : ''}`;

  if (q.type === 'choice') {
    return `<fieldset class="q" style="border:0;padding:0;margin:0" aria-describedby="${attr(id)}-label">
      <legend class="label">${esc(q.label)}</legend>
      ${q.hint ? `<span class="hint">${esc(q.hint)}</span>` : ''}
      <div class="choices">
        ${q.options.map((opt, i) => `<label class="choice"><input type="radio" name="${attr(id)}" value="${attr(opt)}" data-save><span>${esc(opt)}</span></label>`).join('\n        ')}
        <label class="choice"><input type="radio" name="${attr(id)}" value="Not sure" data-save><span>Not sure</span></label>
      </div>
    </fieldset>`;
  }

  if (q.type === 'multi') {
    return `<fieldset class="q" style="border:0;padding:0;margin:0">
      <legend class="label">${esc(q.label)}</legend>
      ${q.hint ? `<span class="hint">${esc(q.hint)}</span>` : ''}
      <div class="choices">
        ${q.options.map((opt, i) => `<label class="check"><input type="checkbox" name="${attr(id)}" value="${attr(opt)}" id="${attr(id)}-${i}" data-save><span>${esc(opt)}</span></label>`).join('\n        ')}
      </div>
    </fieldset>`;
  }

  if (q.type === 'priority') {
    return `<div class="q">
      <span class="label">${esc(q.label)}</span>
      <div class="prio">
        ${q.items.map(([key, label, desc]) => `<div class="prio__row">
          <div>
            <div class="prio__label">${esc(label)}</div>
            ${desc ? `<p class="prio__desc">${esc(desc)}</p>` : ''}
          </div>
          <fieldset class="prio__choices" style="border:0;padding:0;margin:0">
            <legend class="visually-hidden">Priority for: ${esc(label)}</legend>
            ${q.scale.map((s) => `<label class="choice"><input type="radio" name="${attr(id)}-${attr(key)}" value="${attr(s)}" data-save><span>${esc(s)}</span></label>`).join('')}
          </fieldset>
        </div>`).join('\n        ')}
      </div>
    </div>`;
  }

  if (q.type === 'textarea') {
    return `<div class="q">
      <label class="label" for="${attr(id)}">${esc(q.label)}</label>
      ${q.hint ? `<span class="hint">${esc(q.hint)}</span>` : ''}
      <textarea class="textarea" id="${attr(id)}" name="${attr(id)}" rows="${q.rows || 4}"
        ${q.placeholder ? `placeholder="${attr(q.placeholder)}"` : ''} data-save></textarea>
    </div>`;
  }

  return `<div class="q">
    <label class="label" for="${attr(id)}">${esc(q.label)}</label>
    ${q.hint ? `<span class="hint">${esc(q.hint)}</span>` : ''}
    <input class="input" type="text" id="${attr(id)}" name="${attr(id)}"
      ${q.placeholder ? `placeholder="${attr(q.placeholder)}"` : ''} data-save>
  </div>`;
};

/* ==========================================================================
   /start/
   ========================================================================== */
export const startPage = () => {
  const sections = INTAKE.sections;

  const body = `
<section class="section intake-hero">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">For ${esc(CLIENT.attorney)}</span>
    <h1>${esc(INTAKE.title)}</h1>
    ${INTAKE.intro.map((p) => `<p class="lede">${esc(p)}</p>`).join('\n    ')}
    <div class="savebar" data-savebar hidden>
      <span class="savebar__dot" aria-hidden="true"></span>
      <span data-savetext>Your answers save in this browser as you type.</span>
    </div>
    <p class="staged">${ICONS.shield(18)}<span><strong>Nothing here is sent anywhere.</strong>
      This form has no submit handler and no tracking. Everything stays in your own
      browser until you copy or print it and send it back yourself.</span></p>
    <nav class="intake-nav" aria-label="Form sections">
      ${sections.map((s, i) => `<a href="#${attr(s.id)}">${i + 1}. ${esc(s.title)}</a>`).join('\n      ')}
    </nav>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap-narrow">
    <form id="intake" novalidate>
      ${sections.map((s, i) => `<div class="qsection" id="${attr(s.id)}">
        <span class="qsection__num">Section ${i + 1} of ${sections.length}</span>
        <h2>${esc(s.title)}</h2>
        ${s.blurb ? `<p class="qsection__blurb">${esc(s.blurb)}</p>` : ''}
        <div class="qsection__body">
          ${s.questions.map((q) => control(s.id, q)).join('\n          ')}
        </div>
      </div>`).join('\n      ')}

      <div class="qsection" id="finish">
        <span class="qsection__num">Last step</span>
        <h2>Send it back</h2>
        <p class="qsection__blurb">Press the button and your answers gather into the box below. Copy them into an email, or print this page — whichever is easier.</p>
        <div class="qsection__body">
          <div class="btn-row">
            <button class="btn" type="button" data-build>Gather my answers</button>
            <button class="btn btn--ghost" type="button" data-copy hidden>Copy to clipboard</button>
            <button class="btn btn--ghost" type="button" onclick="window.print()">Print this form</button>
          </div>
          <div class="q" hidden data-summary-wrap>
            <label class="label" for="summary">Your answers</label>
            <span class="hint">Select all and copy, or use the copy button above.</span>
            <textarea class="summary" id="summary" name="summary" readonly></textarea>
          </div>
          <p class="hint">Send to <a href="mailto:${attr(FPC_EMAIL)}?subject=${encodeURIComponent('Marshall Law — intake answers')}">${esc(FPC_EMAIL)}</a> or call ${esc(FPC_PHONE)} if anything here is easier said out loud.</p>
        </div>
      </div>
    </form>
  </div>
</section>

<script src="/intake.js" defer></script>`;

  return page({
    route: '/start/',
    title: `Getting started — ${CLIENT.firm} | ${FPC.name}`,
    description: `A short intake form for ${CLIENT.attorney} covering practice areas, photos, payments, reviews and the details that decide whether clients can find the firm online.`,
    body,
    chrome: 'fpc',
    chromeLabel: `Prepared for ${CLIENT.attorney}`,
  });
};

/* ==========================================================================
   /review-card/
   ========================================================================== */
export const reviewCardPage = () => {
  /* No real review link yet, so the QR encodes her website — real, working,
     and harmless. It is labelled a sample on the face of the card rather than
     quietly encoding a URL that does not exist. */
  const isSample = !REVIEW.link;
  const target = REVIEW.link || CLIENT.websiteUrl;
  const qrSvg = toSvg(encode(target, { level: 'Q' }), {
    moduleSize: 8, quiet: 4,
    label: isSample
      ? `Sample QR code — currently opens ${CLIENT.website}`
      : `QR code — opens the Google review page for ${CLIENT.firm}`,
  });

  const card = (wide) => `<div class="rcard${wide ? ' rcard--wide' : ''}">
    <div class="rcard__qr">${qrSvg}</div>
    <div>
      ${isSample ? `<p><span class="sample-flag">Sample</span></p>` : ''}
      <p class="rcard__head">Was I any help?</p>
      <p class="rcard__sub">If ${esc(CLIENT.attorneyShort)} did right by you, thirty seconds of your time helps the next person find her.</p>
      <ul class="rcard__steps">
        <li><b>1</b> Point your camera at the square.</li>
        <li><b>2</b> Tap the stars.</li>
        <li><b>3</b> Add a line if you feel like it, then Post.</li>
      </ul>
      <p class="rcard__foot">${esc(CLIENT.firm)} · ${esc(CLIENT.phone)}<br>${esc(CLIENT.addressOneLine)}</p>
    </div>
  </div>`;

  const body = `
<section class="section intake-hero">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">Complimentary — yours either way</span>
    <h1>The review card</h1>
    <p class="lede">One card, one QR, one tap to the review box. Built to close the gap between <strong>${MARKET.reviewGap.hers} review</strong> and the ${esc(MARKET.reviewGap.competitorRange)} the firms above you have.</p>
  </div>
</section>

<section class="section section--band" style="padding-top:0">
  <div class="wrap-narrow stack" style="--flow:2rem">
    ${card(true)}

    ${isSample ? `<div class="todo">
      <span class="todo__tag">Awaiting client</span>
      <strong>This QR is a sample — it currently opens ${esc(CLIENT.website)}</strong>
      <p>A real review card needs her direct Google review link, which comes from her Business Profile under "Ask for reviews" (a <code>g.page/r/…/review</code> short link). Send us that link and the card is final — the design does not change, only what the square points at.</p>
      <p style="margin-top:.6rem">We encode the destination straight into the square rather than routing it through a QR website. That means it never expires, nobody starts charging for it later, and no third party gets a log of your clients scanning a code in your office.</p>
    </div>` : ''}
  </div>
</section>

<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.4rem">
    <h2>Two things that actually remove the friction</h2>

    <div class="notebox">
      <strong>A rating on its own is a complete review.</strong>
      <p>${esc(REVIEW.starOnly)} Most people who mean to leave a review never do, and it is almost never because they disliked the service — it is because writing something felt like homework. Google does not require any text at all, and star-only reviews count toward both your rating and your total.</p>
    </div>

    <h3>And for anyone who does want to write something</h3>
    <p>A few questions on the back of the card, so nobody has to face a blank box. These jog memory; they do not suggest an answer.</p>
    <ul class="prompts">
      ${REVIEW.prompts.map((p) => `<li>${esc(p)}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow stack" style="--flow:1.2rem">
    <h2>Why there is no pre-written review here</h2>
    <p>It was asked for, and it is worth explaining rather than just leaving out.</p>
    <p>Supplying the words a client submits as their own review is against Google's content policy, against the FTC's endorsement rule, and against Georgia Rule of Professional Conduct 7.1 — a lawyer may not cause a misleading communication to be made, and a testimonial the firm wrote is one.</p>
    <p><strong>The practical risk is the bigger one.</strong> Google's spam detection looks specifically for clusters of near-identical reviews. When it finds them it removes them and can suppress the whole profile — so the likely result is not a faster climb but losing the reviews you already have, starting from ${MARKET.reviewGap.hers}.</p>
    <p>The card above is built to solve the real problem instead: getting someone to the review box in one tap, and making it clear they do not have to write anything.</p>
  </div>
</section>

<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.2rem">
    <h2>Printing it</h2>
    <p class="small">Print this page and the card comes out at roughly business-card size with a quiet border around the code — scanners need that border, so please do not crop it. It reads reliably down to about 2cm square, which means a card, a table tent, or a sticker on the back of a folder all work.</p>
    <div class="btn-row">
      <button class="btn" type="button" onclick="window.print()">Print the card</button>
      <a class="btn btn--ghost" href="/start/">Back to the form</a>
    </div>
  </div>
</section>`;

  return page({
    route: '/review-card/',
    title: `The review card — ${CLIENT.firm} | ${FPC.name}`,
    description: `A printable QR review card for ${CLIENT.firm}: one tap to the Google review box, prompts instead of scripts, and why no pre-written review text is included.`,
    body,
    chrome: 'fpc',
    chromeLabel: `Prepared for ${CLIENT.attorney}`,
  });
};
