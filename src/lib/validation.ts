const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export type FieldErrors = Record<string, string>;

const asTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const LIMITS = {
  fullName: 160,
  email: 200,
  phone: 40,
  serviceSlug: 64,
  address: 1000,
  preferredDate: 40,
  homeSize: 40,
  notes: 2000,
  name: 160,
  message: 4000,
} as const;

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value);

export const isValidPhone = (value: string): boolean =>
  value.replace(/[^\d]/g, "").length >= 7;

export type ValidatedBooking = {
  fullName: string;
  email: string;
  phone: string;
  serviceSlug: string;
  address: string;
  preferredDate: string;
  homeSize: string;
  notes: string | null;
};

export function validateBookingPayload(
  body: unknown,
  allowedServices: readonly string[],
): { ok: true; data: ValidatedBooking } | { ok: false; errors: FieldErrors } {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;

  const errors: FieldErrors = {};

  const fullName = asTrimmedString(source.fullName);
  const email = asTrimmedString(source.email).toLowerCase();
  const phone = asTrimmedString(source.phone);
  const serviceSlug = asTrimmedString(source.serviceSlug);
  const address = asTrimmedString(source.address);
  const preferredDate = asTrimmedString(source.preferredDate);
  const homeSize = asTrimmedString(source.homeSize);
  const notes = asTrimmedString(source.notes);

  if (!fullName) errors.fullName = "Please tell us your name.";
  else if (fullName.length > LIMITS.fullName) errors.fullName = "That name is too long.";

  if (!email) errors.email = "We need an email for your quote.";
  else if (email.length > LIMITS.email) errors.email = "That email is too long.";
  else if (!isValidEmail(email)) errors.email = "That email doesn't look right.";

  if (!phone) errors.phone = "A phone number lets us confirm your slot.";
  else if (phone.length > LIMITS.phone) errors.phone = "That phone number is too long.";
  else if (!isValidPhone(phone)) errors.phone = "That phone number looks incomplete.";

  if (!serviceSlug) errors.serviceSlug = "Pick the service you need.";
  else if (!allowedServices.includes(serviceSlug))
    errors.serviceSlug = "That service isn't available.";

  if (!address) errors.address = "Where are we cleaning?";
  else if (address.length > LIMITS.address) errors.address = "That address is too long.";

  if (!preferredDate) errors.preferredDate = "Choose a preferred date.";
  else if (preferredDate.length > LIMITS.preferredDate)
    errors.preferredDate = "That date value is too long.";

  if (!homeSize) errors.homeSize = "Tell us roughly how big the place is.";
  else if (homeSize.length > LIMITS.homeSize) errors.homeSize = "That size value is too long.";

  if (notes.length > LIMITS.notes) errors.notes = "Please keep notes under 2000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      serviceSlug,
      address,
      preferredDate,
      homeSize,
      notes: notes.length > 0 ? notes : null,
    },
  };
}

export type ValidatedContact = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export function validateContactPayload(
  body: unknown,
): { ok: true; data: ValidatedContact } | { ok: false; errors: FieldErrors } {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;

  const errors: FieldErrors = {};

  const name = asTrimmedString(source.name);
  const email = asTrimmedString(source.email).toLowerCase();
  const phone = asTrimmedString(source.phone);
  const message = asTrimmedString(source.message);

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!email) errors.email = "We need an email to reply to.";
  else if (email.length > LIMITS.email) errors.email = "That email is too long.";
  else if (!isValidEmail(email)) errors.email = "That email doesn't look right.";

  if (phone.length > LIMITS.phone) errors.phone = "That phone number is too long.";
  else if (phone && !isValidPhone(phone)) errors.phone = "That phone number looks incomplete.";

  if (!message) errors.message = "Let us know how we can help.";
  else if (message.length > LIMITS.message) errors.message = "Please keep messages under 4000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone.length > 0 ? phone : null,
      message,
    },
  };
}

export function isBookingStatus(
  value: unknown,
  allowed: readonly string[],
): value is string {
  return typeof value === "string" && allowed.includes(value);
}
