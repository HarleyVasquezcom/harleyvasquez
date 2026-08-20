'use client';

import { ArrowRight, SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from './section-heading';
import { ProjectCard } from './project-card';
import { interleaveBrightDark } from './project-order';

function CarouselGroup({
  items,
  hidden,
}: {
  items: typeof siteConfig.projects.items;
  hidden?: boolean;
}) {
  return (
    <div role="presentation" aria-hidden={hidden || undefined} className="flex gap-6 pr-6">
      {items.map((item, index) => (
        <li
          key={`${item.id}-${index}`}
          data-carousel-cat={item.category}
          className="group relative h-full w-[min(340px,86vw)] shrink-0 sm:w-[420px] lg:w-[400px]"
        >
          <ProjectCard project={item} />
        </li>
      ))}
    </div>
  );
}

export function Projects() {
  const t = useTranslations('projects');
  const cats = useTranslations('categories');

  const { categories, items } = siteConfig.projects;
  const allTab = categories[0] ?? 'all';
  const synced = items.length === 0 ? items : interleaveBrightDark(items);
  const hasCards = items.length > 0;

  const chipLabel = (category: string) => (cats.has(category) ? cats(category) : category);

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-heading"
            kicker={t('kicker')}
            title={t('heading')}
            titleClassName="project-heading-gradient"
          />
          <Link
            href="/projects"
            className="btn-primary group flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {t('seeMore')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div
          role="group"
          aria-label={t('filterLabel')}
          className="mb-8 flex flex-wrap items-center gap-2.5"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              data-carousel-filter={category}
              data-carousel-scope="projects"
              aria-pressed={category === allTab}
              className="project-filter-chip rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {chipLabel(category)}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden" data-carousel-scope="projects">
          <div data-carousel-track role="list" className="flex w-max select-none">
            {hasCards ? (
              <>
                <CarouselGroup items={synced} />
                <CarouselGroup items={synced} hidden />
              </>
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                <SearchX className="h-8 w-8 text-fg-muted" aria-hidden="true" />
                <p className="text-fg-muted">{t('emptyState')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}