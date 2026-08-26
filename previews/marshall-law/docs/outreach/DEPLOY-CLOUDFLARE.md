# Putting the preview on an unlisted URL

**This has to be run by you, not from the Claude session.** That environment's
egress proxy denies `api.cloudflare.com` outright — it answers `403` to the
connection before any request is made — so there is no token or permission that
would let it deploy. Nothing is broken; it simply cannot reach Cloudflare.

From your machine it is one command and about two minutes.

## What you need

- A Cloudflare account (free tier is fine — this costs nothing)
- Node installed
- This repo checked out

## Do this

```bash
cd previews/marshall-law
npm run deploy:preview
```

First run opens a browser to log in to Cloudflare. After that, the same command
republishes whenever the preview changes.

It prints a URL like:

```
https://mlp-2s6xgqp2a3.pages.dev
```

**That is the link for the email.** Paste it in place of `[ PREVIEW LINK ]`.

## Why the project name looks like keyboard mash

`mlp-2s6xgqp2a3`, not `marshall-law-preview`.

The entire privacy model of an unlisted URL is that it is unguessable. Anyone
can try `marshall-law-preview.pages.dev` and find it; nobody is going to guess
the other one. Set `CF_PROJECT` if you want a different one, but keep it
meaningless.

## What protects it

Four things, and they hold whether or not anyone finds the URL:

1. **`X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`** on every
   response, from the `_headers` file the build writes. This covers file types
   that cannot carry a meta tag, and applies even to a direct link to an asset.
2. **`<meta name="robots" content="noindex, nofollow">`** on every page.
3. **`robots.txt` disallowing everything.**
4. **The Front Porch watermark and the "Not a live site" line** on every page
   and every exported PDF.

So the realistic worst case — someone stumbles on the URL — is that they see an
obviously watermarked preview marked as not live. Not nothing, but not a leak
either.

## Before you send the link

1. Open it **on a phone**, not just a laptop. Tap the call button and confirm it
   offers to dial (762) 266-0767.
2. Check the watermark is on every page.
3. Check the footer reads "Not a live site."
4. Open `/start/` and confirm the form fills in and the "gather my answers"
   button works.

## Taking it down

```bash
npx wrangler pages project delete mlp-2s6xgqp2a3
```

Worth doing once she has decided either way.

## If you would rather it be genuinely sealed

Add Cloudflare Access in front of it (still free): Cloudflare dashboard →
Zero Trust → Access → Applications → Add an application → Self-hosted, pointed
at the `.pages.dev` hostname, with a policy allowing only her email address.
She then gets a one-time code by email to open it.

That is genuinely private rather than merely obscure. The trade-off is real,
though: a login step is the single most likely reason she never opens it at
all. For a first approach to someone who has not asked for this, obscure is
usually the better bet.

## What I could have done from here, and why I did not

**GitHub Pages** is reachable from the Claude session, so it could have been
published immediately. It was not, because **this repository is public** — the
preview would be public with it, discoverable by anyone browsing the repo. For
an unsigned client that is the wrong trade, and it is your call to make, not
one to make quietly. Say the word if you want it anyway.
