import Icon from "@/components/Icon";
import { howItWorks } from "@/lib/site";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="blob -right-32 top-10 h-72 w-72 bg-teal-200/40"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How it works
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            No sign-ups, no card details, no chasing anyone around. Three steps and you&apos;re
            booked.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 lg:block"
          />

          {howItWorks.map((item) => (
            <li key={item.step} className="relative">
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-3xl bg-white text-emerald-600 shadow-lg shadow-emerald-600/10 ring-1 ring-emerald-100">
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 lg:flex-row lg:p-10">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Late? Your clean is free.
            </h3>
            <p className="mt-2 max-w-xl text-slate-600">
              If we arrive outside the window we confirmed with you, the clean is on us — no forms,
              no argument.
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Book a clean
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
