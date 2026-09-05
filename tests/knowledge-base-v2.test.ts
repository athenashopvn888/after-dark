import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { AUTHORITY_RESOURCE_PAGES } from "../app/resources/authorityResourceData.ts";

const expectedRoutes = [
  "/resources/cannabis-dispensary-vs-weed-dispensary",
  "/resources/cannabis-flower-quality-tiers",
  "/resources/bc-grown-indoor-hydroponic-outdoor-cannabis",
  "/resources/indica-sativa-hybrid",
  "/resources/native-cigarettes-ontario",
  "/resources/cannabis-101",
  "/resources/flower-guides",
  "/resources/what-is-good-weed",
  "/resources/weed-quality-slang",
  "/resources/top-shelf-mids-quads-aaaa-aaa-aa",
  "/resources/thc-vs-weed-quality",
  "/resources/cannabis-bag-appeal",
  "/resources/frosty-weed-trichomes",
  "/resources/cannabis-aroma-terpenes-gas-loud-dank",
  "/resources/fresh-dry-weed-curing-storage",
  "/resources/smalls-vs-big-buds",
  "/resources/craft-vs-commercial-cannabis",
  "/resources/strain-vs-cultivar",
  "/resources/landrace-vs-hybrid",
  "/resources/first-cannabis-dispensary-visit",
];

test("installs every approved teacher-site route once", () => {
  assert.equal(AUTHORITY_RESOURCE_PAGES.length, expectedRoutes.length);
  assert.deepEqual(new Set(AUTHORITY_RESOURCE_PAGES.map((page) => page.path)), new Set(expectedRoutes));
  assert.equal(new Set(AUTHORITY_RESOURCE_PAGES.map((page) => page.path)).size, expectedRoutes.length);
});

test("every authority page has complete metadata, body and FAQ copy", () => {
  for (const page of AUTHORITY_RESOURCE_PAGES) {
    assert.ok(page.seoTitle && page.metaDescription && page.h1, `metadata missing: ${page.path}`);
    assert.ok(page.intro.length > 0, `intro missing: ${page.path}`);
    assert.ok(page.sections.length > 0, `sections missing: ${page.path}`);
    assert.ok(page.faqs && page.faqs.length >= 4, `FAQ missing: ${page.path}`);
  }
});

test("protects exact Weed tier names and canonical slugs", () => {
  const products = readFileSync("app/lib/products.ts", "utf8");
  const tierCopy = readFileSync("app/lib/tierSeoContent.ts", "utf8");
  for (const [name, slug] of [["Exotic Weed", "exotic-weed"], ["Premium Weed", "premium-weed"], ["AAA+ Weed", "aaa-weed"], ["AA Weed", "aa-weed"], ["Budget Weed", "budget-weed"]]) {
    assert.ok(products.includes(`name: "${name}"`) && products.includes(`slug: "${slug}"`));
    assert.ok(tierCopy.includes(`${name} & Cannabis Flower in York`));
  }
  assert.doesNotMatch([products, tierCopy].join("\n"), /aaa-plus-weed|Exotic Cannabis"|Premium Cannabis"/);
});

test("keeps the Ontario cigarette authority page informational", () => {
  const page = AUTHORITY_RESOURCE_PAGES.find((item) => item.path === "/resources/native-cigarettes-ontario");
  assert.ok(page);
  const publicCopy = JSON.stringify({ intro: page.intro, sections: page.sections, links: page.commercialLinks }).toLowerCase();
  for (const blocked of ["buy now", "shop cigarettes", "available now", "order link", "$3", "$4", "$5"])
    assert.ok(!publicCopy.includes(blocked), `commercial phrase leaked: ${blocked}`);
});

test("does not expose internal workflow language in generated public copy", () => {
  const publicCopy = JSON.stringify(AUTHORITY_RESOURCE_PAGES).toLowerCase();
  for (const blocked of ["pinky", "cody", "approved body copy", "required page guardrails", "seo keyword"])
    assert.ok(!publicCopy.includes(blocked), `internal phrase leaked: ${blocked}`);
});

test("renders FAQ schema and contextual navigation", () => {
  const route = readFileSync("app/resources/[...slug]/page.tsx", "utf8");
  const view = readFileSync("app/resources/ResourceView.tsx", "utf8");
  assert.match(route, /"@type": "FAQPage"/);
  assert.match(view, /page\.faqs\.map/);
  assert.match(view, /section\.subsections\?\.map/);
});
