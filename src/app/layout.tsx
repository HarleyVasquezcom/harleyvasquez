import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/lib/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    default: siteConfig.site.title,
    template: `%s | ${siteConfig.site.name}`,
  },
  description: siteConfig.site.description,
  keywords: ['software engineer', 'portfolio', 'React', 'Next.js', 'TypeScript', 'web development'],
  authors: [{ name: siteConfig.site.name }],
  creator: siteConfig.site.name,
  publisher: siteConfig.site.name,
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.site.url,
    siteName: siteConfig.site.name,
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    images: [
      {
        url: siteConfig.site.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    images: [siteConfig.site.ogImage],
  },
  verification: siteConfig.site.googleSiteVerification
    ? { google: siteConfig.site.googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-hydration theme script - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored ? stored === 'dark' : true;
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <header>
              <Navbar />
            </header>
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
        {/* Vanilla carousel controller — the marquee itself is pure CSS
            (keyframes marquee-scroll in globals.css); this handles the filter
            chips, the native mobile menu and the iPhone-gallery-like drag
            (1:1 follow + momentum flick) on [data-carousel-track]. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  if (window.__carouselWired) return;
  window.__carouselWired = true;

  function getTrack(trigger) {
    var scopeName = trigger && trigger.getAttribute ? trigger.getAttribute('data-carousel-scope') : null;
    if (!scopeName) return null;
    return document.querySelector('[data-carousel-scope="' + scopeName + '"] [data-carousel-track]');
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var menuLink = target.closest('#mobile-menu a[href]');
    if (menuLink) {
      var details = document.getElementById('mobile-menu');
      if (details) details.open = false;
      return;
    }

    var chip = target.closest('[data-carousel-filter]');
    if (chip) {
      var track = getTrack(chip);
      var val = chip.getAttribute('data-carousel-filter') || 'All';
      var scopeName = chip.getAttribute('data-carousel-scope') || '';
      var chips = document.querySelectorAll('[data-carousel-filter][data-carousel-scope="' + scopeName + '"]');
      for (var c = 0; c < chips.length; c++) {
        chips[c].setAttribute('aria-pressed', String(chips[c] === chip));
      }
      if (track) {
        // Per-card fade-out of the cards that don't match the filter. Both
        // mirrored groups share the same data-carousel-cat attributes, so a
        // single pass keeps the marquee seamless.
        var cards = track.querySelectorAll('[data-carousel-cat]');
        for (var i = 0; i < cards.length; i++) {
          cards[i].classList.toggle('car-leaving', val !== 'All' && cards[i].getAttribute('data-carousel-cat') !== val);
        }
        setTimeout(function () {
          for (var j = 0; j < cards.length; j++) {
            cards[j].hidden = val !== 'All' && cards[j].getAttribute('data-carousel-cat') !== val;
            cards[j].classList.remove('car-leaving');
          }
        }, 170);
      }
      return;
    }
  });

  /* Carrusel: arrastre tipo galería de fotos del iPhone (1:1 + impulso con
     fricción al soltar). La banda queda donde el usuario la deja (manual);
     un toque sin arrastre la devuelve a la animación automática. */
  var tracks = document.querySelectorAll('[data-carousel-track]');
  for (var ti = 0; ti < tracks.length; ti++) {
    (function (track) {
      var host = track.parentElement;
      var pan = document.createElement('span');
      pan.className = 'carousel-pan';
      host.insertBefore(pan, track);
      pan.appendChild(track);
      host.style.touchAction = 'pan-y';

      var x = 0, v = 0, raf = null, manual = false;
      var startX = 0, baseX = 0, moved = false, pointerId = null, wheelTimer = null, pressing = false;
      var samples = [], pointerX = null, dragRAF = null, dragOpen = false;

      var renderDrag = function () {
        if (dragOpen) {
          if (moved) {
            x = baseX + (pointerX - startX);
            pan.style.transform = 'translateX(' + x + 'px)';
          }
          dragRAF = requestAnimationFrame(renderDrag);
        } else {
          dragRAF = null;
        }
      };
      var stopDragLoop = function () {
        dragOpen = false;
        if (dragRAF) { cancelAnimationFrame(dragRAF); dragRAF = null; }
      };
      var glideTick = function () {
        x += v;
        v *= 0.945;
        pan.style.transform = 'translateX(' + x + 'px)';
        if (Math.abs(v) < 0.06) { v = 0; raf = null; return; }
        raf = requestAnimationFrame(glideTick);
      };
      var startGlide = function () {
        stopLoop();
        if (Math.abs(v) < 0.06) return;
        raf = requestAnimationFrame(glideTick);
      };
      var stopLoop = function () {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      };
      var pauseTrack = function () { track.style.animationPlayState = 'paused'; };
      var resumeTrack = function () { clearTimeout(wheelTimer); track.style.animationPlayState = ''; };
      var toManual = function () {
        clearTimeout(wheelTimer);
        manual = true;
        host.classList.add('manual');
        pauseTrack();
      };
      var toAuto = function () {
        manual = false;
        host.classList.remove('manual');
        resumeTrack();
        stopLoop();
        x = 0; v = 0;
        pan.style.transition = 'transform .5s cubic-bezier(.2,.8,.3,1)';
        pan.style.transform = 'translateX(0)';
        setTimeout(function () { pan.style.transition = ''; }, 520);
      };

      host.addEventListener('pointerdown', function (e) {
        pointerId = e.pointerId;
        startX = e.clientX;
        baseX = x;
        moved = false;
        pressing = true;
        pointerX = e.clientX;
        samples = [{ t: Date.now(), x: e.clientX }];
        pan.style.transition = '';
        pauseTrack();
        stopLoop();
        stopDragLoop();
        dragOpen = true;
        dragRAF = requestAnimationFrame(renderDrag);
        if (host.setPointerCapture) { try { host.setPointerCapture(e.pointerId); } catch (err) {} }
      });
      host.addEventListener('selectstart', function (e) {
        if (pressing) e.preventDefault();
      });
      host.addEventListener('pointermove', function (e) {
        if (e.pointerId !== pointerId) return;
        pointerX = e.clientX;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 4) { moved = true; host.classList.add('dragging'); }
        if (moved) {
          v = 0;
          var now = Date.now();
          samples.push({ t: now, x: e.clientX });
          while (samples.length > 2 && now - samples[0].t > 120) samples.shift();
        }
      });
      host.addEventListener('pointerup', function (e) {
        if (e.pointerId !== pointerId) return;
        pointerId = null;
        pressing = false;
        host.classList.remove('dragging');
        stopDragLoop();
        if (moved) {
          x = baseX + (pointerX - startX);
          pan.style.transform = 'translateX(' + x + 'px)';
          document.addEventListener('click', function kill(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            document.removeEventListener('click', kill, true);
          }, true);
          toManual();
          var s = samples;
          if (s.length >= 2) {
            var a = s[0];
            var b = s[s.length - 1];
            var dt = b.t - a.t;
            if (dt > 0) v = ((b.x - a.x) / dt) * 16.7;
            else v = 0;
          }
          samples = [];
          startGlide();
        } else if (manual) {
          toAuto();
        } else {
          resumeTrack();
        }
      });
      host.addEventListener('pointercancel', function (e) {
        if (e.pointerId !== pointerId) return;
        pointerId = null;
        pressing = false;
        host.classList.remove('dragging');
        stopDragLoop();
        stopLoop();
        resumeTrack();
      });
      host.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        pauseTrack();
        clearTimeout(wheelTimer);
        stopLoop();
        stopDragLoop();
        x -= e.deltaX;
        v = 0;
        pan.style.transform = 'translateX(' + x + 'px)';
        wheelTimer = setTimeout(function () {
          manual = true;
          host.classList.add('manual');
        }, 300);
      }, { passive: false });
    })(tracks[ti]);
  }
})();`,
          }}
        />
      </body>
    </html>
  );
}
