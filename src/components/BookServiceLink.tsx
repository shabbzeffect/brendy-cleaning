"use client";

import type { MouseEvent } from "react";

import Icon from "@/components/Icon";
import { dispatchServiceIntent } from "@/lib/service-intent";

type BookServiceLinkProps = {
  slug: string;
  label: string;
  className?: string;
};

export default function BookServiceLink({
  slug,
  label,
  className = "group mt-7 inline-flex items-center gap-2 self-start rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-100",
}: BookServiceLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget.getAttribute("href") ?? "";
    dispatchServiceIntent(slug);

    // Keep plain-anchor behaviour (instant jump, no router round-trip) for both
    // same-page hashes and reduced-motion users.
    if (target.startsWith("#")) event.preventDefault();
    const id = target.replace(/^#/, "");
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", target);
  };

  return (
    <a href="#book" onClick={handleClick} className={className}>
      {label}
      <Icon
        name="arrow"
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
