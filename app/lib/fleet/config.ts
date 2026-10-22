import { HOME_DOC_TITLE } from "../homeDelivery.ts";
import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE, mapsEmbedUrl, mapsSearchUrl } from "../storeIdentity.ts";
import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "MJ01";
export const FLEET_STORE_NAME = STORE.name;
export const FLEET_AREA = FULL_NAME_NAP.neighbourhood;
export const FLEET_DOMAIN = STORE.domain;
export const FLEET_DOMAINS = [STORE.domain, `www.${STORE.domain}`] as const;
export const FLEET_ORIGIN = STORE.baseUrl;

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
} as const;

/**
 * Digits or formatted numbers. An article containing any of these is dropped.
 * Kept empty here so blocked carrier numbers are not stored in the repo.
 */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fort York Cannabis takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

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
    codedImage: "/banners/core-top-weed.webp",
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
    codedImage: "/banners/core-vapes-nicotine-thc.webp",
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
    codedImage: "/banners/core-cigarette-mix-match.webp",
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
    codedImage: "/banners/core-premium-cigarettes.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    textBar: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
  },
];

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
