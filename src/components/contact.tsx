'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, AtSign, CircleAlert, CircleCheck, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { validateContact, type ContactErrorCode, type ContactField } from '@/lib/validation';
import { SectionHeading } from './section-heading';
import { Github, Linkedin } from './icons';

type Status = 'idle' | 'submitting' | 'success';

type FieldErrors = Partial<Record<ContactField, string>>;

const fieldId = (field: ContactField) => `contact-${field}`;
const fieldErrorId = (field: ContactField) => `contact-${field}-error`;

const inputClasses = (hasError: boolean) =>
  `w-full rounded-lg border bg-card px-4 py-2.5 text-fg placeholder:text-fg-muted/60 transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-error/60 focus:border-error focus:ring-error/40'
      : 'border-border focus:border-accent focus:ring-accent/30'
  }`;

export function Contact() {
  const t = useTranslations('contact');
  const form = t.raw('form') as Record<string, string>;
  const heading = t('heading');
  const kicker = t('kicker');

  const { email, linkedin, github } = siteConfig.contact;

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const messageFor = (code: ContactErrorCode) => t(`messages.${code}`);

  const handleChange =
    (field: ContactField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      setServerError(null);
      if (status === 'success') setStatus('idle');
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || submittingRef.current) return;

    setServerError(null);

    const trimmed = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    const validationErrors = validateContact(trimmed);
    if (validationErrors.length > 0) {
      const errorMap: FieldErrors = {};
      for (const err of validationErrors) {
        errorMap[err.field] = messageFor(err.code);
      }
      setErrors(errorMap);
      setStatus('idle');
      document.getElementById(fieldId(validationErrors[0].field))?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');
    submittingRef.current = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        errors?: Array<{ field: ContactField; code: ContactErrorCode }>;
      } | null;

      if (response.ok && data?.ok) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else if (response.status === 400 && Array.isArray(data?.errors)) {
        const errorMap: FieldErrors = {};
        for (const err of data.errors) {
          if (err?.field && err?.code) {
            errorMap[err.field] = messageFor(err.code);
          }
        }
        setErrors(errorMap);
        setStatus('idle');
      } else {
        setServerError(t('messages.serverError'));
        setStatus('idle');
      }
    } catch {
      setServerError(t('messages.networkError'));
      setStatus('idle');
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="contact-heading" kicker={kicker} title={heading} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12">
          {/* Form */}
          <div
            className="md:col-span-3 animate-fade-in-up"
          >
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status === 'submitting'}
              className="space-y-5"
            >
              <div>
                <label htmlFor={fieldId('name')} className="mb-1.5 block text-sm font-medium text-fg">
                  {form.nameLabel}
                </label>
                <input
                  id={fieldId('name')}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder={form.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? fieldErrorId('name') : undefined}
                  className={inputClasses(Boolean(errors.name))}
                />
                {errors.name ? (
                  <p id={fieldErrorId('name')} role="alert" className="mt-1.5 text-sm text-error">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={fieldId('email')} className="mb-1.5 block text-sm font-medium text-fg">
                  {form.emailLabel}
                </label>
                <input
                  id={fieldId('email')}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder={form.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? fieldErrorId('email') : undefined}
                  className={inputClasses(Boolean(errors.email))}
                />
                {errors.email ? (
                  <p id={fieldErrorId('email')} role="alert" className="mt-1.5 text-sm text-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={fieldId('message')} className="mb-1.5 block text-sm font-medium text-fg">
                  {form.messageLabel}
                </label>
                <textarea
                  id={fieldId('message')}
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange('message')}
                  placeholder={form.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? fieldErrorId('message') : undefined}
                  className={`${inputClasses(Boolean(errors.message))} resize-y`}
                />
                {errors.message ? (
                  <p id={fieldErrorId('message')} role="alert" className="mt-1.5 text-sm text-error">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {serverError ? (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error"
                >
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {serverError}
                </div>
              ) : null}

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-start gap-2.5 rounded-lg border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald"
                >
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {t('messages.success')}
                </motion.div>
              ) : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <span
                      className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                      aria-hidden="true"
                    />
                    {form.submittingLabel}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {form.submitLabel}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Direct channels */}
          <aside
            className="md:col-span-2 animate-fade-in-up"
          >
            <div className="card p-6">
              <p className="mb-4 text-sm font-medium text-fg">{form.directLabel}</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-fg-muted transition-colors hover:text-fg"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg glass text-accent">
                      <AtSign className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">{form.emailChannelLabel}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-fg-muted transition-colors hover:text-fg"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg glass text-accent-alt">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">{form.linkedinChannelLabel}</span>
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-fg-muted transition-colors hover:text-fg"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg glass text-fg">
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">{form.githubChannelLabel}</span>
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}