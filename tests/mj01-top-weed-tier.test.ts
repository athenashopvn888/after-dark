import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  BOGO_BUY_2_GET_1,
  BOGO_BUY_3_GET_3,
  formatAsLowAsAfterPromos,
  formatBoardDealLine,
  formatPayEquals,
  formatPerGram,
  formatSitewideBogoStrip,
} from "../app/lib/flowerDeals.ts";

const read = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

test("Dual-Frame deal math matches the MJ01 board totals and floors", () => {
  assert.equal(formatPayEquals(20, 3), "Pay $20 = 3g");
  assert.equal(formatPayEquals(30, 6), "Pay $30 = 6g");
  assert.equal(formatPayEquals(30, 3), "Pay $30 = 3g");
  assert.equal(formatPayEquals(45, 6), "Pay $45 = 6g");
  assert.equal(formatPayEquals(40, 3), "Pay $40 = 3g");
  assert.equal(formatPayEquals(60, 6), "Pay $60 = 6g");
  assert.equal(formatAsLowAsAfterPromos(30, 6), "As low as $5/g after promos");
  assert.equal(formatAsLowAsAfterPromos(45, 6), "As low as $7.50/g after promos");
  assert.equal(formatAsLowAsAfterPromos(60, 6), "As low as $10/g after promos");
  assert.equal(formatPerGram(20, 3), "~$6.67/g");
  assert.equal(
    formatBoardDealLine({ label: BOGO_BUY_2_GET_1, total: "3G", price: 20, grams: 3, equals: "2g=3g" }),
    "Buy 2g Get 1g FREE · Pay $20 = 3g",
  );
  assert.equal(BOGO_BUY_3_GET_3, "Buy 3g Get 3g FREE");
});

test("TIER_CONFIG has BOGO on Exotic, Premium, AAA+ and none on AA", () => {
  const products = read("app/lib/products.ts");
  assert.match(products, /price: 40, grams: 3, equals: "2g=3g"/);
  assert.match(products, /price: 60, grams: 6, equals: "3g=6g"/);
  assert.match(products, /price: 30, grams: 3, equals: "2g=3g"/);
  assert.match(products, /price: 45, grams: 6, equals: "3g=6g"/);
  assert.match(products, /price: 20, grams: 3, equals: "2g=3g"/);
  assert.match(products, /price: 30, grams: 6, equals: "3g=6g"/);
  const aaBlock = products.match(/AA: \{[\s\S]*?\n  \},/u)?.[0] ?? "";
  assert.match(aaBlock, /deal3g: null/);
  assert.match(aaBlock, /deal6g: null/);
  assert.doesNotMatch(products, /3g bundle|6g bundle|bundle pricing/);
});

test("sitewide strip and homepage announcement order match the approved stack", () => {
  assert.equal(
    formatSitewideBogoStrip(),
    "TOP WEED TIER SPECIAL · Buy 2g Get 1g FREE  Buy 3g Get 3g FREE *",
  );
  const banner = read("app/components/FleetAnnouncementBanner.tsx");
  const thanksAt = banner.indexOf("data-thanksgiving-hours-notice");
  const stripAt = banner.indexOf("<FlowerBogoStrip hero");
  const weedAt = banner.indexOf("data-exotic-tier-banner");
  const cigAt = banner.indexOf("data-cigarette-deal");
  const bbAt = banner.indexOf("data-bb-light-deal");
  const mixAt = banner.indexOf("data-cig-mix-banner");
  const bbImgAt = banner.indexOf("data-bb-premium-banner");
  assert.ok(thanksAt > -1 && stripAt > thanksAt && weedAt > stripAt && cigAt > weedAt && bbAt > cigAt && mixAt > bbAt && bbImgAt > mixAt);
  assert.match(banner, /top-weed-tier-mj01\.webp/);
  assert.match(banner, /2pack5cig\.webp/);
  assert.match(banner, /bb-premium-grade-full-lights\.webp/);
  for (const file of [
    "public/banners/top-weed-tier-mj01.webp",
    "public/banners/2pack5cig.webp",
    "public/banners/BB_Belmont_Premium_Grade.webp",
  ]) {
    assert.ok(fs.statSync(file).size > 1000, file);
  }
});

test("mobile strip wraps inside one red bar and protected surfaces remain unchanged", () => {
  const css = read("app/globals.css");
  assert.match(css, /\[data-flower-bogo-strip\][\s\S]*background: #c5161d/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\[data-bogo-strip-copy\][\s\S]*flex-direction: column/);
  assert.match(css, /\[data-flower-bogo-strip="hero"\][\s\S]*letter-spacing: 0\.018em/);
  assert.match(css, /\[data-flower-bogo-strip="nav"\][\s\S]*letter-spacing: 0\.015em/);
  assert.match(read("app/components/Navbar.tsx"), /pathname !== "\/" \? <FlowerBogoStrip \/>/);
  assert.doesNotMatch(read("app/tv/page.tsx"), /FlowerBogoStrip|top-weed-tier-mj01/);
  assert.match(read("app/delivery/DeliveryContent.tsx"), /× 28g DEAL/);
});

test("web flower surfaces use paid totals and promo floors", () => {
  const joined = [
    read("app/components/FlowerCard.tsx"),
    read("app/[tier]/page.tsx"),
    read("app/flower/[slug]/page.tsx"),
    read("app/faq/page.tsx"),
  ].join("\n");
  assert.doesNotMatch(joined, /3g bundle|6g bundle|bundle pricing/);
  assert.match(joined, /formatPayEquals|Pay <strong>/);
  assert.match(joined, /formatAsLowAsAfterPromos/);
  assert.match(joined, /AA does not include these deals/);
});
