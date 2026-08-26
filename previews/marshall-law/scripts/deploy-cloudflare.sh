#!/usr/bin/env bash
# Publish the Marshall Law preview to Cloudflare Pages on an unlisted URL.
#
# Run this from previews/marshall-law/ on a machine with normal internet
# access. It cannot run inside the Claude session — that environment's egress
# proxy denies api.cloudflare.com outright (403 on CONNECT), so the deploy has
# to happen from your side.
#
#   ./scripts/deploy-cloudflare.sh
#
# First run opens a browser to log in to Cloudflare. After that it is one
# command whenever the preview changes.
set -euo pipefail

# An unguessable project name, because the whole privacy model here is that the
# URL is only ever in her inbox. Do NOT rename this to "marshall-law-preview" —
# a guessable name on pages.dev is a findable one.
PROJECT="${CF_PROJECT:-mlp-2s6xgqp2a3}"

cd "$(dirname "$0")/.."

echo "==> Building"
node build.mjs
node audit.mjs

echo
echo "==> Publishing to Cloudflare Pages as '$PROJECT'"
npx --yes wrangler@latest pages deploy dist \
  --project-name "$PROJECT" \
  --branch main \
  --commit-dirty=true

cat <<'NOTE'

==> Done.

Your link is the https://<project>.pages.dev URL printed above.

Check before you send it:
  1. Open it on a phone. Tap the call button — it should offer to dial.
  2. Confirm the Front Porch watermark is on every page.
  3. Confirm the footer says "Not a live site."

Then paste the URL into the email in place of [ PREVIEW LINK ].

To take it down later:
  npx wrangler pages project delete <project>
NOTE
