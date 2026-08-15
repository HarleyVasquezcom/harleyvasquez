'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { siteConfig } from '@/lib/config';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const { navigation, social, copyright } = siteConfig.footer;
  const currentYear = new Date().getFullYear();

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    if (!isHome) return;
    const id = href.replace(/^\/#/, '').replace('#', '');
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative glass border-t border-border" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link
              href="/#hero"
              className="flex items-center gap-2 font-semibold text-lg text-fg mb-4 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1 inline-flex"
              onClick={(e) => onAnchorClick(e, '/#hero')}
            >
              <span className="gradient-text">{siteConfig.site.name}</span>
            </Link>
            <p className="text-fg-muted text-sm leading-relaxed max-w-xs">
              {siteConfig.site.description}
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-1" aria-label="Footer navigation">
            <h3 className="font-semibold text-fg mb-4">Navigate</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-muted hover:text-fg transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-1 py-0.5 inline-flex"
                    onClick={(e) => onAnchorClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-fg mb-4">Connect</h3>
            <ul className="flex flex-wrap gap-3">
              {social.map((item) => {
                const Icon = iconMap[item.icon] || Github;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm text-fg-muted hover:text-fg hover:bg-card-hover transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                      {item.href.startsWith('http') && (
                        <ArrowUpRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fg-muted">
            &copy; {currentYear} {siteConfig.site.name}. {copyright}
          </p>
          <Link
            href="/#hero"
            className="flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-2 py-1"
            onClick={(e) => onAnchorClick(e, '/#hero')}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}