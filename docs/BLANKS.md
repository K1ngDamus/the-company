# The blanks — everything this site is honestly missing

Company law: honest blanks over invented content (founding brief §6, rule 11).
Every item below renders as a **visible** marked gap on the live pages rather
than as filler. This file is the full list, so nothing gets forgotten.

## Facts only Leon can supply

| # | Blank | Where it shows | Fill it in |
|---|---|---|---|
| 1 | Public email address | Footer, `/contact`, `/privacy`, `/terms`, schema | `CONTACT.email` in `src/data/site.ts` |
| 2 | Public phone number | Header on TV pages, footer, `/contact`, county pages, schema | `CONTACT.phone` + `CONTACT.phoneHref` |
| 3 | Website starting price | `/websites` | `PRICES.websites` |
| 4 | App starting price | `/apps` | `PRICES.apps` |
| 5 | TV mounting starting price | `/tv-mounting` + 5 county pages | `PRICES['tv-mounting']` |
| 6 | Agent template price | `/agent-templates` | `PRICES['agent-templates']` |
| 7 | Marketing starting price | `/marketing` | `PRICES.marketing` |

A price left as `null` for good reason reads correctly as quote-only — the page
does not break, it simply stops promising a figure. That is a valid permanent
answer for any service Leon would rather quote case by case.

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
| 14 | The company one-line promise | A draft is in place (`SITE.promise`). Leon has three alternatives to choose from in the hand-off note and can replace it with his own. |
| 15 | Budget brackets in the qualifying forms | Drafted as sensible ranges in `src/data/forms.ts`. They imply nothing about our prices, but they should match Leon's actual intent before launch. |
| 16 | Privacy and terms | Written in plain language and accurate to the current state. Neither has been reviewed by a lawyer, and both should be before the site is deployed. |
