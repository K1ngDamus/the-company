# The blanks — everything this site is honestly missing

Company law: honest blanks over invented content (founding brief §6, rule 11).
Every item below renders as a **visible** marked gap on the live pages rather
than as filler. This file is the full list, so nothing gets forgotten.

## Facts only Leon can supply

**Resolved 2026-08-24.** Contact details are in; pricing is settled as a policy
rather than a set of numbers.

| # | Item | Status |
|---|---|---|
| 1 | Public email address | **`jacksonleon24@gmail.com`** — footer, `/contact`, `/privacy`, `/terms`, schema |
| 2 | Public phone number | **`(678) 525-8154`** — header on all six TV pages, footer, `/contact`, schema |
| 3–7 | Starting prices | **Quote-only across the board.** No starting figures are published; every job is priced from its own scope. This is a decision, not a gap, and the pages say so. |

**TV pricing is coming.** Leon is setting TV mounting prices once the site is
up. Put the number into `PRICES['tv-mounting']` in `src/data/site.ts` and all six
TV pages switch from "Priced per job" to a "Starting at $X" figure. Nothing else
needs editing. The same is true of any other service.

**The templates shelf is a product, not a quote.** `/agent-templates` reads
"Price announced when the shelf opens" rather than "Priced per job", because a
digital download does get a fixed price — set before checkout is connected. See
`FORMS.md`.

## Proof awaiting permission or detail

| # | Blank | Where | Needs |
|---|---|---|---|
| 8 | The Chloe Girls | `/`, `/work`, `/websites` | Leon cleared it to appear (2026-08-23) but no build details or link exist yet. Nothing is written into the slot until they do. |
| 9 | Atlanta Experience live links | `/work` | The public URL and any store links, confirmed by Leon. We link nothing rather than link wrong. |
| 10 | Client testimonials | `/`, `/work`, `/websites` | Real quotes, real names, permission. Volume matters here — but zero invented entries. |
| 11 | TV mounting photos and reviews | `/tv-mounting` | Real installation photos and real customer reviews. Stock photos of someone else's living room prove nothing. |
| 12 | Agent template buyer reviews | `/agent-templates` | Nothing has sold yet, so there is nothing honest to put here. |
| 13 | Marketing client numbers | `/marketing` | Real before-and-after figures we are permitted to publish, with caveats attached. |

## Copy awaiting Leon's word

| # | Item | Status |
|---|---|---|
| 14 | The company one-line promise | A draft is in place (`SITE.promise`). Three alternatives were put to Leon; he has not picked, and his own words beat all four. **Still open.** |
| 15 | Budget brackets in the qualifying forms | Drafted as sensible ranges in `src/data/forms.ts`. They imply nothing about our prices — they qualify the enquiry — but they should match Leon's intent before launch. |
| 16 | Privacy and terms | Written in plain language and accurate to the current state. Neither has been reviewed by a lawyer, and both should be before the site is deployed. |

## Not a blank, but Leon's to do

Flip the repository's default branch to `main` in **Settings → General**. GitHub
adopted the working branch automatically when it was the only one; there is no
API tool available here to change it.
