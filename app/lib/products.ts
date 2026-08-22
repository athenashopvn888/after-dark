/* -- Product & Item Types -- */
export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: "indica" | "sativa" | "hybrid";
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
}

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
}

/* ── Data imports (static fallback) ── */
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";
import snapshotMetaJson from "./productSnapshotMeta.json";
import approvedFlowerDisplayOverridesJson from "./approvedFlowerDisplayOverrides.json";
import { mergeProductDisplayOverrides } from "./liveProductFeed";

const approvedFlowerDisplayOverrides =
  approvedFlowerDisplayOverridesJson.flowers as FlowerProduct[];

export const allFlowers: FlowerProduct[] = mergeProductDisplayOverrides(
  flowersJson as FlowerProduct[],
  approvedFlowerDisplayOverrides,
);
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

/* ── Live stock fetch from Apps Script ── */
export const productSnapshotMeta = snapshotMetaJson as {
  storeCode: string;
  sourceAsOf: string;
  itemCount: number;
  flowerCount: number;
  flowerSkuCount: number;
  flowerSourceRowCount: number;
  flowerDisplayOverrideCount: number;
};

export const TIER_CONFIG: Record<
  string,
  {
    name: string; slug: string; color: string; icon: string; tagline: string; banner: string;
    unitPrice: number; /* $/g */
    deal3g: { label: string; total: string; price: number } | null; /* 3g bundle pricing */
    deal6g: { label: string; total: string; price: number } | null; /* 6g bundle pricing (top 3 only) */
  }
> = {
  EXOTIC: {
    name: "Exotic",
    slug: "exotic",
    color: "#f59e0b",
    icon: "\uD83D\uDD25",
    tagline: "Browse the Exotic flower section",
    banner: "/banners/after_dark_exotics_banner.webp",
    unitPrice: 20,
    deal3g: { label: "3g bundle", total: "3G", price: 40 },
    deal6g: { label: "6g bundle", total: "6G", price: 60 },
  },
  PREMIUM: {
    name: "Premium",
    slug: "premium",
    color: "#a78bfa",
    icon: "\uD83D\uDC8E",
    tagline: "Hand-picked connoisseur grade \u00B7 THC 32-34%",
    banner: "/banners/after_dark_premium_banner.webp",
    unitPrice: 15,
    deal3g: { label: "3g bundle", total: "3G", price: 30 },
    deal6g: { label: "6g bundle", total: "6G", price: 45 },
  },
  "AAA+": {
    name: "AAA+",
    slug: "aaa",
    color: "#22d3ee",
    icon: "\u26A1",
    tagline: "Heavy hitters, proven strains \u00B7 THC 30-32%",
    banner: "/banners/after_dark_aaa_plus_banner.webp",
    unitPrice: 10,
    deal3g: { label: "3g bundle", total: "3G", price: 20 },
    deal6g: { label: "6g bundle", total: "6G", price: 30 },
  },
  AA: {
    name: "AA",
    slug: "aa",
    color: "#34d399",
    icon: "\u2726",
    tagline: "Quality daily drivers \u00B7 THC 27-29%",
    banner: "/banners/after_dark_aa_banner.webp",
    unitPrice: 4,
    deal3g: null,
    deal6g: null,
  },
  BUDGET: {
    name: "Budget",
    slug: "budget",
    color: "#94a3b8",
    icon: "\uD83D\uDCB0",
    tagline: "Shreds & value OZs \u00B7 From $40/oz",
    banner: "/banners/after_dark_budget_banner.webp",
    unitPrice: 3,
    deal3g: { label: "$10 / 3g Special", total: "3G", price: 10 },
    deal6g: null,
  },
};

/* ── Item category config ── */
export interface CategoryInfo {
  name: string; slug: string; color: string; icon: string; banner?: string;
  seoTitle: string; seoIntro: string; seoDescription: string;
  faqs: { q: string; a: string }[];
}

