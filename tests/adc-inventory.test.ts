import test from "node:test";
import assert from "node:assert/strict";
import {
  AdcInventoryError,
  adcFlowerIdentity,
  adcItemIdentity,
  buildAdcInventorySnapshot,
  resolveAdcInventory,
  type AdcCatalog,
  type AdcRawInventory,
} from "../app/lib/adcInventoryCore.ts";
import type { FlowerProduct, ItemProduct } from "../app/lib/products.ts";

function flower(sku: string, name = `FLOWER ${sku}`, tier = "AA"): FlowerProduct {
  return {
    sku, name, slug: name.toLowerCase().replaceAll(" ", "-"), tier,
    type: "indica", isHot: false, isSale: false, thc: "25%",
    price3g: { regular: 10, sale: null }, price5g: null,
    price14g: null, price28g: { regular: 50, sale: null }, image: "",
  };
}

function item(sku: string, name = `ITEM ${sku}`, category = "EDIBLES"): ItemProduct {
  return { sku, name, slug: name.toLowerCase().replaceAll(" ", "-"), category, type: "", thc: "", mg: "", price: "$10", image: "", promoImage: null };
}

function fixture(now = new Date("2026-08-09T04:00:00.000Z")) {
  const catalog: AdcCatalog = {
    flowers: [flower("101"), ...Array.from({ length: 199 }, (_, index) => flower(String(2000 + index)))],
    items: [item("801, 802", "GROUPED ITEM"), ...Array.from({ length: 99 }, (_, index) => item(String(3000 + index)))],
  };
  const inventory: AdcRawInventory = {
    storeCode: "MJ01",
    date: "2026-08-09T03:14:22.000Z",
    skuCount: 4,
    stock: {
      "101": { "3g": 2, "28g": 0 },
      "801": { each: 0 },
      "802": { each: 3 },
      "999": { each: 2 },
    },
  };
  return { now, catalog, inventory };
}

test("builds one stock-qualified transactional ADC snapshot", () => {
  const args = fixture();
  const snapshot = buildAdcInventorySnapshot({ ...args, flowerOverrides: [flower("396", "KHALIFA KUSH"), flower("101", "DISPLAY VARIANT", "BUDGET")] });
  assert.equal(snapshot.storeCode, "MJ01");
  assert.equal(snapshot.sourceTimestamp, args.inventory.date);
  assert.match(snapshot.version, /^adc-[a-f0-9]{16}$/);
  assert.equal(snapshot.flowers.some((row) => row.sku === "396"), false, "an inactive override must not resurrect SKU 396");
  assert.equal(snapshot.flowers.length, 2, "an active approved tier/name variant may be added");
  assert.equal(snapshot.flowers[0].price28g, null, "unavailable weights are hidden");
  assert.equal(snapshot.items.length, 1);
  assert.equal(snapshot.items[0].sku, "801, 802");
  assert.deepEqual(snapshot.manifest.excludedPositiveStockSkus, ["999"]);
  assert.equal(new Set(snapshot.flowers.map(adcFlowerIdentity)).size, snapshot.flowers.length);
  assert.equal(new Set(snapshot.items.map(adcItemIdentity)).size, snapshot.items.length);
});

test("rejects malformed, stale, partial, duplicate, and wrong-category source input", () => {
  const base = fixture();
  const cases: Array<[string, () => void]> = [
    ["PARTIAL_STOCK", () => buildAdcInventorySnapshot({ ...base, inventory: { ...base.inventory, skuCount: 3 } })],
    ["STALE_INVENTORY", () => buildAdcInventorySnapshot({ ...base, now: new Date("2026-08-11T00:00:00Z") })],
    ["MALFORMED_QUANTITY", () => buildAdcInventorySnapshot({ ...base, inventory: { ...base.inventory, stock: { ...base.inventory.stock, "101": { "3g": -1 } } } })],
    ["PARTIAL_CATALOG", () => buildAdcInventorySnapshot({ ...base, catalog: { ...base.catalog, items: base.catalog.items.slice(0, 3) } })],
    ["INVALID_ITEM", () => buildAdcInventorySnapshot({ ...base, catalog: { ...base.catalog, items: [item("801, 802", "GROUPED ITEM"), item("801, 802", "GROUPED ITEM"), ...base.catalog.items.slice(1)] } })],
    ["INVALID_ITEM", () => buildAdcInventorySnapshot({ ...base, catalog: { ...base.catalog, items: [item("801, 802", "GROUPED ITEM", "UNKNOWN"), ...base.catalog.items.slice(1)] } })],
  ];
  for (const [code, run] of cases) assert.throws(run, (error) => error instanceof AdcInventoryError && error.code === code);
});

