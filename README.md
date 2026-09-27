# Brendy Clean Services

Marketing + booking website for **Brendy Clean Services** — *"A cleaner home, more you time."*

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL via Drizzle ORM.

---

## Quick start

```bash
# 1. install
npm install

# 2. configure (copy the template and edit the values)
cp .env.example .env
#    .env should contain:
#      DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brendy_clean
#      ADMIN_TOKEN=admin            # shared secret for /admin and the bookings API

# 3. create the tables (migrate the schema)
npm run db:push
#    non-interactive / CI:  npx drizzle-kit push --force

# 4. seed the 6 services
npm run db:seed

# 5. run
npm run dev          # http://localhost:3000
```

Then open:

| Route      | What it is                                                      |
| ---------- | --------------------------------------------------------------- |
| `/`        | The public marketing site + booking form                        |
| `/admin`   | Token-gated bookings dashboard (default token: `admin`)         |

### Production

```bash
npm run build
npm start
```

Other scripts:

| Script             | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `npm run typecheck`| `tsc --noEmit`                              |
| `npm run lint`     | ESLint (`next/core-web-vitals` + TS rules)   |
| `npm run db:push`  | `drizzle-kit push`                          |
| `npm run db:generate` | Generate SQL migration files in `drizzle/` |
| `npm run db:seed`  | Upsert the 6 services into `services`       |

---

## Environment variables

| Variable       | Required | Description                                                                 |
| -------------- | -------- | --------------------------------------------------------------------------- |
| `DATABASE_URL` | yes      | PostgreSQL connection string. Default fallback: `postgresql://postgres:postgres@localhost:5432/brendy_clean` |
| `ADMIN_TOKEN`  | no       | Bearer token for `GET /api/bookings` and `PATCH /api/bookings/:id`. Defaults to `admin`. **Change this in production.** |

No secrets are hardcoded — everything is read from `process.env` at runtime.

---

## File tree

```
.
├─ .env.example              # template for DATABASE_URL + ADMIN_TOKEN
├─ drizzle.config.ts         # drizzle-kit config (schema path, dialect, dbCredentials)
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
└─ src
   ├─ app
   │  ├─ admin
   │  │  ├─ layout.tsx       # noindex metadata for the staff area
   │  │  └─ page.tsx         # Client Component: token gate, table, status <select> -> PATCH
   │  ├─ api
   │  │  ├─ bookings
   │  │  │  ├─ [id]/route.ts  # PATCH { status } — admin only
   │  │  │  └─ route.ts      # GET (admin only) · POST (public, validated)
   │  │  ├─ contact/route.ts # POST { name, email, message, phone? } — validated
   │  │  └─ health/route.ts  # GET -> { ok: true } after `select 1`
   │  ├─ globals.css          # Tailwind v4 theme tokens, animations, glass/blob/card utilities
   │  ├─ layout.tsx           # root layout, metadata, skip link
   │  └─ page.tsx             # Home (Server Component) composing the sections
   ├─ components
   │  ├─ BookServiceLink.tsx  # "Book {service}" CTA: plain #book anchor + service-intent event
   │  ├─ BookingForm.tsx      # Client: controlled form, inline errors, success state
   │  ├─ BookingSection.tsx   # left reassurance panel + 50-point checklist disclosure + <BookingForm />
   │  ├─ ContactForm.tsx      # Client: controlled form, inline errors, success state
   │  ├─ ContactSection.tsx   # info cards + booking hours + <ContactForm />
   │  ├─ Footer.tsx
   │  ├─ Hero.tsx             # headline, CTAs, quote card, social proof, gradient blobs
   │  ├─ HowItWorks.tsx       # 3 steps + connector line
   │  ├─ Icon.tsx             # single inline-SVG component, `name` prop
   │  ├─ Navbar.tsx           # Client: sticky glassy nav, mobile hamburger (Esc / tap-out to close)
   │  ├─ Services.tsx         # 6 service cards + featured on-time guarantee + trust signals
   │  ├─ Stats.tsx            # 4-stat band
   │  └─ Testimonials.tsx     # 4 review cards, stars, avatars
   ├─ db
   │  ├─ index.ts             # Pool + `db` from drizzle(pool), getAdminToken()
   │  ├─ schema.ts            # pgTable services / bookings / contacts + bookingStatus enum
   │  └─ seed.ts              # upserts the 6 services
   └─ lib
      ├─ auth.ts              # constant-time Bearer token check
      ├─ service-intent.ts    # `brendy:service-intent` event name + dispatch helper
      ├─ site.ts              # all site content: services, trust signals, 50-point checklist, copy
      └─ validation.ts        # server-side validators + shared field/date/email/phone rules
```

---

## Database schema

Four objects in `src/db/schema.ts` (Drizzle / `pg-core`):

- **`services`** — `id`, `slug` (unique), `name`, `description`, `icon`, `priceFrom`, `sortOrder`
- **`booking_status`** — enum: `new | contacted | scheduled | completed | cancelled`
- **`bookings`** — `id`, `fullName`, `email`, `phone`, `serviceSlug`, `address`, `preferredDate`, `homeSize`, `notes` (nullable), `status` (defaults to `new`), `createdAt`
- **`contacts`** — `id`, `name`, `email`, `phone` (nullable), `message`, `createdAt`

Seeded services (also rendered on the homepage from `src/lib/site.ts` so the page stays
statically prerendered and never blocks on the database):

