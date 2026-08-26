/**
 * Marshall Law Practice, LLC — the one file of facts.
 *
 * COMPANY LAW 11: nothing here is guessed. Every value marked `verified` came
 * from her own site, her Blinq card, or her Google listing, and is reproduced
 * exactly. Every unknown is an `ask()` — it renders on the page as a visible
 * "[awaiting client]" placeholder rather than as plausible filler.
 *
 * A fake credential, case result, or bar admission on a lawyer's site is not a
 * typo — it is a bar complaint and a dead deal. If you cannot cite where a fact
 * came from, it does not go in this file.
 *
 * SHE HAS NOT SIGNED. This is a preview. See ../README.md.
 */

/** A question only Keyanna can answer. Renders as a labeled gap on the page. */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ask = (question, note = '') => ({ __ask: true, question, note });
export const isAsk = (v) => Boolean(v && v.__ask);

/* -------------------------------------------------------------------------
   IMAGE SLOTS — drop a file in `assets/` and rebuild. That is the procedure.

   Detected at build time so nobody has to remember to flip a flag as well as
   copy a file. Every slot accepts several extensions; the first one found
   wins, webp first so an optimised file beats an unoptimised one automatically.
   ---------------------------------------------------------------------- */
const assetPath = (name) => fileURLToPath(new URL(`../assets/${name}`, import.meta.url));
const findAsset = (base) => {
  const name = ['webp', 'jpg', 'jpeg', 'png'].map((e) => `${base}.${e}`).find((n) => existsSync(assetPath(n)));
  return name ? { file: name, src: `/assets/${name}` } : { file: null, src: null };
};

/** Named slots. Add a row here and a file, and it renders — no other edit. */
export const IMAGES = {
  headshot: findAsset('keyanna-marshall'),   // hero + About
  office:   findAsset('office'),             // Contact — a real office beats stock
};

export const HEADSHOT_FILE = IMAGES.headshot.file;
export const HEADSHOT_SRC = IMAGES.headshot.src;

/* -------------------------------------------------------------------------
   FEATURE FLAGS — the switches Leon flips as answers come back.
   Every one of these defaults to the honest state, not the flattering one.
   ---------------------------------------------------------------------- */
export const FLAGS = {
  /** Her card lists CashApp + Venmo. Unknown whether she wants them on a public
   *  website vs. handed out card-to-card. Built, styled, and OFF until she says.
   *  (Leon, 2026-08-26: build it, ship it hidden.) */
  showPayments: false,

  /** The brief wired a "Free Consultation" CTA, but consult cost is unverified.
   *  Asserting "free" on a lawyer's site without her word is an invented claim.
   *  OFF = every CTA reads "Request a Consultation" and the cost FAQ shows a
   *  placeholder. Flip to true ONLY on her confirmation, and log who confirmed. */
  consultIsFree: false,

  /* --- her likeness: two different permissions, deliberately not one -------
   *
   * A private pitch document and a public website are not the same act, and
   * collapsing them into one boolean is how a photo nobody cleared ends up on
   * a live site. So there are two.
   */

  /** Use her photo in THIS PREVIEW — a private, watermarked, noindex,
   *  never-deployed document shown to her in a pitch. Leon's call, made
   *  2026-08-26: a prospect cannot picture her own web home without her face
   *  in it, and that is most of what the preview is for. */
  headshotPreviewUse: true,

  /** Publish her likeness on the LIVE site. Still false, and it stays false
   *  until she says yes in writing — showing someone a mockup of their own
   *  face is not the same as them licensing it to the open internet. This is
   *  the gate that matters once FLAGS.isPreview goes false, and question 3 on
   *  /start/ is what clears it. */
  headshotPublishRights: false,

  /** Preview builds are noindex + robots-disallow, always. This exists to make
   *  that a deliberate, visible decision rather than an oversight. Turning it
   *  off requires a signed client and a real domain. */
  isPreview: true,
};

/** Her face appears when the file exists AND the permission that applies to
 *  THIS build is given. A preview uses the preview permission; a live build
 *  demands the publishing rights and ignores the preview one entirely, so
 *  turning off isPreview can never silently carry a pitch-only allowance onto
 *  the real site. */
