/**
 * The client intake form — /start/
 *
 * One structured answer sheet that turns every open question in
 * docs/QUESTIONS.md into something Keyanna can fill out in one sitting.
 *
 * Design rules for this form, in priority order:
 *   1. TAPPING BEATS TYPING. Every question that can be a chip is a chip.
 *      Free text only where her actual words matter (bio, practice areas).
 *   2. NOTHING IS REQUIRED. "Not sure" and "Skip" are first-class answers on
 *      every question. A half-finished form is more useful than an abandoned
 *      one, and a guessed answer is worse than a blank.
 *   3. NOTHING SENDS. Rule 9. The form saves to her own browser and produces a
 *      summary she copies or prints. No handler, no third party, no tracking.
 *   4. EVERY QUESTION EARNS ITS PLACE by unblocking a build decision. If an
 *      answer would not change what gets built, it is not on the form.
 *
 * Careful with wording: audit.mjs blocks the phrase "free consultation" while
 * FLAGS.consultIsFree is false. That check is doing its job — the option below
 * is labelled "Free" for that reason, not by accident.
 */

export const INTAKE = {
  title: 'Getting started',
  intro: [
    'Everything below shapes the build. Answer what you can — every question has a "Not sure" and nothing here is required.',
    'This form saves as you type, in your own browser. It does not send anything anywhere. When you are done, use the button at the bottom to copy your answers or print them.',
  ],

  sections: [

    /* ---------------------------------------------------------------- */
    {
      id: 'practice',
      title: 'Your practice',
      blurb: 'We have built the site around criminal defense. This tells us what else belongs on it.',
      questions: [
        {
          id: 'areas-describe', type: 'textarea', rows: 5,
          label: 'In your own words, what kinds of law do you practise?',
          hint: 'Plain language is perfect — "DUI, drug charges, probation violations, some juvenile" is more useful to us than formal categories. Anything you list gets its own page written to the way people actually search for it.',
          placeholder: 'e.g. Criminal defense — misdemeanours and felonies. Also…',
        },
        {
          id: 'areas-common', type: 'multi',
          label: 'Which of these do you take? Tick any that apply.',
          hint: 'This is a checklist to jog memory, not a limit. Anything ticked becomes a page; anything unticked never appears.',
          options: ['DUI / DWI', 'Drug charges', 'Assault / violent offences', 'Theft & property', 'Probation violations',
                    'Bond hearings', 'Juvenile', 'Traffic', 'Expungement / record restriction', 'Domestic matters',
                    'Family law', 'Personal injury', 'Wills & estates', 'Something else — described above'],
        },
        {
          id: 'areas-avoid', type: 'text',
          label: 'Anything you do NOT want the site to mention?',
          placeholder: 'e.g. no family law enquiries',
        },
        {
          id: 'courts', type: 'text',
          label: 'Which courts do you appear in?',
          hint: 'Drives the local search pages. "Muscogee County and surrounding" is a fine answer.',
          placeholder: 'e.g. Muscogee County State & Superior, Columbus Recorder’s Court',
        },
        {
          id: 'service-area', type: 'choice',
          label: 'How far do you take cases?',
          options: ['Muscogee County only', 'Muscogee + surrounding counties', 'Anywhere in Georgia', 'Not sure'],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'about',
      title: 'About you',
      blurb: 'The About page is built and waiting. We do not write a lawyer’s biography for her, so this is the one part only you can fill in.',
      questions: [
        {
          id: 'bio', type: 'textarea', rows: 6,
          label: 'Tell us about yourself — and why you do defense work.',
          hint: 'Do not polish it. A few honest paragraphs, or even bullet points, and we will shape it. It stays in your voice, and you approve the final wording before anything is published.',
          placeholder: 'Where you grew up, where you studied, what brought you to defense work, what you want people to know before they call…',
        },
        {
          id: 'bar-year', type: 'text',
          label: 'What year were you admitted to the State Bar of Georgia?',
          hint: 'We will not publish this until you state it. A wrong admission year on a lawyer’s site is a bar problem, so we do not take it from a directory.',
          placeholder: 'e.g. 2023',
        },
        {
          id: 'education', type: 'text',
          label: 'Law school, and undergraduate if you would like it listed.',
          placeholder: 'e.g. J.D., …',
        },
        {
          id: 'memberships', type: 'textarea', rows: 3,
          label: 'Bar associations, memberships, boards, community work.',
          hint: 'These are worth listing twice over — they belong on the About page and several of them link back to your site, which helps people find you.',
        },
        {
          id: 'languages', type: 'text',
          label: 'Languages spoken in the office, other than English.',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'photos',
      title: 'Photos',
      blurb: 'This is the single biggest difference between a website and a web home. Someone deciding whether to hand you their case wants to see who they are calling and where they would be walking in.',
      questions: [
        {
          id: 'headshot-permission', type: 'choice',
          label: 'May we use your headshot on the live site?',
          hint: 'You have already seen it in the preview. This question is about the public site, which is a different thing — a mockup we showed you is not the same as licensing your face to the open internet, so we ask separately rather than assuming.',
          options: ['Yes — use the one in the preview', 'Yes — I will send a better file', 'Yes, once I have new photos taken', 'Not yet'],
        },
        {
          id: 'photos-new', type: 'choice',
          label: 'Do you have newer or better photos you would rather we used?',
          hint: 'Anything from the last couple of years. Straight off a phone is fine — please do not crop them first, we would rather have the whole frame to work from.',
          options: ['Yes, I will send them', 'Yes, but they need finding', 'No, the current one is fine', 'I would like new ones taken'],
        },
        {
          id: 'photos-have', type: 'multi',
          label: 'What do you already have? Tick anything that exists.',
          hint: 'Even phone snaps. We can work with more than people expect.',
          options: ['Headshot / portrait', 'Office interior', 'The building or signage outside', 'You at your desk or working',
                    'You in a suit, formal', 'Team or staff', 'Community events or speaking', 'Awards or press photos',
                    'Video of any kind', 'Nothing at the moment'],
        },
        {
          id: 'photos-where', type: 'multi',
          label: 'Where would you like photos to appear?',
          hint: 'Tick anywhere that appeals. Each spot is already built to take one — nothing needs redesigning, we just drop the picture in.',
          options: ['The top of the home page', 'The About page', 'Beside the contact details, so people can find the door',
                    'On each practice-area page', 'A band across the middle of the home page', 'Wherever you think best',
                    'Keep it minimal — one photo is plenty'],
        },
        {
          id: 'photos-specific', type: 'textarea', rows: 3,
          label: 'Anything specific you want photographed, or shown?',
          hint: 'The building entrance so people can find it, a particular room, a certificate on the wall, you in front of the courthouse — whatever you would want a nervous person to see before they call.',
        },
        {
          id: 'photos-avoid', type: 'text',
          label: 'Anything you would rather NOT have photographed or shown?',
          placeholder: 'e.g. no photos of the waiting area',
        },
        {
          id: 'photoshoot', type: 'choice',
          label: 'Would you like us to arrange a proper photoshoot?',
          hint: 'A local photographer, a couple of hours, headshots plus the office. It is the single upgrade that changes how a site feels the most, and it is quoted separately — say yes here and we will price it, not book it.',
          options: ['Yes, please quote it', 'Maybe later', 'No — I have a photographer', 'No'],
        },
        {
          id: 'headshot-file', type: 'note',
          label: 'Sending the files',
          body: 'Email them to Front Porch at whatever size they came out of the camera or phone — the bigger the better, and uncropped. If they are too large to email, say so and we will send you somewhere to drop them. We handle the resizing, the cropping and the optimising; you never need to worry about file formats.',
        },
        {
          id: 'logo-files', type: 'choice',
          label: 'Do you have the original file for your logo?',
          hint: 'An original (.ai, .eps, .svg or a large .png) lets us print it and scale it cleanly. If not, we can re-cut it from what exists — the design stays yours either way.',
          options: ['Yes', 'No, only what is on the current site', 'Not sure', 'I would like it refreshed'],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'payments',
      title: 'Getting paid',
      blurb: 'Your card lists CashApp and Venmo. A card is not a website, so we have built the component and left it switched off until you tell us what you want.',
      questions: [
        {
          id: 'payment-approach', type: 'choice',
          label: 'How would you like clients to pay?',
          options: [
            'A secure online payment page on the site',
            'Just list CashApp and Venmo',
            'Both — a payment page, and the handles listed',
            'Neither — payment is handled off the website',
            'Not sure, talk me through it',
          ],
        },
        {
          id: 'payment-note', type: 'note',
          label: 'What a payment page involves',
          body: 'A card and bank-transfer page through a payment processor. Georgia has trust-accounting rules about how advance fees are held, so the setup is built to keep earned and unearned fees separate and to route each to the right account. The processor takes a percentage per transaction; we will show you the options and their rates before anything is signed up for, and nothing is opened in your name without your say-so.',
        },
        {
          id: 'payment-types', type: 'multi',
          label: 'What would you take payment for online?',
          options: ['Flat fees', 'Retainers / advance fees', 'Payment plans / instalments', 'Consultation fees', 'Not sure'],
        },
        {
          id: 'consult-cost', type: 'choice',
          label: 'What does a first consultation cost?',
          hint: 'The site currently says "Request a Consultation" and stays quiet on price, because we will not state a price you have not given us. Tell us and it goes on the page and into the answers people look for first.',
          options: ['Free', 'A flat fee', 'It depends on the case', 'Prefer not to publish it'],
        },
        {
          id: 'consult-fee-amount', type: 'text',
          label: 'If there is a consultation fee, how much?',
          placeholder: 'e.g. $100, credited against the retainer',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'reviews',
      title: 'Reviews and what clients say',
      blurb: 'You have one Google review. The firms above you in search have between 74 and 282. Nothing else on this list moves you as far, as fast — and none of it happens without your sign-off on how it is done.',
      questions: [
        {
          id: 'reviews-comfort', type: 'choice',
          label: 'Are you comfortable asking past clients for a review?',
          hint: 'Georgia’s advertising rules govern how a lawyer asks for and uses client reviews. We build the process to whatever you are comfortable with, you see every message before it goes out, and you can stop it at any point.',
          options: ['Yes', 'Yes, but I want to approve the wording', 'I have concerns — let us discuss', 'No'],
        },
        {
          id: 'reviews-method', type: 'multi',
          label: 'How would you rather the ask happen?',
          options: ['A text after the case closes', 'An email after the case closes', 'A card handed over in person', 'A QR code in the office', 'I would rather do it myself'],
        },
        {
          id: 'testimonials', type: 'choice',
          label: 'Do you have client testimonials you are able to publish?',
          hint: 'We will never write one. If there is nothing publishable, the site says nothing rather than inventing something — that is deliberate.',
          options: ['Yes, I can send some', 'Maybe — I need to ask permission first', 'Not right now', 'Not sure what is allowed'],
        },
        {
          id: 'case-results', type: 'choice',
          label: 'Do you want case results on the site?',
          hint: 'There are none on it now, on purpose. Georgia limits how outcomes may be described, and an outcome worded loosely creates an expectation you then have to live with. If you want them, we will word them with you and keep the required disclaimers attached.',
          options: ['Yes, carefully', 'No', 'Let us discuss it'],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'verify',
      title: 'Facts to confirm',
      blurb: 'These are the details that decide whether someone searching for you actually finds you. Search engines compare your listings against each other, and a single character out of place in one of them weakens all of them. There is at least one real mismatch out there right now.',
      questions: [
        {
          id: 'name-exact', type: 'choice',
          label: 'Exactly how should the firm’s name be written?',
          hint: 'Pick one and we use it identically everywhere — site, Google, every directory.',
          options: ['Marshall Law Practice, LLC', 'Marshall Law Practice', 'The Marshall Law Practice', 'Something else — see below'],
        },
        { id: 'name-other', type: 'text', label: 'If something else, write it exactly as it should appear.' },
        {
          id: 'address-confirm', type: 'choice',
          label: 'Is this address correct, character for character?',
          hint: '233 12th Street Suite # 911-C, Columbus, Georgia 31901',
          options: ['Yes, exactly right', 'Nearly — small correction below', 'No — the correct one is below'],
        },
        { id: 'address-correct', type: 'text', label: 'Corrected address, if needed.', placeholder: 'Street, suite, city, state, ZIP' },
        {
          id: 'avvo-zip', type: 'choice',
          label: 'Your Avvo profile lists ZIP 31909. Your card says 31901. Which is right?',
          hint: 'This one matters more than it looks. Two different ZIPs across your listings means they stop reinforcing each other, and this is the mismatch we found. Fixing it at the source is the first thing we would do.',
          options: ['31901 is correct', '31909 is correct', 'Both — different offices', 'Not sure, I will check'],
        },
        {
          id: 'phone-confirm', type: 'choice',
          label: 'Is (762) 266-0767 the number that should be on the website?',
          options: ['Yes', 'Yes, but I want a separate number for web enquiries', 'No — correct number below'],
        },
        { id: 'phone-correct', type: 'text', label: 'Correct or additional number.' },
        {
          id: 'email-confirm', type: 'choice',
          label: 'Should enquiries go to Keyanna@themarshall-law.com?',
          options: ['Yes', 'No — a different address below', 'I would like a new address set up'],
        },
        { id: 'email-correct', type: 'text', label: 'Preferred enquiry address.' },
        {
          id: 'hours-confirm', type: 'choice',
          label: 'Are your hours 9:00am to 5:00pm, Monday to Friday?',
          options: ['Yes', 'Yes, plus by appointment', 'No — correct hours below'],
        },
        { id: 'hours-correct', type: 'text', label: 'Correct hours.' },
        {
          id: 'after-hours', type: 'choice',
          label: 'Do you take calls outside office hours?',
          hint: 'Worth answering carefully. Arrests happen at night and at weekends, and someone deciding at 11pm on a Saturday will call whoever answers. If you do take those calls, saying so on the site is one of the strongest things on it.',
          options: ['Yes, for urgent matters', 'Yes, always', 'No', 'Through an answering service'],
        },
        {
          id: 'gbp-status', type: 'choice',
          label: 'Have you claimed your Google Business Profile?',
          hint: 'This is the panel that appears beside search results with your hours, phone and reviews. It usually outranks the website itself for your own name.',
          options: ['Yes, I manage it', 'I think so, but I cannot get in', 'No', 'Not sure what that is'],
        },
        {
          id: 'listings', type: 'multi',
          label: 'Which of these do you already have a profile on?',
          options: ['Avvo', 'Justia', 'FindLaw', 'Yelp', 'Martindale', 'Lawyers.com', 'Apple Maps', 'Bing Places', 'None', 'Not sure'],
        },
        {
          id: 'socials', type: 'textarea', rows: 3,
          label: 'Social accounts for the practice — links, or the handles.',
          hint: 'Facebook, Instagram, LinkedIn, TikTok. These link back to the site and confirm to search engines that all these listings are the same firm.',
        },
        {
          id: 'press-url', type: 'text',
          label: 'Do you have the link to the Couriernews piece about you?',
          hint: '"Attorney Keyanna Marshall: A Journey to Justice", February 2025. We have it named on the site but not linked — we do not link to a guess.',
          placeholder: 'Paste the link if you have it',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'growth',
      title: 'What we can take off your hands',
      blurb: 'Mark each one. Nothing here is assumed, and nothing is bundled — you will get a price against exactly what you tick and nothing else.',
      questions: [
        {
          id: 'growth-menu', type: 'priority',
          label: 'Priority for each',
          scale: ['Yes', 'Maybe', 'Not now'],
          items: [
            ['gbp', 'Google Business Profile — claim it and build it out',
             'Every field completed, services and service area set, photos, and a weekly post so it reads as an active practice rather than an abandoned listing.'],
            ['reviews', 'A review process that actually runs',
             'A short, bar-compliant ask that goes out after a case closes, with the review link one tap away. Target: 25+ in six months. You approve the wording and can stop it any time.'],
            ['citations', 'Fix and build out your directory listings',
             'Correct the Avvo mismatch first, then Justia, FindLaw, Yelp, Apple Maps and Bing Places — every one matching your address character for character.'],
            ['landing', 'Pages built for what people actually search',
             '"criminal defense attorney Columbus GA", "DUI lawyer Columbus GA", and the rest. You are not on the first page for any of them today; the firms that are have pages like these.'],
            ['schema', 'The hidden code search engines read',
             'Your name, address, hours and practice areas in the format Google reads directly. Your current site has none. The preview already ships it on every page.'],
            ['speed', 'Speed and mobile performance',
             'Already done in the preview — static pages, no builder bloat. It loads before the current site has finished deciding what to load.'],
            ['payments', 'A secure online payment page', 'Card and bank transfer, set up to respect Georgia’s trust-accounting rules.'],
            ['booking', 'Online consultation booking',
             'Your live calendar on the site so someone can book a slot at midnight without waiting for office hours.'],
            ['intake', 'Enquiry handling that does not lose anyone',
             'Every enquiry lands in one place with an automatic acknowledgement, so nobody is left wondering whether the message arrived.'],
            ['calltracking', 'Know which calls came from where',
             'So you can see what is actually bringing work in, rather than guessing.'],
            ['reporting', 'A plain-English monthly report',
             'Calls, enquiries, search positions, new reviews. One page, no jargon, no dashboard to log into.'],
            ['content', 'Answers to the questions people ask before they call',
             '"Do I need a lawyer for a first DUI?" — the questions people type at midnight. Answering them is how they find you.'],
            ['email', 'A professional email address on your own domain'],
            ['social', 'Set up and align the social profiles'],
            ['print', 'Business cards and print matching the new site'],
            ['brand', 'Tidy up the logo and brand marks',
             'Your Lady Justice mark stays yours — this is re-cutting it cleanly so it holds up in print and at small sizes.'],
          ],
        },
        {
          id: 'growth-other', type: 'textarea', rows: 3,
          label: 'Anything else you have wanted for the practice?',
          hint: 'Even if it sounds like a big ask. Easier to tell you now whether it is simple or not.',
        },
        {
          id: 'competitors', type: 'text',
          label: 'Which firms do you find yourself up against?',
          hint: 'We measure against whoever you name, alongside the ones already showing up ahead of you.',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'logistics',
      title: 'Practical bits',
      blurb: 'Boring, but each of these removes a delay later.',
      questions: [
        {
          id: 'domain-control', type: 'choice',
          label: 'Who controls themarshall-law.com?',
          hint: 'We do not need your password. We need to know who can point the domain when the new site is ready — and whoever holds it, the domain stays in your name.',
          options: ['I do, and I can get into the account', 'I do, but I cannot get in', 'Whoever built the current site', 'Not sure'],
        },
        {
          id: 'current-site', type: 'choice',
          label: 'Who built and manages the current site?',
          options: ['I did', 'A friend or family member', 'A company I pay monthly', 'Not sure'],
        },
        {
          id: 'current-keep', type: 'textarea', rows: 3,
          label: 'Anything on the current site you want kept?',
          hint: 'Wording, a photo, a page. Say so and it carries over.',
        },
        {
          id: 'email-host', type: 'choice',
          label: 'Where is your email hosted?',
          hint: 'So that moving the website does not interrupt your email — this is the thing that goes wrong most often in a move, and knowing this in advance is how we avoid it.',
          options: ['Google Workspace', 'Microsoft 365', 'Through the current website host', 'Not sure'],
        },
        {
          id: 'timeline', type: 'choice',
          label: 'When would you want this live?',
          options: ['As soon as possible', 'Within a month', 'Within three months', 'No particular deadline'],
        },
        {
          id: 'timeline-why', type: 'text',
          label: 'Anything driving that timing?',
          placeholder: 'e.g. a bar event, a campaign, a rebrand',
        },
        {
          id: 'contact-pref', type: 'choice',
          label: 'Best way to reach you about this?',
          options: ['Call', 'Text', 'Email', 'Whichever is quickest'],
        },
        {
          id: 'contact-time', type: 'text',
          label: 'Best time of day.',
          placeholder: 'e.g. before 9am, or after court',
        },
        {
          id: 'anything-else', type: 'textarea', rows: 4,
          label: 'Anything else we should know?',
          hint: 'Concerns about the whole idea count too. Better said now than after work has started.',
        },
      ],
    },
  ],
};

/** Flattened list of every question id — used by the audit and the summary. */
export const INTAKE_QUESTION_IDS = INTAKE.sections.flatMap((s) =>
  s.questions.filter((q) => q.type !== 'note').map((q) => `${s.id}-${q.id}`));
