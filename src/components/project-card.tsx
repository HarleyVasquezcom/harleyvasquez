'use client';

import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ProjectConfig } from '@/lib/config';
import { ProjectCoverArt } from './project-cover-art';

export function ProjectCard({
  project,
  variant = 'carousel',
}: {
  project: ProjectConfig;
  variant?: 'carousel' | 'grid';
}) {
  const t = useTranslations('projectCatalog');
  const labels = useTranslations('projects.labels');
  const featured = useTranslations('projects');

  const title = t(`${project.slug}.title`);
  const description = t(`${project.slug}.description`);

  return (
    <div className="project-card-gradient h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-colors duration-300 hover:bg-card-hover"
        aria-label={`${labels('details')}: ${title}`}
      >
        <span className="sr-only">
          {labels('details')}: {title}
        </span>

        <ProjectCoverArt project={project} />

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-lg font-semibold text-fg ${
                variant === 'grid' ? 'line-clamp-1' : ''
              }`}
            >
              {title}
            </h3>
            {project.featured ? (
              <span className="inline-flex shrink-0 items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                {featured('featuredLabel')}
              </span>
            ) : null}
          </div>

          <p
            className={`text-sm text-fg-muted leading-relaxed ${
              variant === 'grid' ? 'line-clamp-3' : ''
            }`}
          >
            {description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-fg-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-accent transition-colors group-hover:text-accent-glow">
            {labels('details')}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </div>
  );
}