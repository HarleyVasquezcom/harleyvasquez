import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Code, Tag } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { siteConfig } from '@/lib/config';
import { Link } from '@/i18n/navigation';
import { ProjectCoverArt } from '@/components/project-cover-art';
import { LOCALES } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

function getProject(slug: string) {
  return siteConfig.projects.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return siteConfig.projects.items.flatMap((item) =>
    LOCALES.map((locale) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale: locale as Locale, namespace: 'projectCatalog' });
  const site = await getTranslations({ locale: locale as Locale, namespace: 'site' });

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `/${l}/projects/${project.slug}`;
  }

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages,
    },
    openGraph: {
      title: `${t(`${slug}.title`)} | ${site('name')}`,
      description: t(`${slug}.description`),
    },
  };
}

async function ProjectShell({
  project,
  locale,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: 'projectCatalog' });
  const labels = await getTranslations({ locale, namespace: 'projects.labels' });
  const featured = await getTranslations({ locale, namespace: 'projects' });
  const cats = await getTranslations({ locale, namespace: 'categories' });

  const title = t(`${project.slug}.title`);
  const description = t(`${project.slug}.description`);
  const overview = t.raw(`${project.slug}.overview`) as string | undefined;
  const highlights = t.raw(`${project.slug}.highlights`) as string[] | undefined;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="project-title">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {labels('backToListing') ?? labels('back')}
        </Link>

        <ProjectCoverArt project={project} className="mt-8 rounded-2xl" />

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            {project.featured ? (
              <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                {featured('featuredLabel')}
              </span>
            ) : null}
            {project.year ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-fg-muted">
                {project.year}
              </span>
            ) : null}
            {project.category ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-fg-muted">
                {cats.has(project.category) ? cats(project.category) : project.category}
              </span>
            ) : null}
          </div>

          <h1 id="project-title" className="mt-4 gradient-text text-4xl sm:text-5xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-fg-muted">
            {overview ?? description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-all hover:glow-accent"
            >
              {labels('liveDemo')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-hover hover:text-accent"
              >
                {labels('code')}
                <Code className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        {highlights?.length ? (
          <section className="mt-12" aria-label="Highlights">
            <h2 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-fg-muted">
              <Tag className="mr-2 inline h-4 w-4" aria-hidden="true" />
              {labels('highlights')}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-fg-muted"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12" aria-label="Technologies">
          <h2 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-fg-muted">
            <Code className="mr-2 inline h-4 w-4" aria-hidden="true" />
            {labels('stack')}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-bg px-3 py-1 text-sm text-fg-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectShell project={project} locale={locale as Locale} />;
}