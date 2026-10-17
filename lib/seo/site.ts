import { env } from '@/lib/env';

/**
 * Shared site configuration for Boundless Builders. Page metadata and JSON-LD
 * structured data both read from here, so the same strings are never
 * duplicated across routes.
 */
/**
 * Read an origin from the environment. Trims whitespace and trailing slashes
 * so callers can append a path without producing a double slash.
 */
function readOrigin(value: string | undefined, fallback: string): string {
  return value?.trim().replace(/\/+$/, '') || fallback;
}

export const siteConfig = {
  name: 'Boundless Builders',
  /** The organization behind the app, used by the Organization schema. */
  organizationName: 'Boundless',
  /** Canonical origin for this app, with no trailing slash. */
  url: readOrigin(
    env.NEXT_PUBLIC_SITE_URL,
    'https://builders.boundlessfi.xyz'
  ),
  description:
    'Discover the builders, projects, and teams shipping on Stellar through Boundless. A public showcase of the people and products of the ecosystem.',
  twitterHandle: '@boundless_fi',
  locale: 'en_US',
  /** The main Boundless app, where builders sign up and create. */
  parentUrl: readOrigin(
    env.NEXT_PUBLIC_BOUNDLESS_APP_URL,
    'https://boundlessfi.xyz'
  ),
  /** Public path to the white Boundless logo used by structured data. */
  logoPath: '/brand/boundless-logo-white.svg',
};
