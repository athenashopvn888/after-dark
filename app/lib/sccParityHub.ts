import { STORE } from "./storeIdentity";

export type SccHubLink = {
  href: string;
  label: string;
  blurb: string;
};

/** Geo / visit / 24h / corridor hubs. Homepage NAP stays the address owner. */
export const SCC_GEO_HUBS = [
  {
    href: "/",
    label: "Homepage NAP hub",
    blurb: "Address, phone, 24-hour hours, and map at 1664 Jane Street, York.",
  },
  {
    href: STORE.visitPath,
    label: "How to reach Jane Street",
    blurb: "35 Jane bus, street parking, and Jane & Lawrence arrival notes.",
  },
  {
    href: STORE.storePagePath,
    label: "York weed dispensary",
    blurb: "Broad York weed owner page for the Jane Street walk-in.",
  },
  {
    href: STORE.cannabisDeliveryPath,
    label: "York cannabis delivery",
    blurb: "Jane Street York-radius drop-off. Dispatcher confirms address — not 24-hour delivery.",
  },
  {
    href: STORE.hoursPath,
    label: "24-hour open-now guide",
    blurb: "Late-night hours and ID at the York counter. Open 24 hours — walk-in only.",
  },
  {
    href: STORE.nativeCigarettesPath,
    label: "Native cigarettes York",
    blurb: "Jane Street neighbourhood guide for the listed cigarette category.",
  },
  {
    href: STORE.nicotineVapePath,
    label: "Nicotine vapes York",
    blurb: "Jane Street neighbourhood guide for the listed nicotine vape category.",
  },
  {
    href: STORE.corridorPath,
    label: "Jane & Lawrence corridor",
    blurb: "Weston and Mount Dennis walk-in to this Jane Street pin.",
  },
] as const satisfies readonly SccHubLink[];

/**
 * Live flower-tier canonicals. Short `/exotic`…`/budget` 301 here (V2.1 lock).
 * Wave 1 links the indexed `*-weed` URLs; do not point internals at the legacy shorts.
 */
export const SCC_TIER_HUBS = [
  {
    href: "/exotic-weed",
    label: "Exotic flower",
    blurb: "Exotic listings at the Jane Street York counter — this tier only.",
  },
  {
    href: "/premium-weed",
    label: "Premium flower",
    blurb: "Premium flower lane, separate from Exotic and AAA+.",
  },
  {
    href: "/aaa-weed",
    label: "AAA+ flower",
    blurb: "AAA+ letter-grade flower between AA and Premium.",
  },
  {
    href: "/aa-weed",
    label: "AA flower",
    blurb: "Everyday AA flower, distinct from Budget and AAA+.",
  },
  {
    href: "/budget-weed",
    label: "Budget flower",
    blurb: "Value Budget flower at the York walk-in — a tier, not a coupon.",
  },
] as const satisfies readonly SccHubLink[];

/** Homepage hub cards: five tiers + York weed hub + /visit. */
export const HOME_HUB_HREFS = [
  STORE.storePagePath,
  STORE.visitPath,
  STORE.cannabisDeliveryPath,
  STORE.hoursPath,
  STORE.nativeCigarettesPath,
  STORE.nicotineVapePath,
  ...SCC_TIER_HUBS.map((hub) => hub.href),
] as const;

export function normalizeHubPath(href: string) {
  if (href === "/") return "/";
  return href.replace(/\/+$/, "") || "/";
}

export function hubLinksForPage({
  currentPath,
  geoSet = "all",
  includeTiers = true,
}: {
  currentPath: string;
  geoSet?: "core" | "all";
  includeTiers?: boolean;
}): SccHubLink[] {
  const current = normalizeHubPath(currentPath);
  const coreHrefs: ReadonlySet<string> = new Set([
    STORE.visitPath,
    STORE.storePagePath,
    STORE.cannabisDeliveryPath,
    STORE.hoursPath,
    STORE.nativeCigarettesPath,
    STORE.nicotineVapePath,
  ]);
  const geo =
    geoSet === "core"
      ? SCC_GEO_HUBS.filter((hub) => coreHrefs.has(hub.href))
      : [...SCC_GEO_HUBS];
  const tiers = includeTiers ? [...SCC_TIER_HUBS] : [];
  return [...geo, ...tiers].filter((hub) => normalizeHubPath(hub.href) !== current);
}
