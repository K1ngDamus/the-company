# Prompt for Smokey

Copy everything in the block below into Smokey's session.

---

```
Smokey — assembling the Marshall Law outreach for Leon to send.

CONTEXT
Leon met Keyanna A. Marshall (Marshall Law Practice, LLC — criminal defense,
Columbus GA) about representation for a friend. He then looked at her website
and card, saw the state of it, and had a full preview site built on spec. This
is the email that goes to her. It is the first touch, it is from Leon
personally, and it is a real business proposal, not a campaign.

She has NOT signed. Nothing has been sent to her yet.

YOUR JOB
Assemble one email, ready for Leon to send from his own address. Do not send
it. Do not contact her. Hand Leon a finished draft and the attachments.

SOURCE MATERIAL — in previews/marshall-law/
  docs/outreach/EMAIL-DRAFT.md        the body copy, subject lines, rationale
  docs/outreach/PREVIEW-HOSTING.md    the link options and what each one means
  outbox/Marshall-Law-Design-Preview.pdf      look book, 9 pages
  outbox/Marshall-Law-Getting-Started-FORM.pdf    the questions, 9 pages
  outbox/Marshall-Law-Review-Card.pdf         the QR review card, 2 pages
  outbox/shots/                       the raw screenshots, if you need them

If outbox/ is empty, regenerate everything with `npm run outbox`.

BUILD IT LIKE THIS
1. Subject: "Following up from the other day — I built you something"
   unless Leon has picked one of the alternatives in EMAIL-DRAFT.md.
2. Body: the plain-text block in EMAIL-DRAFT.md, verbatim. It is already in
   Leon's voice, from his own words. Do not rewrite it into marketing copy.
3. Attach all three PDFs.
4. The preview link is live and already in the draft:
   https://k1ngdamus.github.io/fpc-preview-mlp/
   Open it once and confirm it loads before you attach anything. If it 404s,
   STOP and tell Leon — do not send an email pointing at a dead link.
5. Plain text, not HTML. One recipient. No BCC, no mail-merge, no tracking
   pixel, no link shortener.

HARD RULES — these are the ones that matter
- Nothing goes to Keyanna without Leon's explicit go-ahead on the final text.
- Do not add a price, a package, a retainer figure, or a discount.
- Do not add any claim about Ms. Marshall's record, results, experience, or how
  long she has practised. None of that is verified, and a false claim on a
  lawyer's marketing is a bar problem rather than a typo.
- Do not add testimonials or reviews. There are none we are allowed to use.
- Do not promise to write Ms. Marshall's biography or About page. We do not
  write a lawyer's About page for them; she provides it if she wants to go
  ahead.
- Do not soften or remove the paragraph explaining what is true on the site and
  what is marked blank. For a lawyer, that paragraph is the trust.
- Do not remove the review card giveaway or attach conditions to it.
- Keep every number checkable: Ms. Marshall's 5.0 rating and 1 review, the
  competitors' 74-282, the Avvo ZIP mismatch. Add no others.
- Every attachment is watermarked and every page says "Not a live site."
  Do not produce clean unwatermarked versions.

WHEN YOU ARE DONE
Give Leon:
  - the final subject and body, ready to paste
  - the three attachments, confirmed present and opening correctly
  - one line on anything you changed and why
  - the outstanding items from PREVIEW-HOSTING.md, so he knows what is still
    missing (the link, her photo, her Google review link)

If anything is ambiguous, ask Leon before assembling. An email to a prospective
client is not the place to guess.
```
