# Open Arms Solutions LLC — website build

**Trade:** pediatric home healthcare, through Georgia's GAPP (Medicaid)
**Build tool:** Lovable, in `Leon's Lovable` (workspace `pk7HYkw0osFxFACKvOFm`)
**Project:** `082d232b-8a11-449b-b841-fb1d4f22b6b5`
· [editor](https://lovable.dev/projects/082d232b-8a11-449b-b841-fb1d4f22b6b5)
· [preview](https://id-preview--082d232b-8a11-449b-b841-fb1d4f22b6b5.lovable.app)
**Status:** first build done, four corrections sent. Private, unpublished, nothing deployed.
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
| Named contacts | Concepcion Gallardo and Darnel Hamilton Jr. |
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

Findings 2–4 are the same failure mode in three costumes: a true-sounding
sentence one step beyond the source. None would have looked wrong to a reader.
That is exactly why they are worth catching on a healthcare site.

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
