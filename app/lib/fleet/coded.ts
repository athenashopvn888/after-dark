import { HOME_DOC_TITLE } from "../homeDelivery.ts";
import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE, mapsEmbedUrl, mapsSearchUrl } from "../storeIdentity.ts";
import { FLEET_STORE_CODE, type Nap, type ResolvedBanner, type ResolvedPage } from "./types.ts";

const STORE_NAME = STORE.name;

/**
 * Coded homepage banners. Copy and art match app/components/FleetAnnouncementBanner.tsx.
 * Category art also lives in app/lib/corePromotionBanners.ts.
 */
export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic-weed",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/core-top-weed.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
    title: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    textBar: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/core-vapes-nicotine-thc.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} nicotine and THC vape categories`,
    title: "Nicotine + THC vapes",
    textBar: "Nicotine + THC vapes",
    caption: "Nicotine + THC vapes",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-cigarette-mix-match.webp",
    imageWidth: 2048,
    imageHeight: 768,
    alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: "2 PACKS $5 / $25 CARTON",
    textBar: "2 PACKS $5 / $25 CARTON",
    caption: "2 PACKS $5 / $25 CARTON",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-premium-cigarettes.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    textBar: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
  },
];

/** Coded NAP. Values are the live store record. City stays York. */
export const CODED_NAP: Nap = {
  name: STORE.name,
  street: STORE.streetAddress,
  city: STORE.addressLocality,
  province: STORE.addressRegion,
  postalCode: STORE.postalCode,
  cityLine: `${STORE.addressLocality}, ${STORE.addressRegion} ${STORE.postalCode}`,
  area: FULL_NAME_NAP.neighbourhood,
  intersection: STORE.intersection,
  areaLine: `${STORE.intersection}, ${FULL_NAME_NAP.neighbourhood}`,
  phoneDisplay: STORE.phoneDisplay,
  phoneTel: STORE.phoneTel,
  hours: STORE.hoursNote,
  mapsSearchUrl,
  mapsEmbedUrl,
  lat: String(STORE.latitude),
  lng: String(STORE.longitude),
  schemaName: FULL_NAME_NAP.fullName,
  website: STORE.homepageUrl,
};

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: STORE.seoDescription,
    metaTitle: HOME_DOC_TITLE,
    metaDescription: STORE.seoDescription,
  },
  Contact: {
    description: "Contact After Dark Cannabis at 1664 Jane Street, York, ON M9N 2S1. Open 24 hours. Call +1 (437) 524-9344. The homepage stays the visit hub.",
    metaTitle: "Contact After Dark Cannabis | 1664 Jane Street York",
    metaDescription: "Contact After Dark Cannabis at 1664 Jane Street, York, ON M9N 2S1. Open 24 hours. Call +1 (437) 524-9344. The homepage stays the visit hub.",
  },
};

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}

export function codedBannerFor(id: ResolvedBanner["id"]): ResolvedBanner | undefined {
  return CODED_BANNERS.find((entry) => entry.id === id);
}

/**
 * Browser onError for a sheet image. Try this slot's coded image once.
 * A second failure, or no coded image, returns null so the caller paints the
 * category name. Never a different slot's graphic.
 */
export function nextBannerSrc(currentSrc: string, codedSrc: string | undefined): string | null {
  const coded = codedSrc?.trim() ?? "";
  if (!coded || currentSrc === coded) return null;
  return coded;
}

export type BannerImagePhase = "sheet" | "coded" | "category";

/** One step of the onError chain. Sheet -> coded image -> category name. Never loops. */
export function nextBannerPhase(phase: BannerImagePhase, sheetSrc: string, codedSrc: string | undefined): BannerImagePhase {
  if (phase !== "sheet") return "category";
  return nextBannerSrc(sheetSrc, codedSrc) ? "coded" : "category";
}

export function napDiffers(nap: Nap): boolean {
  return (Object.keys(CODED_NAP) as (keyof Nap)[]).some((key) => nap[key] !== CODED_NAP[key]);
}

/** Null keeps every coded NAP string. A bundle only replaces NAP after a real change. */
export function sheetNap(fleet: { active: boolean; nap: Nap }): Nap | null {
  if (!fleet.active || !napDiffers(fleet.nap)) return null;
  return fleet.nap;
}

export function bannersMatchCoded(banners: ResolvedBanner[]): boolean {
  if (banners.length !== CODED_BANNERS.length) return false;
  return banners.every((banner, index) => {
    const coded = CODED_BANNERS[index];
    return banner.id === coded.id
      && banner.hidden === false
      && banner.render === "image"
      && banner.image === coded.image
      && banner.href === coded.href
      && banner.alt === coded.alt
      && banner.title === coded.title
      && banner.textBar === coded.textBar
      && banner.caption === coded.caption
      && banner.categoryName === coded.categoryName;
  });
}
