import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section
      aria-label="Brendy Clean in numbers"
      className="scroll-mt-20 border-y border-slate-200/80 bg-slate-50/80"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-extrabold tracking-tight text-emerald-700 sm:text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm font-bold uppercase tracking-wider text-slate-900">
                  {stat.label}
                </span>
                <span className="mt-1 block text-sm font-medium text-slate-500">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
