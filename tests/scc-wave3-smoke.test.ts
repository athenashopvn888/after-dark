import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(file, "utf8");

const TIER_HREFS = ["/exotic-weed", "/premium-weed", "/aaa-weed", "/aa-weed", "/budget-weed"];
const WAVE3_GRAPH = {
  home: ["app/HomePageClient.tsx", "app/page.tsx"],
  visit: ["app/visit/page.tsx"],
  york: ["app/components/GBPLandingPage.tsx", "app/weed-dispensary-york/page.tsx"],
  hours: ["app/24-hour-dispensary-york/page.tsx"],
  cigLp: ["app/native-cigarettes-york/page.tsx"],
  nicLp: ["app/nicotine-vape-york/page.tsx"],
  categories: ["app/items/[category]/page.tsx"],
} as const;

test("MJ01 Wave 3 ships York Native cigarette and nicotine vape neighbourhood LPs", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const cig = read("app/native-cigarettes-york/page.tsx");
  const nic = read("app/nicotine-vape-york/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");

  assert.match(identity, /nativeCigarettesPath: "\/native-cigarettes-york"/);
  assert.match(identity, /nicotineVapePath: "\/nicotine-vape-york"/);
  assert.match(cig, /Native Cigarettes on Jane Street in York/);
  assert.match(nic, /Nicotine Vapes on Jane Street in York/);
  assert.match(cig, /title: \{ absolute: pageTitle \}/);
  assert.match(nic, /title: \{ absolute: pageTitle \}/);
  assert.match(cig, /alternates: \{ canonical \}/);
  assert.match(nic, /alternates: \{ canonical \}/);
  assert.match(sitemap, /\$\{BASE\}\/native-cigarettes-york/);
  assert.match(sitemap, /\$\{BASE\}\/nicotine-vape-york/);
  assert.match(sitemap, /\$\{BASE\}\/24-hour-dispensary-york/);
  assert.match(sitemap, /\$\{BASE\}\/cannabis-delivery-york/);
  assert.match(footer, /href="\/native-cigarettes-york">Native Cigarettes York<\/Link>/);
  assert.match(footer, /href="\/nicotine-vape-york">Nicotine Vapes York<\/Link>/);
});