FLAGS.hasHeadshot = HEADSHOT_SRC !== null &&
  (FLAGS.isPreview ? FLAGS.headshotPreviewUse : FLAGS.headshotPublishRights);

/* -------------------------------------------------------------------------
   VERIFIED — reproduce exactly. Source noted for every line.
   ---------------------------------------------------------------------- */
export const CLIENT = {
  attorney: 'Keyanna A. Marshall',
  attorneyShort: 'Keyanna Marshall',
  /* How the site refers to her in the third person, to people reading it.
     A defense client reading a page about their lawyer should meet a
     professional, not a pronoun — so the copy names her rather than leaning
     on "she" and "her". Pronouns still follow the name inside a passage,
     because repeating the surname every clause reads like a court filing. */
  attorneyFormal: 'Ms. Marshall',
  credential: 'Attorney at Law',
  firm: 'Marshall Law Practice, LLC',

  /* Her tagline, spelled correctly. Her current site's headline misspells it;
     ours never will. Source: Blinq card + brief §1. */
  tagline: 'Service With Integrity',

  /* NAP — must be byte-identical everywhere it appears: page, footer, schema,
     and every citation listed in the exposure plan. One character of drift
     here is a ranking problem, not a typo. Source: Blinq card. */
  nap: {
    street: '233 12th Street',
    suite: 'Suite # 911-C',
    city: 'Columbus',
    state: 'Georgia',
    stateShort: 'GA',
    zip: '31901',
    county: 'Muscogee County',
  },

  phone: '(762) 266-0767',
  phoneHref: 'tel:+17622660767',
  email: 'Keyanna@themarshall-law.com',
  website: 'themarshall-law.com',
  websiteUrl: 'https://themarshall-law.com',

  /* Source: Blinq card. Same string drives the page and the schema. */
  hours: { opens: '09:00', closes: '17:00', display: '9:00am – 5:00pm' },

  /* Source: her Google listing, read 2026-08-26. Stated with the review count
     attached, always. "5.0 stars" without "(1 review)" is a misleading claim. */
  google: { rating: '5.0', count: 1, countLabel: '1 Google review' },

  /* Source: Couriernews, Feb 2025. Title reproduced exactly.
     ⚠ The article URL was not captured during recon — needed before this can
     be linked or used as a sameAs citation. Until then it is named, not linked. */
  press: {
    outlet: 'Couriernews',
    title: 'Attorney Keyanna Marshall: A Journey to Justice',
    date: 'February 2025',
    url: ask('Exact URL of the Couriernews feature', 'Needed to link it and to use it as a sameAs citation in schema.'),
  },

  /* Source: her Blinq card. Hidden behind FLAGS.showPayments. */
  payments: [
    { label: 'CashApp', handle: '$MarshallLawPractice' },
    { label: 'Venmo', handle: '@MarshallLawPractice' },
  ],
};

CLIENT.addressOneLine =
  `${CLIENT.nap.street} ${CLIENT.nap.suite}, ${CLIENT.nap.city}, ${CLIENT.nap.state} ${CLIENT.nap.zip}`;
CLIENT.cityState = `${CLIENT.nap.city}, ${CLIENT.nap.stateShort}`;
CLIENT.mapUrl =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CLIENT.addressOneLine);
CLIENT.emailHref = `mailto:${CLIENT.email}`;

/* -------------------------------------------------------------------------
   OPEN QUESTIONS — Leon asks her. Each renders somewhere visible.
   Mirrored in docs/QUESTIONS.md so none is lost between sessions.
   ---------------------------------------------------------------------- */
