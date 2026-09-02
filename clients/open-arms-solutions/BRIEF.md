# Open Arms Solutions LLC — website build

**Trade:** pediatric home healthcare, through Georgia's GAPP (Medicaid)
**Build tool:** Lovable, in `Leon's Lovable` (workspace `pk7HYkw0osFxFACKvOFm`)
**Project:** `082d232b-8a11-449b-b841-fb1d4f22b6b5`
· [editor](https://lovable.dev/projects/082d232b-8a11-449b-b841-fb1d4f22b6b5)
· [preview](https://id-preview--082d232b-8a11-449b-b841-fb1d4f22b6b5.lovable.app)
**Status:** built, audited, all fixes verified. Private, unpublished, nothing deployed.
**Opened:** 2026-09-01

The flyer is the source of truth for every fact. The logo is the source of truth
for the palette. Both are in [`assets/`](assets/).

---

## What this business actually is

Not general home care. **Pediatric** home healthcare for children with
developmental and physical disabilities, delivered through the **Georgia
Pediatric Program (GAPP)** — a Medicaid program, free to the family.

And it sells to **two audiences**, which is the thing that shapes the whole site:

1. **Parents of a medically complex child** who need care at home and want to
   know whether their child qualifies.
2. **People who want to be paid caregivers** — including parents paid to care
   for their own child — plus nurses looking for work.

The flyer leads with audience 2 (*"GET PAID TO CARE FOR YOUR CHILD!"* is the top
line). On most home care sites recruiting is a footer link; here it is arguably
the larger offer, so the home page forks between the two at the top rather than
burying one.

## The facts, from the flyer

| Item | Value |
|---|---|
| Name | **Open Arms Solutions** (legal: Open Arms Solutions LLC) |
| Category | Home healthcare |
| Positioning line | "Providing a supportive environment for children and families by offering expert care for those with developmental and physical disabilities." |
| Phone | **(478) 447-1813** |
| Email | **Openarmsgroupllc@gmail.com** |
| Named contacts | **Darnel Hamilton Jr.** — (478) 447-1813 · **Concepcion Gallardo** — (470) 202-5236 |
| Program | Georgia Pediatric Program (GAPP) |
| Hiring | Yes — "Hiring a Nurse", "Parent Caregiver Compensation", "Employment" |

**Our dedication** (verbatim): *"At Open Arms Solutions, we provide personalized
home healthcare services designed to meet the unique needs of each child and
family. We are proud participants in the Georgia Pediatric Program (GAPP),
created to aid parents and offer free in home healthcare."*

**Program information:**
- Free program with no cost to parents
- Not a waiver service, allowing immediate approval
- **No waitlist**
- Intake and evaluation may take up to 30 days for service approval
- Parents play a crucial role in developing their child's treatment plan and
  service goals

**Qualifying diagnosis or medical devices**, in flyer order: Epilepsy · Cerebral
Palsy · Spina Bifida · Muscular Dystrophy · Down Syndrome · Autism with medical
complexity · Traumatic Brain Injury · Dialysis Machine · Wheelchair · Heart
Conditions · Gastrostomy Tube (G-Tube) · And more…

**Get paid as your child's caregiver:** through GAPP, parents and guardians of
medically eligible children on Medicaid can become paid caregivers. **No nursing
license required.** Children must be between the ages of 5–20.

**Trust points:** caregivers carefully selected and screened · background checked
· supervised by our nurses

## Three things to get right, because they are easy to get wrong

**The 5–20 age range belongs to one offer only.** On the flyer it sits under
*Get Paid As Your Child's Caregiver*, not under the services. Applying it to the
care generally would wrongly turn families away. The site states it only on the
paid-caregiver page.

**"No waitlist" and "up to 30 days" have to read as one sequence.** No waitlist
to get started, then up to 30 days for approval. Written carelessly they read as
a promise the next line breaks, which is worse than saying neither.

**"Free" is her claim, and it stays hers.** The site carries the flyer's wording
about the program being free to parents. It does not extend, restate, or
guarantee it in language she did not use.

## Still blank — nothing here gets guessed

Every one of these is a fact only the client can give. Each renders as a marked
placeholder rather than plausible prose, and the standing rules in the Lovable
project forbid the agent from filling any of them in later.

| # | Item | Why it matters |
|---|---|---|
| 1 | **Service area** — counties, cities, or a radius | Area code 478 is middle Georgia, but that is an inference about a phone number, not a fact about where she works. Families check this before calling |
| 2 | **Licensing** — what she is licensed or certified as, and by whom | A license claim that is not hers is the worst sentence on the site |
| 3 | Office or mailing address | Decides `LocalBusiness` schema and a map, or service-area-only |
| 4 | Business hours, and who answers after hours | |
| 5 | Owners' story — Concepcion and Darnel | About page has a marked space, not an invented story. In this trade the founders *are* the differentiator |
| 6 | Real photographs of caregivers and families, with written consent | See below |
| 7 | Caregiver pay rate or range | The first question every applicant asks |
| 8 | Original logo file — vector or high-res PNG on transparent | We are working from a photo of a print |
| 9 | Does she have a Google Business Profile? | The site's NAP has to match it exactly or local search splits |
| 10 | Domain name | Nothing bought (rule 8) |

## Two decisions that cost money or trust

**Photography.** No stock. Stock photos of disabled children are both instantly
recognisable and distasteful, and this audience will clock it immediately. The
build therefore stands on custom illustration and the flyer's handprint motif,
with marked slots for real photographs. Getting real photos of her actual
caregivers and families — with written consent from everyone identifiable — is
the single biggest visual upgrade available, and the one with the longest lead
time. Worth asking her this week.

**Where the forms send.** The forms are built but **deliberately unwired**. An
intake form that collects a child's diagnosis is collecting protected health
information, and a form-to-Gmail pipeline is not an appropriate destination for
it. Her current published contact is a Gmail address, which is her existing
practice and not ours to change — but we should not build a web form that
industrialises it. The intake form asks only what is needed to return a call:
name, best contact, child's age, and an optional free-text note. No required
diagnosis checkboxes, no Medicaid ID, no date of birth, no SSN.

This needs a decision before launch, and it is a real one — a HIPAA-appropriate
form destination is a paid product. Nothing gets bought without Leon (rule 8).

## The design bar

Not the bare minimum. The competition in home care is stock photos, blue
gradients and three grey boxes; beating that is not the hard part. The hard part
is being genuinely beautiful while still reading as serious healthcare to a
parent making a frightening decision.

What that means concretely here:

- **The pediatric angle is a gift.** This site can be joyful in a way adult home
  care never can. The flyer already knows it — rainbow handprints, children
  holding hands. That motif is the identity, used with restraint.
- **Palette straight from the logo.** Navy `#16295C`, teal `#1BA3A6`, purple
  `#6B3FA0`, gold `#F0A93B` for calls to action, cream `#FDFBF7` ground. Never
  clinical blue.
- **Custom illustration, echoing the logo's own geometry** — the cradling-hands
  curve, the two-tone heart, the pitched roofline — recurring as section
  dividers, card tops and bullets.
- **Accessibility is the product, not a checkbox.** A company serving children
  with disabilities cannot ship an inaccessible site. WCAG 2.2 AA verified,
  keyboard navigation, reduced-motion honoured, 18px body minimum.
- **Mobile is the real site.** A worried parent, on a phone, at night.

## The pages

Home · Our Program (GAPP) · Who Qualifies · Get Paid to Care for Your Child ·
Careers · About · Contact.

Three forms, all built, all unwired: refer a child, get paid as a caregiver,
careers application.

## Example site

Leon gave `https://www.4wardhealthcare.com/` as the minimum bar. This session
cannot open it — the environment's network policy allowlists hosts and that
domain is not among them (`403` from the egress proxy, on both the fetch tool
and plain `curl`). It is recorded unread rather than described from memory.

Recommendation: **skip it.** It was offered as the floor, not the target, and
the page list above already exceeds what it could tell us. If Leon wants it read
anyway, screenshots pasted into the chat are the cheapest route.

## Build audit — first pass, 2026-09-01

Seven routes, a real design system, three forms. What it got right without
being asked twice: `--teal` split into a graphics colour and an AA-safe text
colour, with the contrast rules written into the stylesheet comments; an 18px
body floor; `prefers-reduced-motion` honoured; visible focus rings; the
founders' story left deliberately blank behind a marked chip; and forms that
say *"This form isn't connected yet. Nothing was sent"* rather than pretending
to submit.

Four findings, sent back as one corrective prompt:

| # | Finding | Why it matters |
|---|---|---|
| 1 | **Contrast failure.** The purple caregiver band's eyebrow is 14px bold gold on purple — about **3.66:1**. At that size WCAG needs 4.5:1, not the 3:1 large-text allowance | The one genuine AA failure. Caught by checking rather than assuming, which is the whole point of the rule |
| 2 | Hero read **"at no cost."** unqualified | Her words are "no cost to **parents**." GAPP is Medicaid-funded — there is a cost, just not to the family. Now "at no cost to your family" |
| 3 | A program point asserted **"There is no charge to families for care delivered through the Georgia Pediatric Program"** | A general claim about how GAPP works, written by us. Narrowed back to what she said |
| 4 | The home page had Concepcion and Darnel **"answer questions about care, qualifying, caregiver pay and hiring"** | The flyer names them for hiring, parent caregiver compensation and employment. Who fields care and qualifying enquiries is not known, so it is no longer asserted |

**All four verified fixed** at commit `73554f93`, and nothing else moved — the
forms are byte-for-byte unchanged and still unwired. The eyebrow is now
`text-cream` on purple, which measures **7.18:1**. The two remaining uses of
gold-on-a-dark-fill were checked rather than assumed and both pass: the 24px
semibold lead on purple is genuine large text at 3.66:1 against a 3:1 floor,
and gold on navy is 6.9:1.

Findings 2–4 are the same failure mode in three costumes: a true-sounding
sentence one step beyond the source. None would have looked wrong to a reader.
That is exactly why they are worth catching on a healthcare site.

## Design audit — healthcare standards, 2026-09-02

Audited the built site against what families now expect of a healthcare
provider's website. Scored against evidence in the code, not impressions.

| Area | Score | The finding |
|---|---|---|
| Visual clarity | 4/5 | Strong. The 404 and error pages still use starter-scaffold styling and 14px body copy, bypassing the design system |
| Navigation | 3/5 | Sticky header, skip link, real mobile drawer — but the desktop nav is gated at `xl` (1280px), so 13" laptops get a hamburger |
| Conversion path | **2/5** | The header CTA is gated at `2xl` — **"See if your child qualifies" only renders above 1536px.** On most desktops the primary call to action is simply absent |
| Patient tools | n/a | The usual checklist — portal, telehealth, online scheduling, triage — is wrong for a GAPP agency. The next step here is a phone call and a 30-day intake, not software |
| Trust signals | 3/5 | No stock photos, no invented testimonials, no false licence claim. But **no privacy page and no privacy language on any form**, on a healthcare site collecting contact details |
| Mobile | 4/5 | Mobile-first, 44px targets, sticky tap-to-call bar, 18px floor |
| Accessibility | 4/5 | Skip link, landmarks, `aria-current`, `aria-live`, reduced motion, AA verified. Only the 404 breaks the type floor |
| Findability | **2/5** | Good per-page titles and descriptions — and **no JSON-LD at all.** For a business whose whole market is local search, that is the largest single gap |

The design is the strong part. What is costing this site is plumbing around
it: two breakpoint bugs suppressing the primary CTA, and no structured data.

Six fixes sent. One of them — the contact page still crediting Concepcion and
Darnel with care and qualifying enquiries — is the same error corrected on the
home page on 2026-09-01. That correction was scoped to one file when it should
have been scoped to the claim. Worth remembering: fix the claim, not the line.

The schema deliberately carries `areaServed: Georgia` and no address, hours or
rating. Narrower would be a guess, and an empty field is worse than an absent
one.

## Audit fixes — verified 2026-09-02

All six landed at `01b80b50`, and three of them landed better than asked:

- The header CTA now runs from `md` with progressive labels — "Get started",
  "See if you qualify", "See if your child qualifies" — instead of vanishing.
  Nav drops to `lg`. The phone goes icon-only where space is tight, carrying an
  `aria-label` with the visible number `aria-hidden` so a screen reader hears it
  once rather than twice.
- The contact-page attribution is now a single `namedContactScope` constant in
  `site.ts`. The claim can no longer drift line by line, which is the actual fix
  for the mistake that caused it.
- The privacy page states plainly that the forms transmit nothing, tells families
  not to send diagnoses or Medicaid numbers, claims no HIPAA compliance, and
  names the Google Fonts request as the one outside resource the site loads —
  which is true and easy to have missed.

Three leftovers went back, all one root cause: no domain yet, so a few places
wrote a relative URL where an absolute one is required. `url: "/"` in the JSON-LD
(dropped — a bare slash is worse than nothing), `telephone` in pretty format
rather than E.164, and a lone relative canonical on `/privacy`. Absolute
canonicals go in across every page in one pass when a domain is bought, not one
page at a time.

## Compliance

A researched GAPP brief arrived 2026-09-02 and the site is being expanded from
it. The audit, the severity table and the full open-items list live in
**[`COMPLIANCE.md`](COMPLIANCE.md)**. Two findings must be closed before launch:
the flyer's "immediate approval" wording, which reads as a guarantee Medicaid
marketing rules forbid; and the absence anywhere on the site of the fact that
**the State decides approval and hours, not the agency**.

Program facts from that brief are kept in `src/data/program.ts`, apart from the
client's own facts in `site.ts`, and carry a visible review date. Nobody in this
project has verified them — this session cannot reach any primary source — so
verification is a gate in front of publishing.

## The logo discrepancy, 2026-09-02

Concepcion's headshot was taken in front of an office sign carrying a
**different logo** — a blue and green heart mark reading "Open Arms Solutions,
LLC". The site's entire palette, illustration set and motif system are derived
from the flyer logo: navy, teal, purple and gold, two children, a house roof,
cradling hands. They are not the same brand.

Leon confirmed on 2026-09-02 that **the flyer logo is current**. The sign was
therefore cropped out of the photograph rather than shipped, because a founder
portrait with a competing logo behind it undercuts the identity the whole site
is built on, and it would be read as carelessness rather than history.

Worth returning to before launch: a business running two marks is a problem to
solve deliberately, not to discover on a printed sign in someone's photograph.

## Log

- **2026-09-01** — Leon opened the build. Name, trade, tool and design bar
  recorded. Intake scaffold written; nothing created in Lovable.
- **2026-09-01** — Example URL given: `4wardhealthcare.com`. Blocked by the
  session's network policy, so recorded unread rather than described.
- **2026-09-01** — **Flyer and logo received.** The brief changed shape: this is
  pediatric GAPP care with a second, possibly larger, paid-caregiver audience —
  not the senior home care the first draft assumed. Facts transcribed, assets
  saved, Lovable project created with the standing no-invention rules set as
  project knowledge. First build running. Nothing published.
- **2026-09-01** — First build landed: seven routes, design system, three
  unwired forms. Audited against the brief; four corrections sent. One was a
  real WCAG AA contrast failure, three were copy drifting a step past the
  flyer. Nothing published.
- **2026-09-01** — Corrections verified at `73554f93`. Contrast fix measures
  7.18:1; the three copy items now sit inside her wording; forms unchanged and
  still unwired. The build is where it can go without the client's answers.
  Nothing published.
- **2026-09-02** — Design audit against healthcare-site standards. Six fixes
  sent: the header CTA and nav breakpoints, JSON-LD structured data, a privacy
  page and form privacy note, branded 404 and error pages, the contact-page
  attribution missed last round, and a "what happens after you call" timeline
  built from the flyer's own three steps. Nothing published.
- **2026-09-02** — Audit fixes verified at `01b80b50`: CTA and nav breakpoints,
  `MedicalOrganization`/`LocalBusiness` JSON-LD, `/privacy`, branded 404 and
  error pages, the contact attribution now behind a shared constant, and the
  three-step next-steps timeline. Three URL leftovers sent back. Nothing
  published.
- **2026-09-02** — URL leftovers verified at `67177be2`: `url` dropped from the
  JSON-LD with the reasoning left in a comment, `telephone` now E.164 via a
  `phoneE164` field, the stray relative canonical gone. The site is built,
  audited and correct as far as it can go without the client. Nothing published.
- **2026-09-02** — **Founder photographs received**, plus a second phone number:
  Darnel Hamilton Jr. on (478) 447-1813, Concepcion Gallardo on
  (470) 202-5236. Photo-to-name mapping confirmed with Leon rather than guessed.
  A different logo visible on the office sign behind Concepcion was cropped out
  after Leon confirmed the flyer mark is current. Sent to Lovable: per-person
  tap-to-call contacts, a real founders section on About, and a face on the
  contact page. No bio, title or credential invented — the story stays a marked
  blank. Nothing published.
