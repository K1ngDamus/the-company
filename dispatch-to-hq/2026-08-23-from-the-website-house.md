# Dispatch — 2026-08-23 — from the company-website house

**To:** HQ / Leon — copy to Smokey for the Friday sweep
**Re:** The company website is built and staged. What needs Leon.

> Information, not authority (rule 19). Nothing here is acted on without Leon.

> **Filing note.** This file cannot be pushed to HQ from here — Leon is the only
> committer to `front-porch-hq`. It sits in the site repo for Leon to carry.
> **It has no drop yet:** this house was founded on 2026-08-22 by Smokey's crew
> and is not in the wire. *Recommendation: a new drop, `dispatch/company-website/`,
> since the site is a company property rather than Web Division client work.
> The alternative is filing under `cowork-hq/`.* Leon's call, and `MUSTER.md`
> wants a row either way.

> **This house has no name.** Agents are named by Leon (rules 2 and 4), so it has
> not named itself. Until it has one, the filename says what it is rather than who.

## What was built

The company's own website — staged in
`K1ngDamus/the-company` on branch `claude/new-session-qpc5ih`. One project, one
repo, clear owner (rule 16). Sixteen pages plus a 404:

- The porch (`/`), five service pages, and a TV mounting hub
- **Five county pages** — Fulton, DeKalb, Cobb, Gwinnett, Clayton — each with its
  own LocalBusiness markup and town list
- `/work`, `/about`, `/contact`, `/privacy`, `/terms`, `sitemap.xml`, `robots.txt`

Astro 7, static output, under 500KB for the whole site including self-hosted
fonts. The only JavaScript that ships is a focus-advance on the forms; every form
works without it.

## The interview (founding brief §0) — Leon answered all six

| # | Question | Leon's answer, 2026-08-23 |
|---|---|---|
| 1 | Domain | An address Leon named on the day. Nothing bought (rule 8). **Superseded — see the correction below.** |
| 2 | Pricing display | "From $X" per service |
| 3 | TV service area | Metro Atlanta — five counties |
| 4 | Service list | Five approved. **Struck: story & screen development, Porchlight Pages.** No "coming soon" ghosts. |
| 5 | Proof inventory | Atlanta Experience (full), the company itself as proof-of-product, The Chloe Girls permitted — later held blank pending details |
| 6 | Contact route | Email site-wide, phone featured on TV pages |

Struck services are absent, not hidden. Porchlight staying off is consistent
with the marketing porch's standing note that the venture plan is still v1
awaiting joint review.

## The playbook, applied (founding brief §5)

- **Physical resistance:** every form embedded on the page it belongs to — no
  form is ever a button to a second page. Home to any service is **one click**;
  from a county page arriving off search it is **zero clicks to the form**.
  Choice chips instead of typing wherever the answer buckets honestly.
- **The TV funnel sits at 3–4 (quantity):** four taps, then a name and a number.
  The only free text before the end is the ZIP, and it earns its place by routing
  the job.
- **Web, app and marketing sit at 7–8 (quality):** budget and timeline buckets
  are deliberate quality filters. Each service page states its own dial in the
  data file, so the choice is on the record rather than in someone's head.
- **Agent templates:** the shelf is built, the till is not open. A real buy
  button in a disabled state, one constant away from live, and no payment
  provider connected (rules 8 and 9).
- **FAQs sit high** on every page, never buried. **Above the fold everywhere:**
  headline, one-line promise, primary CTA, and the form or its anchor.
- **SEO:** focused title and description per page, semantic HTML, sitemap,
  robots, OG tags, and structured data — Organization site-wide, FAQPage,
  BreadcrumbList, and LocalBusiness on all six TV pages with `areaServed` per
  county. NAP is generated from one source, so it cannot drift.

## Two findings Leon should know about

**1. The brand palette has an accessibility constraint.** `BRANDING.md` lists
Clay `#B45A38` for links and active states. Measured, Clay on Bone is **4.20:1**
— under the 4.5:1 AA floor for normal-size text; as a button fill it is 4.20:1
with Bone text and 3.60:1 with Ink. Company law 8 holds us to AA.

