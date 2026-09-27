import { sql } from "drizzle-orm";

import { db } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[api/health] database check failed", error);
    return Response.json(
      { ok: false, error: "Database unreachable." },
      { status: 500 },
    );
  }
}
