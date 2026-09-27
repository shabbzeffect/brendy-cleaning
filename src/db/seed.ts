import "dotenv/config";

import { eq } from "drizzle-orm";

import { services as catalog } from "../lib/site";
import { db, pool } from "./index";
import { services, type NewService } from "./schema";

// One source of truth: the site catalogue, so a price can never differ between
// the marketing page and the database.
const rows: NewService[] = catalog.map((service, index) => ({
  slug: service.slug,
  name: service.name,
  description: service.description,
  icon: service.icon,
  priceFrom: service.priceFrom,
  sortOrder: index + 1,
}));

async function main() {
  for (const service of rows) {
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

  console.log(`\nSeeded ${rows.length} services.`);
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
