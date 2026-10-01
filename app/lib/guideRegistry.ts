import { allFlowers, allItems, TIER_CONFIG, type FlowerProduct, type ItemProduct } from "./products";

export type GuideLane = "strain" | "native_cig" | "nic_vape" | "thc_vape";
export type GuideEntry = {
  slug: string;
  lane: GuideLane;
  name: string;
  title: string;
  preferredCategoryPath: string;
  relatedSlugs: string[];
  productSlug: string;
  productName: string;
  menuNote: string;
};

export const GUIDE_STORE = {
  code: "MJ01",
  brand: "After Dark Cannabis",
  domain: "afterdarkcannabis.com",
  corridor: "Jane Street / York",
  localNote: "This guide stays local to the Jane Street, Lawrence West, Weston and Mount Dennis corridor.",
} as const;

const strainPriority = [
  "PINK KUSH", "PURPLE PUNCH", "PERMANENT MARKER", "PEANUT BUTTER ROCKSTAR",
  "SUPER LEMON HAZE", "PINEAPPLE HAZE", "MASTER KUSH", "GELATO", "SLURRICANE",
  "NORTHERN LIGHTS", "GRANDDADDY PURPLE", "ROYAL GORILLA", "RED CONGOLESE",
  "PINEAPPLE EXPRESS", "PURE MICHIGAN", "OG KUSH", "MKU", "SOUR DIESEL",
];

const normalized = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
const selectedFlowers: FlowerProduct[] = [];
for (const wanted of strainPriority) {
  const match = allFlowers.find((flower) => normalized(flower.name).includes(wanted) && !selectedFlowers.some((entry) => entry.slug === flower.slug));
  if (match) selectedFlowers.push(match);
}
for (const flower of allFlowers) {
  if (selectedFlowers.length >= 18) break;
  if (!selectedFlowers.some((entry) => entry.slug === flower.slug)) selectedFlowers.push(flower);
}

type ItemSeed = { slug: string; lane: Exclude<GuideLane, "strain">; name: string; pattern: RegExp; note: string };
const itemSeeds: ItemSeed[] = [
  { slug: "canadian-classics", lane: "native_cig", name: "Canadian Classics", pattern: /CANADIAN CLASSICS/i, note: "Canadian Classics listing" },
  { slug: "canadian-goose", lane: "native_cig", name: "Canadian Goose", pattern: /CANADIAN GOOSE/i, note: "Canadian Goose listing" },
  { slug: "putters", lane: "native_cig", name: "Putters", pattern: /^PUTTERS/i, note: "Putters listing" },
  { slug: "nexus-cigarettes", lane: "native_cig", name: "Nexus", pattern: /^NEXUS/i, note: "Nexus listing" },
  { slug: "time-cigarettes", lane: "native_cig", name: "Time", pattern: /^TIME\b/i, note: "Time listing" },
  { slug: "rolled-gold", lane: "native_cig", name: "Rolled Gold", pattern: /ROLLED GOLD/i, note: "Rolled Gold listing" },
  { slug: "canadian-cigarettes", lane: "native_cig", name: "Canadian", pattern: /^CANADIAN (FULL|LIGHTS|MENTHOL)$/i, note: "Canadian cigarette listing" },
  { slug: "backwoods", lane: "native_cig", name: "Backwoods", pattern: /BACKWOODS/i, note: "Backwoods listing" },
  { slug: "grabba", lane: "native_cig", name: "Grabba", pattern: /^GRABBA/i, note: "Grabba listing" },
  { slug: "ovns-vape", lane: "nic_vape", name: "OVNS", pattern: /^OVNS\b/i, note: "OVNS nicotine-vape listing" },
  { slug: "nexa-pix-vape", lane: "nic_vape", name: "Nexa Pix", pattern: /^NEXA PIX/i, note: "Nexa Pix nicotine-vape listing" },
  { slug: "geek-vape", lane: "nic_vape", name: "Geek", pattern: /^GEEK\b/i, note: "Geek nicotine-vape listing" },
  { slug: "vice-vape", lane: "nic_vape", name: "Vice", pattern: /^VICE\b/i, note: "Vice nicotine-vape listing" },
  { slug: "stlth-vape", lane: "nic_vape", name: "STLTH", pattern: /^STLTH\b/i, note: "STLTH nicotine-vape listing" },
  { slug: "uwell-caliburn-vape", lane: "nic_vape", name: "Uwell Caliburn", pattern: /UWELL CALIBURN/i, note: "Uwell Caliburn nicotine-vape listing" },
  { slug: "zpods-vape", lane: "nic_vape", name: "Zpods", pattern: /^ZPODS?/i, note: "Zpods nicotine-pod listing" },
  { slug: "gas-gang-thc-vape", lane: "thc_vape", name: "Gas Gang", pattern: /GAS GANG.*(DISPO|VAPE|2G|VOL)/i, note: "Gas Gang THC listing" },
  { slug: "goober-thc-vape", lane: "thc_vape", name: "Goober", pattern: /GOOBER VAPE PEN/i, note: "Goober THC pen listing" },
  { slug: "drizzle-thc-vape", lane: "thc_vape", name: "Drizzle", pattern: /DRIZZLE.*(SWITCH|VAPE|2G|DELTA D9)/i, note: "Drizzle cannabis listing; read the current format label" },
];

