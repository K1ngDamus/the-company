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
export function qualifyingFields(opts: {
  projectLabel: string;
  projectOptions: string[];
  budgetOptions: string[];
  detailLabel: string;
  detailPlaceholder: string;
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
  ];
}
