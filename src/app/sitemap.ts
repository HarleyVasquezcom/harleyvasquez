import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { LOCALES } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.url;
  const lastModified = new Date();

  const locales = [...LOCALES];
  const defaultLocale = 'en';

  const homeRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: locale === defaultLocale ? base : `${base}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 1,
  }));

  const projectRoutes: MetadataRoute.Sitemap = siteConfig.projects.items.flatMap((item) =>
    locales.map((locale) => ({
      url:
        locale === defaultLocale
          ? `${base}/projects/${item.slug}`
          : `${base}/${locale}/projects/${item.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  const listingRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url:
      locale === defaultLocale
        ? `${base}/projects`
        : `${base}/${locale}/projects`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...homeRoutes, ...listingRoutes, ...projectRoutes];
}