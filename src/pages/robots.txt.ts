import type { APIRoute } from 'astro';
import { CANONICAL_ORIGIN, IS_CANONICAL, abs } from '../data/site';

/* Generated rather than static (it used to be public/robots.txt) for one
   reason: a preview build must not invite crawlers.

   On frontporchco.com this emits exactly what the static file did. Anywhere
   else — a Pages project URL, a staging host — it disallows everything, which
   together with the noindex tag in Base.astro keeps a preview from ever
   duplicating or outranking the real site. */
export const GET: APIRoute = () =>
  new Response(
    IS_CANONICAL
      ? `# Front Porch Collective LLC — frontporchco.com
User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`
      : `# Preview build of the Front Porch Collective site — not the real thing.
# The site lives at ${CANONICAL_ORIGIN}.
User-agent: *
Disallow: /
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