const categoryPathForItem = (item: ItemProduct) => ({
  "CIGARETTES": "/items/cigarettes",
  "VAPE PENS": "/items/vapes",
  "VAPE DISPOSABLE": "/items/vape-disposables",
  "CONCENTRATES": "/items/concentrates",
  "PREROLLS": "/items/prerolls",
}[item.category.toUpperCase()] || "/");

const strainGuides: Omit<GuideEntry, "title" | "relatedSlugs">[] = selectedFlowers.map((flower) => ({
  slug: flower.slug,
  lane: "strain",
  name: flower.name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()),
  preferredCategoryPath: "/" + (TIER_CONFIG[flower.tier]?.slug || TIER_CONFIG[flower.tier.toUpperCase()]?.slug || "flower"),
  productSlug: flower.slug,
  productName: flower.name,
  menuNote: "current flower-menu listing",
}));

const itemGuides: Omit<GuideEntry, "title" | "relatedSlugs">[] = itemSeeds.flatMap((seed) => {
  const item = allItems.find((candidate) => seed.pattern.test(candidate.name));
  if (!item) return [];
  return [{
    slug: seed.slug,
    lane: seed.lane,
    name: seed.name,
    preferredCategoryPath: categoryPathForItem(item),
    productSlug: item.slug,
    productName: item.name,
    menuNote: seed.note,
  }];
});

const laneLabel = (lane: GuideLane) => ({ strain: "", native_cig: " Native Cigarettes", nic_vape: " Nicotine Vape", thc_vape: " THC Vape" })[lane];
const seeds = [...strainGuides, ...itemGuides];
export const GUIDE_REGISTRY: GuideEntry[] = seeds.map((seed) => ({
  ...seed,
  title: seed.name + laneLabel(seed.lane) + " at " + GUIDE_STORE.brand + " | " + GUIDE_STORE.corridor,
  relatedSlugs: seeds.filter((candidate) => candidate.lane === seed.lane && candidate.slug !== seed.slug).slice(0, seed.lane === "strain" ? 4 : 3).map((candidate) => candidate.slug),
}));

export const getGuide = (slug: string) => GUIDE_REGISTRY.find((guide) => guide.slug === slug);
export function resolveGuideProduct(guide: GuideEntry): FlowerProduct | ItemProduct | undefined {
  return guide.lane === "strain" ? allFlowers.find((product) => product.slug === guide.productSlug) : allItems.find((product) => product.slug === guide.productSlug);
}
export const getTierGuideLinks = (categoryPath: string, limit = 6) => GUIDE_REGISTRY.filter((guide) => guide.lane === "strain" && guide.preferredCategoryPath === categoryPath).slice(0, limit);
export function getCategoryGuideGroups(categoryPath: string) {
  if (categoryPath === "/items/cigarettes") return [{ label: "Native Cigarettes brand guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "native_cig").slice(0, 9) }];
  if (categoryPath === "/items/vapes") return [
    { label: "Nicotine Vape brand guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "nic_vape").slice(0, 6) },
    { label: "Separate THC Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "thc_vape").slice(0, 3) },
  ];
  if (categoryPath === "/items/vape-disposables") return [{ label: "THC Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "thc_vape").slice(0, 3) }];
  return [];
}