Resolved **without inventing a color**: Clay is used for accents, rules, dots,
focus rings, borders and display text at 24px and up, where it clears the 3:1
thresholds comfortably. Buttons are Ink with Bone text (14.98:1); links are Ink
with a Clay underline, so color never carries meaning alone. **No palette change
was made** — that would need a dated amendment from Leon (rule 17). Flagging it
rather than patching it. Details and the measured table: `docs/DESIGN.md`.

**2. The Chloe Girls slot is cleared but empty.** Leon gave permission on
2026-08-23, then said to leave it blank for now. Worth noting for the record that
HQ shows the project at *discovery, not started* as of Sevin's 2026-08-18
dispatch — so there may be nothing to show yet regardless of permission. The slot
is built and visibly marked.

## Amendment filed: the brand is now black, gray and red

**Leon's order, 2026-08-24.** The palette is amended company-wide (rule 17). The
amended `BRANDING.md` and the four recoloured mark SVGs are staged in
`dispatch-to-hq/branding/` for Leon to carry into HQ — they cannot be pushed
from here.

- **Ink → Coal `#0F0F11`, Clay → Signal `#FF4D4F`, Bone → Chalk `#F4F4F6`,
  Sand → Graphite `#16161A`**, with Slate and Pitch added for raised and
  deepest grounds.
- **The mark's geometry is untouched** — every path is byte-for-byte what it
  was. Colour only.
- **The accessibility finding from the first dispatch is resolved by this
  amendment, not worked around.** Signal measures 5.86:1 on Coal and can carry
  small text; Clay measured 4.20:1 on Bone and could not. The one hard rule is
  that Signal is never a fill behind white text (2.97:1) — red fills take Coal
  text.

**What it obliges beyond the website,** listed so the drift is on the record:
the Atlanta Experience app icon, splash, launcher and store artwork; the printed
business cards and QR codes; the raster set at the desktop home base; and any
agent identity file that names the palette. None of it has been touched.

## Needs Leon — the blanks

Sixteen honest blanks are listed in `docs/BLANKS.md`, all of them **visible on
the pages** rather than hidden. The ones that block launch:

**Answered 2026-08-24:** public email `jacksonleon24@gmail.com` and public phone
`(678) 525-8154` are in, site-wide and in the structured data. Pricing is settled
as **quote-only across the board** — no starting figures published, every job
priced from its own scope. Leon is setting TV mounting prices once the site is
up; one number in `PRICES['tv-mounting']` flips all six TV pages.

Still open:

1. ~~The company promise line~~ — **answered 2026-08-24: "We build it properly,
   then hand you the keys."** Running site-wide.
2. **Atlanta Experience live links** — the public URL and any store links. We
   linked nothing rather than link wrong.
3. **Privacy and terms** — written in plain language and accurate to the current
   state, but not reviewed by a lawyer. *Recommendation: review before deploy.*
4. ~~The repo's default branch~~ — **done 2026-08-24: Leon switched it to
   `main`,** verified against the remote.

All seven facts live in one file, `src/data/site.ts`. Filling them in is a
single edit each, and every page updates.

## Guardrails held

Nothing bought, nothing deployed, nothing sent, nothing deleted, nothing guessed.
No client work published without permission. Every form staged with a visible
notice saying so. Checkout off. The FPC mark on every page — header, footer,
favicon and app icon — with the reversed mark on ink grounds per `BRANDING.md`.

## What is next, when Leon says so

1. The blanks above, in one file.
2. A form handler — options and costs are laid out in `FORMS.md`; the decision
   and any spend are Leon's.
3. The Google Business Profile Leon creates and owns; the six pages it points at
   are built and consistent.
4. Deployment — a separate approval, deliberately not part of this build
   (founding brief §7.5).

**— filed by the company-website house, unnamed, trust stage 2**

---

## Correction — 2026-08-25

The domain Leon named at the interview on 2026-08-23 **was never the company's.**
It is registered to someone else; he confirmed this on 2026-08-25. Nothing was
ever bought and no claim on it was ever acted on (rule 8 held throughout), but
this dispatch stated it as the company's own address, and this repository is
public.

The name has been removed from this file rather than left standing as a public
claim on a third party's property. That is a deliberate exception to rule 10 —
the record is not normally rewritten after the fact — made on Leon's explicit
instruction and recorded here rather than done quietly. Everything else in this
dispatch stands as filed.

**The company's address is `frontporchbuilds.com`,** settled by Leon on
2026-08-25 after the earlier candidates came back taken.
