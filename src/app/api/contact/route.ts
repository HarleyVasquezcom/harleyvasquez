import { siteConfig } from '@/lib/config';
import { validateContact } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return Response.json(
        {
          ok: false,
          errors: [{ field: 'message', message: siteConfig.contact.messages.invalidPayload }],
        },
        { status: 400 }
      );
    }

    if (typeof raw !== 'object' || raw === null) {
      return Response.json(
        {
          ok: false,
          errors: [{ field: 'message', message: siteConfig.contact.messages.invalidPayload }],
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

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, errors: [] }, { status: 500 });
  }
}
