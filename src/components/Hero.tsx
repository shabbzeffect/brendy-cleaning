import Icon from "@/components/Icon";
import { services, site } from "@/lib/site";

const quoteRows = [
  { label: "Regular clean · 2 bed home", value: "$89" },
  { label: "Upgrade to Deep Clean", value: "from $199" },
  { label: "Eco supplies & 50-point checklist", value: "Included" },
];

function StarRow({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <Icon key={index} name="star" size={16} className="text-amber-400" />
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_50%_-10%,#ecfdf5_0%,#f0fdfa_38%,#ffffff_72%)]"
      />
      <div
        aria-hidden="true"
        className="blob -left-24 top-10 h-72 w-72 animate-float-slow bg-emerald-300/45"
      />
      <div
        aria-hidden="true"
        className="blob -right-20 top-40 h-80 w-80 animate-drift bg-teal-300/40"
      />
      <div
        aria-hidden="true"
        className="blob bottom-0 left-1/3 h-64 w-64 animate-float-slow bg-amber-200/40"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
            <Icon name="leaf" size={14} />
            Eco-friendly · insured · vetted
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            A cleaner home,
            <span className="mt-1 block text-emerald-700">more you time.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
            Brendy Clean Services sends background-checked, fully insured cleaners across the{" "}
            {site.serviceArea}. Free quote, no card required — and if we&apos;re late, your clean is
            free.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#book"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-600/40"
            >
              Get my free quote
              <Icon
                name="arrow"
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700"
            >
              <Icon name="phone" size={18} className="text-emerald-600" />
              {site.phone}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["DR", "MT", "PS", "EW"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`grid h-10 w-10 place-items-center rounded-2xl border-2 border-white text-xs font-bold text-white shadow-sm ${
                      [
                        "bg-emerald-600",
                        "bg-teal-600",
                        "bg-amber-500",
                        "bg-slate-700",
                      ][index]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div className="text-left">
                <StarRow />
                <p className="text-sm font-semibold text-slate-600">
                  {site.rating}/5 from {site.reviewCount.toLocaleString("en-AU")}+ reviews
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">
              <span className="font-bold text-slate-700">12,000+</span> homes cleaned
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/50 via-teal-100/40 to-transparent blur-2xl" />
          <div className="glass rounded-[2rem] border border-white/70 p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                  Instant estimate
                </p>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                  2 bedroom home
                </h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                No card required
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {quoteRows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                  <span className="text-sm font-extrabold text-slate-900">{row.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  From
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">$89</p>
              </div>
              <p className="max-w-[9rem] text-right text-xs font-medium leading-snug text-emerald-800">
                Final price confirmed on your free call.
              </p>
            </div>

            <a
              href="#book"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              Get my exact quote
              <Icon name="arrow" size={16} />
            </a>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
              <Icon name="clock" size={14} className="text-emerald-600" />
              Slots left this week: 14 · earliest Tue 8:30am
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:absolute sm:-bottom-6 sm:-left-4 sm:mt-0 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl shadow-slate-900/10">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Late? Your clean is free</p>
                <p className="text-xs font-medium text-slate-500">On-time guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-xl shadow-slate-900/10">
              <Icon name="check" size={16} className="shrink-0 text-emerald-600" />
              <span className="text-xs font-bold text-slate-700">
                50-point checklist, every visit
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-16 w-full max-w-7xl px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:px-6 lg:px-8">
        Trusted for every kind of space
      </p>
      <ul className="mx-auto mt-4 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2.5 px-4 sm:px-6">
        {services.map((service) => (
          <li key={service.slug}>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700"
            >
              <Icon name={service.icon} size={14} className="text-teal-600" />
              {service.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
