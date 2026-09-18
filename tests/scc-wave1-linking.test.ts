import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { TIER_SEO } from "../app/lib/tierSeoContent.ts";

const read = (file: string) => readFileSync(file, "utf8");

const WAVE1_PAGES = {
  home: ["app/HomePageClient.tsx", "app/page.tsx"],
  visit: ["app/visit/page.tsx"],
  york: ["app/components/GBPLandingPage.tsx", "app/weed-dispensary-york/page.tsx"],
  hours: ["app/24-hour-dispensary-york/page.tsx"],
  corridor: ["app/jane-and-lawrence-dispensary/page.tsx"],
  tiers: ["app/[tier]/page.tsx", "app/lib/tierSeoContent.ts"],
} as const;

const TIER_HREFS = ["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"];
const GRAPH_HREFS = [
  "/",
  "/visit",
  "/weed-dispensary-york",
  "/24-hour-dispensary-york",
  "/jane-and-lawrence-dispensary",
  ...TIER_HREFS,
];

function sourceFor(keys: (keyof typeof WAVE1_PAGES)[]) {
  return keys.flatMap((key) => WAVE1_PAGES[key]).map(read).join("\n");
}

test("MJ01 Wave 1 homepage hub cards point at tiers + weed hub + /visit and keep B14", () => {
  const home = read("app/HomePageClient.tsx");
  assert.match(home, /York weed hub and Jane Street visit/);
  assert.match(home, /geoSet="core"/);
  assert.match(home, /includeTiers=\{false\}/);
  assert.match(home, /SccParityHub/);
  const hubLib = read("app/lib/sccParityHub.ts");
  assert.match(hubLib, /STORE\.storePagePath/);
  assert.match(hubLib, /STORE\.visitPath/);
  for (const href of TIER_HREFS) {
    assert.ok(hubLib.includes(`"${href}"`), `hub lib missing ${href}`);
  }
  assert.match(home, /href="\/exotic-weed"/);
  assert.match(home, /href="\/premium-weed"/);
  assert.match(home, /href="\/aaa-weed"/);
  assert.match(home, /href="\/aa-weed"/);
  assert.match(home, /href="\/budget-weed"/);
  assert.match(home, /href="\/visit"/);
  assert.match(home, /STORE\.storePagePath/);
  assert.match(home, /<h1 className=\{styles\.brandTitle\}>York Dispensary Near Me on Jane Street<\/h1>/);
  const doorTestAt = home.indexOf("doorTest");
  const hubAt = home.indexOf("hubSection");
  const bentoAt = home.indexOf("bentoGrid");
  assert.ok(doorTestAt > -1 && bentoAt > doorTestAt, "B14 door-test stays above the bento mosaic");
  assert.ok(hubAt > bentoAt, "tightened hub cards sit with the shop mosaic, not above the NAP door-test");
});

test("MJ01 Wave 1 dense linking covers homepage, visit, York hub, 24h, corridor, and five tiers", () => {
  const graphSource = sourceFor(["home", "visit", "york", "hours", "corridor", "tiers"]);
  for (const href of GRAPH_HREFS) {
    assert.ok(graphSource.includes(href), `Wave 1 graph missing ${href}`);
  }
  for (const [label, files] of Object.entries(WAVE1_PAGES)) {
    const source = files.map(read).join("\n");
    assert.match(source, /SccParityHub/, `${label} must render the shared hub`);
    assert.match(source, /1664 Jane St/);
    assert.doesNotMatch(source, /Ottawa|Gatineau|ByWard|Byward/);
    assert.doesNotMatch(source, /sister store|our other locations/i);
  }
  assert.equal(TIER_HREFS.join(" "), "/exotic-weed /premium-weed /aaa-weed /aa-weed /budget-weed");
  const hubLib = read("app/lib/sccParityHub.ts");
  assert.match(hubLib, /href: STORE\.visitPath|href: "\/visit"/);
  assert.match(hubLib, /storePagePath|weed-dispensary-york/);
  for (const href of TIER_HREFS) {
    assert.ok(hubLib.includes(`"${href}"`), `canonical tier hub missing ${href}`);
  }
});

test("MJ01 Wave 1 visit, 24h, and corridor pages link to five flower tiers", () => {
  for (const file of ["app/visit/page.tsx", "app/24-hour-dispensary-york/page.tsx", "app/jane-and-lawrence-dispensary/page.tsx"]) {
    const source = read(file);
    assert.match(source, /includeTiers/);
    assert.match(source, /geoSet="all"/);
    assert.match(source, /href="\/"/);
    assert.match(source, /STORE\.storePagePath|weed-dispensary-york/);
  }
});

test("MJ01 Wave 1 each flower tier keeps a unique H1, title, and FAQ set", () => {
  const entries = Object.entries(TIER_SEO);
  assert.equal(entries.length, 5);
  const h1s = entries.map(([, seo]) => seo.h1);
  const titles = entries.map(([, seo]) => seo.seoTitle);
  const questions = entries.flatMap(([, seo]) => seo.faqs.map((faq) => faq.q));
  assert.equal(new Set(h1s).size, h1s.length, "tier H1s must be unique");
  assert.equal(new Set(titles).size, titles.length, "tier titles must be unique");
  assert.equal(new Set(questions).size, questions.length, "tier FAQ questions must be unique across tiers");
  for (const [tier, seo] of entries) {
    assert.ok(seo.faqs.length >= 5, `${tier} FAQ is still thin (${seo.faqs.length})`);
    assert.match(seo.hubHeading, /Jane Street visit hubs/);
    assert.match(seo.hubIntro, /1664 Jane Street|York|Jane Street/);
    const faqBlob = seo.faqs.map((faq) => `${faq.q} ${faq.a} ${faq.answerHtml || ""}`).join("\n");
    assert.match(faqBlob, /weed-dispensary-york|York weed/);
    assert.match(faqBlob, /\/visit|how to reach|35 Jane/i);
  }
  const content = read("app/lib/tierSeoContent.ts");
  assert.doesNotMatch(content, /seoTitle: ".*\| After Dark Cannabis"/);
  assert.doesNotMatch(content, /Ottawa|Gatineau|ByWard/);
});

test("MJ01 Wave 1 does not add smoke SEO LPs or change GBP Website / NAP", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const gbp = read("app/lib/gbp-location.ts");
  assert.match(identity, /addressLine: "1664 Jane Street, York, ON M9N 2S1"/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(identity, /homepageUrl: "https:\/\/afterdarkcannabis\.com\/"/);
  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
  assert.doesNotMatch(read("app/sitemap.ts"), /native-cigarettes-jane-street|grabba-york|nicotine-pouches-york/);
  assert.doesNotMatch(read("app/HomePageClient.tsx"), /GBP Name|google business profile name/i);
});
