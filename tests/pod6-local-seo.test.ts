import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "path";
import test from "node:test";

const read = (file: string) => readFileSync(file, "utf8");

const CITATION_PHONE = /(?:\+?1[\s.-]*)?\(?416\)?[\s.-]*302[\s.-]*8127/;

function walkSourceFiles(dir: string, acc: string[] = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walkSourceFiles(full, acc);
    else if (/\.(ts|tsx|js|jsx|css|md)$/.test(entry)) acc.push(full);
  }
  return acc;
}

test("MJ01 homepage schema keeps CannabisStore, adds FAQPage, and uses the FMD phone", () => {
  const layout = read("app/layout.tsx");
  const home = read("app/page.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  assert.match(layout, /cannabisStoreGraphNode/);
  assert.match(identity, /"@type": "CannabisStore"/);
  assert.match(identity, /telephone: STORE\.phoneIntl/);
  assert.match(identity, /url: STORE\.homepageUrl/);
  assert.match(identity, /phoneIntl: "\+14375249344"/);
  assert.match(home, /faqPageJsonLd\(HOME_FAQS\)/);
  assert.match(identity, /"@type": "FAQPage"/);
  assert.doesNotMatch(layout, /7Clmh\.jpg/);
  assert.match(identity, /46Oi5\.jpg/);
  assert.match(layout, /canonical: STORE\.homepageUrl/);
  assert.match(identity, /Dispensary Near Me in York \| After Dark Cannabis Jane Street/);
  assert.match(identity, /Cannabis store near me in York/);
});

test("MJ01 /visit is a real how-to-reach page with NAP, transit, and parking", () => {
  const visit = [read("app/visit/page.tsx"), read("app/lib/storeIdentity.ts")].join("\n");
  const sitemap = read("app/sitemap.ts");
  assert.match(visit, /How to Reach After Dark Cannabis on Jane Street in York/);
  assert.match(visit, /1664 Jane Street, York, ON M9N 2S1/);
  assert.match(visit, /\+1 \(437\) 524-9344/);
  assert.match(visit, /35 Jane/);
  assert.match(visit, /parking/i);
  assert.match(visit, /Lawrence Avenue West/);
  assert.match(visit, /stays the visit hub/i);
  assert.match(visit, /faqPageGraphNode\(VISIT_FAQS\)/);
  assert.match(sitemap, /\$\{BASE\}\/visit/);
});

test("MJ01 demotes Mississauga / Etobicoke / Weston city farms", () => {
  const etobicoke = read("app/weed-delivery-etobicoke/page.tsx");
  const weston = read("app/weed-delivery-weston/page.tsx");
  const mississauga = read("app/resources/local-guides/how-to-reach-after-dark-from-mississauga/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");
  for (const page of [etobicoke, weston, mississauga]) {
    assert.match(page, /index: false/);
    assert.match(page, /Jane Street/);
  }
  assert.match(etobicoke, /canonical: "https:\/\/afterdarkcannabis.com\/weed-delivery-york"/);
  assert.match(weston, /canonical: "https:\/\/afterdarkcannabis.com\/weed-delivery-york"/);
  assert.match(mississauga, /canonical: "https:\/\/afterdarkcannabis.com\/visit"/);
  assert.doesNotMatch(sitemap, /weed-delivery-etobicoke/);
  assert.doesNotMatch(sitemap, /weed-delivery-weston/);
  assert.doesNotMatch(sitemap, /how-to-reach-after-dark-from-mississauga/);
  assert.doesNotMatch(footer, /how-to-reach-after-dark-from-mississauga/);
});

test("MJ01 public source never reprints the citation 416 phone", () => {
  const files = walkSourceFiles("app");
  for (const file of files) {
    const source = read(file);
    assert.equal(CITATION_PHONE.test(source), false, `Citation phone leaked in ${file}`);
  }
});

test("MJ01 homepage neighbourhood copy stays Jane / York, not GTA delivery", () => {
  const home = read("app/HomePageClient.tsx");
  assert.match(home, /York Dispensary Near Me on Jane Street/);
  assert.match(home, /24-Hour Jane Street York Dispensary/);
  assert.match(home, /1664 Jane Street/);
  assert.doesNotMatch(home, /weed delivery Mississauga/i);
  assert.match(home, /href=\{STORE\.hoursPath\} className=\{styles\.brandBadge\}/);
  assert.match(home, /Open now on Jane Street/);
  assert.match(home, /STORE\.hoursPath/);
  assert.match(home, /STORE\.storePagePath/);
});

test("MJ01 locks NAP to STORE on footer, contact, and the 24-hour landing", () => {
  const footer = read("app/components/Footer.tsx");
  const contact = read("app/contact/page.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(footer, /from "\.\.\/lib\/storeIdentity"/);
  assert.match(footer, /STORE\.addressLine|STORE\.streetAddress/);
  assert.match(footer, /STORE\.phoneDisplay/);
  assert.match(footer, /STORE\.homepageUrl/);
  assert.match(contact, /STORE\.addressLine/);
  assert.match(contact, /STORE\.phoneDisplay/);
  assert.match(contact, /mapsEmbedUrl/);
  assert.match(hours, /24-Hour Dispensary Near Me in York — Open Now/);
  assert.match(hours, /faqPageGraphNode\(HOURS_FAQS\)/);
  assert.match(hours, /1664 Jane Street/);
  assert.match(identity, /hoursPath: "\/24-hour-dispensary-york"/);
  assert.match(sitemap, /\$\{BASE\}\/24-hour-dispensary-york/);
});

test("MJ01 York store page schema points at the homepage store, not a second Store URL", () => {
  const gbp = read("app/components/GBPLandingPage.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  assert.match(gbp, /webpageGraphNode/);
  assert.match(identity, /about: \{ "@id": `\$\{STORE\.baseUrl\}\/#store` \}/);
  assert.match(identity, /url: STORE\.homepageUrl/);
  assert.doesNotMatch(gbp, /"@type": "Store"/);
  assert.doesNotMatch(gbp, /url: "https:\/\/afterdarkcannabis\.com\/weed-dispensary-york\/"/);
});

test("MJ01 info York landings keep NAP + map and demote the Mississauga city farm", () => {
  const info = read("app/info/[seoPage]/page.tsx");
  const seo = read("app/lib/seoPages.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(info, /mapsEmbedUrl/);
  assert.match(info, /STORE\.addressLine/);
  assert.match(info, /faqPageJsonLd\(page\.faqs\)/);
  assert.match(info, /title: \{ absolute: page\.title \}/);
  assert.match(info, /slug === "weed-store-near-mississauga"/);
  assert.match(info, /index: false/);
  assert.match(seo, /York Weed Dispensary on Jane Street/);
  assert.match(sitemap, /p\.slug !== "weed-store-near-mississauga"/);
});

test("MJ01 frontend stays standalone", () => {
  const surfaces = [
    read("app/HomePageClient.tsx"),
    read("app/visit/page.tsx"),
    read("app/24-hour-dispensary-york/page.tsx"),
    read("app/jane-and-lawrence-dispensary/page.tsx"),
    read("app/contact/page.tsx"),
    read("app/layout.tsx"),
    read("app/components/Footer.tsx"),
  ].join("\n").toLowerCase();
  for (const blocked of ["athena", "sister store", "our other locations", "fleet of stores", "chain of dispensaries"]) {
    assert.equal(surfaces.includes(blocked), false, `Standalone leak: ${blocked}`);
  }
});

test("MJ01 B02 24-hour open-now guide keeps unique titles and door-test links", () => {
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const home = read("app/HomePageClient.tsx");
  const gbp = read("app/components/GBPLandingPage.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  const visitGuide = read("app/resources/resourceData.ts");
  const layout = read("app/layout.tsx");
  const gbpLoc = read("app/lib/gbp-location.ts");
  const visit = read("app/visit/page.tsx");
  const navbar = read("app/components/Navbar.tsx");

  assert.match(hours, /24-Hour Dispensary Near Me in York — Open Now \| After Dark Cannabis/);
  assert.match(hours, /24-Hour York Dispensary on Jane Street — Open-Now Guide/);
  assert.match(hours, /Are we open 24 hours\?/);
  assert.match(hours, /1664 Jane Street — how to arrive late night/);
  assert.match(hours, /Jane &amp; Lawrence \/ Weston \/ Mount Dennis/);
  assert.match(hours, /Safety &amp; ID at night/);
  assert.match(hours, /FAQ: 24 hour dispensary York \/ near me/);
  assert.match(hours, /STORE\.visitGuidePath/);
  assert.match(hours, /STORE\.storePagePath/);
  assert.match(hours, /href="\/"/);
  assert.match(hours, /href="\/visit"/);
  assert.match(identity, /Is there a 24 hour dispensary near me in York\?/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(home, /Open now on Jane Street/);
  assert.match(home, /STORE\.hoursPath/);
  assert.match(gbp, /Open now on Jane Street/);
  assert.match(gbp, /STORE\.visitGuidePath/);
  assert.match(visitGuide, /href: "\/24-hour-dispensary-york"/);
  assert.match(navbar, /STORE\.hoursPath/);
  assert.doesNotMatch(layout, /24-Hour Dispensary Near Me in York — Open Now/);
  assert.doesNotMatch(gbpLoc, /24-Hour Dispensary Near Me in York — Open Now/);
  assert.doesNotMatch(visit, /24-Hour Dispensary Near Me in York — Open Now/);
  assert.doesNotMatch(hours, /GBP Name|google business profile name/i);
});

test("MJ01 B08 Jane & Lawrence corridor guide keeps unique titles, NAP, and door-test links", () => {
  const corridor = [read("app/jane-and-lawrence-dispensary/page.tsx"), read("app/lib/storeIdentity.ts")].join("\n");
  const identity = read("app/lib/storeIdentity.ts");
  const home = read("app/HomePageClient.tsx");
  const gbp = read("app/components/GBPLandingPage.tsx");
  const visit = read("app/visit/page.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const visitGuide = read("app/resources/resourceData.ts");
  const sitemap = read("app/sitemap.ts");
  const layout = read("app/layout.tsx");
  const gbpLoc = read("app/lib/gbp-location.ts");
  const footer = read("app/components/Footer.tsx");
  const discovery = read("app/lib/weedDiscovery.ts");

  assert.match(identity, /corridorPath: "\/jane-and-lawrence-dispensary"/);
  assert.match(identity, /phoneDisplay: "\+1 \(437\) 524-9344"/);
  assert.match(identity, /Is there a Jane and Lawrence dispensary\?/);
  assert.match(corridor, /Jane and Lawrence Dispensary — Weston \/ Mount Dennis Walk-In \| After Dark Cannabis/);
  assert.match(corridor, /Jane & Lawrence \/ Weston \/ Mount Dennis Cannabis Walk-In/);
  assert.match(corridor, /Corridor map/);
  assert.match(corridor, /1664 Jane St pin/);
  assert.match(corridor, /Sister-neighbourhoods we serve for walk-in/);
  assert.match(corridor, /Mississauga and Etobicoke are not After Dark locations/);
  assert.match(corridor, /FAQ: Jane and Lawrence dispensary \/ near me/);
  assert.match(corridor, /1664 Jane Street, York, ON M9N 2S1/);
  assert.match(corridor, /\+1 \(437\) 524-9344/);
  assert.match(corridor, /href="\/"/);
  assert.match(corridor, /href="\/visit"/);
  assert.match(corridor, /STORE\.hoursPath/);
  assert.match(corridor, /STORE\.storePagePath/);
  assert.match(corridor, /STORE\.visitGuidePath/);
  assert.match(corridor, /faqPageGraphNode\(CORRIDOR_FAQS\)/);
  assert.match(home, /STORE\.corridorPath/);
  assert.match(home, /Jane &amp; Lawrence corridor/);
  assert.match(gbp, /STORE\.corridorPath/);
  assert.match(visit, /STORE\.corridorPath/);
  assert.match(hours, /STORE\.corridorPath/);
  assert.match(visitGuide, /href: "\/jane-and-lawrence-dispensary"/);
  assert.match(footer, /STORE\.corridorPath/);
  assert.match(discovery, /\/jane-and-lawrence-dispensary/);
  assert.match(sitemap, /\$\{BASE\}\/jane-and-lawrence-dispensary/);
  assert.doesNotMatch(layout, /Jane and Lawrence Dispensary — Weston \/ Mount Dennis Walk-In/);
  assert.doesNotMatch(gbpLoc, /Jane and Lawrence Dispensary — Weston \/ Mount Dennis Walk-In/);
  assert.doesNotMatch(hours, /Jane and Lawrence Dispensary — Weston \/ Mount Dennis Walk-In/);
  assert.doesNotMatch(visit, /Jane and Lawrence Dispensary — Weston \/ Mount Dennis Walk-In/);
  assert.doesNotMatch(corridor, /GBP Name|google business profile name/i);
  assert.doesNotMatch(corridor, /(?:\+?1[\s.-]*)?\(?416\)?[\s.-]*302[\s.-]*8127/);
});

test("MJ01 B14 homepage door-test CTR pack for dispensary near me", () => {
  const homePage = read("app/page.tsx");
  const home = read("app/HomePageClient.tsx");
  const identity = read("app/lib/storeIdentity.ts");
  const layout = read("app/layout.tsx");
  const hours = read("app/24-hour-dispensary-york/page.tsx");
  const yorkLp = read("app/weed-dispensary-york/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const nextConfig = read("next.config.ts");
  const footer = read("app/components/Footer.tsx");

  assert.match(identity, /seoTitleDefault: "Dispensary Near Me in York \| After Dark Cannabis Jane Street"/);
  assert.match(identity, /Cannabis store near me in York/);
  assert.match(homePage, /title: \{ absolute: STORE\.seoTitleDefault \}/);
  assert.match(homePage, /dispensary near me/);
  assert.match(layout, /dispensary near me/);
  assert.doesNotMatch(identity, /24-Hour Dispensary Near Me in York — Open Now/);
  assert.match(hours, /24-Hour Dispensary Near Me in York — Open Now \| After Dark Cannabis/);

  assert.match(home, /<h1 className=\{styles\.brandTitle\}>York Dispensary Near Me on Jane Street<\/h1>/);
  const doorTestAt = home.indexOf("doorTest");
  const bentoAt = home.indexOf("bentoGrid");
  const faqAt = home.indexOf("FAQ: dispensary near me in York");
  assert.ok(doorTestAt > -1 && bentoAt > doorTestAt, "NAP door-test must sit above the bento mosaic");
  assert.ok(home.indexOf("welcomeBannerSection") > doorTestAt, "Welcome banner must sit below the door-test NAP");
  assert.match(home, /aria-label="Store name, address, hours, and map"/);
  assert.match(home, /Address, hours, and map/);
  assert.match(home, /STORE\.addressLine/);
  assert.match(home, /STORE\.hoursNote/);
  assert.match(home, /mapsEmbedUrl/);
  assert.match(home, /href=\{STORE\.storePagePath\}/);
  assert.match(home, /href=\{STORE\.hoursPath\}/);
  assert.match(home, /York dispensary and 24-hour open-now/);
  assert.ok(faqAt > -1, "Homepage FAQ heading must target near-me intent");

  assert.match(identity, /Is there a dispensary near me in York\?/);
  assert.match(identity, /Is After Dark Cannabis a cannabis store near me on Jane Street\?/);
  assert.match(identity, /Where can I find cannabis near me in York\?/);
  assert.match(identity, /storePagePath: "\/weed-dispensary-york"/);
  assert.doesNotMatch(identity, /storePagePath: "\/weed-dispensary-york\/"/);
  assert.match(sitemap, /\$\{BASE\}\/weed-dispensary-york`/);
  assert.doesNotMatch(sitemap, /weed-dispensary-york\//);
  assert.match(yorkLp, /canonical: `https:\/\/\$\{gbpLocation\.domain\}\/\$\{gbpLocation\.slug\}`/);
  assert.doesNotMatch(yorkLp, /gbpLocation\.slug\}\//);
  assert.match(nextConfig, /do not add a second York LP page/);
  assert.doesNotMatch(nextConfig, /destination: "\/weed-dispensary-york\/"/);
  assert.match(footer, /STORE\.storePagePath/);
  assert.doesNotMatch(home, /GBP Name|google business profile name/i);
});
