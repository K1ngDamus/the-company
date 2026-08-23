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

The company's own website — `frontporchco.com` — staged in
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
| 1 | Domain | `frontporchco.com`. Nothing bought (rule 8). |
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

## Needs Leon — the blanks

Sixteen honest blanks are listed in `docs/BLANKS.md`, all of them **visible on
the pages** rather than hidden. The ones that block launch:

1. **Public email address** — appears in the footer, contact page, both legal
   pages and the schema.
2. **Public phone number** — the header on all six TV pages currently shows a
   marked "Phone — TODO" where the number belongs.
3. **Five starting prices** — websites, apps, TV mounting, agent templates,
   marketing. *Any service Leon would rather quote case by case can stay blank
   permanently; the page reads correctly either way.*
4. **The company promise line** — a draft is in place; three alternatives were
   put to Leon and his own words beat all four.
5. **Atlanta Experience live links** — the public URL and any store links. We
   linked nothing rather than link wrong.
6. **Privacy and terms** — written in plain language and accurate to the current
   state, but not reviewed by a lawyer. *Recommendation: review before deploy.*

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
