# Front Porch Collective — the company website

The front porch of the whole operation: every service findable, understandable,
and easy to ask for. Built for `frontporchco.com`.

**Status: ready to publish, one manual switch away.** Leon approved deployment
on 2026-08-24 and made the repository public, which clears the way for GitHub
Pages. The Pages site itself has to be created once by hand — a workflow token
is not allowed to do it — and then the deploy runs on every push. The build it
publishes is noindexed until it is served from `frontporchco.com`, and one gate
stands in front of that: the forms do not send yet.
**[`DEPLOY.md`](DEPLOY.md)** is the whole list. Nothing has been bought.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built site

npm run check    # build + audit + contrast + mounted rebuild — what CI runs
```

`check:mounted` rebuilds the site nested under a path, the way a GitHub Pages
project URL serves it, and re-audits. It is the only check that catches an
internal link written as a bare `"/contact"` instead of `link("/contact")`.

## The checks

CI runs on every push and every PR into `main` (`.github/workflows/ci.yml`).
Both checks also run locally, and both exit non-zero on a finding.

**`npm run audit`** — reads the built HTML in `dist/` and fails on: a page
without exactly one `<h1>`, a meta description outside 50–170 characters, a
missing canonical, invalid JSON-LD, a dead internal link or anchor, an `<svg>`
with no accessible name or `aria-hidden`, an unlabelled input, or a page missing
the FPC mark from its header or footer.

**`npm run contrast`** — checks the palette against the WCAG AA floor. It
**parses the tokens out of `src/styles/global.css`** rather than repeating them,
so it cannot drift into false assurance; if a token is renamed it fails loudly
instead of quietly passing a stale list.

Both were verified by breaking them on purpose — a dimmed token, a renamed
token, a dead link, and an unlabelled input each produced the expected failure
and a non-zero exit.

**Not covered by CI:** the browser-rendered checks — console errors, horizontal
overflow, and tap-target sizes — which need Playwright and a Chromium download.
Those have been run by hand at 1440px and 390px. Say the word if they should
become a job too.

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

Plus `sitemap.xml` and `robots.txt`, both generated. A build served anywhere
other than `frontporchco.com` disallows crawlers outright and carries
`noindex` on every page, so a preview can never stand in for the real site.

## Where things live

```
src/data/site.ts      Every site-wide fact — contact, prices, services, counties
src/data/forms.ts     Form shapes, defined once so pages cannot drift
src/lib/schema.ts     Structured-data builders (Organization, LocalBusiness…)
src/components/       Hero, QuoteForm, Faq, Steps, ProofCard, Blank, Mark…
src/styles/global.css The design system — canon palette, type, components
public/brand/         The FPC mark, copied from HQ branding/
public/fonts/         Self-hosted Playfair Display + Jost
astro.config.mjs      Where the build will be served from — read from the env
.github/workflows/    CI on every PR; Deploy on every push to main
```

Nothing outside `astro.config.mjs` may hard-code the site's address. Use
`link()` from `src/data/site.ts` for in-site links and `abs()` for the absolute
URLs that go in canonicals, the sitemap and structured data — those are what
make the same commit correct at either address.

**`src/data/site.ts` is the one file to edit for most changes.** Contact
details, prices, service copy and county lists all live there, and every page
reads from it.

## Read these before changing anything

- **[`docs/BLANKS.md`](docs/BLANKS.md)** — what the site is honestly missing and
  where to fill it in. Contact details are done; pricing is deliberately
  quote-only. What remains is proof awaiting permission, and it shows as marked
  gaps on the pages rather than hidden.
- **[`DEPLOY.md`](DEPLOY.md)** — what publishing needs, what is already
  wired, and the two gates only Leon can open.
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
