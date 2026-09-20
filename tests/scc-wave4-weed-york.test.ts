import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(file, "utf8");

const TIER_HREFS = ["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"];
const YORK_GRAPH = [
  "app/components/GBPLandingPage.tsx",
  "app/weed-dispensary-york/page.tsx",
] as const;

test("MJ01 Wave 4 keeps the live /weed-dispensary-york owner and unique York/Jane title", () => {
  const page = read("app/weed-dispensary-york/page.tsx");
  const york = read("app/components/GBPLandingPage.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  const sitemap = read("app/sitemap.ts");
  const gbp = read("app/lib/gbp-location.ts");

  assert.match(identity, /storePagePath: "\/weed-dispensary-york"/);
  assert.doesNotMatch(identity, /storePagePath: "\/weed-dispensary-york\/"/);
  assert.match(page, /Weed Dispensary in York on Jane Street \| After Dark Cannabis/);
  assert.match(york, /pageH1 = "Weed Dispensary in York on Jane Street"/);
  assert.match(york, /<h1>\{pageH1\}<\/h1>/);
  assert.match(page, /title: \{ absolute: pageTitle \}/);
  assert.match(page, /alternates: \{ canonical \}/);
  assert.match(sitemap, /\$\{BASE\}\/weed-dispensary-york`/);
  assert.doesNotMatch(sitemap, /weed-dispensary-york\//);
  assert.match(gbp, /slug: "weed-dispensary-york"/);
  assert.match(gbp, /Jane Street York Weed Dispensary \| After Dark Cannabis/);
});

test("MJ01 Wave 4 York LP locks NAP and keeps FAQPage + LocalBusiness", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const york = read("app/components/GBPLandingPage.tsx");

  assert.match(identity, /addressLine: "1664 Jane Street, York, ON M9N 2S1"/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(identity, /homepageUrl: "https:\/\/afterdarkcannabis\.com\/"/);
  assert.match(york, /STORE\.addressLine/);
  assert.match(york, /STORE\.phoneDisplay/);
  assert.match(york, /STORE\.homepageUrl/);
  assert.match(york, /className=\{`\$\{styles\.nap\} nap`\}/);
  assert.match(york, /faqPageGraphNode\(WEED_DISPENSARY_FAQS\)/);
  assert.match(york, /localBusinessNapGraphNode\(\)/);
  assert.match(york, /\{WEED_DISPENSARY_FAQS\.map/);
  assert.match(york, /FAQ: weed dispensary York \/ Jane Street/);
  assert.match(identity, /Is there a weed dispensary in York on Jane Street\?/);
  assert.match(identity, /Is the York weed hub the same as the 24-hour open-now guide\?/);
  assert.match(identity, /"@type": \["LocalBusiness", "CannabisStore"\]/);
});

test("MJ01 Wave 4 homepage hub card points at the live York weed LP", () => {
  const hub = read("app/lib/sccParityHub.ts");
  const home = read("app/HomePageClient.tsx");

  assert.match(hub, /href: STORE\.storePagePath/);
  assert.match(hub, /label: "Weed Dispensary in York"/);
  assert.match(home, /STORE\.storePagePath/);
  assert.match(home, /York weed hub and Jane Street visit/);
  assert.match(home, /Weed Dispensary in York neighbourhood page/);
  assert.match(home, /geoSet="core"/);
});

test("MJ01 Wave 4 dense linking covers visit, 24h, delivery, native-cig, nic-vape, and tiers", () => {
  const york = read("app/components/GBPLandingPage.tsx");
  const page = read("app/weed-dispensary-york/page.tsx");

  assert.match(york, /href="\/visit"/);
  assert.match(york, /STORE\.hoursPath/);
  assert.match(york, /STORE\.cannabisDeliveryPath/);
  assert.match(york, /STORE\.nativeCigarettesPath/);
  assert.match(york, /STORE\.nicotineVapePath/);
  assert.match(york, /includeTiers/);
  for (const href of TIER_HREFS) {
    assert.ok(york.includes(href), `York LP missing tier link ${href}`);
  }
  assert.match(page, /STORE\.storePagePath/);
});

test("MJ01 Wave 4 copy stays York / Jane unique and does not fork the owner URL", () => {
  const york = YORK_GRAPH.map(read).join("\n");
  const identity = read("app/lib/storeIdentity.ts");
  const gbp = read("app/lib/gbp-location.ts");

  assert.match(york, /Lawrence Avenue West/);
  assert.match(york, /1664 Jane St/);
  assert.doesNotMatch(york, /Ottawa|Gatineau|ByWard|Byward/);
  assert.doesNotMatch(york, /sister store|our other locations/i);
  assert.doesNotMatch(york, /#1|number one|best dispensary|fake review/i);
  assert.doesNotMatch(york, /toronto-wide|city-wide Toronto/i);
  assert.doesNotMatch(identity, /GBP Name|google business profile name/i);
  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
  assert.match(gbp, /menuUrl: "\/"/);
  assert.doesNotMatch(gbp, /LEARN_MORE|WEED_DISPENSARY_FAQS/);
  assert.doesNotMatch(read("app/sitemap.ts"), /weed-dispensary-york-jane|york-weed-owner/);
});

test("MJ01 Wave 4 does not touch menu swimlane files or GBP Website / NAP", () => {
  const york = YORK_GRAPH.map(read).join("\n");
  const identityFaqs = identityWeedFaqs();
  const gbp = read("app/lib/gbp-location.ts");

  assert.doesNotMatch(york, /flowers\.json|items\.json|prebuild-stock|adcInventory|APPS_SCRIPT_URL/);
  assert.doesNotMatch(identityFaqs, /flowers\.json|items\.json|adcInventory|APPS_SCRIPT_URL/);
  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
  assert.match(gbp, /phone: STORE\.phoneDisplay/);
  assert.match(gbp, /address: STORE\.addressLine/);
});

function identityWeedFaqs() {
  const identity = read("app/lib/storeIdentity.ts");
  const start = identity.indexOf("export const WEED_DISPENSARY_FAQS");
  const end = identity.indexOf("export const DELIVERY_FAQS");
  return identity.slice(start, end === -1 ? undefined : end);
}
