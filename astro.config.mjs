import { defineConfig } from 'astro/config';

/* Where this build will be served from.
 *
 * The canonical home is frontporchbuilds.com and that is what a plain `npm run
 * build` produces — nothing about the normal path changes. The two overrides
 * exist so the same commit can also be deployed to a GitHub Pages project URL
 * (https://k1ngdamus.github.io/the-company/) for a look before the domain is
 * pointed. The deploy workflow fills them from the Pages settings, so there is
 * no second copy of the address to keep in step.
 *
 * Everything downstream — links, canonicals, the sitemap, structured data —
 * reads these back through Astro's `import.meta.env.SITE` and `BASE_URL` in
 * src/data/site.ts. Do not hard-code the address anywhere else. */
const site = process.env.SITE_URL || 'https://frontporchbuilds.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({ site, base });
