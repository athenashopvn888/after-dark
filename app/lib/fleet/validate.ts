import {
  FLEET_DOMAIN,
  FLEET_MAX_BUNDLE_BYTES,
  FLEET_SCHEMA_VERSION,
  FLEET_STORE_CODE,
  type ContentBundle,
  type ContentManifest,
  type ContentSlot,
  type RejectReason,
} from "./types.ts";

export type AcceptResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: RejectReason };

const BUNDLE_IDENTITY = ["schemaVersion", "storeCode", "domain", "contentVersion", "publishedAt", "sourceHash", "jobId"] as const;
const MANIFEST_IDENTITY = ["storeCode", "contentVersion", "bundleUrl", "publishedAt", "jobId"] as const;
const RELATIVE_IMAGE = /^\/(?!\/)(?:[A-Za-z0-9._~-]+\/)*[A-Za-z0-9._~-]+\.(?:webp|png|jpe?g|gif|avif|svg)$/i;

function objectRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function hasIdentity(record: Record<string, unknown>, keys: readonly string[]): boolean {
  return keys.every((key) => {
    const value = record[key];
    if (typeof value === "number") return Number.isFinite(value);
    return typeof value === "string" && value.trim().length > 0;
  });
}

function domainMatches(domain: string): boolean {
  const host = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
  return host === FLEET_DOMAIN;
}

function versionOrder(bundle: ContentBundle, previous: ContentBundle | null): RejectReason | null {
  if (!previous) return null;
  const publishedAt = Date.parse(bundle.publishedAt);
  const previousAt = Date.parse(previous.publishedAt);
  if (!Number.isFinite(publishedAt) || !Number.isFinite(previousAt)) return "missing-identity";
  if (publishedAt < previousAt) return "published-at-older";
  if (bundle.contentVersion === previous.contentVersion) return "duplicate-version";
  if (bundle.contentVersion < previous.contentVersion) return "decreasing-version";
  return null;
}

function imageHostAllowed(host: string): boolean {
  return host.endsWith(".blob.vercel-storage.com")
    || host.endsWith(".public.blob.vercel-storage.com")
    || host === FLEET_DOMAIN
    || host === `www.${FLEET_DOMAIN}`
    || host === "athena-cannabis-images.vercel.app"
    || host.endsWith(".r2.dev");
}

/** Empty is a missing image. Anything else must be a site path or an https image URL. */
export function imageUrlAllowed(value: unknown): boolean {
  if (value == null || value === "") return true;
  if (typeof value !== "string") return false;
  if (value !== value.trim() || value.includes("..") || value.includes("\\") || /\s/.test(value)) return false;
  if (RELATIVE_IMAGE.test(value)) return true;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (!imageHostAllowed(url.hostname.toLowerCase())) return false;
    return /\.(?:webp|png|jpe?g|gif|avif|svg)$/i.test(url.pathname);
  } catch {
    return false;
  }
}

function slotsHaveSafeImages(slots: ContentSlot[] | undefined): boolean {
  if (!slots) return true;
  return slots.every((slot) => imageUrlAllowed(slot.image));
}

export function parseBundle(raw: string, previous: ContentBundle | null = null): AcceptResult<ContentBundle> {
  if (Buffer.byteLength(raw) > FLEET_MAX_BUNDLE_BYTES) return { ok: false, reason: "oversized" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
  const record = objectRecord(parsed);
  if (!record || !hasIdentity(record, BUNDLE_IDENTITY)) return { ok: false, reason: "missing-identity" };
  if (record.schemaVersion !== FLEET_SCHEMA_VERSION) return { ok: false, reason: "schema-version" };
  if (record.storeCode !== FLEET_STORE_CODE) return { ok: false, reason: "wrong-store" };
  if (!domainMatches(String(record.domain))) return { ok: false, reason: "wrong-domain" };
  if (!Number.isFinite(Date.parse(String(record.publishedAt)))) return { ok: false, reason: "missing-identity" };
  const bundle = record as unknown as ContentBundle;
  if (!slotsHaveSafeImages(bundle.slots) || !slotsHaveSafeImages(bundle.all?.slots)) {
    return { ok: false, reason: "bad-image-url" };
  }
  const order = versionOrder(bundle, previous);
  if (order) return { ok: false, reason: order };
  return { ok: true, value: bundle };
}

export function parseManifest(raw: string): AcceptResult<ContentManifest> {
  if (Buffer.byteLength(raw) > FLEET_MAX_BUNDLE_BYTES) return { ok: false, reason: "oversized" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
  const record = objectRecord(parsed);
  if (!record || !hasIdentity(record, MANIFEST_IDENTITY)) return { ok: false, reason: "missing-identity" };
  if (record.storeCode !== FLEET_STORE_CODE) return { ok: false, reason: "wrong-store" };
  if (!Number.isFinite(Date.parse(String(record.publishedAt)))) return { ok: false, reason: "missing-identity" };
  if (typeof record.contentVersion !== "number") return { ok: false, reason: "missing-identity" };
  return { ok: true, value: record as unknown as ContentManifest };
}

export function rejectHttp(status: number): AcceptResult<never> | null {
  if (status === 304) return null;
  if (status < 200 || status >= 300) return { ok: false, reason: "http" };
  return null;
}
