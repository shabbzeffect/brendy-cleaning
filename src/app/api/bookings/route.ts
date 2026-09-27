import { desc } from "drizzle-orm";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { homeSizeValues, serviceSlugs } from "@/lib/site";
import { validateBookingPayload } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  try {
    const rows = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));

    return Response.json({ bookings: rows });
  } catch (error) {
    console.error("[api/bookings] read failed", error);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  const result = validateBookingPayload(body, serviceSlugs, homeSizeValues);

  if (!result.ok) {
    return Response.json(
      { error: "Please check the highlighted fields.", fieldErrors: result.errors },
      { status: 422 },
    );
  }

  try {
    const [booking] = await db.insert(bookings).values(result.data).returning();

    if (!booking) {
      return Response.json(
        { error: "We couldn't save your booking. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("[api/bookings] insert failed", error);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
