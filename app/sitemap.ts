import type { MetadataRoute } from "next";
import { isHiddenCigaretteItem } from "./lib/cigaretteCatalog";
import { DELIVERY_GUIDE_REGISTRY } from "./lib/deliveryGuideRegistry";
import { TIER_CONFIG, CATEGORY_CONFIG } from "./lib/products";
import { SHOW_CIGARETTES, isHiddenCigaretteGuideSlug, isHiddenCigaretteHref } from "./lib/siteConfig";
import { getAdcInventory } from "./lib/adcInventoryService";
import { SEO_PAGES } from "./lib/seoPages";
import { loadFleetArticles } from "./lib/fleet/articles";
import { codedArticleSlugs } from "./lib/fleet/codedLinks";
import { ARTICLE_CANONICAL, ARTICLE_DATE } from "./resources/how-cannabis-delivery-works-ontario/articleMeta";
import { RESOURCE_PAGES } from "./resources/resourceData";
import { GUIDE_REGISTRY } from "./lib/guideRegistry";

const BASE = "https://afterdarkcannabis.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const liveInventory = (await getAdcInventory()).snapshot;
  const inStockFlowers = liveInventory.flowers;
  const inStockItems = liveInventory.items;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/weed-dispensary-york`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/careers/budtender`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/hours`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/visit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/24-hour-dispensary-york`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/jane-and-lawrence-dispensary`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/weed-delivery-york`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/cannabis-delivery-york`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...(SHOW_CIGARETTES ? [{ url: `${BASE}/native-cigarettes-york`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    { url: `${BASE}/nicotine-vape-york`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/vape-shop-york`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
  ];

  /* Tier pages */
  const tierPages: MetadataRoute.Sitemap = Object.values(TIER_CONFIG).map((t) => ({
    url: `${BASE}/${t.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  /* Item category pages */
  const itemPages: MetadataRoute.Sitemap = Object.values(CATEGORY_CONFIG).filter((c) => SHOW_CIGARETTES || c.slug !== "cigarettes").map((c) => ({
    url: `${BASE}/items/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  /* Flower detail pages */
  const flowerPages: MetadataRoute.Sitemap = inStockFlowers.map((f) => ({
    url: `${BASE}/flower/${f.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* Item detail pages */
  const itemDetailPages: MetadataRoute.Sitemap = inStockItems.map((i) => (
    isHiddenCigaretteItem(i) ? null : {
      url: `${BASE}/item/${i.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }
  )).filter((page): page is NonNullable<typeof page> => page !== null);

  /* SEO landing pages — skip demoted city-farm URLs */
  const seoPages: MetadataRoute.Sitemap = SEO_PAGES.filter((p) => p.slug !== "weed-store-near-mississauga" && (SHOW_CIGARETTES || !isHiddenCigaretteHref(`/info/${p.slug}`))).map((p) => ({
    url: `${BASE}/info/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const resourcePages: MetadataRoute.Sitemap = RESOURCE_PAGES.filter((page) => !isHiddenCigaretteHref(page.path)).map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.path === "/resources" ? 0.75 : 0.65,
  }));

  const guidePages: MetadataRoute.Sitemap = [...GUIDE_REGISTRY, ...DELIVERY_GUIDE_REGISTRY].filter((guide) => !("lane" in guide) || !isHiddenCigaretteGuideSlug(guide.slug)).map((guide) => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const guideIndex: MetadataRoute.Sitemap = [{
    url: `${BASE}/guides`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }];

  const publishedArticlePages: MetadataRoute.Sitemap = [
    { url: ARTICLE_CANONICAL, lastModified: ARTICLE_DATE, changeFrequency: "monthly", priority: 0.65 },
  ];

  let fleetArticlePages: MetadataRoute.Sitemap = [];
  try {
    const loaded = await loadFleetArticles();
    if (loaded.ok) {
      const codedSlugs = codedArticleSlugs();
      fleetArticlePages = loaded.articles.filter((article) => !codedSlugs.has(article.slug)).map((article) => ({
        url: `${BASE}/articles/${article.slug}`,
        lastModified: article.publishedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {
    fleetArticlePages = [];
  }

  return [...guideIndex, ...guidePages, ...staticPages, ...tierPages, ...itemPages, ...flowerPages, ...itemDetailPages, ...seoPages, ...resourcePages, ...publishedArticlePages, ...fleetArticlePages];
}
