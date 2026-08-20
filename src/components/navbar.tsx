'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from './theme-provider';
import { siteConfig } from '@/lib/config';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { LOCALES } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

const NAV_KEYS = ['about', 'projects', 'experience', 'contact'] as const;

function LanguageSelect({
  locale,
  onChange,
  compact = false,
}: {
  locale: Locale;
  onChange: (next: Locale) => void;
  compact?: boolean;
}) {
  const t = useTranslations('nav');
  return (
    <select
      value={locale}
      onChange={(e) => onChange(e.target.value as Locale)}
      aria-label={t('lang')}
      className={`cursor-pointer rounded-full glass text-sm font-medium text-fg-muted transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        compact ? 'px-2.5 py-2' : 'w-full px-3 py-2'
      }`}
    >
      {LOCALES.map((l) => (
        <option key={l} value={l} className="bg-bg text-fg">
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  const t = useTranslations('nav');
  const site = useTranslations('site');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const sectionId = (href: string) => href.replace(/^\/#/, '').replace('#', '');
  const navLinks = siteConfig.site.navigation;

  // Register sections for active-section detection
  useEffect(() => {
    const map = new Map<string, HTMLElement>();
    ['hero', ...navLinks.map((l) => sectionId(l.href))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) map.set(id, el);
    });
    sectionsRef.current = map;
  }, [navLinks]);

  // Scroll progress + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);
      setScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionsRef.current.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        const details = document.getElementById('mobile-menu') as HTMLDetailsElement | null;
        if (details) details.open = false;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape closes mobile panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const details = document.getElementById('mobile-menu') as HTMLDetailsElement | null;
        if (details) details.open = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (href: string) => {
    const section = sectionsRef.current.get(sectionId(href));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHome = pathname === '/';
    if (!isHome) return; // let the browser navigate to /#section
    e.preventDefault();
    scrollToSection(href);
  };

  const onMobileAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const host = e.currentTarget.closest('details') as HTMLDetailsElement | null;
    if (host) host.open = false;
    onAnchorClick(e, href);
  };

  const changeLocale = (next: Locale) => {
    if (next === locale) return;
    router.push(pathname, { locale: next });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong' : 'glass'
      }`}
      aria-label={t('label')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/#hero"
            className="flex items-center gap-2 font-semibold text-lg text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1"
            onClick={(e) => onAnchorClick(e, '/#hero')}
          >
            <span className="gradient-text">{site('name')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_KEYS.map((key, index) => (
              <a
                key={key}
                href={navLinks[index]?.href ?? '#/'}
                className={`relative py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md ${
                  activeSection === sectionId(navLinks[index]?.href ?? '')
                    ? 'text-accent'
                    : 'text-fg-muted hover:text-fg'
                }`}
                onClick={(e) => onAnchorClick(e, navLinks[index]?.href ?? '')}
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right side: Language + Theme toggle + Mobile menu button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSelect locale={locale} onChange={changeLocale} compact />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 rounded-full glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label={theme === 'dark' ? t('themeSwitchLight') : t('themeSwitchDark')}
              aria-pressed={theme === 'dark'}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-accent-glow" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5 text-accent-alt" aria-hidden="true" />
                )}
              </motion.span>
            </button>

            {/* Mobile Menu Button */}
            <details className="relative md:hidden" id="mobile-menu" aria-label={t('openMenu')}>
              <summary
                className="p-2 rounded-lg glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
                aria-label={t('openMenu')}
              >
                <Menu className="h-6 w-6 text-fg" aria-hidden="true" />
              </summary>
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl glass-strong border border-border shadow-2xl">
                <div className="px-4 py-6 space-y-4">
                  {NAV_KEYS.map((key, index) => (
                    <a
                      key={key}
                      href={navLinks[index]?.href ?? '#/'}
                      className={`block py-3 px-2 text-base font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                        activeSection === sectionId(navLinks[index]?.href ?? '')
                          ? 'text-accent bg-card'
                          : 'text-fg-muted hover:text-fg hover:bg-card'
                      }`}
                      onClick={(e) => onMobileAnchorClick(e, navLinks[index]?.href ?? '')}
                    >
                      {t(key)}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-fg-muted">{t('theme')}</span>
                    <button
                      onClick={() => {
                        toggleTheme();
                        const details = document.getElementById('mobile-menu') as HTMLDetailsElement | null;
                        if (details) details.open = false;
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={t('theme')}
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="h-4 w-4 text-accent-glow" aria-hidden="true" />
                          <span className="text-sm font-medium">{t('themeLight')}</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4 text-accent-alt" aria-hidden="true" />
                          <span className="text-sm font-medium">{t('themeDark')}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-sm text-fg-muted">{t('lang')}</span>
                    <div className="w-28">
                      <LanguageSelect locale={locale} onChange={changeLocale} />
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar at bottom of navbar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-alt"
        style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t('scrollProgress')}
      />
    </nav>
  );
}