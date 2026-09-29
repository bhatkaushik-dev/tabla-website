import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { CMS_TAG } from "@/lib/cms/api";

/**
 * Webhook the admin panel calls after every content save, so an edit reaches
 * the live site within seconds instead of at the next ISR interval.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *
 * It marks the cached API payload stale rather than expiring it: the next
 * visit is still served the cached page instantly while fresh content is
 * fetched in the background, so the change shows from the visit after. An
 * outright expiry would make that visitor wait on the API — 5–15s on this
 * free-tier backend.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ revalidated: false, error: "Not configured" }, { status: 503 });
  }

  const presented = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = Buffer.from(presented);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CMS_TAG, "max");
  return Response.json({ revalidated: true, now: Date.now() });
}
