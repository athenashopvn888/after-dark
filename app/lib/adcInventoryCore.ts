import { createHash } from "node:crypto";
import type { FlowerProduct, ItemProduct } from "./products.ts";

export const ADC_STORE_CODE = "MJ01";
export const ADC_REFRESH_SECONDS = 300;
export const ADC_FRESHNESS_MAX_HOURS = 36;
export const ADC_TIERS = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"] as const;
export const ADC_CATEGORIES = [
  "EDIBLES",
  "VAPE PENS",
  "VAPE DISPOSABLE",
  "CONCENTRATES",
  "PREROLLS",
  "ADD ONS",
  "MAGIC & OTHERS",
  "CIGARETTES",
] as const;

type QuantityMap = Record<string, number>;

export interface AdcRawInventory {
  storeCode: string;
  date: string;
  skuCount: number;
  stock: Record<string, QuantityMap>;
}

export interface AdcCatalog {
  flowers: FlowerProduct[];
  items: ItemProduct[];
}

export interface AdcInventoryManifest {
  accepted: true;
  sourceStockSkuCount: number;
  flowerSourceRowCount: number;
  flowerDisplayRowCount: number;
  flowerSkuCount: number;
  itemDisplayRowCount: number;
  itemStockSkuCount: number;
  excludedPositiveStockSkus: string[];
  flowerIdentities: string[];
  itemIdentities: string[];
  byTier: Record<string, number>;
  byCategory: Record<string, number>;
}

export interface AdcInventorySnapshot {
  schemaVersion: 1;
  storeCode: "MJ01";
  sourceTimestamp: string;
  capturedAt: string;
  version: string;
  flowers: FlowerProduct[];
  items: ItemProduct[];
  manifest: AdcInventoryManifest;
}

export class AdcInventoryError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "AdcInventoryError";
    this.code = code;
  }
}

function skuParts(value: unknown) {
  return String(value || "").split(",").map((sku) => sku.trim()).filter(Boolean);
}

function positiveQuantities(inventory: AdcRawInventory, sku: string) {
  return inventory.stock[sku] || {};
}

function hasPositiveStock(inventory: AdcRawInventory, sku: string) {
  return Object.values(positiveQuantities(inventory, sku)).some((quantity) => quantity > 0);
}

function flowerIdentity(product: Pick<FlowerProduct, "sku" | "tier" | "name">) {
  return `${String(product.sku).trim()}\u0000${String(product.tier).trim().toUpperCase()}\u0000${String(product.name).trim().toUpperCase()}`;
}

function itemIdentity(product: Pick<ItemProduct, "sku" | "category" | "name">) {
  return `${skuParts(product.sku).join(",")}\u0000${String(product.category).trim().toUpperCase()}\u0000${String(product.name).trim().toUpperCase()}`;
}

function cleanFlowerName(name: string) {
  return name
    .replace(/\s*\(?\s*AAA\+?\s*ON\s*SALE\s*\)?\s*$/i, "")
    .replace(/\s*\(?\s*AAA\+?\s*SALE!?\s*\)?\s*$/i, "")
    .replace(/\s*\bSALE!?\s*$/i, "")
    .replace(/\s*\bON\s*SALE\s*$/i, "")
    .trim();
}

function hasSalePrice(product: FlowerProduct) {
  return [product.price3g, product.price5g, product.price14g, product.price28g]
    .some((point) => point?.sale !== null && Number.isFinite(Number(point?.sale)));
}

