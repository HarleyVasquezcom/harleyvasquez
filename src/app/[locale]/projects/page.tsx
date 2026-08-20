import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectGrid } from '@/components/project-grid';
import { LOCALES } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'projects' });
  const site = await getTranslations({ locale: locale as Locale, namespace: 'site' });

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `/${l}/projects`;
  }

  return {
    title: t('listingTitle'),
    description: t('listingSubtitle'),
    alternates: {
      canonical: `/${locale}/projects`,
      languages,
    },
    openGraph: {
      title: `${t('listingTitle')} | ${site('name')}`,
      description: t('listingSubtitle'),
    },
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { category } = await searchParams;
  const initialCategory =
    typeof category === 'string' && category.length > 0 ? category : 'all';

  return <ProjectGrid initialCategory={initialCategory} />;
}