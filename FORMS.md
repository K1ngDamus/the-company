# Forms — wired to Web3Forms, waiting on one key

**Every form is built and wired. None of them send yet**, because the access
key is not set. Leon chose Web3Forms on 2026-08-25; everything downstream of
that choice is done and tested.

**To turn the whole site on:** get a key at web3forms.com (enter the address
the enquiries should reach — they mail the key back), then in
`src/data/site.ts`:

```ts
export const FORMS = {
  endpoint: 'https://api.web3forms.com/submit' as string | null,
  accessKey: 'the-key-they-emailed-you' as string | null,   // <- this line
  ...
```

Push it. The deploy runs itself and every form on the site is live.

## Current state

| Form | Where | Fields | Status |
|---|---|---|---|
| General request | `/`, `/contact` | 2 choice + name + email + optional detail | Staged |
| Website project | `/websites` | 3 choice + name + email + detail | Staged |
| App project | `/apps` | 3 choice + name + email + detail | Staged |
| TV mounting quote | `/tv-mounting` + 5 county pages | 4 choice + ZIP + name + phone | Staged |
| Marketing enquiry | `/marketing` | 3 choice + name + email + detail | Staged |
| "From the Porch" email capture | every page | email | Staged |
| Agent template checkout | `/agent-templates` | — | Button built, deliberately disabled |

While staged, each form renders a visible notice saying nothing is sending.
Every notice disappears the moment the access key is set — they are driven by
the same constant, not written page by page.

## How a submission actually flows

The forms **submit in place**. JavaScript intercepts the submit, POSTs with
`fetch`, and swaps the form for a confirmation panel — no page load, and the
visitor never lands on a third party's thank-you screen.

With JavaScript off, the browser POSTs natively to the same endpoint and the
provider's own page handles it. Slower and less pleasant, but it works.

Three states are built and tested:

| State | What the visitor sees |
|---|---|
| Sending | Button disabled, label reads "Sending…" |
| Success | Form replaced by a confirmation panel; focus moves to it |
| Failure | An error naming the problem, the form still filled in, the button live again |

**The failure state matters more than it looks.** A form that fails silently
loses the enquiry and nobody finds out — not the visitor, not us. It never
fails silently.

Every path is driven in a real browser against a stubbed Web3Forms endpoint —
success, server failure, and a tripped honeypot, on both the quote form and the
email capture. Twenty assertions, all passing. The harness is throwaway and
lives outside the repo, so nothing here gains a dependency.

That testing has now caught four real bugs that reading did not: `.form {
display: grid }` overriding the browser's `[hidden]` rule so the form stayed on
screen beside the success panel; focus set before layout, which silently does
nothing; a honeypot selector left pointing at a field name that no longer
existed; and the `.value` / `.checked` trap described under **Spam** below.

## What that one line changes

Everything that should, all at once, because it is all driven by the same
constant rather than by hand:

- every submit button enables
- every staging notice disappears (11 pages carry one today)
- the `access_key`, `subject` and `from_name` fields start being sent
- `/privacy` gains a "Who else sees it" section naming Web3Forms as the
  processor, and drops "nothing is collected"

Nothing else needs editing, and nothing is half-on in between: the forms go
live only when there is both an endpoint and a key.

## What Leon should check the first time

Two minutes, and it is worth doing rather than assuming — the API contract
below could not be verified from the build environment, which blocks
`api.web3forms.com` and `docs.web3forms.com` outright.

1. Submit a real enquiry from `/tv-mounting` on a phone.
2. Confirm the confirmation panel appears **in place**, with no page load and
   no Web3Forms branding.
3. Confirm the email arrives, with a subject reading like
   "TV mounting — Fulton County".
4. In the Web3Forms dashboard, restrict the key to the site's domain. The key
   ships in the page markup by design, so anyone can read it — the domain
   restriction is what stops it being used from anywhere else.

If it fails, it will say so on screen rather than silently: the failure state
is built and tested.

## What is actually sent

