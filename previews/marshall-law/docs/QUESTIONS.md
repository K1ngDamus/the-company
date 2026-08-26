# Open questions — for Leon to take to Keyanna

Every item here renders on the preview as a visible `[awaiting client]`
placeholder. Nothing on this list has been guessed at, and nothing on it should
be filled in from Avvo, the press piece, or inference — a wrong fact on a
lawyer's site is a bar problem, not a typo.

Mirrored in `OPEN` in [`../data/client.mjs`](../data/client.mjs), which is
where the answers go.

## Blocking the pitch

| # | Question | Why it matters | Flips |
|---|---|---|---|
| 1 | **What does a first consultation cost?** Free, flat fee, or varies? | The brief wired "Free Consultation" everywhere, but this is unverified. Every CTA currently reads "Request a Consultation" and the audit blocks the word *free*. | `FLAGS.consultIsFree` |
| 2 | **The confirmed practice-area list.** | Criminal defense is verified. Juvenile appears in **press only** and is not confirmed by her. Publishing a practice area a lawyer has not claimed is not a small error. | `OPEN.practiceAreas` |
| 3 | **Written OK to use her headshot.** | The image exists on Blinq and GBP; permission does not follow from availability. The portrait frame is sized to the real image so dropping it in shifts nothing. | `FLAGS.hasHeadshot` |
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

## The one that is not a question

She has **1** Google review. Her competitors have **74–282** (verified
2026-08-26). That gap is the single biggest lever in the whole engagement, and
it is a process problem with a website component rather than a website problem.
The plan is on the preview's `/exposure/` page — and it is flagged for her
ethical comfort, because Georgia's rules govern how a lawyer may solicit and
use client reviews. The flow gets built to whatever she is comfortable with,
and she sees it before it sends anything.
