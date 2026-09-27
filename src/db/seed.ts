import "dotenv/config";

import { eq } from "drizzle-orm";

import { db, pool } from "./index";
import { services, type NewService } from "./schema";

const catalog: NewService[] = [
  {
    slug: "regular-house-cleaning",
    name: "Regular House Cleaning",
    description:
      "Weekly, fortnightly or monthly top-ups that keep every room guest-ready. Kitchen, bathrooms, floors, dust, bins and beds made on a recurring schedule.",
    icon: "home",
    priceFrom: 89,
    sortOrder: 1,
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    description:
      "A reset for the details your routine clean misses: skirting boards, inside appliances, grout, limescale, vents and light fixtures. Ideal spring or seasonal cleans.",
    icon: "sparkles",
    priceFrom: 199,
    sortOrder: 2,
  },
  {
    slug: "move-in-move-out",
    name: "Move In / Move Out",
    description:
      "Empty-property cleaning with landlord-ready standards, inside cupboards, ovens and windows. Booked around your keys, not the other way round.",
    icon: "key",
    priceFrom: 249,
    sortOrder: 3,
  },
  {
    slug: "office-commercial",
    name: "Office & Commercial",
    description:
      "Desks, boardrooms, kitchens, washrooms and bins handled outside your core hours. After-hours and weekend slots with a named account manager.",
    icon: "building",
    priceFrom: 149,
    sortOrder: 4,
  },
  {
    slug: "post-construction",
    name: "Post-Construction",
    description:
      "Builders handover cleaning — dust extraction, adhesive and paint removal, full debris tidy, wet-scrubbed floors and a snag-ready finish.",
    icon: "hammer",
    priceFrom: 299,
    sortOrder: 5,
  },
  {
    slug: "airbnb-rental-turnover",
    name: "Airbnb & Rental Turnover",
    description:
      "Fast, photography-ready turnovers between guests: linens, restocking, amenity checks and a final walkthrough report after every stay.",
    icon: "bed",
    priceFrom: 79,
    sortOrder: 6,
  },
];

async function main() {
  for (const service of catalog) {
    const [existing] = await db
      .select({ id: services.id })
      .from(services)
      .where(eq(services.slug, service.slug))
      .limit(1);

    if (existing) {
      await db
        .update(services)
        .set({
          name: service.name,
          description: service.description,
          icon: service.icon,
          priceFrom: service.priceFrom,
          sortOrder: service.sortOrder,
        })
        .where(eq(services.id, existing.id));
      console.log(`updated  ${service.slug}`);
      continue;
    }

    await db.insert(services).values(service);
    console.log(`inserted ${service.slug}`);
  }

  console.log(`\nSeeded ${catalog.length} services.`);
}

main()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error("Seed failed:", error);
    await pool.end();
    process.exit(1);
  });
