import { siteConfig } from '@/lib/config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactField = 'name' | 'email' | 'message';

export interface ContactError {
  field: ContactField;
  message: string;
}

export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const MESSAGE_MIN_LENGTH = 10;

export function validateContact(payload: ContactPayload): ContactError[] {
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const errors: ContactError[] = [];
  const { messages } = siteConfig.contact;

  if (name.length === 0) {
    errors.push({ field: 'name', message: messages.nameRequired });
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.push({ field: 'email', message: messages.emailInvalid });
  }

  if (message.length < MESSAGE_MIN_LENGTH) {
    errors.push({ field: 'message', message: messages.messageTooShort });
  }

  return errors;
}
