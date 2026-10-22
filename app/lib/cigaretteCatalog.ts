import itemsJson from "./items.json";
import {
  SHOW_CIGARETTES,
  VAPE_PAGE_PATH,
  isCodedCigaretteHref,
  isKeptSmokeAccessoryName,
} from "./siteConfig";

type CatalogItem = { name: string; slug: string; category: string };

const catalog = itemsJson as CatalogItem[];

const hiddenItemSlugs = new Set(
  catalog
    .filter((item) => item.category.toUpperCase() === "CIGARETTES" && !isKeptSmokeAccessoryName(item.name, item.slug))
    .map((item) => item.slug),
);

export function isHiddenCigaretteItem(item: { name: string; slug: string; category: string }): boolean {
  if (SHOW_CIGARETTES) return false;
  if (isKeptSmokeAccessoryName(item.name, item.slug)) return false;
  return item.category.toUpperCase() === "CIGARETTES" || hiddenItemSlugs.has(item.slug);
}

function barePath(pathname: string): string {
  return pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
}

/** Cigarette URLs that the coded switch redirects. Ignores the on/off value itself. */
export function isGatedCigarettePath(pathname: string): boolean {
  const path = barePath(pathname);
  if (isCodedCigaretteHref(path)) return true;
  if (path.startsWith("/item/")) {
    const slug = decodeURIComponent(path.slice("/item/".length));
    if (hiddenItemSlugs.has(slug)) return true;
  }
  return false;
}

/**
 * Hide a cigarette row for this request.
 * `show` comes from webOn / tvOn. Coded behaviour matches the existing switch.
 */
export function isCigaretteItemHidden(item: { name: string; slug: string; category: string }, show: boolean): boolean {
  if (show) return false;
  if (isKeptSmokeAccessoryName(item.name, item.slug)) return false;
  return item.category.toUpperCase() === "CIGARETTES" || hiddenItemSlugs.has(item.slug);
}

/** 302 target while the coded switch is off. Null keeps the original URL. */
export function cigaretteRedirectPath(pathname: string): string | null {
  if (SHOW_CIGARETTES) return null;
  if (!isGatedCigarettePath(pathname)) return null;
  return VAPE_PAGE_PATH;
}
