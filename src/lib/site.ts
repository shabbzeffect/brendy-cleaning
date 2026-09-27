export const site = {
  name: "Brendy Clean Services",
  shortName: "Brendy Clean",
  tagline: "A cleaner home, more you time.",
  description:
    "Brendy Clean Services delivers vetted, insured house, office and turnover cleaning across the metro and surrounding suburbs. Free quote, no card required.",
  phone: "(555) 012-8877",
  phoneHref: "tel:+15550128877",
  email: "hello@brendyclean.com",
  emailHref: "mailto:hello@brendyclean.com",
  serviceArea: "metro & surrounding suburbs",
  hours: "Mon–Sat 7am–7pm · Sun by appointment",
  rating: 4.9,
  reviewCount: 2400,
} as const;

export type ServiceIcon =
  | "home"
  | "sparkles"
  | "key"
  | "building"
  | "hammer"
  | "bed";

export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: ServiceIcon;
  priceFrom: number;
  highlights: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "regular-house-cleaning",
    name: "Regular House Cleaning",
    description:
      "Weekly, fortnightly or monthly top-ups that keep every room guest-ready — kitchen, bathrooms, floors, dust, bins and beds on a recurring schedule.",
    icon: "home",
    priceFrom: 89,
    highlights: ["Kitchen & bathrooms sanitised", "Dusting, vacuuming, mopping", "Bins out and liners replaced"],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    description:
      "A reset for the details a routine clean misses: skirting boards, inside appliances, grout, limescale, vents and light fixtures. Perfect spring or seasonal cleans.",
    icon: "sparkles",
    priceFrom: 199,
    highlights: ["Inside ovens & fridges", "Grout, limescale & soap scum", "Vents, skirting & fixtures"],
  },
  {
    slug: "move-in-move-out",
    name: "Move In / Move Out",
    description:
      "Empty-property cleaning to landlord-ready standards — inside cupboards, ovens and windows, scheduled around your keys rather than the other way round.",
    icon: "key",
    priceFrom: 249,
    highlights: ["Inside all cupboards", "Oven & window interiors", "Photo-ready final walkthrough"],
  },
  {
    slug: "office-commercial",
    name: "Office & Commercial",
    description:
      "Desks, boardrooms, kitchens, washrooms and bins handled outside your core hours, with after-hours and weekend slots and a named account manager.",
    icon: "building",
    priceFrom: 149,
    highlights: ["After-hours & weekend slots", "Washrooms & kitchen stations", "Recurring commercial contracts"],
  },
  {
    slug: "post-construction",
    name: "Post-Construction",
    description:
      "Builders handover cleaning — dust extraction, adhesive and paint removal, full debris tidy, wet-scrubbed floors and a snag-ready finish.",
    icon: "hammer",
    priceFrom: 299,
    highlights: ["Dust extraction & paint removal", "Wet-scrubbed hard floors", "Snag-ready handover report"],
  },
  {
    slug: "airbnb-rental-turnover",
    name: "Airbnb & Rental Turnover",
    description:
      "Fast, photography-ready turnovers between guests: linens changed, amenities restocked, condition checked and reported after every single stay.",
    icon: "bed",
    priceFrom: 79,
    highlights: ["Linen change & restock", "Guest-ready photography finish", "Post-stay condition report"],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export type HomeSize = "studio" | "1-bed" | "2-bed" | "3-bed" | "4-plus" | "office";

export const homeSizes: readonly { value: HomeSize; label: string }[] = [
  { value: "studio", label: "Studio / 1 bed" },
  { value: "1-bed", label: "1 bedroom" },
  { value: "2-bed", label: "2 bedrooms" },
  { value: "3-bed", label: "3 bedrooms" },
  { value: "4-plus", label: "4+ bedrooms" },
  { value: "office", label: "Office / commercial" },
];

export const homeSizeValues: readonly string[] = homeSizes.map((size) => size.value);

export const bookingStatusValues = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof bookingStatusValues)[number];

