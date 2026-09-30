import { validateContact } from '@/lib/validation';
import { siteConfig } from '@/lib/config';

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.contact.email)}`;

export async function POST(request: Request) {
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return Response.json(
        {
          ok: false,
          errors: [{ field: 'message', code: 'invalidPayload' }],
        },
        { status: 400 }
      );
    }

    if (typeof raw !== 'object' || raw === null) {
      return Response.json(
        {
          ok: false,
          errors: [{ field: 'message', code: 'invalidPayload' }],
        },
        { status: 400 }
      );
    }

    const body = raw as Record<string, unknown>;
    const payload = {
      name: typeof body.name === 'string' ? body.name : '',
      email: typeof body.email === 'string' ? body.email : '',
      message: typeof body.message === 'string' ? body.message : '',
    };

    const errors = validateContact(payload);
    if (errors.length > 0) {
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    // Forward the validated message to FormSubmit (delivers to the inbox).
    const delivered = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        _subject: `Portfolio contact from ${payload.name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    }).then((res) => res.ok, () => false);

    if (!delivered) {
      return Response.json({ ok: false, errors: [] }, { status: 500 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, errors: [] }, { status: 500 });
  }
}