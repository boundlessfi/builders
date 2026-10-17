import type { MetadataRoute } from 'next';

import { routes } from '@/lib/seo/routes';
import { siteConfig } from '@/lib/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.slug}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

