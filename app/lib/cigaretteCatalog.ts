import itemsJson from "./items.json";
import {
  SHOW_CIGARETTES,
  VAPE_PAGE_PATH,
  isHiddenCigaretteHref,
  isKeptSmokeAccessoryName,
  isKeptSmokePath,
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

/** 302 target while the switch is off. Null keeps the original URL. */
export function cigaretteRedirectPath(pathname: string): string | null {
  if (SHOW_CIGARETTES) return null;
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if (isKeptSmokePath(path)) return null;
  if (isHiddenCigaretteHref(path)) return VAPE_PAGE_PATH;
  if (path.startsWith("/item/")) {
    const slug = decodeURIComponent(path.slice("/item/".length));
    if (hiddenItemSlugs.has(slug)) return VAPE_PAGE_PATH;
  }
  return null;
}
