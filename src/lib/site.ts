export const site = {
  name: "Brendy Clean Services",
  shortName: "Brendy Clean",
  tagline: "A cleaner home, more you time.",
  description:
    "Brendy Clean Services delivers vetted, insured house, office and turnover cleaning across the Nairobi area. Free quote, no card required.",
  phone: "0719 438 468",
  phoneHref: "tel:+254719438468",
  email: "hello@brendyclean.com",
  emailHref: "mailto:hello@brendyclean.com",
  serviceArea: "Nairobi area",
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
    priceFrom: 4000,
    highlights: ["Kitchen & bathrooms sanitised", "Dusting, vacuuming, mopping", "Bins out and liners replaced"],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    description:
      "A reset for the details a routine clean misses: skirting boards, inside appliances, grout, limescale, vents and light fixtures. Perfect spring or seasonal cleans.",
    icon: "sparkles",
    priceFrom: 9500,
    highlights: ["Inside ovens & fridges", "Grout, limescale & soap scum", "Vents, skirting & fixtures"],
  },
  {
    slug: "move-in-move-out",
    name: "Move In / Move Out",
    description:
      "Empty-property cleaning to landlord-ready standards — inside cupboards, ovens and windows, scheduled around your keys rather than the other way round.",
    icon: "key",
    priceFrom: 12000,
    highlights: ["Inside all cupboards", "Oven & window interiors", "Photo-ready final walkthrough"],
  },
  {
    slug: "office-commercial",
    name: "Office & Commercial",
    description:
      "Desks, boardrooms, kitchens, washrooms and bins handled outside your core hours, with after-hours and weekend slots and a named account manager.",
    icon: "building",
    priceFrom: 8000,
    highlights: ["After-hours & weekend slots", "Washrooms & kitchen stations", "Recurring commercial contracts"],
  },
  {
    slug: "post-construction",
    name: "Post-Construction",
    description:
      "Builders handover cleaning — dust extraction, adhesive and paint removal, full debris tidy, wet-scrubbed floors and a snag-ready finish.",
    icon: "hammer",
    priceFrom: 15000,
    highlights: ["Dust extraction & paint removal", "Wet-scrubbed hard floors", "Snag-ready handover report"],
  },
  {
    slug: "airbnb-rental-turnover",
    name: "Airbnb & Rental Turnover",
    description:
      "Fast, photography-ready turnovers between guests: linens changed, amenities restocked, condition checked and reported after every single stay.",
    icon: "bed",
    priceFrom: 3500,
    highlights: ["Linen change & restock", "Guest-ready photography finish", "Post-stay condition report"],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

/** Build-time guard: a typo in a slug must fail the build, not render "KSh 0". */
export const getServicePrice = (slug: string): number => {
  const service = getServiceBySlug(slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service.priceFrom;
};

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

export const homeSizeLabels: Readonly<Record<string, string>> =
  Object.fromEntries(homeSizes.map((size) => [size.value, size.label]));

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

export type TrustSignal = {
  icon: "shield" | "check" | "clock" | "leaf";
  title: string;
  body: string;
  featured?: boolean;
};

export const trustSignals: readonly TrustSignal[] = [
  {
    icon: "shield",
    title: "Vetted & background-checked",
    body: "Every cleaner is interviewed, reference-checked and police-cleared before they ever step through your door.",
  },
  {
    icon: "check",
    title: "Fully insured & bonded",
    body: "KSh 50M public liability cover and a bonded workforce, so damage is always handled quickly and fairly.",
  },
  {
    icon: "clock",
    title: "Late? Your clean is free",
    body: "We hold ourselves to the arrival window we promise you on the phone. Miss it, and the clean is on us — no forms, no argument.",
    featured: true,
  },
  {
    icon: "leaf",
    title: "Eco-friendly supplies",
    body: "Plant-based, fragrance-light products that are safe for kids, pets and the surfaces you love.",
  },
];

export type ChecklistGroup = { group: string; items: readonly string[] };

export const checklistGroups: readonly ChecklistGroup[] = [
  {
    group: "Kitchen & appliances",
    items: [
      "Kitchen surfaces, sinks & splashbacks",
      "Oven, hob & microwave exteriors",
      "Appliance exterior polishing",
      "Extractor fans and vents",
      "Food and crumbs cleared",
      "Restocking paper & soap supplies",
      "Inside microwave glass turntable",
      "Fridge door seals and shelving",
      "Dishwasher front & cutlery basket",
      "Benchtops and tile grout degreased",
      "Recycling sorted, caddies rinsed",
    ],
  },
  {
    group: "Bathrooms & laundry",
    items: [
      "Bathrooms descaled & disinfected",
      "Toilets, mirrors & glassware",
      "Laundry folded or hung",
      "Shower screens squeegeed",
      "Taps, drains & soap dispensers polished",
      "Tile grout and grime spot-treated",
      "Toilet cistern and base disinfected",
      "Towel rails and hooks wiped down",
    ],
  },
  {
    group: "Bedrooms & living areas",
    items: [
      "Beds made, linens straightened",
      "Dusting of all surfaces & ledges",
      "Spot-cleaning of marks & fingerprints",
      "Cupboards emptied & wiped",
      "Inside handles, switches & remotes",
      "Personal items returned to place",
      "Mirrors, glass & picture frames",
      "Upholstery and fabric headboards",
      "Blinds and window sills wiped",
      "Wardrobe rails and drawers spot-cleaned",
    ],
  },
  {
    group: "Floors, surfaces & waste",
    items: [
      "Vacuuming of carpets & rugs",
      "Mopping of hard floors",
      "Skirting boards & door frames",
      "Interior doors and tracks",
      "Light switches and power points",
      "Bins emptied & liners replaced",
      "Garbage and recycling to the curb",
      "Balcony or patio tidy",
      "Entry mats shaken out",
      "Corners, edges & skirting vacuumed",
      "Stairs, banisters & ledges dusted",
    ],
  },
  {
    group: "Finishing, lock-up & reporting",
    items: [
      "Entryway and mat areas",
      "Surfaces left streak-free and dry",
      "Eco-friendly finishing spritz",
      "Final walkthrough quality check",
      "Secure lock-up and keys handed back",
      "Photo checklist uploaded to your portal",
      "Follow-up scheduled if required",
      "Alarms set and entry points checked",
      "Consumables restocked for the next visit",
      "Anything we couldn't finish, written down",
    ],
  },
];

export const checklist = checklistGroups.flatMap((entry) => entry.items);

export const secondaryStats = [
  { value: "12,000+", label: "Homes cleaned" },
  { value: "320+", label: "Cleaners on roster" },
  { value: `${checklist.length}-point`, label: "Checklist, every visit" },
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
    location: "Westlands",
    initials: "DR",
    rating: 5,
    service: "Regular House Cleaning",
  },
  {
    quote:
      "Handed back a rental deposit of KSh 40,000 after a move-out clean in Lavington. Inside of every cupboard, the oven, even the window tracks. Worth every shilling.",
    name: "Marcus T.",
    location: "Lavington",
    initials: "MT",
    rating: 5,
    service: "Move In / Move Out",
  },
  {
    quote:
      "Six Airbnbs, tight turnarounds, never missed one. The post-stay condition report means I have zero guest messages about cleanliness.",
    name: "Priya S.",
    location: "Nyali",
    initials: "PS",
    rating: 5,
    service: "Airbnb & Rental Turnover",
  },
  {
    quote:
      "Our office is cleaned at 11pm so the team walks in to a fresh floor every morning. The after-hours pricing was better than the daytime quotes we had.",
    name: "Ellie W.",
    location: "Upper Hill",
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
