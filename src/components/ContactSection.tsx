import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

const infoCards = [
  {
    icon: "phone" as const,
    title: "Call us",
    value: site.phone,
    href: site.phoneHref,
    detail: site.hours,
  },
  {
    icon: "mail" as const,
    title: "Email us",
    value: site.email,
    href: site.emailHref,
    detail: "We reply within business hours",
  },
  {
    icon: "pin" as const,
    title: "Where we clean",
    value: site.serviceArea,
    href: null,
    detail: "Same-week slots subject to availability",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
            <Icon name="mail" size={14} />
            Get in touch
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Questions? We&apos;re easy to reach
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Real people, real answers. No call centres, no bots, no chasing.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6">
            {infoCards.map((card) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-teal-700 ring-1 ring-emerald-100">
                    <Icon name={card.icon} size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {card.title}
                    </p>
                    <p className="mt-1 text-lg font-extrabold tracking-tight text-slate-900">
                      {card.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">{card.detail}</p>
                  </div>
                </>
              );

              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  className="card-lift flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.25)]"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={card.title}
                  className="flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.25)]"
                >
                  {inner}
                </div>
              );
            })}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
                <Icon name="clock" size={16} className="text-emerald-600" />
                Booking hours
              </h3>
              <dl className="mt-4 space-y-2.5 text-sm">
                {[
                  { days: "Monday – Friday", hours: "7:00am – 7:00pm" },
                  { days: "Saturday", hours: "8:00am – 4:00pm" },
                  { days: "Sunday", hours: "By appointment" },
                ].map((row) => (
                  <div
                    key={row.days}
                    className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2.5 last:border-0 last:pb-0"
                  >
                    <dt className="font-semibold text-slate-600">{row.days}</dt>
                    <dd className="font-bold text-slate-900">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
