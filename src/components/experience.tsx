'use client';

import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { SectionHeading } from './section-heading';

export function Experience() {
  const { heading, kicker, items } = siteConfig.experience;

  return (
    <section
      id="experience"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="experience-heading" kicker={kicker} title={heading} />

        <div className="relative">
          {/* Continuous connecting line */}
          <div
            className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent-alt to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {items.map((item) => (
              <li key={item.id} className="relative pl-12 animate-fade-in-up">
                {/* Timeline dot */}
                <span
                  className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-card glow-accent-soft"
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                </span>

                <div className="card p-6">
                  <header className="mb-4">
                    <h3 className="text-lg font-semibold text-fg">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {item.company} <span className="text-fg-muted">·</span> {item.period}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-fg-muted">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </p>
                  </header>

                  <ul className="mb-4 space-y-2">
                    {item.description.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm text-fg-muted leading-relaxed"
                      >
                        <span
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-fg-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
