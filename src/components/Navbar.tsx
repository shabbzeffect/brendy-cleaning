"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Icon from "@/components/Icon";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-slate-200/80 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25 transition-transform duration-300 group-hover:scale-105">
            <Icon name="sparkles" size={20} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-slate-900 sm:text-base">
              Brendy Clean
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-600">
              Services
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
          >
            <Icon name="phone" size={16} />
            {site.phone}
          </a>
          <a
            href="#book"
            className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/40"
          >
            Get a free quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="glass border-t border-slate-200/80 lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4">
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold text-slate-700"
            >
              <Icon name="phone" size={18} className="text-emerald-600" />
              {site.phone}
            </a>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-emerald-600 px-4 py-3 text-center text-base font-bold text-white shadow-lg shadow-emerald-600/25"
            >
              Get a free quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
