# Open questions — for Leon to take to Keyanna

> ## Send her the form, not this file
> **`/start/`** in the built preview asks all of this in a form she can fill in
> one sitting — mostly tapping, nothing required, autosaves in her browser, and
> sends nothing anywhere. This file is the engineering-side index of the same
> questions and the reasoning behind each; the form is what she sees.

Every item here renders on the preview as a visible `[awaiting client]`
placeholder. Nothing on this list has been guessed at, and nothing on it should
be filled in from Avvo, the press piece, or inference — a wrong fact on a
lawyer's site is a bar problem, not a typo.

Mirrored in `OPEN` in [`../data/client.mjs`](../data/client.mjs), which is
where the answers go. The form's question set lives in
[`../data/intake.mjs`](../data/intake.mjs).

## Blocking the pitch

| # | Question | Why it matters | Flips |
|---|---|---|---|
| 1 | **What does a first consultation cost?** Free, flat fee, or varies? | The brief wired "Free Consultation" everywhere, but this is unverified. Every CTA currently reads "Request a Consultation" and the audit blocks the word *free*. | `FLAGS.consultIsFree` |
| 2 | **The confirmed practice-area list.** | Criminal defense is verified. Juvenile appears in **press only** and is not confirmed by her. Publishing a practice area a lawyer has not claimed is not a small error. | `OPEN.practiceAreas` |
| 3 | **Written OK to use her headshot, and the file itself.** | The image exists on Blinq and GBP; permission does not follow from availability. Two separate gates — see below. | `FLAGS.headshotPermission` |
| 4 | **CashApp / Venmo on the website, or card-only?** | Built, styled, shipped hidden. Her card lists both; a card is not a public website. | `FLAGS.showPayments` |

## Content she has to supply

| # | Question | Note |
|---|---|---|
| 5 | Bio — education, background, why she practises defense | Her words. We do not write a lawyer's biography for her. |
| 6 | Year admitted to the State Bar of Georgia | Avvo suggests 2 years. **Avvo is not a source of record.** |
| 7 | Testimonials she can ethically publish | GA Bar advertising rules govern this. She decides what is publishable. |
| 8 | Bar associations and memberships | Feeds the About page and the local-link plan. |
| 9 | Social profiles, if any | Feeds `sameAs` and the citation set. |

## Facts to verify at the source

| # | Question | Why |
|---|---|---|
| 10 | **Avvo lists ZIP 31909; her card says 31901.** Which is right? | NAP consistency is a ranking factor. One of them is wrong and it has to be fixed at the source before anything is built on top of it. |
| 11 | **Is the Google Business Profile claimed and verified?** | Decides whether step 1 of the exposure plan is a claim or an optimisation. |
| 12 | Exact URL of the Couriernews feature (Feb 2025) | Not captured during recon. It is named on the site but not linked — we do not link to a guess. |
| 13 | Verified latitude/longitude for the office | See below. |

## Two deliberate omissions from the structured data

Both are absent on purpose, and the audit fails the build if either reappears.

**`geo` — no coordinates.** They are trivial to guess and a guessed pin puts
her in the wrong building on the map. They come off her claimed GBP or not at
all.

**`aggregateRating` — no rating markup.** Self-serving review markup on your own
site is against Google's own guidelines, and one review presented as a 5.0
rating overstates it. The rating is shown on the page instead, always with
"1 Google review" attached. Every appearance of it carries the count.

## Her headshot — two gates, one drop-in

The photo is the single biggest thing standing between "a website" and "her
web home", so it is worth being precise about.

1. **The file.** Put it in `previews/marshall-law/assets/` named
   `keyanna-marshall.jpg` (`.webp`, `.jpeg` and `.png` also work) and rebuild.
   The build detects it — there is no path to edit. Largest version she has,
   uncropped.
2. **Permission.** `FLAGS.headshotPermission` in `data/client.mjs`. Separate on
   purpose: being able to download something is not being allowed to publish
   it. Set it true only when she has actually said yes, and note who heard her.

Her face renders only when **both** are true. `node build.mjs` prints which of
the two is missing on every run, so it can never be a silent no-op.

Verified end-to-end with a stand-in image: the frame is `4/5` and the `<img>`
carries its intrinsic dimensions, so dropping the real file in measured
**CLS 0** — no layout shift at all.

## The review card

`/review-card/` is a printable card whose QR opens her Google review box in one
tap. It is complimentary — she keeps it whether or not she signs.

**It needs one thing to be real: her direct Google review link** (question 12
above). Until that arrives the QR encodes her website and the card is flagged
"Sample" on its face — never a fake review URL.

The QR is encoded straight to the destination by `lib/qr.mjs` rather than
routed through a QR website. That matters for a law office: a free generator's
code points at *their* domain, so it can expire, start charging, or log every
client who scans a card in her waiting room.

**There is deliberately no pre-written review text**, and the card says why.
Supplying the words a client submits as their own breaks Google's content
policy, the FTC's endorsement rule and GA Rule 7.1 — and Google's spam
detection specifically clusters near-identical reviews and removes them, which
would cost her the reviews she has. The card solves the real friction instead:
one tap to the box, and a clear note that a star-only review with no text is
complete and counts.

## The one that is not a question

She has **1** Google review. Her competitors have **74–282** (verified
2026-08-26). That gap is the single biggest lever in the whole engagement, and
it is a process problem with a website component rather than a website problem.
The plan is on the preview's `/exposure/` page — and it is flagged for her
ethical comfort, because Georgia's rules govern how a lawyer may solicit and
use client reviews. The flow gets built to whatever she is comfortable with,
and she sees it before it sends anything.
