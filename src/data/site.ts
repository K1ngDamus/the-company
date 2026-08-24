/* ==========================================================================
   Site-wide facts. One source of truth (rule 12, rule 15).

   FACTS LEON HAS NOT SUPPLIED ARE `null` ON PURPOSE. They render as visible,
   honest blanks — never invented. Fill them here and every page updates.
   ========================================================================== */

export const SITE = {
  url: 'https://frontporchco.com',
  name: 'Front Porch Collective',
  legalName: 'Front Porch Collective LLC',
  /* DRAFT copy — Leon to confirm or replace (three options filed with the
     hand-off note). Everything else on this line is his answer already. */
  promise:
    'An independent creative company. Apps, websites, stories, and services — built by a small crew that answers the door.',
} as const;

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
   FORMS — staged, never sending (rule 9).
   Every form on this site posts to this endpoint. It is null, so submit
   buttons are inert and each form shows a staging notice. See FORMS.md for
   exactly what connecting one costs and what it changes.
   -------------------------------------------------------------------------- */
export const FORM_ENDPOINT: string | null = null;

/* --------------------------------------------------------------------------
   PRICES — quote-only across the board (Leon's ruling, 2026-08-24), which
   supersedes the earlier "from $X" answer.

   `null` here is a DECISION, not a gap: no starting figures are published, and
   every job is priced from its own scope. The pages say so plainly rather than
   showing a pending blank. Put a number in and that service starts showing a
   "starting at" figure again — nothing else needs editing.
   -------------------------------------------------------------------------- */
export const PRICES: Record<string, number | null> = {
  websites: null,          // quote-only
  apps: null,              // quote-only
  'tv-mounting': null,     // quote-only FOR NOW — Leon is setting TV prices
                           // once the site is up. Put the number here and all
                           // six TV pages show it; nothing else needs editing.
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
