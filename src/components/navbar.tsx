'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { siteConfig } from '@/lib/config';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  const navLinks = siteConfig.site.navigation;
  const sectionId = (href: string) => href.replace(/^\/#/, '').replace('#', '');

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
    const isHome = window.location.pathname === '/';
    if (!isHome) return; // let the browser navigate to /#section
    e.preventDefault();
    scrollToSection(href);
  };

  const onMobileAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close the native panel before/after the default anchor jump
    const host = (e.currentTarget.closest('details') as HTMLDetailsElement | null);
    if (host) host.open = false;
    onAnchorClick(e, href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong' : 'glass'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/#hero"
            className="flex items-center gap-2 font-semibold text-lg text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1"
            onClick={(e) => onAnchorClick(e, '/#hero')}
          >
            <span className="gradient-text">{siteConfig.site.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md ${
                  activeSection === link.href.replace(/^\/#/, '')
                    ? 'text-accent'
                    : 'text-fg-muted hover:text-fg'
                }`}
                onClick={(e) => onAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Theme toggle + Mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 rounded-full glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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
            <details className="relative md:hidden" id="mobile-menu" aria-label="Mobile menu">
              <summary
                className="p-2 rounded-lg glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-fg" aria-hidden="true" />
              </summary>
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl glass-strong border border-border shadow-2xl">
                <div className="px-4 py-6 space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`block py-3 px-2 text-base font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                        activeSection === link.href.replace(/^\/#/, '')
                          ? 'text-accent bg-card'
                          : 'text-fg-muted hover:text-fg hover:bg-card'
                      }`}
                      onClick={(e) => onMobileAnchorClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Theme</span>
                    <button
                      onClick={() => {
                        toggleTheme();
                        const details = document.getElementById('mobile-menu') as HTMLDetailsElement | null;
                        if (details) details.open = false;
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full glass transition-all hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="Theme"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="h-4 w-4 text-accent-glow" aria-hidden="true" />
                          <span className="text-sm font-medium">Light</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4 text-accent-alt" aria-hidden="true" />
                          <span className="text-sm font-medium">Dark</span>
                        </>
                      )}
                    </button>
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
        aria-label="Page scroll progress"
      />
    </nav>
  );
}