export const bookingStatusLabels: Record<BookingStatus, string> = {
  new: "New",
  contacted: "Contacted",
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const stats = [
  { value: "12,000+", label: "Homes cleaned", detail: "since 2016" },
  { value: "4.9★", label: "Average rating", detail: "2,400+ reviews" },
  { value: "320+", label: "Trusted cleaners", detail: "vetted & insured" },
  { value: "100%", label: "On-time guarantee", detail: "late? your clean is free" },
] as const;

export const trustSignals = [
  {
    icon: "shield",
    title: "Vetted & background-checked",
    body: "Every cleaner is interviewed, reference-checked and police-cleared before they ever step through your door.",
  },
  {
    icon: "check",
    title: "Fully insured & bonded",
    body: "$5M public liability cover and a bonded workforce, so damage is always handled quickly and fairly.",
  },
  {
    icon: "clock",
    title: "On-time guarantee",
    body: "Late? Your clean is free. We hold ourselves to the arrival window we promise you on the phone.",
  },
  {
    icon: "leaf",
    title: "Eco-friendly supplies",
    body: "Plant-based, fragrance-light products that are safe for kids, pets and the surfaces you love.",
  },
] as const;

export const checklist = [
  "Kitchen surfaces, sinks & splashbacks",
  "Oven, hob & microwave exteriors",
  "Bathrooms descaled & disinfected",
  "Toilets, mirrors & glassware",
  "Dusting of all surfaces & ledges",
  "Beds made, linens straightened",
  "Vacuuming of carpets & rugs",
  "Mopping of hard floors",
  "Skirting boards & door frames",
  "Bins emptied & liners replaced",
  "Inside handles, switches & remotes",
  "Spot-cleaning of marks & fingerprints",
  "Cupboards emptied & wiped",
  "Entryway and mat areas",
  "Appliance exterior polishing",
  "Laundry folded or hung",
  "Restocking paper & soap supplies",
  "Interior doors and tracks",
  "Light switches and power points",
  "Balcony or patio tidy",
  "Final walkthrough quality check",
  "Garbage and recycling to the curb",
  "Extractor fans and vents",
  "Food and crumbs cleared",
  "Personal items returned to place",
  "Surfaces left streak-free and dry",
  "Eco-friendly finishing spritz",
  "Secure lock-up and keys handed back",
  "Photo checklist uploaded to your portal",
  "Follow-up scheduled if required",
] as const;

export const howItWorks = [
  {
    step: "01",
    icon: "phone" as const,
    title: "Tell us about your place",
    body: "Fill in the 60-second quote form — service, size, suburb and a preferred date. No account, no card, no chasing.",
  },
  {
    step: "02",
    icon: "calendar" as const,
    title: "We confirm your slot",
    body: "A real person calls or texts within business hours to lock the time, price and any extras you want covered.",
  },
  {
    step: "03",
    icon: "sparkles" as const,
    title: "Come home to a spotless home",
    body: "Your vetted cleaner works the 50-point checklist and leaves it spotless. Late? The clean is on us.",
  },
];

export const testimonials = [
  {
    quote:
      "The same cleaner every fortnight and I finally stopped dreading Sunday evenings. The 50-point checklist is real — they catch things I wouldn't have noticed.",
    name: "Danielle R.",
    location: "Northside",
    initials: "DR",
    rating: 5,
    service: "Regular House Cleaning",
  },
  {
    quote:
      "Handed back a rental deposit of $900 after a move-out clean. Inside of every cupboard, the oven, even the window tracks. Worth every cent.",
    name: "Marcus T.",
    location: "West End",
    initials: "MT",
    rating: 5,
    service: "Move In / Move Out",
  },
  {
    quote:
      "Six Airbnbs, tight turnarounds, never missed one. The post-stay condition report means I have zero guest messages about cleanliness.",
    name: "Priya S.",
    location: "Harbour precinct",
    initials: "PS",
    rating: 5,
    service: "Airbnb & Rental Turnover",
  },
  {
    quote:
      "Our office is cleaned at 11pm so the team walks in to a fresh floor every morning. The after-hours pricing was better than the daytime quotes we had.",
    name: "Ellie W.",
    location: "CBD",
    initials: "EW",
    rating: 5,
    service: "Office & Commercial",
  },
] as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#book", label: "Book" },
  { href: "#contact", label: "Contact" },
] as const;
