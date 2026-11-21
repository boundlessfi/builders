import { siteConfig } from '@/lib/seo/site';

/**
 * Build an absolute URL on the main Boundless app. Paths are normalised to a
 * leading slash so callers can pass either `'profile/jane'` or `'/profile/jane'`.
 */
export function mainAppUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.parentUrl}${normalized}`;
}

/** Public builder profile page in the main app. */
export function profileUrl(username: string): string {
  return mainAppUrl(`/profile/${encodeURIComponent(username)}`);
}

/** Public project page in the main app. */
export function projectUrl(slug: string): string {
  return mainAppUrl(`/projects/${encodeURIComponent(slug)}`);
}

/**
 * Link attributes for external links. External links starting with `http`
 * open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
 */
export function externalLinkProps(href: string): {
  target?: '_blank';
  rel?: 'noopener noreferrer';
} {
  if (!href.startsWith('http')) return {};
  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
