import { SITE, NAP, CONTACT, COUNTIES, type County } from '../data/site';

/* One builder for the local markup, used by the TV hub and all five county
   pages, so NAP can never drift between them (rule 12). */
export function localBusiness(opts: { path: string; name: string; description: string; counties: County[] }) {
  const areaServed = opts.counties.map((c) => ({
    '@type': 'AdministrativeArea',
    name: c.name,
    containedInPlace: { '@type': 'State', name: NAP.regionName },
  }));

  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': new URL(opts.path, SITE.url).href + '#localbusiness',
    name: opts.name,
    legalName: NAP.name,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    image: new URL('/brand/FPC-appicon-tile.svg', SITE.url).href,
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    /* Service-area business (Leon's ruling, 2026-08-23): the geography is
       carried by areaServed and no street address is published. `address`
       intentionally carries locality only — never a fabricated street. */
    address: {
      '@type': 'PostalAddress',
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      addressCountry: NAP.country,
    },
    areaServed,
    serviceType: 'TV mounting and installation',
  };

  if (CONTACT.phoneHref) node.telephone = CONTACT.phoneHref;
  if (CONTACT.email) node.email = CONTACT.email;

  return node;
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).href,
    })),
  };
}

export function service(opts: { path: string; name: string; description: string; areaWide?: boolean }) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    provider: { '@id': `${SITE.url}/#organization` },
  };
  if (opts.areaWide) {
    node.areaServed = COUNTIES.map((c) => ({ '@type': 'AdministrativeArea', name: c.name }));
  }
  return node;
}
