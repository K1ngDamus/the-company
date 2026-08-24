# Front Porch Collective — the company website

The front porch of the whole operation: every service findable, understandable,
and easy to ask for. Built for `frontporchco.com`.

**Status: staged, not deployed.** Nothing has been published, nothing sends,
nothing has been bought. Deployment is a separate approval from Leon and is not
part of this build (founding brief §7.5).

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built site
```

Astro 7, static output, no client-side framework. The only shipped JavaScript is
a focus-advance enhancement on the forms; everything works without it.

## The pages

| Page | What it is |
|---|---|
| `/` | The porch — five services, proof, three steps, FAQs, general form |
| `/websites` `/apps` `/agent-templates` `/marketing` | Service pages |
| `/tv-mounting` | Local service hub |
| `/tv-mounting/{fulton,dekalb,cobb,gwinnett,clayton}-county` | Five local SEO pages |
| `/work` | Proof — real work only |
| `/about` | The company and how it runs |
| `/contact` | NAP and a general form |
| `/privacy` `/terms` | Plain-language legal |
| `/404` | Not found |

Plus `sitemap.xml` and `robots.txt`.

## Where things live

```
src/data/site.ts      Every site-wide fact — contact, prices, services, counties
src/data/forms.ts     Form shapes, defined once so pages cannot drift
src/lib/schema.ts     Structured-data builders (Organization, LocalBusiness…)
src/components/       Hero, QuoteForm, Faq, Steps, ProofCard, Blank, Mark…
src/styles/global.css The design system — canon palette, type, components
public/brand/         The FPC mark, copied from HQ branding/
public/fonts/         Self-hosted Playfair Display + Jost
```

**`src/data/site.ts` is the one file to edit for most changes.** Contact
details, prices, service copy and county lists all live there, and every page
reads from it.

## Read these before changing anything

- **[`docs/BLANKS.md`](docs/BLANKS.md)** — what the site is honestly missing and
  where to fill it in. Contact details are done; pricing is deliberately
  quote-only. What remains is proof awaiting permission, and it shows as marked
  gaps on the pages rather than hidden.
- **[`FORMS.md`](FORMS.md)** — every form is built and staged. One constant
  turns them all on.
- **[`docs/DESIGN.md`](docs/DESIGN.md)** — the palette is canon and Clay has a
  contrast constraint. Read it before using Clay for text.

## The rules this build was held to

Trust stage 2 — proposed, approved by Leon, then acted on. Nothing bought
(rule 8). Nothing sent, published or deployed (rule 9). Nothing deleted
(rule 10). Nothing guessed — the six answers behind this site came from an
interview with Leon, and what he did not answer is a marked blank rather than
an invention (rule 11). Client work appears only with permission (rule 16).