test("MJ01 Wave 3 smoke LPs lock NAP and keep FAQPage + LocalBusiness", () => {
  const identity = read("app/lib/storeIdentity.ts");
  const cig = read("app/native-cigarettes-york/page.tsx");
  const nic = read("app/nicotine-vape-york/page.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");

  assert.match(identity, /addressLine: "1664 Jane Street, York, ON M9N 2S1"/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(identity, /homepageUrl: "https:\/\/afterdarkcannabis\.com\/"/);
  for (const page of [cig, nic, hours]) {
    assert.match(page, /STORE\.addressLine/);
    assert.match(page, /STORE\.phoneDisplay/);
    assert.match(page, /STORE\.homepageUrl/);
    assert.match(page, /className=\{`\$\{styles\.nap\} nap`\}/);
    assert.match(page, /localBusinessNapGraphNode\(\)/);
  }
  assert.match(cig, /faqPageGraphNode\(NATIVE_CIGARETTE_FAQS\)/);
  assert.match(nic, /faqPageGraphNode\(NICOTINE_VAPE_FAQS\)/);
  assert.match(hours, /faqPageGraphNode\(HOURS_FAQS\)/);
});

test("MJ01 Wave 3 dense linking covers homepage hub, visit, York hub, categories, and 24h", () => {
  const hub = read("app/lib/sccParityHub.ts");
  const home = read("app/HomePageClient.tsx");
  const visit = read("app/visit/page.tsx");
  const york = read("app/components/GBPLandingPage.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const categories = read("app/items/[category]/page.tsx");
  const cig = read("app/native-cigarettes-york/page.tsx");
  const nic = read("app/nicotine-vape-york/page.tsx");

  assert.match(hub, /href: STORE\.nativeCigarettesPath/);
  assert.match(hub, /href: STORE\.nicotineVapePath/);
  assert.match(hub, /STORE\.hoursPath/);
  assert.match(home, /STORE\.nativeCigarettesPath/);
  assert.match(home, /STORE\.nicotineVapePath/);
  assert.match(home, /cigaretteHref=\{STORE\.nativeCigarettesPath\}/);
  assert.match(home, /nicotineHref=\{STORE\.nicotineVapePath\}/);
  assert.match(home, /geoSet="core"/);
  assert.match(visit, /STORE\.nativeCigarettesPath/);
  assert.match(visit, /STORE\.nicotineVapePath/);
  assert.match(york, /STORE\.nativeCigarettesPath/);
  assert.match(york, /STORE\.nicotineVapePath/);
  assert.match(hours, /STORE\.nativeCigarettesPath/);
  assert.match(hours, /STORE\.nicotineVapePath/);
  assert.match(categories, /catSlug === "cigarettes"/);
  assert.match(categories, /catSlug === "vapes"/);
  assert.match(categories, /STORE\.nativeCigarettesPath/);
  assert.match(categories, /STORE\.nicotineVapePath/);
  assert.match(cig, /href="\/items\/cigarettes"/);
  assert.match(nic, /href="\/items\/vapes"/);
  assert.match(cig, /STORE\.hoursPath/);
  assert.match(nic, /STORE\.hoursPath/);
  for (const href of TIER_HREFS) {
    assert.ok(cig.includes(href) || cig.includes("includeTiers"), `cig LP missing tier graph ${href}`);
    assert.ok(nic.includes(href) || nic.includes("includeTiers"), `nic LP missing tier graph ${href}`);
  }
});

test("MJ01 Wave 3 copy stays York / Jane unique and does not invent stock or 24h delivery", () => {
  const cig = read("app/native-cigarettes-york/page.tsx");
  const nic = read("app/nicotine-vape-york/page.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  const gbp = read("app/lib/gbp-location.ts");

  assert.match(cig, /<h1>\{pageH1\}<\/h1>/);
  assert.match(nic, /<h1>\{pageH1\}<\/h1>/);
  assert.match(cig, /pageH1 = "Native Cigarettes on Jane Street in York"/);
  assert.match(nic, /pageH1 = "Nicotine Vapes on Jane Street in York"/);
  assert.notEqual(
    cig.match(/pageH1 = "([^"]+)"/)?.[1],
    nic.match(/pageH1 = "([^"]+)"/)?.[1],
  );
  assert.match(cig, /does not invent a shelf|does not invent/);
  assert.match(nic, /does not mix those routes or invent/);
  assert.match(nic, /Nicotine is addictive/);
  assert.match(cig, /Adults 19\+/);
  assert.match(nic, /Adults 19\+/);
  assert.match(hours, /24-Hour York Dispensary on Jane Street — Open-Now Guide/);
  assert.match(hours, /Overnight Native cigarettes and nicotine vapes/);
  assert.match(hours, /not a 24-hour delivery promise/);
  assert.match(identity, /Is there a 24-hour dispensary at Jane and Lawrence in York\?/);
  assert.match(identity, /Does After Dark Cannabis sell Native cigarettes on Jane Street in York\?/);
  assert.match(identity, /Does After Dark sell nicotine vapes on Jane Street in York\?/);
  assert.doesNotMatch(cig, /Ottawa|Gatineau|ByWard|Byward/);
  assert.doesNotMatch(nic, /Ottawa|Gatineau|ByWard|Byward/);
  assert.doesNotMatch(hours, /Ottawa|Gatineau|ByWard|Byward/);
  assert.doesNotMatch(identity, /GBP Name|google business profile name/i);
  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
  assert.doesNotMatch(read("app/sitemap.ts"), /native-cigarettes-jane-street|grabba-york|nicotine-pouches-york|24-hour-york-dispensary/);
});

test("MJ01 Wave 3 does not touch menu swimlane files or invent a pouches / 24h alias LP", () => {
  const sitemap = read("app/sitemap.ts");
  assert.doesNotMatch(sitemap, /24-hour-york-dispensary/);
  assert.doesNotMatch(sitemap, /nicotine-pouches-york/);
  for (const file of WAVE3_GRAPH.cigLp.concat(WAVE3_GRAPH.nicLp, WAVE3_GRAPH.hours)) {
    const source = read(file);
    assert.doesNotMatch(source, /sister store|our other locations/i);
    assert.doesNotMatch(source, /#1|number one|best dispensary|fake review/i);
  }
});

test("MJ01 Wave 3 Master GO: four sold pillars, on-page FAQ, hub cards, no GBP deep-link", () => {
  const hub = read("app/lib/sccParityHub.ts");
  const home = read("app/HomePageClient.tsx");
  const gbp = read("app/lib/gbp-location.ts");
  const pillars = {
    hours: read("app/24-hour-dispensary-york/page.tsx"),
    delivery: read("app/cannabis-delivery-york/page.tsx"),
    cig: read("app/native-cigarettes-york/page.tsx"),
    nic: read("app/nicotine-vape-york/page.tsx"),
  };

  for (const path of [
    "STORE.hoursPath",
    "STORE.cannabisDeliveryPath",
    "STORE.nativeCigarettesPath",
    "STORE.nicotineVapePath",
  ]) {
    assert.match(hub, new RegExp(path));
    assert.match(home, new RegExp(path === "STORE.hoursPath" ? "STORE\\.hoursPath" : path));
  }
  assert.match(home, /geoSet="core"/);
  assert.match(home, /cigaretteHref=\{STORE\.nativeCigarettesPath\}/);
  assert.match(home, /nicotineHref=\{STORE\.nicotineVapePath\}/);

  assert.match(pillars.hours, /\{HOURS_FAQS\.map/);
  assert.match(pillars.delivery, /\{DELIVERY_FAQS\.map/);
  assert.match(pillars.cig, /\{NATIVE_CIGARETTE_FAQS\.map/);
  assert.match(pillars.nic, /\{NICOTINE_VAPE_FAQS\.map/);
  assert.match(pillars.cig, /STORE\.cannabisDeliveryPath/);
  assert.match(pillars.nic, /STORE\.cannabisDeliveryPath/);
  assert.match(pillars.hours, /STORE\.cannabisDeliveryPath/);
  assert.match(pillars.delivery, /STORE\.hoursPath/);

  assert.match(gbp, /websiteUrl: STORE\.homepageUrl/);
  assert.match(gbp, /menuUrl: "\/"/);
  assert.doesNotMatch(gbp, /LEARN_MORE|native-cigarettes-york|nicotine-vape-york|cannabis-delivery-york/);

  const categories = read("app/items/[category]/page.tsx");
  assert.match(categories, /STORE\.cannabisDeliveryPath/);
});
