# The private link — options, and what each one actually gives you

The email needs a link she can tap. There isn't one yet, on purpose: putting
the preview online is a **deploy**, and nothing has been deployed, published or
paid for. That is Leon's call.

Here is the honest comparison. All three are free.

| | How private | Effort | Catch |
|---|---|---|---|
| **Cloudflare Pages + Access** | Genuinely private — she gets a one-time code by email to open it | ~15 min, one-off | She has to enter a code. Some people find that reassuring; some find it friction |
| **Cloudflare Pages, unlisted URL** ⭐ | Obscure, not secret | ~10 min | Anyone with the URL can open it. Already `noindex` + `robots` disallow, so it will not be found by search |
| **GitHub Pages on this repo** | **Not private at all** | ~5 min | This repo is public, so the preview would be too. Do not use this for an unsigned client |

**Recommendation: Cloudflare Pages with an unlisted URL.** She is being asked
to look at something in her own time, probably on her phone, probably between
other things. A login gate is the most likely reason she never opens it. The
watermark, the `noindex`, the `robots.txt` disallow and the "Not a live site"
footer already do the protecting; the URL only needs to be unguessable, and it
is only ever in her inbox.

Use **Access** instead if it should be genuinely sealed and she is fine with
needing a code.

## What is needed to set it up

Just a decision on which option. It costs nothing and takes minutes.

Two things that will not happen without Leon saying so explicitly, because both
are outward-facing and hard to undo:

- **Deploying anything.** No preview goes online until an option is picked.
- **Emailing her.** The draft is a draft. Leon sends it, nobody else.

## Also still outstanding

- **Her photo.** Permission is on for the preview
  (`FLAGS.headshotPreviewUse`), but the image file cannot be obtained from
  here. Drop it at `previews/marshall-law/assets/keyanna-marshall.jpg` and
  rebuild, and it appears everywhere it should. Right now those spots show a
  marked placeholder — honest, but her face is most of what makes this land.
- **Her Google review link.** The QR on the review card currently points at her
  website and is flagged "Sample" on its face. Her real review link comes from
  her Google Business Profile under "Ask for reviews". Ten seconds of her time,
  and the card becomes the finished article.
