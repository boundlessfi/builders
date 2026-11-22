import {
  githubUrl,
  socialLinks,
  type SocialKey,
} from '@/config/marketing-nav';
import { siteConfig } from '@/lib/seo/site';

/** The schema.org context declared on every top-level node. */
const SCHEMA_CONTEXT = 'https://schema.org';

/**
 * Base shape shared by every node we emit. The index signature lets the typed
 * builders feed the generic JsonLd component without casting.
 */
export interface JsonLdNode {
  '@context': typeof SCHEMA_CONTEXT;
  '@type': string;
  [key: string]: unknown;
}

/** A single breadcrumb: a visible label and the route it points at. */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** The root entry of every breadcrumb trail. */
export const homeBreadcrumb: BreadcrumbItem = {
  name: 'Home',
  path: '/',
};

/** Input for the CollectionPage builder. */
export interface CollectionPageInput {
  name: string;
  description: string;
  path: string;
}

interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

interface WebSiteReference {
  '@type': 'WebSite';
  name: string;
  url: string;
}

export interface OrganizationSchema extends JsonLdNode {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

export interface WebSiteSchema extends JsonLdNode {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface CollectionPageSchema extends JsonLdNode {
  '@type': 'CollectionPage';
  name: string;
  description: string;
  url: string;
  isPartOf: WebSiteReference;
}

export interface AboutPageSchema extends JsonLdNode {
  '@type': 'AboutPage';
  name: string;
  description: string;
  url: string;
  isPartOf: WebSiteReference;
}

export interface BreadcrumbListSchema extends JsonLdNode {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

/** Turn a route into an absolute URL on the showcase origin. */
function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

/** Look up a social profile from the shared nav config. */
function socialHref(key: SocialKey): string | undefined {
  return socialLinks.find(link => link.key === key)?.href;
}

/** The WebSite node reused as the parent of each page node. */
function webSiteReference(): WebSiteReference {
  return {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/** Organization schema for Boundless and its social profiles. */
export function organizationSchema(): OrganizationSchema {
  const sameAs = [
    socialHref('x'),
    socialHref('linkedin'),
    githubUrl,
    socialHref('discord'),
    socialHref('telegram'),
  ].filter((href): href is string => Boolean(href));

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    name: siteConfig.organizationName,
    url: siteConfig.parentUrl,
    logo: absoluteUrl(siteConfig.logoPath),
    sameAs,
  };
}

/** WebSite schema with the builders directory search action. */
export function webSiteSchema(): WebSiteSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/builders')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** CollectionPage schema for the directory routes. */
export function collectionPageSchema({
  name,
  description,
  path,
}: CollectionPageInput): CollectionPageSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: webSiteReference(),
  };
}

/** AboutPage schema for the about route. Pass the page's meta description. */
export function aboutPageSchema({
  description,
}: {
  description: string;
}): AboutPageSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'AboutPage',
    name: `About ${siteConfig.organizationName}`,
    description,
    url: absoluteUrl('/about'),
    isPartOf: webSiteReference(),
  };
}

/** BreadcrumbList schema for a route hierarchy. */
export function breadcrumbSchema(
  items: BreadcrumbItem[]
): BreadcrumbListSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
