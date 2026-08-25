/* ==========================================================================
   Site-wide facts. One source of truth (rule 12, rule 15).

   FACTS LEON HAS NOT SUPPLIED ARE `null` ON PURPOSE. They render as visible,
   honest blanks — never invented. Fill them here and every page updates.
   ========================================================================== */

/* --------------------------------------------------------------------------
   WHERE THE SITE LIVES.

   Astro hands these back from `site` and `base` in astro.config.mjs, which
   read the environment. A plain build produces the canonical address below;
   the deploy workflow can point the same commit at a GitHub Pages project URL
   for a look before the domain is pointed. Nothing else in the repo may
   hard-code an address — use `link()` for in-site links and `abs()` for the
   absolute URLs that go in canonicals, the sitemap and structured data.
   -------------------------------------------------------------------------- */

/** The canonical home. A build served anywhere else is a preview, not the site. */
export const CANONICAL_ORIGIN = 'https://frontporchbuilds.com';

const ORIGIN = (import.meta.env.SITE ?? CANONICAL_ORIGIN).replace(/\/$/, '');
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** True when this build is being served from its real address. */
export const IS_CANONICAL = ORIGIN === CANONICAL_ORIGIN && BASE === '';

/** An in-site path ('/contact'), prefixed for wherever the build is mounted. */
export const link = (p: string) => (p.startsWith('/') ? BASE + p : p);

/** The absolute URL of an in-site path. */
export const abs = (p: string) => ORIGIN + link(p);

export const SITE = {
  /** The site's home URL, base path included. */
  url: ORIGIN + BASE,
  origin: ORIGIN,
  name: 'Front Porch Collective',
  legalName: 'Front Porch Collective LLC',
  /* The company promise. Leon picked this line on 2026-08-24. */
  promise: 'We build it properly, then hand you the keys.',

  /* What we do, for machines. The promise is a promise — it is deliberately
     short, which makes it a poor search description. Structured data and any
     meta fallback use this instead. */
  summary:
    'An independent creative company in Atlanta: custom websites, mobile apps, AI agent templates, marketing copy, and professional TV mounting across metro Atlanta.',
};

/* --------------------------------------------------------------------------
   CONTACT — Leon answered the SHAPE (email site-wide, phone featured on the
   TV pages). The VALUES are still his to give. Do not invent them.
   -------------------------------------------------------------------------- */
export const CONTACT = {
  email: 'jacksonleon24@gmail.com' as string | null,   // Leon, 2026-08-24
  phone: '(678) 525-8154' as string | null,            // Leon, 2026-08-24
  phoneHref: '+16785258154' as string | null,          // tel: form of the above
} as const;

/* --------------------------------------------------------------------------
   SERVICE-AREA BUSINESS (Leon's answer, 2026-08-23).
   No street address is published. Google supports a service-area business:
   `areaServed` carries the geography, and the street address is omitted
   rather than faked. NAP stays identical on every page that shows it.
   -------------------------------------------------------------------------- */
export const NAP = {
  name: 'Front Porch Collective LLC',
  serviceAreaBusiness: true,
  city: 'Atlanta',
  region: 'GA',
  regionName: 'Georgia',
  country: 'US',
} as const;

/* --------------------------------------------------------------------------
   FORMS — Web3Forms (Leon's choice, 2026-08-25).

   Host-independent on purpose: the site is on a GitHub Pages URL today and
   moves to frontporchbuilds.com later, and this survives that without a second
   decision. The endpoint and the honeypot name below are Web3Forms' own.

   THE ONE THING LEFT IS `accessKey`. Web3Forms mails a key to whatever
   address you register. Paste it below and every form on this site turns on
   at once: submit buttons enable, staging notices disappear, and the privacy
   page switches from "nothing is collected" to naming the processor.

   Until then nothing sends and every form says so on its face.
   -------------------------------------------------------------------------- */
export const FORMS = {
  endpoint: 'https://api.web3forms.com/submit' as string | null,

  /** Paste the key here. That is the whole integration. */
  accessKey: null as string | null,

  /* Web3Forms drops any submission where this field is filled in. Renaming it
     does not break the form — it silently turns the spam check off, which is
     worse. Leave it alone unless the provider changes. */
  honeypot: 'botcheck',

  provider: 'Web3Forms',
} as const;

