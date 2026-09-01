import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("MJ01 keeps the protected owner and exact metadata", () => {
  const page = read("app/weed-dispensary-york/page.tsx");
  const location = read("app/lib/gbp-location.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(location, /Weed Dispensary in York \| After Dark Cannabis/);
  assert.match(location, /After Dark Cannabis is open 24 hours at 1664 Jane Street/);
  assert.match(sitemap, /weed-dispensary-york\//);
  assert.match(page, /title: \{ absolute: gbpLocation\.seoTitle \}/);
  assert.match(page, /canonical:.*gbpLocation\.slug/s);
});

test("MJ01 static discovery uses only approved destinations", () => {
  const sources = [read("app/lib/weedDiscovery.ts"), read("app/components/WeedDiscoveryModule.tsx")].join("\n");
  for (const href of ["/budget", "/aa", "/aaa", "/premium", "/exotic", "/items/prerolls", "/items/edibles", "/items/vapes", "/items/concentrates", "/items/add-ons", "/weed-dispensary-york/", "/resources/cannabis-101", "/resources/flower-guides", "/resources/local-guides/jane-street-york-visit-guide"]) {
    assert.ok(sources.includes(href), `Missing approved link: ${href}`);
  }
});

test("MJ01 exact FMD identity is consistent", () => {
  const sources = [read("app/lib/weedDiscovery.ts"), read("app/lib/gbp-location.ts"), read("app/components/GBPLandingPage.tsx")].join("\n");
  assert.match(sources, /1664 Jane Street/);
  assert.match(sources, /\+14375249344/);
  assert.match(sources, /\+1 \(437\) 524-9344/);
});

test("MJ01 shopper copy avoids workflow and unsupported claims", () => {
  const sources = [read("app/components/GBPLandingPage.tsx"), read("app/components/WeedDiscoveryModule.tsx")].join("\n").toLowerCase();
  for (const blocked of ["homepage remains", "search intent", "page role", "gsc", "toronto-wide", "parking", "transit", "delivery", "best seller", "bestseller", "trending", "fully licensed", "after dark strain"] ) {
    assert.ok(!sources.includes(blocked), `Blocked shopper-copy phrase: ${blocked}`);
  }
});

test("MJ01 tier pages use approved Weed, Cannabis and Flower copy", () => {
  const content = read("app/lib/tierSeoContent.ts");
  const page = read("app/[tier]/page.tsx");
  for (const tier of ["Exotic", "Premium", "AAA+", "AA", "Budget"]) {
    assert.ok(content.includes(`${tier} Weed & Cannabis Flower in York`), `Missing approved title for ${tier}`);
  }
  assert.match(content, /Compare After Dark Weed & Flower Tiers/);
  assert.match(content, /ownerHref: "\/weed-dispensary-york\/"/);
  assert.match(page, /TIER_COMPARISON\.ownerHref/);
  assert.match(page, /seo\?\.h1/);
  assert.match(page, /seo\?\.imageAlt/);
  assert.match(page, /seo\?\.strainHeading/);
});
