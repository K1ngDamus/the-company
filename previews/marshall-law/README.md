# Marshall Law Practice — preview

A working preview site for **Marshall Law Practice, LLC** (Keyanna A. Marshall,
Attorney at Law — criminal defense, Columbus, GA).

> ## She has not signed.
> Nothing here has been sent to her, deployed, or spent on. Every page carries
> the Front Porch watermark and the line *"Design preview by Front Porch
> Collective — © 2026, all rights reserved. Not a live site."* The build is
> `noindex` and `robots.txt` disallows everything.

## Why it lives here and not in `src/pages`

`.github/workflows/deploy.yml` publishes `src/pages` to the company site on
every push to `main`. A client preview placed there would go live on
frontporchbuilds.com. Client work appears only with permission (rule 16), so
this is a **self-contained static build that the Astro pipeline never sees** —
no shared config, no shared CSS, no route that can leak into the company site.

## Running it

```bash
node build.mjs        # → dist/
node audit.mjs        # structure, the watermark gates, forbidden claims
node contrast.mjs     # the palette against the AA floor, both themes
node browsercheck.mjs # real Chromium at 390px and 1440px
```

No dependencies and no install step. A law firm's site should not need a
toolchain to change a phone number.

## The gates

**`audit.mjs`** fails on: a page without exactly one `<h1>`, a meta description
outside 50–170 characters, a missing canonical, invalid JSON-LD, a dead link or
anchor, an unlabelled input, a duplicate `id`, an `<svg>` with no accessible
name — and on the four things that only matter because this is an unsigned
preview:

- the FPC watermark missing from any page, **or its CSS rules removed**
- the preview footer line missing
- `noindex` and `robots.txt` disagreeing with `FLAGS.isPreview`
- a **forbidden claim** — "free consultation" while that flag is false, an
  outcome guarantee, a superlative, or years licensed. A fake claim on a
  lawyer's site is a bar problem, not a typo.

It also rejects `aggregateRating` and `geo` in the JSON-LD. Both are omitted on
purpose — see [`docs/QUESTIONS.md`](docs/QUESTIONS.md).

**`contrast.mjs`** parses the tokens out of `lib/styles.css` rather than
repeating them, so a renamed token fails loudly instead of quietly passing a
stale list. It checks 21 pairs across both the light body and the ink footer.

**`browsercheck.mjs`** drives real Chromium: console errors, failed requests,
horizontal overflow (naming the culprit element), 44px tap targets, the
watermark actually painting and actually being inert, and the above-the-fold
contract on a phone. The company site lists these as "run by hand" — here they
are a gate, because "renders flawlessly on a phone" is the entire promise.

**All three were verified by breaking them on purpose.** That surfaced a real
bug in the audit: `css.includes('.watermark')` is satisfied by
`.watermark-field`, so the check passed with the main rule deleted. It now
matches the rule, not the substring. The browser pass caught a 653px horizontal
overflow on `/exposure/` and a header that wrapped to two rows.

## The watermark

Three layers, so removing it is a deliberate act rather than an accident:

1. `.watermark` — the FPC monogram, fixed bottom-right, 13% opacity,
   `pointer-events: none`, above content, clearing the mobile call bar.
2. `.watermark-field` — a full-page diagonal repeat that switches on for
   print and PDF export, inlined as a data URI so an export cannot 404 it.
3. `audit.mjs` — fails the build if the markup goes, if any of the three CSS
   rules goes, or if the opacity leaves the 12–15% band the brief specifies.

## Where things live

```
data/client.mjs      Every fact, every flag, every open question. The one file to edit.
data/intake.mjs      The intake form's question set
lib/render.mjs       Page shell, both chromes, watermark, schema, the blank renderer
lib/pages.mjs        Her eight pages and the consult form
lib/intake-pages.mjs /start/ and /review-card/ — the two pages that are FROM us
lib/qr.mjs           A dependency-free QR encoder (+ generated qr-tables.mjs)
lib/intake.js        The only script that ships: autosave and the answer summary
lib/styles.css       The design system — palette, type, components
build.mjs            Renders dist/, plus robots.txt, sitemap.xml and the favicon
assets/              Self-hosted Playfair Display + Jost, the FPC monogram
scripts/verify-qr.py Dev-only: proves the QR encoder against a reference + a decoder
```

`data/client.mjs` is the single source of truth. Every verified fact is
reproduced exactly and carries its source; every unknown is an `ask()` that
renders as a visible `[awaiting client]` placeholder. There is one `blank()`
renderer, so a gap can never quietly become filler — there is nowhere else for
one to come from.

## The flags

Each defaults to the honest state, not the flattering one.

| Flag | Default | Flip it when |
|---|---|---|
| `showPayments` | `false` | She says CashApp/Venmo belong on a public website |
| `consultIsFree` | `false` | She confirms the consult is free — **and log who confirmed** |
| `headshotPermission` | `false` | She gives written permission to publish her likeness |
| `isPreview` | `true` | She has signed AND there is a real domain |

