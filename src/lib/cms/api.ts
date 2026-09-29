import "server-only";

import type { Bootstrap, EnquiryPayload, EnquiryResponse } from "./types";

/**
 * Server-side client for the portfolio API. Nothing here runs in the browser:
 * content is fetched at build/ISR time and enquiries go through a Server
 * Action, so the API is never on a visitor's critical path — which matters,
 * because a cold start on the free tier takes 10s or more.
 */

/** Every cached API response carries this tag; /api/revalidate expires it. */
export const CMS_TAG = "cms";

/**
 * How stale content may get when nothing calls /api/revalidate. The admin
 * panel pings that route on every save, so this is only the safety net.
 */
export const CMS_REVALIDATE_SECONDS = 300;

export class CmsError extends Error {}

function config() {
  const base = process.env.API_BASE_URL?.replace(/\/$/, "");
  const siteKey = process.env.API_SITE_KEY;
  return base && siteKey ? { base, siteKey } : null;
}

async function request(
  path: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const cfg = config();
  if (!cfg) throw new CmsError("API_BASE_URL / API_SITE_KEY are not set");

  let response: Response;
  try {
    response = await fetch(`${cfg.base}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "X-Site-Key": cfg.siteKey,
        ...init.headers,
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new CmsError(`Could not reach the API at ${path} (${reason})`);
  }

  if (!response.ok) {
    throw new CmsError(`${init.method ?? "GET"} ${path} failed with ${response.status}`);
  }
  return response;
}

/**
 * The whole site's content in one round trip. Cached in the Data Cache and
 * shared by every route, so a revalidation costs one request, not six.
 */
export async function fetchBootstrap(): Promise<Bootstrap> {
  // One retry: the first attempt often only wakes the backend up.
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await request(
        "/bootstrap",
        { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [CMS_TAG] } },
        20_000,
      );
      return (await response.json()) as Bootstrap;
    } catch (error) {
      if (attempt >= 2) throw error;
    }
  }
}

/**
 * Persists a lead. The backend commits before it does anything else, so a
 * success here means the enquiry is saved even if its email notification
 * later fails.
 */
export async function createEnquiry(
  payload: EnquiryPayload,
  forwarded: Record<string, string>,
): Promise<EnquiryResponse> {
  const response = await request(
    "/enquiries",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...forwarded },
      body: JSON.stringify(payload),
    },
    25_000,
  );
  return (await response.json()) as EnquiryResponse;
}