export const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  EDIBLES: {
    banner: "/banners/after_dark_edibles_prerolls_more_banner.webp",
    name: "Edibles", slug: "edibles", color: "#f97316", icon: "🍬",
    seoTitle: "Cannabis Edibles Menu in York | After Dark Cannabis",
    seoIntro: "Browse edibles category information at After Dark Cannabis in York. Review edible-related menu categories and confirm current menu details before visiting.",
    seoDescription: "After Dark Cannabis provides edibles category and menu information for shoppers in York. Use this page to review edible-related menu categories and check current store details before visiting 1664 Jane St. Product selection can change, so confirm current menu information before you come in.",
    faqs: [
      { q: "What edible categories can I review?", a: "You can review edible-related menu categories such as gummies, chocolates, drinks, and other listed sections when they appear on the current menu." },
      { q: "How should I confirm current edible menu details?", a: "Check the current menu/category page or contact the store before visiting because menu details can change." },
      { q: "Where can I review edibles information for After Dark Cannabis?", a: "Use the edibles category page for After Dark Cannabis in York and confirm current details before visiting." },
    ],
  },
  "VAPE PENS": {
    banner: "/banners/01_Vape_Pens.webp",
    name: "Nic Vape", slug: "vapes", color: "#8b5cf6", icon: "💨",
    seoTitle: "Nicotine Vape Menu York | After Dark Cannabis",
    seoIntro: "Browse nicotine vape devices, formats, and menu prices listed at After Dark Cannabis on Jane Street in York.",
    seoDescription: "The nicotine vape menu at After Dark Cannabis keeps listed devices, formats, and prices together for York shoppers. THC vapes have a separate category. Visit 1664 Jane St in York.",
    faqs: [
      { q: "Is this the nicotine vape menu?", a: "Yes. This category is the nicotine vape menu for After Dark Cannabis." },
      { q: "Where are THC vapes?", a: "THC vapes are listed in a separate THC vape category on the site." },
    ],
  },
  "VAPE DISPOSABLE": {
    banner: "/banners/02_Vape_Disposable.webp",
    name: "THC Vape", slug: "vape-disposables", color: "#a78bfa", icon: "💨",
    seoTitle: "THC Vape Menu York | After Dark Cannabis",
    seoIntro: "Browse THC vape products and listed menu prices at After Dark Cannabis in York.",
    seoDescription: "The THC vape category at After Dark Cannabis keeps the listed cannabis vape products together for York shoppers. Nicotine vapes have a separate category. Visit 1664 Jane St in York.",
    faqs: [
      { q: "Is this the THC vape menu?", a: "Yes. This category is the THC vape menu for After Dark Cannabis." },
      { q: "Where are nicotine vapes?", a: "Nicotine vapes are listed in a separate nicotine vape category on the site." },
    ],
  },
  CONCENTRATES: {
    banner: "/banners/03_Concentrates.webp",
    name: "Concentrates", slug: "concentrates", color: "#f59e0b", icon: "💎",
    seoTitle: "Cannabis Concentrates in York | After Dark Cannabis",
    seoIntro: "Browse concentrates category information at After Dark Cannabis in York. Review concentrate-related menu details and confirm current store information before visiting.",
    seoDescription: "After Dark Cannabis provides a concentrates category page for adult shoppers reviewing concentrate-related menu information in York. Use this page to review current menu details, then confirm store information before visiting After Dark Cannabis at 1664 Jane St in York.",
    faqs: [
      { q: "What concentrate-related information can shoppers review?", a: "This category page helps adult shoppers review concentrate-related menu information when it is listed on the current menu." },
      { q: "How should customers confirm current concentrate menu details?", a: "Review the current menu information on this page and confirm store details before visiting After Dark Cannabis." },
    ],
  },
  PREROLLS: {
    banner: "/banners/04_Pre_Rolls.webp", name: "Pre-Rolls", slug: "prerolls", color: "#22c55e", icon: "🚬",
    seoTitle: "Pre-Rolls York — Ready-to-Smoke Cannabis Joints",
    seoIntro: "Pre-rolled cannabis joints at After Dark Cannabis, York. Singles, multi-packs, and infused pre-rolls — ready to light up.",
    seoDescription: "Skip the rolling and grab a pre-roll from After Dark Cannabis in York. We carry singles, multi-packs, and infused pre-rolls from premium flower. Whether you want a quick smoke or a party pack, our pre-roll selection has something for everyone. Visit us at 1664 Jane St — open daily 24 hours.",
    faqs: [
      { q: "What pre-rolls do you carry?", a: "We stock singles, 3-packs, and multi-packs in various strains and potencies, including infused pre-rolls with concentrates." },
      { q: "Are your pre-rolls made with quality flower?", a: "Yes! Our pre-rolls are filled with ground flower from our regular menu tiers — not shake or trim." },
    ],
  },
  "ADD ONS": {
    banner: "/banners/05_Accessories.webp",
    name: "Accessories", slug: "add-ons", color: "#34d399", icon: "➕",
    seoTitle: "Cannabis Accessories York — Grinders, Papers, Lighters & More",
    seoIntro: "Essential cannabis accessories at After Dark Cannabis, York. Grinders, rolling papers, lighters, trays, and more.",
    seoDescription: "Browse the After Dark Cannabis accessories category for grinders, rolling papers, lighters, trays, storage containers, and current menu details. Visit us at 1664 Jane St, York.",
    faqs: [
      { q: "What accessories do you sell?", a: "We carry grinders, rolling papers, filter tips, lighters, rolling trays, storage jars, and more." },
    ],
  },
  "MAGIC & OTHERS": {
    name: "Magic Stuff", slug: "magic", color: "#64748b", icon: "*",
    seoTitle: "Magic Stuff - Specialty Items",
    seoIntro: "Browse the specialty category for product names, formats, and listed details.",
    seoDescription: "The specialty category organizes its menu entries by product name, format, package, and item details.",
    faqs: [
      { q: "What specialty items are available?", a: "Selection varies by store and by day. Check the current menu for available specialty products." },
      { q: "Where can I review specialty items?", a: "Open the specialty category to review the product names, formats, packages, and details shown for this location." },
    ],
  },
  CIGARETTES: {
    banner: "/banners/native-cigarette-offer-20260822.webp",
    name: "Cigarettes", slug: "cigarettes", color: "#78716c", icon: "🏷️",
    seoTitle: "Cigarette Menu York | After Dark Cannabis",
    seoIntro: "Browse cigarette brands, pack styles, and listed menu prices at After Dark Cannabis on Jane Street in York.",
    seoDescription: "The cigarette menu at After Dark Cannabis shows the brands, styles, and prices listed for the York store at 1664 Jane St. The store lists open 24 hours.",
    faqs: [
      { q: "Does After Dark Cannabis list cigarettes?", a: "Yes. This category shows the cigarette products and menu prices currently listed for the York store." },
      { q: "What cigarette brands are listed?", a: "The selection may include Canadian, Canadian Goose, Canadian Classics, Nexus, Time, Putters and other Native cigarette brands in full, light and menthol styles." },
      { q: "Where is the store?", a: "After Dark Cannabis is at 1664 Jane St, York, ON M9N 2S1." },
    ],
  },
};

/* ── Helper functions ── */
export function getFlowersByTier(tier: string): FlowerProduct[] {
  return allFlowers.filter(
    (f) => f.tier.toUpperCase() === tier.toUpperCase()
  );
}

export function getFlowerBySlug(slug: string): FlowerProduct | undefined {
  return allFlowers.find((f) => f.slug === slug);
}

export function getItemsByCategory(category: string): ItemProduct[] {
  return allItems.filter(
    (i) => i.category.toUpperCase() === category.toUpperCase()
  );
}

export function getTierFromSlug(
  slug: string
): { key: string; config: (typeof TIER_CONFIG)[string] } | undefined {
  const entry = Object.entries(TIER_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getCategoryFromSlug(
  slug: string
): { key: string; config: (typeof CATEGORY_CONFIG)[string] } | undefined {
  const entry = Object.entries(CATEGORY_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getLowestPrice(flower: FlowerProduct): number | null {
  const prices = [flower.price3g, flower.price5g, flower.price14g, flower.price28g]
    .filter((p): p is PricePoint => p !== null)
    .map((p) => p.sale ?? p.regular);
  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(p: PricePoint | null): string {
  if (!p) return "—";
  if (p.sale !== null) return `$${p.sale}`;
  return `$${p.regular}`;
}
