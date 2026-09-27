import { timingSafeEqual } from "node:crypto";

import { getAdminToken } from "@/db";

export const isAdminRequest = (request: Request): boolean => {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());

  if (!match) return false;

  const provided = (match[1] ?? "").trim();
  const expected = getAdminToken();

  if (provided.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
};

export const unauthorized = (): Response =>
  Response.json(
    { error: "Unauthorized. A valid admin token is required." },
    { status: 401 },
  );
