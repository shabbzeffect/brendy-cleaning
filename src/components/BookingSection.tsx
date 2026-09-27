import BookingForm from "@/components/BookingForm";
import Icon from "@/components/Icon";
import { checklist, checklistGroups, site, trustSignals } from "@/lib/site";

export default function BookingSection() {
  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="blob -left-24 bottom-0 h-72 w-72 bg-emerald-300/35" />
      <div aria-hidden="true" className="blob right-0 top-0 h-72 w-72 bg-teal-300/30" />

      <div className="relative mx-auto grid w-full max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
        <div className="lg:sticky lg:top-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
            <Icon name="calendar" size={14} />
            Free quote · no card required
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Book your clean in under a minute
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Tell us the space, pick a date, and we&apos;ll confirm the price and arrival window by
            phone or email. We service the {site.serviceArea} — {site.hours}.
          </p>

          <details className="group order-first mt-8 rounded-3xl border border-emerald-200 bg-white/80 p-5 lg:order-none">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-slate-900">
              <span className="flex items-center gap-2.5">
                <Icon name="check" size={18} className="shrink-0 text-emerald-600" />
                See all {checklist.length} points on the checklist we follow
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 transition-transform group-open:rotate-45">
                <Icon name="arrow" size={14} />
              </span>
            </summary>
            <div className="mt-5 space-y-5">
              {checklistGroups.map((section) => (
                <div key={section.group}>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800">
                    {section.group}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <Icon name="check" size={14} className="mt-1 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-emerald-100 pt-4 text-xs font-semibold text-emerald-800">
              Photograph uploaded to your portal after every clean.
            </p>
          </details>

          <ul className="mt-8 space-y-4">
            {trustSignals.slice(0, 3).map((signal) => (
              <li key={signal.title} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <Icon name={signal.icon} size={22} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{signal.title}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{signal.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Prefer to talk?
                </p>
                <a
                  href={site.phoneHref}
                  className="text-lg font-extrabold tracking-tight text-slate-900 hover:text-emerald-700"
                >
                  {site.phone}
                </a>
              </div>
            </div>
            <a
              href={site.emailHref}
              className="text-sm font-bold text-teal-700 underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
