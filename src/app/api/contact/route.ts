import { contacts } from "@/db/schema";
import { db } from "@/db";
import { validateContactPayload } from "@/lib/validation";

export const dynamic = "force-dynamic";

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

  const result = validateContactPayload(body);

  if (!result.ok) {
    return Response.json(
      { error: "Please check the highlighted fields.", fieldErrors: result.errors },
      { status: 422 },
    );
  }

  try {
    const [contact] = await db.insert(contacts).values(result.data).returning();

    if (!contact) {
      return Response.json(
        { error: "We couldn't save your message. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ contact }, { status: 201 });
  } catch (error) {
    console.error("[api/contact] insert failed", error);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