test("fresh source wins even when persistence fails; LKG is source-failure only", async () => {
  const input = fixture();
  const fresh = buildAdcInventorySnapshot(input);
  const persistenceFailure = await resolveAdcInventory({ lastGood: null, loadFresh: async () => fresh, persist: async () => { throw new Error("blob down"); } });
  assert.equal(persistenceFailure.servedFrom, "fresh");
  assert.equal(persistenceFailure.snapshot.version, fresh.version);

  const fallback = await resolveAdcInventory({ lastGood: fresh, loadFresh: async () => { throw new AdcInventoryError("PARTIAL_MENU", "partial"); }, persist: async () => undefined });
  assert.equal(fallback.servedFrom, "last-good");
  assert.equal(fallback.fallbackReason, "PARTIAL_MENU");

  await assert.rejects(() => resolveAdcInventory({ lastGood: null, loadFresh: async () => { throw new Error("source down"); }, persist: async () => undefined }), /source down/);
});

test("live MJ01 stock plus catalog exactly reproduces the combined menu feed", { skip: !process.env.APPS_SCRIPT_URL }, async () => {
  const endpoint = process.env.APPS_SCRIPT_URL!;
  const separator = endpoint.includes("?") ? "&" : "?";
  const base = `${endpoint}${separator}store=MJ01`;
  const inventory = await fetch(`${base}&stock=1`, { signal: AbortSignal.timeout(30_000) }).then((response) => response.json()) as AdcRawInventory;
  const catalog = await fetch(`${base}&catalog=1`, { signal: AbortSignal.timeout(30_000) }).then((response) => response.json()) as AdcCatalog;
  const combined = await fetch(base, { signal: AbortSignal.timeout(30_000) }).then((response) => response.json()) as { stockDate: string; flowers: FlowerProduct[]; items: ItemProduct[] };
  const snapshot = buildAdcInventorySnapshot({ inventory, catalog });
  assert.equal(snapshot.sourceTimestamp, combined.stockDate);
  assert.deepEqual(snapshot.flowers.map(adcFlowerIdentity).sort(), combined.flowers.map((row) => adcFlowerIdentity({ ...row, name: row.name.replace(/\s*\b(?:ON\s+)?SALE!?\s*$/i, "").trim() })).sort());
  assert.deepEqual(snapshot.items.map(adcItemIdentity).sort(), combined.items.map(adcItemIdentity).sort());
  const combinedFlowers = new Map(combined.flowers.map((row) => [String(row.sku), row]));
  for (const row of snapshot.flowers) {
    const source = combinedFlowers.get(row.sku);
    assert.ok(source, `combined flower feed is missing SKU ${row.sku}`);
    assert.equal(row.slug, source.slug);
    assert.equal(row.type, source.type);
    assert.equal(row.thc, source.thc);
    assert.equal(row.isSale, Boolean(source.isSale || /\b(?:ON\s+)?SALE\b/i.test(source.name) || [source.price3g, source.price5g, source.price14g, source.price28g].some((point) => point?.sale !== null && Number.isFinite(Number(point?.sale)))));
    assert.deepEqual([row.price3g, row.price5g, row.price14g, row.price28g], [source.price3g, source.price5g, source.price14g, source.price28g]);
  }
  const combinedItems = new Map(combined.items.map((row) => [adcItemIdentity(row), row]));
  for (const row of snapshot.items) {
    const source = combinedItems.get(adcItemIdentity(row));
    assert.ok(source, `combined item feed is missing ${row.name}`);
    assert.deepEqual(
      { slug: row.slug, type: row.type, thc: row.thc, mg: row.mg, price: row.price, image: row.image, promoImage: row.promoImage },
      { slug: source.slug, type: source.type, thc: source.thc, mg: source.mg, price: source.price, image: source.image, promoImage: source.promoImage },
    );
  }
  assert.equal(Object.values(snapshot.manifest.byTier).reduce((sum, count) => sum + count, 0), snapshot.flowers.length);
  assert.equal(Object.values(snapshot.manifest.byCategory).reduce((sum, count) => sum + count, 0), snapshot.items.length);
  assert.equal(snapshot.flowers.some((row) => row.sku === "392" || row.sku === "396"), false);
});