function countBy<T>(products: T[], selector: (product: T) => string) {
  return products.reduce<Record<string, number>>((counts, product) => {
    const key = selector(product);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function stableVersion(snapshot: Pick<AdcInventorySnapshot, "sourceTimestamp" | "flowers" | "items">) {
  const rows = {
    sourceTimestamp: snapshot.sourceTimestamp,
    flowers: snapshot.flowers.map((flower) => [flower.sku, flower.tier, flower.name, flower.price3g, flower.price5g, flower.price14g, flower.price28g, flower.isSale]),
    items: snapshot.items.map((item) => [item.sku, item.category, item.name, item.price]),
  };
  return `adc-${createHash("sha256").update(JSON.stringify(rows)).digest("hex").slice(0, 16)}`;
}

function validateInventory(inventory: AdcRawInventory, now: Date) {
  if (inventory.storeCode !== ADC_STORE_CODE) throw new AdcInventoryError("STORE_MISMATCH", "ADC inventory store code is not MJ01.");
  const sourceMs = Date.parse(inventory.date);
  if (!Number.isFinite(sourceMs)) throw new AdcInventoryError("INVALID_TIMESTAMP", "ADC inventory timestamp is invalid.");
  const ageHours = (now.getTime() - sourceMs) / 3_600_000;
  if (ageHours < -1 || ageHours > ADC_FRESHNESS_MAX_HOURS) throw new AdcInventoryError("STALE_INVENTORY", "ADC inventory email is stale.");
  if (!inventory.stock || typeof inventory.stock !== "object" || Array.isArray(inventory.stock)) throw new AdcInventoryError("MALFORMED_STOCK", "ADC stock map is missing.");
  const skus = Object.keys(inventory.stock);
  if (!Number.isInteger(inventory.skuCount) || inventory.skuCount !== skus.length || skus.length === 0) throw new AdcInventoryError("PARTIAL_STOCK", "ADC stock payload is incomplete.");
  for (const [sku, quantities] of Object.entries(inventory.stock)) {
    if (!/^\d+$/.test(sku) || !quantities || typeof quantities !== "object" || Array.isArray(quantities) || Object.keys(quantities).length === 0) throw new AdcInventoryError("MALFORMED_QUANTITY", `ADC quantity map is invalid for SKU ${sku}.`);
    for (const quantity of Object.values(quantities)) {
      if (!Number.isFinite(quantity) || quantity < 0) throw new AdcInventoryError("MALFORMED_QUANTITY", `ADC quantity is invalid for SKU ${sku}.`);
    }
  }
}

export function buildAdcInventorySnapshot(args: {
  inventory: AdcRawInventory;
  catalog: AdcCatalog;
  flowerOverrides?: FlowerProduct[];
  previous?: AdcInventorySnapshot | null;
  now?: Date;
}): AdcInventorySnapshot {
  const now = args.now || new Date();
  validateInventory(args.inventory, now);
  if (!Array.isArray(args.catalog.flowers) || args.catalog.flowers.length < 200 || !Array.isArray(args.catalog.items) || args.catalog.items.length < 100) {
    throw new AdcInventoryError("PARTIAL_CATALOG", "ADC catalog payload is incomplete.");
  }

  const tiers = new Set<string>(ADC_TIERS);
  const categories = new Set<string>(ADC_CATEGORIES);
  const flowerRows: FlowerProduct[] = [];
  const seenFlowers = new Set<string>();
  for (const source of args.catalog.flowers) {
    const sku = String(source.sku || "").trim();
    if (!hasPositiveStock(args.inventory, sku)) continue;
    const tier = String(source.tier || "").trim().toUpperCase();
    const name = cleanFlowerName(String(source.name || ""));
    const quantities = positiveQuantities(args.inventory, sku);
    const flower: FlowerProduct = {
      ...source,
      sku,
      name,
      tier,
      isSale: Boolean(source.isSale || /\b(?:ON\s+)?SALE\b/i.test(source.name) || hasSalePrice(source)),
      price3g: Number(quantities["3g"] || 0) > 0 ? source.price3g : null,
      price5g: Number(quantities["5g"] || 0) > 0 ? source.price5g : null,
      price14g: Number(quantities["14g"] || 0) > 0 ? source.price14g : null,
      price28g: Number(quantities["28g"] || 0) > 0 ? source.price28g : null,
    };
    const identity = flowerIdentity(flower);
    if (!sku || !/^\d+$/.test(sku) || !name || !tiers.has(tier) || seenFlowers.has(identity)) throw new AdcInventoryError("INVALID_FLOWER", "ADC flower catalog contains an invalid or duplicate display row.");
    if (!flower.price3g && !flower.price5g && !flower.price14g && !flower.price28g) continue;
    seenFlowers.add(identity);
    flowerRows.push(flower);
  }

  const activeFlowerSkus = new Set(flowerRows.map((flower) => flower.sku));
  for (const override of args.flowerOverrides || []) {
    const sku = String(override.sku || "").trim();
    if (!activeFlowerSkus.has(sku)) continue;
    const quantities = positiveQuantities(args.inventory, sku);
    const row = {
      ...override,
      price3g: Number(quantities["3g"] || 0) > 0 ? override.price3g : null,
      price5g: Number(quantities["5g"] || 0) > 0 ? override.price5g : null,
      price14g: Number(quantities["14g"] || 0) > 0 ? override.price14g : null,
      price28g: Number(quantities["28g"] || 0) > 0 ? override.price28g : null,
    };
    const identity = flowerIdentity(row);
    if (!seenFlowers.has(identity) && (row.price3g || row.price5g || row.price14g || row.price28g)) {
      if (!tiers.has(String(row.tier).toUpperCase()) || !String(row.name).trim()) throw new AdcInventoryError("INVALID_OVERRIDE", "ADC approved flower override is invalid.");
      seenFlowers.add(identity);
      flowerRows.push(row);
    }
  }

  const itemRows: ItemProduct[] = [];
  const seenItems = new Set<string>();
  const itemStockSkus = new Set<string>();
  for (const source of args.catalog.items) {
    const parts = skuParts(source.sku);
    if (!parts.some((sku) => hasPositiveStock(args.inventory, sku))) continue;
    const name = String(source.name || "").trim();
    const category = String(source.category || "").trim().toUpperCase();
    const item: ItemProduct = { ...source, sku: parts.join(", "), name, category, price: typeof source.price === "string" && !source.price.includes("[object") ? source.price : "" };
    const identity = itemIdentity(item);
    if (!name || parts.length === 0 || parts.some((sku) => !/^\d+$/.test(sku)) || !categories.has(category) || seenItems.has(identity)) throw new AdcInventoryError("INVALID_ITEM", "ADC item catalog contains an invalid or duplicate display row.");
    seenItems.add(identity);
    parts.filter((sku) => hasPositiveStock(args.inventory, sku)).forEach((sku) => itemStockSkus.add(sku));
    itemRows.push(item);
  }

  if (flowerRows.length === 0 || itemRows.length === 0) throw new AdcInventoryError("EMPTY_MENU", "ADC live menu contains an empty collection.");
  if (args.previous && (flowerRows.length < Math.ceil(args.previous.manifest.flowerSourceRowCount * 0.6) || itemRows.length < Math.ceil(args.previous.items.length * 0.6))) throw new AdcInventoryError("PARTIAL_MENU", "ADC live menu coverage dropped below the safe threshold.");

  const catalogSkus = new Set([
    ...args.catalog.flowers.map((flower) => String(flower.sku).trim()),
    ...args.catalog.items.flatMap((item) => skuParts(item.sku)),
  ]);
  const excludedPositiveStockSkus = Object.keys(args.inventory.stock)
    .filter((sku) => hasPositiveStock(args.inventory, sku) && !catalogSkus.has(sku))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const flowerIdentities = flowerRows.map(flowerIdentity);
  const itemIdentities = itemRows.map(itemIdentity);
  const capturedAt = now.toISOString();
  const snapshot: AdcInventorySnapshot = {
    schemaVersion: 1,
    storeCode: "MJ01",
    sourceTimestamp: args.inventory.date,
    capturedAt,
    version: "",
    flowers: flowerRows,
    items: itemRows,
    manifest: {
      accepted: true,
      sourceStockSkuCount: args.inventory.skuCount,
      flowerSourceRowCount: new Set(flowerRows.map((flower) => flower.sku)).size,
      flowerDisplayRowCount: flowerRows.length,
      flowerSkuCount: new Set(flowerRows.map((flower) => flower.sku)).size,
      itemDisplayRowCount: itemRows.length,
      itemStockSkuCount: itemStockSkus.size,
      excludedPositiveStockSkus,
      flowerIdentities,
      itemIdentities,
      byTier: countBy(flowerRows, (flower) => flower.tier),
      byCategory: countBy(itemRows, (item) => item.category),
    },
  };
  snapshot.version = stableVersion(snapshot);
  return snapshot;
}

export function validateStoredAdcSnapshot(value: unknown): AdcInventorySnapshot {
  if (!value || typeof value !== "object") throw new AdcInventoryError("INVALID_LKG", "ADC last-known-good snapshot is invalid.");
  const snapshot = value as Partial<AdcInventorySnapshot>;
  if (snapshot.schemaVersion !== 1 || snapshot.storeCode !== "MJ01" || !snapshot.sourceTimestamp || !snapshot.version || !Array.isArray(snapshot.flowers) || !snapshot.flowers.length || !Array.isArray(snapshot.items) || !snapshot.items.length || snapshot.manifest?.accepted !== true) throw new AdcInventoryError("INVALID_LKG", "ADC last-known-good snapshot is invalid.");
  return snapshot as AdcInventorySnapshot;
}

export const adcFlowerIdentity = flowerIdentity;
export const adcItemIdentity = itemIdentity;

export async function resolveAdcInventory(args: {
  lastGood: AdcInventorySnapshot | null;
  loadFresh: () => Promise<AdcInventorySnapshot>;
  persist: (snapshot: AdcInventorySnapshot) => Promise<void>;
}): Promise<{ snapshot: AdcInventorySnapshot; servedFrom: "fresh" | "last-good"; fallbackReason: string | null }> {
  try {
    const snapshot = await args.loadFresh();
    try {
      await args.persist(snapshot);
    } catch {
      // Persistence protects the next failure; it must never suppress valid source data now.
    }
    return { snapshot, servedFrom: "fresh", fallbackReason: null };
  } catch (error) {
    if (!args.lastGood) throw error;
    return {
      snapshot: args.lastGood,
      servedFrom: "last-good",
      fallbackReason: error instanceof AdcInventoryError ? error.code : "SOURCE_UNAVAILABLE",
    };
  }
}