/** Forms send only with somewhere to send to AND a key to send with. */
export const FORMS_LIVE: boolean =
  FORMS.endpoint !== null && FORMS.accessKey !== null;

/* --------------------------------------------------------------------------
   PRICES — quote-only across the board (Leon's ruling, 2026-08-24), which
   supersedes the earlier "from $X" answer.

   `null` here is a DECISION, not a gap: no starting figures are published, and
   every job is priced from its own scope. The pages say so plainly rather than
   showing a pending blank. Put a number in and that service starts showing a
   "starting at" figure again — nothing else needs editing.
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   TV MOUNTING PRICES — Leon's figures, 2026-08-25.

   He gave the four size brackets. The base covers the ordinary job as it was
   put to him: drywall, cords covered rather than run inside the wall.

   The add-ons below are `null` because he has NOT set them. They render as
   "Quoted" — honest, and normal for this trade — rather than as invented
   numbers. Put a figure in and that row shows it; nothing else needs editing.

   Two things he has not answered, deliberately left off the page rather than
   guessed at, because getting either wrong starts an argument in someone's
   living room: whether the base includes the bracket, and whether there is a
   minimum or trip charge for the far counties. See docs/BLANKS.md.
   -------------------------------------------------------------------------- */
export const TV_PRICING = {
  /* Labels match TV_FIELDS in forms.ts exactly. A customer who reads "56–70""
     on the price table and then picks "56–70"" in the form is looking at the
     same words both times — a different wording here reads as a different
     scheme and costs trust at the worst moment. */
  sizes: [
    { size: 'Under 40"', price: 99 as number | null },
    { size: '40–55"', price: 129 as number | null },
    { size: '56–70"', price: 179 as number | null },
    { size: '71" or bigger', price: 229 as number | null },
  ],

  /* Named from the form's own wall_type and cords answers, so the questions a
     visitor is about to be asked are the ones priced here. */
  addOns: [
    { name: 'Brick or stone wall', price: null as number | null },
    { name: 'Concrete wall', price: null as number | null },
    { name: 'Over a fireplace', price: null as number | null },
    { name: 'Cords hidden inside the wall', price: null as number | null },
    { name: 'New outlet behind the TV', price: null as number | null },
  ],
} as const;

export const PRICES: Record<string, number | null> = {
  websites: null,          // quote-only
  apps: null,              // quote-only
  'tv-mounting': 99,       // Leon, 2026-08-25 — the lowest bracket in
                           // TV_PRICING above, so "Starting at $99" and the
                           // table can never disagree.
  'agent-templates': null, // price set before the shelf opens — see FORMS.md
  marketing: null,         // quote-only
};

/* --------------------------------------------------------------------------
   SERVICES — the five Leon approved on 2026-08-23.
   Struck by Leon and deliberately absent: story & screen development,
   Porchlight Pages. No "coming soon" ghosts (§2 of the founding prompt).
   -------------------------------------------------------------------------- */
export type Service = {
  slug: string;
  nav: string;
  name: string;
  blurb: string;
  /* Where the page's primary action lives — the quote form on most, the
     shelf on the templates page (it is a purchase path, not a quote). */
  anchor: string;
  /* Where this funnel sits on the playbook's curious→committed scale (0–10),
     and why. Every funnel is placed on purpose (playbook §2). */
  dial: { score: string; note: string };
};

