import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 gradient-text text-4xl sm:text-5xl font-bold tracking-tight">This page could not be found</h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex items-center gap-2">
          Go back home
        </Link>
      </div>
    </section>
  );
}