import type { Field } from '../components/QuoteForm.astro';

/* ---------------------------------------------------------------------------
   Form shapes, defined once so the hub and the five county pages cannot drift.

   TV mounting sits at 3–4 on the curious→committed scale: quantity is the
   point. Four taps, then contact. The only free-text before the end is the
   ZIP, and it earns its place — it routes the job.
   --------------------------------------------------------------------------- */
export const TV_FIELDS: Field[] = [
  { kind: 'choice', name: 'tv_size', label: 'How big is the TV?', required: true,
    options: ['Under 40"', '40–55"', '56–70"', '71" or bigger', 'Not sure'] },
  { kind: 'choice', name: 'wall_type', label: 'What is the wall?', required: true,
    hint: 'A guess is fine — we confirm on site.',
    options: ['Drywall', 'Brick or stone', 'Concrete', 'Over a fireplace', 'Not sure'] },
  { kind: 'choice', name: 'cords', label: 'What about the cords?', required: true,
    options: [
      'Hide them in the wall',
      'Hide them in the wall, plus an outlet behind the TV',
      'Cover them neatly',
      'Leave them as they are',
    ] },
  { kind: 'choice', name: 'timing', label: 'When works for you?', required: true,
    options: ['This week', 'Next week', 'This month', 'Flexible'] },
  { kind: 'text', name: 'zip', label: 'ZIP code', required: true, placeholder: '30303',
    hint: 'So we know which crew and which day.' },
  { kind: 'text', name: 'name', label: 'Your name', required: true, placeholder: 'First name is fine' },
  { kind: 'tel', name: 'phone', label: 'Best number to text or call', required: true, placeholder: '(404) 555-0142' },
];

/* Web, app and marketing sit at 7–8: fewer, better-fit projects. Budget and
   timeline are deliberate quality filters — they cost keystrokes on purpose. */
/* The brainstorm. Everything above it is the qualifying core — six answers,
   all required, deliberately cheap. This is where someone who has actually
   pictured the thing gets to say so.

   All optional, and marked so on every label. That is the point: a visitor
   with no vision yet is not blocked from enquiring, and one who has been
   thinking about it for months is not handed a two-sentence box and told that
   is plenty. The prompts ask for the specific over the tasteful, because
   "the way theirs books appointments" can be built and "clean and modern"
   cannot. */
export const WEBSITE_VISION: Field[] = [
  { kind: 'section', name: 'vision', label: 'The brainstorm',
    hint: 'All optional. But the more you put here, the closer the first thing we show you lands to what you actually pictured — and the fewer rounds it takes to get there.' },
  { kind: 'textarea', name: 'vision_do', label: 'What should someone be able to do on it?',
    placeholder: 'Book you. Buy something. Find your hours. See the work and call. Whatever the site is FOR, in plain terms.' },
  { kind: 'textarea', name: 'vision_likes', label: 'Sites you like — and what you like about them',
    placeholder: 'Paste links. "The way theirs books appointments" is worth more than "it looks clean" — the first can be built, the second cannot.' },
  { kind: 'textarea', name: 'vision_have', label: 'What do you already have?',
    placeholder: 'Logo, photos, written copy, a domain, an existing site to replace or keep. Also fine to say none of it.' },
  { kind: 'textarea', name: 'vision_win', label: 'What would make this a win six months from now?',
    placeholder: 'More calls? Fewer of the same questions in your inbox? Bookings landing without you touching them?' },
];

export function qualifyingFields(opts: {
  projectLabel: string;
  projectOptions: string[];
  budgetOptions: string[];
  detailLabel: string;
  detailPlaceholder: string;
  extra?: Field[];
}): Field[] {
  return [
    { kind: 'choice', name: 'project', label: opts.projectLabel, required: true, options: opts.projectOptions },
    { kind: 'choice', name: 'budget', label: 'What range are you working with?', required: true,
      hint: 'A range, not a commitment. It tells us what is honestly possible.',
      options: opts.budgetOptions },
    { kind: 'choice', name: 'timing', label: 'When do you need it live?', required: true,
      options: ['Yesterday', 'Within a month', 'One to three months', 'No fixed date'] },
    { kind: 'text', name: 'name', label: 'Your name', required: true, placeholder: 'First and last' },
    { kind: 'email', name: 'email', label: 'Where do we reply?', required: true, placeholder: 'you@company.com' },
    { kind: 'textarea', name: 'detail', label: opts.detailLabel, required: true, placeholder: opts.detailPlaceholder },
    ...(opts.extra ?? []),
  ];
}
