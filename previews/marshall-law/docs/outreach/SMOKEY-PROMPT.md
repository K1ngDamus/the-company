# Handoff — Smokey drafts the email to Ms. Marshall

Everything is ready. Copy the block below into Smokey's session.

**State as of 2026-08-26:** the preview is BUILT, gated and LIVE at
https://k1ngdamus.github.io/fpc-preview-mlp/ — 10 pages, watermarked, noindex,
all four gates green. The email draft is complete with that link in it.

**Send version A: the link, no attachments.** Smokey's call and the right one.
Three PDFs at ~3MB in a cold email from an unknown sender is a spam-filter
signal, and the best email in the world is worth nothing in a junk folder. The
form and the review card are things Ms. Marshall wants *after* she is
interested; leading with them asks for work before she has agreed to anything.
Version B (with attachments) exists for the follow-up or the meeting.

Two things are still missing from Ms. Marshall herself — her photo file and her
Google review link — and both are handled honestly in the copy rather than
blocking the send.

---

```
Smokey — assemble the Marshall Law outreach email for Leon to send.

CONTEXT
Leon met Keyanna A. Marshall (Marshall Law Practice, LLC — criminal defense,
Columbus GA) about representation for a friend. He then looked at her website
and card, saw the state of it, and had a full preview site built on spec.

This is the first touch. It is from Leon personally, to one person, and it is a
real business proposal rather than a campaign. She has NOT signed, and nothing
has been sent to her yet.

YOUR JOB
Hand Leon a finished email he can send from his own address: subject, body, and
three attachments. Do NOT send it. Do NOT contact her.

SOURCE MATERIAL — all under previews/marshall-law/
  docs/outreach/EMAIL-DRAFT.md          both versions, subject lines, rationale
  docs/outreach/DEPLOY-GITHUB-PAGES.md  how the live preview is published

  For the FOLLOW-UP only, not this email:
  outbox/Marshall-Law-Design-Preview.pdf         look book, 9 pages
  outbox/Marshall-Law-Getting-Started-FORM.pdf   the questions, 9 pages
  outbox/Marshall-Law-Review-Card.pdf            the QR review card, 2 pages

Regenerate those with `npm run outbox` when they are needed. Under a minute,
always safe.

ASSEMBLE IT LIKE THIS
1. Subject: "Following up from the other day — I built you something"
   unless Leon has picked one of the alternatives in EMAIL-DRAFT.md.
2. Body: the VERSION A block in EMAIL-DRAFT.md, VERBATIM. It is already in
   Leon's voice, built from his own opening line. Do not rewrite it into
   marketing copy and do not "improve" it.
3. NO ATTACHMENTS. Version A carries none, on purpose. Do not helpfully add
   the PDFs back — that is the one change most likely to put this email in her
   junk folder. Version B exists for the follow-up.
4. The preview link is live and already in the body:
      https://k1ngdamus.github.io/fpc-preview-mlp/
   Open it before you hand anything over. If it 404s, STOP and tell Leon —
   never send an email pointing at a dead link.
5. Send as plain text, not HTML. One recipient: Keyanna@themarshall-law.com.
   No BCC, no mail-merge, no tracking pixel, and paste the full URL — a link
   shortener is itself a spam signal. A designed email from a stranger reads as
   marketing; a plain one reads as a person.

TWO THINGS ARE KNOWINGLY INCOMPLETE — leave both exactly as written
  • Her photo. The preview shows a labelled "[awaiting client]" frame where her
    headshot goes. We have permission to use it in the preview but not the
    file. This is not a defect to apologise for or hide.
  • Her Google review link. The review card's QR still points at her website
    until she supplies it. Version A does not attach the card and does not
    claim it is finished — it says the card exists, that it is hers either way,
    and that Leon will bring it. Do NOT quietly drop that paragraph: it is what
    turns a giveaway into a reason to meet.

HARD RULES — these are the ones that matter
- Nothing goes to Ms. Marshall without Leon's explicit go-ahead on the final
  text.
- Do not add a price, package, retainer figure, or discount. Price is a
  conversation after she wants the thing, and a reason to say no before then.
- Do not add any claim about Ms. Marshall's record, results, experience, or how
  long she has practised. None of it is verified, and a false claim on a
  lawyer's marketing is a bar problem rather than a typo.
- Do not add testimonials or reviews. There are none we are permitted to use.
- Do not promise to write Ms. Marshall's biography or her About page. We do not
  write a lawyer's About page for them; she provides it if she goes ahead.
- Do not soften or cut the paragraph explaining what on the site is true and
  what is marked blank. For a lawyer, that paragraph is the whole basis of
  trust, and it is the reason this email works at all.
- Do not remove the review-card giveaway or attach conditions to it.
- Keep every number checkable: her 5.0 rating and 1 review, the competitors'
  74-282, the Avvo ZIP mismatch. Add no others.
- Refer to her as Ms. Marshall in the third person; the body already addresses
  her directly as "you".
- Every attachment is watermarked and every page says "Not a live site." Never
  produce clean unwatermarked versions.

WHEN YOU ARE DONE, GIVE LEON
  - the final subject and body, ready to paste — version A, no attachments
  - confirmation the preview link loads
  - one line on anything you changed, and why
  - a reminder that her photo and her Google review link are still outstanding

If anything is ambiguous, ask Leon before assembling. An email to a prospective
client is not the place to guess.
```

---

## After she replies

- **Her photo** → drop it at `previews/marshall-law/assets/keyanna-marshall.jpg`
  and rebuild. Auto-detected; no path to edit. Measured CLS 0.
- **Her Google review link** → set `REVIEW.link` in `data/client.mjs`. The QR
  re-encodes and the "Sample" flag disappears on the next build.
- **Her form answers** → into `data/client.mjs`; the `[awaiting client]`
  placeholders become content.
- **Republish the preview** → `npm run deploy:pages` from
  `previews/marshall-law/`. Nothing to touch in GitHub settings.
