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
  assert.match(layout, /"@type": "CannabisStore"/);
  assert.match(layout, /telephone: STORE\.phoneIntl/);
  assert.match(identity, /phoneIntl: "\+14375249344"/);
  assert.match(home, /faqPageJsonLd\(HOME_FAQS\)/);
  assert.match(identity, /"@type": "FAQPage"/);
  assert.doesNotMatch(layout, /7Clmh\.jpg/);
  assert.match(identity, /46Oi5\.jpg/);
  assert.match(layout, /canonical: STORE\.homepageUrl/);
  assert.match(layout, /Jane Street York Dispensary/);
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
  assert.match(home, /Jane Street York Dispensary/);
  assert.match(home, /1664 Jane Street/);
  assert.doesNotMatch(home, /weed delivery Mississauga/i);
  assert.match(home, /href="\/visit"/);
});

test("MJ01 frontend stays standalone", () => {
  const surfaces = [
    read("app/HomePageClient.tsx"),
    read("app/visit/page.tsx"),
    read("app/layout.tsx"),
    read("app/components/Footer.tsx"),
  ].join("\n").toLowerCase();
  for (const blocked of ["athena", "sister store", "our other locations", "fleet of stores", "chain of dispensaries"]) {
    assert.equal(surfaces.includes(blocked), false, `Standalone leak: ${blocked}`);
  }
});
