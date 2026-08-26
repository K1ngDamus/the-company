/**
 * Rendering primitives for the Marshall Law preview.
 * Zero dependencies on purpose: a law firm's site should not need a toolchain
 * to change a phone number, and a preview should build anywhere, instantly.
 */
import { CLIENT, FLAGS, FPC, isAsk } from '../data/client.mjs';

/* --- escaping ------------------------------------------------------------
   Everything interpolated into HTML goes through this. Her name and address
   contain no metacharacters today, but a future edit should not be able to
   break the page by adding an ampersand. */
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const attr = (s) => esc(s);

/* --- icons ---------------------------------------------------------------
   Inline so they cost no request. Every one carries aria-hidden — they sit
   beside text that already says what they mean. */
const icon = (paths, size = 20) =>
  `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

export const ICONS = {
  phone: (s) => icon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>', s),
  mail: (s) => icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>', s),
  pin: (s) => icon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', s),
  globe: (s) => icon('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', s),
  clock: (s) => icon('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', s),
  wallet: (s) => icon('<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>', s),
  quote: (s) => icon('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3"/>', s),
  /* Scales of justice — the gold detail. Hers is a Lady Justice mark; this is
     a plain scales glyph used as ornament, never as a substitute for her logo. */
  /* Balance scales. The first geometry tried here drew its pans as closed
     curves off a straight crossbar, which at 30px in the header read as an
     umbrella rather than a scale — visible only in a screenshot, never in the
     markup. This is the conventional beam-and-pans form. */
  scales: (s) => icon('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>', s),
  shield: (s) => icon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', s),
  arrow: (s) => icon('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', s),
};

export const star = (size = 15) =>
  `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

/* The FPC monogram, from the canon paths in branding/FPC-monogram-onecolor.svg.
   currentColor rather than the file's hard-coded coal, so it can sit on a dark
   ground. Geometry untouched — recoloring by inheritance is not a recolor of
   the mark's design (BRANDING.md: geometry is what must not change). */
export const fpcMark = (size = 22, label = null) => `<svg class="fpc-mark" ${
  label ? `role="img" aria-label="${attr(label)}"` : 'aria-hidden="true"'
} width="${size}" height="${size}" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M60,26 V94"/><path d="M60,26 H74 a13,13 0 0 1 0,26 H60"/><path d="M60,26 H43"/><path d="M60,52 H48"/><circle cx="60" cy="94" r="4.2" fill="currentColor" stroke="none"/></svg>`;

/* Her mark, as a preview stand-in: a scales glyph in her rose. Her real Lady
   Justice logo is HERS — it is not redrawn, traced, or approximated here.
   When she signs, her file drops into this slot. */
export const clientMark = (size = 30) =>
  `<span class="brand__mark" aria-hidden="true">${ICONS.scales(size)}</span>`;

/* --- honest blanks -------------------------------------------------------
   The single renderer for every unknown. Because it is one function, a blank
   can never quietly become filler: there is nowhere else for one to come from. */
export const blank = (askObj, { heading = null } = {}) => {
  if (!isAsk(askObj)) throw new Error('blank() takes an ask() from data/client.mjs');
  return `<div class="todo">
      <span class="todo__tag">Awaiting client</span>
      <strong>${esc(heading || askObj.question)}</strong>
      ${askObj.note ? `<p>${esc(askObj.note)}</p>` : ''}
    </div>`;
};

/* --- the consult CTA -----------------------------------------------------
   One function decides what every CTA on the site says, so "Free" cannot be
   asserted in one place and hedged in another. */
export const consultLabel = () =>
  FLAGS.consultIsFree ? 'Free Consultation' : 'Request a Consultation';

/* --- rating --------------------------------------------------------------
   The count ships with the stars, always. */
export const ratingBlock = () => `<div class="rating">
    <span class="rating__stars" role="img" aria-label="${attr(CLIENT.google.rating)} out of 5 stars on Google">${star().repeat(5)}</span>
    <span class="rating__text"><strong>${esc(CLIENT.google.rating)}</strong> on Google · ${esc(CLIENT.google.countLabel)}</span>
  </div>`;

