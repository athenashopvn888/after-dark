export { CODED_BANNERS, CODED_NAP, CODED_PAGES, FLEET_STORE_CODE } from "./config.ts";
import { CODED_BANNERS, CODED_NAP, FLEET_STORE_CODE } from "./config.ts";
import type { Nap, ResolvedBanner } from "./types.ts";

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
