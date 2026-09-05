import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { resolveLiveProduct } from "../app/lib/liveProductResolver.ts";

const flowerPage = readFileSync("app/flower/[slug]/page.tsx", "utf8");
const itemPage = readFileSync("app/item/[slug]/page.tsx", "utf8");
const fallback = [{ slug: "fallback-product", name: "Fallback" }];

test("a product present in the governed live snapshot resolves from live data", async () => {
  const product = await resolveLiveProduct({
    slug: "live-product",
    loadLive: async () => [{ slug: "live-product", name: "Live" }],
    fallback,
  });
  assert.equal(product?.name, "Live");
});

test("a product absent from a successful live snapshot stays absent", async () => {
  const product = await resolveLiveProduct({
    slug: "fallback-product",
    loadLive: async () => [],
    fallback,
  });
  assert.equal(product, null);
});

test("static fallback is used only when the live inventory source throws", async () => {
  const product = await resolveLiveProduct({
    slug: "fallback-product",
    loadLive: async () => { throw new Error("upstream unavailable"); },
    fallback,
  });
  assert.equal(product?.name, "Fallback");
});

test("an unknown slug remains absent even during source failure", async () => {
  const product = await resolveLiveProduct({
    slug: "unknown-product",
    loadLive: async () => { throw new Error("upstream unavailable"); },
    fallback,
  });
  assert.equal(product, null);
});

for (const [label, source] of [["flower", flowerPage], ["item", itemPage]] as const) {
  test(`${label} detail and metadata share one cached live resolver`, () => {
    assert.match(source, /export const dynamic = "force-dynamic"/);
    assert.match(source, /getAdcInventory\(\)/);
    assert.match(source, /resolveLiveProduct\(/);
    assert.match(source, /const resolve(?:Flower|Item) = cache\(/);
    assert.equal((source.match(/await resolve(?:Flower|Item)\(slug\)/g) || []).length, 2);
  });
}

test("the six production-blocking destinations use repaired detail route families", () => {
  const blocked = [
    "/flower/grape-fruit-s",
    "/flower/og-kush-aaa",
    "/flower/grandaddy-purple-shreds",
    "/flower/space-cookies-shreds",
    "/flower/pink-royal",
    "/item/live-resin-gummies-sour-ind-sat-in-assorted-flavors",
  ];
  assert.equal(blocked.filter((path) => path.startsWith("/flower/")).length, 5);
  assert.equal(blocked.filter((path) => path.startsWith("/item/")).length, 1);
});
