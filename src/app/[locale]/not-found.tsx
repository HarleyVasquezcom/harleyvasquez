import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <section className="flex min-h-svh items-center justify-center px-4 sm:px-6 lg:px-8" aria-labelledby="not-found-title">
      <div className="max-w-xl w-full text-center">
        <p className="font-mono text-sm text-accent">{t('code')}</p>
        <h1 id="not-found-title" className="mt-4 gradient-text text-4xl sm:text-5xl font-bold tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">{t('description')}</p>
        <Link
          href="/"
          className="btn-primary mt-8 inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {t('backHome')}
        </Link>
      </div>
    </section>
  );
}