import { eq } from "drizzle-orm";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { bookingStatusValues, type BookingStatus } from "@/lib/site";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  if (!isAdminRequest(request)) return unauthorized();

  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "Invalid booking id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  const status = (body as { status?: unknown } | null)?.status;

  if (typeof status !== "string" || !bookingStatusValues.includes(status as BookingStatus)) {
    return Response.json(
      { error: `Status must be one of: ${bookingStatusValues.join(", ")}.` },
      { status: 422 },
    );
  }

  const parsedId = Number.parseInt(id, 10);

  try {
    const [booking] = await db
      .update(bookings)
      .set({ status: status as BookingStatus })
      .where(eq(bookings.id, parsedId))
      .returning();

    if (!booking) {
      return Response.json({ error: "Booking not found." }, { status: 404 });
    }

    return Response.json({ booking });
  } catch (error) {
    console.error("[api/bookings/:id] update failed", error);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
