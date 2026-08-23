# Design decisions worth knowing

## The palette is canon, and it has one constraint

Ink `#201C1A` · Clay `#B45A38` · Bone `#F4F1EA` · Sand `#ECE3D3`, from
`branding/BRANDING.md` (bible v1.3). **No colors have been added.**

`BRANDING.md` lists Clay for "active states, links". Measured against the
accessibility floor the company holds itself to (WCAG AA, company law 8):

| Pair | Ratio | Verdict |
|---|---|---|
| Clay on Bone | **4.20:1** | Under the 4.5:1 floor for normal-size text |
| Clay on Sand | **3.70:1** | Under it |
| Clay fill with Bone text | 4.20:1 | Under it |
| Clay fill with Ink text | 3.60:1 | Under it |

So Clay is used exactly where it passes and nowhere it does not:

- **Yes:** the dot terminal, section rules, icon accents, focus rings, borders,
  underlines, chip indicators, and display text at 24px and above (the 3:1
  large-text and non-text-contrast thresholds — Clay clears both).
- **No:** body text, small labels, or button fills.

**Buttons are Ink with Bone text (14.98:1)** and carry a Clay dot as the accent.
**Links are Ink with a Clay underline** — color never carries the meaning on its
own, which is the accessible pattern regardless of contrast.

The alternative was inventing a darker clay. That would have been a palette
change, and palette changes belong to Leon by dated amendment (rule 17), not to
a build session. Flagged rather than patched.

### Opacity tokens, measured

| Token | Value | On Bone | On Sand |
|---|---|---|---|
| `--ink-70` | 70% ink | 5.87:1 | 5.53:1 |
| `--ink-muted` | 64% ink | 4.84:1 | 4.61:1 |
| `--bone-70` | 70% bone on ink | 7.91:1 | — |

`--ink-muted` sits at 64% because that is the lowest opacity clearing AA on
**both** grounds. Do not lower it.

## Type

Playfair Display 600 for headlines, Jost 400/500 for UI and body — canon.
Both are **self-hosted** as variable woff2 (latin subset, ~50KB total) rather
than loaded from a font network, so no third party learns who visits the site.

## The mark

Inlined as SVG from the canon paths rather than linked, so it costs no request
and stays crisp at any size. It ships in the header and the footer of every
page, plus the favicon and apple-touch icon — company law, bible v1.3.

Clear space, minimum sizes and the reversed-on-dark rule are all respected: the
reversed mark is used on ink grounds, never the bare ink monogram.

## Build

Astro 7, static output. No client-side framework. The only JavaScript that ships
is a small progressive enhancement that moves focus to the next question after a
radio choice — the forms work fully without it.

Total site weight is under 500KB including fonts and every page.
