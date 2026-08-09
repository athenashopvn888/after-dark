import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("ADC live snapshot is the only menu-listing source", async () => {
  const route = await readFile("app/api/tv-data/route.ts", "utf8");
  const tier = await readFile("app/[tier]/page.tsx", "utf8");
  const category = await readFile("app/items/[category]/page.tsx", "utf8");
  const home = await readFile("app/page.tsx", "utf8");
  const packageJson = JSON.parse(await readFile("package.json", "utf8")) as { scripts: Record<string, string> };
  assert.match(route, /getAdcInventory/);
  assert.match(route, /runtime = "nodejs"/);
  assert.match(route, /x-tv-data-version/);
  assert.doesNotMatch(route, /static-fallback|fetchLiveProducts/);
  assert.match(tier, /getAdcInventory/);
  assert.doesNotMatch(tier, /getFlowersByTier/);
  assert.match(category, /getAdcInventory/);
  assert.doesNotMatch(category, /getItemsByCategory/);
  assert.match(home, /\/api\/tv-data\?type=flowers/);
  assert.equal(Object.hasOwn(packageJson.scripts, "prebuild"), false, "deploys must not rewrite the stable detail-route catalog from current stock");
});

test("ADC inventory change leaves Apps Script, TV timers, and cigarette promo logic untouched", async () => {
  const tv = await readFile("app/tv/page.tsx", "utf8");
  const tv2 = await readFile("app/tv2/page.tsx", "utf8");
  assert.match(tv, /setInterval\(loadData,\s*5\s*\*\s*60\s*\*\s*1000\)/);
  assert.match(tv2, /setInterval\(loadData,\s*5\s*\*\s*60\s*\*\s*1000\)/);
  assert.match(tv2, /isCigaretteOfferVisible/);
  assert.match(tv2, /timedPromoOverlay/);
});
