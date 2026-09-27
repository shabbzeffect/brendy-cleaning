"use client";

import { useEffect, useMemo, useState } from "react";

import Icon from "@/components/Icon";
import { homeSizes, services, type HomeSize } from "@/lib/site";

type FieldName =
  | "fullName"
  | "email"
  | "phone"
  | "serviceSlug"
  | "address"
  | "preferredDate"
  | "homeSize"
  | "notes";

type FormState = Record<FieldName, string>;

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  serviceSlug: "",
  address: "",
  preferredDate: "",
  homeSize: "",
  notes: "",
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const labelClass =
  "mb-1.5 block text-sm font-bold text-slate-800";
const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";
const errorClass = "mt-1.5 text-sm font-semibold text-rose-600";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className={errorClass}>
      {message}
    </p>
  );
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [successId, setSuccessId] = useState<number | null>(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    setMinDate(new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10));
  }, []);

  const selectedService = useMemo(
    () => services.find((service) => service.slug === form.serviceSlug),
    [form.serviceSlug],
  );

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

    if (!form.fullName.trim()) errors.fullName = "Please tell us your name.";
    if (!form.email.trim()) errors.email = "We need an email for your quote.";
    else if (!EMAIL_PATTERN.test(form.email.trim()))
      errors.email = "That email doesn't look right.";
    if (!form.phone.trim()) errors.phone = "A phone number lets us confirm your slot.";
    else if (form.phone.replace(/\D/g, "").length < 7)
      errors.phone = "That phone number looks incomplete.";
    if (!form.serviceSlug) errors.serviceSlug = "Pick the service you need.";
    if (!form.address.trim()) errors.address = "Where are we cleaning?";
    if (!form.preferredDate) errors.preferredDate = "Choose a preferred date.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSending(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          serviceSlug: form.serviceSlug,
          address: form.address.trim(),
          preferredDate: form.preferredDate,
          homeSize: form.homeSize || (form.serviceSlug === "office-commercial" ? "office" : ""),
          notes: form.notes.trim() || null,
        }),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (response.status === 422 && payload && typeof payload === "object") {
        const serverFieldErrors = (
          payload as { fieldErrors?: Record<string, string> }
        ).fieldErrors;
        if (serverFieldErrors) setFieldErrors(serverFieldErrors as Partial<Record<FieldName, string>>);
        const message = (payload as { error?: string }).error;
        setServerError(message ?? "Please check the highlighted fields.");
        return;
      }

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error: unknown }).error)
            : "Something went wrong on our end. Please try again.";
        setServerError(message);
        return;
      }

      const booking = (payload as { booking?: { id?: number } } | null)?.booking;
      setSuccessId(typeof booking?.id === "number" ? booking.id : 0);
      setForm(emptyForm);
      setFieldErrors({});
    } catch {
      setServerError("We couldn't reach our booking system. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (successId !== null) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
          <Icon name="check" size={30} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
          Quote request received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Thanks! A Brendy coordinator will call or email you within business hours to confirm your
          slot and exact price. Nothing to pay today — no card required.
        </p>
        {successId > 0 && (
          <p className="mt-3 text-sm font-semibold text-emerald-800">
            Reference #{successId}
          </p>
        )}
        <button
          type="button"
          onClick={() => setSuccessId(null)}
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700"
        >
          Book another clean
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Get your free quote
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            No card required · reply within business hours
          </p>
        </div>
        {selectedService && (
          <span className="rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-700">
            From ${selectedService.priceFrom}
          </span>
        )}
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name <span className="text-rose-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={160}
            required
            value={form.fullName}
            onChange={(event) => setField("fullName", event.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            placeholder="Danielle Roberts"
            className={`${inputClass} ${
              fieldErrors.fullName ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : ""
            }`}
          />
          <FieldError id="fullName-error" message={fieldErrors.fullName} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-rose-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            required
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            placeholder="(555) 012-8877"
            className={`${inputClass} ${
              fieldErrors.phone ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : ""
            }`}
          />
          <FieldError id="phone-error" message={fieldErrors.phone} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            placeholder="you@example.com"
            className={`${inputClass} ${
              fieldErrors.email ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : ""
            }`}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>

        <div>
          <label htmlFor="serviceSlug" className={labelClass}>
            Service <span className="text-rose-500">*</span>
          </label>
          <select
            id="serviceSlug"
            name="serviceSlug"
            required
            value={form.serviceSlug}
            onChange={(event) => setField("serviceSlug", event.target.value)}
            aria-invalid={Boolean(fieldErrors.serviceSlug)}
            aria-describedby={fieldErrors.serviceSlug ? "serviceSlug-error" : undefined}
            className={`${inputClass} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11 ${
              fieldErrors.serviceSlug
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15"
                : ""
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Choose a service…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name} — from ${service.priceFrom}
              </option>
            ))}
          </select>
          <FieldError id="serviceSlug-error" message={fieldErrors.serviceSlug} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClass}>
            Service address <span className="text-rose-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            required
            value={form.address}
            onChange={(event) => setField("address", event.target.value)}
            aria-invalid={Boolean(fieldErrors.address)}
            aria-describedby={fieldErrors.address ? "address-error" : undefined}
            placeholder="12 Example Street, Apt 4B, Northside"
            className={`${inputClass} ${
              fieldErrors.address ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : ""
            }`}
          />
          <FieldError id="address-error" message={fieldErrors.address} />
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred date <span className="text-rose-500">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={minDate || undefined}
            value={form.preferredDate}
            onChange={(event) => setField("preferredDate", event.target.value)}
            aria-invalid={Boolean(fieldErrors.preferredDate)}
            aria-describedby={fieldErrors.preferredDate ? "preferredDate-error" : undefined}
            className={`${inputClass} ${
              fieldErrors.preferredDate
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15"
                : ""
            }`}
          />
          <FieldError id="preferredDate-error" message={fieldErrors.preferredDate} />
        </div>

        <div>
          <label htmlFor="homeSize" className={labelClass}>
            Home size
          </label>
          <select
            id="homeSize"
            name="homeSize"
            value={form.homeSize}
            onChange={(event) => setField("homeSize", event.target.value)}
            aria-invalid={Boolean(fieldErrors.homeSize)}
            aria-describedby={fieldErrors.homeSize ? "homeSize-error" : undefined}
            className={`${inputClass} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11 ${
              fieldErrors.homeSize ? "border-rose-400 focus:border-rose-500" : ""
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Not sure yet</option>
            {homeSizes.map((size) => (
              <option key={size.value} value={size.value as HomeSize}>
                {size.label}
              </option>
            ))}
          </select>
          <FieldError id="homeSize-error" message={fieldErrors.homeSize} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Anything we should know? <span className="font-medium text-slate-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={2000}
            value={form.notes}
            onChange={(event) => setField("notes", event.target.value)}
            aria-invalid={Boolean(fieldErrors.notes)}
            aria-describedby={fieldErrors.notes ? "notes-error" : "notes-hint"}
            placeholder="Pets, parking restrictions, priority rooms, eco product preferences…"
            className={`${inputClass} resize-y ${
              fieldErrors.notes ? "border-rose-400 focus:border-rose-500" : ""
            }`}
          />
          {fieldErrors.notes ? (
            <FieldError id="notes-error" message={fieldErrors.notes} />
          ) : (
            <p id="notes-hint" className="mt-1.5 text-xs font-medium text-slate-500">
              {form.notes.length}/2000
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
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {sending ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Sending your request…
          </>
        ) : (
          <>
            Request my free quote
            <Icon name="arrow" size={18} />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs font-medium text-slate-500">
        Free quote, no card required. We reply within business hours and never share your details.
      </p>
    </form>
  );
}
