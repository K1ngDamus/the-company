import type { APIRoute } from 'astro';
import { SITE, COUNTIES, SERVICES } from '../data/site';

/* Hand-built rather than pulled from a plugin: fifteen pages with deliberate
   priorities beats a generated list nobody has read. Legal pages and the 404
   are intentionally absent from the priority stack below. */
const lastmod = '2026-08-23';

const pages: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  ...SERVICES.map((s) => ({ path: `/${s.slug}`, priority: '0.9', changefreq: 'monthly' })),
  ...COUNTIES.map((c) => ({ path: `/tv-mounting/${c.slug}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/work', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
];

export const GET: APIRoute = () => {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${new URL(p.path, SITE.url).href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