export const SERVICES: Service[] = [
  {
    slug: 'websites',
    nav: 'Websites',
    anchor: '#quote',
    name: 'Website building',
    blurb: 'Custom sites built to a world-class standard — design, build, accessibility, SEO, launch.',
    dial: { score: '7–8 — committed', note: 'Qualifying form. Fewer, better-fit projects over volume.' },
  },
  {
    slug: 'apps',
    nav: 'Apps',
    anchor: '#quote',
    name: 'App development',
    blurb: 'Mobile apps end to end, from the first screen to the store listing.',
    dial: { score: '7–8 — committed', note: 'Qualifying form. Scope and timeline before anything else.' },
  },
  {
    slug: 'tv-mounting',
    nav: 'TV Mounting',
    anchor: '#quote',
    name: 'TV hanging & mounting',
    blurb: 'Your TV on the wall — level, solid, cords out of sight. Metro Atlanta.',
    dial: { score: '3–4 — curious', note: 'Low-friction quote funnel. Volume is the point; four taps, no typing.' },
  },
  {
    slug: 'agent-templates',
    nav: 'Agent Templates',
    anchor: '#kit',
    name: 'AI agent build templates',
    blurb: 'The starter kits that run this company — identity files, rulebooks, dispatch protocols.',
    dial: { score: '5–6 — direct', note: 'Straight purchase path. Checkout is built but switched off until Leon connects a provider.' },
  },
  {
    slug: 'marketing',
    nav: 'Marketing',
    anchor: '#quote',
    name: 'Marketing & copy',
    blurb: 'Positioning, funnels, and copy that argues its case — measured, not guessed.',
    dial: { score: '7–8 — committed', note: 'Qualifying form. We ask about the numbers before we promise any.' },
  },
];

/* --------------------------------------------------------------------------
   COUNTIES — Leon's answer: metro Atlanta, five counties.
   Town lists are real municipalities in each county. Population figures and
   any claim about work performed there are deliberately absent — we have no
   verified numbers and will not invent them.
   -------------------------------------------------------------------------- */
export type County = {
  slug: string;
  name: string;        // "Fulton County"
  short: string;       // "Fulton"
  seat: string;
  towns: string[];
  line: string;        // one honest, geography-specific line
};

export const COUNTIES: County[] = [
  {
    slug: 'fulton-county',
    name: 'Fulton County',
    short: 'Fulton',
    seat: 'Atlanta',
    towns: ['Atlanta', 'Sandy Springs', 'Roswell', 'Alpharetta', 'East Point', 'College Park', 'Johns Creek', 'Milton', 'Union City', 'Fairburn'],
    line: 'From in-town bungalows to Alpharetta new builds — plaster, brick, and studs that are never quite where you expect.',
  },
  {
    slug: 'dekalb-county',
    name: 'DeKalb County',
    short: 'DeKalb',
    seat: 'Decatur',
    towns: ['Decatur', 'Brookhaven', 'Dunwoody', 'Tucker', 'Chamblee', 'Stone Mountain', 'Doraville', 'Clarkston', 'Avondale Estates', 'Lithonia'],
    line: 'Older Decatur and Avondale homes, mid-century ranches, and a lot of brick fireplaces people want a TV over.',
  },
  {
    slug: 'cobb-county',
    name: 'Cobb County',
    short: 'Cobb',
    seat: 'Marietta',
    towns: ['Marietta', 'Smyrna', 'Kennesaw', 'Acworth', 'Austell', 'Powder Springs', 'Mableton', 'Vinings'],
    line: 'Two-story great rooms and bonus-room setups — the mounts that need the height and the cable run planned first.',
  },
  {
    slug: 'gwinnett-county',
    name: 'Gwinnett County',
    short: 'Gwinnett',
    seat: 'Lawrenceville',
    towns: ['Lawrenceville', 'Duluth', 'Suwanee', 'Snellville', 'Norcross', 'Buford', 'Sugar Hill', 'Peachtree Corners', 'Lilburn', 'Grayson'],
    line: 'Newer construction with drywall and open studs — usually the cleanest cord management of the five.',
  },
  {
    slug: 'clayton-county',
    name: 'Clayton County',
    short: 'Clayton',
    seat: 'Jonesboro',
    towns: ['Jonesboro', 'Riverdale', 'Forest Park', 'Morrow', 'Lake City', 'Lovejoy'],
    line: 'South metro, close to the airport — same level TV, same tidy cords, same day where the schedule allows.',
  },
];

export const NAV = [
  { href: '/websites', label: 'Websites' },
  { href: '/apps', label: 'Apps' },
  { href: '/tv-mounting', label: 'TV Mounting' },
  { href: '/agent-templates', label: 'Agent Templates' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];
