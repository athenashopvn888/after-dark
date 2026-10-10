import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");
const page = read("app/vape-shop-york/page.tsx");
const panel = read("app/components/VapeActionPanel.tsx");
const category = read("app/items/[category]/page.tsx");

test("MJ01 dedicated page uses the live VAPE PENS feed and safe schema", () => {
  assert.match(page, /getAdcInventory/);
  assert.match(page, /VAPE PENS/);
  assert.match(page, /"@type": "ItemList"/);
  assert.match(page, /"@type": "Product"/);
  assert.match(page, /"@type": "Offer"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.doesNotMatch(page, /AggregateRating|Review/);
});

test("MJ01 call, directions and manual text hold are wired on both vape categories", () => {
  assert.match(panel, /tel:\+14375249344|STORE\.phoneTel/);
  assert.match(panel, /sms:/);
  assert.match(panel, /A hold is confirmed only when staff reply/);
  assert.match(category, /catSlug === "vapes" \|\| catSlug === "vape-disposables"/);
});

test("MJ01 rules copy keeps nicotine and THC separate", () => {
  assert.match(page, /Nicotine is addictive/);
  assert.match(page, /government photo ID/);
  assert.match(page, /\/items\/vape-disposables/);
  assert.doesNotMatch(page, /safer|quit smoking|best vape shop|cheapest/i);
});