`consultIsFree` is the one to be careful with. The brief wired a "Free
Consultation" CTA everywhere, but consult cost is unverified. Asserting *free*
on a lawyer's site without her word is an invented claim, so every CTA reads
"Request a Consultation" until she says otherwise. The audit enforces it.

## Photos

Drop a file in `assets/` and rebuild. That is the whole procedure — the build
detects it, and there is no path to edit anywhere. Each slot takes `.webp`,
`.jpg`, `.jpeg` or `.png`, webp first so an optimised file automatically wins.

| Slot | File | Appears |
|---|---|---|
| headshot | `assets/keyanna-marshall.*` | Home hero, About |
| office | `assets/office.*` | Contact |

Add a row to `IMAGES` in `data/client.mjs` and a file, and a new slot renders.
Every frame holds its aspect ratio whether or not a file exists, so dropping
one in later shifts nothing — verified with stand-in images at **CLS 0**.

### Her likeness: two permissions, deliberately not one

A private pitch document and a public website are not the same act, and
collapsing them into one boolean is how a photo nobody cleared ends up on a
live site.

| Flag | State | Means |
|---|---|---|
| `headshotPreviewUse` | **true** | Her photo may appear in THIS preview — watermarked, noindex, never deployed, shown to her in a pitch. Leon's call, 2026-08-26: a prospect cannot picture her own web home without her face in it. |
| `headshotPublishRights` | **false** | Her photo may appear on the LIVE site. Stays false until she says yes in writing. Question 1 of the photos section on `/start/` is what clears it. |

A preview build checks the first; a live build checks the second **and ignores
the first entirely**, so turning `isPreview` off can never carry a pitch-only
allowance onto the real site. Verified by simulating a live build with the
photo present: it still refuses.

`node build.mjs` prints which gate is open and which file is missing on every
run — a photo that silently fails to appear is the kind of thing you find out
about in the meeting.

## The two pages that are FROM us

Both wear FPC chrome rather than her branding, so neither can be mistaken for
a page of her site.

- **`/start/`** — the intake form. Every open question, asked in a form she can
  finish in one sitting: mostly tapping, "Not sure" on everything, nothing
  required. It autosaves to her own browser and **sends nothing anywhere** —
  no handler, no tracking. A "gather my answers" step produces text she copies
  or prints. It works fully with JavaScript off; the script only adds the
  autosave and the summary.
- **`/review-card/`** — a printable card whose QR opens her Google review box.
  Complimentary; she keeps it either way.

### About the QR

`lib/qr.mjs` is a ~300-line byte-mode encoder with no dependencies. It exists
rather than a QR website because a free generator encodes a redirect on *their*
domain: it can expire, start charging, and logs everyone who scans a card in a
law office's waiting room. Encoding the destination directly is permanent and
private.

The spec tables in `qr-tables.mjs` are **generated** from a reference encoder,
never hand-typed — one wrong number produces a QR that looks perfectly normal
and silently does not scan. `scripts/verify-qr.py` checks every matrix
module-for-module against that reference **and** decodes each one back with
OpenCV: 32/32 matrices identical, and every code OpenCV can read reads back
correctly.

### Why there is no pre-written review text

It was asked for and deliberately left out. Supplying the words a client
submits as their own review breaks Google's content policy, the FTC's 2024
endorsement rule and GA Rule of Professional Conduct 7.1. The practical risk is
larger than the legal one: Google's spam detection clusters near-identical
reviews and removes them, which would cost her the reviews she already has —
starting from one. The card solves the real friction instead: one tap to the
box, prompts rather than scripts, and a clear note that a **star-only review
with no text is complete and counts**.

## Design direction

Light-first, on Leon's call (2026-08-26): warm porcelain and blush, a deep
rose, restrained gold, with ink kept as the dark undertone in the type and the
footer. Deliberately **not** the company site's dark shell — this is her
practice, not ours.

Her brand pink `#f02491` measures **3.80:1** on porcelain and **4.27:1** on a
dark card. It fails AA in both directions and cannot carry text — which is true
of her current site too. `--rose` `#B3195C` is that hue taken deep enough to
clear at 6.35:1, and her actual pink survives as `--rose-bright` on the ink
footer, where it does clear (6.03:1).

There is a matching Figma file — palette as bound variables, the type ramp as
text styles, Button/Choice-chip/Card/Rating/Awaiting-client as components, and
the mobile home artboard built from those instances.

## What is deliberately absent

- **No case results.** None, anywhere, and none to be added without her
  instruction and her review. Georgia's advertising rules govern how outcomes
  may be described, and an outcome stated the wrong way creates an expectation
  she then has to live with.
- **No testimonials, credentials, bar admissions or admission year.** None are
  verified, so all of them are labelled blanks.
- **No `geo` or `aggregateRating` in the structured data.** Reasons in
  [`docs/QUESTIONS.md`](docs/QUESTIONS.md).

## Still to do

1. Leon takes [`docs/QUESTIONS.md`](docs/QUESTIONS.md) to her.
2. Answers land in `data/client.mjs`; placeholders become content.
3. Leon approves every page for the pitch (definition of done, brief §4).
4. Staging at a private URL is a **deploy** and needs Leon's explicit word.
