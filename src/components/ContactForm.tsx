"use client";

import { useState } from "react";

import Icon from "@/components/Icon";

type FieldName = "name" | "email" | "phone" | "message";

type FormState = Record<FieldName, string>;

const emptyForm: FormState = { name: "", email: "", phone: "", message: "" };

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const labelClass = "mb-1.5 block text-sm font-bold text-slate-800";
const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";
const errorClass = "mt-1.5 text-sm font-semibold text-rose-600";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (name: FieldName, value: string) => {
    setForm((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: Partial<Record<FieldName, string>> = {};

    if (!form.name.trim()) errors.name = "Please tell us your name.";
    if (!form.email.trim()) errors.email = "We need an email to reply to.";
    else if (!EMAIL_PATTERN.test(form.email.trim()))
      errors.email = "That email doesn't look right.";
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7)
      errors.phone = "That phone number looks incomplete.";
    if (!form.message.trim()) errors.message = "Let us know how we can help.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          message: form.message.trim(),
        }),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (response.status === 422 && payload && typeof payload === "object") {
        const serverFieldErrors = (
          payload as { fieldErrors?: Record<string, string> }
        ).fieldErrors;
        if (serverFieldErrors) setFieldErrors(serverFieldErrors as Partial<Record<FieldName, string>>);
        setServerError((payload as { error?: string }).error ?? "Please check the highlighted fields.");
        return;
      }

      if (!response.ok) {
        setServerError(
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error: unknown }).error)
            : "Something went wrong on our end. Please try again.",
        );
        return;
      }

      setSent(true);
      setForm(emptyForm);
      setFieldErrors({});
    } catch {
      setServerError("We couldn't reach our server. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
          <Icon name="mail" size={28} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
          Message sent
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-slate-600">
          Thanks for reaching out — we reply to every message within business hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700"
        >
          Send another message
          <Icon name="arrow" size={16} />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 sm:p-8"
    >
      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Send us a message
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-500">
        Questions about a quote, a recurring schedule, or a specific product? Ask away.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={160}
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            placeholder="Marcus Taylor"
            className={`${inputClass} ${fieldErrors.name ? "border-rose-400" : ""}`}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" role="alert" className={errorClass}>
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            placeholder="you@example.com"
            className={`${inputClass} ${fieldErrors.email ? "border-rose-400" : ""}`}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" role="alert" className={errorClass}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="font-medium text-slate-400">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
            placeholder="(555) 012-8877"
            className={`${inputClass} ${fieldErrors.phone ? "border-rose-400" : ""}`}
          />
          {fieldErrors.phone && (
            <p id="contact-phone-error" role="alert" className={errorClass}>
              {fieldErrors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={4000}
            required
            value={form.message}
            onChange={(event) => setField("message", event.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : "contact-message-hint"}
            placeholder="Tell us what you need cleaned, your suburb, and your ideal day…"
            className={`${inputClass} resize-y ${fieldErrors.message ? "border-rose-400" : ""}`}
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" role="alert" className={errorClass}>
              {fieldErrors.message}
            </p>
          ) : (
            <p id="contact-message-hint" className="mt-1.5 text-xs font-medium text-slate-500">
              {form.message.length}/4000
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
        >
          <Icon name="close" size={18} className="mt-0.5 shrink-0" />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Icon name="arrow" size={18} />
          </>
        )}
      </button>
    </form>
  );
}
