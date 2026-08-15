import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.url;
  const projectRoutes = siteConfig.projects.items.map((item) => ({
    url: `${base}/projects/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectRoutes,
  ];
}