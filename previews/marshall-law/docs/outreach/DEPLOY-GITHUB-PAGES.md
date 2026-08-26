# Publishing the preview on GitHub Pages

Leon chose GitHub Pages over Cloudflare on 2026-08-26, accepting that the
preview will be publicly reachable. This is how it gets done, and the one thing
that has to be checked first.

## Read this before anything else

**It cannot go on `K1ngDamus/the-company`.** GitHub Pages serves **one site per
repository**, and that repository's Pages is already serving the live company
site at frontporchbuilds.com — the Deploy workflow has run ten times, most
recently on 2026-08-25. Publishing the preview there would take the company
site down.

So the preview gets **its own repository**, and the company site is never
touched.

## What Leon has to do by hand

Two steps. Both one-time, both under a minute.

### 1. Create an empty public repository

[github.com/new](https://github.com/new) — name it **`fpc-preview-mlp`**.
Public. **No** README, **no** .gitignore, **no** licence — it must be empty.

> This step cannot be automated from the Claude session. Creating a repository
> returns `403 Resource not accessible by integration` — a GitHub App token is
> not permitted to. It is the same class of limit this account already hit when
> a workflow could not create its own Pages site (see the comment in
> `.github/workflows/deploy.yml`).

### 2. Publish, then switch Pages on

From `previews/marshall-law/`:

```bash
npm run deploy:pages
```

Then: repo → **Settings → Pages** → Source: **Deploy from a branch** →
Branch: **main** → folder: **/ (root)** → **Save**.

The link goes live a minute or two later:

```
https://k1ngdamus.github.io/fpc-preview-mlp/
```

**That is the URL for the email.** Paste it in place of `[ PREVIEW LINK ]`.

Re-running `npm run deploy:pages` republishes; the Pages switch stays set.

## Why the build has to know the repo name

A project Pages site is served from `/<repo>/`, not from the root. Every
absolute link in the preview — `/about/`, `/styles.css`, the fonts — would 404
there.

`BASE_PATH` handles it: one post-processing pass in `build.mjs` rewrites every
root-relative `href`/`src`. It is done in one place rather than by threading a
helper through ~250 call sites, because a helper is something a future edit can
forget and a build step is not. Absolute URLs, `mailto:`, `tel:` and bare
`#anchors` are left alone, and so are the canonical and sitemap URLs, which
point at her real domain and must never carry a base path.

The deploy script sets it for you. Verified by serving the mounted build under
`/fpc-preview-mlp/` in a real browser: all eight routes load, the stylesheet
and both self-hosted fonts resolve, the watermark is fixed on every page, and
navigation works from a nested path.

`.nojekyll` is written too — without it Pages runs Jekyll and silently drops
files and directories whose names begin with an underscore.

## What protects it, and what does not

**Holds on GitHub Pages:**

- `<meta name="robots" content="noindex, nofollow">` on every page
- `robots.txt` disallowing everything
- The Front Porch watermark on every page and every exported PDF
- The "Not a live site" line in every footer

**Does NOT hold on GitHub Pages:** the `_headers` file. Cloudflare Pages reads
it and sends `X-Robots-Tag` on every response; GitHub Pages ignores it and
cannot send custom headers at all. In practice that only costs the header-level
noindex on the non-HTML assets — the meta tag and robots.txt still cover every
page. It is written here so nobody assumes a protection that is not there.

**And the honest limitation:** a public repository is browsable. Anyone who
finds `K1ngDamus/fpc-preview-mlp` can reach the preview, and the repo name is
visible on the account's profile. The name avoids saying "Marshall Law" out
loud, but this is genuinely public rather than merely unlisted. That was the
trade Leon accepted; `DEPLOY-CLOUDFLARE.md` is still there if it should be
revisited.

## Taking it down

Delete the repository, or set Pages Source to **None**. Worth doing once she
has decided either way.
