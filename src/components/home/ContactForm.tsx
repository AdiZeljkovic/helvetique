"use client";

import { useId, useState, type FormEvent } from "react";
import { company, contact, ui } from "@/content/site";
import { submitInquiry, type InquiryPayload, type SubmitResult } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";

type FieldName = keyof InquiryPayload;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "sent" | "failed";
type FailureReason = Extract<SubmitResult, { ok: false }>["reason"];
type Tone = "light" | "dark";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: InquiryPayload): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = ui.form.errors.name;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = ui.form.errors.email;
  if (values.phone && values.phone.replace(/[\s()+\-./]/g, "").length < 6) {
    errors.phone = ui.form.errors.phone;
  }
  if (values.subject.trim().length < 2) errors.subject = ui.form.errors.subject;
  if (values.message.trim().length < 20) errors.message = ui.form.errors.message;
  return errors;
}

/** Colour system per tone, so the form sits on ivory or on near-black. */
const themes: Record<
  Tone,
  {
    label: string;
    labelFocus: string;
    field: string;
    border: string;
    borderInvalid: string;
    button: string;
    note: string;
    status: string;
    link: string;
    heading: string;
  }
> = {
  light: {
    label: "text-muted",
    labelFocus: "group-focus-within/field:text-ink",
    field: "text-ink",
    border: "border-ink/25 hover:border-ink/50",
    borderInvalid: "border-accent",
    button: "bg-ink text-ivory hover:bg-accent",
    note: "text-muted",
    status: "text-charcoal",
    link: "text-ink",
    heading: "text-ink",
  },
  dark: {
    label: "text-stone",
    labelFocus: "group-focus-within/field:text-ivory",
    field:
      "text-ivory autofill:shadow-[inset_0_0_0_1000px_#171715] autofill:[-webkit-text-fill-color:#f3f0e9]",
    border: "border-ivory/25 hover:border-ivory/50",
    borderInvalid: "border-accent",
    button: "bg-ivory text-ink hover:bg-accent hover:text-ivory",
    note: "text-stone",
    status: "text-stone",
    link: "text-ivory",
    heading: "text-ivory",
  },
};

const fieldBase =
  "w-full appearance-none border-0 border-b bg-transparent px-0 py-3 text-base placeholder:text-transparent outline-none transition-colors duration-500 focus:border-accent focus-visible:outline-none";

type FieldProps = {
  formId: string;
  tone: Tone;
  name: FieldName;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  textarea?: boolean;
};

/** Underlined, transparent field with an uppercase label. Uncontrolled. */
function Field({ formId, tone, name, label, error, type = "text", autoComplete, optional = false, textarea = false }: FieldProps) {
  const t = themes[tone];
  const fieldId = `${formId}-${name}`;
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(error);
  const borderClass = invalid ? t.borderInvalid : t.border;

  return (
    <div className="group/field">
      <label
        htmlFor={fieldId}
        className={cn("label-xs flex items-baseline justify-between transition-colors duration-300", t.label, t.labelFocus)}
      >
        <span>{label}</span>
        {optional ? <span className="normal-case tracking-normal">{ui.form.optional}</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={fieldId}
          name={name}
          rows={4}
          required={!optional}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className={cn(fieldBase, t.field, borderClass, "mt-1 resize-y leading-relaxed")}
          placeholder={label}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={!optional}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className={cn(fieldBase, t.field, borderClass, "mt-1")}
          placeholder={label}
        />
      )}
      {invalid ? (
        <p id={errorId} className="mt-2 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ tone = "light" }: { tone?: Tone }) {
  const t = themes[tone];
  const formId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<FailureReason | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill this.
    if (data.get("company_website")) return;

    const values: InquiryPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "") || undefined,
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidName = (Object.keys(nextErrors) as FieldName[])[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitInquiry(values);
    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("failed");
      setFailure(result.reason);
    }
  }

  const phoneLink = (
    <a href={company.phone.href} className={cn("underline underline-offset-4", t.link)}>
      {company.phone.display}
    </a>
  );

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="pt-2">
        <span aria-hidden="true" className="block h-px w-10 bg-accent" />
        <p className={cn("display-sm mt-6", t.heading)}>{ui.form.successTitle}</p>
        <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed", t.note)}>
          {ui.form.successText} {phoneLink}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-8">
      {/* Honeypot, hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          {ui.form.honeypot}
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8">
        <Field formId={formId} tone={tone} name="name" label={ui.form.name} autoComplete="name" error={errors.name} />
        <Field formId={formId} tone={tone} name="email" label={ui.form.email} type="email" autoComplete="email" error={errors.email} />
        <Field formId={formId} tone={tone} name="phone" label={ui.form.phone} type="tel" autoComplete="tel" optional error={errors.phone} />
        <Field formId={formId} tone={tone} name="subject" label={ui.form.subject} error={errors.subject} />
      </div>
      <Field formId={formId} tone={tone} name="message" label={ui.form.message} textarea error={errors.message} />

      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "group inline-flex h-14 items-center justify-between gap-8 px-7 label transition-colors duration-500 ease-soft disabled:cursor-wait disabled:opacity-60 sm:min-w-[15rem]",
            t.button,
          )}
        >
          <span>{status === "submitting" ? ui.form.sending : contact.submitLabel}</span>
          <ArrowRight size={14} className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
        </button>
        <p className={cn("text-xs leading-relaxed sm:max-w-[16rem] sm:text-right", t.note)}>
          {ui.form.privacyNote}
        </p>
      </div>

      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status === "failed" && failure === "unconfigured" ? (
          <p className={cn("border-l border-accent pl-4 text-sm leading-relaxed", t.status)}>
            {ui.form.unconfiguredText} {phoneLink} {ui.form.unconfiguredTail}
          </p>
        ) : null}
        {status === "failed" && failure !== null && failure !== "unconfigured" ? (
          <p className={cn("border-l border-accent pl-4 text-sm leading-relaxed", t.status)}>
            {ui.form.failedText} {phoneLink}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
