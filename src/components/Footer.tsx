import Link from "next/link";

import Icon from "@/components/Icon";
import { services, site } from "@/lib/site";

const serviceLinks = services.map((service) => ({
  href: "#book",
  label: service.name,
}));

const companyLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#book", label: "Get a free quote" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25 transition-transform duration-300 group-hover:scale-105">
                <Icon name="sparkles" size={22} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  Brendy Clean Services
                </span>
                <span className="mt-1 text-xs font-semibold text-teal-600">{site.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600">
              Vetted, insured and eco-friendly cleaning for homes, offices and rentals across the{" "}
              {site.serviceArea}. {site.rating}/5 from {site.reviewCount.toLocaleString("en-US")}+
              reviews.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                <Icon name="shield" size={14} className="text-emerald-600" />
                Insured &amp; bonded
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                <Icon name="leaf" size={14} className="text-emerald-600" />
                Eco-friendly
              </span>
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-700"
                >
                  <Icon name="phone" size={17} className="text-emerald-600" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-700"
                >
                  <Icon name="mail" size={17} className="text-emerald-600" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <Icon name="pin" size={17} className="text-emerald-600" />
                {site.serviceArea}
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <Icon name="clock" size={17} className="text-emerald-600" />
                {site.hours}
              </li>
            </ul>
            <a
              href="#book"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700"
            >
              Get a free quote
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-slate-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { href: "#contact", label: "Privacy" },
              { href: "#contact", label: "Terms" },
              { href: "#contact", label: "Accessibility" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-700"
              >
                Staff login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