export const OPEN = {
  practiceAreas: ask(
    'The confirmed practice-area list',
    'Criminal defense is verified. Juvenile appears in press only and is NOT confirmed by her.',
  ),
  yearsLicensed: ask(
    'Year admitted to the State Bar of Georgia',
    'Avvo suggests 2 years. Avvo is not a source of record — a wrong admission year on a lawyer\'s site is a bar problem, so this stays blank until she states it.',
  ),
  bio: ask('Bio — education, background, why she practices defense', 'Her words, not ours.'),
  headshotRights: ask('Written OK to use her headshot', 'The image exists on Blinq/GBP; permission does not follow from availability.'),
  testimonials: ask(
    'Client testimonials she can ethically publish',
    'GA Bar advertising rules govern this. She decides what is publishable; we never write one.',
  ),
  consultCost: ask('What a first consultation costs', 'Free / flat fee / varies. Drives FLAGS.consultIsFree.'),
  socials: ask('Social profiles, if any', 'Feeds the sameAs array and the citation set.'),
  gbpClaimed: ask('Is the Google Business Profile claimed and verified?', 'Decides whether step 1 of the exposure plan is a claim or an optimization.'),
  avvoZip: ask('Avvo lists ZIP 31909; the card says 31901', 'NAP consistency is a ranking factor. One of these is wrong and it must be fixed at the source.'),
  paymentsOnSite: ask('CashApp/Venmo on the website, or card-only?', 'Drives FLAGS.showPayments.'),
  geo: ask(
    'Verified latitude/longitude for the office',
    'Deliberately NOT in the schema. Coordinates are trivial to guess and wrong coordinates put her pin in the wrong building — read off her claimed GBP, never estimated.',
  ),
  barAssociations: ask('Bar associations and memberships', 'Feeds both the About page and the local-link plan.'),
  reviewLink: ask(
    'Her direct Google review link',
    'From Google Business Profile → "Ask for reviews" (a g.page/r/…/review short link), or built from her Place ID. Needed before the review card QR is real rather than a sample.',
  ),
};

/* -------------------------------------------------------------------------
   THE REVIEW CARD — /review-card/
   A printable card whose QR opens her Google review box in one tap.

   WHAT THIS DELIBERATELY DOES NOT DO: supply the review text.

   Pre-written review copy that a customer submits as their own breaks Google's
   content policy (reviews must reflect genuine first-hand experience), the
   FTC's 2024 endorsement rule (16 CFR 465), and GA Rule of Professional
   Conduct 7.1 — a lawyer may not cause a misleading communication to be made,
   and a testimonial the firm wrote is exactly that.

   The practical risk is worse than the legal one. Google's spam detection
   specifically clusters near-identical reviews, and the usual outcome is that
   the reviews are REMOVED and the profile suppressed — which would destroy the
   review base this whole plan exists to build, starting from one.

   The friction it was meant to solve is real, though, and there are two honest
   fixes for it: Google accepts a STAR-ONLY review with no text at all, and a
   few prompt questions jog memory without putting words in anyone's mouth.
   Both are on the card.
   ---------------------------------------------------------------------- */
export const REVIEW = {
  /** Replace with her real link (OPEN.reviewLink). Until then the card renders
   *  as a clearly-labelled sample encoding her website, which is real and
   *  harmless — never a fake review URL. */
  link: null,

  /** Prompts, not scripts. Every one is a question about the reader's own
   *  experience; none of them suggests an answer or a rating. */
  prompts: [
    'What were you facing when you first called?',
    'What were you most worried about?',
    'How did Keyanna explain your options?',
    'What would you tell someone in the same position?',
  ],

  /** The line that removes the actual friction. */
  starOnly: 'Not one for writing? A star rating on its own counts. Tap the stars, tap Post, done.',
};

/* -------------------------------------------------------------------------
   COMPETITIVE POSITION — verified 2026-08-26. Used in the exposure pitch.
   These are her competitors' public review counts, not our estimates.
   ---------------------------------------------------------------------- */
export const MARKET = {
  verifiedOn: '2026-08-26',
  reviewGap: { hers: 1, competitorRange: '74–282' },
  competitorsOwningPageOne: ['Curry', 'ALJ', 'Poydasheff & Sowers', 'Ted Morgan', 'Moffitt'],
  moneyTerms: [
    { term: 'criminal defense attorney Columbus GA', herPosition: 'Not on page one' },
    { term: 'DUI lawyer Columbus GA', herPosition: 'Not on page one' },
    { term: 'juvenile lawyer Muscogee County', herPosition: 'Not on page one', pendingConfirmation: true },
  ],
};

/* -------------------------------------------------------------------------
   FRONT PORCH — the preview's own identity. Watermark + footer line.
   ---------------------------------------------------------------------- */
export const FPC = {
  name: 'Front Porch Collective',
  legal: 'Front Porch Collective LLC',
  footerLine: 'Design preview by Front Porch Collective — © 2026, all rights reserved. Not a live site.',
};
