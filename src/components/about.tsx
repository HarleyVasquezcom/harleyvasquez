'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { SectionHeading } from './section-heading';

export function About() {
  const t = useTranslations('about');
  const heading = t('heading');
  const kicker = t('kicker');
  const bio = t.raw('bio') as string[];
  const stackLabel = t('stackLabel');
  const stack = siteConfig.about.stack;

  return (
    <section
      id="about"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="about-heading" kicker={kicker} title={heading} />

        <div className="space-y-5 text-lg text-fg-muted leading-relaxed animate-fade-in-up">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-10 mb-4 font-mono text-sm font-medium uppercase tracking-wide text-fg-muted">
          {stackLabel}
        </h3>
        <ul className="flex flex-wrap gap-3 animate-fade-in-up">
          {stack.map((skill) => (
            <li key={skill}>
              <span className="inline-flex items-center rounded-full glass px-4 py-2 text-sm font-medium text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}