| Field | Value | Why |
|---|---|---|
| `access_key` | the key | Web3Forms requires it |
| `subject` | "TV mounting — Fulton County", "Website project", … | so a phone notification is readable at a glance |
| `from_name` | Front Porch Collective | names the sender in the notification |
| `service` | the routing slug | which page and county the request came from |
| `botcheck` | absent unless a bot ticks it | honeypot, Web3Forms' own name for it |
| the answers | whatever the visitor chose and typed | — |

## What the provider has to support

The in-place submit is a cross-origin POST, so the endpoint must:

1. **Allow cross-origin requests** from the site's domain (CORS).
2. **Accept `multipart/form-data`** — the body is a `FormData`.
3. **Return a 2xx on success.** The request sends `Accept: application/json`,
   which most providers read as "respond, don't redirect".

Any provider that fails those still works via the no-JavaScript path, but the
visitor gets a page load and someone else's thank-you screen.

## Chosen: Web3Forms (2026-08-25)

Host-independent, which mattered: the site is on a GitHub Pages URL today and
moves to frontporchco.com later, and a host-coupled provider would have had to
be decided twice. The free tier is the most generous of the shortlist and the
key arrives by email rather than behind a full account.

The alternatives considered, kept for the record — and if Web3Forms ever has
to be swapped, the only things that change are the endpoint, the `access_key`
field and the honeypot name, all three of which live in `FORMS` in
`src/data/site.ts`.

**Check the current free-tier limits at signup rather than trusting a list —
they change, and the ones below are from a stale snapshot.**

| Route | Shape | Watch for |
|---|---|---|
| **Formspree** | Hosted, host-independent. AJAX + CORS supported. | Free tier is small; a busy month can hit it |
| **Web3Forms** | Hosted, access key by email rather than a full account | Newer and less established than the others |
| **Basin** | Hosted, host-independent | — |
| **FormSubmit** | No account at all — POST to an address-derived endpoint | Puts the email in the markup unless the alias form is used |
| **Netlify Forms** | Built into the host | **Couples the decision to hosting on Netlify** |
| **Cloudflare Worker** | Our own endpoint, most control | Needs a Worker *and* an email-sending service; most work |

**Two things worth knowing before picking.**

**The choice is partly downstream of hosting.** Netlify Forms and a Cloudflare
Worker are only options if the site is hosted there. A host-independent
provider can be chosen now and kept through any hosting decision; the
host-coupled ones cannot.

**Every hosted provider means enquiries pass through a third party.** Their
servers see names, emails, phone numbers and job details before we do. That is
normal and usually fine, but it is a real disclosure, so `/privacy` names the
processor as soon as the key is set — and it is one more reason for the legal
review to happen sooner rather than later.

## What is still needed

1. **The access key.** Registering accepts terms on the company's behalf, so
   it is Leon's to do, not this house's (rule 8). Everything else is done.
2. **The domain restriction** on the key, once it exists — see the check above.
3. **The legal review** of `/privacy`, which now names a third-party processor
   and therefore says more than it used to.

## Checkout, separately

`/agent-templates` has a real buy button in a disabled state. It turns on by
setting `CHECKOUT_ENABLED = true` in `src/pages/agent-templates.astro` — but
only once a payment provider actually exists, which is a spending decision and
therefore Leon's alone.

The kit's price is not set yet either, so the page reads "Price announced when
the shelf opens" rather than showing a figure. Unlike the services — which are
quote-only by policy — a digital download does need a fixed number before it can
sell. Set it in `PRICES['agent-templates']`.

## Spam

Every form carries a honeypot: a checkbox named `botcheck`, hidden from people
(`aria-hidden`, unfocusable, visually hidden) and inviting to bots. Web3Forms
drops any submission where it is set, and the client-side script quietly shows
a bot the success panel rather than telling it it was caught.

Two things about it are load-bearing and easy to break:

- **The check is `.checked`, not `.value`.** An unchecked checkbox still
  reports a value of `"on"`, so testing `.value` would treat every real
  submission as a bot — swallowing the enquiry and showing the visitor a fake
  confirmation. That bug was written and caught in testing; do not reintroduce
  it.
- **The selector matches the attributes, not the name.** The name belongs to
  whichever provider is connected; matching on it means a provider change
  silently mutes the trap. `scripts/audit.mjs` skips honeypots by the same
  attribute pattern for the same reason.
