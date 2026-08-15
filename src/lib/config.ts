export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  googleSiteVerification?: string;
  navigation: Array<{ label: string; href: string }>;
}

export interface HeroConfig {
  headline: string;
  subheadline: string;
  availabilityBadge: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  terminalLines: string[];
  scrollHint: string;
}

export interface AboutConfig {
  heading: string;
  kicker: string;
  bio: string[];
  stack: string[];
}

export type ProjectTone = 'emerald' | 'cyan' | 'metal';

export interface ProjectConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  tone: ProjectTone;
  tags: string[];
  category: string;
  link: string;
  github?: string;
  featured?: boolean;
  overview?: string;
  highlights?: string[];
  year?: string;
}

export interface ProjectsConfig {
  heading: string;
  kicker: string;
  featuredLabel: string;
  emptyState: string;
  filterLabel: string;
  categories: string[];
  items: ProjectConfig[];
  labels: {
    liveDemo: string;
    code: string;
    details: string;
    prev: string;
    next: string;
    back: string;
    stack: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface ExperienceConfig {
  heading: string;
  kicker: string;
  items: ExperienceItem[];
}

export interface ContactConfig {
  heading: string;
  kicker: string;
  email: string;
  linkedin: string;
  github: string;
  form: {
    directLabel: string;
    emailChannelLabel: string;
    linkedinChannelLabel: string;
    githubChannelLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
  };
  messages: {
    nameRequired: string;
    emailInvalid: string;
    messageTooShort: string;
    invalidPayload: string;
    success: string;
    serverError: string;
    networkError: string;
  };
}

export interface FooterConfig {
  navigation: Array<{ label: string; href: string }>;
  social: Array<{ label: string; href: string; icon: string }>;
  copyright: string;
}

export interface PortfolioConfig {
  site: SiteConfig;
  hero: HeroConfig;
  about: AboutConfig;
  projects: ProjectsConfig;
  experience: ExperienceConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}

export const siteConfig: PortfolioConfig = {
  site: {
    name: 'Portfolio',
    title: 'Software Engineer Portfolio',
    description: 'Elegant, modern portfolio showcasing software engineering projects and experience.',
    url: 'https://harleyvasquez.vercel.app',
    ogImage: '/og-image.png',
    navigation: [
      { label: 'About', href: '/#about' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  hero: {
    headline: 'Building elegant software with metallic precision',
    subheadline: 'Software engineer crafting cutting-edge web experiences. Specializing in React, TypeScript, and modern web architectures.',
    availabilityBadge: 'Available for freelance',
    ctaPrimary: {
      label: 'Get in touch',
      href: '/#contact',
    },
    ctaSecondary: {
      label: 'About me',
      href: '/#about',
    },
    terminalLines: [
      '> init portfolio...',
      '> loading config...',
      '> compiling assets...',
      '> optimizing...',
      '> ready ✓',
      '> welcome to my portfolio',
    ],
    scrollHint: 'Scroll to explore',
  },
  about: {
    heading: 'About',
    kicker: '01 · Who I am',
    bio: [
      'I\'m a software engineer passionate about building elegant, performant web applications. With a focus on clean architecture and delightful user experiences, I bridge the gap between design and engineering.',
      'When I\'m not coding, you\'ll find me exploring new technologies, contributing to open source, or refining my craft through side projects.',
    ],
    stack: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
      'Framer Motion',
      'GraphQL',
      'Docker',
      'AWS',
    ],
  },
  projects: {
    heading: 'Projects',
    kicker: '02 · Selected work',
    featuredLabel: 'Featured',
    emptyState: 'No projects match this category yet.',
    filterLabel: 'Filter projects by category',
    categories: ['All', 'Web Apps', 'Tools', 'Creative', 'Corporate Site', 'E-commerce', 'Blog', 'Portfolio', 'Landing Page', 'Microsite', 'Web App'],
    labels: {
      liveDemo: 'Live Demo',
      code: 'Code',
      details: 'View details',
      prev: 'Previous projects',
      next: 'Next projects',
      back: 'Back to projects',
      stack: 'Technologies',
    },
    items: [
      {
        id: 'aurora-sky',
        slug: 'aurora-sky',
        title: 'Aurora Sky',
        description: 'Procedural aurora sky rendered on canvas with drifting light bands, stars and a subtle starfield parallax.',
        tone: 'emerald',
        tags: ['JavaScript', 'Canvas', 'Procedural'],
        category: 'Creative',
        link: 'https://aurora-sky-nu.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: true,
        overview:
          'Aurora Sky is a canvas-driven procedural landscape that renders a convincing aurora borealis — layered light bands, twinkling starfield and slow parallax. Everything runs client-side with no external dependencies.',
        highlights: [
          'Fully procedural aurora bands driven by noise-based displacement',
          'Multi-layer light blending for iridescent color shifts',
          'Animated starfield with depth and twinkle',
        ],
        year: '2026',
      },
      {
        id: 'crypto-dashboard',
        slug: 'crypto-dashboard',
        title: 'Crypto Dashboard',
        description: 'Realtime cryptocurrency dashboard with live prices, sparkline charts and a sleek dark trading terminal.',
        tone: 'cyan',
        tags: ['JavaScript', 'Charting', 'Realtime', 'API'],
        category: 'Web Apps',
        link: 'https://crypto-dashboard-kappa-blond.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: true,
        overview:
          'A realtime cryptocurrency dashboard that tracks top coins, renders streaming sparklines and presents balances in a polished dark terminal aesthetic.',
        highlights: [
          'Live price streaming with minimal state-based updates',
          'Custom-drawn sparkline and area charts on canvas',
          'Grid-based watchlist with sorting and favorites',
        ],
        year: '2026',
      },
      {
        id: 'json-launder',
        slug: 'json-launder',
        title: 'JSON Launder',
        description: 'Paste, format, validate and minify JSON with live feedback and one-click copy.',
        tone: 'emerald',
        tags: ['JavaScript', 'Tool', 'Single-file'],
        category: 'Tools',
        link: 'https://json-launder.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'A tiny but polished JSON clean-up tool: paste any JSON, get formatting (2 or 4 spaces), minification and clear validation errors in real time.',
        highlights: [
          'Live validation with descriptive parse errors',
          'Format with 2 or 4 spaces and one-line minify',
          'Clipboard copy of output',
        ],
        year: '2026',
      },
      {
        id: 'neural-glow',
        slug: 'neural-glow',
        title: 'Neural Glow',
        description: 'Interactive neural-network-style particle field with glowing connections and mouse attraction.',
        tone: 'cyan',
        tags: ['JavaScript', 'Canvas', 'Simulation'],
        category: 'Creative',
        link: 'https://neural-glow.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Neural Glow simulates hundreds of particles as nodes with proximity-based glowing links — the cursor acts as an attractor for a playful, organic interactive field.',
        highlights: [
          'Proximity-linked glow lines with distance culling',
          'Pointer attraction with smooth easing',
          'DPR-aware rendering for crisp high-density displays',
        ],
        year: '2026',
      },
      {
        id: 'palette-loom',
        slug: 'palette-loom',
        title: 'Palette Loom',
        description: 'Seeded color-palette generator with golden-angle harmony, per-swatch locking and click-to-copy hex.',
        tone: 'emerald',
        tags: ['JavaScript', 'Color', 'Utility'],
        category: 'Tools',
        link: 'https://palette-loom.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Palette Loom weaves deterministic color palettes from a numeric seed. A golden-angle harmonic mode picks pleasing hues, swatches can be locked during regeneration, and a click copies any hex.',
        highlights: [
          'Deterministic palettes from a numeric seed',
          'Golden-angle harmonic harmony mode',
          'Per-swatch lock and click-to-copy hex',
        ],
        year: '2026',
      },
      {
        id: 'pomodoro-ember',
        slug: 'pomodoro-ember',
        title: 'Pomodoro Ember',
        description: 'A warm, focused Pomodoro timer with ember glow, session rings and desktop notifications.',
        tone: 'metal',
        tags: ['JavaScript', 'Timer', 'PWA'],
        category: 'Web Apps',
        link: 'https://pomodoro-ember.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Pomodoro Ember is a distraction-free focus timer with an ember-glow session ring, configurable work/break intervals and desktop notifications when it is time to switch.',
        highlights: [
          'Ember-glow progress ring',
          'Configurable work and break intervals',
          'Desktop notifications on session change',
        ],
        year: '2026',
      },
      {
        id: 'type-racer',
        slug: 'type-racer',
        title: 'Type Racer',
        description: 'A typing-speed test with live WPM, accuracy and highlighted ghost text over a metallic terminal UI.',
        tone: 'metal',
        tags: ['JavaScript', 'Game', 'Metrics'],
        category: 'Tools',
        link: 'https://type-racer-indol.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: true,
        overview:
          'Type Racer measures typing speed and accuracy with per-character highlighting, live WPM and accuracy stats, and a final panel of metrics when you finish the phrase.',
        highlights: [
          'Per-character correct/current/wrong ghost text',
          'Live WPM + accuracy during the run',
          'Final metrics: WPM, accuracy, chars, time, CPS, raw',
        ],
        year: '2026',
      },
      {
        id: 'kanban-board',
        slug: 'kanban-board',
        title: 'Kanban Board',
        description: 'A kanban board with drag-and-drop cards, tags, live filtering and a dark neon terminal look.',
        tone: 'metal',
        tags: ['JavaScript', 'Kanban', 'Drag & Drop'],
        category: 'Web Apps',
        link: 'https://kanban-board-lilac-gamma.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'A full kanban board in one file: add/rename/remove columns, manage cards with titles, descriptions and multiple tags, move cards with native drag & drop or the keyboard, and filter by text. All state persists to localStorage.',
        highlights: [
          'Native drag & drop across columns with keyboard fallback',
          'Rename-inline columns and tag-editable cards in a modal',
          'HUD stats (open/done) and search that hides empty columns',
        ],
        year: '2026',
      },
      {
        id: 'ledger-app',
        slug: 'ledger-app',
        title: 'Ledger',
        description: 'A personal finance ledger with month navigation, per-category donut chart and budget hints.',
        tone: 'metal',
        tags: ['JavaScript', 'Finance', 'Charts'],
        category: 'Web Apps',
        link: 'https://ledger-app-self-five.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Ledger is a Stripe-like finance tracker: log income and expenses, browse by month, see expenses as a CSS-driven donut with a legend and per-category budget hints, and export to CSV.',
        highlights: [
          'Month switcher with balance, income, expenses and net KPIs',
          'Donut chart of expenses by category with over-budget hints',
          'CSV export and localStorage persistence',
        ],
        year: '2026',
      },
      {
        id: 'notes-vault',
        slug: 'notes-vault',
        title: 'Notes Vault',
        description: 'A scientific-editorial notebook with a lightweight markdown renderer, pinning and export.',
        tone: 'metal',
        tags: ['JavaScript', 'Markdown', 'Editorial'],
        category: 'Tools',
        link: 'https://notes-vault-two.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Notes Vault is a paper-styled notebook that renders markdown-like syntax (headings, bullets, checklists, inline code) with zero dependencies, autosaves with a debounce, and exports notes as .md or the whole vault as JSON.',
        highlights: [
          'Custom markdown-like renderer with Write/Preview tabs',
          'Autosave with debounce and pin favorites',
          'Export single note (.md) or vault (.json) and import by drag-drop',
        ],
        year: '2026',
      },
      {
        id: 'audio-spectrum',
        slug: 'audio-spectrum',
        title: 'Audio Spectrum',
        description: 'A live Web Audio visualizer — bars, wave and orb modes from your mic or a demo tone.',
        tone: 'cyan',
        tags: ['JavaScript', 'Web Audio', 'Canvas'],
        category: 'Creative',
        link: 'https://audio-spectrum-rho.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Audio Spectrum captures your microphone and paints real-time FFT bars, an oscilloscope wave or a radial orb on canvas — with a built-in demo tone so it works with no permission, plus a sensitivity slider.',
        highlights: [
          'Three canvas modes: BARS, WAVE, ORB (radial ring)',
          'Microphone capture with demo-tone fallback',
          'Pre-gain sensitivity slider and RMS/PEAK HUD',
        ],
        year: '2026',
      },
      {
        id: 'message-threads',
        slug: 'message-threads',
        title: 'Message Threads',
        description: 'A paper-styled chat client with threads, quoted replies and a global message search.',
        tone: 'metal',
        tags: ['JavaScript', 'Chat', 'Persistence'],
        category: 'Web Apps',
        link: 'https://message-threads.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Message Threads is a conversational client over warm paper: create threads, send messages with authors and timestamps, quote replies, and jump to matching threads from a global search. Everything persists to localStorage.',
        highlights: [
          'Thread list with avatars, counts and live snippets',
          'Light markdown (bold, italic, code) and quoted replies',
          'Global message search that highlights and opens the thread',
        ],
        year: '2026',
      },
      {
        id: 'recipe-book',
        slug: 'recipe-book',
        title: 'Recipe Book',
        description: 'A rustic cozy cookbook with searchable recipes, ingredient checklists and scaling.',
        tone: 'emerald',
        tags: ['JavaScript', 'Recipe', 'CRUD'],
        category: 'Web Apps',
        link: 'https://recipe-book-one-swart.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Recipe Book stores your recipes with ingredients and steps, offers a cozy card grid with live search and tag filtering, ingredient checklists in the detail view, and scales ingredient quantities as you cook.',
        highlights: [
          'Full recipe CRUD with time, difficulty, tags and favorites',
          'Detail modal with interactive checkable ingredients and steps',
          'Search + tag filter with demo recipes pre-loaded',
        ],
        year: '2026',
      },
      {
        id: 'travel-planner',
        slug: 'travel-planner',
        title: 'Travel Planner',
        description: 'A brutalist trip planner with a timeline, pre-travel checklists and JSON export.',
        tone: 'metal',
        tags: ['JavaScript', 'Planner', 'CRUD'],
        category: 'Tools',
        link: 'https://travel-planner-ten-rust.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Travel Planner logs trips, build and searches destinations, compares them on a timeline, and tracks Documentation/Packing/Booking checklists before you go.',
        highlights: [
          'Trip CRUD sorted by start date with country filters',
          'Timeline view comparing trips',
          'Preparation checklists and JSON export/import',
        ],
        year: '2026',
      },
      {
        id: 'corporate-site',
        slug: 'corporate-site',
        title: 'Nexora Solutions',
        description: 'A full corporate website for an IT services firm — services, stats counters, testimonials and a validated contact form.',
        tone: 'cyan',
        tags: ['JavaScript', 'Corporate', 'Single-file'],
        category: 'Corporate Site',
        link: 'https://corporate-site-psi-nine.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: true,
        overview:
          'Nexora Solutions is a corporate website for an IT services & consulting company: sticky scrollspy nav, animated stat counters, services grid, testimonials carousel and a fully validated contact form — all in a single self-contained file.',
        highlights: [
          'Scrollspy navigation and animated stat counters',
          'Services grid with modal-style detail sections',
          'Validated contact form with success/error states',
        ],
        year: '2026',
      },
      {
        id: 'online-store',
        slug: 'online-store',
        title: 'Voltgear',
        description: 'A working e-commerce store — searchable catalog, cart drawer with free-shipping progress and a Luhn-validated checkout.',
        tone: 'emerald',
        tags: ['JavaScript', 'E-commerce', 'Checkout'],
        category: 'E-commerce',
        link: 'https://online-store-nu-fawn.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Voltgear is a full electronics store in one file: 10 products with search and category filtering, product detail modal, slide-in cart with quantity controls and a free-shipping progress bar, and a simulated checkout that validates the card with Luhn.',
        highlights: [
          'Search + category-filtered catalog with detail modal',
          'Cart drawer with free-shipping progress bar ($150 threshold)',
          'Checkout with Luhn card validation and order-number success screen',
        ],
        year: '2026',
      },
      {
        id: 'tech-blog',
        slug: 'tech-blog',
        title: 'Byte Post',
        description: 'A tech blog with SPA-style article reading, an inline markdown renderer, live search and category filtering.',
        tone: 'emerald',
        tags: ['JavaScript', 'Blog', 'Markdown'],
        category: 'Blog',
        link: 'https://tech-blog-ten-omega.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Byte Post is an editorial tech blog: 10 embedded articles in a searchable, filterable grid that open in an SPA reading view — with a reading-progress bar, a hand-rolled markdown renderer, related articles and a validated newsletter form.',
        highlights: [
          'SPA article view with reading-progress bar and related posts',
          'Inline markdown renderer (fenced code, lists, blockquotes)',
          'Debounced live search + category chips with empty state',
        ],
        year: '2026',
      },
      {
        id: 'artist-portfolio',
        slug: 'artist-portfolio',
        title: 'Lens & Line',
        description: 'A photographer & designer portfolio with 16 generated SVG artworks, category filters and a full lightbox.',
        tone: 'metal',
        tags: ['JavaScript', 'Portfolio', 'Lightbox'],
        category: 'Portfolio',
        link: 'https://artist-portfolio-tawny-rho.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Lens & Line is a portfolio site for a fictional photographer & designer: 16 procedurally generated SVG artworks across photography, design and 3D, with filterable gallery, arrow-key lightbox, animated skill bars and a validated contact form.',
        highlights: [
          '16 procedural SVG artworks with category filters',
          'Lightbox with keyboard, prev/next and wrap navigation',
          'Scroll-triggered counters and skill bars',
        ],
        year: '2026',
      },
      {
        id: 'landing-page',
        slug: 'landing-page',
        title: 'LaunchKit',
        description: 'A product launch landing page — pricing toggle, FAQ accordion and validated lead-capture forms.',
        tone: 'cyan',
        tags: ['JavaScript', 'Landing Page', 'Conversion'],
        category: 'Landing Page',
        link: 'https://landing-page-rust-gamma-60.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'LaunchKit is a conversion-focused landing page for shipping product launches in minutes: bold hero, feature grid, monthly/yearly pricing toggle, FAQ accordion and lead-capture forms with inline validation and success states.',
        highlights: [
          'Monthly/yearly pricing toggle with animated prices',
          'FAQ accordion and feature grid',
          'Validated lead forms with success/error feedback',
        ],
        year: '2026',
      },
      {
        id: 'microsite',
        slug: 'microsite',
        title: 'CodeFest 2026',
        description: 'A conference microsite — live countdown, tabbed agenda, speaker cards, venue map and a ticket flow.',
        tone: 'metal',
        tags: ['JavaScript', 'Microsite', 'Event'],
        category: 'Microsite',
        link: 'https://microsite-nine-rho.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'CodeFest 2026 is a single-purpose conference microsite: hero with live countdown to the event, 2-day tabbed agenda, speaker grid, animated venue map with a real .ics download, and a 3-tier ticket flow with validated form and fake promo-code success screen.',
        highlights: [
          'Live countdown with automatic live/happening-now state',
          'Tabbed agenda, speaker cards and venue map with .ics export',
          'Tiered ticket modal with validation and success screen',
        ],
        year: '2026',
      },
      {
        id: 'web-app',
        slug: 'web-app',
        title: 'TaskFlow',
        description: 'A terminal-styled project manager — projects, boards, columns and tasks with full CRUD, drag & drop and search.',
        tone: 'cyan',
        tags: ['JavaScript', 'Web App', 'CRUD'],
        category: 'Web App',
        link: 'https://web-app-psi-rouge-61.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'TaskFlow is a dark-terminal project manager: organize work as projects → boards → columns → tasks with full CRUD, native drag & drop plus keyboard moves, live search with a "/" shortcut, priority chips and a stats HUD — all persisted to localStorage.',
        highlights: [
          'Hierarchical CRUD (projects, boards, columns, tasks)',
          'Native drag & drop with keyboard fallback',
          'Live search, priority chips and stats HUD',
        ],
        year: '2026',
      },
      {
        id: 'sentinel-systems',
        slug: 'sentinel-systems',
        title: 'Sentinel Systems',
        description: 'Sitio corporativo de una empresa de cámaras de seguridad — venta, instalación, soporte, reparación, asesoría y monitoreo.',
        tone: 'cyan',
        tags: ['JavaScript', 'Corporate', 'Seguridad'],
        category: 'Corporate Site',
        link: 'https://sentinel-systems-three.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: true,
        overview:
          'Sentinel Systems es un sitio corporativo completo para una empresa de videovigilancia: hero con panel de "live feed" simulado (REC, scanlines, reloj UTC), 6 servicios (venta, instalación, soporte, reparación, asesoría, monitoreo), contadores animados, garantías con SLA de 4h, testimonios y formulario de contacto validado — todo en un solo archivo.',
        highlights: [
          'Panel de live feed simulado con reloj UTC y scanlines',
          '6 tarjetas de servicio en español + contadores animados',
          'Formulario de contacto validado con toasts de éxito/error',
        ],
        year: '2026',
      },
      {
        id: 'vigil-store',
        slug: 'vigil-store',
        title: 'VigilStore',
        description: 'Tienda virtual de cámaras de seguridad — 14 productos con arte SVG, carrito con envío gratis y checkout validado con Luhn.',
        tone: 'emerald',
        tags: ['JavaScript', 'E-commerce', 'Checkout'],
        category: 'E-commerce',
        link: 'https://vigil-store.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'VigilStore es una tienda de videovigilancia en un solo archivo: 14 productos (cámaras, grabadoras, accesorios) con arte SVG único, filtro por categoría (Cámaras/Grabadoras/Accesorios) + búsqueda en vivo, modal de detalle con specs adaptadas por tipo, carrito con barra de envío gratis ($200) y checkout simulado con validación Luhn.',
        highlights: [
          '14 productos con arte SVG inline único y specs por tipo',
          'Carrito con barra de envío gratis y persistencia localStorage',
          'Checkout simulado con validación Luhn y pantalla de éxito',
        ],
        year: '2026',
      },
      {
        id: 'cctv-blog',
        slug: 'cctv-blog',
        title: 'CCTV Insights',
        description: 'Blog en español del nicho videovigilancia — 10 artículos, lector SPA con markdown, búsqueda en vivo y categorías.',
        tone: 'emerald',
        tags: ['JavaScript', 'Blog', 'Markdown'],
        category: 'Blog',
        link: 'https://cctv-blog-seven.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'CCTV Insights es un blog editorial de videovigilancia: 10 artículos en español (instalación, equipos, seguridad, mantenimiento, legal) con covers SVG por categoría, búsqueda con debounce, y lector SPA con barra de progreso, renderizador markdown propio y artículos relacionados.',
        highlights: [
          'Lector SPA con barra de progreso y renderizador markdown',
          'Búsqueda en vivo + chips de categoría con empty state',
          'Newsletter validado con estados de éxito/error',
        ],
        year: '2026',
      },
      {
        id: 'cams-portfolio',
        slug: 'cams-portfolio',
        title: 'CamCraft Installs',
        description: 'Portafolio de instalaciones de videovigilancia — 16 obras SVG procedimentales, lightbox con foco y filtros por categoría.',
        tone: 'metal',
        tags: ['JavaScript', 'Portfolio', 'Lightbox'],
        category: 'Portfolio',
        link: 'https://cams-portfolio.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'CamCraft Installs es el portafolio de un instalador profesional: 16 escenas SVG generadas procedimentalmente (residencial, comercial, industrial, exteriores), galería filtrable, lightbox con foco y navegación por teclado, contadores de estadísticas y formulario de contacto validado.',
        highlights: [
          '16 escenas de instalación SVG únicas en 4 categorías',
          'Lightbox con focus trap, teclado y descripción del proyecto',
          'Contadores animados + banda de servicios',
        ],
        year: '2026',
      },
      {
        id: 'security-audit',
        slug: 'security-audit',
        title: 'Guardia360',
        description: 'Landing page en español para captar leads — evaluación de seguridad gratis, paquetes con toggle y countdown de urgencia.',
        tone: 'cyan',
        tags: ['JavaScript', 'Landing Page', 'Leads'],
        category: 'Landing Page',
        link: 'https://security-audit-delta.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Guardia360 es una landing de conversión enfocada en una oferta concreta: evaluación de seguridad gratuita para casa o negocio. Formulario de leads validado en el hero, 6 tarjetas de pain points, proceso en 4 pasos, 3 paquetes de cámaras con toggle (Solo equipo / Kit completo), FAQ y countdown de urgencia a fin de mes.',
        highlights: [
          'Formulario de leads validado con confirmación',
          'Toggle de paquetes Solo equipo / Kit completo',
          'Urgency: countdown a fin de mes + cupos restantes',
        ],
        year: '2026',
      },
      {
        id: 'cam-launch',
        slug: 'cam-launch',
        title: 'Semana de la Cámara',
        description: 'Micrositio del evento "Semana de la Cámara 2026" — countdown, agenda de 7 días reservable, mapa con .ics y registro.',
        tone: 'metal',
        tags: ['JavaScript', 'Microsite', 'Evento'],
        category: 'Microsite',
        link: 'https://cam-launch.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Semana de la Cámara es el micrositio de una expo de videovigilancia: countdown en vivo al 7 sep 2026, agenda tabulada de 7 días con sesiones reservables, 6 highlights, mapa SVG con zoom y descarga real de .ics, y registro validado con código de confirmación falso.',
        highlights: [
          'Countdown en vivo con estados "happening now" y finalizado',
          'Agenda de 7 días con reservas desde cada fila',
          'Mapa SVG con zoom + descarga .ics real',
        ],
        year: '2026',
      },
      {
        id: 'cam-command',
        slug: 'cam-command',
        title: 'CamCommand',
        description: 'Sala de monitoreo en el navegador — feeds animados SVG, control PTZ, snapshots, log de eventos y HUD de estado.',
        tone: 'cyan',
        tags: ['JavaScript', 'Web App', 'Monitoreo'],
        category: 'Web App',
        link: 'https://cam-command.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'CamCommand es una sala de control de videovigilancia: grid de cámaras con feeds animados (escenas SVG en movimiento), vista enfocada con controles PTZ que mueven la escena, snapshot que captura miniaturas con timestamp, log de alertas de movimiento filtrable y HUD con estadísticas — todo persiste en localStorage.',
        highlights: [
          'Feeds simulados con escenas SVG animadas y estados online/offline',
          'Controles PTZ funcionales (pan/tilt/zoom sobre la escena)',
          'Log de eventos, snapshots y HUD persistente',
        ],
        year: '2026',
      },
      {
        id: 'barker-modern',
        slug: 'barker-modern',
        title: 'Barker Modern',
        description: 'Sitio corporativo de gabinetes RTA modernos — catálogo Kitchen/Bath/Closet, 14 tipos de gabinete, ofertas por volumen y specs Blum Movento, con el sistema de diseño ámbar/navy del sitio local de referencia.',
        tone: 'metal',
        tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
        category: 'Corporate Site',
        link: 'https://barker-modern.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Barker Modern es un sitio corporativo de una sola página para una marca real de gabinetes RTA (Ready to Assemble) fabricados en USA: hero con slider crossfade y contadores animados, catálogo Kitchen/Bath/Closet, 14 tipos de gabinetes, planes de ofertas por volumen (free shipping sobre $4k y descuentos escalonados hasta 10%), galería marquee de proyectos, testimonios, guías de design/assembly/samples y CTA band — todo replicando el sistema de diseño ámbar/navy (Sora + Inter, esquinas rectas) de la web local de referencia.',
        highlights: [
          'Sistema de diseño ámbar/navy replicado del sitio de referencia',
          'Hero slider crossfade + títulos rotativos + stats con contador',
          'Catálogo completo con 14 tipos de gabinetes y ofertas reales',
        ],
        year: '2026',
      },
      {
        id: 'vettaz',
        slug: 'vettaz',
        title: 'VETTAZ',
        description: 'Sitio corporativo de cocinas de diseño a medida en Bogotá — 20 proyectos reales de cocina, contract para constructoras, proceso de 4 fases y formulario de cita, con el sistema de diseño zinc/cian del demo corporate-site.',
        tone: 'metal',
        tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
        category: 'Corporate Site',
        link: 'https://vettaz.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'VETTAZ es un sitio corporativo de una sola página para una marca de cocinas de diseño a medida en Bogotá: hero full-screen con glows animados y grid, galería de 20 proyectos reales de cocina (grid 3×3 + carrusel), 6 proyectos contract con número de unidades para constructoras, historia desde 1984 con ISO 9001 y stats con contadores, proceso de 4 fases, blog, testimonios y formulario de cita validado con toast — replicando el sistema de diseño zinc oscuro + acento cian (tipografía mono, bordes redondeados) del demo corporate-site.',
        highlights: [
          'Diseño zinc/cian replicado del demo corporate-site (Nexora)',
          '20 proyectos de cocina con sus descripciones reales adaptadas a Colombia',
          'Hero con glows animados, stats contadores y formulario validado con toast',
        ],
        year: '2026',
      },
    {
        id: 'url-shortener',
        slug: 'url-shortener',
        title: 'TinyLink',
        description: 'An offline hacker-terminal URL shortener with a local history table, regenerable 6-char codes and click stats.',
        tone: 'emerald',
        tags: ['JavaScript', 'Tool', 'Single-file'],
        category: 'Tools',
        link: 'https://url-shortener-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'TinyLink is a fully offline URL shortener in a phosphor-green terminal aesthetic: paste any link and mint a 6-character code, keep every shortlink in a local history table with created date and a click counter, copy or open codes, export history as JSON.',
        highlights: [
          '6-char codes from a custom charset, generated locally',
          'History table with click stats and JSON export',
          'Zero network dependencies — runs fully offline',
        ],
        year: '2026',
      },
      {
        id: 'password-generator',
        slug: 'password-generator',
        title: 'PassForge',
        description: 'A retro-arcade password generator using crypto-secure randomness, with strength meter, entropy and history.',
        tone: 'metal',
        tags: ['JavaScript', 'Security', 'Tool'],
        category: 'Tools',
        link: 'https://password-generator-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'PassForge forges passwords with crypto.getRandomValues on a neon CRT grid: length slider from 8 to 64, uppercase/lowercase/digits/symbols toggles, ambiguous-character exclusion, a live strength meter with entropy bits, five-at-a-time generation and a copyable history.',
        highlights: [
          'Cryptographically secure generation via Web Crypto',
          'Strength meter with entropy bit countdown',
          'History of the last 15 passwords with one-click copy and delete',
        ],
        year: '2026',
      },
      {
        id: 'speed-tester',
        slug: 'speed-tester',
        title: 'SpeedPulse',
        description: 'An instrument-console internet speed test with live ping and download gauges, history chart and JSON export.',
        tone: 'cyan',
        tags: ['JavaScript', 'Network', 'Metrics'],
        category: 'Tools',
        link: 'https://speed-tester-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'SpeedPulse measures your connection on canvas-drawn instrument gauges: a 3-run ping average, download tests at 5/20/50 MB against a CORS-enabled CDN endpoint with live progress, and a history sparkline of the last 10 results with JSON export.',
        highlights: [
          'Ping average and live Mbps during download tests',
          'Canvas arc gauges and a history line chart',
          'Export results as JSON for your own logging',
        ],
        year: '2026',
      },
      {
        id: 'image-editor',
        slug: 'image-editor',
        title: 'PixelKit',
        description: 'A warm creative-studio image editor: crop, rotate, flip, color filters and PNG/JPEG export with undo/redo.',
        tone: 'emerald',
        tags: ['JavaScript', 'Canvas', 'Imaging'],
        category: 'Tools',
        link: 'https://image-editor-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'PixelKit is a canvas-based image editor in a soft studio aesthetic: drop in any image, crop with free or preset ratios (16:9, 4:3, 1:1, 3:4, 9:16), rotate and flip, tune brightness/contrast/saturation/sepia, undo and redo the last 10 steps, and export PNG or JPEG with a quality slider.',
        highlights: [
          'Draggable crop overlay with preset aspect ratios',
          'Undo/redo stack and before/after preview',
          'PNG/JPEG export with JPEG quality control',
        ],
        year: '2026',
      },
      {
        id: 'qr-generator',
        slug: 'qr-generator',
        title: 'Qrafter',
        description: 'A Swiss-brutalist QR generator for text, Wi-Fi and vCard contacts, with color options and history.',
        tone: 'metal',
        tags: ['JavaScript', 'QR', 'Tool'],
        category: 'Tools',
        link: 'https://qr-generator-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Qrafter crafts QR codes in a bold print aesthetic: choose Text/URL, Wi-Fi (with encryption and hidden-network options) or vCard contact inputs, tweak size and foreground/background colors, preview live, and download the PNG while a local history keeps your last 10 codes.',
        highlights: [
          'Text, Wi-Fi and vCard input modes with validation',
          'Custom size and color options with live preview',
          'PNG download and 10-item history in localStorage',
        ],
        year: '2026',
      },
      {
        id: 'format-converter',
        slug: 'format-converter',
        title: 'FormatZen',
        description: 'A Swiss-minimal format converter: JSON ↔ CSV ↔ XML ↔ YAML-subset, fully offline with live error feedback.',
        tone: 'cyan',
        tags: ['JavaScript', 'Data', 'Tool'],
        category: 'Tools',
        link: 'https://format-converter-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'FormatZen converts data between JSON, CSV, XML and a YAML subset entirely in the browser: JSON→CSV, CSV→JSON with delimiter choice, XML→JSON, JSON→XML and JSON→YAML, with sample inputs, prettify, swap, copy, download and a 10-step conversion history.',
        highlights: [
          'Five conversion directions with delimiter options',
          'Bilingual parse errors instead of silent failures',
          'Conversion history with re-load into the input panel',
        ],
        year: '2026',
      },
      {
        id: 'stopwatch-timer',
        slug: 'stopwatch-timer',
        title: 'Tempo',
        description: 'A split-flap style stopwatch and countdown timer with laps, milestones and a canvas progress ring.',
        tone: 'metal',
        tags: ['JavaScript', 'Timer', 'PWA'],
        category: 'Tools',
        link: 'https://stopwatch-timer-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Tempo is a split-flap departure-board timer: a stopwatch with lap lists, best/worst lap highlight and CSV export, plus a countdown with presets, a custom mm:ss input, a canvas progress ring and WebAudio chimes with optional per-minute milestones.',
        highlights: [
          'Split-flap display with hundredths precision',
          'Lap tracking with best/worst and CSV export',
          'Countdown ring with WebAudio chimes',
        ],
        year: '2026',
      },
      {
        id: 'mortgage-calculator',
        slug: 'mortgage-calculator',
        title: 'MortgageSim',
        description: 'A classic bank-ledger mortgage calculator: monthly payments, amortization table, LTV and stacked charts.',
        tone: 'metal',
        tags: ['JavaScript', 'Finance', 'Charts'],
        category: 'Tools',
        link: 'https://mortgage-calculator-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'MortgageSim models a mortgage on ruled ledger paper: price, down payment as % or amount, interest rate, term, optional property tax and insurance feed a monthly-breakdown stacked bar, a full amortization table with month search, and an LTV card — in USD, EUR or COP.',
        highlights: [
          'Full amortization schedule with month search',
          'Stacked principal/interest/tax/insurance breakdown on canvas',
          'USD / EUR / COP formatting via Intl.NumberFormat',
        ],
        year: '2026',
      },
      {
        id: 'todo-list',
        slug: 'todo-list',
        title: 'DoneDeck',
        description: 'A card-table task board: drag cards across Backlog, Doing and Done with suits, due dates and search.',
        tone: 'emerald',
        tags: ['JavaScript', 'Kanban', 'Drag & Drop'],
        category: 'Web Apps',
        link: 'https://todo-list-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'DoneDeck manages tasks on a green-felt card table: cards live in Backlog, Doing and Done, move via arrow buttons or pointer drag & drop, and carry priority suits (spade/heart/club), notes and due dates with overdue badges — with search, sort, stats and full persistence.',
        highlights: [
          'Pointer drag & drop plus button fallbacks',
          'Priority suits, due dates and overdue badges',
          'Stats bar with per-column counts and completion %',
        ],
        year: '2026',
      },
      {
        id: 'synonym-finder',
        slug: 'synonym-finder',
        title: 'WordWeave',
        description: 'An editorial newspaper-style synonym finder powered by the Datamuse API with history and word of the day.',
        tone: 'metal',
        tags: ['JavaScript', 'API', 'Reference'],
        category: 'Tools',
        link: 'https://synonym-finder-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'WordWeave is a newspaper-style thesaurus: type a word and parallel Datamuse requests return synonyms, antonyms and related words as clickable chips (click copies, double-click searches again), with a curated word of the day, debounced input and a 12-entry history.',
        highlights: [
          'Synonyms, antonyms and meaning-related results in parallel',
          'Click-to-copy and double-click-to-search chips',
          'Debounced input with in-memory caching',
        ],
        year: '2026',
      },
      {
        id: 'rss-reader',
        slug: 'rss-reader',
        title: 'FeedFetch',
        description: 'A broadsheet-style RSS/OPML reader: paste any feed XML and browse, star, search and export items.',
        tone: 'metal',
        tags: ['JavaScript', 'RSS', 'Reader'],
        category: 'Web Apps',
        link: 'https://rss-reader-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'FeedFetch reads RSS and OPML pasted as XML, rendering feeds like a daily broadsheet: unread and starred filters, full-text search, item export as JSON or OPML, and three embedded sample feeds so it works the moment it loads.',
        highlights: [
          'Client-side RSS/OPML parsing with DOMParser',
          'Unread, starred and search filters with counts',
          'Export parsed items as JSON or OPML',
        ],
        year: '2026',
      },
      {
        id: 'currency-converter',
        slug: 'currency-converter',
        title: 'CoinVoyage',
        description: 'A vintage-stamp currency converter: 40+ currencies, favorites, a 14-day sparkline and offline cache.',
        tone: 'cyan',
        tags: ['JavaScript', 'Finance', 'API'],
        category: 'Tools',
        link: 'https://currency-converter-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'CoinVoyage converts between 40+ currencies on postage-stamp styling: live rates refresh every 10 minutes from a keyless public API, star favorite pairs for a quick-pick row, inspect an inverse rate, and follow a canvas sparkline of sampled historical rates.',
        highlights: [
          '40+ currencies with searchable select and swap',
          'Favorited pairs row persisted locally',
          '14-day sparkline from historical samples',
        ],
        year: '2026',
      },
      {
        id: 'name-generator',
        slug: 'name-generator',
        title: 'NameForge',
        description: 'A whiteboard-style deterministic name generator with vibe chips, a seed slider and favorites.',
        tone: 'emerald',
        tags: ['JavaScript', 'Utility', 'Creative'],
        category: 'Tools',
        link: 'https://name-generator-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'NameForge scribbles developer, project and product names on a chalk whiteboard: pick a vibe (Web, AI, CLI, Game, Data, Cloud, Minimal or Español), slide a numeric seed so the same seed always yields the same names, mint 10 at once, and keep favorites locally.',
        highlights: [
          'Deterministic names driven by a numeric seed',
          'Vibe chips with an Español word bank',
          '10-name bulk generation with copy-on-click favorites',
        ],
        year: '2026',
      },
      {
        id: 'weather-map',
        slug: 'weather-map',
        title: 'Nowcast',
        description: 'A glassmorphism weather console: current conditions, 24h chart, 7-day forecast and an OpenStreetMap map.',
        tone: 'cyan',
        tags: ['JavaScript', 'Weather', 'API', 'Map'],
        category: 'Web Apps',
        link: 'https://weather-map-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'Nowcast is a sky-blue weather console: geolocation (or city search) drives Open-Meteo current conditions — temperature, feels-like, humidity, wind, pressure and WMO codes with bilingual descriptions — plus a 24-hour bar chart, 7-day cards with sunrise/sunset, and a pannable OpenStreetMap centered on the pin.',
        highlights: [
          'Keyless Open-Meteo forecast with bilingual condition codes',
          '24h temperature/precipitation chart on canvas',
          'Interactive OSM map with attribution',
        ],
        year: '2026',
      },
      {
        id: 'word-counter',
        slug: 'word-counter',
        title: 'WordScale',
        description: 'A library-card word counter: words, characters, sentences, reading time and keyword charts with TXT export.',
        tone: 'metal',
        tags: ['JavaScript', 'Text', 'Metrics'],
        category: 'Tools',
        link: 'https://word-counter-harley-vasquez.vercel.app',
        github: 'https://github.com/HarleyVasquezcom/portfolio-demos',
        featured: false,
        overview:
          'WordScale weighs your text on index-card styling: live words, characters with and without spaces, sentences, paragraphs, unique words, estimated syllables, reading and speaking time, an approximate readability score, top keyword bars and a sentence-length chart — all exportable as TXT.',
        highlights: [
          'Ten live metrics including reading/speaking time',
          'Keyword frequency and sentence-length charts',
          'TXT summary export and paste auto-detect',
        ],
        year: '2026',
      },
    ],
  },
  experience: {
    heading: 'Experience',
    kicker: '03 · Professional history',
    items: [
      {
        id: 'exp-1',
        role: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        period: '2022 — Present',
        location: 'San Francisco, CA (Remote)',
        description: [
          'Lead frontend architecture for flagship SaaS product serving 100k+ users',
          'Migrated legacy codebase to Next.js 14 with App Router, improving performance by 40%',
          'Mentored 5 engineers and established frontend best practices',
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'AWS'],
      },
      {
        id: 'exp-2',
        role: 'Software Engineer',
        company: 'StartupXYZ',
        period: '2020 — 2022',
        location: 'New York, NY',
        description: [
          'Built and maintained customer-facing web applications',
          'Implemented design system reducing UI development time by 60%',
          'Optimized bundle size and Core Web Vitals across all products',
        ],
        technologies: ['React', 'TypeScript', 'Webpack', 'Jest', 'Storybook', 'Figma'],
      },
      {
        id: 'exp-3',
        role: 'Junior Developer',
        company: 'Digital Agency',
        period: '2018 — 2020',
        location: 'Austin, TX',
        description: [
          'Developed responsive websites and web applications for diverse clients',
          'Collaborated with designers to implement pixel-perfect UIs',
          'Learned modern frontend practices and testing methodologies',
        ],
        technologies: ['JavaScript', 'React', 'SCSS', 'Git', 'WordPress', 'PHP'],
      },
    ],
  },
  contact: {
    heading: 'Contact',
    kicker: '04 · Let\'s connect',
    email: 'YOUR_EMAIL@example.com',
    linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
    github: 'https://github.com/HarleyVasquezcom',
    form: {
      directLabel: 'Or reach me directly',
      emailChannelLabel: 'Email',
      linkedinChannelLabel: 'LinkedIn',
      githubChannelLabel: 'GitHub',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project or role...',
      submitLabel: 'Send message',
      submittingLabel: 'Sending...',
    },
    messages: {
      nameRequired: 'Please enter your name.',
      emailInvalid: 'Please enter a valid email address.',
      messageTooShort: 'Your message must be at least 10 characters.',
      invalidPayload: 'The request could not be processed. Please try again.',
      success: 'Thanks! Your message has been sent.',
      serverError: 'Something went wrong on our end. Please try again later.',
      networkError: 'Could not reach the server. Please check your connection and try again.',
    },
  },
  footer: {
    navigation: [
      { label: 'Home', href: '/#hero' },
      { label: 'About', href: '/#about' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Contact', href: '/#contact' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/HarleyVasquezcom', icon: 'github' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_USERNAME', icon: 'linkedin' },
      { label: 'Email', href: 'mailto:YOUR_EMAIL@example.com', icon: 'mail' },
    ],
    copyright: 'Built with precision and care.',
  },
};
