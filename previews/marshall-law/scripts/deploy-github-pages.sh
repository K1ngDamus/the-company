#!/usr/bin/env bash
# Publish the Marshall Law preview to GitHub Pages.
#
# WHY THIS NEEDS ITS OWN REPOSITORY
# GitHub Pages serves ONE site per repository, and K1ngDamus/the-company's
# Pages is already serving the live company site at frontporchbuilds.com.
# Publishing the preview there would take the company site down. So the
# preview gets its own repo, and the company site is never touched.
#
# WHAT YOU HAVE TO DO BY HAND (two steps, both one-time)
#   1. Create an EMPTY public repo. Suggested name: fpc-preview-mlp
#      github.com/new — public, no README, no .gitignore, no licence.
#      (A GitHub App token cannot create repositories: 403 "Resource not
#      accessible by integration". Same reason a workflow could not create
#      this account's Pages site — see deploy.yml in the-company.)
#   2. After the first run of this script, switch Pages on:
#      repo → Settings → Pages → Source: "Deploy from a branch"
#             → Branch: main → folder: / (root) → Save
#
# Then, from previews/marshall-law/:
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

==> Pushed.

If this was the first run, switch Pages on now:
  https://github.com/$OWNER/$REPO/settings/pages
  Source: "Deploy from a branch" → Branch: main → / (root) → Save

Your link (live a minute or two after that switch):
  https://$OWNER.github.io/$REPO/

Check before sending it:
  1. Open it on a phone; tap the call button — it should offer to dial.
  2. Confirm the watermark is on every page.
  3. Confirm the footer says "Not a live site."
  4. Open /start/ and confirm the form fills in.

To take it down: delete the repository, or set Pages Source to "None".
NOTE
