"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import Icon, { type IconName } from "@/components/Icon";
import {
  bookingStatusLabels,
  bookingStatusValues,
  getServiceBySlug,
  homeSizeLabels,
  site,
  type BookingStatus,
} from "@/lib/site";

type Booking = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  serviceSlug: string;
  address: string;
  preferredDate: string;
  homeSize: string;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
};

const TOKEN_STORAGE_KEY = "brendy.admin.token";

const statusStyles: Record<BookingStatus, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  scheduled: "bg-teal-50 text-teal-700 ring-teal-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusIcons: Record<BookingStatus, IconName> = {
  new: "sparkles",
  contacted: "phone",
  scheduled: "calendar",
  completed: "check",
  cancelled: "close",
};

function formatDate(value: string): string {
  if (!value) return "â€”";
  const iso = value.length === 10 ? `${value}T00:00:00` : value;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon name={statusIcons[status]} size={12} />
      {bookingStatusLabels[status]}
    </span>
  );
}

export default function AdminPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [updatedId, setUpdatedId] = useState<number | null>(null);
  const [rowError, setRowError] = useState<Record<number, string>>({});
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) setToken(stored);
    } catch {
      /* localStorage unavailable â€” stay signed out */
    }
    setHydrated(true);
  }, []);

  const loadBookings = useCallback(
    async (activeToken: string, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${activeToken}` },
          cache: "no-store",
          ...(signal ? { signal } : {}),
        });

        if (response.status === 401) {
          window.localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
          setBookings([]);
          setError("That token was rejected. Please sign in again.");
          return;
        }

        const payload: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          setError(
            payload && typeof payload === "object" && "error" in payload
              ? String((payload as { error: unknown }).error)
              : "We couldn't load bookings.",
          );
          return;
        }

        const rows = (payload as { bookings?: Booking[] } | null)?.bookings ?? [];
        setBookings(rows);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") return;
        setError("We couldn't reach the server. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    void loadBookings(token, controller.signal);
    return () => controller.abort();
  }, [token, loadBookings]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, trimmed);
    } catch {
      /* ignore storage failures â€” token stays in memory */
    }
    setToken(trimmed);
  };

  const handleSignOut = () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setToken(null);
    setTokenInput("");
    setBookings([]);
    setError(null);
  };

  const handleStatusChange = async (id: number, status: BookingStatus) => {
    if (!token) return;
    setSavingId(id);
    setError(null);
    setUpdatedId(null);
    setRowError((previous) => {
      if (!previous[id]) return previous;
      const next = { ...previous };
      delete next[id];
      return next;
    });

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      // An expired token must not look like a per-row save failure. Sign out loudly.
      if (response.status === 401) {
        try {
          window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setToken(null);
        setBookings([]);
        setError("Your admin token was rejected, so you were signed out. Sign in again to keep updating bookings.");
        return;
      }

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setRowError((previous) => ({
          ...previous,
          [id]:
            payload && typeof payload === "object" && "error" in payload
              ? String((payload as { error: unknown }).error)
              : "Couldn't save. Try again.",
        }));
        return;
      }

      const updated = (payload as { booking?: Booking } | null)?.booking;
      setBookings((previous) =>
        previous.map((row) => (row.id === id && updated ? { ...row, ...updated } : row)),
      );
      setUpdatedId(id);
    } catch {
      setRowError((previous) => ({ ...previous, [id]: "Network problem. Try again." }));
    } finally {
      setSavingId(null);
    }
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      if (!matchesStatus) return false;
      if (!needle) return true;
      return [
        booking.fullName,
        booking.email,
        booking.phone,
        booking.address,
        booking.serviceSlug,
        booking.notes ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [bookings, query, statusFilter]);

  const counts = useMemo(() => {
    const base: Record<BookingStatus, number> = {
      new: 0,
      contacted: 0,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
    };
    for (const booking of bookings) base[booking.status] += 1;
    return base;
  }, [bookings]);

  if (!hydrated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-slate-50" role="status">
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"
        />
        <p className="mt-4 text-sm font-semibold text-slate-500">Checking your sessionâ€¦</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-slate-50 px-4 py-16">
        <div aria-hidden="true" className="blob -left-20 top-0 h-72 w-72 bg-emerald-200/50" />
        <div aria-hidden="true" className="blob -right-20 bottom-0 h-72 w-72 bg-teal-200/50" />

        <div className="relative w-full max-w-md">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-900/10 sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25">
              <Icon name="shield" size={26} />
            </span>
            <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
              Staff dashboard
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Enter the admin token to view and update bookings. The token is stored in this
              browser only.
            </p>

            <form onSubmit={handleSignIn} className="mt-7">
              <label
                htmlFor="admin-token"
                className="mb-1.5 block text-sm font-bold text-slate-800"
              >
                Admin token
              </label>
              <input
                id="admin-token"
                name="token"
                type="password"
                autoComplete="current-password"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="admin"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[15px] shadow-sm transition placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
              />

              {error && (
                <p
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
                >
                  <Icon name="close" size={16} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!tokenInput.trim()}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Sign in
                <Icon name="arrow" size={16} />
              </button>
            </form>

            <Link
              href="/"
              className="mt-5 block text-center text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700"
            >
              â† Back to the website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="glass sticky top-0 z-50 border-b border-slate-200/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25">
              <Icon name="sparkles" size={20} />
            </span>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900">
                Bookings dashboard
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                {site.name} Â· {bookings.length} total{" "}
                {bookings.length === 1 ? "request" : "requests"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void loadBookings(token)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700 disabled:opacity-60"
            >
              <Icon name="clock" size={16} />
              Refresh
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700"
            >
              <Icon name="arrow" size={16} className="rotate-180" />
              Site
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              <Icon name="close" size={16} />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {bookingStatusValues.map((status) => (
            <div
              key={status}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {bookingStatusLabels[status]}
              </dt>
              <dd className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                <span aria-hidden="true">{counts[status]}</span>
                <span className="sr-only">
                  {counts[status]} bookings with status {bookingStatusLabels[status]}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="admin-search" className="sr-only">
                Search bookings
              </label>
              <input
                id="admin-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email, addressâ€¦"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm transition placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
              />
            </div>
            <div>
              <label htmlFor="admin-status" className="sr-only">
                Filter by status
              </label>
              <select
                id="admin-status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as BookingStatus | "all")
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15 sm:w-auto"
              >
                <option value="all">All statuses ({bookings.length})</option>
                {bookingStatusValues.map((status) => (
                  <option key={status} value={status}>
                    {bookingStatusLabels[status]} ({counts[status]})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Showing {filtered.length} of {bookings.length}
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
          >
            <Icon name="close" size={18} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-8 grid place-items-center rounded-3xl border border-slate-200 bg-white py-24" role="status">
            <span
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"
            />
            <p className="mt-4 text-sm font-semibold text-slate-500">Loading bookingsâ€¦</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
              <Icon name="mail" size={24} />
            </span>
            <p className="mt-5 text-lg font-extrabold tracking-tight text-slate-900">
              {bookings.length === 0 ? "No bookings yet" : "No matches for that filter"}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {bookings.length === 0
                ? "Submit the quote form on the homepage and it will appear here instantly."
                : "Try a different search term or status."}
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  All booking requests, newest first. Use the status menu to update a booking.
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {["#", "Customer", "Status", "Service", "Address", "Preferred", "Received"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-500"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => {
                    const service = getServiceBySlug(booking.serviceSlug);
                    const isSaving = savingId === booking.id;
                    const rowMessage = rowError[booking.id];
                    return (
                      <tr
                        key={booking.id}
                        aria-busy={isSaving}
                        className="border-b border-slate-100 align-top transition-colors last:border-0 hover:bg-slate-50/70"
                      >
                        <td className="px-4 py-4 font-bold text-slate-400">#{booking.id}</td>
                        <td className="px-4 py-4">
                          <p className="font-extrabold text-slate-900">{booking.fullName}</p>
                          <a
                            href={`mailto:${booking.email}`}
                            className="text-xs font-semibold text-teal-700 underline-offset-2 hover:underline"
                          >
                            {booking.email}
                          </a>
                          <a
                            href={`tel:${booking.phone.replace(/(?!^\+)[^\d]/g, "")}`}
                            className="mt-0.5 block text-xs font-semibold text-slate-500 hover:text-emerald-700"
                          >
                            {booking.phone}
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <StatusBadge status={booking.status} />
                            <label htmlFor={`status-${booking.id}`} className="sr-only">
                              Status for booking {booking.id}
                            </label>
                            <select
                              id={`status-${booking.id}`}
                              value={booking.status}
                              disabled={isSaving}
                              onChange={(event) =>
                                void handleStatusChange(
                                  booking.id,
                                  event.target.value as BookingStatus,
                                )
                              }
                              className="w-full min-w-[9rem] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15 disabled:opacity-60"
                            >
                              {bookingStatusValues.map((status) => (
                                <option key={status} value={status}>
                                  {bookingStatusLabels[status]}
                                </option>
                              ))}
                            </select>
                            <span role="status" className="text-xs font-bold">
                              {isSaving ? (
                                <span className="text-emerald-700">Savingâ€¦</span>
                              ) : rowMessage ? (
                                <span className="text-rose-600">{rowMessage}</span>
                              ) : updatedId === booking.id ? (
                                <span className="text-emerald-700">Saved</span>
                              ) : null}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-bold text-slate-800">
                            {service?.name ?? booking.serviceSlug}
                          </p>
                          <p className="text-xs font-semibold text-slate-500">
                            {homeSizeLabels[booking.homeSize] ?? booking.homeSize ?? "Size not given"}
                          </p>
                        </td>
                        <td className="max-w-[15rem] px-4 py-4 font-medium text-slate-600">
                          {booking.address}
                          {booking.notes && (
                            <details className="group/notes mt-2">
                              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100">
                                <Icon name="mail" size={12} />
                                Read note
                              </summary>
                              <p className="mt-2 rounded-xl bg-slate-50 px-2.5 py-2 text-xs leading-relaxed text-slate-600">
                                â€œ{booking.notes}â€
                              </p>
                            </details>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">
                          {formatDate(booking.preferredDate)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-500">
                          {formatTimestamp(booking.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