/* --- structured data -----------------------------------------------------
   Attorney/LegalService with NAP and hours. Two deliberate omissions:
     • geo — coordinates are trivial to guess and a guessed pin puts her in the
       wrong building. Read them off her claimed GBP (OPEN.geo).
     • aggregateRating — self-serving review markup on your own site is against
       Google's guidelines, and one review presented as a rating overstates it.
       The rating is shown on the page with its count attached instead.
   Both are documented in docs/QUESTIONS.md rather than silently skipped. */
export const schema = (canonical) => {
  const s = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: CLIENT.firm,
    legalName: CLIENT.firm,
    description: `${CLIENT.firm} — criminal defense in ${CLIENT.cityState}. ${CLIENT.tagline}.`,
    url: CLIENT.websiteUrl,
    telephone: CLIENT.phone,
    email: CLIENT.email,
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: `${CLIENT.nap.city}, ${CLIENT.nap.stateShort}` },
      { '@type': 'AdministrativeArea', name: CLIENT.nap.county },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${CLIENT.nap.street} ${CLIENT.nap.suite}`,
      addressLocality: CLIENT.nap.city,
      addressRegion: CLIENT.nap.stateShort,
      postalCode: CLIENT.nap.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: CLIENT.hours.opens,
      closes: CLIENT.hours.closes,
    }],
    founder: { '@type': 'Person', name: CLIENT.attorney, jobTitle: CLIENT.credential },
  };
  return `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`;
};

/* --- chrome -------------------------------------------------------------- */
const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Keyanna' },
  { href: '/practice-areas/', label: 'Practice Areas' },
  { href: '/results/', label: 'Results & Reviews' },
  { href: '/contact/', label: 'Contact' },
];

const header = (route) => `<header class="header">
    <div class="wrap header__inner">
      <a class="brand" href="/">
        ${clientMark(30)}
        <span class="brand__text">
          <span class="brand__name">${esc(CLIENT.firm.replace(', LLC', ''))}</span>
          <span class="brand__sub">${esc(CLIENT.tagline)}</span>
        </span>
      </a>
      <nav class="nav" aria-label="Main">
        ${NAV.map((n) => `<a href="${attr(n.href)}"${n.href === route ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('\n        ')}
      </nav>
      <div class="header__actions">
        <a class="header__phone" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(17)}${esc(CLIENT.phone)}</a>
        <a class="btn header__cta" href="/contact/#consult">${esc(consultLabel())}</a>
      </div>
      <!-- Mobile menu: a <details> disclosure, so it works with zero JavaScript.
           Same pattern as the company site's Header.astro — one nav idiom
           across the house, not a second one invented here. -->
      <details class="mobilenav">
        <summary aria-label="Menu"><span class="bars" aria-hidden="true"></span><span class="visually-hidden">Menu</span></summary>
        <nav class="mobilenav__panel" aria-label="Main, mobile">
          <ul>
            ${NAV.map((n) => `<li><a href="${attr(n.href)}"${n.href === route ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`).join('\n            ')}
            <li><a href="/exposure/">How we get you found</a></li>
          </ul>
          <a class="btn" href="${attr(CLIENT.phoneHref)}">Call ${esc(CLIENT.phone)}</a>
        </nav>
      </details>
    </div>
  </header>`;

/* Mobile only. Tap-to-call from any scroll position, on every page. */
const callbar = () => `<div class="callbar">
    <a class="btn" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(17)} Call now</a>
    <a class="btn btn--ghost" href="/contact/#consult">${esc(consultLabel())}</a>
  </div>`;

const paymentsBlock = () => {
  if (!FLAGS.showPayments) return '';
  return `<div class="channel">
        <span class="channel__icon">${ICONS.wallet()}</span>
        <span>
          <span class="channel__label">Payments</span>
          ${CLIENT.payments.map((p) => `<span class="channel__value">${esc(p.label)} ${esc(p.handle)}</span>`).join('')}
        </span>
      </div>`;
};

const footer = () => `<footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <h2>${esc(CLIENT.firm)}</h2>
          <ul>
            <li><a href="${attr(CLIENT.phoneHref)}">${esc(CLIENT.phone)}</a></li>
            <li><a href="${attr(CLIENT.emailHref)}">${esc(CLIENT.email)}</a></li>
            <li><a href="${attr(CLIENT.mapUrl)}" rel="noopener">${esc(CLIENT.addressOneLine)}</a></li>
            <li>${esc(CLIENT.hours.display)}, Monday to Friday</li>
          </ul>
        </div>
        <div>
          <h3>Pages</h3>
          <ul>${NAV.map((n) => `<li><a href="${attr(n.href)}">${esc(n.label)}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h3>For the pitch</h3>
          <ul>
            <li><a href="/exposure/">How we get you found</a></li>
            <li><a href="/start/">Getting started — the questions</a></li>
            <li><a href="/review-card/">The review card</a></li>
            <li><a href="${attr(CLIENT.websiteUrl)}" rel="noopener">${esc(CLIENT.website)}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__legal">
        <p class="footer__disclaimer">The information on this site is for general purposes only and is not legal advice. Viewing it or sending a message does not create an attorney–client relationship. Do not send confidential information until an attorney–client relationship has been established in writing.</p>
        <p class="footer__preview">${fpcMark(20)} ${esc(FPC.footerLine)}</p>
      </div>
    </div>
  </footer>`;

/* --- watermark -----------------------------------------------------------
   Ships on every page. audit.mjs fails the build if a page is missing it, so
   dropping it is a deliberate act rather than an oversight (brief §0). */
const watermark = () => `<div class="watermark-field" aria-hidden="true"></div>
  ${fpcMark(84, `Design preview by ${FPC.name} — not a live site`).replace('class="fpc-mark"', 'class="fpc-mark watermark"')}
  <p class="watermark__caption" aria-hidden="true">Preview<br>Front Porch</p>`;

/* Chrome for the pages that are FROM Front Porch rather than part of her site
   — the intake form and the review card. Different hat, same palette: it must
   be obvious at a glance that this is our document, not a page of hers. */
const fpcTop = (forLabel) => `<div class="intake-top">
    <div class="wrap intake-top__inner">
      <span class="intake-top__brand">${fpcMark(22)} ${esc(FPC.name)}</span>
      <span class="intake-top__for">${esc(forLabel)}</span>
    </div>
  </div>`;

/* --- the page shell ------------------------------------------------------ */
export const page = ({ route, title, description, body, breadcrumbs = null, chrome = 'client', chromeLabel = '' }) => {
  const canonical = CLIENT.websiteUrl + route;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${attr(canonical)}">
${FLAGS.isPreview ? '<meta name="robots" content="noindex, nofollow">\n<!-- PREVIEW BUILD. Never indexable. FLAGS.isPreview in data/client.mjs. -->' : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta name="theme-color" content="#FDFBFC">
<link rel="preload" href="/assets/fonts/playfair-display-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jost-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
${chrome === 'fpc' ? '<style>body { padding-bottom: 0 } .watermark { bottom: clamp(.85rem, 2vw, 1.75rem) } .watermark__caption { bottom: calc(clamp(.85rem, 2vw, 1.75rem) + clamp(52px, 7vw, 84px) + .4rem); transform: none }</style>' : ''}
${schema(canonical)}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${chrome === 'fpc' ? fpcTop(chromeLabel) : header(route)}
${breadcrumbs ? `<div class="wrap breadcrumbs">${breadcrumbs}</div>` : ''}
<main id="main">
${body}
</main>
${footer()}
${chrome === 'fpc' ? '' : callbar()}
${watermark()}
</body>
</html>
`;
};

export { paymentsBlock, NAV };
