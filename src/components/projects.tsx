'use client';

import Link from 'next/link';
import { ArrowUpRight, SearchX } from 'lucide-react';
import { siteConfig, type ProjectConfig } from '@/lib/config';
import { SectionHeading } from './section-heading';
import { ProjectCoverArt, hasDarkBackground } from './project-cover-art';

function ProjectCard({ item }: { item: ProjectConfig }) {
  const { featuredLabel, labels } = siteConfig.projects;

  return (
    <li data-carousel-cat={item.category} className="group relative h-full w-[min(340px,86vw)] shrink-0 sm:w-[420px] lg:w-[400px]">
      <div className="project-card-gradient h-full">
        <Link
          href={`/projects/${item.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-colors duration-300 hover:bg-card-hover"
          aria-label={`${labels.details}: ${item.title}`}
        >
          <span className="sr-only">{labels.details}: {item.title}</span>
          {/* Animated per-project cover art */}
          <ProjectCoverArt project={item} />

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
              {item.featured ? (
                <span className="inline-flex shrink-0 items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {featuredLabel}
                </span>
              ) : null}
            </div>

            <p className="text-sm text-fg-muted leading-relaxed">{item.description}</p>

            <ul className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-fg-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-accent transition-colors group-hover:text-accent-glow">
              {labels.details}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
}

function interleaveBrightDark<T extends { id: string }>(items: T[]): T[] {
  const dark: T[] = [];
  const bright: T[] = [];
  for (const item of items) {
    (hasDarkBackground(item.id) ? dark : bright).push(item);
  }
  if (dark.length === 0 || bright.length === 0) return items;

  const run = Math.max(1, Math.min(2, Math.floor(dark.length / bright.length)));
  const result: T[] = [];
  let di = 0;
  let bi = 0;
  while (di < dark.length) {
    const step = Math.min(run, dark.length - di);
    for (let k = 0; k < step; k++) result.push(dark[di++]);
    if (bi < bright.length) result.push(bright[bi++]);
    else if (di < dark.length) {
      for (; di < dark.length; di++) result.push(dark[di]);
    }
  }
  while (bi < bright.length) result.push(bright[bi++]);
  return result;
}

function CarouselGroup({ items, hidden }: { items: ProjectConfig[]; hidden?: boolean }) {
  return (
    <div role="presentation" aria-hidden={hidden || undefined} className="flex gap-6 pr-6">
      {items.map((item, index) => (
        <ProjectCard key={`${item.id}-${index}`} item={item} />
      ))}
    </div>
  );
}

export function Projects() {
  const { heading, kicker, filterLabel, categories, items, emptyState, labels } = siteConfig.projects;

  const allTab = categories[0] ?? 'All';
  const synced = items.length === 0 ? items : interleaveBrightDark(items);
  const hasCards = items.length > 0;

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
            kicker={kicker}
            title={heading}
            titleClassName="project-heading-gradient"
          />
        </div>

        <div
          role="group"
          aria-label={filterLabel}
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
              {category}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden" data-carousel-scope="projects">
          <div
            data-carousel-track
            role="list"
            className="flex w-max select-none"
          >
            {hasCards ? (
              <>
                <CarouselGroup items={synced} />
                <CarouselGroup items={synced} hidden />
              </>
            ) : (
              <li
                key="empty"
                className="col-span-full flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center"
              >
                <SearchX className="h-8 w-8 text-fg-muted" aria-hidden="true" />
                <p className="text-fg-muted">{emptyState}</p>
              </li>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}