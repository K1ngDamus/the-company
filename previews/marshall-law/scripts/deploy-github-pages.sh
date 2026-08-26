#!/usr/bin/env bash
# Republish the Marshall Law preview to GitHub Pages.
#
# The site is already live at https://k1ngdamus.github.io/fpc-preview-mlp/.
# This script updates it. Both one-time setup steps are done:
#   • the repo exists (a GitHub App token cannot create one — 403 "Resource
#     not accessible by integration")
#   • Actions is enabled on it, which is what was silently blocking the first
#     deploy: the workflow was pushed and readable through the API, but the
#     repository reported zero workflow runs AND zero registered workflows
#
# WHY ITS OWN REPOSITORY
# GitHub Pages serves ONE site per repository, and K1ngDamus/the-company's
# Pages already serves the live company site at frontporchbuilds.com.
# Publishing the preview there would take the company site down.
#
# HOW IT PUBLISHES
# Not from the "Deploy from a branch" setting — from a workflow committed in
# the preview repo at .github/workflows/pages.yml. This script pushes that
# workflow alongside the built output and Actions does the deploying.
#
# THE WORKFLOW MUST BE PUSHED WITH THE SITE. This script force-pushes a tree
# built from scratch, so anything not written into that tree is deleted from
# the repo. An earlier version copied only dist/ — which would have removed
# the workflow and left the site frozen at whatever was last deployed, with
# nothing to redeploy it. deploy/pages-workflow.yml is the canonical copy and
# is copied in below; edit it there, never in the published repo.
#
# From previews/marshall-law/:
#   ./scripts/deploy-github-pages.sh            # uses fpc-preview-mlp
#   REPO=some-other-name ./scripts/deploy-github-pages.sh
set -euo pipefail

REPO="${REPO:-fpc-preview-mlp}"
OWNER="${OWNER:-K1ngDamus}"
cd "$(dirname "$0")/.."

# A project Pages site lives at /<repo>/, so the build has to be mounted there
# or every absolute link 404s. The audit is base-aware and checks this.
echo "==> Building, mounted at /$REPO/"
BASE_PATH="/$REPO" node build.mjs
BASE_PATH="/$REPO" node audit.mjs

# Without this, Pages runs Jekyll and silently drops files and directories
# whose names start with an underscore.
touch dist/.nojekyll

echo
echo "==> Publishing to github.com/$OWNER/$REPO"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cp -a dist/. "$WORK/"

# The deploy workflow ships WITH the site. Without this the force-push below
# removes it from the repo and nothing can ever redeploy.
mkdir -p "$WORK/.github/workflows"
cp deploy/pages-workflow.yml "$WORK/.github/workflows/pages.yml"

cat > "$WORK/README.md" <<NOTE
# Design preview — not a live site

A watermarked client design preview published by Front Porch Collective LLC.
Every page carries the Front Porch mark, is \`noindex\`, and is disallowed in
\`robots.txt\`.

This repository holds **built output only**. The source lives in
\`previews/marshall-law/\` in the Front Porch company repository, and this
directory is regenerated from it — do not edit anything here by hand.
NOTE

cd "$WORK"
git init -q -b main
git add -A
git -c user.name="Front Porch Collective" -c user.email="jacksonleon24@gmail.com" \
    commit -q -m "Publish design preview $(date -u +%Y-%m-%dT%H:%MZ)"
git remote add origin "https://github.com/$OWNER/$REPO.git"
git push -f origin main

cat <<NOTE

==> Pushed. Actions will redeploy on its own; watch it here:
  https://github.com/$OWNER/$REPO/actions

Your link (live a minute or so after that run goes green):
  https://$OWNER.github.io/$REPO/

Check before sending it:
  1. Open it on a phone; tap the call button — it should offer to dial.
  2. Confirm the watermark is on every page.
  3. Confirm the footer says "Not a live site."
  4. Open /start/ and confirm the form fills in.

To take it down: delete the repository, or set Pages Source to "None".
NOTE
