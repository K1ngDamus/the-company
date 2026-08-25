# Deploying the site

Leon approved deployment on 2026-08-24. This is everything that could be built
without an account or a card, plus the short list of things that can only be
done by the person who owns them.

**One gate is left.** It is not optional.

---

## The gate — the forms do not send yet

`FORM_ENDPOINT` in `src/data/site.ts` is still `null`. That is correct for a
staged site: every form shows a visible "Staged, not sending" notice and the
submit button is disabled.

On a *public* site that is worse than having no site. Someone finds the TV
mounting page from a search, decides to book, and the only button on the page
is greyed out with a note explaining it does not work. They do not phone
instead — they leave.

So: **do not point frontporchbuilds.com at this until the endpoint is set.**
Setting it is one line and one free account. `FORMS.md` has the options, the
cost of each, and what changes when it is connected.

A preview at the GitHub Pages project URL is fine with the forms staged — it is
noindexed, nobody arrives there by accident, and the notice tells the truth.

## Settled — the repository is public

`K1ngDamus/the-company` was private, and GitHub Pages will not serve a private
repository on a free plan. Leon made it public on 2026-08-24, which is the free
route and the one I would have taken. GitHub Pro and hosting the build
elsewhere (Cloudflare Pages, Netlify) were the alternatives; neither was
needed, and no account was created and nothing was spent.

Before that switch I scanned the repository: no keys, no credentials, no
`.env`, nothing but site source, docs and build scripts across 64 tracked
files. The public email and phone were already published on the site by
design. What is now readable that is worth knowing: `FORMS.md`,
`docs/BLANKS.md` and `dispatch-to-hq/` all describe what is unfinished.

---

## What is already done

The repository can now deploy itself the moment Pages is switched on.

- **`.github/workflows/deploy.yml`** — builds, re-runs the audit and contrast
  gates against the exact artifact about to go live, and publishes to Pages. It
  runs on every push to `main` and on demand from the Actions tab.
- **The address is no longer hard-coded.** `astro.config.mjs` reads it from the
  environment and the workflow fills it from the Pages settings, so the same
  commit is correct at `frontporchbuilds.com` *or* at the project URL
  `https://k1ngdamus.github.io/the-company/`, with no file to edit between.
- **A preview cannot be mistaken for the site.** Any build not served from
  `frontporchbuilds.com` emits `noindex, nofollow` on every page and a
  `robots.txt` that disallows everything. Google will not index the preview,
  so it can never compete with the real site.
- **CI now proves both addresses work.** `npm run check:mounted` rebuilds the
  site nested under a path and re-audits it. An internal link written as a bare
  `"/contact"` instead of `link("/contact")` breaks only when mounted under a
  path, so this is the check that catches it. It is wired into CI.

The canonical build is byte-for-byte identical to what `main` produced before
these changes — the site itself did not change, only where it can be served.

---

## The steps, in order

### 1. Switch Pages on — once, by hand

Settings → Pages → Build and deployment → Source: **GitHub Actions**.

This cannot be automated. The workflow was given `enablement: true`, which is
supposed to create the Pages site on its first run; it failed with *"Create
Pages site failed. Error: Resource not accessible by integration"*. A
workflow's own token is not allowed to create a Pages site no matter what
permissions the job declares. Creating it is a one-time click; every run after
that finds it on its own.

### 2. Publish

Actions → Deploy → Run workflow. Or push anything to `main`.

It lands at `https://k1ngdamus.github.io/the-company/`. Open it on a phone,
not just a laptop — most of the TV mounting traffic will be phones.

### 3. Set the form endpoint

`FORMS.md`, then one line in `src/data/site.ts`. Push it. Deploy runs again on
its own. Submit a real test enquiry and confirm it lands in your inbox.

### 4. Only then, the domain

Leon settled on `frontporchbuilds.com` on 2026-08-25, after the earlier
candidates turned out to be taken. Find where it is registered and where its
DNS is managed; that is where the records below go.

The address named at the founding interview on 2026-08-23 was never the
company's — it belongs to someone else, confirmed by Leon on 2026-08-25. It has
been taken out of this repository so nothing here claims a domain the company
does not hold. `frontporchbuilds.com` is the only address the site answers to.

Settings → Pages → Custom domain → `frontporchbuilds.com`. Then nine records
at the DNS host — the domain is at **GoDaddy**, so: sign in → Domain Portfolio
→ `frontporchbuilds.com` → **DNS** → Manage DNS.

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `k1ngdamus.github.io` |

Read out of GitHub's own documentation source
(`github/docs`, `content/pages/…/managing-a-custom-domain-for-your-github-pages-site.md`,
commit `0dddeeb`, 2026-08-25) rather than from memory. This environment blocks
`docs.github.com`, the `/meta` API endpoint and public DNS resolvers, so the
repository was the one route to an authoritative answer. If these ever stop
working, that file is where to re-read them.

**Three GoDaddy-specific traps.**

GoDaddy ships every new domain with a **parked `A` record on `@`** pointing at
its own holding page. That is what answers today. It has to go, or be edited
into the first record above — four `A` records on `@` is correct, five with a
parking address is not.

GoDaddy also ships a **default `www` CNAME** pointing back at `@`. Change its
value to `k1ngdamus.github.io`; do not add a second one alongside it.

And if **Domain Forwarding** is switched on anywhere in that domain's settings,
turn it off. Forwarding writes its own records and quietly overrides these.

**Then run the deploy again — this step is not optional and nothing warns you
about it.** What is published right now was built for the project URL: every
link, stylesheet and font path is prefixed `/the-company/`, and every page
carries `noindex`. Pages will happily serve that same artifact at the new
address, where the prefixed paths lead nowhere. The domain would resolve, the
certificate would issue, and the site would be broken.

Actions → Deploy → Run workflow, after GitHub reports the domain configured.
That build asks Pages where it lives, gets the custom domain, drops the prefix,
restores the indexable `robots.txt` and points the canonicals at
`frontporchbuilds.com`. No file in the repo changes.

**A note on `www`.** Set the custom domain to the bare `frontporchbuilds.com`,
not `www.frontporchbuilds.com`. The site's canonical address has no `www`, and
a build served from `www` is treated as a preview — `noindex` on all seventeen
pages and a `robots.txt` that disallows everything. It would look perfectly
fine and be invisible to Google. Keep the `www` CNAME anyway: with the apex as
the custom domain, GitHub redirects `www` to it.

### 5. Then the things that are not deployment

- **Get privacy and terms in front of a lawyer.** They are written in plain
  language and accurate to what the site actually does, but nobody qualified
  has read them. `docs/BLANKS.md`, row 16.
- **Google Business Profile**, once the site is live at its real address, is
  what actually moves local TV mounting searches — more than anything left in
  this repo.
- **The proof still awaiting permission** — Chloe Girls, the Atlanta
  Experience links, testimonials. `docs/BLANKS.md`.

---

## If you deploy somewhere other than Pages

The build is static and has no server requirement. Any host needs:

- Build command `npm run build`, output directory `dist`, Node 22.
- `SITE_URL` set to the address it will serve from. Leave `BASE_PATH` unset
  unless the site is nested under a path.

Set `SITE_URL` to `https://frontporchbuilds.com` only when that is genuinely where
it is being served, since that is the switch that makes a build indexable.
