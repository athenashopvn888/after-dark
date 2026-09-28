import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const flowerPage = readFileSync("app/flower/[slug]/page.tsx", "utf8");
const sitemap = readFileSync("app/sitemap.ts", "utf8");

test("flower detail metadata owns its canonical and absolute title", () => {
  assert.match(flowerPage, /const canonical = `https:\/\/afterdarkcannabis\.com\/flower\/\$\{flower\.slug\}`/);
  assert.match(flowerPage, /title:\s*\{\s*absolute:/);
  assert.match(flowerPage, /alternates: \{ canonical \}/);
  assert.match(flowerPage, /url: canonical/);
});

test("flower Product JSON-LD exposes the in-stock product category", () => {
  assert.match(flowerPage, /"@type": "Product"/);
  assert.match(flowerPage, /category: TIER_CONFIG\[flower\.tier\]\?\.name \|\| flower\.tier/);
  assert.doesNotMatch(flowerPage, /aggregateRating|reviewCount|testimonial/i);
});

test("flower sitemap reads the live inventory without editing its source", () => {
  assert.match(sitemap, /getAdcInventory/);
  assert.match(sitemap, /const inStockFlowers = \(await getAdcInventory\(\)\)\.snapshot\.flowers/);
  assert.match(sitemap, /inStockFlowers\.map/);
  assert.doesNotMatch(sitemap, /allFlowers\.map/);
  assert.match(sitemap, /export const dynamic = "force-dynamic"/);
});
