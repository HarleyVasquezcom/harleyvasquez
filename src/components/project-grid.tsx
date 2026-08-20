'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { ProjectCard } from './project-card';
import { interleaveBrightDark } from './project-order';
import { SectionHeading } from './section-heading';

export function ProjectGrid({ initialCategory = 'all' }: { initialCategory?: string }) {
  const t = useTranslations('projects');
  const cats = useTranslations('categories');
  const [active, setActive] = useState(initialCategory);

  const categories = siteConfig.projects.categories;
  const allTab = categories[0] ?? 'all';
  const filtered = useMemo(() => {
    const items =
      active === allTab
        ? siteConfig.projects.items
        : siteConfig.projects.items.filter((item) => item.category === active);
    return interleaveBrightDark(items);
  }, [active, allTab]);

  const chip = (category: string) => {
    const label = cats.has(category) ? cats(category) : category;
    return (
      <button
        key={category}
        type="button"
        aria-pressed={category === active}
        onClick={() => setActive(category)}
        className="project-filter-chip rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {label}
      </button>
    );
  };

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="projects-listing-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="projects-listing-heading"
          kicker={t('kicker')}
          title={t('listingTitle')}
          titleClassName="project-heading-gradient"
        />
        <p className="mt-4 max-w-2xl text-lg text-fg-muted leading-relaxed">{t('listingSubtitle')}</p>

        <div
          role="group"
          aria-label={t('filterLabel')}
          className="mt-8 mb-10 flex flex-wrap items-center gap-2.5"
        >
          {categories.map(chip)}
        </div>

        {filtered.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id} className="h-full">
                <ProjectCard project={item} variant="grid" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <SearchX className="h-8 w-8 text-fg-muted" aria-hidden="true" />
            <p className="text-fg-muted">{t('emptyState')}</p>
          </div>
        )}
      </div>
    </section>
  );
}