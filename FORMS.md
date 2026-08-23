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

## Turning them on

One line, one file. In `src/data/site.ts`:

```ts
export const FORM_ENDPOINT: string | null = 'https://your-handler.example/submit';
```

That single change:

- points every form's `action` at the handler,
- enables every submit button,
- removes every staging notice,
- switches the privacy page from "nothing is collected" to the normal policy.

Nothing else needs editing. Rebuild and the whole site is live-consistent.

## What Leon has to decide first

1. **Where submissions go** — an email address, a form service, or our own
   endpoint. Each costs something or nothing; none of it gets chosen here.
2. **Whether any of it costs money.** Several form services have free tiers
   adequate for this volume. Anything with a price attached is Leon's call
   under rule 8, with options presented rather than a purchase made.
3. **A thank-you destination** — either a `/thanks` page (one more page load)
   or an in-place confirmation (no page load, better for conversion). The
   second is recommended and is not built yet because it depends on the
   handler chosen.

## Checkout, separately

`/agent-templates` has a real buy button in a disabled state. It turns on by
setting `CHECKOUT_ENABLED = true` in `src/pages/agent-templates.astro` — but
only once a payment provider actually exists, which is a spending decision and
therefore Leon's alone. The price is also still blank; see `docs/BLANKS.md`.

## Spam

Every form carries a honeypot field that is invisible to people and inviting to
bots. Whatever handler gets chosen should drop submissions where `_gotcha` is
non-empty.
