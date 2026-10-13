const TOP_TIER_IMAGE = "/banners/core-top-weed.webp";
const VAPE_IMAGE = "/banners/core-vapes-nicotine-thc.webp";
const CIGARETTE_IMAGE = "/banners/core-cigarette-mix-match.webp";

const TOP_TIER_SLUGS = new Set(["exotic", "premium", "aaa", "exotic-weed", "premium-weed", "aaa-weed"]);
const VAPE_SLUGS = new Set(["vapes", "vape-disposables"]);

export function resolveTierBanner(slug: string, fallback?: string) {
  return TOP_TIER_SLUGS.has(slug) ? TOP_TIER_IMAGE : fallback || "";
}

export function resolveItemBanner(slug: string, fallback?: string) {
  if (VAPE_SLUGS.has(slug)) return VAPE_IMAGE;
  if (slug === "cigarettes") return CIGARETTE_IMAGE;
  return fallback || "";
}

export function isReplacementCategory(slug: string) {
  return TOP_TIER_SLUGS.has(slug) || VAPE_SLUGS.has(slug) || slug === "cigarettes";
}

