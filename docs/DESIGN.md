# Design decisions worth knowing

## The palette is canon — black, gray and red

Amended 2026-08-24 on Leon's order (rule 17). The brand is dark-first. The full
amendment, including what it obliges beyond this site, is in
[`dispatch-to-hq/branding/BRANDING.md`](../dispatch-to-hq/branding/BRANDING.md),
staged for Leon to carry into HQ.

| Token | Hex | Role |
|---|---|---|
| `--coal` | `#0F0F11` | Page ground |
| `--graphite` | `#16161A` | Alternating band |
| `--slate` | `#1A1A1F` | Raised surfaces — cards, form panels |
| `--pitch` | `#0A0A0C` | Footer |
| `--chalk` | `#F4F4F6` | Primary text |
| `--ash` | `#9EA0A8` | Secondary text |
| `--ash-dim` | `#8A8A93` | Tertiary — the dimmest allowed |
| `--signal` | `#FF4D4F` | Accent, focus rings, primary buttons |

**No colors have been added beyond these.** Hairlines and washes are Chalk at
low opacity, never new hues.

## The one rule that is not taste

**Signal is never a fill behind white text.** Measured, Chalk on Signal is
**2.97:1** — under the 4.5:1 AA floor (company law 8). Every red fill on this
site takes Coal text at **5.86:1**: primary buttons, checked choice chips, the
open mobile-menu button.

This was checked before the colors were chosen, not after. Four reds were
measured; `#FF4D4F` was picked because it clears 4.5:1 on all four company
grounds, which means — unlike the Clay it replaces — **it can carry small
text**. A deeper red like `#D93036` measures 4.04:1 on Coal and would have
failed.

### Every pair the system uses, measured

| Pair | Ratio | Floor | |
|---|---|---|---|
| Chalk on Coal | 17.43:1 | 4.5 | ✓ |
| Chalk on Graphite | 16.43:1 | 4.5 | ✓ |
| Chalk on Slate | 15.78:1 | 4.5 | ✓ |
| Chalk on Pitch | 18.01:1 | 4.5 | ✓ |
| Ash on Coal | 7.34:1 | 4.5 | ✓ |
| Ash on Slate | 6.64:1 | 4.5 | ✓ |
| Ash-dim on Coal | 5.60:1 | 4.5 | ✓ |
| Signal on Coal | 5.86:1 | 4.5 | ✓ |
| Signal on Slate | 5.30:1 | 4.5 | ✓ |
| Coal on Signal (buttons, chips) | 5.86:1 | 4.5 | ✓ |
| Focus ring: Signal vs Coal | 5.86:1 | 3.0 | ✓ |

`--ash-dim` sits at `#8A8A93` because that is about as dim as gray gets on Coal
while clearing AA. Do not darken it.

Links are Chalk with a Signal underline. Signal passes for text here, so the
color *could* carry the link — the underline still does the work, because color
alone should never be the only signal.

## Type

Playfair Display 600 for headlines, Jost 400/500 for UI and body — unchanged by
the amendment. Both are **self-hosted** as variable woff2 (latin subset, ~50KB
total), so no third party learns who visits the site.

## The mark

Inlined as SVG from the canon paths, so it costs no request and stays crisp at
any size. It ships in the header and footer of every page, plus the favicon and
apple-touch icon.

**The lockup uses the reversed monogram, not the app tile.** The tile's ground
is Coal, and on a Coal page it would have no edge to read against — the mark
would simply vanish. The tile is still canon and still correct for app icons and
avatars, where there is always a foreign background behind it.

## Build

Astro 7, static output. No client-side framework. The only JavaScript that ships
is a small progressive enhancement that moves focus to the next question after a
radio choice — the forms work fully without it.

Total site weight is just over 500KB including fonts and every page.
