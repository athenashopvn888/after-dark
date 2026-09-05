import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the corrected PINKY master path as the first argument.");

const source = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
const sectionNumbers = [5, 6, 7, 8, 9, 10, 11, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
const routeLinks = {
  "/resources/cannabis-dispensary-vs-weed-dispensary": [
    ["After Dark Cannabis Weed Dispensary in York", "/weed-dispensary-york"],
    ["Cannabis Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"],
  ],
  "/resources/cannabis-101": [
    ["Your First Cannabis Dispensary Visit", "/resources/first-cannabis-dispensary-visit"],
    ["Weed Slang Explained", "/resources/weed-quality-slang"],
    ["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"],
    ["Strain vs Cultivar", "/resources/strain-vs-cultivar"],
    ["THC vs Weed Quality", "/resources/thc-vs-weed-quality"],
    ["Flower Guides", "/resources/flower-guides"],
  ],
  "/resources/flower-guides": [
    ["What Makes Good Weed?", "/resources/what-is-good-weed"],
    ["Cannabis Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"],
    ["Top Shelf vs Mids vs Quads", "/resources/top-shelf-mids-quads-aaaa-aaa-aa"],
    ["Cannabis Bag Appeal", "/resources/cannabis-bag-appeal"],
    ["Frosty Weed and Trichomes", "/resources/frosty-weed-trichomes"],
    ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"],
    ["Fresh vs Dry Weed", "/resources/fresh-dry-weed-curing-storage"],
    ["Smalls vs Big Buds", "/resources/smalls-vs-big-buds"],
    ["BC Grown and Growing Methods", "/resources/bc-grown-indoor-hydroponic-outdoor-cannabis"],
    ["Craft vs Commercial Cannabis", "/resources/craft-vs-commercial-cannabis"],
    ["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"],
    ["Strain vs Cultivar", "/resources/strain-vs-cultivar"],
    ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"],
    ["Exotic Weed", "/exotic-weed"], ["Premium Weed", "/premium-weed"],
    ["AAA+ Weed", "/aaa-weed"], ["AA Weed", "/aa-weed"], ["Budget Weed", "/budget-weed"],
  ],
  "/resources/native-cigarettes-ontario": [["Native Cigarettes in York", "/info/native-cigarettes-york"]],
  "/resources/indica-sativa-hybrid": [["Strain vs Cultivar", "/resources/strain-vs-cultivar"], ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"]],
  "/resources/strain-vs-cultivar": [["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"], ["Landrace vs Hybrid", "/resources/landrace-vs-hybrid"]],
  "/resources/landrace-vs-hybrid": [["Indica vs Sativa vs Hybrid", "/resources/indica-sativa-hybrid"], ["Strain vs Cultivar", "/resources/strain-vs-cultivar"]],
  "/resources/what-is-good-weed": [["Flower Quality & Tiers", "/resources/cannabis-flower-quality-tiers"], ["Top Shelf vs Mids vs Quads", "/resources/top-shelf-mids-quads-aaaa-aaa-aa"], ["Fresh vs Dry Weed", "/resources/fresh-dry-weed-curing-storage"]],
  "/resources/cannabis-bag-appeal": [["Frosty Weed and Trichomes", "/resources/frosty-weed-trichomes"], ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"]],
  "/resources/frosty-weed-trichomes": [["Cannabis Bag Appeal", "/resources/cannabis-bag-appeal"], ["Cannabis Aroma and Terpenes", "/resources/cannabis-aroma-terpenes-gas-loud-dank"]],
  "/resources/fresh-dry-weed-curing-storage": [["What Makes Good Weed?", "/resources/what-is-good-weed"], ["Craft vs Commercial Cannabis", "/resources/craft-vs-commercial-cannabis"]],
};

const stripInline = (value) => value.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^>\s*/, "").trim();

function numberedSection(n) {
  const start = source.search(new RegExp(`^# ${n}\\.`, "m"));
  if (start < 0) throw new Error(`Missing section ${n}`);
  const tail = source.slice(start);
  const next = tail.slice(1).search(/^# \d+\./m);
  return next < 0 ? tail : tail.slice(0, next + 1);
}

function field(block, names) {
  for (const name of names) {
    const inline = block.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`, "i"));
    if (inline) return stripInline(inline[1]);
    const stacked = block.match(new RegExp(`\\*\\*${name}\\*\\*\\s{0,2}\\n+([^\\n]+)`, "i"));
    if (stacked) return stripInline(stacked[1]);
  }
  throw new Error(`Missing field ${names[0]}`);
}

function paragraphize(lines) {
  const body = [], bullets = [];
  let paragraph = [];
  const flush = () => { if (paragraph.length) body.push(stripInline(paragraph.join(" "))); paragraph = []; };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^(?:-|\d+\.)\s+/.test(line)) { flush(); bullets.push(stripInline(line.replace(/^(?:-|\d+\.)\s+/, ""))); }
    else if (/^\*\*(?:Internal links?|Links?):\*\*/i.test(line)) flush();
    else paragraph.push(line);
  }
  flush();
  return { body, ...(bullets.length ? { bullets } : {}) };
}

function parseBody(block) {
  let body = block.split(/## APPROVED BODY COPY\s*\n/i)[1];
  if (!body) throw new Error("Missing approved body copy");
  body = body.split(/^## REQUIRED PAGE GUARDRAILS/m)[0];
  const introLines = [], sections = [], faqs = [];
  let current = null, sub = null, inFaq = false;
  const flushSub = () => { if (sub && current) current.subsections.push({ heading: sub.heading, ...paragraphize(sub.lines) }); sub = null; };
  const flushSection = () => {
    flushSub();
    if (current) sections.push({ heading: current.heading, ...paragraphize(current.lines), ...(current.subsections.length ? { subsections: current.subsections } : {}) });
    current = null;
  };
  for (const raw of body.split("\n")) {
    const h2 = raw.match(/^## (.+)$/), h3 = raw.match(/^### (.+)$/);
    if (h2) { flushSection(); inFaq = /^(Frequently Asked Questions|FAQ)$/i.test(h2[1]); if (!inFaq) current = { heading: stripInline(h2[1]), lines: [], subsections: [] }; continue; }
    if (h3) {
      if (inFaq) faqs.push({ q: stripInline(h3[1]), lines: [] });
      else if (current) { flushSub(); sub = { heading: stripInline(h3[1]), lines: [] }; }
      continue;
    }
    if (inFaq) { if (faqs.length) faqs.at(-1).lines.push(raw); }
    else if (sub) sub.lines.push(raw);
    else if (current) current.lines.push(raw);
    else introLines.push(raw);
  }
  flushSection();
  return { intro: paragraphize(introLines).body, sections, faqs: faqs.map((faq) => ({ q: faq.q, a: paragraphize(faq.lines).body.join(" ") })) };
}

function parsePage(n) {
  const block = numberedSection(n);
  const route = field(block, ["ROUTE", "Preferred route"]);
  const seoTitle = field(block, ["SEO TITLE", "SEO title"]);
  const metaDescription = field(block, ["META DESCRIPTION", "Meta description"]);
  const h1 = field(block, ["H1"]);
  const title = h1.replace(/[?:].*$/, "");
  const cannabis101Children = new Set(["/resources/first-cannabis-dispensary-visit"]);
  const rootPages = new Set(["/resources/cannabis-dispensary-vs-weed-dispensary", "/resources/cannabis-101", "/resources/flower-guides", "/resources/native-cigarettes-ontario"]);
  const parent = rootPages.has(route) ? "/resources" : cannabis101Children.has(route) ? "/resources/cannabis-101" : "/resources/flower-guides";
  return {
    path: route, kind: [10, 11].includes(n) ? "category" : "article", parent,
    categoryLabel: n === 10 ? "Cannabis 101" : n === 11 ? "Flower Guides" : n === 9 ? "Ontario Tobacco Information" : "Cannabis Knowledge",
    title, seoTitle, metaDescription, h1, excerpt: metaDescription, primaryKeyword: h1, supportingKeywords: [],
    searchIntent: "Learn the approved After Dark cannabis terminology and education topic.", author: "team",
    datePublished: "2026-09-05", dateModified: "2026-09-05",
    image: { src: n === 9 ? "/banners/06_Cigarette.webp" : "/banners/after_dark_welcome_banner.webp", alt: `${title} guide from After Dark Cannabis` },
    ...parseBody(block),
    commercialLinks: (routeLinks[route] || []).map(([label, href]) => ({ label, href })),
    related: (routeLinks[route] || []).filter(([, href]) => href.startsWith("/resources/")).map(([, href]) => href),
  };
}

const pages = sectionNumbers.map(parsePage);
const output = `import type { ResourcePage } from "./resourceData";\n\n// Generated mechanically from the owner-approved corrected PINKY master.\n// Do not hand-edit supplied copy; regenerate from the approved source instead.\nexport const AUTHORITY_RESOURCE_PAGES: ResourcePage[] = ${JSON.stringify(pages, null, 2)};\n`;
const outputPath = path.resolve("app/resources/authorityResourceData.ts");
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${pages.length} approved resource pages at ${outputPath}`);
