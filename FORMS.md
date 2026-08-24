# Forms — what is built, and what connecting one costs

**Every form on this site is built and staged. None of them send.** That is
deliberate: rule 9 says nothing goes out externally without Leon's explicit
approval, and rule 8 says nothing gets bought. This file is what to do when
Leon says go.

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
That notice disappears automatically the moment an endpoint exists — it is
driven by the same constant, not by hand.

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

Both paths were verified against a local endpoint returning 200 and 500, not
just read. That testing caught two real bugs: `.form { display: grid }` was
overriding the browser's `[hidden]` rule so the form stayed on screen next to
the success panel, and focus was being set before the panel was laid out and so
did nothing.

## Turning them on

One line, one file. In `src/data/site.ts`:

```ts
export const FORM_ENDPOINT: string | null = 'https://your-handler.example/submit';
```

That single change points every form at the handler, enables every submit
button, removes every staging notice, and switches the privacy page from
"nothing is collected" to the normal policy. Rebuild and the whole site is
live-consistent.

## What the provider has to support

The in-place submit is a cross-origin POST, so the endpoint must:

1. **Allow cross-origin requests** from the site's domain (CORS).
2. **Accept `multipart/form-data`** — the body is a `FormData`.
3. **Return a 2xx on success.** The request sends `Accept: application/json`,
   which most providers read as "respond, don't redirect".

Any provider that fails those still works via the no-JavaScript path, but the
visitor gets a page load and someone else's thank-you screen.

## Choosing one — Leon's call, because it is his account and any spend is his

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

**Every hosted provider means enquiries pass through a third party.** That is
normal and usually fine, but it is a real disclosure: their servers see names,
emails, phone numbers and job details before we do. `/privacy` currently says
nothing is collected because nothing is. Once a handler is connected, that page
should name the processor — which is one more reason for the legal review to
happen before deployment rather than after.

## What is still needed

1. **Leon picks the route** and creates the account. Creating one accepts terms
   on the company's behalf, so it is not something this house does for him
   (rule 8).
2. **He pastes the endpoint** into `FORM_ENDPOINT`. That is the whole
   integration — everything else is built and tested.
3. **Spam filtering:** every form carries a honeypot field named `_gotcha`,
   invisible to people and inviting to bots. Whatever provider is chosen should
   drop submissions where it is non-empty. Most do this by that exact name.
4. **The privacy page** gets the processor named, as above.

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

Every form carries a honeypot field that is invisible to people and inviting to
bots. Whatever handler gets chosen should drop submissions where `_gotcha` is
non-empty.
