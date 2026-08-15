# Portfolio

A portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. Content is data-driven from `src/lib/config.ts`.

## Commands

```bash
npm run dev     # development server (http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build (after build)
npm run lint    # ESLint
```

## Deploy on Vercel

Push the repository to GitHub and import it in the [Vercel](https://vercel.com/new) dashboard. The default Next.js preset handles the build automatically. Set `NEXT_PUBLIC_*` environment variables in the dashboard if any are added to `src/lib/config.ts`.