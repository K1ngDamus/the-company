# Open Arms Solutions — compliance audit and open items

**Audited:** 2026-09-02, against the site at commit `64b49c86`
**Standard:** Medicaid marketing rules, the federal Anti-Kickback Statute, and
HIPAA handling of protected health information
**Program facts source:** a research brief supplied by Leon, dated September
2026. **Nobody in this project has verified it.** This session's network policy
blocks every outbound host, so no claim below was checked against Georgia DCH,
Alliant, or any primary source. That verification is a gate in front of launch,
not a formality.

---

## A. Audit of the site as built

| # | Where | Problem | Severity | What to do |
|---|---|---|---|---|
| 1 | Home, `/program` | The flyer's line **"not a waiver service, allowing your child to receive immediate approval"** reads as a guarantee of approval. Medicaid marketing rules forbid guaranteeing approval or hours | **Fix before launch** | Do not rewrite her sentence — it is hers. Never let it stand alone in a heading, card title or hero; it must always sit beside the honest sequence. **And raise it with her: it is on the printed flyer too, which is the bigger exposure** |
| 2 | Every page | The site never says **who decides**. The State authorises care and hours; the agency does not | **Fix before launch** | Add, wherever the application is discussed: "The State decides whether care is approved and how many hours are authorised — not us. What we do is help you prepare the strongest application and handle the paperwork with you" |
| 3 | Every page describing GAPP | No "last reviewed" date on program information | Fix soon | `Program information last reviewed: 2 September 2026`, as fine print |
| 4 | `/who-qualifies`, home | Clinical terms are listed raw — "Gastrostomy Tube (G-Tube)", "Traumatic Brain Injury", "Autism with medical complexity" — with no plain-language gloss | Fix soon | Translate on first appearance: "G-tube (a feeding tube into the stomach)". The reader is a frightened parent, not a clinician |
| 5 | Whole site | **The strongest message available is missing entirely:** families may choose any GAPP agency and may switch at any time, and the new agency handles the transfer. Most families do not know this | Fix soon (strategic) | A dedicated page, led by the right rather than the pitch. No criticism of any other agency, not even implied |
| 6 | Whole site | Copy has not been held to a grade 6–8 reading level | Style | Pass over every page with that constraint |

### What already passes

| Rule | Status |
|---|---|
| **No PHI in web forms** | **Passes, and exceeds the requirement.** The intake form asks only name, contact, child's age and an optional note — and tells families in its own intro not to send diagnoses, Medicaid numbers or records. The forms transmit nothing at all |
| **No inducements** | **Passes.** Nothing offers a bonus, gift or reward for choosing, switching or referring. Note that *"get paid to care for your child"* is a **GAPP program benefit**, not an inducement, and is correctly framed as such |
| **No implied state endorsement** | **Passes.** "Proud participants in the Georgia Pediatric Program" is her own wording. No badges, seals or "GAPP certified" anywhere |
| **No disparagement** | Passes. No competitor is mentioned |
| **Accessibility (WCAG 2.1 AA)** | Substantially passes already — AA contrast verified by measurement, 18px body floor, skip link, landmarks, `aria-current`, `aria-live`, real form labels, 44px targets, reduced motion honoured, mobile-first, nothing locked in a PDF |

---

## B. One thing the source prompt asks for that we must not do yet

The brief asks for Spanish pages plus a notice that **"language assistance is
available free of charge."**

That is not a translation task, it is **a claim about how her business
operates**. If Open Arms cannot actually furnish an interpreter on request, the
sentence is false the day it is published — and it is exactly the kind of
promise a family in distress will rely on.

Spanish pages are held until she confirms two separate things: that she wants
them, and that she can honour the language-assistance promise that accompanies
them. Any translation also needs native-speaker review before it goes near a
page.

Worth raising with her separately: Medicaid providers may carry actual
language-access obligations. That is a question for her and her advisers, not
something this site should assert either way.

---

## C. Open items

### Needed from the client — nothing here can be guessed

| # | Item | Why it blocks something |
|---|---|---|
| 1 | Licence type and Georgia licence number | Cannot state licensure at all without it |
| 2 | Medicaid / GAPP enrolment status | Underpins every program claim on the site |
| 3 | Which services she actually offers — RN skilled nursing, LPN, personal care aide, school accompaniment | We currently imply none of these specifically. Also gates the "can a nurse go to school with my child" FAQ |
| 4 | Counties served | Still the most-asked question. Schema `areaServed` stays at state level until this lands |
| 5 | Languages spoken by staff | Gates the Spanish pages entirely — see §B |
| 6 | After-hours and emergency protocol | An `/emergencies` page cannot be written without it |
| 7 | Backup staffing when a caregiver calls out | The second question every parent asks after cost |
| 8 | Intake phone and typical callback time | We have the numbers; the callback promise is a commitment only she can make |
| 9 | Years in operation, and the founders' story | About page still carries a marked blank |
| 10 | Which managed-care plans she is in network with | Georgia's contracts changed 1 July 2026. **No plan may be named until confirmed** |
| 11 | Caregiver pay rate or range | First question every applicant asks |
| 12 | Original logo file, and which mark is current | See the logo discrepancy in `BRIEF.md` |
| 13 | A domain | Gates absolute canonicals and the schema `url` |
| 14 | A HIPAA-appropriate destination for form submissions | Gates launch. This is a purchase |

### To verify before publishing — none of it checked from here

| # | Claim | Note |
|---|---|---|
| 1 | GAPP is a Georgia Medicaid program run by DCH, for medically fragile children under 21, at no cost to eligible families | From the supplied brief |
| 2 | Eligibility: Georgia Medicaid, under 21, medically fragile, physician-ordered, nursing-facility level of care on **DMA-6A** | Form number unverified |
| 3 | Katie Beckett / TEFRA deeming: child qualifies on own income, parents' income disregarded, child 18 or younger at application | Unverified |
| 4 | Katie Beckett team **678-248-7449**; Parent to Parent of Georgia **800-229-2038**, p2pga.org | **Phone numbers must be dialled and confirmed before publishing.** A wrong number on this page sends a desperate parent nowhere |
| 5 | New Katie Beckett member portal, April 2026 | URL unknown — rendered as a visible chip, never a guessed link |
| 6 | Prior authorisation via GAMMIS; fee-for-service reviewed by Alliant Health Solutions; managed-care children reviewed by their plan; ~30 days | Unverified |
| 7 | Packet: DMA-6A, DMA-80, Physician's Plan of Treatment, Letter of Medical Necessity, Freedom of Choice | Form numbers unverified |
| 8 | Families may choose any GAPP agency and switch at any time; new agency handles transfer; usually no gap | **This is the site's strongest message. It must be the most carefully verified claim on it** |
| 9 | Caregiver standards: GA RN/LPN licence, CPR/BLS, TB screening, CNA 85 hours plus exam, GCIC and FBI checks, RN supervision | Unverified |
| 10 | EVV via Netsmart Mobile Caregiver+ | Unverified, and may be plan-specific |
| 11 | Georgia managed-care contracts transitioned 1 July 2026 | Unverified — and no plan is named on the site because of it |

---

## D. The standing rule

Every claim in section C is currently **unpublished**. The site is private. That
is the only reason it is acceptable to build on unverified program facts at all:
the material is staged where it can be checked, not shipped where it can mislead.

Publishing before section C is worked through would put unverified Medicaid
guidance on the open web under a real agency's name, addressed to families
making decisions about a medically fragile child. That is the failure mode this
document exists to prevent.
