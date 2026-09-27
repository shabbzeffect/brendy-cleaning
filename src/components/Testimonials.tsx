import Icon from "@/components/Icon";
import { site, testimonials } from "@/lib/site";

const avatarColors = [
  "bg-emerald-600",
  "bg-teal-600",
  "bg-amber-500",
  "bg-slate-700",
] as const;

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
              <Icon name="star" size={14} />
              {site.rating}/5 · {site.reviewCount.toLocaleString("en-US")}+ reviews
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              People keep re-booking. Here&apos;s why.
            </h2>
          </div>
          <dl className="grid w-full max-w-md grid-cols-3 gap-4 lg:w-auto">
            {[
              { value: "12,000+", label: "Homes cleaned" },
              { value: "320+", label: "Cleaners on roster" },
              { value: "98%", label: "Would rebook" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm"
              >
                <dt className="order-2 mt-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </dt>
                <dd className="order-1 block text-lg font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="card-lift flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.25)]"
            >
              <Icon name="quote" size={28} className="text-emerald-200" />
              <span className="mt-4 inline-flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Icon key={starIndex} name="star" size={18} className="text-amber-400" />
                ))}
              </span>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-5">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold text-white ${avatarColors[index]}`}
                >
                  {testimonial.initials}
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {testimonial.location} · {testimonial.service}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
