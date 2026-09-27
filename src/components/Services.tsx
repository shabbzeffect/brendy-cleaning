import BookServiceLink from "@/components/BookServiceLink";
import Icon from "@/components/Icon";
import { formatMoney } from "@/lib/money";
import { services, trustSignals } from "@/lib/site";

export default function Services() {
  const featured = trustSignals.find((signal) => signal.featured);
  const supporting = trustSignals.filter((signal) => !signal.featured);

  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
            <Icon name="sparkles" size={14} />
            Our services
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            One trusted team for every kind of clean
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Straightforward pricing, a 50-point checklist on every visit, and the same vetted
            cleaner you can request by name. Prices shown are starting points — your free quote
            confirms the exact figure.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="card-lift group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-teal-700 ring-1 ring-emerald-100 transition-transform duration-300 group-hover:scale-105">
                  <Icon name={service.icon} size={26} />
                </span>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    from
                  </p>
                  <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {formatMoney(service.priceFrom)}
                  </p>
                </div>
              </div>

              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-slate-900">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

              <ul className="mt-5 space-y-2.5">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Icon
                      name="check"
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <BookServiceLink
                slug={service.slug}
                label={`Book ${service.name.toLowerCase()}`}
                className="group mt-7 inline-flex items-center gap-2 self-start rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-100"
              />
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          {featured && (
            <div className="relative overflow-hidden rounded-3xl bg-emerald-600 p-8 text-white shadow-xl shadow-emerald-600/20 sm:p-10">
              <div
                aria-hidden="true"
                className="blob -right-10 -top-10 h-48 w-48 bg-emerald-300/30"
              />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
                  <Icon name="clock" size={24} />
                </span>
                <p className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {featured.title}
                </p>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-emerald-50">
                  {featured.body}
                </p>
                <a
                  href="#book"
                  className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Claim a slot
                  <Icon
                    name="arrow"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          )}

          <ul className="space-y-6">
            {supporting.map((signal) => (
              <li key={signal.title} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-emerald-600 shadow-sm">
                  <Icon name={signal.icon} size={22} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{signal.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{signal.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
