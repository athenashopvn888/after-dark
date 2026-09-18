import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(file, "utf8");

const TIER_HREFS = ["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"];
const WAVE2_GRAPH = {
  home: ["app/HomePageClient.tsx", "app/page.tsx"],
  visit: ["app/visit/page.tsx"],
  york: ["app/components/GBPLandingPage.tsx", "app/weed-dispensary-york/page.tsx"],
  deliveryLp: ["app/cannabis-delivery-york/page.tsx"],
  catalog: ["app/weed-delivery-york/page.tsx", "app/delivery/DeliveryContent.tsx"],
  hours: ["app/24-hour-dispensary-york/page.tsx"],
  corridor: ["app/jane-and-lawrence-dispensary/page.tsx"],
  tiers: ["app/[tier]/page.tsx", "app/lib/tierSeoContent.ts"],
} as const;

function sourceFor(keys: (keyof typeof WAVE2_GRAPH)[]) {
  return keys.flatMap((key) => WAVE2_GRAPH[key]).map(read).join("\n");
}

test("MJ01 Wave 2 ships /cannabis-delivery-york as the York delivery neighbourhood LP", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const page = read("app/cannabis-delivery-york/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");

  assert.match(identity, /cannabisDeliveryPath: "\/cannabis-delivery-york"/);
  assert.match(identity, /yorkDeliveryPath: "\/weed-delivery-york"/);
  assert.match(page, /Cannabis Delivery in York from Jane Street/);
  assert.match(page, /title: \{ absolute: pageTitle \}/);
  assert.match(page, /alternates: \{ canonical \}/);
  assert.match(sitemap, /\$\{BASE\}\/cannabis-delivery-york/);
  assert.match(footer, /href="\/cannabis-delivery-york">Cannabis Delivery York<\/Link>/);
  assert.match(footer, /href="\/weed-delivery-york">WEED DELIVERY<\/Link>/);
});

test("MJ01 Wave 2 delivery LP locks NAP and keeps FAQPage + LocalBusiness", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const page = read("app/cannabis-delivery-york/page.tsx");

  assert.match(identity, /addressLine: "1664 Jane Street, York, ON M9N 2S1"/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(identity, /homepageUrl: "https:\/\/afterdarkcannabis\.com\/"/);
  assert.match(page, /STORE\.addressLine/);
  assert.match(page, /STORE\.phoneDisplay/);
  assert.match(page, /STORE\.homepageUrl/);
  assert.match(page, /className=\{`\$\{styles\.nap\} nap`\}/);
  assert.match(page, /faqPageGraphNode\(DELIVERY_FAQS\)/);
  assert.match(page, /localBusinessNapGraphNode\(\)/);
  assert.match(identity, /"@type": \["LocalBusiness", "CannabisStore"\]/);
  assert.match(identity, /url: STORE\.homepageUrl/);
  assert.match(identity, /Is York cannabis delivery available 24 hours\?/);
});

test("MJ01 Wave 2 delivery hours stay separate from the 24-hour Jane Street walk-in", () => {
  const page = read("app/cannabis-delivery-york/page.tsx");
  const faqs = read("app/lib/storeIdentity.ts");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const catalog = read("app/delivery/DeliveryContent.tsx");

  assert.match(page, /Delivery hours vs the 24-hour walk-in/);
  assert.match(page, /Cannabis delivery is not\s+advertised as 24\/7 on this site/);
  assert.match(faqs, /do not treat the 24-hour door as a 24-hour delivery promise/);
  assert.match(hours, /not a 24-hour delivery promise/);
  assert.match(catalog, /drop-off is\s+confirmed by the dispatcher and is not advertised as 24\/7/);
  assert.doesNotMatch(page, /24-hour cannabis delivery|24h delivery|delivery 24 hours|deliver 24\/7/i);
  assert.doesNotMatch(faqs.split("DELIVERY_FAQS")[1]?.split("export const CORRIDOR_FAQS")[0] || "", /delivery is 24 hours|24-hour drop-off/i);
});

test("MJ01 Wave 2 dense linking covers homepage, visit, York hub, delivery LP, catalog, and tiers", () => {
  const lp = read("app/cannabis-delivery-york/page.tsx");
  const hub = read("app/lib/sccParityHub.ts");
  const home = read("app/HomePageClient.tsx");
  const graph = sourceFor(["home", "visit", "york", "deliveryLp", "hours", "corridor", "tiers"]);

  assert.match(hub, /href: STORE\.cannabisDeliveryPath/);
  assert.match(hub, /STORE\.cannabisDeliveryPath/);
  assert.match(home, /STORE\.cannabisDeliveryPath/);
  assert.match(home, /geoSet="core"/);
  assert.match(lp, /href="\/"/);
  assert.match(lp, /href="\/visit"/);
  assert.match(lp, /STORE\.storePagePath/);
  assert.match(lp, /STORE\.yorkDeliveryPath/);
  assert.match(lp, /includeTiers/);
  for (const href of TIER_HREFS) {
    assert.ok(lp.includes(href), `delivery LP missing ${href}`);
  }
  assert.ok(graph.includes("/cannabis-delivery-york") || graph.includes("STORE.cannabisDeliveryPath"));
  for (const [label, files] of Object.entries({ deliveryLp: WAVE2_GRAPH.deliveryLp, home: WAVE2_GRAPH.home, visit: WAVE2_GRAPH.visit, york: WAVE2_GRAPH.york })) {
    const source = files.map(read).join("\n");
    assert.match(source, /SccParityHub|cannabisDeliveryPath|cannabis-delivery-york/, `${label} must join the delivery graph`);
    assert.match(source, /1664 Jane St/);
    assert.doesNotMatch(source, /Ottawa|Gatineau|ByWard|Byward/);
    assert.doesNotMatch(source, /sister store|our other locations/i);
  }
});

test("MJ01 Wave 2 delivery LP copy is York / Jane unique and keeps the catalog owner", () => {
  const lp = read("app/cannabis-delivery-york/page.tsx");
  const catalog = read("app/weed-delivery-york/page.tsx");
  const content = read("app/delivery/DeliveryContent.tsx");
  const gbp = read("app/lib/gbp-location.ts");
  const identity = read("app/lib/storeIdentity.ts");

  assert.match(lp, /<h1>\{pageH1\}<\/h1>/);
  assert.match(lp, /pageH1 = "Cannabis Delivery in York from Jane Street"/);
  assert.match(catalog, /title: "Weed Delivery York"/);
  assert.match(content, /<h1>Weed Delivery in York<\/h1>/);
  assert.match(content, /href="\/cannabis-delivery-york"/);
  assert.match(lp, /Jane Street/);
  assert.match(lp, /Lawrence Avenue West/);
  assert.match(lp, /\$60 product minimum/);
  assert.match(lp, /LIVE ORDER/);
  assert.match(lp, /York-radius/);
  assert.doesNotMatch(lp, /Ottawa|Gatineau|ByWard|Byward|native-cigarettes-jane-street|grabba-york|nicotine-pouches-york/);
  assert.doesNotMatch(identity, /GBP Name|google business profile name/i);
  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
});
