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

**TV pricing is set — partly.** Leon gave the four size brackets on 2026-08-25:
$99 under 40", $129 for 40–55", $179 for 56–70", $229 for 71" and up. All six TV
pages carry a posted table, and the `priceRange` in the structured data is
derived from it rather than written twice.

Three things about it are still open, and they are open on purpose rather than
guessed at:

| # | Item | Why it is blank |
|---|---|---|
| 3a | Add-on prices — brick or stone, concrete, over a fireplace, cords inside the wall, a new outlet behind the TV | Leon has not set them. Each renders as **"Quoted"**, which is honest and normal for this trade. Put a number into `TV_PRICING.addOns` and that row shows it |
| 3b | **Does the base price include the bracket?** | Not answered, and not stated on the page either way. This is the single most common argument on the day — asserting the wrong one is worse than not saying |
| 3c | **Is there a minimum or trip charge for the far counties?** | Not answered. The county pages currently say "no trip fee inside \<county\>", which was written before prices existed and should be confirmed against whatever he decides |

The base prices are stated as covering the ordinary job — drywall, cords tidied
down the wall, one TV — which is the framing Leon was answering when he gave
them. If that was not his intent, it is one line in `TV_PRICING`.

**The templates shelf is a product, not a quote.** `/agent-templates` reads
"Price announced when the shelf opens" rather than "Priced per job", because a
digital download does get a fixed price — set before checkout is connected. See
`FORMS.md`.

## Proof awaiting permission or detail

| # | Blank | Where | Needs |
|---|---|---|---|
| 8 | The Chloe Girls | `/`, `/work`, `/websites` | **Filled 2026-08-25.** The client gave permission and Leon supplied the address: `chloegirlsofficial.com`. All three slots now carry a real card linking to the live site. **No build details are claimed** — the site itself could not be reached from the build environment, so nothing describes what is on it. The link is the proof; a visitor can go and look. If more is ever written about that build, it comes from Leon or from the Web Division, never from inference. |
| 9 | Atlanta Experience live links | `/work` | The public URL and any store links, confirmed by Leon. We link nothing rather than link wrong. |
| 10 | Client testimonials | `/`, `/work`, `/websites` | Real quotes, real names, permission. Volume matters here — but zero invented entries. |
| 11 | TV mounting photos and reviews | `/tv-mounting` | Real installation photos and real customer reviews. Stock photos of someone else's living room prove nothing. |
| 12 | Agent template buyer reviews | `/agent-templates` | Nothing has sold yet, so there is nothing honest to put here. |
| 13 | Marketing client numbers | `/marketing` | Real before-and-after figures we are permitted to publish, with caveats attached. |

## Copy awaiting Leon's word

| # | Item | Status |
|---|---|---|
| 14 | The company one-line promise | **Resolved 2026-08-24.** Leon picked *"We build it properly, then hand you the keys."* It runs in the footer, on `/about` and `/work`, and closes the home hero. Structured data uses `SITE.summary` instead — a promise this short makes a poor search description. |
| 15 | Budget brackets in the qualifying forms | Drafted as sensible ranges in `src/data/forms.ts`. They imply nothing about our prices — they qualify the enquiry — but they should match Leon's intent before launch. |
| 16 | Privacy and terms | Written in plain language and accurate to the current state. Neither has been reviewed by a lawyer, and both should be before the site is deployed. |

## Repository trunk — done

**Resolved 2026-08-24.** Leon switched the repository's default branch to `main`,
verified against the remote (`HEAD branch: main`). GitHub had adopted the working
branch automatically when it was the only one. Branches cut from now on start
from the right place.