| Slug                       | Service                    | From  | Icon      |
| -------------------------- | -------------------------- | ----- | --------- |
| `regular-house-cleaning`   | Regular House Cleaning     | $89   | `home`    |
| `deep-cleaning`            | Deep Cleaning              | $199  | `sparkles`|
| `move-in-move-out`         | Move In / Move Out         | $249  | `key`     |
| `office-commercial`        | Office & Commercial        | $149  | `building`|
| `post-construction`        | Post-Construction          | $299  | `hammer`  |
| `airbnb-rental-turnover`   | Airbnb & Rental Turnover   | $79   | `bed`     |

---

## API

All writes are validated server-side in `src/lib/validation.ts` — non-empty checks, length
caps, `^\S+@\S+\.\S+$` email format, phone digit count, `serviceSlug` must exist in the
catalog and `homeSize` must be one of the offered sizes. `preferredDate` must be a real
`YYYY-MM-DD` calendar date (so `2026-02-31` is rejected) that is today or later. Nothing is
trusted from the client — the two forms import the same email/phone/date rules so browser
and server can never disagree.

| Method  | Route                    | Auth  | Success                | Errors |
| ------- | ------------------------ | ----- | ---------------------- | ------ |
| `POST`  | `/api/bookings`          | —     | `201 { booking }`      | `400` bad JSON · `422 { error, fieldErrors }` |
| `GET`   | `/api/bookings`          | admin | `{ bookings: [...] }` newest first | `401` |
| `PATCH` | `/api/bookings/[id]`     | admin | `{ booking }`          | `401` · `400` bad id · `404` · `422` bad status |
| `POST`  | `/api/contact`           | —     | `201 { contact }`      | `400` · `422 { error, fieldErrors }` |
| `GET`   | `/api/health`            | —     | `200 { ok: true }`     | `500` if the DB is unreachable |

Admin auth is `Authorization: Bearer <ADMIN_TOKEN>`, compared with `crypto.timingSafeEqual`.

```bash
# smoke test
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/bookings \
  -H 'Content-Type: application/json' \
  -d '{"fullName":"Danielle Roberts","email":"danielle@example.com","phone":"(555) 012-8877",
       "serviceSlug":"regular-house-cleaning","address":"12 Example Street, Northside",
       "preferredDate":"2026-10-06","homeSize":"2-bed","notes":"Two cats"}'

curl http://localhost:3000/api/bookings -H 'Authorization: Bearer admin'
curl -X PATCH http://localhost:3000/api/bookings/1 \
  -H 'Authorization: Bearer admin' -H 'Content-Type: application/json' -d '{"status":"scheduled"}'
```

---

## Admin dashboard

`/admin` is a Client Component. It prompts for the admin token, stores it in `localStorage`
(`brendy.admin.token`), fetches `GET /api/bookings` with a `Bearer` header, and renders every
booking in a table with a status `<select>` that `PATCH`es the row on change. "Log out" clears
the token from storage. Status counts, a text search and a status filter are included.

---

## Design system

- **Palette** — `emerald-600` / `teal-600` primary, `slate` neutrals, `amber` star ratings.
- **Type** — bold, `tracking-tight` headings, generous whitespace, `rounded-2xl` / `rounded-3xl`
  cards, soft layered shadows.
- **Motion** — gradient blobs, `float-slow` / `drift` / `fade-up` keyframes, `card-lift` hover
  lift. All motion respects `prefers-reduced-motion`.
- **Responsive** — mobile-first; the navbar collapses to a hamburger that locks body scroll and
  closes on `Escape`, on tap-outside, or on any link click.
- **Accessibility** — skip link, labelled form fields with `aria-invalid` / `aria-describedby`,
  `role="alert"` error text, `focus-visible` rings (never suppressed outlines), semantic
  `dl` / `ol` / `table` markup. A failed submit scrolls to and focuses the first offending
  field, summarises the count in a `role="alert"` banner, and the success card takes focus so
  screen readers announce it.
- Anchored sections use `scroll-mt-20`; `scroll-behavior: smooth` is set globally and every
  programmatic scroll (mobile nav, service CTAs, error reveal) falls back to `auto` under
  `prefers-reduced-motion`.
- **Service intent** — the "Book {service}" CTA is a real `#book` anchor, so it works with
  JavaScript disabled; with JS on it also fires a `brendy:service-intent` event that
  pre-selects the service in the form.

## The 50-point checklist

`checklistGroups` in `src/lib/site.ts` holds 5 groups totalling exactly 50 items
(11 / 8 / 10 / 11 / 10). The count shown in the booking section and in the stat band is derived
from `checklist.length`, so the marketing claim and the visible list cannot drift apart — if
you add or remove an item, check the prose in `Hero.tsx`, `Services.tsx` and `Footer.tsx`.

`Icon` supports `home, sparkles, key, building, hammer, bed, check, star, phone, mail, pin,
clock, shield, leaf, arrow, menu, close` (plus `calendar` and `quote`).

---

## Acceptance criteria

| # | Criterion | Result |
| - | --------- | ------ |
| 1 | `npm run build` succeeds with zero type errors | pass — `tsc --noEmit` and `eslint .` are also clean |
| 2 | `/` renders every section, fully responsive | pass — Navbar, Hero, Stats, Services, HowItWorks, Testimonials, BookingSection, ContactSection, Footer |
| 3 | Booking form creates a `bookings` row and shows success | pass — `201` + inline success card with reference number |
| 4 | `/admin` (token `admin`) lists bookings and changes status via PATCH | pass |
| 5 | `GET /api/health` returns `{ ok: true }` | pass |

No payment is collected anywhere — every call to action is a free quote with no card required.
