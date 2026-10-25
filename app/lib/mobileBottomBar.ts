import { FULL_NAME_NAP } from "./fullNameNap.ts";
import { mapsDirectionsUrl, mapsSearchUrl } from "./storeIdentity.ts";

/** Hours page that renders weekly hours. STORE.hoursPath is the open-now guide. */
export const MOBILE_BAR_HOURS_HREF = "/hours";

/** Existing catalog route. Tier page is app/[tier]/page.tsx, slug exotic-weed. */
export const MOBILE_BAR_MENU_HREF = "/exotic-weed";

/**
 * Delivery catalog. /delivery only permanent-redirects here (next.config.ts
 * and app/delivery/page.tsx), so the bar links to the page that renders.
 */
export const MOBILE_BAR_DELIVERY_HREF = "/weed-delivery-york";

const CONFIGURED_MAP_URLS = [FULL_NAME_NAP.mapsUrl, mapsDirectionsUrl, mapsSearchUrl] as const;

/**
 * Store map link already in config.
 * Prefer a maps.app.goo.gl short link, then a GBP place pin, then the
 * Google Maps directions URL for the store address.
 */
export function preferredStoreMapsUrl(urls: readonly string[] = CONFIGURED_MAP_URLS): string {
  const short = urls.find((url) => url.includes("maps.app.goo.gl"));
  if (short) return short;
  const pin = urls.find((url) => /place_id[=:]/.test(url));
  if (pin) return pin;
  const directions = urls.find((url) => url.includes("/maps/dir/") || url.includes("maps/dir/?"));
  if (directions) return directions;
  return mapsDirectionsUrl;
}

/** In-store boards. The bar is omitted on these paths only. */
export function isMobileBarHiddenPath(pathname: string): boolean {
  const path = (pathname.split("?")[0].split("#")[0] || "/").replace(/\/+$/, "") || "/";
  return path === "/tv" || path === "/tv2";
}
