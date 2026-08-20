'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export function Hero() {
  const t = useTranslations('hero');
  const reducedMotion = useReducedMotion();

  const headline = t('headline');
  const subheadline = t('subheadline');
  const availabilityBadge = t('availabilityBadge');
  const ctaPrimaryLabel = t('ctaPrimary');
  const ctaSecondaryLabel = t('ctaSecondary');
  const terminalHostname = t('terminalHostname');
  const terminalLines = t.raw('terminalLines') as string[];
  const scrollHint = t('scrollHint');

  const ctaPrimaryHref = siteConfig.hero.ctaPrimary.href;
  const ctaSecondaryHref = siteConfig.hero.ctaSecondary.href;

  // Spotlight driven by CSS variables, smoothed via springs
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  // Track mouse and publish smoothed coords to CSS variables.
  // Coalesced to one update per animation frame so rapid mouse movement does
  // not flood the main thread (which starves the carousel autoplay rAF).
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let lastX = 50;
    let lastY = 50;
    const handleMove = (e: MouseEvent) => {
      lastX = (e.clientX / window.innerWidth) * 100;
      lastY = (e.clientY / window.innerHeight) * 100;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        mouseX.set(lastX);
        mouseY.set(lastY);
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY, reducedMotion]);

  useEffect(() => {
    const updateX = () => {
      document.documentElement.style.setProperty('--mouse-x', `${springX.get()}%`);
    };
    const updateY = () => {
      document.documentElement.style.setProperty('--mouse-y', `${springY.get()}%`);
    };
    updateX();
    updateY();
    const unsubX = springX.on('change', updateX);
    const unsubY = springY.on('change', updateY);
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  // Typewriter effect: only the live last line is typed, so it never
  // re-renders text already printed statically by the terminal block below.
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const liveLine = terminalLines[terminalLines.length - 1];
    if (reducedMotion) {
      const timeout = setTimeout(() => setTypedText(liveLine), 0);
      return () => clearTimeout(timeout);
    }
    let charIndex = 0;
    let deleting = false;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      if (!deleting) {
        charIndex += 1;
        if (charIndex <= liveLine.length) {
          setTypedText(liveLine.slice(0, charIndex));
          timeout = setTimeout(tick, 28);
        } else {
          deleting = true;
          timeout = setTimeout(tick, 2200);
        }
      } else {
        charIndex -= 1;
        if (charIndex > 0) {
          setTypedText(liveLine.slice(0, charIndex));
          timeout = setTimeout(tick, 18);
        } else {
          setTypedText('');
          deleting = false;
          timeout = setTimeout(tick, 400);
        }
      }
    };
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [reducedMotion, terminalLines]);

  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      aria-labelledby="hero-headline"
    >
      {/* Background metallic texture */}
      <div className="absolute inset-0 metallic-surface" aria-hidden="true" />

      {/* Spotlight effect */}
      <div className="spotlight absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Availability Badge */}
        <div className="mb-8 animate-fade-in-up animate-delay-100">
          <span className="badge animate-pulse-subtle">
            <Zap className="h-3 w-3" aria-hidden="true" />
            {availabilityBadge}
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="gradient-text text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-delay-200"
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-fg-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-300"
        >
          {subheadline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-400"
        >
          <a
            href={ctaPrimaryHref}
            className="btn-primary group flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(ctaPrimaryHref.replace(/^\/#/, ''))?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            {ctaPrimaryLabel}
            <motion.span
              animate={reducedMotion ? { x: 0 } : { x: [0, 4, 0] }}
              transition={reducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </a>
          <a
            href={ctaSecondaryHref}
            className="btn-secondary flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(ctaSecondaryHref.replace(/^\/#/, ''))?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            {ctaSecondaryLabel}
          </a>
        </div>

        {/* Terminal Typing Effect / Distinctive Detail */}
        <div
          className="mt-16 glass rounded-xl p-6 max-w-2xl mx-auto text-left font-mono text-sm animate-fade-in-up animate-delay-500"
          role="region"
          aria-label={terminalHostname}
        >
          <div className="flex items-center gap-2 mb-4 text-fg-muted">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs">{terminalHostname}</span>
          </div>
          <div className="space-y-1 text-fg">
            {terminalLines.slice(0, -1).map((line, i) => (
              <div key={i} className="terminal-line-static text-emerald">
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-emerald">&gt; </span>
              <span className="terminal-live text-accent-glow">{typedText}</span>
              <motion.span
                className="text-accent-glow"
                animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                transition={reducedMotion ? { duration: 0 } : { duration: 1, repeat: Infinity }}
                aria-hidden="true"
              >
                _
              </motion.span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted animate-fade-in-up animate-delay-500"
        >
          <MousePointer className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs font-medium">{scrollHint}</span>
        </div>
      </div>
    </section>
  );
}