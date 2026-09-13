/**
 * Contact form submission boundary.
 * ---------------------------------
 * The project has no backend yet, so this module deliberately does NOT
 * pretend to send anything. Integration options, in order of preference:
 *
 *  1. Point NEXT_PUBLIC_CONTACT_ENDPOINT at an HTTPS endpoint that accepts a
 *     JSON POST with the `InquiryPayload` shape (a form service, a serverless
 *     function, or a Next.js Route Handler such as /api/inquiry).
 *  2. Replace `submitInquiry` with a Server Action that emails the office.
 *
 * The form UI (src/components/home/ContactForm.tsx) only depends on the
 * `submitInquiry` signature and the `SubmitResult` union below.
 */

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "network" | "server" };

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  if (!endpoint) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
