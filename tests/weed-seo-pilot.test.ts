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
  for (const href of ["/budget-weed", "/aa-weed", "/aaa-weed", "/premium-weed", "/exotic-weed", "/items/prerolls", "/items/edibles", "/items/vapes", "/items/concentrates", "/items/add-ons", "/weed-dispensary-york/", "/resources/cannabis-101", "/resources/flower-guides", "/resources/local-guides/jane-street-york-visit-guide"]) {
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
  const products = read("app/lib/products.ts");
  const sitemap = read("app/sitemap.ts");
  const home = read("app/page.tsx");
  const links = [home, read("app/components/Navbar.tsx"), read("app/components/Footer.tsx"), read("app/lib/weedDiscovery.ts"), read("app/resources/resourceData.ts")].join("\n");
  for (const tier of ["Exotic", "Premium", "AAA+", "AA", "Budget"]) {
    assert.ok(content.includes(`${tier} Weed & Cannabis Flower in York`), `Missing approved title for ${tier}`);
  }
  for (const [legacy, canonical] of [["exotic", "exotic-weed"], ["premium", "premium-weed"], ["aaa", "aaa-weed"], ["aa", "aa-weed"], ["budget", "budget-weed"]]) {
    assert.match(page, new RegExp(`${legacy}: "${canonical}"`), `Missing one-hop redirect map for ${legacy}`);
    assert.ok(links.includes(`/${canonical}`), `Missing canonical internal link: ${canonical}`);
    assert.ok(!links.includes(`href=\"/${legacy}\"`) && !links.includes(`href: \"/${legacy}\"`), `Legacy internal link remains: ${legacy}`);
  }
  assert.match(page, /permanentRedirect\(`\/\$\{canonicalTierSlug\}`\)/);
  assert.match(products, /name: "Exotic Weed",\s+slug: "exotic-weed"/);
  assert.match(products, /name: "Premium Weed",\s+slug: "premium-weed"/);
  assert.match(products, /name: "AAA\+ Weed",\s+slug: "aaa-weed"/);
  assert.match(products, /name: "AA Weed",\s+slug: "aa-weed"/);
  assert.match(products, /name: "Budget Weed",\s+slug: "budget-weed"/);
  for (const [name, slug] of [["Exotic Weed", "exotic-weed"], ["Premium Weed", "premium-weed"], ["AAA+ Weed", "aaa-weed"], ["AA Weed", "aa-weed"], ["Budget Weed", "budget-weed"]]) {
    assert.ok(home.includes(`name: "${name}"`) && home.includes(`slug: "${slug}"`), `Homepage card is not V2.1 compliant: ${name}`);
  }
  assert.match(sitemap, /Object\.values\(TIER_CONFIG\)/);
  assert.match(content, /Compare After Dark Weed & Flower Tiers/);
  assert.match(content, /ownerHref: "\/weed-dispensary-york\/"/);
  assert.match(page, /TIER_COMPARISON\.ownerHref/);
  assert.match(page, /seo\?\.h1/);
  assert.match(page, /seo\?\.imageAlt/);
  assert.match(page, /seo\?\.strainHeading/);
});
