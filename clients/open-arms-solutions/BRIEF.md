# Open Arms Solutions LLC — website build

**Trade:** home healthcare
**Build tool:** Lovable, in `Leon's Lovable` (workspace `pk7HYkw0osFxFACKvOFm`)
**Project:** not created yet — see [Gate 1](#gate-1-the-flyer)
**Status:** intake. Nothing built, nothing bought, nothing sent.
**Opened:** 2026-09-01

The client's flyer is the source of truth for this site. We are turning her
flyer into a website — her words, her services, her contact details, her colors.
The example site Leon is supplying is the *floor*, not the target: it says what
the site must at minimum do. What we ship should look considerably better than
it.

---

## The two gates

### Gate 1: the flyer

Nothing is created in Lovable until the flyer is in `assets/`. Two reasons, and
both cost real money if ignored:

1. **Rule 11.** Every fact on a home healthcare site — services, service area,
   license status, phone number, who answers it — belongs to the client. A
   guess here is not a placeholder that gets fixed later; it is a false claim
   about a healthcare business, sitting on the open web under her name.
2. **Credits.** Each Lovable message spends Leon's workspace credits. A first
   prompt written from the flyer gets far closer on the first pass than a
   generic one that then needs to be argued back into shape.

### Gate 2: the example site

Leon is supplying a URL as the minimum bar. Once it is here it gets read for
what it *does* — pages, forms, calls to action — and that list becomes the
functional floor below. Its **looks are not a reference.** Design direction
comes from the flyer.

---

## What we have

| # | Item | Status |
|---|---|---|
| 1 | Company name | **Open Arms Solutions LLC** — from Leon, 2026-09-01 |
| 2 | Trade | **Home healthcare** — from Leon, 2026-09-01 |
| 3 | Build tool | **Lovable** — Leon's call, 2026-09-01 |
| 4 | Design bar | **Not the bare minimum.** Extraordinary looks and graphics — Leon, 2026-09-01 |

That is the whole list. Everything below is blank.

## What the flyer has to answer

Read straight off the flyer where it is there. Where it is not, it is a question
for the client — not something we fill in.

| # | Item | Why it cannot be guessed |
|---|---|---|
| 1 | Legal name and how she writes it publicly | "Open Arms Solutions LLC" vs "Open Arms Solutions" — the LLC belongs in the footer and schema either way |
| 2 | Phone number | The single most-used element on a home care site |
| 3 | Email address | |
| 4 | Physical or mailing address | Decides whether this gets `LocalBusiness` schema and a map, or `Organization` and a service area only |
| 5 | Service area — counties, cities, or a radius | Home care is bought locally; this drives every local page |
| 6 | The services, in her words | Personal care, companion care, respite, homemaking, skilled nursing and private duty are different products with different licensing. We take her list, not a generic one |
| 7 | Hours, and who answers after hours | "24/7" is a claim, not a default |
| 8 | Licensed / bonded / insured — and by whom | A license claim that is not hers is the worst sentence we could write |
| 9 | How families pay — private pay, long-term care insurance, VA, Medicaid waiver | Second question every family asks, after price |
| 10 | Owner's name, story, and photo | This is the whole differentiator in home care. "Open Arms" is a promise the About page has to make good on |
| 11 | Logo — original file if it exists, not a flyer crop | |
| 12 | Colors and typefaces from the flyer | The palette starts here and gets pushed to something better, not replaced |
| 13 | Photography — real caregivers and clients, with signed permission | Stock is visible from orbit in this trade. Real photos need written consent from anyone identifiable |
| 14 | Is she hiring caregivers? | Recruiting is half the traffic on most home care sites. If yes, careers is a first-class page, not a footer link |
| 15 | Any tagline already in use | |

## The functional floor

Filled in from the example site once its URL arrives. Until then this is what
the trade requires of any home care site, and it stands as our own floor:

- [ ] Phone number reachable in one tap from every screen, header and footer
- [ ] Services, each explained in plain language, each its own page if she has more than three
- [ ] Service area stated explicitly — families check this before they call
- [ ] "Request care" form, and a separate "Apply to work here" form if #14 is yes
- [ ] About, carrying the owner's story and face
- [ ] How to pay
- [ ] Real contact page with NAP matching her Google Business Profile exactly
- [ ] Privacy and terms
- [ ] Structured data — `LocalBusiness` or `Organization`, matching #4

## Design direction

**The bar is extraordinary.** Home healthcare sites are, almost without
exception, ugly: stock photos of a stranger's hands, three-column boxes, a blue
gradient. Beating that is not the hard part. The hard part is beating it
*without* looking like a tech startup, because the person deciding is often 55–75
and is choosing who to trust in their mother's house.

What that means concretely, before the flyer refines it:

- **Warm, not clinical.** The competition is either hospital-blue or greeting-card
  pastel. The flyer's own palette is the way out of both.
- **Type large by default.** Body copy sized for a reader who is not reaching for
  glasses. This costs nothing and is felt immediately.
- **AA contrast as a floor, not a target** — same standard our own site is held
  to, and here the audience makes it load-bearing rather than a checkbox.
- **Graphics that are ours.** Custom illustration or well-directed real
  photography. Not icon-font clip art.
- **Motion that is calm.** Considered entrances, no parallax carnival, and it all
  respects `prefers-reduced-motion`.
- **Mobile is the real site.** Most of this traffic is a worried adult child on a
  phone, at night.

## Handling and privacy

- Anything a family types into a care form is health-adjacent. Forms collect the
  minimum to return a call, and no diagnosis or condition field goes in without
  the client asking for it and understanding where it lands.
- No client photograph goes on the site without written permission from everyone
  identifiable in it.
- Nothing here is published, deployed, or shown publicly until the client says
  so (rules 9 and 16).

## Log

- **2026-09-01** — Leon opened the build. Name, trade, tool and design bar
  recorded. Flyer and example URL both stated as coming. Intake scaffold
  written; nothing created in Lovable.
